// Pure calculation utilities for the Rent vs. Own comparison calculator.
// Used only by components/RentVsOwnCalculator.tsx and its chart.
//
// Reuses the completed Mortgage Calculator's amortization formula and PMI
// rate assumption (ANNUAL_PMI_RATE, 0.50% annual, applied below 20% down)
// instead of duplicating them, so this calculator stays numerically
// consistent with mortgageCalculations.ts for identical loan inputs.
import { ANNUAL_PMI_RATE, monthlyPrincipalAndInterest } from "./mortgageCalculations";

// --- Educational planning defaults (all editable in the UI) --------------
export const DEFAULT_HOME_APPRECIATION_RATE = 5;
export const DEFAULT_RENT_INCREASE_RATE = 4.5;
export const DEFAULT_MAINTENANCE_RATE = 1;
export const DEFAULT_BUYER_CLOSING_COST_RATE = 3;
export const DEFAULT_SELLING_COST_RATE = 6;
export const DEFAULT_TAX_ASSESSED_GROWTH_RATE = 2;
export const DEFAULT_INSURANCE_INCREASE_RATE = 3;
export const DEFAULT_HOA_INCREASE_RATE = 3;

const MAX_SIMULATION_YEARS = 50; // hard safety backstop against runaway loops

export type RentVsOwnInputs = {
  monthlyRent: number;
  monthlyRentersInsurance: number;
  purchasePrice: number;
  downPayment: number; // dollar amount
  interestRate: number; // annual %
  loanTermYears: number;
  yearsInHome: number;
  annualPropertyTaxRate: number; // % of assessed value
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  // Advanced assumptions (annual %, editable planning defaults)
  homeAppreciationRate: number;
  rentIncreaseRate: number;
  maintenanceRate: number;
  buyerClosingCostRate: number;
  sellingCostRate: number;
  taxAssessedGrowthRate: number;
  insuranceIncreaseRate: number;
  hoaIncreaseRate: number;
};

export type YearPoint = {
  year: number;
  cumulativeRentingNetCost: number;
  cumulativeOwningNetCost: number;
};

export type TodaySnapshot = {
  rentPlusInsurance: number;
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  hoa: number;
  maintenance: number;
  totalOwnershipCost: number;
  monthlyDifference: number; // totalOwnershipCost - rentPlusInsurance
};

export type LongTermSummary = {
  years: number;
  totalRentPaid: number;
  totalRentersInsurancePaid: number;
  totalOwnerCashPaid: number;
  totalPrincipalPaid: number;
  totalInterestPaid: number;
  futureHomeValue: number;
  remainingMortgageBalance: number;
  equityBeforeSellingCosts: number;
  estimatedSellingCosts: number;
  netSaleProceeds: number;
  rentingNetCost: number;
  owningNetCost: number;
  difference: number; // owningNetCost - rentingNetCost (positive = renting cheaper)
};

export type RentVsOwnResult = {
  today: TodaySnapshot;
  longTerm: LongTermSummary;
  breakEvenYear: number | null;
  yearlySeries: YearPoint[];
  baseLoanAmount: number;
  downPaymentPercent: number;
};

export function validateRentVsOwnInputs(
  inputs: Partial<RentVsOwnInputs>
): string[] {
  const errors: string[] = [];

  if (!(inputs.purchasePrice !== undefined && inputs.purchasePrice > 0)) {
    errors.push("Purchase price must be greater than $0.");
  }
  if (!(inputs.monthlyRent !== undefined && inputs.monthlyRent >= 0)) {
    errors.push("Monthly rent cannot be negative.");
  }
  if (
    inputs.downPayment === undefined ||
    inputs.downPayment < 0 ||
    (inputs.purchasePrice !== undefined && inputs.downPayment > inputs.purchasePrice)
  ) {
    errors.push("Down payment cannot be negative or greater than the purchase price.");
  }
  if (!(inputs.interestRate !== undefined && inputs.interestRate >= 0)) {
    errors.push("Interest rate cannot be negative.");
  }
  if (!(inputs.loanTermYears !== undefined && inputs.loanTermYears > 0)) {
    errors.push("Loan term must be a valid positive number.");
  } else if (inputs.loanTermYears > MAX_SIMULATION_YEARS) {
    errors.push(`Loan term must be ${MAX_SIMULATION_YEARS} years or less.`);
  }
  if (!(inputs.yearsInHome !== undefined && inputs.yearsInHome > 0)) {
    errors.push("Expected years in the home must be a valid positive number.");
  } else if (inputs.yearsInHome > MAX_SIMULATION_YEARS) {
    errors.push(`Expected years in the home must be ${MAX_SIMULATION_YEARS} years or less.`);
  }
  if (!(inputs.annualPropertyTaxRate !== undefined && inputs.annualPropertyTaxRate >= 0)) {
    errors.push("Property tax rate cannot be negative.");
  }
  if (!(inputs.monthlyHomeInsurance !== undefined && inputs.monthlyHomeInsurance >= 0)) {
    errors.push("Homeowners insurance cannot be negative.");
  }
  if (!(inputs.monthlyHoa !== undefined && inputs.monthlyHoa >= 0)) {
    errors.push("HOA dues cannot be negative.");
  }
  if (!(inputs.monthlyRentersInsurance !== undefined && inputs.monthlyRentersInsurance >= 0)) {
    errors.push("Renter's insurance cannot be negative.");
  }

  const rateFields: [keyof RentVsOwnInputs, string][] = [
    ["homeAppreciationRate", "Home appreciation rate"],
    ["rentIncreaseRate", "Rent increase rate"],
    ["maintenanceRate", "Maintenance rate"],
    ["buyerClosingCostRate", "Buyer closing cost rate"],
    ["sellingCostRate", "Selling cost rate"],
    ["taxAssessedGrowthRate", "Property-tax assessed-value growth rate"],
    ["insuranceIncreaseRate", "Homeowners-insurance increase rate"],
    ["hoaIncreaseRate", "HOA increase rate"],
  ];
  for (const [field, label] of rateFields) {
    const value = inputs[field] as number | undefined;
    if (!(value !== undefined && isFinite(value) && value >= 0)) {
      errors.push(`${label} cannot be negative.`);
    }
  }

  return errors;
}

/** Standard fixed-rate amortization payment, safe for a 0% interest rate. */
function calcMonthlyPI(
  principal: number,
  annualRatePercent: number,
  termYears: number
): number {
  const totalPayments = Math.round(termYears * 12);
  if (!isFinite(principal) || principal <= 0 || totalPayments <= 0) return 0;
  if (!isFinite(annualRatePercent)) return 0;

  const payment = monthlyPrincipalAndInterest(principal, annualRatePercent, totalPayments);
  return isFinite(payment) && payment > 0 ? payment : 0;
}

type MonthRecord = { interest: number; principal: number; balance: number };

/** Full-term monthly amortization schedule. Bounded, never loops beyond the loan term. */
function buildAmortizationSchedule(
  loanAmount: number,
  annualRatePercent: number,
  termYears: number
): MonthRecord[] {
  const totalMonths = Math.min(Math.round(termYears * 12), MAX_SIMULATION_YEARS * 12);
  if (!isFinite(loanAmount) || loanAmount <= 0 || totalMonths <= 0) return [];

  const payment = calcMonthlyPI(loanAmount, annualRatePercent, termYears);
  const monthlyRate = annualRatePercent / 100 / 12;

  let balance = loanAmount;
  const schedule: MonthRecord[] = [];
  for (let m = 1; m <= totalMonths; m++) {
    const interest = Math.max(balance * monthlyRate, 0);
    let principal = payment - interest;
    if (!isFinite(principal) || principal < 0) principal = 0;
    if (principal > balance || m === totalMonths) principal = balance;
    balance = Math.max(balance - principal, 0);
    schedule.push({ interest, principal, balance });
    if (balance <= 0) break;
  }
  return schedule;
}

/** Balance at the START of the given 1-indexed month (before that month's payment). */
function startingBalance(schedule: MonthRecord[], monthIndex: number, originalLoan: number): number {
  if (monthIndex <= 1) return originalLoan;
  const prior = schedule[monthIndex - 2];
  return prior ? prior.balance : 0;
}

/** Record for a given 1-indexed month; zeros once the loan is paid off or beyond term. */
function monthRecordAt(schedule: MonthRecord[], monthIndex: number): MonthRecord {
  const record = schedule[monthIndex - 1];
  return record ?? { interest: 0, principal: 0, balance: 0 };
}

export function calculateRentVsOwn(inputs: RentVsOwnInputs): RentVsOwnResult {
  const purchasePrice = Math.max(inputs.purchasePrice, 0);
  const downPayment = Math.min(Math.max(inputs.downPayment, 0), purchasePrice);
  const baseLoanAmount = Math.max(purchasePrice - downPayment, 0);
  const downPaymentPercent = purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 0;

  const pmiApplies = downPaymentPercent < 20;
  const pmiCutoffBalance = purchasePrice * 0.8;

  const schedule = buildAmortizationSchedule(baseLoanAmount, inputs.interestRate, inputs.loanTermYears);
  const monthlyPI = calcMonthlyPI(baseLoanAmount, inputs.interestRate, inputs.loanTermYears);
  const monthlyPmiRate = ANNUAL_PMI_RATE / 12;

  const simulationYears = Math.min(Math.max(Math.round(inputs.yearsInHome), 0), MAX_SIMULATION_YEARS);
  const buyerClosingCosts = purchasePrice * (Math.max(inputs.buyerClosingCostRate, 0) / 100);

  // --- Today snapshot (month 1, using entered figures directly) ---------
  const todayPropertyTax = (purchasePrice * Math.max(inputs.annualPropertyTaxRate, 0)) / 100 / 12;
  const todayPmi = pmiApplies && baseLoanAmount > pmiCutoffBalance ? baseLoanAmount * monthlyPmiRate : 0;
  const todayMaintenance = (purchasePrice * Math.max(inputs.maintenanceRate, 0)) / 100 / 12;
  const todayRentPlusInsurance = Math.max(inputs.monthlyRent, 0) + Math.max(inputs.monthlyRentersInsurance, 0);
  const todayTotalOwnershipCost =
    monthlyPI +
    todayPropertyTax +
    Math.max(inputs.monthlyHomeInsurance, 0) +
    todayPmi +
    Math.max(inputs.monthlyHoa, 0) +
    todayMaintenance;

  const today: TodaySnapshot = {
    rentPlusInsurance: todayRentPlusInsurance,
    principalAndInterest: monthlyPI,
    propertyTax: todayPropertyTax,
    homeInsurance: Math.max(inputs.monthlyHomeInsurance, 0),
    pmi: todayPmi,
    hoa: Math.max(inputs.monthlyHoa, 0),
    maintenance: todayMaintenance,
    totalOwnershipCost: todayTotalOwnershipCost,
    monthlyDifference: todayTotalOwnershipCost - todayRentPlusInsurance,
  };

  // --- Year-by-year simulation -------------------------------------------
  let cumulativeRent = 0;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;
  let cumulativePropertyTax = 0;
  let cumulativeHomeInsurance = 0;
  let cumulativeHoa = 0;
  let cumulativeMaintenance = 0;
  let cumulativePmi = 0;

  let rentThisYear = Math.max(inputs.monthlyRent, 0) * 12;
  const rentersInsuranceAnnual = Math.max(inputs.monthlyRentersInsurance, 0) * 12;

  const yearlySeries: YearPoint[] = [];
  let breakEvenYear: number | null = null;

  for (let year = 1; year <= simulationYears; year++) {
    if (year > 1) {
      rentThisYear *= 1 + Math.max(inputs.rentIncreaseRate, 0) / 100;
    }
    cumulativeRent += rentThisYear + rentersInsuranceAnnual;

    // Recurring ownership costs during year N use (N-1) years of growth —
    // year 1 uses today's entered figures unchanged.
    const growthYears = year - 1;
    const assessedValueThisYear =
      purchasePrice * Math.pow(1 + Math.max(inputs.taxAssessedGrowthRate, 0) / 100, growthYears);
    const homeValueAtStartOfYear =
      purchasePrice * Math.pow(1 + Math.max(inputs.homeAppreciationRate, 0) / 100, growthYears);

    const propertyTaxThisYear = assessedValueThisYear * (Math.max(inputs.annualPropertyTaxRate, 0) / 100);
    const homeInsuranceThisYear =
      Math.max(inputs.monthlyHomeInsurance, 0) *
      12 *
      Math.pow(1 + Math.max(inputs.insuranceIncreaseRate, 0) / 100, growthYears);
    const hoaThisYear =
      Math.max(inputs.monthlyHoa, 0) * 12 * Math.pow(1 + Math.max(inputs.hoaIncreaseRate, 0) / 100, growthYears);
    const maintenanceThisYear = homeValueAtStartOfYear * (Math.max(inputs.maintenanceRate, 0) / 100);

    let principalThisYear = 0;
    let interestThisYear = 0;
    let pmiThisYear = 0;
    for (let m = (year - 1) * 12 + 1; m <= year * 12; m++) {
      const record = monthRecordAt(schedule, m);
      principalThisYear += record.principal;
      interestThisYear += record.interest;

      const balanceBeforePayment = startingBalance(schedule, m, baseLoanAmount);
      if (pmiApplies && balanceBeforePayment > pmiCutoffBalance) {
        pmiThisYear += balanceBeforePayment * monthlyPmiRate;
      }
    }

    cumulativePrincipal += principalThisYear;
    cumulativeInterest += interestThisYear;
    cumulativePropertyTax += propertyTaxThisYear;
    cumulativeHomeInsurance += homeInsuranceThisYear;
    cumulativeHoa += hoaThisYear;
    cumulativeMaintenance += maintenanceThisYear;
    cumulativePmi += pmiThisYear;

    // Hypothetical "sold at the end of this year" snapshot, for the chart
    // and break-even detection — same methodology as the final long-term
    // figures, just evaluated at every year instead of only the last one.
    const balanceAtYearEnd = monthRecordAt(schedule, year * 12).balance;
    const homeValueAtYearEnd = purchasePrice * Math.pow(1 + Math.max(inputs.homeAppreciationRate, 0) / 100, year);
    const sellingCostsAtYearEnd = homeValueAtYearEnd * (Math.max(inputs.sellingCostRate, 0) / 100);
    const netSaleProceedsAtYearEnd = homeValueAtYearEnd - sellingCostsAtYearEnd - balanceAtYearEnd;
    const ownerCashSoFar =
      downPayment +
      buyerClosingCosts +
      cumulativePrincipal +
      cumulativeInterest +
      cumulativePropertyTax +
      cumulativeHomeInsurance +
      cumulativeHoa +
      cumulativeMaintenance +
      cumulativePmi;
    const owningNetCostAtYearEnd = ownerCashSoFar - netSaleProceedsAtYearEnd;

    yearlySeries.push({
      year,
      cumulativeRentingNetCost: cumulativeRent,
      cumulativeOwningNetCost: owningNetCostAtYearEnd,
    });

    if (breakEvenYear === null && owningNetCostAtYearEnd <= cumulativeRent) {
      breakEvenYear = year;
    }
  }

  const remainingMortgageBalance = monthRecordAt(schedule, simulationYears * 12).balance;
  const futureHomeValue =
    purchasePrice * Math.pow(1 + Math.max(inputs.homeAppreciationRate, 0) / 100, simulationYears);
  const estimatedSellingCosts = futureHomeValue * (Math.max(inputs.sellingCostRate, 0) / 100);
  const equityBeforeSellingCosts = futureHomeValue - remainingMortgageBalance;
  const netSaleProceeds = futureHomeValue - estimatedSellingCosts - remainingMortgageBalance;

  const totalOwnerCashPaid =
    downPayment +
    buyerClosingCosts +
    cumulativePrincipal +
    cumulativeInterest +
    cumulativePropertyTax +
    cumulativeHomeInsurance +
    cumulativeHoa +
    cumulativeMaintenance +
    cumulativePmi;

  const rentingNetCost = cumulativeRent;
  const owningNetCost = totalOwnerCashPaid - netSaleProceeds;

  const longTerm: LongTermSummary = {
    years: simulationYears,
    totalRentPaid: cumulativeRent - simulationYears * rentersInsuranceAnnual,
    totalRentersInsurancePaid: simulationYears * rentersInsuranceAnnual,
    totalOwnerCashPaid,
    totalPrincipalPaid: cumulativePrincipal,
    totalInterestPaid: cumulativeInterest,
    futureHomeValue,
    remainingMortgageBalance,
    equityBeforeSellingCosts,
    estimatedSellingCosts,
    netSaleProceeds,
    rentingNetCost,
    owningNetCost,
    difference: owningNetCost - rentingNetCost,
  };

  return {
    today,
    longTerm,
    breakEvenYear,
    yearlySeries,
    baseLoanAmount,
    downPaymentPercent,
  };
}

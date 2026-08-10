// Pure calculation utilities for the FHA vs. Conventional comparison
// calculator. Used only by FhaVsConventionalCalculator.tsx / its chart.
//
// The mortgage-insurance rate assumptions are imported directly from
// mortgageCalculations.ts (the completed Mortgage Calculator's shared
// utility) so both calculators stay numerically consistent for the same
// inputs — this file does not define its own, separate PMI/MIP rates:
//
// - Conventional PMI: ANNUAL_PMI_RATE (0.50% annual), applied only when the
//   loan-to-value ratio exceeds 80%.
// - FHA MIP: FHA_UPFRONT_MIP_RATE (1.75%) financed into the loan, plus
//   ANNUAL_FHA_MIP_RATE (a flat 0.55% annual estimate). This is the same
//   simplified, single-rate educational assumption the Mortgage Calculator
//   uses — it is NOT the full HUD schedule, which additionally varies by
//   base loan amount, LTV bracket, and loan term. If exact HUD tiering is
//   ever needed, it should be implemented in mortgageCalculations.ts first
//   so both calculators pick it up together.
import {
  ANNUAL_PMI_RATE,
  ANNUAL_FHA_MIP_RATE,
  FHA_UPFRONT_MIP_RATE,
  monthlyPrincipalAndInterest,
} from "./mortgageCalculations";

export const FHA_MIN_DOWN_PERCENT = 3.5;
export const CONVENTIONAL_MIN_DOWN_PERCENT = 5;
export { FHA_UPFRONT_MIP_RATE, ANNUAL_FHA_MIP_RATE, ANNUAL_PMI_RATE };

/**
 * Standard fixed-rate amortization formula, safe for a 0% interest rate.
 * Delegates to the Mortgage Calculator's own monthlyPrincipalAndInterest
 * for the actual math (same formula, same rounding behavior), with extra
 * input/output guards so invalid inputs from this calculator's form can
 * never produce NaN or Infinity.
 */
export function calcMonthlyPI(
  principal: number,
  annualRatePercent: number,
  termYears: number
): number {
  const totalPayments = Math.round(termYears * 12);
  if (!isFinite(principal) || principal <= 0 || totalPayments <= 0) return 0;
  if (!isFinite(annualRatePercent)) return 0;

  const payment = monthlyPrincipalAndInterest(
    principal,
    annualRatePercent,
    totalPayments
  );

  return isFinite(payment) && payment > 0 ? payment : 0;
}

export type LoanScenarioInput = {
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  termYears: number;
  annualPropertyTaxRate: number;
  monthlyInsurance: number;
  monthlyHoa: number;
};

export type LoanScenarioResult = {
  downPayment: number;
  downPaymentPercent: number;
  baseLoanAmount: number;
  upfrontMi: number;
  financedLoanAmount: number;
  ltv: number;
  monthlyPI: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyMi: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  /** Down payment only — upfront MI is financed (FHA) or not charged (conventional). */
  upfrontCashRequired: number;
};

function sharedMonthlyCosts(input: LoanScenarioInput) {
  const monthlyPropertyTax =
    input.purchasePrice > 0
      ? (input.purchasePrice * (input.annualPropertyTaxRate || 0)) / 100 / 12
      : 0;
  const monthlyInsurance = Math.max(input.monthlyInsurance || 0, 0);
  const monthlyHoa = Math.max(input.monthlyHoa || 0, 0);
  return { monthlyPropertyTax, monthlyInsurance, monthlyHoa };
}

export function calculateFhaScenario(
  input: LoanScenarioInput
): LoanScenarioResult {
  const purchasePrice = Math.max(input.purchasePrice || 0, 0);
  const downPayment = Math.min(Math.max(input.downPayment || 0, 0), purchasePrice);

  const baseLoanAmount = Math.max(purchasePrice - downPayment, 0);
  const ltv = purchasePrice > 0 ? baseLoanAmount / purchasePrice : 0;

  const upfrontMi = baseLoanAmount * FHA_UPFRONT_MIP_RATE;
  const financedLoanAmount = baseLoanAmount + upfrontMi;

  const monthlyPI = calcMonthlyPI(
    financedLoanAmount,
    input.interestRate,
    input.termYears
  );
  const monthlyMi = (baseLoanAmount * ANNUAL_FHA_MIP_RATE) / 12;

  const { monthlyPropertyTax, monthlyInsurance, monthlyHoa } =
    sharedMonthlyCosts(input);

  const totalMonthlyPayment =
    monthlyPI + monthlyMi + monthlyPropertyTax + monthlyInsurance + monthlyHoa;

  return {
    downPayment,
    downPaymentPercent: purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 0,
    baseLoanAmount,
    upfrontMi,
    financedLoanAmount,
    ltv,
    monthlyPI,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyMi,
    monthlyHoa,
    totalMonthlyPayment,
    upfrontCashRequired: downPayment,
  };
}

export function calculateConventionalScenario(
  input: LoanScenarioInput
): LoanScenarioResult {
  const purchasePrice = Math.max(input.purchasePrice || 0, 0);
  const downPayment = Math.min(Math.max(input.downPayment || 0, 0), purchasePrice);

  const baseLoanAmount = Math.max(purchasePrice - downPayment, 0);
  const ltv = purchasePrice > 0 ? baseLoanAmount / purchasePrice : 0;

  // Conventional loans have no upfront mortgage insurance to finance.
  const upfrontMi = 0;
  const financedLoanAmount = baseLoanAmount;

  const monthlyPI = calcMonthlyPI(
    financedLoanAmount,
    input.interestRate,
    input.termYears
  );

  // PMI only applies above 80% LTV, and drops to $0 at/under 80% regardless
  // of credit-score range.
  const monthlyMi = ltv > 0.8 ? (baseLoanAmount * ANNUAL_PMI_RATE) / 12 : 0;

  const { monthlyPropertyTax, monthlyInsurance, monthlyHoa } =
    sharedMonthlyCosts(input);

  const totalMonthlyPayment =
    monthlyPI + monthlyMi + monthlyPropertyTax + monthlyInsurance + monthlyHoa;

  return {
    downPayment,
    downPaymentPercent: purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 0,
    baseLoanAmount,
    upfrontMi,
    financedLoanAmount,
    ltv,
    monthlyPI,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyMi,
    monthlyHoa,
    totalMonthlyPayment,
    upfrontCashRequired: downPayment,
  };
}

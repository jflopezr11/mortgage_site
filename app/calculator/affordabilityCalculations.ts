import { ANNUAL_PMI_RATE, monthlyPrincipalAndInterest } from "./mortgageCalculations";

/** Total debt-to-income planning assumption used to size the housing budget. */
export const AFFORDABILITY_DTI_RATIO = 0.4;

/** Ceiling for the purchase-price search; generous enough to never bind for a consumer estimate. */
const PRICE_SEARCH_UPPER_BOUND = 100_000_000;
const PRICE_SEARCH_MAX_ITERATIONS = 100;

export type AffordabilityInputs = {
  annualIncome: string;
  monthlyDebt: string;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  propertyTaxRate: string;
  homeInsurance: string;
  hoaFees: string;
};

export type AffordabilityField = keyof AffordabilityInputs;
export type AffordabilityErrors = Partial<Record<AffordabilityField, string>>;

export type AffordabilityResult = {
  /** False when no monthly housing budget remains (or fixed costs alone exceed it); other fields are 0 in that case. */
  budgetAvailable: boolean;
  affordablePrice: number;
  loanAmount: number;
  downPayment: number;
  grossMonthlyIncome: number;
  monthlyDebt: number;
  maxDebtAllowance: number;
  availableHousingBudget: number;
  totalMonthlyPayment: number;
  principalAndInterest: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  mortgageInsurance: number;
  hoa: number;
};

export type AffordabilityCalculation = {
  errors: AffordabilityErrors;
  result: AffordabilityResult | null;
};

const parseRequiredNumber = (value: string) => {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

type PaymentBreakdown = {
  baseLoanAmount: number;
  principalAndInterest: number;
  propertyTaxes: number;
  mortgageInsurance: number;
  total: number;
};

function monthlyHousingPaymentForPrice(
  price: number,
  downPayment: number,
  annualInterestRate: number,
  termYears: number,
  propertyTaxRate: number,
  homeInsurance: number,
  hoaFees: number
): PaymentBreakdown {
  const baseLoanAmount = Math.max(0, price - downPayment);
  const totalPayments = termYears * 12;
  const principalAndInterest = monthlyPrincipalAndInterest(
    baseLoanAmount,
    annualInterestRate,
    totalPayments
  );
  const propertyTaxes = (price * (propertyTaxRate / 100)) / 12;
  const mortgageInsurance =
    downPayment < price * 0.2 ? (baseLoanAmount * ANNUAL_PMI_RATE) / 12 : 0;
  const total = principalAndInterest + propertyTaxes + homeInsurance + mortgageInsurance + hoaFees;

  return { baseLoanAmount, principalAndInterest, propertyTaxes, mortgageInsurance, total };
}

/**
 * Binary search for the highest purchase price whose total monthly housing payment
 * stays within the available budget. The total is monotonically non-decreasing in
 * price (loan amount, property taxes, and PMI all grow or hold steady with price),
 * so bisection converges reliably instead of relying on a one-pass approximation.
 */
function solveAffordablePrice(
  availableBudget: number,
  downPayment: number,
  annualInterestRate: number,
  termYears: number,
  propertyTaxRate: number,
  homeInsurance: number,
  hoaFees: number
): number {
  if (availableBudget <= 0) return 0;

  let low = 0;
  let high = PRICE_SEARCH_UPPER_BOUND;
  let best = 0;

  for (let i = 0; i < PRICE_SEARCH_MAX_ITERATIONS; i += 1) {
    const mid = (low + high) / 2;
    const { total } = monthlyHousingPaymentForPrice(
      mid,
      downPayment,
      annualInterestRate,
      termYears,
      propertyTaxRate,
      homeInsurance,
      hoaFees
    );

    if (total <= availableBudget) {
      best = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  return best;
}

const insufficientBudgetResult = (
  grossMonthlyIncome: number,
  monthlyDebt: number,
  maxDebtAllowance: number,
  availableHousingBudget: number,
  downPayment: number
): AffordabilityCalculation => ({
  errors: {},
  result: {
    budgetAvailable: false,
    affordablePrice: 0,
    loanAmount: 0,
    downPayment,
    grossMonthlyIncome,
    monthlyDebt,
    maxDebtAllowance,
    availableHousingBudget,
    totalMonthlyPayment: 0,
    principalAndInterest: 0,
    propertyTaxes: 0,
    homeownersInsurance: 0,
    mortgageInsurance: 0,
    hoa: 0,
  },
});

export function calculateAffordability(inputs: AffordabilityInputs): AffordabilityCalculation {
  const errors: AffordabilityErrors = {};

  const annualIncome = parseRequiredNumber(inputs.annualIncome);
  const monthlyDebt = parseRequiredNumber(inputs.monthlyDebt);
  const downPayment = parseRequiredNumber(inputs.downPayment);
  const interestRate = parseRequiredNumber(inputs.interestRate);
  const loanTerm = parseRequiredNumber(inputs.loanTerm);
  const propertyTaxRate = parseRequiredNumber(inputs.propertyTaxRate);
  const homeInsurance = parseRequiredNumber(inputs.homeInsurance);
  const hoaFees = parseRequiredNumber(inputs.hoaFees);

  if (annualIncome === null || annualIncome <= 0) {
    errors.annualIncome = "Annual gross income must be greater than $0.";
  }
  if (monthlyDebt === null) {
    errors.monthlyDebt = "Enter a valid monthly debt amount.";
  } else if (monthlyDebt < 0) {
    errors.monthlyDebt = "Monthly debt payments cannot be negative.";
  }
  if (downPayment === null) {
    errors.downPayment = "Enter a valid down payment.";
  } else if (downPayment < 0) {
    errors.downPayment = "Down payment cannot be negative.";
  }
  if (interestRate === null) {
    errors.interestRate = "Enter a valid interest rate.";
  } else if (interestRate < 0) {
    errors.interestRate = "Interest rate cannot be negative.";
  }
  if (loanTerm === null || loanTerm <= 0) {
    errors.loanTerm = "Loan term must be a valid positive number.";
  } else if (loanTerm > 100) {
    errors.loanTerm = "Loan term cannot exceed 100 years.";
  }
  if (propertyTaxRate === null) {
    errors.propertyTaxRate = "Enter a valid property tax rate.";
  } else if (propertyTaxRate < 0) {
    errors.propertyTaxRate = "Property tax rate cannot be negative.";
  }
  if (homeInsurance === null) {
    errors.homeInsurance = "Enter a valid homeowners insurance amount.";
  } else if (homeInsurance < 0) {
    errors.homeInsurance = "Homeowners insurance cannot be negative.";
  }
  if (hoaFees === null) {
    errors.hoaFees = "Enter a valid HOA amount.";
  } else if (hoaFees < 0) {
    errors.hoaFees = "HOA cannot be negative.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, result: null };
  }

  const validIncome = annualIncome as number;
  const validMonthlyDebt = monthlyDebt as number;
  const validDownPayment = downPayment as number;
  const validInterestRate = interestRate as number;
  const validLoanTerm = loanTerm as number;
  const validPropertyTaxRate = propertyTaxRate as number;
  const validHomeInsurance = homeInsurance as number;
  const validHoaFees = hoaFees as number;

  const grossMonthlyIncome = validIncome / 12;
  const maxDebtAllowance = grossMonthlyIncome * AFFORDABILITY_DTI_RATIO;
  const availableHousingBudget = Math.max(0, maxDebtAllowance - validMonthlyDebt);

  if (availableHousingBudget <= 0) {
    return insufficientBudgetResult(
      grossMonthlyIncome,
      validMonthlyDebt,
      maxDebtAllowance,
      0,
      validDownPayment
    );
  }

  const affordablePrice = solveAffordablePrice(
    availableHousingBudget,
    validDownPayment,
    validInterestRate,
    validLoanTerm,
    validPropertyTaxRate,
    validHomeInsurance,
    validHoaFees
  );

  if (affordablePrice <= 0) {
    // Fixed costs (insurance, HOA, taxes) alone consume the available budget
    // before any purchase price becomes affordable.
    return insufficientBudgetResult(
      grossMonthlyIncome,
      validMonthlyDebt,
      maxDebtAllowance,
      availableHousingBudget,
      validDownPayment
    );
  }

  const breakdown = monthlyHousingPaymentForPrice(
    affordablePrice,
    validDownPayment,
    validInterestRate,
    validLoanTerm,
    validPropertyTaxRate,
    validHomeInsurance,
    validHoaFees
  );

  const values = [
    affordablePrice,
    breakdown.baseLoanAmount,
    breakdown.principalAndInterest,
    breakdown.propertyTaxes,
    breakdown.mortgageInsurance,
    breakdown.total,
  ];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    return {
      errors: { annualIncome: "These values are too large to calculate safely." },
      result: null,
    };
  }

  return {
    errors: {},
    result: {
      budgetAvailable: true,
      affordablePrice,
      loanAmount: breakdown.baseLoanAmount,
      downPayment: validDownPayment,
      grossMonthlyIncome,
      monthlyDebt: validMonthlyDebt,
      maxDebtAllowance,
      availableHousingBudget,
      totalMonthlyPayment: breakdown.total,
      principalAndInterest: breakdown.principalAndInterest,
      propertyTaxes: breakdown.propertyTaxes,
      homeownersInsurance: validHomeInsurance,
      mortgageInsurance: breakdown.mortgageInsurance,
      hoa: validHoaFees,
    },
  };
}

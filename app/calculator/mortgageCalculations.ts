export const ANNUAL_PMI_RATE = 0.005;
export const FHA_UPFRONT_MIP_RATE = 0.0175;
export const ANNUAL_FHA_MIP_RATE = 0.0055;

export type LoanType = "conventional" | "fha";
export type DownPaymentType = "percentage" | "fixed";

export type MortgageInputs = {
  loanType: LoanType;
  purchasePrice: string;
  downPaymentType: DownPaymentType;
  downPayment: string;
  interestRate: string;
  loanTerm: string;
  propertyTaxRate: string;
  homeInsurance: string;
  hoaFees: string;
};

export type MortgageField = Exclude<keyof MortgageInputs, "loanType" | "downPaymentType">;
export type MortgageErrors = Partial<Record<MortgageField, string>>;

export type MortgageResult = {
  baseLoanAmount: number;
  upfrontFhaMip: number;
  financedLoanAmount: number;
  loanToValue: number;
  principalAndInterest: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  mortgageInsurance: number;
  hoa: number;
  totalMonthlyPayment: number;
  monthlyInterestRate: number;
  totalPayments: number;
};

export type MortgageCalculation = {
  errors: MortgageErrors;
  result: MortgageResult | null;
};

const parseRequiredNumber = (value: string) => {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const monthlyPrincipalAndInterest = (
  principal: number,
  annualRatePercent: number,
  totalPayments: number
) => {
  if (principal === 0) return 0;

  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) return principal / totalPayments;

  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
};

export function calculateMortgage(inputs: MortgageInputs): MortgageCalculation {
  const errors: MortgageErrors = {};
  const price = parseRequiredNumber(inputs.purchasePrice);
  const downPaymentInput = parseRequiredNumber(inputs.downPayment);
  const annualInterestRate = parseRequiredNumber(inputs.interestRate);
  const termYears = parseRequiredNumber(inputs.loanTerm);
  const propertyTaxRate = parseRequiredNumber(inputs.propertyTaxRate);
  const homeownersInsurance = parseRequiredNumber(inputs.homeInsurance);
  const hoa = parseRequiredNumber(inputs.hoaFees);

  if (price === null || price <= 0) {
    errors.purchasePrice = "Purchase price must be greater than $0.";
  }
  if (downPaymentInput === null) {
    errors.downPayment = "Enter a valid down payment.";
  } else if (downPaymentInput < 0) {
    errors.downPayment = "Down payment cannot be negative.";
  }
  if (annualInterestRate === null) {
    errors.interestRate = "Enter a valid interest rate.";
  } else if (annualInterestRate < 0) {
    errors.interestRate = "Interest rate cannot be negative.";
  }
  if (termYears === null || termYears <= 0) {
    errors.loanTerm = "Loan term must be a valid positive number.";
  } else if (!Number.isInteger(termYears * 12)) {
    errors.loanTerm = "Loan term must be entered in whole months.";
  } else if (termYears > 100) {
    errors.loanTerm = "Loan term cannot exceed 100 years.";
  }
  if (propertyTaxRate === null) {
    errors.propertyTaxRate = "Enter a valid property tax rate.";
  } else if (propertyTaxRate < 0) {
    errors.propertyTaxRate = "Property taxes cannot be negative.";
  }
  if (homeownersInsurance === null) {
    errors.homeInsurance = "Enter a valid homeowners insurance amount.";
  } else if (homeownersInsurance < 0) {
    errors.homeInsurance = "Homeowners insurance cannot be negative.";
  }
  if (hoa === null) {
    errors.hoaFees = "Enter a valid HOA amount.";
  } else if (hoa < 0) {
    errors.hoaFees = "HOA cannot be negative.";
  }

  let downPaymentAmount: number | null = null;
  if (price !== null && price > 0 && downPaymentInput !== null && downPaymentInput >= 0) {
    downPaymentAmount =
      inputs.downPaymentType === "percentage"
        ? price * (downPaymentInput / 100)
        : downPaymentInput;

    if (!Number.isFinite(downPaymentAmount)) {
      errors.downPayment = "Enter a valid down payment.";
    } else if (downPaymentAmount > price) {
      errors.downPayment = "Down payment cannot exceed the purchase price.";
    } else if (inputs.loanType === "fha" && downPaymentAmount < price * 0.035) {
      errors.downPayment = "FHA loans require a down payment of at least 3.5%.";
    }
  }

  if (Object.keys(errors).length > 0 || downPaymentAmount === null) {
    return { errors, result: null };
  }

  const validPrice = price as number;
  const validAnnualInterestRate = annualInterestRate as number;
  const validTermYears = termYears as number;
  const validPropertyTaxRate = propertyTaxRate as number;
  const validHomeownersInsurance = homeownersInsurance as number;
  const validHoa = hoa as number;
  const baseLoanAmount = validPrice - downPaymentAmount;
  const loanToValue = baseLoanAmount / validPrice;
  const upfrontFhaMip =
    inputs.loanType === "fha" ? baseLoanAmount * FHA_UPFRONT_MIP_RATE : 0;
  const financedLoanAmount = baseLoanAmount + upfrontFhaMip;
  const principalBalance =
    inputs.loanType === "fha" ? financedLoanAmount : baseLoanAmount;
  const totalPayments = validTermYears * 12;
  const principalAndInterest = monthlyPrincipalAndInterest(
    principalBalance,
    validAnnualInterestRate,
    totalPayments
  );
  const propertyTaxes = validPrice * (validPropertyTaxRate / 100) / 12;
  const mortgageInsurance =
    inputs.loanType === "fha"
      ? baseLoanAmount * ANNUAL_FHA_MIP_RATE / 12
      : downPaymentAmount < validPrice * 0.2
        ? baseLoanAmount * ANNUAL_PMI_RATE / 12
        : 0;
  const totalMonthlyPayment =
    principalAndInterest +
    propertyTaxes +
    validHomeownersInsurance +
    mortgageInsurance +
    validHoa;

  const values = [
    baseLoanAmount,
    upfrontFhaMip,
    financedLoanAmount,
    principalAndInterest,
    propertyTaxes,
    mortgageInsurance,
    totalMonthlyPayment,
  ];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    return {
      errors: { purchasePrice: "These values are too large to calculate safely." },
      result: null,
    };
  }

  return {
    errors: {},
    result: {
      baseLoanAmount,
      upfrontFhaMip,
      financedLoanAmount,
      loanToValue,
      principalAndInterest,
      propertyTaxes,
      homeownersInsurance: validHomeownersInsurance,
      mortgageInsurance,
      hoa: validHoa,
      totalMonthlyPayment,
      monthlyInterestRate: validAnnualInterestRate / 100 / 12,
      totalPayments,
    },
  };
}

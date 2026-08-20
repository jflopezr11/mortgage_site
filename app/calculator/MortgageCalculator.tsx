"use client";

import { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import {
  calculateMortgage,
  type DownPaymentType,
  type LoanType,
  type MortgageErrors,
  type MortgageField,
  type MortgageResult,
} from "./mortgageCalculations";

ChartJS.register(ArcElement, Tooltip, Legend);

type AmortizationScheduleItem = {
  month: number;
  interestPayment: number;
  principalPayment: number;
  balance: number;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const percentageFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const generateAmortizationSchedule = (
  loanAmount: number,
  monthlyPayment: number,
  monthlyRate: number,
  totalPayments: number
): AmortizationScheduleItem[] => {
  if (loanAmount === 0) return [];

  let balance = loanAmount;
  const schedule: AmortizationScheduleItem[] = [];

  for (let month = 1; month <= totalPayments; month += 1) {
    const interestPayment = balance * monthlyRate;
    const scheduledPrincipal = monthlyPayment - interestPayment;
    const principalPayment = Math.min(balance, scheduledPrincipal);
    balance = Math.max(0, balance - principalPayment);
    schedule.push({ month, interestPayment, principalPayment, balance });
  }

  return schedule;
};

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-sm text-red-600">{message}</p> : null;

const inputClassName = (hasError: boolean) =>
  `mt-1 w-full rounded border p-2 ${hasError ? "border-red-500" : "border-gray-300"}`;

export default function MortgageCalculator() {
  const [loanType, setLoanType] = useState<LoanType>("conventional");
  const [firstTimeHomebuyer, setFirstTimeHomebuyer] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPaymentType, setDownPaymentType] =
    useState<DownPaymentType>("percentage");
  const [downPayment, setDownPayment] = useState("5");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.25");
  const [homeInsurance, setHomeInsurance] = useState("125");
  const [hoaFees, setHoaFees] = useState("0");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const calculation = useMemo(
    () =>
      calculateMortgage({
        loanType,
        firstTimeHomebuyer,
        purchasePrice,
        downPaymentType,
        downPayment,
        interestRate,
        loanTerm,
        propertyTaxRate,
        homeInsurance,
        hoaFees,
      }),
    [
      loanType,
      firstTimeHomebuyer,
      purchasePrice,
      downPaymentType,
      downPayment,
      interestRate,
      loanTerm,
      propertyTaxRate,
      homeInsurance,
      hoaFees,
    ]
  );

  const result = hasSubmitted ? calculation.result : null;
  const errors: MortgageErrors = hasSubmitted ? calculation.errors : {};

  const principalBalance = result
    ? loanType === "fha"
      ? result.financedLoanAmount
      : result.baseLoanAmount
    : 0;
  const amortizationSchedule = useMemo(
    () =>
      result
        ? generateAmortizationSchedule(
            principalBalance,
            result.principalAndInterest,
            result.monthlyInterestRate,
            result.totalPayments
          )
        : [],
    [principalBalance, result]
  );

  const chartData: ChartData<"doughnut", number[], string> | null = result
    ? {
        labels: [
          "Principal & interest",
          "Property taxes",
          "Homeowners insurance",
          "Mortgage insurance",
          "HOA",
        ],
        datasets: [
          {
            data: [
              result.principalAndInterest,
              result.propertyTaxes,
              result.homeownersInsurance,
              result.mortgageInsurance,
              result.hoa,
            ],
            backgroundColor: ["#3b82f6", "#14b8a6", "#f59e0b", "#8b5cf6", "#64748b"],
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      }
    : null;

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${formatCurrency(context.parsed)}`,
        },
      },
    },
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
  };

  const minimumDownPaymentPercentage =
    loanType === "fha" ? 3.5 : firstTimeHomebuyer ? 3 : 5;
  const parsedPurchasePrice = Number(purchasePrice);
  const minimumDownPayment =
    downPaymentType === "percentage"
      ? minimumDownPaymentPercentage
      : Number.isFinite(parsedPurchasePrice) && parsedPurchasePrice > 0
        ? parsedPurchasePrice * (minimumDownPaymentPercentage / 100)
        : 0;

  const clampDownPayment = (
    nextLoanType: LoanType,
    nextFirstTimeHomebuyer: boolean,
    value = downPayment
  ) => {
    if (value.trim() === "") return;

    const parsedValue = Number(value);
    if (!Number.isFinite(parsedValue)) return;

    const minimumPercentage =
      nextLoanType === "fha" ? 3.5 : nextFirstTimeHomebuyer ? 3 : 5;
    const minimumValue =
      downPaymentType === "percentage"
        ? minimumPercentage
        : Number.isFinite(parsedPurchasePrice) && parsedPurchasePrice > 0
          ? parsedPurchasePrice * (minimumPercentage / 100)
          : null;

    if (minimumValue !== null && parsedValue < minimumValue) {
      setDownPayment(
        downPaymentType === "percentage" ? String(minimumValue) : minimumValue.toFixed(2)
      );
    }
  };

  const selectLoanType = (type: LoanType) => {
    setLoanType(type);
    clampDownPayment(type, firstTimeHomebuyer);
  };

  const toggleFirstTimeHomebuyer = (checked: boolean) => {
    setFirstTimeHomebuyer(checked);
    clampDownPayment("conventional", checked);
  };

  const fieldProps = (field: MortgageField) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
      <form onSubmit={submit} className="grid grid-cols-1 gap-6 sm:grid-cols-2" noValidate>
        <fieldset className="sm:col-span-2">
          <legend className="block text-sm font-medium">Loan Type</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
            {(["conventional", "fha"] as LoanType[]).map((type) => (
              <label
                key={type}
                className={`cursor-pointer rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
                  loanType === type ? "bg-blue-500 text-white shadow-sm" : "text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="loanType"
                  value={type}
                  checked={loanType === type}
                  onChange={() => selectLoanType(type)}
                  className="sr-only"
                />
                {type === "conventional" ? "Conventional" : "FHA"}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium">Purchase Price</label>
          <input
            id="purchasePrice"
            type="number"
            inputMode="decimal"
            placeholder="Purchase Price"
            value={purchasePrice}
            onChange={(event) => setPurchasePrice(event.target.value)}
            className={inputClassName(Boolean(errors.purchasePrice))}
            min="0"
            step="any"
            {...fieldProps("purchasePrice")}
          />
          <div id="purchasePrice-error"><FieldError message={errors.purchasePrice} /></div>
        </div>

        <div>
          <label htmlFor="downPaymentType" className="block text-sm font-medium">Down Payment Type</label>
          <select
            id="downPaymentType"
            value={downPaymentType}
            onChange={(event) => setDownPaymentType(event.target.value as DownPaymentType)}
            className="mt-1 w-full rounded border border-gray-300 p-2"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>
        </div>

        <div>
          <label htmlFor="downPayment" className="block text-sm font-medium">Down Payment</label>
          <input
            id="downPayment"
            type="number"
            inputMode="decimal"
            placeholder={downPaymentType === "percentage" ? "Down Payment (%)" : "Down Payment ($)"}
            value={downPayment}
            onChange={(event) => setDownPayment(event.target.value)}
            onBlur={(event) => clampDownPayment(loanType, firstTimeHomebuyer, event.target.value)}
            className={inputClassName(Boolean(errors.downPayment))}
            min={minimumDownPayment}
            step="any"
            {...fieldProps("downPayment")}
          />
          <div id="downPayment-error"><FieldError message={errors.downPayment} /></div>
          {loanType === "conventional" && (
            <div className="mt-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={firstTimeHomebuyer}
                  onChange={(event) => toggleFirstTimeHomebuyer(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                First-time homebuyer
              </label>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                3% down conventional financing is subject to borrower and program eligibility.
              </p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium">Interest Rate (%)</label>
          <input
            id="interestRate"
            type="number"
            inputMode="decimal"
            placeholder="Interest Rate (%)"
            value={interestRate}
            onChange={(event) => setInterestRate(event.target.value)}
            className={inputClassName(Boolean(errors.interestRate))}
            min="0"
            step="0.001"
            {...fieldProps("interestRate")}
          />
          <div id="interestRate-error"><FieldError message={errors.interestRate} /></div>
        </div>

        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium">Loan Term (Years)</label>
          <input
            id="loanTerm"
            type="number"
            inputMode="decimal"
            placeholder="Loan Term (Years)"
            value={loanTerm}
            onChange={(event) => setLoanTerm(event.target.value)}
            className={inputClassName(Boolean(errors.loanTerm))}
            min="0"
            max="100"
            step="1"
            {...fieldProps("loanTerm")}
          />
          <div id="loanTerm-error"><FieldError message={errors.loanTerm} /></div>
        </div>

        <div>
          <label htmlFor="propertyTaxRate" className="block text-sm font-medium">Property Tax Rate (%)</label>
          <input
            id="propertyTaxRate"
            type="number"
            inputMode="decimal"
            value={propertyTaxRate}
            onChange={(event) => setPropertyTaxRate(event.target.value)}
            className={inputClassName(Boolean(errors.propertyTaxRate))}
            step="0.01"
            min="0"
            {...fieldProps("propertyTaxRate")}
          />
          <div id="propertyTaxRate-error"><FieldError message={errors.propertyTaxRate} /></div>
        </div>

        <div>
          <label htmlFor="homeInsurance" className="block text-sm font-medium">Homeowners Insurance ($/month)</label>
          <input
            id="homeInsurance"
            type="number"
            inputMode="decimal"
            value={homeInsurance}
            onChange={(event) => setHomeInsurance(event.target.value)}
            className={inputClassName(Boolean(errors.homeInsurance))}
            step="0.01"
            min="0"
            {...fieldProps("homeInsurance")}
          />
          <div id="homeInsurance-error"><FieldError message={errors.homeInsurance} /></div>
        </div>

        <div>
          <label htmlFor="hoaFees" className="block text-sm font-medium">HOA Fees ($/month)</label>
          <input
            id="hoaFees"
            type="number"
            inputMode="decimal"
            value={hoaFees}
            onChange={(event) => setHoaFees(event.target.value)}
            className={inputClassName(Boolean(errors.hoaFees))}
            step="0.01"
            min="0"
            {...fieldProps("hoaFees")}
          />
          <div id="hoaFees-error"><FieldError message={errors.hoaFees} /></div>
        </div>

        <div className="sm:col-span-2">
          <button type="submit" className="mt-4 w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-700">
            Calculate
          </button>
        </div>
      </form>

      {hasSubmitted && !result && (
        <p className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
          Please correct the highlighted fields to calculate your estimate.
        </p>
      )}

      {result && <MortgageResults loanType={loanType} result={result} />}

      {chartData && (
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-bold">Estimated Monthly Payment Breakdown</h3>
          <div className="h-80">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {amortizationSchedule.length > 0 && (
        <div className="mt-6 max-h-64 overflow-y-auto">
          <h3 className="mb-4 text-lg font-bold">Amortization Schedule</h3>
          <table className="w-full table-auto text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2">Interest Payment</th>
                <th className="px-4 py-2">Principal Payment</th>
                <th className="px-4 py-2">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row) => (
                <tr key={row.month}>
                  <td className="px-4 py-2">{row.month}</td>
                  <td className="px-4 py-2">{formatCurrency(row.interestPayment)}</td>
                  <td className="px-4 py-2">{formatCurrency(row.principalPayment)}</td>
                  <td className="px-4 py-2">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result && (
        <p className="mt-6 border-t pt-4 text-xs leading-relaxed text-gray-600">
          This calculator provides an educational estimate only. Actual payments, rates, taxes,
          insurance, mortgage insurance, closing costs, and qualification requirements may vary.
          This is not a Loan Estimate, approval, or commitment to lend.
        </p>
      )}
    </div>
  );
}

function MortgageResults({ loanType, result }: { loanType: LoanType; result: MortgageResult }) {
  const breakdown = [
    ["Principal and interest", result.principalAndInterest],
    ["Property taxes", result.propertyTaxes],
    ["Homeowners insurance", result.homeownersInsurance],
    [loanType === "fha" ? "Estimated FHA mortgage insurance" : "Estimated PMI", result.mortgageInsurance],
    ["HOA", result.hoa],
  ] as const;

  return (
    <section className="mt-6 rounded-lg bg-blue-50 p-5" aria-live="polite">
      <p className="text-sm font-medium text-gray-700">Estimated Total Monthly Housing Payment</p>
      <p className="mt-1 text-3xl font-bold text-blue-700">{formatCurrency(result.totalMonthlyPayment)}</p>

      <dl className="mt-5 space-y-2 border-t border-blue-100 pt-4">
        {breakdown.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <dt className="text-sm text-gray-700">{label}</dt>
            <dd className="font-medium">{formatCurrency(value)}</dd>
          </div>
        ))}
      </dl>

      <dl className="mt-5 space-y-2 border-t border-blue-100 pt-4">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">
            Down payment ({percentageFormatter.format(result.downPaymentPercentage)}%)
          </dt>
          <dd className="font-medium">{formatCurrency(result.downPaymentAmount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">Base loan amount</dt>
          <dd className="font-medium">{formatCurrency(result.baseLoanAmount)}</dd>
        </div>
        {loanType === "fha" && (
          <>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-gray-700">Upfront FHA MIP (financed)</dt>
              <dd className="font-medium">{formatCurrency(result.upfrontFhaMip)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-gray-700">Financed FHA loan amount</dt>
              <dd className="font-medium">{formatCurrency(result.financedLoanAmount)}</dd>
            </div>
          </>
        )}
      </dl>

      {loanType === "fha" && (
        <p className="mt-3 text-xs leading-relaxed text-gray-600">
          The upfront FHA MIP is financed into the loan balance and is not added as a monthly expense.
        </p>
      )}

      {loanType === "conventional" && result.mortgageInsurance > 0 && (
        <p className="mt-4 text-xs leading-relaxed text-gray-600">
          Estimated PMI based on an assumed annual rate. Actual PMI depends on credit, loan structure,
          and the mortgage-insurance provider.
        </p>
      )}
      {loanType === "fha" && (
        <p className="mt-4 text-xs leading-relaxed text-gray-600">
          Estimated FHA mortgage insurance uses an assumed annual rate. Actual FHA MIP may vary based
          on the loan amount, term, loan-to-value ratio, and current FHA requirements.
        </p>
      )}
    </section>
  );
}

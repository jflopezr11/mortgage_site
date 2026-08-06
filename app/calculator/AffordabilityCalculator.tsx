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
  AFFORDABILITY_DTI_RATIO,
  calculateAffordability,
  type AffordabilityErrors,
  type AffordabilityField,
  type AffordabilityResult,
} from "./affordabilityCalculations";

ChartJS.register(ArcElement, Tooltip, Legend);

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-sm text-red-600">{message}</p> : null;

const inputClassName = (hasError: boolean) =>
  `mt-1 w-full rounded border p-2 ${hasError ? "border-red-500" : "border-gray-300"}`;

export default function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState("");
  const [monthlyDebt, setMonthlyDebt] = useState("");
  const [downPayment, setDownPayment] = useState("20000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.25");
  const [homeInsurance, setHomeInsurance] = useState("150");
  const [hoaFees, setHoaFees] = useState("0");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const calculation = useMemo(
    () =>
      calculateAffordability({
        annualIncome,
        monthlyDebt,
        downPayment,
        interestRate,
        loanTerm,
        propertyTaxRate,
        homeInsurance,
        hoaFees,
      }),
    [
      annualIncome,
      monthlyDebt,
      downPayment,
      interestRate,
      loanTerm,
      propertyTaxRate,
      homeInsurance,
      hoaFees,
    ]
  );

  const result = hasSubmitted ? calculation.result : null;
  const errors: AffordabilityErrors = hasSubmitted ? calculation.errors : {};

  const chartData: ChartData<"doughnut", number[], string> | null =
    result && result.budgetAvailable
      ? {
          labels: [
            "Principal & interest",
            "Property taxes",
            "Homeowners insurance",
            "Estimated PMI",
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

  const fieldProps = (field: AffordabilityField) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
      <form onSubmit={submit} className="grid grid-cols-1 gap-6 sm:grid-cols-2" noValidate>
        <div>
          <label htmlFor="annualIncome" className="block text-sm font-medium">Annual Gross Income</label>
          <input
            id="annualIncome"
            type="number"
            inputMode="decimal"
            placeholder="Annual Gross Income"
            value={annualIncome}
            onChange={(event) => setAnnualIncome(event.target.value)}
            className={inputClassName(Boolean(errors.annualIncome))}
            min="0"
            step="any"
            {...fieldProps("annualIncome")}
          />
          <p className="mt-1 text-xs text-gray-500">Income before taxes and deductions.</p>
          <div id="annualIncome-error"><FieldError message={errors.annualIncome} /></div>
        </div>

        <div>
          <label htmlFor="monthlyDebt" className="block text-sm font-medium">Monthly Debt Payments</label>
          <input
            id="monthlyDebt"
            type="number"
            inputMode="decimal"
            placeholder="Monthly Debt Payments"
            value={monthlyDebt}
            onChange={(event) => setMonthlyDebt(event.target.value)}
            className={inputClassName(Boolean(errors.monthlyDebt))}
            min="0"
            step="any"
            {...fieldProps("monthlyDebt")}
          />
          <p className="mt-1 text-xs text-gray-500">
            Auto loans, student loans, credit-card minimums, and other required monthly debts.
          </p>
          <div id="monthlyDebt-error"><FieldError message={errors.monthlyDebt} /></div>
        </div>

        <div>
          <label htmlFor="downPayment" className="block text-sm font-medium">Down Payment ($)</label>
          <input
            id="downPayment"
            type="number"
            inputMode="decimal"
            value={downPayment}
            onChange={(event) => setDownPayment(event.target.value)}
            className={inputClassName(Boolean(errors.downPayment))}
            min="0"
            step="any"
            {...fieldProps("downPayment")}
          />
          <div id="downPayment-error"><FieldError message={errors.downPayment} /></div>
        </div>

        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium">Estimated Interest Rate (%)</label>
          <input
            id="interestRate"
            type="number"
            inputMode="decimal"
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
          <label htmlFor="propertyTaxRate" className="block text-sm font-medium">Property Tax Rate (%/year)</label>
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
          <label htmlFor="hoaFees" className="block text-sm font-medium">HOA Dues ($/month)</label>
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

      {result && !result.budgetAvailable && (
        <div className="mt-5 rounded-md bg-amber-50 p-4 text-sm text-amber-800" role="alert">
          <p className="font-medium">No housing budget available</p>
          <p className="mt-1">
            Based on the information entered and the 40% DTI planning assumption, no additional
            monthly housing payment is available. This does not necessarily mean you cannot
            qualify for a mortgage. A licensed loan professional can review the full scenario.
          </p>
        </div>
      )}

      {result && result.budgetAvailable && <AffordabilityResults result={result} />}

      {chartData && (
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-bold">Estimated Monthly Payment Breakdown</h3>
          <div className="h-80">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {result && result.budgetAvailable && (
        <div className="mt-6 rounded-md bg-gray-50 p-4 text-xs leading-relaxed text-gray-600">
          <p className="mb-2 font-medium text-gray-700">How this estimate works</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>This calculator uses gross income, which is income before taxes and deductions.</li>
            <li>Monthly debt payments reduce the amount available for housing costs.</li>
            <li>The total housing payment includes more than principal and interest — taxes, insurance, PMI, and HOA all count.</li>
            <li>A larger down payment can reduce the loan amount and may eliminate estimated PMI.</li>
            <li>Property taxes rise as the estimated home price rises.</li>
            <li>This estimate does not account for every underwriting or loan-program requirement.</li>
          </ul>
        </div>
      )}

      {result && (
        <p className="mt-6 border-t pt-4 text-xs leading-relaxed text-gray-600">
          This calculator provides an educational planning estimate only. It is not a
          preapproval, Loan Estimate, approval, or commitment to lend. Actual affordability and
          qualification depend on the loan program, credit, verified income, assets, debts,
          property taxes, insurance, mortgage insurance, HOA dues, interest rate, closing costs,
          reserves, and underwriting requirements. Closing costs and required reserves are not
          included in the down payment shown.
        </p>
      )}
    </div>
  );
}

function AffordabilityResults({ result }: { result: AffordabilityResult }) {
  const breakdown = [
    ["Principal and interest", result.principalAndInterest],
    ["Property taxes", result.propertyTaxes],
    ["Homeowners insurance", result.homeownersInsurance],
    ["Estimated PMI", result.mortgageInsurance],
    ["HOA", result.hoa],
  ] as const;

  return (
    <section className="mt-6 rounded-lg bg-blue-50 p-5" aria-live="polite">
      <p className="text-sm font-medium text-gray-700">Estimated Affordable Home Price</p>
      <p className="mt-1 text-3xl font-bold text-blue-700">{formatCurrency(result.affordablePrice)}</p>
      <p className="mt-2 text-xs text-gray-600">
        Based on the assumptions you entered. This is an educational estimate, not a guaranteed
        maximum or preapproval amount.
      </p>

      <dl className="mt-4 space-y-2 border-t border-blue-100 pt-4">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">Estimated loan amount</dt>
          <dd className="font-medium">{formatCurrency(result.loanAmount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">Down payment</dt>
          <dd className="font-medium">{formatCurrency(result.downPayment)}</dd>
        </div>
      </dl>

      <div className="mt-5 rounded-md border border-blue-100 bg-white p-4">
        <p className="text-sm font-medium text-gray-700">Estimated Total Monthly Housing Payment</p>
        <p className="mt-1 text-2xl font-bold text-blue-700">{formatCurrency(result.totalMonthlyPayment)}</p>

        <dl className="mt-4 space-y-2 border-t border-gray-100 pt-4">
          {breakdown.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4">
              <dt className="text-sm text-gray-700">{label}</dt>
              <dd className="font-medium">{formatCurrency(value)}</dd>
            </div>
          ))}
        </dl>
      </div>

      <dl className="mt-5 space-y-2 border-t border-blue-100 pt-4">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">Gross monthly income</dt>
          <dd className="font-medium">{formatCurrency(result.grossMonthlyIncome)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">Monthly debt payments</dt>
          <dd className="font-medium">{formatCurrency(result.monthlyDebt)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">DTI assumption used</dt>
          <dd className="font-medium">{Math.round(AFFORDABILITY_DTI_RATIO * 100)}%</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">Available monthly housing budget</dt>
          <dd className="font-medium">{formatCurrency(result.availableHousingBudget)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs leading-relaxed text-gray-600">
        Calculated using a {Math.round(AFFORDABILITY_DTI_RATIO * 100)}% total debt-to-income
        planning guideline. Actual qualification may be higher or lower depending on the loan
        program, credit, income documentation, assets, reserves, and underwriting findings.
      </p>

      {result.mortgageInsurance > 0 && (
        <p className="mt-4 text-xs leading-relaxed text-gray-600">
          Estimated PMI uses an assumed annual rate of 0.50%. Actual PMI depends on credit, down
          payment, loan structure, and the mortgage-insurance provider.
        </p>
      )}
    </section>
  );
}

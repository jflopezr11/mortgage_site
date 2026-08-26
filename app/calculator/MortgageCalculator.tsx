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
import type { Locale } from "@/lib/i18n/config";

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

const mortgageCopy = {
  en: { loanType: "Loan Type", conventional: "Conventional", purchasePrice: "Purchase Price", downType: "Down Payment Type", percentage: "Percentage (%)", fixed: "Fixed Amount ($)", down: "Down Payment", firstTime: "First-time homebuyer", firstTimeNote: "3% down conventional financing is subject to borrower and program eligibility.", rate: "Interest Rate (%)", term: "Loan Term (Years)", tax: "Property Tax Rate (%)", insurance: "Homeowners Insurance ($/month)", hoa: "HOA Fees ($/month)", calculate: "Calculate", correct: "Please correct the highlighted fields to calculate your estimate.", chart: "Estimated Monthly Payment Breakdown", amortization: "Amortization Schedule", month: "Month", interestPayment: "Interest Payment", principalPayment: "Principal Payment", balance: "Remaining Balance", disclaimer: "This calculator provides an educational estimate only. Actual payments, rates, taxes, insurance, mortgage insurance, closing costs, and qualification requirements may vary. This is not a Loan Estimate, approval, or commitment to lend.", total: "Estimated Total Monthly Housing Payment", principal: "Principal and interest", taxes: "Property taxes", homeowners: "Homeowners insurance", fhaInsurance: "Estimated FHA mortgage insurance", pmi: "Estimated PMI", downPayment: "Down payment", baseLoan: "Base loan amount", upfrontMip: "Upfront FHA MIP (financed)", financedLoan: "Financed FHA loan amount", fhaNote: "The upfront FHA MIP is financed into the loan balance and is not added as a monthly expense.", pmiNote: "Estimated PMI based on an assumed annual rate. Actual PMI depends on credit, loan structure, and the mortgage-insurance provider.", fhaEstimateNote: "Estimated FHA mortgage insurance uses an assumed annual rate. Actual FHA MIP may vary based on the loan amount, term, loan-to-value ratio, and current FHA requirements.", fieldError: "Review this value." },
  es: { loanType: "Tipo de préstamo", conventional: "Convencional", purchasePrice: "Precio de compra", downType: "Tipo de pago inicial", percentage: "Porcentaje (%)", fixed: "Monto fijo ($)", down: "Pago inicial", firstTime: "Comprador por primera vez", firstTimeNote: "El financiamiento convencional con 3% de pago inicial está sujeto a la elegibilidad del prestatario y del programa.", rate: "Tasa de interés (%)", term: "Plazo del préstamo (años)", tax: "Tasa de impuesto a la propiedad (%)", insurance: "Seguro de vivienda ($/mes)", hoa: "Cuotas de HOA ($/mes)", calculate: "Calcular", correct: "Corrija los campos resaltados para calcular su estimación.", chart: "Desglose del pago mensual estimado", amortization: "Tabla de amortización", month: "Mes", interestPayment: "Pago de intereses", principalPayment: "Pago de capital", balance: "Saldo restante", disclaimer: "Esta calculadora ofrece únicamente una estimación educativa. Los pagos, tasas, impuestos, seguros, seguro hipotecario, costos de cierre y requisitos reales pueden variar. No es una Estimación de Préstamo, aprobación ni compromiso de prestar.", total: "Pago mensual total estimado de vivienda", principal: "Capital e intereses", taxes: "Impuestos a la propiedad", homeowners: "Seguro de vivienda", fhaInsurance: "Seguro hipotecario FHA estimado", pmi: "PMI estimado", downPayment: "Pago inicial", baseLoan: "Monto base del préstamo", upfrontMip: "MIP inicial de FHA (financiado)", financedLoan: "Monto financiado del préstamo FHA", fhaNote: "El MIP inicial de FHA se financia dentro del saldo y no se agrega como gasto mensual.", pmiNote: "El PMI estimado usa una tasa anual supuesta. El PMI real depende del crédito, la estructura del préstamo y el proveedor del seguro.", fhaEstimateNote: "El seguro hipotecario FHA estimado usa una tasa anual supuesta. El MIP real puede variar según el monto, plazo, relación préstamo-valor y requisitos vigentes de FHA.", fieldError: "Revise este valor." },
} as const;

export default function MortgageCalculator({ locale = "en" }: { locale?: Locale }) {
  const copy = mortgageCopy[locale];
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
        labels: [copy.principal, copy.taxes, copy.homeowners, locale === "es" ? "Seguro hipotecario" : "Mortgage insurance", "HOA"],
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
          <legend className="block text-sm font-medium">{copy.loanType}</legend>
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
                {type === "conventional" ? copy.conventional : "FHA"}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium">{copy.purchasePrice}</label>
          <input
            id="purchasePrice"
            type="number"
            inputMode="decimal"
            placeholder={copy.purchasePrice}
            value={purchasePrice}
            onChange={(event) => setPurchasePrice(event.target.value)}
            className={inputClassName(Boolean(errors.purchasePrice))}
            min="0"
            step="any"
            {...fieldProps("purchasePrice")}
          />
          <div id="purchasePrice-error"><FieldError message={errors.purchasePrice ? (locale === "es" ? copy.fieldError : errors.purchasePrice) : undefined} /></div>
        </div>

        <div>
          <label htmlFor="downPaymentType" className="block text-sm font-medium">{copy.downType}</label>
          <select
            id="downPaymentType"
            value={downPaymentType}
            onChange={(event) => setDownPaymentType(event.target.value as DownPaymentType)}
            className="mt-1 w-full rounded border border-gray-300 p-2"
          >
            <option value="percentage">{copy.percentage}</option>
            <option value="fixed">{copy.fixed}</option>
          </select>
        </div>

        <div>
          <label htmlFor="downPayment" className="block text-sm font-medium">{copy.down}</label>
          <input
            id="downPayment"
            type="number"
            inputMode="decimal"
            placeholder={`${copy.down} ${downPaymentType === "percentage" ? "(%)" : "($)"}`}
            value={downPayment}
            onChange={(event) => setDownPayment(event.target.value)}
            onBlur={(event) => clampDownPayment(loanType, firstTimeHomebuyer, event.target.value)}
            className={inputClassName(Boolean(errors.downPayment))}
            min={minimumDownPayment}
            step="any"
            {...fieldProps("downPayment")}
          />
          <div id="downPayment-error"><FieldError message={errors.downPayment ? (locale === "es" ? copy.fieldError : errors.downPayment) : undefined} /></div>
          {loanType === "conventional" && (
            <div className="mt-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={firstTimeHomebuyer}
                  onChange={(event) => toggleFirstTimeHomebuyer(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                {copy.firstTime}
              </label>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                {copy.firstTimeNote}
              </p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium">{copy.rate}</label>
          <input
            id="interestRate"
            type="number"
            inputMode="decimal"
            placeholder={copy.rate}
            value={interestRate}
            onChange={(event) => setInterestRate(event.target.value)}
            className={inputClassName(Boolean(errors.interestRate))}
            min="0"
            step="0.001"
            {...fieldProps("interestRate")}
          />
          <div id="interestRate-error"><FieldError message={errors.interestRate ? (locale === "es" ? copy.fieldError : errors.interestRate) : undefined} /></div>
        </div>

        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium">{copy.term}</label>
          <input
            id="loanTerm"
            type="number"
            inputMode="decimal"
            placeholder={copy.term}
            value={loanTerm}
            onChange={(event) => setLoanTerm(event.target.value)}
            className={inputClassName(Boolean(errors.loanTerm))}
            min="0"
            max="100"
            step="1"
            {...fieldProps("loanTerm")}
          />
          <div id="loanTerm-error"><FieldError message={errors.loanTerm ? (locale === "es" ? copy.fieldError : errors.loanTerm) : undefined} /></div>
        </div>

        <div>
          <label htmlFor="propertyTaxRate" className="block text-sm font-medium">{copy.tax}</label>
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
          <div id="propertyTaxRate-error"><FieldError message={errors.propertyTaxRate ? (locale === "es" ? copy.fieldError : errors.propertyTaxRate) : undefined} /></div>
        </div>

        <div>
          <label htmlFor="homeInsurance" className="block text-sm font-medium">{copy.insurance}</label>
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
          <div id="homeInsurance-error"><FieldError message={errors.homeInsurance ? (locale === "es" ? copy.fieldError : errors.homeInsurance) : undefined} /></div>
        </div>

        <div>
          <label htmlFor="hoaFees" className="block text-sm font-medium">{copy.hoa}</label>
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
          <div id="hoaFees-error"><FieldError message={errors.hoaFees ? (locale === "es" ? copy.fieldError : errors.hoaFees) : undefined} /></div>
        </div>

        <div className="sm:col-span-2">
          <button type="submit" className="mt-4 w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-700">
            {copy.calculate}
          </button>
        </div>
      </form>

      {hasSubmitted && !result && (
        <p className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
          {copy.correct}
        </p>
      )}

      {result && <MortgageResults loanType={loanType} result={result} locale={locale} />}

      {chartData && (
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-bold">{copy.chart}</h3>
          <div className="h-80">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {amortizationSchedule.length > 0 && (
        <div className="mt-6 max-h-64 overflow-y-auto">
          <h3 className="mb-4 text-lg font-bold">{copy.amortization}</h3>
          <table className="w-full table-auto text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">{copy.month}</th>
                <th className="px-4 py-2">{copy.interestPayment}</th>
                <th className="px-4 py-2">{copy.principalPayment}</th>
                <th className="px-4 py-2">{copy.balance}</th>
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
          {copy.disclaimer}
        </p>
      )}
    </div>
  );
}

function MortgageResults({ loanType, result, locale }: { loanType: LoanType; result: MortgageResult; locale: Locale }) {
  const copy = mortgageCopy[locale];
  const breakdown = [
    [copy.principal, result.principalAndInterest],
    [copy.taxes, result.propertyTaxes],
    [copy.homeowners, result.homeownersInsurance],
    [loanType === "fha" ? copy.fhaInsurance : copy.pmi, result.mortgageInsurance],
    ["HOA", result.hoa],
  ] as const;

  return (
    <section className="mt-6 rounded-lg bg-blue-50 p-5" aria-live="polite">
      <p className="text-sm font-medium text-gray-700">{copy.total}</p>
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
            {copy.downPayment} ({percentageFormatter.format(result.downPaymentPercentage)}%)
          </dt>
          <dd className="font-medium">{formatCurrency(result.downPaymentAmount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">{copy.baseLoan}</dt>
          <dd className="font-medium">{formatCurrency(result.baseLoanAmount)}</dd>
        </div>
        {loanType === "fha" && (
          <>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-gray-700">{copy.upfrontMip}</dt>
              <dd className="font-medium">{formatCurrency(result.upfrontFhaMip)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-gray-700">{copy.financedLoan}</dt>
              <dd className="font-medium">{formatCurrency(result.financedLoanAmount)}</dd>
            </div>
          </>
        )}
      </dl>

      {loanType === "fha" && (
        <p className="mt-3 text-xs leading-relaxed text-gray-600">
          {copy.fhaNote}
        </p>
      )}

      {loanType === "conventional" && result.mortgageInsurance > 0 && (
        <p className="mt-4 text-xs leading-relaxed text-gray-600">
          {copy.pmiNote}
        </p>
      )}
      {loanType === "fha" && (
        <p className="mt-4 text-xs leading-relaxed text-gray-600">
          {copy.fhaEstimateNote}
        </p>
      )}
    </section>
  );
}

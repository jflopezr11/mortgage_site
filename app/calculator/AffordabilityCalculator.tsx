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
import type { Locale } from "@/lib/i18n/config";

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

const affordabilityCopy = {
  en: { income: "Annual Gross Income", incomeNote: "Income before taxes and deductions.", debt: "Monthly Debt Payments", debtNote: "Auto loans, student loans, credit-card minimums, and other required monthly debts.", down: "Down Payment ($)", rate: "Estimated Interest Rate (%)", term: "Loan Term (Years)", tax: "Property Tax Rate (%/year)", insurance: "Homeowners Insurance ($/month)", hoa: "HOA Dues ($/month)", calculate: "Calculate", correct: "Please correct the highlighted fields to calculate your estimate.", noBudget: "No housing budget available", noBudgetCopy: "Based on the information entered and the 40% DTI planning assumption, no additional monthly housing payment is available. This does not necessarily mean you cannot qualify for a mortgage. A licensed loan professional can review the full scenario.", chart: "Estimated Monthly Payment Breakdown", how: "How this estimate works", howItems: ["This calculator uses gross income, which is income before taxes and deductions.", "Monthly debt payments reduce the amount available for housing costs.", "The total housing payment includes more than principal and interest — taxes, insurance, PMI, and HOA all count.", "A larger down payment can reduce the loan amount and may eliminate estimated PMI.", "Property taxes rise as the estimated home price rises.", "This estimate does not account for every underwriting or loan-program requirement."], disclaimer: "This calculator provides an educational planning estimate only. It is not a preapproval, Loan Estimate, approval, or commitment to lend. Actual affordability and qualification depend on the loan program, credit, verified income, assets, debts, property taxes, insurance, mortgage insurance, HOA dues, interest rate, closing costs, reserves, and underwriting requirements. Closing costs and required reserves are not included in the down payment shown.", affordable: "Estimated Affordable Home Price", estimateNote: "Based on the assumptions you entered. This is an educational estimate, not a guaranteed maximum or preapproval amount.", loanAmount: "Estimated loan amount", total: "Estimated Total Monthly Housing Payment", principal: "Principal and interest", taxes: "Property taxes", homeowners: "Homeowners insurance", pmi: "Estimated PMI", grossMonthly: "Gross monthly income", monthlyDebt: "Monthly debt payments", dti: "DTI assumption used", budget: "Available monthly housing budget", dtiNote: "Actual qualification may be higher or lower depending on the loan program, credit, income documentation, assets, reserves, and underwriting findings.", pmiNote: "Estimated PMI uses an assumed annual rate of 0.50%. Actual PMI depends on credit, down payment, loan structure, and the mortgage-insurance provider.", fieldError: "Review this value." },
  es: { income: "Ingreso bruto anual", incomeNote: "Ingresos antes de impuestos y deducciones.", debt: "Pagos mensuales de deudas", debtNote: "Préstamos de auto y estudiantiles, mínimos de tarjetas y otras deudas mensuales obligatorias.", down: "Pago inicial ($)", rate: "Tasa de interés estimada (%)", term: "Plazo del préstamo (años)", tax: "Tasa de impuesto a la propiedad (%/año)", insurance: "Seguro de vivienda ($/mes)", hoa: "Cuotas de HOA ($/mes)", calculate: "Calcular", correct: "Corrija los campos resaltados para calcular su estimación.", noBudget: "No hay presupuesto disponible para vivienda", noBudgetCopy: "Según la información ingresada y el supuesto de planificación de DTI del 40%, no hay un pago mensual adicional disponible para vivienda. Esto no significa necesariamente que no pueda calificar. Un profesional hipotecario con licencia puede revisar el escenario completo.", chart: "Desglose del pago mensual estimado", how: "Cómo funciona esta estimación", howItems: ["La calculadora usa ingresos brutos antes de impuestos y deducciones.", "Los pagos mensuales de deudas reducen el monto disponible para vivienda.", "El pago total incluye capital, intereses, impuestos, seguro, PMI y HOA.", "Un pago inicial mayor puede reducir el préstamo y eliminar el PMI estimado.", "Los impuestos aumentan con el precio estimado de la vivienda.", "La estimación no incluye todos los requisitos de suscripción o del programa."], disclaimer: "Esta calculadora ofrece únicamente una estimación educativa. No es una preaprobación, Estimación de Préstamo, aprobación ni compromiso de prestar. La asequibilidad y calificación reales dependen del programa, crédito, ingresos verificados, activos, deudas, impuestos, seguros, HOA, tasa, costos de cierre, reservas y suscripción. Los costos de cierre y reservas no están incluidos en el pago inicial mostrado.", affordable: "Precio de vivienda asequible estimado", estimateNote: "Basado en los supuestos ingresados. Es una estimación educativa, no un máximo garantizado ni una preaprobación.", loanAmount: "Monto estimado del préstamo", total: "Pago mensual total estimado de vivienda", principal: "Capital e intereses", taxes: "Impuestos a la propiedad", homeowners: "Seguro de vivienda", pmi: "PMI estimado", grossMonthly: "Ingreso bruto mensual", monthlyDebt: "Pagos mensuales de deudas", dti: "Supuesto de DTI utilizado", budget: "Presupuesto mensual disponible para vivienda", dtiNote: "La calificación real puede ser mayor o menor según el programa, crédito, documentación de ingresos, activos, reservas y resultados de suscripción.", pmiNote: "El PMI estimado usa una tasa anual supuesta de 0.50%. El PMI real depende del crédito, pago inicial, estructura y proveedor del seguro.", fieldError: "Revise este valor." },
} as const;

export default function AffordabilityCalculator({ locale = "en" }: { locale?: Locale }) {
  const copy = affordabilityCopy[locale];
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
  const rawErrors: AffordabilityErrors = hasSubmitted ? calculation.errors : {};
  const errors: AffordabilityErrors = locale === "es"
    ? Object.fromEntries(Object.keys(rawErrors).map((field) => [field, copy.fieldError])) as AffordabilityErrors
    : rawErrors;

  const chartData: ChartData<"doughnut", number[], string> | null =
    result && result.budgetAvailable
      ? {
          labels: [copy.principal, copy.taxes, copy.homeowners, copy.pmi, "HOA"],
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
          <label htmlFor="annualIncome" className="block text-sm font-medium">{copy.income}</label>
          <input
            id="annualIncome"
            type="number"
            inputMode="decimal"
            placeholder={copy.income}
            value={annualIncome}
            onChange={(event) => setAnnualIncome(event.target.value)}
            className={inputClassName(Boolean(errors.annualIncome))}
            min="0"
            step="any"
            {...fieldProps("annualIncome")}
          />
          <p className="mt-1 text-xs text-gray-500">{copy.incomeNote}</p>
          <div id="annualIncome-error"><FieldError message={errors.annualIncome ? (locale === "es" ? copy.fieldError : errors.annualIncome) : undefined} /></div>
        </div>

        <div>
          <label htmlFor="monthlyDebt" className="block text-sm font-medium">{copy.debt}</label>
          <input
            id="monthlyDebt"
            type="number"
            inputMode="decimal"
            placeholder={copy.debt}
            value={monthlyDebt}
            onChange={(event) => setMonthlyDebt(event.target.value)}
            className={inputClassName(Boolean(errors.monthlyDebt))}
            min="0"
            step="any"
            {...fieldProps("monthlyDebt")}
          />
          <p className="mt-1 text-xs text-gray-500">
            {copy.debtNote}
          </p>
          <div id="monthlyDebt-error"><FieldError message={errors.monthlyDebt ? (locale === "es" ? copy.fieldError : errors.monthlyDebt) : undefined} /></div>
        </div>

        <div>
          <label htmlFor="downPayment" className="block text-sm font-medium">{copy.down}</label>
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
          <label htmlFor="interestRate" className="block text-sm font-medium">{copy.rate}</label>
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
          <label htmlFor="loanTerm" className="block text-sm font-medium">{copy.term}</label>
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
          <div id="propertyTaxRate-error"><FieldError message={errors.propertyTaxRate} /></div>
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
          <div id="homeInsurance-error"><FieldError message={errors.homeInsurance} /></div>
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
          <div id="hoaFees-error"><FieldError message={errors.hoaFees} /></div>
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

      {result && !result.budgetAvailable && (
        <div className="mt-5 rounded-md bg-amber-50 p-4 text-sm text-amber-800" role="alert">
          <p className="font-medium">{copy.noBudget}</p>
          <p className="mt-1">
            {copy.noBudgetCopy}
          </p>
        </div>
      )}

      {result && result.budgetAvailable && <AffordabilityResults result={result} locale={locale} />}

      {chartData && (
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-bold">{copy.chart}</h3>
          <div className="h-80">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {result && result.budgetAvailable && (
        <div className="mt-6 rounded-md bg-gray-50 p-4 text-xs leading-relaxed text-gray-600">
          <p className="mb-2 font-medium text-gray-700">{copy.how}</p>
          <ul className="list-disc space-y-1 pl-4">
            {copy.howItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
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

function AffordabilityResults({ result, locale }: { result: AffordabilityResult; locale: Locale }) {
  const copy = affordabilityCopy[locale];
  const breakdown = [
    [copy.principal, result.principalAndInterest],
    [copy.taxes, result.propertyTaxes],
    [copy.homeowners, result.homeownersInsurance],
    [copy.pmi, result.mortgageInsurance],
    ["HOA", result.hoa],
  ] as const;

  return (
    <section className="mt-6 rounded-lg bg-blue-50 p-5" aria-live="polite">
      <p className="text-sm font-medium text-gray-700">{copy.affordable}</p>
      <p className="mt-1 text-3xl font-bold text-blue-700">{formatCurrency(result.affordablePrice)}</p>
      <p className="mt-2 text-xs text-gray-600">
        {copy.estimateNote}
      </p>

      <dl className="mt-4 space-y-2 border-t border-blue-100 pt-4">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">{copy.loanAmount}</dt>
          <dd className="font-medium">{formatCurrency(result.loanAmount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">{copy.down}</dt>
          <dd className="font-medium">{formatCurrency(result.downPayment)}</dd>
        </div>
      </dl>

      <div className="mt-5 rounded-md border border-blue-100 bg-white p-4">
        <p className="text-sm font-medium text-gray-700">{copy.total}</p>
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
          <dt className="text-sm text-gray-700">{copy.grossMonthly}</dt>
          <dd className="font-medium">{formatCurrency(result.grossMonthlyIncome)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">{copy.monthlyDebt}</dt>
          <dd className="font-medium">{formatCurrency(result.monthlyDebt)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">{copy.dti}</dt>
          <dd className="font-medium">{Math.round(AFFORDABILITY_DTI_RATIO * 100)}%</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-sm text-gray-700">{copy.budget}</dt>
          <dd className="font-medium">{formatCurrency(result.availableHousingBudget)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs leading-relaxed text-gray-600">
        {locale === "es" ? `Calculado con una guía de planificación de deuda total a ingresos del ${Math.round(AFFORDABILITY_DTI_RATIO * 100)}%. ` : `Calculated using a ${Math.round(AFFORDABILITY_DTI_RATIO * 100)}% total debt-to-income planning guideline. `}{copy.dtiNote}
      </p>

      {result.mortgageInsurance > 0 && (
        <p className="mt-4 text-xs leading-relaxed text-gray-600">
          {copy.pmiNote}
        </p>
      )}
    </section>
  );
}

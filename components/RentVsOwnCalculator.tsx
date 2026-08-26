"use client";

import { useState } from "react";
import HowItWorks from "@/app/calculator/HowItWorks";
import RentVsOwnNetCostChart from "@/app/calculator/RentVsOwnNetCostChart";
import {
  calculateRentVsOwn,
  validateRentVsOwnInputs,
  DEFAULT_HOME_APPRECIATION_RATE,
  DEFAULT_RENT_INCREASE_RATE,
  DEFAULT_MAINTENANCE_RATE,
  DEFAULT_BUYER_CLOSING_COST_RATE,
  DEFAULT_SELLING_COST_RATE,
  DEFAULT_TAX_ASSESSED_GROWTH_RATE,
  DEFAULT_INSURANCE_INCREASE_RATE,
  DEFAULT_HOA_INCREASE_RATE,
  type RentVsOwnResult,
  type LongTermSummary,
} from "@/app/calculator/rentVsOwnMath";
import type { Locale } from "@/lib/i18n/config";

const formatCurrency = (n: number) =>
  (isFinite(n) ? n : 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

function getConclusionSentence(longTerm: LongTermSummary, locale: Locale): string {
  const years = longTerm.years;
  const yearWord = locale === "es" ? (years === 1 ? "año" : "años") : (years === 1 ? "year" : "years");
  if (Math.abs(longTerm.difference) < 1) {
    return locale === "es" ? `Con los supuestos ingresados, alquilar y comprar tienen aproximadamente el mismo costo neto estimado después de ${years} ${yearWord}.` : `Under the assumptions entered, renting and owning have about the same estimated net housing cost after ${years} ${yearWord}.`;
  }
  if (longTerm.difference > 0) {
    return locale === "es" ? `Con los supuestos ingresados, alquilar tiene el costo neto estimado más bajo después de ${years} ${yearWord}.` : `Under the assumptions entered, renting has the lower estimated net housing cost after ${years} ${yearWord}.`;
  }
  return locale === "es" ? `Con los supuestos ingresados, comprar tiene el costo neto estimado más bajo después de ${years} ${yearWord}.` : `Under the assumptions entered, owning has the lower estimated net housing cost after ${years} ${yearWord}.`;
}

function getBreakEvenSentence(breakEvenYear: number | null, years: number, locale: Locale): string {
  if (breakEvenYear === null) {
    return locale === "es" ? `Con estos supuestos, no se alcanzó el punto de equilibrio dentro del período seleccionado de ${years} años.` : `Break-even was not reached within the selected ${years}-year period under these assumptions.`;
  }
  const yearWord = breakEvenYear === 1 ? "year" : "years";
  return locale === "es" ? `Con estos supuestos, el costo neto estimado de comprar iguala o baja del costo de alquilar cerca del año ${breakEvenYear}.` : `Under these assumptions, owning's estimated net cost first matches or drops below renting's around year ${breakEvenYear} (${breakEvenYear} ${yearWord} in).`;
}

export default function RentVsOwnCalculator({
  howItWorksContent,
  locale = "en",
}: {
  howItWorksContent: any;
  locale?: Locale;
}) {
  const tr = (en: string, es: string) => locale === "es" ? es : en;
  // --- Primary inputs -----------------------------------------------------
  const [monthlyRent, setMonthlyRent] = useState("");
  const [monthlyRentersInsurance, setMonthlyRentersInsurance] = useState("0");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPaymentType, setDownPaymentType] = useState<"percentage" | "fixed">("percentage");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [yearsInHome, setYearsInHome] = useState("7");
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.25");
  const [homeInsurance, setHomeInsurance] = useState("125");
  const [hoaFees, setHoaFees] = useState("0");

  // --- Advanced assumptions (editable planning defaults) -----------------
  const [homeAppreciationRate, setHomeAppreciationRate] = useState(String(DEFAULT_HOME_APPRECIATION_RATE));
  const [rentIncreaseRate, setRentIncreaseRate] = useState(String(DEFAULT_RENT_INCREASE_RATE));
  const [maintenanceRate, setMaintenanceRate] = useState(String(DEFAULT_MAINTENANCE_RATE));
  const [buyerClosingCostRate, setBuyerClosingCostRate] = useState(String(DEFAULT_BUYER_CLOSING_COST_RATE));
  const [sellingCostRate, setSellingCostRate] = useState(String(DEFAULT_SELLING_COST_RATE));
  const [taxAssessedGrowthRate, setTaxAssessedGrowthRate] = useState(String(DEFAULT_TAX_ASSESSED_GROWTH_RATE));
  const [insuranceIncreaseRate, setInsuranceIncreaseRate] = useState(String(DEFAULT_INSURANCE_INCREASE_RATE));
  const [hoaIncreaseRate, setHoaIncreaseRate] = useState(String(DEFAULT_HOA_INCREASE_RATE));

  const [result, setResult] = useState<RentVsOwnResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(purchasePrice);
    const downRaw = parseFloat(downPayment);
    const down =
      downPaymentType === "percentage"
        ? isFinite(price) && isFinite(downRaw)
          ? price * (downRaw / 100)
          : NaN
        : downRaw;

    const inputs = {
      monthlyRent: parseFloat(monthlyRent),
      monthlyRentersInsurance: parseFloat(monthlyRentersInsurance),
      purchasePrice: price,
      downPayment: down,
      interestRate: parseFloat(interestRate),
      loanTermYears: parseFloat(loanTerm),
      yearsInHome: parseFloat(yearsInHome),
      annualPropertyTaxRate: parseFloat(propertyTaxRate),
      monthlyHomeInsurance: parseFloat(homeInsurance),
      monthlyHoa: parseFloat(hoaFees),
      homeAppreciationRate: parseFloat(homeAppreciationRate),
      rentIncreaseRate: parseFloat(rentIncreaseRate),
      maintenanceRate: parseFloat(maintenanceRate),
      buyerClosingCostRate: parseFloat(buyerClosingCostRate),
      sellingCostRate: parseFloat(sellingCostRate),
      taxAssessedGrowthRate: parseFloat(taxAssessedGrowthRate),
      insuranceIncreaseRate: parseFloat(insuranceIncreaseRate),
      hoaIncreaseRate: parseFloat(hoaIncreaseRate),
    };

    const validationErrors = validateRentVsOwnInputs(inputs);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    setErrors([]);
    setResult(calculateRentVsOwn(inputs));
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-2">{tr("Rent vs Own Calculator", "Calculadora de alquilar vs. comprar")}</h2>
      <p className="text-sm text-gray-600 mb-6">
        {tr("Renting often costs less month to month, especially in Southern California. Owning may build equity over time through mortgage principal repayment and home appreciation. This calculator compares both sides honestly rather than assuming either one wins.", "Alquilar suele costar menos cada mes, especialmente en el sur de California. Comprar puede acumular valor con el pago de capital y la apreciación. Esta calculadora compara ambas opciones sin suponer que una siempre sea mejor.")}
      </p>

      {howItWorksContent && (
        <div className="mb-8">
          <HowItWorks title={howItWorksContent.title} body={howItWorksContent.body} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">{tr("Current Monthly Rent", "Alquiler mensual actual")}</label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Monthly Renter's Insurance", "Seguro mensual para inquilinos")}</label>
          <input
            type="number"
            value={monthlyRentersInsurance}
            onChange={(e) => setMonthlyRentersInsurance(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Home Purchase Price", "Precio de compra de la vivienda")}</label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Down Payment Type", "Tipo de pago inicial")}</label>
          <select
            value={downPaymentType}
            onChange={(e) => setDownPaymentType(e.target.value as "percentage" | "fixed")}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="percentage">{tr("Percentage (%)", "Porcentaje (%)")}</option>
            <option value="fixed">{tr("Fixed Amount ($)", "Monto fijo ($)")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Down Payment", "Pago inicial")}</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Mortgage Interest Rate (%)", "Tasa de interés hipotecaria (%)")}</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Loan Term (Years)", "Plazo del préstamo (años)")}</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Expected Years in the Home", "Años esperados en la vivienda")}</label>
          <input
            type="number"
            value={yearsInHome}
            onChange={(e) => setYearsInHome(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Annual Property Tax Rate (%)", "Tasa anual de impuesto a la propiedad (%)")}</label>
          <input
            type="number"
            value={propertyTaxRate}
            onChange={(e) => setPropertyTaxRate(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Monthly Homeowners Insurance ($)", "Seguro mensual de vivienda ($)")}</label>
          <input
            type="number"
            value={homeInsurance}
            onChange={(e) => setHomeInsurance(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{tr("Monthly HOA Dues", "Cuotas mensuales de HOA")}</label>
          <input
            type="number"
            value={hoaFees}
            onChange={(e) => setHoaFees(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
            min="0"
          />
        </div>

        <details className="sm:col-span-2 border rounded-lg p-4 bg-gray-50">
          <summary className="cursor-pointer font-medium text-gray-800">
            {tr("Advanced Assumptions", "Supuestos avanzados")}
          </summary>
          <p className="text-xs text-gray-500 mt-2 mb-4">
            {tr("These are editable educational planning defaults, not predictions or guarantees. Adjust them to match your own expectations.", "Estos son valores educativos editables, no predicciones ni garantías. Ajústelos según sus expectativas.")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">{tr("Annual Home Appreciation (%)", "Apreciación anual de la vivienda (%)")}</label>
              <input
                type="number"
                value={homeAppreciationRate}
                onChange={(e) => setHomeAppreciationRate(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">{tr("Annual Rent Increase (%)", "Aumento anual del alquiler (%)")}</label>
              <input
                type="number"
                value={rentIncreaseRate}
                onChange={(e) => setRentIncreaseRate(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">{tr("Annual Maintenance (% of Home Value)", "Mantenimiento anual (% del valor)")}</label>
              <input
                type="number"
                value={maintenanceRate}
                onChange={(e) => setMaintenanceRate(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">{tr("Buyer Closing Costs (% of Price)", "Costos de cierre del comprador (% del precio)")}</label>
              <input
                type="number"
                value={buyerClosingCostRate}
                onChange={(e) => setBuyerClosingCostRate(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">{tr("Selling Costs (% of Future Sale Price)", "Costos de venta (% del precio futuro)")}</label>
              <input
                type="number"
                value={sellingCostRate}
                onChange={(e) => setSellingCostRate(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                {tr("Property-Tax Assessed-Value Growth (%)", "Aumento del valor fiscal tasado (%)")}
              </label>
              <input
                type="number"
                value={taxAssessedGrowthRate}
                onChange={(e) => setTaxAssessedGrowthRate(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                min="0"
                step="0.1"
              />
              <p className="text-xs text-gray-500 mt-1">
                {tr("California-focused planning assumption, tracked separately from market appreciation. Actual assessments, supplemental taxes, local assessments, and tax rules may differ.", "Supuesto de planificación para California, separado de la apreciación del mercado. Las tasaciones, impuestos suplementarios y reglas reales pueden variar.")}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium">
                {tr("Annual Homeowners-Insurance Increase (%)", "Aumento anual del seguro de vivienda (%)")}
              </label>
              <input
                type="number"
                value={insuranceIncreaseRate}
                onChange={(e) => setInsuranceIncreaseRate(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">{tr("Annual HOA Increase (%)", "Aumento anual de HOA (%)")}</label>
              <input
                type="number"
                value={hoaIncreaseRate}
                onChange={(e) => setHoaIncreaseRate(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                min="0"
                step="0.1"
              />
            </div>
          </div>
        </details>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-800"
          >
            {tr("Calculate", "Calcular")}
          </button>
        </div>
      </form>

      {errors.length > 0 && (
        <div className="mt-6 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-medium mb-1">{tr("Please fix the following before calculating:", "Corrija lo siguiente antes de calcular:")}</p>
          <ul className="list-disc list-inside space-y-0.5">
            {errors.map((message) => (
              <li key={message}>{locale === "es" ? "Revise los valores ingresados." : message}</li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="mt-10 space-y-10">
          {/* Today's monthly comparison */}
          <div>
            <h3 className="text-xl font-semibold mb-1">{tr("Today's Monthly Comparison", "Comparación mensual actual")}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {result.today.monthlyDifference > 0
                ? tr("Renting has the lower estimated monthly cost today.", "Alquilar tiene el costo mensual estimado más bajo hoy.")
                : result.today.monthlyDifference < 0
                ? tr("Owning has the lower estimated monthly cost today.", "Comprar tiene el costo mensual estimado más bajo hoy.")
                : tr("Renting and owning have about the same estimated monthly cost today.", "Alquilar y comprar tienen aproximadamente el mismo costo mensual estimado hoy.")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded border-2 border-rose-200 bg-white p-5">
                <h4 className="font-bold mb-3">{tr("Renting", "Alquilar")}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{tr("Rent + renter's insurance", "Alquiler + seguro para inquilinos")}</span>
                  <span className="font-medium">{formatCurrency(result.today.rentPlusInsurance)}</span>
                </div>
              </div>
              <div className="rounded border-2 border-blue-200 bg-white p-5">
                <h4 className="font-bold mb-3">{tr("Owning", "Comprar")}</h4>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Principal & interest", "Capital e intereses")}</dt>
                    <dd className="font-medium">{formatCurrency(result.today.principalAndInterest)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Property taxes", "Impuestos a la propiedad")}</dt>
                    <dd className="font-medium">{formatCurrency(result.today.propertyTax)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Homeowners insurance", "Seguro de vivienda")}</dt>
                    <dd className="font-medium">{formatCurrency(result.today.homeInsurance)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("PMI (estimate)", "PMI (estimado)")}</dt>
                    <dd className="font-medium">{formatCurrency(result.today.pmi)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">HOA</dt>
                    <dd className="font-medium">{formatCurrency(result.today.hoa)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Maintenance reserve", "Reserva de mantenimiento")}</dt>
                    <dd className="font-medium">{formatCurrency(result.today.maintenance)}</dd>
                  </div>
                </dl>
                <div className="mt-3 pt-3 border-t flex justify-between gap-2">
                  <span className="font-semibold">{tr("Total monthly ownership cost", "Costo mensual total de propiedad")}</span>
                  <span className="font-bold text-lg">{formatCurrency(result.today.totalOwnershipCost)}</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">
              {tr("Initial monthly difference:", "Diferencia mensual inicial:")}{" "}
              <span className="font-semibold">
                {formatCurrency(Math.abs(result.today.monthlyDifference))}
              </span>{" "}
              {result.today.monthlyDifference >= 0 ? tr("more to own than to rent", "más por comprar que por alquilar") : tr("more to rent than to own", "más por alquilar que por comprar")}.
            </p>
          </div>

          {/* Long-term comparison */}
          <div>
            <h3 className="text-xl font-semibold mb-1">
              {tr("Long-Term Comparison After", "Comparación a largo plazo después de")} {result.longTerm.years}{" "}
              {locale === "es" ? (result.longTerm.years === 1 ? "año" : "años") : (result.longTerm.years === 1 ? "Year" : "Years")}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{getConclusionSentence(result.longTerm, locale)}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded border-2 border-rose-200 bg-white p-5">
                <h4 className="font-bold mb-3">{tr("Renting", "Alquilar")}</h4>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Total rent paid", "Alquiler total pagado")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalRentPaid)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Total renter's insurance paid", "Seguro total de inquilino pagado")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalRentersInsurancePaid)}</dd>
                  </div>
                </dl>
                <div className="mt-3 pt-3 border-t flex justify-between gap-2">
                  <span className="font-semibold">{tr("Renting net cost", "Costo neto de alquilar")}</span>
                  <span className="font-bold text-lg">{formatCurrency(result.longTerm.rentingNetCost)}</span>
                </div>
              </div>

              <div className="rounded border-2 border-blue-200 bg-white p-5">
                <h4 className="font-bold mb-3">{tr("Owning", "Comprar")}</h4>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Total owner cash paid", "Efectivo total pagado por el propietario")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalOwnerCashPaid)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">— {tr("principal repaid", "capital pagado")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalPrincipalPaid)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">— {tr("interest paid", "intereses pagados")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalInterestPaid)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Estimated future home value", "Valor futuro estimado de la vivienda")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.futureHomeValue)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Remaining mortgage balance", "Saldo hipotecario restante")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.remainingMortgageBalance)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Equity before selling costs", "Valor acumulado antes de costos de venta")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.equityBeforeSellingCosts)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Estimated selling costs", "Costos de venta estimados")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.estimatedSellingCosts)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">{tr("Estimated net sale proceeds", "Ingresos netos estimados de la venta")}</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.netSaleProceeds)}</dd>
                  </div>
                </dl>
                <div className="mt-3 pt-3 border-t flex justify-between gap-2">
                  <span className="font-semibold">{tr("Owning net cost", "Costo neto de comprar")}</span>
                  <span className="font-bold text-lg">{formatCurrency(result.longTerm.owningNetCost)}</span>
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-700">
              {tr("Estimated difference:", "Diferencia estimada:")}{" "}
              <span className="font-semibold">{formatCurrency(Math.abs(result.longTerm.difference))}</span>
            </p>
            <p className="mt-1 text-sm text-gray-700">
              {getBreakEvenSentence(result.breakEvenYear, result.longTerm.years, locale)}
            </p>
          </div>

          <RentVsOwnNetCostChart yearlySeries={result.yearlySeries} locale={locale} />

          <div className="text-sm text-gray-600 space-y-2">
            <p>
              {tr("This comparison does not include mortgage-interest or property-tax deductions, other potential tax benefits, or investment returns a renter might earn on the down payment, closing costs, or any monthly savings from renting.", "Esta comparación no incluye deducciones de intereses hipotecarios o impuestos a la propiedad, otros posibles beneficios fiscales ni rendimientos de inversión sobre el pago inicial, costos de cierre o ahorros mensuales.")}
            </p>
            <p>
              {tr("Renting may offer a lower immediate cost and more flexibility to move. Owning may offer stability, control of the property, and the opportunity to build equity. These personal considerations are not assigned a dollar value here.", "Alquilar puede ofrecer menor costo inmediato y más flexibilidad. Comprar puede ofrecer estabilidad, control de la propiedad y la oportunidad de acumular valor. Estas consideraciones personales no reciben un valor monetario aquí.")}
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t pt-4">
            {tr("This calculator provides an educational comparison based on the assumptions entered. It is not a prediction, appraisal, Loan Estimate, preapproval, approval, or commitment to lend. Actual home values, rent increases, property taxes, insurance, maintenance, HOA dues, mortgage insurance, closing costs, selling costs, and loan terms may differ. The comparison does not include potential tax benefits or investment returns on funds used for a down payment, closing costs, or differences in monthly expenses.", "Esta calculadora ofrece una comparación educativa basada en los supuestos ingresados. No es predicción, tasación, Estimación de Préstamo, preaprobación, aprobación ni compromiso de prestar. Los valores, aumentos de alquiler, impuestos, seguros, mantenimiento, HOA, seguro hipotecario, costos y términos reales pueden variar. La comparación no incluye posibles beneficios fiscales ni rendimientos de inversión.")}
          </p>
        </div>
      )}
    </div>
  );
}

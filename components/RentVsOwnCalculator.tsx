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

const formatCurrency = (n: number) =>
  (isFinite(n) ? n : 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

function getConclusionSentence(longTerm: LongTermSummary): string {
  const years = longTerm.years;
  const yearWord = years === 1 ? "year" : "years";
  if (Math.abs(longTerm.difference) < 1) {
    return `Under the assumptions entered, renting and owning have about the same estimated net housing cost after ${years} ${yearWord}.`;
  }
  if (longTerm.difference > 0) {
    return `Under the assumptions entered, renting has the lower estimated net housing cost after ${years} ${yearWord}.`;
  }
  return `Under the assumptions entered, owning has the lower estimated net housing cost after ${years} ${yearWord}.`;
}

function getBreakEvenSentence(breakEvenYear: number | null, years: number): string {
  if (breakEvenYear === null) {
    return `Break-even was not reached within the selected ${years}-year period under these assumptions.`;
  }
  const yearWord = breakEvenYear === 1 ? "year" : "years";
  return `Under these assumptions, owning's estimated net cost first matches or drops below renting's around year ${breakEvenYear} (${breakEvenYear} ${yearWord} in).`;
}

export default function RentVsOwnCalculator({
  howItWorksContent,
}: {
  howItWorksContent: any;
}) {
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
      <h2 className="text-2xl font-bold mb-2">Rent vs Own Calculator</h2>
      <p className="text-sm text-gray-600 mb-6">
        Renting often costs less month to month, especially in Southern
        California. Owning may build equity over time through mortgage
        principal repayment and home appreciation. This calculator compares
        both sides honestly rather than assuming either one wins.
      </p>

      {howItWorksContent && (
        <div className="mb-8">
          <HowItWorks title={howItWorksContent.title} body={howItWorksContent.body} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">Current Monthly Rent</label>
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
          <label className="block text-sm font-medium">Monthly Renter&apos;s Insurance</label>
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
          <label className="block text-sm font-medium">Home Purchase Price</label>
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
          <label className="block text-sm font-medium">Down Payment Type</label>
          <select
            value={downPaymentType}
            onChange={(e) => setDownPaymentType(e.target.value as "percentage" | "fixed")}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount ($)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Down Payment</label>
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
          <label className="block text-sm font-medium">Mortgage Interest Rate (%)</label>
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
          <label className="block text-sm font-medium">Loan Term (Years)</label>
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
          <label className="block text-sm font-medium">Expected Years in the Home</label>
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
          <label className="block text-sm font-medium">Annual Property Tax Rate (%)</label>
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
          <label className="block text-sm font-medium">Monthly Homeowners Insurance ($)</label>
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
          <label className="block text-sm font-medium">Monthly HOA Dues</label>
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
            Advanced Assumptions
          </summary>
          <p className="text-xs text-gray-500 mt-2 mb-4">
            These are editable educational planning defaults, not predictions
            or guarantees. Adjust them to match your own expectations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Annual Home Appreciation (%)</label>
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
              <label className="block text-sm font-medium">Annual Rent Increase (%)</label>
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
              <label className="block text-sm font-medium">Annual Maintenance (% of Home Value)</label>
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
              <label className="block text-sm font-medium">Buyer Closing Costs (% of Price)</label>
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
              <label className="block text-sm font-medium">Selling Costs (% of Future Sale Price)</label>
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
                Property-Tax Assessed-Value Growth (%)
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
                California-focused planning assumption, tracked separately
                from market appreciation. Actual assessments, supplemental
                taxes, local assessments, and tax rules may differ.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Annual Homeowners-Insurance Increase (%)
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
              <label className="block text-sm font-medium">Annual HOA Increase (%)</label>
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
            Calculate
          </button>
        </div>
      </form>

      {errors.length > 0 && (
        <div className="mt-6 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-medium mb-1">Please fix the following before calculating:</p>
          <ul className="list-disc list-inside space-y-0.5">
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div className="mt-10 space-y-10">
          {/* Today's monthly comparison */}
          <div>
            <h3 className="text-xl font-semibold mb-1">Today&apos;s Monthly Comparison</h3>
            <p className="text-sm text-gray-600 mb-4">
              {result.today.monthlyDifference > 0
                ? "Renting has the lower estimated monthly cost today."
                : result.today.monthlyDifference < 0
                ? "Owning has the lower estimated monthly cost today."
                : "Renting and owning have about the same estimated monthly cost today."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded border-2 border-rose-200 bg-white p-5">
                <h4 className="font-bold mb-3">Renting</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rent + renter&apos;s insurance</span>
                  <span className="font-medium">{formatCurrency(result.today.rentPlusInsurance)}</span>
                </div>
              </div>
              <div className="rounded border-2 border-blue-200 bg-white p-5">
                <h4 className="font-bold mb-3">Owning</h4>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Principal &amp; interest</dt>
                    <dd className="font-medium">{formatCurrency(result.today.principalAndInterest)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Property taxes</dt>
                    <dd className="font-medium">{formatCurrency(result.today.propertyTax)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Homeowners insurance</dt>
                    <dd className="font-medium">{formatCurrency(result.today.homeInsurance)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">PMI (estimate)</dt>
                    <dd className="font-medium">{formatCurrency(result.today.pmi)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">HOA</dt>
                    <dd className="font-medium">{formatCurrency(result.today.hoa)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Maintenance reserve</dt>
                    <dd className="font-medium">{formatCurrency(result.today.maintenance)}</dd>
                  </div>
                </dl>
                <div className="mt-3 pt-3 border-t flex justify-between gap-2">
                  <span className="font-semibold">Total monthly ownership cost</span>
                  <span className="font-bold text-lg">{formatCurrency(result.today.totalOwnershipCost)}</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">
              Initial monthly difference:{" "}
              <span className="font-semibold">
                {formatCurrency(Math.abs(result.today.monthlyDifference))}
              </span>{" "}
              {result.today.monthlyDifference >= 0 ? "more to own than to rent" : "more to rent than to own"}.
            </p>
          </div>

          {/* Long-term comparison */}
          <div>
            <h3 className="text-xl font-semibold mb-1">
              Long-Term Comparison After {result.longTerm.years}{" "}
              {result.longTerm.years === 1 ? "Year" : "Years"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{getConclusionSentence(result.longTerm)}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded border-2 border-rose-200 bg-white p-5">
                <h4 className="font-bold mb-3">Renting</h4>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Total rent paid</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalRentPaid)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Total renter&apos;s insurance paid</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalRentersInsurancePaid)}</dd>
                  </div>
                </dl>
                <div className="mt-3 pt-3 border-t flex justify-between gap-2">
                  <span className="font-semibold">Renting net cost</span>
                  <span className="font-bold text-lg">{formatCurrency(result.longTerm.rentingNetCost)}</span>
                </div>
              </div>

              <div className="rounded border-2 border-blue-200 bg-white p-5">
                <h4 className="font-bold mb-3">Owning</h4>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Total owner cash paid</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalOwnerCashPaid)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">— principal repaid</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalPrincipalPaid)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">— interest paid</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.totalInterestPaid)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Estimated future home value</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.futureHomeValue)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Remaining mortgage balance</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.remainingMortgageBalance)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Equity before selling costs</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.equityBeforeSellingCosts)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Estimated selling costs</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.estimatedSellingCosts)}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-600">Estimated net sale proceeds</dt>
                    <dd className="font-medium">{formatCurrency(result.longTerm.netSaleProceeds)}</dd>
                  </div>
                </dl>
                <div className="mt-3 pt-3 border-t flex justify-between gap-2">
                  <span className="font-semibold">Owning net cost</span>
                  <span className="font-bold text-lg">{formatCurrency(result.longTerm.owningNetCost)}</span>
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-700">
              Estimated difference:{" "}
              <span className="font-semibold">{formatCurrency(Math.abs(result.longTerm.difference))}</span>
            </p>
            <p className="mt-1 text-sm text-gray-700">
              {getBreakEvenSentence(result.breakEvenYear, result.longTerm.years)}
            </p>
          </div>

          <RentVsOwnNetCostChart yearlySeries={result.yearlySeries} />

          <div className="text-sm text-gray-600 space-y-2">
            <p>
              This comparison does not include mortgage-interest or
              property-tax deductions, other potential tax benefits, or
              investment returns a renter might earn on the down payment,
              closing costs, or any monthly savings from renting.
            </p>
            <p>
              Renting may offer a lower immediate cost and more flexibility
              to move. Owning may offer stability, control of the property,
              and the opportunity to build equity. These personal
              considerations are not assigned a dollar value here.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t pt-4">
            This calculator provides an educational comparison based on the
            assumptions entered. It is not a prediction, appraisal, Loan
            Estimate, preapproval, approval, or commitment to lend. Actual
            home values, rent increases, property taxes, insurance,
            maintenance, HOA dues, mortgage insurance, closing costs, selling
            costs, and loan terms may differ. The comparison does not include
            potential tax benefits or investment returns on funds used for a
            down payment, closing costs, or differences in monthly expenses.
          </p>
        </div>
      )}
    </div>
  );
}

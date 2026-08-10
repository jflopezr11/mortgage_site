'use client'

import React, { useState } from 'react'
import HowItWorks from './HowItWorks'
import FhaVsConventionalChart from './FhaVsConventionalChart'
import {
    FHA_MIN_DOWN_PERCENT,
    CONVENTIONAL_MIN_DOWN_PERCENT,
    calculateFhaScenario,
    calculateConventionalScenario,
    type LoanScenarioResult,
} from './fhaVsConventionalMath'

type ComparisonMode = 'minimum' | 'same'

type FormData = {
    purchasePrice: number | null
    downPaymentPercent: number | null
    downPaymentAmount: number | null
    fhaRate: number | null
    convRate: number | null
    loanTerm: number
    propertyTax: number
    insurance: number | null
    hoa: number | null
    fico: string | null
}

type Props = {
    howItWorksContent: any
}

const formatCurrency = (n: number) =>
    (isFinite(n) ? n : 0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    })

export default function FHAVsCon({ howItWorksContent }: Props) {
    const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('minimum')

    const [form, setForm] = useState<FormData>({
        purchasePrice: null,
        downPaymentPercent: null,
        downPaymentAmount: null,
        fhaRate: null,
        convRate: null,
        loanTerm: 30,
        propertyTax: 1.25,
        insurance: null,
        hoa: null,
        fico: null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]:
                name === 'fico'
                    ? value
                    : name.includes('Rate') || name === 'propertyTax'
                        ? parseFloat(value)
                        : Number(value),
        }))
    }

    const handleDownPaymentPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const percent = parseFloat(e.target.value)
        const amount = (form.purchasePrice || 0) * (percent / 100)
        setForm((prev) => ({
            ...prev,
            downPaymentPercent: percent,
            downPaymentAmount: Math.round(amount),
        }))
    }

    const handleDownPaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(e.target.value)
        const percent =
            form.purchasePrice && form.purchasePrice > 0
                ? (amount / form.purchasePrice) * 100
                : 0
        setForm((prev) => ({
            ...prev,
            downPaymentAmount: amount,
            downPaymentPercent: Math.round(percent * 100) / 100,
        }))
    }

    // --- Validation -----------------------------------------------------
    const purchasePrice = form.purchasePrice ?? 0
    const sameDownPayment = form.downPaymentAmount ?? 0

    let validationError: string | null = null

    const hasBaseInputs = !!(
        form.purchasePrice &&
        form.purchasePrice > 0 &&
        form.fhaRate !== null &&
        form.fhaRate >= 0 &&
        form.convRate !== null &&
        form.convRate >= 0 &&
        form.loanTerm &&
        form.propertyTax !== null &&
        form.propertyTax >= 0 &&
        form.insurance !== null &&
        form.insurance >= 0
    )

    if (hasBaseInputs && comparisonMode === 'same') {
        if (sameDownPayment < 0) {
            validationError = 'Down payment cannot be negative.'
        } else if (sameDownPayment > purchasePrice) {
            validationError = 'Down payment cannot be greater than the purchase price.'
        } else if (sameDownPayment < purchasePrice * (FHA_MIN_DOWN_PERCENT / 100)) {
            validationError = `FHA requires at least ${FHA_MIN_DOWN_PERCENT}% down. Increase the down payment to compare both loans.`
        }
    }

    const inputsAreValid = hasBaseInputs && !validationError

    // --- Independent FHA / Conventional scenarios ------------------------
    let fha: LoanScenarioResult | null = null
    let conv: LoanScenarioResult | null = null

    if (inputsAreValid) {
        const fhaDownPayment =
            comparisonMode === 'minimum'
                ? purchasePrice * (FHA_MIN_DOWN_PERCENT / 100)
                : sameDownPayment

        const convDownPayment =
            comparisonMode === 'minimum'
                ? purchasePrice * (CONVENTIONAL_MIN_DOWN_PERCENT / 100)
                : sameDownPayment

        const shared = {
            purchasePrice,
            termYears: form.loanTerm,
            annualPropertyTaxRate: form.propertyTax,
            monthlyInsurance: form.insurance ?? 0,
            monthlyHoa: form.hoa ?? 0,
        }

        fha = calculateFhaScenario({
            ...shared,
            downPayment: fhaDownPayment,
            interestRate: form.fhaRate ?? 0,
        })

        conv = calculateConventionalScenario({
            ...shared,
            downPayment: convDownPayment,
            interestRate: form.convRate ?? 0,
        })
    }

    const termLabel = `${form.loanTerm}-year`

    return (
        <div className="flex flex-col items-center mt-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">
                FHA vs Conventional Loan Calculator
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Purchase Price */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Purchase Price ($)</label>
                    <input
                        type="number"
                        name="purchasePrice"
                        placeholder="e.g. 400,000"
                        value={form.purchasePrice || ''}
                        onChange={handleChange}
                        min="0"
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>

                {/* Comparison mode */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Down Payment Comparison</label>
                    <div className="flex flex-col gap-2 text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="comparisonMode"
                                checked={comparisonMode === 'minimum'}
                                onChange={() => setComparisonMode('minimum')}
                            />
                            Minimum down payments ({FHA_MIN_DOWN_PERCENT}% FHA / {CONVENTIONAL_MIN_DOWN_PERCENT}% Conventional)
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="comparisonMode"
                                checked={comparisonMode === 'same'}
                                onChange={() => setComparisonMode('same')}
                            />
                            Same down payment for both loans
                        </label>
                    </div>
                </div>

                {/* Down Payment Section (only editable in "same" mode) */}
                <div className="flex flex-col md:col-span-2">
                    <label className="font-medium mb-1">
                        Down Payment{comparisonMode === 'minimum' ? ' (set automatically per loan type)' : ''}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm block mb-1">% of Purchase Price</label>
                            <input
                                type="number"
                                name="downPaymentPercent"
                                disabled={comparisonMode === 'minimum'}
                                placeholder="e.g. 10"
                                value={form.downPaymentPercent || ''}
                                onChange={handleDownPaymentPercentChange}
                                className="border border-gray-300 p-2 rounded w-full disabled:bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm block mb-1">Dollar Amount ($)</label>
                            <input
                                type="number"
                                name="downPaymentAmount"
                                disabled={comparisonMode === 'minimum'}
                                placeholder="e.g. 40,000"
                                value={form.downPaymentAmount || ''}
                                onChange={handleDownPaymentAmountChange}
                                className="border border-gray-300 p-2 rounded w-full disabled:bg-gray-100"
                            />
                        </div>
                    </div>
                    {validationError && (
                        <p className="text-red-600 text-sm mt-2">{validationError}</p>
                    )}
                </div>

                {/* FHA Interest Rate */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">FHA Interest Rate (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="fhaRate"
                        placeholder="e.g. 6.25"
                        value={form.fhaRate ?? ''}
                        onChange={handleChange}
                        min="0"
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Conventional Interest Rate */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Conventional Interest Rate (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="convRate"
                        placeholder="e.g. 7.5"
                        value={form.convRate ?? ''}
                        onChange={handleChange}
                        min="0"
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* FICO (informational — see PMI note below) */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Estimated FICO Score</label>
                    <select
                        name="fico"
                        value={form.fico || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option value=""> Select FICO Score</option>
                        <option value="720+">720+</option>
                        <option value="700-719">700–719</option>
                        <option value="680-699">680–699</option>
                        <option value="660-679">660–679</option>
                        <option value="<660">Below 660</option>
                    </select>
                </div>

                {/* Loan Term */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Loan Term (Years)</label>
                    <select
                        name="loanTerm"
                        value={form.loanTerm}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    >
                        {[5, 10, 15, 20, 30].map((term) => (
                            <option key={term} value={term}>
                                {term}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Property Tax */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Estimated Property Tax (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="propertyTax"
                        value={form.propertyTax}
                        onChange={handleChange}
                        min="0"
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Homeowners Insurance */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Monthly Homeowners Insurance ($)</label>
                    <input
                        type="number"
                        name="insurance"
                        value={form.insurance ?? ''}
                        placeholder="e.g. 125"
                        onChange={handleChange}
                        min="0"
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* HOA Fees (Optional) */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Monthly HOA Fees (Optional)</label>
                    <input
                        type="number"
                        name="hoa"
                        placeholder="0"
                        value={form.hoa ?? ''}
                        onChange={handleChange}
                        min="0"
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
            </form>

            {howItWorksContent && (
                <div className="max-w-4xl w-full mt-8 p-4 bg-gray-50 border rounded">
                    <HowItWorks
                        title={howItWorksContent.title}
                        body={howItWorksContent.body}
                    />
                </div>
            )}

            {fha && conv && (
                <div className="mt-12 w-full max-w-4xl">
                    <h2 className="text-2xl font-semibold mb-4">
                        {termLabel} Comparison Summary
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ScenarioCard
                            title="FHA"
                            accentClass="border-blue-300"
                            result={fha}
                            miLabel="FHA MIP (monthly)"
                        />
                        <ScenarioCard
                            title="Conventional"
                            accentClass="border-emerald-300"
                            result={conv}
                            miLabel="PMI (monthly)"
                        />
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                        <p>
                            FHA&apos;s 1.75% upfront mortgage insurance premium is
                            financed into the loan balance shown above — it is not paid as
                            additional cash at closing. FHA mortgage insurance does not
                            automatically disappear; in practice its real-world cost and
                            duration depend on the loan term, the original loan-to-value
                            ratio, and applicable FHA requirements. The monthly FHA MIP
                            figure shown here uses a single flat-rate estimate (matching the
                            Mortgage Calculator) rather than modeling every FHA LTV and
                            term bracket, so it will not shift as you change the down
                            payment or term the way an actual HUD-tiered rate would.
                        </p>
                        <p>
                            PMI and MIP figures above are estimates only. Actual pricing
                            depends on credit, loan-to-value ratio, loan structure, and the
                            mortgage-insurance provider
                            {form.fico ? ` (selected FICO range: ${form.fico})` : ''}.
                            Conventional PMI shown is $0 whenever the down payment is at least
                            20%, regardless of credit-score range.
                        </p>
                    </div>

                    <FhaVsConventionalChart
                        fhaMonthlyPayment={fha.totalMonthlyPayment}
                        convMonthlyPayment={conv.totalMonthlyPayment}
                        fhaUpfrontCash={fha.upfrontCashRequired}
                        convUpfrontCash={conv.upfrontCashRequired}
                    />

                    <p className="mt-8 text-xs text-gray-500 border-t pt-4">
                        This calculator provides an educational comparison only. It is not
                        a Loan Estimate, preapproval, approval, or commitment to lend.
                        Rates, mortgage insurance, closing costs, qualification
                        requirements, and loan-program terms may vary. A lower payment or
                        lower upfront cost does not necessarily make one loan program
                        better for every borrower.
                    </p>
                </div>
            )}
        </div>
    )
}

function ScenarioCard({
    title,
    accentClass,
    result,
    miLabel,
}: {
    title: string
    accentClass: string
    result: LoanScenarioResult
    miLabel: string
}) {
    const rows: [string, number][] = [
        ['Down payment', result.downPayment],
        ['Base loan amount', result.baseLoanAmount],
        ['Upfront mortgage insurance', result.upfrontMi],
        ['Financed loan amount', result.financedLoanAmount],
        ['Principal & interest', result.monthlyPI],
        ['Property taxes (monthly)', result.monthlyPropertyTax],
        ['Homeowners insurance (monthly)', result.monthlyInsurance],
        [miLabel, result.monthlyMi],
        ['HOA (monthly)', result.monthlyHoa],
    ]

    return (
        <div className={`rounded border-2 ${accentClass} bg-white p-5`}>
            <h3 className="text-lg font-bold mb-3">{title}</h3>
            <dl className="space-y-1.5 text-sm">
                {rows.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-2">
                        <dt className="text-gray-600">{label}</dt>
                        <dd className="font-medium">{formatCurrency(value)}</dd>
                    </div>
                ))}
            </dl>
            <div className="mt-3 pt-3 border-t flex justify-between gap-2">
                <span className="font-semibold">Est. total monthly payment</span>
                <span className="font-bold text-lg">
                    {formatCurrency(result.totalMonthlyPayment)}
                </span>
            </div>
            <div className="mt-1 flex justify-between gap-2 text-sm">
                <span className="text-gray-600">Est. upfront cash (before closing costs)</span>
                <span className="font-medium">{formatCurrency(result.upfrontCashRequired)}</span>
            </div>
        </div>
    )
}

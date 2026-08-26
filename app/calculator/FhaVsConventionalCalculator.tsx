'use client'

import React, { useState } from 'react'
import HowItWorks from './HowItWorks'
import FhaVsConventionalChart from './FhaVsConventionalChart'
import type { Locale } from '@/lib/i18n/config'
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
    locale?: Locale
}

const formatCurrency = (n: number) =>
    (isFinite(n) ? n : 0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    })

export default function FHAVsCon({ howItWorksContent, locale = 'en' }: Props) {
    const tr = (en: string, es: string) => locale === 'es' ? es : en
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
            validationError = tr('Down payment cannot be negative.', 'El pago inicial no puede ser negativo.')
        } else if (sameDownPayment > purchasePrice) {
            validationError = tr('Down payment cannot be greater than the purchase price.', 'El pago inicial no puede superar el precio de compra.')
        } else if (sameDownPayment < purchasePrice * (FHA_MIN_DOWN_PERCENT / 100)) {
            validationError = tr(`FHA requires at least ${FHA_MIN_DOWN_PERCENT}% down. Increase the down payment to compare both loans.`, `FHA requiere al menos ${FHA_MIN_DOWN_PERCENT}% de pago inicial. Aumente el pago para comparar ambos préstamos.`)
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

    const termLabel = locale === 'es' ? `${form.loanTerm} años` : `${form.loanTerm}-year`

    return (
        <div className="flex flex-col items-center mt-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-6">
                {tr('FHA vs Conventional Loan Calculator', 'Calculadora de préstamo FHA vs. convencional')}
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Purchase Price */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">{tr('Purchase Price ($)', 'Precio de compra ($)')}</label>
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
                    <label className="font-medium mb-1">{tr('Down Payment Comparison', 'Comparación de pago inicial')}</label>
                    <div className="flex flex-col gap-2 text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="comparisonMode"
                                checked={comparisonMode === 'minimum'}
                                onChange={() => setComparisonMode('minimum')}
                            />
                            {tr('Minimum down payments', 'Pagos iniciales mínimos')} ({FHA_MIN_DOWN_PERCENT}% FHA / {CONVENTIONAL_MIN_DOWN_PERCENT}% {tr('Conventional', 'convencional')})
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="comparisonMode"
                                checked={comparisonMode === 'same'}
                                onChange={() => setComparisonMode('same')}
                            />
                            {tr('Same down payment for both loans', 'El mismo pago inicial para ambos préstamos')}
                        </label>
                    </div>
                </div>

                {/* Down Payment Section (only editable in "same" mode) */}
                <div className="flex flex-col md:col-span-2">
                    <label className="font-medium mb-1">
                        {tr('Down Payment', 'Pago inicial')}{comparisonMode === 'minimum' ? tr(' (set automatically per loan type)', ' (se establece automáticamente por tipo)') : ''}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm block mb-1">{tr('% of Purchase Price', '% del precio de compra')}</label>
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
                            <label className="text-sm block mb-1">{tr('Dollar Amount ($)', 'Monto en dólares ($)')}</label>
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
                    <label className="font-medium mb-1">{tr('FHA Interest Rate (%)', 'Tasa de interés FHA (%)')}</label>
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
                    <label className="font-medium mb-1">{tr('Conventional Interest Rate (%)', 'Tasa de interés convencional (%)')}</label>
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
                    <label className="font-medium mb-1">{tr('Estimated FICO Score', 'Puntaje FICO estimado')}</label>
                    <select
                        name="fico"
                        value={form.fico || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option value="">{tr('Select FICO Score', 'Seleccione el puntaje FICO')}</option>
                        <option value="720+">720+</option>
                        <option value="700-719">700–719</option>
                        <option value="680-699">680–699</option>
                        <option value="660-679">660–679</option>
                        <option value="<660">{tr('Below 660', 'Menos de 660')}</option>
                    </select>
                </div>

                {/* Loan Term */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">{tr('Loan Term (Years)', 'Plazo del préstamo (años)')}</label>
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
                    <label className="font-medium mb-1">{tr('Estimated Property Tax (%)', 'Impuesto estimado a la propiedad (%)')}</label>
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
                    <label className="font-medium mb-1">{tr('Monthly Homeowners Insurance ($)', 'Seguro mensual de vivienda ($)')}</label>
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
                    <label className="font-medium mb-1">{tr('Monthly HOA Fees (Optional)', 'Cuotas mensuales de HOA (opcional)')}</label>
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
                        {termLabel} {tr('Comparison Summary', '— resumen comparativo')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ScenarioCard
                            title="FHA"
                            accentClass="border-blue-300"
                            result={fha}
                            miLabel={tr('FHA MIP (monthly)', 'MIP de FHA (mensual)')}
                            locale={locale}
                        />
                        <ScenarioCard
                            title={tr('Conventional', 'Convencional')}
                            accentClass="border-emerald-300"
                            result={conv}
                            miLabel={tr('PMI (monthly)', 'PMI (mensual)')}
                            locale={locale}
                        />
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                        <p>
                            {tr("FHA's 1.75% upfront mortgage insurance premium is financed into the loan balance shown above — it is not paid as additional cash at closing. FHA mortgage insurance does not automatically disappear; its cost and duration depend on the term, original loan-to-value ratio, and applicable requirements. The monthly FHA MIP shown uses a flat-rate estimate rather than every HUD tier.", "La prima inicial de seguro hipotecario FHA del 1.75% se financia en el saldo mostrado; no se paga como efectivo adicional al cierre. El seguro FHA no desaparece automáticamente; su costo y duración dependen del plazo, la relación préstamo-valor original y los requisitos aplicables. El MIP mensual usa una estimación de tasa uniforme y no todos los niveles de HUD.")}
                        </p>
                        <p>
                            {tr("PMI and MIP figures above are estimates only. Actual pricing depends on credit, loan-to-value ratio, loan structure, and the mortgage-insurance provider", "Las cifras de PMI y MIP son estimaciones. El precio real depende del crédito, la relación préstamo-valor, la estructura y el proveedor del seguro")}{form.fico ? ` (${tr('selected FICO range', 'rango FICO seleccionado')}: ${form.fico})` : ''}. {tr("Conventional PMI shown is $0 whenever the down payment is at least 20%, regardless of credit-score range.", "El PMI convencional mostrado es $0 cuando el pago inicial es al menos 20%, sin importar el rango de crédito.")}
                        </p>
                    </div>

                    <FhaVsConventionalChart
                        fhaMonthlyPayment={fha.totalMonthlyPayment}
                        convMonthlyPayment={conv.totalMonthlyPayment}
                        fhaUpfrontCash={fha.upfrontCashRequired}
                        convUpfrontCash={conv.upfrontCashRequired}
                        locale={locale}
                    />

                    <p className="mt-8 text-xs text-gray-500 border-t pt-4">
                        {tr("This calculator provides an educational comparison only. It is not a Loan Estimate, preapproval, approval, or commitment to lend. Rates, mortgage insurance, closing costs, qualification requirements, and loan-program terms may vary. A lower payment or lower upfront cost does not necessarily make one loan program better for every borrower.", "Esta calculadora ofrece únicamente una comparación educativa. No es una Estimación de Préstamo, preaprobación, aprobación ni compromiso de prestar. Las tasas, seguros, costos, requisitos y términos pueden variar. Un pago o costo inicial menor no hace que un programa sea mejor para todos.")}
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
    locale,
}: {
    title: string
    accentClass: string
    result: LoanScenarioResult
    miLabel: string
    locale: Locale
}) {
    const tr = (en: string, es: string) => locale === 'es' ? es : en
    const rows: [string, number][] = [
        [tr('Down payment', 'Pago inicial'), result.downPayment],
        [tr('Base loan amount', 'Monto base del préstamo'), result.baseLoanAmount],
        [tr('Upfront mortgage insurance', 'Seguro hipotecario inicial'), result.upfrontMi],
        [tr('Financed loan amount', 'Monto financiado'), result.financedLoanAmount],
        [tr('Principal & interest', 'Capital e intereses'), result.monthlyPI],
        [tr('Property taxes (monthly)', 'Impuestos a la propiedad (mensuales)'), result.monthlyPropertyTax],
        [tr('Homeowners insurance (monthly)', 'Seguro de vivienda (mensual)'), result.monthlyInsurance],
        [miLabel, result.monthlyMi],
        [tr('HOA (monthly)', 'HOA (mensual)'), result.monthlyHoa],
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
                <span className="font-semibold">{tr('Est. total monthly payment', 'Pago mensual total estimado')}</span>
                <span className="font-bold text-lg">
                    {formatCurrency(result.totalMonthlyPayment)}
                </span>
            </div>
            <div className="mt-1 flex justify-between gap-2 text-sm">
                <span className="text-gray-600">{tr('Est. upfront cash (before closing costs)', 'Efectivo inicial estimado (antes de costos de cierre)')}</span>
                <span className="font-medium">{formatCurrency(result.upfrontCashRequired)}</span>
            </div>
        </div>
    )
}

'use client'

import React, { useState } from 'react'
import HowItWorks from './HowItWorks'

type FormData = {
    purchasePrice: number | null;
    downPaymentPercent: number | null;
    downPaymentAmount: number | null;
    fhaRate: number | null;
    convRate: number | null;
    loanTerm: number;
    propertyTax: number;
    insurance: number | null;
    hoa: number | null;
    fico: string | null;
}

type Props = {
    howItWorksContent: any
}

export default function FHAVsCon({ howItWorksContent }: Props) {
    const [inputMode, setInputMode] = useState<'percent' | 'amount'>('percent')

    const [form, setForm] = useState<FormData>({
        purchasePrice: null,
        downPaymentPercent: null,
        downPaymentAmount: null,
        fhaRate: null,
        convRate: null,
        loanTerm: 30, // you can keep this one pre-selected
        propertyTax: 1.25,
        insurance: null,
        hoa: null,
        fico: null,
    })

    const [useRealMinimums, setUseRealMinimums] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === 'fico' ? value : name.includes('Rate') || name === 'propertyTax' ? parseFloat(value) : Number(value),
        }));
    };

    const toggleInputMode = () => {
        setInputMode((prev) => (prev === 'percent' ? 'amount' : 'percent'))
    }

    function calcLoanAmount(purchasePrice: number, downPayment: number): number {
        return purchasePrice - downPayment
    }

    function getAnnualMIPRate(loanTerm: number, ltv: number): number {
        if (loanTerm === 30) return 0.0055
        if (loanTerm === 15) return 0.0025
        return 0
    }

    function calcMonthlyMIP(baseLoanAmount: number, annualMIPRate: number): number {
        return (baseLoanAmount * annualMIPRate) / 12
    }

    function estimatePMIRate(ltv: number): number {
        if (ltv >= 0.97) return 0.0125
        if (ltv >= 0.95) return 0.01
        if (ltv >= 0.90) return 0.008
        if (ltv >= 0.85) return 0.006
        if (ltv > 0.80) return 0.005
        return 0
    }

    function calcMonthlyPI(principal: number, annualRate: number, loanTermYears: number): number {
        const monthlyRate = annualRate / 100 / 12
        const totalPayments = loanTermYears * 12
        return (
            (principal * monthlyRate) /
            (1 - Math.pow(1 + monthlyRate, -totalPayments))
        )
    }

    let downPayment = 0;

    if (useRealMinimums && form.purchasePrice) {
        downPayment = form.purchasePrice * 0.05; // 5% for Conventional
    } else if (inputMode === 'percent') {
        downPayment = form.purchasePrice && form.downPaymentPercent
            ? (form.purchasePrice * form.downPaymentPercent) / 100
            : 0;
    } else {
        downPayment = form.downPaymentAmount || 0;
    }

    function getPMIRateByFico(fico: string): number {
        switch (fico) {
            case '720+': return 0.0025
            case '700-719': return 0.0038
            case '680-699': return 0.0045
            case '660-679': return 0.0065
            case '<660': return 0.0085
            default: return 0.0058
        }
    }

    const inputsAreValid = !!(
        form.purchasePrice &&
        downPayment &&
        form.fhaRate &&
        form.convRate &&
        form.loanTerm &&
        form.insurance !== null &&
        form.propertyTax !== null &&
        (useRealMinimums || downPayment > 0)
    )

    let loanAmountFHA = 0, monthlyPaymentFHA = 0, upfrontCostFHA = 0, totalCost30FHA = 0, totalCost5FHA = 0, monthlyMIP = 0
    let loanAmountConv = 0, monthlyPaymentConv = 0, upfrontCostConv = 0, totalCost30Conv = 0, totalCost5Conv = 0, monthlyPMI = 0
    let monthlyFhaMIP = 0, monthlyConvPMI = 0

    console.log("FICO selected:", form.fico)

    if (inputsAreValid) {
        // Separate FHA vs Conventional down payment logic
        const fhaDownPaymentPercent = useRealMinimums ? 3.5 : form.downPaymentPercent;
        const convDownPaymentPercent = useRealMinimums ? 5 : form.downPaymentPercent;

        // Use nullish coalescing to handle null purchasePrice
        const purchasePrice = form.purchasePrice ?? 0;
        const fhaDownPayment = (purchasePrice * (fhaDownPaymentPercent ?? 0)) / 100;
        const convDownPayment = (purchasePrice * (convDownPaymentPercent ?? 0)) / 100;

        // FHA LOAN
        loanAmountFHA = calcLoanAmount(purchasePrice, downPayment)
        const ltvFHA = loanAmountFHA / purchasePrice || 1; // Avoid division by 0
        const upfrontMIP = loanAmountFHA * 0.0175
        const financedFHALoan = loanAmountFHA + upfrontMIP
        const annualMIPRate = getAnnualMIPRate(form.loanTerm, ltvFHA)
        monthlyFhaMIP = calcMonthlyMIP(loanAmountFHA, annualMIPRate)
        const monthlyPI_FHA = calcMonthlyPI(financedFHALoan, form.fhaRate ?? 0, form.loanTerm)

        // CONVENTIONAL LOAN
        loanAmountConv = calcLoanAmount(purchasePrice, downPayment)
        const ltvConv = loanAmountConv / purchasePrice || 1; // Avoid division by 0
        const convPMIRate = getPMIRateByFico(form.fico ?? '720+')
        monthlyConvPMI = (loanAmountConv * convPMIRate) / 12
        const monthlyPI_Conv = calcMonthlyPI(loanAmountConv, form.convRate ?? 0, form.loanTerm)
        console.log("Using PMI rate:", convPMIRate)

        // SHARED COSTS
        const monthlyTax = (purchasePrice * form.propertyTax / 100) / 12
        const monthlyInsurance = (form.insurance ?? 0)  / 12
        const monthlyHOA = form.hoa || 0

        // FINAL PAYMENTS
        monthlyPaymentFHA = monthlyPI_FHA + monthlyFhaMIP + monthlyTax + monthlyInsurance + monthlyHOA
        monthlyPaymentConv = monthlyPI_Conv + monthlyConvPMI + monthlyTax + monthlyInsurance + monthlyHOA

        // UPFRONT + TOTAL COSTS
        upfrontCostFHA = upfrontMIP
        upfrontCostConv = 0

        totalCost30FHA = monthlyPaymentFHA * 12 * 30 + upfrontCostFHA
        totalCost30Conv = monthlyPaymentConv * 12 * 30 + upfrontCostConv

        totalCost5FHA = monthlyPaymentFHA * 12 * 5 + upfrontCostFHA
        totalCost5Conv = monthlyPaymentConv * 12 * 5 + upfrontCostConv
    }

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
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                </div>
                {/* New Dropdown */}
                <div className="flex flex-col">
                    <input
                        type="checkbox"
                        id="useRealMinimums"
                        checked={useRealMinimums}
                        onChange={() => setUseRealMinimums(!useRealMinimums)}
                        className="mr-2"
                    />
                    <label htmlFor="useRealMinimums" className="text-sm">
                        Use Minimum Down Payments (3.5% FHA / 5% Conventional)
                    </label>
                </div>

                {/* Down Payment Section */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Down Payment</label>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Percentage Input */}
                        <div>
                            <label className="text-sm block mb-1">% of Purchase Price</label>
                            <input
                                type="number"
                                name="downPaymentPercent"
                                disabled={useRealMinimums}
                                placeholder="e.g. 3.5"
                                value={form.downPaymentPercent || ''}
                                onChange={(e) => {
                                    const percent = parseFloat(e.target.value)
                                    const amount = (form.purchasePrice || 0) * (percent / 100)
                                    setForm((prev) => ({
                                        ...prev,
                                        downPaymentPercent: percent,
                                        downPaymentAmount: Math.round(amount),
                                    }))
                                }}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label className="text-sm block mb-1">Dollar Amount ($)</label>
                            <input
                                type="number"
                                name="downPaymentAmount"
                                disabled={useRealMinimums}
                                placeholder="e.g. 14,000"
                                value={form.downPaymentAmount || ''}
                                onChange={(e) => {
                                    const amount = parseFloat(e.target.value);
                                    const percent =
                                        form.purchasePrice && form.purchasePrice > 0
                                            ? (amount / form.purchasePrice) * 100
                                            : 0;

                                    setForm((prev) => ({
                                        ...prev,
                                        downPaymentAmount: amount,
                                        downPaymentPercent: Math.round(percent * 100) / 100,
                                    }));
                                }}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* FHA Interest Rate */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">FHA Interest Rate (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="fhaRate"
                        placeholder='e.g. 6.25'
                        value={form.fhaRate || ''}
                        onChange={handleChange}
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
                        placeholder='e.g. 7.5'
                        value={form.convRate || ''}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
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
                        <option value="700-729">700–719</option>
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
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Homeowners Insurance */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Annual Homeowners Insurance ($)</label>
                    <input
                        type="number"
                        name="insurance"
                        value={form.insurance || ''}
                        placeholder='e.g. 1,500'
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* HOA Fees (Optional) */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Monthly HOA Fees (Optional)</label>
                    <input
                        type="number"
                        name="hoa"
                        placeholder='0'
                        value={form.hoa || ''}
                        onChange={handleChange}
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

            {inputsAreValid && (
                <div className="mt-12 w-full max-w-4xl">
                    <h2 className="text-2xl font-semibold mb-4">Comparison Summary</h2>
                    <table className="w-full table-fixed border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 text-left">Financial Analysis</th>
                                <th className="p-2 text-right">FHA</th>
                                <th className="p-2 text-right">Conventional</th>
                                <th className="p-2 text-right">Difference</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                {
                                    label: 'Monthly Payment (First Year)',
                                    fha: monthlyPaymentFHA,
                                    conv: monthlyPaymentConv,
                                },
                                {
                                    label: 'Upfront Costs',
                                    fha: upfrontCostFHA,
                                    conv: upfrontCostConv,
                                },
                                {
                                    label: 'Total 30-Year Cost',
                                    fha: totalCost30FHA,
                                    conv: totalCost30Conv,
                                },
                                {
                                    label: 'Total 5-Year Cost',
                                    fha: totalCost5FHA,
                                    conv: totalCost5Conv,
                                },
                                {
                                    label: 'Monthly Mortgage Insurance (First Year)',
                                    fha: monthlyFhaMIP,
                                    conv: monthlyConvPMI,
                                },
                                {
                                    label: 'Down Payment',
                                    fha: useRealMinimums && form.purchasePrice
                                        ? form.purchasePrice * 0.035
                                        : downPayment,
                                    conv: useRealMinimums && form.purchasePrice
                                        ? form.purchasePrice * 0.05
                                        : downPayment,
                                },
                            ].map(({ label, fha, conv }) => {
                                const diff = Math.abs(fha - conv)
                                const isFhaCheaper = fha < conv
                                const isConvCheaper = conv < fha

                                const format = (n: number) =>
                                    n.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        maximumFractionDigits: 0,
                                    })

                                return (
                                    <tr key={label} className="border-t">
                                        <td className="p-2 font-medium">{label}</td>
                                        <td className={`p-2 text-right ${isFhaCheaper ? 'bg-green-100 font-semibold' : ''}`}>
                                            {format(fha)}
                                        </td>
                                        <td className={`p-2 text-right ${isConvCheaper ? 'bg-green-100 font-semibold' : ''}`}>
                                            {format(conv)}
                                        </td>
                                        <td className="p-2 text-right">{format(diff)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )
}
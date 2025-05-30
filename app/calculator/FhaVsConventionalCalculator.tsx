'use client'

import React, { useState } from 'react'

export default function FHAVsCon() {
    const [inputMode, setInputMode] = useState<'percent' | 'amount'>('percent')

    const [form, setForm] = useState({
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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: name.includes('Rate') ? parseFloat(value) : Number(value),
        }))
    }

    const toggleInputMode = () => {
        setInputMode((prev) => (prev === 'percent' ? 'amount' : 'percent'))
    }

    // 1. Calculate Loan Amount (Purchase Price - Down Payment)
    function calcLoanAmount(purchasePrice: number, downPayment: number): number {
        return purchasePrice - downPayment
    }

    // 2. Determine FHA Annual MIP Rate Based on Loan Term + LTV
    function getAnnualMIPRate(loanTerm: number, ltv: number): number {
        if (loanTerm === 30 && ltv > 0.95) return 0.0055
        if (loanTerm === 30 && ltv <= 0.95) return 0.0050
        if (loanTerm === 15) return 0.0070 // Can expand later if needed
        return 0
    }

    // 3. Calculate Monthly MIP for FHA
    function calcMonthlyMIP(baseLoanAmount: number, annualMIPRate: number): number {
        return (baseLoanAmount * annualMIPRate) / 12
    }

    // 4. Estimate PMI Rate for Conventional Based on LTV
    function estimatePMIRate(ltv: number): number {
        if (ltv >= 0.97) return 0.0125
        if (ltv >= 0.95) return 0.01
        if (ltv >= 0.90) return 0.008
        if (ltv >= 0.85) return 0.006
        if (ltv > 0.80) return 0.005
        return 0 // No PMI if LTV ≤ 80%
    }


    function calcMonthlyPI(principal: number, annualRate: number, loanTermYears: number): number {
        const monthlyRate = annualRate / 100 / 12
        const totalPayments = loanTermYears * 12
        return (
            (principal * monthlyRate) /
            (1 - Math.pow(1 + monthlyRate, -totalPayments))
        )
    }

    const downPayment = inputMode === 'percent'
        ? (form.purchasePrice && form.downPaymentPercent
            ? (form.purchasePrice * form.downPaymentPercent) / 100
            : 0)
        : form.downPaymentAmount || 0

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
        form.propertyTax !== null
    )

    let loanAmountFHA = 0, monthlyPaymentFHA = 0, upfrontCostFHA = 0, totalCost30FHA = 0, totalCost5FHA = 0, monthlyMIP = 0
    let loanAmountConv = 0, monthlyPaymentConv = 0, upfrontCostConv = 0, totalCost30Conv = 0, totalCost5Conv = 0, monthlyPMI = 0

    if (inputsAreValid) {
        loanAmountFHA = calcLoanAmount(form.purchasePrice, downPayment)
        const ltvFHA = loanAmountFHA / form.purchasePrice
        const upfrontMIP = loanAmountFHA * 0.0175
        const financedFHALoan = loanAmountFHA + upfrontMIP
        const annualMIPRate = getAnnualMIPRate(form.loanTerm, ltvFHA)
        monthlyMIP = calcMonthlyMIP(loanAmountFHA, annualMIPRate)
        const monthlyPI_FHA = calcMonthlyPI(financedFHALoan, form.fhaRate, form.loanTerm)

        loanAmountConv = calcLoanAmount(form.purchasePrice, downPayment)
        const ltvConv = loanAmountConv / form.purchasePrice
        const monthlyPI_Conv = calcMonthlyPI(loanAmountConv, form.convRate, form.loanTerm)
        const pmiRate = getPMIRateByFico(form.fico)
        console.log('PMI Rate:', pmiRate, 'FICO:', form.fico)
        monthlyPMI = (loanAmountConv * pmiRate) / 12

        const monthlyTax = (form.purchasePrice * form.propertyTax / 100) / 12
        const monthlyInsurance = form.insurance / 12
        const monthlyHOA = form.hoa || 0

        monthlyPaymentFHA = monthlyPI_FHA + monthlyMIP + monthlyTax + monthlyInsurance + monthlyHOA
        monthlyPaymentConv = monthlyPI_Conv + monthlyPMI + monthlyTax + monthlyInsurance + monthlyHOA

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
                                placeholder="e.g. 14,000"
                                value={form.downPaymentAmount || ''}
                                onChange={(e) => {
                                    const amount = parseFloat(e.target.value)
                                    const percent =
                                        form.purchasePrice > 0
                                            ? (amount / form.purchasePrice) * 100
                                            : 0
                                    setForm((prev) => ({
                                        ...prev,
                                        downPaymentAmount: amount,
                                        downPaymentPercent: Math.round(percent * 100) / 100,
                                    }))
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
                                    fha: monthlyMIP,
                                    conv: monthlyPMI,
                                },
                                {
                                    label: 'Down Payment',
                                    fha: downPayment,
                                    conv: downPayment,
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

'use client'

import React, { useState } from 'react'

export default function FHAVsCon() {
    const [inputMode, setInputMode] = useState<'percent' | 'amount'>('percent')
    const [form, setForm] = useState({
        purchasePrice: 400000,
        downPaymentPercent: 3.5,
        downPaymentAmount: 14000,
        fhaRate: 6.25,
        convRate: 6.5,
        loanTerm: 30,
        propertyTax: 1.25,
        insurance: 1500,
        hoa: 0,
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
                        value={form.purchasePrice}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Down Payment */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1 flex justify-between items-center">
                        <span>Down Payment ({inputMode === 'percent' ? '%' : '$'})</span>
                        <button
                            type="button"
                            onClick={toggleInputMode}
                            className="text-sm text-blue-600 underline"
                        >
                            Switch to {inputMode === 'percent' ? 'Amount' : 'Percent'}
                        </button>
                    </label>
                    <input
                        type="number"
                        name={inputMode === 'percent' ? 'downPaymentPercent' : 'downPaymentAmount'}
                        value={
                            inputMode === 'percent' ? form.downPaymentPercent : form.downPaymentAmount
                        }
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* FHA Interest Rate */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">FHA Interest Rate (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="fhaRate"
                        value={form.fhaRate}
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
                        value={form.convRate}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    />
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
                        value={form.insurance}
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
                        value={form.hoa}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
            </form>
        </div>
    )
}

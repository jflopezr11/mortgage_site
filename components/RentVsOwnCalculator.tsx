"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import SavingsBarChart from "@/app/calculator/SavingsBarChart";
import HowItWorks from "@/app/calculator/HowItWorks";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { time } from "console";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function RentVsOwnCalculator({ howItWorksContent }: { howItWorksContent: any }) {


    // Inputs
    const [monthlyRent, setMonthlyRent] = useState("");
    const [annualRentIncrease, setAnnualRentIncrease] = useState("3");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [downPaymentType, setDownPaymentType] = useState("percentage");
    const [downPayment, setDownPayment] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTerm, setLoanTerm] = useState("30");
    const [propertyTaxRate, setPropertyTaxRate] = useState("1.25");
    const [homeInsurance, setHomeInsurance] = useState("125");
    const [hoaFees, setHoaFees] = useState("0");
    const [timeHorizon, setTimeHorizon] = useState("5");
    const [appreciationRate, setAppreciationRate] = useState("3");

    // Outputs
    const [monthlyMortgage, setMonthlyMortgage] = useState<number | null>(null);
    const [results, setResults] = useState<any>(null);
    const [chartData, setChartData] = useState<any>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const rent = parseFloat(monthlyRent);
        const rentIncrease = parseFloat(annualRentIncrease) / 100;
        const price = parseFloat(purchasePrice);
        const down =
            downPaymentType === "percentage"
                ? price * (parseFloat(downPayment) / 100)
                : parseFloat(downPayment);
        const loan = price - down;
        const rate = parseFloat(interestRate) / 100 / 12;
        const term = parseInt(loanTerm) * 12;
        const taxRate = parseFloat(propertyTaxRate) / 100;
        const insurance = parseFloat(homeInsurance);
        const hoa = parseFloat(hoaFees);
        const years = parseInt(timeHorizon);

        const M = (loan * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        const monthlyPI = parseFloat(M.toFixed(2));
        const monthlyTotal = monthlyPI + (price * taxRate) / 12 + insurance + hoa;

        setMonthlyMortgage(monthlyTotal);

        const rentTotals: number[] = [];
        let totalRent = 0;
        let rentYear = rent * 12;
        for (let i = 0; i < years; i++) {
            rentTotals.push(totalRent + rentYear);
            totalRent += rentYear;
            rentYear *= 1 + rentIncrease;
        }

        const ownTotals = Array.from({ length: years }, (_, i) => monthlyTotal * 12 * (i + 1));
        const appreciation = parseFloat(appreciationRate) / 100;
        const futureValue = price * Math.pow(1 + appreciation, years);
        const estimatedEquity = futureValue - loan;
        const netSavings = estimatedEquity - (ownTotals[years - 1] - totalRent);

        setResults({
            totalRent: totalRent.toFixed(0),
            totalOwn: ownTotals[years - 1].toFixed(0),
            estimatedEquity: estimatedEquity.toFixed(0),
            netSavings: netSavings.toFixed(0),
        });

        setChartData({
            labels: Array.from({ length: years }, (_, i) => `Year ${i + 1}`),
            datasets: [
                {
                    label: "Total Rent Paid",
                    data: rentTotals.map((v) => Math.round(v)),
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    fill: true,
                },
                {
                    label: "Total Ownership Cost",
                    data: ownTotals.map((v) => Math.round(v)),
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: true,
                },
            ],
        });
    };

    return (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Rent vs Own Calculator</h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
                <div>
                    <label className="block text-sm font-medium">Monthly Rent</label>
                    <input
                        type="number"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Annual Rent Increase (%)</label>
                    <input
                        type="number"
                        value={annualRentIncrease}
                        onChange={(e) => setAnnualRentIncrease(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                        required
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Purchase Price</label>
                    <input
                        type="number"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Down Payment Type</label>
                    <select
                        value={downPaymentType}
                        onChange={(e) => setDownPaymentType(e.target.value)}
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
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Interest Rate (%)</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                        required
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
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Property Taxes (%)</label>
                    <input
                        type="number"
                        value={propertyTaxRate}
                        onChange={(e) => setPropertyTaxRate(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                        required
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Home Insurance ($/month)</label>
                    <input
                        type="number"
                        value={homeInsurance}
                        onChange={(e) => setHomeInsurance(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">HOA Fees (optional)</label>
                    <input
                        type="number"
                        value={hoaFees}
                        onChange={(e) => setHoaFees(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Time Horizon</label>
                    <select
                        value={timeHorizon}
                        onChange={(e) => setTimeHorizon(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                    >
                        <option value="5">5 Years</option>
                        <option value="10">10 Years</option>
                        <option value="15">15 Years</option>
                        <option value="20">20 Years</option>
                        <option value="30">30 Years</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Expected Home Appreciation Rate (%)</label>
                    <input
                        type="number"
                        value={appreciationRate}
                        onChange={(e) => setAppreciationRate(e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                        step="0.01"
                        min="0"
                    />
                </div>

                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-800"
                    >
                        Calculate
                    </button>
                </div>
            </form>

            {monthlyMortgage && (
                <div className="mt-6 text-lg">
                    <p>
                        <strong>Estimated Monthly Payment (including taxes, insurance, HOA):</strong>{" "}
                        ${monthlyMortgage.toFixed(2)}
                    </p>
                </div>
            )}

            {results && (
                <div className="mt-6 space-y-2 text-md">
                    <p><strong>Total Rent Paid:</strong> ${parseFloat(results.totalRent).toLocaleString()}</p>
                    <p><strong>Total Cost of Ownership:</strong> ${parseFloat(results.totalOwn).toLocaleString()}</p>
                    <p><strong>Estimated Equity Built:</strong> ${parseFloat(results.estimatedEquity).toLocaleString()}</p>
                    <p><strong>Net Savings (Owning vs Renting):</strong> ${parseFloat(results.netSavings).toLocaleString()}</p>
                </div>
            )}

            {chartData && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4">Cost Comparison Over Time</h3>
                    <Line data={chartData} />
                </div>
            )}
            {results && (
                <SavingsBarChart
                    totalRent={parseFloat(results.totalRent)}
                    totalOwnership={parseFloat(results.totalOwn)}
                    equityBuilt={parseFloat(results.estimatedEquity)}
                    netSavings={parseFloat(results.netSavings)}
                    timeHorizon={parseInt(timeHorizon)}
                />
            )}

            {howItWorksContent && (
                <HowItWorks
                    title={howItWorksContent.title}
                    body={howItWorksContent.body}
                />
            )}
        </div>
    );
}

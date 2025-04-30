"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type AmortizationScheduleItem = {
  month: number;
  interestPayment: string;
  principalPayment: string;
  balance: string;
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
};

export default function MortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPaymentType, setDownPaymentType] = useState("percentage");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<
    AmortizationScheduleItem[]
  >([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.25");
  const [homeInsurance, setHomeInsurance] = useState("125");
  const [hoaFees, setHoaFees] = useState("0");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseFloat(purchasePrice) <= 0) {
      setErrorMessage("Please enter a valid purchase price greater than zero.");
      return;
    }
    if (parseFloat(interestRate) <= 0 || parseFloat(interestRate) > 100) {
      setErrorMessage("Please enter an interest rate between 0% and 100%.");
      return;
    }
    if (parseFloat(loanTerm) <= 0) {
      setErrorMessage("Please enter a valid loan term greater than zero.");
      return;
    }
    setErrorMessage("");
    calculateMortgage();
  };

  const calculateMortgage = () => {
    const price = parseFloat(purchasePrice);
    const downPaymentValue =
      downPaymentType === "percentage"
        ? price * (parseFloat(downPayment) / 100)
        : parseFloat(downPayment);
    const loanAmount = price - downPaymentValue;
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm) * 12;
    const propertyTax = price * (parseFloat(propertyTaxRate) / 100) / 12;
    const insurance = parseFloat(homeInsurance);
    const hoa = parseFloat(hoaFees);

    const M =
      (loanAmount * rate * Math.pow(1 + rate, term)) /
      (Math.pow(1 + rate, term) - 1);
    setMonthlyPayment(parseFloat(M.toFixed(2)));

    const totalMonthly = M + propertyTax + insurance + hoa;

    setTotalMonthlyPayment(parseFloat(totalMonthly.toFixed(2)));

    const schedule = generateAmortizationSchedule(loanAmount, M, rate, term);
    setAmortizationSchedule(schedule);
    setChartData(generateChartData(schedule));
  };

  const generateAmortizationSchedule = (
    loanAmount: number,
    monthlyPayment: number,
    monthlyRate: number,
    totalPayments: number
  ): AmortizationScheduleItem[] => {
    let balance = loanAmount;
    const schedule: AmortizationScheduleItem[] = [];

    for (let i = 1; i <= totalPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        interestPayment: interestPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    return schedule;
  };

  const generateChartData = (
    schedule: AmortizationScheduleItem[]
  ): ChartData => {
    const labels = schedule.map((item) => `Month ${item.month}`);
    const principalData = schedule.map((item) =>
      parseFloat(item.principalPayment)
    );
    const interestData = schedule.map((item) =>
      parseFloat(item.interestPayment)
    );

    return {
      labels,
      datasets: [
        {
          label: "Principal Payment",
          data: principalData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
        {
          label: "Interest Payment",
          data: interestData,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    };
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium">Purchase Price</label>
          <input
            type="number"
            placeholder="Purchase Price"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
            min="0"
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
            placeholder={
              downPaymentType === "percentage"
                ? "Down Payment (%)"
                : "Down Payment ($)"
            }
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
            min="0"
            step="any"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Interest Rate (%)
          </label>
          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
            min="0"
            step="0.001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Loan Term (Years)
          </label>
          <input
            type="number"
            placeholder="Loan Term (Years)"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
            min="0"
          />
        </div>
        {/* Property Tax Rate */}
        <div>
          <label className="block text-sm font-medium">Property Tax Rate (%)</label>
          <input
            type="number"
            value={propertyTaxRate}
            onChange={(e) => setPropertyTaxRate(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            step="0.01"
            min="0"
          />
        </div>

        {/* Home Insurance */}
        <div>
          <label className="block text-sm font-medium">Home Insurance ($/month)</label>
          <input
            type="number"
            value={homeInsurance}
            onChange={(e) => setHomeInsurance(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            step="0.01"
            min="0"
          />
        </div>

        {/* HOA Fees */}
        <div>
          <label className="block text-sm font-medium">HOA Fees ($/month)</label>
          <input
            type="number"
            value={hoaFees}
            onChange={(e) => setHoaFees(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            step="0.01"
            min="0"
          />
        </div>


        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700 mt-4"
          >
            Calculate
          </button>
        </div>
      </form>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {chartData && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">
            Principal vs. Interest Over Time
          </h3>
          <Line data={chartData} />
        </div>
      )}

      {amortizationSchedule.length > 0 && (
        <div className="mt-6 max-h-64 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Amortization Schedule</h3>
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Month</th>
                <th className="px-4 py-2">Interest Payment</th>
                <th className="px-4 py-2">Principal Payment</th>
                <th className="px-4 py-2">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{row.month}</td>
                  <td className="px-4 py-2">{row.interestPayment}</td>
                  <td className="px-4 py-2">{row.principalPayment}</td>
                  <td className="px-4 py-2">{row.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {monthlyPayment && (
        <div className="mt-4 space-y-2">
          <h2 className="text-xl font-semibold">
            Principal & Interest Only: ${monthlyPayment}
          </h2>
          {totalMonthlyPayment && (
            <h2 className="text-xl font-semibold text-blue-600">
              Total Monthly Payment (PITI + HOA): ${totalMonthlyPayment}
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

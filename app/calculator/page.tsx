"use client";  // Mark this as a Client Component

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState("mortgage");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-8">Mortgage and Affordability Calculators</h1>

      {/* Tab navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => handleTabClick("mortgage")}
          className={`p-3 ${activeTab === "mortgage" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Mortgage Calculator
        </button>
        <button
          onClick={() => handleTabClick("affordability")}
          className={`p-3 ${activeTab === "affordability" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Affordability Calculator
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "mortgage" && <MortgageCalculator />}
      {activeTab === "affordability" && <AffordabilityCalculator />}
    </div>
  );
}

/* Mortgage Calculator */
function MortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPaymentType, setDownPaymentType] = useState("percentage");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);  
  const [chartData, setChartData] = useState(null);  
  const [errorMessage, setErrorMessage] = useState("");

  const calculateMortgage = (e) => {
    e.preventDefault();

    if (
      parseFloat(purchasePrice) <= 0 ||
      parseFloat(downPayment) < 0 ||
      parseFloat(interestRate) <= 0 ||
      parseFloat(loanTerm) <= 0
    ) {
      setErrorMessage("Please ensure all values are positive and valid.");
      return;
    } else {
      setErrorMessage("");
    }

    const price = parseFloat(purchasePrice);
    let downPaymentValue = 0;

    if (downPaymentType === "percentage") {
      downPaymentValue = price * (parseFloat(downPayment) / 100);
    } else {
      downPaymentValue = parseFloat(downPayment);
    }

    const loanAmount = price - downPaymentValue;
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm) * 12;

    const M = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    setMonthlyPayment(M.toFixed(2));

    // Generate the amortization schedule
    const schedule = generateAmortizationSchedule(loanAmount, M, rate, term);
    setAmortizationSchedule(schedule);

    // Generate chart data based on the schedule
    const chartData = generateChartData(schedule);
    setChartData(chartData);
  };

  const generateAmortizationSchedule = (loanAmount, monthlyPayment, monthlyRate, totalPayments) => {
    let balance = loanAmount;
    const schedule = [];

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

  const generateChartData = (schedule) => {
    const labels = schedule.map((item) => `Month ${item.month}`);
    const principalData = schedule.map((item) => parseFloat(item.principalPayment));
    const interestData = schedule.map((item) => parseFloat(item.interestPayment));

    return {
      labels,
      datasets: [
        {
          label: 'Principal Payment',
          data: principalData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: 'Interest Payment',
          data: interestData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    };
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={calculateMortgage} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Purchase Price */}
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

        {/* Down Payment Type */}
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

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium">Down Payment</label>
          <input
            type="number"
            placeholder={downPaymentType === "percentage" ? "Down Payment (%)" : "Down Payment ($)"}
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
            min="0"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium">Interest Rate (%)</label>
          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
            min="0"
          />
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-medium">Loan Term (Years)</label>
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

        {/* Submit Button */}
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
          <h3 className="text-lg font-bold mb-4">Principal vs. Interest Over Time</h3>
          <Line data={chartData} />
        </div>
      )}

      {amortizationSchedule.length > 0 && (
        <div className="mt-6 max-h-64 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Amortization Schedule</h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>Month</th>
                <th>Interest Payment</th>
                <th>Principal Payment</th>
                <th>Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row, index) => (
                <tr key={index}>
                  <td>{row.month}</td>
                  <td>{row.interestPayment}</td>
                  <td>{row.principalPayment}</td>
                  <td>{row.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {monthlyPayment && (
        <div className="mt-4">
          <h2 className="text-xl">Estimated Monthly Payment (Principal and Interest Only): ${monthlyPayment}</h2>
        </div>
      )}
    </div>
  );
}

/* Affordability Calculator */
function AffordabilityCalculator() {
  const [income, setIncome] = useState("");
  const [monthlyDebt, setMonthlyDebt] = useState("");
  const [affordableLoan, setAffordableLoan] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateAffordability = (e) => {
    e.preventDefault();

    if (parseFloat(income) <= 0 || parseFloat(monthlyDebt) < 0) {
      setErrorMessage("Please ensure all values are positive and valid.");
      return;
    } else {
      setErrorMessage("");
    }

    const annualIncome = parseFloat(income);
    const monthlyDebtObligations = parseFloat(monthlyDebt);

    const maxMonthlyPayment = (annualIncome / 12) * 0.36 - monthlyDebtObligations;
    setAffordableLoan(maxMonthlyPayment.toFixed(2));
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={calculateAffordability} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium">Annual Income</label>
          <input
            type="number"
            placeholder="Annual Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Monthly Debt Obligations</label>
          <input
            type="number"
            placeholder="Monthly Debt (e.g., credit card, car payments)"
            value={monthlyDebt}
            onChange={(e) => setMonthlyDebt(e.target.value)}
            required
            className="w-full border p-2 rounded mt-1"
            min="0"
          />
        </div>
        <div >
        <p className="text-sm mt-2 mb-4">
          Debt obligations generally include:
          <ul className="list-disc ml-6">
            <li>Credit card payments</li>
            <li>Car loans or leases</li>
            <li>Student loans</li>
            <li>Personal loans</li>
            <li>Alimony or child support</li>
            <li>Other long-term obligations (e.g., medical debt)</li>
          </ul>
        </p>
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
      
      {affordableLoan && (
        <div className="mt-4">
          <h2 className="text-xl">Maximum Affordable Loan Payment: ${affordableLoan}</h2>
        </div>
      )}
    </div>
  );
}







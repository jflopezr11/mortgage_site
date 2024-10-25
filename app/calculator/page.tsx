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

import Head from 'next/head';

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



export default function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState("mortgage");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Head>
        <title>Mortgage Calculator - Estimate Your Loan Payments</title>
        <meta name="description" content="Use our mortgage calculator to estimate your monthly mortgage payments based on loan amount, interest rate, and loan term." />
        <meta name="keywords" content="mortgage calculator, home loan, loan payments, mortgage estimate" />
      </Head>
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

    </>

  );
}

/* Mortgage Calculator */
function MortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPaymentType, setDownPaymentType] = useState("percentage");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationScheduleItem[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  


  // Handle form submission and validation
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
    // No errors, proceed with calculation
    setErrorMessage("");  // Clear any existing errors
    calculateMortgage();
  };

  // Calculate mortgage details
  const calculateMortgage = () => {
    const price = parseFloat(purchasePrice);
    let downPaymentValue = downPaymentType === "percentage" ? price * (parseFloat(downPayment) / 100) : parseFloat(downPayment);
    const loanAmount = price - downPaymentValue;
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm) * 12;

    const M = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    setMonthlyPayment(parseFloat(M.toFixed(2)));


    // Generate amortization schedule
    const schedule = generateAmortizationSchedule(loanAmount, M, rate, term);
    setAmortizationSchedule(schedule);

    // Generate chart data
    const chartData = generateChartData(schedule);
    setChartData(chartData);
  };

  // Generate amortization schedule
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

  // Generate chart data for visualization
  const generateChartData = (schedule: AmortizationScheduleItem[]): ChartData => {
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            step="0.001"  // Allow decimals
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

      {/* Error message display */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Chart visualization */}
      {chartData && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Principal vs. Interest Over Time</h3>
          <Line data={chartData} />
        </div>
      )}

      {/* Amortization Schedule */}
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

      {/* Monthly Payment Result */}
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
  const [affordableLoan, setAffordableLoan] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateAffordability = (e: React.FormEvent<HTMLFormElement>) =>  {
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
    setAffordableLoan(parseFloat(maxMonthlyPayment.toFixed(2)));
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

        {/* Debt Obligations List */}
        <div>
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

      {/* Error message display */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Affordable Loan Result */}
      {affordableLoan && (
        <div className="mt-4">
          <h2 className="text-xl">Maximum Affordable Loan Payment: ${affordableLoan}</h2>
        </div>
      )}
    </div>
  );
}








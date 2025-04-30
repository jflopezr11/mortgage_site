"use client";

import { useState } from "react";

export default function AffordabilityCalculator() {
  const [income, setIncome] = useState("");
  const [monthlyDebt, setMonthlyDebt] = useState("");
  const [affordableLoan, setAffordableLoan] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateAffordability = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parseFloat(income) <= 0 || parseFloat(monthlyDebt) < 0) {
      setErrorMessage("Please ensure all values are positive and valid.");
      return;
    }

    setErrorMessage("");

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

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {affordableLoan && (
        <div className="mt-4">
          <h2 className="text-xl">
            Maximum Affordable Loan Payment: ${affordableLoan}
          </h2>
        </div>
      )}
    </div>
  );
}

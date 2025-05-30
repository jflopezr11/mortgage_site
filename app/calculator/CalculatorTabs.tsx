"use client";

import { useState } from "react";
import MortgageCalculator from "./MortgageCalculator";
import AffordabilityCalculator from "./AffordabilityCalculator";
import RentVsOwn from "./RentVsOwn";
import FHAVsCon from './FhaVsConventionalCalculator';

export default function CalculatorTabs({ howItWorksContent }: { howItWorksContent: any }) {

  const [activeTab, setActiveTab] = useState("mortgage");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (

    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-8">
        Mortgage and Affordability Calculators
      </h1>

      {/* Tab navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => handleTabClick("mortgage")}
          className={`p-3 ${activeTab === "mortgage" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
        >
          Mortgage Calculator
        </button>
        <button
          onClick={() => handleTabClick("affordability")}
          className={`p-3 ${activeTab === "affordability" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
        >
          Affordability Calculator
        </button>
        <button
          onClick={() => handleTabClick("rent")}
          className={`p-3 ${activeTab === "rent" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
        >
          Rent vs. Own
        </button>
        <button
          onClick={() => handleTabClick("comparison")}
          className={`p-3 ${activeTab === "comparison" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}>
          FHA Vs. Conventional Loan
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "mortgage" && <MortgageCalculator />}
      {activeTab === "affordability" && <AffordabilityCalculator />}
      {activeTab === "rent" && <RentVsOwn howItWorksContent={howItWorksContent} />}
      {activeTab === "comparison" && <FHAVsCon />}
    </div>
  );
}

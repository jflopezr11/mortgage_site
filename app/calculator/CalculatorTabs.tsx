'use client';

import { useState } from 'react';
import MortgageCalculator from './MortgageCalculator';
import AffordabilityCalculator from './AffordabilityCalculator';
import RentVsOwn from '@/components/RentVsOwnCalculator';
import FHAVsCon from './FhaVsConventionalCalculator';
import type { Locale } from '@/lib/i18n/config';

export default function CalculatorTabs({
  howItWorksContent,
  locale = 'en',
}: {
  howItWorksContent: {
    rent?: any;
    comparison?: any;
  };
  locale?: Locale;
}) {
  const [activeTab, setActiveTab] = useState('mortgage');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-8">
        {locale === 'es' ? 'Calculadoras hipotecarias y de asequibilidad' : 'Mortgage and Affordability Calculators'}
      </h1>

      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 px-2 max-w-full overflow-x-auto">
        <button
          onClick={() => handleTabClick('mortgage')}
          className={`p-3 whitespace-nowrap rounded-md text-sm sm:text-base ${activeTab === 'mortgage' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
        >
          {locale === 'es' ? 'Calculadora hipotecaria' : 'Mortgage Calculator'}
        </button>
        <button
          onClick={() => handleTabClick('affordability')}
          className={`p-3 ${activeTab === 'affordability' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
        >
          {locale === 'es' ? 'Calculadora de asequibilidad' : 'Affordability Calculator'}
        </button>
        <button
          onClick={() => handleTabClick('rent')}
          className={`p-3 ${activeTab === 'rent' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
        >
          {locale === 'es' ? 'Alquilar vs. comprar' : 'Rent vs. Own'}
        </button>
        <button
          onClick={() => handleTabClick('comparison')}
          className={`p-3 ${activeTab === 'comparison' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
        >
          {locale === 'es' ? 'Préstamo FHA vs. convencional' : 'FHA Vs. Conventional Loan'}
        </button>
      </div>

      {/* Render tab content */}
      {activeTab === 'mortgage' && <MortgageCalculator locale={locale} />}
      {activeTab === 'affordability' && <AffordabilityCalculator locale={locale} />}
      {activeTab === 'rent' && <RentVsOwn locale={locale} howItWorksContent={howItWorksContent.rent} />}
      {activeTab === 'comparison' && <FHAVsCon locale={locale} howItWorksContent={howItWorksContent.comparison} />}
    </div>
  );
}


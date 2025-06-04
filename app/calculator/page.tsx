import { client } from '@/lib/sanityClient';
import { howItWorksQuery } from '@/lib/queries';
import RentVsOwn from './RentVsOwn';
import MortgageCalculator from './MortgageCalculator';
import AffordabilityCalculator from './AffordabilityCalculator';
import Head from 'next/head';
import CalculatorTabs from './CalculatorTabs';

export default async function CalculatorPage() {
  const rentVsOwnContent = await client.fetch(howItWorksQuery, {
    slug: "rent-vs-own-info",
  });

  const fhaVsConventionalContent = await client.fetch(howItWorksQuery, {
    slug: "fha-vs-conventional-info",
  });

  return (
    <>
      <Head>
        <title>Mortgage Calculator - Estimate Your Loan Payments</title>
        <meta
          name="description"
          content="Use our mortgage calculator to estimate your monthly mortgage payments based on loan amount, interest rate, and loan term."
        />
        <meta
          name="keywords"
          content="mortgage calculator, home loan, loan payments, mortgage estimate"
        />
      </Head>

      <div className="flex flex-col items-center mt-10">
        <CalculatorTabs
          howItWorksContent={{
            rent: rentVsOwnContent,
            comparison: fhaVsConventionalContent,
          }}
        />
      </div>
    </>
  );
}


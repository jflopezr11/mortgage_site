import { client } from '@/lib/sanityClient';
import { howItWorksQuery } from '@/lib/queries';
import RentVsOwn from './RentVsOwn';
import MortgageCalculator from './MortgageCalculator';
import AffordabilityCalculator from './AffordabilityCalculator';
import Head from 'next/head';
import CalculatorTabs from './CalculatorTabs';

export default async function CalculatorPage() {
  const howItWorksContent = await client.fetch(howItWorksQuery, {
    slug: "rent-vs-own-info",
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
       

        <CalculatorTabs howItWorksContent={howItWorksContent} />
      </div>
    </>
  );
}

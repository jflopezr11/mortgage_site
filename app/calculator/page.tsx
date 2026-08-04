import type { Metadata } from 'next';
import { client } from '@/lib/sanityClient';
import { howItWorksQuery } from '@/lib/queries';
import CalculatorTabs from './CalculatorTabs';

const TITLE = "Mortgage Calculator | Joshua Lopez";
const DESCRIPTION =
  "Estimate monthly mortgage payments based on loan amount, interest rate, and loan term, and compare rent versus own or FHA versus conventional scenarios.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["mortgage calculator", "home loan", "loan payments", "mortgage estimate"],
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/calculator",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function CalculatorPage() {
  const rentVsOwnContent = await client.fetch(howItWorksQuery, {
    slug: "rent-vs-own-info",
  });

  const fhaVsConventionalContent = await client.fetch(howItWorksQuery, {
    slug: "fha-vs-conventional-info",
  });

  return (
    <div className="flex flex-col items-center mt-10">
      <CalculatorTabs
        howItWorksContent={{
          rent: rentVsOwnContent,
          comparison: fhaVsConventionalContent,
        }}
      />
    </div>
  );
}


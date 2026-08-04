import type { Metadata } from "next";
import RentVsOwnLandingContent from "@/components/RentVsOwnLandingContent";

const TITLE = "Rent vs. Own Calculator | Joshua Lopez";
const DESCRIPTION =
  "Use Joshua Lopez's Rent vs. Own calculator to compare renting and buying and see which may make more financial sense for your situation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/landing/rent-vs-own",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/landing/rent-vs-own",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RentVsOwnLandingPage() {
  return <RentVsOwnLandingContent />;
}

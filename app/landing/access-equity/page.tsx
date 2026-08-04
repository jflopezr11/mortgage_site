import type { Metadata } from "next";
import AccessEquityLandingContent from "@/components/AccessEquityLandingContent";

const TITLE = "Home Equity Review | Joshua Lopez";
const DESCRIPTION =
  "Direct-mail response page for reviewing home equity options with Joshua Lopez.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/landing/access-equity",
  },
  // This page is written specifically for recipients of a physical mailer
  // ("If you scanned the QR code from your mailer...") and has no general
  // organic-search value, so it is intentionally excluded from search results.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/landing/access-equity",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function AccessEquityLandingPage() {
  return <AccessEquityLandingContent />;
}

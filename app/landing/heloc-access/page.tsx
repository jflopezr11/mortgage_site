import type { Metadata } from "next";
import HelocAccessLandingContent from "@/components/HelocAccessLandingContent";

const TITLE = "HELOC Access Review | Joshua Lopez";
const DESCRIPTION =
  "Direct-mail response page for reviewing HELOC options with Joshua Lopez.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/landing/heloc-access",
  },
  // This page is written specifically for recipients of a physical/QR mailer
  // campaign and has no general organic-search value, so it is intentionally
  // excluded from search results.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/landing/heloc-access",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function HelocAccessLandingPage() {
  return <HelocAccessLandingContent />;
}

import type { Metadata } from "next";
import LoanApplicationEmbed from "@/components/LoanApplicationEmbed";
import { localizedAlternates } from "@/lib/i18n/config";

const TITLE = "Apply for Financing | Joshua Lopez";
const DESCRIPTION =
  "Start a mortgage application with Joshua Lopez, NMLS #2230624, through the secure Got Mortgage Solutions application portal.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: localizedAlternates("loan", "en"),
  // This page is a bare full-screen iframe into a third-party LendingPad
  // application (see components/LoanApplicationEmbed.tsx) — it has no
  // standalone content for search engines to index or usefully rank. It
  // exists purely as a click-through destination from internal "Apply" /
  // "Explore Mortgage Options" links, so it is kept out of search results
  // and out of the sitemap, but left crawlable (follow) since it is still
  // a legitimate, permanent page rather than a broken or temporary one.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/loan",
    locale: "en_US",
    alternateLocale: "es_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function LoanPage() {
  return <LoanApplicationEmbed />;
}

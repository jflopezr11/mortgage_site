import type { Metadata } from "next";
import OpenHouseLandingContent from "@/components/OpenHouseLandingContent";

const TITLE = "26671 Evergreen Crest Circle | Joshua Lopez";
const DESCRIPTION =
  "View property details for 26671 Evergreen Crest Circle in Menifee and request additional information or an estimated payment breakdown from Joshua Lopez.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/landing/open-house",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/landing/open-house",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function OpenHouseLandingPage() {
  return <OpenHouseLandingContent />;
}

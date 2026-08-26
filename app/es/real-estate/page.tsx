import type { Metadata } from "next";
import { RealEstatePageContent } from "@/app/real-estate/page";
import { localizedAlternates } from "@/lib/i18n/config";
import { pageMessages } from "@/lib/i18n/pages";
const t = pageMessages.es.realEstate;
export const metadata: Metadata = { title: t.title, description: t.description, alternates: localizedAlternates("realEstate", "es"), openGraph: { type: "website", title: t.title, description: t.description, url: "/es/real-estate", locale: "es_US", alternateLocale: "en_US", images: [{ url: "/pictures/outsideHeadshot.jpg", width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title: t.title, description: t.description, images: ["/pictures/outsideHeadshot.jpg"] } };
export default function SpanishRealEstatePage() { return <RealEstatePageContent locale="es" />; }

import type { Metadata } from "next";
import OpenHouseLandingContent from "@/components/OpenHouseLandingContent";
import { localizedAlternates } from "@/lib/i18n/config";
const title = "26671 Evergreen Crest Circle | Joshua Lopez";
const description = "Vea los detalles de 26671 Evergreen Crest Circle en Menifee y solicite información o un desglose de pago estimado.";
export const metadata: Metadata = { title, description, alternates: localizedAlternates("openHouse", "es"), robots: { index: false, follow: true }, openGraph: { type: "website", title, description, url: "/es/landing/open-house", locale: "es_US", alternateLocale: "en_US" }, twitter: { card: "summary", title, description } };
export default function SpanishOpenHouseLandingPage() { return <OpenHouseLandingContent locale="es" />; }

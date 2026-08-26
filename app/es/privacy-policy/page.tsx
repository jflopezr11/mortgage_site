import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/app/privacy-policy/page";
import { localizedAlternates } from "@/lib/i18n/config";
const title = "Política de privacidad | Joshua Lopez";
const description = "Conozca cómo Joshua Lopez y Got Mortgage Solutions recopilan, usan, divulgan y protegen la información personal.";
export const metadata: Metadata = { title, description, alternates: localizedAlternates("privacy", "es"), openGraph: { type: "website", title, description, url: "/es/privacy-policy", locale: "es_US", alternateLocale: "en_US" }, twitter: { card: "summary", title, description } };
export default function SpanishPrivacyPolicyPage() { return <PrivacyPolicyContent locale="es" />; }

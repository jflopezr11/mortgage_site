import type { Metadata } from "next";
import CalculatorTabs from "@/app/calculator/CalculatorTabs";
import { localizedAlternates } from "@/lib/i18n/config";
const title = "Calculadoras hipotecarias | Joshua Lopez";
const description = "Estime pagos hipotecarios, asequibilidad y escenarios de alquilar o comprar y FHA o convencional.";
export const metadata: Metadata = { title, description, keywords: ["calculadora hipotecaria", "pago hipotecario", "asequibilidad de vivienda"], alternates: localizedAlternates("calculator", "es"), openGraph: { type: "website", title, description, url: "/es/calculator", locale: "es_US", alternateLocale: "en_US" }, twitter: { card: "summary", title, description } };
export default function SpanishCalculatorPage() { return <div className="mt-10 flex flex-col items-center"><CalculatorTabs locale="es" howItWorksContent={{}} /></div>; }

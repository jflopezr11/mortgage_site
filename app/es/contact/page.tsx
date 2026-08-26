import type { Metadata } from "next";
import { ContactPageContent } from "@/app/contact/page";
import { localizedAlternates } from "@/lib/i18n/config";
import { pageMessages } from "@/lib/i18n/pages";
const t = pageMessages.es.contactPage;
export const metadata: Metadata = { title: t.title, description: t.description, alternates: localizedAlternates("contact", "es"), openGraph: { type: "website", title: t.title, description: t.description, url: "/es/contact", locale: "es_US", alternateLocale: "en_US" }, twitter: { card: "summary", title: t.title, description: t.description } };
type SearchParams = { [key: string]: string | string[] | undefined };
export default function SpanishContact({ searchParams }: { searchParams: SearchParams }) { return <ContactPageContent locale="es" searchParams={searchParams} />; }

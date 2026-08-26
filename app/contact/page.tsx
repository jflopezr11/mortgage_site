import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import type { Locale } from "@/lib/i18n/config";
import { localizedAlternates } from "@/lib/i18n/config";
import { pageMessages } from "@/lib/i18n/pages";
const t = pageMessages.en.contactPage;
export const metadata: Metadata = { title: t.title, description: t.description, alternates: localizedAlternates("contact", "en"), openGraph: { type: "website", title: t.title, description: t.description, url: "/contact", locale: "en_US", alternateLocale: "es_US" }, twitter: { card: "summary", title: t.title, description: t.description } };
type SearchParams = { [key: string]: string | string[] | undefined };
export function ContactPageContent({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  const copy = pageMessages[locale].contactPage;
  const rawService = searchParams?.service;
  const service = Array.isArray(rawService) ? rawService[0] : rawService;
  return <div className="bg-slate-50"><section className="border-b border-blue-100 bg-blue-50"><div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8"><h1 className="text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-5xl">{copy.heading}</h1><p className="mt-5 text-lg leading-8 text-slate-700">{copy.intro}</p></div></section><section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8"><div className="mx-auto max-w-3xl"><ContactForm initialService={service} locale={locale} /></div></section></div>;
}
export default function Contact({ searchParams }: { searchParams: SearchParams }) { return <ContactPageContent locale="en" searchParams={searchParams} />; }

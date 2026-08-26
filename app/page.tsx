import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, Check, Home as HomeIcon, KeyRound, Landmark, RefreshCw, Search, WalletCards } from "lucide-react";
import StructuredData from "@/components/StructuredData";
import type { Locale } from "@/lib/i18n/config";
import { localizedAlternates, localizedPath } from "@/lib/i18n/config";
import { pageMessages } from "@/lib/i18n/pages";
import { SITE_URL } from "@/lib/site";

const t = pageMessages.en.home;

export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  alternates: localizedAlternates("home", "en"),
  openGraph: { type: "website", title: t.title, description: t.description, url: "/", locale: "en_US", alternateLocale: "es_US", images: [{ url: "/pictures/outsideHeadshot.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: t.title, description: t.description, images: ["/pictures/outsideHeadshot.jpg"] },
};

const primaryButton = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-center font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";
const secondaryButton = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-blue-900 bg-white px-6 py-3 text-center font-bold text-blue-900 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

function structuredData(locale: Locale) {
  const copy = pageMessages[locale].home;
  const url = `${SITE_URL}${localizedPath(locale, "/")}`;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Joshua Lopez", url, jobTitle: copy.jobTitle, inLanguage: locale === "es" ? "es-US" : "en-US", affiliation: [{ "@type": "Organization", name: "Got Mortgage Solutions" }, { "@type": "Organization", name: "Got Real Estate Solutions" }], hasCredential: [{ "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "NMLS #2230624" }, { "@type": "EducationalOccupationalCredential", credentialCategory: "license", name: "California DRE #02436480" }] },
    { "@type": "WebSite", "@id": `${url}#website`, url, name: copy.title, inLanguage: locale === "es" ? "es-US" : "en-US", publisher: { "@id": `${SITE_URL}/#person` } },
  ] };
}

export function HomePageContent({ locale }: { locale: Locale }) {
  const copy = pageMessages[locale].home;
  const services = [
    { title: copy.mortgage, description: copy.mortgageServiceCopy, href: localizedPath(locale, "/loan"), buttonLabel: copy.mortgageServiceCta, icon: Landmark },
    { title: copy.realEstate, description: copy.realEstateServiceCopy, href: localizedPath(locale, "/real-estate"), buttonLabel: copy.realEstateServiceCta, icon: HomeIcon },
  ];
  const mortgageIcons = [KeyRound, RefreshCw, HomeIcon, WalletCards];
  const resources = [
    { title: copy.calculatorTitle, description: copy.calculatorCopy, href: localizedPath(locale, "/calculator"), linkLabel: copy.calculatorLink, icon: Calculator },
    ...(locale === "en" ? [{ title: copy.articlesTitle, description: copy.articlesCopy, href: "/blog", linkLabel: copy.articlesLink, icon: BookOpen }] : []),
  ];
  return <div className="bg-white text-slate-900">
    <StructuredData json={structuredData(locale)} />
    <section className="border-b border-blue-100 bg-blue-50"><div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
      <div className="min-w-0"><p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-800">Joshua Lopez</p><h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">{copy.heroTitle}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">{copy.heroCopy}</p><p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-sm font-bold leading-6 text-blue-950 sm:text-base"><span>Joshua Lopez</span><span aria-hidden="true">|</span><span>NMLS #2230624</span><span aria-hidden="true">|</span><span>DRE #02436480</span></p><div className="mt-8 grid gap-3 sm:flex sm:flex-wrap"><Link href={localizedPath(locale, "/loan")} className={primaryButton}>{copy.mortgageHelp}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href={localizedPath(locale, "/real-estate")} className={secondaryButton}>{copy.realEstateHelp}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div>
      <div className="relative mx-auto w-full max-w-lg"><div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-8 border-white bg-slate-200 shadow-xl"><Image src="/pictures/joshua_headshot.jpg" alt={copy.headshotAlt} fill priority sizes="(max-width: 1023px) 90vw, 42vw" className="object-cover object-top" /></div><div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-blue-900 px-5 py-4 text-center font-semibold text-white shadow-lg sm:left-8 sm:right-8">{copy.bilingual}</div></div>
    </div></section>

    <section className="py-16 sm:py-20" aria-labelledby="service-selector-heading"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl text-center"><h2 id="service-selector-heading" className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">{copy.startTitle}</h2><p className="mt-4 text-lg leading-8 text-slate-600">{copy.startCopy}</p></div><div className="mt-10 grid gap-6 md:grid-cols-2">{services.map(({ icon: Icon, ...service }) => <article key={service.title} className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg sm:p-8"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-900"><Icon className="h-6 w-6" aria-hidden="true" /></div><h3 className="mt-6 text-2xl font-bold text-blue-950">{service.title}</h3><p className="mt-3 flex-grow text-base leading-7 text-slate-600">{service.description}</p><Link href={service.href} className={`${primaryButton} mt-7 w-full px-4 text-sm sm:px-6 sm:text-base`}>{service.buttonLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>)}</div></div></section>

    <section id="about-joshua" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20" aria-labelledby="about-joshua-heading"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8"><div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-slate-200 shadow-lg"><Image src="/pictures/outsideHeadshot.jpg" alt={copy.aboutAlt} fill sizes="(max-width: 1023px) 90vw, 38vw" className="object-cover" /></div><div><h2 id="about-joshua-heading" className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">{copy.aboutTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-700">{copy.aboutCopy}</p><ul className="mt-8 grid gap-4 sm:grid-cols-2">{copy.aboutPoints.map((point) => <li key={point} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-800"><span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-100 text-blue-900"><Check className="h-4 w-4" aria-hidden="true" /></span>{point}</li>)}</ul><p className="mt-6 border-l-4 border-blue-700 pl-4 text-sm font-semibold leading-6 text-slate-600">{copy.choiceDisclosure}</p><Link href="#about-joshua" className={`${secondaryButton} mt-7`}>{copy.aboutCta}</Link></div></div></section>

    <section id="mortgage" className="scroll-mt-24 py-16 sm:py-20" aria-labelledby="mortgage-heading"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">{copy.mortgage}</p><h2 id="mortgage-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">{copy.mortgageTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-700">{copy.mortgageCopy}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{copy.mortgageItems.map((label, index) => { const Icon = mortgageIcons[index]; return <div key={label} className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 font-semibold text-blue-950"><Icon className="h-5 w-5 flex-none" aria-hidden="true" />{label}</div>; })}</div><Link href={localizedPath(locale, "/loan")} className={`${primaryButton} mt-8`}>{copy.mortgageCta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div><div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 shadow-lg"><Image src="/pictures/celebratinghomeownership.jpg" alt={copy.homeownerAlt} fill sizes="(max-width: 1023px) 90vw, 46vw" className="object-cover" /></div></div></section>

    <section className="bg-blue-50 py-16 sm:py-20" aria-labelledby="real-estate-heading"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"><div className="order-2 grid gap-5 sm:grid-cols-2 lg:order-1">{[{ Icon: Search, title: copy.buying, description: copy.buyingCopy }, { Icon: HomeIcon, title: copy.selling, description: copy.sellingCopy }].map(({ Icon, title, description }) => <article key={title} className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-900"><Icon className="h-5 w-5" aria-hidden="true" /></div><h3 className="mt-5 text-xl font-bold text-blue-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{description}</p></article>)}</div><div className="order-1 lg:order-2"><p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">{copy.realEstate}</p><h2 id="real-estate-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">{copy.realEstateTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-700">{copy.realEstateCopy}</p><Link href={localizedPath(locale, "/real-estate")} className={`${primaryButton} mt-8`}>{copy.realEstateCta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div></section>

    <section id="resources" className="scroll-mt-24 py-16 sm:py-20" aria-labelledby="resources-heading"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl text-center"><h2 id="resources-heading" className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">{copy.resourcesTitle}</h2><p className="mt-4 text-lg leading-8 text-slate-600">{copy.resourcesCopy}</p></div><div className={`mx-auto mt-10 grid max-w-4xl gap-6 ${resources.length > 1 ? "md:grid-cols-2" : "md:max-w-xl"}`}>{resources.map(({ icon: Icon, ...resource }) => <article key={resource.title} className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-900"><Icon className="h-5 w-5" aria-hidden="true" /></div><h3 className="mt-5 text-xl font-bold text-blue-950">{resource.title}</h3><p className="mt-3 flex-grow text-sm leading-6 text-slate-600">{resource.description}</p><Link href={resource.href} className="mt-6 inline-flex items-center gap-2 rounded-sm font-bold text-blue-800 transition hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">{resource.linkLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>)}</div><div className="mt-9 text-center"><Link href={localizedPath(locale, "/calculator")} className={secondaryButton}>{copy.allResources}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div></section>

    <section className="bg-blue-900 px-4 py-16 text-white sm:px-6 sm:py-20"><div className="mx-auto max-w-3xl text-center"><h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{copy.finalTitle}</h2><p className="mt-5 text-lg leading-8 text-blue-100">{copy.finalCopy}</p><Link href={localizedPath(locale, "/contact")} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-blue-900 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900">{copy.finalCta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></section>
  </div>;
}

export default function Home() { return <HomePageContent locale="en" />; }

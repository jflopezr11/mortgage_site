"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCommonMessages } from "@/lib/i18n/common";
export default function NotFound() {
  const locale = usePathname().startsWith("/es") ? "es" : "en";
  const copy = getCommonMessages(locale);
  return <div className="mx-auto max-w-2xl px-4 py-24 text-center"><p className="text-sm font-bold uppercase tracking-widest text-blue-700">404</p><h1 className="mt-3 text-4xl font-extrabold text-blue-950">{copy.notFoundTitle}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{copy.notFoundBody}</p><Link href={locale === "es" ? "/es" : "/"} className="mt-8 inline-flex rounded-full bg-blue-900 px-6 py-3 font-bold text-white hover:bg-blue-800">{copy.returnHome}</Link></div>;
}

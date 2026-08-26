"use client";
import { usePathname } from "next/navigation";
import { getCommonMessages } from "@/lib/i18n/common";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = usePathname().startsWith("/es") ? "es" : "en";
  const copy = getCommonMessages(locale);
  return <div className="mx-auto max-w-2xl px-4 py-24 text-center"><h1 className="text-4xl font-extrabold text-blue-950">{copy.errorTitle}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{copy.errorBody}</p><button type="button" onClick={reset} className="mt-8 rounded-full bg-blue-900 px-6 py-3 font-bold text-white hover:bg-blue-800">{copy.retry}</button></div>;
}

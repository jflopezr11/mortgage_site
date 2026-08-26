import { headers } from "next/headers";
import { getCommonMessages } from "@/lib/i18n/common";
import { LOCALE_HEADER, type Locale } from "@/lib/i18n/config";
export default function Loading() {
  const locale = (headers().get(LOCALE_HEADER) === "es" ? "es" : "en") as Locale;
  return <div className="mx-auto flex min-h-[40vh] max-w-3xl items-center justify-center px-4" role="status"><p className="text-lg font-semibold text-blue-950">{getCommonMessages(locale).loading}</p></div>;
}

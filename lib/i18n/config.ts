import type { Metadata } from "next";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_HEADER = "x-site-locale";

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

export const localizedRoutePairs = {
  home: { en: "/", es: "/es" },
  realEstate: { en: "/real-estate", es: "/es/real-estate" },
  contact: { en: "/contact", es: "/es/contact" },
  calculator: { en: "/calculator", es: "/es/calculator" },
  privacy: { en: "/privacy-policy", es: "/es/privacy-policy" },
  loan: { en: "/loan", es: "/es/loan" },
  openHouse: { en: "/landing/open-house", es: "/es/landing/open-house" },
} as const;

export type LocalizedRouteKey = keyof typeof localizedRoutePairs;

export function localizedPath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path === "/") return "/es";
  return `/es${path}`;
}

export function localizedAlternates(
  route: LocalizedRouteKey,
  locale: Locale
): NonNullable<Metadata["alternates"]> {
  const pair = localizedRoutePairs[route];
  return {
    canonical: pair[locale],
    languages: {
      "en-US": pair.en,
      "es-US": pair.es,
      "x-default": pair.en,
    },
  };
}

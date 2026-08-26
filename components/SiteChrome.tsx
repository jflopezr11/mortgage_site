"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCommonMessages } from "@/lib/i18n/common";
import {
  localizedPath,
  localizedRoutePairs,
  type Locale,
} from "@/lib/i18n/config";

function getNavigation(locale: Locale) {
  const messages = getCommonMessages(locale);
  const home = localizedPath(locale, "/");
  return [
    { label: messages.nav.home, href: home },
    { label: messages.nav.mortgage, href: `${home}#mortgage` },
    { label: messages.nav.realEstate, href: localizedPath(locale, "/real-estate") },
    { label: messages.nav.about, href: `${home}#about-joshua` },
    { label: messages.nav.resources, href: `${home}#resources` },
    { label: messages.nav.contact, href: localizedPath(locale, "/contact") },
  ];
}

function getLanguageSwitchPath(pathname: string, locale: Locale, service: string) {
  const pair = Object.values(localizedRoutePairs).find(
    (candidate) => candidate[locale] === pathname
  );
  if (!pair) return null;
  const targetLocale: Locale = locale === "en" ? "es" : "en";
  const query = service ? `?service=${encodeURIComponent(service)}` : "";
  return `${pair[targetLocale]}${query}`;
}

export default function SiteChrome({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serviceParam, setServiceParam] = useState("");
  const pathname = usePathname();
  const messages = getCommonMessages(locale);
  const navigation = getNavigation(locale);
  const languageHref = getLanguageSwitchPath(pathname, locale, serviceParam);

  useEffect(() => {
    if (pathname.endsWith("/contact")) {
      setServiceParam(new URLSearchParams(window.location.search).get("service") ?? "");
    } else {
      setServiceParam("");
    }
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full max-w-full border-b border-blue-800 bg-blue-900 text-white shadow-sm">
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label={messages.primaryNavigation}
        >
          <div className="flex min-h-20 min-w-0 items-center justify-between gap-4">
            <Link
              href={localizedPath(locale, "/")}
              onClick={closeMenu}
              className="rounded-sm text-xl font-bold tracking-tight text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
            >
              Joshua Lopez
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              <ul className="flex items-center gap-1">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-semibold text-blue-50 transition hover:bg-blue-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={localizedPath(locale, "/contact")}
                className="ml-3 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-blue-900 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
              >
                {messages.nav.getStarted}
              </Link>
              {languageHref && (
                <Link
                  href={languageHref}
                  hrefLang={locale === "en" ? "es-US" : "en-US"}
                  aria-label={messages.languageAria}
                  className="ml-2 rounded-md px-3 py-2 text-sm font-bold text-blue-50 transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                >
                  {messages.language}
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-800 p-0 text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? messages.closeMenu : messages.openMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div
            id="mobile-navigation"
            className={isMenuOpen ? "border-t border-blue-800 pb-5 lg:hidden" : "hidden"}
          >
            <ul className="space-y-1 pt-4">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-3 font-semibold text-blue-50 transition hover:bg-blue-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={localizedPath(locale, "/contact")}
              onClick={closeMenu}
              className="mt-4 block rounded-full bg-white px-5 py-3 text-center font-bold text-blue-900 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
            >
              {messages.nav.getStarted}
            </Link>
            {languageHref && (
              <Link
                href={languageHref}
                hrefLang={locale === "en" ? "es-US" : "en-US"}
                onClick={closeMenu}
                aria-label={messages.languageAria}
                className="mt-3 block rounded-lg border border-blue-300 px-5 py-3 text-center font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
              >
                {messages.language}
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="w-full max-w-full flex-grow overflow-x-hidden">{children}</main>

      <footer className="mt-0 bg-blue-950 text-blue-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
          <div>
            <p className="text-xl font-bold text-white">Joshua Lopez</p>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              {messages.footerDescription}
            </p>
            <p className="mt-4 text-sm font-semibold text-white">
              NMLS #2230624 <span aria-hidden="true">|</span> DRE #02436480
            </p>
          </div>

          <div>
            <p className="font-bold text-white">{messages.navigation}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="rounded-sm text-blue-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-white">{messages.affiliations}</p>
            <div className="mt-3 space-y-3 text-sm leading-6 text-blue-100">
              <p>{messages.mortgageAffiliation}</p>
              <p>{messages.realEstateAffiliation}</p>
            </div>
            <Link
              href={localizedPath(locale, "/contact")}
              className="mt-5 inline-flex rounded-full border border-blue-300 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
            >
              {messages.contactJoshua}
            </Link>
          </div>
        </div>

        <div className="border-t border-blue-900 px-4 py-5 text-center text-sm text-blue-200">
          © 2026 Joshua Lopez. {messages.rights}{" "}
          <span aria-hidden="true">|</span>{" "}
          <Link
            href={localizedPath(locale, "/privacy-policy")}
            className="rounded-sm transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          >
            {messages.privacy}
          </Link>
        </div>
      </footer>
    </>
  );
}

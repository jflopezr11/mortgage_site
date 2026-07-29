"use client";

import { useState } from "react";
import Link from "next/link";
import "./globals.css";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Mortgage", href: "/#mortgage" },
  { label: "Real Estate", href: "/real-estate" },
  { label: "About Joshua", href: "/#about-joshua" },
  { label: "Resources", href: "/#resources" },
  { label: "Contact", href: "/contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BXDCXM0NW6"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BXDCXM0NW6');
      `,
          }}
        />

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Mortgage and real estate guidance from Joshua Lopez in California."
        />
        <meta
          name="keywords"
          content="California mortgage, California real estate, home buying, home selling, refinance"
        />
        <meta name="author" content="Joshua Lopez" />
        <meta name="robots" content="index, follow" />
        <title>Joshua Lopez | Mortgage and Real Estate</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="flex min-h-screen max-w-full flex-col overflow-x-hidden">
        <header className="sticky top-0 z-50 w-full max-w-full border-b border-blue-800 bg-blue-900 text-white shadow-sm">
          <nav
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            aria-label="Primary navigation"
          >
            <div className="flex min-h-20 min-w-0 items-center justify-between gap-4">
              <Link
                href="/"
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
                  href="/contact"
                  className="ml-3 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-blue-900 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                >
                  Get Started
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-800 p-0 text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 lg:hidden"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
                href="/contact"
                onClick={closeMenu}
                className="mt-4 block rounded-full bg-white px-5 py-3 text-center font-bold text-blue-900 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>

        <main className="w-full max-w-full flex-grow overflow-x-hidden">{children}</main>

        <footer className="mt-0 bg-blue-950 text-blue-50">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
            <div>
              <p className="text-xl font-bold text-white">Joshua Lopez</p>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                Mortgage and real estate guidance for California consumers,
                available in English and Spanish.
              </p>
              <p className="mt-4 text-sm font-semibold text-white">
                NMLS #2230624 <span aria-hidden="true">|</span> DRE #02436480
              </p>
            </div>

            <div>
              <p className="font-bold text-white">Navigation</p>
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
              <p className="font-bold text-white">Current affiliations</p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-blue-100">
                <p>Mortgage services through Got Mortgage Solutions.</p>
                <p>Real estate services through Got Real Estate Solutions.</p>
              </div>
              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-full border border-blue-300 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
              >
                Contact Joshua
              </Link>
            </div>
          </div>

          <div className="border-t border-blue-900 px-4 py-5 text-center text-sm text-blue-200">
            © 2026 Joshua Lopez. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

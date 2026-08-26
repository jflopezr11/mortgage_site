import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import SiteChrome from "@/components/SiteChrome";
import { LOCALE_HEADER, type Locale } from "@/lib/i18n/config";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const DEFAULT_DESCRIPTION =
  "Mortgage and real estate guidance from Joshua Lopez in California.";
const DEFAULT_OG_IMAGE = "/pictures/outsideHeadshot.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Every page in this project already appends its own "| Joshua Lopez"
  // suffix directly in its title string, so no template is used here —
  // a template would double the suffix on every page that sets its own title.
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "California mortgage",
    "California real estate",
    "home buying",
    "home selling",
    "refinance",
  ],
  authors: [{ name: "Joshua Lopez" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (headers().get(LOCALE_HEADER) === "es" ? "es" : "en") as Locale;

  return (
    <html lang={locale}>
      <body className="flex min-h-screen max-w-full flex-col overflow-x-hidden">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BXDCXM0NW6"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BXDCXM0NW6');
          `}
        </Script>

        <SiteChrome locale={locale}>{children}</SiteChrome>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

const TITLE = "Contact Joshua Lopez | Mortgage and Real Estate";
const DESCRIPTION =
  "Tell Joshua whether you're looking to buy, sell, finance, or simply ask a question, and he'll follow up with a practical next step.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Contact({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const rawService = searchParams?.service;
  const service = Array.isArray(rawService) ? rawService[0] : rawService;

  return (
    <div className="bg-slate-50">
      <section className="border-b border-blue-100 bg-blue-50">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-5xl">
            Let’s Start With What You Need
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Tell me whether you’re looking to buy, sell, finance, or simply
            ask a question. I’ll review the information and follow up with a
            practical next step.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ContactForm initialService={service} />
        </div>
      </section>
    </div>
  );
}

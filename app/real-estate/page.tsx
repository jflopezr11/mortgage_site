import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "California Real Estate Services | Joshua Lopez",
  description:
    "Buyer and seller guidance from Joshua Lopez, California real estate salesperson, DRE #02436480.",
};

const services = [
  {
    title: "Buying a home",
    description:
      "Get clear guidance through the search, property review, offer, and next steps—with the financing considered from the beginning.",
    points: [
      "Clarify your priorities and budget",
      "Review properties and prepare an offer",
      "Keep the purchase and financing decisions connected",
    ],
    icon: Search,
  },
  {
    title: "Selling a home",
    description:
      "Build a practical plan for preparing, pricing, presenting, and marketing your property.",
    points: [
      "Discuss timing and selling priorities",
      "Prepare the property for the market",
      "Review offers and the path to closing",
    ],
    icon: Home,
  },
];

export default function RealEstatePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="border-b border-blue-100 bg-blue-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-800">
              California Real Estate
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-5xl">
              A Clear Plan for Buying or Selling.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              I help California buyers and sellers understand the decisions in
              front of them, what comes next, and how the property and
              financing can affect the overall plan.
            </p>
            <p className="mt-5 text-sm font-bold text-blue-950">
              Joshua Lopez <span aria-hidden="true">|</span> DRE #02436480
            </p>
            <Link
              href="/contact?service=real-estate"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
            >
              Talk About Buying or Selling
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border-8 border-white bg-slate-200 shadow-xl">
            <Image
              src="/pictures/outsideHeadshot.jpg"
              alt="Joshua Lopez, California real estate salesperson"
              fill
              priority
              sizes="(max-width: 1023px) 90vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="services-heading"
              className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
            >
              Start With Your Current Goal
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Whether you are considering a purchase or preparing to sell,
              we’ll begin with your situation and build the next steps from
              there.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-blue-950">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm font-semibold leading-6 text-slate-700"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-100 text-blue-900">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
            Tell Me What You’re Considering.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            You do not need to have every detail figured out. Share whether
            you’re thinking about buying or selling, and we’ll identify a
            useful next step.
          </p>
          <Link
            href="/contact?service=real-estate"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-7 py-3 font-bold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
          >
            Contact Joshua
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-6 text-sm font-semibold text-slate-600">
            Real estate services through Got Real Estate Solutions.
          </p>
        </div>
      </section>
    </div>
  );
}

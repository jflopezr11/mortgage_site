import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Check,
  Home as HomeIcon,
  KeyRound,
  Landmark,
  RefreshCw,
  Search,
  WalletCards,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Joshua Lopez | California Mortgage and Real Estate",
  description:
    "Clear mortgage and real estate guidance from Joshua Lopez, NMLS #2230624 and DRE #02436480.",
};

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-center font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-blue-900 bg-white px-6 py-3 text-center font-bold text-blue-900 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const services = [
  {
    title: "Mortgage",
    description:
      "Buying, refinancing, or accessing your home’s equity? We’ll look at the payment, cash needed, and available options before you make a move.",
    href: "/loan",
    buttonLabel: "Explore Mortgage Options",
    icon: Landmark,
  },
  {
    title: "Real Estate",
    description:
      "Looking to buy, sell, or search for a home? I’ll help you understand the process, the market, and what makes sense for your situation.",
    href: "/real-estate",
    buttonLabel: "Explore Real Estate Services",
    icon: HomeIcon,
  },
];

const resources = [
  {
    title: "Mortgage Calculator",
    description:
      "Estimate a monthly payment and review principal and interest over time.",
    href: "/calculator",
    linkLabel: "Use the mortgage calculator",
    icon: Calculator,
  },
  {
    title: "Articles and Guidance",
    description:
      "Read practical explanations about financing and the homebuying process.",
    href: "/blog",
    linkLabel: "Visit the resource library",
    icon: BookOpen,
  },
];

export default function Home() {
  return (
    <div className="bg-white text-slate-900">
      <section className="border-b border-blue-100 bg-blue-50">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-800">
              Joshua Lopez
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
              Mortgage and Real Estate, Handled With One Clear Plan.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
              Buying, selling, or financing a home involves decisions that
              affect each other. I help you understand the property, the
              numbers, and your next move—without the runaround.
            </p>
            <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-sm font-bold leading-6 text-blue-950 sm:text-base">
              <span>Joshua Lopez</span>
              <span aria-hidden="true">|</span>
              <span>NMLS #2230624</span>
              <span aria-hidden="true">|</span>
              <span>DRE #02436480</span>
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Link href="/loan" className={primaryButton}>
                I Need Mortgage Help
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/real-estate" className={secondaryButton}>
                I’m Buying or Selling
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-8 border-white bg-slate-200 shadow-xl">
              <Image
                src="/pictures/joshua_headshot.jpg"
                alt="Joshua Lopez, California mortgage loan officer and real estate salesperson"
                fill
                priority
                sizes="(max-width: 1023px) 90vw, 42vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-blue-900 px-5 py-4 text-center font-semibold text-white shadow-lg sm:left-8 sm:right-8">
              Mortgage and real estate guidance in English and Spanish
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="service-selector-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="service-selector-heading"
              className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
            >
              Start With What You Need
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              You can come to me for mortgage guidance, real estate help, or
              both. Choose the place that makes sense for you right now.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-blue-950">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-grow text-base leading-7 text-slate-600">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className={`${primaryButton} mt-7 w-full px-4 text-sm sm:px-6 sm:text-base`}
                  >
                    {service.buttonLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="about-joshua"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
        aria-labelledby="about-joshua-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-slate-200 shadow-lg">
            <Image
              src="/pictures/outsideHeadshot.jpg"
              alt="Joshua Lopez"
              fill
              sizes="(max-width: 1023px) 90vw, 38vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2
              id="about-joshua-heading"
              className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
            >
              One Person. Both Sides of the Conversation.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              The financing affects the offer, and the property affects the
              loan. Because I work in both mortgage and real estate, I can help
              you see how those pieces connect while keeping the process clear.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Direct access to me—not a call center.",
                "The numbers explained in plain English.",
                "Mortgage and real estate guidance in one place.",
                "Service available in English and Spanish.",
              ].map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-800"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-6 border-l-4 border-blue-700 pl-4 text-sm font-semibold leading-6 text-slate-600">
              Work with me for mortgage services, real estate services, or
              both. You are never required to use both.
            </p>
            <Link href="#about-joshua" className={`${secondaryButton} mt-7`}>
              About Joshua
            </Link>
          </div>
        </div>
      </section>

      <section
        id="mortgage"
        className="scroll-mt-24 py-16 sm:py-20"
        aria-labelledby="mortgage-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
              Mortgage
            </p>
            <h2
              id="mortgage-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
            >
              Know the Numbers Before You Make the Move.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Whether you’re purchasing, refinancing, or accessing equity, I’ll
              help you compare the payment, cash to close, and tradeoffs so you
              can make an informed decision.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Home purchase loans", icon: KeyRound },
                { label: "Refinance options", icon: RefreshCw },
                { label: "First-time buyer guidance", icon: HomeIcon },
                { label: "Home equity options", icon: WalletCards },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 font-semibold text-blue-950"
                  >
                    <Icon className="h-5 w-5 flex-none" aria-hidden="true" />
                    {item.label}
                  </div>
                );
              })}
            </div>
            <Link href="/loan" className={`${primaryButton} mt-8`}>
              View Mortgage Services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 shadow-lg">
            <Image
              src="/pictures/celebratinghomeownership.jpg"
              alt="Celebrating homeownership"
              fill
              sizes="(max-width: 1023px) 90vw, 46vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section
        className="bg-blue-50 py-16 sm:py-20"
        aria-labelledby="real-estate-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="order-2 grid gap-5 sm:grid-cols-2 lg:order-1">
            <article className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                <Search className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-blue-950">
                Buying a home
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Understand the search, offer, financing, and next steps before
                you commit.
              </p>
            </article>
            <article className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                <HomeIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-blue-950">
                Selling a home
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Prepare, price, and market the property with a clear strategy.
              </p>
            </article>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
              Real Estate
            </p>
            <h2
              id="real-estate-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
            >
              Buy or Sell With a Plan—Not Pressure.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              For buyers, that means understanding the search, the offer, and
              the financing before committing. For sellers, it means
              preparing, pricing, and marketing the property with a clear
              strategy.
            </p>
            <Link href="/real-estate" className={`${primaryButton} mt-8`}>
              View Real Estate Services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="resources"
        className="scroll-mt-24 py-16 sm:py-20"
        aria-labelledby="resources-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="resources-heading"
              className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
            >
              Run the Numbers Before We Talk
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Use the calculators and educational resources already available
              on the site to get a clearer picture of your options.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <article
                  key={resource.title}
                  className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-blue-950">
                    {resource.title}
                  </h3>
                  <p className="mt-3 flex-grow text-sm leading-6 text-slate-600">
                    {resource.description}
                  </p>
                  <Link
                    href={resource.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-sm font-bold text-blue-800 transition hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {resource.linkLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-9 text-center">
            <Link href="/calculator" className={secondaryButton}>
              View All Resources
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-blue-900 px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tell Me What You’re Trying to Do.
          </h2>
          <p className="mt-5 text-lg leading-8 text-blue-100">
            Buying, selling, refinancing, or planning ahead? Start with a quick
            conversation and we’ll figure out the right next step.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-blue-900 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
          >
            Get Started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

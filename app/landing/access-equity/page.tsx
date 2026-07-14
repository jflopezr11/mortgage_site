"use client";

import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";

export default function AccessEquityLandingPage() {
  const [state, handleSubmit] = useForm("xdaqkwde");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900">
      <main className="bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_42%,_#ffffff_100%)]">
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8 lg:pb-16">
          <header className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/85 px-4 py-4 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
            <Image
              src="/pictures/GOTLogo.png"
              alt="GOT Mortgage Solutions logo"
              width={230}
              height={50}
              priority
              className="h-auto w-[190px] sm:w-[220px]"
            />
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-slate-200 bg-slate-100 sm:h-20 sm:w-20">
                <Image
                  src="/pictures/joshua_headshot.jpg"
                  alt="Joshua Lopez"
                  fill
                  sizes="(min-width: 640px) 80px, 64px"
                  className="object-cover"
                />
              </div>
              <div className="text-sm leading-tight text-slate-700">
                <p className="font-semibold text-slate-950">Joshua Lopez</p>
                <p>NMLS #2230624</p>
              </div>
            </div>
          </header>

          <div className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800 shadow-sm">
                Mailer access page
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                You may be able to access your home equity without touching
                your current mortgage.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                If you scanned the QR code from your mailer, this page explains
                a possible way to review available equity while keeping your
                existing first mortgage in place.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#equity-review-form"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
                >
                  Request My Equity Review
                </a>
                <a
                  href="#quick-explanation"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:text-blue-800"
                >
                  Watch the quick explanation
                </a>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600">
                No guarantee of approval. The goal is to help you understand
                whether a home equity option may fit your situation.
              </p>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white p-5 shadow-2xl shadow-blue-950/10">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                  Why this matters now
                </p>
                <h2 className="mt-3 text-2xl font-bold text-slate-950">
                  Many homeowners have equity and a first mortgage rate they
                  would rather not replace.
                </h2>
                <div className="mt-5 grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    Keep your current first mortgage separate.
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    Review what equity may be available.
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    Decide with clear numbers and no pressure.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="quick-explanation"
          className="border-y border-slate-200 bg-white"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                Before you decide
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Watch this quick explanation before you decide.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                This short video area is intended to explain why a HELOC may be
                different from replacing your current mortgage, and what details
                are usually reviewed.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-xl">
              {/* TODO: Replace this placeholder with the real Loom embed URL when ready. */}
              <div className="flex aspect-video min-h-[240px] items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.35),_transparent_45%),linear-gradient(135deg,_#0f172a,_#1e293b)] p-6 text-center text-white">
                <div>
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-sm font-bold uppercase tracking-wide ring-1 ring-white/30">
                    Play
                  </div>
                  <p className="text-lg font-semibold">
                    Loom video placeholder
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    A real campaign video can be embedded here later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                Simple explanation
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                A HELOC may help you access equity separately.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:col-span-2">
              {[
                {
                  title: "You may have equity",
                  copy: "As home values change, many homeowners build equity over time.",
                },
                {
                  title: "Your first mortgage may matter",
                  copy: "If you have a lower rate, replacing that loan may not be the right move.",
                },
                {
                  title: "A HELOC is separate",
                  copy: "It can sit behind your current mortgage, subject to qualifying guidelines.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                Common uses
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Why homeowners use this
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "Debt consolidation",
                  "Review whether equity can help simplify monthly obligations.",
                ],
                [
                  "Home improvements",
                  "Plan repairs, upgrades, or projects with a dedicated line.",
                ],
                [
                  "Emergency reserves",
                  "Create access to funds for unexpected needs.",
                ],
                [
                  "Large expenses",
                  "Look at options for major costs without a full refinance.",
                ],
              ].map(([title, copy]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                Process
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                How it works
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-700">
                The review is meant to be simple and educational, so you can
                decide whether moving forward makes sense.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["1", "Share basic property details"],
                ["2", "Review possible equity options"],
                ["3", "Decide if it makes sense"],
              ].map(([step, title]) => (
                <div
                  key={step}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                    {step}
                  </div>
                  <h3 className="font-semibold text-slate-950">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative h-36 w-36 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:h-40 sm:w-40">
                  <Image
                    src="/pictures/joshua_headshot.jpg"
                    alt="Joshua Lopez"
                    fill
                    sizes="(min-width: 640px) 160px, 144px"
                    className="object-cover object-[center_12%] scale-125"
                  />
                </div>
                <div>
                  <Image
                    src="/pictures/GOTLogo.png"
                    alt="GOT Mortgage Solutions logo"
                    width={210}
                    height={46}
                    className="mb-4 h-auto w-[200px]"
                  />
                  <h2 className="text-2xl font-bold text-slate-950">
                    Work directly with Joshua Lopez
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    NMLS #2230624 | 323-762-9786
                  </p>
                </div>
              </div>
              <p className="mt-6 text-base leading-7 text-slate-700">
                Joshua will walk through your information in plain language and
                help you understand possible next steps. No pressure, no
                obligation, and no promise that every homeowner will qualify.
              </p>
            </div>

            <div
              id="equity-review-form"
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7"
            >
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                  Request a review
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Start with a few basic details.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Share the information below and Joshua will review what may
                  be possible based on your property and profile.
                </p>
              </div>

              {state.succeeded ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-8 text-center">
                  <h3 className="text-lg font-semibold text-emerald-800">
                    Thank you. Your request was received.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Joshua will review your information and follow up by text,
                    phone, or email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-700">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-700">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      name="propertyAddress"
                      required
                      placeholder="Street, City, ZIP"
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="DOB"
                        required
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-700">
                        Total Annual Income
                      </label>
                      <input
                        type="number"
                        name="income"
                        required
                        placeholder="e.g. 100000"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Employment
                    </label>
                    <select
                      name="employmentType"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Choose one</option>
                      <option value="w2_full">Full-Time/W2</option>
                      <option value="w2_part">Part-Time/W2</option>
                      <option value="retired">Retired</option>
                      <option value="self_employed">Self-Employed</option>
                      <option value="Unemployed">Unemployed</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      What would you use the funds for?
                    </label>
                    <textarea
                      name="useOfFunds"
                      rows={3}
                      placeholder="Debt consolidation, home improvements, emergency reserves, large expenses, etc."
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">
                      Best Time to Reach You
                    </label>
                    <select
                      name="bestTime"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Any time is fine</option>
                      <option value="morning">Mornings (9am-12pm)</option>
                      <option value="afternoon">Afternoons (12pm-4pm)</option>
                      <option value="evening">Evenings (4pm-7pm)</option>
                    </select>
                  </div>

                  <input
                    type="hidden"
                    name="leadSource"
                    value="HELOC Equity Mailer - Access Equity"
                  />

                  <div className="flex items-start gap-2 rounded-2xl bg-slate-50 p-3">
                    <input
                      type="checkbox"
                      name="smsConsent"
                      required
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                    />
                    <p className="text-xs leading-5 text-slate-600">
                      I agree that Joshua Lopez and GOT Mortgage Solutions may
                      contact me by phone, email, and text message about my
                      home equity options. Message and data rates may apply. I
                      can opt out at any time.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state.submitting
                      ? "Sending Your Review Request..."
                      : "Request My Equity Review"}
                  </button>
                </form>
              )}

              <p className="mt-4 text-center text-[11px] leading-snug text-slate-500">
                Secure form. Your information is used to review possible equity
                options and follow up with you.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-[11px] leading-5 text-slate-300">
              This page is for informational purposes only and is not a
              commitment to lend or guarantee of approval. Any home equity
              option is subject to credit review, income verification,
              available equity, property review, acceptable collateral, and
              lender guidelines. Terms and availability may vary by borrower,
              property, and lender.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

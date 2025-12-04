"use client";

import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";

export default function HelocAccessLandingPage() {
  const [state, handleSubmit] = useForm("mdkqdnrp");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        {/* Top bar: Logo + info */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/pictures/GOTLogo.png"
              alt="GOT Mortgage Solutions logo"
              width={230}
              height={50}
              className="h-auto w-auto"
            />
          </div>
          <div className="grid justify-items-end">
               <Image 
                src="/pictures/joshua_headshot.jpg"
                alt="headshot of Joshua Lopez"
                width={150}
                height={48}
                className= "flex h-auto w-auto"
              />
              <p className="text-xs md:text-sm text-slate-600 text-left md:text-right">
                Joshua Lopez • 323-762-9786• NMLS#2230624
                <br />
                 GOT Mortgage Solutions • Serving California Homeowners
              </p>
          </div>  
        </div>

       
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 px-5 py-8 md:px-10 md:py-10">
          {/* Header (always first on mobile) */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Access Your Home Equity in 5–7 Days.
            </h1>
            <p className="text-base md:text-lg text-slate-700">
              A streamlined, self-service HELOC application for homeowners who
              want fast, flexible access to their equity without the usual
              bank-runaround.
            </p>
          </div>

          {/* Content: Mobile = Form then Details, Desktop = Details left / Form right */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-12">
            {/* Form side (right on desktop, second on desktop order) */}
            <div className="order-1 md:order-2 md:w-5/12 lg:w-1/2">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 px-4 py-6 md:px-5 md:py-7 shadow-md">
                <h2 className="text-xl font-semibold text-slate-900 mb-2 text-center md:text-left">
                  Start Your HELOC Pre-Check
                </h2>
                <p className="text-sm text-slate-700 mb-5 text-center md:text-left">
                  Answer a few quick questions to see how much equity you may be
                  able to access. No obligation—this just helps me show you real
                  numbers.
                </p>

                {state.succeeded ? (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                      Thank you — check your inbox.
                    </h3>
                    <p className="text-sm text-slate-700">
                      I’ve received your info. I’ll review your numbers and text
                      or email you with your estimated HELOC range and next
                      steps, usually the same business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Contact info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      />
                    </div>

                    {/* Property basics */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Property Address *
                      </label>
                      <input
                        type="text"
                        name="propertyAddress"
                        placeholder="Street, City, ZIP"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="DOB"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Total Annual Income
                        </label>
                        <input
                          type="number"
                          name="income"
                          placeholder="e.g. 100000"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Employment
                      </label>
                      <select
                        name="employmentType"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      >
                        <option value="">Choose one</option>
                        <option value="w2_full">Full-Time/W2</option>
                        <option value="w2_part">Part-Time/W2</option>
                        <option value="retired">Retired</option>
                        <option value="self_employed">Self-Employed</option>
                        <option value="Unemployed">Unemployed</option>
                      </select>
                    </div>

                    {/* Use of funds */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        What do you want to use the HELOC for?
                      </label>
                      <textarea
                        name="useOfFunds"
                        rows={3}
                        placeholder="Debt consolidation, remodel, investments, emergency cushion, etc."
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      />
                    </div>

                    {/* Best time to connect */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Best Time to Reach You
                      </label>
                      <select
                        name="bestTime"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      >
                        <option value="">Any time is fine</option>
                        <option value="morning">Mornings (9am–12pm)</option>
                        <option value="afternoon">Afternoons (12pm–4pm)</option>
                        <option value="evening">Evenings (4pm–7pm)</option>
                      </select>
                    </div>

                    {/* Hidden source tag for tracking */}
                    <input
                      type="hidden"
                      name="leadSource"
                      value="HELOC Mailer - QR Landing Page"
                    />

                    {/* Consent */}
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        name="smsConsent"
                        required
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                      />
                      <p className="text-xs text-slate-600">
                        I agree that Joshua Lopez and GOT Mortgage Solutions may
                        contact me by phone, email, and text message about my
                        HELOC options. Message and data rates may apply. I can
                        opt out at any time.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full rounded-lg bg-blue-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition"
                    >
                      {state.submitting
                        ? "Checking Your HELOC Options..."
                        : "See My HELOC Options"}
                    </button>
                  </form>
                )}

                <p className="mt-3 text-[11px] leading-snug text-slate-500 text-center">
                  Secure, encrypted form. Your information is kept private and
                  used only to review HELOC eligibility.
                </p>
              </div>
            </div>

            {/* Sales / details side (left on desktop) */}
            <div className="order-2 md:order-1 md:w-7/12 lg:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Why this HELOC is different
                </h2>
                <ul className="space-y-3 text-sm md:text-base text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-[11px] font-bold text-emerald-600">
                      ✓
                    </span>
                    <p>
                      <span className="font-semibold">
                        No lengthy bank waits —
                      </span>{" "}
                      funds can be available in as little as{" "}
                      <span className="font-semibold">5–7 business days</span>,
                      once approved and finalized.
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-[11px] font-bold text-emerald-600">
                      ✓
                    </span>
                    <p>
                      <span className="font-semibold">Flexible terms:</span>{" "}
                      choose from 10-, 20-, or 30-year options with{" "}
                      <span className="font-semibold">
                        variable or fixed-rate
                      </span>{" "}
                      structures to fit your plan.
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-[11px] font-bold text-emerald-600">
                      ✓
                    </span>
                    <p>
                      <span className="font-semibold">Simple process:</span> see
                      your estimated HELOC amount{" "}
                      <span className="font-semibold">instantly</span> after
                      answering a few questions about your home, income, and
                      goals.
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-[11px] font-bold text-emerald-600">
                      ✓
                    </span>
                    <p>
                      <span className="font-semibold">
                        “Self-service” but not alone:
                      </span>{" "}
                      connect your bank accounts securely to verify income, then
                      review your options with me so you know exactly what
                      you’re getting.
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-[11px] font-bold text-emerald-600">
                      ✓
                    </span>
                    <p>
                      <span className="font-semibold">
                        Secure, local, and fast:
                      </span>{" "}
                      you get modern online technology with a local mortgage
                      professional watching your file—not a random call-center.
                    </p>
                  </li>
                </ul>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wide">
                    How it works
                  </h3>
                  <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
                    <li>Share a few details about you and your property.</li>
                    <li>
                      Get an immediate estimated HELOC range using your{" "}
                      <span className="font-semibold">stated income</span>.
                    </li>
                    <li>
                      Receive an email to securely answer a few more questions
                      and connect your bank accounts for verification.
                    </li>
                    <li>
                      Review your options, pick your terms, and move toward
                      funding in as little as 5–7 business days.
                    </li>
                  </ol>
                </div>
              </div>

              {/* Advisor / trust strip */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0">
                  <Image
                    src="/pictures/joshua_headshot.jpg"
                    alt="Joshua Lopez"
                    fill
                    className="rounded-xl object-cover border-2 border-blue-900 shadow-md"
                  />
                </div>
                <div className="text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">
                    Work directly with Joshua Lopez, NMLS#2230624
                  </p>
                  <p>
                    I’ll walk you through your numbers, help you compare
                    scenarios, and make sure the HELOC actually fits your plan —
                    not just today, but long term.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance note (optional tweak as needed) */}
          <p className="mt-8 text-[11px] leading-snug text-slate-500 text-center">
            All HELOC offers are subject to credit approval, income and asset
            verification, and acceptable property conditions. This page is for
            informational purposes only and is not a commitment to lend.
          </p>
        </div>
      </div>
    </div>
  );
}

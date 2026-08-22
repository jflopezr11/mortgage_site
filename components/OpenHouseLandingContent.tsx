"use client";

import { useForm, ValidationError } from "@formspree/react";
import Image from "next/image";
import { useState } from "react";
import SmsConsentDisclosure from "@/components/SmsConsentDisclosure";

// Property configuration — update here to reuse this page for a different listing.
const property = {
  address: "26671 Evergreen Crest Circle",
  cityStateZip: "Menifee, CA 92584",
  price: "$614,900",
  beds: 3,
  baths: 3,
  squareFeet: "1,823",
  yearBuilt: 2023,
  community: "Quartz Ranch",
  mls: "CV26179341",
  // Dev note: front-exterior hero photo. Replace with a higher-resolution
  // export if one becomes available; keep the local /public/pictures path.
  heroImage: "/pictures/Evergreen%20Crest.jpg",
};

type Language = "en" | "es";

const translations = {
  en: {
    toggleLabel: "English",
    licenseLine: "Real Estate Agent | Mortgage Loan Officer",
    licenseNumbers: "DRE #02436480 | NMLS #2230624",
    heroBadge: "For Sale in Menifee",
    heroFacts: `${property.beds} Beds | ${property.baths} Baths | ${property.squareFeet} Sq Ft`,
    heroSupporting:
      "Interested in this home? Get the property details and, if you'd like, I can also send you an example of what the monthly payment could look like.",
    primaryCta: "Get Property Details",
    secondaryCta: "See Payment Options",
    overviewEyebrow: "Property Overview",
    overviewHeading: "At a Glance",
    statLabels: {
      beds: "Bedrooms",
      baths: "Bathrooms",
      bathBreakdown: "2 full, 1 half",
      sqft: "Sq Ft",
      year: "Year Built",
      community: "Community",
      hoa: "Approx. HOA",
      hoaValue: "~$29/mo",
      solar: "Solar",
      solarValue: "Owned System",
    },
    description:
      "Built in 2023, this 3-bedroom, 3-bath home offers 1,823 square feet in the Quartz Ranch community of Menifee. The property also includes an owned solar system and an HOA of approximately $29 per month.",
    paymentHeading: "Want to see what the payment could look like?",
    paymentCopy:
      "I can send you a simple breakdown showing an estimated monthly payment and financing scenario for this property.",
    paymentCta: "Request the Payment Breakdown",
    formEyebrow: "Request Information",
    formHeading: "Get the Full Property Details",
    formIntro:
      "Share a few details below and I'll follow up with everything you need to know about this home.",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Email",
    phoneLabel: "Mobile Number",
    realtorQuestion: "Are you currently working with a real estate agent?",
    realtorOptions: ["Yes", "No"],
    preapprovalQuestion: "Have you already been pre-approved for a mortgage?",
    preapprovalOptions: [
      "Yes",
      "No",
      "I'm currently working on it",
      "I'm planning to pay cash",
    ],
    paymentBreakdownQuestion:
      "Would you like me to send you a payment breakdown for this home?",
    paymentBreakdownOptions: ["Yes, send it to me", "No, thank you"],
    submitButton: "Send Me the Property Details",
    submittingButton: "Sending...",
    successHeading: "You're all set.",
    successCopy:
      "I received your information. I'll follow up with the property details and anything else you requested.",
    successPaymentNote:
      "I'll also put together the payment breakdown you asked for and send it separately.",
    formFooterNote:
      "Secure form. Your information is used to follow up about this property.",
    aboutEyebrow: "About Joshua",
    aboutCopy:
      "Whether you're interested in this home or comparing other options, I can help you with the real estate side and also help you understand the financing if you need it.",
    finalCtaHeading: "Interested in this home? Let's talk.",
    finalCtaButton: "Get Property Details",
  },
  es: {
    toggleLabel: "Español",
    licenseLine: "Agente de Bienes Raíces | Oficial de Préstamos Hipotecarios",
    licenseNumbers: "DRE #02436480 | NMLS #2230624",
    heroBadge: "En Venta en Menifee",
    heroFacts: `${property.beds} Recámaras | ${property.baths} Baños | ${property.squareFeet} Pies Cuadrados`,
    heroSupporting:
      "¿Le interesa esta casa? Reciba la información de la propiedad y, si gusta, también le puedo enviar un ejemplo de cómo podría verse el pago mensual.",
    primaryCta: "Recibir Información",
    secondaryCta: "Ver Opciones de Pago",
    overviewEyebrow: "Detalles de la Propiedad",
    overviewHeading: "Lo Esencial",
    statLabels: {
      beds: "Recámaras",
      baths: "Baños",
      bathBreakdown: "2 completos, 1 medio",
      sqft: "Pies Cuadrados",
      year: "Año de Construcción",
      community: "Comunidad",
      hoa: "HOA Aprox.",
      hoaValue: "~$29/mes",
      solar: "Solar",
      solarValue: "Sistema Propio",
    },
    description:
      "Construida en 2023, esta casa de 3 recámaras y 3 baños ofrece 1,823 pies cuadrados en la comunidad Quartz Ranch de Menifee. La propiedad también cuenta con sistema solar propio y una cuota de HOA de aproximadamente $29 al mes.",
    paymentHeading: "¿Quiere ver cómo podría verse el pago mensual?",
    paymentCopy:
      "Le puedo enviar un desglose sencillo con un ejemplo del pago mensual y una posible opción de financiamiento para esta propiedad.",
    paymentCta: "Recibir el Desglose de Pago",
    formEyebrow: "Solicite Información",
    formHeading: "Reciba Todos los Detalles de la Propiedad",
    formIntro:
      "Comparta algunos datos y le daré seguimiento con todo lo que necesita saber sobre esta casa.",
    firstNameLabel: "Nombre",
    lastNameLabel: "Apellido",
    emailLabel: "Correo Electrónico",
    phoneLabel: "Número de Celular",
    realtorQuestion: "¿Ya está trabajando con un agente de bienes raíces?",
    realtorOptions: ["Sí", "No"],
    preapprovalQuestion: "¿Ya tiene una preaprobación hipotecaria?",
    preapprovalOptions: [
      "Sí",
      "No",
      "Estoy en el proceso",
      "Planeo comprar en efectivo",
    ],
    paymentBreakdownQuestion:
      "¿Quiere que le envíe un desglose del pago para esta propiedad?",
    paymentBreakdownOptions: ["Sí, envíemelo", "No, gracias"],
    submitButton: "Envíeme la Información",
    submittingButton: "Enviando...",
    successHeading: "Listo.",
    successCopy:
      "Recibí su información. Le enviaré los detalles de la propiedad y cualquier otra información que haya solicitado.",
    successPaymentNote:
      "También le prepararé el desglose de pago que pidió y se lo enviaré por separado.",
    formFooterNote:
      "Formulario seguro. Su información se usa para darle seguimiento sobre esta propiedad.",
    aboutEyebrow: "Sobre Joshua",
    aboutCopy:
      "Ya sea que le interese esta casa o esté comparando otras opciones, le puedo ayudar con la compra y también explicarle el financiamiento si lo necesita.",
    finalCtaHeading: "¿Le interesa esta propiedad? Hablemos.",
    finalCtaButton: "Recibir Información",
  },
} as const;

export default function OpenHouseLandingContent() {
  const [language, setLanguage] = useState<Language>("en");
  const [state, handleSubmit] = useForm("mppanlwb");
  const [smsConsent, setSmsConsent] = useState(false);
  const [wantsBreakdown, setWantsBreakdown] = useState("");
  const t = translations[language];
  const requestedBreakdown =
    wantsBreakdown === "Yes, send it to me" || wantsBreakdown === "Sí, envíemelo";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900">
      <main className="bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_42%,_#ffffff_100%)]">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/85 px-4 py-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/pictures/GOTLogo.png"
                alt="GOT Mortgage Solutions logo"
                width={190}
                height={42}
                priority
                className="h-auto w-[150px] sm:w-[180px]"
              />
              <div className="hidden text-xs leading-tight text-slate-600 sm:block">
                <p className="font-semibold text-slate-950">Joshua Lopez</p>
                <p>{t.licenseNumbers}</p>
              </div>
            </div>

            <div
              role="group"
              aria-label="Language / Idioma"
              className="inline-flex items-center gap-1 self-start rounded-full border border-slate-200 bg-slate-100 p-1 text-sm font-semibold sm:self-auto"
            >
              <button
                type="button"
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                className={`rounded-full px-3 py-1.5 transition ${
                  language === "en"
                    ? "bg-blue-700 text-white shadow-sm"
                    : "text-slate-600 hover:text-blue-800"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("es")}
                aria-pressed={language === "es"}
                className={`rounded-full px-3 py-1.5 transition ${
                  language === "es"
                    ? "bg-blue-700 text-white shadow-sm"
                    : "text-slate-600 hover:text-blue-800"
                }`}
              >
                Español
              </button>
            </div>
          </header>
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800 shadow-sm">
                {t.heroBadge}
              </div>
              <h1 className="text-3xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {property.address}
              </h1>
              <p className="mt-1 text-lg font-semibold text-slate-700 sm:text-xl">
                {property.cityStateZip}
              </p>
              <p className="mt-4 text-3xl font-bold text-blue-800 sm:text-4xl">
                {property.price}
              </p>
              <p className="mt-2 text-base font-semibold text-slate-700 sm:text-lg">
                {t.heroFacts}
              </p>

              <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white bg-slate-200 shadow-lg lg:hidden">
                <Image
                  src={property.heroImage}
                  alt={`Front exterior of ${property.address}, ${property.cityStateZip}`}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-700">
                {t.heroSupporting}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#lead-form"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 sm:w-auto"
                >
                  {t.primaryCta}
                </a>
                <a
                  href="#payment-breakdown"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-300 hover:text-blue-800 sm:w-auto"
                >
                  {t.secondaryCta}
                </a>
              </div>
            </div>

            <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-3xl border-8 border-white bg-slate-200 shadow-2xl lg:block">
              <Image
                src={property.heroImage}
                alt={`Front exterior of ${property.address}, ${property.cityStateZip}`}
                fill
                priority
                sizes="45vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Property Overview */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
              {t.overviewEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
              {t.overviewHeading}
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[
                [String(property.beds), t.statLabels.beds],
                [
                  `${property.baths} (${t.statLabels.bathBreakdown})`,
                  t.statLabels.baths,
                ],
                [property.squareFeet, t.statLabels.sqft],
                [String(property.yearBuilt), t.statLabels.year],
                [property.community, t.statLabels.community],
                [t.statLabels.hoaValue, t.statLabels.hoa],
                [t.statLabels.solarValue, t.statLabels.solar],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm"
                >
                  <p className="text-lg font-bold text-slate-950 sm:text-xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-base leading-7 text-slate-700">
              {t.description}
            </p>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              MLS# {property.mls}
            </p>
          </div>
        </section>

        {/* Payment Breakdown */}
        <section id="payment-breakdown" className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
                {t.paymentHeading}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
                {t.paymentCopy}
              </p>
              <a
                href="#lead-form"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 sm:w-auto"
              >
                {t.paymentCta}
              </a>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
            <div
              id="lead-form"
              className="scroll-mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7"
            >
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                  {t.formEyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  {t.formHeading}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {t.formIntro}
                </p>
              </div>

              {state.succeeded ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-8 text-center">
                  <h3 className="text-lg font-semibold text-emerald-800">
                    {t.successHeading}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {t.successCopy}
                  </p>
                  {requestedBreakdown && (
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {t.successPaymentNote}
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-1 block text-xs font-medium text-slate-700"
                      >
                        {t.firstNameLabel} *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        autoComplete="given-name"
                        required
                        className="w-full rounded-xl border border-slate-300 px-3 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-1 block text-xs font-medium text-slate-700"
                      >
                        {t.lastNameLabel} *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        required
                        className="w-full rounded-xl border border-slate-300 px-3 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-xs font-medium text-slate-700"
                    >
                      {t.emailLabel} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-slate-300 px-3 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-xs font-medium text-slate-700"
                    >
                      {t.phoneLabel} *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      className="w-full rounded-xl border border-slate-300 px-3 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <fieldset>
                    <legend className="mb-2 block text-sm font-medium text-slate-800">
                      {t.realtorQuestion} *
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      {t.realtorOptions.map((option) => (
                        <label
                          key={option}
                          className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm transition has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-800 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600 has-[:focus-visible]:ring-offset-2"
                        >
                          <input
                            type="radio"
                            name="workingWithRealtor"
                            value={option}
                            required
                            className="sr-only"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 block text-sm font-medium text-slate-800">
                      {t.preapprovalQuestion} *
                    </legend>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {t.preapprovalOptions.map((option) => (
                        <label
                          key={option}
                          className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm transition has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-800 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600 has-[:focus-visible]:ring-offset-2"
                        >
                          <input
                            type="radio"
                            name="preapprovalStatus"
                            value={option}
                            required
                            className="sr-only"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 block text-sm font-medium text-slate-800">
                      {t.paymentBreakdownQuestion} *
                    </legend>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {t.paymentBreakdownOptions.map((option) => (
                        <label
                          key={option}
                          className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm transition has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-800 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600 has-[:focus-visible]:ring-offset-2"
                        >
                          <input
                            type="radio"
                            name="wantsPaymentBreakdown"
                            value={option}
                            checked={wantsBreakdown === option}
                            onChange={() => setWantsBreakdown(option)}
                            required
                            className="sr-only"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <input
                    type="hidden"
                    name="preferredLanguage"
                    value={language === "en" ? "English" : "Spanish"}
                  />
                  <input
                    type="hidden"
                    name="leadSource"
                    value="Open House Landing Page"
                  />
                  <input
                    type="hidden"
                    name="propertyAddress"
                    value={`${property.address}, ${property.cityStateZip}`}
                  />
                  <input
                    type="hidden"
                    name="propertyMLS"
                    value={property.mls}
                  />

                  <SmsConsentDisclosure
                    id="open-house-sms-consent"
                    checked={smsConsent}
                    onChange={setSmsConsent}
                  />

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full rounded-xl bg-blue-700 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state.submitting ? t.submittingButton : t.submitButton}
                  </button>
                </form>
              )}

              <p className="mt-4 text-center text-[11px] leading-snug text-slate-500">
                {t.formFooterNote}
              </p>
            </div>
          </div>
        </section>

        {/* About Joshua */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
              <div className="relative h-28 w-28 flex-none overflow-hidden rounded-full border border-slate-200 bg-slate-100 sm:h-32 sm:w-32">
                <Image
                  src="/pictures/joshua_headshot.jpg"
                  alt="Joshua Lopez"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
                  {t.aboutEyebrow}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  Joshua Lopez
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {t.licenseLine}
                </p>
                <p className="text-sm text-slate-600">{t.licenseNumbers}</p>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  {t.aboutCopy}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-blue-900">
          <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t.finalCtaHeading}
            </h2>
            <a
              href="#lead-form"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50 sm:w-auto"
            >
              {t.finalCtaButton}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

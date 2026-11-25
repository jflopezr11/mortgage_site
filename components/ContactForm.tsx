"use client";

import { useEffect, useState } from "react";
import { useCrmForm, HoneypotField } from "@/components/useCrmForm";
import SmsConsentDisclosure from "@/components/SmsConsentDisclosure";
import { getContactMessages, type LocalizedOption } from "@/lib/i18n/contact";
import type { Locale } from "@/lib/i18n/config";

declare global { interface Window { gtag?: (...args: unknown[]) => void; } }
type LeadType = "buyer" | "seller" | "mortgage" | "general" | "";
const SERVICE_PARAM_MAP: Record<string, LeadType> = { "real-estate-buyer": "buyer", "real-estate-seller": "seller", mortgage: "mortgage", general: "general" };
const LEAD_TYPE_VALUE = { buyer: "real-estate-buyer", seller: "real-estate-seller", mortgage: "mortgage", general: "general" } as const;
const SUBJECT_VALUE = { buyer: "Website Lead — Real Estate Buyer", seller: "Website Lead — Real Estate Seller", mortgage: "Website Lead — Mortgage", general: "Website Lead — General Question" } as const;

function resolveInitialService(param?: string) {
  if (!param) return { leadType: "" as LeadType, ambiguousRealEstate: false };
  if (param === "real-estate") return { leadType: "" as LeadType, ambiguousRealEstate: true };
  return { leadType: SERVICE_PARAM_MAP[param] ?? "", ambiguousRealEstate: false };
}

const EMPTY_TYPE_FIELDS = {
  buyerWorkingWithAgent: "", buyerAreaCity: "", buyerTimeline: "", buyerEmploymentStatus: "", buyerSpokenWithLender: "", buyerPreApproved: "", buyerPriceRange: "", buyerDownPayment: "", buyerOwnsHome: "",
  sellerWorkingWithAgent: "", sellerPropertyAddress: "", sellerCity: "", sellerPropertyType: "", sellerCurrentlyListed: "", sellerTimeline: "", sellerPlanToBuyAgain: "", sellerOwnerOccupied: "", sellerMortgageBalance: "", sellerPropertyValue: "",
  mortgageHelpType: "", mortgagePropertyLocation: "", mortgageEmploymentStatus: "", mortgageCreditScoreRange: "", mortgagePropertyValue: "", mortgageDownPaymentOrBalance: "", mortgageTimeline: "",
};
const INITIAL_FORM_DATA = { firstName: "", lastName: "", phone: "", email: "", preferredLanguage: "", preferredContactMethod: "", bestTimeToContact: "", additionalDetails: "", ...EMPTY_TYPE_FIELDS };
type FormData = typeof INITIAL_FORM_DATA;
const inputClasses = "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200";
const labelClasses = "mb-1.5 block text-sm font-semibold text-slate-800";

function TextField({ label, name, value, onChange, type = "text", autoComplete, placeholder }: { label: string; name: keyof FormData; value: string; onChange: (name: keyof FormData, value: string) => void; type?: string; autoComplete?: string; placeholder?: string }) {
  const id = `field-${name}`;
  return <div><label htmlFor={id} className={labelClasses}>{label} <span aria-hidden="true">*</span></label><input id={id} type={type} name={name} value={value} onChange={(event) => onChange(name, event.target.value)} required aria-required="true" autoComplete={autoComplete} placeholder={placeholder} className={inputClasses} /></div>;
}
function SelectField({ label, name, value, onChange, options, choose, autoComplete }: { label: string; name: keyof FormData; value: string; onChange: (name: keyof FormData, value: string) => void; options: LocalizedOption[]; choose: string; autoComplete?: string }) {
  const id = `field-${name}`;
  return <div><label htmlFor={id} className={labelClasses}>{label} <span aria-hidden="true">*</span></label><select id={id} name={name} value={value} onChange={(event) => onChange(name, event.target.value)} required aria-required="true" autoComplete={autoComplete} className={inputClasses}><option value="">{choose}</option>{options.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>;
}

export default function ContactForm({ initialService, locale = "en" }: { initialService?: string; locale?: Locale }) {
  const initial = resolveInitialService(initialService);
  const copy = getContactMessages(locale);
  const [leadType, setLeadType] = useState<LeadType>(initial.leadType);
  const [ambiguousRealEstate, setAmbiguousRealEstate] = useState(initial.ambiguousRealEstate);
  const [formData, setFormData] = useState<FormData>({ ...INITIAL_FORM_DATA, preferredLanguage: locale });
  const [smsConsent, setSmsConsent] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [state, handleSubmit] = useCrmForm("contact");
  useEffect(() => setPageUrl(window.location.href), []);
  const updateField = (name: keyof FormData, value: string) => setFormData((previous) => ({ ...previous, [name]: value }));
  const selectLeadType = (value: LeadType) => { setLeadType(value); setAmbiguousRealEstate(false); setFormData((previous) => ({ ...previous, ...EMPTY_TYPE_FIELDS })); };
  const leadTypeValue = leadType ? LEAD_TYPE_VALUE[leadType] : "";
  const mortgageLeadValue = leadType === "buyer" || leadType === "mortgage" || (leadType === "seller" && formData.sellerPlanToBuyAgain === "yes") ? "yes" : "no";
  useEffect(() => { if (state.succeeded) window.gtag?.("event", "contact_form_submit", { lead_type: leadTypeValue, locale }); }, [state.succeeded, leadTypeValue, locale]);

  if (state.succeeded) return <div role="status" aria-live="polite" className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center"><h2 className="text-2xl font-bold text-emerald-800">{copy.successTitle}</h2><p className="mt-3 text-base leading-7 text-slate-700">{copy.successCopy}</p></div>;

  const help = Object.entries(copy.help) as [Exclude<LeadType, "">, readonly [string, string]][];
  const select = (label: string, name: keyof FormData, options: LocalizedOption[]) => <SelectField label={label} name={name} value={formData[name]} onChange={updateField} options={options} choose={copy.choose} />;
  const text = (label: string, name: keyof FormData, placeholder?: string, autoComplete?: string) => <TextField label={label} name={name} value={formData[name]} onChange={updateField} placeholder={placeholder} autoComplete={autoComplete} />;

  return <form onSubmit={handleSubmit} className="space-y-8"><HoneypotField />
    <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><legend className="px-1 text-lg font-bold text-blue-950">{copy.helpLegend} <span aria-hidden="true">*</span></legend>{ambiguousRealEstate && <p className="mt-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">{copy.ambiguous}</p>}<div className="mt-4 grid gap-3 sm:grid-cols-2">{help.map(([value, [label, description]]) => { const checked = leadType === value; return <label key={value} htmlFor={`help-option-${value}`} className={`flex cursor-pointer flex-col rounded-2xl border-2 p-4 transition focus-within:ring-2 focus-within:ring-blue-300 ${checked ? "border-blue-800 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300"}`}><span className="flex items-center gap-2 font-bold text-blue-950"><input type="radio" id={`help-option-${value}`} name="helpType" value={value} checked={checked} onChange={() => selectLeadType(value)} required aria-required="true" className="h-4 w-4 border-slate-300 text-blue-800 focus:ring-blue-700" />{label}</span><span className="mt-1.5 text-sm leading-5 text-slate-600">{description}</span></label>; })}</div></fieldset>

    {leadType && <>
      <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><legend className="px-1 text-lg font-bold text-blue-950">{copy.yourInfo}</legend><div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextField label={copy.firstName} name="firstName" value={formData.firstName} onChange={updateField} autoComplete="given-name" /><TextField label={copy.lastName} name="lastName" value={formData.lastName} onChange={updateField} autoComplete="family-name" /><TextField label={copy.phone} name="phone" type="tel" value={formData.phone} onChange={updateField} autoComplete="tel" /><TextField label={copy.email} name="email" type="email" value={formData.email} onChange={updateField} autoComplete="email" />
        <SelectField label={copy.preferredLanguage} name="preferredLanguage" value={formData.preferredLanguage} onChange={updateField} options={copy.options.languages} choose={copy.choose} autoComplete="language" />{select(copy.contactMethod, "preferredContactMethod", copy.options.contactMethods)}{select(copy.bestTime, "bestTimeToContact", copy.options.times)}
      </div><div className="mt-4"><label htmlFor="field-additionalDetails" className={labelClasses}>{copy.details} <span aria-hidden="true">*</span></label><textarea id="field-additionalDetails" name="additionalDetails" value={formData.additionalDetails} onChange={(event) => updateField("additionalDetails", event.target.value)} required aria-required="true" rows={4} placeholder={copy.detailsPlaceholder} className={inputClasses} /></div></fieldset>

      {leadType === "buyer" && <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><legend className="px-1 text-lg font-bold text-blue-950">{copy.buying}</legend><p className="mt-2 rounded-xl bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">{copy.buyingDisclosure}</p><div className="mt-4 grid gap-4 sm:grid-cols-2">{select(copy.agent, "buyerWorkingWithAgent", copy.options.yesNo)}{text(copy.buyerArea, "buyerAreaCity", undefined, "address-level2")}{select(copy.buyerWhen, "buyerTimeline", copy.options.timelines)}{select(copy.employed, "buyerEmploymentStatus", copy.options.employment)}{select(copy.spokenLender, "buyerSpokenWithLender", copy.options.yesNo)}{select(copy.preapproved, "buyerPreApproved", copy.options.yesNo)}{text(copy.priceRange, "buyerPriceRange", copy.priceRangePlaceholder)}{text(copy.downPayment, "buyerDownPayment", copy.downPaymentPlaceholder)}{select(copy.ownsHome, "buyerOwnsHome", copy.options.yesNo)}</div></fieldset>}

      {leadType === "seller" && <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><legend className="px-1 text-lg font-bold text-blue-950">{copy.selling}</legend><div className="mt-4 grid gap-4 sm:grid-cols-2">{select(copy.agent, "sellerWorkingWithAgent", copy.options.yesNo)}{text(copy.propertyAddress, "sellerPropertyAddress", undefined, "street-address")}{text(copy.city, "sellerCity", undefined, "address-level2")}{select(copy.propertyType, "sellerPropertyType", copy.options.propertyTypes)}{select(copy.currentlyListed, "sellerCurrentlyListed", copy.options.yesNo)}{select(copy.sellerWhen, "sellerTimeline", copy.options.timelines)}{select(copy.buyAgain, "sellerPlanToBuyAgain", copy.options.yesNo)}{select(copy.ownerOccupied, "sellerOwnerOccupied", copy.options.yesNo)}{text(copy.mortgageBalance, "sellerMortgageBalance", copy.mortgageBalancePlaceholder)}{text(copy.propertyValue, "sellerPropertyValue", copy.propertyValuePlaceholder)}</div>{formData.sellerPlanToBuyAgain === "yes" && <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">{copy.buyAgainNote}</p>}</fieldset>}

      {leadType === "mortgage" && <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><legend className="px-1 text-lg font-bold text-blue-950">{copy.mortgage}</legend><div className="mt-4 grid gap-4 sm:grid-cols-2">{select(copy.mortgageHelp, "mortgageHelpType", copy.options.mortgageHelp)}{text(copy.propertyLocation, "mortgagePropertyLocation", undefined, "address-level2")}{select(copy.employed, "mortgageEmploymentStatus", copy.options.employment)}{select(copy.creditScore, "mortgageCreditScoreRange", copy.options.credit)}{text(copy.valueOrPrice, "mortgagePropertyValue", copy.valuePlaceholder)}{text(copy.downOrBalance, "mortgageDownPaymentOrBalance", copy.downOrBalancePlaceholder)}{select(copy.moveForward, "mortgageTimeline", copy.options.timelines)}</div></fieldset>}

      <input type="hidden" name="lead_type" value={leadTypeValue} /><input type="hidden" name="mortgage_lead" value={mortgageLeadValue} /><input type="hidden" name="_subject" value={leadType ? SUBJECT_VALUE[leadType] : ""} /><input type="hidden" name="pageUrl" value={pageUrl} /><input type="hidden" name="sourceParam" value={initialService ?? "direct"} /><input type="hidden" name="sourceRoute" value={locale === "es" ? "/es/contact" : "/contact"} /><input type="hidden" name="locale" value={locale === "es" ? "es-US" : "en-US"} /><input type="hidden" name="formVersion" value="contact-bilingual-v1" />
      <SmsConsentDisclosure id="contact-form-sms-consent" checked={smsConsent} onChange={setSmsConsent} locale={locale} />
      {state.errors && !state.submitting && <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{copy.error}</div>}
      <button type="submit" disabled={state.submitting} className="w-full rounded-full bg-blue-900 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8">{state.submitting ? copy.sending : copy.submit}</button>
    </>}
  </form>;
}

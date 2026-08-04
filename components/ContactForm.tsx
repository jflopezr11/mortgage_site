"use client";

import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type LeadType = "buyer" | "seller" | "mortgage" | "general" | "";

type HelpOption = {
  value: LeadType;
  label: string;
  description: string;
};

const HELP_OPTIONS: HelpOption[] = [
  {
    value: "buyer",
    label: "Buy a Home",
    description: "Looking for a property and want guidance on financing too.",
  },
  {
    value: "seller",
    label: "Sell a Home",
    description: "Preparing to list or sell a property you own.",
  },
  {
    value: "mortgage",
    label: "Mortgage Only",
    description: "Purchase, refinance, or home equity — financing only.",
  },
  {
    value: "general",
    label: "General Question",
    description: "Not sure yet, or have a question before getting started.",
  },
];

const SERVICE_PARAM_MAP: Record<string, LeadType> = {
  "real-estate-buyer": "buyer",
  "real-estate-seller": "seller",
  mortgage: "mortgage",
  general: "general",
};

function resolveInitialService(param?: string): {
  leadType: LeadType;
  ambiguousRealEstate: boolean;
} {
  if (!param) return { leadType: "", ambiguousRealEstate: false };
  if (param === "real-estate") {
    return { leadType: "", ambiguousRealEstate: true };
  }
  const mapped = SERVICE_PARAM_MAP[param];
  return { leadType: mapped ?? "", ambiguousRealEstate: false };
}

const LANGUAGE_OPTIONS = ["English", "Spanish"];
const CONTACT_METHOD_OPTIONS = ["Phone Call", "Text Message", "Email"];
const BEST_TIME_OPTIONS = ["Morning", "Afternoon", "Evening"];
const YES_NO_OPTIONS = ["Yes", "No"];
const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Just researching",
];
const EMPLOYMENT_OPTIONS = [
  "Full-time",
  "Part-time",
  "Self-employed",
  "Not currently employed",
  "Other",
];
const PROPERTY_TYPE_OPTIONS = [
  "Single-family home",
  "Condo",
  "Townhome",
  "Multi-unit property",
  "Manufactured home",
  "Other",
];
const MORTGAGE_HELP_TYPE_OPTIONS = [
  "Purchase pre-approval",
  "Refinance",
  "HELOC or home equity loan",
  "Investment property financing",
  "Other",
];
const CREDIT_SCORE_OPTIONS = [
  "Below 580",
  "580–619",
  "620–679",
  "680–719",
  "720–759",
  "760+",
  "Not sure",
];

const LEAD_TYPE_VALUE: Record<Exclude<LeadType, "">, string> = {
  buyer: "real-estate-buyer",
  seller: "real-estate-seller",
  mortgage: "mortgage",
  general: "general",
};

const SUBJECT_VALUE: Record<Exclude<LeadType, "">, string> = {
  buyer: "Website Lead — Real Estate Buyer",
  seller: "Website Lead — Real Estate Seller",
  mortgage: "Website Lead — Mortgage",
  general: "Website Lead — General Question",
};

const EMPTY_TYPE_FIELDS = {
  buyerWorkingWithAgent: "",
  buyerAreaCity: "",
  buyerTimeline: "",
  buyerEmploymentStatus: "",
  buyerSpokenWithLender: "",
  buyerPreApproved: "",
  buyerPriceRange: "",
  buyerDownPayment: "",
  buyerOwnsHome: "",
  sellerWorkingWithAgent: "",
  sellerPropertyAddress: "",
  sellerCity: "",
  sellerPropertyType: "",
  sellerCurrentlyListed: "",
  sellerTimeline: "",
  sellerPlanToBuyAgain: "",
  sellerOwnerOccupied: "",
  sellerMortgageBalance: "",
  sellerPropertyValue: "",
  mortgageHelpType: "",
  mortgagePropertyLocation: "",
  mortgageEmploymentStatus: "",
  mortgageCreditScoreRange: "",
  mortgagePropertyValue: "",
  mortgageDownPaymentOrBalance: "",
  mortgageTimeline: "",
};

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  preferredLanguage: "",
  preferredContactMethod: "",
  bestTimeToContact: "",
  additionalDetails: "",
  ...EMPTY_TYPE_FIELDS,
};

type FormData = typeof INITIAL_FORM_DATA;

const inputClasses =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200";
const labelClasses = "mb-1.5 block text-sm font-semibold text-slate-800";

function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        required
        aria-required="true"
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={inputClasses}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  autoComplete,
}: {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  options: string[];
  autoComplete?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        required
        aria-required="true"
        autoComplete={autoComplete}
        className={inputClasses}
      >
        <option value="">Choose one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ContactForm({
  initialService,
}: {
  initialService?: string;
}) {
  const { leadType: initialLeadType, ambiguousRealEstate: initialAmbiguous } =
    resolveInitialService(initialService);

  const [leadType, setLeadType] = useState<LeadType>(initialLeadType);
  const [ambiguousRealEstate, setAmbiguousRealEstate] = useState(
    initialAmbiguous
  );
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const [state, handleSubmit] = useForm("xeeydvzk");

  const updateField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectLeadType = (value: LeadType) => {
    setLeadType(value);
    setAmbiguousRealEstate(false);
    setFormData((prev) => ({ ...prev, ...EMPTY_TYPE_FIELDS }));
  };

  const mortgageLeadValue =
    leadType === "buyer" || leadType === "mortgage"
      ? "yes"
      : leadType === "seller"
      ? formData.sellerPlanToBuyAgain === "Yes"
        ? "yes"
        : "no"
      : "no";

  const leadTypeValue = leadType ? LEAD_TYPE_VALUE[leadType] : "";
  const subjectValue = leadType ? SUBJECT_VALUE[leadType] : "";

  // Fires once, only after Formspree confirms the submission succeeded —
  // never on submit-button click — so this reflects a real completed lead,
  // not just an attempt. `lead_type` lets this single GA4 event be filtered
  // into buyer / seller / mortgage / general inquiry conversions.
  useEffect(() => {
    if (state.succeeded) {
      window.gtag?.("event", "contact_form_submit", {
        lead_type: leadTypeValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center"
      >
        <h2 className="text-2xl font-bold text-emerald-800">
          Thank you — your information was received.
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-700">
          Joshua will review what you shared and follow up with a practical
          next step using your preferred contact method.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate={false}>
      <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <legend className="px-1 text-lg font-bold text-blue-950">
          What do you need help with? <span aria-hidden="true">*</span>
        </legend>

        {ambiguousRealEstate && (
          <p className="mt-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">
            You came from the real estate page — please choose whether you’re
            looking to buy or sell below.
          </p>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {HELP_OPTIONS.map((option) => {
            const inputId = `help-option-${option.value}`;
            const checked = leadType === option.value;
            return (
              <label
                key={option.value}
                htmlFor={inputId}
                className={`flex cursor-pointer flex-col rounded-2xl border-2 p-4 transition focus-within:ring-2 focus-within:ring-blue-300 ${
                  checked
                    ? "border-blue-800 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <span className="flex items-center gap-2 font-bold text-blue-950">
                  <input
                    type="radio"
                    id={inputId}
                    name="helpType"
                    value={option.label}
                    checked={checked}
                    onChange={() => selectLeadType(option.value)}
                    required
                    aria-required="true"
                    className="h-4 w-4 border-slate-300 text-blue-800 focus:ring-blue-700"
                  />
                  {option.label}
                </span>
                <span className="mt-1.5 text-sm leading-5 text-slate-600">
                  {option.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {leadType && (
        <>
          <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <legend className="px-1 text-lg font-bold text-blue-950">
              Your Information
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={updateField}
                autoComplete="given-name"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={updateField}
                autoComplete="family-name"
              />
              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={updateField}
                autoComplete="tel"
              />
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={updateField}
                autoComplete="email"
              />
              <SelectField
                label="Preferred Language"
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={updateField}
                options={LANGUAGE_OPTIONS}
                autoComplete="language"
              />
              <SelectField
                label="Preferred Contact Method"
                name="preferredContactMethod"
                value={formData.preferredContactMethod}
                onChange={updateField}
                options={CONTACT_METHOD_OPTIONS}
              />
              <SelectField
                label="Best Time to Contact"
                name="bestTimeToContact"
                value={formData.bestTimeToContact}
                onChange={updateField}
                options={BEST_TIME_OPTIONS}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="field-additionalDetails" className={labelClasses}>
                Additional Details <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="field-additionalDetails"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={(event) =>
                  updateField("additionalDetails", event.target.value)
                }
                required
                aria-required="true"
                rows={4}
                placeholder="Anything else that would help Joshua understand your situation."
                className={inputClasses}
              />
            </div>
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="mt-2 text-sm font-semibold text-red-700"
            />
          </fieldset>

          {leadType === "buyer" && (
            <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <legend className="px-1 text-lg font-bold text-blue-950">
                Buying Details
              </legend>
              <p className="mt-2 rounded-xl bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
                Buying a home and financing are connected. Joshua can help you
                understand both sides of the transaction, but you may choose
                to use him for real estate, mortgage financing, or both.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Are you currently working with another real estate agent?"
                  name="buyerWorkingWithAgent"
                  value={formData.buyerWorkingWithAgent}
                  onChange={updateField}
                  options={YES_NO_OPTIONS}
                />
                <TextField
                  label="What city or area are you looking to buy in?"
                  name="buyerAreaCity"
                  value={formData.buyerAreaCity}
                  onChange={updateField}
                  autoComplete="address-level2"
                />
                <SelectField
                  label="When are you hoping to buy?"
                  name="buyerTimeline"
                  value={formData.buyerTimeline}
                  onChange={updateField}
                  options={TIMELINE_OPTIONS}
                />
                <SelectField
                  label="Are you currently employed?"
                  name="buyerEmploymentStatus"
                  value={formData.buyerEmploymentStatus}
                  onChange={updateField}
                  options={EMPLOYMENT_OPTIONS}
                />
                <SelectField
                  label="Have you already spoken with a mortgage lender?"
                  name="buyerSpokenWithLender"
                  value={formData.buyerSpokenWithLender}
                  onChange={updateField}
                  options={YES_NO_OPTIONS}
                />
                <SelectField
                  label="Have you already been pre-approved?"
                  name="buyerPreApproved"
                  value={formData.buyerPreApproved}
                  onChange={updateField}
                  options={YES_NO_OPTIONS}
                />
                <TextField
                  label="Estimated purchase price range"
                  name="buyerPriceRange"
                  value={formData.buyerPriceRange}
                  onChange={updateField}
                  placeholder="e.g. $500,000–$600,000"
                />
                <TextField
                  label="Estimated down payment amount or percentage"
                  name="buyerDownPayment"
                  value={formData.buyerDownPayment}
                  onChange={updateField}
                  placeholder="e.g. $50,000 or 10%"
                />
                <SelectField
                  label="Do you currently own a home?"
                  name="buyerOwnsHome"
                  value={formData.buyerOwnsHome}
                  onChange={updateField}
                  options={YES_NO_OPTIONS}
                />
              </div>
            </fieldset>
          )}

          {leadType === "seller" && (
            <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <legend className="px-1 text-lg font-bold text-blue-950">
                Selling Details
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Are you currently working with another real estate agent?"
                  name="sellerWorkingWithAgent"
                  value={formData.sellerWorkingWithAgent}
                  onChange={updateField}
                  options={YES_NO_OPTIONS}
                />
                <TextField
                  label="Property address"
                  name="sellerPropertyAddress"
                  value={formData.sellerPropertyAddress}
                  onChange={updateField}
                  autoComplete="street-address"
                />
                <TextField
                  label="City"
                  name="sellerCity"
                  value={formData.sellerCity}
                  onChange={updateField}
                  autoComplete="address-level2"
                />
                <SelectField
                  label="Property type"
                  name="sellerPropertyType"
                  value={formData.sellerPropertyType}
                  onChange={updateField}
                  options={PROPERTY_TYPE_OPTIONS}
                />
                <SelectField
                  label="Is the property currently listed?"
                  name="sellerCurrentlyListed"
                  value={formData.sellerCurrentlyListed}
                  onChange={updateField}
                  options={YES_NO_OPTIONS}
                />
                <SelectField
                  label="When are you hoping to sell?"
                  name="sellerTimeline"
                  value={formData.sellerTimeline}
                  onChange={updateField}
                  options={TIMELINE_OPTIONS}
                />
                <SelectField
                  label="Do you plan to buy another home after selling?"
                  name="sellerPlanToBuyAgain"
                  value={formData.sellerPlanToBuyAgain}
                  onChange={updateField}
                  options={YES_NO_OPTIONS}
                />
                <SelectField
                  label="Is the property owner-occupied?"
                  name="sellerOwnerOccupied"
                  value={formData.sellerOwnerOccupied}
                  onChange={updateField}
                  options={YES_NO_OPTIONS}
                />
                <TextField
                  label="Estimated remaining mortgage balance"
                  name="sellerMortgageBalance"
                  value={formData.sellerMortgageBalance}
                  onChange={updateField}
                  placeholder="e.g. $250,000 or none"
                />
                <TextField
                  label="Estimated property value"
                  name="sellerPropertyValue"
                  value={formData.sellerPropertyValue}
                  onChange={updateField}
                  placeholder="e.g. $700,000"
                />
              </div>
              {formData.sellerPlanToBuyAgain === "Yes" && (
                <p className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
                  Since you’re planning to buy again, Joshua will also follow
                  up about coordinating financing for your next home.
                </p>
              )}
            </fieldset>
          )}

          {leadType === "mortgage" && (
            <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <legend className="px-1 text-lg font-bold text-blue-950">
                Mortgage Details
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="What type of mortgage help do you need?"
                  name="mortgageHelpType"
                  value={formData.mortgageHelpType}
                  onChange={updateField}
                  options={MORTGAGE_HELP_TYPE_OPTIONS}
                />
                <TextField
                  label="What city or county is the property located in?"
                  name="mortgagePropertyLocation"
                  value={formData.mortgagePropertyLocation}
                  onChange={updateField}
                  autoComplete="address-level2"
                />
                <SelectField
                  label="Are you currently employed?"
                  name="mortgageEmploymentStatus"
                  value={formData.mortgageEmploymentStatus}
                  onChange={updateField}
                  options={EMPLOYMENT_OPTIONS}
                />
                <SelectField
                  label="Estimated credit score range"
                  name="mortgageCreditScoreRange"
                  value={formData.mortgageCreditScoreRange}
                  onChange={updateField}
                  options={CREDIT_SCORE_OPTIONS}
                />
                <TextField
                  label="Estimated property value or purchase price"
                  name="mortgagePropertyValue"
                  value={formData.mortgagePropertyValue}
                  onChange={updateField}
                  placeholder="e.g. $600,000"
                />
                <TextField
                  label="Estimated down payment or current mortgage balance"
                  name="mortgageDownPaymentOrBalance"
                  value={formData.mortgageDownPaymentOrBalance}
                  onChange={updateField}
                  placeholder="e.g. $60,000"
                />
                <SelectField
                  label="When do you want to move forward?"
                  name="mortgageTimeline"
                  value={formData.mortgageTimeline}
                  onChange={updateField}
                  options={TIMELINE_OPTIONS}
                />
              </div>
            </fieldset>
          )}

          <input type="hidden" name="lead_type" value={leadTypeValue} />
          <input type="hidden" name="mortgage_lead" value={mortgageLeadValue} />
          <input type="hidden" name="_subject" value={subjectValue} />
          <input type="hidden" name="pageUrl" value={pageUrl} />
          <input
            type="hidden"
            name="sourceParam"
            value={initialService ?? "direct"}
          />

          {state.errors && !state.submitting && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            >
              There was a problem submitting your information. Please try
              again, or reach out directly if the issue continues.
            </div>
          )}

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full rounded-full bg-blue-900 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
          >
            {state.submitting ? "Sending..." : "Send My Information"}
          </button>
        </>
      )}
    </form>
  );
}

"use client";

import Link from "next/link";

export const SMS_DISCLOSURE_VERSION = "August 18, 2026";

export default function SmsConsentDisclosure({
  checked,
  onChange,
  id = "sms-consent",
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}) {
  const descriptionId = `${id}-description`;

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-describedby={descriptionId}
        className="mt-1 h-4 w-4 flex-none rounded border-slate-300 text-blue-600 focus:ring-blue-600"
      />
      <label
        id={descriptionId}
        htmlFor={id}
        className="text-xs leading-5 text-slate-600"
      >
        By checking this box, I agree to receive calls and text messages from
        Joshua Lopez and Got Mortgage Solutions concerning my mortgage or
        home-equity inquiry at the telephone number I provided, including
        messages sent using automated technology or an artificial or
        prerecorded voice. Message frequency varies. Message and data rates may
        apply. Consent is not a condition of purchasing any property, goods, or
        services. Reply STOP to opt out or HELP for assistance. View the{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
        >
          Privacy Policy
        </Link>
        .
      </label>
      <input
        type="hidden"
        name="smsConsent"
        value={checked ? "Checked" : "Not checked"}
      />
      <input
        type="hidden"
        name="smsConsentDisclosureVersion"
        value={SMS_DISCLOSURE_VERSION}
      />
    </div>
  );
}

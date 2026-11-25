"use client";

import { useRef, useState, type FormEvent } from "react";

type FormState = { submitting: boolean; succeeded: boolean; errors: string | null };

// Must match HONEYPOT_FIELD in app/api/website-leads/route.ts.
export const HONEYPOT_FIELD = "website";

export function useCrmForm(formKind: string): [FormState, (event: FormEvent<HTMLFormElement>) => Promise<void>] {
  const [state, setState] = useState<FormState>({ submitting: false, succeeded: false, errors: null });
  // When the form appeared, so the server can tell instant bot submissions from people.
  const startedAt = useRef(Date.now());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.submitting) return;
    setState({ submitting: true, succeeded: false, errors: null });

    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/website-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formKind, fields, elapsedMs: Date.now() - startedAt.current }),
      });
      if (!response.ok) throw new Error(`Submission failed (${response.status})`);
      setState({ submitting: false, succeeded: true, errors: null });
    } catch {
      setState({ submitting: false, succeeded: false, errors: "Could not send your information. Please try again." });
    }
  };

  return [state, handleSubmit];
}

// Spam trap: invisible to people and screen readers, but bots that fill every field fill this one too.
export function HoneypotField() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Leave this field empty
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function ValidationError({ errors }: { errors: string | null; field?: string; prefix?: string }) {
  return errors ? <p role="alert" className="mt-2 text-sm text-red-700">{errors}</p> : null;
}

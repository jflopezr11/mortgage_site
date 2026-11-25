"use client";

import { useState, type FormEvent } from "react";

type FormState = { submitting: boolean; succeeded: boolean; errors: string | null };

export function useCrmForm(formKind: string): [FormState, (event: FormEvent<HTMLFormElement>) => Promise<void>] {
  const [state, setState] = useState<FormState>({ submitting: false, succeeded: false, errors: null });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.submitting) return;
    setState({ submitting: true, succeeded: false, errors: null });

    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/website-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formKind, fields }),
      });
      if (!response.ok) throw new Error(`Submission failed (${response.status})`);
      setState({ submitting: false, succeeded: true, errors: null });
    } catch {
      setState({ submitting: false, succeeded: false, errors: "Could not send your information. Please try again." });
    }
  };

  return [state, handleSubmit];
}

export function ValidationError({ errors }: { errors: string | null; field?: string; prefix?: string }) {
  return errors ? <p role="alert" className="mt-2 text-sm text-red-700">{errors}</p> : null;
}

"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function LoanApplicationEmbed() {
  const isHoveringIframe = useRef(false);
  const hasFiredApplicationStarted = useRef(false);

  useEffect(() => {
    window.gtag?.("event", "loan_page_view");

    // The application itself runs on a third-party origin (LendingPad),
    // so this page cannot receive a click/submit event from inside the
    // iframe directly. As a best-effort proxy for "the visitor began
    // interacting with the application," we detect the browser window
    // losing focus while the pointer is over the iframe — the standard
    // technique for approximating a click into a cross-origin iframe.
    // This is an approximation, not a confirmed application start, and
    // should be validated against real GA4 data after deployment.
    const handleWindowBlur = () => {
      if (isHoveringIframe.current && !hasFiredApplicationStarted.current) {
        hasFiredApplicationStarted.current = true;
        window.gtag?.("event", "mortgage_application_started");
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, []);

  return (
    <div
      onMouseEnter={() => {
        isHoveringIframe.current = true;
      }}
      onMouseLeave={() => {
        isHoveringIframe.current = false;
      }}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      <iframe
        src="https://prod.lendingpad.com/got-mortgage-solutions-investments-inc/pos#/?loid=71d6f637-4e06-4c0a-9203-fde777a38638"
        title="Mortgage application"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}

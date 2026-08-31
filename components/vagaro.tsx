"use client";

import { useEffect, useRef } from "react";

/**
 * Vagaro's booking widget, embedded in the page.
 *
 * This is now the main content of the site rather than a secondary path, so it
 * loads on mount — no gate, no click required. React will not execute a
 * <script> that arrives through innerHTML, so each one is re-created as a real
 * element and Vagaro's loader then injects its own iframe.
 */
export function VagaroWidget({ html }: { html: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || el.childElementCount > 0) return;

    el.innerHTML = html;
    el.querySelectorAll("script").forEach((old) => {
      const s = document.createElement("script");
      for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
      s.text = old.textContent ?? "";
      old.replaceWith(s);
    });
  }, [html]);

  // Vagaro's interface is light and theirs. It gets its own bone ground rather
  // than a half-hearted attempt to match the page, framed like a printed form
  // on a dark counter.
  return <div ref={host} className="min-h-[40rem] bg-bone p-1 text-ink" />;
}

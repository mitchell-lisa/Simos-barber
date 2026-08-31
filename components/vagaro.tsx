"use client";

import { useEffect, useRef } from "react";

/**
 * Vagaro's embedded booking widget.
 *
 * The markup comes from `business.booking.embedHtml`, pasted verbatim out of
 * John's Vagaro account. The one thing that needs handling: React will not
 * execute a <script> that arrives through innerHTML, so each one is re-created
 * as a real element after the markup lands. Vagaro's loader then injects its
 * own iframe in place.
 *
 * This deliberately loads on mount rather than waiting for the section to
 * scroll into view. An earlier version gated it behind an IntersectionObserver
 * to keep third-party JavaScript off the critical path — but the observer does
 * not report intersections while a tab is not being painted, so the widget sat
 * empty in any background tab until it was focused. Booking is the entire point
 * of this page; it should be ready when the visitor arrives, not a few hundred
 * milliseconds cheaper to load.
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

  return (
    <div
      ref={host}
      // Vagaro's widget is their interface, not ours: light, rounded, its own
      // type. Rather than fight it and lose, it gets a deliberate white panel
      // to sit in — the way a printed form sits on a dark counter. The
      // min-height reserves roughly the space the iframe takes so the page
      // does not jump as it arrives.
      className="min-h-[52rem] overflow-hidden bg-bone p-1 text-ink"
    />
  );
}

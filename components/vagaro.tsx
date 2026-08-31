"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vagaro's embedded booking widget.
 *
 * The markup comes from `business.booking.embedHtml`, pasted verbatim out of
 * John's Vagaro account. Two things make this less trivial than it looks:
 *
 * 1. React will not execute a <script> that arrives through innerHTML, so each
 *    one is re-created as a real element after the markup lands.
 * 2. Booking widgets are heavy third-party JavaScript. This one is held back
 *    until the section is nearly on screen, so it never competes with the
 *    first paint on a phone — which is where most people will open this.
 */
export function VagaroWidget({ html }: { html: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || load) return;

    // No IntersectionObserver (very old browser): just load it.
    if (typeof IntersectionObserver === "undefined") {
      setLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  useEffect(() => {
    const el = host.current;
    if (!load || !el) return;

    el.innerHTML = html;
    el.querySelectorAll("script").forEach((old) => {
      const s = document.createElement("script");
      for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
      s.text = old.textContent ?? "";
      old.replaceWith(s);
    });
  }, [load, html]);

  return (
    <div
      ref={host}
      // Vagaro's widget is their interface, not ours: light, rounded, its own
      // type. Rather than fight it and lose, it gets a deliberate white panel
      // to sit in — the way a printed form sits on a dark counter.
      className="min-h-[28rem] overflow-hidden bg-bone p-1 text-ink"
    />
  );
}

"use client";

import { useCallback, useEffect, useRef } from "react";
import { business as b } from "@/lib/business";
import { BOOK_EVENT } from "./book-button";

/**
 * Vagaro's booking widget, in a dialog over the page.
 *
 * Why a dialog rather than an inline panel: Vagaro's "In Website" widget lists
 * every service, which on this shop is eighteen of them at roughly 3,500px. Put
 * inline it made 64% of the page the same menu twice and pushed The Shop, the
 * 1916 section and Visit below the fold. Vagaro offers a "Popup" widget type
 * that solves this, but it has to be regenerated inside John's account — this
 * gets the same result today, from the code he already sent.
 *
 * Two details that matter:
 *
 * 1. The widget is injected on first open, not on mount. Nobody pays for
 *    Vagaro's JavaScript unless they actually intend to book, and "first open"
 *    is a real user gesture — unlike an IntersectionObserver, which silently
 *    never fires in a tab that is not being painted.
 * 2. React will not execute a <script> that arrives through innerHTML, so each
 *    one is re-created as a real element.
 */
export function BookingDialog({ html }: { html: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  const open = useCallback(() => {
    const d = dialog.current;
    const el = host.current;
    if (!d || !el) return;

    if (!injected.current) {
      injected.current = true;
      el.innerHTML = html;
      el.querySelectorAll("script").forEach((old) => {
        const s = document.createElement("script");
        for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
        s.text = old.textContent ?? "";
        old.replaceWith(s);
      });
    }

    if (!d.open) d.showModal();
  }, [html]);

  useEffect(() => {
    window.addEventListener(BOOK_EVENT, open);
    return () => window.removeEventListener(BOOK_EVENT, open);
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-label={`Book an appointment at ${b.fullName}`}
      className="booking-dialog"
      // Clicking the backdrop lands on the dialog itself, never on its contents.
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-hair bg-ink px-5 py-3.5">
        <p className="label text-bone">Book an appointment</p>
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center border border-hair-2 text-bone transition-colors hover:border-brass hover:text-brass-2"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              d="M6 6 18 18M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      </div>

      {/* Vagaro's interface is light and theirs; it gets its own bone ground
          rather than a half-hearted attempt to match the page. */}
      <div ref={host} className="min-h-[24rem] bg-bone p-1 text-ink" />
    </dialog>
  );
}

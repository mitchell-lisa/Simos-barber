"use client";

import { useEffect, useRef } from "react";

/**
 * Vagaro's booking widget, embedded in the page.
 *
 * Two things about how it is loaded, both because of one habit of Vagaro's
 * loader: when its iframe finishes, it focuses something inside it, and the
 * browser scrolls the page to bring that into view. On a fresh visit that
 * meant reading the top of the page and being yanked down to the widget a
 * second or two later.
 *
 * So, first, the widget is not injected on mount. It waits until the Book
 * section is about to scroll into view, so the visitor is already there when
 * the widget arrives. Second, for a few seconds after injection any scroll the
 * visitor did not ask for (no wheel, touch, key or pointer in the meantime) is
 * put straight back where it was.
 *
 * React will not execute a <script> that arrives through innerHTML, so each one
 * is re-created as a real element and Vagaro's loader then injects its iframe.
 */
export function VagaroWidget({ html }: { html: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || el.childElementCount > 0) return;

    let cleanup: (() => void) | undefined;

    // When did the visitor last touch the page? If the widget lands while they
    // are mid-scroll (say, on the way down from the Book button), the hold is
    // skipped: any jump then only finishes the trip they started.
    let lastInput = 0;
    const note = () => {
      lastInput = Date.now();
    };
    const inputs = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    inputs.forEach((t) => window.addEventListener(t, note, { passive: true }));

    const inject = () => {
      el.innerHTML = html;
      el.querySelectorAll("script").forEach((old) => {
        const s = document.createElement("script");
        for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
        s.text = old.textContent ?? "";
        old.replaceWith(s);
      });
      if (Date.now() - lastInput > 2500) cleanup = holdScroll(6000);
    };

    if (typeof IntersectionObserver === "undefined") {
      inject();
      return () => {
        inputs.forEach((t) => window.removeEventListener(t, note));
        cleanup?.();
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        inject();
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      inputs.forEach((t) => window.removeEventListener(t, note));
      cleanup?.();
    };
  }, [html]);

  // Vagaro's interface is light and theirs. It gets its own bone ground rather
  // than a half-hearted attempt to match the page, framed like a printed form
  // on a dark counter.
  return <div ref={host} className="min-h-[40rem] bg-bone p-1 text-ink" />;
}

/**
 * For `ms` after the widget is injected, undo any scroll the visitor did not
 * cause. Their own scrolling (wheel, touch, keys, a click on a link) clears the
 * hold at once; a scroll with none of those behind it is the widget stealing
 * focus, and the page goes straight back.
 */
function holdScroll(ms: number) {
  let held: number | null = window.scrollY;
  const release = () => {
    held = null;
  };
  const onScroll = () => {
    if (held === null) return;
    if (Math.abs(window.scrollY - held) > 2) {
      window.scrollTo({ top: held, behavior: "instant" });
    }
  };
  const user = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
  user.forEach((t) => window.addEventListener(t, release, { passive: true }));
  window.addEventListener("scroll", onScroll, { passive: true });
  const timer = window.setTimeout(release, ms);

  return () => {
    release();
    window.clearTimeout(timer);
    user.forEach((t) => window.removeEventListener(t, release));
    window.removeEventListener("scroll", onScroll);
  };
}

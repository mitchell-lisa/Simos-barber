"use client";

import { useEffect, useRef, useState } from "react";
import { business as b } from "@/lib/business";

/* ───────────────────────── icons (hand-drawn, no icon package) ───────────── */

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006.5 6.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.2 2 2 0 016.5 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ───────────────────────── scroll reveal ─────────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ───────────────────────── preview disclosure ────────────────────────────── */

export function PreviewBanner() {
  const [hidden, setHidden] = useState(false);
  if (!b.preview.active || hidden) return null;
  return (
    <div className="relative z-50 border-b border-gold-dim/40 bg-ink-2">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-2.5 sm:px-8">
        <span className="hidden h-1.5 w-1.5 shrink-0 rotate-45 bg-gold sm:block" />
        <p className="min-w-0 flex-1 text-[11px] leading-relaxed text-cream-dim sm:text-xs">
          <span className="text-cream">Private preview.</span> Built by{" "}
          {b.preview.builtBy} for {b.fullName} — not yet the shop&apos;s official
          website.
        </p>
        <button
          onClick={() => setHidden(true)}
          className="shrink-0 px-2 py-1 text-[11px] uppercase tracking-widest text-cream-dim transition-colors hover:text-cream"
          aria-label="Dismiss preview notice"
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── header ────────────────────────────────────────── */

const NAV = [
  { label: "The Shop", href: "#shop" },
  { label: "Services", href: "#services" },
  { label: "Visit", href: "#visit" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        solid ? "border-b border-white/8 bg-ink/92 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={b.fullName}>
          <img
            src="/media/logo.webp"
            alt=""
            width={48}
            height={48}
            className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
          />
          <span className="label hidden text-gold sm:block">
            240 Lancaster Ave
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="label text-cream-dim transition-colors hover:text-cream"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#book"
            className="label border border-gold/60 px-4 py-2.5 text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Book a chair
          </a>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <a
            href={`tel:${b.phone.e164}`}
            className="flex h-11 w-11 items-center justify-center text-gold"
            aria-label={`Call ${b.phone.display}`}
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <button
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
            aria-label="Open menu"
          >
            <span className="block h-px w-6 bg-cream" />
            <span className="block h-px w-6 bg-cream" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink md:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <img src="/media/logo.webp" alt="" width={44} height={44} className="h-11 w-11" />
            <button
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center text-cream"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-2 px-5 pb-24">
            {[...NAV, { label: "Book a chair", href: "#book" }].map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="display border-b border-white/8 py-5 text-4xl text-cream"
              >
                {n.label}
              </a>
            ))}
            <a
              href={`tel:${b.phone.e164}`}
              className="mt-8 flex items-center gap-3 text-gold"
            >
              <PhoneIcon className="h-5 w-5" />
              <span className="text-lg">{b.phone.display}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ───────────────────────── mobile sticky actions ─────────────────────────── */

export function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-ink/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={`tel:${b.phone.e164}`}
        className="label flex items-center justify-center gap-2 py-4 text-cream"
      >
        <PhoneIcon className="h-4 w-4" />
        Call
      </a>
      <a
        href="#book"
        className="label flex items-center justify-center gap-2 bg-gold py-4 text-ink"
      >
        Book a chair
      </a>
    </div>
  );
}

/* ───────────────────────── footer ────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink px-5 pb-28 pt-16 sm:px-8 md:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-16">
          <img
            src="/media/logo.webp"
            alt={`${b.fullName} logo`}
            width={104}
            height={104}
            className="h-24 w-24"
          />

          <div className="space-y-1.5">
            <p className="display text-2xl text-cream">{b.fullName}</p>
            <p className="text-sm text-cream-dim">{b.address.oneLine}</p>
            <p className="text-sm">
              <a href={`tel:${b.phone.e164}`} className="text-gold hover:text-cream">
                {b.phone.display}
              </a>
            </p>
            <p className="script pt-2 text-lg text-gold">{b.motto}</p>
          </div>

          <a
            href={b.social.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 text-sm text-cream-dim transition-colors hover:text-cream"
          >
            <InstagramIcon className="h-5 w-5" />
            {b.social.instagram.handle}
          </a>
        </div>

        <div className="mt-14 border-t border-white/8 pt-6">
          <p className="text-[11px] leading-relaxed text-cream-dim">
            {b.preview.active ? (
              <>
                This is a private preview built by {b.preview.builtBy} to show what a
                website for {b.fullName} could look like. It is not the shop&apos;s
                official website and is not indexed by search engines. Questions:{" "}
                <a href={`mailto:${b.preview.builtByEmail}`} className="underline hover:text-cream">
                  {b.preview.builtByEmail}
                </a>
                .
              </>
            ) : (
              <>© {new Date().getFullYear()} {b.fullName}. All rights reserved.</>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

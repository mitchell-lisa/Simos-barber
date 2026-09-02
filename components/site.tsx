import { business as b } from "@/lib/business";
import { hoursSummary } from "@/lib/schedule";

/* ───────────────────────── icons ─────────────────────────────────────────
   Drawn rather than borrowed. Both reference shops mark sections with the
   tools of the trade, so these are the tools, not generic UI glyphs.        */

type IconProps = { className?: string };
const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export function ScissorsIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="8" cy="24.5" r="3.5" {...stroke} />
      <circle cx="24" cy="24.5" r="3.5" {...stroke} />
      <path d="M10.4 22.1 25 4M21.6 22.1 7 4" {...stroke} />
    </svg>
  );
}

export function RazorIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {/* open straight razor: blade, then the folded handle */}
      <path d="M6 21 22.5 4.5 27 9 10.5 25.5Z" {...stroke} />
      <path d="M6 21 3 26.5 7.5 29l3.5-3.5" {...stroke} />
    </svg>
  );
}

export function CombIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M3.5 7.5h25v4a2 2 0 0 1-2 2h-21a2 2 0 0 1-2-2z" {...stroke} />
      <path d="M8 13.5v7M13 13.5v10M18 13.5v10M23 13.5v10M27.5 13.5v7" {...stroke} />
    </svg>
  );
}

export function PoleIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="4" r="2.2" {...stroke} />
      <rect x="10" y="6.6" width="12" height="3" rx="0.8" {...stroke} />
      <rect x="11.6" y="9.6" width="8.8" height="12.8" {...stroke} />
      <path d="M11.6 20.4 20.4 14.6M11.6 16.2 20.4 10.4" {...stroke} />
      <rect x="10" y="22.4" width="12" height="3" rx="0.8" {...stroke} />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006.5 6.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.2 2 2 0 016.5 3z"
        {...stroke}
      />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} />
      <circle cx="12" cy="12" r="4" {...stroke} />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function PinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" {...stroke} />
      <circle cx="12" cy="10" r="2.5" {...stroke} />
    </svg>
  );
}

export function Badge({ className = "" }: IconProps) {
  return (
    <img
      src="/media/logo.webp"
      alt={`${b.signName}. ${b.motto}`}
      width={256}
      height={256}
      className={className}
    />
  );
}

/* ───────────────────────── shared button ─────────────────────────────────
   Lives in its own client module so Header and Footer stay server-rendered.  */

import { BookButton } from "./book-button";
import { TodayHours } from "./today-hours";
export { BookButton };

/* ───────────────────────── preview disclosure ────────────────────────────── */

export function PreviewNotice() {
  if (!b.preview.active) return null;
  return (
    <div className="bg-ink-3">
      <p className="mx-auto max-w-6xl px-5 py-2 text-center text-[11px] leading-relaxed text-bone-2 sm:px-8">
        Private preview built by {b.preview.builtBy} for {b.fullName}, not yet
        the shop&apos;s official website.
      </p>
    </div>
  );
}

/* ───────────────────────── header ────────────────────────────────────────── */

const NAV = [
  { label: "Menu", href: "#menu" },
  { label: "The Shop", href: "#shop" },
  { label: "Book", href: "#book" },
  { label: "Visit", href: "#visit" },
];

export function Header() {
  return (
    <>
      {/* A shop puts its phone and its hours on the door, not three clicks in. */}
      <div className="hidden border-b border-hair bg-ink-2 md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-8 py-2.5">
          <TodayHours className="text-xs text-bone-3" />
          <p className="ml-auto text-xs text-bone-3">{b.address.oneLine}</p>
          <a
            href={`tel:${b.phone.e164}`}
            className="inline-flex items-center gap-2 text-xs text-bone transition-colors hover:text-brass-2"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            {b.phone.display}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-hair bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-2.5 sm:px-8">
          <a href="#top" className="flex items-center" aria-label={b.fullName}>
            {/* His wordmark, the pole for the I — the same lettering as the
                painted door. The round emblem lives in the footer. */}
            <img
              src="/media/wordmark.webp"
              alt={b.signName}
              width={1000}
              height={556}
              className="h-16 w-auto sm:h-20"
            />
          </a>

          <nav className="ml-auto hidden items-center gap-9 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="label text-bone-2 transition-colors hover:text-bone"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a
              href={`tel:${b.phone.e164}`}
              className="flex h-11 w-11 items-center justify-center border border-hair-2 text-bone transition-colors hover:border-brass hover:text-brass-2 md:hidden"
              aria-label={`Call ${b.phone.display}`}
            >
              <PhoneIcon className="h-4 w-4" />
            </a>
            <BookButton className="px-5 py-3 sm:px-7 sm:py-3.5">Book</BookButton>
          </div>
        </div>
      </header>
    </>
  );
}

/* ───────────────────────── footer ────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hair bg-ink-2">
      <div className="deco pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Badge className="h-20 w-20" />
            <p className="display mt-5 text-2xl text-bone">{b.fullName}</p>
            <p className="mt-2 text-sm italic text-brass">{b.motto}</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="label mb-4 text-bone-3">Find us</p>
            <p className="text-bone-2">{b.address.street}</p>
            <p className="text-bone-2">
              {b.address.city}, {b.address.state} {b.address.zip}
            </p>
            <p className="pt-2">
              <a
                href={`tel:${b.phone.e164}`}
                className="text-bone transition-colors hover:text-brass-2"
              >
                {b.phone.display}
              </a>
            </p>
            <p>
              <a
                href={b.social.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-bone-2 transition-colors hover:text-bone"
              >
                <InstagramIcon className="h-4 w-4" />
                {b.social.instagram.handle}
              </a>
            </p>
          </div>

          <div className="text-sm">
            <p className="label mb-4 text-bone-3">Hours</p>
            <dl className="space-y-2">
              {hoursSummary().map((row) => (
                <div key={row.days} className="flex justify-between gap-6">
                  <dt className="text-bone-2">{row.days}</dt>
                  <dd className="text-bone-3">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <BookButton className="mt-7 w-full" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hair pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-[11px] leading-relaxed text-bone-3">
            {b.preview.active ? (
              <>
                This is a private preview built by {b.preview.builtBy} to show
                what a website for {b.fullName} could look like. It is not the
                shop&apos;s official website and is not indexed by search
                engines. Questions:{" "}
                <a
                  href={`mailto:${b.preview.builtByEmail}`}
                  className="underline underline-offset-2"
                >
                  {b.preview.builtByEmail}
                </a>
                .
              </>
            ) : (
              <>
                © {new Date().getFullYear()} {b.fullName}. All rights reserved.
              </>
            )}
          </p>
          <p className="text-[11px] leading-relaxed text-bone-3 sm:text-right">
            Website by{" "}
            <a
              href={b.preview.creditUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-bone"
            >
              {b.preview.credit}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

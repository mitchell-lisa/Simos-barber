import { business as b } from "@/lib/business";
import { hoursSummary } from "@/lib/schedule";

/* ───────────────────────── icons ─────────────────────────────────────────── */

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006.5 6.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.2 2 2 0 016.5 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function Badge({ className = "" }: { className?: string }) {
  return (
    <img
      src="/media/logo.webp"
      alt={`${b.fullName} — ${b.motto}`}
      width={520}
      height={520}
      className={className}
    />
  );
}

/* ───────────────────────── preview disclosure ────────────────────────────── */

export function PreviewNotice() {
  if (!b.preview.active) return null;
  return (
    <div className="border-b border-rule bg-ink text-paper">
      <p className="mx-auto max-w-6xl px-6 py-2 text-center text-[11px] leading-relaxed sm:px-8">
        Private preview built by {b.preview.builtBy} for {b.fullName} — not yet
        the shop&apos;s official website.
      </p>
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
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-6 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={b.fullName}>
          <Badge className="h-9 w-9 shrink-0" />
          <span className="display hidden text-lg text-ink sm:block">
            {b.fullName}
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {n.label}
            </a>
          ))}
          <a
            href={`tel:${b.phone.e164}`}
            className="text-sm text-ink-2 transition-colors hover:text-ink"
          >
            {b.phone.display}
          </a>
        </nav>

        <a
          href="#book"
          className="ml-auto shrink-0 bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark md:ml-0"
        >
          Book
        </a>
      </div>
    </header>
  );
}

/* ───────────────────────── footer ────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="border-t border-rule bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Badge className="h-16 w-16" />
            <p className="display mt-5 text-xl text-ink">{b.fullName}</p>
            <p className="mt-1 text-sm text-ink-3">{b.motto}</p>
          </div>

          <div className="space-y-1.5 text-sm">
            <p className="label mb-3 text-ink-3">Find us</p>
            <p className="text-ink-2">{b.address.street}</p>
            <p className="text-ink-2">
              {b.address.city}, {b.address.state} {b.address.zip}
            </p>
            <p className="pt-2">
              <a
                href={`tel:${b.phone.e164}`}
                className="text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
              >
                {b.phone.display}
              </a>
            </p>
            <p>
              <a
                href={b.social.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-ink-2 hover:text-ink"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>
            </p>
          </div>

          <div className="text-sm">
            <p className="label mb-3 text-ink-3">Hours</p>
            <dl className="space-y-1.5">
              {hoursSummary().map((row) => (
                <div key={row.days} className="flex justify-between gap-6">
                  <dt className="text-ink-2">{row.days}</dt>
                  <dd className="text-ink-3">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 border-t border-rule-soft pt-6">
          <p className="text-[11px] leading-relaxed text-ink-3">
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
        </div>
      </div>
    </footer>
  );
}

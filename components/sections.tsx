import { business as b } from "@/lib/business";
import { hoursSummary } from "@/lib/schedule";
import {
  BookButton,
  CombIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  PoleIcon,
  RazorIcon,
  ScissorsIcon,
} from "./site";
import { VagaroWidget } from "./vagaro";

/* ───────────────────────── hero ──────────────────────────────────────────── */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-hair">
      {/* The shop's own wallpaper, redrawn — barely there, but it is his room. */}
      <div className="deco pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />

      {/* The room, dissolved into the page: full bleed behind the type on a
          phone, running off the right edge on a wide screen. The chairs,
          the mirrors, the wallpaper and the black door — "Sit down" is
          written over the thing it means. */}
      <div
        className="mesh-hero pointer-events-none absolute inset-0 lg:left-auto lg:w-[46%]"
        aria-hidden="true"
      >
        <img
          src="/media/room.webp"
          alt=""
          width={1200}
          height={1617}
          decoding="async"
          className="h-full w-full object-cover object-[50%_45%] opacity-30 brightness-[0.6] contrast-[1.05] saturate-[0.85] lg:opacity-85 lg:brightness-[0.72]"
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,38rem)_1fr] lg:py-32">
        <div className="min-w-0">
          <p className="label text-brass">
            {b.address.street} · {b.address.city}, Pennsylvania
          </p>

          <h1 className="display mt-6 text-[3.25rem] text-bone sm:text-[4.5rem] lg:text-[4.75rem]">
            Sit down.
            <br />
            Take your time.
          </h1>

          <p className="mt-8 max-w-md text-[1.0625rem] leading-relaxed text-bone-2">
            A traditional barbershop on Lancaster Avenue — clippers, shears and a
            straight razor, and a barber who takes the time to get it right.
            Opening {b.opensOnLabel}.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <BookButton />
            <a
              href={`tel:${b.phone.e164}`}
              className="label inline-flex items-center justify-center gap-2.5 border border-hair-2 px-7 py-4 text-bone transition-colors hover:border-brass hover:text-brass-2"
            >
              <PhoneIcon className="h-4 w-4" />
              {b.phone.display}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ───────────────────────── the door ──────────────────────────────────────
   His menu, as he painted it on the shop's back door. The board is drawn to
   the door — gold rule inset on black, corner flourishes, hand-lettered
   names, brush-printed descriptions, prices in painted ovals — and reads
   from `business.menu`, which is the door line for line. Booking still
   happens in Vagaro; the button under the board scrolls to the widget.      */

function FleurDeLis({ className = "" }: { className?: string }) {
  // The fleur-de-lis he painted outside the rule: one at each corner, one
  // at the middle of each side, one above and one below.
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 1.5c-2.2 3-2.6 6.2 0 10 2.6-3.8 2.2-7 0-10z" />
      <path d="M12 11.5c-3.2-3.4-7-3.2-9.5-.6 1.8 2.6 5.8 3.2 9.5.6z" />
      <path d="M12 11.5c3.2-3.4 7-3.2 9.5-.6-1.8 2.6-5.8 3.2-9.5.6z" />
      <rect x="9" y="11.8" width="6" height="2.2" rx="0.6" />
      <path d="M12 14.2c-1.9 2.4-1.9 5.4 0 8.3 1.9-2.9 1.9-5.9 0-8.3z" />
      <path d="M9.4 14.6c-1.6 1.6-3.4 1.9-5 1 .4 1.8 2.4 2.8 5 1.9zM14.6 14.6c1.6 1.6 3.4 1.9 5 1-.4 1.8-2.4 2.8-5 1.9z" />
    </svg>
  );
}

function Quatrefoil({ className = "" }: { className?: string }) {
  // The four-leaf ornament under his name.
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2.5c-2.6 2.6-2.6 6.9 0 9.5 2.6-2.6 2.6-6.9 0-9.5z" />
      <path d="M12 21.5c-2.6-2.6-2.6-6.9 0-9.5 2.6 2.6 2.6 6.9 0 9.5z" />
      <path d="M2.5 12c2.6-2.6 6.9-2.6 9.5 0-2.6 2.6-6.9 2.6-9.5 0z" />
      <path d="M21.5 12c-2.6-2.6-6.9-2.6-9.5 0 2.6 2.6 6.9 2.6 9.5 0z" />
      <circle cx="5.5" cy="5.5" r="1.1" />
      <circle cx="18.5" cy="5.5" r="1.1" />
      <circle cx="5.5" cy="18.5" r="1.1" />
      <circle cx="18.5" cy="18.5" r="1.1" />
    </svg>
  );
}

function DoorPole({ className = "" }: { className?: string }) {
  // The little striped pole he painted for the I in SIMO'S.
  return (
    <svg viewBox="0 0 14 36" className={className} aria-hidden="true">
      <defs>
        <clipPath id="door-pole-body">
          <rect x="4" y="7.5" width="6" height="20" rx="1" />
        </clipPath>
      </defs>
      <circle cx="7" cy="3" r="2.4" fill="currentColor" />
      <rect x="3" y="5" width="8" height="2.5" rx="0.6" fill="currentColor" />
      <g clipPath="url(#door-pole-body)">
        <rect x="4" y="7.5" width="6" height="20" fill="var(--color-cream)" />
        <path
          d="M-2 12l18-7M-2 24l18-7M-2 36l18-7"
          stroke="var(--color-paint-red)"
          strokeWidth="3"
        />
        <path
          d="M-2 18l18-7M-2 30l18-7"
          stroke="#3b5a9a"
          strokeWidth="3"
        />
      </g>
      <rect x="3" y="27.5" width="8" height="2.5" rx="0.6" fill="currentColor" />
      <circle cx="7" cy="32.5" r="1.8" fill="currentColor" />
    </svg>
  );
}

function Pointer({ className = "" }: { className?: string }) {
  // The brushed "≻" he uses to start every line.
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true" fill="none">
      <path
        d="M2 3l8 5-8 5M9 3l8 5-8 5M16 5l6 3-6 3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Menu() {
  return (
    <section
      id="menu"
      className="beadboard relative overflow-hidden border-b border-hair text-ink"
    >
      {/* The door sits in a white beadboard wall, so this section does too:
          the one light room on a dark page. */}
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="text-center">
          <p className="label text-brass">The Menu</p>
          <h2 className="display mx-auto mt-5 max-w-xl text-5xl text-ink sm:text-6xl">
            Painted on the door.
          </h2>
          <p className="mx-auto mt-7 max-w-md text-[1.0625rem] leading-relaxed text-ink/70">
            The prices are the ones on the back door of the shop, in
            {" "}{b.barbers[0].shortName}&apos;s own hand. Pick one and book it
            below.
          </p>
        </div>

        {/* The door */}
        <div className="mx-auto mt-14 max-w-[36rem] bg-ink px-3 py-3 shadow-2xl shadow-black/35 sm:px-5 sm:py-5">
          <div className="relative border-[3px] border-brass/90 px-5 pb-9 pt-8 sm:px-9 sm:pb-11 sm:pt-10">
            <FleurDeLis className="absolute -left-1.5 -top-1.5 h-5 w-5 -rotate-45 text-brass" />
            <FleurDeLis className="absolute -right-1.5 -top-1.5 h-5 w-5 rotate-45 text-brass" />
            <FleurDeLis className="absolute -bottom-1.5 -left-1.5 h-5 w-5 -rotate-[135deg] text-brass" />
            <FleurDeLis className="absolute -bottom-1.5 -right-1.5 h-5 w-5 rotate-[135deg] text-brass" />
            <FleurDeLis className="absolute -top-[1.35rem] left-1/2 h-5 w-5 -translate-x-1/2 text-brass" />
            <FleurDeLis className="absolute -bottom-[1.35rem] left-1/2 h-5 w-5 -translate-x-1/2 rotate-180 text-brass" />
            <FleurDeLis className="absolute -left-[1.35rem] top-1/2 h-5 w-5 -translate-y-1/2 -rotate-90 text-brass" />
            <FleurDeLis className="absolute -right-[1.35rem] top-1/2 h-5 w-5 -translate-y-1/2 rotate-90 text-brass" />

            {/* His name as he painted it: gold, the little pole for the I,
                the four-leaf ornament under it, "Tax incl." tucked in at
                the right. */}
            <div className="relative">
              <p
                className="sign flex items-end justify-center gap-[0.05em] text-[2.6rem] leading-none text-brass-2 sm:text-[3.3rem]"
                aria-label={b.signName}
              >
                <span aria-hidden="true">S</span>
                <DoorPole className="mb-[0.04em] h-[0.92em] w-auto" />
                <span aria-hidden="true">MO&apos;S</span>
              </p>
              <Quatrefoil className="mx-auto mt-2 h-7 w-7 text-brass-2" />
              <p className="hand absolute right-0 top-[58%] text-right text-[0.75rem] leading-tight text-cream">
                {b.menu.note.split(" ").map((w) => (
                  <span key={w} className="block">{w}</span>
                ))}
              </p>
            </div>

            <ul className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
              {b.menu.items.map((line) => (
                <li key={line.name} className="flex items-start gap-3 sm:gap-4">
                  <Pointer className="mt-[0.55em] h-3.5 w-5 shrink-0 text-brass sm:h-4 sm:w-6" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="sign text-[1.15rem] tracking-[0.06em] text-brass-2 sm:text-[1.6rem] sm:tracking-[0.1em]">
                        {line.name}
                        {line.sub && (
                          <span className="hand block text-[0.75rem] tracking-wide text-cream sm:ml-2 sm:inline sm:text-[0.85rem]">
                            ({line.sub})
                          </span>
                        )}
                      </h3>
                      {line.price !== null && (
                        <span
                          className={`oval shrink-0 text-[0.95rem] sm:text-[1.2rem] ${line.accent ? "oval-red" : ""}`}
                          aria-label={`${line.price} dollars`}
                        >
                          {line.price}
                        </span>
                      )}
                    </div>
                    {line.blurb && (
                      <p className="hand mt-1 max-w-[26rem] text-[0.85rem] text-cream/85 sm:text-[0.95rem]">
                        {line.blurb}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <BookButton>Book a chair</BookButton>
          <p className="max-w-sm text-sm text-ink/60">
            Booking is through {b.booking.provider}. Color and wax are quoted
            in the chair.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── book ──────────────────────────────────────────
   One booking action, pointed at John's real calendar. The site keeps no
   calendar of its own — see the note in lib/business.ts.                    */

export function Book() {
  return (
    <section
      id="book"
      className="relative overflow-hidden border-b border-hair bg-ink-2"
    >
      <div className="deco pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="label text-brass">Appointments</p>
        <h2 className="display mx-auto mt-5 max-w-xl text-5xl text-bone sm:text-6xl">
          Book a chair.
        </h2>
        <p className="mx-auto mt-7 max-w-md text-[1.0625rem] leading-relaxed text-bone-2">
          {b.barbers[0].shortName} takes appointments online. Pick a time that
          suits you, or call the shop and he&apos;ll sort it out with you
          directly. First chairs available {b.opensOnLabel}.
        </p>

        {b.booking.embedHtml ? (
          <>
            <div className="mx-auto mt-12 max-w-3xl border border-hair-2 shadow-2xl shadow-black/40">
              <VagaroWidget html={b.booking.embedHtml} />
            </div>
            <a
              href={`tel:${b.phone.e164}`}
              className="mt-8 inline-flex items-center justify-center gap-2.5 text-sm text-bone-2 transition-colors hover:text-bone"
            >
              <PhoneIcon className="h-4 w-4" />
              Rather just call? {b.phone.display}
            </a>
          </>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookButton>Book with {b.booking.provider}</BookButton>
            <a
              href={`tel:${b.phone.e164}`}
              className="label inline-flex items-center justify-center gap-2.5 border border-hair-2 px-7 py-4 text-bone transition-colors hover:border-brass hover:text-brass-2"
            >
              <PhoneIcon className="h-4 w-4" />
              {b.phone.display}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── trust strip ───────────────────────────────────── */

export function TrustStrip() {
  const items = [
    {
      Icon: ScissorsIcon,
      head: `${b.reviews.rating.toFixed(1)} from ${b.reviews.count} reviews`,
      // Attributed and linked. These were earned on his Vagaro listing, not
      // collected here, and the site should never blur that.
      sub: `on ${b.reviews.source}`,
      href: b.reviews.url,
    },
    {
      Icon: PoleIcon,
      head: b.shop.walkIns ? "Walk-ins welcome" : "By appointment",
      sub: "Open seven days",
    },
    {
      Icon: PinIcon,
      head: b.address.street,
      sub: `${b.address.city}, ${b.address.state} · ${b.shop.parking}`,
    },
  ];

  return (
    <section className="border-b border-hair bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
        {items.map(({ Icon, head, sub, href }) => {
          const body = (
            <>
              <Icon className="mt-0.5 h-7 w-7 shrink-0 text-brass" />
              <div className="min-w-0">
                <p className="text-[15px] text-bone">{head}</p>
                <p className="mt-1 text-sm text-bone-3">{sub}</p>
              </div>
            </>
          );
          return href ? (
            <a
              key={head}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 transition-opacity hover:opacity-80"
            >
              {body}
            </a>
          ) : (
            <div key={head} className="flex items-start gap-4">
              {body}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────────────────── the shop ──────────────────────────────────────── */

export function Shop() {
  const john = b.barbers[0];
  return (
    <section
      id="shop"
      className="relative overflow-hidden border-b border-hair bg-ink-2"
    >
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-20">
        <div className="lg:max-w-md">
          <p className="label text-brass">The Shop</p>
          <h2 className="display mt-5 text-5xl text-bone sm:text-6xl">
            His name
            <br />
            on the door.
          </h2>
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-bone-2">
            <p>
              Simo&apos;s is {b.barbers[0].shortName}&apos;s shop — his name on
              the door and his hands on the clippers, with {b.reviews.count} five-star
              reviews behind him before he ever opened it.
            </p>
            <p>
              The room is on Lancaster Avenue in Wayne, with the pole lit out
              front the way a barbershop ought to be.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BookButton />
            <a
              href={b.social.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 text-sm text-bone-2 transition-colors hover:text-bone"
            >
              <InstagramIcon className="h-4 w-4" />
              See his work
            </a>
          </div>
        </div>

      </div>

      {/* John himself, comb and shears in hand — a portrait bled into the
          page, not a headshot in a frame. On a wide screen he runs off the
          right edge and dissolves into the wall behind the type; on a phone
          he follows the copy, full width, fading in from the ceiling above
          him. The crop is pinned to his face either way. */}
      {john.photo && (
        <div className="mesh-left pointer-events-none relative -mt-8 h-[26rem] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[48%]">
          <img
            src={john.photo.src}
            alt={john.photo.alt}
            width={john.photo.width}
            height={john.photo.height}
            className="h-full w-full object-cover object-[58%_12%] opacity-90 brightness-[0.82] contrast-[1.04] saturate-[0.85] lg:object-[58%_22%]"
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
}

/* ───────────────────────── visit ─────────────────────────────────────────── */

export function Visit() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    b.address.mapsQuery,
  )}&z=16&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    b.address.mapsQuery,
  )}`;

  return (
    <section id="visit" className="border-b border-hair bg-ink-2">
      {/* The top of the shopfront from the sidewalk — the leaded transoms,
          the sign and the pole in the glass — across the top of the section,
          dissolving into the address it belongs to. */}
      <div className="mesh-down">
        <img
          src="/media/storefront.webp"
          alt="The shopfront at 240 Lancaster Ave: a black frame, leaded transom windows, the pole and his sign in the glass"
          width={1400}
          height={758}
          className="h-[13rem] w-full object-cover object-[50%_70%] brightness-[0.9] sm:h-[18rem] lg:h-[24rem]"
          loading="lazy"
        />
      </div>

      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="px-5 pb-20 pt-4 sm:px-8 sm:pb-28 lg:pr-16">
          <p className="label text-brass">Visit</p>
          <h2 className="display mt-5 text-4xl text-bone sm:text-5xl">
            {b.address.street}
          </h2>
          <p className="mt-4 text-lg text-bone-2">
            {b.address.city}, {b.address.state} {b.address.zip}
          </p>

          <dl className="mt-12 max-w-sm divide-y divide-hair border-y border-hair">
            {hoursSummary().map((row) => (
              <div key={row.days} className="flex justify-between gap-6 py-3.5">
                <dt className="text-[15px] text-bone">{row.days}</dt>
                <dd className="text-[15px] text-bone-2">{row.hours}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="label inline-flex items-center gap-2.5 border border-hair-2 px-7 py-4 text-bone transition-colors hover:border-brass hover:text-brass-2"
            >
              <PinIcon className="h-4 w-4" />
              Get directions
            </a>
            <BookButton />
          </div>
        </div>

        <div className="relative min-h-[360px] border-t border-hair lg:min-h-full lg:border-l lg:border-t-0">
          {/* Sits behind the map, so a blocked embed still reads as an address. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <PinIcon className="h-7 w-7 text-brass" />
            <p className="display text-xl text-bone">{b.address.oneLine}</p>
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="label text-brass-2 underline underline-offset-4"
            >
              Open in Maps
            </a>
          </div>
          <iframe
            title={`Map showing ${b.address.oneLine}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
          />
        </div>
      </div>
    </section>
  );
}

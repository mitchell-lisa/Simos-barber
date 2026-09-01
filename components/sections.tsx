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

      {/* His pole, dissolved into the page: full bleed behind the type on a
          phone, running off the right edge on a wide screen. */}
      <div
        className="mesh-hero pointer-events-none absolute inset-0 lg:left-auto lg:w-[46%]"
        aria-hidden="true"
      >
        {/* An animated image rather than a <video>: it plays on every browser
            and every phone with no autoplay policy to satisfy — no muted /
            playsInline dance, no Low Power Mode exception, no JavaScript.
            Anyone whose OS asks for reduced motion gets a still frame, since
            an animated image cannot be paused. */}
        <picture className="block h-full w-full">
          <source
            srcSet="/media/pole-still.webp"
            media="(prefers-reduced-motion: reduce)"
          />
          <img
            src="/media/pole.webp"
            alt=""
            width={360}
            height={640}
            decoding="async"
            className="h-full w-full object-cover opacity-25 brightness-[0.62] contrast-[1.05] saturate-[0.85] lg:opacity-80"
          />
        </picture>
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

/* ───────────────────────── the trade ─────────────────────────────────────── */

export function Details() {
  return (
    <section className="relative overflow-hidden border-b border-hair">
      {/* Koken's pole and White's clipper, used as the ground the section is
          written on. The drawings are his, on his wall — they read better as
          the wall than as two exhibits with catalogue cards. */}
      <div className="absolute inset-0 grid grid-cols-2" aria-hidden="true">
        <img
          src="/media/patent-pole.webp"
          alt=""
          className="mesh-band h-full w-full object-cover object-top opacity-55"
          loading="lazy"
        />
        <img
          src="/media/patent-clipper.webp"
          alt=""
          className="mesh-band h-full w-full object-cover object-top opacity-55"
          loading="lazy"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink via-ink/75 to-ink"
        aria-hidden="true"
      />
      {/* Pools the ground behind the type so the drawings stay readable at the
          edges without fighting the words, and hides the seam between them. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-ink)_0%,rgb(11_10_9_/_0.82)_38%,transparent_72%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <p className="label text-brass">Since 1916</p>
        <h2 className="display mx-auto mt-6 max-w-2xl text-5xl text-bone sm:text-6xl">
          The trade hasn&apos;t changed much.
        </h2>
        <p className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-bone-2">
          Koken patented the pole in 1916. White patented the clipper three
          years later. Both drawings hang on the wall at Simo&apos;s, and both
          tools are still the job.
        </p>
      </div>
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
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="px-5 py-20 sm:px-8 sm:py-28 lg:pr-16">
          <p className="label text-brass">Visit</p>
          <h2 className="display mt-5 text-5xl text-bone sm:text-6xl">
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

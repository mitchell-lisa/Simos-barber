import { business as b } from "@/lib/business";
import { hoursSummary } from "@/lib/schedule";
import {
  Badge,
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

/* ───────────────────────── the door ──────────────────────────────────────
   His menu, as he painted it on the shop's back door. The board is drawn to
   the door — gold rule inset on black, corner flourishes, hand-lettered
   names, brush-printed descriptions, prices in painted ovals — and reads
   from `business.menu`, which is the door line for line. Booking still
   happens in Vagaro; the button under the board scrolls to the widget.      */

function Fleuron({ className = "" }: { className?: string }) {
  // The little three-leaf curl he painted in each corner of the rule.
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 20c0-6 3-10 8-12M4 20c6 0 10-3 12-8M12 8c-1-2-1-4 1-5 2 1 2 3 1 5M16 12c2-1 4-1 5 1-1 2-3 2-5 1M8.5 11.5c-1.5-.5-2.5-2-2-3.5 1.5-.5 3 .5 3.5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
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
      className="relative overflow-hidden border-b border-hair bg-ink-2"
    >
      <div className="deco pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      {/* The tonics in the front window — the house-made products the door
          mentions — run off the right edge beside the board and dissolved into
          the page on the other three sides. Wide screens only; on a phone
          the door is the whole story. */}
      <div
        className="mesh-right pointer-events-none absolute right-0 top-1/2 hidden w-[36%] -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <img
          src="/media/tonics.webp"
          alt=""
          width={1000}
          height={1240}
          className="w-full opacity-85 brightness-[0.9] saturate-[0.9]"
          loading="lazy"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="text-center">
          <p className="label text-brass">The Menu</p>
          <h2 className="display mx-auto mt-5 max-w-xl text-5xl text-bone sm:text-6xl">
            Painted on the door.
          </h2>
          <p className="mx-auto mt-7 max-w-md text-[1.0625rem] leading-relaxed text-bone-2">
            The prices are the ones on the back door of the shop, in
            {" "}{b.barbers[0].shortName}&apos;s own hand. Pick one and book it
            below.
          </p>
        </div>

        {/* The door */}
        <div className="mx-auto mt-14 max-w-[36rem] bg-ink px-3 py-3 shadow-2xl shadow-black/50 sm:px-5 sm:py-5">
          <div className="relative border-[3px] border-brass/90 px-4 pb-8 pt-9 sm:px-9 sm:pb-11 sm:pt-12">
            <Fleuron className="absolute -left-2 -top-2 h-7 w-7 text-brass" />
            <Fleuron className="absolute -right-2 -top-2 h-7 w-7 -scale-x-100 text-brass" />
            <Fleuron className="absolute -bottom-2 -left-2 h-7 w-7 -scale-y-100 text-brass" />
            <Fleuron className="absolute -bottom-2 -right-2 h-7 w-7 -scale-x-100 -scale-y-100 text-brass" />

            <div className="relative flex items-end justify-center">
              <Badge className="h-28 w-28 sm:h-32 sm:w-32" />
              <span className="hand absolute bottom-1 right-0 text-right text-[0.8rem] leading-tight text-cream">
                {b.menu.note.split(" ").map((w) => (
                  <span key={w} className="block">{w}</span>
                ))}
              </span>
            </div>

            <ul className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
              {b.menu.items.map((line) => (
                <li key={line.name} className="flex items-start gap-3 sm:gap-4">
                  <Pointer className="mt-[0.55em] h-3.5 w-5 shrink-0 text-brass sm:h-4 sm:w-6" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
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
                      <p className="hand mt-1 max-w-[26rem] text-[0.78rem] text-cream/85 sm:text-[0.85rem]">
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
          <p className="max-w-sm text-sm text-bone-3">
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

      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 sm:py-32">
        {/* The cast-iron sign inside the door, cut out of its wall and
            lifted to brass so it reads on black. It hangs over the words
            the way it hangs over the light switches. */}
        <img
          src="/media/sign.webp"
          alt="Cast-iron sign reading Haircut and Shave, 25 cents"
          width={900}
          height={359}
          className="mx-auto w-64 [mask-image:linear-gradient(to_bottom,#000_72%,transparent)] sm:w-80"
          loading="lazy"
        />
        <p className="label mt-10 text-brass">Since 1916</p>
        <h2 className="display mx-auto mt-6 max-w-2xl text-5xl text-bone sm:text-6xl">
          The trade hasn&apos;t changed much.
        </h2>
        <p className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-bone-2">
          Koken patented the pole in 1916. White patented the clipper three
          years later. Both drawings hang on the wall at Simo&apos;s, and both
          tools are still the job. The iron sign by the door still says a
          haircut and a shave is a quarter. That part has moved on.
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
        <div className="px-5 pb-20 sm:px-8 sm:pb-28 lg:pr-16">
          {/* The front door: the stripes painted over the entrance, the
              downlight, and the number itself, dissolving into the page
              just above the address it belongs to. */}
          <div className="mesh-down -mx-5 sm:-mx-8 lg:-mr-16">
            <img
              src="/media/entrance.webp"
              alt="The entrance at 240 Lancaster Ave: barber stripes painted over the door, and the number 240"
              width={1200}
              height={960}
              className="w-full brightness-[0.92]"
              loading="lazy"
            />
          </div>

          <p className="label mt-6 text-brass">Visit</p>
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

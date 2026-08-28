import { business as b } from "@/lib/business";
import { hoursSummary } from "@/lib/schedule";
import { NextAvailable } from "./booking";
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
        <video
          className="h-full w-full object-cover opacity-25 brightness-[0.62] contrast-[1.05] saturate-[0.85] lg:opacity-80"
          src="/media/pole.mp4"
          poster="/media/pole-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
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

          <NextAvailable />
        </div>

      </div>
    </section>
  );
}

/* ───────────────────────── trust strip ───────────────────────────────────── */

export function TrustStrip() {
  const items = [
    {
      Icon: ScissorsIcon,
      head: "One barber, one chair",
      sub: `${b.barbers[0].name} — no rotation, no front desk`,
    },
    {
      Icon: PoleIcon,
      head: hoursSummary()[0].days.replace("–", " to "),
      sub: hoursSummary()[0].hours,
    },
    {
      Icon: PinIcon,
      head: b.address.street,
      sub: `${b.address.city}, ${b.address.state} ${b.address.zip}`,
    },
  ];

  return (
    <section className="border-b border-hair bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
        {items.map(({ Icon, head, sub }) => (
          <div key={head} className="flex items-start gap-4">
            <Icon className="mt-0.5 h-7 w-7 shrink-0 text-brass" />
            <div className="min-w-0">
              <p className="text-[15px] text-bone">{head}</p>
              <p className="mt-1 text-sm text-bone-3">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── services ──────────────────────────────────────── */

const SERVICE_ICONS = [
  ScissorsIcon,
  RazorIcon,
  RazorIcon,
  ScissorsIcon,
  CombIcon,
  CombIcon,
];

export function Services() {
  return (
    <section id="services" className="border-b border-hair">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="text-center">
          <p className="label text-brass">In the chair</p>
          <h2 className="display mt-5 text-5xl text-bone sm:text-6xl">Services</h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-bone-2">
            Every cut finishes with a hot towel and a line-up. Pricing is posted
            in the shop and here at opening.
          </p>
        </div>

        <div className="mt-16 grid gap-px border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-3">
          {b.services.map((s, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            return (
              <article
                key={s.name}
                className="bg-ink p-8 transition-colors duration-300 hover:bg-ink-2"
              >
                <Icon className="h-8 w-8 text-brass" />
                <h3 className="display mt-6 text-2xl text-bone">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-2">
                  {s.blurb}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <BookButton />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── the shop ──────────────────────────────────────── */

export function Shop() {
  return (
    <section
      id="shop"
      className="relative overflow-hidden border-b border-hair bg-ink-2"
    >
      {/* The clock runs off the right edge and fades into the wall behind the
          type, rather than sitting in a box with a label under it. */}
      <div
        className="mesh-left pointer-events-none absolute inset-x-0 bottom-0 h-[42%] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[48%]"
        aria-hidden="true"
      >
        <img
          src="/media/clock.webp"
          alt=""
          width={620}
          height={572}
          className="h-full w-full object-cover opacity-30 brightness-[0.6] contrast-[1.06] saturate-[0.85] lg:opacity-85"
          loading="lazy"
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-20">
        <div className="lg:max-w-md">
          <p className="label text-brass">The Shop</p>
          <h2 className="display mt-5 text-5xl text-bone sm:text-6xl">
            One barber,
            <br />
            one chair.
          </h2>
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-bone-2">
            <p>
              Simo&apos;s is {b.barbers[0].shortName}&apos;s shop — his name on
              the door, his hands on the clippers. No front desk, no rotation,
              no getting whoever happens to be free. You sit in his chair, and
              he cuts your hair.
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

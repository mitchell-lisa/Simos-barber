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
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:py-28">
        <div className="min-w-0">
          <p className="label text-brass">
            {b.address.street} · {b.address.city}, Pennsylvania
          </p>

          <h1 className="display mt-6 text-[3.25rem] text-bone sm:text-7xl lg:text-[5.25rem]">
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

        {/* His own footage. A wide interior photograph would sit better here —
            that is the one asset the shop still needs to supply. */}
        <figure className="relative hidden lg:block">
          <div className="border border-hair-2 p-2">
            <video
              className="aspect-[9/16] w-full object-cover brightness-[0.82] contrast-[1.08] saturate-[0.92]"
              src="/media/pole.mp4"
              poster="/media/pole-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="The barber pole lit outside the shop on Lancaster Avenue"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-bone-3">
            The pole, out front on Lancaster Ave.
          </figcaption>
        </figure>
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
    <section id="shop" className="border-b border-hair bg-ink-2">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
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

        <figure>
          <div className="border border-hair-2 p-3">
            <img
              src="/media/clock.webp"
              alt="A handmade oak barber shop clock on the wall inside Simo's"
              width={620}
              height={572}
              className="w-full brightness-[0.82] contrast-[1.08] saturate-[0.92]"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-4 text-xs leading-relaxed text-bone-3">
            A handmade oak shop clock, on the wall inside.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ───────────────────────── on the wall ───────────────────────────────────── */

const PRINTS = [
  {
    src: "/media/patent-pole.webp",
    w: 720,
    h: 1101,
    alt: "Walter F. Koken's 1916 barber pole patent drawing",
    title: "Barber Pole",
    meta: "W. F. Koken · No. 1,178,732 · April 11, 1916",
  },
  {
    src: "/media/patent-clipper.webp",
    w: 720,
    h: 1062,
    alt: "Fred G. White's 1919 hair clipper patent drawing",
    title: "Hair Clipper",
    meta: "F. G. White · No. 1,311,935 · August 5, 1919",
  },
];

export function Details() {
  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-lg text-center">
          <p className="label text-brass">On the wall</p>
          <h2 className="display mt-5 text-5xl text-bone sm:text-6xl">
            The trade, framed
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-bone-2">
            Hanging in the shop: the original patent drawings for the two
            objects every barber still works with.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 sm:gap-12">
          {PRINTS.map((p) => (
            <figure key={p.src}>
              <div className="border border-hair-2 p-3 sm:p-4">
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  className="w-full"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="display text-xl text-bone">{p.title}</span>
                <span className="text-xs text-bone-3">{p.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
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

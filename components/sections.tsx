import { business as b } from "@/lib/business";
import { hoursSummary } from "@/lib/schedule";
import { Booking } from "./booking";
import { Badge, InstagramIcon, PhoneIcon } from "./site";

/* ───────────────────────── masthead + booking ────────────────────────────── */

export function Masthead() {
  return (
    <section id="top" className="border-b border-rule">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-20">
        <div className="min-w-0 lg:pt-6">
          <Badge className="h-20 w-20" />

          <p className="label mt-8 text-ink-3">
            Barbershop · {b.address.city}, Pennsylvania
          </p>

          <h1 className="display mt-5 max-w-lg text-[2.75rem] text-ink sm:text-6xl">
            A proper barbershop on Lancaster Avenue.
          </h1>

          <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed text-ink-2">
            Clippers, shears and a straight razor. One barber, one chair, and
            the time to get it right. Opening {b.opensOnLabel}.
          </p>

          <dl className="mt-12 max-w-md divide-y divide-rule-soft border-y border-rule-soft">
            <div className="flex justify-between gap-6 py-3.5">
              <dt className="label text-ink-3">Address</dt>
              <dd className="text-right text-sm text-ink">
                {b.address.street}
                <br />
                <span className="text-ink-2">
                  {b.address.city}, {b.address.state} {b.address.zip}
                </span>
              </dd>
            </div>
            <div className="flex justify-between gap-6 py-3.5">
              <dt className="label text-ink-3">Hours</dt>
              <dd className="text-right text-sm">
                {hoursSummary().map((row) => (
                  <span key={row.days} className="block">
                    <span className="text-ink">{row.days}</span>{" "}
                    <span className="text-ink-2">{row.hours}</span>
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex justify-between gap-6 py-3.5">
              <dt className="label text-ink-3">Phone</dt>
              <dd className="text-right text-sm">
                <a
                  href={`tel:${b.phone.e164}`}
                  className="inline-flex items-center gap-2 text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                >
                  <PhoneIcon className="h-3.5 w-3.5" />
                  {b.phone.display}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <Booking />
      </div>
    </section>
  );
}

/* ───────────────────────── the shop ──────────────────────────────────────── */

export function Shop() {
  return (
    <section id="shop" className="border-b border-rule">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="lg:max-w-md">
          <p className="label text-ink-3">The Shop</p>
          <h2 className="display mt-5 text-4xl text-ink sm:text-5xl">
            One barber, one chair.
          </h2>
          <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-ink-2">
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

          <a
            href={b.social.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            <InstagramIcon className="h-4 w-4" />
            See his work on Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <figure>
            <div className="border border-rule bg-card p-2">
              <video
                className="aspect-[9/16] w-full object-cover"
                src="/media/pole.mp4"
                poster="/media/pole-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-label="The barber pole lit outside the shop on Lancaster Avenue"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-ink-3">
              The pole, out front on Lancaster Ave.
            </figcaption>
          </figure>

          <figure className="mt-10">
            <div className="border border-rule bg-card p-2">
              <img
                src="/media/clock.webp"
                alt="A handmade oak barber shop clock on the wall inside Simo's"
                width={620}
                height={572}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-ink-3">
              A handmade oak shop clock, on the wall inside.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── services ──────────────────────────────────────── */

export function Services() {
  return (
    <section id="services" className="border-b border-rule bg-card">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label text-ink-3">In the chair</p>
            <h2 className="display mt-5 text-4xl text-ink sm:text-5xl">
              Services
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-3">
            Pricing is posted in the shop and here at opening.
          </p>
        </div>

        <dl className="mt-14 grid gap-x-16 border-t border-rule-soft sm:grid-cols-2">
          {b.services.map((s) => (
            <div
              key={s.name}
              className="border-b border-rule-soft py-6 sm:py-7"
            >
              <dt className="display text-2xl text-ink">{s.name}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">
                {s.blurb}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ───────────────────────── on the wall ───────────────────────────────────── */

export function Details() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="max-w-lg">
          <p className="label text-ink-3">On the wall</p>
          <h2 className="display mt-5 text-4xl text-ink sm:text-5xl">
            The trade, framed
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
            Hanging in the shop: the original patent drawings for the two
            objects every barber still works with.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-12">
          {[
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
          ].map((p) => (
            <figure key={p.src}>
              <div className="border border-rule bg-card p-3 sm:p-4">
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
                <span className="display text-lg text-ink">{p.title}</span>
                <span className="text-xs text-ink-3">{p.meta}</span>
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
    <section id="visit" className="bg-card">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="px-6 py-20 sm:px-8 sm:py-28 lg:pr-16">
          <p className="label text-ink-3">Visit</p>
          <h2 className="display mt-5 text-4xl text-ink sm:text-5xl">
            {b.address.street}
          </h2>
          <p className="mt-3 text-lg text-ink-2">
            {b.address.city}, {b.address.state} {b.address.zip}
          </p>

          <dl className="mt-12 max-w-sm divide-y divide-rule-soft border-y border-rule-soft">
            {hoursSummary().map((row) => (
              <div key={row.days} className="flex justify-between gap-6 py-3">
                <dt className="text-sm text-ink">{row.days}</dt>
                <dd className="text-sm text-ink-2">{row.hours}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Get directions
            </a>
            <a
              href={`tel:${b.phone.e164}`}
              className="inline-flex items-center gap-2.5 border border-rule px-6 py-3 text-sm text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              <PhoneIcon className="h-4 w-4" />
              {b.phone.display}
            </a>
          </div>
        </div>

        <div className="relative min-h-[360px] border-t border-rule lg:min-h-full lg:border-l lg:border-t-0">
          {/* Sits behind the map, so a blocked embed still reads as an address. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="display text-xl text-ink">{b.address.oneLine}</p>
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ink-2 underline underline-offset-4"
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

"use client";

import { useEffect, useState } from "react";
import { business as b } from "@/lib/business";
import { InstagramIcon, PhoneIcon, PinIcon, Reveal } from "./site";

/* ───────────────────────── hero ──────────────────────────────────────────── */

export function Hero() {
  return (
    <section id="top" className="relative min-h-[88svh] overflow-hidden lg:min-h-[92vh]">
      {/* The pole outside the shop, filmed on Lancaster Ave. */}
      <div className="absolute inset-0 lg:left-[54%]">
        <video
          className="h-full w-full object-cover"
          src="/media/pole.mp4"
          poster="/media/pole-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="The barber pole outside Simo's on Lancaster Avenue"
        />
      </div>

      {/* Scrims: full-bleed on phones, a left-edge fade on desktop. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/25 lg:hidden" />
      <div className="absolute inset-y-0 left-[54%] right-0 hidden bg-gradient-to-r from-ink via-ink/45 to-transparent lg:block" />
      <div className="absolute inset-y-0 left-0 hidden w-[54%] bg-ink lg:block" />

      <div className="relative mx-auto flex min-h-[88svh] max-w-6xl items-end px-5 pb-14 pt-16 sm:px-8 lg:min-h-[92vh] lg:items-center lg:pb-0">
        <div className="w-full lg:w-[54%] lg:pr-14">
          <p className="label text-gold">Wayne, Pennsylvania · Est. 2026</p>

          <h1 className="mt-5">
            <span className="display block text-[22vw] text-cream sm:text-[7.5rem] lg:text-[8.5rem]">
              Simo&apos;s
            </span>
            <span className="script -mt-1 block text-[7vw] text-gold sm:text-4xl lg:text-[2.75rem]">
              of Wayne, Pa.
            </span>
          </h1>

          <div className="rule-ornament mt-7 max-w-sm">
            <span className="label whitespace-nowrap text-gold">{b.motto}</span>
          </div>

          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-cream-dim sm:text-base">
            A traditional barbershop on Lancaster Avenue. Clippers, shears and a
            straight razor — and a barber who takes the time to get it right.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#book"
              className="label flex items-center justify-center bg-gold px-7 py-4 text-ink transition-colors hover:bg-cream"
            >
              Request the first chair
            </a>
            <a
              href={`tel:${b.phone.e164}`}
              className="label flex items-center justify-center gap-2.5 border border-white/25 px-7 py-4 text-cream transition-colors hover:border-gold hover:text-gold"
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

/* ───────────────────────── opening countdown ─────────────────────────────── */

function useCountdown(target: string) {
  const [parts, setParts] = useState<null | { d: number; h: number; m: number }>(null);
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) return setParts({ d: 0, h: 0, m: 0 });
      setParts({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [target]);
  return parts;
}

export function OpeningStrip() {
  const t = useCountdown(b.opensOn);
  const open = t !== null && t.d === 0 && t.h === 0 && t.m === 0;

  return (
    <section className="border-y border-gold-dim/35 bg-ink-2">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-8 text-center sm:px-8 md:flex-row md:justify-between md:text-left">
        <div>
          <p className="label text-gold">{open ? "Now open" : "Doors open"}</p>
          <p className="display mt-2 text-3xl text-cream sm:text-4xl">
            {open ? "Come on in" : b.opensOnLabel}
          </p>
        </div>

        {/* Rendered only after mount — no server/client clock mismatch. */}
        {t && !open && (
          <div className="flex items-start gap-7 sm:gap-10">
            {[
              { v: t.d, l: "Days" },
              { v: t.h, l: "Hours" },
              { v: t.m, l: "Minutes" },
            ].map((x) => (
              <div key={x.l} className="text-center">
                <span className="display block text-4xl tabular-nums text-cream sm:text-5xl">
                  {String(x.v).padStart(2, "0")}
                </span>
                <span className="label mt-1.5 block text-cream-dim">{x.l}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── the shop ──────────────────────────────────────── */

export function Shop() {
  return (
    <section id="shop" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="label text-gold">The Shop</p>
          <h2 className="display mt-5 text-5xl text-cream sm:text-6xl">
            One barber.
            <br />
            One chair at a time.
          </h2>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-cream-dim sm:text-base">
            <p>
              Simo&apos;s is {b.barber.firstName}&apos;s shop — his name on the
              door, his hands on the clippers. There&apos;s no front desk, no
              rotation, no getting whoever happens to be free. You sit in his
              chair, and he cuts your hair.
            </p>
            <p>
              The room is on Lancaster Avenue in Wayne, with the pole lit out
              front the way a barbershop ought to be. Come in for a cut, stay for
              the conversation, leave looking like you meant it.
            </p>
          </div>

          <a
            href={b.social.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-2.5 border-b border-gold-dim pb-1 text-sm text-gold transition-colors hover:border-gold hover:text-cream"
          >
            <InstagramIcon className="h-4 w-4" />
            See his work on Instagram
          </a>
        </Reveal>

        <Reveal delay={120}>
          <figure className="relative">
            <img
              src="/media/clock.webp"
              alt="A handcrafted wooden barber shop clock on the wall inside Simo's"
              width={620}
              height={572}
              className="w-full object-cover"
              loading="lazy"
            />
            <figcaption className="mt-4 text-xs leading-relaxed text-cream-dim">
              On the wall at Simo&apos;s: a handmade oak barber shop clock.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────── services ──────────────────────────────────────── */

export function Services() {
  return (
    <section id="services" className="border-t border-white/8 bg-ink-2 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label text-gold">In the chair</p>
              <h2 className="display mt-5 text-5xl text-cream sm:text-6xl">
                Services
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-cream-dim">
              Pricing is posted in the shop and here at opening.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {b.services.map((s, i) => (
            <Reveal key={s.name} delay={i * 60} className="bg-ink-2">
              <article className="h-full bg-ink-2 p-7 transition-colors duration-300 hover:bg-ink-3 sm:p-8">
                <span className="display text-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-3 text-2xl text-cream sm:text-[1.6rem]">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {s.blurb}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── details on the wall ───────────────────────────── */

export function Details() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="label text-gold">On the wall</p>
          <h2 className="display mt-5 max-w-2xl text-5xl text-cream sm:text-6xl">
            The trade, framed
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream-dim">
            Hanging in the shop: the original patent drawings for the two objects
            every barber still works with.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-8">
          <Reveal>
            <figure>
              <img
                src="/media/patent-pole.webp"
                alt="Framed print of Walter F. Koken's 1916 barber pole patent, hanging in the shop"
                width={560}
                height={790}
                className="w-full bg-ink-2 object-cover"
                loading="lazy"
              />
              <figcaption className="mt-4 text-xs leading-relaxed text-cream-dim">
                <span className="text-cream">Barber Pole</span> — W. F. Koken,
                patent no. 1,178,732, granted April 11, 1916.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <figure className="sm:mt-16">
              <img
                src="/media/patent-clipper.webp"
                alt="Framed print of Fred G. White's 1919 hair clipper patent, hanging in the shop"
                width={560}
                height={742}
                className="w-full bg-ink-2 object-cover"
                loading="lazy"
              />
              <figcaption className="mt-4 text-xs leading-relaxed text-cream-dim">
                <span className="text-cream">Hair Clipper</span> — F. G. White,
                patent no. 1,311,935, granted August 5, 1919.
              </figcaption>
            </figure>
          </Reveal>
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
    <section id="visit" className="border-t border-white/8 bg-ink-2">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="px-5 py-20 sm:px-8 sm:py-24 lg:pr-16">
          <Reveal>
            <p className="label text-gold">Visit</p>
            <h2 className="display mt-5 text-5xl text-cream sm:text-6xl">
              240 Lancaster Ave
            </h2>
            <p className="mt-4 text-lg text-cream-dim">
              {b.address.city}, {b.address.state} {b.address.zip}
            </p>

            <dl className="mt-12 space-y-8">
              <div>
                <dt className="label text-gold">Hours</dt>
                <dd className="mt-2.5 text-[15px] leading-relaxed text-cream-dim">
                  Posted here the week the shop opens. Until then, call or send a
                  request and {b.barber.firstName} will get back to you.
                </dd>
              </div>
              <div>
                <dt className="label text-gold">Phone</dt>
                <dd className="mt-2.5">
                  <a
                    href={`tel:${b.phone.e164}`}
                    className="inline-flex items-center gap-2.5 text-lg text-cream transition-colors hover:text-gold"
                  >
                    <PhoneIcon className="h-4 w-4 text-gold" />
                    {b.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-gold">Instagram</dt>
                <dd className="mt-2.5">
                  <a
                    href={b.social.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 text-cream transition-colors hover:text-gold"
                  >
                    <InstagramIcon className="h-4 w-4 text-gold" />
                    {b.social.instagram.handle}
                  </a>
                </dd>
              </div>
            </dl>

            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="label mt-12 inline-flex items-center gap-2.5 border border-white/25 px-7 py-4 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <PinIcon className="h-4 w-4" />
              Get directions
            </a>
          </Reveal>
        </div>

        <div className="relative min-h-[340px] border-t border-white/8 bg-ink-3 lg:min-h-full lg:border-l lg:border-t-0">
          {/* Sits behind the map. If the embed is ever blocked, this is what shows. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <PinIcon className="h-7 w-7 text-gold" />
            <p className="display text-2xl text-cream">{b.address.oneLine}</p>
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="label text-gold underline underline-offset-4"
            >
              Open in Maps
            </a>
          </div>
          <iframe
            title="Map showing 240 Lancaster Ave, Wayne, Pennsylvania"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full saturate-[0.75] contrast-[1.02]"
            style={{ border: 0 }}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { business as b } from "@/lib/business";
import { PhoneIcon, Reveal } from "./site";

type State = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full border border-white/15 bg-ink px-4 py-3.5 text-[15px] text-cream placeholder:text-cream-dim/80 transition-colors focus:border-gold focus:outline-none";

export function Booking() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Something went wrong.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section id="book" className="border-t border-white/8 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <Reveal>
          <p className="label text-gold">Book</p>
          <h2 className="display mt-5 text-5xl text-cream sm:text-6xl">
            Take the
            <br />
            first chair
          </h2>
          <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-cream-dim">
            Send a request and {b.barber.firstName} texts you back to lock in a
            time. No accounts, no deposits, no app to download.
          </p>

          <div className="rule-ornament mt-10 max-w-xs" />

          <p className="mt-8 text-sm text-cream-dim">
            Rather just call?{" "}
            <a
              href={`tel:${b.phone.e164}`}
              className="inline-flex items-center gap-2 text-gold hover:text-cream"
            >
              <PhoneIcon className="h-4 w-4" />
              {b.phone.display}
            </a>
          </p>
        </Reveal>

        <Reveal delay={120}>
          {state === "sent" ? (
            <div className="flex h-full min-h-[420px] flex-col items-start justify-center border border-gold/40 bg-ink-2 p-8 sm:p-12">
              <span className="h-2 w-2 rotate-45 bg-gold" />
              <h3 className="display mt-6 text-4xl text-cream">Request sent</h3>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-cream-dim">
                {b.barber.firstName} will text you back to confirm the day and
                time. If it&apos;s urgent, give the shop a call.
              </p>
              {b.preview.active && (
                <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-cream-dim">
                  Preview note: while this site is a preview, requests go to{" "}
                  {b.preview.builtBy}, not to the shop. On the live site they land
                  on the shop&apos;s phone within seconds.
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {/* honeypot */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute h-px w-px overflow-hidden opacity-0 [clip:rect(0,0,0,0)]"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="label mb-2.5 block text-gold">
                    Name
                  </label>
                  <input id="name" name="name" required autoComplete="name" className={FIELD} />
                </div>
                <div>
                  <label htmlFor="phone" className="label mb-2.5 block text-gold">
                    Mobile
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="(610) 555-0143"
                    className={FIELD}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="label mb-2.5 block text-gold">
                  What do you need
                </label>
                <select id="service" name="service" required defaultValue="" className={FIELD}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {b.booking.serviceOptions.map((s) => (
                    <option key={s} value={s} className="bg-ink">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="day" className="label mb-2.5 block text-gold">
                    Preferred day
                  </label>
                  <input id="day" name="day" type="date" min={today} className={FIELD} />
                </div>
                <div>
                  <label htmlFor="time" className="label mb-2.5 block text-gold">
                    Time of day
                  </label>
                  <select id="time" name="time" defaultValue="First available" className={FIELD}>
                    {["First available", "Morning", "Afternoon", "Evening"].map((t) => (
                      <option key={t} value={t} className="bg-ink">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="label mb-2.5 block text-gold">
                  Anything else <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <textarea id="notes" name="notes" rows={3} className={`${FIELD} resize-none`} />
              </div>

              <button
                type="submit"
                disabled={state === "sending"}
                className="label w-full bg-gold px-7 py-4 text-ink transition-colors hover:bg-cream disabled:opacity-60"
              >
                {state === "sending" ? "Sending…" : "Send request"}
              </button>

              {error && <p className="text-sm text-pole-red">{error}</p>}

              <p className="pt-1 text-xs leading-relaxed text-cream-dim">
                {b.preview.active
                  ? `Preview: requests reach ${b.preview.builtBy}, not the shop. Nothing is stored or shared.`
                  : "Your number is used to confirm this appointment. Nothing else."}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

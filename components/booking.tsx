"use client";

import { useEffect, useMemo, useState } from "react";
import { business as b } from "@/lib/business";
import {
  bookableDays,
  dayParts,
  displayTime,
  longDate,
  slotsOn,
} from "@/lib/schedule";
import { PhoneIcon, Reveal } from "./site";

type State = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full border border-white/15 bg-ink px-4 py-3.5 text-[15px] text-cream " +
  "placeholder:text-cream-dim/70 transition-colors focus:border-gold focus:outline-none";

const STEP = "label mb-4 flex items-center gap-3 text-gold";

function StepHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className={STEP}>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-gold/50 text-[10px]">
        {n}
      </span>
      {children}
    </p>
  );
}

export function Booking() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  const [barber, setBarber] = useState(b.barbers[0].id);
  const [service, setService] = useState("");
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  // Dates depend on the clock, so they're resolved after mount — the server
  // and the browser would otherwise disagree and React would complain.
  const [days, setDays] = useState<string[]>([]);
  useEffect(() => {
    const d = bookableDays();
    setDays(d);
    setDay((cur) => cur ?? d[0] ?? null);
  }, []);

  const slots = useMemo(() => (day ? slotsOn(day) : []), [day]);

  // If the chosen time isn't offered on a newly picked day, drop it.
  useEffect(() => {
    setTime((t) => (t && slots.includes(t) ? t : null));
  }, [slots]);

  const chosenBarber = b.barbers.find((x) => x.id === barber) ?? b.barbers[0];
  const ready = Boolean(service && day && time);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) return;
    setState("sending");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(form.entries()),
      barber: chosenBarber.name,
      service,
      day,
      time,
      dayLabel: day ? longDate(day) : "",
      timeLabel: time ? displayTime(time) : "",
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Something went wrong.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <section id="book" className="border-t border-white/8 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-2xl border border-gold/40 bg-ink-2 p-8 text-center sm:p-14">
          <span className="mx-auto block h-2 w-2 rotate-45 bg-gold" />
          <h2 className="display mt-7 text-4xl text-cream sm:text-5xl">
            Request sent
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-cream-dim">
            {chosenBarber.shortName} will confirm{" "}
            <span className="text-cream">
              {day ? longDate(day) : ""} at {time ? displayTime(time) : ""}
            </span>{" "}
            and get straight back to you. Nothing is charged and nothing is held
            until he replies.
          </p>
          <a
            href={`tel:${b.phone.e164}`}
            className="label mt-9 inline-flex items-center gap-2.5 border border-white/25 px-7 py-4 text-cream transition-colors hover:border-gold hover:text-gold"
          >
            <PhoneIcon className="h-4 w-4" />
            {b.phone.display}
          </a>
          {b.preview.active && (
            <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-cream-dim">
              Preview note: while this site is a preview, requests reach{" "}
              {b.preview.builtBy} rather than the shop.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="border-t border-white/8 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center">
            <p className="label text-gold">Appointments</p>
            <h2 className="display mt-5 text-5xl text-cream sm:text-6xl">
              Book a chair
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-cream-dim">
              Pick a time that suits you and {chosenBarber.shortName} confirms it
              by reply. No account, no deposit, no app.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={onSubmit}
            className="mt-14 border border-white/10 bg-ink-2 p-6 sm:p-10"
          >
            {/* honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-px w-px overflow-hidden opacity-0 [clip:rect(0,0,0,0)]"
            />

            {/* ── 1. barber ─────────────────────────────────────────────── */}
            <fieldset>
              <StepHeading n={1}>Your barber</StepHeading>
              <div className="grid gap-3 sm:grid-cols-2">
                {b.barbers.map((x) => (
                  <label
                    key={x.id}
                    className={`flex cursor-pointer items-center gap-4 border p-4 transition-colors ${
                      barber === x.id
                        ? "border-gold bg-gold/10"
                        : "border-white/15 hover:border-white/35"
                    }`}
                  >
                    <input
                      type="radio"
                      name="barberChoice"
                      value={x.id}
                      checked={barber === x.id}
                      onChange={() => setBarber(x.id)}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        barber === x.id ? "border-gold" : "border-white/40"
                      }`}
                    >
                      {barber === x.id && (
                        <span className="h-2 w-2 rounded-full bg-gold" />
                      )}
                    </span>
                    <span>
                      <span className="display block text-xl text-cream">
                        {x.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-cream-dim">
                        {x.role}
                      </span>
                    </span>
                  </label>
                ))}
                <p className="flex items-center border border-dashed border-white/12 p-4 text-xs leading-relaxed text-cream-dim">
                  More barbers joining the shop soon — they&apos;ll appear here
                  when they do.
                </p>
              </div>
            </fieldset>

            {/* ── 2. service ────────────────────────────────────────────── */}
            <fieldset className="mt-12">
              <StepHeading n={2}>What do you need</StepHeading>
              <div className="flex flex-wrap gap-2.5">
                {b.services.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setService(s.name)}
                    className={`label border px-4 py-3 transition-colors ${
                      service === s.name
                        ? "border-gold bg-gold text-ink"
                        : "border-white/15 text-cream-dim hover:border-white/40 hover:text-cream"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* ── 3. day ────────────────────────────────────────────────── */}
            <fieldset className="mt-12">
              <StepHeading n={3}>Pick a day</StepHeading>
              {days.length === 0 ? (
                <p className="text-sm text-cream-dim">Loading availability…</p>
              ) : (
                <div className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-2">
                  {days.map((iso) => {
                    const p = dayParts(iso);
                    const on = day === iso;
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => setDay(iso)}
                        className={`flex w-[4.5rem] shrink-0 flex-col items-center border py-3 transition-colors ${
                          on
                            ? "border-gold bg-gold/10"
                            : "border-white/15 hover:border-white/40"
                        }`}
                      >
                        <span className="label text-[10px] text-cream-dim">
                          {p.weekday}
                        </span>
                        <span
                          className={`display mt-1 text-2xl ${on ? "text-gold" : "text-cream"}`}
                        >
                          {p.day}
                        </span>
                        <span className="label text-[10px] text-cream-dim">
                          {p.month}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
              <p className="mt-3 text-xs text-cream-dim">
                Closed Sundays. The shop opens {b.opensOnLabel}.
              </p>
            </fieldset>

            {/* ── 4. time ───────────────────────────────────────────────── */}
            <fieldset className="mt-12">
              <StepHeading n={4}>Pick a time</StepHeading>
              {slots.length === 0 ? (
                <p className="text-sm text-cream-dim">
                  {day
                    ? "No times left on this day — try the next one."
                    : "Choose a day first."}
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
                  {slots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`border py-3 text-sm tabular-nums transition-colors ${
                        time === t
                          ? "border-gold bg-gold text-ink"
                          : "border-white/15 text-cream-dim hover:border-white/40 hover:text-cream"
                      }`}
                    >
                      {displayTime(t)}
                    </button>
                  ))}
                </div>
              )}
            </fieldset>

            {/* ── 5. details ────────────────────────────────────────────── */}
            <fieldset className="mt-12">
              <StepHeading n={5}>Your details</StepHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs text-cream-dim">
                    Name
                  </label>
                  <input id="name" name="name" required autoComplete="name" className={FIELD} />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs text-cream-dim">
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
              <div className="mt-4">
                <label htmlFor="notes" className="mb-2 block text-xs text-cream-dim">
                  Anything he should know <span className="text-cream-dim/70">(optional)</span>
                </label>
                <textarea id="notes" name="notes" rows={2} className={`${FIELD} resize-none`} />
              </div>
            </fieldset>

            {/* ── submit ────────────────────────────────────────────────── */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-sm leading-relaxed text-cream-dim">
                {ready ? (
                  <>
                    <span className="text-cream">{service}</span> with{" "}
                    <span className="text-cream">{chosenBarber.shortName}</span> —{" "}
                    <span className="text-cream">
                      {longDate(day!)} at {displayTime(time!)}
                    </span>
                  </>
                ) : (
                  "Choose a service, a day and a time to continue."
                )}
              </p>

              <button
                type="submit"
                disabled={!ready || state === "sending"}
                className="label mt-5 w-full bg-gold px-8 py-4 text-ink transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-cream-dim"
              >
                {state === "sending" ? "Sending…" : "Request this appointment"}
              </button>

              {error && <p className="mt-3 text-sm text-pole-red">{error}</p>}

              <p className="mt-5 text-xs leading-relaxed text-cream-dim">
                Times shown are {chosenBarber.shortName}&apos;s working hours, not
                a live calendar — he confirms your slot by reply.{" "}
                {b.preview.active
                  ? `While this site is a preview, requests reach ${b.preview.builtBy} rather than the shop, and nothing is stored.`
                  : "Your number is used to confirm this appointment and nothing else."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

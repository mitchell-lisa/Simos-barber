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
import { PhoneIcon } from "./site";

/* The hero offers the next few openings; tapping one should fill the form in
   rather than dumping you at the top of it. One custom event keeps the two
   components decoupled — no provider, no store. */
const PICK = "simos:pick";
type Pick = { day: string; time: string };

type State = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full border border-hair-2 bg-ink px-4 py-3.5 text-[15px] text-bone " +
  "placeholder:text-bone-3 transition-colors focus:border-brass focus:outline-none";

const LEGEND = "label mb-4 block text-bone-3";

const chip = (on: boolean) =>
  on
    ? "border-brass bg-brass text-ink"
    : "border-hair-2 text-bone-2 hover:border-brass hover:text-bone";

/* ───────────────────────── next available (hero) ─────────────────────────── */

export function NextAvailable() {
  const [picks, setPicks] = useState<Pick[]>([]);

  useEffect(() => {
    const out: Pick[] = [];
    for (const day of bookableDays()) {
      for (const time of slotsOn(day)) {
        out.push({ day, time });
        if (out.length === 4) break;
      }
      if (out.length === 4) break;
    }
    setPicks(out);
  }, []);

  if (picks.length === 0) return null;

  return (
    <div className="mt-12">
      <p className="label text-bone-3">Next available</p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {picks.map((p) => (
          <a
            key={`${p.day}${p.time}`}
            href="#book"
            onClick={() =>
              window.dispatchEvent(new CustomEvent<Pick>(PICK, { detail: p }))
            }
            className={`border px-4 py-2.5 text-[13px] tabular-nums transition-colors ${chip(false)}`}
          >
            {dayParts(p.day).weekday} {displayTime(p.time)}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── booking ───────────────────────────────────────── */

export function Booking() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  const [barberId, setBarberId] = useState<string>(b.barbers[0].id);
  const [service, setService] = useState<string>(b.services[0].name);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  // Availability depends on the clock, so it resolves after mount — the server
  // and the browser would otherwise disagree and React would complain.
  const [days, setDays] = useState<string[]>([]);
  useEffect(() => {
    const d = bookableDays();
    setDays(d);
    setDay((cur) => cur ?? d[0] ?? null);
  }, []);

  useEffect(() => {
    const onPick = (e: Event) => {
      const { day: d, time: t } = (e as CustomEvent<Pick>).detail;
      setDay(d);
      setTime(t);
    };
    window.addEventListener(PICK, onPick);
    return () => window.removeEventListener(PICK, onPick);
  }, []);

  const slots = useMemo(() => (day ? slotsOn(day) : []), [day]);
  useEffect(() => {
    setTime((t) => (t && slots.includes(t) ? t : null));
  }, [slots]);

  const barber = b.barbers.find((x) => x.id === barberId) ?? b.barbers[0];
  const ready = Boolean(service && day && time);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready) return;
    setState("sending");
    setError(null);

    const payload = {
      ...Object.fromEntries(new FormData(e.currentTarget).entries()),
      barber: barber.name,
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

  return (
    <section id="book" className="relative overflow-hidden border-b border-hair bg-ink-2">
      <div className="deco pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="text-center">
          <p className="label text-brass">Appointments</p>
          <h2 className="display mt-5 text-5xl text-bone sm:text-6xl">
            Book a chair
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-bone-2">
            {b.barbers.length > 1 ? (
              "Pick a barber and a time. You'll get a reply to confirm."
            ) : (
              <>
                With <span className="text-bone">{barber.name}</span>. Pick a
                time and you&apos;ll get a reply to confirm — no account, no
                deposit, no app.
              </>
            )}
          </p>
        </div>

        {state === "sent" ? (
          <div className="mt-14 border border-brass/50 bg-ink p-8 text-center sm:p-12">
            <p className="label text-brass">Request sent</p>
            <p className="display mt-5 text-4xl text-bone">
              {day ? longDate(day) : ""} at {time ? displayTime(time) : ""}
            </p>
            <p className="mx-auto mt-6 max-w-sm text-[15px] leading-relaxed text-bone-2">
              {barber.shortName} will confirm and come straight back to you.
              Nothing is charged and nothing is held until he replies.
            </p>
            <a
              href={`tel:${b.phone.e164}`}
              className="label mt-9 inline-flex items-center gap-2.5 border border-hair-2 px-7 py-4 text-bone transition-colors hover:border-brass hover:text-brass-2"
            >
              <PhoneIcon className="h-4 w-4" />
              Call the shop instead
            </a>
            {b.preview.active && (
              <p className="mx-auto mt-10 max-w-md border-t border-hair pt-6 text-xs leading-relaxed text-bone-3">
                Preview note: requests reach {b.preview.builtBy} rather than the
                shop.
              </p>
            )}
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-14 min-w-0 border border-hair bg-ink p-6 sm:p-10"
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

            {/* A picker only earns its place once there's a second chair. */}
            {b.barbers.length > 1 && (
              <div className="mb-10">
                <label htmlFor="barber" className={LEGEND}>
                  Barber
                </label>
                <select
                  id="barber"
                  value={barberId}
                  onChange={(e) => setBarberId(e.target.value)}
                  className={FIELD}
                >
                  {b.barbers.map((x) => (
                    <option key={x.id} value={x.id} className="bg-ink">
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="service" className={LEGEND}>
                Service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={FIELD}
              >
                {b.services.map((s) => (
                  <option key={s.name} value={s.name} className="bg-ink">
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="mt-10">
              <legend className={LEGEND}>Day</legend>
              {days.length === 0 ? (
                <p className="text-sm text-bone-3">Loading availability…</p>
              ) : (
                <div className="-mx-1 flex w-full gap-2.5 overflow-x-auto px-1 pb-1">
                  {days.map((iso) => {
                    const p = dayParts(iso);
                    const on = day === iso;
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => setDay(iso)}
                        className={`flex w-[4.25rem] shrink-0 flex-col items-center border py-3 transition-colors ${chip(on)}`}
                      >
                        <span className="text-[10px] uppercase tracking-[0.16em]">
                          {p.weekday}
                        </span>
                        <span className="display mt-1 text-2xl">{p.day}</span>
                        <span className="text-[10px] uppercase tracking-[0.16em]">
                          {p.month}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </fieldset>

            <fieldset className="mt-10">
              <legend className={LEGEND}>Time</legend>
              {slots.length === 0 ? (
                <p className="text-sm text-bone-3">
                  {day
                    ? "No times left this day — try the next one."
                    : "Pick a day first."}
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
                  {slots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`border py-3 text-[13px] tabular-nums transition-colors ${chip(time === t)}`}
                    >
                      {displayTime(t)}
                    </button>
                  ))}
                </div>
              )}
            </fieldset>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={LEGEND}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className={FIELD}
                />
              </div>
              <div>
                <label htmlFor="phone" className={LEGEND}>
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

            <div className="mt-5">
              <label htmlFor="notes" className={LEGEND}>
                Notes{" "}
                <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                className={`${FIELD} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={!ready || state === "sending"}
              className="label mt-10 w-full bg-brass px-7 py-4 text-ink transition-colors hover:bg-brass-2 disabled:cursor-not-allowed disabled:bg-hair disabled:text-bone-3"
            >
              {state === "sending"
                ? "Sending…"
                : ready
                  ? `Request ${longDate(day!)}, ${displayTime(time!)}`
                  : "Pick a day and a time"}
            </button>

            {error && <p className="mt-3 text-sm text-brass-2">{error}</p>}

            <p className="mt-6 text-xs leading-relaxed text-bone-3">
              These are {barber.shortName}&apos;s working hours, not a live
              calendar — he confirms your slot by reply.{" "}
              {b.preview.active
                ? `While this site is a preview, requests reach ${b.preview.builtBy} rather than the shop, and nothing is stored.`
                : "Your number is used to confirm this appointment and nothing else."}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

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

type State = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full border border-rule bg-card px-3.5 py-3 text-[15px] text-ink " +
  "placeholder:text-ink-3/70 transition-colors focus:border-ink focus:outline-none";

const LEGEND = "label mb-3 block text-ink-3";

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

  if (state === "sent") {
    return (
      <div
        id="book"
        className="flex flex-col justify-center border border-rule bg-card p-8 sm:p-10"
      >
        <p className="label text-ink-3">Request sent</p>
        <p className="display mt-4 text-3xl text-ink">
          {day ? longDate(day) : ""}
          <br />
          at {time ? displayTime(time) : ""}
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
          {barber.shortName} will confirm and come straight back to you. Nothing
          is charged and nothing is held until he replies.
        </p>
        <a
          href={`tel:${b.phone.e164}`}
          className="mt-8 self-start border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Call the shop instead
        </a>
        {b.preview.active && (
          <p className="mt-8 border-t border-rule-soft pt-5 text-xs leading-relaxed text-ink-3">
            Preview note: requests reach {b.preview.builtBy} rather than the
            shop.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      id="book"
      onSubmit={onSubmit}
      className="min-w-0 border border-rule bg-card p-6 sm:p-8"
    >
      <p className="label text-ink-3">Appointments</p>
      <h2 className="display mt-3 text-3xl text-ink">Book a chair</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        {b.barbers.length > 1 ? (
          "Pick a barber and a time — you'll get a reply to confirm."
        ) : (
          <>
            With{" "}
            <span className="text-ink">{barber.name}</span>. Pick a time and
            you&apos;ll get a reply to confirm.
          </>
        )}
      </p>

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
        <div className="mt-8">
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
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-8">
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
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="mt-8">
        <legend className={LEGEND}>Day</legend>
        {days.length === 0 ? (
          <p className="text-sm text-ink-3">Loading availability…</p>
        ) : (
          <div className="-mx-1 flex w-full gap-2 overflow-x-auto px-1 pb-1">
            {days.map((iso) => {
              const p = dayParts(iso);
              const on = day === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setDay(iso)}
                  className={`flex w-16 shrink-0 flex-col items-center border py-2.5 transition-colors ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-ink-2 hover:border-ink hover:text-ink"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-widest">
                    {p.weekday}
                  </span>
                  <span className="display mt-0.5 text-xl">{p.day}</span>
                  <span className="text-[10px] uppercase tracking-widest">
                    {p.month}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </fieldset>

      <fieldset className="mt-8">
        <legend className={LEGEND}>Time</legend>
        {slots.length === 0 ? (
          <p className="text-sm text-ink-3">
            {day ? "No times left this day — try the next one." : "Pick a day first."}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {slots.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className={`border py-2.5 text-[13px] tabular-nums transition-colors ${
                  time === t
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                {displayTime(t)}
              </button>
            ))}
          </div>
        )}
      </fieldset>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LEGEND}>
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={FIELD} />
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

      <div className="mt-4">
        <label htmlFor="notes" className={LEGEND}>
          Notes <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea id="notes" name="notes" rows={2} className={`${FIELD} resize-none`} />
      </div>

      <button
        type="submit"
        disabled={!ready || state === "sending"}
        className="mt-8 w-full bg-accent px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-3"
      >
        {state === "sending"
          ? "Sending…"
          : ready
            ? `Request ${longDate(day!)}, ${displayTime(time!)}`
            : "Pick a day and time"}
      </button>

      {error && <p className="mt-3 text-sm text-accent">{error}</p>}

      <p className="mt-5 text-xs leading-relaxed text-ink-3">
        These are {barber.shortName}&apos;s working hours, not a live calendar —
        he confirms your slot by reply.{" "}
        {b.preview.active
          ? `While this site is a preview, requests reach ${b.preview.builtBy} rather than the shop, and nothing is stored.`
          : "Your number is used to confirm this appointment and nothing else."}
      </p>
    </form>
  );
}

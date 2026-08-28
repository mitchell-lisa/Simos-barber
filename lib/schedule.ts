import { business as b } from "./business";

/**
 * Availability, derived entirely from `business.hours`.
 *
 * Everything is computed in the shop's timezone, never the visitor's — someone
 * booking from a different state must see John's clock, not their own. Dates
 * are plain "YYYY-MM-DD" strings and times plain "HH:MM", so no Date object
 * ever crosses a timezone boundary and daylight saving can't shift a slot.
 *
 * Note this reflects John's *working hours*, not a live calendar. Nothing is
 * stored, so a slot stays selectable until he confirms it by reply. The form
 * says so in as many words.
 */

const TZ = b.timeZone;

export const DAY_LONG = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
export const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Today in the shop's timezone, as YYYY-MM-DD. */
export function shopToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

/** Minutes since midnight, on the shop's clock. */
export function shopNowMinutes(): number {
  const hm = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
  return toMinutes(hm);
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(mins: number): string {
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}

/** Anchored at midday UTC so a day never slips across a DST boundary. */
function asDate(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

export function addDays(iso: string, n: number): string {
  const d = asDate(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function weekday(iso: string): number {
  return asDate(iso).getUTCDay();
}

export function hoursFor(iso: string) {
  return b.hours[weekday(iso)];
}

export function isOpenOn(iso: string): boolean {
  return hoursFor(iso) !== null;
}

/** "Mon 1 Sep" split into parts so the date chip can style them separately. */
export function dayParts(iso: string) {
  const d = asDate(iso);
  return {
    weekday: DAY_SHORT[d.getUTCDay()],
    day: String(d.getUTCDate()),
    month: MONTH_SHORT[d.getUTCMonth()],
  };
}

export function longDate(iso: string): string {
  const d = asDate(iso);
  return `${DAY_LONG[d.getUTCDay()]}, ${MONTH_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

/** "09:00" → "9:00 AM" */
export function displayTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** The first date anyone can book: not before the shop opens, not in the past. */
export function firstBookableDate(): string {
  const today = shopToday();
  return today > b.opensOnDate ? today : b.opensOnDate;
}

/** Open days from the first bookable date across the booking horizon. */
export function bookableDays(): string[] {
  const start = firstBookableDate();
  const out: string[] = [];
  for (let i = 0; i < b.booking.horizonDays; i++) {
    const iso = addDays(start, i);
    if (isOpenOn(iso)) out.push(iso);
  }
  return out;
}

/**
 * Start times available on a date. Today drops anything inside the lead time,
 * so nobody books a slot fifteen minutes from now while John is mid-cut.
 */
export function slotsOn(iso: string): string[] {
  const h = hoursFor(iso);
  if (!h) return [];

  const open = toMinutes(h.open);
  const close = toMinutes(h.close);
  const step = b.booking.slotMinutes;

  let earliest = open;
  if (iso === shopToday()) {
    earliest = Math.max(open, shopNowMinutes() + b.booking.leadTimeMinutes);
    earliest = Math.ceil(earliest / step) * step;
  }

  const out: string[] = [];
  for (let t = open; t + step <= close; t += step) {
    if (t >= earliest) out.push(fromMinutes(t));
  }
  return out;
}

/** Hours grouped into runs, so the Visit panel reads "Mon–Sat 9–6". */
export function hoursSummary(): { days: string; hours: string }[] {
  const rows: { days: string; hours: string }[] = [];
  let i = 0;
  while (i < 7) {
    const h = b.hours[i];
    let j = i;
    while (
      j + 1 < 7 &&
      JSON.stringify(b.hours[j + 1]) === JSON.stringify(h)
    ) {
      j++;
    }
    const days =
      i === j ? DAY_LONG[i] : `${DAY_SHORT[i]}–${DAY_SHORT[j]}`;
    rows.push({
      days,
      hours: h ? `${displayTime(h.open)} – ${displayTime(h.close)}` : "Closed",
    });
    i = j + 1;
  }
  return rows;
}

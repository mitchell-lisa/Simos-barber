import { business as b } from "./business";

/**
 * Opening hours, derived entirely from `business.hours`.
 *
 * Appointments themselves live in John's Vagaro calendar — this file no longer
 * computes bookable slots, because the site must never present availability it
 * cannot actually verify. All it does now is render the hours the shop keeps.
 */

export const DAY_LONG = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
export const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "09:00" → "9:00 AM" */
export function displayTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Hours grouped into runs, so the Visit panel reads "Mon–Sat 9–6". */
export function hoursSummary(): { days: string; hours: string }[] {
  // Monday first, the way a shop sign reads.
  const order = [1, 2, 3, 4, 5, 6, 0];
  const rows: { days: string; hours: string }[] = [];
  let i = 0;
  while (i < order.length) {
    const h = b.hours[order[i]];
    let j = i;
    while (
      j + 1 < order.length &&
      JSON.stringify(b.hours[order[j + 1]]) === JSON.stringify(h)
    ) {
      j++;
    }
    const days =
      i === j
        ? DAY_LONG[order[i]]
        : `${DAY_SHORT[order[i]]}–${DAY_SHORT[order[j]]}`;
    rows.push({
      days,
      hours: h ? `${displayTime(h.open)} – ${displayTime(h.close)}` : "Closed",
    });
    i = j + 1;
  }
  return rows;
}

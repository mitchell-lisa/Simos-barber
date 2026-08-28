/**
 * SIMO'S OF WAYNE, PA — business configuration
 *
 * This is the ONLY file that holds business facts. Change it here, it changes
 * everywhere — the page copy, the booking grid, the schema markup, the footer.
 *
 * RULE: if we do not know something, it is `null`. Components render nothing
 * for `null`. Never put a guess in this file. Anything marked `unconfirmed`
 * must be checked with the owner before this site goes on a real domain.
 */

export type DayHours = { open: string; close: string } | null;

export const business = {
  id: "simos-of-wayne",

  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Simo's",
  fullName: "Simo's of Wayne, Pa.",
  motto: "We Serve You",

  // ── Opening ───────────────────────────────────────────────────────────────
  opensOn: "2026-09-01T09:00:00-04:00",
  opensOnDate: "2026-09-01",
  opensOnLabel: "Tuesday, September 1",

  // ── Contact ───────────────────────────────────────────────────────────────
  phone: { e164: "+14846789232", display: "(484) 678-9232" },

  address: {
    street: "240 Lancaster Ave",
    city: "Wayne",
    state: "PA",
    zip: "19087",
    oneLine: "240 Lancaster Ave, Wayne, PA 19087",
    mapsQuery: "240 Lancaster Ave, Wayne, PA 19087",
  },

  timeZone: "America/New_York",

  social: {
    instagram: {
      handle: "@john_simonton_the_barber",
      url: "https://www.instagram.com/john_simonton_the_barber/",
    },
  },

  // ── Hours ─────────────────────────────────────────────────────────────────
  // Index 0 = Sunday. These drive both the Visit panel and the booking grid.
  hours: [
    null,
    { open: "09:00", close: "18:00" },
    { open: "09:00", close: "18:00" },
    { open: "09:00", close: "18:00" },
    { open: "09:00", close: "18:00" },
    { open: "09:00", close: "18:00" },
    { open: "09:00", close: "18:00" },
  ] as DayHours[],

  // ── Barbers ───────────────────────────────────────────────────────────────
  // One chair today. Add an entry and the booking form grows a barber picker.
  barbers: [
    {
      id: "john",
      name: "John Simonton", // from @john_simonton_the_barber — CONFIRM SPELLING
      shortName: "John",
      role: "Owner · Master Barber",
      unconfirmedName: true,
    },
  ],

  // ── Services ──────────────────────────────────────────────────────────────
  // Names only, no prices. The final menu and pricing come from John.
  servicesUnconfirmed: true,
  services: [
    { name: "Haircut", blurb: "Clipper or scissor, taken down to what you actually asked for." },
    { name: "Beard Trim & Shape", blurb: "Lined up clean, blended into the cut, left looking deliberate." },
    { name: "Hot Towel Shave", blurb: "Steam, lather, straight razor. The reason the pole is out front." },
    { name: "Cut & Beard", blurb: "The full sit-down. Head and face handled in one chair." },
    { name: "Kids' Cut", blurb: "Patient hands and no rush. First haircuts welcome." },
    { name: "Line-Up", blurb: "Edges and neckline sharpened between full cuts." },
  ],

  // ── Booking ───────────────────────────────────────────────────────────────
  booking: {
    slotMinutes: 30,
    horizonDays: 21,        // how far ahead the date strip runs
    leadTimeMinutes: 60,    // no same-day slot inside the next hour
    // Where a request lands. Set NOTIFY_EMAIL in Vercel to John's address; until
    // then requests fall back to the address below so nothing is lost.
    notifyEmail: null as string | null,
    fallbackEmail: "meetme@cornerof.com",
  },

  seo: {
    title: "Simo's of Wayne, Pa. — Book a Barber on Lancaster Ave",
    description:
      "Book a chair at Simo's, a traditional barbershop at 240 Lancaster Ave in Wayne, Pennsylvania. Haircuts, beard work and hot towel shaves. Open Monday to Saturday.",
  },

  // ── Preview mode ──────────────────────────────────────────────────────────
  preview: {
    // While true: noindex, disclosure banner, and the booking form says plainly
    // that requests reach MJL rather than the shop.
    active: true,
    builtBy: "Mitchell Lisa",
    builtByEmail: "meetme@cornerof.com",
  },
} as const;

export type Business = typeof business;
export type Barber = (typeof business.barbers)[number];

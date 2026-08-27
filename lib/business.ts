/**
 * SIMO'S OF WAYNE, PA — business configuration
 *
 * This is the ONLY file that holds business facts. Change it here, it changes everywhere.
 *
 * RULE: if we do not know something, it is `null`. Components render nothing for `null`.
 * Never put a guess in this file. Anything marked `unconfirmed: true` is a placeholder
 * that must be confirmed with the owner before this site goes live on a real domain.
 */

export type Hour = { day: string; open: string | null; close: string | null };

export const business = {
  id: "simos-of-wayne",
  status: "preview" as "preview" | "live",

  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Simo's",
  fullName: "Simo's of Wayne, Pa.",
  motto: "We Serve You", // from the shop's own logo
  barber: {
    firstName: "John",
    fullName: "John Simonton", // from @john_simonton_the_barber — CONFIRM SPELLING
    unconfirmed: true,
  },

  // ── Opening ───────────────────────────────────────────────────────────────
  opensOn: "2026-09-01T09:00:00-04:00",
  opensOnLabel: "Tuesday, September 1",

  // ── Contact ───────────────────────────────────────────────────────────────
  phone: { e164: "+14846789232", display: "(484) 678-9232" },
  email: null as string | null,

  address: {
    street: "240 Lancaster Ave",
    city: "Wayne",
    state: "PA",
    zip: "19087",
    oneLine: "240 Lancaster Ave, Wayne, PA 19087",
    mapsQuery: "240 Lancaster Ave, Wayne, PA 19087",
  },

  social: {
    instagram: {
      handle: "@john_simonton_the_barber",
      url: "https://www.instagram.com/john_simonton_the_barber/",
    },
    facebook: null as string | null,
  },

  // ── Hours: NOT YET KNOWN. Left null on purpose. ───────────────────────────
  hours: null as Hour[] | null,

  // ── Services ──────────────────────────────────────────────────────────────
  // Names only, no prices. Prices and the final menu come from John.
  servicesUnconfirmed: true,
  services: [
    {
      name: "Haircut",
      blurb: "Clipper or scissor, taken down to what you actually asked for.",
    },
    {
      name: "Beard Trim & Shape",
      blurb: "Lined up clean, blended into the cut, left looking deliberate.",
    },
    {
      name: "Hot Towel Shave",
      blurb: "Steam, lather, straight razor. The reason the pole is out front.",
    },
    {
      name: "Cut & Beard",
      blurb: "The full sit-down. Head and face handled in one chair.",
    },
    {
      name: "Kids' Cut",
      blurb: "Patient hands and no rush. First haircuts welcome.",
    },
    {
      name: "Line-Up",
      blurb: "Edges and neckline sharpened between full cuts.",
    },
  ],

  // ── Reviews: none yet. The shop has not opened. ───────────────────────────
  reviews: null,

  // ── Booking ───────────────────────────────────────────────────────────────
  booking: {
    // Requests are texted/emailed to the shop. No calendar, no payment, no account.
    enabled: true,
    notifyPhone: "+14846789232",
    serviceOptions: [
      "Haircut",
      "Beard trim & shape",
      "Hot towel shave",
      "Cut & beard",
      "Kids' cut",
      "Line-up",
      "Not sure yet",
    ],
  },

  seo: {
    title: "Simo's of Wayne, Pa. — Barbershop on Lancaster Ave",
    description:
      "A traditional barbershop opening September 1 at 240 Lancaster Ave in Wayne, Pennsylvania. Haircuts, beard work and hot towel shaves. Request the first chair.",
  },

  // ── Preview mode ──────────────────────────────────────────────────────────
  preview: {
    // While true: noindex, demo banner shown, booking requests go to MJL not to customers.
    active: true,
    builtBy: "Mitchell Lisa",
    builtByEmail: "meetme@cornerof.com",
  },
} as const;

export type Business = typeof business;

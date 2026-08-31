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
  // Index 0 = Sunday. Read off his Vagaro listing on 2026-08-31 — he is open
  // seven days, and no two days are the same. The earlier Mon–Sat 9–6 was our
  // assumption and it was wrong on every day of the week.
  hours: [
    { open: "11:00", close: "16:00" }, // Sun
    { open: "10:00", close: "18:00" }, // Mon
    { open: "10:00", close: "21:00" }, // Tue
    { open: "12:00", close: "17:00" }, // Wed
    { open: "09:00", close: "19:00" }, // Thu
    { open: "10:00", close: "18:00" }, // Fri
    { open: "08:00", close: "17:00" }, // Sat
  ] as DayHours[],

  // ── Barbers ───────────────────────────────────────────────────────────────
  // One chair today. Add an entry and the booking form grows a barber picker.
  barbers: [
    {
      id: "john",
      // Spelling confirmed 2026-08-31: "John Simonton" appears on his own
      // Vagaro reviews.
      name: "John Simonton",
      shortName: "John",
      role: "Owner · Master Barber",
    },
  ],

  // ── Services ──────────────────────────────────────────────────────────────
  // His real menu, taken verbatim from his Vagaro listing on 2026-08-31,
  // descriptions and all. The wording is his — "You wouldn't believe what's up
  // there!" is not something we would have written, which is the point.
  //
  // `price` is null wherever Vagaro shows $0.00, meaning he has not set one.
  // Null renders nothing. NEVER print $0.00, and never invent a number.
  serviceGroups: [
    {
      name: "Cuts",
      items: [
        { name: "Classic Cut", price: 50, blurb: "Precision cut, wash, and style." },
        { name: "New Classic", price: null, blurb: "Precision cut, wash style, w/aroma therapy, hot towel, and scalp treatment" },
        { name: "Mainliner", price: null, blurb: "Precision Cut and Beard Trim" },
        { name: "The Shebang", price: null, blurb: "That's right, the WHOLE one. Inquire with John." },
      ],
    },
    {
      name: "Shaves & Beards",
      items: [
        { name: "Shave (beard trim included)", price: null, blurb: "Hot towel, hot lather, straight razor shave. Close and comfortable." },
        { name: "Beard Trim", price: 20, blurb: "All clipper trimming and detail of any and all facial hair" },
        { name: "Beard Champ", price: null, blurb: "The ultimate beard experience, for medium and long beards only. We wash, condition, and straighten the beard using our own house-made beard products. Relaxing hot towels and straight razor finish." },
        { name: "Simo's Custom", price: null, blurb: "Our shave incorporating custom, fresh made shaving products with facial exfoliation, black mask, and clay post-mask. Ultimate relaxation." },
        { name: "Head Shave", price: null, blurb: "Straight shave with post-mask" },
      ],
    },
    {
      name: "Kids",
      items: [
        { name: "Classic Kid's Cut (ages 12 and under)", price: null, blurb: "We absolutely love the young bucks! Precision cut with wash upon request." },
        { name: "Brother Bundle (2 kids)", price: null, blurb: "Discounted service" },
        { name: "Brother Bundle (3 kids)", price: null, blurb: "Discounted service" },
        { name: "Brother Bundle (4 kids)", price: null, blurb: "Discounted service" },
      ],
    },
    {
      name: "Detail",
      items: [
        { name: "Eyebrow Waxing", price: null, blurb: "Trim and masculine shaping of the brows" },
        { name: "Nose Waxing", price: null, blurb: "You wouldn't believe what's up there!" },
        { name: "Ear Waxing", price: null, blurb: "Smooth as it gets" },
        { name: "Beard Color Service", price: null, blurb: "Color and/or blend away the gray" },
        { name: "Hair Color Service", price: null, blurb: "Color and/or blend away the gray." },
      ],
    },
  ],

  // ── Reputation ────────────────────────────────────────────────────────────
  // Real and checkable: this is the rating on his own Vagaro listing, read
  // 2026-08-31. Always shown attributed to Vagaro and linked, never restated
  // as if the reviews were collected here.
  reviews: {
    rating: 5.0,
    count: 78,
    source: "Vagaro",
    url: "https://www.vagaro.com/simosbarbering",
  },

  // ── The room ──────────────────────────────────────────────────────────────
  // All from his Vagaro listing. Small facts, but they are the ones people
  // actually want to know before walking into a barbershop.
  shop: {
    walkIns: true,
    parking: "Free parking",
    kidFriendly: true,
    amenities: ["WiFi", "TV"],
    payments: "Visa, Mastercard, Amex, Discover, debit and cash",
  },

  // ── Booking ───────────────────────────────────────────────────────────────
  // John takes appointments through Vagaro. Every booking action on this site
  // goes straight there. The site deliberately does NOT keep a second calendar:
  // a form that doesn't touch his real availability is how people get
  // double-booked and turned away at the door.
  booking: {
    provider: "Vagaro",
    url: "https://www.vagaro.com/simosbarbering",
    // The name on his Vagaro listing, which differs from the name on the shop
    // sign — worth reconciling with him before this goes on a real domain.
    listingName: "Simo's Barbering",

    // Vagaro's embedded booking widget, so people book without leaving.
    //
    // John generates this himself: Vagaro → Settings → Booking Widget →
    // choose "In Website" → Save → Copy Code. It is tied to his business ID,
    // so it cannot be written by hand, and Vagaro warns that editing their
    // generated code breaks the embed. Paste it here exactly as given.
    //
    // While this is null the Book section shows the button instead and every
    // booking action opens Vagaro in a new tab, so the site works either way.
    embedHtml: null as string | null,
  },

  seo: {
    title: "Simo's of Wayne, Pa. — Book a Barber on Lancaster Ave",
    description:
      "Book a chair at Simo's, a traditional barbershop at 240 Lancaster Ave in Wayne, Pennsylvania. Haircuts, beard work and straight-razor shaves. Walk-ins welcome, open seven days.",
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

# Simo's of Wayne, Pa.

Barbershop at **240 Lancaster Ave, Wayne, PA 19087**. Opening **Tuesday, September 1, 2026**.
Built by MJL Collective. The site exists to get appointments booked.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Vercel. No CMS, no database,
no UI kit, no animation library.

---

## The one file that matters

**`lib/business.ts`** holds every business fact — name, phone, address, opening date, hours,
barbers, services, preview flags. Change it there and it changes everywhere: page copy, the
booking grid, the hours panel, the schema markup, the footer.

Rules baked into that file:

- If a fact is unknown it is `null`, and the component renders nothing. No guesses.
- `barbers` is an array. Add a second entry and the booking form grows a barber picker on its
  own — nothing else needs touching.
- `hours` is indexed 0 = Sunday. It drives both the Visit panel and every bookable slot.

## Booking

**John takes appointments in Vagaro.** Every booking action on the site — the header button,
the hero, the Book section, Services, The Shop, Visit, the footer — is the same `BookButton`
pointing at `business.booking.url`, which opens `vagaro.com/simosbarbering` in a new tab.

There is deliberately **no booking form and no `/api/book` route**. The site used to carry its
own form that emailed requests to MJL, built when John had no booking software. Now that he has
a real calendar, a second intake path is not a feature, it is a defect: a customer who "books"
here would not appear in Vagaro, and would arrive to a chair that was never held for them. One
calendar, and it is his.

`lib/schedule.ts` is now only `hoursSummary()` and `displayTime()` — it renders the hours in
`business.hours` and computes no availability, because the site cannot verify availability it
does not own.

If a future client has no booking software, the form and the notification route are in git
history at commit `2bf81c6` and can be lifted back out.

**Local SEO:** the `BarberShop` JSON-LD carries a `ReserveAction` pointing at Vagaro, which is
what a "Book" button in a Google local result hangs off, and Vagaro is listed in `sameAs`.
There is no `priceRange` — a guessed `$$` is a claim about his pricing we cannot support.

## Design

**Direction: Chair & Mirror**, drawn from the two references the owner picked
(heritagebarberco.com, barberandco.us). Both lead with photography on a dark
ground, repeat one booking action down the whole page, and mark sections with
the tools of the trade — so this does the same.

- **Palette comes from the shop itself.** The room at 240 Lancaster is papered
  in Art Deco gold fans on near-black with brass mirror frames, so the site is
  warm near-black, bone, and a single brass accent. The brass appears on the
  booking action and almost nowhere else.
- **Type:** Bodoni Moda for headlines only, set large and tight; Archivo for
  everything functional.
- **The wallpaper is redrawn, not photographed.** `tools/build-pattern.py`
  rebuilds the fan motif as a seamless SVG — a fan of rays on a half-offset
  lozenge lattice — and writes it to `app/pattern.css` as a data URI. It is
  about a kilobyte, crisp at any size, and tintable. Applied through `.deco`
  behind the hero, the booking panel and the footer at 5–7% opacity.
  (The photograph of the real wall is unusable: plastic still on the mirrors,
  wires across the floor.)
- **Icons are drawn, not borrowed** — scissors, straight razor, comb, pole.
- **Photographs are bled, not framed.** Nothing sits in a bordered box with a
  caption underneath — the pole runs off the right edge of the hero, the clock
  off the right edge of The Shop, and the two patent drawings are the ground the
  "Since 1916" section is written on. Each is dissolved with a gradient
  `mask-image` (`.mesh-hero`, `.mesh-left`, `.mesh-band` in `globals.css`) and
  graded down so it ends in the page instead of stopping at a border. Alt text
  carries what the captions used to say.

`tools/build-logo.py` is retired: the owner supplied clean high-resolution
artwork, so `tools/` now holds the pattern generator and the logo is processed
once. The caption baked into his file was removed by hue (the neutral white
text goes, the warm gold arc behind it stays), then the artwork was
un-multiplied off its black ground so it composites on any background.

## Preview mode

`business.preview.active === true` currently does four things:

1. `noindex, nofollow` in metadata and `Disallow: /` in `robots.txt`, so the preview can never
   compete with or be mistaken for the shop in search.
2. Shows the disclosure bar at the top.
3. Shows the full disclosure paragraph in the footer.

Flip it to `false` only when the site moves to Simo's own domain with John's go-ahead.

## Media

Everything in `public/media/` is from the shop:

- `pole.mp4` / `pole-poster.jpg` — the real pole out front, in The Shop
- `clock.webp` — the oak barber shop clock on the wall
- `patent-pole.webp` — Koken's 1916 barber pole patent, framed in the shop
- `patent-clipper.webp` — White's 1919 hair clipper patent, framed in the shop

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before deploying
```

## Still to confirm with John

- Spelling of his full name (currently "John Simonton", taken from his Instagram handle)
- That (484) 678-9232 is the number he wants public
- Real service menu and pricing — the six services listed are a proposal, not his menu
- Whether the shop is "Simo's of Wayne, Pa." (the sign) or "Simo's Barbering" (his Vagaro
  listing) — right now a customer meets two different names
- That Mon–Sat 9–6 matches what he set in Vagaro
- Photos of the interior, the chair, and finished cuts

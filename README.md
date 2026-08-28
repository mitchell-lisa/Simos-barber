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

The whole point of the site. It sits beside the masthead, above the fold on desktop.
`components/booking.tsx` takes service, day, time and details and posts to
`app/api/book/route.ts`. The barber picker only appears once `barbers` has more
than one entry — with a single chair it just says who you're booking with.

`lib/schedule.ts` derives availability from `business.hours` alone:

- Everything is computed in **America/New_York**, never the visitor's timezone. Someone booking
  from another state sees John's clock.
- Dates are plain `YYYY-MM-DD` strings and times plain `HH:MM`, so no Date object crosses a
  timezone boundary and daylight saving can't shift a slot.
- Slots run from open to close at `booking.slotMinutes` (30), last start one slot before close.
- Today drops anything inside `booking.leadTimeMinutes` (60), so nobody books a slot fifteen
  minutes out while John is mid-cut.
- Nothing before `opensOn` is bookable.

**What this is not:** a live calendar. Nothing is stored, so a slot stays selectable until John
replies. The form says that in as many words, and the confirmation screen repeats it. Real
booked-slot blocking needs a database — worth adding once he's actually turning people away.

### Where a request goes

`app/api/book/route.ts` turns a request into one notification. Channels are tried in order and
the first configured one wins:

| Channel | Environment variables |
|---|---|
| Email (Resend) | `RESEND_API_KEY`, `NOTIFY_EMAIL`, optional `NOTIFY_FROM` |
| SMS (Twilio) | `TWILIO_SID`, `TWILIO_TOKEN`, `TWILIO_FROM`, optional `NOTIFY_PHONE` |
| None | nothing set — logged, and the visitor is still told it went through |

**To go live:** get a Resend API key (free tier is fine), set `RESEND_API_KEY` and
`NOTIFY_EMAIL` in Vercel → Settings → Environment Variables. Until `NOTIFY_EMAIL` is set,
requests fall back to `booking.fallbackEmail` in `lib/business.ts` so none are lost.

SMS is written and waiting but needs a Twilio account plus 10DLC registration, which takes a
few days to approve.

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
- **Photographs are graded** to sit on ink rather than punch holes in it.

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
4. Tells anyone using the booking form that requests reach MJL, not the shop.

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
- **His email address**, for `NOTIFY_EMAIL`
- Real service menu and pricing — the six services listed are a proposal, not his menu
- That Mon–Sat 9–6 is right, and how he wants holidays handled
- Photos of the interior, the chair, and finished cuts

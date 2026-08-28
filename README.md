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

The whole point of the site. `components/booking.tsx` walks five steps on one page — barber,
service, day, time, details — and posts to `app/api/book/route.ts`.

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

## The turning pole

The landing page is the shop's own badge with the barber pole that forms the "i" in Simo's
actually turning.

`tools/build-logo.py` generates two files from the owner's logo:

- `public/media/logo.webp` — the whole badge, transparent outside the disc
- `public/media/logo-shell.webp` — the same badge with the pole's **glass punched out**

`components/badge.tsx` stacks the shell over a CSS stripe layer showing through the hole. The
stripes run along `phase = y + 0.67x` and repeat every 83 source px, so the gradient axis sits
perpendicular to them (146.2°) and sliding the layer down by exactly one vertical period lands
the pattern back on itself — a seamless loop, and the same illusion a real pole works by. The
cylinder shading is a separate static overlay sampled off the original artwork, which is what
keeps it reading as the badge rather than a cartoon.

Doing the motion in CSS rather than baking frames keeps it sharp at any size, cut the asset
from ~170KB to ~40KB, and makes speed and direction a one-line change in `globals.css`.

`tools/build-logo.py` prints the hole's position as percentages; those numbers live in
`components/badge.tsx` as `HOLE` and must be updated together. Point `SRC` at a new file and
re-run if John supplies better artwork.

## Preview mode

`business.preview.active === true` currently does four things:

1. `noindex, nofollow` in metadata and `Disallow: /` in `robots.txt`, so the preview can never
   compete with or be mistaken for the shop in search.
2. Shows the dismissible disclosure bar at the top.
3. Shows the full disclosure paragraph in the footer.
4. Tells anyone using the booking form that requests reach MJL, not the shop.

Flip it to `false` only when the site moves to Simo's own domain with John's go-ahead.

## Media

Everything in `public/media/` is from the shop:

- `pole.mp4` / `pole-poster.jpg` — the real pole out front, behind the opening countdown
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

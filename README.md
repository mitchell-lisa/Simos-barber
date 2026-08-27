# Simo's of Wayne, Pa. — preview site

Barbershop at **240 Lancaster Ave, Wayne, PA 19087**. Opening **Tuesday, September 1, 2026**.
Built by MJL Collective as a private preview for the owner.

Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Vercel. No CMS, no database, no UI kit.

---

## The one file that matters

**`lib/business.ts`** holds every business fact on the site — name, phone, address, opening date,
services, Instagram, preview flags. Change it there and it changes everywhere. Nothing is hardcoded
into components.

Rules baked into that file:

- If a fact is unknown it is `null`, and the component renders nothing. No guesses.
- Anything marked `unconfirmed: true` must be confirmed with John before this goes on a real domain.
- `hours` is `null` — we don't know them yet, so the Visit section says they're posted at opening.
- `reviews` is `null` — the shop hasn't opened, so there are none to show.

## Preview mode

`business.preview.active === true` currently does four things:

1. `robots: noindex, nofollow` in metadata and `Disallow: /` in `robots.txt`, so the preview can
   never compete with or be mistaken for the shop in search.
2. Shows the dismissible disclosure bar at the top ("Private preview… not yet the shop's official website").
3. Shows the full disclosure paragraph in the footer.
4. Tells anyone using the booking form that requests reach MJL, not the shop.

Flip `preview.active` to `false` only when the site moves to Simo's own domain with John's go-ahead.

## Booking

`app/api/book/route.ts` takes a request and turns it into one notification. Nothing is stored.
It tries channels in order and the first configured one wins:

| Channel | Environment variables |
|---|---|
| SMS (Twilio) | `TWILIO_SID`, `TWILIO_TOKEN`, `TWILIO_FROM` |
| Email (Resend) | `RESEND_API_KEY`, `NOTIFY_EMAIL`, optional `NOTIFY_FROM` |
| None | nothing set — request is logged, caller told delivery isn't live |

`NOTIFY_PHONE` overrides the destination number from `lib/business.ts`.

With nothing configured (the current state) the form works end to end and returns success, but no
text is sent. Add the Twilio vars in Vercel → Settings → Environment Variables to make the text real.
Twilio needs an account plus 10DLC/toll-free registration, which takes a few days to approve —
until then the click-to-call button is the instant path to John's phone.

## The mark

The landing page is the shop's own logo with the barber pole that forms the "i" in Simo's actually
turning. `tools/build-logo.py` generates it from the owner's logo file and writes:

- `public/media/logo-live.webp` — animated, 20 frames, used on the landing page
- `public/media/logo.webp` — still frame, used in the header, footer and reduced-motion fallback
- `app/icon.png` — the favicon

How the animation works: the pole's stripes are diagonal, so sliding the stripe pattern along y reads
as rotation. The pattern repeats every 83px along `phase = y + 0.67x`, so shifting by exactly one
period across 20 frames loops seamlessly. The cylinder's shading depends only on x, so it's sampled
off the original logo and held still while the stripes move under it — that's what keeps it looking
like the same badge rather than a cartoon.

Two things the script also fixes: it cuts inside the white sticker ring on the source file, and it
lifts the black point so the badge's near-black sits on the page ink instead of floating as a grey
disc. Point `SRC` at a new file and re-run if John supplies better artwork.

## Other media

Everything in `public/media/` was shot at the shop:

- `pole.mp4` / `pole-poster.jpg` — the real pole out front, behind the opening countdown
- `clock.webp` — the oak barber shop clock on the wall
- `patent-pole.webp` — framed Koken 1916 barber pole patent
- `patent-clipper.webp` — framed White 1919 hair clipper patent

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before deploying
```

## Still to confirm with John

- Spelling of his full name (currently "John Simonton", taken from his Instagram handle)
- That (484) 678-9232 is the number he wants on the site
- Real service menu and pricing — the six services listed are a proposal, not his menu
- Opening-week hours
- High-resolution logo file
- Photos of the interior, the chair, and finished cuts

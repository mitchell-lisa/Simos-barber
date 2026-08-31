# Simo's Barbering

Barbershop at **240 Lancaster Ave, Wayne, PA 19087**. Opened **Tuesday, September 1, 2026**.
Built by MJL Collective. Lives at **simosbarbering.com**.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Vercel. No CMS, no database,
no UI kit, no animation library, no icon pack. Static, and no environment variables to run.

---

## The one file that matters

**`lib/business.ts`** holds every business fact — name, phone, address, hours, barbers, the
service menu, the rating, the booking config. Change it there and it changes everywhere: page
copy, the hours panel, the schema markup, the footer.

Rules baked into that file:

- If a fact is unknown it is `null`, and the component renders nothing. **No guesses.** Hours were
  once assumed to be Mon–Sat 9–6; he is open seven days and every day was wrong.
- `hours` is indexed 0 = Sunday.
- Service `price` is `null` wherever Vagaro has none set. **Never print `$0.00`.** Only Classic
  Cut ($50) and Beard Trim ($20) have real prices.
- `signName` is what the painted sign and the logo say ("Simo's of Wayne, Pa."), which differs
  from the business name. It exists so the logo's alt text describes the actual image.

## Booking

**John takes appointments in Vagaro, and the Vagaro widget is the services section.** It is
embedded in the Book section, directly under the trust strip, and it is the main content of the
page.

There is deliberately **no booking form and no `/api/book` route**. The site used to carry a form
that emailed requests to MJL, built when John had no booking software. A second intake path
against a real calendar is not a feature, it is a defect: a customer who "books" here would never
appear in Vagaro and would arrive to a chair nobody held. One calendar, and it is his. (If a
future client has no booking software, the form and notification route are in git history at
`2bf81c6`.)

`components/vagaro.tsx` injects `business.booking.embedHtml` and **re-creates any `<script>` it
carries** — React will not execute one that arrives through `innerHTML`. The embed code is
generated inside John's Vagaro account (Settings → Booking Widget → "In Website" → Copy Code); it
is tied to his business ID and cannot be written by hand.

`components/book-button.tsx` is a real link to his Vagaro page — it works with JavaScript off,
opens a new tab on cmd/middle-click, and is crawlable — and intercepts the click to scroll to the
embedded widget.

`lib/schedule.ts` is only `hoursSummary()` and `displayTime()`. The site computes no availability
it cannot verify.

**A visible services list used to sit above the widget and was removed** — it was the same
eighteen services twice, 64% of the page. Because crawlers cannot read text inside an iframe, the
full menu now lives in the JSON-LD as a `hasOfferCatalog`, in his own wording. Google gets the
menu; the page costs nothing to show it.

## Reputation

**5.0 from 78 reviews**, shown in the trust strip, attributed to Vagaro and linked. Deliberately
**not** in the JSON-LD as `aggregateRating` — that markup is for reviews a site collects itself,
and misusing it risks a rich-result penalty. There is no `priceRange` either: a guessed `$$` is a
claim about his pricing we cannot support.

## Design

**Direction: Chair & Mirror**, drawn from the two references the owner picked
(heritagebarberco.com, barberandco.us).

- **Palette comes from the shop itself.** The room at 240 Lancaster is papered in Art Deco gold
  fans on near-black with brass mirror frames, so the site is warm near-black, bone, and a single
  brass accent used on the booking action and almost nowhere else.
- **Type:** Bodoni Moda for headlines only, set large and tight; Archivo for everything functional.
- **The wallpaper is redrawn, not photographed.** `tools/build-pattern.py` rebuilds the fan motif
  as a seamless SVG and writes it to `app/pattern.css` as a data URI — about a kilobyte, crisp at
  any size, tintable. Applied through `.deco` at 5–7% opacity.
- **Icons are drawn, not borrowed** — scissors, straight razor, comb, pole.
- **Photographs are bled, not framed.** Nothing sits in a bordered box with a caption. The pole
  runs off the right edge of the hero, the clock off the right edge of The Shop, and the two
  patent drawings are the ground "Since 1916" is written on. Each is dissolved with a gradient
  `mask-image` (`.mesh-hero`, `.mesh-left`, `.mesh-band` in `globals.css`).

## Media

Everything in `public/media/` is from the shop.

| File | What it is |
|---|---|
| `pole.webp` | The pole out front, turning — **animated WebP, 226KB** |
| `pole-still.webp` | One frame of it, served under `prefers-reduced-motion` |
| `clock.webp` | The oak barber shop clock on the wall |
| `patent-pole.webp` | Koken's 1916 barber pole patent, framed in the shop |
| `patent-clipper.webp` | White's 1919 hair clipper patent, framed in the shop |
| `logo.webp` | His mark, 256px — sized to what it is drawn at, not what was supplied |

**Why the pole is an animated image and not a `<video>`.** A video has to satisfy an autoplay
policy: muted, `playsInline`, and even then iOS Low Power Mode and Safari's per-site autoplay
setting will refuse it, leaving a frozen poster frame. An animated image has no policy to satisfy
and no JavaScript. The cost is size, and format matters enormously here — the same 4.4s clip:

| Format | Size |
|---|---|
| MP4 (what it was) | 79 KB |
| **Animated WebP (what it is)** | **226 KB** |
| GIF, reduced to 12fps / 420px | 4.1 MB |
| GIF, full quality | 12 MB |

A GIF was the obvious ask and the wrong format — 50× the video for a decorative background that
renders at 25% opacity on a phone. The WebP is trimmed to 3s, 360px, 12fps, which is invisible
behind `brightness-[0.62]` at that opacity.

Since an animated image cannot be paused, `prefers-reduced-motion` is honoured with a `<picture>`
`<source>` that swaps in the still frame. No JavaScript.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before deploying
```

## Deployment

GitHub → Vercel, production branch **must** be set to the branch being pushed, or every deploy
lands as a preview and has to be promoted by hand.

## Still open with John

- Prices for the sixteen services showing $0.00 in Vagaro
- Shop photos — the hero and The Shop still carry the footage shot before opening
- Whether he is solo, or staff should be added to `business.barbers`
- A Google Business Profile, which he still does not have

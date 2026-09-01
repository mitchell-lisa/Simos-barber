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

**The eighteen-line Vagaro services list that used to sit above the widget was removed** — it was
the same services twice, 64% of the page. Because crawlers cannot read text inside an iframe, the
full Vagaro menu lives in the JSON-LD as a `hasOfferCatalog`, in his own wording.

**What the page shows instead is the door.** John painted his menu on the shop's back door —
twelve lines, his wording, his prices, "tax incl." — and the Menu section (`business.menu`,
above the Book section) reproduces it line for line rather than listing a database. It is the
one place the site prints prices, and it ends in a button that scrolls to the Vagaro widget.
Booking is still only ever Vagaro.

`business.menu` and `business.serviceGroups` are two lists on purpose: the door is what
customers see, the Vagaro list is what Google reads. Where the door prices a service the Vagaro
list also carries, the price was copied across on 2026-09-01, so the JSON-LD no longer says a
Mainliner has no price. Beard Trim's price is hidden behind the door handle in the photo; $20 is
from Vagaro, where it has always been set.

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
  The Menu section alone adds two more, to match the painted door: Fredericka the Great for the
  service names (hand-lettered caps, tracked wide, in brass) and Walter Turncoat for the lines
  under them (a quick brush hand, in the door's cream). Prices sit in `.oval`, a CSS oval with
  uneven radii tilted four degrees so it reads as painted, not as a pill; the two he painted red
  are `accent: true`. The flourishes in the corners of the rule and the "≻" that starts each line
  are drawn, like the other icons.
- **The wallpaper is redrawn, not photographed.** `tools/build-pattern.py` rebuilds the sunburst
  as a seamless SVG and writes it to `app/pattern.css` as a data URI — a few kilobytes, crisp at
  any size, tintable. Applied through `.deco` at 5–7% opacity. The geometry was measured from a
  straight-on photograph of the wall on 2026-09-01: a lattice of thick diagonals forming
  near-square diamonds, each holding thirteen thinner rays from its bottom corner whose tips sit
  at one-seventh steps along the upper edges. The docstring in the script has the details; rerun
  it after changing anything there.
- **Icons are drawn, not borrowed** — scissors, straight razor, comb, pole.
- **One photograph per section, at most.** The tonics, the razor and a hot-towel shot once
  flanked the door menu and the booking widget; they layered up and came out (git history has
  them). Hero: the room. The Shop: John. Visit: the front door.
- **Photographs are bled, not framed.** Nothing sits in a bordered box with a caption. The pole
  runs off the right edge of the hero, the clock off the right edge of The Shop. Each is dissolved with a gradient `mask-image` (`.mesh-hero`, `.mesh-left`, `.mesh-down` in `globals.css`).

## Media

Everything in `public/media/` is from the shop.

| File | What it is |
|---|---|
| `room.webp` | The room, lights on: the chairs, the mirrors, the wallpaper and the black door — the hero, bled off the right edge |
| `pole.webp` | The pole out front, turning — **animated WebP, 226KB**. Was the hero until the room was photographed; kept, not placed |
| `pole-still.webp` | One frame of it, for `prefers-reduced-motion` — kept with it |
| `clock.webp` | The oak barber shop clock on the wall |
| `logo.webp` | His round emblem, 256px — the footer |
| `entrance.webp` | The front door: stripes painted over the entrance, the downlight, and the 240 — cropped to run down into the Visit section |
| `wordmark.webp` | His wordmark, the pole for the I — cut out of a photograph of a print with real transparency; the header and the head of the door menu. Replace with the real file when it turns up |
| `john.webp` | John, comb and shears in hand, in the shop — his profile picture, 1000×1333, rotated upright and stripped of the phone's GPS data |

**Why the pole is an animated image and not a `<video>`** (it is no longer on the page, but the reasoning holds for any footage that goes back in). A video has to satisfy an autoplay
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

- Vagaro still shows $0.00 for most services. The door has prices for ten of them and the site
  now prints those; he should set the same numbers in Vagaro so the widget agrees with the door
- Color and wax services have no price on the door or in Vagaro
- The hero now carries the room and The Shop carries John's portrait
  (`business.barbers[0].photo`). The pole footage and the clock are no longer placed on the page
  but stay in `public/media/`
- Whether he is solo, or staff should be added to `business.barbers`
- A Google Business Profile, which he still does not have

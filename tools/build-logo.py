"""
Build the Simo's logo assets from the owner's logo file.

Produces:
  public/media/logo.png       static, transparent outside the black disc
  public/media/logo-live.webp same crop, animated: the barber pole that forms
                              the "i" in Simo's actually turns

How the animation works: the pole's stripes are diagonal, so translating the
stripe pattern along y makes it read as rotation. The pattern is periodic
(period 83px along phase = y + 0.67x), so shifting by exactly one period over
N frames gives a seamless loop. The cylinder's shading depends only on x, so
it is sampled from the original logo and left in place while the stripes move
underneath it.
"""

import numpy as np
from PIL import Image, ImageFilter

SRC = "/root/.claude/uploads/421787c4-721d-528e-9061-aeaa329c49d2/bd5eb63b-image.png"
OUT = "public/media"

# ── geometry measured off the source file ────────────────────────────────────
CX, CY = 359.29, 337.35    # centre of the disc (least-squares fit to the ring)
R_DISC = 252               # inner edge of the white sticker ring is ~256
GX0, GX1 = 262, 296        # the pole's glass, x range
GY0, GY1 = 257, 374        # the pole's glass, y range
SLOPE = 0.67               # stripes lie along phase = y + SLOPE*x
PERIOD = 83.0              # phase distance from one red band to the next
RED_PHASE = 20.0           # phase of a red band centre
SS = 8                     # supersample factor
FRAMES = 20
FRAME_MS = 60

RED = np.array([142, 39, 34], float)
BLUE = np.array([36, 71, 116], float)
WHITE = np.array([232, 229, 223], float)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def main():
    src = Image.open(SRC).convert("RGB")
    a = np.asarray(src).astype(float)
    h, w, _ = a.shape

    # ── shading profile: peak luminance per column across the glass ──────────
    glass = a[GY0:GY1, GX0:GX1]
    env = glass.mean(axis=2).max(axis=0)
    env = np.convolve(env, np.ones(3) / 3, mode="same")
    env[0], env[-1] = env[1], env[-2]
    shade = np.clip(env / env.max(), 0.12, 1.0)

    gw, gh = GX1 - GX0, GY1 - GY0

    # ── supersampled coordinate grid over the glass ─────────────────────────
    ys = (np.arange(gh * SS) + 0.5) / SS + GY0
    xs = (np.arange(gw * SS) + 0.5) / SS + GX0
    YY, XX = np.meshgrid(ys, xs, indexing="ij")
    base_phase = YY + SLOPE * XX

    # shading sampled at supersampled x, then held constant while stripes move
    shade_ss = np.interp(xs, np.arange(GX0, GX1) + 0.5, shade)
    shade_img = np.repeat(shade_ss[None, :], gh * SS, axis=0)[..., None]

    # feathered alpha so the repaint blends into the untouched glass rim
    fx = np.minimum(np.arange(gw * SS), gw * SS - 1 - np.arange(gw * SS)) / SS
    fy = np.minimum(np.arange(gh * SS), gh * SS - 1 - np.arange(gh * SS)) / SS
    feather = np.minimum(
        smoothstep(0.0, 1.6, fx)[None, :], smoothstep(0.0, 1.6, fy)[:, None]
    )[..., None]

    # ── disc mask ───────────────────────────────────────────────────────────
    # The badge's black disc is a shade lighter than the page, so a hard cut at
    # R_DISC leaves a faint circle floating on the background. The emblem's
    # outermost artwork ends at ~r236, so hold full opacity to there and ease
    # the dead black band out — the mark then sits on the page with no edge.
    yy, xx = np.mgrid[0:h, 0:w]
    rr = np.sqrt((xx - CX) ** 2 + (yy - CY) ** 2)
    disc = 1.0 - smoothstep(231.0, float(R_DISC), rr)

    x0, y0 = int(CX - R_DISC), int(CY - R_DISC)
    x1, y1 = int(np.ceil(CX + R_DISC)), int(np.ceil(CY + R_DISC))

    frames = []
    for f in range(FRAMES):
        phase = base_phase + (f / FRAMES) * PERIOD
        t = np.mod(phase - RED_PHASE, PERIOD) / PERIOD
        u = np.cos(2 * np.pi * t)                       # +1 red, -1 blue, 0 white
        k = smoothstep(0.45, 0.85, np.abs(u))[..., None]  # band vs. transition
        hue = np.where((u > 0)[..., None], RED, BLUE)
        stripe = WHITE * (1 - k) + hue * k
        stripe = stripe * shade_img

        # downsample the supersampled render back to logo resolution
        small = stripe.reshape(gh, SS, gw, SS, 3).mean(axis=(1, 3))
        alpha = feather.reshape(gh, SS, gw, SS, 1).mean(axis=(1, 3))

        out = a.copy()
        out[GY0:GY1, GX0:GX1] = out[GY0:GY1, GX0:GX1] * (1 - alpha) + small * alpha

        # The badge's black is a few levels lighter than the page ink, which
        # reads as a grey halo on a black background. Lift the black point so
        # the dead areas land on the page colour; highlights are untouched.
        out = np.clip((out - 11.0) * (255.0 / 244.0), 0, 255)

        rgba = np.dstack([out, disc * 255]).astype(np.uint8)
        frames.append(Image.fromarray(rgba, "RGBA").crop((x0, y0, x1, y1)))

    size = (520, 520)
    frames = [fr.resize(size, Image.LANCZOS) for fr in frames]

    frames[0].save(f"{OUT}/logo.webp", "WEBP", quality=90, method=6)
    frames[0].resize((64, 64), Image.LANCZOS).save("app/icon.png", optimize=True)
    frames[0].save(
        f"{OUT}/logo-live.webp",
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_MS,
        loop=0,
        quality=86,
        method=6,
        lossless=False,
    )

    import os
    print("logo.webp    ", os.path.getsize(f"{OUT}/logo.webp"))
    print("logo-live.webp", os.path.getsize(f"{OUT}/logo-live.webp"))

    # zoomed proof sheet: original pole vs. rendered pole
    pad = 26
    box = (GX0 - pad, GY0 - pad, GX1 + pad, GY1 + pad)
    orig = src.crop(box)
    for i, fr in enumerate([0, 5, 10]):
        pass
    sheet = Image.new("RGB", ((box[2] - box[0]) * 5 * 4 + 40, (box[3] - box[1]) * 5), (10, 10, 11))
    sheet.paste(orig.resize((orig.width * 5, orig.height * 5), Image.NEAREST), (0, 0))
    for i, fi in enumerate([0, 6, 13]):
        phase = base_phase + (fi / FRAMES) * PERIOD
        t = np.mod(phase - RED_PHASE, PERIOD) / PERIOD
        u = np.cos(2 * np.pi * t)
        k = smoothstep(0.45, 0.85, np.abs(u))[..., None]
        hue = np.where((u > 0)[..., None], RED, BLUE)
        stripe = (WHITE * (1 - k) + hue * k) * shade_img
        small = stripe.reshape(gh, SS, gw, SS, 3).mean(axis=(1, 3))
        alpha = feather.reshape(gh, SS, gw, SS, 1).mean(axis=(1, 3))
        out = a.copy()
        out[GY0:GY1, GX0:GX1] = out[GY0:GY1, GX0:GX1] * (1 - alpha) + small * alpha
        crop = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).crop(box)
        sheet.paste(
            crop.resize((crop.width * 5, crop.height * 5), Image.NEAREST),
            ((box[2] - box[0]) * 5 * (i + 1) + 13 * (i + 1), 0),
        )
    sheet.save("/tmp/pole_proof.png")


if __name__ == "__main__":
    main()

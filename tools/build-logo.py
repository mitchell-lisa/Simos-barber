"""
Build the Simo's badge assets from the owner's logo file.

Outputs
  public/media/logo.webp        the whole badge, transparent outside the disc
  app/icon.png                  favicon

The pole's glass is repainted from measured geometry rather than upscaled — the
source badge is only 37px across there, and the redraw is noticeably crisper at
the sizes the site uses it.
"""

import os

import numpy as np
from PIL import Image

SRC = "/root/.claude/uploads/421787c4-721d-528e-9061-aeaa329c49d2/bd5eb63b-image.png"
OUT = "public/media"

# ── geometry measured off the source file ────────────────────────────────────
CX, CY = 359.29, 337.35    # centre of the disc (least-squares fit to the ring)
R_DISC = 252               # the white sticker ring starts at ~256

# The pole's glass, bounded by the chrome rails at x≈258 and x≈298.
GX0, GX1 = 260, 297
GY0, GY1 = 256, 375

SLOPE = 0.67               # stripes lie along phase = y + SLOPE*x
PERIOD = 83.0              # phase distance from one red band to the next
RED_PHASE = 20.0           # phase of a red band centre
SS = 8                     # supersample factor
SIZE = 520                 # rendered badge, px

RED = np.array([142, 39, 34], float)
BLUE = np.array([36, 71, 116], float)
WHITE = np.array([232, 229, 223], float)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def main():
    a = np.asarray(Image.open(SRC).convert("RGB")).astype(float)
    h, w, _ = a.shape
    gw, gh = GX1 - GX0, GY1 - GY0

    # Shading profile: peak luminance per column, i.e. how the cylinder is lit.
    env = a[GY0:GY1, GX0:GX1].mean(axis=2).max(axis=0)
    env = np.convolve(env, np.ones(3) / 3, mode="same")
    env[0], env[-1] = env[1], env[-2]
    shade = np.clip(env / env.max(), 0.12, 1.0)

    # Repaint the glass once, crisply, for the still badge.
    ys = (np.arange(gh * SS) + 0.5) / SS + GY0
    xs = (np.arange(gw * SS) + 0.5) / SS + GX0
    YY, XX = np.meshgrid(ys, xs, indexing="ij")
    t = np.mod(YY + SLOPE * XX - RED_PHASE, PERIOD) / PERIOD
    u = np.cos(2 * np.pi * t)
    k = smoothstep(0.45, 0.85, np.abs(u))[..., None]
    hue = np.where((u > 0)[..., None], RED, BLUE)
    shade_ss = np.interp(xs, np.arange(GX0, GX1) + 0.5, shade)
    stripe = (WHITE * (1 - k) + hue * k) * shade_ss[None, :, None]
    small = stripe.reshape(gh, SS, gw, SS, 3).mean(axis=(1, 3))

    out = a.copy()
    out[GY0:GY1, GX0:GX1] = small
    # The badge's black is a few levels lighter than the page ink and reads as a
    # grey halo on a black background. Lift the black point onto the page colour.
    out = np.clip((out - 11.0) * (255.0 / 244.0), 0, 255)

    yy, xx = np.mgrid[0:h, 0:w]
    rr = np.sqrt((xx - CX) ** 2 + (yy - CY) ** 2)
    # Hard edge with a single pixel of antialiasing: on a light page the badge
    # reads as a crisp black stamp, so a soft fade would just look blurred.
    disc = 1.0 - smoothstep(float(R_DISC) - 1.0, float(R_DISC), rr)

    x0, y0 = int(CX - R_DISC), int(CY - R_DISC)
    crop = (x0, y0, x0 + 2 * R_DISC + 1, y0 + 2 * R_DISC + 1)
    side = crop[2] - crop[0]

    def emit(alpha, path, quality):
        img = Image.fromarray(
            np.dstack([out, alpha * 255]).astype(np.uint8), "RGBA"
        ).crop(crop).resize((SIZE, SIZE), Image.LANCZOS)
        img.save(path, "WEBP", quality=quality, method=6, exact=True)
        print(f"{path:34} {os.path.getsize(path):>7,} B")
        return img

    full = emit(disc, f"{OUT}/logo.webp", 90)
    full.resize((64, 64), Image.LANCZOS).save("app/icon.png", optimize=True)
    print(f"{'app/icon.png':34} {os.path.getsize('app/icon.png'):>7,} B")


if __name__ == "__main__":
    main()

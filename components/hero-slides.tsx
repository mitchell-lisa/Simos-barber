"use client";

import { useEffect, useState } from "react";

type Cut = { src: string; width: number; height: number };
export type Slide = {
  alt: string;
  /** Cropped for a phone: about three by four. */
  tall: Cut;
  /** Cropped for a wide screen: about two and a half to one. */
  wide: Cut;
};

/**
 * The hero's photographs, one at a time, each dissolving into the next.
 * Each photograph is cut twice, once for a phone and once for a wide
 * screen, so the best of it fits either way. Anyone whose OS asks for
 * reduced motion sees the first, still.
 */
export function HeroSlides({ slides, className = "" }: { slides: Slide[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <>
      {slides.map((s, i) => (
        <picture
          key={s.tall.src}
          style={{ opacity: i === index ? 1 : 0 }}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
        >
          <source media="(min-width: 1024px)" srcSet={s.wide.src} width={s.wide.width} height={s.wide.height} />
          <img
            src={s.tall.src}
            alt=""
            width={s.tall.width}
            height={s.tall.height}
            decoding="async"
            loading={i === 0 ? "eager" : "lazy"}
            className={`h-full w-full object-cover object-center ${className}`}
          />
        </picture>
      ))}
    </>
  );
}

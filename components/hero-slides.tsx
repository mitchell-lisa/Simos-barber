"use client";

import { useEffect, useState } from "react";

export type Slide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** object-position, so each photograph is cropped where it should be. */
  position: string;
};

/**
 * The hero's photographs, one at a time, each dissolving into the next.
 * Anyone whose OS asks for reduced motion sees the first and only the first.
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
        <img
          key={s.src}
          src={s.src}
          alt=""
          width={s.width}
          height={s.height}
          decoding="async"
          loading={i === 0 ? "eager" : "lazy"}
          style={{ objectPosition: s.position, opacity: i === index ? 1 : 0 }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${className}`}
        />
      ))}
    </>
  );
}

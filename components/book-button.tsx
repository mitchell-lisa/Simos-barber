"use client";

import { business as b } from "@/lib/business";

/**
 * One brass action, repeated down the page.
 *
 * It is a real link to his Vagaro page, so it works with JavaScript off, opens
 * in a new tab on cmd/middle-click, and is crawlable. When the widget is
 * embedded the click is intercepted and scrolls to it instead.
 */
export function BookButton({
  className = "",
  children = "Book an appointment",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const embedded = b.booking.embedHtml !== null;

  return (
    <a
      href={b.booking.url}
      target="_blank"
      rel="noreferrer"
      onClick={
        embedded
          ? (e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              const el = document.getElementById("book");
              if (!el) return; // no widget on the page — let the link do its job
              e.preventDefault();
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          : undefined
      }
      className={`label inline-flex items-center justify-center bg-brass px-7 py-4 text-ink transition-colors hover:bg-brass-2 ${className}`}
    >
      {children}
    </a>
  );
}

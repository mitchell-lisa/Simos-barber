"use client";

import { business as b } from "@/lib/business";

/** Fired when any booking action is pressed; BookingDialog listens for it. */
export const BOOK_EVENT = "simos:book";

/**
 * One brass action, repeated down the page.
 *
 * It is a real link to his Vagaro page, so it works with no JavaScript, opens
 * in a new tab from the middle-click / cmd-click people expect of a link, and
 * is crawlable. When the dialog is available the click is intercepted and the
 * booking widget opens over the page instead.
 */
export function BookButton({
  className = "",
  children = "Book an appointment",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const hasDialog = b.booking.embedHtml !== null;

  return (
    <a
      href={b.booking.url}
      target="_blank"
      rel="noreferrer"
      onClick={
        hasDialog
          ? (e) => {
              // Let cmd/ctrl/middle-click through to the real Vagaro page.
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              window.dispatchEvent(new Event(BOOK_EVENT));
            }
          : undefined
      }
      className={`label inline-flex items-center justify-center bg-brass px-7 py-4 text-ink transition-colors hover:bg-brass-2 ${className}`}
    >
      {children}
    </a>
  );
}

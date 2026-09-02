"use client";

import { useEffect, useState } from "react";
import { todayHours } from "@/lib/schedule";

/**
 * Today's hours, for the strip above the header. The page is built once and
 * served as static HTML, so it cannot know what day a visitor arrives; this
 * works it out on their device, in the shop's time zone, after the page
 * loads. Until then it says what is always true.
 */
export function TodayHours({ className = "" }: { className?: string }) {
  const [today, setToday] = useState<ReturnType<typeof todayHours> | null>(null);

  useEffect(() => {
    setToday(todayHours());
    // Roll over at midnight if the tab stays open.
    const id = setInterval(() => setToday(todayHours()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!today) return <p className={className}>Open seven days</p>;

  return (
    <p className={className}>
      <span className="text-bone-2">{today.day}</span> {today.hours}
      <span className="mx-2 text-hair-2">·</span>
      <span className={today.isOpen ? "text-brass-2" : ""}>
        {today.isOpen ? "Open now" : "Closed now"}
      </span>
    </p>
  );
}

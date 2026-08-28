import { business as b } from "@/lib/business";

/**
 * The shop's badge.
 *
 * `turning` swaps in the shell art — the same badge with the pole's glass
 * punched transparent — and puts a CSS stripe layer behind the hole, so the
 * barber pole that forms the "i" in Simo's actually turns.
 *
 * HOLE is the glass box as a percentage of the badge box. It is printed by
 * tools/build-logo.py; if the source artwork or crop changes, re-run that
 * script and paste the new numbers here.
 */
const HOLE = { left: 30.297, top: 33.861, width: 7.327, height: 23.564 };

export function Badge({
  className = "",
  turning = false,
  priority = false,
}: {
  className?: string;
  turning?: boolean;
  priority?: boolean;
}) {
  const alt = `${b.fullName} — ${b.motto}`;

  if (!turning) {
    return (
      <img
        src="/media/logo.webp"
        alt={alt}
        width={520}
        height={520}
        className={className}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <span
        className="pole-glass"
        aria-hidden="true"
        style={{
          left: `${HOLE.left}%`,
          top: `${HOLE.top}%`,
          width: `${HOLE.width}%`,
          height: `${HOLE.height}%`,
        }}
      />
      <img
        src="/media/logo-shell.webp"
        alt={alt}
        width={520}
        height={520}
        className="relative block w-full"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
    </div>
  );
}

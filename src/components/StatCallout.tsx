"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Stat = {
  value: string;
  label: string;
  tone?: "positive" | "neutral";
};

// Layout effect on the client (so we can zero the value before first paint),
// plain effect on the server render pass to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Splits "91.1mm" -> { prefix: "", num: 91.1, decimals: 1, suffix: "mm" }.
 * Returns null when there's no leading number to animate (e.g. "N/A").
 */
function parseValue(value: string) {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)([\s\S]*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  return { prefix, num: parseFloat(digits), decimals, suffix };
}

function CountUp({ value }: { value: string }) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  // Start from the REAL value so the static HTML, no-JS viewers, and any
  // environment where rAF/IntersectionObserver never fires all show the
  // correct number. Never ship a stat that can get stuck reading "0%".
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!parsed || !el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const zero = `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`;
    setDisplay(zero);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        observer.disconnect();

        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutCubic — quick, then settling, so it reads as a value locking in
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(
            `${parsed.prefix}${(parsed.num * eased).toFixed(parsed.decimals)}${parsed.suffix}`,
          );
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    // Safety net: if the animation never ran (rAF throttled, tab backgrounded,
    // observer never fired), snap to the true value rather than leaving a zero.
    const failsafe = window.setTimeout(() => {
      if (!done.current) {
        done.current = true;
        observer.disconnect();
        setDisplay(value);
      }
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export default function StatCallout({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface px-4 py-4 transition-colors hover:bg-surface-raised sm:px-5"
        >
          <dt className="font-mono text-xs text-muted">{stat.label}</dt>
          <dd
            className={`mt-1 font-mono text-2xl font-semibold tabular-nums sm:text-3xl ${
              stat.tone === "positive" ? "text-positive" : "text-foreground"
            }`}
          >
            <CountUp value={stat.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

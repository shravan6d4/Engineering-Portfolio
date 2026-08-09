"use client";

import { useEffect, useRef, useState } from "react";

const rows = [
  {
    label: "Imported CAD model",
    value: 73.1,
    tone: "negative" as const,
    note: "held-out error",
  },
  {
    label: "Ruler-survey rebuild",
    value: 6.0,
    tone: "positive" as const,
    note: "held-out error, zero fitting",
  },
];

const MAX = 73.1;

export default function ErrorComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reveal unconditionally if motion is unwanted or observers are unavailable,
    // so the bars are never stuck at zero width.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    const failsafe = window.setTimeout(() => setShown(true), 4000);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-lg border border-border bg-surface/40 p-5"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Forward-kinematics accuracy &mdash; validated on held-out touch points
      </p>
      <div className="mt-5 space-y-4">
        {rows.map((row, i) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-foreground">{row.label}</span>
              <span
                className={`font-mono text-sm tabular-nums ${
                  row.tone === "positive" ? "text-positive" : "text-negative"
                }`}
              >
                {row.value.toFixed(1)} mm
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-raised">
              <div
                className={`h-full rounded-full ${
                  row.tone === "positive" ? "bg-positive" : "bg-negative"
                }`}
                style={{
                  width: shown ? `${(row.value / MAX) * 100}%` : "0%",
                  transition: `width 900ms cubic-bezier(0.16, 1, 0.3, 1) ${
                    i * 180
                  }ms`,
                }}
              />
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted">{row.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-border pt-4 text-sm text-muted">
        A <span className="font-mono text-foreground">12&times;</span> reduction
        in positioning error &mdash; from ten ruler measurements, with no
        curve-fitting and no reliance on the CAD geometry.
      </p>
    </div>
  );
}

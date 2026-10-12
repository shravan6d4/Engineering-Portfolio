import type { ReactNode } from "react";

export type GlanceItem = { label: string; text: ReactNode };

// The one-minute version of a project page: a few labelled lines under the
// hero so a skimming reader gets the point before any section detail.
export default function Glance({ items }: { items: GlanceItem[] }) {
  return (
    <dl className="mt-8 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface/40">
      {items.map((item) => (
        <div
          key={item.label}
          className="px-4 py-3 sm:grid sm:grid-cols-[6rem_1fr] sm:gap-4 sm:px-5"
        >
          <dt className="font-mono text-xs uppercase tracking-widest text-accent sm:pt-0.5">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-foreground/90 sm:mt-0">
            {item.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}

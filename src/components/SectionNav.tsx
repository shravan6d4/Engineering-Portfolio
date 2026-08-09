"use client";

import { useEffect, useState } from "react";

export type Section = { id: string; label: string };

export default function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that's visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className="space-y-1">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center justify-end gap-2 py-1"
              >
                <span
                  className={`whitespace-nowrap font-mono text-[11px] transition-all duration-200 ${
                    isActive
                      ? "text-accent opacity-100"
                      : "text-muted opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`h-px transition-all duration-200 ${
                    isActive
                      ? "w-6 bg-accent"
                      : "w-3 bg-border group-hover:w-5 group-hover:bg-muted"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type Step = {
  id: string;
  label: string;
  title: string;
  body: string;
  src: string;
  width: number;
  height: number;
};

const steps: Step[] = [
  {
    id: "pistons",
    label: "Pistons",
    title: "Combustion drives the pistons",
    body: "Each piston travels up and down in its bore, with its connecting rod constrained concentric to the crankshaft journal. Six pistons across two banks put rotational force into the crank.",
    src: "/media/v6-engine/gallery/engine3.jpg",
    width: 425,
    height: 218,
  },
  {
    id: "crankshaft",
    label: "Crankshaft",
    title: "The crankshaft turns the belt pulley",
    body: "Rotation collected from all six rods leaves through the crankshaft, which drives the timing pulley at the front of the engine — the single input that synchronizes everything above it.",
    src: "/media/v6-engine/gallery/timing-belt-cutaway.jpg",
    width: 1535,
    height: 715,
  },
  {
    id: "belt",
    label: "Timing belt",
    title: "The belt synchronizes both cam banks",
    body: "The timing belt links the crank pulley to both cam gears, so valve timing on both banks stays locked to crank angle. This is the constraint that makes the assembly behave as one system rather than independent parts.",
    src: "/media/v6-engine/gallery/engine2.jpg",
    width: 938,
    height: 520,
  },
  {
    id: "valvetrain",
    label: "Valve train",
    title: "Cams push rockers, rockers open valves",
    body: "Each camshaft lobe drives a rocker arm through its follower, pushing the valve down against its spring — opening and closing the intake and exhaust manifolds in time with the pistons below.",
    src: "/media/v6-engine/gallery/camshaft-rocker-assembly.jpg",
    width: 1535,
    height: 715,
  },
];

export default function PowerFlow() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4 sm:p-5">
      {/* Step selector — doubles as the flow diagram */}
      <div className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-1">
        {steps.map((s, i) => (
          <div key={s.id} className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`flex min-h-11 cursor-pointer items-center whitespace-nowrap rounded-md border px-3 py-2 font-mono text-xs transition-all duration-200 sm:min-h-0 ${
                i === active
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface text-muted hover:border-muted hover:text-foreground"
              }`}
            >
              <span className="tabular-nums opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {s.label}
            </button>
            {i < steps.length - 1 && (
              <ArrowRight
                size={12}
                weight="bold"
                className={`transition-colors duration-200 ${
                  i < active ? "text-accent" : "text-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Panel */}
      <div className="mt-4 grid gap-4 sm:grid-cols-[1.3fr_1fr]">
        <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-black/40">
          {steps.map((s, i) => (
            <Image
              key={s.id}
              src={s.src}
              alt={s.title}
              width={s.width}
              height={s.height}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              priority={i === 0}
            />
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Step {active + 1} of {steps.length}
          </p>
          <h3 className="mt-2 font-medium text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
        </div>
      </div>
    </div>
  );
}

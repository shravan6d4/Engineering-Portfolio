import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Shravan Kumar — Mechanical Engineering Portfolio",
};

const projects = [
  {
    href: "/robot-arm",
    tag: "Project 01",
    title: "5-DOF Autonomous Robotic Arm",
    blurb:
      "SolidWorks → Simscape Multibody → OpenCV → closed-loop servo control. 100% ground-pick success on real hardware.",
    stats: ["100% ground pick", "SolidWorks → hardware"],
    cover: "/media/robot-arm/cover.jpg",
    coverAlt:
      "The completed 5-DOF arm positioned over a ChArUco calibration board on the test bench",
    coverWidth: 638,
    coverHeight: 403,
  },
  {
    href: "/v6-engine",
    tag: "Project 02",
    title: "Mitsubishi 6G72 V6 — CAD Assembly",
    blurb:
      "Reverse-engineered a full V6 SOHC engine in SolidWorks from part drawings — pistons, crankshaft, camshaft, and a fully mated large-scale assembly.",
    stats: ["Full assembly", "Motion study validated"],
    cover: "/media/v6-engine/gallery/timing-belt-cutaway.jpg",
    coverAlt:
      "Cutaway of the V6 assembly showing the timing belt and cam gear system",
    coverWidth: 1535,
    coverHeight: 715,
  },
  {
    href: "/fusion-paper",
    tag: "Project 03",
    title: "Nuclear Fusion — Research Paper",
    blurb:
      "A quantitative survey of magnetic and inertial confinement fusion, co-authored with Ryan Kang.",
    stats: ["34 sources", "Co-authored"],
    cover: "/media/fusion/paper-page.jpg",
    coverAlt:
      "A page from the fusion paper showing the tokamak magnetic field diagram",
    coverWidth: 1000,
    coverHeight: 1294,
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Mechanical Engineering &mdash; Georgia Tech
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Shravan Kumar
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
          I build systems end-to-end &mdash; from CAD and simulation through
          to working hardware. Aiming for propulsion.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/resume.pdf"
            className="rounded-md bg-accent px-4 py-2 font-mono text-sm text-accent-foreground transition-opacity hover:opacity-90"
          >
            Download resume
          </a>
          <Link
            href="/about"
            className="rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            About / contact
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-1">
        {projects.map((p, i) => (
          <Reveal key={p.href}>
            <Link
              href={p.href}
              className="group grid overflow-hidden rounded-xl border border-border bg-surface/40 transition-colors hover:border-accent sm:grid-cols-[minmax(0,1fr)_260px]"
            >
              <div className="relative order-2 p-6 sm:order-1">
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 right-4 font-mono text-6xl font-bold text-foreground/[0.03] transition-colors group-hover:text-accent/[0.08]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative flex flex-wrap items-center gap-2">
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    {p.tag}
                  </p>
                </div>
                <h2 className="relative mt-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="relative mt-2 text-sm text-muted">{p.blurb}</p>
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {p.stats.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {/* Image is absolutely positioned so a portrait cover can't
                  stretch the card taller than its text content. */}
              <div className="relative order-1 h-44 overflow-hidden border-b border-border bg-black/30 sm:order-2 sm:h-auto sm:border-b-0 sm:border-l">
                <Image
                  src={p.cover}
                  alt={p.coverAlt}
                  fill
                  sizes="260px"
                  priority={i === 0}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

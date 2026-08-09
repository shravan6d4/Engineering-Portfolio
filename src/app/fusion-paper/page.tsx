import type { Metadata } from "next";
import Image from "next/image";
import { FilePdf, ArrowSquareOut, Sun, Atom, Lightning } from "@phosphor-icons/react/dist/ssr";
import StatCallout from "@/components/StatCallout";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Nuclear Fusion Research Paper — Shravan Kumar",
  description:
    "A quantitative survey of magnetic and inertial confinement fusion, co-authored with Ryan Kang.",
};

const sections = [
  {
    n: "01",
    title: "Theory",
    Icon: Sun,
    body: "Derives the energy released by hydrogen-to-helium fusion directly from the mass defect and E=mc², then works through why fusion is hard: the Coulomb barrier, and how the Sun gets around it with pressure and quantum tunneling. On Earth, that means picking the right fuel (deuterium-tritium, via fusion cross-sections) and hitting the temperature and confinement time Lawson's Criterion demands.",
  },
  {
    n: "02",
    title: "Engineering methods",
    Icon: Atom,
    body: "Covers the two dominant approaches in real reactors: magnetic confinement (tokamak geometry, gyrocenter/particle motion, and the three heating methods used in ITER) and laser inertial confinement (the Shiva/Nova systems at Lawrence Livermore). Each method is tied back to which side of Lawson's Criterion it's solving for — long confinement at low pressure, or extreme pressure for nanoseconds.",
  },
  {
    n: "03",
    title: "Modern advancements",
    Icon: Lightning,
    body: "Tearing instabilities and magnetic islands — including how Princeton's AI-based predictive control forecasts a tearing instability up to 300ms before it happens, versus traditional reactive monitoring — plus liquid lithium wall coatings as an alternative to solid tungsten/beryllium liners.",
  },
  {
    n: "04",
    title: "Looking to the future",
    Icon: Lightning,
    body: "An honest accounting of what's still unsolved: reactors are barely past net energy gain, tritium fuel isn't naturally abundant, and funding is currently being cut — read as a real engineering and economics problem, not just a physics one.",
  },
];

export default function FusionPaperPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Plasma-themed ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 8%, rgba(255,138,0,0.16) 0%, transparent 70%), radial-gradient(45% 40% at 12% 18%, rgba(56,189,248,0.13) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Hero with solar imagery */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Project 03 &mdash; Co-authored with Ryan Kang
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Nuclear Fusion &mdash;{" "}
              <span className="bg-gradient-to-r from-[#ffb347] via-[#ff7a18] to-[#38bdf8] bg-clip-text text-transparent">
                A Quantitative Survey
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              A research paper covering fusion theory, the two dominant reactor
              engineering approaches, and the modern advancements &mdash;
              AI-based instability prediction, liquid-metal wall materials
              &mdash; pushing net energy gain closer to reality.
            </p>
          </div>
          <figure className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-[#ff7a18]/20 blur-3xl"
            />
            <Image
              src="/media/fusion/sun.jpg"
              alt="The Sun imaged by NASA's Solar Dynamics Observatory — the reference fusion reactor"
              width={1400}
              height={1336}
              priority
              className="mx-auto w-full max-w-sm rounded-full"
            />
            <figcaption className="mt-3 text-center font-mono text-[11px] text-muted">
              The Sun &mdash; the only fusion reactor with a proven track
              record.
              <br />
              <span className="text-foreground/40">
                NASA/SDO (AIA), public domain
              </span>
            </figcaption>
          </figure>
        </div>

        <Reveal className="mt-10">
          <StatCallout
            stats={[
              { value: "34", label: "Sources cited" },
              { value: "2", label: "Confinement methods covered" },
              { value: "150M K", label: "Target D-T fusion temperature" },
              { value: "300ms", label: "AI tearing-mode prediction lead" },
            ]}
          />
        </Reveal>

        <div className="mt-4 flex flex-wrap gap-2">
          {["Plasma physics", "Nuclear fusion", "Research writing", "Quantitative modeling"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
              >
                {tag}
              </span>
            ),
          )}
        </div>

        <Reveal>
          <section className="mt-16 max-w-2xl">
            <p className="text-sm leading-relaxed text-muted">
              Written with Ryan Kang, split evenly across theory and
              engineering methods. It&apos;s an unrelated topic to my main
              projects &mdash; included here as a writing and research sample
              rather than a propulsion-adjacent piece. The paper works through
              real derivations rather than just describing concepts, and is
              upfront about its own limits: one derivation in the theory
              section was judged too advanced to complete from first
              principles, and the paper says so directly instead of
              hand-waving past it.
            </p>
          </section>
        </Reveal>

        {/* The two confinement approaches, illustrated */}
        <Reveal>
          <section className="mt-16">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent">&mdash;</span>
              <h2 className="text-xl font-semibold tracking-tight">
                Two ways to satisfy Lawson&apos;s Criterion
              </h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              The criterion requires the product of ion density and
              confinement time to clear a threshold &mdash; which admits two
              opposite engineering strategies.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ApproachCard
                label="Magnetic confinement"
                headline="Hold it for a long time, at low pressure"
                body="A tokamak's toroidal and poloidal fields combine into a helical field that keeps plasma off the walls. Reactions can be sustained for minutes."
                accent="#38bdf8"
                img="/media/fusion/tokamak-fields.png"
                imgAlt="Diagram of toroidal and poloidal magnetic fields in a tokamak"
                w={246}
                h={450}
                credit="U.S. Dept. of Energy, public domain"
              />
              <ApproachCard
                label="Inertial confinement"
                headline="Hold it for nanoseconds, at extreme pressure"
                body="High-powered lasers implode a fuel pellet so fast the nuclei fuse before they can move apart — the shell's own inertia does the confining."
                accent="#ff7a18"
                img="/media/fusion/icf-diagram.svg"
                imgAlt="Diagram of the stages of inertial confinement fusion"
                w={640}
                h={200}
                credit="B. D. Esham / U.S. Government, public domain"
              />
            </div>
          </section>
        </Reveal>

        {/* Sections */}
        <Reveal>
          <section className="mt-16">
            <div className="space-y-4">
              {sections.map((s) => (
                <div
                  key={s.n}
                  className="rounded-lg border border-border bg-surface/30 p-5 transition-colors hover:border-accent/40 sm:grid sm:grid-cols-[3rem_1fr] sm:gap-3"
                >
                  <p className="font-mono text-sm text-accent">{s.n}</p>
                  <div>
                    <h3 className="flex items-center gap-2 font-medium text-foreground">
                      <s.Icon size={16} weight="regular" className="text-muted" />
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Paper preview + download */}
        <Reveal>
          <section className="mt-16 grid gap-6 sm:grid-cols-[260px_1fr] sm:items-center">
            <a
              href="/fusion-paper.pdf"
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-lg border border-border bg-surface/40 transition-colors hover:border-accent"
            >
              <Image
                src="/media/fusion/paper-page.jpg"
                alt="Preview of a page from the fusion research paper"
                width={1000}
                height={1294}
                className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </a>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Read the paper
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted">
                22 pages, 34 cited sources, with worked derivations for the
                mass defect, Coulomb barrier, and Lawson&apos;s Criterion.
              </p>
              <a
                href="/fusion-paper.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <FilePdf size={16} weight="regular" />
                Open full PDF
                <ArrowSquareOut size={14} weight="regular" />
              </a>
            </div>
          </section>
        </Reveal>

        <p className="mt-14 border-t border-border pt-6 font-mono text-[11px] leading-relaxed text-muted">
          Image credits: solar image NASA/SDO (AIA); tokamak field diagram
          U.S. Department of Energy; inertial confinement diagram Benjamin D.
          Esham after a U.S. Government original. All in the public domain.
        </p>
      </div>
    </div>
  );
}

function ApproachCard({
  label,
  headline,
  body,
  accent,
  img,
  imgAlt,
  w,
  h,
  credit,
}: {
  label: string;
  headline: string;
  body: string;
  accent: string;
  img: string;
  imgAlt: string;
  w: number;
  h: number;
  credit: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface/40">
      <div
        className="h-0.5 w-full"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-5">
        <p
          className="font-mono text-[11px] uppercase tracking-widest"
          style={{ color: accent }}
        >
          {label}
        </p>
        <h3 className="mt-2 font-medium text-foreground">{headline}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{body}</p>
        <div className="mt-4 flex items-center justify-center rounded-lg border border-border bg-white/[0.03] p-3">
          <Image
            src={img}
            alt={imgAlt}
            width={w}
            height={h}
            className="max-h-44 w-auto object-contain"
          />
        </div>
        <p className="mt-2 text-center font-mono text-[10px] text-foreground/40">
          {credit}
        </p>
      </div>
    </div>
  );
}

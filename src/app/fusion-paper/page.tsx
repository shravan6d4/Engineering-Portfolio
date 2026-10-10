import type { Metadata } from "next";
import Image from "next/image";
import { FilePdf, ArrowSquareOut, Sun, Atom, Lightning } from "@phosphor-icons/react/dist/ssr";
import StatCallout from "@/components/StatCallout";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Nuclear Fusion Research Paper | Shravan Kumar",
  description:
    "A quantitative look at magnetic and inertial confinement fusion, written with Ryan Kang.",
};

const sections = [
  {
    n: "01",
    title: "Theory",
    Icon: Sun,
    body: "We derive the energy released by hydrogen to helium fusion straight from the mass defect and E=mc², then work through why fusion is hard in the first place. That comes down to the Coulomb barrier, and how the Sun gets around it with pressure and quantum tunneling. On Earth it means picking the right fuel, which we get to through fusion cross-sections, and then hitting the temperature and confinement time that Lawson's Criterion asks for.",
  },
  {
    n: "02",
    title: "Engineering methods",
    Icon: Atom,
    body: "This covers the two approaches real reactors use. Magnetic confinement gets tokamak geometry, gyrocenter and particle motion, and the three heating methods ITER runs. Laser inertial confinement gets the Shiva and Nova systems at Lawrence Livermore. We tie each one back to the side of Lawson's Criterion it is solving for, either long confinement at low pressure or extreme pressure for nanoseconds.",
  },
  {
    n: "03",
    title: "Modern advancements",
    Icon: Lightning,
    body: "Tearing instabilities and magnetic islands, including how Princeton's AI based predictive control forecasts a tearing instability up to 300ms before it happens instead of reacting after the fact. We also get into liquid lithium wall coatings as an alternative to solid tungsten and beryllium liners.",
  },
  {
    n: "04",
    title: "Looking to the future",
    Icon: Lightning,
    body: "An honest look at what is still unsolved. Reactors are barely past net energy gain, tritium fuel is not naturally abundant, and funding is getting cut right now. We read all of that as an engineering and economics problem and not only a physics one.",
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
              Project 04 &middot; Written with Ryan Kang
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Nuclear Fusion,{" "}
              <span className="bg-gradient-to-r from-[#ffb347] via-[#ff7a18] to-[#38bdf8] bg-clip-text text-transparent">
                A Quantitative Survey
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              A research paper on fusion theory, the two reactor engineering
              approaches that actually get used, and the newer work pushing net
              energy gain closer to reality, like AI based instability
              prediction and liquid metal wall materials.
            </p>
          </div>
          <figure className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-[#ff7a18]/20 blur-3xl"
            />
            <Image
              src="/media/fusion/sun.jpg"
              alt="The Sun imaged by NASA's Solar Dynamics Observatory, the reference fusion reactor"
              width={1400}
              height={1336}
              priority
              className="mx-auto w-full max-w-sm rounded-full"
            />
            <figcaption className="mt-3 text-center font-mono text-[11px] text-muted">
              The Sun, the only fusion reactor with a proven track record.
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
              I wrote this with Ryan Kang and we split it evenly across the
              theory and the engineering methods. It is not related to my other
              projects, and it is here as a writing and research sample instead
              of a propulsion piece. The paper works through the real
              derivations instead of only describing the concepts, and it is
              upfront about where it stops. One derivation in the theory section
              was past what we could do from first principles, and we say that
              directly in the paper instead of hand waving past it.
            </p>
          </section>
        </Reveal>

        {/* The two confinement approaches, illustrated */}
        <Reveal>
          <section className="mt-16">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent">&middot;</span>
              <h2 className="text-xl font-semibold tracking-tight">
                Two ways to satisfy Lawson&apos;s Criterion
              </h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              The criterion needs the product of ion density and confinement
              time to clear a threshold, and there are two opposite ways to get
              there.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ApproachCard
                label="Magnetic confinement"
                headline="Hold it for a long time, at low pressure"
                body="A tokamak's toroidal and poloidal fields combine into a helical field that keeps the plasma off the walls, and reactions can run for minutes."
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
                body="High powered lasers implode a fuel pellet so fast that the nuclei fuse before they can move apart, and the shell's own inertia is what does the confining."
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
                22 pages and 34 cited sources, with worked derivations for the
                mass defect, the Coulomb barrier and Lawson&apos;s Criterion.
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
          Image credits: solar image NASA/SDO (AIA), tokamak field diagram
          U.S. Department of Energy, inertial confinement diagram Benjamin D.
          Esham after a U.S. Government original. All of them are public
          domain.
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

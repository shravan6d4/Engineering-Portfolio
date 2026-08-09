import type { Metadata } from "next";
import Image from "next/image";
import { Wrench, ChartLineUp, Path, Cube, Lightbulb } from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react/dist/lib/types";
import StatCallout from "@/components/StatCallout";
import Gallery from "@/components/Gallery";
import VideoSlot from "@/components/VideoSlot";
import Reveal from "@/components/Reveal";
import PowerFlow from "@/components/PowerFlow";
import SectionNav from "@/components/SectionNav";

export const metadata: Metadata = {
  title: "Mitsubishi 6G72 V6 — Shravan Kumar",
  description:
    "Reverse-engineered Mitsubishi 6G72 V6 SOHC engine, fully assembled and motion-validated in SolidWorks.",
};

const gallery = [
  {
    src: "/media/v6-engine/gallery/piston-crank-assembly.jpg",
    caption: "Piston / crankshaft assembly",
    width: 1535,
    height: 715,
  },
  {
    src: "/media/v6-engine/gallery/camshaft-rocker-assembly.jpg",
    caption: "Camshaft, rocker arms, valve train",
    width: 1535,
    height: 715,
  },
  {
    src: "/media/v6-engine/gallery/timing-belt-cutaway.jpg",
    caption: "Timing belt / cam gear system",
    width: 1535,
    height: 715,
  },
  {
    src: "/media/v6-engine/gallery/intake-manifold-drawing.jpg",
    caption: "Intake manifold — dimensioned 2D drawing",
    width: 857,
    height: 554,
  },
  {
    src: "/media/v6-engine/gallery/bom-exploded-view.jpg",
    caption: "Full exploded view + bill of materials",
    width: 1456,
    height: 646,
  },
  {
    src: "/media/v6-engine/gallery/reference-real-6g72.jpg",
    caption: "The real Mitsubishi 6G72",
    width: 1512,
    height: 1354,
    reference: true,
  },
];

const specs = [
  { label: "Cylinder bore", value: "91.1 mm" },
  { label: "Cylinder stroke", value: "76 mm" },
  { label: "Valve spring", value: "30–34 mm" },
  { label: "Rod journal", value: "50 mm" },
  { label: "Main journal", value: "60 mm" },
  { label: "Configuration", value: "V6, SOHC" },
];

const bom = [
  ["Engine block", "1"], ["Crankshaft", "1"], ["Crank bushing", "2"],
  ["Camshaft", "1"], ["Camshaft (opposite side)", "1"],
  ["Valve", "12"], ["Valve washer", "12"], ["Rocker arm", "12"], ["Rocker follower", "12"],
  ["Cylinder head", "2"], ["Cylinder head cover", "2"],
  ["Piston (part 1–4 sets)", "24"], ["Lower block", "1"], ["Oil pan", "1"],
  ["Intake manifold", "1"], ["Exhaust manifold + mirrored", "2"], ["Exhaust manifold gasket", "2"],
  ["Head gasket", "2"], ["Cam gear", "2"], ["Flywheel", "1"],
  ["Timing belt", "1"], ["Pulley", "2"], ["Air filter", "1"],
];

const modelViews = [
  { src: "/media/v6-engine/gallery/engine6.jpg", label: "Isometric", width: 305, height: 238 },
  { src: "/media/v6-engine/gallery/engine5.jpg", label: "Front elevation", width: 315, height: 238 },
  { src: "/media/v6-engine/gallery/engine4.jpg", label: "Rear isometric", width: 300, height: 232 },
];

const pageSections = [
  { id: "why", label: "Why this project" },
  { id: "power-flow", label: "Power flow" },
  { id: "views", label: "Model views" },
  { id: "assembly", label: "The assembly" },
  { id: "motion", label: "Motion study" },
  { id: "dimensions", label: "Key dimensions" },
  { id: "bom", label: "Bill of materials" },
  { id: "future", label: "Future work" },
];

export default function V6EnginePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionNav sections={pageSections} />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          />
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Project 02 &mdash; January&ndash;May 2026
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Mitsubishi 6G72 V6 &mdash; CAD Assembly
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            A fully mated, motion-validated V6 SOHC engine reverse-engineered
            in SolidWorks from part drawings and reference dimensions &mdash;
            crankshaft, camshaft, valve train, and a 20+ part accessory drive,
            modeled and assembled from scratch.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface/40">
          <Image
            src="/media/v6-engine/gallery/hero-cutaway.jpg"
            alt="Cutaway view of the V6 assembly showing pistons, crankshaft, timing belt and both camshafts"
            width={1527}
            height={710}
            priority
            className="w-full object-contain"
          />
          <p className="border-t border-border px-3 py-2 font-mono text-[11px] text-muted">
            Cutaway &mdash; pistons, crank, timing belt, both cam banks
          </p>
        </div>
      </div>

      <Reveal className="mt-8">
        <StatCallout
          stats={[
            { value: "40+", label: "Unique part types" },
            { value: "6", label: "Cylinders, V-configuration" },
            { value: "91.1mm", label: "Bore" },
            { value: "76mm", label: "Stroke" },
          ]}
        />
      </Reveal>

      <div className="mt-4 flex flex-wrap gap-2">
        {["SolidWorks", "Motion Study", "GD&T / 2D Drawings", "Reverse Engineering"].map(
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

      {/* Story */}
      <Reveal>
        <section id="why" className="mt-16 max-w-2xl">
          <SectionLabel n="01" title="Why this project" />
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              I wanted deliberate practice at two things a robot-arm-scale
              project doesn&apos;t exercise: reading real part drawings and
              reference dimensions instead of designing from a blank sketch,
              and managing a large assembly where a single mistake in one
              subsystem (a bore diameter, a journal offset) breaks how a
              dozen other parts mate.
            </p>
            <p>
              The 6G72 was the target: a real Mitsubishi V6 SOHC engine,
              reverse-engineered feature by feature &mdash; cylinder block,
              crankshaft and connecting rods, camshafts and the full valve
              train (rocker arms, followers, springs), timing belt and cam
              gears, intake and exhaust manifolds. Every dimension was pulled
              from reference measurements and constrained with real
              geometric mates, not eyeballed.
            </p>
            <p>
              Mechanical motion was validated with a SolidWorks Motion Study
              &mdash; the crankshaft actually drives the pistons and valve
              train through the modeled constraints, not just a static
              exploded view. Tolerancing wasn&apos;t applied given the
              project timeline; the emphasis here is assembly complexity and
              correct kinematic relationships between parts.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Power flow — interactive walkthrough */}
      <Reveal>
        <section id="power-flow" className="mt-16">
          <SectionLabel n="02" title="How the power flows" Icon={Path} />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The assembly isn&apos;t a static shell &mdash; every rotating part
            is constrained to the one before it. Step through the chain to see
            what drives what.
          </p>
          <div className="mt-6">
            <PowerFlow />
          </div>
        </section>
      </Reveal>

      {/* Model views */}
      <Reveal>
        <section id="views" className="mt-16">
          <SectionLabel n="03" title="Model views" Icon={Cube} />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The completed assembly from three angles &mdash; intake and
            exhaust manifolds, timing belt, and both cylinder banks in place.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {modelViews.map((v) => (
              <div
                key={v.src}
                className="overflow-hidden rounded-lg border border-border bg-surface/40 transition-colors hover:border-accent/50"
              >
                <Image
                  src={v.src}
                  alt={`${v.label} view of the V6 assembly`}
                  width={v.width}
                  height={v.height}
                  className="w-full bg-white/[0.02] object-contain"
                />
                <p className="border-t border-border px-3 py-2 font-mono text-[11px] text-muted">
                  {v.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Gallery */}
      <Reveal>
        <section id="assembly" className="mt-16">
          <SectionLabel n="04" title="The assembly" Icon={Wrench} />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            SolidWorks screenshots of the actual model, plus a dimensioned 2D
            drawing and the full exploded-view BOM. The reference photo of
            the real 6G72 is included for comparison, not as my own work.
          </p>
          <div className="mt-6">
            <Gallery images={gallery} />
          </div>
        </section>
      </Reveal>

      {/* Motion study */}
      <Reveal>
        <section id="motion" className="mt-16">
          <SectionLabel n="05" title="Motion study" Icon={ChartLineUp} />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Crankshaft rotation drives the pistons and, through the timing
            belt and cam gears, the full valve train &mdash; validated as an
            actual kinematic simulation, not a rendered animation.
          </p>
          <div className="mt-4 max-w-2xl">
            <VideoSlot
              src="/media/v6-engine/motion-study-0.75x.mp4"
              poster="/media/posters/motion-study.jpg"
              label="SolidWorks Motion Study — slowed to 0.75× for clarity"
            />
          </div>
        </section>
      </Reveal>

      {/* Specs */}
      <Reveal>
        <section id="dimensions" className="mt-16">
          <SectionLabel n="06" title="Key dimensions" />
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <tbody>
                {specs.map((s, i) => (
                  <tr
                    key={s.label}
                    className={i % 2 === 0 ? "bg-surface/40" : "bg-surface/10"}
                  >
                    <td className="px-4 py-2.5 text-muted">{s.label}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-foreground">
                      {s.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* BOM */}
      <Reveal>
        <section id="bom" className="mt-16">
          <SectionLabel n="07" title="Bill of materials" />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            A partial view of the part list &mdash; enough to show the scale
            of what has to mate correctly for the assembly to move as one
            system.
          </p>
          <div className="mt-4 max-h-96 overflow-y-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-surface">
                <tr className="border-b border-border">
                  <th className="px-4 py-2 text-left font-mono text-xs text-muted">
                    Part
                  </th>
                  <th className="px-4 py-2 text-right font-mono text-xs text-muted">
                    Qty
                  </th>
                </tr>
              </thead>
              <tbody>
                {bom.map(([part, qty], i) => (
                  <tr
                    key={part}
                    className={i % 2 === 0 ? "bg-surface/40" : "bg-surface/10"}
                  >
                    <td className="px-4 py-2 text-muted">{part}</td>
                    <td className="px-4 py-2 text-right font-mono text-foreground">
                      {qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* Future work */}
      <Reveal>
        <section id="future" className="mt-16">
          <SectionLabel n="08" title="What I'd build next" Icon={Lightbulb} />
          <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              What this model proves is synchronized mechanical motion &mdash;
              multiple axes of rotation driven from a single input, with
              pulleys and gears enforcing the timing relationships between
              them.
            </p>
            <p>
              The obvious next step is the part I deliberately left out: the
              combustion system. Modeling the fuel path, injectors, and spark
              timing would turn this from a kinematic assembly into something
              that could actually be simulated as a running engine &mdash;
              which is a meaningfully harder problem than geometry, and the one
              I&apos;d want to take on next.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function SectionLabel({
  n,
  title,
  Icon,
}: {
  n: string;
  title: string;
  Icon?: PhosphorIcon;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-accent">{n}</span>
      {Icon && <Icon size={16} weight="regular" className="text-muted" />}
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

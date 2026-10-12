import type { Metadata } from "next";
import Image from "next/image";
import {
  Cube,
  GridFour,
  ChartLineUp,
  Calculator,
  Gauge,
  Wind,
  Lightbulb,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react/dist/lib/types";
import StatCallout from "@/components/StatCallout";
import Glance from "@/components/Glance";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";

export const metadata: Metadata = {
  title: "Vespula LOx Manifold CFD | Shravan Kumar",
  description:
    "A steady RANS study in STAR-CCM+ of how evenly one LOx manifold feeds 17 swirl injector elements, with hand calcs, a flow-field explanation and a design recommendation.",
};

const media = "/media/lox-manifold";

const glance = [
  {
    label: "Question",
    text: "If one element draws more LOx than the others, it runs off the design mixture ratio and burns at a different flame temperature than its neighbors.",
  },
  {
    label: "Result",
    text: "All 17 elements flow within 2% of the average of 0.2082 kg/s. The largest deviations are +1.88% at inj-1 and −1.36% at inj-12, and the standard deviation across all 17 is 0.92%.",
  },
  {
    label: "Why",
    text: "The distribution is tight because each element has a 132 psi pressure drop.",
  },
  {
    label: "Next",
    text: "To reduce the inner-ring bias, I would add a perforated splash plate under the stem to break up the inlet jet.",
  },
];

const assumptions = [
  { assumption: "Steady flow", value: "Steady solver" },
  { assumption: "Incompressible liquid", value: "ρ = 1141 kg/m³, μ = 1.8e-4 Pa·s" },
  { assumption: "Turbulence", value: "RANS, SST k-ω" },
  { assumption: "Wall treatment", value: "All y+" },
  { assumption: "Inlet", value: "Mass flow, 3.54 kg/s" },
  { assumption: "Outlets (17)", value: "Static pressure, 240 psig each" },
  { assumption: "Walls", value: "No-slip, smooth" },
];

const checks = [
  { label: "Continuity error", value: "0.013%" },
  { label: "Manifold ΔP", value: "132.2 psi" },
  { label: "Outlet pressure", value: "239.8 psi" },
  { label: "Wall y+", value: "0.4–205" },
];

const handCalcs = [
  {
    quantity: "Avg element flow",
    hand: "3.54 ÷ 17 = 0.2082 kg/s",
    cfd: "0.2082 kg/s (Σ = 3.5396)",
  },
  {
    quantity: "Stem velocity",
    hand: "ṁ ÷ (ρ·A_stem) ≈ 16.6 m/s *",
    cfd: "≈ 15 m/s in the velocity scene",
  },
  {
    quantity: "Stem Reynolds no.",
    hand: "ρVD ÷ μ ≈ 1.6 × 10⁶, turbulent",
    cfd: "Supports the RANS model",
  },
  {
    quantity: "Plenum dynamic head",
    hand: "½ρv² at 3 m/s ≈ 0.7 psi",
    cfd: "Tiny next to the 132 psi ΔP",
  },
  {
    quantity: "Element CdA",
    hand: "ṁ_el ÷ √(2ρΔP) ≈ 4.6 mm²",
    cfd: "Uses the CFD ΔP of 132.2 psi",
  },
  {
    quantity: "Flow sensitivity",
    hand: "δṁ/ṁ ≈ ½ · δP/ΔP (orifice)",
    cfd: "+1.88% at inj-1 ⇒ ≈ 5 psi extra",
  },
];

const openItems = [
  "The modified geometry has not been run yet.",
  "LOx density and viscosity were held constant, temperature was never an input, and the walls were modeled as smooth.",
  "Each outlet also has 41 to 48 faces of backflow, caused by the low-pressure swirl core sitting on the outlet plane.",
  "Some of the ±2% spread may also come from mesh error.",
];

const pageSections = [
  { id: "geometry", label: "Geometry" },
  { id: "setup", label: "Setup" },
  { id: "mesh", label: "Mesh" },
  { id: "convergence", label: "Convergence" },
  { id: "hand-calcs", label: "Hand calcs" },
  { id: "results", label: "Results" },
  { id: "flow-field", label: "Flow field" },
  { id: "limits", label: "Open items" },
];

const lead = "mt-2 max-w-2xl text-sm leading-relaxed text-muted";

export default function LoxManifoldPage() {
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
            Project 01 &middot; October 2026 &middot; YJSP Propulsion
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Vespula LOx Manifold CFD
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            A steady RANS study in STAR-CCM+ of how evenly one LOx manifold
            feeds its 17 swirl elements.
          </p>
        </div>
        <Figure
          src={`${media}/velocity-plane.png`}
          alt="Velocity magnitude on a plane through the plenum, with the inlet stem at the centre and 17 swirl elements around it"
          width={1905}
          height={850}
          caption="Velocity magnitude through the plenum"
          priority
        />
      </div>

      <Reveal className="mt-8">
        <StatCallout
          stats={[
            { value: "17", label: "Swirl elements fed" },
            { value: "0.92%", label: "σ of element flow" },
            { value: "132psi", label: "Manifold pressure drop" },
            { value: "1.72M", label: "Polyhedral cells" },
          ]}
        />
      </Reveal>

      <div className="mt-4 flex flex-wrap gap-2">
        {["STAR-CCM+", "Steady RANS", "SST k-ω", "Polyhedral meshing", "Hand calcs"].map(
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

      <Glance items={glance} />

      {/* Geometry */}
      <Reveal>
        <section id="geometry" className="mt-16">
          <SectionLabel n="01" title="Stem, plenum and two rings of elements" Icon={Cube} />
          <p className={lead}>
            Liquid oxygen enters through a single stem at the top of the
            manifold. A cone on the plenum floor sits directly under the stem
            and turns the downward jet outward across the floor.
          </p>
          <div className="mt-6 grid gap-3 lg:grid-cols-2 lg:items-start">
            <Figure
              src={`${media}/element-layout.png`}
              alt="Numbered layout of the 17 elements, six on the inner ring and eleven on the outer ring, coloured by angle"
              width={1200}
              height={1120}
              caption="Inj-1 through 6 make up the inner ring, inj-7 through 17 the outer ring"
            />
            <Figure
              src={`${media}/injector-face-mesh.png`}
              alt="Meshed injector face seen from the chamber side, showing the 17 swirl element outlets"
              width={1314}
              height={898}
              caption="The injector face from the chamber side"
            />
          </div>
        </section>
      </Reveal>

      {/* Setup */}
      <Reveal>
        <section id="setup" className="mt-16">
          <SectionLabel n="02" title="Assumptions and values" />
          <p className={lead}>
            With the total flow fixed at the inlet and the pressure fixed at
            the outlets, the solver determines how that flow divides among the
            elements.
          </p>
          <div className="mt-6 max-w-2xl overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <tbody>
                {assumptions.map((a, i) => (
                  <tr
                    key={a.assumption}
                    className={i % 2 === 0 ? "bg-surface/40" : "bg-surface/10"}
                  >
                    <td className="px-4 py-2.5 text-muted">{a.assumption}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-xs text-foreground">
                      {a.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* Mesh */}
      <Reveal>
        <section id="mesh" className="mt-16">
          <SectionLabel n="03" title="1.72 million polyhedral cells" Icon={GridFour} />
          <p className={lead}>
            The elements and their tangential slots have much finer cells than
            the plenum.
          </p>
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            <Figure
              src={`${media}/mesh-section.png`}
              alt="Section through the mesh showing the stem, the centre cone, the plenum and two elements"
              width={1678}
              height={687}
              caption="Section through the stem, cone and plenum"
            />
            <Figure
              src={`${media}/mesh-prism-layers.png`}
              alt="Close-up of the mesh around one element showing prism layers along the walls"
              width={1951}
              height={1006}
              caption="Each wall has 4 prism layers with a total thickness of 0.37 mm"
            />
          </div>
        </section>
      </Reveal>

      {/* Convergence */}
      <Reveal>
        <section id="convergence" className="mt-16">
          <SectionLabel n="04" title="Convergence and sanity checks" Icon={ChartLineUp} />
          <p className={lead}>
            The residuals dropped 3 to 6 orders of magnitude and leveled off by
            about 300 iterations. To confirm the answer is also physical, I
            checked four quantities.
          </p>
          <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {checks.map((c) => (
              <div key={c.label} className="bg-surface px-4 py-4">
                <dt className="font-mono text-xs text-muted">{c.label}</dt>
                <dd className="mt-1 font-mono text-xl font-semibold text-foreground">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <Figure
              src={`${media}/residuals.png`}
              alt="Residual plot for continuity, momentum, turbulent kinetic energy and specific dissipation rate over 468 iterations"
              width={1913}
              height={873}
              caption="Residuals over 468 iterations"
            />
            <Figure
              src={`${media}/wall-yplus.png`}
              alt="Wall y+ contour on the plenum floor, with a yellow ring around the centre where the inlet jet lands"
              width={1950}
              height={881}
              caption="Wall y+ on the plenum floor"
            />
            <Figure
              src={`${media}/mass-flow-monitors.png`}
              alt="Mass flow monitors showing inlet at minus 3.54, outlets at plus 3.54 and the net settling to zero"
              width={1893}
              height={825}
              caption="Mass flow. Inlet −3.54, outlets +3.54, net → 0 kg/s"
            />
            <Figure
              src={`${media}/pressure-monitors.png`}
              alt="Pressure monitors in pascal showing the inlet settling near 2.57e6 Pa and the outlets near 1.65e6 Pa"
              width={1913}
              height={836}
              caption="Pressure in Pa. Inlet ≈ 372 psi, outlets ≈ 240 psi"
            />
          </div>
        </section>
      </Reveal>

      {/* Hand calcs */}
      <Reveal>
        <section id="hand-calcs" className="mt-16">
          <SectionLabel n="05" title="Hand calcs agree with the CFD" Icon={Calculator} />
          <p className={lead}>
            Each element acts as an orifice, so its mass flow scales with the
            square root of its pressure drop.
          </p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-surface">
                <tr className="border-b border-border">
                  {["Quantity", "Hand calc", "CFD"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left font-mono text-xs text-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {handCalcs.map((r, i) => (
                  <tr
                    key={r.quantity}
                    className={i % 2 === 0 ? "bg-surface/40" : "bg-surface/10"}
                  >
                    <td className="px-4 py-2.5 text-foreground">{r.quantity}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                      {r.hand}
                    </td>
                    <td className="px-4 py-2.5 text-muted">{r.cfd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 font-mono text-[11px] text-muted">
            * Stem diameter ≈ 15.4 mm, inferred from the tutorial&apos;s 16.6
            m/s inlet velocity and still to be confirmed against CAD.
          </p>
        </section>
      </Reveal>

      {/* Results */}
      <Reveal>
        <section id="results" className="mt-16">
          <SectionLabel n="06" title="Every element within ±2% of the average" Icon={Gauge} />
          <p className={lead}>
            The inner ring averages 0.6% above the mean and the outer ring 0.3%
            below it. Plotting flow against angle shows no trend around the
            manifold.
          </p>
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            <Figure
              src={`${media}/flow-by-element.png`}
              alt="LOx mass flow for each of the 17 elements, with the average and a one standard deviation band"
              width={2000}
              height={1040}
              caption="Mass flow per element, with a ±1σ band"
            />
            <Figure
              src={`${media}/maldistribution.png`}
              alt="Bar chart of each element's deviation from the average mass flow, from plus 1.88 percent at inj-1 to minus 1.36 percent at inj-12"
              width={2000}
              height={1040}
              caption="Deviation from average. Blue is above, orange is below"
            />
          </div>
          <div className="mt-3">
            <Figure
              src={`${media}/flow-by-angle.png`}
              alt="LOx mass flow plotted against angular position for the inner and outer rings, with the empty slot marked near 315 degrees"
              width={2000}
              height={1040}
              caption="Mass flow by angular position, inner ring against outer ring"
            />
          </div>
        </section>
      </Reveal>

      {/* Flow field */}
      <Reveal>
        <section id="flow-field" className="mt-16">
          <SectionLabel n="07" title="What the flow field shows" Icon={Wind} />
          <p className={lead}>
            When the LOx leaves the stem, the flow area increases sharply.
            Continuity requires the velocity to drop to a few m/s, and the
            pressure in the plenum stays high and close to uniform. Most of the
            132 psi pressure drop occurs across the swirl slots.
          </p>
          <div className="mt-6 grid gap-3 lg:grid-cols-2 lg:items-start">
            <Figure
              src={`${media}/velocity-vectors.png`}
              alt="Velocity vectors on a section through the stem and two elements, showing the jet turning along the cone and running outward along the plenum floor"
              width={1916}
              height={613}
              caption="Velocity vectors on a slice through the stem and two elements"
            />
            <Figure
              src={`${media}/pressure-plane.png`}
              alt="Pressure contour through the plenum, nearly uniform away from the stem, with low pressure at each element outlet"
              width={1833}
              height={857}
              caption="Pressure in psi through the plenum and elements"
            />
          </div>
        </section>
      </Reveal>

      {/* Open items */}
      <Reveal>
        <section id="limits" className="mt-16 max-w-2xl">
          <SectionLabel
            n="08"
            title="What would tighten these results"
            Icon={Lightbulb}
          />
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
            {openItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="select-none text-accent">
                  &rarr;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  );
}

function Figure({
  src,
  alt,
  width,
  height,
  caption,
  priority,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-lg border border-border bg-surface/40 ${className ?? ""}`}
    >
      {/* Solver screenshots and charts have light backgrounds, so they sit
          on white rather than the dark surface. */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full bg-white object-contain"
      />
      <figcaption className="border-t border-border px-3 py-2 font-mono text-[11px] text-muted">
        {caption}
      </figcaption>
    </figure>
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

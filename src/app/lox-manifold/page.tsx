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
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";

export const metadata: Metadata = {
  title: "Vespula LOx Manifold CFD | Shravan Kumar",
  description:
    "A steady RANS study in STAR-CCM+ of how evenly one LOx manifold feeds 17 swirl injector elements, with hand calcs, a flow-field explanation and a design recommendation.",
};

const media = "/media/lox-manifold";

const assumptions = [
  {
    assumption: "Steady flow",
    value: "Steady solver",
    why: "Distribution is evaluated at constant mainstage flow",
  },
  {
    assumption: "Incompressible liquid",
    value: "ρ = 1141 kg/m³, μ = 1.8e-4 Pa·s",
    why: "LOx is a liquid at near-zero Mach, and no heat is added, so the energy equation is off",
  },
  {
    assumption: "Turbulence",
    value: "RANS, SST k-ω",
    why: "Stem Re ≈ 1.6 × 10⁶, and SST handles the impinging jet and turning flow",
  },
  {
    assumption: "Wall treatment",
    value: "All y+",
    why: "y+ spans 0.4 to 205, so it blends a resolved sublayer with wall functions",
  },
  {
    assumption: "Inlet",
    value: "Mass flow, 3.54 kg/s",
    why: "Engine LOx flow rate",
  },
  {
    assumption: "Outlets (17)",
    value: "Static pressure, 240 psig each",
    why: "Common chamber-side pressure for every element",
  },
  {
    assumption: "Walls",
    value: "No-slip, smooth",
    why: "Roughness is outside the scope of this study",
  },
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

const pageSections = [
  { id: "question", label: "The question" },
  { id: "geometry", label: "Geometry" },
  { id: "setup", label: "Setup" },
  { id: "mesh", label: "Mesh" },
  { id: "convergence", label: "Convergence" },
  { id: "hand-calcs", label: "Hand calcs" },
  { id: "results", label: "Results" },
  { id: "flow-field", label: "Flow field" },
  { id: "why", label: "Why it is even" },
  { id: "recommendation", label: "Recommendation" },
  { id: "limits", label: "Limits and next steps" },
];

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
            feeds its 17 swirl elements. The model converged and checked out
            against hand calcs, every element landed within 2% of the average,
            and the flow field pointed to a way of slowing the inlet jet that
            could tighten it further.
          </p>
        </div>
        <Figure
          src={`${media}/velocity-plane.png`}
          alt="Velocity magnitude on a plane through the plenum, with the inlet stem at the centre and 17 swirl elements around it"
          width={1905}
          height={850}
          caption="Velocity magnitude through the plenum. The inlet jet is the hot ring at the centre"
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

      {/* The question */}
      <Reveal>
        <section id="question" className="mt-16">
          <SectionLabel n="01" title="Does the manifold feed all 17 elements evenly?" />
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
              <p>
                The manifold splits the incoming LOx across 17 swirl elements.
                Each element atomizes its share into a spray that meets the
                RP-1 downstream of the injector face, and the two propellants
                mix there before entering the TCA. If one element draws more
                LOx than the others, it runs off the design mixture ratio and
                burns at a different flame temperature than its neighbors. This
                study looks at how evenly the manifold divides the flow.
              </p>
            </div>
            <Figure
              src={`${media}/injector-face-mesh.png`}
              alt="Meshed injector face seen from the chamber side, showing the 17 swirl element outlets"
              width={1314}
              height={898}
              caption="The injector face from the chamber side, with the 17 element outlets in orange"
            />
          </div>
        </section>
      </Reveal>

      {/* Geometry */}
      <Reveal>
        <section id="geometry" className="mt-16">
          <SectionLabel n="02" title="Stem, plenum and two rings of elements" Icon={Cube} />
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
              <p>
                Liquid oxygen enters through a single stem at the top of the
                manifold. A cone on the plenum floor sits directly under the
                stem and turns the downward jet outward across the floor. The
                plenum is the flat, open region between the cone and the
                elements. The LOx slows down there and is divided among
                injectors 1 through 17.
              </p>
              <p>
                The elements are arranged in two rings. Inj-1 through 6 make up
                the inner ring, spaced 60° apart at a radius of about 34 mm.
                Inj-7 through 17 make up the outer ring, spaced 30° apart at
                about 55 mm, with one empty slot near 315°.
              </p>
            </div>
            <Figure
              src={`${media}/element-layout.png`}
              alt="Numbered layout of the 17 elements, six on the inner ring and eleven on the outer ring, coloured by angle"
              width={1200}
              height={1120}
              caption="Element numbering, coloured by angle θ"
              className="mx-auto max-w-md"
            />
          </div>
        </section>
      </Reveal>

      {/* Setup */}
      <Reveal>
        <section id="setup" className="mt-16">
          <SectionLabel n="03" title="Assumptions, values and why they hold" />
          <div className="mt-4 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              I used a steady solver because the study looks at the
              distribution during constant mainstage flow, and the startup
              transient was outside its scope. The LOx is modeled as an
              incompressible liquid with constant density and viscosity, since
              a liquid moving at near-zero Mach barely compresses. Because no
              heat is added, the temperature stays fixed and the energy
              equation is turned off.
            </p>
            <p>
              Turbulence is modeled with RANS SST k-ω. RANS solves for the
              time-averaged flow, which suits a stem Reynolds number of about
              1.6 million. For the walls I used the All y+ treatment. y+ ranges
              from 0.4 to 205 across the part, and All y+ resolves the
              near-wall flow in the finely meshed regions and applies wall
              functions in the coarser ones.
            </p>
            <p>
              The inlet is set to a mass flow of 3.54 kg/s and all 17 outlets
              to a static pressure of 240 psig. With the total flow fixed at
              the inlet and the pressure fixed at the outlets, the solver
              determines how that flow divides among the elements.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-surface">
                <tr className="border-b border-border">
                  {["Assumption", "Value", "Why it represents the physics"].map((h) => (
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
                {assumptions.map((a, i) => (
                  <tr
                    key={a.assumption}
                    className={i % 2 === 0 ? "bg-surface/40" : "bg-surface/10"}
                  >
                    <td className="px-4 py-2.5 text-foreground">{a.assumption}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                      {a.value}
                    </td>
                    <td className="px-4 py-2.5 text-muted">{a.why}</td>
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
          <SectionLabel n="04" title="1.72 million polyhedral cells" Icon={GridFour} />
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            The mesh was generated automatically with a surface remesher, a
            polyhedral core, and prism layers on every wall. A base size of 1
            mm gives about 7 cells across each outlet. The final mesh has 1.72
            million cells, and none fell below the quality thresholds after
            optimization.
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
              caption="Close-up of one element, with prism layers on the walls"
            />
          </div>
          <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              The elements and their tangential slots have much finer cells
              than the plenum. The outlet flow rates are measured in the
              elements, and the velocity changes most sharply through the
              slots, where large cells would average out the gradient. Coarser
              cells are enough in the plenum because the flow there changes
              slowly.
            </p>
            <p>
              Each wall has 4 prism layers with a total thickness of 0.37 mm.
              The first layer is 24.6 µm thick, chosen to put the near-wall y+
              between 35 and 100.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Convergence */}
      <Reveal>
        <section id="convergence" className="mt-16">
          <SectionLabel n="05" title="Convergence and sanity checks" Icon={ChartLineUp} />
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            The residuals dropped 3 to 6 orders of magnitude and leveled off by
            about 300 iterations. I stopped the run manually at 468 iterations
            after every monitor had stayed flat for more than 100.
          </p>
          <div className="mt-6">
            <Figure
              src={`${media}/residuals.png`}
              alt="Residual plot for continuity, momentum, turbulent kinetic energy and specific dissipation rate over 468 iterations"
              width={1913}
              height={873}
              caption="Residuals over 468 iterations"
            />
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
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
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            Flat residuals show the solver reached an answer that satisfies its
            own equations. To confirm the answer is also physical, I checked
            four quantities. Continuity error was 0.013%, under the 0.1% limit.
            The manifold pressure drop was 132.2 psi, close to the 136 psi from
            the tutorial run. Outlet pressure averaged 239.8 psi against the
            240 psig setpoint, with small backflow patches at each swirl outlet
            pulling it slightly low. Wall y+ fell between 0.4 and 205, with
            higher values under the inlet jet and lower values in the slow
            plenum. All of that range is covered by the All y+ treatment.
          </p>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {checks.map((c) => (
              <div key={c.label} className="bg-surface px-4 py-4">
                <dt className="font-mono text-xs text-muted">{c.label}</dt>
                <dd className="mt-1 font-mono text-xl font-semibold text-foreground">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 max-w-3xl">
            <Figure
              src={`${media}/wall-yplus.png`}
              alt="Wall y+ contour on the plenum floor, with a yellow ring around the centre where the inlet jet lands"
              width={1950}
              height={881}
              caption="Wall y+ on the plenum floor"
            />
          </div>
        </section>
      </Reveal>

      {/* Hand calcs */}
      <Reveal>
        <section id="hand-calcs" className="mt-16">
          <SectionLabel n="06" title="Hand calcs agree with the CFD" Icon={Calculator} />
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            I checked the main CFD numbers against hand calculations, and they
            agree. The most useful comparison is the orifice relationship. Each
            element acts as an orifice, so its mass flow scales with the square
            root of its pressure drop. A given percentage change in feed
            pressure therefore changes the flow by about half that percentage.
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
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            Applying that to inj-1, the +1.88% extra flow corresponds to about
            5 psi of extra feed pressure. Inj-1 sits directly in the path of
            the inlet jet, which carries more than enough dynamic pressure to
            supply it. The extra pressure acts on the upstream side of the
            element, since all 17 outlets are held at 240 psig.
          </p>
        </section>
      </Reveal>

      {/* Results */}
      <Reveal>
        <section id="results" className="mt-16">
          <SectionLabel n="07" title="Every element within ±2% of the average" Icon={Gauge} />
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            All 17 elements flow within 2% of the average of 0.2082 kg/s, which
            is the flow each would receive from a perfectly even split. The
            largest deviations are +1.88% at inj-1 and −1.36% at inj-12, and
            the standard deviation across all 17 is 0.92%.
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
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            The inner ring averages 0.6% above the mean and the outer ring 0.3%
            below it. Plotting flow against angle shows no trend around the
            manifold. The variation tracks which ring an element belongs to,
            and it comes from the inlet jet, which hits the cone, spreads
            across the plenum floor, and reaches the inner ring first. This
            accounts for the roughly 5 psi of extra feed pressure found in the
            hand calcs. The empty outer-ring slot has no visible effect, as
            inj-6, 7 and 17 all flow close to the average.
          </p>
          <div className="mt-6">
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
          <SectionLabel n="08" title="What the flow field shows" Icon={Wind} />
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            When the LOx leaves the stem, the flow area increases sharply.
            Continuity requires the velocity to drop to a few m/s, and the
            pressure in the plenum stays high and close to uniform. Each
            element therefore sees nearly the same feed pressure and draws
            nearly the same mass flow.
          </p>
          <div className="mt-6">
            <Figure
              src={`${media}/velocity-vectors.png`}
              alt="Velocity vectors on a section through the stem and two elements, showing the jet turning along the cone and running outward along the plenum floor"
              width={1916}
              height={613}
              caption="Velocity vectors on a slice through the stem and two elements"
            />
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            In each element, the tangential slots inject the LOx sideways and
            set it spinning. The spinning liquid is pushed against the element
            wall, which has the highest pressure and velocity, and leaves a
            slow, low-pressure core along the center. Most of the 132 psi
            pressure drop occurs across these swirl slots.
          </p>
          <div className="mt-6">
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

      {/* Why it's even */}
      <Reveal>
        <section id="why" className="mt-16 max-w-2xl">
          <SectionLabel n="09" title="Why the distribution is tight" />
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              The distribution is tight because each element has a 132 psi
              pressure drop. The roughly 5 psi of extra feed pressure at inj-1
              is about 4% of that drop, and because flow scales with the square
              root of pressure drop, it raises the flow by about 2%. The CFD
              result at inj-1 is +1.88%.
            </p>
            <p>
              A smaller element pressure drop would make the same 5 psi a
              larger fraction of the total. At 20 psi, it would change the flow
              by more than 12%.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Recommendation */}
      <Reveal>
        <section id="recommendation" className="mt-16 max-w-2xl">
          <SectionLabel
            n="10"
            title="Slow and spread the inlet jet"
            Icon={Lightbulb}
          />
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              To reduce the inner-ring bias, I would add a perforated splash
              plate under the stem to break up the inlet jet. The plate would
              slow and spread the jet before it reaches the inner ring, adding
              to what the cone already does. A conical diffuser at the stem
              exit or a wider stem-to-cone gap would have a similar effect with
              less added pressure loss.
            </p>
            <p>
              The pressure drop across each element should stay the same, since
              it is what keeps the remaining maldistribution small. To test the
              change, I would edit the CAD, rerun the simulation with the same
              mesh and physics settings, and compare the maldistribution,
              standard deviation, and pressure drop to this run. The modified
              geometry has not been run yet.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Limits and next steps */}
      <Reveal>
        <section id="limits" className="mt-16 max-w-2xl">
          <SectionLabel n="11" title="What would tighten these results" />
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Several assumptions limit how closely this model matches the real
              hardware. LOx density and viscosity were held constant,
              temperature was never an input, and the walls were modeled as
              smooth. If the manifold is 3D printed, the smooth-wall assumption
              is the largest gap, because printed internal surfaces are rough
              and the roughness in the swirl slots can differ from one element
              to the next. A roughness model would be the next addition.
            </p>
            <p>
              Each outlet also has 41 to 48 faces of backflow, caused by the
              low-pressure swirl core sitting on the outlet plane. Extending
              the domain a short distance into the chamber should remove it.
              Because the LOx eventually meets the fuel, a fuel-side run at
              1.77 kg/s would allow the mixture ratio of each element to be
              compared against the nominal O/F of 2.0.
            </p>
            <p>
              Some of the ±2% spread may also come from mesh error. Running
              coarse and fine meshes and comparing the results would show how
              much of the spread is real. For this reason, each main CFD result
              here is checked against a hand calculation, which is the standard
              a design review would hold it to.
            </p>
          </div>
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

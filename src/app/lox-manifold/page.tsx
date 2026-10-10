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
  {
    label: "Continuity error",
    value: "0.013%",
    note: "Net mass flow ÷ 3.54 kg/s, against a 0.1% limit",
  },
  {
    label: "Manifold ΔP",
    value: "132.2 psi",
    note: "372.1 − 239.8 psi. The tutorial run gave about 136",
  },
  {
    label: "Outlet pressure",
    value: "239.8 psi",
    note: "Set to 240 psig at all 17 outlets",
  },
  {
    label: "Wall y+",
    value: "0.4–205",
    note: "80 to 120 under the jet footprint, below 30 in the slow plenum",
  },
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

const limitations = [
  "The outlets sit inside each element's swirl core, so 41 to 48 faces per outlet see backflow",
  "LOx density and viscosity are held constant",
  "Walls are smooth, with no roughness model",
  "There is one mesh and no independence study yet",
];

const nextSteps = [
  "Extend the domain into a short downstream chamber",
  "Run coarse and fine meshes to bound the ±2% spread",
  "Run the fuel manifold at 1.77 kg/s to get mixture-ratio maldistribution",
  "Rerun with the recommended stem-exit change",
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
            and the flow field pointed to one change at the stem exit that
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
                The manifold has one job. 3.54 kg/s of LOx comes in through a
                single stem, and the plenum has to divide it across 17 coaxial
                swirl elements so that every one of them sees the same flow.
              </p>
              <p>
                It matters because uneven LOx shifts the mixture ratio. An
                element that runs LOx-rich or LOx-lean pulls its local O/F off
                nominal, and local mixture ratio sets local flame temperature.
                Hot streaks follow, and so does lost performance.
              </p>
              <p>
                So the study had to deliver four things, which were the mass
                flow per element, the ± maldistribution, the manifold pressure
                drop, and a design change backed by the flow field.
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
                The fluid volume runs from the inlet stem into a disk-shaped
                plenum with a cone at its centre, and from there into 17 swirl
                elements that are each fed through tangential slots.
              </p>
              <ul className="space-y-2">
                <li>
                  <span className="font-mono text-foreground">Inner ring</span>{" "}
                  is inj-1 to inj-6, at a radius of about 34 mm and 60° apart.
                </li>
                <li>
                  <span className="font-mono text-foreground">Outer ring</span>{" "}
                  is inj-7 to inj-17, at about 55 mm and 30° apart, with one
                  empty slot near 315°.
                </li>
                <li>
                  <span className="font-mono text-foreground">Angle θ</span> is
                  measured from the top, clockwise as seen from the injector
                  face.
                </li>
              </ul>
              <p>
                The radii and angles came from probing each outlet in a
                cylindrical frame aligned with the stem. The empty outer-ring
                slot is worth remembering, because its neighbours turn out to
                run near average.
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
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The fluid properties and boundary values were the givens for the
            project. Real LOx viscosity swings hard with temperature, so
            holding the properties constant is a deliberate simplification. The
            solver was segregated with SIMPLE-type pressure-velocity coupling,
            in STAR-CCM+ 2606.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
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
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The mesh is automated, with a surface remesher, a polyhedral core
            and prism layers on every wall. Base size is 1 mm, which puts about
            7 cells across each outlet. There are 4 prism layers totalling 0.37
            mm, with a 24.6 µm first cell sized for y+ of 35 to 100. After
            optimization no cells were left below the quality thresholds.
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
          <p className="mt-4 max-w-2xl text-sm text-muted">
            The elements and their tangential slots carry far finer cells than
            the plenum, which puts the resolution where velocity peaks. The
            layers thin out in sharp corners, which you can see at the bottom
            of the close-up, and that is what the mesher is supposed to do
            there.
          </p>
        </section>
      </Reveal>

      {/* Convergence */}
      <Reveal>
        <section id="convergence" className="mt-16">
          <SectionLabel n="05" title="Convergence and sanity checks" Icon={ChartLineUp} />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The residuals drop 3 to 6 orders and level off by about 300
            iterations. I stopped the run by hand at 468, after every monitor
            had held flat for more than 100 iterations.
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
          <p className="mt-6 max-w-2xl text-sm text-muted">
            Flat residuals only say the solver settled. Whether the answer is
            physical is a separate question, so I checked continuity, outlet
            pressure, pressure drop and y+ against what they should be.
          </p>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {checks.map((c) => (
              <div key={c.label} className="bg-surface px-4 py-4">
                <dt className="font-mono text-xs text-muted">{c.label}</dt>
                <dd className="mt-1 font-mono text-xl font-semibold text-foreground">
                  {c.value}
                </dd>
                <dd className="mt-1 text-xs text-muted">{c.note}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Figure
              src={`${media}/wall-yplus.png`}
              alt="Wall y+ contour on the plenum floor, with a yellow ring around the centre where the inlet jet lands"
              width={1950}
              height={881}
              caption="Wall y+ on the plenum floor"
            />
            <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
              <p>
                The outlet pressure reads 239.8 against a 240 setpoint because
                a small patch of backflow at each swirl outlet drags the
                average down slightly.
              </p>
              <p>
                The y+ map doubles as a wall-shear map, and the yellow ring is
                the footprint of the inlet jet on the plenum floor. All y+
                treatment blends a resolved sublayer below y+ of 5 with wall
                functions above 30, which is why a mixed range is acceptable
                here.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Hand calcs */}
      <Reveal>
        <section id="hand-calcs" className="mt-16">
          <SectionLabel n="06" title="Hand calcs agree with the CFD" Icon={Calculator} />
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
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
          <p className="mt-4 max-w-2xl text-sm text-muted">
            The last row is the one that ties the hand calcs to the results.
            Each element behaves like an orifice, so flow scales with the
            square root of its pressure drop and a fractional change in feed
            pressure moves flow by half as much. The +1.88% at inj-1 needs only
            about 5 psi of extra feed pressure, and the impinging jet supplies
            that with room to spare.
          </p>
        </section>
      </Reveal>

      {/* Results */}
      <Reveal>
        <section id="results" className="mt-16">
          <SectionLabel n="07" title="Every element within ±2% of the average" Icon={Gauge} />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The average is 0.2082 kg/s, matching 3.54 ÷ 17. The inner ring runs
            +0.6% on average and the outer ring runs −0.3%. The two highest
            elements are inj-1 and inj-4, which sit directly in the path of the
            inlet jet.
          </p>
          <div className="mt-6">
            <Figure
              src={`${media}/flow-by-element.png`}
              alt="LOx mass flow for each of the 17 elements, with the average and a one standard deviation band"
              width={2000}
              height={1040}
              caption="Mass flow per element. The band is ±1σ, which is 0.92% of the average"
            />
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted">
            Maldistribution comes out at +1.88% and −1.36%. The positive figure
            is (max − avg) ÷ avg at inj-1, and the negative one is (avg − min)
            ÷ avg at inj-12.
          </p>
          <div className="mt-6">
            <Figure
              src={`${media}/maldistribution.png`}
              alt="Bar chart of each element's deviation from the average mass flow, from plus 1.88 percent at inj-1 to minus 1.36 percent at inj-12"
              width={2000}
              height={1040}
              caption="Deviation from average. Blue is above, orange is below"
            />
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted">
            Plotted against angle there is no trend, and no steady fall-off
            with distance from any one direction. The bias sits with the ring
            instead. The inner ring peaks at 0° and 180° while the outer ring
            alternates element to element, and the empty slot turns out to be
            harmless, since inj-6, 7 and 17 all sit near average.
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
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Some of that element-to-element scatter may fall inside mesh
            uncertainty. A refined mesh would say how much.
          </p>
        </section>
      </Reveal>

      {/* Flow field */}
      <Reveal>
        <section id="flow-field" className="mt-16">
          <SectionLabel n="08" title="What the flow field shows" Icon={Wind} />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The inlet jet comes down the stem at about 15 m/s, hits the cone
            and speeds up to about 30 m/s in the stem-to-cone gap. It leaves as
            a radial wall jet that strikes the inner-ring posts first. Out in
            the rest of the plenum the flow is nearly stagnant, at 0 to 3 m/s.
          </p>
          <div className="mt-6">
            <Figure
              src={`${media}/velocity-vectors.png`}
              alt="Velocity vectors on a section through the stem and two elements, showing the jet turning along the cone and running outward along the plenum floor"
              width={1916}
              height={613}
              caption="Velocity vectors on the x = 0 slice, which cuts through inj-1 and inj-4"
            />
          </div>
          <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Velocity collapses leaving the stem because the flow area of the
              plenum dwarfs that of the stem, so continuity drops the speed to
              a few m/s. That quiet plenum is what lets every element draw
              evenly.
            </p>
            <p>
              Velocity is highest at the element walls because the tangential
              slots spin the LOx. The swirl throws the liquid outward into an
              annular film and leaves a slow, low-pressure core behind it.
            </p>
          </div>
          <div className="mt-6">
            <Figure
              src={`${media}/pressure-plane.png`}
              alt="Pressure contour through the plenum, nearly uniform away from the stem, with low pressure at each element outlet"
              width={1833}
              height={857}
              caption="Pressure in psi. The plenum barely varies and the drop happens in the elements"
            />
          </div>
          <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Pressure peaks at about 395 psi where the jet stagnates on the
              cone, and away from the jet the plenum is nearly uniform. Most of
              the 132 psi is dropped across the swirl slots of each element,
              down to 240 psi at the outlet.
            </p>
            <p>
              The low-pressure swirl core sits right on the outlet plane, so
              every pressure outlet sees a small patch of reversed flow, 41 to
              48 faces each, steady through the run. The physics is real, but
              it still adds uncertainty to the per-element flow.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Why it's even */}
      <Reveal>
        <section id="why" className="mt-16 max-w-2xl">
          <SectionLabel n="09" title="Why the distribution is tight" />
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Most of the 132 psi drops across the swirl slots, while the
              plenum velocity carries less than one. Element flow scales with
              √ΔP, so a large drop at every element swamps the small pressure
              differences upstream of it. That is what keeps the flow even.
            </p>
            <p>
              The +0.6% inner-ring bias comes from the jet. Near the inner
              posts it runs 15 to 30 m/s, which is roughly 19 to 74 psi of
              dynamic head, and the posts only need to recover a small slice of
              that. A rise of about 5 psi in feed pressure accounts for the
              +1.9% at inj-1 on its own.
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
              The design already holds every element within +1.9% and −1.4%,
              so this is a refinement. It goes after the one mechanism the CFD
              shows clearly, which is the stem jet accelerating through the
              stem-to-cone gap and striking the inner-ring posts.
            </p>
            <p>
              The change is to flare the stem exit into a conical diffuser, or
              to widen the stem-to-cone gap, with a perforated splash plate
              under the stem as the fallback. The jet would stop accelerating
              to 30 m/s at the cone, the inner posts would see less extra feed
              pressure, and the stem-to-plenum loss would fall.
            </p>
            <p>
              What I would keep is the high element pressure drop. It is what
              holds σ under 1%, and trading it away for a lower manifold ΔP
              would give that back.
            </p>
            <p>
              To verify it, edit the CAD, rerun with the same mesh and physics
              settings, and compare ± maldistribution, σ and ΔP. I have not run
              the modified geometry yet.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Limits and next steps */}
      <Reveal>
        <section id="limits" className="mt-16">
          <SectionLabel n="11" title="What would tighten these results" />
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <ListCard title="Limitations" items={limitations} />
            <ListCard title="Next steps" items={nextSteps} />
          </div>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Mixture-ratio maldistribution is the end goal. With the fuel side
            run, O/F per element is the LOx flow over the fuel flow at the same
            element number, measured against a nominal 3.54 ÷ 1.77 = 2.0.
          </p>
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

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-surface/40 p-5">
      <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="text-border">
              /
            </span>
            {item}
          </li>
        ))}
      </ul>
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

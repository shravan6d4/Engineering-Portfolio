import type { Metadata } from "next";
import {
  Camera,
  Cpu,
  Broadcast,
  Robot,
  ArrowRight,
  ArrowSquareOut,
  GithubLogo,
  ShieldCheck,
  Printer,
  Cube,
  Books,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react/dist/lib/types";
import HeightDemo from "@/components/HeightDemo";
import StatCallout from "@/components/StatCallout";
import VideoSlot from "@/components/VideoSlot";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import ErrorComparison from "@/components/ErrorComparison";

export const metadata: Metadata = {
  title: "5-DOF Robotic Arm — Shravan Kumar",
  description:
    "Vision-guided 5-DOF robotic arm: SolidWorks → Simscape Multibody → OpenCV → closed-loop servo control.",
};

const pipeline = [
  { step: "Camera", detail: "OpenCV brick detection, 2 pose vectors", Icon: Camera },
  { step: "MATLAB / Simscape", detail: "Inverse kinematics over the surveyed chain", Icon: Cpu },
  { step: "Serial bus", detail: "Paced, safety-capped servo commands", Icon: Broadcast },
  { step: "Physical arm", detail: "Closed-loop visual servo descent", Icon: Robot },
];

const simGallery = [
  {
    src: "/media/robot-arm/gallery/mesh-view-ik.png",
    caption: "Mesh-view IK check — claw length 70.06mm, limits not yet defined",
    width: 745,
    height: 476,
  },
  {
    src: "/media/robot-arm/gallery/ik-trajectory-plot.png",
    caption: "MATLAB — verifying inverse kinematics via mesh view",
    width: 738,
    height: 531,
  },
];

const buildGallery = [
  {
    src: "/media/robot-arm/gallery/slicer-preview.png",
    caption: "Creality slicer preview before printing arm segments",
    width: 622,
    height: 349,
  },
  {
    src: "/media/robot-arm/gallery/printer-bed.jpeg",
    caption: "Printed segments on the bed",
    width: 1350,
    height: 1800,
  },
  {
    src: "/media/robot-arm/gallery/printed-brackets.jpeg",
    caption: "Finished brackets, post-print",
    width: 1800,
    height: 1350,
  },
  {
    src: "/media/robot-arm/gallery/assembly-bench.jpeg",
    caption: "Assembling against the SolidWorks reference",
    width: 1350,
    height: 1800,
  },
  {
    src: "/media/robot-arm/gallery/wiring-closeup.jpeg",
    caption: "Servo wiring, wrist joint",
    width: 1350,
    height: 1800,
  },
];

const literature = [
  {
    cite:
      "H. H. Chen, “A screw motion approach to uniqueness analysis of head-eye geometry,” CVPR, 1991.",
    contribution:
      "Screw congruence. Because AX = XB makes A and B conjugate, every pose pair must agree on both rotation angle and screw pitch — but the tooling only ever tested angle. Adding the pitch test immediately caught four pose pairs that angle had passed cleanly, one of them with 0.06° of angle error hiding 115 mm of pitch error.",
  },
  {
    cite:
      "Y. Sun and J. M. Hollerbach, “Observability index selection for robot calibration,” IEEE ICRA, 2008.",
    contribution:
      "Observability indices O1–O4. Replaced condition number as the capture-quality gate, because condition number rates a capture of uniformly tiny rotations a perfect 1.0 — it cannot tell a well-conditioned capture from one that barely moved. Captures are now gated on O3.",
  },
  {
    cite:
      "F. C. Park and B. J. Martin, “Robot sensor calibration: solving AX = XB on the Euclidean group,” IEEE Transactions on Robotics and Automation, 10(5), 1994.",
    contribution:
      "Closed-form AX = XB solution via orthogonal-Procrustes reduction for rotation, then least squares for translation. Let me solve from explicit motion pairs instead of OpenCV's absolute-pose interface — which is what made cross-board pooling possible, taking the solve from 11 constraints to the ~390 the data actually offered.",
  },
  {
    cite:
      "V. V. Fedorov, Theory of Optimal Experiments, Academic Press, 1972 (Fedorov exchange algorithm).",
    contribution:
      "D-optimal subset selection. Pose subsets are chosen by greedy seeding plus Fedorov exchange on log-determinant rather than on O3, since determinant criteria are the ones reported as correct under greedy selection. Measured effect: O3 rose 2.03 → 3.55 and conditioning went from failing to passing.",
  },
  {
    cite:
      "H. Zhuang, S. H. Motaghedi, and Z. S. Roth, “Robot calibration with planar constraints,” IEEE ICRA, 1999.",
    contribution:
      "Planar-constraint identifiability. A single plane leaves the identification matrix rank deficient — three mutually non-parallel planes are the minimum for identification. This is why the table-plane tool was deliberately scoped to refute a hypothesis rather than claim to identify parameters from one flat surface.",
  },
  {
    cite:
      "R. Y. Tsai and R. K. Lenz, “A new technique for fully autonomous and efficient 3D robotics hand/eye calibration,” IEEE Transactions on Robotics and Automation, 5(3), 1989.",
    contribution:
      "The other hand-eye method available in OpenCV. Solving with both TSAI and PARK and cross-checking them is what exposed that the original agreement gate compared only translation — so two methods could agree on the same badly-wrong orientation and still report “ok.”",
  },
];

const pageSections = [
  { id: "results", label: "Results" },
  { id: "signals", label: "Signal flow" },
  { id: "pipeline", label: "Pipeline" },
  { id: "story", label: "What broke" },
  { id: "accuracy", label: "Accuracy" },
  { id: "simulation", label: "Simulation" },
  { id: "fabrication", label: "Fabrication" },
  { id: "internals", label: "Under the hood" },
  { id: "literature", label: "Literature" },
];

export default function RobotArmPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionNav sections={pageSections} />
      {/* Hero */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Project 01 &mdash; June&ndash;August 2026
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          5-DOF Autonomous Robotic Arm
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          A vision-guided pick system taken end-to-end: modeled in SolidWorks,
          imported into Simscape Multibody for inverse kinematics, driven by
          OpenCV-based object detection over a closed servo control loop &mdash;
          on real hardware, not just in simulation.
        </p>
      </div>

      <Reveal className="mt-8">
        <StatCallout
          stats={[
            { value: "100%", label: "Success — ground pick", tone: "positive" },
            { value: "80%", label: "Success — off-height (8/10)" },
            { value: "3D", label: "Picks anywhere in the reachable volume" },
            { value: "5", label: "Degrees of freedom" },
          ]}
        />
      </Reveal>

      <div className="mt-4 flex flex-wrap gap-2">
        {["SolidWorks", "Simscape Multibody", "MATLAB", "OpenCV / Python", "Servo control"].map(
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

      {/* Results / Demo */}
      <Reveal>
        <section id="results" className="mt-16">
          <SectionLabel n="01" title="Results" />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The three clips below are sample points, not the limit of what the
            arm can reach &mdash; the two-pose system resolves a target
            anywhere inside the arm&apos;s reachable volume, at any height,
            without being told how high the object sits. Off-height picks
            depend on that solved depth rather than the ground case&apos;s
            known table plane, which is what accounts for the gap between
            100% and 80%. Each trial below pairs the physical arm with the
            OpenCV detection view captured from the same run.
          </p>
          <div className="mt-6 space-y-4">
            <HeightDemo
              heightLabel="Ground-level pick"
              physicalSrc="/media/robot-arm/flat-height-2.5x.mp4"
              physicalPoster="/media/posters/flat.jpg"
              secondaryAvailable={false}
            />
            <HeightDemo
              heightLabel="Medium-height pick"
              physicalSrc="/media/robot-arm/medium-height-phone-2.5x.mp4"
              physicalPoster="/media/posters/medium-phone.jpg"
              secondarySrc="/media/robot-arm/medium-height-2.5x.mp4"
              secondaryPoster="/media/posters/medium.jpg"
            />
            <HeightDemo
              heightLabel="High pick"
              physicalSrc="/media/robot-arm/high-height-phone-2.5x.mp4"
              physicalPoster="/media/posters/high-phone.jpg"
              secondarySrc="/media/robot-arm/high-height-2.5x.mp4"
              secondaryPoster="/media/posters/high.jpg"
            />
          </div>
          <p className="mt-3 font-mono text-[11px] text-muted">
            Descent moves are deliberately paced &mdash; slow jogs are a
            safety margin against an encoder-seam runaway, and the camera
            needs a near-stationary frame for OpenCV to resolve the brick
            without motion blur. Clips are sped up 2.5&times; for viewing.
          </p>
        </section>
      </Reveal>

      {/* Signal flow — what actually happens per descent step */}
      <Reveal>
        <section id="signals" className="mt-16">
          <SectionLabel
            n="02"
            title="What fires on every step of the descent"
            Icon={Broadcast}
          />
          <p className="mt-2 max-w-3xl text-sm text-muted">
            The descent isn&apos;t one command &mdash; it&apos;s a loop that
            re-measures, re-solves, and re-commands roughly every eight
            millimetres of travel. Here is the chain that runs each time.
          </p>

          <div className="mt-6 space-y-3">
            <SignalStep
              n="01"
              title="Camera resolves the brick and shortens the error vector"
              body={
                <>
                  OpenCV segments the brick by colour and scores its studs and
                  contour geometry, returning a pixel centroid. The loop
                  subtracts that from the aim point to get a 2-D pixel error
                  vector &mdash; and then deliberately{" "}
                  <strong className="font-medium text-foreground">
                    shortens it
                  </strong>
                  . Rather than commanding the full correction at once, it
                  scales the vector down to a small step, because a single
                  large lunge would overshoot: the camera rides on the wrist,
                  so any move the arm makes changes the very measurement the
                  correction was computed from. Shortening the vector keeps
                  the loop convergent instead of oscillating &mdash; each step
                  moves a fraction of the way, then re-measures against a
                  fresh frame.
                </>
              }
            />
            <SignalStep
              n="02"
              title="The pixel step is converted into a base-frame Cartesian target"
              body={
                <>
                  A probe measures the loop&apos;s own gain empirically
                  &mdash; jog a known distance, watch how many pixels the
                  brick moved &mdash; giving a live mm-per-pixel scale for the
                  current posture. That converts the shortened pixel vector
                  into millimetres along the arm&apos;s real reach and
                  tangential axes (measured by perturbing a pitch joint, not
                  inferred from the CAD frame). The result is a target point
                  in the base frame, one small step from where the claw is
                  now.
                </>
              }
            />
            <SignalStep
              n="03"
              title="Python hands the target to MATLAB, which solves inverse kinematics"
              body={
                <>
                  The Cartesian target crosses a local TCP socket to a MATLAB
                  server holding the arm&apos;s rigid-body tree. MATLAB runs{" "}
                  <span className="font-mono text-foreground">
                    inverseKinematics
                  </span>{" "}
                  seeded from the arm&apos;s <em>current</em> joint angles, so
                  it converges on the nearest solution rather than some other
                  legal posture across the workspace. Because a 5-DOF arm has
                  redundant freedom against a 3-DOF position target, the solve
                  is constrained: wrist roll and (on radial moves) base yaw
                  are held, and the returned angles are checked against
                  measured per-joint travel limits and a Cartesian floor guard
                  before anything moves.
                </>
              }
            />
            <SignalStep
              n="04"
              title="Joint angles become paced servo commands"
              body={
                <>
                  Angles are converted to raw encoder ticks through each
                  joint&apos;s calibrated scale and direction sign, then
                  issued over the serial bus in sub-cap hops with a rest
                  between them. Position is read back after each hop rather
                  than assumed, so a stalled or refused joint ends the move
                  instead of being pushed through &mdash; and the pause is
                  what keeps a wrong move stoppable by hand.
                </>
              }
            />
          </div>

          {/* Two-pose depth explanation */}
          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/[0.04] p-5">
            <h3 className="flex items-center gap-2 font-medium text-foreground">
              <Cube size={18} weight="regular" className="text-accent" />
              The two-pose system: why height doesn&apos;t have to be known
            </h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                One camera looking at one frame cannot recover depth. A single
                image only gives a <em>ray</em> pointing from the lens toward
                the brick &mdash; every point along that ray projects to the
                same pixel. The usual workaround is to assume the object sits
                on a known plane (the tabletop) and intersect the ray with it.
                That works on the ground and fails the moment the brick is on
                top of something, because the claw then drives to where the
                table would have been.
              </p>
              <p>
                The two-pose system removes that assumption. The arm captures
                the brick from one pose, swings the base tangentially to a
                second pose a known baseline apart, and captures again. Two
                rays from two known camera positions{" "}
                <strong className="font-medium text-foreground">
                  intersect at a single point in space
                </strong>{" "}
                &mdash; that intersection is the brick&apos;s true 3-D
                position, height included. The arm has effectively become its
                own stereo pair, using its own forward kinematics to know how
                far the two viewpoints are apart.
              </p>
              <p>
                Two details make it work rather than merely sound right. The
                move has to be <em>tangential</em>, because parallax needs
                translation across the line of sight &mdash; and on this arm
                the base yaw is the only joint that provides it, since the
                three parallel pitch joints move the camera mostly along its
                own view. And the baseline has to be verified, not assumed:
                near-parallel rays amplify a pixel of noise into tens of
                millimetres of depth error, so the run reads the joint and the
                FK tip before and after each leg and refuses to triangulate if
                the arm didn&apos;t actually travel far enough.
              </p>
              <p className="border-t border-accent/20 pt-3">
                <strong className="font-medium text-foreground">
                  The consequence:
                </strong>{" "}
                the pick target is solved rather than assumed, so the arm can
                grasp an object resting anywhere inside its reachable volume
                &mdash; on the table, on a book, on a raised block &mdash;
                without being told in advance how high it is.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Pipeline overview */}
      <Reveal>
        <section id="pipeline" className="mt-16">
          <SectionLabel n="03" title="Pipeline" />
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {pipeline.map((p, i) => (
              <div key={p.step} className="relative">
                <div className="h-full rounded-lg border border-border bg-surface/40 p-4 transition-colors hover:border-accent/60">
                  <p.Icon size={20} weight="regular" className="text-accent" />
                  <p className="mt-3 font-medium text-foreground">{p.step}</p>
                  <p className="mt-1 text-sm text-muted">{p.detail}</p>
                </div>
                {i < pipeline.length - 1 && (
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-muted sm:block"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* The story */}
      <Reveal>
        <section id="story" className="mt-16">
          <SectionLabel n="04" title="Four things that broke, and what they taught me" />
          <div className="mt-8 space-y-4">
            <Story
              n="01"
              title="The imported CAD model had the elbow backwards"
              body={
                <>
                  The arm&apos;s IK solver ran fine in simulation, but a large
                  move on hardware drove a joint into its limit. The instinct
                  that caught it wasn&apos;t a debugger &mdash; it was a
                  structural argument: J2 is the earliest joint in the chain,
                  so it has to move the claw <em>more</em> than J3, not less.
                  The imported model said otherwise. A jog and a ruler
                  confirmed it: the model&apos;s elbow moment arm was inverted
                  by more than{" "}
                  <span className="font-mono text-foreground">2.17&times;</span>
                  . Four independent statistical analyses had all pointed the
                  wrong way; one physical jog settled it in thirty seconds.
                </>
              }
            />
            <Story
              n="02"
              title="Replaced the CAD kinematic chain with a ten-number ruler survey"
              body={
                <>
                  Rather than patch the imported model, I rebuilt the
                  arm&apos;s kinematics from five physically measured points
                  &mdash; no curve-fitting, no CAD trust required. Held-out
                  validation error dropped from{" "}
                  <span className="font-mono text-foreground">73.1&nbsp;mm</span>{" "}
                  to{" "}
                  <span className="font-mono text-foreground">6.0&nbsp;mm</span>
                  . It was ported into MATLAB behind a single flag and
                  verified by independent replication before going live.
                </>
              }
            />
            <Story
              n="03"
              title="A hardware failure became a real safety system"
              body={
                <>
                  A mid-move power cut once dropped the arm and drove a servo
                  into overload. That turned into deliberate driver-level
                  hardening: freeze-first e-stop (torque stays on, motion
                  stops), live torque diagnostics, per-joint travel limits,
                  and paced stepping so a wrong move is stoppable by hand
                  before it does damage.
                </>
              }
            />
            <Story
              n="04"
              title="Closing the loop with data, not guesses"
              body={
                <>
                  Hand-eye calibration never converged below roughly{" "}
                  <span className="font-mono text-foreground">
                    80&ndash;100&nbsp;mm
                  </span>{" "}
                  of error against a 24&nbsp;mm ruler measurement &mdash;
                  characterized precisely rather than papered over. The
                  closed-loop visual servo path sidesteps it entirely: eleven
                  real descent runs were logged as training data, a height
                  model was fit from apparent brick area (after the more
                  obvious pixel-rate signal turned out to run backwards), and
                  a two-view triangulation survey now serves as an
                  independent, hand-eye-free referee.
                </>
              }
            />
          </div>
        </section>
      </Reveal>

      {/* Accuracy — the headline result, visualized */}
      <Reveal>
        <section id="accuracy" className="mt-16">
          <SectionLabel n="05" title="What the rebuild bought" />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The single most consequential change in the project, measured
            against touch points the model was never fitted to.
          </p>
          <div className="mt-6 max-w-2xl">
            <ErrorComparison />
          </div>
        </section>
      </Reveal>

      {/* Simulation validation */}
      <Reveal>
        <section id="simulation" className="mt-16">
          <SectionLabel n="06" title="Simulation validation" />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Before any hardware was involved, the Simscape Multibody model
            (imported from the SolidWorks assembly) validated inverse
            kinematics against target poses in simulation &mdash; solved in
            MATLAB and checked against a mesh view of the arm before a single
            part was printed.
          </p>
          <div className="mt-4 max-w-xl">
            <VideoSlot
              src="/media/robot-arm/simscape-demo.mp4"
              poster="/media/posters/simscape.jpg"
              label="Simscape Multibody — early IK validation"
            />
          </div>
          <div className="mt-4">
            <Gallery images={simGallery} />
          </div>
        </section>
      </Reveal>

      {/* Fabrication & build */}
      <Reveal>
        <section id="fabrication" className="mt-16">
          <SectionLabel n="07" title="Fabrication & build" Icon={Printer} />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            With the kinematics confirmed, segments were sliced and printed on
            a Creality Ender-class printer, then assembled and wired against
            the SolidWorks reference on the bench.
          </p>
          <div className="mt-6">
            <Gallery images={buildGallery} />
          </div>
        </section>
      </Reveal>

      {/* Under the hood */}
      <Reveal>
        <section id="internals" className="mt-16">
          <SectionLabel n="08" title="Under the hood" Icon={ShieldCheck} />
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <UnderTheHoodCard
              title="Safety"
              body="Software freeze as the first-resort stop (torque held, motion halted) ahead of a power cut; per-joint travel limits measured directly rather than assumed; paced stepping with a rest between hops so a bad move can be caught by hand."
            />
            <UnderTheHoodCard
              title="Closed-loop control"
              body="Null-space joints (wrist roll, base yaw during radial moves) are locked out of the solver's redundant freedom; a pan-budget formula lets tangential base-yaw moves spend the angle their geometry actually requires while still capping wasteful radial ones."
            />
            <UnderTheHoodCard
              title="Frame handling"
              body="The Simscape import's base frame is upside-down relative to the physical robot — handled once, at the single MATLAB client seam, so the rest of the codebase speaks the physical frame without thinking about it."
            />
          </div>
          <a
            href="https://github.com/shravan6d4/5-DOF-CV-Robot-Arm"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <GithubLogo size={16} weight="regular" />
            View repository
            <ArrowSquareOut size={14} weight="regular" />
          </a>
        </section>
      </Reveal>

      {/* Literature */}
      <Reveal>
        <section id="literature" className="mt-16">
          <SectionLabel n="09" title="Literature referenced" Icon={Books} />
          <p className="mt-2 max-w-3xl text-sm text-muted">
            The hand-eye calibration and kinematic-identification work
            wasn&apos;t improvised &mdash; each diagnostic was built from an
            established result. What follows is what I read and what it
            changed in the code.
          </p>
          <ol className="mt-6 space-y-3">
            {literature.map((ref, i) => (
              <li
                key={ref.cite}
                className="rounded-lg border border-border bg-surface/30 p-5 transition-colors hover:border-accent/40 sm:grid sm:grid-cols-[2rem_1fr] sm:gap-3"
              >
                <span className="font-mono text-sm tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm text-foreground">{ref.cite}</p>
                  <p className="mt-2 flex gap-2 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="select-none text-accent">
                      &rarr;
                    </span>
                    <span>{ref.contribution}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      {/* Collaboration */}
      <Reveal>
        <section className="mt-16 rounded-lg border border-border bg-surface/40 p-5">
          <p className="text-sm text-muted">
            Built with{" "}
            <a
              href="https://github.com/shravan6d4/5-DOF-CV-Robot-Arm/commits?author=krishvatsa"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 hover:text-accent"
            >
              Krish Vatsa
            </a>
            , who built and validated the OpenCV detection pipeline in
            Python. I led the SolidWorks/Simscape kinematics, MATLAB IK,
            hardware bring-up, calibration, and closed-loop control;
            integrating the three systems together was the hardest and
            longest part of the project.
          </p>
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

function Story({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface/30 p-5 transition-colors hover:border-accent/40 sm:grid sm:grid-cols-[3rem_1fr] sm:gap-3">
      <p className="font-mono text-sm text-accent">{n}</p>
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}

function SignalStep({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="relative rounded-lg border border-border bg-surface/30 p-5 transition-colors hover:border-accent/40 sm:grid sm:grid-cols-[3rem_1fr] sm:gap-3">
      <p className="font-mono text-sm tabular-nums text-accent">{n}</p>
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}

function UnderTheHoodCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface/30 p-4">
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}

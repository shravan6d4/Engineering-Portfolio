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
  title: "5-DOF Robotic Arm | Shravan Kumar",
  description:
    "A 5-DOF robot arm that picks up an object anywhere in a given 3D space, running off MATLAB, Python and a serial bus driver.",
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
    caption: "Checking the IK in a mesh view. Claw length 70.06mm, no limits set yet",
    width: 745,
    height: 476,
  },
  {
    src: "/media/robot-arm/gallery/ik-trajectory-plot.png",
    caption: "Verifying the inverse kinematics in MATLAB",
    width: 738,
    height: 531,
  },
];

const buildGallery = [
  {
    src: "/media/robot-arm/gallery/solidworks-assembly.jpg",
    caption:
      "SolidWorks. I found the motor dimensions online and reverse engineered a reference to build the arm around",
    width: 1919,
    height: 1079,
  },
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
      "Screw congruence. AX = XB makes A and B conjugate, so every pose pair has to agree on rotation angle and on screw pitch, but our tooling was only ever testing the angle. Adding the pitch test caught four pose pairs that the angle test had passed cleanly, and one of them had 0.06° of angle error hiding 115 mm of pitch error.",
  },
  {
    cite:
      "Y. Sun and J. M. Hollerbach, “Observability index selection for robot calibration,” IEEE ICRA, 2008.",
    contribution:
      "Observability indices O1 to O4. We used these instead of condition number to gate capture quality, because condition number gives a capture of uniformly tiny rotations a perfect 1.0 and cannot tell a good capture from one where the arm barely moved. Captures are gated on O3 now.",
  },
  {
    cite:
      "F. C. Park and B. J. Martin, “Robot sensor calibration: solving AX = XB on the Euclidean group,” IEEE Transactions on Robotics and Automation, 10(5), 1994.",
    contribution:
      "A closed form AX = XB solution, using an orthogonal Procrustes reduction for rotation and then least squares for translation. This let me solve from explicit motion pairs instead of going through OpenCV's absolute pose interface, which is what made pooling across boards possible and took the solve from 11 constraints up to the roughly 390 the data actually had in it.",
  },
  {
    cite:
      "V. V. Fedorov, Theory of Optimal Experiments, Academic Press, 1972 (Fedorov exchange algorithm).",
    contribution:
      "D-optimal subset selection. We pick pose subsets by greedy seeding plus Fedorov exchange on log determinant instead of on O3, since the determinant criteria are the ones reported as correct under greedy selection. O3 went from 2.03 to 3.55 and the conditioning went from failing to passing.",
  },
  {
    cite:
      "H. Zhuang, S. H. Motaghedi, and Z. S. Roth, “Robot calibration with planar constraints,” IEEE ICRA, 1999.",
    contribution:
      "Planar constraint identifiability. One plane leaves the identification matrix rank deficient, and you need three planes that are not parallel to each other before you can identify anything. That is why we scoped the table plane tool to refute a hypothesis on purpose, instead of claiming it could identify parameters off one flat surface.",
  },
  {
    cite:
      "R. Y. Tsai and R. K. Lenz, “A new technique for fully autonomous and efficient 3D robotics hand/eye calibration,” IEEE Transactions on Robotics and Automation, 5(3), 1989.",
    contribution:
      "The other hand-eye method OpenCV gives you. Solving with both TSAI and PARK and cross checking them is what exposed that our original agreement gate was only comparing translation, which meant both methods could agree on the same badly wrong orientation and still come back reporting ok.",
  },
];

const pageSections = [
  { id: "results", label: "Results" },
  { id: "signals", label: "Signal flow" },
  { id: "pipeline", label: "Pipeline" },
  { id: "story", label: "How it came together" },
  { id: "accuracy", label: "Accuracy" },
  { id: "simulation", label: "Simulation" },
  { id: "fabrication", label: "Fabrication" },
  { id: "internals", label: "Under the hood" },
  { id: "literature", label: "Literature" },
  { id: "takeaway", label: "Takeaway" },
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
          Project 02 &middot; June to August 2026
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          5-DOF Autonomous Robotic Arm
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          A robot built to pick up an object at any location in a given 3D
          space, with a 100% ground pick rate and an 80% elevated pick rate,
          running off MATLAB and Python and driving to the serial bus driver.
        </p>
      </div>

      <Reveal className="mt-8">
        <StatCallout
          stats={[
            { value: "100%", label: "Ground pick success", tone: "positive" },
            { value: "80%", label: "Elevated pick success (8/10)" },
            { value: "3D", label: "Picks anywhere it can reach" },
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
            The three clips below are sample points and not the limit of where
            the arm can reach. The two pose system solves for a target anywhere
            inside the arm&apos;s reachable volume, at any height, without
            being told how high the object is sitting. Off-height picks lean on
            that solved depth instead of a known table plane, and that is where
            the gap between 100% and 80% comes from. Each trial pairs the
            physical arm with the OpenCV detection view from the same run.
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
            The descent moves in slow jogs on purpose. It gave us a safety
            margin against an encoder seam runaway, and the camera needed a
            close to stationary frame for OpenCV to resolve the brick without
            motion blur. Clips are sped up 2.5&times; for viewing.
          </p>
        </section>
      </Reveal>

      {/* Signal flow: what actually happens per descent step */}
      <Reveal>
        <section id="signals" className="mt-16">
          <SectionLabel
            n="02"
            title="What fires on every step of the descent"
            Icon={Broadcast}
          />
          <p className="mt-2 max-w-3xl text-sm text-muted">
            The descent is not one command. It is a loop that re-measures,
            re-solves and re-commands about every eight millimetres of travel,
            and this is the chain that runs each time.
          </p>

          <div className="mt-6 space-y-3">
            <SignalStep
              n="01"
              title="The camera finds the brick and we shorten the error vector"
              body={
                <>
                  OpenCV segments the brick by colour and scores its studs and
                  contour geometry, which gives us a pixel centroid. The loop
                  subtracts that from the aim point to get a 2-D pixel error
                  vector, and then{" "}
                  <strong className="font-medium text-foreground">
                    shortens it
                  </strong>{" "}
                  on purpose. If we commanded the whole correction at once it
                  would overshoot, because the camera is mounted on the wrist,
                  so any move the arm makes changes the same measurement the
                  correction came from. Scaling the vector down to a small step
                  keeps the loop converging instead of oscillating, since every
                  step only moves part of the way and then measures again
                  against a fresh frame.
                </>
              }
            />
            <SignalStep
              n="02"
              title="The pixel step becomes a Cartesian target in the base frame"
              body={
                <>
                  A probe measures the loop&apos;s own gain by jogging a known
                  distance and watching how many pixels the brick moved, which
                  gives us a live mm per pixel scale for whatever posture the
                  arm is in. That turns the shortened pixel vector into
                  millimetres along the arm&apos;s real reach and tangential
                  axes, which we found by perturbing a pitch joint instead of
                  reading them off the CAD frame. What comes out is a target
                  point in the base frame, one small step from where the claw
                  already is.
                </>
              }
            />
            <SignalStep
              n="03"
              title="Python hands the target to MATLAB and MATLAB solves the inverse kinematics"
              body={
                <>
                  The Cartesian target goes over a local TCP socket to a MATLAB
                  server holding the arm&apos;s rigid body tree. MATLAB runs{" "}
                  <span className="font-mono text-foreground">
                    inverseKinematics
                  </span>{" "}
                  seeded from the arm&apos;s current joint angles so it settles
                  on the nearest solution instead of some other legal posture
                  somewhere else in the workspace. A 5-DOF arm has redundant
                  freedom against a 3-DOF position target, so we constrain the
                  solve, holding wrist roll and holding base yaw on radial
                  moves. The angles that come back get checked against measured
                  per joint travel limits and a Cartesian floor guard before
                  anything moves.
                </>
              }
            />
            <SignalStep
              n="04"
              title="Joint angles turn into paced servo commands"
              body={
                <>
                  The angles convert to raw encoder ticks through each
                  joint&apos;s calibrated scale and direction sign, then go out
                  over the serial bus in hops small enough to stay under our
                  travel cap, with a rest in between. We read position back
                  after every hop instead of assuming it arrived, so a stalled
                  or refused joint ends the move instead of getting pushed
                  through, and that pause is what let us stop a wrong move by
                  hand.
                </>
              }
            />
          </div>

          {/* Two-pose depth explanation */}
          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/[0.04] p-5">
            <h3 className="flex items-center gap-2 font-medium text-foreground">
              <Cube size={18} weight="regular" className="text-accent" />
              The 2 pose system, and why we never have to know the height
            </h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                One camera looking at one frame cannot get depth. A single image
                only gives you a <em>ray</em> pointing from the lens toward the
                brick, and every point along that ray lands on the same pixel.
                The usual way around it is to assume the object is sitting on a
                known plane, normally the tabletop, and intersect the ray with
                that plane. It works on the ground and falls apart the moment
                the brick is on top of something, because the claw drives to
                where the table would have been.
              </p>
              <p>
                The 2 pose system takes that assumption out. The arm captures
                the brick from one pose, swings the base tangentially to a
                second pose a known distance away, and captures again. Two rays
                from two known camera positions{" "}
                <strong className="font-medium text-foreground">
                  intersect at one point in space
                </strong>
                , and that intersection is the brick&apos;s actual 3-D position
                with the height included. The arm ends up being its own stereo
                pair, using its own forward kinematics to know how far apart the
                two viewpoints are.
              </p>
              <p>
                Two details had to be right for this to actually work. The move
                has to be <em>tangential</em>, because parallax needs
                translation across the line of sight, and on this arm the base
                yaw is the only joint that gives us that. The three parallel
                pitch joints mostly move the camera along its own view, so they
                are no help here. The baseline also has to be verified instead
                of assumed, because near parallel rays turn one pixel of noise
                into tens of millimetres of depth error. The run reads the joint
                and the FK tip before and after each leg, and refuses to
                triangulate if the arm did not actually travel far enough.
              </p>
              <p className="border-t border-accent/20 pt-3">
                <strong className="font-medium text-foreground">
                  What that buys us:
                </strong>{" "}
                the pick target gets solved instead of assumed, so the arm can
                grab an object sitting anywhere inside its reachable volume, on
                the table, on a book, or on a raised block, without being told
                ahead of time how high it is.
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

      {/* The story, in Shravan's own words */}
      <Reveal>
        <section id="story" className="mt-16">
          <SectionLabel n="04" title="How it came together" />
          <div className="mt-6 max-w-3xl space-y-5 text-sm leading-relaxed text-muted">
            <p>
              The inspiration for this project stemmed from when I had seen
              someone run a robot via machine learning and manual training in
              tandem. As someone who was curious about MATLAB as well, I was
              interested to see if I could capture the same results, running
              purely off of model data and feedback loop simulation.
            </p>
            <p>
              Starting with SolidWorks, I was able to mock up a basic model of a
              5-DOF robot arm with stretched out lever points to include a
              greater reach, while still utilizing a set of 6 STS3215 motors
              from Amazon. While I hadn&apos;t bought the motors at this step, I
              was able to find a rough model online where I was then able to
              dimension out and reverse engineer a model part to use in my
              assembly.
            </p>
            <p>
              After learning how to set up an imported SolidWorks assembly into
              MATLAB, and wiring the power for each joint through trial and
              error in a bug-filled Simulink environment, I was able to run a
              simple demo. From here I took myself through researching
              MATLAB&apos;s built in inverse kinematics functions, and how to
              utilize them for my model. The first framework I put together gave
              me the bones, but it eventually led to a total of 7 different
              bugs: scrambled joint mapping with &ldquo;phantom&rdquo; joints
              driven from misinterpreted mates in SolidWorks, incorrect home
              positions, double-counted joint offsets, incorrect joint
              weighting, a misplaced end effector, incorrect limit setup, and a
              From Workspace compile issue. After spending a month learning
              MATLAB
              and researching how people handled simulation for my kind of
              scenario, I was able to eventually work through the issue, and get
              a basic inverse kinematics model running through Cartesian
              coordinates.
            </p>
            <p>
              At this point, with my university starting back up in just over a
              month, I made the decision to invite my friend Krish Vatsa, who
              was already comfortable with robotics. He then handled the OpenCV
              work we had outlined, while I began cleaning up the MATLAB.
            </p>
            <p>
              Once parts had arrived, knowing that when printing PLA more
              tolerances were needed, I printed a test part with just the fixture
              points, and adjusted my model to get ready to print again. After
              spending a day constructing, we hooked up a live server from
              MATLAB straight into Python, and set up our serial bus driver.
            </p>
            <p>
              From here, Sim and Reality began to diverge. The model&apos;s
              numbers were inverted, so the solver was interpreting the
              incorrect moment arm. One jog moved the claw 30&nbsp;mm where
              the model had predicted 13.8, off by a factor of 2.17. We instead decided to opt for a physical test at different
              points, measuring joint offsets with a ruler.
            </p>
            <p>
              Hand-eye calibration never came together either. Every solve we
              ran put the camera 80 to 100&nbsp;mm from the wrist, against the
              24&nbsp;mm we measured by hand. We stopped trying to trust an
              absolute camera-to-wrist transform and built the detection
              framework around relative corrections instead. That included a self updating and
              correcting vector-shortening model, at the reference of some
              literature Krish was able to find.
            </p>
            <p>
              After weeks of trial and error with systems breaking down, motors
              jumping 180 degrees past limits, torque disabling, and adrenaline
              filled power cuts, we brought our held-out error down from the CAD
              model&apos;s 73.1&nbsp;mm to 6&nbsp;mm, which at the ground pick
              level left us with still a 100% success rate. Working with a 2
              pose system, we were able to achieve an 80% success rate off an
              elevated surface, working with just 1 camera mounted to dictate
              height.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Accuracy: the headline result, visualized */}
      <Reveal>
        <section id="accuracy" className="mt-16">
          <SectionLabel n="05" title="What the rebuild bought" />
          <p className="mt-2 max-w-2xl text-sm text-muted">
            This was the biggest single change we made, measured against touch
            points the model was never fitted to in the first place.
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
            Before any hardware was involved, I used the Simscape Multibody
            model imported from the SolidWorks assembly to check the inverse
            kinematics against target poses in simulation. Everything was
            solved in MATLAB and checked against a mesh view of the arm before
            a single part got printed.
          </p>
          <div className="mt-4 max-w-xl">
            <VideoSlot
              src="/media/robot-arm/simscape-demo.mp4"
              poster="/media/posters/simscape.jpg"
              label="Simscape Multibody, early IK validation"
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
            I modelled the arm in SolidWorks around the servos themselves. I
            found the motor dimensions online and reverse engineered them into a
            reference to build the housings and connectors against. Once the
            kinematics checked out, I sliced and printed the segments on a
            Creality Ender, then we assembled and wired everything against that
            reference on the bench.
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
              body="A software freeze is the first thing we reach for instead of the power cut, since it holds torque and stops motion without dropping the arm. Travel limits are measured per joint instead of assumed, and the paced stepping leaves a rest between hops so we can catch a bad move by hand."
            />
            <UnderTheHoodCard
              title="Closed-loop control"
              body="Wrist roll, and base yaw on radial moves, get locked out of the freedom the solver would otherwise spend on them. A pan budget lets tangential base yaw moves use the angle their geometry actually needs, while still capping the radial ones that were only wasting it."
            />
            <UnderTheHoodCard
              title="Frame handling"
              body="The Simscape import gives you a base frame that is upside down compared to the physical robot. We handle that once at the MATLAB client seam so the rest of the code only ever speaks the physical frame."
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
            We did not improvise the hand-eye calibration or the kinematic
            identification work. Each diagnostic came out of an established
            result, so here is what we read and what it changed in the code.
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

      {/* What I took away */}
      <Reveal>
        <section id="takeaway" className="mt-16">
          <SectionLabel n="10" title="What I took away" />
          <div className="mt-6 max-w-3xl space-y-5 text-sm leading-relaxed text-muted">
            <p>
              This project taught me a lot about the importance of not only
              having the end to end vision early on, but to also be flexible to
              work within that vision. Making decisions to scrap certain
              features, and rewrite frameworks, especially in an era of AI
              integration is becoming increasingly more important. I used Claude
              Code to scaffold both the MATLAB framework and the detection
              framework, and this project really taught us how to work
              effectively with AI where it was needed, and work things from
              scratch without the reliance of AI when we had to.
            </p>
            <p>
              I&apos;m looking forward to continue my research in the
              applications of simulation at my sophomore year at Georgia Tech,
              and excited to see where my career will take me.
            </p>
          </div>
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
            , who handled the OpenCV work we had outlined and found the
            literature behind the vector-shortening model, while I cleaned up
            the MATLAB. Calibration, fabrication, and closed-loop control were
            done together, and integrating the three systems was the hardest
            and longest part of the project.
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

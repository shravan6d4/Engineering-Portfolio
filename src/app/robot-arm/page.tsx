import type { Metadata } from "next";
import {
  Camera,
  Cpu,
  Broadcast,
  Robot,
  ArrowRight,
  ArrowSquareOut,
  GithubLogo,
  Printer,
  Cube,
  Books,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react/dist/lib/types";
import HeightDemo from "@/components/HeightDemo";
import StatCallout from "@/components/StatCallout";
import Glance from "@/components/Glance";
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

const glance = [
  {
    label: "Goal",
    text: "The inspiration for this project stemmed from when I had seen someone run a robot via machine learning and manual training in tandem. I was interested to see if I could capture the same results, running purely off of model data and feedback loop simulation.",
  },
  {
    label: "How",
    text: "The two pose system solves for a target anywhere inside the arm's reachable volume, at any height, without being told how high the object is sitting.",
  },
  {
    label: "Result",
    text: "We brought our held-out error down from the CAD model's 73.1 mm to 6 mm, which at the ground pick level left us with still a 100% success rate.",
  },
  {
    label: "Open",
    text: "Hand-eye calibration never came together. Every solve we ran put the camera 80 to 100 mm from the wrist, against the 24 mm we measured by hand.",
  },
];

const pipeline = [
  { step: "Camera", detail: "OpenCV brick detection, 2 pose vectors", Icon: Camera },
  { step: "MATLAB / Simscape", detail: "Inverse kinematics over the surveyed chain", Icon: Cpu },
  { step: "Serial bus", detail: "Paced, safety-capped servo commands", Icon: Broadcast },
  { step: "Physical arm", detail: "Closed-loop visual servo descent", Icon: Robot },
];

const signalSteps = [
  "The camera finds the brick and we shorten the error vector",
  "The pixel step becomes a Cartesian target in the base frame",
  "Python hands the target to MATLAB and MATLAB solves the inverse kinematics",
  "Joint angles turn into paced servo commands",
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
  "H. H. Chen, “A screw motion approach to uniqueness analysis of head-eye geometry,” CVPR, 1991.",
  "Y. Sun and J. M. Hollerbach, “Observability index selection for robot calibration,” IEEE ICRA, 2008.",
  "F. C. Park and B. J. Martin, “Robot sensor calibration: solving AX = XB on the Euclidean group,” IEEE Transactions on Robotics and Automation, 10(5), 1994.",
  "V. V. Fedorov, Theory of Optimal Experiments, Academic Press, 1972 (Fedorov exchange algorithm).",
  "H. Zhuang, S. H. Motaghedi, and Z. S. Roth, “Robot calibration with planar constraints,” IEEE ICRA, 1999.",
  "R. Y. Tsai and R. K. Lenz, “A new technique for fully autonomous and efficient 3D robotics hand/eye calibration,” IEEE Transactions on Robotics and Automation, 5(3), 1989.",
];

const pageSections = [
  { id: "results", label: "Results" },
  { id: "signals", label: "Signal flow" },
  { id: "two-pose", label: "2 pose system" },
  { id: "accuracy", label: "Accuracy" },
  { id: "simulation", label: "Simulation" },
  { id: "fabrication", label: "Fabrication" },
  { id: "literature", label: "Literature" },
  { id: "takeaway", label: "Takeaway" },
];

const lead = "mt-2 max-w-2xl text-sm leading-relaxed text-muted";

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

      <Glance items={glance} />

      {/* Results / Demo */}
      <Reveal>
        <section id="results" className="mt-16">
          <SectionLabel n="01" title="Results" />
          <p className={lead}>
            The three clips below are sample points and not the limit of where
            the arm can reach.
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
            The descent moves in slow jogs on purpose. Clips are sped up
            9&times; for viewing.
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
          <p className={lead}>
            The descent is not one command. It is a loop that re-measures,
            re-solves and re-commands about every eight millimetres of travel.
          </p>
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
          <ol className="mt-4 space-y-2">
            {signalSteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-foreground">
                <span className="font-mono tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      {/* Two-pose depth */}
      <Reveal>
        <section id="two-pose" className="mt-16">
          <div className="max-w-3xl rounded-xl border border-accent/30 bg-accent/[0.04] p-5">
            <h2 className="flex items-center gap-2 font-medium text-foreground">
              <Cube size={18} weight="regular" className="text-accent" />
              The 2 pose system, and why we never have to know the height
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              One camera looking at one frame cannot get depth. Two rays from
              two known camera positions{" "}
              <strong className="font-medium text-foreground">
                intersect at one point in space
              </strong>
              , and that intersection is the brick&apos;s actual 3-D position
              with the height included. The arm ends up being its own stereo
              pair, using its own forward kinematics to know how far apart the
              two viewpoints are.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Accuracy: the headline result, visualized */}
      <Reveal>
        <section id="accuracy" className="mt-16">
          <SectionLabel n="03" title="What the rebuild bought" />
          <p className={lead}>
            One jog moved the claw 30&nbsp;mm where the model had predicted
            13.8, off by a factor of 2.17. We instead decided to opt for a
            physical test at different points, measuring joint offsets with a
            ruler.
          </p>
          <div className="mt-6 max-w-2xl">
            <ErrorComparison />
          </div>
        </section>
      </Reveal>

      {/* Simulation validation */}
      <Reveal>
        <section id="simulation" className="mt-16">
          <SectionLabel n="04" title="Simulation validation" />
          <p className={lead}>
            Everything was solved in MATLAB and checked against a mesh view of
            the arm before a single part got printed.
          </p>
          <div className="mt-4 max-w-xl">
            <VideoSlot
              src="/media/robot-arm/simscape-demo.mp4"
              poster="/media/posters/simscape.jpg"
              label="Simscape Multibody, early IK validation, 9× speed"
              playbackRate={9}
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
          <SectionLabel n="05" title="Fabrication & build" Icon={Printer} />
          <p className={lead}>
            I modelled the arm in SolidWorks around the servos themselves.
          </p>
          <div className="mt-6">
            <Gallery images={buildGallery} />
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
          <SectionLabel n="06" title="Literature referenced" Icon={Books} />
          <p className={lead}>
            We did not improvise the hand-eye calibration or the kinematic
            identification work.
          </p>
          <ol className="mt-4 max-w-3xl space-y-2">
            {literature.map((cite, i) => (
              <li key={cite} className="flex gap-3 text-sm text-muted">
                <span className="font-mono tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {cite}
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      {/* What I took away */}
      <Reveal>
        <section id="takeaway" className="mt-16">
          <SectionLabel n="07" title="What I took away" />
          <p className={lead}>
            This project taught me a lot about the importance of not only
            having the end to end vision early on, but to also be flexible to
            work within that vision. I used Claude Code to scaffold both the
            MATLAB framework and the detection framework, and this project
            really taught us how to work effectively with AI where it was
            needed, and work things from scratch without the reliance of AI
            when we had to.
          </p>
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

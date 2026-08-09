import type { Metadata } from "next";
import { FilePdf, EnvelopeSimple, LinkedinLogo, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Shravan Kumar",
};

const coursework = [
  "Heat Transfer",
  "Fluid Dynamics",
  "Thermodynamics",
  "Mechanics (Full)",
];

const skills = [
  "SolidWorks",
  "Autodesk Inventor",
  "Simulink (MATLAB)",
  "Ansys / FEA",
  "Python",
  "React.js",
  "HTML / CSS",
];

const contacts = [
  { label: "skumar803@gatech.edu", href: "mailto:skumar803@gatech.edu", Icon: EnvelopeSimple },
  { label: "LinkedIn", href: "https://linkedin.com/in/shravanmkumar", Icon: LinkedinLogo },
  { label: "GitHub", href: "https://github.com/shravan6d4", Icon: GithubLogo },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        About
      </h1>
      <div className="mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
        <p>
          I&apos;m a mechanical engineering student at Georgia Tech, working
          toward propulsion.
        </p>
      </div>

      <Reveal>
        {/* Resume download intentionally disabled until the PDF is updated. */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Resume is being updated"
          className="mt-6 inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm text-muted opacity-60"
        >
          <FilePdf size={16} weight="regular" />
          Resume &mdash; updating
        </button>
      </Reveal>

      <Reveal>
        <section className="mt-14">
          <h2 className="text-lg font-semibold tracking-tight">Coursework</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {coursework.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
          <ul className="mt-3 space-y-2">
            {contacts.map(({ label, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
                >
                  <Icon size={16} weight="regular" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  );
}

# Engineering Portfolio — Shravan Kumar

Source for **[shravan-kumar.com](https://shravan-kumar.com)**, an engineering
portfolio covering three projects: a vision-guided 5-DOF robotic arm, a
reverse-engineered V6 engine CAD assembly, and a nuclear fusion research paper.

## Projects on the site

| Project | Summary |
| --- | --- |
| **5-DOF Autonomous Robotic Arm** | SolidWorks → Simscape Multibody → OpenCV → closed-loop servo control, running on real hardware. Includes the per-step signal flow, the two-pose depth method that lets it pick at any height, and the failure narrative behind a 73.1 mm → 6.0 mm kinematic accuracy fix. |
| **Mitsubishi 6G72 V6 — CAD Assembly** | A fully mated, motion-validated V6 SOHC engine reverse-engineered from part drawings, with an interactive walkthrough of how rotation propagates from pistons to valve train. |
| **Nuclear Fusion — A Quantitative Survey** | Co-authored research paper on magnetic and inertial confinement fusion. |

## Stack

- **Next.js 16** (App Router) with a fully static export — `output: "export"`
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP** for scroll-triggered reveals, **Phosphor** for icons
- **Fira Sans / Fira Code** — a monospace accent carries stats, specs and captions

No database, no API routes, no server runtime: every route is prerendered to
static HTML.

## Local development

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build      # static export -> ./out
npm run lint
```

## Notable implementation details

- **`trailingSlash: true`** so each route emits `<route>/index.html` rather than
  a flat `<route>.html`. Extensionless URLs then resolve on any static host
  without relying on host-specific `.html` fallback behaviour.
- **Videos use `preload="none"` with generated poster frames.** Initial page
  load transfers ~128 KB and zero video bytes; footage is fetched only when a
  viewer presses play.
- **Animated stats degrade safely.** The real value is rendered into the static
  HTML and the count-up is layered on top, so a stat can never get stuck
  displaying `0%` if JavaScript, `IntersectionObserver`, or `requestAnimationFrame`
  is unavailable or throttled.
- **`staticwebapp.config.json`** sets 404 handling, immutable cache headers for
  `/media` and `/_next/static`, and explicit MIME types for `.mp4` / `.pdf`.
- Motion respects `prefers-reduced-motion`; the gallery lightbox supports
  keyboard and swipe navigation.

## Deployment

Hosted on **Azure Static Web Apps** (Free plan). Pushing to `main` triggers
[the workflow](.github/workflows/azure-static-web-apps-witty-grass-03f773e10.yml),
which builds the export in CI and uploads `out/` with `skip_app_build: true`.

Building in CI rather than letting Azure's Oryx builder run is deliberate: Oryx
auto-detects Next.js and attempts a hybrid/SSR deployment, which requires the
paid Standard plan. This project only needs static hosting.

## Credits

The robotic arm was built with [Krish Vatsa](https://github.com/shravan6d4/5-DOF-CV-Robot-Arm),
who built and validated the OpenCV detection pipeline; the fusion paper was
co-authored with Ryan Kang. Fusion page imagery is public domain (NASA/SDO and
U.S. Department of Energy) and credited on the page.

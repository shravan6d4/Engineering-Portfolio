"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/lox-manifold", label: "LOx Manifold" },
  { href: "/robot-arm", label: "Robot Arm" },
  { href: "/v6-engine", label: "V6 Engine" },
  { href: "/fusion-paper", label: "Fusion Paper" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-background/90 backdrop-blur transition-all duration-200 supports-[backdrop-filter]:bg-background/70 ${
        condensed ? "border-border" : "border-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-200 sm:px-6 ${
          condensed ? "py-2.5" : "py-4"
        }`}
      >
        <Link
          href="/"
          className="mr-2 shrink-0 whitespace-nowrap font-mono text-sm font-medium tracking-tight text-foreground transition-colors hover:text-accent"
        >
          Shravan Kumar
        </Link>
        <ul className="no-scrollbar -mx-1 flex min-w-0 items-center gap-0.5 overflow-x-auto px-1 sm:gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex items-center whitespace-nowrap rounded-md px-2 py-2 text-[13px] transition-colors sm:px-3 sm:text-sm ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent sm:inset-x-3" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

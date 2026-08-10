const links = [
  { href: "mailto:skumar803@gatech.edu", label: "skumar803@gatech.edu" },
  { href: "https://linkedin.com/in/shravanmkumar", label: "LinkedIn" },
  { href: "https://github.com/shravan6d4", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs text-muted">
          Shravan Kumar &middot; Mechanical Engineering, Georgia Tech
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="font-mono text-xs text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

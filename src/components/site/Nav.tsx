import { useEffect, useState } from "react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Network", href: "#journey" },
  { label: "Track Shipment", href: "#track" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "glass" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="display text-lg tracking-[0.28em] text-white">
          Skylink
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="eyebrow text-[0.65rem] text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="#quote"
            className="hidden border border-white/25 px-6 py-3 eyebrow text-[0.62rem] text-white transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground md:inline-block"
          >
            Request a Quote
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-white transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-white transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col justify-center bg-navy-deep/97 px-8 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="space-y-6">
          {[...LINKS, { label: "Request a Quote", href: "#quote" }].map((link, i) => (
            <li
              key={link.href + link.label}
              style={{ transitionDelay: `${open ? 90 + i * 60 : 0}ms` }}
              className={`transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="display block text-[clamp(2rem,10vw,3.4rem)] text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

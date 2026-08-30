import { useState } from "react";
import { faqs } from "@/lib/company";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-background px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div data-reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">Common questions</h2>
        </div>

        <div data-reveal className="border-t border-white/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-b border-white/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-8 py-7 text-left"
                  >
                    <span className="text-base normal-case tracking-normal text-foreground md:text-lg">
                      {faq.q}
                    </span>
                    <span
                      className={`shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-500 ${
                    isOpen ? "grid-rows-[1fr] pb-7 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

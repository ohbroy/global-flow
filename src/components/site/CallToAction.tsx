export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-navy-deep px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 70% at 80% 20%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
        }}
      />
      <div data-reveal className="relative mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Ready when you are</span>
          <h2 className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5rem)]">
            Let&apos;s move your next shipment
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="#quote"
            className="border border-primary bg-primary px-8 py-4 eyebrow text-[0.62rem] text-primary-foreground transition-opacity hover:opacity-85"
          >
            Request a Quote
          </a>
          <a
            href="#track"
            className="border border-white/25 px-8 py-4 eyebrow text-[0.62rem] text-white transition-colors hover:border-white"
          >
            Track a Shipment
          </a>
        </div>
      </div>
    </section>
  );
}

import { process } from "@/lib/company";

export function Process() {
  return (
    <section id="process" className="relative bg-background px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto max-w-[1400px]">
        <div data-reveal className="max-w-3xl">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">From enquiry to delivery</h2>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:mt-24 md:grid-cols-5">
          {process.map((item) => (
            <li key={item.step} data-reveal className="group bg-background p-8 transition-colors hover:bg-navy">
              <span className="eyebrow text-[0.6rem] text-primary">{item.step}</span>
              <h3 className="mt-6 text-lg leading-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { industries, valueProps } from "@/lib/company";
import cargoHold from "@/assets/cargo-hold.jpg";

export function WhyUs() {
  return (
    <section id="why" className="relative bg-navy px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <div data-reveal>
              <span className="eyebrow">Why Skylink</span>
              <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">
                <span className="block">Built around</span>
                <span className="block text-primary">the shipment.</span>
              </h2>
            </div>

            <dl className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {valueProps.map((prop) => (
                <div key={prop.title} data-reveal className="bg-navy p-8">
                  <dt className="text-base">{prop.title}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {prop.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className="flex flex-col gap-10">
            <div className="overflow-hidden">
              <img
                src={cargoHold}
                alt="Secured pallets and cargo nets inside the hold of a freighter aircraft"
                width={1600}
                height={1008}
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover md:h-96"
              />
            </div>
            <div>
              <span className="eyebrow text-[0.6rem]">Industries served</span>
              <ul className="mt-6 flex flex-wrap gap-3">
                {industries.map((industry) => (
                  <li
                    key={industry}
                    className="border border-white/15 px-4 py-2 text-xs text-white/75"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

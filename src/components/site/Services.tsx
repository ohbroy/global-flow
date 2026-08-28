import { company } from "@/lib/company";
import svcAir from "@/assets/svc-air.jpg";
import svcSea from "@/assets/svc-sea.jpg";
import svcWarehouse from "@/assets/svc-warehouse.jpg";

const IMAGES: Record<string, string> = {
  air: svcAir,
  sea: svcSea,
  warehouse: svcWarehouse,
};

const ALTS: Record<string, string> = {
  air: "Ground crew loading pallets into a freighter aircraft at dawn",
  sea: "Rows of stacked shipping containers at a terminal",
  warehouse: "Warehouse aisle with racked pallets and a worker checking stock",
};

export function Services() {
  return (
    <section id="services" className="relative bg-navy px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto max-w-[1400px]">
        <div data-reveal className="max-w-3xl">
          <span className="eyebrow">Services</span>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">What we move</h2>
        </div>

        <div className="mt-16 md:mt-24">
          {company.services.map((service) => {
            const image = IMAGES[service.id];
            return (
              <article
                key={service.id}
                data-reveal
                className="group grid items-start gap-6 border-t border-white/10 py-10 md:grid-cols-[7rem_1fr_1.1fr] md:gap-12 md:py-14"
              >
                <span className="eyebrow pt-2 text-[0.62rem] text-primary">{service.index}</span>

                <h3 className="text-[clamp(1.8rem,4.4vw,3.2rem)] transition-transform duration-500 md:group-hover:translate-x-3">
                  {service.title}
                </h3>

                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  {image && (
                    <div className="h-40 w-full shrink-0 overflow-hidden md:h-32 md:w-44">
                      <img
                        src={image}
                        alt={ALTS[service.id]}
                        width={1200}
                        height={1500}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
          <div className="border-t border-white/10" />
        </div>

        <p data-reveal className="mt-10 max-w-2xl text-xs text-muted-foreground">
          Editable: keep only the services Skylink actually offers. Remove any entry in
          <code className="mx-1 text-white/70">src/lib/company.ts</code> that does not apply.
        </p>
      </div>
    </section>
  );
}

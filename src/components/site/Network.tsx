import { Globe, HUBS } from "@/components/journey/Globe";

export function Network() {
  return (
    <section id="network" className="relative bg-navy-deep px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div data-reveal>
          <span className="eyebrow">Global Network</span>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">
            <span className="block">Spin the</span>
            <span className="block text-primary">world.</span>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Drag the globe to explore the trade lanes we plan around — air corridors, ocean
            services and inland links. Hover a node to name the hub, or use the arrow keys.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            {HUBS.map((hub) => (
              <li key={hub.id} className="eyebrow text-[0.6rem] text-white/55">
                {hub.label}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-md text-xs text-muted-foreground">
            Editable: hub list lives in
            <code className="mx-1 text-white/70">src/components/journey/Globe.tsx</code>. Keep only
            the lanes Skylink actually serves.
          </p>
        </div>

        <div data-reveal className="mx-auto w-full max-w-[560px]">
          <Globe />
        </div>
      </div>
    </section>
  );
}

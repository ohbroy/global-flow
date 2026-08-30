import { stats } from "@/lib/company";

export function Stats() {
  return (
    <section className="border-y border-white/10 bg-background px-6 py-16 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} data-reveal>
            <span
              className={`display block text-[clamp(2.4rem,5vw,4rem)] ${
                stat.value.provided ? "text-primary" : "text-white/25"
              }`}
            >
              {stat.value.value}
            </span>
            <span className="eyebrow mt-3 block text-[0.6rem] text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

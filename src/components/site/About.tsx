import { company, type Editable } from "@/lib/company";

function Field({ field }: { field: Editable }) {
  if (field.provided) return <span>{field.value}</span>;
  return (
    <span className="inline-block border-b border-dashed border-primary/60 text-muted-foreground italic">
      {field.value}
    </span>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative bg-background px-6 py-28 md:px-16 md:py-40 lg:px-24"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div data-reveal>
          <span className="eyebrow">About {company.shortName}</span>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">
            <span className="block">Moving cargo.</span>
            <span className="block text-primary">Connecting business.</span>
          </h2>
        </div>

        <div data-reveal className="space-y-8 text-base leading-relaxed text-foreground/85">
          <p>
            <Field field={company.about.intro} />
          </p>
          <p>
            <Field field={company.about.detail} />
          </p>
          <p className="text-xs text-muted-foreground">
            Dashed text marks an editable placeholder. No claims, certifications, offices, fleet
            figures or statistics have been invented — supply the real copy in
            <code className="mx-1 text-white/70">src/lib/company.ts</code> and set
            <code className="mx-1 text-white/70">provided: true</code>.
          </p>
        </div>
      </div>
    </section>
  );
}

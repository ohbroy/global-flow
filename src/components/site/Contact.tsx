import { company, type Editable } from "@/lib/company";

const ROWS: { label: string; field: Editable }[] = [
  { label: "Address", field: company.contact.address },
  { label: "Telephone", field: company.contact.phone },
  { label: "Email", field: company.contact.email },
  { label: "Hours", field: company.contact.hours },
];

export function Contact() {
  return (
    <section id="contact" className="relative bg-navy px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto max-w-[1400px]">
        <div data-reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">Contact {company.shortName}</h2>
        </div>

        <dl className="mt-16 grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {ROWS.map((row) => (
            <div key={row.label} data-reveal className="border-t border-white/10 pt-6">
              <dt className="eyebrow text-[0.6rem]">{row.label}</dt>
              <dd
                className={`mt-3 text-base ${
                  row.field.provided
                    ? "text-foreground"
                    : "border-b border-dashed border-primary/60 pb-1 text-muted-foreground italic"
                }`}
              >
                {row.field.value}
              </dd>
            </div>
          ))}
        </dl>

        <p data-reveal className="mt-10 max-w-2xl text-xs text-muted-foreground">
          Only verified company information is published here. Addresses, phone numbers, email
          addresses, offices and social accounts remain empty until Skylink supplies them.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep px-6 py-14 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <span className="display text-lg tracking-[0.28em]">Skylink</span>
        <span className="eyebrow text-[0.58rem] text-white/45">
          Global logistics · Air · Sea · Land
        </span>
        <span className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {company.name}
        </span>
      </div>
    </footer>
  );
}

import { useState, type FormEvent } from "react";

const FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "company", label: "Company", type: "text", required: false },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: false },
  { name: "origin", label: "Origin", type: "text", required: true },
  { name: "destination", label: "Destination", type: "text", required: true },
  { name: "cargoType", label: "Cargo Type", type: "text", required: true },
  { name: "cargoWeight", label: "Cargo Weight", type: "text", required: false },
] as const;

export function Quote() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Wire this to Skylink's inbox or CRM endpoint when it is available.
    setSubmitted(true);
  }

  return (
    <section id="quote" className="relative bg-background px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto max-w-[1400px]">
        <div data-reveal className="max-w-2xl">
          <span className="eyebrow">Enquiry</span>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">Request a quote</h2>
          <p className="mt-6 text-sm text-muted-foreground">
            Tell us what needs to move and where it needs to be. A member of the Skylink team will
            respond with routing options and pricing.
          </p>
        </div>

        {submitted ? (
          <div data-reveal className="glass mt-14 p-10">
            <h3 className="text-2xl">Request captured</h3>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground">
              This form is not yet connected to a mailbox or CRM. Connect an endpoint to deliver
              submissions to the Skylink team — the fields are already structured for it.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-8 border border-white/25 px-7 py-3 eyebrow text-[0.62rem] transition-colors hover:border-primary"
            >
              Send another
            </button>
          </div>
        ) : (
          <form data-reveal onSubmit={onSubmit} className="mt-14 grid gap-x-14 gap-y-9 md:grid-cols-2">
            {FIELDS.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="eyebrow block text-[0.6rem]">
                  {field.label}
                  {field.required && <span className="text-primary"> *</span>}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  className="field focus:field-focus mt-2"
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label htmlFor="message" className="eyebrow block text-[0.6rem]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="field focus:field-focus mt-2 resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-primary px-10 py-4 eyebrow text-[0.62rem] text-primary-foreground transition-opacity hover:opacity-85"
              >
                Request quote
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

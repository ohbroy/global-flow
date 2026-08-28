import { useState, type FormEvent } from "react";
import { isValidReference, lookupShipment, type TrackingResult } from "@/lib/tracking";

export function Tracking() {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackingResult | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    if (!isValidReference(reference)) {
      setError("Enter a tracking number of 6–24 letters, numbers or dashes.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      setResult(await lookupShipment(reference));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="track" className="relative bg-navy px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div data-reveal>
          <span className="eyebrow">Shipment Tracking</span>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)]">
            <span className="block">Track your</span>
            <span className="block text-primary">shipment.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm text-muted-foreground">
            Enter the reference from your booking confirmation or bill of lading to retrieve the
            current position of your consignment.
          </p>
        </div>

        <div data-reveal className="glass p-7 md:p-10">
          <form onSubmit={onSubmit} noValidate>
            <label htmlFor="tracking" className="eyebrow block text-[0.62rem]">
              Enter tracking number
            </label>
            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end">
              <input
                id="tracking"
                name="tracking"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="SKL-000000"
                autoComplete="off"
                className="field focus:field-focus flex-1 text-lg tracking-[0.12em] uppercase placeholder:text-white/25"
              />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 bg-primary px-8 py-4 eyebrow text-[0.62rem] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
              >
                {loading ? "Searching…" : "Track shipment →"}
              </button>
            </div>
          </form>

          {error && <p className="mt-5 text-sm text-destructive">{error}</p>}

          {result && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <span className="eyebrow text-[0.6rem]">Reference {result.reference}</span>
              {result.state === "unavailable" && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Live tracking is not connected to this site yet. The interface is ready — once
                  Skylink's tracking system is linked, real shipment status and milestones will
                  appear here. No sample data is shown in the meantime.
                </p>
              )}
              {result.state === "not_found" && (
                <p className="mt-3 text-sm text-muted-foreground">
                  No shipment was found for this reference.
                </p>
              )}
              {result.state === "found" && (
                <ol className="mt-5 space-y-5">
                  {result.events.map((event) => (
                    <li key={event.timestamp + event.location} className="flex gap-5">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm text-foreground">{event.status}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.location} · {event.timestamp}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

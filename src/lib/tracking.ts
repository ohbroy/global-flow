/**
 * Tracking data access layer.
 *
 * No shipment data is invented here. Until Skylink's tracking API or database
 * is connected, `lookupShipment` reports that the service is not connected and
 * the UI says so plainly. To go live, replace the body of `lookupShipment`
 * with the real request and return a `found` / `not_found` result.
 */

export type TrackingEvent = {
  timestamp: string;
  location: string;
  status: string;
};

export type TrackingResult =
  | { state: "found"; reference: string; status: string; events: TrackingEvent[] }
  | { state: "not_found"; reference: string }
  | { state: "unavailable"; reference: string };

export function isValidReference(reference: string) {
  return /^[A-Za-z0-9-]{6,24}$/.test(reference.trim());
}

export async function lookupShipment(reference: string): Promise<TrackingResult> {
  const ref = reference.trim().toUpperCase();

  // Connect the live tracking endpoint here, e.g.
  // const res = await fetch(`/api/public/tracking/${encodeURIComponent(ref)}`)
  // and map the payload onto TrackingResult.
  await new Promise((resolve) => setTimeout(resolve, 650));

  return { state: "unavailable", reference: ref };
}

/**
 * Single source of truth for company-supplied content.
 *
 * Anything marked `provided: false` is an editable placeholder: it is rendered
 * on the site with a visible "to be supplied" treatment instead of invented
 * copy. Replace the value and flip `provided` to true once the company
 * confirms the real information.
 */

export type Editable = {
  value: string;
  provided: boolean;
};

const placeholder = (hint: string): Editable => ({ value: hint, provided: false });

export const company = {
  name: "Skylink Global",
  shortName: "Skylink",
  about: {
    intro: placeholder("Company description to be supplied by Skylink Global."),
    detail: placeholder(
      "Additional background — history, ownership, operating model — to be supplied.",
    ),
  },
  contact: {
    address: placeholder("Registered address to be supplied"),
    phone: placeholder("Telephone number to be supplied"),
    email: placeholder("Email address to be supplied"),
    hours: placeholder("Operating hours to be supplied"),
  },
  /** Only services confirmed by the company should stay enabled here. */
  services: [
    {
      id: "air",
      index: "01",
      title: "Air Freight",
      description:
        "Time-critical consignments moved by scheduled and charter air capacity, with documentation and customs handled end to end.",
    },
    {
      id: "sea",
      index: "02",
      title: "Sea Freight",
      description:
        "Full container, part container and breakbulk movements across ocean trade lanes, planned around your sailing schedules.",
    },
    {
      id: "land",
      index: "03",
      title: "Land Transport",
      description:
        "Road haulage between ports, terminals and distribution centres, including container drayage and long-haul trunking.",
    },
    {
      id: "handling",
      index: "04",
      title: "Cargo Handling",
      description:
        "Loading, unloading, transloading and inspection at quayside and terminal, coordinated with port operations.",
    },
    {
      id: "warehouse",
      index: "05",
      title: "Warehousing",
      description:
        "Short and long term storage, pallet management, pick and pack, and dispatch from distribution facilities.",
    },
    {
      id: "global",
      index: "06",
      title: "Global Logistics",
      description:
        "Multimodal programmes managed as one shipment file, from origin collection to final delivery.",
    },
  ],
} as const;

/**
 * Headline figures. All left as placeholders — replace with audited numbers
 * before publishing, then set `provided: true`.
 */
export const stats: { label: string; value: Editable }[] = [
  { label: "Countries served", value: placeholder("—") },
  { label: "Shipments handled / year", value: placeholder("—") },
  { label: "Warehouse space (m²)", value: placeholder("—") },
  { label: "Years in operation", value: placeholder("—") },
];

/** Generic, non-claim operating process. Safe to publish as written. */
export const process = [
  {
    step: "01",
    title: "Enquiry & quotation",
    body: "Share the lane, commodity, weights and timing. We price the movement and confirm feasibility in writing.",
  },
  {
    step: "02",
    title: "Booking & documentation",
    body: "Space is booked with the carrier and export paperwork, customs entries and certificates are prepared.",
  },
  {
    step: "03",
    title: "Collection & consolidation",
    body: "Cargo is collected, checked, labelled and consolidated at origin ready for the departing service.",
  },
  {
    step: "04",
    title: "In-transit monitoring",
    body: "Milestones are tracked from departure to arrival, with exceptions escalated to a named contact.",
  },
  {
    step: "05",
    title: "Clearance & final delivery",
    body: "Import clearance, terminal release, inland haulage and proof of delivery close the shipment file.",
  },
];

export const industries = [
  "Energy & oil field",
  "Manufacturing",
  "Agriculture & commodities",
  "Retail & e-commerce",
  "Pharmaceutical & healthcare",
  "Construction & project cargo",
  "Automotive & spare parts",
  "Government & humanitarian",
];

export const valueProps = [
  {
    title: "One file, every mode",
    body: "Air, ocean and road handled on a single shipment file, so nothing is lost between providers.",
  },
  {
    title: "Named coordinators",
    body: "A person owns your account, not a queue. Escalation paths are agreed before the first booking.",
  },
  {
    title: "Customs-first planning",
    body: "Documentation is prepared alongside the booking, not after it, to avoid demurrage and detention.",
  },
  {
    title: "Transparent pricing",
    body: "Quotations itemise freight, surcharges and local charges so the landed cost is clear up front.",
  },
];

export const faqs = [
  {
    q: "How do I get a quotation?",
    a: "Use the quote form on this page with the origin, destination, commodity, weight and dimensions. The more accurate the cargo detail, the firmer the rate.",
  },
  {
    q: "Can you handle customs clearance?",
    a: "Yes — export and import documentation, entries and duty handling are managed as part of the shipment file where the lane permits.",
  },
  {
    q: "Do you move dangerous or temperature-controlled goods?",
    a: "Special cargo is accepted subject to classification, packing and carrier acceptance. Send the MSDS or temperature spec with your enquiry.",
  },
  {
    q: "How do I track a shipment?",
    a: "Enter your booking or bill of lading reference in the tracking panel. Live milestone data appears once the tracking service is connected.",
  },
  {
    q: "What are your payment terms?",
    a: "Terms are agreed per account before the first booking. Contact the team for the current schedule.",
  },
];

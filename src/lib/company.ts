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

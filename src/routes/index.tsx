import { createFileRoute } from "@tanstack/react-router";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReveal } from "@/hooks/useReveal";
import { Nav } from "@/components/site/Nav";
import { Journey } from "@/components/journey/Journey";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Tracking } from "@/components/site/Tracking";
import { Quote } from "@/components/site/Quote";
import { Contact, Footer } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skylink Global — Air, Sea and Land Freight Logistics" },
      {
        name: "description",
        content:
          "Skylink Global moves cargo by air, sea and road — freight forwarding, port handling, warehousing and shipment tracking across international trade lanes.",
      },
      { property: "og:title", content: "Skylink Global — Air, Sea and Land Freight Logistics" },
      {
        property: "og:description",
        content:
          "Follow a shipment from air to sea, port, road and final delivery. Global freight forwarding, cargo handling and tracking with Skylink Global.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div id="top" className="bg-background">
      <Nav />
      <main>
        <h1 className="sr-only">
          Skylink Global — international air, sea and land freight logistics
        </h1>
        <Journey />
        <div ref={revealRef}>
          <About />
          <Services />
          <Tracking />
          <Quote />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

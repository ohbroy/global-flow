import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import airAircraft from "@/assets/air-aircraft.jpg";
import skyDescent from "@/assets/sky-descent.jpg";
import seaShip from "@/assets/sea-ship.jpg";
import portCranes from "@/assets/port-cranes.jpg";
import landTruck from "@/assets/land-truck.jpg";
import deliveryWarehouse from "@/assets/delivery-warehouse.jpg";
import globeNetwork from "@/assets/globe-network.jpg";
import { RouteOverlay, RouteLabels } from "./RouteOverlay";

type Scene = {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string[];
  body: string[];
  align: "left" | "center";
  /** how strongly the media drifts sideways while its scene is on screen */
  drift: number;
};

const SCENES: Scene[] = [
  {
    id: "air",
    image: airAircraft,
    alt: "Cargo freighter aircraft flying above a sea of clouds at golden hour",
    eyebrow: "01 / Air Freight",
    title: ["Your cargo.", "In motion."],
    body: ["Every shipment begins in the air.", "Lifted, tracked, and kept moving."],
    align: "center",
    drift: -3,
  },
  {
    id: "sky",
    image: skyDescent,
    alt: "View descending through thinning clouds toward the ocean far below",
    eyebrow: "Descending",
    title: ["Through", "the sky."],
    body: ["The cloud deck opens.", "The horizon returns. The ocean rises to meet us."],
    align: "center",
    drift: 0,
  },
  {
    id: "sea",
    image: seaShip,
    alt: "Container ship loaded with stacked shipping containers crossing the open ocean",
    eyebrow: "02 / Ocean Freight",
    title: ["Across", "the world."],
    body: ["Moving cargo across oceans.", "Connecting markets. Connecting people."],
    align: "left",
    drift: -7,
  },
  {
    id: "port",
    image: portCranes,
    alt: "Gantry cranes unloading a container ship at a busy port terminal at blue hour",
    eyebrow: "03 / Port Operations",
    title: ["From", "sea to land."],
    body: ["Efficient cargo handling.", "Reliable movement. Global connections."],
    align: "left",
    drift: 5,
  },
  {
    id: "land",
    image: landTruck,
    alt: "Container truck travelling along a highway at dusk",
    eyebrow: "04 / Land Transport",
    title: ["The journey", "continues."],
    body: [
      "From ports to distribution centres.",
      "From distribution centres to your destination.",
    ],
    align: "left",
    drift: -6,
  },
  {
    id: "delivery",
    image: deliveryWarehouse,
    alt: "Warehouse workers loading pallets into a delivery truck at a loading dock",
    eyebrow: "05 / Delivery",
    title: ["Your cargo", "moves with us."],
    body: ["Freight, pallets and packages handled to the final door.", "Nothing stands still."],
    align: "left",
    drift: 4,
  },
  {
    id: "network",
    image: globeNetwork,
    alt: "Satellite view of Earth at night showing Africa, Europe and Asia lit by city lights",
    eyebrow: "Global Network",
    title: ["Connected", "everywhere."],
    body: ["From Africa to destinations around the world."],
    align: "left",
    drift: 0,
  },
];

export function Journey() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]");
      const medias = gsap.utils.toArray<HTMLElement>("[data-media]");
      const contents = gsap.utils.toArray<HTMLElement>("[data-content]");
      const cue = wrap.querySelector<HTMLElement>("[data-cue]");

      gsap.set(layers, { opacity: (i: number) => (i === 0 ? 1 : 0) });
      gsap.set(contents.slice(1), { opacity: 0, y: 70 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Total timeline length = number of scenes; each scene owns one unit and
      // overlaps its neighbours so nothing ever reads as a separate page.
      SCENES.forEach((scene, i) => {
        const layer = layers[i];
        const media = medias[i];
        const content = contents[i];
        const at = (t: number) => Math.max(0, t);

        if (i > 0) {
          tl.to(layer, { opacity: 1, duration: 0.5 }, at(i - 0.5));
          tl.to(layers[i - 1], { opacity: 0, duration: 0.35 }, at(i - 0.3));
        }

        // camera-like move: push in while arriving, drift + pull away while leaving
        tl.fromTo(
          media,
          { scale: 1.32, xPercent: -scene.drift, yPercent: 4, filter: "blur(8px)" },
          {
            scale: 1.04,
            xPercent: scene.drift,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 1.3,
            immediateRender: i === 0,
          },
          at(i - 0.55),
        );
        tl.to(
          media,
          { scale: 1.22, yPercent: -5, filter: "blur(7px)", duration: 0.55 },
          at(i + 0.5),
        );

        // text enters late and leaves early so it never collides with the cut
        tl.fromTo(
          content,
          { opacity: 0, y: 70 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", immediateRender: i === 0 },
          at(i - 0.2),
        );
        tl.to(content, { opacity: 0, y: -70, duration: 0.3 }, at(i + 0.45));
      });

      if (cue) tl.to(cue, { opacity: 0, y: -20, duration: 0.25 }, 0.05);
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} id="journey" style={{ height: `${SCENES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy-deep">
        {SCENES.map((scene, i) => (
          <section
            key={scene.id}
            data-layer
            aria-label={scene.eyebrow}
            className="absolute inset-0 h-full w-full will-change-[opacity]"
          >
            <div data-media className="absolute inset-0 h-full w-full will-change-transform">
              <img
                src={scene.image}
                alt={scene.alt}
                width={1920}
                height={1088}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "sync" : "async"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="h-full w-full object-cover"
              />
              {scene.id === "network" && (
                <>
                  <RouteOverlay />
                  <RouteLabels />
                </>
              )}
            </div>
            <div className="scene-veil absolute inset-0" />

            <div
              data-content
              className={`absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 ${
                scene.align === "center" ? "items-center text-center" : "items-start text-left"
              }`}
            >
              <span className="eyebrow mb-5 block">{scene.eyebrow}</span>
              <h2 className="text-[clamp(2.6rem,9vw,7.5rem)] text-white">
                {scene.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <div
                className={`mt-6 max-w-md space-y-1 text-sm text-white/70 md:text-base ${
                  scene.align === "center" ? "mx-auto" : ""
                }`}
              >
                {scene.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {i === 0 && (
                <div data-cue className="mt-14 flex flex-col items-center gap-3">
                  <span className="eyebrow">Scroll to begin</span>
                  <span className="block h-14 w-px bg-gradient-to-b from-white/70 to-transparent" />
                </div>
              )}
            </div>
          </section>
        ))}

        {/* hero identity, sits above the film for the opening frames */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
          <span className="eyebrow text-[0.6rem] text-white/45">
            Air · Sea · Port · Land · Delivery
          </span>
        </div>
      </div>
    </div>
  );
}

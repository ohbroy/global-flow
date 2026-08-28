import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-reveal for any container: children marked [data-reveal] rise into view.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 48, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

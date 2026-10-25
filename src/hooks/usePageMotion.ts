import { useEffect } from "react";
import type { RefObject } from "react";

/** Progressive enhancement: content is readable before, during and without motion. */
export function usePageMotion(
  scope: RefObject<HTMLElement | null>,
  route: string,
) {
  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;
    const root = scope.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    if (
      !root.querySelector(
        ".hero-content, [data-reveal], .roadmap-stage, .roadmap-extra",
      )
    )
      return;

    async function enhance() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        revert = () => media.revert();
        media.add(
          "(prefers-reduced-motion: no-preference)",
          () => {
            // Only a few blocks move, without splitting Arabic text or hiding controls.
            const entrance = root!.querySelectorAll<HTMLElement>(
              ".hero-eyebrow, .hero-content h1, .hero-description, .hero-actions, .path-illustration",
            );
            if (entrance.length)
              gsap.fromTo(
                entrance,
                { y: 12, opacity: 0.72 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.055,
                  ease: "power2.out",
                  clearProps: "transform,opacity",
                },
              );
            const blocks = root!.querySelectorAll<HTMLElement>(
              "[data-reveal], .roadmap-stage-heading, .roadmap-extra > h2",
            );
            blocks.forEach((block) => {
              gsap.fromTo(
                block,
                { y: 12, opacity: 0.78 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.42,
                  ease: "power2.out",
                  immediateRender: false,
                  clearProps: "transform,opacity",
                  scrollTrigger: {
                    trigger: block,
                    start: "top 95%",
                    once: true,
                    fastScrollEnd: true,
                  },
                },
              );
            });
          },
          root!,
        );
      } catch {
        // A failed enhancement never gates navigation, form controls or content.
        revert?.();
      }
    }
    void enhance();
    return () => {
      disposed = true;
      revert?.();
    };
  }, [scope, route]);
}

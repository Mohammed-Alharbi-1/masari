import { useEffect } from "react";
import type { RefObject } from "react";

/** Readable HTML is the default. Motion never gates content or navigation. */
export function usePageMotion(
  scope: RefObject<HTMLElement | null>,
  route: string,
) {
  useEffect(() => {
    const root = scope.current;
    let disposed = false;
    let revert: (() => void) | undefined;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    if (
      !root.querySelector(
        ".hero-content, [data-story], .catalog-intro, .roadmap-header, .roadmap-timeline",
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
            const select = (selector: string) =>
              root!.querySelectorAll(selector);
            if (select(".hero-content").length) {
              const hero = gsap.timeline({
                defaults: {
                  ease: "power3.out",
                  duration: 0.85,
                  clearProps: "transform,opacity",
                },
              });
              hero
                .fromTo(
                  select(".hero-eyebrow"),
                  { y: 24, opacity: 0.45 },
                  { y: 0, opacity: 1 },
                )
                .fromTo(
                  select(".hero-content h1"),
                  { y: 42, opacity: 0.45 },
                  { y: 0, opacity: 1 },
                  0.12,
                )
                .fromTo(
                  select(".hero-description"),
                  { y: 26, opacity: 0.5 },
                  { y: 0, opacity: 1 },
                  0.24,
                )
                .fromTo(
                  select(".hero-actions"),
                  { y: 22, opacity: 0.5 },
                  { y: 0, opacity: 1 },
                  0.34,
                )
                .fromTo(
                  select(".product-visual"),
                  { y: 65, scale: 0.94, opacity: 0.5 },
                  { y: 0, scale: 1, opacity: 1, duration: 1.05 },
                  0.35,
                )
                .fromTo(
                  select(".preview-stage"),
                  { y: 24, opacity: 0.5 },
                  { y: 0, opacity: 1, stagger: 0.09 },
                  0.55,
                )
                .fromTo(
                  select(".preview-float"),
                  { y: 20, scale: 0.95, opacity: 0.5 },
                  { y: 0, scale: 1, opacity: 1, stagger: 0.1 },
                  0.8,
                );
            }
            const reveal = (
              targets: Element | NodeListOf<Element>,
              trigger: Element,
              stagger = 0,
            ) => {
              gsap.fromTo(
                targets,
                { y: 36, opacity: 0.55 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  stagger,
                  ease: "power3.out",
                  clearProps: "transform,opacity",
                  immediateRender: false,
                  scrollTrigger: {
                    trigger,
                    start: "top 92%",
                    once: true,
                    fastScrollEnd: true,
                  },
                },
              );
            };
            select(
              "[data-story], .roadmap-stage-heading, .roadmap-extra > h2",
            ).forEach((block) => reveal(block, block));
            [
              ["[data-step-group]", ".step", 0.13],
              ["[data-career-group]", ".direction-card", 0.06],
              ["[data-story-stack]", "li", 0.15],
              ["[data-resource-group]", ".resource-preview", 0.12],
            ].forEach(([group, child, stagger]) => {
              const parent = root!.querySelector(group as string);
              if (parent)
                reveal(
                  parent.querySelectorAll(child as string),
                  parent,
                  stagger as number,
                );
            });
            const line = root!.querySelector(".journey-line");
            if (line)
              gsap.fromTo(
                line,
                { scaleY: 0.04 },
                {
                  scaleY: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: root!.querySelector(".roadmap-timeline"),
                    start: "top 80%",
                    end: "bottom 80%",
                    scrub: 0.6,
                  },
                },
              );
            const intro = root!.querySelector(
              ".catalog-intro, .roadmap-header",
            );
            if (intro)
              gsap.fromTo(
                intro.children,
                { y: 28, opacity: 0.6 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  stagger: 0.08,
                  ease: "power3.out",
                  clearProps: "transform,opacity",
                },
              );
          },
          root!,
        );
      } catch {
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

export function useStepMotion(
  scope: RefObject<HTMLElement | null>,
  step: number,
  submitted: boolean,
) {
  useEffect(() => {
    const root = scope.current;
    let disposed = false;
    let revert: (() => void) | undefined;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    void import("gsap")
      .then(({ gsap }) => {
        if (disposed) return;
        const media = gsap.matchMedia();
        revert = () => media.revert();
        media.add(
          "(prefers-reduced-motion: no-preference)",
          () => {
            gsap.fromTo(
              root.querySelectorAll(
                ".questionnaire-panel header, .questionnaire-summary h1",
              ),
              { y: 20, opacity: 0.6 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
            );
          },
          root,
        );
      })
      .catch(() => revert?.());
    return () => {
      disposed = true;
      revert?.();
    };
  }, [scope, step, submitted]);
}

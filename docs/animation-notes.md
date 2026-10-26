# Animation Implementation and Dependency Notes

## Dependency decision

On 2026-10-25, `npm view gsap version license dist-tags --json` reported stable `3.15.0`; `@gsap/react` reported `2.1.2` with React `>=17` and GSAP `^3.12.5` peers. Only **`gsap@3.15.0`** was installed, pinned exactly. React's existing `useEffect` plus scoped GSAP match-media contexts provide the cleanup needed here, so an additional wrapper was unnecessary. No competing animation framework was installed.

GSAP identifies its license as the **Standard "no charge" license**, not MIT. The [upstream repository](https://github.com/greensock/GSAP) and [official release announcement](https://gsap.com/blog/3-13/) state that GSAP and its plugins are free, including commercial use. The [full standard-license endpoint](https://gsap.com/standard-license) redirected to the vendor's temporary forum-offline notice during inspection; its full legal text was not independently retrieved. This limitation is recorded rather than claiming an unrestricted open-source license. Preserve upstream copyright/license notices and recheck vendor terms when changing distribution or business use.

Implementation references: [GSAP documentation](https://gsap.com/docs/v3/), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [React lifecycle guidance](https://gsap.com/resources/React/), and [matchMedia/revert](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>).

## Progressive enhancement

`src/hooks/usePageMotion.ts` dynamically imports only GSAP and ScrollTrigger after render. It receives the main element ref and the current router entry key. Routes without reveal targets skip the imports too. Content is visible before the import, at nonzero opacity during motion, and when an import fails. No CSS starts content at opacity zero. There are no external animation-service requests.

The hero reveals whole headings/paragraphs/actions/illustration with 12-pixel movement and a short stagger. Arabic glyphs/words are not split. Selected homepage headings, the three-step group, eleven career cards, benefits and final CTA use once-only ScrollTriggers. Roadmap stage headings and extra-focus/provider headings receive the same small movement; their stateful controls and containing stage blocks are excluded. The catalog's 70 results are not individually animated. Native form focus/validation/state is not animated. CSS handles ordinary card feedback, navigation colors, menu entrance and selected controls.

There is no scroll hijacking, pinning, looping background, mouse tracking, layout-height animation, autoplay or video iframe. Resource cards use text and local styling rather than remote images.

## Cleanup and accessibility

All selectors are scoped to the supplied current main element. `gsap.matchMedia()` owns animations and ScrollTriggers; `revert()` runs on navigation-entry cleanup. An asynchronous disposal guard prevents a late import from registering motion against an old page after Strict Mode cleanup or route changes. Cleanup occurs even for same-path history-entry changes. A failed enhancement reverts its partial context and leaves the app functional.

An initial reduced-motion preference skips the animation imports. Active contexts are reverted when the no-preference query stops matching. Existing CSS reduced-motion rules disable transitions/menu motion as well. Content never depends on a reveal to become available, and no ARIA role or keyboard focus behavior is replaced by animation.

Production and React Strict Mode route cycles were tested without duplicated cards, hidden content, extra pin spacers or captured application console warnings/errors. A local import-map fixture deliberately blocked the GSAP import; a DOM probe confirmed rejection while content/navigation remained usable. A local matchMedia fixture exercised the reduced-motion JavaScript branch and confirmed no animation preloads/styles; native OS preference switching and a heap/leak profiler were NOT RUN. CSS media behavior was reviewed in source. These ignored fixtures are removed by the final build and are not published.

## Maintenance

Keep reveals scoped and few. Do not add per-result ScrollTriggers to large catalog lists. Keep controls visible and preserve the native form/menu interaction model. When adding new asynchronous enhancement work, cancel registration after unmount and let the context own every created animation. Rerun browser route, keyboard, responsive and reduced-motion checks, and report actual bundle changes rather than unsupported Lighthouse scores.

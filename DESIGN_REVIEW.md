# Phase 7 design and motion review

## Direction and previous problems

The baseline used a compact split hero, a diagram-like illustration, repeated card layouts and a largely uniform hierarchy. Roadmap storage controls occupied the primary reading flow; the questionnaire read as a broad form. Existing motion moved targets about 12 pixels and did not make the product journey apparent.

Before implementation, six substantial changes were identified and then delivered: an editorial centered hero; a layered three-stage product preview; distinct homepage storytelling compositions; a guided questionnaire rail and focused panel; a progress dashboard and clear learning timeline; and a stronger catalog control/result hierarchy.

The [Apple design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles) and [Apple homepage](https://www.apple.com/) were inspected for clarity of purpose, restrained composition, progressive detail and careful craft. Masari uses its original navy `#112e32`, ink `#172e32`, teal `#416b5c`, lime `#d3eea5` and paper `#fcfcf9`. No Apple assets, fonts, logo or page design were copied. The reference informed priorities, not a branded imitation.

## Delivered hierarchy

- **Homepage:** large Arabic headline and focused paired CTAs; CSS/SVG roadmap preview with real skill concepts; explicit illustrative disclaimer; numbered editorial steps; 11 career cards; a dark three-stage learning story; examples from the actual 39-resource library; a clear closing action. Layout changes between sections rather than repeating the same grid.
- **Header:** softly translucent floating surface with an opaque fallback, clear active link, native mobile toggle, preserved Escape/outside/focus behavior and semantic links.
- **Catalog:** dark editorial introduction and count; separate search/filter surface; two-column desktop results and one-column phone cards; larger credential names, quiet secondary metadata, native details and distinct official links. All 70 catalog records and verification/availability warnings remain.
- **Questionnaire:** desktop progress rail beside a focused form; horizontal four-step progress on mobile; selected option styling; unchanged native selects/radios/checkboxes; a clearer completion summary. The four steps and answer semantics are unchanged. Invalid fields retain focus handling; form state is not remounted for motion.
- **Roadmap:** identified career header, honest actual activity percentage alongside native progress, stage summaries and next unfinished action; storage/privacy/reset in an explicit native disclosure; important notices outside it. Three stage panels follow a decorative connection line. Skills, practical work, free resources and optional credentials retain distinct roles and eligibility warnings. Completion remains self-reported; the line is a scroll illustration, not an achievement indicator.

The product preview includes no fake achievements, employment statistics or readiness score. Homepage resources are labeled examples rather than personalized recommendations.

Compact completion labels are included verbatim at the beginning of each checkbox's accessible name, followed by specific activity context. The final browser check found zero mismatches across 22 rendered controls.

## GSAP implementation

`usePageMotion` lazily imports existing GSAP and ScrollTrigger. A hero timeline coordinates eyebrow, heading (42px), copy, actions, preview (65px and scale), stage panels and floating elements using staggered timing and `power3.out`. Scroll stories and grouped steps/careers/resources reveal by section; there are no 70 individual catalog-card triggers. Roadmap headings reveal and its decorative line grows from scaleY .04 to 1 with scroll, without pinning or scroll hijacking. A separate scoped step hook animates questionnaire headings without animating invalid controls. CSS handles buttons, selected states and simple hover feedback.

Career CSS no longer transitions transform while GSAP writes it, avoiding competing timing. Effects are scoped through `gsap.matchMedia`, reverted on route/step cleanup, and protected against an import resolving after unmount. No essential content starts at zero opacity. Reduced-motion entry skips imports; active GSAP media contexts revert when their condition no longer matches. Starting with reduced motion leaves the document static; entering motion later may require route re-entry. Import failure retains ordinary content and navigation.

Actual DOM sampling recorded hero translation returning to none, career translation around 24.8→14.7→8.1→0px, and roadmap line scale .04→.14→.96 while scrolling. Four production route cycles returned to nine homepage triggers, then zero on catalog exit. Development Strict Mode measured nine initially, nine after three cycles, zero on exit. Reduced-motion simulation recorded only `none` for hero/career transforms; a tightened QA CSP blocked both animation chunks and the questionnaire link still worked.

References: [GSAP timeline](https://gsap.com/docs/v3/GSAP/gsap.timeline()/), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [GSAP React lifecycle guidance](https://gsap.com/resources/React/).

## Matched screenshot evidence

All are real browser captures with matching requested CSS viewports: desktop **1440×1100**, mobile **390×844**. The browser exporter returned smaller bitmaps: before desktop widths 1425 with heights 1100 (home/catalog/questionnaire) or 1089 (roadmap); before mobile widths 375 with heights 844 (home/catalog) or 812 (questionnaire/roadmap). After exports are 1425×1089 and 375×812 respectively. These exporter differences are preserved, not edited into fabricated pixel matches. Per-file dimensions are recorded in the machine-readable evidence. Top-of-page states match: homepage without saved banner; catalog all 70/no search; questionnaire empty first step; web roadmap with CS/third-year, known HTML, desired JavaScript/React, null preferences and **0/21** activities.

| View | Before | After |
| --- | --- | --- |
| Home desktop | [Before](docs/screenshots/phase7/before/home-desktop.jpg) | [After](docs/screenshots/phase7/after/home-desktop.jpg) |
| Home mobile | [Before](docs/screenshots/phase7/before/home-mobile.jpg) | [After](docs/screenshots/phase7/after/home-mobile.jpg) |
| Catalog desktop | [Before](docs/screenshots/phase7/before/catalog-desktop.jpg) | [After](docs/screenshots/phase7/after/catalog-desktop.jpg) |
| Catalog mobile | [Before](docs/screenshots/phase7/before/catalog-mobile.jpg) | [After](docs/screenshots/phase7/after/catalog-mobile.jpg) |
| Questionnaire desktop | [Before](docs/screenshots/phase7/before/questionnaire-desktop.jpg) | [After](docs/screenshots/phase7/after/questionnaire-desktop.jpg) |
| Questionnaire mobile | [Before](docs/screenshots/phase7/before/questionnaire-mobile.jpg) | [After](docs/screenshots/phase7/after/questionnaire-mobile.jpg) |
| Roadmap desktop | [Before](docs/screenshots/phase7/before/roadmap-desktop.jpg) | [After](docs/screenshots/phase7/after/roadmap-desktop.jpg) |
| Roadmap mobile | [Before](docs/screenshots/phase7/before/roadmap-mobile.jpg) | [After](docs/screenshots/phase7/after/roadmap-mobile.jpg) |

The hero composition, product visualization, questionnaire arrangement and roadmap header/progress hierarchy visibly differ from the baseline. Mobile was independently inspected, including narrow 320px onboarding, not inferred from desktop captures.

[Live deployment desktop proof](docs/screenshots/phase7/deployed-home-desktop.jpg) was captured after successful Pages deployment. Live scroll sampling also observed a career-card transform around 30.6px settling to `none` at full opacity.

## Responsive and accessibility verification

Four routes at 320/375/390/430/768/1024/1440/1920px showed document scroll width equal to client width. This is geometry testing across 32 states, not a claim of pixel-perfect visual inspection of every activity at every size. Desktop/mobile screenshots and narrow onboarding were inspected for Arabic wrapping and usable controls. Essential actions are never hover-only. Native details, radios, checkboxes, labels, progress, validation focus and menu keyboard behavior remain. SVG progress and decorative previews have appropriate accessible treatment.

Screen recording, actual assistive technology, native 200% browser zoom, physical devices and independent browser engines were NOT RUN. No WCAG certification is claimed. To review motion manually: enable normal motion, reload home and watch the coordinated entrance; scroll through steps/careers/story/resources; generate a roadmap and scroll its timeline; navigate away/back rapidly; repeat with reduced motion. To test failure, block the two lazy animation chunks in developer tools and repeat navigation. Content must remain visible throughout.

## Performance tradeoff

No dependency, bitmap asset or animation framework was added. Lazy GSAP/ScrollTrigger payloads are unchanged. Entry JS grew 4,991 bytes (gzip +1,419); CSS grew 18,510 bytes (gzip +3,282) to deliver the new compositions and breakpoints. The entry now exceeds Vite's 500 kB warning threshold; this warning is disclosed, not suppressed. See [release measurements and their limits](PHASE7_REPORT.md#10-performance-comparison).

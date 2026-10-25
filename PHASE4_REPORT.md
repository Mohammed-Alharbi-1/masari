# Phase 4 Implementation Report

Date: 2026-10-25. Scope: deterministic personalized learning and optional certification roadmaps. Student-facing content is Arabic RTL; implementation documentation is English.

## 1. Phase Summary

Students can complete the anonymous questionnaire, review the summary, generate a three-stage career roadmap, inspect known/developing skills and practical milestones, compare optional credentials, follow official issuer links, and edit their answers to regenerate the result. Direct access without valid answers has a helpful questionnaire link. Generation works through validated router state even when sessionStorage is unavailable.

No backend, account, API, database, AI service, paid dependency, progress tracking, completion checkboxes, long-term storage, calendar, new career track or catalog expansion was introduced. The existing 70 certifications, 12 providers, 11 tracks, 68 skills and 33 curated stages are preserved.

## 2. Files Created or Modified

| Path                                                    | Responsibility                                                                                 |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/utils/generateRoadmap.ts`                          | Pure validation, skill priorities, bounded credential selection, provider paths and guidance   |
| `src/types/roadmap.ts`                                  | Generated stage, option and provider-path contracts using canonical IDs                        |
| `src/utils/questionnaireNavigation.ts`                  | Runtime validation of router answers and explicit edit intent                                  |
| `src/pages/RoadmapPage.tsx`                             | Source selection, empty state, roadmap header, stages, additional focus and cloud alternatives |
| `src/components/roadmap/RoadmapStageCard.tsx`           | Skill statuses, priorities, practical project and optional stage credentials                   |
| `src/components/roadmap/RoadmapCertification.tsx`       | Catalog-resolved credential/provider, reasons, requirements, notices and official URL          |
| `src/styles/roadmap.css`                                | Responsive Arabic roadmap styling using existing tokens                                        |
| `src/components/questionnaire/QuestionnaireSummary.tsx` | Primary roadmap CTA; preserves catalog, edit and reset actions                                 |
| `src/pages/QuestionnairePage.tsx`                       | Validated navigation answers, explicit editing, single-use edit payload                        |
| `src/App.tsx`                                           | Roadmap document title and roadmap instance keyed to navigation entry                          |
| `src/pages/HomePage.tsx`                                | Small feature-availability copy correction; no redesign                                        |
| `scripts/validate-roadmap.ts`                           | Deterministic engine, mutation, candidate-fault and navigation checks                          |
| `package.json`                                          | Roadmap validator command included in build                                                    |
| `README.md`                                             | Rules, integration, maintenance and phase boundaries                                           |
| `PHASE4_REPORT.md`                                      | This report                                                                                    |

No lockfile, dependency, canonical catalog or template edits. Existing GitHub Pages workflow remains unchanged; its build now runs all three validators.

## 3. Recommendation Engine

`generatePersonalizedRoadmap(answers, catalog = certifications)` is pure and deterministic. It reuses the existing questionnaire validator, career/skill IDs and selected track template. The optional readonly catalog argument supports missing/inactive test fixtures; production uses the existing catalog. It neither reads storage nor performs network, date, random or React operations, and constructs new arrays/results without mutating inputs.

Skill ordering is lexicographic: missing explicitly desired skills first, other missing stage skills next, then familiar desired skills to deepen, then other familiar skills. Template ordering breaks ties. Each priority skill is assigned once across stages. Repeated concepts remain visible in later stages as practice/revisit topics, rather than duplicated priority assignments. Self-reported knowledge is never mastery or completion. Desired relevant skills absent from displayed stages are explicitly retained in additional focus. Level affects starting guidance; even advanced students retain missing foundations. Major and year are contextual, never eligibility gates.

Credential candidates come only from the stage's curated IDs. Missing, inactive/unknown, unverified, wrong-track and unsuitable-level candidates are excluded. Foundation accepts beginner options; intermediate accepts beginner/intermediate; advanced accepts advanced options. No catalog-wide fallback invents a replacement. A stable comparison counts missing desired skill matches, then known-and-desired matches, then other missing relevant track skills, with template order resolving ties. Those counts are internal ordering criteria, not displayed proficiency/compatibility scores. At most one highlighted option and two collapsed alternatives appear per stage. Credential IDs are not repeated as stage recommendations. Actual matching skill names or the selected stage/track explain each choice.

For software development/testing, Python options are omitted without a Python signal. Explicit desired JavaScript, TypeScript, Java or C# suppresses Python reported only as familiar. Transferable concepts and projects remain. For cloud, desired platforms take precedence over known-only platforms. One clear platform yields a continuous same-provider optional path. Multiple platforms expose only those provider paths; no platform signal exposes AWS, Azure and Google paths without a winner. Shared stages retain platform-neutral concepts; relevant desired platforms remain explicit in additional focus. Parallel paths are collapsed provider groups containing one eligible option per stage. They are alternative paths, not extra learning stages or mandatory purchases. Other tracks also avoid credential-specific platform conflicts when an explicit single platform is indicated.

Every credential option carries an eligibility warning. The UI resolves official links, provider, level, dated verification, prerequisite text and issuer notes from catalog records. Advanced credentials have visible future-goal warnings. No free-form prerequisite parsing attempts to approve eligibility. Unknown prices never become zero, free, SAR estimates or affordability claims. Budget changes explanatory notes only. Study hours change general practice advice without completion estimates or calendar generation.

## 4. Personalized Roadmap

The output model contains `trackId`, `knownSkillIds`, `desiredSkillIds`, `startingPointAr`, `guidanceNotesAr`, exactly three ordered `stages`, `additionalFocusSkillIds` and `providerPaths`.

Each stage contains its stable stage ID, template title/description/project, ordered `skillIds`, `knownSkillIds`, `desiredSkillIds`, `focusSkillIds`, `deepenSkillIds`, `revisitSkillIds`, a reason, optional highlighted credential, bounded alternatives and a `futureGoal` flag. Options contain only credential ID, Arabic reason/warning and optional/future flags; complete certification records are not copied. A provider path contains platform/provider IDs and three stage references with an eligible option or null.

Foundation → intermediate → advanced order never changes. Projects remain useful when no credential is suitable. Unknown/null preferences are not invented. The output has no completed state, numeric skill percentages, exam prices, certification durations or roadmap history.

## 5. Questionnaire Integration

The completion screen's primary Create My Career Path link opens `#/roadmap` with `{ answers }` in router state. Both engine and navigation reader validate incoming objects rather than trusting type assertions. Valid navigation answers take precedence for immediate in-memory use; otherwise the roadmap reads the existing validated `masari_questionnaire_v1` session submission. Malformed, unsupported or unavailable sources show Arabic empty-state guidance instead of default personal answers.

Edit returns to `#/questionnaire` with `{ answers, editQuestionnaire: true }`. The form starts in its existing editing flow without deleting the saved submission. The navigation payload is consumed once using router replacement, without remounting the form, so later resubmission/reset/reload cannot restore a stale edit snapshot. Unsaved edits remain in memory. Completion saves the new validated object and a new roadmap CTA regenerates from it. Reset keeps its Phase 3 behavior.

Ordinary browser history can retain router state; this is not a product history feature. No generated roadmap or progress is stored. Blocked storage still permits submission → generation → editing through in-memory navigation; persistence across reloads/devices is not promised.

## 6. Certification Selection Examples

These examples were generated by the implemented engine using Computer Science / first-year context and beginner level. Unspecified skill arrays are empty; optional budget/time are null. They are examples of educational choices, not eligibility statements or compulsory exam sequences.

| Student input                                             | Actual output and reason                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web Development; knows HTML/CSS; desires JavaScript/React | Foundation priorities: `javascript`, `git`; intermediate starts with `react`, then TypeScript/API/testing/CI skills. Optional `github-foundations`, then `github-actions`; advanced is project-focused with no invented credential. HTML/CSS remain familiar, not completed. Python is absent.                                                                                                                                                                                                 |
| Software Development; desires Python                      | Foundation starts with `python`, then transferable programming/Git/data-structure skills. Optional `python-pcep`, `python-pcap`, then future `python-pcpp1`; Python interest makes the existing Python template relevant. Desired JavaScript/TypeScript/Java/C# instead produces transferable skills/projects and no Python certificate sequence.                                                                                                                                              |
| Cybersecurity beginner; no known/desired skills           | Foundation covers networking, operating systems, Linux and security. Highlighted `cisco-ccst-cybersecurity` with `microsoft-security-fundamentals` and `isc2-cc` alternatives; intermediate highlights `microsoft-security-operations-analyst` with `isc2-sscp` alternative. Future stage highlights `isc2-cissp` with `microsoft-cybersecurity-architect` alternative and experience/eligibility warnings. A first-year beginner is not instructed to attempt expert credentials immediately. |
| Cloud; desires AWS                                        | Common foundations remain. Intermediate focus starts with `aws`, cloud architecture and monitoring. Optional `aws-cloud-practitioner`, `aws-solutions-architect-associate`, then future `aws-solutions-architect-professional`; no Azure/Google credential is inserted into this path.                                                                                                                                                                                                         |
| Cloud; no vendor preference                               | Three common skill/project stages with no arbitrarily highlighted provider. Separate collapsed paths: AWS uses the three AWS IDs above; Azure uses `microsoft-azure-fundamentals`, `microsoft-azure-administrator`, `microsoft-azure-solutions-architect`; Google uses `google-cloud-digital-leader`, `google-associate-cloud-engineer`, `google-professional-cloud-architect`. Students compare one coherent provider path, with no claim that roles/credentials are equivalent.              |

Additional tests confirm Linux versus Windows interests change IT Support's intermediate highlighted credential and explanation. Known/desired overlap produces deepening priorities; empty desires remain empty rather than selecting everything. Thus the engine does not return an identical generic result for every student.

## 7. User Interface

Arabic RTL page with a contextual header, a specific starting point, known/desired summary, disclaimers and working Edit/Catalog actions. Three numbered cards show stage concepts, self-reported familiarity, ordered focus, a practical milestone, optional credential reasons and future goals. Alternatives and requirement details use native keyboard-operable disclosure controls. Additional focus preserves interests outside the template. Cloud paths are distinct provider disclosures with stage labels and official links.

Existing colors/fonts/buttons are reused. Layouts collapse to one column on mobile, long credential names wrap, and verification dates stay together. Navigation retains the existing main-content focus behavior; the in-page cloud link focuses its target without breaking HashRouter. Native form/radio/checkbox behavior remains unchanged. No progress checkboxes, scores, dashboards or animations were added.

## 8. Test Results

| Check                                                      | Result                                                                                                                                                                        |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                                             | PASSED, zero warnings                                                                                                                                                         |
| `npm run typecheck`                                        | PASSED                                                                                                                                                                        |
| `npm run validate:catalog`                                 | PASSED: unchanged 70 credentials, 12 providers, 11 tracks, 68 skills and 33 ordered stages, including existing invalid-data/status/search checks                              |
| `npm run validate:questionnaire`                           | PASSED: existing 9 grouped validation/storage checks                                                                                                                          |
| `npm run validate:roadmap`                                 | PASSED: 24 grouped engine/navigation checks described below                                                                                                                   |
| `npm run build`                                            | PASSED, includes TypeScript and all three validators                                                                                                                          |
| Full homepage → questionnaire → summary → roadmap          | PASSED in production preview with known HTML/CSS, desired JavaScript/React and optional preferences                                                                           |
| Edit and regeneration                                      | PASSED: web path changed to Python software path; academic data retained and output changed correctly                                                                         |
| Stored-answer direct route and refresh                     | PASSED after leaving the route and returning without navigation answers                                                                                                       |
| Empty/corrupt/unsupported stored answers                   | PASSED, friendly empty state and questionnaire link                                                                                                                           |
| Blocked sessionStorage                                     | PASSED: empty-state explanation, completed questionnaire, roadmap generation and editing through router state                                                                 |
| All eleven tracks                                          | PASSED in browser: three stages, appropriate titles and catalog-resolved options, including credential-free stages                                                            |
| Cloud paths                                                | PASSED: AWS continuity and three separate no-preference provider groups, expanded and inspected                                                                               |
| Official destinations                                      | PASSED: PCEP href preserved, official PCEP destination opened successfully; all generated option URLs resolve from existing records. Full issuer re-verification was NOT RUN. |
| Layout and RTL                                             | PASSED: 320/390/768/1024/1440 pixel widths, including expanded provider groups; no horizontal overflow; mobile credential layout inspected                                    |
| Keyboard/focus                                             | PASSED: provider disclosure via Enter, in-page provider target focus, required-field error focus, existing native controls                                                    |
| Previous feature regression                                | PASSED: 70-card catalog, AZ-900 search, software-testing filter (4 records), homepage, mobile menu and required questionnaire validation                                      |
| Console                                                    | PASSED: no errors or warnings captured during local application checks                                                                                                        |
| Full assistive-technology audit / multiple browser engines | NOT RUN                                                                                                                                                                       |
| New GitHub Actions / Pages run                             | Pending publication at report creation; final result is supplied in final delivery                                                                                            |

Engine checks cover: beginner/zero knowledge; intermediate known skills; advanced with missing foundations; empty desires; overlap/deepening; four non-Python language interests; explicit Python; each of AWS/Azure/Google; no vendor; multiple vendors; desired versus known-only provider precedence; free/limited/other budget notes; limited/balanced/long weekly availability and unknown time; null/unsure preferences; academic independence; cybersecurity expert warnings; missing/retired/unknown/pending/wrong-track/wrong-level candidates; credential-free stages; desired skills outside templates; meaningful Linux/Windows choice differences; all eleven tracks with zero/all/mixed skill fixtures; determinism; no duplicate priority skills; valid IDs; bounded optional credentials; malformed navigation rejection; unchanged inputs/catalog/templates.

A further browser regression PASSED: after roadmap editing, a changed major was resubmitted and correctly restored on reload; reset then remained empty after another reload. Blocked-storage generation and editing were rerun successfully after the single-use navigation fix.

Storage browser fault fixtures are temporary files under ignored `dist/__qa__/`, not production source. The final build removes them. There is no diagnostic or fault-injection route in the committed app.

## 9. Known Limitations

Prices and Saudi exam costs are unknown, experience eligibility is not machine-verifiable, and no learning-duration dataset exists. No affordability, competency, job-market, exam-readiness or completion-time claim is made. Self-assessment is a soft starting-guidance signal, not proof of mastery or an eligibility override. The catalog is a dated editorial snapshot, not live issuer monitoring.

Selection is intentionally limited to template candidates. This can yield no credential for a technology even if other catalog entries exist; skills/projects remain valid. Alternative provider roles are not assumed equivalent. Projects are curated examples rather than dynamically invented resources. Browser storage/navigation policies affect session restoration; no cross-device synchronization is provided.

A stale edit-navigation snapshot was identified during review and corrected by consuming explicit edit state once. Mobile date wrapping was corrected with a non-wrapping time element. Automated tests are lightweight assertions, not a full browser automation framework or accessibility certification.

## 10. GitHub Status

Repository: https://github.com/Mohammed-Alharbi-1/masari

Branch: `main`. Starting commit: `ff0f90b2b05951f77321a6230fa34d3330f4289a`. Before development, Git status was clean, authentication valid, origin fetched, and local/remote divergence was 0/0.

This report is prepared before the required commit `feat: add personalized certification roadmaps`. Final SHA, push status, new Actions result and live Pages verification are supplied in final delivery after publication; they are not fabricated here. At report creation, publishing Phase 4 is pending. Previous Phase 3 deployment succeeded (run `40167517818`).

Pages URL: https://mohammed-alharbi-1.github.io/masari/

Existing workflow installs dependencies with `npm ci`, runs lint and build including all three validators, and deploys `dist/` to Pages from the default branch. No settings changes are expected for the configured repository. A fork must choose Settings → Pages → GitHub Actions and allow its default branch in the Pages environment if protection applies. No force push, repository deletion or unrelated setting change is needed.

## 11. Phase 5 Readiness

Stable stage/skill/credential IDs and explicit future/optional flags provide a usable foundation for local progress tracking. The generated output remains a pure projection of validated answers, not persisted history. A future phase must define stable milestone identity/versioning and how edits reconcile progress, distinguish self-reported familiarity from completed work, and keep alternative provider choices from becoming simultaneous requirements.

No progress UI, completed flags, localStorage persistence or roadmap history has been implemented. Phase 5 still needs its own scoped design, storage policy and tests.

# Phase 4.5 Implementation Report

Date: 2026-10-25. Scope: free learning resources, restrained visual/animation refinement, and English repository presentation. The student-facing website remains Arabic RTL.

## 1. Phase Summary

Added a separately curated library of 39 verified free-access learning resources and deterministic matching to actual roadmap skill priorities. The roadmap shows compact source cards with language, publisher, format, matching skill, explanation, account/access caveats and direct learning links. Existing three-stage skills/projects and optional professional certification choices remain intact.

The homepage now explains the current product clearly; navigation, career cards, catalog, questionnaire and roadmap share more consistent spacing, typography, borders and depth. GSAP/ScrollTrigger adds brief progressive enhancement while content remains available. English documentation now includes real screenshots, resource-maintenance guidance, manual evidence and animation/dependency notes.

No account system, backend, external recommendation/YouTube API, video iframe, new track, credential expansion, progress checkbox, localStorage progress or Phase 5 feature was added.

## 2. Files Created or Modified

| Path                                                                      | Responsibility                                                               |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/data/learningResources.ts`                                           | Separate curated catalog of 39 free-access resources                         |
| `src/types/learningResources.ts`                                          | Resource contracts, labels and recommendation references                     |
| `src/utils/validateLearningResources.ts`                                  | Structural metadata, reference, URL and date validation                      |
| `src/utils/recommendLearningResources.ts`                                 | Pure bounded skill/stage/resource matching                                   |
| `scripts/validate-learning-resources.ts`                                  | 24 grouped validation/personalization regression checks                      |
| `src/components/roadmap/LearningResourcesSection.tsx`                     | Arabic compact resource cards and safe empty/access notices                  |
| `src/components/roadmap/RoadmapStageCard.tsx`                             | Adds resources without removing stage/project/credential content             |
| `src/pages/RoadmapPage.tsx`                                               | Supplemental resource projection from validated answers/roadmap              |
| `src/hooks/usePageMotion.ts`                                              | Lazy GSAP/ScrollTrigger enhancement, scoped media context and cleanup        |
| `src/App.tsx`                                                             | Main ref and motion lifecycle keyed to navigation entry                      |
| `src/pages/HomePage.tsx`                                                  | Current product story, concise steps/benefits/CTA and reveal markers         |
| `src/components/layout/Header.tsx`                                        | Concise account-free status copy; interaction logic preserved                |
| `src/styles/refinements.css`                                              | Shared brand-preserving visual refinement across pages                       |
| `src/styles/learningResources.css`                                        | Responsive resource presentation                                             |
| `src/main.tsx`                                                            | Loads shared visual refinement stylesheet                                    |
| `package.json`, `package-lock.json`                                       | One pinned GSAP dependency and new build validator                           |
| `README.md`                                                               | Updated current scope, features, commands, structure and documentation links |
| `docs/learning-resources.md`                                              | Curation, free-access verification, matching and maintenance policy          |
| `docs/resource-verification.json`                                         | Per-resource source evidence and excluded/unverified research candidates     |
| `docs/animation-notes.md`                                                 | Lifecycle, accessibility, license research and testing limits                |
| `docs/screenshots/homepage.jpg`, `docs/screenshots/roadmap-resources.jpg` | Actual application screenshots using sample anonymous answers                |
| `PHASE4_5_REPORT.md`                                                      | This report                                                                  |

The original 70 credential records, 12 providers, 11 tracks, 68 canonical skills, 33 template stages, questionnaire schema/storage, and certification recommendation function are unchanged. Historical reports are retained.

## 3. Learning Resource Catalog

The catalog has **39 verified resources**, covering **43 of 68 canonical skills** and **all 11 career tracks**. There are **9 Arabic** and **30 English** records. Type distribution: **0 individual YouTube videos**, **2 YouTube playlists**, **16 online courses**, **5 interactive tutorials**, and **16 official documentation resources**. All selected destinations were opened during manual research. Full playback, enrollment, every sublesson and exercise execution were not performed. No video ID, duration, rating, review count or certificate was invented.

Every active record has `freeAccessVerified: true` and the actual inspection date `2026-10-25`. Reading/learning access is distinct from paid exams, tools, hosting, cloud usage or optional certificates. Required/optional accounts and important access limits appear in Arabic on cards. Public access can change after inspection. Evidence is separate from structural validation in `docs/resource-verification.json`.

### Track coverage

| Career track                                 | Verified resource records |
| -------------------------------------------- | ------------------------- |
| Web development                              | 14                        |
| Software development                         | 17                        |
| Cybersecurity                                | 8                         |
| Networking                                   | 5                         |
| Cloud computing                              | 12                        |
| DevOps and automation                        | 13                        |
| Data analytics                               | 15                        |
| Artificial intelligence and machine learning | 13                        |
| Database administration                      | 4                         |
| IT support and systems administration        | 8                         |
| Software testing                             | 12                        |

Counts overlap: one course can serve several relevant skills/tracks. Matching only presents the specific canonical skill relevant to the student's track, rather than claiming that every topic in a broad course is needed by every track.

### Verified resource inventory

Arabic course titles are translated below for English documentation; the application retains the actual localized titles. Each destination is a direct course/tutorial/document/playlist, not a disguised search result.

| Title                                                    | Publisher                           | URL                                                                                                                    | Language | Canonical skills                                                          | Verification                      |
| -------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------- | --------------------------------- |
| Learn HTML In Arabic 2021                                | Elzero Web School                   | [Direct resource](https://www.youtube.com/playlist?list=PLDoPjvoNmBAw_t_XWUFbBX-c9MafPk9ji)                            | Arabic   | `html`                                                                    | Free content inspected 2026-10-25 |
| CSS Study Plan (Arabic)                                  | Elzero Web School                   | [Direct resource](https://elzero.org/study/css-2021-study-plan/)                                                       | Arabic   | `css`                                                                     | Free content inspected 2026-10-25 |
| Learn JavaScript in Arabic 2021                          | Elzero Web School                   | [Direct resource](https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv)                            | Arabic   | `javascript`                                                              | Free content inspected 2026-10-25 |
| The TypeScript Handbook                                  | Microsoft / TypeScript              | [Direct resource](https://www.typescriptlang.org/docs/handbook/intro.html)                                             | English  | `typescript`                                                              | Free content inspected 2026-10-25 |
| React Quick Start                                        | React                               | [Direct resource](https://react.dev/learn)                                                                             | English  | `react`                                                                   | Free content inspected 2026-10-25 |
| Tutorial: Tic-Tac-Toe                                    | React                               | [Direct resource](https://react.dev/learn/tutorial-tic-tac-toe)                                                        | English  | `react`                                                                   | Free content inspected 2026-10-25 |
| Introduction to GitHub                                   | GitHub Skills                       | [Direct resource](https://github.com/skills/introduction-to-github)                                                    | English  | `git`                                                                     | Free content inspected 2026-10-25 |
| Hello GitHub Actions                                     | GitHub Skills                       | [Direct resource](https://github.com/skills/hello-github-actions)                                                      | English  | `ci-cd`, `git`                                                            | Free content inspected 2026-10-25 |
| Java Language Basics                                     | Oracle / Dev.java                   | [Direct resource](https://dev.java/learn/language/constructs/basics/)                                                  | English  | `java`, `programming-fundamentals`                                        | Free content inspected 2026-10-25 |
| Write your first code using C#                           | Microsoft Learn                     | [Direct resource](https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-1/)                        | English  | `csharp`, `programming-fundamentals`                                      | Free content inspected 2026-10-25 |
| Foundations                                              | The Odin Project                    | [Direct resource](https://www.theodinproject.com/paths/foundations/courses/foundations)                                | English  | `html`, `css`, `javascript`, `git`                                        | Free content inspected 2026-10-25 |
| Writing tests with Playwright                            | Microsoft / Playwright              | [Direct resource](https://playwright.dev/docs/writing-tests)                                                           | English  | `test-automation`, `testing-fundamentals`                                 | Free content inspected 2026-10-25 |
| React Testing Library Example                            | Testing Library                     | [Direct resource](https://testing-library.com/docs/react-testing-library/example-intro/)                               | English  | `testing-fundamentals`, `test-automation`                                 | Free content inspected 2026-10-25 |
| The Python Tutorial                                      | Python Software Foundation          | [Direct resource](https://docs.python.org/3/tutorial/)                                                                 | English  | `python`                                                                  | Free content inspected 2026-10-25 |
| CS50's Introduction to Programming with Python           | Harvard University — CS50           | [Direct resource](https://cs50.harvard.edu/python/)                                                                    | English  | `python`, `programming-fundamentals`                                      | Free content inspected 2026-10-25 |
| SQLBolt — SELECT Queries 101                             | SQLBolt                             | [Direct resource](https://sqlbolt.com/lesson/select_queries_introduction)                                              | English  | `sql`                                                                     | Free content inspected 2026-10-25 |
| PostgreSQL Tutorial                                      | PostgreSQL Global Development Group | [Direct resource](https://www.postgresql.org/docs/current/tutorial.html)                                               | English  | `postgresql`, `sql`, `relational-modeling`                                | Free content inspected 2026-10-25 |
| PostgreSQL — Backup and Restore                          | PostgreSQL Global Development Group | [Direct resource](https://www.postgresql.org/docs/current/backup.html)                                                 | English  | `backup-recovery`, `database-administration`, `postgresql`                | Free content inspected 2026-10-25 |
| pandas — Getting Started Tutorials                       | pandas development team             | [Direct resource](https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html)                           | English  | `python`, `statistics`, `data-visualization`                              | Free content inspected 2026-10-25 |
| Get Started with Microsoft Data Analytics                | Microsoft Learn                     | [Direct resource](https://learn.microsoft.com/en-us/training/paths/data-analytics-microsoft/)                          | English  | `power-bi`, `data-visualization`                                          | Free content inspected 2026-10-25 |
| Create a PivotTable to Analyze Worksheet Data            | Microsoft Support                   | [Direct resource](https://support.microsoft.com/en-us/excel/get-started/create-a-pivottable-to-analyze-worksheet-data) | English  | `excel`                                                                   | Free content inspected 2026-10-25 |
| Machine Learning Crash Course                            | Google for Developers               | [Direct resource](https://developers.google.com/machine-learning/crash-course/)                                        | English  | `machine-learning`, `model-evaluation`, `statistics`                      | Free content inspected 2026-10-25 |
| Linear Algebra — MIT 18.06                               | MIT OpenCourseWare                  | [Direct resource](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)                                       | English  | `mathematics`                                                             | Free content inspected 2026-10-25 |
| Introduction to Probability and Statistics — MIT 18.05   | MIT OpenCourseWare                  | [Direct resource](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)           | English  | `statistics`, `mathematics`                                               | Free content inspected 2026-10-25 |
| TensorFlow 2 Quickstart for Beginners                    | TensorFlow                          | [Direct resource](https://www.tensorflow.org/tutorials/quickstart/beginner)                                            | English  | `machine-learning`, `deep-learning`, `model-evaluation`                   | Free content inspected 2026-10-25 |
| Introduction to Machine Learning Problem Framing         | Google for Developers               | [Direct resource](https://developers.google.com/machine-learning/problem-framing)                                      | English  | `machine-learning`, `model-evaluation`                                    | Free content inspected 2026-10-25 |
| Networking Basics (Arabic)                               | Cisco Networking Academy            | [Direct resource](https://www.netacad.com/courses/networking-basics?courseLang=ar-SA)                                  | Arabic   | `networking-fundamentals`, `tcp-ip`, `network-troubleshooting`, `routing` | Free content inspected 2026-10-25 |
| Introduction to Cybersecurity (Arabic)                   | Cisco Networking Academy            | [Direct resource](https://www.netacad.com/courses/introduction-to-cybersecurity?courseLang=ar-SA)                      | Arabic   | `security-fundamentals`                                                   | Free content inspected 2026-10-25 |
| Computer Hardware Basics (Arabic)                        | Cisco Networking Academy            | [Direct resource](https://www.netacad.com/courses/computer-hardware-basics?courseLang=ar-SA)                           | Arabic   | `computer-hardware`, `troubleshooting`                                    | Free content inspected 2026-10-25 |
| Introduction to Linux (LFS101)                           | The Linux Foundation                | [Direct resource](https://training.linuxfoundation.org/training/introduction-to-linux/)                                | English  | `linux`, `operating-systems`, `shell-scripting`                           | Free content inspected 2026-10-25 |
| The Linux command line for beginners                     | Ubuntu / Canonical                  | [Direct resource](https://ubuntu.com/desktop/docs/en/latest/tutorial/the-linux-command-line-for-beginners/)            | English  | `linux`                                                                   | Free content inspected 2026-10-25 |
| Describe Cloud Computing (Arabic)                        | Microsoft Learn                     | [Direct resource](https://learn.microsoft.com/ar-sa/training/modules/describe-cloud-compute/)                          | Arabic   | `cloud-fundamentals`                                                      | Free content inspected 2026-10-25 |
| Describe Azure Core Architectural Components (Arabic)    | Microsoft Learn                     | [Direct resource](https://learn.microsoft.com/ar-sa/training/modules/describe-core-architectural-components-of-azure/) | Arabic   | `azure`, `cloud-fundamentals`                                             | Free content inspected 2026-10-25 |
| Describe Azure Infrastructure Security Services (Arabic) | Microsoft Learn                     | [Direct resource](https://learn.microsoft.com/ar-sa/training/modules/describe-basic-security-capabilities-azure/)      | Arabic   | `azure`, `network-security`, `security-fundamentals`                      | Free content inspected 2026-10-25 |
| Overview of Amazon Web Services                          | Amazon Web Services                 | [Direct resource](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html)                       | English  | `aws`, `cloud-fundamentals`                                               | Free content inspected 2026-10-25 |
| Google Cloud overview                                    | Google Cloud                        | [Direct resource](https://docs.cloud.google.com/docs/overview)                                                         | English  | `google-cloud`, `cloud-fundamentals`                                      | Free content inspected 2026-10-25 |
| Build and share a containerized application              | Docker                              | [Direct resource](https://docs.docker.com/get-started/tutorials/run-an-app/)                                           | English  | `docker`                                                                  | Free content inspected 2026-10-25 |
| Learn Kubernetes Basics                                  | Kubernetes                          | [Direct resource](https://kubernetes.io/docs/tutorials/kubernetes-basics/)                                             | English  | `kubernetes`                                                              | Free content inspected 2026-10-25 |
| Quickstart for GitHub Actions                            | GitHub                              | [Direct resource](https://docs.github.com/en/actions/get-started/quickstart)                                           | English  | `ci-cd`                                                                   | Free content inspected 2026-10-25 |

The following canonical skills currently have no verified resource record: `rest-apis`, `object-oriented-programming`, `algorithms`, `data-structures`, `software-architecture`, `switching`, `windows`, `endpoint-management`, `identity-access-management`, `security-monitoring`, `incident-response`, `vulnerability-management`, `security-governance`, `risk-management`, `it-audit`, `cloud-architecture`, `infrastructure-as-code`, `monitoring`, `observability`, `query-optimization`, `data-engineering`, `generative-ai`, `test-case-design`, `api-testing`, `quality-assurance`. Coverage and stage-level suitability are intentionally incomplete. For example, some advanced architecture/governance topics and beginner testing foundations remain project-led. A missing source never blocks the roadmap.

Research considered both YouTube and direct free-course sources. Elzero publisher plans and public YouTube playlists were inspected. Cisco Arabic course/free labels were inspected in-browser. Specific AWS Skill Builder and freeCodeCamp offerings without sufficiently inspectable access were excluded rather than fabricated; public official AWS material was used instead. Unmaintained or inaccessible candidates and exact limitations are recorded in the evidence file.

## 4. Learning Resource Recommendation Logic

`recommendLearningResources` is a pure supplemental function. It validates incoming questionnaire data and confirms the roadmap's track, then reads the generated focus skills. Certification selection is not changed. The result references resource IDs, exact matching skill IDs and Arabic reasons by the existing three stage IDs.

Priorities are missing desired skills, other missing stage skills, known/desired overlap for deepening, and optional foundational review only when no new foundation focus exists. Additional desired interests outside the template are assigned to the earliest suitable resource stage. Empty desires remain empty. Candidates require verified free access, a direct skill association, selected-track relevance and a level appropriate to the current stage.

Desired programming-language/platform signals take precedence over known-only signals. Software/testing language-specific resources require a matching technology interest, so a Java student is not automatically given Python lessons. Platform-specific resources must agree with explicit cloud/platform interests; general cloud concepts can remain neutral. Arabic is preferred among eligible matches, then proximity to the optional self-assessed level/current stage, narrower topic scope, instructional format on an otherwise tied match, and stable ID ordering. These are editorial rules, not student scores.

At most **four cards per stage**, one per selected priority skill, are returned. A resource is used only once across the roadmap. Missing/pending/unsuitable resources produce no fake replacement; skills/projects stay visible with a concise empty state. Professional certification records and educational courses remain separate models.

Concrete browser examples:

- A web student who knows HTML/CSS and desires JavaScript/React/TypeScript receives Elzero JavaScript plus GitHub introduction in foundation; the React project, TypeScript Handbook and GitHub Actions in intermediate; and Playwright testing in advanced. Known HTML/CSS do not receive basic study cards as the next priority.
- A Java-focused software student receives Java Language Basics, GitHub practice and relevant testing/CI material, with no Python resource substituted. Automated tests separately verify the explicit Python case receives an exact Python match.
- AWS cloud focus receives a public AWS overview for the AWS skill, while common foundation resources cover general cloud/networking. Azure and Google Cloud input scenarios produce matching platform content instead of unrelated vendor substitutions.
- SQL analytics receives SQLBolt for SQL; PostgreSQL interest receives the official PostgreSQL tutorial; Docker interest receives Docker's app tutorial; machine-learning interest receives Google's course. IT Support receives actual hardware/network/system materials. These eleven-track browser results and the automated fixtures vary with student inputs.

## 5. Frontend Design Improvements

- **Homepage:** clearer current-product Arabic story, a concise three-step explanation, consistent call-to-action hierarchy, updated illustration caption, real benefits and a restrained final CTA. The existing brand illustration/logo remain.
- **Navigation:** solid sticky header, clearer active-route pill, refined mobile spacing and a brief CSS menu entrance. Existing ARIA, native links, Escape handling, focus restoration and route closing are preserved.
- **Career explorer:** more legible type, consistent icon/spacing treatment, subtle CSS elevation/border feedback and visible focus-within emphasis. No mouse tracking.
- **Catalog:** refined search/filter panel, readable metadata and description hierarchy, consistent card borders/spacing and safe official links. Search, filters, 70 records, verification/status/requirements and empty state remain.
- **Questionnaire:** clearer progress container/current-step emphasis, refined native selects and selected track/skill feedback. Existing state, validation and focus behavior remain unchanged; critical input is not JS-animated.
- **Roadmap:** numbered desktop timeline with clean mobile cards, clearer projects/focus blocks, separate optional credential and learning sections, intact future-goal/eligibility warnings.
- **Learning cards:** compact two-column desktop/one-column mobile layout with publisher, language/type, exact skill, reason, access caveats, inspection date and a safe new-tab action. No remote decorative images or embedded players.

The existing navy, teal, lime, paper, Arabic typography and logo are preserved. Real screenshots are stored as repository documentation assets rather than generated mockups or runtime image downloads.

## 6. JavaScript Animation Implementation

Only **`gsap@3.15.0`** was added. ScrollTrigger is imported from that package; `@gsap/react` was evaluated but not needed for the existing effect/context integration. npm stable metadata and React compatibility guidance were inspected before installation. No second animation framework was added.

The official upstream repository and release announcement state free commercial use under GSAP's Standard no-charge license. Its full standard-license endpoint redirected to a temporary vendor offline notice during this inspection; that full legal text was not retrieved. This is documented without mislabeling GSAP as MIT. See `docs/animation-notes.md` for source links and dependency details.

GSAP/ScrollTrigger are lazily loaded after render. Hero blocks receive a short entrance; selected homepage blocks and roadmap stages/extras have small once-only vertical/opacity reveals. Arabic words/glyphs are not split. Ordinary hover/focus, selected form states and menu colors/transitions remain CSS. The 70 catalog results are not each scroll-animated. There is no pinning, scroll hijack, looping background or layout-height animation.

A main-element-scoped match-media context owns all animations/triggers. Navigation-entry cleanup calls `revert()`, including same-path navigation entries. A disposed flag prevents late imports from registering against old DOM after unmount/Strict Mode cleanup. Initial reduced motion skips the imports; a change away from no-preference reverts active contexts. Content starts visible, stays at nonzero opacity during motion, and remains usable when import/setup fails.

Browser testing covered production route cycles and React Strict Mode route cycles with stable DOM/card counts and no captured application console errors. A local import-map fault probe confirmed GSAP rejection while content/navigation remained usable. A local matchMedia fixture tested the reduced-motion JavaScript branch with no animation preloads/styles and working validation. Native OS preference switching and heap profiling were NOT RUN; CSS reduced-motion behavior was reviewed in source. Local ignored fault fixtures are removed by the final build.

## 7. GitHub Repository Documentation

The existing English README was extended rather than replaced. It now documents current resource/motion features, real screenshots, source structure, all validation commands, privacy/access distinctions, deployment, maintenance and Phase 5 boundaries. New English resource and animation documents preserve the rationale, manual verification evidence and exclusions. Historical Arabic reports were not translated or erased.

The repository description was updated and read back successfully as: "An Arabic-first career guidance platform with personalized certification roadmaps and free learning resources." No name, visibility, collaborator, permission, secret or unrelated setting was changed.

## 8. Testing Results

| Check                                                  | Actual result                                                                                                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                                         | PASSED, zero warnings                                                                                                                     |
| `npm run typecheck`                                    | PASSED                                                                                                                                    |
| `npm run validate:catalog`                             | PASSED, original data counts and validation/search cases preserved                                                                        |
| `npm run validate:questionnaire`                       | PASSED, existing 9 grouped checks                                                                                                         |
| `npm run validate:roadmap`                             | PASSED, existing 24 grouped checks                                                                                                        |
| `npm run validate:learning-resources`                  | PASSED, new 24 grouped metadata/matching checks                                                                                           |
| `npm run build`                                        | PASSED, all four validators included                                                                                                      |
| Homepage render/scroll and career navigation           | PASSED, correct catalog track link and readable content                                                                                   |
| Full questionnaire → roadmap with resources            | PASSED using known HTML/CSS and desired JavaScript/React/TypeScript                                                                       |
| Eleven track/resource journeys                         | PASSED in browser, exactly three stages and at most four resource cards per stage                                                         |
| Form and keyboard regression                           | PASSED: required-field error/focus, native skill selection, previous/next, editing and regeneration                                       |
| Mobile menu                                            | PASSED: route navigation, Escape closure and focus restored to toggle                                                                     |
| Catalog                                                | PASSED: 70 records, AZ-900 result, no-result recovery and software-testing filter with four records                                       |
| Session/direct route                                   | PASSED: saved roadmap/resources restore after reload; corrupt session shows a helpful empty state                                         |
| Resource links                                         | PASSED: exact HTTPS destinations, `_blank`, `noopener noreferrer`; an actual roadmap action opened the official Playwright lesson         |
| Existing certification links/content                   | PASSED: retained catalog-resolved official URLs and prerequisite/status detail presentation; full issuer re-verification was not repeated |
| Responsive layout                                      | PASSED: homepage, catalog, all questionnaire steps and populated roadmap at 320/390/768/1024/1440 px, no horizontal overflow              |
| Motion fallback                                        | PASSED: simulated GSAP import rejection leaves content and navigation usable                                                              |
| Reduced-motion JS branch                               | PASSED via local matchMedia fixture; no animation preloads/inline motion styles, validation still works                                   |
| Native OS reduced-motion preference toggle             | NOT RUN; browser did not expose media emulation; CSS reduced-motion rules reviewed                                                        |
| React Strict Mode/route cleanup smoke                  | PASSED: repeated production/development route cycles, stable counts, no hidden controls/extra pin wrappers or captured application errors |
| Heap/leak profiler and full assistive-technology audit | NOT RUN                                                                                                                                   |
| Lighthouse                                             | NOT RUN; no Lighthouse CLI was available and no score is claimed                                                                          |
| New remote Actions/Pages deployment                    | Pending publication at report creation; final actual result supplied after push                                                           |

Resource fixtures include JavaScript, React, Python, Java instead of Python, cybersecurity/networking beginners, each cloud provider, SQL analytics, AI machine learning, Docker, PostgreSQL, automated testing, IT Support, empty desires, no verified coverage, overlap/deepening, corrupted storage and all eleven tracks. Invariants include determinism, valid matching IDs, bounded/deduplicated output, pending-source exclusion and unchanged answers/roadmap/certification data. Structural validation covers duplicate IDs/URLs, malformed/search/credential-bearing URLs, invalid types/languages/levels/registration, empty/unknown associations, inconsistent verification and future/invalid dates. It cannot independently certify pedagogical quality or free access; manual evidence supplies that separate check.

## 9. Performance

Both builds were measured locally from generated assets with the same `gzipSync` settings. Decimal kB is used; gzip values are estimates and may differ from Vite's display or CDN transfer compression.

| Asset group            | Before kB | After kB | Before gzip kB | After gzip kB |
| ---------------------- | --------- | -------- | -------------- | ------------- |
| Entry JavaScript       | 442.591   | 482.701  | 121.821        | 131.551       |
| Deferred GSAP core     | —         | 69.931   | —              | 27.192        |
| Deferred ScrollTrigger | —         | 42.736   | —              | 17.422        |
| All JavaScript total   | 442.591   | 595.368  | 121.821        | 176.165       |
| CSS                    | 39.307    | 50.829   | 8.489          | 10.554        |

Only GSAP was added. Animation chunks load after initial content and are skipped for an initial reduced-motion preference or a page without reveal targets. A fresh direct catalog load was verified to have no animation module preloads. The entry increase includes static resource data, matching/UI and visual integration. Fonts are unchanged. Screenshots are repository-only documentation assets, not added runtime downloads. There are no video iframes, autoplay, resource-feed network calls or remote decorative images. No unsupported Lighthouse or real-user speed claim is made.

## 10. Issues and Limitations

Learning coverage is intentionally incomplete, with 25 canonical skills lacking a verified source and some stages without a suitable source at their current level. The bounded matcher may omit otherwise related material because it is already used, exceeds the four-card limit, requires a conflicting technology or does not fit stage level. Projects/skills remain useful. Arabic coverage is 9 resources rather than a complete Arabic curriculum.

Public courses can move, become paid, require accounts or impose content/compute/time limits. Access disclosures distinguish free reading from software, labs, cloud usage and paid credentials. The Linux Foundation course discloses its advertised access window. Manual research did not play every lesson or complete registration/exercises. Third-party sources are independent and do not endorse Masari.

The visual review corrected an obsolete future-roadmap illustration caption, RTL inspection-date direction and translucent-header readability. GSAP's full license page was temporarily inaccessible as described above. The reduced-motion branch was simulated locally rather than changing the user's OS setting. Cleanup behavior was reviewed and smoke-tested, not heap-profiled. No recommendation-score, price, duration, certification eligibility or employment guarantee was introduced.

## 11. GitHub Status

Repository: [Mohammed-Alharbi-1/masari](https://github.com/Mohammed-Alharbi-1/masari)

Branch: `main`. Starting commit: `eb513ba678fb5ced28e7ded3a5a2674dbcdaf9be`. Authentication, branch, remote and clean working directory were inspected, origin fetched, and history confirmed compatible at 0/0 before edits.

This report is prepared before the required commit `feat: add learning resources and premium UI animations`. Its final SHA, push status and new Actions/Pages outcome are reported in final delivery after verification, rather than fabricated here. At report creation, Phase 4.5 code publication is pending; the previous Phase 4 deployment succeeded (run `40169271110`). Repository-description update has already succeeded.

Live site: [Masari](https://mohammed-alharbi-1.github.io/masari/)

The existing workflow remains unchanged. It installs from the lockfile, lints and builds with TypeScript plus all four validators, then deploys `dist/` through Pages Actions. Local QA fixtures are removed by the final build and cannot be part of the deployed artifact. No force push or repository/settings migration is required. Existing Pages configuration needs no additional manual setting.

## 12. Phase 5 Readiness

The roadmap and separate resource references provide stable stage/skill/credential/resource IDs for future local progress design. Phase 5 still needs explicit completion semantics, persistence/versioning and rules for reconciling changed answers, provider alternatives and obsolete courses. Self-reported knowledge must remain distinct from completed work, and free resource access must not imply certification attainment.

No progress storage, completed-task control, account, persistent roadmap history or Phase 5 functionality is implemented. No blocking data-contract migration is required to begin a separately authorized Phase 5, but coverage and external-source changes need continuing editorial care.

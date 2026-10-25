# Masari — مساري

An Arabic-first, anonymous career and certification guidance website for university students in computing-related majors. Masari helps students understand career options and learning credentials without promising employment or requiring an account.

**Current scope: Phase 4.** The static catalog contains **70 professional certifications**, **12 providers**, **11 career tracks**, **68 shared skills**, and **33 curated progression stages**. The anonymous questionnaire and rules-based personalized roadmaps are implemented. Long-term progress storage is **not implemented**.

## Available features

- Arabic RTL homepage and responsive navigation, including an accessible mobile menu.
- Eleven concise career cards linking to the corresponding catalog category.
- Local certification catalog with one search field, one career-track filter, and a live result count.
- Search by credential name, exam code, provider, Arabic description, track, or canonical skill name. Arabic diacritics and common alef variants are normalized.
- Cards show issuer, credential type, broad guidance level, availability, dated verification, official links, and expandable preparation/skill information.
- Empty-result recovery and safe official links opening in a new tab.
- Four-step anonymous questionnaire with relevant skill selection, optional learning preferences, answer summary, editing, reset, and validated session restoration.
- Personalized three-stage roadmaps with prioritized skills, practical milestones, optional credential choices, reasons and prerequisite warnings.
- Friendly roadmap empty state and an application-level 404 page.
- Existing editorial templates provide the foundation for deterministic personalization; alternative cloud providers remain separate paths.
- Lightweight data validation included in every production build.

## Technology

React, Vite, strict TypeScript, React Router with HashRouter, ordinary CSS variables, npm, GitHub Actions, and GitHub Pages. Fonts and SVG icons are local. There is no backend, database service, paid API, AI service, authentication, or additional state-management library. Phase 4 adds no dependencies.

## Install and run

Use **Node.js 24 or later** and npm from the project directory:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Use `npm install` only when intentionally changing dependencies and the lockfile.

| Command                    | Purpose                                                                         |
| -------------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`              | Start development server                                                        |
| `npm run lint`             | Run ESLint with zero allowed warnings                                           |
| `npm run typecheck`        | Check application, Vite configuration, and validation script                    |
| `npm run validate:catalog` | Validate credentials, providers, skills, tracks, templates, and search fixtures |
| `npm run build`            | Typecheck, validate data, and generate `dist/`                                  |
| `npm run preview`          | Preview the production output locally                                           |

The validation scripts run directly through Node's built-in TypeScript support. No testing framework or TypeScript runner dependency is required.

## Anonymous questionnaire

Open `#/questionnaire`. Required academic major and year are followed by one student-selected career track, two independent skill selections, and optional self-assessed level, budget preference, and weekly study availability. Major does not constrain career choice. Skill options come from `Skill.tracks`; each selection may be empty and the same skill may appear in both. Changing tracks clears both selections with an inline explanation while keeping academic information and preferences.

Only complete, validated submissions are stored under `sessionStorage["masari_questionnaire_v1"]`. Reloading the same browser session restores the summary. Editing is in memory until resubmission; reloading during editing restores the last saved submission. Reset clears the saved result. Drafts are not autosaved and leaving the route discards unsaved edits. Answers do not synchronize across devices or go to a remote service. Browser session restoration policies may retain tabs; session storage is not a secure deletion guarantee.

Invalid JSON, obsolete identifiers, unrelated skills, duplicates within one selection, missing fields, and extra fields are rejected. Blocked reads/writes/deletion show an Arabic notice and preserve in-memory operation. If deletion is blocked, a previously saved submission may return on reload. Optional skipped preferences are `null`; no costs, eligibility, or certification learning times are inferred.

Implementation: `src/data/questionnaireOptions.ts`, `src/types/questionnaire.ts`, `src/utils/questionnaireValidation.ts`, `src/utils/questionnaireStorage.ts`, `src/pages/QuestionnairePage.tsx`, `src/components/questionnaire/`, and `src/styles/questionnaire.css`. Run `npm run validate:questionnaire` for dependency-free validation/storage checks; the same checks run during production builds. See `PHASE3_REPORT.md` for the full implementation and actual test coverage.

## Personalized roadmaps

After reviewing the submitted questionnaire, use **Create My Career Path** to open `#/roadmap`. `generatePersonalizedRoadmap` in `src/utils/generateRoadmap.ts` is a pure deterministic TypeScript function, not an AI service. It validates answers, reads the chosen track template, and returns the three existing stages in foundation → intermediate → advanced order. No current date, randomness, storage or network access affects the engine.

Within a stage, priority is: desired skills not reported known; other missing stage skills; known skills the student wants to deepen; remaining familiar skills. Familiarity never marks work complete. Priorities are assigned once across stages; repeated concepts remain labeled for deeper practice. Desired skills outside the displayed template appear in additional focus. Self-assessed level changes starting guidance without skipping missing foundations. Academic major/year supply context and do not restrict career choice. Projects come directly from the curated templates.

Only existing template credential IDs can be considered. Candidates must exist, be active, verified, relevant to the selected track, and suitable for the stage level. A lexicographic comparison favors missing desired skills, overlapping known/desired skills, then other missing track skills. Template order breaks ties. A stage highlights at most one optional credential with at most two collapsed alternatives; no suitable candidate means projects and skills remain the path. Reasons name actual skill matches. Official URLs, prerequisite text, dated verification and issuer notices resolve from the catalog. Advanced options are future goals. Eligibility is not inferred from free-form prerequisite notes, and passing an exam is distinguished from qualifying for the full credential.

Software-development and testing paths do not impose Python or Python credentials without a Python signal. Explicit desired JavaScript, TypeScript, Java or C# takes priority over Python reported only as familiar. Cloud preferences use desired `aws` / `azure` / `google-cloud` first, then known platforms. One clear platform keeps all three credential stages on that provider. Multiple interests expose those provider paths as parallel alternatives; no platform interest exposes all three without a default winner. These paths are collapsed groups after the shared skill/project stages, not an AWS → Azure → Google ladder. Other tracks exclude explicitly conflicting platform-specific credentials when there is one clear preference.

Budget preferences add an unknown-price note, never a cost filter or affordability claim. Weekly availability changes generic study advice, never a credential duration or calendar. All catalog prices remain unknown. These are optional learning choices, not employer guarantees or mandatory purchases.

Navigation passes validated answers through router state, allowing immediate generation even when sessionStorage is blocked. A direct route falls back to validated session answers, otherwise shows an Arabic questionnaire link. The roadmap Edit action passes explicit edit intent to the existing form. That edit payload is consumed once so later resets/reloads cannot revive an older navigation snapshot. No generated roadmap is persisted. Browser history may retain navigation state as part of ordinary routing; no history feature is implemented.

To maintain the rules, edit `generateRoadmap.ts` and add representative assertions to `scripts/validate-roadmap.ts`. Adjust the existing editorial template when its learning sequence changes; never invent IDs or bypass catalog validation. Candidate selection is deliberately bounded to curated IDs rather than every catalog match. Run `npm run validate:roadmap`; it also runs during `npm run build`. `src/types/roadmap.ts` stores canonical IDs, stage metadata, focus categories, optional credential explanations and provider paths without copying credential records. `src/components/roadmap/` and `src/styles/roadmap.css` render the Arabic RTL interface. See `PHASE4_REPORT.md` for examples, coverage and limitations.

## Routes

| Hash route                                | Page                                              |
| ----------------------------------------- | ------------------------------------------------- |
| `#/`                                      | Homepage                                          |
| `#/certifications`                        | Searchable certification catalog                  |
| `#/certifications?track=software-testing` | Catalog with a selected career track              |
| `#/questionnaire`                         | Anonymous student questionnaire                   |
| `#/roadmap`                               | Personalized roadmap or questionnaire empty state |
| Any other application route               | 404 with working return link                      |

## Data and source structure

```text
src/
  data/
    types.ts              # Shared contracts, allowed values, Arabic UI labels
    providers.ts          # Issuers and approved source domains
    careerTracks.ts       # Eleven tracks; skill links derived from shared skills
    skills.ts             # Canonical skill IDs, Arabic/English names, track links
    certifications.ts     # Manually reviewed credential records
    roadmapTemplates.ts   # Three editorial stages per track, data only
    validateCatalog.ts    # Internal consistency and eligibility checks
    catalogSearch.ts      # Simple client-side search and track selection
  components/
    certifications/CertificationCard.tsx
    layout/               # Existing branding, header, footer
    ui/                   # Local icons and Coming Soon presentation
  pages/                  # Existing application routes
  styles/
    global.css            # Shared design tokens and responsive layout
    catalog.css           # Catalog, search controls, and card styling
scripts/validate-catalog.ts
.github/workflows/deploy.yml
PHASE2_5_REPORT.md
```

## Maintaining the catalog

1. Open the actual issuer page and confirm the official name, issuer, assessment type, availability, exam version, and any mandatory prerequisites. A search snippet or a working URL alone is not verification.
2. Add or update a `Certification` in `src/data/certifications.ts`. Keep its stable ID when the exam version changes. All original Phase 2 IDs are retained.
3. Reference an existing `providerId`, career-track IDs, and `skillIds`. Do not add free-form skill names to certification records. Add a genuinely distinct skill once in `skills.ts` and reuse its ID.
4. Add new issuers to `providers.ts` with their official website and approved `sourceDomains`. GitHub certifications are officially hosted on Microsoft Learn; CNCF works with The Linux Foundation. Domain approval is not a substitute for reading the source.
5. Set `verified` and the actual `lastVerifiedAt` date only after direct inspection. Use `pending` with `lastVerifiedAt: null` when not checked, `unknown` for unconfirmed availability, and `null` for unknown optional fields. Retired and unknown records have explicit UI labels.
6. Distinguish mandatory exam/certification/experience requirements from recommended preparation. Passing a professional exam does not necessarily satisfy the requirements to receive the full credential, particularly for experience-based ISC2 certifications or Microsoft Expert certifications.
7. Do not infer fees, currency conversions, Saudi pricing, free exams, HRDF support, or reimbursement. Current `examPrice` and `currency` values are all `null`, meaning unverified rather than free.
8. Record material issuer notices in `notesAr`. AWS Developer and Solutions Architect Professional, some Python exams, and selected Microsoft exam objectives have upcoming changes noted in the current snapshot. Recheck the live issuer page before booking.
9. Run the quality commands before publishing:

```sh
npm run lint
npm run typecheck
npm run validate:catalog
npm run validate:questionnaire
npm run validate:roadmap
npm run build
```

The current snapshot was manually reviewed on **2026-10-25**. Verification is dated, not continuous monitoring. Broad beginner/intermediate/advanced levels and skill/track mappings are Masari editorial classifications, not universal issuer difficulty ratings.

## Skills and progression policy

`skills.ts` defines 68 reusable skills. Each has one stable English ID, an Arabic student-facing name, an English name, and associated tracks. Track `skillIds` are derived from those associations to avoid two inconsistent lists. The old certification `skills` strings were migrated to `skillIds`; the existing 12 records keep their identities and official references.

Each template in `roadmapTemplates.ts` contains exactly **foundation → intermediate → advanced**, with skill references, a practical milestone, and zero or more optional certification IDs. `certificationChoice: "optional-options"` means that no purchase is mandatory and options may cover different roles. Foundational cloud credentials are alternative vendor choices; students generally do not need all three. Advanced stages have `futureGoal: true` and remain subject to issuer eligibility and real experience.

Templates are editorial learning sequences, **not issuer-mandated prerequisites** or automatic recommendations. Empty certification arrays are intentional where practice is more appropriate: advanced web development, intermediate AI, and advanced IT support currently use project milestones without a credential suggestion. The validator rejects inactive/unverified suggestions, mismatched track references, inappropriate advanced foundation suggestions, and invalid skill references.

The questionnaire consumes these canonical track and skill IDs directly. It does not request identifying information or an account. The generated roadmap reuses the same IDs. No localStorage flow or numeric proficiency scoring is implemented.

## Deployment

- Repository: [Mohammed-Alharbi-1/masari](https://github.com/Mohammed-Alharbi-1/masari)
- Site: [Masari](https://mohammed-alharbi-1.github.io/masari/)
- Branch: `main`

GitHub Pages is configured to use GitHub Actions. The existing workflow follows the repository's actual default branch, runs `npm ci`, lint, and build, uploads `dist/`, and deploys with the official Pages actions. Catalog, questionnaire and roadmap validation are included through the build command.

For a fork or a new repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**, and allow the default branch in the `github-pages` environment if protection rules apply. Push to the default branch or run the workflow manually from it. Confirm the actual Actions result; a local build alone does not verify remote publication.

`vite.config.ts` derives the project asset base from `GITHUB_REPOSITORY`. Renaming a repository requires a rebuild, not a hardcoded source change. User-site repositories ending in `.github.io` use `/`. For a custom domain, set `VITE_BASE_PATH: /` in the build environment and configure the domain separately.

To test a different repository path in PowerShell:

```powershell
$env:GITHUB_REPOSITORY = 'example/renamed-repository'
npm run build
npm run preview
# Open /renamed-repository/ on the printed preview server
Remove-Item Env:GITHUB_REPOSITORY
```

Rebuild after removing the variable to restore a root-path local build. HashRouter keeps client routes after `#`; fonts are processed by Vite and the favicon uses `BASE_URL`. See the [official Vite deployment guide](https://vite.dev/guide/static-deploy#github-pages).

## Deferred work and verification limits

Phase 4 provides deterministic personalized guidance. Phase 5 will add basic local progress tracking; no completion checkboxes, progress storage or roadmap history are implemented yet. Later exploration/comparison and final testing remain outside this phase.

The validator checks internal consistency and source domains, not source freshness or educational suitability. The catalog is cloud-heavy and some areas rely more on practical projects than paid credentials. Technical reports document exclusions, coverage, actual commands, browser checks, and publication state. Historical Phase 1/2 reports retain their original language and pre-publication snapshots; new technical documentation is in English.

IBM Plex Sans Arabic is bundled through Fontsource. Its SIL Open Font License is included in `public/fonts/OFL.txt`. No external images, issuer logos, or font-service requests are required during browsing.

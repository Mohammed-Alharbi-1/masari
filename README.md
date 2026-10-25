# Masari — مساري

An Arabic-first, anonymous career and certification guidance website for university students in computing-related majors. Masari helps students understand career options and learning credentials without promising employment or requiring an account.

**Current scope: Phase 3.** The static catalog contains **70 professional certifications**, **12 providers**, **11 career tracks**, **68 shared skills**, and **33 curated progression stages**. The anonymous four-step questionnaire is implemented. Personalized recommendations, generated roadmaps, and long-term progress storage are **not implemented**.

## Available features

- Arabic RTL homepage and responsive navigation, including an accessible mobile menu.
- Eleven concise career cards linking to the corresponding catalog category.
- Local certification catalog with one search field, one career-track filter, and a live result count.
- Search by credential name, exam code, provider, Arabic description, track, or canonical skill name. Arabic diacritics and common alef variants are normalized.
- Cards show issuer, credential type, broad guidance level, availability, dated verification, official links, and expandable preparation/skill information.
- Empty-result recovery and safe official links opening in a new tab.
- Four-step anonymous questionnaire with relevant skill selection, optional learning preferences, answer summary, editing, reset, and validated session restoration.
- Intentional Coming Soon page for the personal roadmap, plus an application-level 404 page.
- Static, editorial progression data for later phases; it is not displayed as a personalized roadmap.
- Lightweight data validation included in every production build.

## Technology

React, Vite, strict TypeScript, React Router with HashRouter, ordinary CSS variables, npm, GitHub Actions, and GitHub Pages. Fonts and SVG icons are local. There is no backend, database service, paid API, AI service, authentication, or additional state-management library. Phase 3 adds no dependencies.

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

Invalid JSON, obsolete identifiers, unrelated skills, duplicates within one selection, missing fields, and extra fields are rejected. Blocked reads/writes/deletion show an Arabic notice and preserve in-memory operation. If deletion is blocked, a previously saved submission may return on reload. Optional skipped preferences are `null`; no costs, recommendations, eligibility, or learning times are inferred.

Implementation: `src/data/questionnaireOptions.ts`, `src/types/questionnaire.ts`, `src/utils/questionnaireValidation.ts`, `src/utils/questionnaireStorage.ts`, `src/pages/QuestionnairePage.tsx`, `src/components/questionnaire/`, and `src/styles/questionnaire.css`. Run `npm run validate:questionnaire` for dependency-free validation/storage checks; the same checks run during production builds. See `PHASE3_REPORT.md` for the full implementation and actual test coverage.

## Routes

| Hash route                                | Page                                       |
| ----------------------------------------- | ------------------------------------------ |
| `#/`                                      | Homepage                                   |
| `#/certifications`                        | Searchable certification catalog           |
| `#/certifications?track=software-testing` | Catalog with a selected career track       |
| `#/questionnaire`                         | Anonymous student questionnaire            |
| `#/roadmap`                               | Personal roadmap information — Coming Soon |
| Any other application route               | 404 with working return link               |

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
9. Run all four quality commands before publishing:

```sh
npm run lint
npm run typecheck
npm run validate:catalog
npm run build
```

The current snapshot was manually reviewed on **2026-10-25**. Verification is dated, not continuous monitoring. Broad beginner/intermediate/advanced levels and skill/track mappings are Masari editorial classifications, not universal issuer difficulty ratings.

## Skills and progression policy

`skills.ts` defines 68 reusable skills. Each has one stable English ID, an Arabic student-facing name, an English name, and associated tracks. Track `skillIds` are derived from those associations to avoid two inconsistent lists. The old certification `skills` strings were migrated to `skillIds`; the existing 12 records keep their identities and official references.

Each template in `roadmapTemplates.ts` contains exactly **foundation → intermediate → advanced**, with skill references, a practical milestone, and zero or more optional certification IDs. `certificationChoice: "optional-options"` means that no purchase is mandatory and options may cover different roles. Foundational cloud credentials are alternative vendor choices; students generally do not need all three. Advanced stages have `futureGoal: true` and remain subject to issuer eligibility and real experience.

Templates are editorial learning sequences, **not issuer-mandated prerequisites** or automatic recommendations. Empty certification arrays are intentional where practice is more appropriate: advanced web development, intermediate AI, and advanced IT support currently use project milestones without a credential suggestion. The validator rejects inactive/unverified suggestions, mismatched track references, inappropriate advanced foundation suggestions, and invalid skill references.

The questionnaire consumes these canonical track and skill IDs directly. It does not request identifying information or an account. No localStorage flow, skill scoring, or generated roadmap is implemented.

## Deployment

- Repository: [Mohammed-Alharbi-1/masari](https://github.com/Mohammed-Alharbi-1/masari)
- Site: [Masari](https://mohammed-alharbi-1.github.io/masari/)
- Branch: `main`

GitHub Pages is configured to use GitHub Actions. The existing workflow follows the repository's actual default branch, runs `npm ci`, lint, and build, uploads `dist/`, and deploys with the official Pages actions. Catalog and questionnaire validation are included through the build command.

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

Phase 3 implements the anonymous questionnaire only. Later phases cover transparent recommendations, personalized roadmaps and locally stored progress, followed by deeper exploration/comparison and final testing. These later features remain unimplemented.

The validator checks internal consistency and source domains, not source freshness or educational suitability. The catalog is cloud-heavy and some areas rely more on practical projects than paid credentials. Technical reports document exclusions, coverage, actual commands, browser checks, and publication state. Historical Phase 1/2 reports retain their original language and pre-publication snapshots; new technical documentation is in English.

IBM Plex Sans Arabic is bundled through Fontsource. Its SIL Open Font License is included in `public/fonts/OFL.txt`. No external images, issuer logos, or font-service requests are required during browsing.

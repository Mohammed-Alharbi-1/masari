# Phase 3 Implementation Report

Date: 2026-10-25. Scope: anonymous student questionnaire only. Student-facing content remains Arabic RTL; this report and technical documentation are in English.

## 1. Phase Summary

Replaced the questionnaire placeholder with four interactive steps and a validated answer summary. Students can choose a career independently of their major, select relevant existing and desired skills, skip optional preferences, edit submissions, start over, and browse the existing catalog with their chosen track selected. No account, identifying fields, remote answer transmission, analytics, recommendation engine, ranking, generated roadmap, or progress tracking was added. Existing architecture and dependencies are preserved.

## 2. Files Created or Modified

| Path                                                    | Responsibility                                                                               |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `src/pages/QuestionnairePage.tsx`                       | Four-step state, navigation, validation feedback, persistence orchestration, privacy notices |
| `src/components/questionnaire/SkillSelector.tsx`        | Track-specific searchable native checkbox groups, counts, removal and empty choices          |
| `src/components/questionnaire/QuestionnaireSummary.tsx` | Answer summary, edit/reset actions, existing filtered catalog link                           |
| `src/data/questionnaireOptions.ts`                      | Stable academic/preference IDs and Arabic labels, step titles                                |
| `src/types/questionnaire.ts`                            | Submitted answer, draft and field-error contracts                                            |
| `src/utils/questionnaireValidation.ts`                  | Runtime schema checks and safe track-change transformation                                   |
| `src/utils/questionnaireStorage.ts`                     | Validated save/restore/reset with injected, fallible storage access                          |
| `src/styles/questionnaire.css`                          | Scoped responsive styles using existing tokens                                               |
| `src/App.tsx`                                           | Updated questionnaire document title                                                         |
| `scripts/validate-questionnaire.ts`                     | Dependency-free validation and storage regression assertions                                 |
| `package.json`                                          | New validation command, included in production build                                         |
| `README.md`                                             | Current scope, questionnaire behavior, privacy and testing documentation                     |
| `PHASE3_REPORT.md`                                      | This report                                                                                  |

Canonical catalog, provider, track, skill and roadmap template files are unchanged. No dependency or lockfile changes. The existing deployment workflow is unchanged and executes the new validator through `npm run build`.

## 3. Questionnaire Structure

1. **Academic information:** required major and academic year. Major IDs: `computer-science`, `software-engineering`, `information-technology`, `cybersecurity`, `information-systems`, `data-science`, `other-technical` (respectively Computer Science, Software Engineering, IT, Cybersecurity, Information Systems, Data Science, Other Technical). Year IDs: `first-year`, `second-year`, `third-year`, `fourth-year`, `fifth-year-or-more`, `graduate`.
2. **Career direction:** exactly one of the existing 11 canonical tracks, with its actual Arabic name and description. IDs: `web-development`, `software-development`, `cybersecurity`, `networking`, `cloud-computing`, `devops`, `data-analytics`, `artificial-intelligence`, `database-administration`, `it-support`, `software-testing`. No inference from academic major.
3. **Skills:** independent existing and desired multi-select groups. Each permits zero selections and has an explicit clear/none action. Overlap is allowed.
4. **Learning preferences:** optional self-assessed level (`beginner`, `intermediate`, `advanced`, `unsure`), budget (`free-preferred`, `up-to-500`, `501-to-1000`, `over-1000`, `undecided`), and weekly hours (`under-5`, `5-to-10`, `over-10`, `unsure`). Budget choices mean free preferred, up to SAR 500, SAR 501–1000, above SAR 1000, or undecided. Hour choices mean below 5, 5–10, above 10, or unsure. Unanswered fields are `null`. The explicit skip action clears all three preferences to `null` before completion.

Previous/Next preserve in-memory answers. Required steps cannot advance unanswered. Completion revalidates the whole object. The summary shows academic answers, selected track, both skill selections, and optional answers only when provided. It explains that recommendations and personal roadmaps arrive in a future phase. Its catalog action uses `#/certifications?track=<canonical-id>`.

## 4. Skills Integration

Both selectors filter the existing `skills` array using `Skill.tracks.includes(selectedTrack)`. There is no duplicated skill inventory. Track-specific skill counts are 15, 31, 20, 13, 30, 23, 19, 18, 10, 21, and 16 in the track order above. Initially at most 12 choices per group are shown; Show All/Show Less exposes the remainder. Search covers Arabic and English, case-insensitively, with Arabic diacritic/alef normalization. Search and expansion never remove selections. Selected chips offer removal even when search hides a checkbox; counts remain visible.

The same skill can be known and desired for deeper learning. Changing track clears both arrays, resets selector search state, and explains the change inline. Major, academic year and optional preferences remain intact. Selecting the same track preserves selections.

## 5. Data Model and Validation

`StudentQuestionnaireAnswers` has exactly eight fields:

```ts
{
  major: MajorId;
  academicYear: AcademicYearId;
  careerTrack: CareerTrack;
  existingSkillIds: string[];
  desiredSkillIds: string[];
  knowledgeLevel: KnowledgeLevel | null;
  budget: BudgetPreference | null;
  weeklyStudyTime: StudyTimePreference | null;
}
```

Academic/preference types derive from centralized option arrays. `CareerTrack` is reused from the existing catalog. Drafts allow null required IDs. Canonical values are stable English IDs, not display labels.

Runtime validation accepts only the exact current eight-field shape, supported major/year/track IDs, arrays of existing relevant skill IDs, unique IDs within each array, and supported preferences or null. Empty arrays and overlap across arrays are valid. Missing/extra fields, unsupported or obsolete IDs, inappropriate skills, duplicate IDs, malformed shapes, and invalid optional values are rejected. Successful validation constructs a fresh object and clones arrays. Both submission and storage access use this validator; the summary never accepts unvalidated data.

## 6. Session Storage

Key: `masari_questionnaire_v1`. No draft autosave. Only a complete valid submission is serialized. Initial restoration parses JSON as unknown and revalidates it before showing the summary. Invalid/obsolete data is ignored with an Arabic notice; it is replaced on a valid submission or removed on reset. Restoration performs no write during React initialization.

Editing starts from the submitted answers in React state. The previous saved submission remains until the student completes again; this is explicitly explained. Reset clears visible answers and attempts to remove the key. Getter, read, write and remove exceptions are caught. Failed writes attempt best-effort removal of stale saved answers. In-memory completion still works; if removal also fails the notice warns that previous saved answers can return after reload. There is no localStorage or remote persistence. Session data is browser/tab-specific and subject to browser tab/session restoration policies; there is no cross-device sync.

## 7. UI and Accessibility

Uses existing fonts, colors, buttons, spacing, RTL document and HashRouter. Four labeled steps and an accessible progress element show position. Native labeled selects, grouped radios and checkboxes support keyboard interaction. Required/optional indicators, inline Arabic errors, `aria-invalid`, descriptive error relationships, status notices and an alert explain outcomes. Focus moves to the heading after navigation and to the first invalid field after failed validation. Correcting values does not steal focus; radio arrow-key and checkbox Space behavior was verified.

Skill controls have compact two-column desktop layouts and one-column mobile layouts. Layout checks covered every step and the summary at 320, 390, 768, 1024 and 1440 pixels without horizontal overflow. New styles add no animations; existing reduced-motion support remains applicable. Automated screen-reader certification and a full assistive-technology audit were not performed.

## 8. Test Results

| Check                                                | Actual result                                                                                                                                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                                       | PASSED, zero warnings                                                                                                                                                                                               |
| `npm run typecheck`                                  | PASSED                                                                                                                                                                                                              |
| `npm run validate:catalog`                           | PASSED: 70 credentials, 12 providers, 11 tracks, 68 skills, 33 ordered stages; existing invalid-data/status/search checks                                                                                           |
| `npm run validate:questionnaire`                     | PASSED: 9 grouped checks, including every major/year/track combination, every relevant/irrelevant skill relationship, all preference IDs, malformed schemas, duplicate IDs, overlap, zero skills and storage faults |
| `npm run build`                                      | PASSED, includes both validators                                                                                                                                                                                    |
| Required academic and career validation              | PASSED in production preview; Arabic errors and first-invalid-field focus                                                                                                                                           |
| All 11 career tracks and both skill lists            | PASSED in browser, including expanded counts for each track; canonical membership also asserted by validator tests                                                                                                  |
| Multiple existing/desired skills and overlap         | PASSED; HTML/CSS existing and HTML/React desired, correct summary                                                                                                                                                   |
| Arabic/English search and no results                 | PASSED; Arabic CSS search, case-insensitive React search, clear-search recovery                                                                                                                                     |
| Clear/none actions and zero-skill completion         | PASSED in browser                                                                                                                                                                                                   |
| Optional answers, skip and Back/Next                 | PASSED; preferences preserved going back, explicit skip yields no optional summary rows                                                                                                                             |
| Summary, edit, track changes                         | PASSED; old skills cleared with explanation, academic/preferences preserved, replacement summary correct                                                                                                            |
| Valid reload restore, reset and unsaved draft reload | PASSED; saved summary restores, reset remains empty on reload, draft selection disappears on reload                                                                                                                 |
| Malformed JSON and unsupported stored IDs            | PASSED using temporary local QA fixture controls                                                                                                                                                                    |
| Blocked storage getter, write and removal            | PASSED using temporary local fixture pages; complete/edit/reset remain functional with persistence notices; pure helper tests cover read errors too                                                                 |
| 320/390/768/1024/1440 layouts                        | PASSED for all four steps and summary; document width never exceeded viewport                                                                                                                                       |
| Keyboard radio arrows and checkbox Space             | PASSED; selection and focus preserved                                                                                                                                                                               |
| Existing catalog and routes                          | PASSED: catalog search by AZ-900, details expansion, zero results, filtered summary link (11 data-analytics records), homepage, mobile menu navigation, unchanged roadmap placeholder                               |
| Browser error/warning logs                           | PASSED: no errors or warnings captured during local checks                                                                                                                                                          |
| Full screen-reader audit / multiple browser engines  | NOT RUN                                                                                                                                                                                                             |
| New remote Actions / Pages deployment                | Pending publication at report creation; actual result and commit supplied in final delivery                                                                                                                         |

Storage-fault browser fixtures were generated only inside ignored `dist/__qa__/`. They are removed by the final clean production build and are neither committed nor published. No diagnostic route or storage override is present in application source.

## 9. Issues and Limitations

A focus implementation initially coupled error clearing to heading focus. Review separated heading transitions from error focus; keyboard testing confirmed radio selection remains focused and working. There are no known blocking functional issues after testing.

Drafts live only while the questionnaire route is mounted; reload/navigation can discard unsubmitted edits. Editing retains the previous valid session submission until completion. Browser storage policies can prevent persistence or deletion; notices explain the resulting limits. Invalid stored objects are ignored rather than migrated. Completion duration is an approximate UX description, not a measured student study. Self-assessment and preferences are not verified competence, exam pricing, eligibility, or certification time estimates. No recommendation accuracy claim is made.

## 10. GitHub Status

Repository: https://github.com/Mohammed-Alharbi-1/masari

Branch: `main`. Starting commit: `07883f209dba3d497b9b3700014a3fb95f089911`. The working tree was clean and synchronized with `origin/main` before implementation; authentication and remote were checked and origin fetched. No repository recreation, unrelated setting changes, force push or deletion is required.

This report is written before the requested commit `feat: add anonymous student questionnaire`. Its final SHA, push outcome and new Actions/Pages results cannot be recorded in the same commit without a self-reference; they are supplied in the final delivery after verification. At report creation, publication of Phase 3 is pending. Previous deployment was successful (Actions run `40163011321`).

Pages URL: https://mohammed-alharbi-1.github.io/masari/

The existing workflow follows the default branch, installs with `npm ci`, runs lint and build (TypeScript plus both validators), and deploys `dist/` through Pages Actions. Pages already uses GitHub Actions; no additional setting is expected for this repository. For a fork, select Settings → Pages → Source → GitHub Actions and allow the default branch in the `github-pages` environment if protection rules apply. Site routing remains hash-based and asset base is derived from the repository name.

## 11. Phase 4 Readiness

A future engine can consume the exact validated answer object above, using canonical track/skill IDs and nullable optional preferences. Import `validateQuestionnaire` before trusting session data. Do not confuse major with chosen career, interpret an empty desired array as all skills, or reject overlap: overlap can represent deepening existing knowledge. Nullable preferences and `unsure`/`undecided` are distinct valid signals.

The engine still needs an explicitly designed, tested recommendation policy. It must respect desired technologies, cloud vendor alternatives, issuer prerequisites and experience requirements, practical project milestones, optional purchases and unknown prices. The catalog has no verified Saudi exam prices or certification learning-time data; neither can be inferred from questionnaire preferences. No recommendation, roadmap rendering or progress persistence is implemented in this phase.

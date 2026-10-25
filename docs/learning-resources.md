# Learning Resource Maintenance

The catalog in `src/data/learningResources.ts` is separate from professional certification data. It contains curated public learning destinations, not endorsements, promised certifications or an automated search feed. The typed contract lives in `src/types/learningResources.ts`; manual evidence is recorded in `docs/resource-verification.json`.

## Adding or updating a resource

1. Open the actual specific lesson, course, playlist or tutorial. A search snippet, channel homepage or HTTP success alone does not establish relevance or access.
2. Confirm actual publisher, subject, language, scope and access conditions. Prefer Arabic instruction where appropriate, then official vendor material and useful English project/documentation sources.
3. For YouTube, open the exact public video/playlist while signed out where feasible. Check creator, title and visible lesson subjects against the publisher's course page. Record the real URL and only details actually inspected. Never invent IDs, durations, ratings or certificates. Viewing a playlist is not proof that every lesson was played.
4. Verify that the learning content itself can be accessed without payment. Disclose free account enrollment, optional profiles, time-limited access and exercise requirements. Cloud runtime, tool licenses, compute quotas, optional verified certificates and professional exams may cost money even when the lesson is free. A paid trial or incomplete free preview should not be described as a free course.
5. Reference existing `skillIds` and `trackIds`; add no free-form skill taxonomy. A broad course can support several tracks through different relevant skills. Matching must always use a specific skill relevant to the selected track, rather than implying every course topic is required in every track.
6. Use a stable English ID and a canonical direct HTTPS URL. Reuse a record across skills/tracks rather than duplicating one course. Keep Arabic explanations and accurate actual publisher/title information. Levels are editorial guidance, not a provider exam difficulty claim.
7. Set `freeAccessVerified: true` and the actual inspection date only after verifying the claim. Pending records use `false` / `null` and are excluded from recommendations. Add source links and concise English observations to the evidence file. Structural validation cannot independently prove free access or teaching quality.
8. Run `npm run validate:learning-resources` and the existing quality commands. The production build runs all validators.

## Matching rules

`recommendLearningResources` consumes validated questionnaire answers and the already generated roadmap. Certification generation is unchanged. For each stage it considers missing desired skills, other missing stage skills, overlapping known/desired skills for deepening, and optional foundation review only when no new foundation priority exists. Desired skills outside the displayed template are assigned to the earliest suitable resource level. Empty desires do not imply all skills.

Candidates need verified free access, matching canonical skill and track, and a level no later than the current stage. Explicit desired language/platform signals override familiarity-only signals. Software/testing language-specific resources require a matching language signal, avoiding a Python course for a Java student. Platform-specific content must match explicit platform interests; general cloud concepts remain independent.

Within eligible skill matches, Arabic is preferred, then proximity to the optional self-assessed level/current stage, narrower skill scope, course/tutorial format before an otherwise tied reference, and stable ID ordering. These are deterministic editorial rules, not numeric student scores. At most four resources appear per stage, one per selected priority skill; a resource ID is used at most once across the roadmap. Resource IDs and reasons are returned rather than copied records.

Missing, pending or unsuitable resources do not block generation. Skills and projects remain, and the UI explains that a curated source is not yet available or was already shown. Do not substitute a search link or unrelated general course as an exact match.

## Keeping claims current

If a resource breaks, becomes paid, changes language or stops covering a skill, update the verified destination and mappings after inspecting it again. Otherwise mark it pending or remove it from active curation. Do not refresh dates automatically. Preserve stable IDs where the same course has moved. The validator rejects duplicate IDs/URLs, invalid types/languages/levels, unknown or empty associations, inconsistent metadata and future dates. It does not make live network calls.

The current snapshot was inspected on 2026-10-25. Every selected destination was opened during curation; full playback, enrollment, exercise execution and every linked sublesson were not tested. AWS Skill Builder/freeCodeCamp discovery seeds without inspectable specific course access were not used as recommendations. The Linux Foundation course discloses its advertised 90-day access window. Excel/cloud/GitHub resources disclose software, runtime or usage limitations. MIT OpenCourseWare is learning material, not academic credit or a professional certification.

No publisher is claimed to endorse Masari. Resource links transmit no questionnaire answers. Users who choose to leave Masari interact with the publisher under its own privacy/account terms.

# Phase 7 debugging report

Reviewed 2026-10-26–27. Baseline: `6d06684f26bd4f44e2dc75d1556db2b820a9b109`, clean `main`, synchronized with `origin/main` before implementation. All example answers and progress used for QA are synthetic.

## Confirmed defects

| ID / severity | Reproduction and evidence | Root cause | Fix | Regression verification |
| --- | --- | --- | --- | --- |
| D7-01 / Medium | Generate a web roadmap; edit and submit cybersecurity answers; use header **My roadmap** instead of the summary's generate link. Baseline still displayed web development. | Successful questionnaire submission updated the questionnaire snapshot but left a different active learning snapshot selected by header/direct navigation. | Open the validated submission in the learning store during completion. Existing same-track reconciliation and different-track isolation remain authoritative. | Real browser: web → cybersecurity submission → header, reload, Back/Forward all display cybersecurity, initially 0/20. Existing engine/progress tests retain resume isolation and reconciliation coverage. |
| D7-02 / Medium | Two opted-in stores/tabs share the same answers. A completes JavaScript; stale B completes HTML. Baseline B silently replaced A's saved progress. A restored stale session could do the same; undo could be resurrected. | Automatic writes compared answer identity, overlooking changes to progress with identical answers. | Compare the complete validated device snapshot with the snapshot reviewed by that store. On mismatch, preserve the device copy, pause automatic saving, retain temporary work, and show a conflict notice. Restored divergent sessions also start paused. No automatic union, because undo is intentional. | Three added progress scenarios cover stale writes, restoration and undo. Real tabs: A's saved JavaScript survived B's HTML toggle; B's opt-in became false; reload preserved B's temporary work. |
| D7-03 / Medium | Enable saving; make device `removeItem` fail; uncheck saving; then complete another activity. Baseline kept consent enabled and could continue writing. | Deletion failure returned before revoking active consent. | Always set active `deviceOptIn` false. Keep the old saved snapshot when removal fails and warn honestly. Notice remains outside the collapsed storage settings. | Added regression covers subsequent writes and reopened sessions. Production browser fixture denied deletion: checkbox stayed off, warning remained visible, later HTML completion did not alter the saved JavaScript-only snapshot. Normal deletion/reset also passed. |

The D7-02/D7-03 cases are local integrity/consent weaknesses, not demonstrated remote code execution. See [security assessment](SECURITY_AUDIT.md).

## Journey coverage

- Navigation: desktop/mobile links, direct hash routes, unknown route recovery, document titles, main focus, Back/Forward, Escape and menu-toggle focus restoration.
- Catalog: 70 initial results, English GitHub search (6), Arabic vocalized/unvocalized search (both 29), cybersecurity combined filter (16), web filter (6), empty state, reset, native details. HTTPS destinations and external-link attributes inspected; actual React learning link opened its official page in a new tab.
- Questionnaire: blank required fields rejected, native academic selects, all 11 choices rendered, web known/desired skills, track-change selection clearing, previous/edit flow, null preferences and specified advanced/free/under-five-hour preferences, submission and summary.
- Roadmap: web and cybersecurity context, three stages, missing skills before reported knowledge, no automatic completion, cloud with three separate provider alternatives, advanced self-assessment warning, empty/corrupt-data states. Node suites additionally exercise all 11 tracks and technology-specific recommendation exclusions.
- Progress: skill check/undo (0→1→0), project/resource completion (0→2), next-activity focus, session reload, explicit device consent, saved resume confirmation, reset/delete confirmations, stale tabs, failed write/remove and blocked storage.
- Fault fixtures: malformed JSON produced a controlled empty state. Denied storage still allowed a complete questionnaire and cloud roadmap with in-memory progress; device opt-in stayed false and displayed a failure notice.

## Motion and visual regressions

Final implementation review caught and corrected a visible-label/accessibility-name mismatch introduced by shortened completion text. Accessible names now begin with the exact visible action and retain the specific activity context. A production DOM check covered 22 rendered controls with zero prefix mismatches; skill toggle/undo and the clean browser console were rechecked.

Browser samples recorded actual hero translation, career reveal translation and timeline scale changes. Production navigation cycles returned to nine homepage triggers and zero after leaving for the catalog. Development React Strict Mode measured 9 → 9 after three cycles → 0 on exit. Reduced-motion simulation had no hero/career transforms. Blocking both lazy animation chunks left readable content and working navigation. Native OS motion switching and screen recording were NOT RUN.

All four routes were measured at 320, 375, 390, 430, 768, 1024, 1440 and 1920 pixels without document horizontal overflow. See [design evidence](DESIGN_REVIEW.md) and [machine-readable evidence](docs/phase7-check-evidence.json).

## Remaining limitations

Local storage read/compare/write is not an atomic transaction: truly interleaved simultaneous writes can still race. Storage errors cannot guarantee removal of an inaccessible old copy; users may need browser site-data controls. If both session writing and removal fail, consent revocation cannot be guaranteed across a reload. Shared browser profiles and same-origin applications share a trust boundary. No backend or locking subsystem was introduced.

No unresolved release-blocking defect was found in the tested flows. This is bounded testing, not exhaustive verification. Independent browser engines, physical devices, actual screen readers, native 200% zoom, field performance and external penetration testing were NOT RUN.

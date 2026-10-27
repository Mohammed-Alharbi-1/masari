# Phase 7 static frontend security audit

Reviewed 2026-10-26–27. Scope: React rendering, router/query inputs, questionnaire and progress JSON, browser storage/consent, catalog URLs, dependencies, built artifacts and the Pages workflow. No backend, authentication service, database or analytics was added. No confirmed remote XSS, prototype pollution, arbitrary execution, critical vulnerability or high-severity exploitable vulnerability was found in this bounded review. That is not a penetration-test certification.

## Findings

| ID | Component | Category | Severity | Evidence | Actual risk / exploitability | Fix | Verification | Remaining limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S7-01 | Progress store | Confirmed integrity weakness | Medium | Same-answer stale store overwrote newer completion/undo; two browser tabs reproduced the path. | Lost self-reported progress between tabs of the same origin; no remote attacker demonstrated. | Full validated snapshot comparison; pause and warn on conflict, including restored sessions. | New progress regressions; browser JavaScript-only saved snapshot survives stale HTML toggle. | Compare/write is non-atomic; no distributed merge guarantee. |
| S7-02 | Device opt-out | Confirmed consent weakness | Medium | Failed deletion left automatic writing enabled in baseline. | A denied storage operation could defeat the intended stop to future saving. | Revoke active consent even when deletion fails; preserve honest old-copy warning. | Node failure regression and production fault fixture; further toggle did not change device data. | Inaccessible old data still requires a retry/manual site-data deletion. Completely blocked session APIs limit reload guarantees. |
| S7-03 | Production document | Defense in depth | Low | No production CSP at baseline. No reachable XSS sink demonstrated. | Additional containment if a future unsafe code path appears. | Build-only meta CSP; no inline/eval script allowance, default deny; self-hosted assets; `no-referrer` metadata. | Production assets, forms, routes and GSAP work; adversarial fixture blocks inline script/handler, `Function` and fetch. CSSOM property update works. | Meta is weaker than HTTP delivery; `'self'` trusts the whole origin and its shipped code. |
| S7-04 | Dependencies / Actions | Maintenance improvement | Informational | Lockfile installation, current audit, SHA-pinned workflow actions and scoped permissions inspected. | Future supply-chain/advisory exposure remains possible. | Small weekly npm and GitHub Actions Dependabot version-update configuration. | `npm ci`, `npm ls --depth=0`, audit and build passed. Audit: 0 known vulnerabilities. | Does not claim security-alert settings or automatic security updates were enabled; version PRs require review. |
| S7-05 | Browser profile / hosting | Documented trust boundary | Informational | Opted-in answers and progress are readable by scripts/users sharing the origin/profile. | Another profile user or compromised same-origin app can access local data. | Preserve anonymous schema, explicit consent, deletion and shared-profile explanation. | Default opt-out, resume confirmation and removal/failure paths tested. | No encryption, account isolation or cross-device sync; Pages project paths are not separate origins. |
| S7-06 | Backend categories | Not Applicable | Not Applicable | There is no backend, session cookie authentication, database or privileged API. | SQL injection, server authorization and authenticated CSRF have no corresponding application surface here. | No invented server mitigations. | Source/dependency/connection inspection. | Reassess if architecture changes. |

## Input and rendering assessment

Questionnaire input is validated as unknown against the exact schema, current option IDs and bounded canonical skill lists. Progress envelopes require the expected version, fields, track and consent; known activity reconciliation prunes obsolete/irrelevant IDs. Router state accepts validated answers/edit intent, not arbitrary navigation destinations. Search/filter terms stay local and track IDs are checked against the catalog.

Markup-like identifiers, URL-like identifiers, extra prototype keys, malformed JSON, unconsented envelopes, oversized arrays and cross-track progress were exercised by the validation suites. No prototype mutation was observed. React renders text; source review found no application raw HTML sink, `eval`, `Function` or network request code. These searches are evidence about inspected code, not proof against every future dependency behavior.

External destinations come from the local catalog. Validators enforce HTTPS and reject embedded credentials; issuer links also use provider-domain rules. New homepage examples reuse existing resources and `target="_blank" rel="noopener noreferrer"`. Direct external navigation still works under `connect-src 'none'`; this directive is not a blanket prohibition of all outbound navigation.

## Production CSP

The Vite build injects `src/config/securityPolicy.ts` near the start of the document, before resource tags:

```text
default-src 'none'; script-src 'self'; script-src-attr 'none';
style-src 'self'; style-src-attr 'none'; font-src 'self'; img-src 'self';
connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'
```

The policy is intentionally absent in development, which needs HMR and style injection. Normal production form handlers prevent navigation, and CSSOM transform/opacity changes used by GSAP work in the tested browser without `unsafe-inline` or `unsafe-eval`. Deliberately blocked animation chunks are caught and do not hide content.

Meta cannot supply `frame-ancestors`, `sandbox`, report-only enforcement or `report-uri`; this does **not** fix clickjacking or establish HTTP security headers. No fictitious `_headers` file was added. GitHub Pages hosting headers and account settings were not changed. CSP remains additional protection rather than a substitute for safe rendering. See [OWASP XSS guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [OWASP CSP guidance](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html), [CSP meta limitations](https://www.w3.org/TR/CSP3/#meta-element), and [CSSOM versus inline styles](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src).

The instrumented IAB fixture also emitted an inline-style CSP violation with empty source filename (line 126), without a surviving application style element. Attribution was not established; visible production styles and sampled GSAP transforms worked. Deliberate probe violations are expected. Do not interpret the fixture as a clean cross-browser CSP certification.

## Repository and artifact hygiene

`.gitignore` excludes environment files, credentials, keys, dependencies, logs, build output and coverage. No dependency or lockfile versions changed. The existing deploy workflow uses exact action SHAs, `npm ci`, lint/build and job-scoped permissions: build reads contents/Pages; deploy writes Pages and requests OIDC. No user-answer upload, credentials or broad contents write permission was added. No repository visibility, collaborators, secrets or branch protection changed. Dependabot is version-update configuration only.

QA scripts live in ignored `dist/__qa__` or an external visualization directory and are excluded from the clean release build. Reports/screenshots contain synthetic examples. Changed/staged filenames and source patterns are checked before publication; no secret values are printed or stored.

## Verification limits

The audit is a dated dependency/source/browser review. Independent Firefox/WebKit, physical devices, formal penetration testing, screen readers, and hosting-header changes were NOT RUN. Browser storage is unencrypted. Third-party learning pages can change and are outside Masari's execution boundary. A zero-advisory npm audit is not a guarantee of security.

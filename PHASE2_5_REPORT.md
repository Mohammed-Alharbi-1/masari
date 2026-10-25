## 1. Phase Summary

Phase 2.5 expands the existing Masari application without reinitializing it or changing its stack. The catalog now has **70 authentic professional certifications** (58 added, 12 retained), **12 providers**, **11 tracks**, **68 canonical skills**, and **33 curated progression stages**. The 60–80 credential target is met without filler course certificates or invented exam versions.

The Arabic RTL interface remains intact. Minimal browsing controls were added for the larger catalog. Progression templates are static data only: no questionnaire, personalized recommendation, generated roadmap, student answer storage, authentication, backend, AI service, or progress tracking was implemented. No dependencies were added and the existing npm scripts, GitHub Pages configuration, and remote remain in place.

This report is a pre-commit/pre-push snapshot after local implementation and tests. Publication is attempted afterward; the final response records the actual new SHA, push outcome, Actions result, and live-site verification rather than fabricating them here.

## 2. Files Created or Modified

| Path                                                | Change   | Purpose                                                                                       |
| --------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| src/data/types.ts                                   | Modified | Eleven track IDs; canonical skill references; skill and static progression contracts          |
| src/data/skills.ts                                  | Created  | 68 canonical skills, bilingual labels, shared track associations                              |
| src/data/careerTracks.ts                            | Modified | 11 track definitions; relevant skill IDs derived from the central taxonomy                    |
| src/data/certifications.ts                          | Modified | 70 credentials, 58 additions, migration of the original 12, dated issuer notices              |
| src/data/providers.ts                               | Modified | 12 providers and approved source domains                                                      |
| src/data/roadmapTemplates.ts                        | Created  | 11 editorial templates, 33 ordered stages, optional credentials and practical milestones      |
| src/data/validateCatalog.ts                         | Modified | Skill/template relationships, stage order, optionality, and active-suggestion safeguards      |
| src/data/catalogSearch.ts                           | Created  | Small client-side text search and one track filter                                            |
| scripts/validate-catalog.ts                         | Modified | 44 invalid-data mutations, 3 honest-status cases, 8 search/filter assertions, coverage output |
| src/components/certifications/CertificationCard.tsx | Modified | Native disclosure for canonical skills and issuer preparation/eligibility text                |
| src/pages/CertificationsPage.tsx                    | Modified | Search, one track selector, live count, empty-state reset, shared-link selection              |
| src/pages/HomePage.tsx                              | Modified | 11 concise track cards with working links into the catalog                                    |
| src/styles/catalog.css                              | Modified | Accessible responsive controls and disclosures                                                |
| src/styles/global.css                               | Modified | Compact expanded track explorer without redesigning the homepage                              |
| README.md                                           | Modified | English technical documentation, data maintenance, future boundaries, deployment              |
| PHASE2_5_REPORT.md                                  | Created  | This English implementation and verification report                                           |

Historical Phase 1 and Phase 2 reports are preserved. New technical documentation is English; student-facing data remains Arabic.

## 3. Career Tracks

| ID                      | English name                                 | Credential coverage | Skills | Stages |
| ----------------------- | -------------------------------------------- | ------------------- | ------ | ------ |
| web-development         | Web development                              | 6                   | 15     | 3      |
| software-development    | Software development                         | 14                  | 31     | 3      |
| cybersecurity           | Cybersecurity                                | 16                  | 20     | 3      |
| networking              | Networking                                   | 5                   | 13     | 3      |
| cloud-computing         | Cloud computing                              | 37                  | 30     | 3      |
| devops                  | DevOps and automation                        | 18                  | 23     | 3      |
| data-analytics          | Data analytics                               | 11                  | 19     | 3      |
| artificial-intelligence | Artificial intelligence and machine learning | 4                   | 18     | 3      |
| database-administration | Database administration                      | 6                   | 10     | 3      |
| it-support              | IT support and systems administration        | 13                  | 21     | 3      |
| software-testing        | Software testing                             | 4                   | 16     | 3      |

The original four identifiers are unchanged. The seven new IDs match the assignment exactly; there are no extra career categories. Arabic display labels and descriptions are in careerTracks.ts. Track skill references are derived from the central skill associations so they cannot silently drift into a second independent list.

## 4. Certification Catalog

- Total: **70**; added: **58**; retained: **12**.
- A one-off comparison against Phase 2 commit da53135 confirmed all 12 original IDs, names, provider IDs, codes, credential types, official URLs, and source URLs are retained.
- Free-form skill strings were carefully migrated to canonical skillIds; useful descriptions, prerequisites, prices, availability, and verification fields were preserved. Track associations were extended where relevant.
- All prices and currencies remain null, which means unverified, never free.

| Provider                    | Count |
| --------------------------- | ----- |
| Cisco                       | 5     |
| Amazon Web Services (AWS)   | 9     |
| Microsoft                   | 17    |
| GitHub                      | 5     |
| Google Cloud                | 13    |
| The Linux Foundation        | 1     |
| CNCF / The Linux Foundation | 5     |
| Red Hat                     | 1     |
| ISC2                        | 4     |
| OpenEDG Python Institute    | 6     |
| ISTQB                       | 2     |
| Databricks                  | 2     |

| Distribution    | Value                      | Count |
| --------------- | -------------------------- | ----- |
| Level           | beginner                   | 18    |
| Level           | intermediate               | 32    |
| Level           | advanced                   | 20    |
| Level           | unknown                    | 0     |
| Credential type | professional-certification | 70    |
| Credential type | course-completion          | 0     |
| Credential type | digital-badge              | 0     |
| Verification    | verified                   | 70    |
| Verification    | pending                    | 0     |
| Availability    | active                     | 70    |
| Availability    | retired                    | 0     |
| Availability    | unknown                    | 0     |

Track counts are in section 3 and overlap because one credential can support more than one track. No course or badge was mislabeled to reach the target. Web-related credentials support programming, collaboration, security, automation, or cloud deployment; they do not claim to prove complete HTML/CSS/frontend proficiency.

New credentials and actual official URLs:

| Credential                                                                        | Issuer                      | Official page                                                                                                                                   |
| --------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Microsoft Certified: Azure Administrator Associate                                | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/)                                   |
| Microsoft Certified: Azure Solutions Architect Expert                             | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/)                             |
| Microsoft Certified: Power BI Data Analyst Associate                              | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/)                                |
| Microsoft Certified: Azure Database Administrator Associate                       | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/azure-database-administrator-associate/)                |
| Microsoft Certified: Azure Data Fundamentals                                      | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/)                               |
| Microsoft Certified: Fabric Data Engineer Associate                               | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/)                        |
| Microsoft Certified: Fabric Analytics Engineer Associate                          | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/fabric-analytics-engineer-associate/)                   |
| Microsoft Certified: Identity and Access Administrator Associate                  | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/)                     |
| Microsoft Certified: Azure Network Engineer Associate                             | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/azure-network-engineer-associate/)                      |
| Microsoft Certified: DevOps Engineer Expert                                       | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/)                                       |
| Microsoft Certified: Windows Server Administrator Associate                       | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/windows-server-hybrid-administrator/)                   |
| Microsoft Certified: Security Operations Analyst Associate                        | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/)                           |
| Microsoft Certified: Information Security Administrator Associate                 | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/information-security-administrator/)                    |
| Microsoft Certified: Cybersecurity Architect Expert                               | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/cybersecurity-architect-expert/)                        |
| GitHub Administration                                                             | GitHub                      | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/github-administration/)                                 |
| GitHub Advanced Security                                                          | GitHub                      | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/github-advanced-security/)                              |
| GitHub Copilot                                                                    | GitHub                      | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/)                                        |
| Microsoft Certified: Cloud and AI Security Engineer Associate                     | Microsoft                   | [Official credential page](https://learn.microsoft.com/en-us/credentials/certifications/cloud-and-ai-security-engineer-associate/)              |
| AWS Certified AI Practitioner                                                     | Amazon Web Services (AWS)   | [Official credential page](https://aws.amazon.com/certification/certified-ai-practitioner/)                                                     |
| AWS Certified Data Engineer - Associate                                           | Amazon Web Services (AWS)   | [Official credential page](https://aws.amazon.com/certification/certified-data-engineer-associate/)                                             |
| AWS Certified CloudOps Engineer - Associate                                       | Amazon Web Services (AWS)   | [Official credential page](https://aws.amazon.com/certification/certified-cloudops-engineer-associate/)                                         |
| AWS Certified Solutions Architect - Professional                                  | Amazon Web Services (AWS)   | [Official credential page](https://aws.amazon.com/certification/certified-solutions-architect-professional/)                                    |
| AWS Certified DevOps Engineer - Professional                                      | Amazon Web Services (AWS)   | [Official credential page](https://aws.amazon.com/certification/certified-devops-engineer-professional/)                                        |
| AWS Certified Security - Specialty                                                | Amazon Web Services (AWS)   | [Official credential page](https://aws.amazon.com/certification/certified-security-specialty/)                                                  |
| Generative AI Leader                                                              | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/generative-ai-leader)                                                   |
| Associate Google Workspace Administrator                                          | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/associate-google-workspace-administrator)                               |
| Associate Data Practitioner                                                       | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/data-practitioner)                                                      |
| Professional Cloud Architect                                                      | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/cloud-architect)                                                        |
| Professional Cloud Database Engineer                                              | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/cloud-database-engineer)                                                |
| Professional Cloud Developer                                                      | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/cloud-developer)                                                        |
| Professional Data Engineer                                                        | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/data-engineer)                                                          |
| Professional Cloud DevOps Engineer                                                | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/cloud-devops-engineer)                                                  |
| Professional Cloud Security Engineer                                              | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/cloud-security-engineer)                                                |
| Professional Cloud Network Engineer                                               | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/cloud-network-engineer)                                                 |
| Professional Machine Learning Engineer                                            | Google Cloud                | [Official credential page](https://cloud.google.com/learn/certification/machine-learning-engineer)                                              |
| PCEP – Certified Entry-Level Python Programmer                                    | OpenEDG Python Institute    | [Official credential page](https://pythoninstitute.org/pcep)                                                                                    |
| PCAP – Certified Associate Python Programmer                                      | OpenEDG Python Institute    | [Official credential page](https://pythoninstitute.org/pcap)                                                                                    |
| PCPP1 – Certified Professional Python Programmer Level 1                          | OpenEDG Python Institute    | [Official credential page](https://pythoninstitute.org/pcpp1)                                                                                   |
| PCED – Certified Entry-Level Data Analyst with Python                             | OpenEDG Python Institute    | [Official credential page](https://pythoninstitute.org/pced)                                                                                    |
| PCET – Certified Entry-Level Tester with Python                                   | OpenEDG Python Institute    | [Official credential page](https://pythoninstitute.org/pcet)                                                                                    |
| PCAT – Certified Associate Tester with Python                                     | OpenEDG Python Institute    | [Official credential page](https://pythoninstitute.org/pcat)                                                                                    |
| Linux Foundation Certified System Administrator (LFCS)                            | The Linux Foundation        | [Official credential page](https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/)                        |
| Kubernetes and Cloud Native Associate (KCNA)                                      | CNCF / The Linux Foundation | [Official credential page](https://www.cncf.io/training/certification/kcna/)                                                                    |
| Kubernetes and Cloud Security Associate (KCSA)                                    | CNCF / The Linux Foundation | [Official credential page](https://www.cncf.io/training/certification/kcsa/)                                                                    |
| Certified Kubernetes Administrator (CKA)                                          | CNCF / The Linux Foundation | [Official credential page](https://www.cncf.io/training/certification/cka/)                                                                     |
| Certified Kubernetes Application Developer (CKAD)                                 | CNCF / The Linux Foundation | [Official credential page](https://www.cncf.io/training/certification/ckad/)                                                                    |
| Certified Kubernetes Security Specialist (CKS)                                    | CNCF / The Linux Foundation | [Official credential page](https://www.cncf.io/training/certification/cks/)                                                                     |
| Red Hat Certified System Administrator (RHCSA)                                    | Red Hat                     | [Official credential page](https://www.redhat.com/en/services/certification/rhcsa)                                                              |
| CC – Certified in Cybersecurity                                                   | ISC2                        | [Official credential page](https://www.isc2.org/certifications/cc)                                                                              |
| SSCP – Systems Security Certified Practitioner                                    | ISC2                        | [Official credential page](https://www.isc2.org/certifications/sscp)                                                                            |
| CISSP – Certified Information Systems Security Professional                       | ISC2                        | [Official credential page](https://www.isc2.org/certifications/cissp)                                                                           |
| CCSP – Certified Cloud Security Professional                                      | ISC2                        | [Official credential page](https://www.isc2.org/certifications/ccsp)                                                                            |
| ISTQB Certified Tester Foundation Level (CTFL) v4.0                               | ISTQB                       | [Official credential page](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/)                                       |
| ISTQB Certified Tester Advanced Level Test Automation Engineering (CTAL-TAE) v2.0 | ISTQB                       | [Official credential page](https://istqb.org/certifications/certified-tester-advanced-level-test-automation-engineering-ctal-tae-v2-0/)         |
| Databricks Certified Data Engineer Associate                                      | Databricks                  | [Official credential page](https://www.databricks.com/learn/certification/data-engineer-associate)                                              |
| Databricks Certified Data Analyst Associate                                       | Databricks                  | [Official credential page](https://www.databricks.com/learn/certification/data-analyst-associate)                                               |
| Cisco Certified Support Technician (CCST) IT Support                              | Cisco                       | [Official credential page](https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/index.html)         |
| Cisco Certified Network Professional (CCNP) Enterprise                            | Cisco                       | [Official credential page](https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccnp-enterprise/index.html) |

The existing 12 remain fully listed in certifications.ts and the deployed catalog. A shared Cisco CCST source page intentionally covers three distinct credentials; duplicate URLs do not imply duplicate records.

## 5. Skills Catalog

The structured source is **src/data/skills.ts**. Each Skill has a stable English id, Arabic nameAr, English nameEn, and associated career tracks. Certification records and all progression stages reference those IDs rather than variations of unstructured skill names. Shared skills such as SQL, Python, Git, Linux, IAM, and CI/CD are reused across relevant tracks.

Supported skill IDs (68):

- html — HTML
- css — CSS
- javascript — JavaScript
- typescript — TypeScript
- react — React
- rest-apis — REST APIs
- git — Git
- programming-fundamentals — Programming fundamentals
- object-oriented-programming — Object-oriented programming
- algorithms — Algorithms
- data-structures — Data structures
- software-architecture — Software architecture
- python — Python
- java — Java
- csharp — C#
- networking-fundamentals — Networking fundamentals
- tcp-ip — TCP/IP
- routing — Routing
- switching — Switching
- network-troubleshooting — Network troubleshooting
- network-security — Network security
- linux — Linux
- windows — Windows
- operating-systems — Operating systems
- computer-hardware — Computer hardware
- troubleshooting — Troubleshooting
- endpoint-management — Endpoint management
- security-fundamentals — Security fundamentals
- identity-access-management — Identity and access management
- security-monitoring — Security monitoring
- incident-response — Incident response
- vulnerability-management — Vulnerability management
- security-governance — Security governance
- risk-management — Risk management
- it-audit — IT audit
- cloud-fundamentals — Cloud fundamentals
- aws — AWS
- azure — Azure
- google-cloud — Google Cloud
- cloud-architecture — Cloud architecture
- ci-cd — CI/CD
- docker — Docker
- kubernetes — Kubernetes
- infrastructure-as-code — Infrastructure as Code
- monitoring — Monitoring
- observability — Observability
- sql — SQL
- relational-modeling — Relational modeling
- postgresql — PostgreSQL
- database-administration — Database administration
- query-optimization — Query optimization
- backup-recovery — Backup and recovery
- excel — Excel
- data-visualization — Data visualization
- power-bi — Power BI
- statistics — Statistics
- data-engineering — Data engineering
- mathematics — Mathematics foundations
- machine-learning — Machine learning
- model-evaluation — Model evaluation
- deep-learning — Deep learning
- generative-ai — Generative AI fundamentals
- testing-fundamentals — Testing fundamentals
- test-case-design — Test case design
- api-testing — API testing
- test-automation — Test automation
- quality-assurance — Quality assurance
- shell-scripting — Shell scripting

This is an editorial taxonomy, not a skill examination, proficiency score, selection UI, or evidence that a student possesses a skill. Future questionnaire options can filter these stable entries by track and store ID arrays without another migration.

## 6. Roadmap Templates

Every track has exactly foundation, intermediate, and advanced stages in that order. Each stage has an Arabic title/explanation, canonical skill IDs, zero or more suggested credential IDs, and a concrete practical milestone. The parent template supplies its track ID. certificationChoice is optional-options throughout; advanced stages have futureGoal: true.

| Track                   | Foundation choices                                                                                                                                             | Intermediate choices                                                                                                                                                | Advanced future choices                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| web-development         | GitHub Foundations                                                                                                                                             | GitHub Actions                                                                                                                                                      | Project/skill milestone only                                                                                                              |
| software-development    | PCEP – Certified Entry-Level Python Programmer                                                                                                                 | PCAP – Certified Associate Python Programmer                                                                                                                        | PCPP1 – Certified Professional Python Programmer Level 1                                                                                  |
| cybersecurity           | Cisco Certified Support Technician (CCST) Cybersecurity; CC – Certified in Cybersecurity; Microsoft Certified: Security, Compliance, and Identity Fundamentals | Microsoft Certified: Security Operations Analyst Associate; SSCP – Systems Security Certified Practitioner                                                          | CISSP – Certified Information Systems Security Professional; Microsoft Certified: Cybersecurity Architect Expert                          |
| networking              | Cisco Certified Support Technician (CCST) Networking                                                                                                           | Cisco Certified Network Associate (CCNA)                                                                                                                            | Cisco Certified Network Professional (CCNP) Enterprise; Professional Cloud Network Engineer                                               |
| cloud-computing         | AWS Certified Cloud Practitioner; Microsoft Certified: Azure Fundamentals; Cloud Digital Leader                                                                | AWS Certified Solutions Architect - Associate; Microsoft Certified: Azure Administrator Associate; Associate Cloud Engineer                                         | AWS Certified Solutions Architect - Professional; Microsoft Certified: Azure Solutions Architect Expert; Professional Cloud Architect     |
| devops                  | Kubernetes and Cloud Native Associate (KCNA)                                                                                                                   | GitHub Actions; Certified Kubernetes Administrator (CKA)                                                                                                            | Certified Kubernetes Security Specialist (CKS); AWS Certified DevOps Engineer - Professional; Microsoft Certified: DevOps Engineer Expert |
| data-analytics          | PCED – Certified Entry-Level Data Analyst with Python; Microsoft Certified: Azure Data Fundamentals                                                            | Microsoft Certified: Power BI Data Analyst Associate; Databricks Certified Data Analyst Associate                                                                   | Professional Data Engineer                                                                                                                |
| artificial-intelligence | AWS Certified AI Practitioner; Generative AI Leader                                                                                                            | Project/skill milestone only                                                                                                                                        | Professional Machine Learning Engineer                                                                                                    |
| database-administration | Microsoft Certified: Azure Data Fundamentals                                                                                                                   | Microsoft Certified: Azure Database Administrator Associate                                                                                                         | Professional Cloud Database Engineer                                                                                                      |
| it-support              | Cisco Certified Support Technician (CCST) IT Support                                                                                                           | Linux Foundation Certified System Administrator (LFCS); Red Hat Certified System Administrator (RHCSA); Microsoft Certified: Windows Server Administrator Associate | Project/skill milestone only                                                                                                              |
| software-testing        | ISTQB Certified Tester Foundation Level (CTFL) v4.0; PCET – Certified Entry-Level Tester with Python                                                           | PCAT – Certified Associate Tester with Python                                                                                                                       | ISTQB Certified Tester Advanced Level Test Automation Engineering (CTAL-TAE) v2.0                                                         |

These are editorial learning sequences, **not official prerequisite chains**. Options can cover different roles and are not guaranteed equivalents. Foundation cloud certifications are explicit vendor alternatives; a student generally does not need all three. ISC2 experience requirements, Microsoft Expert prerequisite certifications, CKA before CKS, and ISTQB advanced prerequisites remain issuer rules in the credential records, separate from Masari's sequencing.

Empty suggestion arrays are deliberate for advanced web development, intermediate AI, and advanced IT support. Projects and skills are more appropriate than manufacturing a paid-certification requirement. AI coverage is smaller than cloud coverage; no ambiguous or not-yet-launched credential was invented to fill it. The templates are not imported into the React UI, displayed as personal results, or used by an automatic engine.

## 7. Data Verification

Actual verification date: **2026-10-25**, not the issuer's page-update date. The original 12 retain their same-day Phase 2 verification; AWS Developer's source was reopened in this phase. All 58 additions were directly inspected on official issuer pages by bounded research assignments, followed by integration review. Availability was based on current certification/assessment and registration information, not a search snippet alone.

The official credential pages listed in section 4 were inspected across Microsoft Learn/GitHub, AWS, Google Cloud, Cisco, Python Institute, Linux Foundation, CNCF, Red Hat, ISC2, ISTQB, and Databricks. Additional sources actually inspected include the following:

- [AWS Certified AI Practitioner official exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)
- [AWS Certified Data Engineer - Associate official exam guide](https://docs.aws.amazon.com/aws-certification/latest/data-engineer-associate-01/data-engineer-associate-01.html)
- [AWS Certified CloudOps Engineer - Associate official exam guide](https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03.html)
- [AWS Certified Solutions Architect - Professional official exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/solutions-architect-professional-02.html)
- [AWS Certified DevOps Engineer - Professional official exam guide](https://docs.aws.amazon.com/aws-certification/latest/devops-engineer-professional-02/devops-engineer-professional-02.html)
- [AWS Certified Security - Specialty official exam guide](https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html)
- [ISC2 SSCP experience requirements](https://www.isc2.org/certifications/sscp/sscp-experience-requirements)
- [ISC2 CISSP experience requirements](https://www.isc2.org/certifications/cissp/cissp-experience-requirements)
- [ISC2 CCSP experience requirements](https://www.isc2.org/certifications/ccsp/ccsp-experience-requirements)
- [Red Hat EX200 assessment](https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam)
- [Retired Azure Developer Associate page](https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/)

Material findings and exclusions:

- AWS Developer DVA-C02 is still current on October 25. Its page announces DVA-C03 registration opening October 27 and the C02 final date November 30. One stable credential ID is retained with a visible dated notice.
- AWS Solutions Architect Professional has a SAP-C02 to SAP-C03 transition notice. CloudOps Engineer SOA-C03 is the current name; an obsolete parallel SysOps record was not added.
- AWS ML Engineer Associate was excluded because its current beta comparison used conflicting code labels and the previous English exam had ended. Advanced Networking Specialty's announced near-term retirement makes it inappropriate as a default future template goal. Google Agentic Architect GA is not yet launched and was excluded.
- Windows Server's inspected page currently uses Windows Server Administrator Associate and AZ-802. SC-500 Cloud and AI Security Engineer Associate was followed from Microsoft's official prerequisite links. Azure Developer Associate's page explicitly marks it retired; it is not offered as an active new-learner prerequisite.
- Microsoft DP-300/SC-300 and Python PCEP/PCAP/PCPP1 have upcoming updates recorded in the data. Do not duplicate credential records just because their exam versions change.
- LFCA and the old RHCE candidate links were excluded due retirement/redirect ambiguity; this is not an unsupported blanket claim that every regional variant or possible successor is retired.
- ISC2 exam passage is distinguished from earning the full certification. Associate status is not called CISSP, SSCP, or CCSP. Advanced objectives are future goals and not beginner shopping lists.

All included records are verified and active in this dated snapshot; pending/unknown/retired states remain supported and tested rather than populated with fake examples. Some prerequisites and standalone codes remain null where not established. Global list prices were not converted into Saudi prices; no free-exam, HRDF, reimbursement, affiliation, or employment claim was invented. Skill mappings and broad levels are editorial, not issuer mandates. Automated domain/date checks cannot replace this manual source review or guarantee future freshness.

## 8. Frontend Changes

The existing design system, Arabic typography, RTL, header/footer, and routing are preserved. The homepage now has eleven compact career cards with working category links instead of eleven oversized feature panels. The catalog uses local data, one labeled search field, one labeled career-track selector, an accessible live count, and a working no-results reset.

Search matches names, codes, providers, Arabic descriptions, track labels, and shared skill labels. Arabic diacritics/tatweel and common alef variants are normalized. Selection is shareable through the existing hash route's track query parameter and survives refresh. Search/filtering does not rank, compare, or recommend credentials and does not persist student data.

Cards expose canonical skills and preparation/eligibility through native details disclosures to keep paragraphs manageable. Current availability, verification date, type, level, and important issuer notices remain clear. Official links retain target=_blank plus noopener/noreferrer and a new-tab accessibility label. No pagination, virtualization, external logo/image dependency, UI framework, or heavy state system was added.

## 9. Test Results

| Check                                                     | Result                       | Actual evidence                                                                                                                      |
| --------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| npm run lint                                              | PASSED                       | ESLint exit 0; no errors or warnings                                                                                                 |
| npm run typecheck                                         | PASSED                       | tsc -b exit 0 across app, configuration and script                                                                                   |
| npm run validate:catalog                                  | PASSED                       | 70 credentials, 12 providers, 68 skills, 11 tracks, 33 ordered stages                                                                |
| Negative and honest-state fixtures                        | PASSED                       | 44 invalid-data checks; 3 honest inactive/pending catalog cases; inactive/unverified roadmap suggestions rejected                    |
| Search/filter assertions                                  | PASSED                       | 8 assertions including code search, Arabic normalization, whitespace, no results, track and combined search                          |
| npm run build                                             | PASSED                       | Typecheck and validation followed by Vite 8.3.5; 114 modules; exit 0                                                                 |
| Original 12 migration                                     | PASSED                       | Compared IDs and official identity fields against da53135; all preserved with canonical skill IDs                                    |
| Catalog browser checks                                    | PASSED                       | 70 cards; all 11 filter counts matched data; PL-300 returned Power BI; Python plus testing returned 2; empty-state reset restored 70 |
| Track navigation                                          | PASSED                       | 11 homepage cards; testing link selected 4 credentials and retained them after refresh                                               |
| Skills/prerequisites disclosure                           | PASSED                       | CISSP disclosure opened and displayed the full-certification experience distinction                                                  |
| Official external links                                   | PASSED                       | All 70 links had HTTPS and safe new-tab attributes; PCET opened the official Python Institute page and loaded its PCET title         |
| Responsive and RTL                                        | PASSED                       | Homepage and full catalog at widths 320, 390, 768, 1024, 1440; no horizontal overflow; document ar/rtl                               |
| Regression                                                | PASSED                       | Homepage, navigation, mobile Enter/Escape and restored focus, questionnaire/roadmap Coming Soon, 404 and return links                |
| Browser console                                           | PASSED                       | No significant errors or warnings in production-preview tab                                                                          |
| Actual devices, Safari/Firefox, screen reader, Lighthouse | NOT RUN                      | Testing used the available embedded browser and explicit viewport simulations; no full accessibility or device certification claimed |
| Phase 2.5 GitHub Actions / live Pages                     | NOT RUN at report generation | Push happens after this report; final response records actual remote results                                                         |

Production output is approximately 383.75 kB JavaScript (107.69 kB gzip) and 29.52 kB CSS (6.85 kB gzip), plus unchanged local fonts. Progression templates are data for future use and are not imported into the application bundle. No new packages were installed.

## 10. Issues and Limitations

- Certification programs change frequently. The date and issuer notices matter; review nearby October/November transitions before students book exams.
- Coverage is uneven by design: cloud has 37 related credentials while AI has 4 and testing has 4. All tracks have valid skills and practical stages; a lower credential count does not imply a less useful career.
- All 70 chosen records are professional certifications. The model still distinguishes course completion and digital badges, but no weak learning credential was added simply to hit a total.
- Pricing remains unknown for the Saudi context. No cost-aware recommendation is implemented and null is never rendered as free.
- A generic browser role locator did not resolve the native summary disclosure; using its actual summary element completed the interaction. This was a tooling selector issue and required no behavior workaround in the app.
- Source notes containing raw URLs or internal field terminology were cleaned up in student-facing text; the official references remain in data/report sources. Mobile overflow checks then passed.
- The entire roadmap layer remains curated data, not an algorithm. No claim of personal suitability, completed prerequisites, employment, or official endorsement is made.

## 11. GitHub Status

- Repository: https://github.com/Mohammed-Alharbi-1/masari
- Branch: main; origin remains unchanged.
- Starting commit: da53135896472eba601fafee84bd48abf8fcd3f5.
- Initial fetch succeeded and main...origin/main was 0/0 with a clean working tree.
- Phase 2.5 commit SHA: not yet created in this pre-push report. The requested message is **feat: expand certification catalog and career tracks**. The report will be included in that commit; its exact SHA is provided in the final response and [the report's GitHub history](https://github.com/Mohammed-Alharbi-1/masari/commits/main/PHASE2_5_REPORT.md).
- Push result: pending at report generation. Only relevant reviewed files will be staged; a final fetch/synchronization and secret-path check precedes publication. No force push or remote-history overwrite is permitted.
- Last verified deployment before this phase: Phase 2 Actions run 40160700718 succeeded and Pages API confirmed workflow hosting at https://mohammed-alharbi-1.github.io/masari/.
- Phase 2.5 Actions and Pages: not yet triggered at report generation. The final response will distinguish build, push, deployment, and actual live catalog checks. Repository settings and secrets are not changed.

## 12. Phase 3 Readiness

The data foundation is ready for technical review: eleven stable track IDs, 68 canonical skills with reusable labels and associations, migrated credential-to-skill links, and three-stage editorial templates with valid references and optionality. A future anonymous questionnaire can use one track ID and arrays of existing/desired skill IDs without another major migration, while later planning may incorporate self-assessed level, budget and weekly availability.

No questionnaire, answer storage, identity collection, skill scoring, personalized recommendations, automatic roadmap generation, or progress UI was built. Reviewers should examine editorial skill/track associations, advanced/experience-based credential suitability, imminent exam transitions, and the uneven vendor/track coverage before authorizing Phase 3. There is no implementation blocker in the current automated checks; production publication is verified separately after this snapshot.

Phase 2.5 is complete and ready for technical review before proceeding to Phase 3.

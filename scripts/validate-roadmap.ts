import assert from "node:assert/strict";
import { generatePersonalizedRoadmap } from "../src/utils/generateRoadmap.ts";
import { readQuestionnaireNavigation } from "../src/utils/questionnaireNavigation.ts";
import { certifications } from "../src/data/certifications.ts";
import { careerTracks } from "../src/data/careerTracks.ts";
import { roadmapTemplates } from "../src/data/roadmapTemplates.ts";
import { skills } from "../src/data/skills.ts";
import { roadmapStages } from "../src/data/types.ts";
import type { StudentQuestionnaireAnswers } from "../src/types/questionnaire.ts";
import type {
  PersonalizedRoadmap,
  RoadmapCertificationOption,
} from "../src/types/roadmap.ts";

const base: StudentQuestionnaireAnswers = {
  major: "computer-science",
  academicYear: "first-year",
  careerTrack: "web-development",
  existingSkillIds: [],
  desiredSkillIds: [],
  knowledgeLevel: null,
  budget: null,
  weeklyStudyTime: null,
};
const generate = (changes: Partial<StudentQuestionnaireAnswers> = {}) =>
  generatePersonalizedRoadmap({ ...base, ...changes });
function allOptions(result: PersonalizedRoadmap): RoadmapCertificationOption[] {
  return [
    ...result.stages.flatMap((stage) => [
      ...(stage.highlightedCertification
        ? [stage.highlightedCertification]
        : []),
      ...stage.alternativeCertifications,
    ]),
    ...result.providerPaths.flatMap((path) =>
      path.stageOptions.flatMap((entry) =>
        entry.option ? [entry.option] : [],
      ),
    ),
  ];
}
const credentialIds = (result: PersonalizedRoadmap) =>
  allOptions(result).map((option) => option.certificationId);
const before = JSON.stringify({
  certifications,
  roadmapTemplates,
  skills,
  careerTracks,
});
let checks = 0;
function check(name: string, run: () => void) {
  run();
  checks++;
  console.log(`PASS ${name}`);
}
function invariants(result: PersonalizedRoadmap) {
  assert.deepEqual(
    result.stages.map((stage) => stage.stage),
    roadmapStages,
  );
  const focus = result.stages.flatMap((stage) => stage.focusSkillIds);
  assert.equal(new Set(focus).size, focus.length);
  for (const id of [
    ...result.knownSkillIds,
    ...result.desiredSkillIds,
    ...result.additionalFocusSkillIds,
    ...result.stages.flatMap((stage) => [
      ...stage.skillIds,
      ...stage.focusSkillIds,
      ...stage.knownSkillIds,
      ...stage.desiredSkillIds,
      ...stage.deepenSkillIds,
      ...stage.revisitSkillIds,
    ]),
  ])
    assert.ok(
      skills.some(
        (skill) => skill.id === id && skill.tracks.includes(result.trackId),
      ),
    );
  for (const stage of result.stages) {
    assert.ok(stage.alternativeCertifications.length <= 2);
    assert.equal(stage.futureGoal, stage.stage === "advanced");
    assert.ok(stage.practicalMilestoneAr);
    assert.ok(stage.reasonAr);
    assert.ok(!("completed" in stage));
    assert.ok(!("score" in stage));
  }
  for (const option of allOptions(result)) {
    const credential = certifications.find(
      (item) => item.id === option.certificationId,
    )!;
    assert.ok(credential);
    assert.equal(credential.status, "active");
    assert.equal(credential.verificationStatus, "verified");
    assert.ok(credential.tracks.includes(result.trackId));
    assert.equal(option.optional, true);
    assert.ok(option.reasonAr);
    assert.ok(option.warningAr);
    assert.ok(!("price" in option));
    assert.ok(!("weeks" in option));
  }
  for (const path of result.providerPaths) {
    assert.deepEqual(
      path.stageOptions.map((entry) => entry.stage),
      roadmapStages,
    );
    for (const entry of path.stageOptions)
      if (entry.option)
        assert.equal(
          certifications.find(
            (credential) => credential.id === entry.option!.certificationId,
          )!.providerId,
          path.providerId,
        );
  }
}
check("beginner with no known skills starts with foundational practice", () => {
  const result = generate({ knowledgeLevel: "beginner" });
  invariants(result);
  assert.deepEqual(result.stages[0].focusSkillIds, [
    "html",
    "css",
    "javascript",
    "git",
  ]);
  assert.equal(result.stages[0].knownSkillIds.length, 0);
});
check(
  "intermediate known skills leave missing desired skills ahead of familiar skills",
  () => {
    const result = generate({
      knowledgeLevel: "intermediate",
      existingSkillIds: ["html", "css", "git"],
      desiredSkillIds: ["javascript", "react"],
    });
    assert.deepEqual(result.stages[0].focusSkillIds, ["javascript"]);
    assert.equal(result.stages[1].focusSkillIds[0], "react");
    assert.deepEqual(result.stages[0].knownSkillIds, ["html", "css", "git"]);
    invariants(result);
  },
);
check(
  "advanced self-assessment never skips missing foundations or grants eligibility",
  () => {
    const result = generate({
      knowledgeLevel: "advanced",
      existingSkillIds: ["react"],
    });
    assert.ok(result.stages[0].focusSkillIds.includes("html"));
    assert.ok(result.startingPointAr.includes("الأساس"));
    assert.ok(
      allOptions(result).every((option) =>
        option.warningAr.includes("لا يعني"),
      ),
    );
    invariants(result);
  },
);
check(
  "empty desired list remains empty while curated skill stages remain useful",
  () => {
    const result = generate();
    assert.deepEqual(result.desiredSkillIds, []);
    assert.equal(result.stages[0].desiredSkillIds.length, 0);
    assert.ok(result.stages[0].focusSkillIds.length);
  },
);
check(
  "overlap means deepening after missing desired and missing stage skills",
  () => {
    const result = generate({
      existingSkillIds: ["html", "git"],
      desiredSkillIds: ["html", "javascript"],
    });
    assert.deepEqual(result.stages[0].focusSkillIds, [
      "javascript",
      "css",
      "html",
    ]);
    assert.deepEqual(result.stages[0].deepenSkillIds, ["html"]);
    invariants(result);
  },
);
check(
  "JavaScript, TypeScript, Java and C# interests do not get Python certificates",
  () => {
    for (const language of ["javascript", "typescript", "java", "csharp"]) {
      const result = generate({
        careerTrack: "software-development",
        desiredSkillIds: [language],
        existingSkillIds: ["python"],
      });
      assert.equal(credentialIds(result).length, 0);
      assert.ok(result.additionalFocusSkillIds.includes(language));
      assert.ok(
        !result.stages.flatMap((stage) => stage.skillIds).includes("python"),
      );
      invariants(result);
    }
  },
);
check(
  "explicit Python interests keep curated PCEP, PCAP and future PCPP1",
  () => {
    const result = generate({
      careerTrack: "software-development",
      desiredSkillIds: ["python"],
    });
    assert.deepEqual(credentialIds(result), [
      "python-pcep",
      "python-pcap",
      "python-pcpp1",
    ]);
    assert.equal(result.stages[0].focusSkillIds[0], "python");
    assert.ok(result.stages[2].highlightedCertification!.futureGoal);
    invariants(result);
  },
);
for (const [skillId, providerId] of [
  ["aws", "aws"],
  ["azure", "microsoft"],
  ["google-cloud", "google-cloud"],
])
  check(
    `${skillId} cloud interest stays on the same provider through three stages`,
    () => {
      const result = generate({
        careerTrack: "cloud-computing",
        desiredSkillIds: [skillId],
      });
      assert.equal(result.providerPaths.length, 0);
      assert.equal(credentialIds(result).length, 3);
      assert.ok(
        allOptions(result).every(
          (option) =>
            certifications.find(
              (credential) => credential.id === option.certificationId,
            )!.providerId === providerId,
        ),
      );
      invariants(result);
    },
  );
check(
  "cloud with no platform preference gives three separate alternatives without a winner",
  () => {
    const result = generate({ careerTrack: "cloud-computing" });
    assert.deepEqual(
      result.providerPaths.map((path) => path.skillId),
      ["aws", "azure", "google-cloud"],
    );
    assert.ok(
      result.stages.every(
        (stage) =>
          !stage.highlightedCertification &&
          !stage.alternativeCertifications.length,
      ),
    );
    invariants(result);
  },
);
check("multiple desired platforms remain distinct alternative paths", () => {
  const result = generate({
    careerTrack: "cloud-computing",
    desiredSkillIds: ["azure", "aws"],
  });
  assert.deepEqual(
    result.providerPaths.map((path) => path.skillId),
    ["aws", "azure"],
  );
  invariants(result);
});
check(
  "desired platform wins over another known platform; known-only preference is recognized",
  () => {
    const result = generate({
      careerTrack: "cloud-computing",
      existingSkillIds: ["azure"],
      desiredSkillIds: ["aws"],
    });
    assert.ok(credentialIds(result).every((id) => id.startsWith("aws-")));
    assert.ok(
      credentialIds(
        generate({
          careerTrack: "cloud-computing",
          existingSkillIds: ["google-cloud"],
        }),
      ).every((id) => id.startsWith("google-")),
    );
  },
);
check(
  "free or limited budget adds an unknown-price note and does not filter by fictitious cost",
  () => {
    for (const budget of [
      "free-preferred",
      "up-to-500",
      "501-to-1000",
      "over-1000",
    ] as const) {
      const result = generate({ budget });
      assert.deepEqual(credentialIds(result), credentialIds(generate()));
      assert.ok(
        result.guidanceNotesAr.some((note) =>
          note.includes("أسعار الاختبارات غير مؤكدة"),
        ),
      );
    }
  },
);
check(
  "weekly availability adjusts generic guidance without certification durations",
  () => {
    for (const weeklyStudyTime of ["under-5", "5-to-10", "over-10"] as const)
      assert.notDeepEqual(
        generate({ weeklyStudyTime }).guidanceNotesAr,
        generate().guidanceNotesAr,
      );
    assert.ok(
      generate({ weeklyStudyTime: "under-5" }).guidanceNotesAr.some((note) =>
        note.includes("مهارة واحدة"),
      ),
    );
    assert.deepEqual(
      generate({ weeklyStudyTime: "unsure" }).guidanceNotesAr,
      generate().guidanceNotesAr,
    );
  },
);
check(
  "null and unsure knowledge rely on skills/template; academic context is not an eligibility gate",
  () => {
    assert.deepEqual(
      generate({ knowledgeLevel: "unsure" }).stages,
      generate().stages,
    );
    assert.deepEqual(
      generate({ major: "cybersecurity", academicYear: "graduate" }).stages,
      generate().stages,
    );
  },
);
check(
  "cybersecurity beginner sees expert credentials only as future goals with warnings",
  () => {
    const result = generate({
      careerTrack: "cybersecurity",
      knowledgeLevel: "beginner",
    });
    assert.ok(result.stages[0].highlightedCertification);
    assert.ok(result.stages[2].highlightedCertification);
    assert.ok(
      [
        result.stages[2].highlightedCertification!,
        ...result.stages[2].alternativeCertifications,
      ].every(
        (option) => option.futureGoal && option.warningAr.includes("الخبرة"),
      ),
    );
    invariants(result);
  },
);
check(
  "missing, retired, unknown, pending, wrong-track and wrong-level credentials are excluded",
  () => {
    const source = certifications.find(
      (credential) => credential.id === "github-foundations",
    )!;
    const others = certifications.filter(
      (credential) => credential.id !== source.id,
    );
    for (const altered of [
      null,
      { ...source, status: "retired" as const },
      { ...source, status: "unknown" as const },
      { ...source, verificationStatus: "pending" as const },
      { ...source, tracks: ["networking" as const] },
      { ...source, level: "advanced" as const },
    ]) {
      const result = generatePersonalizedRoadmap(
        base,
        altered ? [...others, altered] : others,
      );
      assert.equal(result.stages[0].highlightedCertification, null);
      assert.equal(result.stages[0].alternativeCertifications.length, 0);
      assert.ok(result.stages[0].practicalMilestoneAr);
    }
  },
);
check(
  "a stage curated without certifications remains useful and has no invented replacement",
  () => {
    assert.equal(generate().stages[2].highlightedCertification, null);
    assert.equal(generate().stages[2].alternativeCertifications.length, 0);
    assert.ok(generate().stages[2].practicalMilestoneAr);
  },
);
check(
  "desired skills absent from static stages appear in additional focus",
  () => {
    const result = generate({ desiredSkillIds: ["sql", "aws"] });
    assert.deepEqual(
      new Set(result.additionalFocusSkillIds),
      new Set(["sql", "aws"]),
    );
    invariants(result);
  },
);
check(
  "specific skill interests meaningfully change credential priority and reasons",
  () => {
    const linux = generate({
      careerTrack: "it-support",
      desiredSkillIds: ["linux"],
    });
    const windows = generate({
      careerTrack: "it-support",
      desiredSkillIds: ["windows"],
    });
    assert.notEqual(
      linux.stages[1].highlightedCertification!.certificationId,
      windows.stages[1].highlightedCertification!.certificationId,
    );
    assert.notEqual(
      linux.stages[1].highlightedCertification!.reasonAr,
      windows.stages[1].highlightedCertification!.reasonAr,
    );
  },
);
check(
  "all eleven tracks: deterministic output, valid IDs, exactly three stages, bounded optional credentials",
  () => {
    for (const track of careerTracks) {
      const relevant = skills
        .filter((skill) => skill.tracks.includes(track.id))
        .map((skill) => skill.id);
      for (const changes of [
        {},
        { existingSkillIds: relevant, desiredSkillIds: relevant },
        {
          existingSkillIds: relevant.slice(0, 3),
          desiredSkillIds: relevant.slice(-3),
          knowledgeLevel: "advanced" as const,
        },
      ]) {
        const answers = { ...base, careerTrack: track.id, ...changes };
        const snapshot = JSON.stringify(answers);
        const result = generatePersonalizedRoadmap(answers);
        invariants(result);
        assert.deepEqual(result, generatePersonalizedRoadmap(answers));
        assert.equal(JSON.stringify(answers), snapshot);
      }
    }
  },
);
check(
  "engine and router reject malformed answers; router edit intent is explicit",
  () => {
    assert.throws(() =>
      generatePersonalizedRoadmap({ ...base, desiredSkillIds: ["unknown"] }),
    );
    for (const state of [
      null,
      [],
      "invalid",
      { answers: {} },
      { answers: { ...base, name: "forbidden" } },
    ])
      assert.equal(readQuestionnaireNavigation(state), null);
    assert.deepEqual(
      readQuestionnaireNavigation({ answers: base, editQuestionnaire: true }),
      { answers: base, edit: true },
    );
    assert.deepEqual(readQuestionnaireNavigation({ answers: base }), {
      answers: base,
      edit: false,
    });
  },
);
check(
  "catalog, templates, tracks and skills are unchanged after all scenarios",
  () => {
    assert.equal(
      JSON.stringify({
        certifications,
        roadmapTemplates,
        skills,
        careerTracks,
      }),
      before,
    );
  },
);
console.log(`${checks} roadmap check groups passed.`);

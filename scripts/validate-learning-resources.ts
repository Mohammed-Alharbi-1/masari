import assert from "node:assert/strict";
import { learningResources } from "../src/data/learningResources.ts";
import { validateLearningResources } from "../src/utils/validateLearningResources.ts";
import { recommendLearningResources } from "../src/utils/recommendLearningResources.ts";
import { generatePersonalizedRoadmap } from "../src/utils/generateRoadmap.ts";
import { restoreQuestionnaire } from "../src/utils/questionnaireStorage.ts";
import { careerTracks } from "../src/data/careerTracks.ts";
import { skills } from "../src/data/skills.ts";
import { certifications } from "../src/data/certifications.ts";
import type { LearningResource } from "../src/types/learningResources.ts";
import type { StudentQuestionnaireAnswers } from "../src/types/questionnaire.ts";

const today = new Date().toISOString().slice(0, 10);
const tomorrow = new Date(Date.parse(today) + 86_400_000)
  .toISOString()
  .slice(0, 10);
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
const make = (changes: Partial<StudentQuestionnaireAnswers> = {}) => ({
  ...base,
  ...changes,
});
const selections = (
  answers: StudentQuestionnaireAnswers,
  catalog: readonly LearningResource[] = learningResources,
) =>
  recommendLearningResources(
    answers,
    generatePersonalizedRoadmap(answers),
    catalog,
  );
const flatten = (answers: StudentQuestionnaireAnswers) =>
  Object.values(selections(answers)).flat();
let checks = 0;
function check(name: string, run: () => void) {
  run();
  checks++;
  console.log(`PASS ${name}`);
}
check(
  "39 curated resources have valid, unique canonical references and honest verification metadata",
  () => {
    assert.equal(learningResources.length, 39);
    assert.deepEqual(validateLearningResources(learningResources, today), []);
    for (const track of careerTracks)
      assert.ok(
        learningResources.some((resource) =>
          resource.trackIds.includes(track.id),
        ),
      );
  },
);
check(
  "validator rejects malformed URLs, duplicates, unsupported types and invalid associations",
  () => {
    const r = learningResources[0];
    const alterations: Partial<LearningResource>[] = [
      { id: "" },
      { title: " " },
      { provider: "" },
      { url: "http://example.com/course" },
      { url: "https://user:pass@example.com/course" },
      { url: "https://www.youtube.com/results?search_query=javascript" },
      { url: "https://www.youtube.com/@freecodecamp" },
      { type: "bad" as LearningResource["type"] },
      { language: "xx" as LearningResource["language"] },
      { level: "expert" as LearningResource["level"] },
      { registration: "paid" as LearningResource["registration"] },
      { skillIds: [] },
      { skillIds: ["not-real"] },
      { skillIds: ["html", "html"] },
      { trackIds: [] },
      { trackIds: ["cybersecurity"] },
      { lastVerifiedAt: tomorrow },
      { lastVerifiedAt: "2026-02-30" },
      { lastVerifiedAt: null },
      { freeAccessVerified: false },
      { freeAccessNoteAr: "" },
    ];
    for (const altered of alterations)
      assert.ok(
        validateLearningResources([{ ...r, ...altered }], today).length,
        JSON.stringify(altered),
      );
    for (const field of ["skillIds", "trackIds"]) {
      for (const invalid of [null, undefined, "invalid-array"]) {
        assert.ok(
          validateLearningResources([{ ...r, [field]: invalid }], today).length,
        );
      }
    }
    assert.ok(validateLearningResources([r, { ...r }], today).length);
    assert.ok(
      validateLearningResources(
        [r, { ...r, id: "different", url: r.url.replace("www.", "") }],
        today,
      ).length,
    );
    assert.deepEqual(
      validateLearningResources(
        [{ ...r, freeAccessVerified: false, lastVerifiedAt: null }],
        today,
      ),
      [],
    );
  },
);
for (const [name, changes, skill] of [
  ["Web JavaScript", { desiredSkillIds: ["javascript"] }, "javascript"],
  ["Web React", { desiredSkillIds: ["react"] }, "react"],
  [
    "Software Python",
    { careerTrack: "software-development", desiredSkillIds: ["python"] },
    "python",
  ],
  [
    "Java instead of Python",
    {
      careerTrack: "software-development",
      desiredSkillIds: ["java"],
      existingSkillIds: ["python"],
    },
    "java",
  ],
  [
    "Cybersecurity beginner",
    { careerTrack: "cybersecurity", knowledgeLevel: "beginner" },
    "security-fundamentals",
  ],
  [
    "Networking beginner",
    { careerTrack: "networking", knowledgeLevel: "beginner" },
    "networking-fundamentals",
  ],
  [
    "AWS interest",
    { careerTrack: "cloud-computing", desiredSkillIds: ["aws"] },
    "aws",
  ],
  [
    "Azure interest",
    { careerTrack: "cloud-computing", desiredSkillIds: ["azure"] },
    "azure",
  ],
  [
    "Google Cloud interest",
    { careerTrack: "cloud-computing", desiredSkillIds: ["google-cloud"] },
    "google-cloud",
  ],
  [
    "SQL analytics",
    { careerTrack: "data-analytics", desiredSkillIds: ["sql"] },
    "sql",
  ],
  [
    "Machine learning AI",
    {
      careerTrack: "artificial-intelligence",
      desiredSkillIds: ["machine-learning"],
    },
    "machine-learning",
  ],
  [
    "Docker DevOps",
    { careerTrack: "devops", desiredSkillIds: ["docker"] },
    "docker",
  ],
  [
    "PostgreSQL databases",
    { careerTrack: "database-administration", desiredSkillIds: ["postgresql"] },
    "postgresql",
  ],
  [
    "Automated testing",
    { careerTrack: "software-testing", desiredSkillIds: ["test-automation"] },
    "test-automation",
  ],
  [
    "IT Support beginner",
    { careerTrack: "it-support", knowledgeLevel: "beginner" },
    "computer-hardware",
  ],
] as const)
  check(`${name} receives an exact relevant resource`, () => {
    const answers = make({
      ...changes,
      existingSkillIds:
        "existingSkillIds" in changes ? [...changes.existingSkillIds] : [],
      desiredSkillIds:
        "desiredSkillIds" in changes ? [...changes.desiredSkillIds] : [],
    });
    const result = flatten(answers);
    assert.ok(
      result.some((item) => item.matchedSkillId === skill),
      JSON.stringify(result),
    );
    if (skill === "java")
      assert.ok(
        result.every(
          (item) =>
            !learningResources
              .find((resource) => resource.id === item.resourceId)!
              .skillIds.includes("python"),
        ),
      );
    if (["aws", "azure", "google-cloud"].includes(skill))
      assert.ok(
        result.every((item) => {
          const resource = learningResources.find(
            (r) => r.id === item.resourceId,
          )!;
          return !resource.skillIds.some(
            (id) =>
              ["aws", "azure", "google-cloud"].includes(id) && id !== skill,
          );
        }),
      );
  });
check(
  "empty desired skills use stage priorities without inventing desires",
  () => {
    const answers = make();
    const result = flatten(answers);
    assert.ok(result.length);
    assert.deepEqual(answers.desiredSkillIds, []);
  },
);
check(
  "missing resources and pending free access never block roadmap generation",
  () => {
    const answers = make({ desiredSkillIds: ["rest-apis"] });
    const empty = selections(answers, []);
    assert.ok(Object.values(empty).every((items) => items.length === 0));
    const pending = learningResources.map((resource) => ({
      ...resource,
      freeAccessVerified: false,
      lastVerifiedAt: null,
    }));
    assert.ok(
      Object.values(selections(answers, pending)).every(
        (items) => items.length === 0,
      ),
    );
    assert.equal(generatePersonalizedRoadmap(answers).stages.length, 3);
    assert.ok(
      !flatten(answers).some((item) => item.matchedSkillId === "rest-apis"),
    );
  },
);
check(
  "known/desired overlap remains deepening and Arabic sources are preferred",
  () => {
    const result = flatten(
      make({
        existingSkillIds: ["html", "css", "javascript"],
        desiredSkillIds: ["javascript"],
      }),
    );
    const javascript = result.find(
      (item) => item.matchedSkillId === "javascript",
    )!;
    assert.ok(javascript.reasonAr.includes("لتعميق"));
    assert.equal(javascript.resourceId, "elzero-javascript-ar");
  },
);
check(
  "known undesired skills do not displace missing desired priorities",
  () => {
    const result = selections(
      make({
        existingSkillIds: ["html", "css"],
        desiredSkillIds: ["javascript", "react", "typescript"],
      }),
    );
    assert.equal(result.foundation[0].matchedSkillId, "javascript");
    assert.ok(
      !Object.values(result)
        .flat()
        .some((item) => ["html", "css"].includes(item.matchedSkillId)),
    );
  },
);
check("resource output varies with student interests", () => {
  assert.notDeepEqual(
    selections(make({ desiredSkillIds: ["javascript"] })),
    selections(make({ desiredSkillIds: ["react"] })),
  );
});
check(
  "corrupted session answers stay rejected before either engine runs",
  () => {
    const restored = restoreQuestionnaire(() => ({
      getItem: () => "{broken",
      setItem: () => {},
      removeItem: () => {},
    }));
    assert.equal(restored.status, "invalid");
    assert.equal(restored.answers, null);
    assert.throws(() => selections({ ...base, desiredSkillIds: ["not-real"] }));
  },
);
check(
  "all eleven tracks remain deterministic with bounded, relevant, unique resource output",
  () => {
    for (const track of careerTracks) {
      const relevant = skills
        .filter((skill) => skill.tracks.includes(track.id))
        .map((skill) => skill.id);
      for (const changes of [
        {},
        { desiredSkillIds: relevant },
        {
          existingSkillIds: relevant,
          desiredSkillIds: relevant,
          knowledgeLevel: "advanced" as const,
        },
      ]) {
        const answers = make({ careerTrack: track.id, ...changes });
        const roadmap = generatePersonalizedRoadmap(answers);
        const snapshot = JSON.stringify({
          answers,
          roadmap,
          learningResources,
          certifications,
        });
        const result = recommendLearningResources(answers, roadmap);
        assert.deepEqual(result, recommendLearningResources(answers, roadmap));
        const ids = Object.values(result)
          .flat()
          .map((item) => item.resourceId);
        assert.equal(new Set(ids).size, ids.length);
        for (const items of Object.values(result)) {
          assert.ok(items.length <= 4);
          for (const item of items) {
            const resource = learningResources.find(
              (r) => r.id === item.resourceId,
            )!;
            assert.ok(resource);
            assert.ok(resource.freeAccessVerified);
            assert.ok(resource.trackIds.includes(track.id));
            assert.ok(resource.skillIds.includes(item.matchedSkillId));
            assert.ok(
              skills.some(
                (skill) =>
                  skill.id === item.matchedSkillId &&
                  skill.tracks.includes(track.id),
              ),
            );
          }
        }
        assert.equal(
          JSON.stringify({
            answers,
            roadmap,
            learningResources,
            certifications,
          }),
          snapshot,
        );
      }
    }
  },
);
const languages = Object.fromEntries(
  ["ar", "en"].map((language) => [
    language,
    learningResources.filter((resource) => resource.language === language)
      .length,
  ]),
);
console.log(
  `${checks} learning-resource check groups passed. Languages: ${JSON.stringify(languages)}.`,
);
console.log(
  `Coverage: ${new Set(learningResources.flatMap((resource) => resource.skillIds)).size} canonical skills; ${careerTracks.length} tracks.`,
);

import assert from "node:assert/strict";
import { careerTracks } from "../src/data/careerTracks.ts";
import { skills } from "../src/data/skills.ts";
import {
  majorOptions,
  academicYearOptions,
  knowledgeLevelOptions,
  budgetOptions,
  studyTimeOptions,
} from "../src/data/questionnaireOptions.ts";
import {
  createEmptyDraft,
  changeCareerTrack,
  validateAcademicStep,
  validateCareerStep,
  validateQuestionnaire,
} from "../src/utils/questionnaireValidation.ts";
import {
  restoreQuestionnaire,
  saveQuestionnaire,
  clearQuestionnaire,
  questionnaireStorageKey,
} from "../src/utils/questionnaireStorage.ts";
import type { QuestionnaireStorage } from "../src/utils/questionnaireStorage.ts";
import type { StudentQuestionnaireAnswers } from "../src/types/questionnaire.ts";

let checks = 0;
function check(name: string, run: () => void) {
  run();
  checks++;
  console.log(`PASS ${name}`);
}
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
check("required steps reject blanks and unsupported IDs", () => {
  assert.deepEqual(Object.keys(validateAcademicStep(createEmptyDraft())), [
    "major",
    "academicYear",
  ]);
  assert.ok(validateCareerStep({ careerTrack: "obsolete" }).careerTrack);
  assert.equal(validateQuestionnaire(createEmptyDraft()).valid, false);
});
check("all academic IDs and independent track choices are valid", () => {
  for (const major of majorOptions)
    for (const year of academicYearOptions)
      for (const track of careerTracks) {
        assert.equal(
          validateQuestionnaire({
            ...base,
            major: major.id,
            academicYear: year.id,
            careerTrack: track.id,
          }).valid,
          true,
        );
      }
});
check(
  "every canonical track accepts exactly its relevant skills, including overlap",
  () => {
    for (const track of careerTracks) {
      const relevant = skills
        .filter((skill) => skill.tracks.includes(track.id))
        .map((skill) => skill.id);
      assert.ok(relevant.length);
      assert.equal(
        validateQuestionnaire({
          ...base,
          careerTrack: track.id,
          existingSkillIds: relevant,
          desiredSkillIds: relevant,
        }).valid,
        true,
      );
      for (const skill of skills.filter(
        (skill) => !skill.tracks.includes(track.id),
      )) {
        for (const key of ["existingSkillIds", "desiredSkillIds"])
          assert.equal(
            validateQuestionnaire({
              ...base,
              careerTrack: track.id,
              [key]: [skill.id],
            }).valid,
            false,
          );
      }
    }
  },
);
check("empty skills and all optional values or null are accepted", () => {
  assert.equal(validateQuestionnaire(base).valid, true);
  for (const [key, options] of [
    ["knowledgeLevel", knowledgeLevelOptions],
    ["budget", budgetOptions],
    ["weeklyStudyTime", studyTimeOptions],
  ] as const) {
    for (const option of options)
      assert.equal(
        validateQuestionnaire({ ...base, [key]: option.id }).valid,
        true,
      );
    for (const invalid of ["obsolete", undefined, 5, [], ""])
      assert.equal(
        validateQuestionnaire({ ...base, [key]: invalid }).valid,
        false,
      );
  }
});
check(
  "malformed shapes, duplicates, unknown skills, extra identity keys are rejected",
  () => {
    for (const value of [
      null,
      [],
      true,
      {},
      "text",
      { ...base, name: "forbidden" },
      { ...base, major: "old" },
      { ...base, academicYear: "old" },
      { ...base, careerTrack: "old" },
    ])
      assert.equal(validateQuestionnaire(value).valid, false);
    for (const key of ["existingSkillIds", "desiredSkillIds"])
      for (const value of [
        ["html", "html"],
        ["unknown"],
        [1],
        null,
        "html",
        new Array(69).fill("html"),
      ])
        assert.equal(
          validateQuestionnaire({ ...base, [key]: value }).valid,
          false,
        );
  },
);
check(
  "track changes clear both selections and preserve all unrelated answers",
  () => {
    const draft = {
      ...base,
      existingSkillIds: ["html"],
      desiredSkillIds: ["html"],
      knowledgeLevel: "advanced" as const,
      budget: "free-preferred" as const,
      weeklyStudyTime: "5-to-10" as const,
    };
    assert.equal(changeCareerTrack(draft, draft.careerTrack), draft);
    const changed = changeCareerTrack(draft, "data-analytics");
    assert.deepEqual(changed, {
      ...draft,
      careerTrack: "data-analytics",
      existingSkillIds: [],
      desiredSkillIds: [],
    });
    assert.equal(validateQuestionnaire(changed).valid, true);
  },
);
let raw: string | null = null;
const memory: QuestionnaireStorage = {
  getItem(key) {
    assert.equal(key, questionnaireStorageKey);
    return raw;
  },
  setItem(key, value) {
    assert.equal(key, questionnaireStorageKey);
    raw = value;
  },
  removeItem(key) {
    assert.equal(key, questionnaireStorageKey);
    raw = null;
  },
};
check(
  "only validated complete submissions write and restore canonical objects",
  () => {
    assert.equal(restoreQuestionnaire(() => memory).status, "empty");
    assert.equal(
      saveQuestionnaire(() => memory, createEmptyDraft()),
      "invalid",
    );
    assert.equal(raw, null);
    assert.equal(
      saveQuestionnaire(() => memory, base),
      "saved",
    );
    assert.deepEqual(JSON.parse(raw!), base);
    assert.deepEqual(
      restoreQuestionnaire(() => memory),
      { status: "restored", answers: base },
    );
    const validated = validateQuestionnaire(base);
    assert.ok(validated.valid);
    assert.notEqual(validated.answers.existingSkillIds, base.existingSkillIds);
  },
);
check("malformed JSON and outdated schema or IDs never restore", () => {
  for (const value of [
    "{broken",
    "null",
    "[]",
    JSON.stringify({ ...base, careerTrack: "obsolete" }),
    JSON.stringify({ ...base, desiredSkillIds: ["python"] }),
    JSON.stringify({ ...base, version: 0 }),
  ]) {
    raw = value;
    assert.equal(restoreQuestionnaire(() => memory).status, "invalid");
  }
  assert.equal(
    clearQuestionnaire(() => memory),
    "cleared",
  );
  assert.equal(raw, null);
});
check("blocked access and read/write/remove errors are handled", () => {
  const denied = () => {
    throw new Error("blocked");
  };
  assert.equal(restoreQuestionnaire(denied).status, "unavailable");
  assert.equal(saveQuestionnaire(denied, base), "unavailable");
  assert.equal(clearQuestionnaire(denied), "unavailable");
  const broken = { getItem: denied, setItem: denied, removeItem: denied };
  assert.equal(restoreQuestionnaire(() => broken).status, "unavailable");
  assert.equal(
    saveQuestionnaire(() => broken, base),
    "unavailable",
  );
  assert.equal(
    clearQuestionnaire(() => broken),
    "unavailable",
  );
  raw = JSON.stringify(base);
  assert.equal(
    saveQuestionnaire(() => ({ ...memory, setItem: denied }), base),
    "unavailable",
  );
  assert.equal(raw, null);
  assert.equal(validateQuestionnaire(base).valid, true);
});
console.log(`${checks} questionnaire check groups passed.`);

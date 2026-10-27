import assert from "node:assert/strict";
import { productionCsp } from "../src/config/securityPolicy.ts";
import { validateQuestionnaire } from "../src/utils/questionnaireValidation.ts";
import {
  validateProgress,
  emptyProgress,
} from "../src/utils/roadmapProgress.ts";
import {
  validateSavedRoadmap,
  readLearningData,
} from "../src/utils/progressStorage.ts";
import { readQuestionnaireNavigation } from "../src/utils/questionnaireNavigation.ts";
import { certifications } from "../src/data/certifications.ts";
import { learningResources } from "../src/data/learningResources.ts";

const answers = {
  major: "computer-science",
  academicYear: "first-year",
  careerTrack: "web-development",
  existingSkillIds: [],
  desiredSkillIds: [],
  knowledgeLevel: null,
  budget: null,
  weeklyStudyTime: null,
};
let checks = 0;
function check(name: string, run: () => void) {
  run();
  checks++;
  console.log(`PASS ${name}`);
}
check("Production policy limits executable code to same-origin files", () => {
  assert.ok(productionCsp.includes("script-src 'self'"));
  assert.ok(productionCsp.includes("script-src-attr 'none'"));
  assert.ok(productionCsp.includes("default-src 'none'"));
  assert.ok(!/unsafe-inline|unsafe-eval|\*|https:|data:/.test(productionCsp));
});
check(
  "Policy disables data connections, object execution, base changes and form submission",
  () => {
    for (const directive of [
      "connect-src 'none'",
      "object-src 'none'",
      "base-uri 'none'",
      "form-action 'none'",
    ])
      assert.ok(productionCsp.includes(directive));
    assert.ok(
      !/frame-ancestors|report-uri|sandbox/.test(productionCsp),
      "Do not imply unsupported meta directives are enforced",
    );
  },
);
check(
  "Questionnaire markup, URL-like IDs and prototype keys cannot become trusted answers",
  () => {
    for (const id of [
      "<b>untrusted</b>",
      "javascript:unexpected",
      "data:text/plain,unexpected",
      "__proto__",
    ]) {
      assert.equal(
        validateQuestionnaire({ ...answers, careerTrack: id }).valid,
        false,
      );
      assert.equal(
        validateQuestionnaire({ ...answers, desiredSkillIds: [id] }).valid,
        false,
      );
    }
    const proto = JSON.parse('{"__proto__":{"masariInjected":true}}') as Record<
      string,
      unknown
    >;
    assert.equal(validateQuestionnaire({ ...answers, ...proto }).valid, false);
    assert.equal("masariInjected" in Object.prototype, false);
  },
);
check(
  "Untrusted progress identifiers are pruned without rendering payloads",
  () => {
    const result = validateProgress({
      ...emptyProgress("web-development"),
      completedSkillIds: ["html", "<b>untrusted</b>", "javascript:unexpected"],
    });
    assert.deepEqual(result?.completedSkillIds, ["html"]);
    assert.equal(
      validateProgress({
        ...emptyProgress("web-development"),
        completedResourceIds: Array(1001).fill("unknown"),
      }),
      null,
    );
  },
);
check(
  "Saved envelopes reject injected fields, absent consent and invalid schemas",
  () => {
    const envelope = {
      version: 1,
      deviceOptIn: true,
      answers,
      progress: emptyProgress("web-development"),
    };
    for (const value of [
      { ...envelope, redirect: "javascript:unexpected" },
      { ...envelope, deviceOptIn: false },
      { ...envelope, version: 999 },
      { ...envelope, answers: { ...answers, email: "unexpected" } },
    ])
      assert.equal(validateSavedRoadmap(value, true), null);
    assert.equal(
      validateSavedRoadmap({
        ...envelope,
        progress: { ...envelope.progress, trackId: "cybersecurity" },
      }),
      null,
    );
  },
);
check(
  "Corrupt JSON and denied browser APIs return controlled restore results",
  () => {
    assert.equal(
      readLearningData(() => ({
        getItem: () => "{",
        setItem() {},
        removeItem() {},
      })).status,
      "invalid",
    );
    assert.equal(
      readLearningData(() => {
        throw new Error("Denied");
      }).status,
      "unavailable",
    );
  },
);
check(
  "Questionnaire navigation carries answers and edit intent, never an executable redirect",
  () => {
    const navigation = readQuestionnaireNavigation({
      answers,
      redirect: "javascript:unexpected",
      editQuestionnaire: "true",
    });
    assert.ok(navigation);
    assert.deepEqual(Object.keys(navigation).sort(), ["answers", "edit"]);
    assert.equal(navigation.edit, false);
    assert.equal(
      readQuestionnaireNavigation({
        answers: { ...answers, major: "<b>untrusted</b>" },
      }),
      null,
    );
  },
);
check("All catalog destinations are HTTPS without embedded credentials", () => {
  for (const value of [
    ...certifications.flatMap((c) => [c.officialUrl, c.sourceUrl]),
    ...learningResources.map((r) => r.url),
  ]) {
    const url = new URL(value);
    assert.equal(url.protocol, "https:");
    assert.equal(url.username, "");
    assert.equal(url.password, "");
  }
});
console.log(
  `Security validation PASSED: ${checks} groups. This is not a penetration test; browser CSP enforcement is checked separately.`,
);

import assert from "node:assert/strict";
import { careerTracks } from "../src/data/careerTracks.ts";
import { certifications } from "../src/data/certifications.ts";
import { learningResources } from "../src/data/learningResources.ts";
import type { StudentQuestionnaireAnswers } from "../src/types/questionnaire.ts";
import type { SavedRoadmap } from "../src/types/progress.ts";
import {
  emptyProgress,
  buildActivities,
  toggleActivity,
  isCompleted,
  reconcileProgress,
  summarizeProgress,
  milestoneId,
  validateProgress,
} from "../src/utils/roadmapProgress.ts";
import {
  activitiesFor,
  answerIdentity,
  localProgressKey,
  sessionProgressKey,
  readLearningData,
  validateSavedRoadmap,
  writeLearningData,
  removeDeviceData,
} from "../src/utils/progressStorage.ts";
import { createProgressStore } from "../src/utils/progressStore.ts";
import { generatePersonalizedRoadmap } from "../src/utils/generateRoadmap.ts";
import { recommendLearningResources } from "../src/utils/recommendLearningResources.ts";

const answers: StudentQuestionnaireAnswers = {
  major: "computer-science",
  academicYear: "first-year",
  careerTrack: "web-development",
  existingSkillIds: ["html"],
  desiredSkillIds: ["javascript", "react"],
  knowledgeLevel: null,
  budget: null,
  weeklyStudyTime: null,
};
const activities = activitiesFor(answers);
const empty = emptyProgress(answers.careerTrack);
const data: SavedRoadmap = {
  version: 1,
  deviceOptIn: false,
  answers,
  progress: empty,
};
function memory() {
  const entries = new Map<string, string>();
  return {
    entries,
    getItem: (key: string) => entries.get(key) ?? null,
    setItem: (key: string, value: string) => {
      entries.set(key, value);
    },
    removeItem: (key: string) => {
      entries.delete(key);
    },
  };
}
const blocked = () => {
  throw new Error("Storage blocked");
};
let checks = 0;
function check(name: string, run: () => void) {
  run();
  checks++;
  console.log(`PASS ${name}`);
}
check("Empty progress never treats reported skills as completed", () => {
  assert.equal(summarizeProgress(empty, activities).completed, 0);
  assert.equal(isCompleted(empty, { kind: "skill", id: "html" }), false);
});
check("Skill completion and undo are immutable", () => {
  const next = toggleActivity(empty, activities, "skill", "html");
  assert.equal(summarizeProgress(next, activities).completed, 1);
  assert.equal(empty.completedSkillIds.length, 0);
  assert.deepEqual(toggleActivity(next, activities, "skill", "html"), empty);
});
check("Practical milestone is reversible and track/stage scoped", () => {
  const id = milestoneId(answers.careerTrack, "foundation");
  const next = toggleActivity(empty, activities, "milestone", id);
  assert.equal(next.completedMilestoneIds[0], id);
  assert.deepEqual(toggleActivity(next, activities, "milestone", id), empty);
});
check(
  "Resource completion is explicit; projecting recommendations does not complete it",
  () => {
    const resource = activities.find((a) => a.kind === "resource")!;
    const snapshot = JSON.stringify(empty);
    recommendLearningResources(answers, generatePersonalizedRoadmap(answers));
    assert.equal(JSON.stringify(empty), snapshot);
    assert.equal(
      summarizeProgress(
        toggleActivity(empty, activities, resource.kind, resource.id),
        activities,
      ).completed,
      1,
    );
  },
);
check("Multiple stage skills count separately", () => {
  const selected = activities
    .filter((a) => a.kind === "skill" && a.stage === "foundation")
    .slice(0, 2);
  assert.equal(selected.length, 2);
  const next = selected.reduce(
    (p, a) => toggleActivity(p, activities, a.kind, a.id),
    empty,
  );
  assert.equal(summarizeProgress(next, activities).stages[0].completed, 2);
});
check("Shared skills counted once at first occurrence", () => {
  const roadmap = generatePersonalizedRoadmap(answers);
  roadmap.stages[1].skillIds.push("html");
  const list = buildActivities(
    roadmap,
    recommendLearningResources(answers, roadmap),
  );
  assert.equal(
    list.filter((a) => a.kind === "skill" && a.id === "html").length,
    1,
  );
  assert.equal(list.find((a) => a.id === "html")?.stage, "foundation");
});
check("Certifications excluded; invalid toggles cannot inflate counts", () => {
  assert.equal(
    activities.some((a) => (a.kind as string) === "certification"),
    false,
  );
  assert.equal(toggleActivity(empty, activities, "skill", "bogus"), empty);
  const roadmap = generatePersonalizedRoadmap(answers);
  roadmap.stages.forEach((s) => {
    s.alternativeCertifications = [];
    s.highlightedCertification = null;
  });
  assert.deepEqual(
    buildActivities(roadmap, recommendLearningResources(answers, roadmap)),
    activities,
  );
});
check("Accurate complete totals and next unfinished priority", () => {
  assert.deepEqual(summarizeProgress(empty, activities).next, activities[0]);
  const first = toggleActivity(
    empty,
    activities,
    activities[0].kind,
    activities[0].id,
  );
  assert.deepEqual(summarizeProgress(first, activities).next, activities[1]);
  const full = activities.reduce(
    (p, a) => toggleActivity(p, activities, a.kind, a.id),
    empty,
  );
  const summary = summarizeProgress(full, activities);
  assert.equal(summary.completed, activities.length);
  assert.equal(summary.next, null);
  assert.equal(
    summary.stages.reduce((n, s) => n + s.total, 0),
    summary.total,
  );
  assert.ok(summary.stages.every((s) => s.completed === s.total));
});
check("Session save and restore", () => {
  const session = memory();
  assert.equal(
    writeLearningData(() => session, data),
    true,
  );
  assert.deepEqual(readLearningData(() => session).data, data);
  assert.ok(session.entries.has(sessionProgressKey));
});
check("No local write before opt-in; opted-in answers can resume", () => {
  const session = memory(),
    local = memory();
  const store = createProgressStore(
    () => session,
    () => local,
  );
  store.open(answers);
  store.toggle("skill", "html");
  assert.equal(local.entries.size, 0);
  assert.equal(store.save(null), true);
  assert.equal(readLearningData(() => local, true).data?.deviceOptIn, true);
  const reopened = createProgressStore(
    () => memory(),
    () => local,
  );
  assert.equal(reopened.getSnapshot().active, null);
  assert.deepEqual(reopened.resume(), answers);
  assert.deepEqual(reopened.getSnapshot().active?.progress.completedSkillIds, [
    "html",
  ]);
});
check("Unconsented persistent records rejected", () => {
  const local = memory();
  local.setItem(localProgressKey, JSON.stringify(data));
  assert.equal(readLearningData(() => local, true).status, "invalid");
  assert.equal(
    writeLearningData(() => local, data, true),
    false,
  );
});
check("Blocked storage retains functional memory across routes", () => {
  const store = createProgressStore(blocked, blocked);
  store.open(answers);
  store.toggle("skill", "html");
  store.open(answers);
  assert.deepEqual(store.getSnapshot().active?.progress.completedSkillIds, [
    "html",
  ]);
  assert.equal(store.save(null), false);
  assert.equal(store.clearDevice(), false);
  assert.ok(store.getSnapshot().notice.includes("تعذر"));
});
check("Corrupt JSON and unsupported versions", () => {
  const session = memory();
  for (const raw of [
    "{",
    "null",
    JSON.stringify({ ...data, version: 2 }),
    JSON.stringify({ ...data, progress: { ...empty, version: 2 } }),
  ]) {
    session.setItem(sessionProgressKey, raw);
    assert.equal(readLearningData(() => session).status, "invalid");
  }
});
check(
  "Malformed arrays, duplicate IDs, extra fields and invalid answers rejected",
  () => {
    for (const progress of [
      { ...empty, completedSkillIds: "html" },
      { ...empty, completedSkillIds: ["html", "html"] },
      { ...empty, completedResourceIds: [42] },
      { ...empty, extra: true },
    ])
      assert.equal(validateProgress(progress), null);
    assert.equal(
      validateSavedRoadmap({
        ...data,
        answers: { ...answers, major: "invalid" },
      }),
      null,
    );
    assert.equal(validateSavedRoadmap({ ...data, extra: true }), null);
  },
);
check("Obsolete and irrelevant IDs ignored", () => {
  const restored = validateSavedRoadmap({
    ...data,
    progress: {
      ...empty,
      completedSkillIds: ["html", "obsolete", "aws"],
      completedMilestoneIds: ["old"],
      completedResourceIds: ["obsolete"],
    },
  });
  assert.deepEqual(restored?.progress.completedSkillIds, ["html"]);
  assert.deepEqual(restored?.progress.completedResourceIds, []);
});
check(
  "Same-track edits retain valid completion, prune obsolete resources",
  () => {
    const nextAnswers = {
      ...answers,
      desiredSkillIds: ["typescript"],
      academicYear: "second-year" as const,
    };
    const next = reconcileProgress(
      {
        ...empty,
        completedSkillIds: ["html"],
        completedResourceIds: ["obsolete"],
      },
      answers.careerTrack,
      activitiesFor(nextAnswers),
    );
    assert.deepEqual(next.completedSkillIds, ["html"]);
    assert.equal(next.completedResourceIds.length, 0);
  },
);
check("Track changes start fresh, including shared skills", () => {
  const next = reconcileProgress(
    { ...empty, completedSkillIds: ["javascript"] },
    "software-development",
    activitiesFor({
      ...answers,
      careerTrack: "software-development",
      existingSkillIds: [],
      desiredSkillIds: [],
    }),
  );
  assert.equal(next.completedSkillIds.length, 0);
});
check(
  "Changed answers pause device saving and preserve old snapshot until confirmed",
  () => {
    const session = memory(),
      local = memory(),
      store = createProgressStore(
        () => session,
        () => local,
      );
    store.open(answers);
    store.toggle("skill", "html");
    store.save(null);
    const saved = local.getItem(localProgressKey);
    store.open({ ...answers, academicYear: "second-year" });
    assert.equal(store.getSnapshot().active?.deviceOptIn, false);
    assert.equal(local.getItem(localProgressKey), saved);
    assert.deepEqual(store.getSnapshot().active?.progress.completedSkillIds, [
      "html",
    ]);
    assert.equal(store.save(store.getSnapshot().saved), true);
    assert.equal(
      readLearningData(() => local, true).data?.answers.academicYear,
      "second-year",
    );
  },
);
check(
  "Clearing device deletes consent and answers; session progress remains",
  () => {
    const session = memory(),
      local = memory(),
      store = createProgressStore(
        () => session,
        () => local,
      );
    store.open(answers);
    store.toggle("skill", "html");
    store.save(null);
    store.clearDevice();
    assert.equal(local.getItem(localProgressKey), null);
    assert.equal(store.getSnapshot().active?.deviceOptIn, false);
    assert.deepEqual(store.getSnapshot().active?.progress.completedSkillIds, [
      "html",
    ]);
    assert.equal(
      removeDeviceData(() => local),
      true,
    );
  },
);
check(
  "Reset is explicit API; does not clear answers or resources catalog",
  () => {
    const store = createProgressStore(
      () => memory(),
      () => memory(),
    );
    store.open(answers);
    store.toggle("skill", "html");
    store.reset();
    assert.deepEqual(store.getSnapshot().active?.answers, answers);
    assert.deepEqual(store.getSnapshot().active?.progress, empty);
  },
);
check("Write failures warn, never report opted-in success", () => {
  const session = memory(),
    local = memory();
  local.setItem = () => {
    throw new Error("quota");
  };
  const store = createProgressStore(
    () => session,
    () => local,
  );
  store.open(answers);
  assert.equal(store.save(null), false);
  assert.equal(store.getSnapshot().active?.deviceOptIn, false);
});
check("Other tabs cannot silently replace a different saved roadmap", () => {
  const session = memory(),
    local = memory(),
    store = createProgressStore(
      () => session,
      () => local,
    );
  store.open(answers);
  store.save(null);
  local.setItem(
    localProgressKey,
    JSON.stringify({
      ...data,
      deviceOptIn: true,
      answers: { ...answers, academicYear: "second-year" },
    }),
  );
  store.toggle("skill", "html");
  assert.equal(store.getSnapshot().active?.deviceOptIn, false);
  assert.equal(
    readLearningData(() => local, true).data?.answers.academicYear,
    "second-year",
  );
  assert.equal(store.save(null), false);
});
check(
  "Resume rejects a different snapshot saved after confirmation was offered",
  () => {
    const session = memory(),
      local = memory();
    const store = createProgressStore(
      () => session,
      () => local,
    );
    store.open(answers);
    store.save(null);
    const offered = store.getSnapshot().saved;
    const otherAnswers = {
      ...answers,
      careerTrack: "cybersecurity" as const,
      existingSkillIds: [],
      desiredSkillIds: [],
    };
    local.setItem(
      localProgressKey,
      JSON.stringify({
        ...data,
        deviceOptIn: true,
        answers: otherAnswers,
        progress: emptyProgress("cybersecurity"),
      }),
    );
    assert.equal(store.resume(offered), null);
    assert.deepEqual(store.getSnapshot().active?.answers, answers);
    assert.equal(
      store.getSnapshot().saved?.answers.careerTrack,
      "cybersecurity",
    );
    assert.deepEqual(store.resume(store.getSnapshot().saved), otherAnswers);
  },
);
check(
  "All eleven tracks have unique activities, scoped milestones, correct summaries",
  () => {
    for (const track of careerTracks) {
      const a = {
        ...answers,
        careerTrack: track.id,
        existingSkillIds: [],
        desiredSkillIds: [],
      };
      const list = activitiesFor(a);
      assert.equal(
        new Set(list.map((item) => `${item.kind}:${item.id}`)).size,
        list.length,
      );
      assert.equal(list.filter((item) => item.kind === "milestone").length, 3);
      assert.equal(
        summarizeProgress(emptyProgress(track.id), list).total,
        list.length,
      );
      assert.ok(list.every((item) => !!item.anchorId && !!item.labelAr));
    }
  },
);
check("Recommendations and catalogs unchanged by any completion", () => {
  const roadmap = generatePersonalizedRoadmap(answers),
    resources = recommendLearningResources(answers, roadmap);
  const before = JSON.stringify({
    roadmap,
    resources,
    certifications,
    learningResources,
  });
  activities.reduce(
    (p, a) => toggleActivity(p, activities, a.kind, a.id),
    empty,
  );
  assert.equal(
    JSON.stringify({
      roadmap: generatePersonalizedRoadmap(answers),
      resources: recommendLearningResources(answers, roadmap),
      certifications,
      learningResources,
    }),
    before,
  );
  assert.equal(certifications.length, 70);
  assert.equal(learningResources.length, 39);
  assert.equal(
    answerIdentity(answers),
    answerIdentity({
      ...answers,
      desiredSkillIds: [...answers.desiredSkillIds].reverse(),
    }),
  );
});
console.log(
  `Progress validation PASSED: ${checks} groups. Browser accessibility, resource opening and motion require separate browser checks.`,
);

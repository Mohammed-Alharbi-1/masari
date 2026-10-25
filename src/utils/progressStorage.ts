import type { SavedRoadmap } from "../types/progress.ts";
import type { StudentQuestionnaireAnswers } from "../types/questionnaire.ts";
import type { StorageAccess } from "./questionnaireStorage.ts";
import { validateQuestionnaire } from "./questionnaireValidation.ts";
import {
  buildActivities,
  reconcileProgress,
  validateProgress,
} from "./roadmapProgress.ts";
import { generatePersonalizedRoadmap } from "./generateRoadmap.ts";
import { recommendLearningResources } from "./recommendLearningResources.ts";

export const sessionProgressKey = "masari_learning_session_v1";
export const localProgressKey = "masari_learning_device_v1";
export const answerIdentity = (a: StudentQuestionnaireAnswers) =>
  JSON.stringify({
    ...a,
    existingSkillIds: [...a.existingSkillIds].sort(),
    desiredSkillIds: [...a.desiredSkillIds].sort(),
  });
export function activitiesFor(answers: StudentQuestionnaireAnswers) {
  const roadmap = generatePersonalizedRoadmap(answers);
  return buildActivities(roadmap, recommendLearningResources(answers, roadmap));
}
export function validateSavedRoadmap(
  input: unknown,
  persistent = false,
): SavedRoadmap | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const value = input as Record<string, unknown>;
  if (
    Object.keys(value).sort().join() !==
      ["version", "deviceOptIn", "answers", "progress"].sort().join() ||
    value.version !== 1 ||
    typeof value.deviceOptIn !== "boolean" ||
    (persistent && value.deviceOptIn !== true)
  )
    return null;
  const answers = validateQuestionnaire(value.answers);
  const progress = validateProgress(value.progress);
  if (
    !answers.valid ||
    !progress ||
    progress.trackId !== answers.answers.careerTrack
  )
    return null;
  return {
    version: 1,
    deviceOptIn: value.deviceOptIn,
    answers: answers.answers,
    progress: reconcileProgress(
      progress,
      progress.trackId,
      activitiesFor(answers.answers),
    ),
  };
}
export function readLearningData(
  access: StorageAccess,
  persistent = false,
): {
  status: "restored" | "empty" | "invalid" | "unavailable";
  data: SavedRoadmap | null;
} {
  try {
    const raw = access().getItem(
      persistent ? localProgressKey : sessionProgressKey,
    );
    if (raw === null) return { status: "empty", data: null };
    try {
      const data = validateSavedRoadmap(JSON.parse(raw), persistent);
      return { status: data ? "restored" : "invalid", data };
    } catch {
      return { status: "invalid", data: null };
    }
  } catch {
    return { status: "unavailable", data: null };
  }
}
export function writeLearningData(
  access: StorageAccess,
  data: SavedRoadmap,
  persistent = false,
): boolean {
  const validated = validateSavedRoadmap(data, persistent);
  if (!validated) return false;
  try {
    access().setItem(
      persistent ? localProgressKey : sessionProgressKey,
      JSON.stringify(validated),
    );
    return true;
  } catch {
    return false;
  }
}
export function removeDeviceData(access: StorageAccess): boolean {
  try {
    access().removeItem(localProgressKey);
    return true;
  } catch {
    return false;
  }
}

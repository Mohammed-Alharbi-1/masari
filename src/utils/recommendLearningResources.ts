import { learningResources } from "../data/learningResources.ts";
import { skills } from "../data/skills.ts";
import { resourceLevels } from "../types/learningResources.ts";
import type {
  LearningResource,
  LearningResourceRecommendation,
} from "../types/learningResources.ts";
import type { StudentQuestionnaireAnswers } from "../types/questionnaire.ts";
import type { PersonalizedRoadmap } from "../types/roadmap.ts";
import type { RoadmapStage } from "../data/types.ts";
import { validateQuestionnaire } from "./questionnaireValidation.ts";

export type RoadmapLearningResources = Record<
  RoadmapStage,
  LearningResourceRecommendation[]
>;
const languageSkills = ["python", "javascript", "typescript", "java", "csharp"];
const platformSkills = ["aws", "azure", "google-cloud"];

/** A supplemental pure projection: never changes certification/stage output. */
export function recommendLearningResources(
  input: StudentQuestionnaireAnswers,
  roadmap: PersonalizedRoadmap,
  catalog: readonly LearningResource[] = learningResources,
): RoadmapLearningResources {
  const validated = validateQuestionnaire(input);
  if (!validated.valid || roadmap.trackId !== validated.answers.careerTrack)
    throw new Error("Valid matching questionnaire/roadmap required");
  const answers = validated.answers;
  const known = new Set(answers.existingSkillIds),
    desired = new Set(answers.desiredSkillIds);
  const chooseSignals = (ids: string[]) => {
    const explicit = ids.filter((id) => desired.has(id));
    return explicit.length ? explicit : ids.filter((id) => known.has(id));
  };
  const languages = chooseSignals(languageSkills),
    platforms = chooseSignals(platformSkills);
  const languageSensitive = [
    "software-development",
    "software-testing",
  ].includes(answers.careerTrack);
  const valid = catalog.filter(
    (resource) =>
      resource.freeAccessVerified === true &&
      resource.lastVerifiedAt !== null &&
      resource.trackIds.includes(answers.careerTrack) &&
      resource.url.startsWith("https://") &&
      (!languageSensitive ||
        !resource.skillIds.some((id) => languageSkills.includes(id)) ||
        resource.skillIds.some((id) => languages.includes(id))) &&
      (!platforms.length ||
        !resource.skillIds.some((id) => platformSkills.includes(id)) ||
        resource.skillIds.some((id) => platforms.includes(id))),
  );
  const used = new Set<string>();
  const result: RoadmapLearningResources = {
    foundation: [],
    intermediate: [],
    advanced: [],
  };
  const selfLevel =
    answers.knowledgeLevel && answers.knowledgeLevel !== "unsure"
      ? resourceLevels.indexOf(answers.knowledgeLevel)
      : null;
  const extras = new Map<string, number>();
  for (const id of roadmap.additionalFocusSkillIds) {
    const levels = valid
      .filter((resource) => resource.skillIds.includes(id))
      .map((resource) => resourceLevels.indexOf(resource.level));
    extras.set(id, levels.length ? Math.min(...levels) : 0);
  }
  roadmap.stages.forEach((stage, index) => {
    const priority = [
      ...new Set([
        ...stage.focusSkillIds,
        ...[...extras].filter(([, level]) => level === index).map(([id]) => id),
        ...(index === 0 && !stage.focusSkillIds.length ? stage.skillIds : []),
      ]),
    ]
      .filter((id) =>
        skills.some(
          (skill) =>
            skill.id === id && skill.tracks.includes(answers.careerTrack),
        ),
      )
      .sort((a, b) => {
        const category = (id: string) =>
          desired.has(id) && !known.has(id)
            ? 0
            : !known.has(id)
              ? 1
              : desired.has(id)
                ? 2
                : 3;
        return category(a) - category(b);
      });
    for (const skillId of priority) {
      if (result[stage.stage].length >= 4) break;
      const targetLevel = Math.min(
        index,
        selfLevel === null ? index : selfLevel,
      );
      const matches = valid.filter(
        (resource) =>
          !used.has(resource.id) &&
          resource.skillIds.includes(skillId) &&
          resourceLevels.indexOf(resource.level) <= index,
      );
      matches.sort(
        (a, b) =>
          Number(a.language !== "ar") - Number(b.language !== "ar") ||
          Math.abs(resourceLevels.indexOf(a.level) - targetLevel) -
            Math.abs(resourceLevels.indexOf(b.level) - targetLevel) ||
          a.skillIds.length - b.skillIds.length ||
          Number(a.type === "official-documentation") -
            Number(b.type === "official-documentation") ||
          a.id.localeCompare(b.id, "en"),
      );
      const selected = matches[0];
      if (!selected) continue;
      used.add(selected.id);
      const name = skills.find((skill) => skill.id === skillId)!.nameAr;
      const reasonAr = desired.has(skillId)
        ? known.has(skillId)
          ? `لتعميق ${name} التي تعرفها وتريد تطويرها.`
          : `لأنك اخترت تطوير ${name} ولم تذكر معرفتها.`
        : known.has(skillId)
          ? `مراجعة اختيارية لـ${name}؛ معرفتك الذاتية لا تعني إتمام المرحلة.`
          : `يدعم ${name} ضمن أولويات هذه المرحلة، ولم تذكر معرفتها.`;
      result[stage.stage].push({
        resourceId: selected.id,
        matchedSkillId: skillId,
        reasonAr,
      });
    }
  });
  return result;
}

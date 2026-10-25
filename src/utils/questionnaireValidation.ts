import {
  majorOptions,
  academicYearOptions,
  knowledgeLevelOptions,
  budgetOptions,
  studyTimeOptions,
} from "../data/questionnaireOptions.ts";
import { careerTracks } from "../data/careerTracks.ts";
import { skills } from "../data/skills.ts";
import type { CareerTrack } from "../data/types.ts";
import type {
  QuestionnaireErrors,
  StudentQuestionnaireAnswers,
  StudentQuestionnaireDraft,
} from "../types/questionnaire.ts";

export function createEmptyDraft(): StudentQuestionnaireDraft {
  return {
    major: null,
    academicYear: null,
    careerTrack: null,
    existingSkillIds: [],
    desiredSkillIds: [],
    knowledgeLevel: null,
    budget: null,
    weeklyStudyTime: null,
  };
}

function supported(
  options: readonly { id: string }[],
  value: unknown,
): boolean {
  return (
    typeof value === "string" && options.some((option) => option.id === value)
  );
}

export function validateAcademicStep(value: {
  major?: unknown;
  academicYear?: unknown;
}): QuestionnaireErrors {
  const errors: QuestionnaireErrors = {};
  if (!supported(majorOptions, value.major))
    errors.major = "اختر تخصصك الجامعي للمتابعة.";
  if (!supported(academicYearOptions, value.academicYear))
    errors.academicYear = "اختر سنتك الدراسية للمتابعة.";
  return errors;
}

export function validateCareerStep(value: {
  careerTrack?: unknown;
}): QuestionnaireErrors {
  return supported(careerTracks, value.careerTrack)
    ? {}
    : { careerTrack: "اختر مجالًا مهنيًا واحدًا للمتابعة." };
}

export function changeCareerTrack(
  draft: StudentQuestionnaireDraft,
  careerTrack: CareerTrack,
): StudentQuestionnaireDraft {
  if (draft.careerTrack === careerTrack) return draft;
  return { ...draft, careerTrack, existingSkillIds: [], desiredSkillIds: [] };
}

type ValidationResult =
  | { valid: true; answers: StudentQuestionnaireAnswers }
  | { valid: false; errors: QuestionnaireErrors };
const answerFields = [
  "major",
  "academicYear",
  "careerTrack",
  "existingSkillIds",
  "desiredSkillIds",
  "knowledgeLevel",
  "budget",
  "weeklyStudyTime",
] as const;

/** Treat stored JSON as unknown. Only the exact anonymous, current schema is accepted. */
export function validateQuestionnaire(value: unknown): ValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return {
      valid: false,
      errors: { form: "الإجابات غير صالحة. ابدأ الاستبيان من جديد." },
    };
  const record = value as Record<string, unknown>;
  const errors: QuestionnaireErrors = {
    ...validateAcademicStep(record),
    ...validateCareerStep(record),
  };
  if (
    Object.keys(record).length !== answerFields.length ||
    Object.keys(record).some(
      (key) => !answerFields.some((field) => field === key),
    )
  )
    errors.form = "صيغة الإجابات غير مدعومة. ابدأ الاستبيان من جديد.";
  for (const key of ["existingSkillIds", "desiredSkillIds"] as const) {
    const ids = record[key];
    if (
      !Array.isArray(ids) ||
      ids.length > skills.length ||
      ids.some(
        (id) =>
          typeof id !== "string" ||
          !skills.some(
            (skill) =>
              skill.id === id &&
              skill.tracks.some((track) => track === record.careerTrack),
          ),
      ) ||
      new Set(ids).size !== ids.length
    ) {
      errors[key] =
        key === "existingSkillIds"
          ? "راجع مهاراتك الحالية؛ يجب أن ترتبط بالمجال المختار دون تكرار."
          : "راجع المهارات المطلوبة؛ يجب أن ترتبط بالمجال المختار دون تكرار.";
    }
  }
  for (const [key, options, message] of [
    [
      "knowledgeLevel",
      knowledgeLevelOptions,
      "اختر مستوى من الخيارات المتاحة أو اتركه دون تحديد.",
    ],
    [
      "budget",
      budgetOptions,
      "اختر ميزانية من الخيارات المتاحة أو اتركها دون تحديد.",
    ],
    [
      "weeklyStudyTime",
      studyTimeOptions,
      "اختر وقتًا من الخيارات المتاحة أو اتركه دون تحديد.",
    ],
  ] as const) {
    if (record[key] !== null && !supported(options, record[key]))
      errors[key] = message;
  }
  if (Object.keys(errors).length) return { valid: false, errors };
  // Construct a fresh object: no extra keys or caller-owned arrays are retained.
  const answers = record as unknown as StudentQuestionnaireAnswers;
  return {
    valid: true,
    answers: {
      major: answers.major,
      academicYear: answers.academicYear,
      careerTrack: answers.careerTrack,
      existingSkillIds: [...answers.existingSkillIds],
      desiredSkillIds: [...answers.desiredSkillIds],
      knowledgeLevel: answers.knowledgeLevel,
      budget: answers.budget,
      weeklyStudyTime: answers.weeklyStudyTime,
    },
  };
}

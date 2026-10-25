import type { CareerTrack } from "../data/types.ts";
import type {
  majorOptions,
  academicYearOptions,
  knowledgeLevelOptions,
  budgetOptions,
  studyTimeOptions,
} from "../data/questionnaireOptions.ts";

export type MajorId = (typeof majorOptions)[number]["id"];
export type AcademicYearId = (typeof academicYearOptions)[number]["id"];
export type KnowledgeLevel = (typeof knowledgeLevelOptions)[number]["id"];
export type BudgetPreference = (typeof budgetOptions)[number]["id"];
export type StudyTimePreference = (typeof studyTimeOptions)[number]["id"];

export interface StudentQuestionnaireAnswers {
  major: MajorId;
  academicYear: AcademicYearId;
  careerTrack: CareerTrack;
  existingSkillIds: string[];
  desiredSkillIds: string[];
  knowledgeLevel: KnowledgeLevel | null;
  budget: BudgetPreference | null;
  weeklyStudyTime: StudyTimePreference | null;
}

export interface StudentQuestionnaireDraft extends Omit<
  StudentQuestionnaireAnswers,
  "major" | "academicYear" | "careerTrack"
> {
  major: MajorId | null;
  academicYear: AcademicYearId | null;
  careerTrack: CareerTrack | null;
}

export type QuestionnaireErrors = Partial<
  Record<keyof StudentQuestionnaireAnswers | "form", string>
>;

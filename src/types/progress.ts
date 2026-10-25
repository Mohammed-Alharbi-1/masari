import type { CareerTrack, RoadmapStage } from "../data/types.ts";
import type { StudentQuestionnaireAnswers } from "./questionnaire.ts";

export interface RoadmapProgress {
  version: 1;
  trackId: CareerTrack;
  completedSkillIds: string[];
  completedMilestoneIds: string[];
  completedResourceIds: string[];
}
export interface SavedRoadmap {
  version: 1;
  deviceOptIn: boolean;
  answers: StudentQuestionnaireAnswers;
  progress: RoadmapProgress;
}
export type ActivityKind = "skill" | "milestone" | "resource";
export interface LearningActivity {
  id: string;
  kind: ActivityKind;
  stage: RoadmapStage;
  labelAr: string;
  anchorId: string;
}

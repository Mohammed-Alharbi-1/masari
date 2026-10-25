import type { CareerTrack, RoadmapStage } from "../data/types.ts";

export interface RoadmapCertificationOption {
  certificationId: string;
  reasonAr: string;
  warningAr: string;
  optional: true;
  futureGoal: boolean;
}
export interface PersonalizedRoadmapStage {
  stage: RoadmapStage;
  titleAr: string;
  descriptionAr: string;
  skillIds: string[];
  knownSkillIds: string[];
  desiredSkillIds: string[];
  focusSkillIds: string[];
  deepenSkillIds: string[];
  revisitSkillIds: string[];
  practicalMilestoneAr: string;
  reasonAr: string;
  highlightedCertification: RoadmapCertificationOption | null;
  alternativeCertifications: RoadmapCertificationOption[];
  futureGoal: boolean;
}
export interface CloudProviderPath {
  skillId: string;
  providerId: string;
  stageOptions: {
    stage: RoadmapStage;
    option: RoadmapCertificationOption | null;
  }[];
}
export interface PersonalizedRoadmap {
  trackId: CareerTrack;
  knownSkillIds: string[];
  desiredSkillIds: string[];
  stages: PersonalizedRoadmapStage[];
  additionalFocusSkillIds: string[];
  providerPaths: CloudProviderPath[];
  guidanceNotesAr: string[];
  startingPointAr: string;
}

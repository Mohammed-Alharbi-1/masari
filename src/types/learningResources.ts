import type { CareerTrack } from "../data/types.ts";
export const resourceTypes = [
  "youtube-video",
  "youtube-playlist",
  "online-course",
  "interactive-tutorial",
  "official-documentation",
] as const;
export const resourceLanguages = ["ar", "en"] as const;
export const resourceLevels = ["beginner", "intermediate", "advanced"] as const;
export const registrationRequirements = [
  "none",
  "optional",
  "required",
] as const;
export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: (typeof resourceTypes)[number];
  language: (typeof resourceLanguages)[number];
  skillIds: string[];
  trackIds: CareerTrack[];
  level: (typeof resourceLevels)[number];
  descriptionAr: string;
  url: string;
  freeAccessVerified: boolean;
  lastVerifiedAt: string | null;
  registration: (typeof registrationRequirements)[number];
  freeAccessNoteAr: string;
}
export interface LearningResourceRecommendation {
  resourceId: string;
  matchedSkillId: string;
  reasonAr: string;
}
export const resourceTypeLabels: Record<LearningResource["type"], string> = {
  "youtube-video": "درس فيديو",
  "youtube-playlist": "قائمة دروس",
  "online-course": "دورة تعليمية",
  "interactive-tutorial": "تعلّم تطبيقي",
  "official-documentation": "دليل رسمي",
};

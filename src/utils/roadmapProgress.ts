import { careerTracks } from "../data/careerTracks.ts";
import { skills } from "../data/skills.ts";
import { learningResources } from "../data/learningResources.ts";
import { roadmapStages } from "../data/types.ts";
import type { CareerTrack, RoadmapStage } from "../data/types.ts";
import type { PersonalizedRoadmap } from "../types/roadmap.ts";
import type { RoadmapLearningResources } from "./recommendLearningResources.ts";
import type {
  ActivityKind,
  LearningActivity,
  RoadmapProgress,
} from "../types/progress.ts";

export const milestoneId = (track: CareerTrack, stage: RoadmapStage) =>
  `${track}:${stage}:practice`;
export const activityAnchor = (kind: ActivityKind, id: string) =>
  `activity-${kind}-${id}`;
export function emptyProgress(trackId: CareerTrack): RoadmapProgress {
  return {
    version: 1,
    trackId,
    completedSkillIds: [],
    completedMilestoneIds: [],
    completedResourceIds: [],
  };
}
const fields = {
  skill: "completedSkillIds",
  milestone: "completedMilestoneIds",
  resource: "completedResourceIds",
} as const;

/** Each canonical skill/resource belongs to its first displayed stage for counting. */
export function buildActivities(
  roadmap: PersonalizedRoadmap,
  resources: RoadmapLearningResources,
): LearningActivity[] {
  const activities: LearningActivity[] = [];
  const seen = new Set<string>();
  const add = (
    kind: ActivityKind,
    id: string,
    stage: RoadmapStage,
    labelAr: string,
  ) => {
    const key = `${kind}:${id}`;
    if (seen.has(key)) return;
    seen.add(key);
    activities.push({
      kind,
      id,
      stage,
      labelAr,
      anchorId: activityAnchor(kind, id),
    });
  };
  for (const stage of roadmap.stages) {
    for (const id of [...stage.focusSkillIds, ...stage.skillIds]) {
      add(
        "skill",
        id,
        stage.stage,
        `تعلّم ${skills.find((s) => s.id === id)!.nameAr}`,
      );
    }
    for (const resource of resources[stage.stage]) {
      add(
        "resource",
        resource.resourceId,
        stage.stage,
        learningResources.find((r) => r.id === resource.resourceId)!.title,
      );
    }
    add(
      "milestone",
      milestoneId(roadmap.trackId, stage.stage),
      stage.stage,
      `المشروع العملي: ${stage.titleAr}`,
    );
  }
  for (const id of roadmap.additionalFocusSkillIds) {
    add(
      "skill",
      id,
      "advanced",
      `تعلّم ${skills.find((s) => s.id === id)!.nameAr}`,
    );
  }
  return activities;
}

/** Reject shape errors; prune obsolete/catalog-invalid IDs instead of displaying them. */
export function validateProgress(input: unknown): RoadmapProgress | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const p = input as Record<string, unknown>;
  if (
    Object.keys(p).sort().join() !==
      ["version", "trackId", ...Object.values(fields)].sort().join() ||
    p.version !== 1 ||
    !careerTracks.some((t) => t.id === p.trackId)
  )
    return null;
  for (const field of Object.values(fields)) {
    if (
      !Array.isArray(p[field]) ||
      p[field].length > 1000 ||
      !p[field].every((id) => typeof id === "string" && id.length <= 200) ||
      new Set(p[field]).size !== p[field].length
    )
      return null;
  }
  const track = p.trackId as CareerTrack;
  return {
    version: 1,
    trackId: track,
    completedSkillIds: (p.completedSkillIds as string[]).filter((id) =>
      skills.some((s) => s.id === id && s.tracks.includes(track)),
    ),
    completedMilestoneIds: (p.completedMilestoneIds as string[]).filter((id) =>
      roadmapStages.some((stage) => milestoneId(track, stage) === id),
    ),
    completedResourceIds: (p.completedResourceIds as string[]).filter((id) =>
      learningResources.some((r) => r.id === id && r.trackIds.includes(track)),
    ),
  };
}
export function reconcileProgress(
  previous: RoadmapProgress | null,
  track: CareerTrack,
  activities: LearningActivity[],
): RoadmapProgress {
  const result = emptyProgress(track);
  const valid = validateProgress(previous);
  if (!valid || valid.trackId !== track) return result;
  for (const kind of Object.keys(fields) as ActivityKind[]) {
    result[fields[kind]] = valid[fields[kind]].filter((id) =>
      activities.some((a) => a.kind === kind && a.id === id),
    );
  }
  return result;
}
export const isCompleted = (
  p: RoadmapProgress,
  activity: Pick<LearningActivity, "kind" | "id">,
) => p[fields[activity.kind]].includes(activity.id);
export function toggleActivity(
  p: RoadmapProgress,
  activities: LearningActivity[],
  kind: ActivityKind,
  id: string,
): RoadmapProgress {
  if (!activities.some((a) => a.kind === kind && a.id === id)) return p;
  const field = fields[kind];
  return {
    ...p,
    [field]: p[field].includes(id)
      ? p[field].filter((value) => value !== id)
      : [...p[field], id],
  };
}
export function summarizeProgress(
  p: RoadmapProgress,
  activities: LearningActivity[],
) {
  const summarize = (items: LearningActivity[]) => ({
    total: items.length,
    completed: items.filter((a) => isCompleted(p, a)).length,
  });
  return {
    ...summarize(activities),
    stages: roadmapStages.map((stage) => ({
      stage,
      ...summarize(activities.filter((a) => a.stage === stage)),
    })),
    next: activities.find((a) => !isCompleted(p, a)) ?? null,
  };
}

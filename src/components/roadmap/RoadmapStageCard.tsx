import { skills } from "../../data/skills";
import type { PersonalizedRoadmapStage } from "../../types/roadmap";
import { RoadmapCertification } from "./RoadmapCertification";
import { LearningResourcesSection } from "./LearningResourcesSection";
import type { LearningResourceRecommendation } from "../../types/learningResources";
import type { CareerTrack } from "../../data/types";
import type { LearningActivity } from "../../types/progress";
import { milestoneId } from "../../utils/roadmapProgress";
import { CompletionControl } from "./CompletionControl";
import type { ProgressControls } from "./CompletionControl";

export function RoadmapStageCard({
  stage,
  index,
  hasProviderPaths,
  resources,
  controls,
  activities,
  trackId,
}: {
  stage: PersonalizedRoadmapStage;
  index: number;
  hasProviderPaths: boolean;
  resources: LearningResourceRecommendation[];
  controls: ProgressControls;
  activities: LearningActivity[];
  trackId: CareerTrack;
}) {
  return (
    <li className="roadmap-stage" aria-labelledby={`stage-${stage.stage}`}>
      <div className="roadmap-stage-heading">
        <span className="roadmap-stage-number" aria-hidden="true">
          0{index + 1}
        </span>
        <div>
          <span className="eyebrow">
            {stage.futureGoal
              ? "اتجاه مستقبلي اختياري"
              : index === 0
                ? "الأساس أولًا"
                : "تطبيق وتعمق"}
          </span>
          <h2 id={`stage-${stage.stage}`}>{stage.titleAr}</h2>
        </div>
      </div>
      <p>{stage.descriptionAr}</p>
      {stage.futureGoal && (
        <p className="roadmap-warning">
          هذه مرحلة مستقبلية بعد بناء الأساس والممارسة، وليست مطالبة بالتسجيل في
          اختبار الآن.
        </p>
      )}
      <h3>مهارات هذه المرحلة</h3>
      <ul className="roadmap-skills">
        {stage.skillIds.map((id) => (
          <li key={id}>
            <span>{skills.find((skill) => skill.id === id)!.nameAr}</span>
            <small>
              {stage.deepenSkillIds.includes(id)
                ? "تعرفها وتريد تعميقها"
                : stage.knownSkillIds.includes(id)
                  ? "ذكرت معرفتها · راجعها بالتطبيق"
                  : stage.desiredSkillIds.includes(id)
                    ? "من رغباتك · تحتاج تطويرًا"
                    : stage.revisitSkillIds.includes(id)
                      ? "تطبيق أعمق لما سبق"
                      : "لم تذكر معرفتها"}
            </small>
            <CompletionControl
              kind="skill"
              activityId={id}
              label={`أنهيت تعلم ${skills.find((skill) => skill.id === id)!.nameAr}`}
              controls={controls}
              anchor={
                activities.find((a) => a.kind === "skill" && a.id === id)
                  ?.stage === stage.stage
              }
            />
          </li>
        ))}
      </ul>
      <div className="roadmap-focus">
        <h3>على وش تركز هنا؟</h3>
        <p>{stage.reasonAr}</p>
        {stage.focusSkillIds.length > 0 && (
          <ol>
            {stage.focusSkillIds.map((id) => (
              <li key={id}>
                {skills.find((skill) => skill.id === id)!.nameAr}
                {stage.deepenSkillIds.includes(id) ? " — لتعميق معرفتك" : ""}
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="roadmap-project">
        <span className="eyebrow">الممارسة هي الأساس</span>
        <h3>مشروعك العملي</h3>
        <p>{stage.practicalMilestoneAr}</p>
        <CompletionControl
          kind="milestone"
          activityId={milestoneId(trackId, stage.stage)}
          label={`أنهيت المشروع العملي في ${stage.titleAr}`}
          controls={controls}
        />
      </div>
      <LearningResourcesSection
        recommendations={resources}
        stageTitle={stage.titleAr}
        controls={controls}
      />
      <section
        className="roadmap-stage-certifications"
        aria-label={`خيارات الشهادات في ${stage.titleAr}`}
      >
        <h3>شهادات ممكن تفكر فيها</h3>
        <p>
          مو مطلوب تجمع كل الخيارات. ابدأ بالمشروع، ثم قرر إذا كانت شهادة واحدة
          تخدم هدفك؛ البدائل تختلف في نطاقها.
        </p>
        {stage.highlightedCertification ? (
          <RoadmapCertification option={stage.highlightedCertification} />
        ) : (
          <p className="roadmap-no-credential">
            {hasProviderPaths ? (
              <>
                خيارات هذه المرحلة مرتبة حسب المنصة في{" "}
                <a
                  href="#provider-paths"
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById("provider-paths")?.focus();
                  }}
                >
                  مسارات المنصات البديلة
                </a>{" "}
                أدناه. اختر منصة واحدة للتطبيق.
              </>
            ) : (
              "ما اخترنا شهادة مناسبة لهذه المرحلة وفق إجاباتك والبيانات المتاحة. المهارات والمشروع مسار مفيد بحد ذاتها."
            )}
          </p>
        )}
        {stage.alternativeCertifications.length > 0 && (
          <details className="roadmap-alternatives">
            <summary>
              بدائل اختيارية ({stage.alternativeCertifications.length})
            </summary>
            {stage.alternativeCertifications.map((option) => (
              <RoadmapCertification
                key={option.certificationId}
                option={option}
                alternative
              />
            ))}
          </details>
        )}
      </section>
    </li>
  );
}

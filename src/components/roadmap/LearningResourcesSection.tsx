import { learningResources } from "../../data/learningResources";
import { skills } from "../../data/skills";
import { resourceTypeLabels } from "../../types/learningResources";
import type { LearningResourceRecommendation } from "../../types/learningResources";
import "../../styles/learningResources.css";
import { CompletionControl } from "./CompletionControl";
import type { ProgressControls } from "./CompletionControl";

export function LearningResourcesSection({
  recommendations,
  stageTitle,
  controls,
}: {
  recommendations: LearningResourceRecommendation[];
  stageTitle: string;
  controls: ProgressControls;
}) {
  return (
    <section
      className="learning-resources"
      aria-label={`مصادر مجانية تساعدك تتعلم في ${stageTitle}`}
    >
      <div className="learning-resources-heading">
        <span className="resource-heading-mark" aria-hidden="true">
          ↗
        </span>
        <div>
          <h3>مصادر مجانية تساعدك تتعلم</h3>
          <p>
            اختر مصدرًا واحدًا كبداية. مجانية المحتوى لا تعني مجانية الأدوات أو
            اختبارات الشهادات.
          </p>
        </div>
      </div>
      {recommendations.length ? (
        <div className="learning-resource-grid">
          {recommendations.map((recommendation) => {
            const resource = learningResources.find(
              (item) => item.id === recommendation.resourceId,
            )!;
            const skill = skills.find(
              (item) => item.id === recommendation.matchedSkillId,
            )!;
            return (
              <article
                className="learning-resource-card"
                key={resource.id}
                aria-label={resource.title}
              >
                <div className="resource-card-labels">
                  <span className="resource-free-label">مجاني للوصول</span>
                  <span>
                    {resource.language === "ar" ? "بالعربي" : "بالإنجليزي"} ·{" "}
                    {resourceTypeLabels[resource.type]}
                  </span>
                </div>
                <h4 lang={resource.language} dir="auto">
                  {resource.title}
                </h4>
                <p className="resource-provider">
                  <bdi>{resource.provider}</bdi>
                </p>
                <p className="resource-skill">لتعلّم {skill.nameAr}</p>
                <p className="resource-description">{resource.descriptionAr}</p>
                <p className="resource-reason">{recommendation.reasonAr}</p>
                <div className="resource-access">
                  <span>
                    {resource.registration === "required"
                      ? "يتطلب حسابًا مجانيًا"
                      : resource.registration === "optional"
                        ? "الحساب اختياري"
                        : "بدون حساب لقراءة المحتوى"}
                  </span>
                  <p>{resource.freeAccessNoteAr}</p>
                </div>
                <div className="resource-card-bottom">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-start"
                    aria-label={`ابدأ التعلم — ${resource.title} (يفتح في تبويب جديد)`}
                  >
                    ابدأ التعلم <span aria-hidden="true">↗</span>
                  </a>
                  <span>
                    تحقق:{" "}
                    <time dateTime={resource.lastVerifiedAt!} dir="ltr">
                      {resource.lastVerifiedAt}
                    </time>
                  </span>
                </div>
                <CompletionControl
                  kind="resource"
                  activityId={resource.id}
                  label={`أنهيت المصدر: ${resource.title}`}
                  controls={controls}
                />
              </article>
            );
          })}
        </div>
      ) : (
        <p className="resource-empty">
          ما عندنا مصدر مجاني متحقق يناسب أولويات هذه المرحلة حاليًا، أو سبق
          عرضه في مرحلة سابقة. المهارات والمشروع يظلون نقطة انطلاق مفيدة.
        </p>
      )}
      <p className="resource-verification-note">
        مراجعة بتاريخ محدد، مو ضمان لاستمرار الإتاحة. المصادر التعليمية مستقلة
        عن الشهادات الاحترافية؛ مزودوها لا يعلنون تأييد مساري.
      </p>
    </section>
  );
}

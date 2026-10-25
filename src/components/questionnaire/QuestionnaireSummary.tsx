import type { Ref } from "react";
import { Link } from "react-router";
import { careerTracks } from "../../data/careerTracks";
import { skills } from "../../data/skills";
import {
  majorOptions,
  academicYearOptions,
  knowledgeLevelOptions,
  budgetOptions,
  studyTimeOptions,
  getOptionLabel,
} from "../../data/questionnaireOptions";
import type { StudentQuestionnaireAnswers } from "../../types/questionnaire";
export function QuestionnaireSummary({
  answers,
  onEdit,
  onReset,
  headingRef,
}: {
  answers: StudentQuestionnaireAnswers;
  onEdit: () => void;
  onReset: () => void;
  headingRef: Ref<HTMLHeadingElement>;
}) {
  const skillList = (ids: string[], empty: string) =>
    ids.length ? (
      <ul className="summary-skills">
        {ids.map((id) => (
          <li key={id}>{skills.find((skill) => skill.id === id)?.nameAr}</li>
        ))}
      </ul>
    ) : (
      <p>{empty}</p>
    );
  return (
    <div className="questionnaire-panel questionnaire-summary">
      <header>
        <span className="eyebrow">ملخص إجاباتك</span>
        <h1 tabIndex={-1} ref={headingRef}>
          ممتاز! صار عندنا تصور عن مسارك
        </h1>
        <p>هذي اختياراتك، وتقدر تعدّلها بأي وقت خلال الجلسة.</p>
      </header>
      <dl className="questionnaire-summary-grid">
        <div>
          <dt>التخصص الجامعي</dt>
          <dd>{getOptionLabel(majorOptions, answers.major)}</dd>
        </div>
        <div>
          <dt>السنة الدراسية</dt>
          <dd>{getOptionLabel(academicYearOptions, answers.academicYear)}</dd>
        </div>
        <div className="summary-wide">
          <dt>المجال المهني</dt>
          <dd>
            {
              careerTracks.find((track) => track.id === answers.careerTrack)
                ?.nameAr
            }
          </dd>
        </div>
        <div className="summary-wide">
          <dt>المهارات الحالية</dt>
          <dd>
            {skillList(
              answers.existingSkillIds,
              "ما عندي مهارات سابقة في هذا المجال",
            )}
          </dd>
        </div>
        <div className="summary-wide">
          <dt>المهارات اللي ودك تتعلمها</dt>
          <dd>
            {skillList(answers.desiredSkillIds, "ما حددت مهارات معينة للحين")}
          </dd>
        </div>
        {answers.knowledgeLevel && (
          <div>
            <dt>المستوى حسب تقييمك</dt>
            <dd>
              {getOptionLabel(knowledgeLevelOptions, answers.knowledgeLevel)}
            </dd>
          </div>
        )}
        {answers.budget && (
          <div>
            <dt>تفضيل الميزانية</dt>
            <dd>{getOptionLabel(budgetOptions, answers.budget)}</dd>
          </div>
        )}
        {answers.weeklyStudyTime && (
          <div>
            <dt>وقت التعلم أسبوعيًا</dt>
            <dd>{getOptionLabel(studyTimeOptions, answers.weeklyStudyTime)}</dd>
          </div>
        )}
      </dl>
      <p className="questionnaire-notice">
        خارطة الطريق الشخصية والتوصيات راح تتوفر في المرحلة القادمة. حاليًا تقدر
        تستكشف الشهادات المرتبطة بمجالك.
      </p>
      <div className="questionnaire-actions">
        <Link
          className="button button-primary"
          to={`/certifications?track=${answers.careerTrack}`}
        >
          استعراض الشهادات
        </Link>
        <button
          type="button"
          className="button button-secondary"
          onClick={onEdit}
        >
          تعديل إجاباتي
        </button>
        <button
          type="button"
          className="questionnaire-text-button"
          onClick={onReset}
        >
          البدء من جديد
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { readQuestionnaireNavigation } from "../utils/questionnaireNavigation";
import { careerTracks } from "../data/careerTracks";
import {
  majorOptions,
  academicYearOptions,
  knowledgeLevelOptions,
  budgetOptions,
  studyTimeOptions,
  questionnaireSteps,
} from "../data/questionnaireOptions";
import type {
  StudentQuestionnaireDraft,
  StudentQuestionnaireAnswers,
  QuestionnaireErrors,
} from "../types/questionnaire";
import {
  createEmptyDraft,
  changeCareerTrack,
  validateAcademicStep,
  validateCareerStep,
  validateQuestionnaire,
} from "../utils/questionnaireValidation";
import {
  restoreQuestionnaire,
  saveQuestionnaire,
  clearQuestionnaire,
} from "../utils/questionnaireStorage";
import { SkillSelector } from "../components/questionnaire/SkillSelector";
import { QuestionnaireSummary } from "../components/questionnaire/QuestionnaireSummary";
import "../styles/questionnaire.css";
import { learningStore } from "../hooks/useLearningProgress";
import { useStepMotion } from "../hooks/usePageMotion";

const storage = () => window.sessionStorage;
const unavailableMessage =
  "التخزين المؤقت غير متاح. تقدر تكمل هنا، لكن لا تعتمد على استعادة إجاباتك بعد تحديث الصفحة.";
function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  error,
  required = false,
}: {
  id: string;
  label: string;
  options: readonly { id: string; labelAr: string }[];
  value: string | null;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="questionnaire-field">
      <label htmlFor={id}>
        {label} <span>{required ? "مطلوب" : "اختياري"}</span>
      </label>
      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="">{required ? "اختر إجابتك" : "دون تحديد"}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.labelAr}
          </option>
        ))}
      </select>
      {error && (
        <p className="questionnaire-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
export default function QuestionnairePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [restored] = useState(() => {
    const incoming = readQuestionnaireNavigation(location.state as unknown);
    return incoming
      ? {
          status: "navigation",
          answers: incoming.answers,
          editing: incoming.edit,
        }
      : { ...restoreQuestionnaire(storage), editing: false };
  });
  // Consume the validated edit payload once. Later reloads must use the latest
  // submission, not an older snapshot left in this history entry.
  useEffect(() => {
    if (readQuestionnaireNavigation(location.state as unknown)) {
      void navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);
  const [draft, setDraft] = useState<StudentQuestionnaireDraft>(
    () => restored.answers ?? createEmptyDraft(),
  );
  const [submitted, setSubmitted] =
    useState<StudentQuestionnaireAnswers | null>(
      restored.editing ? null : restored.answers,
    );
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<QuestionnaireErrors>({});
  const [trackChanged, setTrackChanged] = useState(false);
  const [notice, setNotice] = useState(
    restored.editing
      ? "عدّل إجاباتك ثم أكمل لحفظها وإعادة إنشاء خارطتك. النسخة السابقة تبقى حتى تكمل التعديل."
      : restored.status === "invalid"
        ? "تجاهلنا إجابات محفوظة بصيغة غير صالحة أو قديمة. ابدأ بإجابات جديدة."
        : restored.status === "unavailable"
          ? unavailableMessage
          : "",
  );
  const heading = useRef<HTMLHeadingElement>(null);
  const motionScope = useRef<HTMLElement>(null);
  useStepMotion(motionScope, step, !!submitted);
  useEffect(() => {
    heading.current?.focus();
  }, [step, submitted]);
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (firstError)
      document
        .getElementById(
          firstError === "form" ? "questionnaire-errors" : firstError,
        )
        ?.focus();
  }, [errors]);
  function update<K extends keyof StudentQuestionnaireDraft>(
    key: K,
    value: StudentQuestionnaireDraft[K],
  ) {
    setDraft((previous) => ({ ...previous, [key]: value }));
    if (Object.keys(errors).length) setErrors({});
  }
  function complete(skipPreferences = false) {
    const candidate = skipPreferences
      ? { ...draft, knowledgeLevel: null, budget: null, weeklyStudyTime: null }
      : draft;
    const result = validateQuestionnaire(candidate);
    if (!result.valid) {
      setErrors(result.errors);
      setStep(
        result.errors.major || result.errors.academicYear
          ? 0
          : result.errors.careerTrack
            ? 1
            : result.errors.existingSkillIds || result.errors.desiredSkillIds
              ? 2
              : 3,
      );
      return;
    }
    const saved = saveQuestionnaire(storage, result.answers);
    // A successful submission is the new active context, including header and
    // direct roadmap navigation. Resume still leaves this submission untouched.
    learningStore().open(result.answers);
    setNotice(
      saved === "saved"
        ? "حُفظت إجاباتك المكتملة مؤقتًا في جلسة هذا المتصفح."
        : unavailableMessage,
    );
    setDraft(result.answers);
    setSubmitted(result.answers);
    setErrors({});
  }
  function advance(event: FormEvent) {
    event.preventDefault();
    const nextErrors =
      step === 0
        ? validateAcademicStep(draft)
        : step === 1
          ? validateCareerStep(draft)
          : {};
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (step === 3) complete();
    else setStep(step + 1);
  }
  function reset() {
    const result = clearQuestionnaire(storage);
    setDraft(createEmptyDraft());
    setSubmitted(null);
    setStep(0);
    setErrors({});
    setTrackChanged(false);
    setNotice(
      result === "cleared"
        ? "تم مسح الإجابات. تقدر تبدأ من جديد."
        : "تم مسح الإجابات من هذه الصفحة، لكن تعذر حذف النسخة المحفوظة؛ قد تظهر مجددًا عند التحديث.",
    );
  }
  return (
    <section
      ref={motionScope}
      className="container questionnaire-page"
      aria-label="استبيان اكتشاف المسار"
    >
      <div className="questionnaire-intro">
        <span className="eyebrow">اكتشف مسارك · بدون حساب</span>
        <p>خطوات بسيطة عن دراستك واهتماماتك، في دقيقتين إلى ثلاث تقريبًا.</p>
      </div>
      {notice && (
        <p className="questionnaire-notice" role="status">
          {notice}
        </p>
      )}
      {submitted ? (
        <QuestionnaireSummary
          answers={submitted}
          headingRef={heading}
          onReset={reset}
          onEdit={() => {
            setSubmitted(null);
            setStep(0);
            setErrors({});
            setNotice(
              "عدّل إجاباتك ثم أكمل لحفظها. تحديث الصفحة قبل الإكمال يستعيد آخر إجابات محفوظة فقط.",
            );
          }}
        />
      ) : (
        <>
          <nav aria-label="تقدم الاستبيان" className="questionnaire-progress">
            <p>الخطوة {step + 1} من 4</p>
            <progress
              max={4}
              value={step + 1}
              aria-label={`الخطوة ${step + 1} من 4`}
            />
            <ol>
              {questionnaireSteps.map((item, index) => (
                <li
                  key={item.labelAr}
                  aria-current={index === step ? "step" : undefined}
                  className={index <= step ? "is-reached" : ""}
                >
                  <span>{index + 1}</span>
                  {item.labelAr}
                </li>
              ))}
            </ol>
          </nav>
          <form className="questionnaire-panel" onSubmit={advance} noValidate>
            <header>
              <h1 ref={heading} tabIndex={-1}>
                {questionnaireSteps[step].titleAr}
              </h1>
              <p>
                {step === 0
                  ? "تخصصك بداية للتعارف، واختيار مجالك المهني يرجع لك."
                  : step === 1
                    ? "اختر المجال اللي حاب تطور نفسك فيه، حتى لو كان مختلف عن تخصصك الجامعي."
                    : step === 2
                      ? "اختياراتك اختيارية. وتقدر تعرف مهارة وتختار تطورها بنفس الوقت."
                      : "كل الأسئلة هنا اختيارية، وتقدر تتخطاها."}
              </p>
            </header>
            {!!Object.keys(errors).length && (
              <div
                id="questionnaire-errors"
                tabIndex={-1}
                role="alert"
                className="questionnaire-error"
              >
                راجع الإجابات الموضحة أدناه. {errors.form}
              </div>
            )}
            {step === 0 && (
              <div className="questionnaire-fields">
                <SelectField
                  id="major"
                  label="وش تخصصك الجامعي؟"
                  options={majorOptions}
                  required
                  value={draft.major}
                  error={errors.major}
                  onChange={(id) =>
                    update(
                      "major",
                      majorOptions.find((o) => o.id === id)?.id ?? null,
                    )
                  }
                />
                <SelectField
                  id="academicYear"
                  label="في أي سنة دراسية أنت؟"
                  options={academicYearOptions}
                  required
                  value={draft.academicYear}
                  error={errors.academicYear}
                  onChange={(id) =>
                    update(
                      "academicYear",
                      academicYearOptions.find((o) => o.id === id)?.id ?? null,
                    )
                  }
                />
              </div>
            )}
            {step === 1 && (
              <fieldset
                id="careerTrack"
                tabIndex={-1}
                className="questionnaire-track-field"
                aria-invalid={!!errors.careerTrack}
                aria-describedby={
                  errors.careerTrack ? "careerTrack-error" : undefined
                }
              >
                <legend>
                  اختر مجالًا واحدًا <span>مطلوب</span>
                </legend>
                {errors.careerTrack && (
                  <p id="careerTrack-error" className="questionnaire-error">
                    {errors.careerTrack}
                  </p>
                )}
                <div className="questionnaire-tracks">
                  {careerTracks.map((track) => (
                    <label
                      key={track.id}
                      className={`questionnaire-track ${draft.careerTrack === track.id ? "is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="careerTrack"
                        value={track.id}
                        checked={draft.careerTrack === track.id}
                        onChange={() => {
                          if (
                            draft.careerTrack &&
                            draft.careerTrack !== track.id
                          )
                            setTrackChanged(true);
                          setDraft((previous) =>
                            changeCareerTrack(previous, track.id),
                          );
                          setErrors({});
                        }}
                        required
                      />
                      <span>
                        <strong>{track.nameAr}</strong>
                        <small>{track.descriptionAr}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            {trackChanged && (step === 1 || step === 2) && (
              <p className="questionnaire-notice" role="status">
                غيّرت المجال، فمسحنا اختيارات المهارات السابقة عشان تختار مهارات
                مرتبطة بمجالك الجديد. إجابات الدراسة والتفضيلات باقية.
              </p>
            )}
            {step === 2 && draft.careerTrack && (
              <div className="questionnaire-skills">
                <p className="questionnaire-track-caption">
                  مهارات مجال{" "}
                  {
                    careerTracks.find((track) => track.id === draft.careerTrack)
                      ?.nameAr
                  }
                </p>
                <SkillSelector
                  key={`${draft.careerTrack}-existing`}
                  id="existingSkillIds"
                  track={draft.careerTrack}
                  title="وش المهارات اللي تعرفها حاليًا؟"
                  description="اختر المهارات اللي عندك معرفة أو تجربة سابقة فيها."
                  emptyLabel="ما عندي مهارات سابقة في هذا المجال"
                  selected={draft.existingSkillIds}
                  onChange={(ids) => update("existingSkillIds", ids)}
                  error={errors.existingSkillIds}
                />
                <SkillSelector
                  key={`${draft.careerTrack}-desired`}
                  id="desiredSkillIds"
                  track={draft.careerTrack}
                  title="وش المهارات اللي ودك تتعلمها؟"
                  description="اختر المهارات اللي تبي تطورها خلال مسارك المهني."
                  emptyLabel="ما حددت مهارات معينة للحين"
                  selected={draft.desiredSkillIds}
                  onChange={(ids) => update("desiredSkillIds", ids)}
                  error={errors.desiredSkillIds}
                />
              </div>
            )}
            {step === 3 && (
              <div className="questionnaire-fields">
                <SelectField
                  id="knowledgeLevel"
                  label="كيف تقيّم مستواك الحالي في المجال؟"
                  options={knowledgeLevelOptions}
                  value={draft.knowledgeLevel}
                  error={errors.knowledgeLevel}
                  onChange={(id) =>
                    update(
                      "knowledgeLevel",
                      knowledgeLevelOptions.find((o) => o.id === id)?.id ??
                        null,
                    )
                  }
                />
                <p className="questionnaire-hint">
                  تقييمك الشخصي يساعدنا نفهمك، وليس اختبار كفاءة.
                </p>
                <SelectField
                  id="budget"
                  label="كم ميزانيتك للشهادات؟"
                  options={budgetOptions}
                  value={draft.budget}
                  error={errors.budget}
                  onChange={(id) =>
                    update(
                      "budget",
                      budgetOptions.find((o) => o.id === id)?.id ?? null,
                    )
                  }
                />
                <p className="questionnaire-hint">
                  تفضيلك لا يحدد سعر أي اختبار. أسعار الاختبارات في السعودية غير
                  متحققة في الدليل الحالي.
                </p>
                <SelectField
                  id="weeklyStudyTime"
                  label="كم ساعة تقدر تتعلم أسبوعيًا؟"
                  options={studyTimeOptions}
                  value={draft.weeklyStudyTime}
                  error={errors.weeklyStudyTime}
                  onChange={(id) =>
                    update(
                      "weeklyStudyTime",
                      studyTimeOptions.find((o) => o.id === id)?.id ?? null,
                    )
                  }
                />
              </div>
            )}
            <div className="questionnaire-actions">
              <button className="button button-primary" type="submit">
                {step === 3 ? "إكمال الاستبيان" : "التالي"}
              </button>
              {step > 0 && (
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => {
                    setErrors({});
                    setStep(step - 1);
                  }}
                >
                  السابق
                </button>
              )}
              {step === 3 && (
                <button
                  className="questionnaire-text-button"
                  type="button"
                  onClick={() => complete(true)}
                >
                  تخطي التفضيلات وإكمال الاستبيان
                </button>
              )}
            </div>
          </form>
        </>
      )}
      <p className="questionnaire-privacy">
        بدون اسم أو بريد أو حساب. لا تُرسل إجاباتك لأي خدمة؛ تُحفظ الإجابات
        المكتملة مؤقتًا في جلسة المتصفح. لا تُحفظ على الجهاز بشكل دائم إلا إذا
        اخترت حفظ خارطتك من صفحة الخارطة، ولا تتزامن بين الأجهزة. الإجابات غير
        المكتملة لا تُحفظ عند تحديث الصفحة.
      </p>
    </section>
  );
}

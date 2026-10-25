import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  learningStore,
  useLearningProgress,
} from "../hooks/useLearningProgress";
import { activitiesFor, answerIdentity } from "../utils/progressStorage";
import { isCompleted, reconcileProgress } from "../utils/roadmapProgress";
import { CompletionControl } from "../components/roadmap/CompletionControl";
import { ProgressSummary } from "../components/roadmap/ProgressSummary";
import { SavedRoadmapNotice } from "../components/roadmap/SavedRoadmapNotice";
import type { StudentQuestionnaireAnswers } from "../types/questionnaire";
import "../styles/progress.css";
import { careerTracks } from "../data/careerTracks";
import { skills } from "../data/skills";
import { providers } from "../data/providers";
import {
  majorOptions,
  academicYearOptions,
  getOptionLabel,
} from "../data/questionnaireOptions";
import { readQuestionnaireNavigation } from "../utils/questionnaireNavigation";
import { restoreQuestionnaire } from "../utils/questionnaireStorage";
import { generatePersonalizedRoadmap } from "../utils/generateRoadmap";
import { recommendLearningResources } from "../utils/recommendLearningResources";
import { RoadmapStageCard } from "../components/roadmap/RoadmapStageCard";
import { RoadmapCertification } from "../components/roadmap/RoadmapCertification";
import "../styles/roadmap.css";

export default function RoadmapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [source] = useState(() => {
    const incoming = readQuestionnaireNavigation(location.state as unknown);
    return incoming
      ? { answers: incoming.answers, status: "navigation" }
      : learningStore().getSnapshot().active
        ? {
            answers: learningStore().getSnapshot().active!.answers,
            status: "active",
          }
        : restoreQuestionnaire(() => window.sessionStorage);
  });
  // Consume route snapshots after the child has opened the active session.
  useEffect(() => {
    if (readQuestionnaireNavigation(location.state as unknown))
      void navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);
  if (!source.answers)
    return (
      <section className="container roadmap-page roadmap-empty">
        <span className="eyebrow">خارطتك تبدأ باختياراتك</span>
        <h1>خلنا نتعرف على مسارك أولًا</h1>
        <p>
          {source.status === "invalid"
            ? "الإجابات المحفوظة غير صالحة أو قديمة. أكمل الاستبيان بإجابات جديدة عشان نبني خارطتك."
            : source.status === "unavailable"
              ? "تعذر الوصول للإجابات المؤقتة. تقدر تكمل الاستبيان وتفتح خارطتك مباشرة، حتى لو التخزين غير متاح."
              : "ما عندنا إجابات مكتملة في هذه الجلسة. جاوب على أسئلة بسيطة عن دراستك واهتماماتك عشان نرتب لك نقطة بداية واضحة."}
        </p>
        <Link className="button button-primary" to="/questionnaire">
          ابدأ اكتشاف مسارك
        </Link>
        <SavedRoadmapNotice />
      </section>
    );
  return <LearningRoadmap answers={source.answers} />;
}

function LearningRoadmap({
  answers,
}: {
  answers: StudentQuestionnaireAnswers;
}) {
  const { active, saved, notice, store } = useLearningProgress(answers);
  const roadmap = generatePersonalizedRoadmap(answers);
  const resources = recommendLearningResources(answers, roadmap);
  const activities = activitiesFor(answers);
  const data =
    active && answerIdentity(active.answers) === answerIdentity(answers)
      ? active
      : {
          version: 1 as const,
          deviceOptIn: false,
          answers,
          progress: reconcileProgress(
            active?.progress ?? null,
            answers.careerTrack,
            activities,
          ),
        };
  const controls = {
    completed: (kind: "skill" | "milestone" | "resource", id: string) =>
      isCompleted(data.progress, { kind, id }),
    toggle: (kind: "skill" | "milestone" | "resource", id: string) => {
      store.open(answers);
      store.toggle(kind, id);
    },
  };
  const track = careerTracks.find((item) => item.id === roadmap.trackId)!;
  const names = (ids: string[]) =>
    ids.map((id) => skills.find((skill) => skill.id === id)!.nameAr).join("، ");
  return (
    <section className="container roadmap-page">
      <header className="roadmap-header">
        <span className="eyebrow">خارطتك · مبنية على اختياراتك</span>
        <h1>مسارك في {track.nameAr}</h1>
        <p className="roadmap-context">
          {getOptionLabel(majorOptions, answers.major)} ·{" "}
          {getOptionLabel(academicYearOptions, answers.academicYear)}. اختيارك
          المهني مستقل عن تخصصك وسنتك.
        </p>
        <p className="roadmap-start">{roadmap.startingPointAr}</p>
        <div className="roadmap-answer-summary">
          <p>
            <strong>ذكرت معرفتك بـ:</strong>{" "}
            {roadmap.knownSkillIds.length
              ? names(roadmap.knownSkillIds)
              : "ما حددت مهارات سابقة؛ البداية من الأساس مناسبة للاستكشاف."}
          </p>
          <p>
            <strong>حاب تطور:</strong>{" "}
            {roadmap.desiredSkillIds.length
              ? names(roadmap.desiredSkillIds)
              : "ما حددت مهارات بعينها؛ استخدمنا ترتيب المجال، دون افتراض أنك اخترت كل المهارات."}
          </p>
        </div>
        <div className="roadmap-actions">
          <Link
            className="button button-secondary"
            to="/questionnaire"
            state={{ answers, editQuestionnaire: true }}
          >
            تعديل إجاباتي
          </Link>
          <Link
            className="button button-primary"
            to={`/certifications?track=${roadmap.trackId}`}
          >
            استعراض الشهادات
          </Link>
        </div>
      </header>
      <ProgressSummary
        data={data}
        activities={activities}
        roadmap={roadmap}
        saved={saved}
        notice={notice}
        store={store}
      />
      <aside className="roadmap-guidance" aria-label="إرشادات مهمة">
        <h2>قبل ما تبدأ</h2>
        <ul>
          {roadmap.guidanceNotesAr.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </aside>
      <ol className="roadmap-stages" aria-label="مراحل مسارك المهني">
        {roadmap.stages.map((stage, index) => (
          <RoadmapStageCard
            key={stage.stage}
            stage={stage}
            index={index}
            hasProviderPaths={roadmap.providerPaths.length > 0}
            resources={resources[stage.stage]}
            controls={controls}
            activities={activities}
            trackId={roadmap.trackId}
          />
        ))}
      </ol>
      {roadmap.additionalFocusSkillIds.length > 0 && (
        <section className="roadmap-extra" aria-labelledby="additional-focus">
          <span className="eyebrow">اهتماماتك لها مكان</span>
          <h2 id="additional-focus">تركيز إضافي اخترته</h2>
          <p>
            هذه مهارات رغبت فيها ولم تظهر ضمن مراحل القالب المعروض. جرّب كل
            مهارة في مهمة صغيرة مرتبطة بمشروعك، بعد فهم الأساس.{" "}
            {roadmap.providerPaths.length
              ? "المنصات بدائل للتطبيق وليست متطلبات لتعلمها كلها."
              : "ما أضفنا دورات أو مصادر غير موثقة."}
          </p>
          <ul className="roadmap-skills">
            {roadmap.additionalFocusSkillIds.map((id) => (
              <li key={id}>
                <span>{names([id])}</span>
                <small>
                  {roadmap.knownSkillIds.includes(id)
                    ? "لتعميق معرفة ذكرتها"
                    : "رغبة جديدة للتطوير"}
                </small>
                <CompletionControl
                  kind="skill"
                  activityId={id}
                  label={`أنهيت تعلم ${names([id])}`}
                  controls={controls}
                  anchor={
                    !roadmap.stages.some((stage) => stage.skillIds.includes(id))
                  }
                />
              </li>
            ))}
          </ul>
        </section>
      )}
      {roadmap.providerPaths.length > 0 && (
        <section
          className="roadmap-extra"
          id="provider-paths"
          tabIndex={-1}
          aria-labelledby="provider-paths-title"
        >
          <span className="eyebrow">اختر منصة واحدة كبداية</span>
          <h2 id="provider-paths-title">مسارات منصات بديلة</h2>
          <p>
            كل مجموعة تبقى على المنصة نفسها عبر المراحل الثلاث. لا يوجد مسار
            أفضل اختَرناه عنك؛ افتح المجموعة اللي تهمك للمقارنة. هذه خيارات
            لشهادات قد تقيس أدوارًا مختلفة، وليست سلسلة إلزامية أو شروطًا رسمية
            لبعضها.
          </p>
          {roadmap.providerPaths.map((path) => (
            <details className="roadmap-provider-path" key={path.providerId}>
              <summary>
                <bdi lang="en">
                  {
                    providers.find(
                      (provider) => provider.id === path.providerId,
                    )!.name
                  }
                </bdi>
                <span>مسار اختياري · 3 مراحل</span>
              </summary>
              {path.stageOptions.map(({ stage, option }, index) => (
                <div className="roadmap-provider-stage" key={stage}>
                  <h3>
                    {index + 1}. {roadmap.stages[index].titleAr}
                  </h3>
                  {option ? (
                    <RoadmapCertification option={option} alternative />
                  ) : (
                    <p>
                      لا يوجد خيار شهادة متاح ومناسب في هذه المرحلة؛ ركز على
                      المشروع العملي.
                    </p>
                  )}
                </div>
              ))}
            </details>
          ))}
        </section>
      )}
      <p className="roadmap-privacy">
        تُنشأ الخارطة ويُسجّل تقدمك داخل متصفحك، دون حساب أو إرسال الإجابات
        والإنجازات لأي خدمة. الحفظ مؤقت إلا إذا اخترت حفظه على الجهاز. فتح مصدر
        خارجي لا يسجل إنجازه.
      </p>
    </section>
  );
}

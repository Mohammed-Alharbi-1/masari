import { useRef, useState } from "react";
import type { SavedRoadmap } from "../../types/progress";
import type { LearningActivity } from "../../types/progress";
import { summarizeProgress } from "../../utils/roadmapProgress";
import type { PersonalizedRoadmap } from "../../types/roadmap";
import type { createProgressStore } from "../../utils/progressStore";

export function ProgressSummary({
  data,
  activities,
  roadmap,
  saved,
  notice,
  store,
}: {
  data: SavedRoadmap;
  activities: LearningActivity[];
  roadmap: PersonalizedRoadmap;
  saved: SavedRoadmap | null;
  notice: string;
  store: ReturnType<typeof createProgressStore>;
}) {
  const summary = summarizeProgress(data.progress, activities);
  const [confirm, setConfirm] = useState<"reset" | "replace" | "clear" | null>(
    null,
  );
  const returnFocus = useRef<HTMLElement | null>(null);
  const ask = (action: "reset" | "replace" | "clear") => {
    returnFocus.current = document.activeElement as HTMLElement;
    setConfirm(action);
  };
  const close = () => {
    setConfirm(null);
    requestAnimationFrame(() => returnFocus.current?.focus());
  };
  const percent = summary.total
    ? Math.round((100 * summary.completed) / summary.total)
    : 0;
  return (
    <section className="progress-panel" aria-labelledby="progress-title">
      <div className="progress-overview">
        <div className="progress-overview-copy">
          <div className="progress-heading">
            <div>
              <span className="eyebrow">خطوة بخطوة، باختيارك</span>
              <h2 id="progress-title">تقدمك في التعلم</h2>
            </div>
            <strong className="progress-count" aria-live="polite">
              <bdi dir="ltr">
                {summary.completed} / {summary.total}
              </bdi>{" "}
              نشاط مكتمل
            </strong>
          </div>
          <p>
            سجل شخصي لما أنهيته؛ لا يثبت إتقان المهارة أو الحصول على شهادة أو
            الجاهزية للعمل. معرفتك السابقة لا تُعلَّم مكتملة تلقائيًا.
          </p>
          <label className="progress-meter-label" htmlFor="activity-progress">
            نسبة إنجاز الأنشطة المحددة: {percent}٪
          </label>
          <progress
            id="activity-progress"
            value={summary.completed}
            max={summary.total || 1}
          />
        </div>
        <div className="progress-dial" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <circle className="dial-track" cx="50" cy="50" r="42" />
            <circle
              className="dial-value"
              cx="50"
              cy="50"
              r="42"
              strokeDasharray={264}
              strokeDashoffset={264 * (1 - percent / 100)}
            />
            <text x="50" y="49" textAnchor="middle">
              {percent}٪
            </text>
            <text className="dial-caption" x="50" y="63" textAnchor="middle">
              أنشطة محددة
            </text>
          </svg>
        </div>
      </div>
      <ul className="stage-progress">
        {summary.stages.map((s) => (
          <li key={s.stage}>
            <span>
              {roadmap.stages.find((stage) => stage.stage === s.stage)!.titleAr}
            </span>
            <strong dir="ltr">
              {s.completed} / {s.total}
            </strong>
          </li>
        ))}
      </ul>
      <p className="progress-count-note">
        المهارة المتكررة تُحسب مرة واحدة في أول مرحلة تظهر فيها. الاهتمامات
        الإضافية تُحسب في المرحلة الأخيرة. الشهادات الاختيارية لا تدخل في العدد.
      </p>
      {summary.next ? (
        <div className="progress-next">
          <strong>خطوتك التالية:</strong>{" "}
          <button
            onClick={() => {
              document.getElementById(summary.next!.anchorId)?.focus();
            }}
          >
            {summary.next.labelAr}
          </button>
        </div>
      ) : (
        <p className="progress-next">
          أنهيت الأنشطة المعروضة حسب تسجيلك. ارجع للممارسة والمراجعة متى احتجت.
        </p>
      )}
      <details className="progress-settings">
        <summary>
          <strong>الحفظ والخصوصية وإدارة التقدم</strong>
          <span>
            {data.deviceOptIn
              ? "محفوظ على الجهاز"
              : saved
                ? "توجد نسخة محفوظة سابقة"
                : "حفظ مؤقت للجلسة"}
          </span>
        </summary>
        <div className="progress-privacy">
          <label className="device-save">
            <input
              type="checkbox"
              checked={data.deviceOptIn}
              aria-describedby="device-save-help"
              onChange={(event) => {
                if (!event.target.checked) {
                  store.clearDevice();
                } else if (saved) ask("replace");
                else store.save(null);
              }}
            />
            حفظ مساري وتقدمي على هذا الجهاز
          </label>
          <p id="device-save-help">
            بدون حساب. الوضع الافتراضي مؤقت لهذه الجلسة. عند تفعيل الحفظ تُحفظ
            إجاباتك وخارطتك وتقدمك محليًا؛ من يستخدم ملف المتصفح نفسه قد يراها.
            لا تتزامن بين الأجهزة وقد تُحذف نهائيًا عند مسح بيانات المتصفح.
            إلغاء الخيار يوقف الحفظ التلقائي ويحاول مسح النسخة الدائمة؛ نوضح لك
            إذا تعذر المسح. يبقى تقدم هذه الجلسة مؤقتًا.
          </p>
          {saved && !data.deviceOptIn && (
            <p>
              توجد نسخة محفوظة سابقة. لن تُستبدل إلا بعد موافقتك؛ يمكنك مسحها من
              هنا.
            </p>
          )}
          <div className="progress-actions">
            <button
              className="progress-text-button"
              onClick={() => ask("reset")}
            >
              تصفير تقدم هذه الخارطة
            </button>
            <button
              className="progress-text-button"
              onClick={() => ask("clear")}
            >
              مسح بيانات التعلم المحفوظة من هذا الجهاز
            </button>
          </div>
          {confirm && (
            <div
              className="progress-confirm"
              role="group"
              aria-label="تأكيد الإجراء"
            >
              <p>
                {confirm === "reset"
                  ? "هل تريد إزالة كل علامات الإنجاز من هذه الخارطة؟ إجاباتك تبقى كما هي، وتُحدَّث نسخة الجهاز إذا كان الحفظ مفعّلًا. يمكنك الإلغاء الآن."
                  : confirm === "replace"
                    ? "نحفظ خارطة واحدة على الجهاز. هل توافق على استبدال النسخة السابقة بإجابات هذه الخارطة وتقدمها؟"
                    : "هل تريد حذف كل بيانات التعلم الدائمة لمساري من هذا الجهاز؟ يبقى تقدم الجلسة الحالية مؤقتًا."}
              </p>
              <button
                autoFocus
                className="button button-primary"
                onClick={() => {
                  if (confirm === "reset") store.reset();
                  else if (confirm === "replace") store.save(saved);
                  else store.clearDevice();
                  close();
                }}
              >
                تأكيد{" "}
                {confirm === "reset"
                  ? "التصفير"
                  : confirm === "replace"
                    ? "الاستبدال والحفظ"
                    : "المسح"}
              </button>
              <button className="button button-secondary" onClick={close}>
                إلغاء
              </button>
            </div>
          )}
        </div>
      </details>
      <p role="status" className="progress-notice">
        {notice}
      </p>
    </section>
  );
}

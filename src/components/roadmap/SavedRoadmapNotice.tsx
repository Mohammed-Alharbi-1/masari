import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLearningProgress } from "../../hooks/useLearningProgress";
import { careerTracks } from "../../data/careerTracks";

export function SavedRoadmapNotice() {
  const { saved, notice, store } = useLearningProgress();
  const [confirm, setConfirm] = useState<"resume" | "clear" | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const clearTrigger = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  return (
    <aside className="saved-roadmap container" aria-label="الخارطة المحفوظة">
      {saved && (
        <>
          <p>
            عندك خارطة محفوظة على هذا الجهاز في{" "}
            {
              careerTracks.find((t) => t.id === saved.answers.careerTrack)!
                .nameAr
            }
            .
          </p>
          {!confirm ? (
            <button
              ref={trigger}
              className="button button-secondary"
              onClick={() => setConfirm("resume")}
            >
              متابعة مساري السابق
            </button>
          ) : (
            <div
              className="progress-confirm"
              role="group"
              aria-label={
                confirm === "resume"
                  ? "تأكيد فتح الخارطة المحفوظة"
                  : "تأكيد مسح بيانات التعلم"
              }
            >
              <p>
                {confirm === "resume"
                  ? "ستُفتح النسخة المحفوظة بدل الخارطة النشطة. إجابات الاستبيان المؤقتة تبقى كما هي. يمكنك الإلغاء قبل المتابعة."
                  : "هل تريد مسح بيانات التعلم الدائمة من هذا الجهاز؟ يبقى تقدم الجلسة الحالية مؤقتًا. يمكنك الإلغاء الآن."}
              </p>
              <button
                autoFocus
                className="button button-primary"
                onClick={() => {
                  if (confirm === "resume") {
                    const answers = store.resume(saved);
                    if (answers)
                      void navigate("/roadmap", { state: { answers } });
                    else
                      requestAnimationFrame(() =>
                        (
                          trigger.current ??
                          document.getElementById("main-content")
                        )?.focus(),
                      );
                  } else {
                    store.clearDevice();
                    requestAnimationFrame(() =>
                      document.getElementById("main-content")?.focus(),
                    );
                  }
                  setConfirm(null);
                }}
              >
                {confirm === "resume" ? "فتح الخارطة المحفوظة" : "تأكيد المسح"}
              </button>
              <button
                className="button button-secondary"
                onClick={() => {
                  setConfirm(null);
                  requestAnimationFrame(() =>
                    (confirm === "clear"
                      ? clearTrigger
                      : trigger
                    ).current?.focus(),
                  );
                }}
              >
                إلغاء
              </button>
            </div>
          )}
          <button
            ref={clearTrigger}
            className="progress-text-button"
            onClick={() => setConfirm("clear")}
          >
            مسح بيانات التعلم المحفوظة من هذا الجهاز
          </button>
        </>
      )}
      {notice && <p role="status">{notice}</p>}
    </aside>
  );
}

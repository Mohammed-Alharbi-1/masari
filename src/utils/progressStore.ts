import type { ActivityKind, SavedRoadmap } from "../types/progress.ts";
import type { StudentQuestionnaireAnswers } from "../types/questionnaire.ts";
import type { StorageAccess } from "./questionnaireStorage.ts";
import { validateQuestionnaire } from "./questionnaireValidation.ts";
import {
  emptyProgress,
  reconcileProgress,
  toggleActivity,
} from "./roadmapProgress.ts";
import {
  activitiesFor,
  answerIdentity,
  readLearningData,
  removeDeviceData,
  sessionProgressKey,
  writeLearningData,
} from "./progressStorage.ts";

/** One active in-memory scope, one optional device snapshot. No browser globals. */
export function createProgressStore(
  session: StorageAccess,
  local: StorageAccess,
) {
  const restored = readLearningData(session);
  const device = readLearningData(local, true);
  let active = restored.data;
  const restoredConflict =
    active?.deviceOptIn &&
    JSON.stringify(active) !== JSON.stringify(device.data);
  if (restoredConflict && active) active = { ...active, deviceOptIn: false };
  let state = {
    active,
    saved: device.data,
    notice: restoredConflict
      ? "نسخة الجلسة تختلف عن المحفوظة على الجهاز. أبقينا تقدم هذه الجلسة مؤقتًا وأوقفنا الحفظ التلقائي؛ راجع النسخة المحفوظة أو اختر الاستبدال بنفسك."
      : [restored.status, device.status].includes("invalid")
        ? "تجاهلنا بيانات تعلم غير صالحة أو بإصدار غير مدعوم. تقدر تبدأ من جديد."
        : [restored.status, device.status].includes("unavailable")
          ? "بعض التخزين غير متاح. تقدر تتعلم هنا؛ قد لا تُستعاد البيانات بعد إغلاق الصفحة."
          : "",
  };
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());
  const persist = (next: SavedRoadmap, notice = "") => {
    let saved = state.saved;
    if (next.deviceOptIn) {
      // Protect newer progress as well as different answers. Do not union sets:
      // another tab may have intentionally undone a completion.
      const current = readLearningData(local, true);
      if (
        !current.data ||
        JSON.stringify(current.data) !== JSON.stringify(state.saved)
      ) {
        next = { ...next, deviceOptIn: false };
        saved = current.data;
        notice =
          "تغيرت النسخة المحفوظة على الجهاز. تقدمك هنا مؤقت؛ استخدم الحفظ مجددًا لمراجعة الاستبدال.";
      } else if (!writeLearningData(local, next, true)) {
        notice =
          "تعذر تحديث الحفظ على الجهاز؛ تقدمك الحالي في الذاكرة وقد تبقى نسخة أقدم. حاول مجددًا أو امسح البيانات من إعدادات المتصفح.";
      } else saved = next;
    }
    if (!writeLearningData(session, next)) {
      try {
        session().removeItem(sessionProgressKey);
      } catch {
        /* Visible warning below. */
      }
      const warning =
        "تعذر الحفظ المؤقت؛ تقدمك يعمل في الذاكرة أثناء التنقل، لكن قد يضيع عند تحديث الصفحة.";
      if (!notice.includes(warning)) notice = `${notice} ${warning}`.trim();
    }
    state = { active: next, saved, notice };
    emit();
  };
  return {
    getSnapshot: () => state,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    open(input: StudentQuestionnaireAnswers) {
      const validated = validateQuestionnaire(input);
      if (!validated.valid) return;
      const answers = validated.answers;
      if (
        state.active &&
        answerIdentity(state.active.answers) === answerIdentity(answers)
      )
        return;
      const sameTrack =
        state.active?.answers.careerTrack === answers.careerTrack;
      const progress = reconcileProgress(
        state.active?.progress ?? null,
        answers.careerTrack,
        activitiesFor(answers),
      );
      persist(
        { version: 1, deviceOptIn: false, answers, progress },
        state.active
          ? sameTrack
            ? "حدّثنا الخارطة واحتفظنا بإنجاز المهارات والمشاريع والمصادر التي ما زالت ضمنها. الحفظ على الجهاز يحتاج اختيارك مجددًا؛ النسخة السابقة تبقى حتى تستبدلها أو تمسحها."
            : "هذا مجال جديد بتقدم مستقل يبدأ من الصفر. لا ينتقل إليه إنجاز المجال السابق. أي نسخة محفوظة على الجهاز تبقى حتى تستبدلها أو تمسحها."
          : state.notice,
      );
    },
    toggle(kind: ActivityKind, id: string) {
      if (!state.active) return;
      persist(
        {
          ...state.active,
          progress: toggleActivity(
            state.active.progress,
            activitiesFor(state.active.answers),
            kind,
            id,
          ),
        },
        state.notice,
      );
    },
    reset() {
      if (state.active)
        persist(
          {
            ...state.active,
            progress: emptyProgress(state.active.answers.careerTrack),
          },
          "تم تصفير تقدم الخارطة الحالية. إجاباتك لم تتغير.",
        );
    },
    save(expectedSaved: SavedRoadmap | null) {
      if (!state.active) return false;
      const current = readLearningData(local, true);
      if (current.status === "unavailable") {
        state = {
          ...state,
          notice:
            "تعذر الوصول لتخزين الجهاز. لم نفعّل الحفظ؛ تقدمك مستمر في الذاكرة.",
        };
        emit();
        return false;
      }
      if (JSON.stringify(current.data) !== JSON.stringify(expectedSaved)) {
        state = {
          ...state,
          saved: current.data,
          notice:
            "تغيرت النسخة المحفوظة. راجع طلب الحفظ مرة أخرى قبل الاستبدال.",
        };
        emit();
        return false;
      }
      const next: SavedRoadmap = { ...state.active, deviceOptIn: true };
      if (!writeLearningData(local, next, true)) {
        state = {
          ...state,
          notice:
            "تعذر الحفظ على الجهاز. لم نفعّل الخيار؛ قد تبقى النسخة السابقة إن وجدت.",
        };
        emit();
        return false;
      }
      state = { ...state, saved: next };
      persist(next, "حُفظت خارطتك وتقدمك على هذا الجهاز باختيارك.");
      return true;
    },
    clearDevice() {
      const removed = removeDeviceData(local);
      const notice = removed
        ? "حُذفت بيانات التعلم المحفوظة دائمًا من الجهاز. تقدم الجلسة الحالية باقٍ مؤقتًا."
        : "أوقفنا الحفظ التلقائي، لكن تعذر مسح النسخة القديمة من الجهاز. قد تبقى بياناتك؛ امسح بيانات هذا الموقع من إعدادات المتصفح أو حاول مجددًا.";
      if (removed) state = { ...state, saved: null };
      if (state.active)
        persist({ ...state.active, deviceOptIn: false }, notice);
      else {
        state = { ...state, notice };
        emit();
      }
      return removed;
    },
    resume(expectedSaved: SavedRoadmap | null = state.saved) {
      const current = readLearningData(local, true);
      if (!current.data) {
        state = {
          ...state,
          saved: null,
          notice:
            "لا توجد نسخة محفوظة صالحة متاحة الآن. يمكنك استخدام الاستبيان.",
        };
        emit();
        return null;
      }
      // Confirm the snapshot the student actually reviewed, not a newer scope
      // another tab may have saved while this confirmation was open.
      if (JSON.stringify(current.data) !== JSON.stringify(expectedSaved)) {
        state = {
          ...state,
          saved: current.data,
          notice:
            "تغيرت الخارطة المحفوظة منذ فتح التأكيد. راجع المجال الظاهر ثم اختر المتابعة مجددًا؛ خارطتك الحالية لم تتغير.",
        };
        emit();
        return null;
      }
      persist(
        current.data,
        "فتحت الخارطة المحفوظة. إجابات الاستبيان المؤقتة لم تتغير.",
      );
      return current.data.answers;
    },
  };
}

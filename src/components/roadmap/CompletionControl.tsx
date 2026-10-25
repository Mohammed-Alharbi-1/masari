import type { ActivityKind } from "../../types/progress";
import { activityAnchor } from "../../utils/roadmapProgress";

export interface ProgressControls {
  completed: (kind: ActivityKind, id: string) => boolean;
  toggle: (kind: ActivityKind, id: string) => void;
}
export function CompletionControl({
  kind,
  activityId,
  label,
  controls,
  anchor = true,
}: {
  kind: ActivityKind;
  activityId: string;
  label: string;
  controls: ProgressControls;
  anchor?: boolean;
}) {
  const checked = controls.completed(kind, activityId);
  return (
    <label className={`completion-control${checked ? " is-completed" : ""}`}>
      <input
        id={anchor ? activityAnchor(kind, activityId) : undefined}
        type="checkbox"
        checked={checked}
        onChange={() => controls.toggle(kind, activityId)}
      />
      <span>
        {label}
        <small>
          {checked
            ? "أنهيت التعلم · اضغط للتراجع"
            : "لم أبدأ · حدّد عند الإنهاء"}
        </small>
      </span>
    </label>
  );
}

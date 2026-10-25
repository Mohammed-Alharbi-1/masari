import { useEffect, useSyncExternalStore } from "react";
import { createProgressStore } from "../utils/progressStore";
import { answerIdentity } from "../utils/progressStorage";
import type { StudentQuestionnaireAnswers } from "../types/questionnaire";

// Lazily initialized, shared across route mounts; no data leaves this browser.
let store: ReturnType<typeof createProgressStore> | undefined;
export function learningStore() {
  return (store ??= createProgressStore(
    () => window.sessionStorage,
    () => window.localStorage,
  ));
}
export function useLearningProgress(answers?: StudentQuestionnaireAnswers) {
  const instance = learningStore();
  const snapshot = useSyncExternalStore(
    instance.subscribe,
    instance.getSnapshot,
  );
  const identity = answers ? answerIdentity(answers) : null;
  useEffect(() => {
    if (identity)
      instance.open(JSON.parse(identity) as StudentQuestionnaireAnswers);
  }, [identity, instance]);
  return { ...snapshot, store: instance };
}

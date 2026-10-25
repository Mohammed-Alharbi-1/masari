import { validateQuestionnaire } from "./questionnaireValidation.ts";

/** Router state is untrusted, just like session JSON. Never accept an unchecked cast. */
export function readQuestionnaireNavigation(state: unknown) {
  if (!state || typeof state !== "object" || !("answers" in state)) return null;
  const result = validateQuestionnaire(state.answers);
  return result.valid
    ? {
        answers: result.answers,
        edit: "editQuestionnaire" in state && state.editQuestionnaire === true,
      }
    : null;
}

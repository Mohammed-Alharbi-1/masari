import { validateQuestionnaire } from "./questionnaireValidation.ts";
import type { StudentQuestionnaireAnswers } from "../types/questionnaire.ts";

export const questionnaireStorageKey = "masari_questionnaire_v1";
export interface QuestionnaireStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
export type StorageAccess = () => QuestionnaireStorage;
export type RestoreResult =
  | { status: "restored"; answers: StudentQuestionnaireAnswers }
  | { status: "empty" | "invalid" | "unavailable"; answers: null };

export function restoreQuestionnaire(access: StorageAccess): RestoreResult {
  let raw: string | null;
  try {
    raw = access().getItem(questionnaireStorageKey);
  } catch {
    return { status: "unavailable", answers: null };
  }
  if (raw === null) return { status: "empty", answers: null };
  try {
    const result = validateQuestionnaire(JSON.parse(raw));
    return result.valid
      ? { status: "restored", answers: result.answers }
      : { status: "invalid", answers: null };
  } catch {
    return { status: "invalid", answers: null };
  }
}

export function saveQuestionnaire(
  access: StorageAccess,
  value: unknown,
): "saved" | "invalid" | "unavailable" {
  const result = validateQuestionnaire(value);
  if (!result.valid) return "invalid";
  try {
    access().setItem(questionnaireStorageKey, JSON.stringify(result.answers));
    return "saved";
  } catch {
    // Avoid restoring a stale previous submission if a replacement cannot be saved.
    try {
      access().removeItem(questionnaireStorageKey);
    } catch {
      /* UI explains persistence is unavailable. */
    }
    return "unavailable";
  }
}

export function clearQuestionnaire(
  access: StorageAccess,
): "cleared" | "unavailable" {
  try {
    access().removeItem(questionnaireStorageKey);
    return "cleared";
  } catch {
    return "unavailable";
  }
}

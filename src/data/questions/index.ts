import type { ModuleId, Question } from "@/lib/types";
import { AEROSPACE_QUESTIONS } from "./aerospace";
import { CODING_QUESTIONS } from "./coding";
import { APTITUDE_QUESTIONS } from "./aptitude";
import { INTERVIEW_QUESTIONS } from "./interview";

/** All built-in questions across modules. */
export const ALL_QUESTIONS: Question[] = [
  ...AEROSPACE_QUESTIONS,
  ...CODING_QUESTIONS,
  ...APTITUDE_QUESTIONS,
  ...INTERVIEW_QUESTIONS,
];

/**
 * Build an id -> question map, layering user-created (admin) questions on
 * top of the built-in banks. Custom questions with clashing ids win.
 */
export function buildQuestionMap(custom: Question[] = []): Map<string, Question> {
  const map = new Map<string, Question>();
  for (const q of ALL_QUESTIONS) map.set(q.id, q);
  for (const q of custom) map.set(q.id, q);
  return map;
}

export function getQuestionsByIds(ids: string[], custom: Question[] = []): Question[] {
  const map = buildQuestionMap(custom);
  return ids.map((id) => map.get(id)).filter((q): q is Question => Boolean(q));
}

export function questionsForModule(module: ModuleId, custom: Question[] = []): Question[] {
  return [...ALL_QUESTIONS, ...custom].filter((q) => q.module === module);
}

/** Distinct topic list per module (built-ins + custom). */
export function topicsForModule(module: ModuleId, custom: Question[] = []): string[] {
  return [...new Set(questionsForModule(module, custom).map((q) => q.topic))];
}

export const MODULE_LABELS: Record<ModuleId, string> = {
  aerospace: "Core Aerospace",
  coding: "Coding",
  aptitude: "Aptitude",
  interview: "Interview Prep",
};

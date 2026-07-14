import type {
  Attempt,
  AttemptAnswer,
  Question,
  TopicStat,
} from "./types";
import { XP_PER_DIFFICULTY, XP_TEST_BONUS } from "./gamification";
import { pct, uid } from "./utils";

export type Verdict = "correct" | "incorrect" | "unattempted";

/** Grade a single question against the recorded answer. */
export function evaluate(q: Question, ans: AttemptAnswer | undefined): Verdict {
  if (!ans) return "unattempted";
  if (q.type === "nat") {
    if (ans.natValue === null || ans.natValue === undefined || Number.isNaN(ans.natValue))
      return "unattempted";
    const tol = q.answer?.tolerance ?? 0.01 * Math.abs(q.answer?.value ?? 0);
    return Math.abs(ans.natValue - (q.answer?.value ?? NaN)) <= Math.max(tol, 1e-9)
      ? "correct"
      : "incorrect";
  }
  const sel = ans.selected ?? [];
  if (sel.length === 0) return "unattempted";
  const correct = q.correct ?? [];
  const same =
    sel.length === correct.length && [...sel].sort().every((v, i) => v === [...correct].sort()[i]);
  return same ? "correct" : "incorrect";
}

export interface ScoreInput {
  testId: string;
  testTitle: string;
  module: Attempt["module"];
  questions: Question[];
  answers: Record<string, AttemptAnswer>;
  startedAt: number;
  allottedSec: number;
  timeTakenSec: number;
}

/** Score a submitted test and produce a complete Attempt record. */
export function scoreAttempt(input: ScoreInput): Attempt {
  const { questions, answers } = input;
  let score = 0;
  let maxScore = 0;
  let correct = 0;
  let incorrect = 0;
  let unattempted = 0;
  let xp = 0;

  const topicMap = new Map<string, TopicStat>();

  for (const q of questions) {
    maxScore += q.marks;
    const stat =
      topicMap.get(q.topic) ?? { topic: q.topic, correct: 0, attempted: 0, total: 0 };
    stat.total += 1;

    const verdict = evaluate(q, answers[q.id]);
    if (verdict === "correct") {
      score += q.marks;
      correct += 1;
      stat.correct += 1;
      stat.attempted += 1;
      xp += XP_PER_DIFFICULTY[q.difficulty];
    } else if (verdict === "incorrect") {
      score -= q.negative ?? 0;
      incorrect += 1;
      stat.attempted += 1;
    } else {
      unattempted += 1;
    }
    topicMap.set(q.topic, stat);
  }

  xp += XP_TEST_BONUS;
  const attemptedCount = correct + incorrect;

  return {
    id: uid("att-"),
    testId: input.testId,
    testTitle: input.testTitle,
    module: input.module,
    startedAt: input.startedAt,
    submittedAt: Date.now(),
    allottedSec: input.allottedSec,
    timeTakenSec: input.timeTakenSec,
    questionIds: questions.map((q) => q.id),
    answers,
    score: Math.round(score * 100) / 100,
    maxScore,
    correct,
    incorrect,
    unattempted,
    accuracy: pct(correct, attemptedCount),
    topicStats: [...topicMap.values()],
    xpEarned: xp,
  };
}

/** Aggregate per-topic accuracy across many attempts. */
export function topicMastery(attempts: Attempt[]): TopicStat[] {
  const map = new Map<string, TopicStat>();
  for (const a of attempts) {
    for (const t of a.topicStats) {
      const cur = map.get(t.topic) ?? { topic: t.topic, correct: 0, attempted: 0, total: 0 };
      cur.correct += t.correct;
      cur.attempted += t.attempted;
      cur.total += t.total;
      map.set(t.topic, cur);
    }
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
}

/** Topics attempted at least twice with < 60% accuracy, weakest first. */
export function weakTopics(attempts: Attempt[]): TopicStat[] {
  return topicMastery(attempts)
    .filter((t) => t.attempted >= 2 && pct(t.correct, t.attempted) < 60)
    .sort((a, b) => pct(a.correct, a.attempted) - pct(b.correct, b.attempted));
}

/**
 * Practice-readiness score, 0-100. A blend of coverage (how much you have
 * practiced), accuracy, and consistency. Based only on completed practice —
 * it does not predict actual placement outcomes.
 */
export function readinessScore(attempts: Attempt[], activeDays: number): number {
  if (attempts.length === 0) return 0;
  const totalQ = attempts.reduce((s, a) => s + a.correct + a.incorrect + a.unattempted, 0);
  const totalCorrect = attempts.reduce((s, a) => s + a.correct, 0);
  const totalAttempted = attempts.reduce((s, a) => s + a.correct + a.incorrect, 0);
  const coverage = Math.min(1, totalQ / 300);
  const accuracy = totalAttempted === 0 ? 0 : totalCorrect / totalAttempted;
  const consistency = Math.min(1, activeDays / 30);
  return Math.round((coverage * 35 + accuracy * 45 + consistency * 20));
}

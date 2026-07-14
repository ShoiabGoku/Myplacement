/** Core domain types shared across the app. */

export type ModuleId = "aerospace" | "coding" | "aptitude" | "interview";

export type Difficulty = "easy" | "medium" | "hard" | "gate" | "interview";

export type QuestionType = "mcq" | "multiselect" | "nat";

export interface Solution {
  /** Step-by-step working, one step per entry. */
  steps: string[];
  /** The core concept being tested. */
  concept: string;
  formula?: string;
  altMethod?: string;
  commonMistakes?: string[];
  memoryTrick?: string;
  /** Pointer to a similar previous-year / classic question. */
  related?: string;
}

export interface Question {
  id: string;
  module: ModuleId;
  topic: string;
  subtopic?: string;
  type: QuestionType;
  difficulty: Difficulty;
  companies?: string[];
  tags?: string[];
  text: string;
  /** Present for mcq / multiselect. */
  options?: string[];
  /** Correct option indices (single entry for mcq). */
  correct?: number[];
  /** Present for nat: accepted value with +/- tolerance. */
  answer?: { value: number; tolerance?: number };
  marks: number;
  /** Marks deducted when wrong (0 if none). */
  negative?: number;
  estTimeSec: number;
  hints?: string[];
  source?: string;
  solution: Solution;
}

export interface TestDef {
  id: string;
  module: ModuleId;
  title: string;
  description: string;
  difficulty: Difficulty | "mixed";
  durationMin: number;
  questionIds: string[];
  topics: string[];
  companies?: string[];
}

/** Palette state of one question inside a running test. */
export type QState = "unseen" | "seen" | "answered" | "marked" | "answered-marked";

export interface AttemptAnswer {
  questionId: string;
  selected?: number[];
  natValue?: number | null;
  timeSec: number;
  state: QState;
}

export interface TopicStat {
  topic: string;
  correct: number;
  attempted: number;
  total: number;
}

export interface Attempt {
  id: string;
  testId: string;
  testTitle: string;
  module: ModuleId;
  startedAt: number;
  submittedAt: number;
  allottedSec: number;
  timeTakenSec: number;
  questionIds: string[];
  answers: Record<string, AttemptAnswer>;
  score: number;
  maxScore: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  /** correct / attempted, 0-100. */
  accuracy: number;
  topicStats: TopicStat[];
  xpEarned: number;
}

/** Saved state of a test in progress, enabling Quick Resume. */
export interface RunningTest {
  testId: string;
  title: string;
  module: ModuleId;
  questionIds: string[];
  durationMin: number;
  startedAt: number;
  /** Seconds remaining when last saved. */
  remainingSec: number;
  currentIndex: number;
  answers: Record<string, AttemptAnswer>;
}

/** Per-day activity used for streaks, heatmap and daily goals. */
export interface DayActivity {
  questions: number;
  correct: number;
  xp: number;
  minutes: number;
}

export interface InterviewQA {
  id: string;
  category: "technical" | "behavioral" | "hr" | "research" | "project" | "resume";
  question: string;
  answer: string;
  tips?: string;
}

export interface FormulaSection {
  topic: string;
  module: ModuleId;
  items: { name: string; formula: string; note?: string }[];
}

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** XP awarded when unlocked. */
  xp: number;
}

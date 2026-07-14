import type { AchievementDef, Attempt, ModuleId } from "@/lib/types";

/** Snapshot of progress used to evaluate achievement conditions. */
export interface ProgressSnapshot {
  xp: number;
  attempts: Attempt[];
  streak: number;
}

type CheckedAchievement = AchievementDef & { check: (s: ProgressSnapshot) => boolean };

const totalCorrect = (s: ProgressSnapshot) => s.attempts.reduce((n, a) => n + a.correct, 0);
const modulesTouched = (s: ProgressSnapshot) => new Set<ModuleId>(s.attempts.map((a) => a.module)).size;

export const ACHIEVEMENTS: CheckedAchievement[] = [
  {
    id: "first-flight",
    name: "First Flight",
    description: "Complete your first test.",
    icon: "🛫",
    xp: 50,
    check: (s) => s.attempts.length >= 1,
  },
  {
    id: "sharpshooter",
    name: "Sharpshooter",
    description: "Score 100% accuracy in a test with 5+ questions attempted.",
    icon: "🎯",
    xp: 100,
    check: (s) =>
      s.attempts.some((a) => a.accuracy === 100 && a.correct >= 5),
  },
  {
    id: "streak-3",
    name: "Ignition",
    description: "Practice 3 days in a row.",
    icon: "🔥",
    xp: 50,
    check: (s) => s.streak >= 3,
  },
  {
    id: "streak-7",
    name: "Full Burn",
    description: "Practice 7 days in a row.",
    icon: "🚀",
    xp: 150,
    check: (s) => s.streak >= 7,
  },
  {
    id: "streak-30",
    name: "Orbital Velocity",
    description: "Practice 30 days in a row.",
    icon: "🛰️",
    xp: 500,
    check: (s) => s.streak >= 30,
  },
  {
    id: "centurion",
    name: "Centurion",
    description: "Answer 100 questions correctly overall.",
    icon: "💯",
    xp: 200,
    check: (s) => totalCorrect(s) >= 100,
  },
  {
    id: "all-rounder",
    name: "All-Rounder",
    description: "Complete a test in all four modules.",
    icon: "🧭",
    xp: 150,
    check: (s) => modulesTouched(s) >= 4,
  },
  {
    id: "marathon",
    name: "Marathoner",
    description: "Finish a test with 15 or more questions.",
    icon: "🏃",
    xp: 100,
    check: (s) => s.attempts.some((a) => a.questionIds.length >= 15),
  },
  {
    id: "xp-1000",
    name: "Kilowatt",
    description: "Reach 1,000 XP.",
    icon: "⚡",
    xp: 100,
    check: (s) => s.xp >= 1000,
  },
  {
    id: "xp-5000",
    name: "Megawatt",
    description: "Reach 5,000 XP.",
    icon: "🌟",
    xp: 300,
    check: (s) => s.xp >= 5000,
  },
];

/** Ids of achievements newly earned given the snapshot and already-unlocked set. */
export function newlyUnlocked(
  s: ProgressSnapshot,
  unlocked: Record<string, number>
): CheckedAchievement[] {
  return ACHIEVEMENTS.filter((a) => !unlocked[a.id] && a.check(s));
}

import type { Difficulty } from "./types";

/** XP earned for one correctly answered question. */
export const XP_PER_DIFFICULTY: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
  gate: 35,
  interview: 40,
};

/** Bonus XP for finishing any test. */
export const XP_TEST_BONUS = 25;

/**
 * Levels follow a quadratic curve: total XP needed to *reach* level L is
 * 100 * (L-1)^2, so early levels come fast and later ones take real work.
 */
export function levelFromXp(xp: number): number {
  return Math.floor(Math.sqrt(Math.max(0, xp) / 100)) + 1;
}

export function xpForLevel(level: number): number {
  return 100 * (level - 1) ** 2;
}

export function levelProgress(xp: number): {
  level: number;
  intoLevel: number;
  needed: number;
  pct: number;
} {
  const level = levelFromXp(xp);
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const intoLevel = xp - base;
  const needed = next - base;
  return { level, intoLevel, needed, pct: Math.round((intoLevel / needed) * 100) };
}

export const LEVEL_TITLES = [
  "Cadet",
  "Trainee",
  "Engineer",
  "Senior Engineer",
  "Specialist",
  "Lead",
  "Principal",
  "Chief Engineer",
  "Mission Director",
  "Legend",
];

export function levelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
}

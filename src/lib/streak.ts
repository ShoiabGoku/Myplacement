import type { DayActivity } from "./types";
import { dateKey, daysAgoKey } from "./utils";

/**
 * Current streak = consecutive days with activity ending today (or yesterday,
 * so the streak isn't "broken" before the user has practiced today).
 */
export function currentStreak(activity: Record<string, DayActivity>): number {
  const active = (k: string) => (activity[k]?.questions ?? 0) > 0 || (activity[k]?.minutes ?? 0) > 0;
  let start = 0;
  if (!active(dateKey())) {
    if (!active(daysAgoKey(1))) return 0;
    start = 1;
  }
  let streak = 0;
  for (let i = start; i < 3650; i++) {
    if (active(daysAgoKey(i))) streak++;
    else break;
  }
  return streak;
}

export function bestStreak(activity: Record<string, DayActivity>): number {
  const keys = Object.keys(activity)
    .filter((k) => (activity[k]?.questions ?? 0) > 0 || (activity[k]?.minutes ?? 0) > 0)
    .sort();
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const k of keys) {
    const d = new Date(k + "T00:00:00");
    if (prev && d.getTime() - prev.getTime() === 86400000) run += 1;
    else run = 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

export function activeDayCount(activity: Record<string, DayActivity>): number {
  return Object.values(activity).filter((a) => a.questions > 0 || a.minutes > 0).length;
}

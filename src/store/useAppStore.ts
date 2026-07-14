import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Attempt,
  DayActivity,
  Question,
  RunningTest,
} from "@/lib/types";
import { dateKey } from "@/lib/utils";

interface AppState {
  hydrated: boolean;
  userName: string;
  xp: number;
  /** Daily goal in questions. */
  dailyGoal: number;
  /** Per-day activity, keyed by YYYY-MM-DD. */
  activity: Record<string, DayActivity>;
  attempts: Attempt[];
  customQuestions: Question[];
  bookmarks: string[];
  /** Achievement id -> unlock timestamp. */
  unlocked: Record<string, number>;
  running: RunningTest | null;

  setHydrated: () => void;
  setUserName: (name: string) => void;
  setDailyGoal: (n: number) => void;
  saveRunning: (rt: RunningTest | null) => void;
  submitAttempt: (attempt: Attempt) => void;
  addStudyMinutes: (minutes: number) => void;
  unlockAchievement: (id: string, xpBonus: number) => void;
  toggleBookmark: (questionId: string) => void;
  addCustomQuestion: (q: Question) => void;
  updateCustomQuestion: (q: Question) => void;
  deleteCustomQuestion: (id: string) => void;
  importCustomQuestions: (qs: Question[]) => number;
  resetAllProgress: () => void;
}

function emptyDay(): DayActivity {
  return { questions: 0, correct: 0, xp: 0, minutes: 0 };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      userName: "Shoiab",
      xp: 0,
      dailyGoal: 20,
      activity: {},
      attempts: [],
      customQuestions: [],
      bookmarks: [],
      unlocked: {},
      running: null,

      setHydrated: () => set({ hydrated: true }),
      setUserName: (userName) => set({ userName }),
      setDailyGoal: (dailyGoal) => set({ dailyGoal: Math.max(1, dailyGoal) }),
      saveRunning: (running) => set({ running }),

      submitAttempt: (attempt) => {
        const key = dateKey();
        const day = { ...(get().activity[key] ?? emptyDay()) };
        day.questions += attempt.correct + attempt.incorrect + attempt.unattempted;
        day.correct += attempt.correct;
        day.xp += attempt.xpEarned;
        day.minutes += Math.round(attempt.timeTakenSec / 60);
        set({
          attempts: [attempt, ...get().attempts].slice(0, 200),
          xp: get().xp + attempt.xpEarned,
          activity: { ...get().activity, [key]: day },
          running: null,
        });
      },

      addStudyMinutes: (minutes) => {
        const key = dateKey();
        const day = { ...(get().activity[key] ?? emptyDay()) };
        day.minutes += minutes;
        set({ activity: { ...get().activity, [key]: day } });
      },

      unlockAchievement: (id, xpBonus) => {
        if (get().unlocked[id]) return;
        set({
          unlocked: { ...get().unlocked, [id]: Date.now() },
          xp: get().xp + xpBonus,
        });
      },

      toggleBookmark: (questionId) => {
        const b = get().bookmarks;
        set({
          bookmarks: b.includes(questionId)
            ? b.filter((x) => x !== questionId)
            : [...b, questionId],
        });
      },

      addCustomQuestion: (q) => set({ customQuestions: [q, ...get().customQuestions] }),
      updateCustomQuestion: (q) =>
        set({
          customQuestions: get().customQuestions.map((c) => (c.id === q.id ? q : c)),
        }),
      deleteCustomQuestion: (id) =>
        set({ customQuestions: get().customQuestions.filter((c) => c.id !== id) }),

      importCustomQuestions: (qs) => {
        const existing = new Set(get().customQuestions.map((q) => q.id));
        const fresh = qs.filter((q) => !existing.has(q.id));
        set({ customQuestions: [...fresh, ...get().customQuestions] });
        return fresh.length;
      },

      resetAllProgress: () =>
        set({
          xp: 0,
          activity: {},
          attempts: [],
          bookmarks: [],
          unlocked: {},
          running: null,
        }),
    }),
    {
      name: "myplacement-store",
      // With synchronous localStorage this callback can fire during create(),
      // before the exported const exists — so flip the flag via the rehydrated
      // state's own action instead of referencing the store variable.
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
      // Exclude the transient hydration flag from persistence.
      partialize: (s) => {
        const { hydrated: _hydrated, ...rest } = s;
        return rest as AppState;
      },
    }
  )
);

/** Gate client-only UI on store hydration to avoid SSR/localStorage mismatch. */
export function useHydrated(): boolean {
  return useAppStore((s) => s.hydrated);
}

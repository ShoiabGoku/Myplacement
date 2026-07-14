"use client";

import { useEffect, useState } from "react";
import { Flame, Moon, Sun, Zap } from "lucide-react";
import { useAppStore, useHydrated } from "@/store/useAppStore";
import { levelProgress, levelTitle } from "@/lib/gamification";
import { currentStreak } from "@/lib/streak";
import { ProgressBar } from "@/components/ui/progress";

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("mp-theme", next ? "dark" : "light");
  };
  return { dark, toggle };
}

export function Topbar() {
  const { dark, toggle } = useTheme();
  const hydrated = useHydrated();
  const xp = useAppStore((s) => s.xp);
  const activity = useAppStore((s) => s.activity);

  const lp = levelProgress(xp);
  const streak = hydrated ? currentStreak(activity) : 0;

  return (
    <header className="sticky top-0 z-30 mb-6 flex items-center justify-end gap-3 py-3 md:gap-4">
      {hydrated && (
        <>
          <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold">
            <Flame size={16} className={streak > 0 ? "text-warning" : "text-muted"} />
            <span>{streak}</span>
            <span className="hidden text-xs font-normal text-muted sm:inline">day streak</span>
          </div>
          <div className="glass hidden items-center gap-3 rounded-full px-4 py-1.5 sm:flex">
            <Zap size={16} className="text-accent" />
            <div className="w-28">
              <div className="flex justify-between text-[10px] text-muted">
                <span>
                  Lv {lp.level} · {levelTitle(lp.level)}
                </span>
                <span>{xp} XP</span>
              </div>
              <ProgressBar value={lp.pct} className="h-1.5" />
            </div>
          </div>
        </>
      )}
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="glass glass-hover flex h-9 w-9 items-center justify-center rounded-full"
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
}

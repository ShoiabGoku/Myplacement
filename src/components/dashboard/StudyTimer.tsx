"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, TimerReset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fmtClock } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const FOCUS_MIN = 25;

/**
 * Pomodoro-style focus timer. Completed focus minutes are logged into the
 * daily activity record (feeds streaks and the heatmap).
 */
export function StudyTimer() {
  const [remaining, setRemaining] = useState(FOCUS_MIN * 60);
  const [runningTimer, setRunningTimer] = useState(false);
  const addStudyMinutes = useAppStore((s) => s.addStudyMinutes);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (!runningTimer) return;
    const t = setInterval(() => {
      elapsedRef.current += 1;
      setRemaining((r) => {
        if (r <= 1) {
          setRunningTimer(false);
          addStudyMinutes(Math.round(elapsedRef.current / 60));
          elapsedRef.current = 0;
          return FOCUS_MIN * 60;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [runningTimer, addStudyMinutes]);

  const pause = () => {
    setRunningTimer(false);
    // Bank whole minutes studied so far.
    const mins = Math.floor(elapsedRef.current / 60);
    if (mins > 0) {
      addStudyMinutes(mins);
      elapsedRef.current = elapsedRef.current % 60;
    }
  };

  const reset = () => {
    pause();
    elapsedRef.current = 0;
    setRemaining(FOCUS_MIN * 60);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="font-mono text-4xl font-bold tabular-nums">{fmtClock(remaining)}</div>
      <div className="flex gap-2">
        {runningTimer ? (
          <Button size="sm" variant="outline" onClick={pause}>
            <Pause size={14} /> Pause
          </Button>
        ) : (
          <Button size="sm" onClick={() => setRunningTimer(true)}>
            <Play size={14} /> Focus
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={reset} aria-label="Reset timer">
          {remaining === FOCUS_MIN * 60 ? <TimerReset size={14} /> : <RotateCcw size={14} />}
        </Button>
      </div>
      <p className="text-center text-xs text-muted">25-min focus sprints count towards your streak.</p>
    </div>
  );
}

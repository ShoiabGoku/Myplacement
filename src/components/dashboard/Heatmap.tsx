"use client";

import { useMemo } from "react";
import type { DayActivity } from "@/lib/types";
import { daysAgoKey } from "@/lib/utils";

const WEEKS = 17;

/** GitHub-style activity heatmap for the last ~17 weeks. */
export function Heatmap({ activity }: { activity: Record<string, DayActivity> }) {
  const cells = useMemo(() => {
    // Build columns of 7 days, oldest first, ending today.
    const total = WEEKS * 7;
    const today = new Date();
    const offset = 6 - today.getDay(); // pad so today lands in the last column
    return Array.from({ length: total }, (_, i) => {
      const back = total - 1 - i - offset;
      if (back < 0) return null;
      const key = daysAgoKey(back);
      const day = activity[key];
      const n = (day?.questions ?? 0) + (day?.minutes ? 1 : 0);
      return { key, n };
    });
  }, [activity]);

  const shade = (n: number) => {
    if (n === 0) return "bg-primary-soft/60";
    if (n < 5) return "bg-primary/30";
    if (n < 15) return "bg-primary/55";
    if (n < 30) return "bg-primary/80";
    return "bg-primary";
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid w-max grid-flow-col grid-rows-7 gap-1">
        {cells.map((c, i) =>
          c === null ? (
            <div key={`pad-${i}`} className="h-3 w-3" />
          ) : (
            <div
              key={c.key}
              title={`${c.key}: ${c.n} question${c.n === 1 ? "" : "s"}`}
              className={`h-3 w-3 rounded-[3px] ${shade(c.n)}`}
            />
          )
        )}
      </div>
      <div className="mt-2 flex items-center gap-1 text-[10px] text-muted">
        <span>Less</span>
        {[0, 3, 10, 20, 35].map((n) => (
          <div key={n} className={`h-3 w-3 rounded-[3px] ${shade(n)}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

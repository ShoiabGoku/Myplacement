"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar, StatRing } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAppStore, useHydrated } from "@/store/useAppStore";
import { readinessScore, topicMastery } from "@/lib/engine";
import { activeDayCount } from "@/lib/streak";
import { MODULE_LABELS } from "@/data/questions";
import type { ModuleId } from "@/lib/types";
import { daysAgoKey, pct } from "@/lib/utils";

const AXIS_STYLE = { fontSize: 11, fill: "var(--muted)" };
const TOOLTIP_STYLE = {
  backgroundColor: "var(--background)",
  border: "1px solid var(--card-border)",
  borderRadius: "12px",
  fontSize: "12px",
};

export default function AnalyticsPage() {
  const hydrated = useHydrated();
  const attempts = useAppStore((s) => s.attempts);
  const activity = useAppStore((s) => s.activity);

  // Chronological (oldest first) for trend charts.
  const chrono = useMemo(() => [...attempts].reverse(), [attempts]);

  const scoreTrend = chrono.map((a, i) => ({
    name: `#${i + 1}`,
    score: pct(Math.max(0, a.score), a.maxScore),
    accuracy: a.accuracy,
  }));

  const speedTrend = chrono.map((a, i) => ({
    name: `#${i + 1}`,
    sec: Math.round(a.timeTakenSec / Math.max(1, a.questionIds.length)),
  }));

  const daily = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const key = daysAgoKey(13 - i);
        return {
          name: key.slice(5),
          questions: activity[key]?.questions ?? 0,
          xp: activity[key]?.xp ?? 0,
        };
      }),
    [activity]
  );

  const mastery = useMemo(() => topicMastery(attempts).slice(0, 12), [attempts]);

  const perModule = useMemo(() => {
    const mods: ModuleId[] = ["aerospace", "coding", "aptitude", "interview"];
    return mods.map((m) => {
      const list = attempts.filter((a) => a.module === m);
      const correct = list.reduce((s, a) => s + a.correct, 0);
      const attempted = list.reduce((s, a) => s + a.correct + a.incorrect, 0);
      return {
        module: m,
        tests: list.length,
        accuracy: attempted > 0 ? pct(correct, attempted) : 0,
        attempted,
      };
    });
  }, [attempts]);

  const readiness = hydrated ? readinessScore(attempts, activeDayCount(activity)) : 0;

  if (!hydrated) return <div className="p-10 text-center text-muted">Loading…</div>;

  if (attempts.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="text-lg font-semibold">No data yet</p>
        <p className="mt-2 text-sm text-muted">
          Analytics unlock after your first test. Every attempt feeds these charts — score
          trends, topic mastery, speed and module-wise readiness.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl pb-10">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Performance Analytics</h1>
      <p className="mt-1 text-sm text-muted">
        {attempts.length} attempts analyzed · readiness is based on completed practice, not a
        placement prediction.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Readiness + modules */}
        <Card className="flex flex-col items-center justify-center">
          <StatRing value={readiness} label={`${readiness}`} sublabel="Readiness" size={140} />
          <div className="mt-4 w-full space-y-2">
            {perModule.map((m) => (
              <div key={m.module}>
                <div className="flex justify-between text-xs">
                  <span>{MODULE_LABELS[m.module]}</span>
                  <span className="text-muted">
                    {m.tests > 0 ? `${m.accuracy}% · ${m.tests} tests` : "not started"}
                  </span>
                </div>
                <ProgressBar value={m.accuracy} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </Card>

        {/* Score trend */}
        <Card className="lg:col-span-2">
          <CardTitle>Score & Accuracy Trend</CardTitle>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                <XAxis dataKey="name" tick={AXIS_STYLE} />
                <YAxis domain={[0, 100]} tick={AXIS_STYLE} width={30} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  name="Score %"
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  strokeDasharray="5 3"
                  dot={false}
                  name="Accuracy %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Daily questions */}
        <Card className="lg:col-span-2">
          <CardTitle>Last 14 Days — Questions Solved</CardTitle>
          <div className="mt-3 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                <XAxis dataKey="name" tick={AXIS_STYLE} />
                <YAxis allowDecimals={false} tick={AXIS_STYLE} width={30} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="questions" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Speed */}
        <Card>
          <CardTitle>Speed — Avg Seconds per Question</CardTitle>
          <div className="mt-3 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speedTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                <XAxis dataKey="name" tick={AXIS_STYLE} />
                <YAxis tick={AXIS_STYLE} width={30} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="sec"
                  stroke="var(--warning)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  name="s/question"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 text-xs text-muted">Lower is better — watch it fall as you drill.</p>
        </Card>

        {/* Topic mastery */}
        <Card className="lg:col-span-3">
          <CardTitle>Topic Mastery</CardTitle>
          <div className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {mastery.map((t) => {
              const acc = t.attempted > 0 ? pct(t.correct, t.attempted) : 0;
              return (
                <div key={t.topic}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t.topic}</span>
                    <span className="flex items-center gap-2 text-xs text-muted">
                      {t.correct}/{t.attempted}
                      {acc >= 80 && <Badge tone="success">strong</Badge>}
                      {acc < 60 && t.attempted >= 2 && <Badge tone="danger">weak</Badge>}
                    </span>
                  </div>
                  <ProgressBar
                    value={acc}
                    className="mt-1"
                    barClassName={acc < 60 ? "from-danger to-warning" : undefined}
                  />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

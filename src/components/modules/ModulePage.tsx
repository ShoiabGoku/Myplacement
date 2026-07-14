"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play, Shuffle } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { useAppStore, useHydrated } from "@/store/useAppStore";
import { testsByModule } from "@/data/tests";
import { questionsForModule, topicsForModule, MODULE_LABELS } from "@/data/questions";
import type { ModuleId, RunningTest } from "@/lib/types";
import { pct } from "@/lib/utils";

/** Shared hub page for each practice module: stats, quick practice, test list. */
export function ModulePage({
  module,
  tagline,
  children,
}: {
  module: ModuleId;
  tagline: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const hydrated = useHydrated();
  const attempts = useAppStore((s) => s.attempts);
  const customQuestions = useAppStore((s) => s.customQuestions);
  const saveRunning = useAppStore((s) => s.saveRunning);

  const [practiceTopic, setPracticeTopic] = useState<string>("all");
  const [practiceCount, setPracticeCount] = useState(8);

  const tests = testsByModule(module);
  const pool = useMemo(
    () => questionsForModule(module, customQuestions),
    [module, customQuestions]
  );
  const topics = useMemo(
    () => topicsForModule(module, customQuestions),
    [module, customQuestions]
  );

  const moduleAttempts = hydrated ? attempts.filter((a) => a.module === module) : [];
  const totalCorrect = moduleAttempts.reduce((s, a) => s + a.correct, 0);
  const totalAttempted = moduleAttempts.reduce((s, a) => s + a.correct + a.incorrect, 0);

  const startPractice = () => {
    const filtered =
      practiceTopic === "all" ? pool : pool.filter((q) => q.topic === practiceTopic);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, Math.min(practiceCount, shuffled.length));
    if (chosen.length === 0) return;
    const durationMin = Math.max(5, Math.ceil(chosen.reduce((s, q) => s + q.estTimeSec, 0) / 60));
    const rt: RunningTest = {
      testId: "practice",
      title: `${MODULE_LABELS[module]} Quick Practice${
        practiceTopic !== "all" ? ` · ${practiceTopic}` : ""
      }`,
      module,
      questionIds: chosen.map((q) => q.id),
      durationMin,
      startedAt: 0, // not started yet — runner shows the intro screen
      remainingSec: durationMin * 60,
      currentIndex: 0,
      answers: {},
    };
    saveRunning(rt);
    router.push("/test/practice");
  };

  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {MODULE_LABELS[module]}
        </h1>
        <p className="mt-1 text-sm text-muted">{tagline}</p>
      </motion.div>

      {/* Stats + quick practice */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardTitle>Your Numbers</CardTitle>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-2xl font-bold">{moduleAttempts.length}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted">Tests</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {totalAttempted > 0 ? `${pct(totalCorrect, totalAttempted)}%` : "—"}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{pool.length}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted">Questions</p>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <CardTitle className="flex items-center gap-1.5">
            <Shuffle size={14} /> Quick Practice
          </CardTitle>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select
              value={practiceTopic}
              onChange={(e) => setPracticeTopic(e.target.value)}
              className="glass rounded-xl px-3 py-2 text-sm outline-none"
            >
              <option value="all">All topics</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              value={practiceCount}
              onChange={(e) => setPracticeCount(Number(e.target.value))}
              className="glass rounded-xl px-3 py-2 text-sm outline-none"
            >
              {[5, 8, 10, 15].map((n) => (
                <option key={n} value={n}>
                  {n} questions
                </option>
              ))}
            </select>
            <Button size="sm" onClick={startPractice}>
              <Play size={14} /> Generate & start
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted">
            Randomly samples from the {MODULE_LABELS[module].toLowerCase()} bank — a fresh paper
            every time.
          </p>
        </Card>
      </div>

      {/* Test series */}
      <h2 className="mt-8 text-lg font-bold">Test Series</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tests.map((t, i) => {
          const taken = moduleAttempts.filter((a) => a.testId === t.id);
          const bestScore = taken.length
            ? Math.max(...taken.map((a) => pct(Math.max(0, a.score), a.maxScore)))
            : null;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <Link href={`/test/${t.id}`}>
                <Card hover className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold leading-tight">{t.title}</p>
                    {t.difficulty !== "mixed" && <DifficultyBadge level={t.difficulty} />}
                  </div>
                  <p className="mt-2 line-clamp-2 flex-1 text-xs text-muted">{t.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {t.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} className="opacity-80">
                        {topic}
                      </Badge>
                    ))}
                    {t.topics.length > 3 && (
                      <Badge className="opacity-60">+{t.topics.length - 3}</Badge>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-card-border pt-3 text-xs text-muted">
                    <span>
                      {t.questionIds.length} Qs · {t.durationMin} min
                    </span>
                    {bestScore !== null ? (
                      <Badge tone={bestScore >= 60 ? "success" : "warning"}>
                        Best {bestScore}%
                      </Badge>
                    ) : (
                      <span className="text-primary">Not attempted →</span>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {children}
    </div>
  );
}

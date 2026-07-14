"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Flame,
  Play,
  Quote,
  Target,
  TrendingDown,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { ProgressBar, StatRing } from "@/components/ui/progress";
import { Heatmap } from "@/components/dashboard/Heatmap";
import { StudyTimer } from "@/components/dashboard/StudyTimer";
import { useAppStore, useHydrated } from "@/store/useAppStore";
import { levelProgress, levelTitle } from "@/lib/gamification";
import { currentStreak, bestStreak, activeDayCount } from "@/lib/streak";
import { readinessScore, weakTopics, evaluate } from "@/lib/engine";
import { TESTS } from "@/data/tests";
import { MODULE_LABELS, buildQuestionMap } from "@/data/questions";
import { quoteOfTheDay } from "@/data/quotes";
import { ACHIEVEMENTS, newlyUnlocked } from "@/data/achievements";
import { dateKey, pct } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export default function DashboardPage() {
  const hydrated = useHydrated();
  const store = useAppStore();
  const quote = quoteOfTheDay();

  const streak = hydrated ? currentStreak(store.activity) : 0;
  const best = hydrated ? bestStreak(store.activity) : 0;
  const today = hydrated ? store.activity[dateKey()] : undefined;
  const todayQ = today?.questions ?? 0;
  const goalPct = pct(todayQ, store.dailyGoal);
  const lp = levelProgress(store.xp);
  const readiness = hydrated
    ? readinessScore(store.attempts, activeDayCount(store.activity))
    : 0;

  // Unlock streak/xp achievements earned outside of test submission.
  useEffect(() => {
    if (!hydrated) return;
    const fresh = newlyUnlocked(
      { xp: store.xp, attempts: store.attempts, streak },
      store.unlocked
    );
    for (const a of fresh) store.unlockAchievement(a.id, a.xp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, store.xp, store.attempts.length, streak]);

  const attemptedTestIds = useMemo(
    () => new Set(store.attempts.map((a) => a.testId)),
    [store.attempts]
  );
  const upcoming = TESTS.filter((t) => !attemptedTestIds.has(t.id)).slice(0, 4);

  const weak = hydrated ? weakTopics(store.attempts).slice(0, 3) : [];
  const recommendations = weak.map((w) => ({
    topic: w.topic,
    accuracy: pct(w.correct, w.attempted),
    test: TESTS.find((t) => t.topics.includes(w.topic)),
  }));

  const recentMistakes = useMemo(() => {
    if (!hydrated) return [];
    const qmap = buildQuestionMap(store.customQuestions);
    const out: { id: string; topic: string; text: string; attemptId: string }[] = [];
    for (const a of store.attempts.slice(0, 5)) {
      for (const qid of a.questionIds) {
        const q = qmap.get(qid);
        if (q && evaluate(q, a.answers[qid]) === "incorrect") {
          out.push({ id: qid, topic: q.topic, text: q.text, attemptId: a.id });
        }
        if (out.length >= 6) return out;
      }
    }
    return out;
  }, [hydrated, store.attempts, store.customQuestions]);

  const unlockedList = ACHIEVEMENTS.filter((a) => store.unlocked[a.id]);

  // Date-dependent widgets (heatmap, quote, welcome date) must not prerender
  // with build-time values — render only after client hydration.
  if (!hydrated) return <div className="p-10 text-center text-muted">Loading…</div>;

  return (
    <div className="mx-auto max-w-6xl">
      {/* Welcome */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Welcome back, {store.userName} 👋
        </h1>
        <p className="mt-1 text-sm text-muted">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {" · "}Mission: crack core + non-core placements.
        </p>
      </motion.div>

      {/* Quick resume */}
      {hydrated && store.running && (
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={1}>
          <Card className="mt-6 flex items-center justify-between border-primary/40">
            <div>
              <CardTitle>Resume Test</CardTitle>
              <p className="mt-1 font-semibold">{store.running.title}</p>
              <p className="text-xs text-muted">
                Question {store.running.currentIndex + 1} of{" "}
                {store.running.questionIds.length} · saved mid-attempt
              </p>
            </div>
            <Link href={`/test/${store.running.testId}`}>
              <Button>
                <Play size={16} /> Resume
              </Button>
            </Link>
          </Card>
        </motion.div>
      )}

      {/* Stat row */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={1}>
          <Card className="h-full">
            <CardTitle className="flex items-center gap-1.5">
              <Target size={14} /> Today&apos;s Goal
            </CardTitle>
            <div className="mt-3 text-3xl font-bold">
              {todayQ}
              <span className="text-base font-normal text-muted"> / {store.dailyGoal} Qs</span>
            </div>
            <ProgressBar value={goalPct} className="mt-3" />
            <div className="mt-2 flex gap-1">
              <button
                className="rounded-md bg-primary-soft px-2 text-xs text-primary"
                onClick={() => store.setDailyGoal(store.dailyGoal - 5)}
              >
                −5
              </button>
              <button
                className="rounded-md bg-primary-soft px-2 text-xs text-primary"
                onClick={() => store.setDailyGoal(store.dailyGoal + 5)}
              >
                +5
              </button>
            </div>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={2}>
          <Card className="h-full">
            <CardTitle className="flex items-center gap-1.5">
              <Flame size={14} /> Streak
            </CardTitle>
            <div className="mt-3 text-3xl font-bold">
              {streak}
              <span className="text-base font-normal text-muted"> days</span>
            </div>
            <p className="mt-2 text-xs text-muted">Best: {best} days</p>
            <p className="mt-1 text-xs text-muted">
              {streak > 0 ? "Keep the fire burning 🔥" : "Solve 1 question to ignite it"}
            </p>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3}>
          <Card className="h-full">
            <CardTitle>Level</CardTitle>
            <div className="mt-3 text-3xl font-bold">
              {lp.level}
              <span className="ml-2 text-base font-normal text-muted">
                {levelTitle(lp.level)}
              </span>
            </div>
            <ProgressBar value={lp.pct} className="mt-3" />
            <p className="mt-2 text-xs text-muted">
              {lp.intoLevel}/{lp.needed} XP to level {lp.level + 1}
            </p>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={4}>
          <Card className="flex h-full flex-col items-center justify-center">
            <StatRing value={readiness} label={`${readiness}`} sublabel="Readiness" size={110} />
            <p className="mt-1 text-center text-[10px] text-muted">
              Based on your completed practice
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Main grid */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Left column (2/3) */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={5}>
            <Card>
              <CardTitle>Activity Heatmap</CardTitle>
              <div className="mt-4">
                <Heatmap activity={hydrated ? store.activity : {}} />
              </div>
            </Card>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={6}>
            <Card>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Tests</CardTitle>
                <Link href="/aerospace" className="text-xs text-primary hover:underline">
                  All tests <ArrowRight size={12} className="inline" />
                </Link>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {upcoming.map((t) => (
                  <Link key={t.id} href={`/test/${t.id}`}>
                    <div className="glass glass-hover rounded-xl p-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-tight">{t.title}</p>
                        {t.difficulty !== "mixed" && <DifficultyBadge level={t.difficulty} />}
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {MODULE_LABELS[t.module]} · {t.questionIds.length} Qs ·{" "}
                        {t.durationMin} min
                      </p>
                    </div>
                  </Link>
                ))}
                {upcoming.length === 0 && (
                  <p className="text-sm text-muted">
                    You have attempted every test — legend! Re-attempt any test to sharpen speed.
                  </p>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={7}>
            <Card>
              <CardTitle className="flex items-center gap-1.5">
                <TrendingDown size={14} /> Weak Topics & Recommended Practice
              </CardTitle>
              {recommendations.length > 0 ? (
                <div className="mt-3 flex flex-col gap-2">
                  {recommendations.map((r) => (
                    <div
                      key={r.topic}
                      className="flex items-center justify-between gap-3 rounded-xl bg-danger/5 p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{r.topic}</p>
                        <p className="text-xs text-muted">{r.accuracy}% accuracy — needs work</p>
                      </div>
                      {r.test && (
                        <Link href={`/test/${r.test.id}`}>
                          <Button size="sm" variant="outline">
                            Practice
                          </Button>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  {hydrated && store.attempts.length > 0
                    ? "No weak topics detected yet — accuracy is holding above 60% everywhere. 🎉"
                    : "Take a test and your weak areas will surface here automatically."}
                </p>
              )}
            </Card>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={8}>
            <Card>
              <CardTitle>Recent Mistakes</CardTitle>
              {recentMistakes.length > 0 ? (
                <div className="mt-3 flex flex-col gap-2">
                  {recentMistakes.map((m, i) => (
                    <Link key={`${m.id}-${i}`} href={`/results/?attempt=${m.attemptId}`}>
                      <div className="glass-hover flex items-start gap-3 rounded-xl border border-card-border p-3">
                        <Badge tone="danger">{m.topic}</Badge>
                        <p className="line-clamp-2 flex-1 text-xs text-muted">{m.text}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  No recent mistakes on record. Either you are flawless or it is time to take a test. 😉
                </p>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Right column (1/3) */}
        <div className="flex flex-col gap-4">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={6}>
            <Card>
              <CardTitle>Study Timer</CardTitle>
              <div className="mt-3">
                <StudyTimer />
              </div>
            </Card>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={7}>
            <Card>
              <CardTitle className="flex items-center gap-1.5">
                <Quote size={14} /> Quote of the Day
              </CardTitle>
              <p className="mt-3 text-sm italic leading-relaxed">“{quote.text}”</p>
              <p className="mt-2 text-right text-xs text-muted">— {quote.author}</p>
            </Card>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={8}>
            <Card>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-1.5">
                  <Award size={14} /> Achievements
                </CardTitle>
                <span className="text-xs text-muted">
                  {unlockedList.length}/{ACHIEVEMENTS.length}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {ACHIEVEMENTS.map((a) => {
                  const got = Boolean(store.unlocked[a.id]);
                  return (
                    <div
                      key={a.id}
                      title={`${a.name}: ${a.description}${got ? " ✓" : " (locked)"}`}
                      className={`flex h-11 items-center justify-center rounded-xl text-xl ${
                        got ? "bg-primary-soft" : "bg-primary-soft/30 opacity-30 grayscale"
                      }`}
                    >
                      {a.icon}
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={9}>
            <Card>
              <CardTitle>Recent Attempts</CardTitle>
              {hydrated && store.attempts.length > 0 ? (
                <div className="mt-3 flex flex-col gap-2">
                  {store.attempts.slice(0, 4).map((a) => (
                    <Link key={a.id} href={`/results/?attempt=${a.id}`}>
                      <div className="glass-hover rounded-xl border border-card-border p-3">
                        <p className="text-sm font-semibold leading-tight">{a.testTitle}</p>
                        <p className="mt-0.5 text-xs text-muted">
                          {a.score}/{a.maxScore} · {a.accuracy}% acc ·{" "}
                          {new Date(a.submittedAt).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">Your attempt history will appear here.</p>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

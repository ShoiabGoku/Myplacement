"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eraser,
  Lightbulb,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import type { AttemptAnswer, Question, RunningTest, TestDef } from "@/lib/types";
import { getQuestionsByIds, MODULE_LABELS } from "@/data/questions";
import { testById } from "@/data/tests";
import { scoreAttempt } from "@/lib/engine";
import { newlyUnlocked } from "@/data/achievements";
import { currentStreak } from "@/lib/streak";
import { useAppStore, useHydrated } from "@/store/useAppStore";
import { cn, fmtClock } from "@/lib/utils";

type Phase = "intro" | "running";

function paletteColor(a: AttemptAnswer | undefined, isCurrent: boolean): string {
  const state = a?.state ?? "unseen";
  const base =
    state === "answered"
      ? "bg-success/80 text-white"
      : state === "answered-marked"
      ? "bg-accent/80 text-white"
      : state === "marked"
      ? "bg-warning/80 text-white"
      : state === "seen"
      ? "bg-danger/30"
      : "bg-primary-soft";
  return cn(base, isCurrent && "ring-2 ring-primary");
}

const hasResponse = (a: AttemptAnswer | undefined) =>
  Boolean(a && ((a.selected && a.selected.length > 0) || (a.natValue !== null && a.natValue !== undefined)));

export function TestRunner({ testId }: { testId: string }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const running = useAppStore((s) => s.running);
  const customQuestions = useAppStore((s) => s.customQuestions);

  // Resolve the test definition: static tests from data, "practice" from the store.
  const test: TestDef | null = useMemo(() => {
    const def = testById(testId);
    if (def) return def;
    if (testId === "practice" && running?.testId === "practice") {
      return {
        id: "practice",
        module: running.module,
        title: running.title,
        description: "Ad-hoc practice session generated from your filters.",
        difficulty: "mixed",
        durationMin: running.durationMin,
        questionIds: running.questionIds,
        topics: [],
      };
    }
    return null;
  }, [testId, running]);

  const questions: Question[] = useMemo(
    () => (test ? getQuestionsByIds(test.questionIds, customQuestions) : []),
    [test, customQuestions]
  );

  const resumable = hydrated && running && running.testId === testId && running.startedAt > 0;

  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AttemptAnswer>>({});
  const [remaining, setRemaining] = useState(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const startedAtRef = useRef(0);
  const lastTickRef = useRef(0);
  const remainingRef = useRef(0);
  const submittedRef = useRef(false);

  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);

  /** Bank time spent on the current question into its answer record. */
  const bankTime = useCallback(
    (ans: Record<string, AttemptAnswer>, index: number) => {
      const q = questions[index];
      if (!q) return ans;
      const now = Date.now();
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      const prev = ans[q.id] ?? { questionId: q.id, timeSec: 0, state: "seen" as const };
      return { ...ans, [q.id]: { ...prev, timeSec: prev.timeSec + delta } };
    },
    [questions]
  );

  const persistRunning = useCallback(
    (ans: Record<string, AttemptAnswer>, index: number, remainingSec: number) => {
      if (!test) return;
      const rt: RunningTest = {
        testId: test.id,
        title: test.title,
        module: test.module,
        questionIds: test.questionIds,
        durationMin: test.durationMin,
        startedAt: startedAtRef.current,
        remainingSec,
        currentIndex: index,
        answers: ans,
      };
      useAppStore.getState().saveRunning(rt);
    },
    [test]
  );

  const start = (resume: boolean) => {
    if (!test) return;
    if (resume && running) {
      startedAtRef.current = running.startedAt;
      setAnswers(running.answers);
      setCurrent(running.currentIndex);
      remainingRef.current = Math.max(30, running.remainingSec);
      setRemaining(remainingRef.current);
    } else {
      startedAtRef.current = Date.now();
      setAnswers({});
      setCurrent(0);
      remainingRef.current = test.durationMin * 60;
      setRemaining(remainingRef.current);
    }
    lastTickRef.current = Date.now();
    setPhase("running");
  };

  const submit = useCallback(() => {
    if (!test || submittedRef.current) return;
    submittedRef.current = true;
    const finalAnswers = bankTime(answers, current);
    const attempt = scoreAttempt({
      testId: test.id,
      testTitle: test.title,
      module: test.module,
      questions,
      answers: finalAnswers,
      startedAt: startedAtRef.current,
      allottedSec: test.durationMin * 60,
      timeTakenSec: test.durationMin * 60 - remainingRef.current,
    });
    const store = useAppStore.getState();
    store.submitAttempt(attempt);
    // Evaluate achievements against the post-submit snapshot.
    const post = useAppStore.getState();
    const fresh = newlyUnlocked(
      { xp: post.xp, attempts: post.attempts, streak: currentStreak(post.activity) },
      post.unlocked
    );
    for (const a of fresh) post.unlockAchievement(a.id, a.xp);
    router.replace(`/results/?attempt=${attempt.id}`);
  }, [test, questions, answers, current, bankTime, router]);

  // Countdown + auto-submit.
  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      if (remainingRef.current <= 1) {
        clearInterval(t);
        remainingRef.current = 0;
        setRemaining(0);
        submit();
        return;
      }
      remainingRef.current -= 1;
      setRemaining(remainingRef.current);
    }, 1000);
    return () => clearInterval(t);
  }, [phase, submit]);

  // Persist progress for Quick Resume whenever answers or position change.
  // Runs after render, so the zustand write never happens mid-render.
  useEffect(() => {
    if (phase !== "running" || submittedRef.current) return;
    persistRunning(answers, current, remainingRef.current);
  }, [answers, current, phase, persistRunning]);

  if (!hydrated) return <div className="p-10 text-center text-muted">Loading…</div>;

  if (!test || questions.length === 0) {
    return (
      <div className="mx-auto max-w-lg p-10 text-center">
        <AlertTriangle className="mx-auto text-warning" />
        <p className="mt-4 font-semibold">Test not found</p>
        <p className="mt-1 text-sm text-muted">
          {testId === "practice"
            ? "No practice session is configured. Generate one from a module page."
            : "This test id does not exist."}
        </p>
        <Link href="/" className="mt-4 inline-block">
          <Button variant="outline">Back to dashboard</Button>
        </Link>
      </div>
    );
  }

  // ---------------- Intro / instructions ----------------
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{MODULE_LABELS[test.module]}</Badge>
            {test.difficulty !== "mixed" && <DifficultyBadge level={test.difficulty} />}
            {test.companies?.map((c) => (
              <Badge key={c}>{c}</Badge>
            ))}
          </div>
          <h1 className="mt-3 text-2xl font-bold">{test.title}</h1>
          <p className="mt-2 text-sm text-muted">{test.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-lg font-bold">{questions.length}</p>
              <p className="text-xs text-muted">Questions</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-lg font-bold">{test.durationMin} min</p>
              <p className="text-xs text-muted">Duration</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-lg font-bold">{totalMarks}</p>
              <p className="text-xs text-muted">Total marks</p>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-lg font-bold">
                {questions.some((q) => (q.negative ?? 0) > 0) ? "Yes" : "No"}
              </p>
              <p className="text-xs text-muted">Negative marking</p>
            </div>
          </div>

          {test.topics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {test.topics.map((t) => (
                <Badge key={t} tone="neutral" className="opacity-80">
                  {t}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-xl bg-primary-soft/40 p-4 text-sm">
            <p className="font-semibold">Instructions</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              <li>The countdown starts when you begin; the test auto-submits at zero.</li>
              <li>Navigate freely with the palette. Mark questions for review anytime.</li>
              <li>MCQ: one correct option. MSQ: select all that apply. NAT: type the number.</li>
              <li>Wrong MCQ answers may carry negative marks (shown per question).</li>
              <li>Your attempt saves locally — you can resume if you leave mid-test.</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {resumable && (
              <Button onClick={() => start(true)}>
                Resume attempt ({fmtClock(running!.remainingSec)} left)
              </Button>
            )}
            <Button variant={resumable ? "outline" : "primary"} onClick={() => start(false)}>
              {resumable ? "Start fresh" : "Start test"}
            </Button>
            <Link href={`/${test.module}`}>
              <Button variant="ghost">Cancel</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // ---------------- Running ----------------
  const q = questions[current];
  const a = answers[q.id];

  const setAnswer = (patch: Partial<AttemptAnswer>) => {
    const qid = q.id;
    setAnswers((prev) => {
      const cur = prev[qid] ?? { questionId: qid, timeSec: 0, state: "seen" as const };
      const next: AttemptAnswer = { ...cur, ...patch };
      const marked = next.state === "marked" || next.state === "answered-marked";
      next.state = hasResponse(next)
        ? marked
          ? "answered-marked"
          : "answered"
        : marked
        ? "marked"
        : "seen";
      return { ...prev, [qid]: next };
    });
  };

  const goTo = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    setShowHint(false);
    const from = current;
    setAnswers((prev) => {
      const banked = bankTime(prev, from);
      // Mark the target as at least "seen".
      const target = questions[index];
      const t = banked[target.id] ?? {
        questionId: target.id,
        timeSec: 0,
        state: "seen" as const,
      };
      return { ...banked, [target.id]: t };
    });
    setCurrent(index);
  };

  const toggleMark = () => {
    const marked = a?.state === "marked" || a?.state === "answered-marked";
    setAnswer({
      state: marked ? (hasResponse(a) ? "answered" : "seen") : hasResponse(a) ? "answered-marked" : "marked",
    });
  };

  const answeredCount = Object.values(answers).filter(hasResponse).length;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row">
      {/* Question area */}
      <div className="min-w-0 flex-1">
        <div className="glass sticky top-0 z-20 mb-4 flex items-center justify-between rounded-2xl px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{test.title}</p>
            <p className="text-xs text-muted">
              Q{current + 1}/{questions.length} · {answeredCount} answered
            </p>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-lg font-bold tabular-nums",
              remaining < 60 ? "bg-danger/15 text-danger" : "bg-primary-soft text-primary"
            )}
          >
            <Clock size={16} />
            {fmtClock(remaining)}
          </div>
        </div>

        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">{q.topic}</Badge>
            <DifficultyBadge level={q.difficulty} />
            <span className="text-xs text-muted">
              +{q.marks} / −{q.negative ?? 0}
            </span>
            <span className="ml-auto text-xs uppercase tracking-wider text-muted">
              {q.type === "nat" ? "Numerical" : q.type === "multiselect" ? "Multi-select" : "MCQ"}
            </span>
          </div>

          <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed">{q.text}</p>

          {/* Options / NAT input */}
          <div className="mt-5 flex flex-col gap-2">
            {q.type === "nat" ? (
              <input
                type="number"
                step="any"
                inputMode="decimal"
                placeholder="Type your numerical answer"
                className="glass w-full max-w-xs rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/60"
                value={a?.natValue ?? ""}
                onChange={(e) =>
                  setAnswer({
                    natValue: e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            ) : (
              q.options?.map((opt, i) => {
                const selected = a?.selected?.includes(i) ?? false;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (q.type === "mcq") {
                        setAnswer({ selected: selected ? [] : [i] });
                      } else {
                        const cur = a?.selected ?? [];
                        setAnswer({
                          selected: selected ? cur.filter((x) => x !== i) : [...cur, i],
                        });
                      }
                    }}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      selected
                        ? "border-primary bg-primary-soft"
                        : "border-card-border hover:border-primary/40"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-[10px] font-bold",
                        q.type === "mcq" ? "rounded-full" : "rounded-md",
                        selected ? "border-primary bg-primary text-white" : "border-muted"
                      )}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })
            )}
          </div>

          {/* Hints */}
          {q.hints && q.hints.length > 0 && (
            <div className="mt-4">
              <button
                className="flex items-center gap-1.5 text-xs text-warning hover:underline"
                onClick={() => setShowHint((h) => !h)}
              >
                <Lightbulb size={14} /> {showHint ? "Hide hint" : "Show hint"}
              </button>
              {showHint && (
                <p className="mt-2 rounded-xl bg-warning/10 p-3 text-xs">{q.hints[0]}</p>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => goTo(current - 1)} disabled={current === 0}>
              <ChevronLeft size={14} /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goTo(current + 1)}
              disabled={current === questions.length - 1}
            >
              Next <ChevronRight size={14} />
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleMark}>
              <Bookmark
                size={14}
                className={
                  a?.state === "marked" || a?.state === "answered-marked" ? "fill-warning text-warning" : ""
                }
              />
              {a?.state === "marked" || a?.state === "answered-marked" ? "Unmark" : "Mark for review"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAnswer({ selected: [], natValue: null })}
            >
              <Eraser size={14} /> Clear
            </Button>
            <div className="ml-auto">
              <Button variant="success" size="sm" onClick={() => setConfirmSubmit(true)}>
                Submit test
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Palette */}
      <aside className="w-full shrink-0 lg:w-64">
        <Card className="lg:sticky lg:top-4">
          <CardTitle>Question Palette</CardTitle>
          <div className="mt-3 grid grid-cols-8 gap-1.5 sm:grid-cols-10 lg:grid-cols-5">
            {questions.map((qq, i) => (
              <button
                key={qq.id}
                onClick={() => goTo(i)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-transform hover:scale-110",
                  paletteColor(answers[qq.id], i === current)
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 text-[11px] text-muted">
            <p><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm bg-success/80" />Answered</p>
            <p><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm bg-warning/80" />Marked for review</p>
            <p><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm bg-accent/80" />Answered + marked</p>
            <p><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm bg-danger/30" />Seen, unanswered</p>
            <p><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm bg-primary-soft" />Not visited</p>
          </div>
        </Card>
      </aside>

      {/* Submit confirmation */}
      {confirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-sm">
            <p className="font-semibold">Submit test?</p>
            <p className="mt-2 text-sm text-muted">
              {answeredCount} of {questions.length} questions answered ·{" "}
              {fmtClock(remaining)} remaining.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setConfirmSubmit(false)}>
                Keep going
              </Button>
              <Button variant="success" onClick={submit}>
                Submit now
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

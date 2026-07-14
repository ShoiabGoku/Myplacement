"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronDown, MinusCircle, XCircle, Zap } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { ProgressBar, StatRing } from "@/components/ui/progress";
import { SolutionPanel } from "@/components/test/SolutionPanel";
import { useAppStore, useHydrated } from "@/store/useAppStore";
import { buildQuestionMap } from "@/data/questions";
import { TESTS } from "@/data/tests";
import { evaluate, type Verdict } from "@/lib/engine";
import type { Question } from "@/lib/types";
import { cn, fmtClock, pct } from "@/lib/utils";

function verdictIcon(v: Verdict) {
  if (v === "correct") return <CheckCircle2 size={18} className="text-success" />;
  if (v === "incorrect") return <XCircle size={18} className="text-danger" />;
  return <MinusCircle size={18} className="text-muted" />;
}

function formatUserAnswer(q: Question, sel?: number[], nat?: number | null): string {
  if (q.type === "nat") return nat === null || nat === undefined ? "—" : String(nat);
  if (!sel || sel.length === 0) return "—";
  return sel.map((i) => String.fromCharCode(65 + i)).join(", ");
}

function formatCorrectAnswer(q: Question): string {
  if (q.type === "nat")
    return `${q.answer?.value}${q.answer?.tolerance ? ` (±${q.answer.tolerance})` : ""}`;
  return (q.correct ?? []).map((i) => String.fromCharCode(65 + i)).join(", ");
}

function ResultsContent() {
  const params = useSearchParams();
  const hydrated = useHydrated();
  const attempts = useAppStore((s) => s.attempts);
  const customQuestions = useAppStore((s) => s.customQuestions);
  const [openQ, setOpenQ] = useState<string | null>(null);

  const attemptId = params.get("attempt");
  const attempt = useMemo(
    () => (attemptId ? attempts.find((a) => a.id === attemptId) : attempts[0]),
    [attemptId, attempts]
  );

  const qmap = useMemo(() => buildQuestionMap(customQuestions), [customQuestions]);

  if (!hydrated) return <div className="p-10 text-center text-muted">Loading…</div>;

  if (!attempt) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="font-semibold">No results to show</p>
        <p className="mt-1 text-sm text-muted">Complete a test and your report lands here.</p>
        <Link href="/" className="mt-4 inline-block">
          <Button variant="outline">Back to dashboard</Button>
        </Link>
      </div>
    );
  }

  const scorePct = pct(Math.max(0, attempt.score), attempt.maxScore);
  const attempted = attempt.correct + attempt.incorrect;
  const avgTime = attempted + attempt.unattempted > 0
    ? attempt.timeTakenSec / (attempted + attempt.unattempted)
    : 0;

  const sortedTopics = [...attempt.topicStats].sort(
    (a, b) => pct(a.correct, Math.max(1, a.attempted)) - pct(b.correct, Math.max(1, b.attempted))
  );
  const weak = sortedTopics.filter((t) => t.attempted > 0 && pct(t.correct, t.attempted) < 60);
  const strong = sortedTopics.filter((t) => t.attempted > 0 && pct(t.correct, t.attempted) >= 80);
  const recommended = weak
    .map((w) => TESTS.find((t) => t.topics.includes(w.topic) && t.id !== attempt.testId))
    .filter((t, i, arr) => t && arr.indexOf(t) === i)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold">{attempt.testTitle}</h1>
      <p className="mt-1 text-sm text-muted">
        Submitted {new Date(attempt.submittedAt).toLocaleString("en-IN")} ·{" "}
        <span className="inline-flex items-center gap-1 text-accent">
          <Zap size={13} /> +{attempt.xpEarned} XP earned
        </span>
      </p>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="flex flex-col items-center justify-center py-6">
          <StatRing value={scorePct} label={`${scorePct}%`} sublabel="Score" size={110} />
          <p className="mt-2 text-xs text-muted">
            {attempt.score} / {attempt.maxScore} marks
          </p>
        </Card>
        <Card className="flex flex-col justify-center">
          <CardTitle>Accuracy</CardTitle>
          <p className="mt-2 text-3xl font-bold">{attempt.accuracy}%</p>
          <p className="mt-1 text-xs text-muted">
            {attempt.correct} correct · {attempt.incorrect} wrong · {attempt.unattempted} skipped
          </p>
        </Card>
        <Card className="flex flex-col justify-center">
          <CardTitle>Time Taken</CardTitle>
          <p className="mt-2 text-3xl font-bold">{fmtClock(attempt.timeTakenSec)}</p>
          <p className="mt-1 text-xs text-muted">of {fmtClock(attempt.allottedSec)} allotted</p>
        </Card>
        <Card className="flex flex-col justify-center">
          <CardTitle>Avg / Question</CardTitle>
          <p className="mt-2 text-3xl font-bold">{fmtClock(avgTime)}</p>
          <p className="mt-1 text-xs text-muted">across {attempt.questionIds.length} questions</p>
        </Card>
      </div>

      {/* Topic-wise performance */}
      <Card className="mt-4">
        <CardTitle>Topic-wise Performance</CardTitle>
        <div className="mt-4 flex flex-col gap-3">
          {sortedTopics.map((t) => {
            const acc = t.attempted > 0 ? pct(t.correct, t.attempted) : 0;
            return (
              <div key={t.topic}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{t.topic}</span>
                  <span className="text-muted">
                    {t.correct}/{t.attempted} attempted · {acc}%
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
        <div className="mt-4 flex flex-wrap gap-2">
          {strong.map((t) => (
            <Badge key={t.topic} tone="success">
              💪 {t.topic}
            </Badge>
          ))}
          {weak.map((t) => (
            <Badge key={t.topic} tone="danger">
              📉 {t.topic}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Recommended practice */}
      {recommended.length > 0 && (
        <Card className="mt-4">
          <CardTitle>Recommended Practice</CardTitle>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {recommended.map(
              (t) =>
                t && (
                  <Link key={t.id} href={`/test/${t.id}`}>
                    <div className="glass glass-hover rounded-xl p-3">
                      <p className="text-sm font-semibold leading-tight">{t.title}</p>
                      <p className="mt-1 text-xs text-muted">
                        {t.questionIds.length} Qs · {t.durationMin} min
                      </p>
                    </div>
                  </Link>
                )
            )}
          </div>
        </Card>
      )}

      {/* Solutions review */}
      <h2 className="mt-8 text-lg font-bold">Solutions Review</h2>
      <div className="mt-3 flex flex-col gap-3 pb-10">
        {attempt.questionIds.map((qid, idx) => {
          const q = qmap.get(qid);
          if (!q) return null;
          const ans = attempt.answers[qid];
          const verdict = evaluate(q, ans);
          const open = openQ === qid;
          return (
            <Card key={qid} className="p-0">
              <button
                className="flex w-full items-start gap-3 p-4 text-left"
                onClick={() => setOpenQ(open ? null : qid)}
              >
                {verdictIcon(verdict)}
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm", !open && "line-clamp-2")}>
                    <span className="font-semibold">Q{idx + 1}.</span> {q.text}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <Badge tone="accent">{q.topic}</Badge>
                    <DifficultyBadge level={q.difficulty} />
                    <span>
                      Your answer: <b>{formatUserAnswer(q, ans?.selected, ans?.natValue)}</b>
                    </span>
                    <span>
                      Correct: <b className="text-success">{formatCorrectAnswer(q)}</b>
                    </span>
                    {ans && <span>{Math.round(ans.timeSec)}s spent</span>}
                  </div>
                </div>
                <ChevronDown
                  size={16}
                  className={cn("mt-1 shrink-0 transition-transform", open && "rotate-180")}
                />
              </button>
              {open && (
                <div className="px-4 pb-4">
                  {q.options && (
                    <div className="flex flex-col gap-1.5">
                      {q.options.map((opt, i) => {
                        const isCorrect = q.correct?.includes(i);
                        const wasSelected = ans?.selected?.includes(i);
                        return (
                          <div
                            key={i}
                            className={cn(
                              "rounded-lg border px-3 py-2 text-sm",
                              isCorrect
                                ? "border-success/50 bg-success/10"
                                : wasSelected
                                ? "border-danger/50 bg-danger/10"
                                : "border-card-border"
                            )}
                          >
                            <b>{String.fromCharCode(65 + i)}.</b> {opt}
                            {isCorrect && " ✓"}
                            {wasSelected && !isCorrect && " ✗ (your pick)"}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <SolutionPanel question={q} />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-muted">Loading results…</div>}>
      <ResultsContent />
    </Suspense>
  );
}

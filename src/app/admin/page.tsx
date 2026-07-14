"use client";

import { useRef, useState } from "react";
import {
  Copy,
  Download,
  Pencil,
  Plus,
  Trash2,
  Upload,
  Wand2,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { useAppStore, useHydrated } from "@/store/useAppStore";
import type { Difficulty, ModuleId, Question, QuestionType } from "@/lib/types";
import { MODULE_LABELS } from "@/data/questions";
import { uid } from "@/lib/utils";

/** String-typed draft the form edits; converted to a Question on save. */
interface Draft {
  id: string;
  module: ModuleId;
  topic: string;
  subtopic: string;
  type: QuestionType;
  difficulty: Difficulty;
  companies: string;
  tags: string;
  text: string;
  options: string;
  correct: string;
  natValue: string;
  natTolerance: string;
  marks: string;
  negative: string;
  estTimeSec: string;
  steps: string;
  concept: string;
  formula: string;
  memoryTrick: string;
  commonMistakes: string;
}

const emptyDraft = (): Draft => ({
  id: "",
  module: "aerospace",
  topic: "",
  subtopic: "",
  type: "mcq",
  difficulty: "medium",
  companies: "",
  tags: "",
  text: "",
  options: "",
  correct: "A",
  natValue: "",
  natTolerance: "",
  marks: "1",
  negative: "0",
  estTimeSec: "60",
  steps: "",
  concept: "",
  formula: "",
  memoryTrick: "",
  commonMistakes: "",
});

const lettersToIndices = (s: string) =>
  s
    .split(",")
    .map((x) => x.trim().toUpperCase())
    .filter(Boolean)
    .map((x) => x.charCodeAt(0) - 65)
    .filter((n) => n >= 0 && n < 26);

function draftToQuestion(d: Draft): Question | string {
  if (!d.text.trim()) return "Question text is required.";
  if (!d.topic.trim()) return "Topic is required.";
  const base: Question = {
    id: d.id || uid("custom-"),
    module: d.module,
    topic: d.topic.trim(),
    subtopic: d.subtopic.trim() || undefined,
    type: d.type,
    difficulty: d.difficulty,
    companies: d.companies ? d.companies.split(",").map((x) => x.trim()).filter(Boolean) : undefined,
    tags: d.tags ? d.tags.split(",").map((x) => x.trim()).filter(Boolean) : undefined,
    text: d.text.trim(),
    marks: Number(d.marks) || 1,
    negative: Number(d.negative) || 0,
    estTimeSec: Number(d.estTimeSec) || 60,
    solution: {
      steps: d.steps.split("\n").map((s) => s.trim()).filter(Boolean),
      concept: d.concept.trim() || "—",
      formula: d.formula.trim() || undefined,
      memoryTrick: d.memoryTrick.trim() || undefined,
      commonMistakes: d.commonMistakes
        ? d.commonMistakes.split("\n").map((s) => s.trim()).filter(Boolean)
        : undefined,
    },
  };
  if (d.type === "nat") {
    if (d.natValue === "" || Number.isNaN(Number(d.natValue)))
      return "NAT questions need a numeric answer.";
    base.answer = {
      value: Number(d.natValue),
      tolerance: d.natTolerance === "" ? undefined : Number(d.natTolerance),
    };
  } else {
    const options = d.options.split("\n").map((s) => s.trim()).filter(Boolean);
    if (options.length < 2) return "Provide at least 2 options (one per line).";
    const correct = lettersToIndices(d.correct).filter((i) => i < options.length);
    if (correct.length === 0) return "Mark the correct option letter(s), e.g. 'B' or 'A,C'.";
    base.options = options;
    base.correct = correct;
  }
  return base;
}

function questionToDraft(q: Question): Draft {
  return {
    id: q.id,
    module: q.module,
    topic: q.topic,
    subtopic: q.subtopic ?? "",
    type: q.type,
    difficulty: q.difficulty,
    companies: (q.companies ?? []).join(", "),
    tags: (q.tags ?? []).join(", "),
    text: q.text,
    options: (q.options ?? []).join("\n"),
    correct: (q.correct ?? []).map((i) => String.fromCharCode(65 + i)).join(","),
    natValue: q.answer ? String(q.answer.value) : "",
    natTolerance: q.answer?.tolerance !== undefined ? String(q.answer.tolerance) : "",
    marks: String(q.marks),
    negative: String(q.negative ?? 0),
    estTimeSec: String(q.estTimeSec),
    steps: q.solution.steps.join("\n"),
    concept: q.solution.concept,
    formula: q.solution.formula ?? "",
    memoryTrick: q.solution.memoryTrick ?? "",
    commonMistakes: (q.solution.commonMistakes ?? []).join("\n"),
  };
}

const AI_PROMPT = `You are a question-bank generator for a placement-prep platform. Generate N questions as a JSON array. Each object must match this TypeScript type exactly:

{
  "id": "custom-<unique>",
  "module": "aerospace" | "coding" | "aptitude" | "interview",
  "topic": string, "subtopic"?: string,
  "type": "mcq" | "multiselect" | "nat",
  "difficulty": "easy" | "medium" | "hard" | "gate" | "interview",
  "companies"?: string[], "tags"?: string[],
  "text": string,
  "options"?: string[],            // mcq/multiselect only
  "correct"?: number[],            // 0-based indices of correct options
  "answer"?: { "value": number, "tolerance"?: number },  // nat only
  "marks": number, "negative"?: number, "estTimeSec": number,
  "solution": {
    "steps": string[], "concept": string, "formula"?: string,
    "altMethod"?: string, "commonMistakes"?: string[], "memoryTrick"?: string
  }
}

Rules: verify every numerical answer by computing it step by step; keep solutions rigorous; vary difficulty. Now generate 10 questions about: [YOUR TOPIC HERE]`;

const inputCls = "glass w-full rounded-xl px-3 py-2 text-sm outline-none";
const labelCls = "text-[11px] font-semibold uppercase tracking-wider text-muted";

export default function AdminPage() {
  const hydrated = useHydrated();
  const store = useAppStore();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const save = () => {
    const result = draftToQuestion(draft);
    if (typeof result === "string") {
      setError(result);
      return;
    }
    if (store.customQuestions.some((q) => q.id === result.id)) {
      store.updateCustomQuestion(result);
    } else {
      store.addCustomQuestion(result);
    }
    setDraft(emptyDraft());
    setShowForm(false);
    setError("");
    setNotice("Question saved. It is now available in Quick Practice and Search.");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(store.customQuestions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "myplacement-questions.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text());
      if (!Array.isArray(parsed)) throw new Error("Expected a JSON array");
      const valid = parsed.filter(
        (q) => q && typeof q.id === "string" && typeof q.text === "string" && q.solution
      ) as Question[];
      const added = store.importCustomQuestions(valid);
      setNotice(`Imported ${added} new question${added === 1 ? "" : "s"} (${parsed.length - added} skipped as duplicates/invalid).`);
    } catch (e) {
      setError(`Import failed: ${e instanceof Error ? e.message : "invalid file"}`);
    }
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(AI_PROMPT);
    setNotice("AI generator prompt copied — paste it into Claude/ChatGPT, then import the JSON it returns.");
  };

  if (!hydrated) return <div className="p-10 text-center text-muted">Loading…</div>;

  return (
    <div className="mx-auto max-w-4xl pb-10">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Admin Panel</h1>
      <p className="mt-1 text-sm text-muted">
        Manage your custom question bank, import/export data, and tune your profile.
      </p>

      {(error || notice) && (
        <div
          className={`mt-4 rounded-xl p-3 text-sm ${
            error ? "bg-danger/10 text-danger" : "bg-success/10 text-success"
          }`}
        >
          {error || notice}
        </div>
      )}

      {/* Profile settings */}
      <Card className="mt-6">
        <CardTitle>Profile & Goals</CardTitle>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <div>
            <p className={labelCls}>Display name</p>
            <input
              className={`${inputCls} mt-1 w-44`}
              value={store.userName}
              onChange={(e) => store.setUserName(e.target.value)}
            />
          </div>
          <div>
            <p className={labelCls}>Daily goal (questions)</p>
            <input
              type="number"
              className={`${inputCls} mt-1 w-28`}
              value={store.dailyGoal}
              onChange={(e) => store.setDailyGoal(Number(e.target.value))}
            />
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm("Reset ALL progress (XP, attempts, streaks, achievements)? Custom questions are kept.")) {
                store.resetAllProgress();
                setNotice("Progress reset.");
              }
            }}
          >
            Reset progress
          </Button>
        </div>
      </Card>

      {/* Data tools */}
      <Card className="mt-4">
        <CardTitle>Question Data Tools</CardTitle>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => { setDraft(emptyDraft()); setShowForm(true); setError(""); }}>
            <Plus size={14} /> Add question
          </Button>
          <Button size="sm" variant="outline" onClick={exportJson} disabled={store.customQuestions.length === 0}>
            <Download size={14} /> Export JSON
          </Button>
          <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> Import JSON
          </Button>
          <Button size="sm" variant="outline" onClick={copyPrompt}>
            <Wand2 size={14} /> <Copy size={12} /> AI generator prompt
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importJson(f);
              e.target.value = "";
            }}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          AI workflow: copy the prompt → paste into any AI chat with your topic → save the JSON
          reply to a file → import it here. Imported questions appear in Search and Quick Practice.
        </p>
      </Card>

      {/* Editor form */}
      {showForm && (
        <Card className="mt-4">
          <CardTitle>{draft.id ? `Edit ${draft.id}` : "New Question"}</CardTitle>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className={labelCls}>Module</p>
              <select className={`${inputCls} mt-1`} value={draft.module} onChange={(e) => set({ module: e.target.value as ModuleId })}>
                {(Object.keys(MODULE_LABELS) as ModuleId[]).map((m) => (
                  <option key={m} value={m}>{MODULE_LABELS[m]}</option>
                ))}
              </select>
            </div>
            <div>
              <p className={labelCls}>Type</p>
              <select className={`${inputCls} mt-1`} value={draft.type} onChange={(e) => set({ type: e.target.value as QuestionType })}>
                <option value="mcq">MCQ (single correct)</option>
                <option value="multiselect">Multi-select</option>
                <option value="nat">NAT (numerical)</option>
              </select>
            </div>
            <div>
              <p className={labelCls}>Difficulty</p>
              <select className={`${inputCls} mt-1`} value={draft.difficulty} onChange={(e) => set({ difficulty: e.target.value as Difficulty })}>
                {(["easy", "medium", "hard", "gate", "interview"] as Difficulty[]).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <p className={labelCls}>Topic *</p>
              <input className={`${inputCls} mt-1`} value={draft.topic} onChange={(e) => set({ topic: e.target.value })} placeholder="e.g. Aerodynamics" />
            </div>
            <div>
              <p className={labelCls}>Subtopic</p>
              <input className={`${inputCls} mt-1`} value={draft.subtopic} onChange={(e) => set({ subtopic: e.target.value })} />
            </div>
            <div>
              <p className={labelCls}>Companies (comma-sep)</p>
              <input className={`${inputCls} mt-1`} value={draft.companies} onChange={(e) => set({ companies: e.target.value })} placeholder="ISRO, Airbus" />
            </div>
          </div>

          <p className={`${labelCls} mt-3`}>Question text *</p>
          <textarea rows={3} className={`${inputCls} mt-1`} value={draft.text} onChange={(e) => set({ text: e.target.value })} />

          {draft.type === "nat" ? (
            <div className="mt-3 flex gap-3">
              <div>
                <p className={labelCls}>Answer value *</p>
                <input className={`${inputCls} mt-1 w-36`} value={draft.natValue} onChange={(e) => set({ natValue: e.target.value })} />
              </div>
              <div>
                <p className={labelCls}>Tolerance (±)</p>
                <input className={`${inputCls} mt-1 w-36`} value={draft.natTolerance} onChange={(e) => set({ natTolerance: e.target.value })} />
              </div>
            </div>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
              <div>
                <p className={labelCls}>Options (one per line) *</p>
                <textarea rows={4} className={`${inputCls} mt-1`} value={draft.options} onChange={(e) => set({ options: e.target.value })} />
              </div>
              <div>
                <p className={labelCls}>Correct letter(s) *</p>
                <input className={`${inputCls} mt-1 w-28`} value={draft.correct} onChange={(e) => set({ correct: e.target.value })} placeholder="B or A,C" />
              </div>
            </div>
          )}

          <div className="mt-3 grid grid-cols-3 gap-3">
            <div>
              <p className={labelCls}>Marks</p>
              <input className={`${inputCls} mt-1`} value={draft.marks} onChange={(e) => set({ marks: e.target.value })} />
            </div>
            <div>
              <p className={labelCls}>Negative marks</p>
              <input className={`${inputCls} mt-1`} value={draft.negative} onChange={(e) => set({ negative: e.target.value })} />
            </div>
            <div>
              <p className={labelCls}>Est. time (sec)</p>
              <input className={`${inputCls} mt-1`} value={draft.estTimeSec} onChange={(e) => set({ estTimeSec: e.target.value })} />
            </div>
          </div>

          <p className={`${labelCls} mt-3`}>Solution steps (one per line)</p>
          <textarea rows={3} className={`${inputCls} mt-1`} value={draft.steps} onChange={(e) => set({ steps: e.target.value })} />
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className={labelCls}>Concept</p>
              <input className={`${inputCls} mt-1`} value={draft.concept} onChange={(e) => set({ concept: e.target.value })} />
            </div>
            <div>
              <p className={labelCls}>Formula</p>
              <input className={`${inputCls} mt-1`} value={draft.formula} onChange={(e) => set({ formula: e.target.value })} />
            </div>
            <div>
              <p className={labelCls}>Memory trick</p>
              <input className={`${inputCls} mt-1`} value={draft.memoryTrick} onChange={(e) => set({ memoryTrick: e.target.value })} />
            </div>
            <div>
              <p className={labelCls}>Common mistakes (one per line)</p>
              <textarea rows={2} className={`${inputCls} mt-1`} value={draft.commonMistakes} onChange={(e) => set({ commonMistakes: e.target.value })} />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button onClick={save}>Save question</Button>
            <Button variant="ghost" onClick={() => { setShowForm(false); setError(""); }}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Custom question list */}
      <Card className="mt-4">
        <CardTitle>
          Your Custom Questions ({store.customQuestions.length})
        </CardTitle>
        {store.customQuestions.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            None yet. The built-in bank ships {`with`} ~100 questions; add your own from PYQs,
            company papers or AI-generated sets.
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            {store.customQuestions.map((q) => (
              <div key={q.id} className="flex items-center gap-3 rounded-xl border border-card-border p-3">
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm">{q.text}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <Badge tone="accent">{MODULE_LABELS[q.module]}</Badge>
                    <Badge>{q.topic}</Badge>
                    <DifficultyBadge level={q.difficulty} />
                    <span className="text-[10px] text-muted">{q.id}</span>
                  </div>
                </div>
                <button
                  aria-label="Edit"
                  onClick={() => { setDraft(questionToDraft(q)); setShowForm(true); setError(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  <Pencil size={15} className="text-muted hover:text-foreground" />
                </button>
                <button
                  aria-label="Delete"
                  onClick={() => { if (confirm("Delete this question?")) store.deleteCustomQuestion(q.id); }}
                >
                  <Trash2 size={15} className="text-danger/70 hover:text-danger" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

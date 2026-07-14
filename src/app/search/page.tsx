"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SearchIcon, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { SolutionPanel } from "@/components/test/SolutionPanel";
import { useAppStore, useHydrated } from "@/store/useAppStore";
import { ALL_QUESTIONS, MODULE_LABELS } from "@/data/questions";
import type { Difficulty, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function SearchPage() {
  const hydrated = useHydrated();
  const customQuestions = useAppStore((s) => s.customQuestions);
  const bookmarks = useAppStore((s) => s.bookmarks);
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);

  const [keyword, setKeyword] = useState("");
  const [module, setModule] = useState<"all" | ModuleId>("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");
  const [company, setCompany] = useState("all");
  const [topic, setTopic] = useState("all");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const pool = useMemo(
    () => [...ALL_QUESTIONS, ...(hydrated ? customQuestions : [])],
    [hydrated, customQuestions]
  );

  const companies = useMemo(
    () => [...new Set(pool.flatMap((q) => q.companies ?? []))].sort(),
    [pool]
  );
  const topics = useMemo(
    () =>
      [...new Set(pool.filter((q) => module === "all" || q.module === module).map((q) => q.topic))].sort(),
    [pool, module]
  );

  const results = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return pool.filter((q) => {
      if (module !== "all" && q.module !== module) return false;
      if (difficulty !== "all" && q.difficulty !== difficulty) return false;
      if (topic !== "all" && q.topic !== topic) return false;
      if (company !== "all" && !(q.companies ?? []).includes(company)) return false;
      if (onlyBookmarked && !bookmarks.includes(q.id)) return false;
      if (kw) {
        const haystack = [
          q.id,
          q.text,
          q.topic,
          q.subtopic ?? "",
          q.solution.formula ?? "",
          q.solution.concept,
          ...(q.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(kw)) return false;
      }
      return true;
    });
  }, [pool, keyword, module, difficulty, topic, company, onlyBookmarked, bookmarks]);

  const selectCls = "glass rounded-xl px-3 py-2 text-sm outline-none";

  return (
    <div className="mx-auto max-w-4xl pb-10">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Question Search</h1>
      <p className="mt-1 text-sm text-muted">
        Search {pool.length} questions by keyword, formula, topic, company, difficulty or id.
      </p>

      {/* Filters */}
      <Card className="mt-6">
        <div className="glass flex items-center gap-2 rounded-xl px-3">
          <SearchIcon size={16} className="text-muted" />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Try "shock", "CL²/(πeAR)", "aero-013", "hash"…'
            className="w-full bg-transparent py-2.5 text-sm outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <select className={selectCls} value={module} onChange={(e) => { setModule(e.target.value as "all" | ModuleId); setTopic("all"); }}>
            <option value="all">All modules</option>
            {(Object.keys(MODULE_LABELS) as ModuleId[]).map((m) => (
              <option key={m} value={m}>
                {MODULE_LABELS[m]}
              </option>
            ))}
          </select>
          <select className={selectCls} value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="all">All topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select className={selectCls} value={difficulty} onChange={(e) => setDifficulty(e.target.value as "all" | Difficulty)}>
            <option value="all">Any difficulty</option>
            {(["easy", "medium", "hard", "gate", "interview"] as Difficulty[]).map((d) => (
              <option key={d} value={d}>
                {d.toUpperCase()}
              </option>
            ))}
          </select>
          <select className={selectCls} value={company} onChange={(e) => setCompany(e.target.value)}>
            <option value="all">Any company</option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={() => setOnlyBookmarked((b) => !b)}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm",
              onlyBookmarked ? "bg-warning/15 text-warning" : "glass text-muted"
            )}
          >
            <Star size={14} className={onlyBookmarked ? "fill-warning" : ""} /> Bookmarked
          </button>
        </div>
      </Card>

      <p className="mt-4 text-xs uppercase tracking-wider text-muted">
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>

      <div className="mt-2 flex flex-col gap-3">
        {results.map((q) => {
          const isOpen = open === q.id;
          const starred = bookmarks.includes(q.id);
          return (
            <Card key={q.id} className="p-0">
              <div className="flex items-start gap-2 p-4">
                <button className="flex-1 text-left" onClick={() => setOpen(isOpen ? null : q.id)}>
                  <p className={cn("text-sm", !isOpen && "line-clamp-2")}>{q.text}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Badge tone="accent">{MODULE_LABELS[q.module]}</Badge>
                    <Badge>{q.topic}</Badge>
                    <DifficultyBadge level={q.difficulty} />
                    <span className="text-[10px] text-muted">{q.id}</span>
                  </div>
                </button>
                <button
                  onClick={() => toggleBookmark(q.id)}
                  aria-label="Bookmark question"
                  className="mt-0.5 shrink-0"
                >
                  <Star
                    size={16}
                    className={starred ? "fill-warning text-warning" : "text-muted"}
                  />
                </button>
                <ChevronDown
                  size={16}
                  className={cn("mt-1 shrink-0 cursor-pointer transition-transform", isOpen && "rotate-180")}
                  onClick={() => setOpen(isOpen ? null : q.id)}
                />
              </div>
              {isOpen && (
                <div className="px-4 pb-4">
                  {q.options && (
                    <div className="flex flex-col gap-1.5">
                      {q.options.map((opt, i) => (
                        <div
                          key={i}
                          className={cn(
                            "rounded-lg border px-3 py-2 text-sm",
                            q.correct?.includes(i)
                              ? "border-success/50 bg-success/10"
                              : "border-card-border"
                          )}
                        >
                          <b>{String.fromCharCode(65 + i)}.</b> {opt}
                          {q.correct?.includes(i) && " ✓"}
                        </div>
                      ))}
                    </div>
                  )}
                  {q.type === "nat" && (
                    <p className="rounded-lg border border-success/50 bg-success/10 px-3 py-2 text-sm">
                      Answer: <b>{q.answer?.value}</b>
                      {q.answer?.tolerance ? ` (±${q.answer.tolerance})` : ""}
                    </p>
                  )}
                  <SolutionPanel question={q} />
                </div>
              )}
            </Card>
          );
        })}
        {results.length === 0 && (
          <Card className="py-10 text-center text-sm text-muted">
            Nothing matches those filters — loosen one and try again.
          </Card>
        )}
      </div>
    </div>
  );
}

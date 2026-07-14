"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ModulePage } from "@/components/modules/ModulePage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INTERVIEW_QA } from "@/data/interviewQA";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "behavioral", label: "Behavioral" },
  { id: "hr", label: "HR" },
  { id: "technical", label: "Technical" },
  { id: "research", label: "Research" },
  { id: "project", label: "Project" },
  { id: "resume", label: "Resume" },
] as const;

function QABank() {
  const [category, setCategory] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);

  const items =
    category === "all" ? INTERVIEW_QA : INTERVIEW_QA.filter((q) => q.category === category);

  return (
    <div className="mt-10 pb-6">
      <h2 className="text-lg font-bold">Question Bank with Model Answers</h2>
      <p className="mt-1 text-sm text-muted">
        Curated for an IITB Aerospace M.Tech profile — behavioral, HR, research and project
        discussion answers you can adapt.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              category === c.id
                ? "bg-primary text-white dark:text-slate-950"
                : "glass text-muted hover:text-foreground"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {items.map((qa) => {
          const isOpen = open === qa.id;
          return (
            <Card key={qa.id} className="p-0">
              <button
                className="flex w-full items-center gap-3 p-4 text-left"
                onClick={() => setOpen(isOpen ? null : qa.id)}
              >
                <Badge tone="accent" className="shrink-0 capitalize">
                  {qa.category}
                </Badge>
                <p className="flex-1 text-sm font-semibold">{qa.question}</p>
                <ChevronDown
                  size={16}
                  className={cn("shrink-0 transition-transform", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <p className="whitespace-pre-line rounded-xl bg-primary-soft/40 p-4 text-sm leading-relaxed">
                    {qa.answer}
                  </p>
                  {qa.tips && (
                    <p className="mt-2 rounded-xl bg-warning/10 p-3 text-xs">
                      <b>Mentor tip:</b> {qa.tips}
                    </p>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function InterviewPage() {
  return (
    <ModulePage
      module="interview"
      tagline="Mock technical rounds plus a model-answer bank for behavioral, HR, research and project questions."
    >
      <QABank />
    </ModulePage>
  );
}

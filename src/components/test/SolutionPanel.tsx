import type { Question } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

/** Full worked solution shown after submission (and in search preview). */
export function SolutionPanel({ question }: { question: Question }) {
  const s = question.solution;
  return (
    <div className="mt-3 rounded-xl bg-primary-soft/40 p-4 text-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        Step-by-step solution
      </p>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        {s.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <div className="mt-3 grid gap-2 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Concept</p>
          <p className="mt-0.5">{s.concept}</p>
        </div>
        {s.formula && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Formula</p>
            <p className="mt-0.5 font-mono text-[13px]">{s.formula}</p>
          </div>
        )}
        {s.altMethod && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Alternative method
            </p>
            <p className="mt-0.5">{s.altMethod}</p>
          </div>
        )}
        {s.memoryTrick && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Memory trick 💡
            </p>
            <p className="mt-0.5">{s.memoryTrick}</p>
          </div>
        )}
      </div>

      {s.commonMistakes && s.commonMistakes.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-danger">
            Common mistakes
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {s.commonMistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      {s.related && (
        <p className="mt-3 text-xs text-muted">
          <span className="font-semibold">Similar previous-year question:</span> {s.related}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {question.source && <Badge tone="accent">{question.source}</Badge>}
        {question.companies?.map((c) => (
          <Badge key={c}>{c}</Badge>
        ))}
        {question.tags?.map((t) => (
          <Badge key={t} tone="neutral" className="opacity-70">
            #{t}
          </Badge>
        ))}
      </div>
    </div>
  );
}

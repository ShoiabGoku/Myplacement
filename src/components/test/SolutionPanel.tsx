import type { Question } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { relabelOptionRefs } from "@/lib/optionOrder";

/**
 * Full worked solution shown after submission (and in search preview).
 * `order` is the attempt's option display order, so "option B" in the text
 * names the letter the student saw; omit it for source order.
 */
export function SolutionPanel({ question, order }: { question: Question; order?: number[] }) {
  const s = question.solution;
  const t = (text: string) => relabelOptionRefs(text, order);
  return (
    <div className="mt-3 rounded-xl bg-primary-soft/40 p-4 text-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        Step-by-step solution
      </p>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        {s.steps.map((step, i) => (
          <li key={i}>{t(step)}</li>
        ))}
      </ol>

      <div className="mt-3 grid gap-2 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Concept</p>
          <p className="mt-0.5">{t(s.concept)}</p>
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
            <p className="mt-0.5">{t(s.altMethod)}</p>
          </div>
        )}
        {s.memoryTrick && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Memory trick 💡
            </p>
            <p className="mt-0.5">{t(s.memoryTrick)}</p>
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
              <li key={i}>{t(m)}</li>
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

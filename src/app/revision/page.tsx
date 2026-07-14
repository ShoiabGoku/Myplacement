"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronDown, Layers, RotateCw, Shuffle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FORMULA_SECTIONS } from "@/data/formulas";
import { MODULE_LABELS } from "@/data/questions";
import { cn } from "@/lib/utils";

type Mode = "handbook" | "flashcards";

interface Flashcard {
  front: string;
  back: string;
  note?: string;
  topic: string;
}

function buildDeck(): Flashcard[] {
  return FORMULA_SECTIONS.flatMap((s) =>
    s.items.map((i) => ({ front: i.name, back: i.formula, note: i.note, topic: s.topic }))
  );
}

function Flashcards() {
  const [deck, setDeck] = useState<Flashcard[]>(buildDeck);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const card = deck[index];
  const next = () => {
    setRevealed(false);
    setIndex((i) => (i + 1) % deck.length);
  };
  const shuffle = () => {
    setDeck((d) => [...d].sort(() => Math.random() - 0.5));
    setIndex(0);
    setRevealed(false);
  };

  return (
    <div className="mx-auto mt-6 max-w-xl">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          Card {index + 1} / {deck.length}
        </span>
        <button onClick={shuffle} className="flex items-center gap-1 hover:text-foreground">
          <Shuffle size={13} /> Shuffle
        </button>
      </div>
      <motion.button
        key={`${index}-${revealed}`}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onClick={() => setRevealed((r) => !r)}
        className="glass mt-3 flex min-h-56 w-full flex-col items-center justify-center rounded-2xl p-8 text-center"
      >
        <Badge tone="accent">{card.topic}</Badge>
        {revealed ? (
          <>
            <p className="mt-4 font-mono text-xl font-bold">{card.back}</p>
            {card.note && <p className="mt-3 text-sm text-muted">{card.note}</p>}
          </>
        ) : (
          <>
            <p className="mt-4 text-xl font-semibold">{card.front}</p>
            <p className="mt-3 text-xs text-muted">tap to reveal</p>
          </>
        )}
      </motion.button>
      <div className="mt-4 flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setRevealed((r) => !r)}>
          <RotateCw size={14} /> Flip
        </Button>
        <Button size="sm" onClick={next}>
          Next card
        </Button>
      </div>
    </div>
  );
}

export default function RevisionPage() {
  const [mode, setMode] = useState<Mode>("handbook");
  const [query, setQuery] = useState("");
  const [openSection, setOpenSection] = useState<string | null>(FORMULA_SECTIONS[0].topic);

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FORMULA_SECTIONS;
    return FORMULA_SECTIONS.map((s) => ({
      ...s,
      items: s.items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.formula.toLowerCase().includes(q) ||
          (i.note ?? "").toLowerCase().includes(q)
      ),
    })).filter((s) => s.items.length > 0);
  }, [query]);

  return (
    <div className="mx-auto max-w-4xl pb-10">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Revision</h1>
      <p className="mt-1 text-sm text-muted">
        Formula handbook, one-liners and flashcards — built for last-minute sweeps before a test.
      </p>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setMode("handbook")}
          className={cn(
            "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold",
            mode === "handbook" ? "bg-primary text-white dark:text-slate-950" : "glass text-muted"
          )}
        >
          <BookOpen size={15} /> Handbook
        </button>
        <button
          onClick={() => setMode("flashcards")}
          className={cn(
            "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold",
            mode === "flashcards" ? "bg-primary text-white dark:text-slate-950" : "glass text-muted"
          )}
        >
          <Layers size={15} /> Flashcards
        </button>
      </div>

      {mode === "flashcards" ? (
        <Flashcards />
      ) : (
        <>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter formulas… e.g. 'shock', 'clock', 'complexity'"
            className="glass mt-5 w-full rounded-xl px-4 py-2.5 text-sm outline-none"
          />
          <div className="mt-4 flex flex-col gap-3">
            {sections.map((s) => {
              const open = openSection === s.topic || query.trim() !== "";
              return (
                <Card key={s.topic} className="p-0">
                  <button
                    className="flex w-full items-center justify-between p-4"
                    onClick={() => setOpenSection(open ? null : s.topic)}
                  >
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{s.topic}</p>
                      <Badge tone="accent">{MODULE_LABELS[s.module]}</Badge>
                    </div>
                    <ChevronDown
                      size={16}
                      className={cn("transition-transform", open && "rotate-180")}
                    />
                  </button>
                  {open && (
                    <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
                      {s.items.map((i) => (
                        <div key={i.name} className="rounded-xl bg-primary-soft/40 p-3">
                          <p className="text-xs font-semibold text-muted">{i.name}</p>
                          <p className="mt-1 font-mono text-sm font-semibold">{i.formula}</p>
                          {i.note && <p className="mt-1 text-xs text-muted">{i.note}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

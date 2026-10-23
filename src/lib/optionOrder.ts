import type { Question } from "./types";

/**
 * Per-attempt option shuffling.
 *
 * The question banks store options in authoring order, which leaves the key
 * predictable (most MCQs key option B). Instead of touching the data, each
 * attempt carries a random `optionSeed`, and the runner and results review
 * render options in the order returned by `optionOrder`. Answers are always
 * recorded as ORIGINAL option indices, so scoring never sees the permutation.
 */

/** Options that conventionally hold their slot ("No error", "None of these"). */
const PINNED = /^(no error|none of (the )?(above|these)|all of (the )?(above|these)|cannot be determined|can['’]?t be determined|both .*above|neither .*above)\b/i;

/** Options that are bare labels for parts of the stem ("A", "Part B", "(C)"). */
const LABEL = /^(part|statement)?\s*\(?[A-E]\)?\.?$/i;

/** Fresh random seed for a new attempt. */
export function newOptionSeed(): number {
  return Math.floor(Math.random() * 0x100000000);
}

/** FNV-1a hash, so every question in an attempt gets its own stream. */
function hash(seed: number, s: string): number {
  let h = (0x811c9dc5 ^ seed) >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/** mulberry32 PRNG: small, fast, deterministic for a given seed. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Display order of a question's options: `order[displayPos] = originalIndex`.
 * Identity when there is no seed (attempts saved before shuffling existed, or
 * a plain question browser) and for questions whose options are labels of the
 * stem. Pinned options keep their original slot; the rest are permuted.
 */
export function optionOrder(q: Question, seed: number | undefined): number[] {
  const n = q.options?.length ?? 0;
  const order = Array.from({ length: n }, (_, i) => i);
  if (seed === undefined || n < 2) return order;
  const opts = q.options!;
  const free = order.filter((i) => !PINNED.test(opts[i].trim()));
  if (free.length < 2 || free.every((i) => LABEL.test(opts[i].trim()))) return order;

  const shuffled = [...free];
  const rand = rng(hash(seed, q.id));
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  free.forEach((slot, k) => (order[slot] = shuffled[k]));
  return order;
}

/** Letter shown for an original option index under a given display order. */
export function displayLetter(order: number[], original: number): string {
  const pos = order.indexOf(original);
  return String.fromCharCode(65 + (pos < 0 ? original : pos));
}

/**
 * Rewrite "option B"-style references in solution text so they name the
 * letter the student actually saw.
 */
export function relabelOptionRefs(text: string, order: number[] | undefined): string {
  if (!order) return text;
  return text.replace(/\b(options?|choices?)(\s+)([A-E])\b/g, (m, word, sp, letter) => {
    const original = letter.charCodeAt(0) - 65;
    return original < order.length ? `${word}${sp}${displayLetter(order, original)}` : m;
  });
}

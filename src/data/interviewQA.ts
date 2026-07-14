import type { InterviewQA } from "@/lib/types";

/**
 * Browsable interview Q&A bank with model answers, tailored to an
 * IIT Bombay M.Tech Aerospace profile targeting both core and non-core roles.
 */
export const INTERVIEW_QA: InterviewQA[] = [
  {
    id: "qa-001",
    category: "behavioral",
    question: "Tell me about yourself.",
    answer:
      "Structure: present → past → future, 90 seconds. \"I'm an M.Tech Aerospace student at IIT Bombay specializing in [your area]. My thesis works on [one-line problem + result]. Before this, my B.Tech project on [X] got me into [field]. I enjoy problems at the intersection of physics and computation — which is why this role at [company], working on [their domain], is exactly where I want to go deep.\"",
    tips: "Never recite your resume. End pointing at THEIR role so the interviewer's next question is easy.",
  },
  {
    id: "qa-002",
    category: "behavioral",
    question: "Tell me about a time you failed.",
    answer:
      "Use STAR with a real technical failure: \"My CFD validation case diverged two weeks before a review (S). I owned the debugging (T). I isolated it to a mesh-quality issue by bisecting the changes, rebuilt the boundary layer mesh, and added an automated y+ check to the pipeline (A). The case converged, and the check caught two later regressions (R).\" Close with the lesson, not the excuse.",
    tips: "Pick failures with a recovery you drove. Never blame teammates or tools.",
  },
  {
    id: "qa-003",
    category: "behavioral",
    question: "Describe a conflict with a teammate and how you resolved it.",
    answer:
      "\"During our group project, a teammate and I disagreed on solver choice — he wanted commercial, I wanted open-source for reproducibility (S). Rather than escalate, I proposed we benchmark both on a reduced case over a weekend (A). The data showed comparable accuracy and we chose based on license cost. We shipped on time and reused the benchmark harness later (R).\"",
    tips: "Show you moved the disagreement from opinions to evidence. That is the answer they want.",
  },
  {
    id: "qa-004",
    category: "hr",
    question: "Why should we hire you?",
    answer:
      "Match three of their needs to three of your proofs: \"You need someone who can [requirement 1] — my thesis did exactly that at [scale]. You need [requirement 2] — I've done it in [project]. And you need someone who ramps fast — I went from zero to [skill] in [time] during [event].\" One sentence each, then stop.",
    tips: "Research the JD keywords beforehand; mirror their exact vocabulary.",
  },
  {
    id: "qa-005",
    category: "hr",
    question: "Where do you see yourself in five years?",
    answer:
      "\"In five years I want to be the person this team trusts with its hardest [domain] problems — a deep individual contributor with 2-3 shipped systems behind me, starting to mentor juniors. Long term I care about staying close to the engineering, not drifting into pure management.\"",
    tips: "Ambitious but anchored to THEIR growth ladder. Avoid 'your chair' jokes and avoid mentioning higher studies in placement interviews.",
  },
  {
    id: "qa-006",
    category: "hr",
    question: "Are you willing to relocate? / Why this location?",
    answer:
      "If yes, say yes plainly and add a reason: \"Yes — Bengaluru is where India's aerospace ecosystem is concentrated, and I'd rather be near the hardware.\" If you have constraints, state them honestly but flexibly.",
    tips: "Hesitation here has cost real offers. Decide your answer before the interview, not during.",
  },
  {
    id: "qa-007",
    category: "hr",
    question: "What are your salary expectations?",
    answer:
      "For campus placements, defer to the declared CTC: \"I understand the role has a defined band for this campus and I'm comfortable with it — the work and team matter more to me at this stage.\" For lateral/off-campus: give a researched range, not a single number, and let them speak first if possible.",
    tips: "Never negotiate before an offer exists.",
  },
  {
    id: "qa-008",
    category: "research",
    question: "Explain your thesis to a non-expert in one minute.",
    answer:
      "Formula: everyday analogy → problem → your contribution → why it matters. \"When air flows faster than sound, it forms shock waves — like the crack of a whip. Predicting where they sit on a vehicle decides whether it survives re-entry. My work makes that prediction [faster/more accurate] by [method], which means [impact: cheaper design cycles / better margins].\"",
    tips: "Practice this out loud. Research interviewers use it to test whether YOU understand it, not the listener.",
  },
  {
    id: "qa-009",
    category: "research",
    question: "Why research / why an R&D role instead of pure software?",
    answer:
      "\"I've done both — [software project] taught me I'm fastest and happiest when the code serves a physical question. R&D lets me keep the rigor of research with the deadline discipline of engineering. The problems at [org] — [name one] — are exactly that mix.\"",
    tips: "Concrete beats passionate. Name one of their actual projects or papers.",
  },
  {
    id: "qa-010",
    category: "research",
    question: "A result in your paper/report contradicts the interviewer's intuition. They push back hard. What do you do?",
    answer:
      "Defend with data, not volume: restate their concern to show you understood it, present the validation evidence (grid convergence, experimental comparison, limiting cases), and — critically — state the conditions under which they WOULD be right. If you don't know, say \"I haven't tested that regime; here's how I would.\"",
    tips: "Research interviews often stage this deliberately to test intellectual honesty under pressure.",
  },
  {
    id: "qa-011",
    category: "project",
    question: "What was the hardest technical decision in your project?",
    answer:
      "Pick a genuine trade-off: \"Choosing between an implicit solver (stable but memory-hungry) and explicit (cheap per step but CFL-limited). I estimated both costs on our cluster budget, prototyped the riskier one for a week with a kill criterion, and committed. The write-up of that analysis became a section of my report.\"",
    tips: "Decisions show engineering maturity better than any success story.",
  },
  {
    id: "qa-012",
    category: "project",
    question: "If you restarted your project today, what would you do differently?",
    answer:
      "Give 2-3 specific improvements: \"Automate the validation pipeline from day one instead of month four; freeze the geometry earlier; and log every run's config — I lost a week reconstructing which mesh produced which plot.\" Then one thing you'd keep, to show it wasn't all luck.",
    tips: "'Nothing' is the only wrong answer. Reflection is the skill being tested.",
  },
  {
    id: "qa-013",
    category: "resume",
    question: "I see [skill/tool] on your resume. Rate yourself and justify it.",
    answer:
      "Rate honestly with evidence and a boundary: \"Python — 8/10: I've written a 5k-line solver package with tests and profiling. But I haven't done async or web backends, which is why not higher.\" The boundary statement is what makes the 8 credible.",
    tips: "Anything on your resume is fair game for a deep-dive. Prune what you can't defend for 10 minutes.",
  },
  {
    id: "qa-014",
    category: "resume",
    question: "Your grades dropped in [semester]. What happened?",
    answer:
      "One honest sentence of cause, one of correction, then redirect: \"I overcommitted to [activity/health issue] and my grades dipped. I rebalanced the next semester and my CPI recovered to [X]. That semester also taught me how I manage load, which is why I now [system you use].\"",
    tips: "No excuses longer than one sentence. Interviewers respect recovery curves more than flat lines.",
  },
  {
    id: "qa-015",
    category: "technical",
    question: "How would you approach a technical question you don't know the answer to?",
    answer:
      "Narrate a first-principles attack: restate the problem, write the governing relations you DO know, bound the answer with limiting cases, state assumptions, and compute an estimate. Interviewers pass people who reason transparently and fail people who guess silently or bluff.",
    tips: "The phrase \"I don't know, but here's how I'd figure it out\" followed by an actual attempt is a green flag in every core interview.",
  },
  {
    id: "qa-016",
    category: "technical",
    question: "Estimate the lift force on a cruising A320 (Fermi problem).",
    answer:
      "Lift = weight in cruise. A320 max takeoff ≈ 78 t, typical cruise ≈ 65 t → L ≈ 65,000 × 9.81 ≈ 640 kN. Sanity check via L = ½ρV²SCL: at 11 km (ρ≈0.36), V≈230 m/s, S=122 m² → CL ≈ 0.55 — plausible. State both routes; the cross-check is what earns the points.",
    tips: "Memorize anchor numbers: A320 ~70t, S~122 m², cruise M0.78, ρ at 11 km ≈ 0.36 kg/m³.",
  },
  {
    id: "qa-017",
    category: "hr",
    question: "Do you have any questions for us?",
    answer:
      "Always have two: one about the work (\"What does the first six months of a new hire on this team look like?\") and one about growth (\"What separates the people who thrive here from those who don't?\"). Skip questions answerable by the website, and skip salary/leave in round one.",
    tips: "This question is scored. 'No questions' reads as low interest.",
  },
  {
    id: "qa-018",
    category: "behavioral",
    question: "Why are you moving from core aerospace to software/data roles? (or vice versa)",
    answer:
      "Frame as convergence, not escape: \"Modern aerospace IS software — my thesis was 80% building computational tools. I'm not leaving aerospace; I'm doubling down on the part of it I'm best at. The same applies in reverse: my physics background is why my models don't fail silently.\"",
    tips: "Never say 'core has no jobs'. Recruiters from both sides hear it as lack of conviction.",
  },
];

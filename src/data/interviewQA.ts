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

  // ---------- Airbus India — Associate Engineer, Flight Physics ----------
  {
    id: "qa-019",
    category: "hr",
    question: "Airbus FP — Why Airbus, and why Flight Physics?",
    answer:
      "Tie three JD lines to three proofs, then say what you want to learn. \"Flight Physics sits where my work already is: I've built drag polars in OpenVSP/VSPAERO (AE 705), validated CFD against wind-tunnel data during my IIT Bhubaneswar internship, and my M.Tech thesis is aerothermodynamic modelling with Fluent. Airbus is where those pieces become certified data — aero datasets, loads and performance that an aircraft is actually certified on — and where sustainable-aviation work (laminar flow, load alleviation, hydrogen, SAF) needs exactly that integrated view. I want to learn how wind tunnel, CFD and flight test are fused into one dataset.\"",
    tips: "Use the department's own words: aero data production, external loads, low-speed performance certification, model validation. Avoid brand or salary answers.",
  },
  {
    id: "qa-020",
    category: "technical",
    question: "Airbus FP — Walk me through what happens aerodynamically as an airliner accelerates from M 0.70 to M 0.85.",
    answer:
      "1) Up to ~M_crit the flow is subsonic everywhere; C_L at fixed α rises roughly as 1/√(1−M²). 2) Past M_crit a supersonic pocket forms on the upper surface, ending in a shock. 3) As Mach rises the shock strengthens and moves aft; wave drag appears and grows rapidly beyond the drag-divergence Mach (ΔC_D ≈ 0.002 definition). 4) Strong shocks cause shock-induced separation → buffet, nose-down 'Mach tuck', reduced control effectiveness. 5) Design answers: sweep (M·cosΛ), supercritical sections, area ruling, and keeping a 1.3 g buffet margin — which with the low-speed stall boundary closes the coffin corner at altitude.",
    tips: "Draw the C_D vs M curve and a Cp plot with a shock while you talk — it shows you can communicate as well as know.",
  },
  {
    id: "qa-021",
    category: "technical",
    question: "Airbus FP — Explain V1, VR and V2. What happens if an engine fails just before versus just after V1?",
    answer:
      "V1 is the decision speed: the maximum speed at which the first stopping action must be taken to stop within the accelerate-stop distance, and the minimum speed at which, after an engine failure at V_EF, the takeoff can be continued to 35 ft within the takeoff distance. VR is the rotation speed (≥ V1, ≥ 1.05 V_MCA). V2 is the takeoff safety speed reached by 35 ft (≥ 1.13 V_SR and ≥ 1.10 V_MCA), flown in the OEI second segment at ≥ 2.4% gradient for a twin. Failure before V1 → reject: the aircraft can stop on the remaining runway. After V1 → continue: stopping is no longer guaranteed, but the OEI climb-out is. Balanced V1 makes the two distances equal; V1 ≥ V_MCG, ≤ V_MBE.",
    tips: "Interviewers love the follow-up 'why can't V1 be below V_MCG?' — because the aircraft would leave the runway before it could continue safely.",
  },
  {
    id: "qa-022",
    category: "technical",
    question: "Airbus FP — How would you compute the loads on a wing during a gust encounter?",
    answer:
      "Start simple, then be honest about what certification actually needs. Quasi-static (Pratt): Δn = ρ₀U_de V_e a K_g/(2W/S), with K_g for the aircraft's plunge response. CS-25 today: dynamic analysis of the FLEXIBLE aircraft. (1) Discrete 1−cos gusts with gradient H from 30–350 ft, amplitude U_ds = U_ref F_g (H/350)^(1/6), swept in H to find the tuned gust for every load quantity. (2) Continuous turbulence with a von Kármán PSD, giving loads from the frequency response and Ā. The model couples rigid-body flight mechanics, structural modes (FE), unsteady aerodynamics (doublet lattice) and the flight-control laws (load alleviation). Results feed loads envelopes (potato plots) per wing station.",
    tips: "Mention that the aircraft's control laws are part of the loads model — that shows you understand a modern FBW aircraft.",
  },
  {
    id: "qa-023",
    category: "technical",
    question: "Airbus FP — What is flutter, and how is an airliner shown to be free of it?",
    answer:
      "Flutter is a self-excited aeroelastic instability where aerodynamic forces couple structural modes (classically wing bending and torsion) so that damping goes negative above the flutter speed. Prevention: stiffness (torsion box), mass distribution (sectional CG ahead of the elastic axis, mass-balanced control surfaces, engines forward of the wing), frequency separation, and stiff actuators with redundancy. Showing compliance (CS-25.629): FE dynamic model updated with the Ground Vibration Test, flutter analysis (e.g. p-k method) showing no instability up to 1.15 × V_D/M_D including failure cases, then flight flutter tests expanding the envelope with excitation and damping trends.",
    tips: "Contrast flutter (dynamic, self-excited) with divergence (static, mass-independent) and buffeting (forced response) — that's the usual follow-up.",
  },
  {
    id: "qa-024",
    category: "technical",
    question: "Airbus FP — How would you build the aerodynamic dataset for a new aircraft?",
    answer:
      "Structure: basic clean aircraft C_L, C_D, C_m, C_Y, C_l, C_n against α, β, Mach; increments for high-lift, gear, spoilers, control surfaces, ground effect; rate derivatives (C_mq, C_lp, C_nr). Sources: wind-tunnel sweeps form the backbone (low-speed and high-speed tunnels, ETW for Reynolds), corrected for walls, supports and Re; CFD for Re scaling, flexibility (rigid-to-flex corrections), configuration deltas and gaps; flight test at the end, with parameter identification to update the model. Deliverables carry uncertainties and are validated end-to-end: trim, performance and handling checks in simulation before the data is used for loads, performance and the simulators.",
    tips: "Say 'traceability': every number in the dataset must be traceable to its source and version.",
  },
  {
    id: "qa-025",
    category: "technical",
    question: "Airbus FP — Your CFD drag is 10 counts below the wind-tunnel value. How do you investigate?",
    answer:
      "Like-for-like first: same geometry (support/sting, trip strips, gaps), same Mach, α (after wall corrections), Reynolds number and transition state (free vs fixed), and the same reference area and moment reference. Then CFD numerics: grid convergence (Richardson/GCI), y⁺, turbulence model, convergence of forces. Then test uncertainty: repeatability, balance accuracy, corrections. Break the drag down (pressure vs friction; component build-up) to localise the gap. Only after that conclude which side is right — and fix the root cause, not by adding a blanket 10-count offset.",
    tips: "This tests problem-solving structure more than CFD trivia. Speak in a clear checklist.",
  },
  {
    id: "qa-026",
    category: "technical",
    question: "Airbus FP — How do you validate a flight simulation model against flight test?",
    answer:
      "Integration first (verification): consistent units, axes and sign conventions; trims at known conditions; doublet responses with the right sign and magnitude. Then validation: replay flight-test manoeuvres with the measured control inputs and initial conditions (and reconstructed wind), compare time histories of α, q, n_z, speeds and attitudes against tolerance bands (proof-of-match). Where it fails, use parameter identification (output-error / maximum likelihood with 3-2-1-1 or doublet inputs) to update derivatives, checking the corrections are physically plausible. Re-check across the envelope so you don't overfit one condition.",
    tips: "Distinguish verification (built right) from validation (right model) — and mention that you did exactly that distinction in CFD during your internship.",
  },
  {
    id: "qa-027",
    category: "technical",
    question: "Airbus FP — What is MZFW, and why does the wing care about it?",
    answer:
      "Maximum Zero-Fuel Weight: the heaviest the aircraft may be with no usable fuel. Wing fuel and wing-mounted engines provide inertia relief — their weight acts along the span and cancels part of the lift's bending moment at the wing root. With empty wing tanks the same total weight sits in the fuselage, so wing-root bending in a manoeuvre or gust is highest. MZFW therefore caps payload to protect the wing; any extra takeoff weight must be wing fuel. It also shapes the payload–range diagram and loading instructions.",
    tips: "A follow-up is often 'why fuel the centre tank last / burn it first?' — same inertia-relief logic.",
  },
  {
    id: "qa-028",
    category: "project",
    question: "Airbus FP — Your thesis is hypersonic aerothermodynamics. How does that prepare you for subsonic flight physics?",
    answer:
      "Bridge the methods, not the Mach number (adapt to exactly what you did): \"The physics is different, the workflow isn't. My thesis uses compressible CFD in Fluent where near-wall resolution decides the heat flux, with checks against the Fay–Riddell correlation — the same verification/validation discipline an aero dataset needs. My AE 705 work built a G-550 drag polar in OpenVSP, which is aero data production in miniature, and my JAL 123 fatigue study is a loads/structures story. My wind-tunnel internship taught me corrections and why CFD and experiment disagree.\"",
    tips: "Prepare a 30-second and a 2-minute version. Expect a deep probe on whatever you mention (Fay–Riddell, catalytic walls, Lewis number).",
  },
  {
    id: "qa-029",
    category: "behavioral",
    question: "Airbus FP — Tell me about a time you questioned or challenged an accepted result.",
    answer:
      "Template — fill with a REAL episode (e.g. from your wind-tunnel/CFD internship or thesis): \"[Result or assumption] was taken as correct, but [what didn't add up] (S). I took on checking it (T). I [compared like-for-like / did a hand calculation / ran a grid study / checked the literature] (A). It turned out [it was wrong because … / it was right, and now we knew why], and I [added a check, wrote it up, automated a test] so it wouldn't recur (R).\" A story where the original result was confirmed is fine — the method is what's scored.",
    tips: "This maps to the JD's 'inquisitiveness to understand, challenge and improve'. Respectful + evidence-based is the key signal. Never invent details — panels probe them.",
  },
  {
    id: "qa-030",
    category: "behavioral",
    question: "Airbus FP — Describe something you automated with a script.",
    answer:
      "Template — use a real script and your real numbers: \"For [thesis / course project] I had to [repeat task, e.g. set up and post-process many Fluent cases]. I wrote a [Python / MATLAB / bash] script that [generated inputs, launched runs in batch, extracted results into one table and plots]. It cut [task] from [X] to [Y] and made every result reproducible from its config.\" Mention the tools (Python, bash loops, grep/awk on logs) and the safeguard you built in (e.g. automatic convergence or y⁺ checks).",
    tips: "The JD lists MATLAB, Python, UNIX, scripting and automation — a concrete automation story ticks all of them.",
  },
  {
    id: "qa-031",
    category: "technical",
    question: "Airbus FP — What do you know about Airbus' approach to sustainable aviation?",
    answer:
      "Frame it with Breguet: fuel burn falls through better engines (η₀ — higher bypass, open-fan studies), better aerodynamics (L/D — span, laminar flow, load alleviation enabling longer wings, wake-energy retrieval such as fello'fly) and lighter structures (composites — the A350 is 53% composite). The energy carrier changes too: SAF (all Airbus aircraft certified for up to 50% blends, working towards 100%) and hydrogen concepts (ZEROe). Operations matter: optimal trajectories, contrail avoidance. Flight Physics touches nearly all of these.",
    tips: "Keep claims to what you can defend. If unsure of a date or figure, describe the principle instead.",
  },
  {
    id: "qa-032",
    category: "technical",
    question: "Airbus FP — Why does an Airbus have fly-by-wire envelope protection, and what are the normal-law protections?",
    answer:
      "FBW lets the control law define what the stick means: in pitch normal law the sidestick demands load factor, the aircraft holds 1 g flight path with neutral stick and auto-trims. Protections let a pilot apply full stick in an emergency without overstressing or stalling: load-factor limitation (+2.5/−1 g clean, +2/0 g with flaps), pitch-attitude protection, high-α protection (α-prot, α-max, α-floor commanding TOGA through autothrust), high-speed protection, and bank-angle protection (67°). With failures the laws degrade to alternate and direct (stick → surface, no protections).",
    tips: "Link it to flight physics: the control laws are designed on the aero model, and loads/performance analyses must include them.",
  },
  {
    id: "qa-033",
    category: "behavioral",
    question: "Airbus FP — Tell me about working in a team with people from different backgrounds.",
    answer:
      "Airbus stresses diverse, multinational teams. Use a real example — e.g. a fest or placement-coordination team you led as Interview Coordinator or Logistics Convener, or a project with people from other disciplines: what was different (expertise, language, working style), what you did to align (shared goals, written plans, regular short check-ins, using each person's strengths) and the result. End with what you learned about collaborating across differences.",
    tips: "The JD repeats 'teamwork and collaboration'. Show listening and adapting, not just leading.",
  },
  {
    id: "qa-034",
    category: "technical",
    question: "Airbus FP — Estimate the takeoff ground roll of an A320 from first principles.",
    answer:
      "Assume m ≈ 70 t (W ≈ 690 kN), two engines ≈ 2 × 120 kN static, about 200 kN averaged over the roll. V_LOF ≈ 1.2 × V_S with takeoff CLmax ≈ 2.2, S = 122.6 m²: V_S = √(2W/(ρS·CLmax)) = √(1.38×10⁶/(1.225×122.6×2.2)) ≈ 64 m/s → V_LOF ≈ 77 m/s. Mean acceleration ≈ (T − D − μ(W − L))/m ≈ 2.5 m/s². s ≈ V²/(2a) ≈ 77²/5 ≈ 1200 m. Real A320 field lengths of 1.8–2.1 km include the air segment to 35 ft and the certification factors (OEI, 115% AEO), so the estimate is plausible.",
    tips: "Interviewers grade the structure and sanity checks, not the exact number.",
  },
];

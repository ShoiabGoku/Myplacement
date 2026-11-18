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

  // ---------- Tesla — Supplier Industrialization Engineer (Mechanical) ----------
  {
    id: "qa-035",
    category: "hr",
    question: "Tesla SIE — You're an aerospace M.Tech. Why a supplier industrialization role at Tesla?",
    answer:
      "Template — tie three JD lines to three real proofs, then say what you want to learn: \"The role takes parts from tool design to stable mass production at suppliers. My B.Tech project was a manufacturing problem — I made banana–glass composite laminates by compression molding and studied how stacking sequence changed impact behaviour, so I've lived with process windows, defects and testing. My M.Tech work is simulation-heavy (CFD in Fluent), the same mindset as reading casting, forming and mold-flow simulation. And I've done the measurement side — validating models against experiments. What I want to learn is high-volume manufacturing at Tesla's pace: qualification, root cause and ramp.\" Adapt every detail to what you actually did.",
    tips: "Never say 'aerospace has no jobs'. Show you read the JD: TPQP, PPAP, capability data, PCRs, ramp targets.",
  },
  {
    id: "qa-036",
    category: "technical",
    question: "Tesla SIE — Walk me through qualifying a new high-pressure die-cast part at a supplier.",
    answer:
      "1) Sourcing: confirm capability — press tonnage vs projected area × intensification pressure, vacuum, die shop, melt/degassing control, X-ray/CT, heat treat, machining, metrology, capacity, IATF 16949. 2) Design review: DFM feedback on gating, overflows, thermal management, draft, wall uniformity, porosity risk at sealing faces, datum targets and machining allowances; review flow/solidification simulation (MAGMA/Flow-3D). 3) Quality planning (TPQP): define deliverables — DFMEA/PFMEA, process flow, control plan, MSA, dimensional layout, material certs, CT porosity criteria, capability studies. 4) Tool build and trials: track milestones, T1 samples, FAI against the ballooned drawing, corrections (steel-safe). 5) Validation: Ppk on special characteristics (≥ 1.67), run-at-rate, PPAP-style submission review — approve, reject or request revisions. 6) Ramp: OEE, scrap and yield targets, containment until stable, then PCRs for any later change.",
    tips: "Structure beats detail: sourcing → design review → quality planning → tool trials → validation → ramp.",
  },
  {
    id: "qa-037",
    category: "technical",
    question: "Tesla SIE — Porosity starts showing up on a machined sealing face of a cast housing in production. How do you handle it?",
    answer:
      "Containment first: quarantine suspect stock at the supplier, in transit and at Tesla; 100% leak test or CT/X-ray sort; mark certified-good parts. Then 8D: describe the problem precisely (which cavity, where on the face, since when, which lots — Is/Is-Not). Check what changed: alloy lot and hydrogen (density index), degassing, die temperature and cooling lines, spray, intensification pressure/timing, vacuum performance, shot-sleeve fill, machining depth into the core. Section and CT failed parts to tell gas porosity (round) from shrinkage (dendritic) — they have different fixes. Verify the root cause by switching it on and off, implement the fix, confirm with capability and leak data, and update PFMEA and control plan (D7). Impregnation is only acceptable as an approved, controlled step.",
    tips: "Say 'containment' in the first sentence. Panels test whether you protect the customer before investigating.",
  },
  {
    id: "qa-038",
    category: "technical",
    question: "Tesla SIE — How do you assess a supplier's capability during sourcing?",
    answer:
      "Technical fit: equipment that can physically make the part (press/machine tonnage, bed size, shot size, axes, hot-stamping furnace, molding tonnage and barrel size). Process control: melt or material handling (drying, degassing), thermal control, documented parameters, SPC. Tooling: in-house die/mold shop, maintenance, spare inserts. Quality: IATF 16949, metrology (CMM, scanning, CT), lab testing, MSA practice, past PPAP and field performance. Capacity: free hours after other customers' load, cycle times, cavitation, shifts and realistic OEE against peak demand. Downstream steps: heat treat, machining, coating, impregnation. Finish with a risk summary and what to verify later with a run-at-rate.",
    tips: "Use one concrete example for your track (e.g. tonnage curve for stamping, clamp force for HPDC, shot size for molding).",
  },
  {
    id: "qa-039",
    category: "technical",
    question: "Tesla SIE — Explain Cp and Cpk, and why a Cpk of 1.0 is a problem.",
    answer:
      "Cp = (USL − LSL)/6σ compares tolerance width with process spread; Cpk = min(USL − μ, μ − LSL)/3σ also accounts for centring. Cpk 1.0 means the nearest limit sits only 3σ from the mean: about 1350 ppm out on that side even if the process is perfectly stable, and any mean shift (tool wear, new lot) pushes far more out. That's why ongoing Cpk ≥ 1.33 and initial Ppk ≥ 1.67 are typical. If Cp is high but Cpk low, the process is off-centre — re-centre it; if Cp itself is low, reduce variation (or challenge the tolerance with design using data). Capability only means something if the process is stable (control chart) and the gauge is capable (GR&R).",
    tips: "Mention stability and MSA as preconditions — that is what separates a quality engineer from a formula reciter.",
  },
  {
    id: "qa-040",
    category: "technical",
    question: "Tesla SIE — A stamped panel splits in die tryout. How do you troubleshoot?",
    answer:
      "Locate and quantify: where is the split, what strain state (circle grid or scan) — is it in plane strain near the FLC minimum? Compare with the AutoForm prediction. Check the material: actual coil properties (n, r, yield, thickness) vs the simulation input, coating type. Check the process: blank position and shape, blank-holder force and its distribution, draw-bead height, lubrication, die radii and surface finish, press parallelism and cushion pressure. Fix by reducing restraint locally (beads, BHF), enlarging radii, improving lubrication, adjusting blank shape — while watching that wrinkles don't appear elsewhere. Confirm with strain measurement against the FLD with a safety margin, then track capability over production lots.",
    tips: "Show the trade-off: every fix for splits risks wrinkles, so you balance draw-in rather than just 'loosening' the die.",
  },
  {
    id: "qa-041",
    category: "technical",
    question: "Tesla SIE — How do you manage springback on an AHSS or aluminium part?",
    answer:
      "Springback grows with σ_y/E, so AHSS (high strength) and aluminium (E ≈ ⅓ of steel) are the worst cases. In design: add stiffening features (beads, darts, flanges), avoid long open sections. In process: compensate the die surface from simulation (iterative morphing), apply post-stretch with lock beads so the section is more uniformly plastic, restrike or coin radii, and control material variation (coil yield strength scatter changes springback). Measure parts by 3D scanning against CAD and correlate with simulation; expect several compensation loops. Capability on hole positions and trim edges after springback is what finally matters.",
    tips: "Quote the σ_y/E idea and the 'aluminium ≈ 3× steel' rule — then show the compensation loop.",
  },
  {
    id: "qa-042",
    category: "technical",
    question: "Tesla SIE — An injection-molded part warps out of tolerance. What is your root-cause approach?",
    answer:
      "Warpage is differential shrinkage. Check the three usual drivers: uneven cooling (mold temperature difference between halves, blocked or badly placed cooling lines — check with thermal imaging), wall-thickness variation (thick sections shrink more), and orientation (fibre alignment in glass-filled grades; flow length). Then the process: pack pressure and hold time (gate-freeze study), melt and mold temperatures, cooling time, and material drying/moisture. Compare against the mold-flow warp prediction. Fixes in order of cost: process window (DOE), cooling balance, gate location or sequential valve gating, part design (ribs, uniform walls), and finally steel compensation of the cavity. Validate with scanning and capability.",
    tips: "Use the phrase 'differential shrinkage' early and list cooling, thickness and orientation — interviewers listen for those three.",
  },
  {
    id: "qa-043",
    category: "technical",
    question: "Tesla SIE — Explain position tolerance at MMC with a numerical example.",
    answer:
      "Hole Ø10.0–10.2, position Ø0.10 at MMC to datums A|B|C. MMC of a hole is its smallest size, Ø10.0. If the hole is made at Ø10.15, it gains a bonus of 0.15, so its axis may be anywhere in a Ø0.25 zone around true position. The virtual condition is MMC − tolerance = Ø9.90: a fixed Ø9.90 gauge pin at true position, located on A|B|C, must enter every good hole. A CMM reports true position as 2√(Δx² + Δy²) — e.g. Δx = 0.06, Δy = 0.08 gives Ø0.20, acceptable for that Ø10.15 hole but not for a hole made at Ø10.05 (allowed Ø0.15).",
    tips: "Doing the arithmetic out loud is the fastest way to prove you really understand GD&T.",
  },
  {
    id: "qa-044",
    category: "technical",
    question: "Tesla SIE — What would you check at a tool buy-off?",
    answer:
      "Dimensional: full layout and FAI of parts from the production tool against the drawing, CMM/scan reports, capability (Ppk) on special characteristics. Process: documented, stable parameters within a validated window; parts made at production rate (run-at-rate) with production people, gauges and material. Quality system: PFMEA, control plan, MSA on the gauges used, error-proofing working. Appearance: cosmetic approval against masters for Class A parts. Tool condition: cooling, venting, wear inserts, spares, maintenance plan. Anything open goes on an action list with owners and dates before the tool is released or paid for.",
    tips: "Buy-off is about the PROCESS being capable, not one good part.",
  },
  {
    id: "qa-045",
    category: "technical",
    question: "Tesla SIE — How would you reduce the cycle time of a machined aluminium part at a supplier?",
    answer:
      "Measure first: time-study the cycle and split cutting from non-cutting time (tool changes, rapids, probing, air cutting, loading). Typical gains: adaptive/trochoidal roughing at full flute depth with higher feeds; fewer tools (combination or form tools); optimised tool order and rapids; higher speeds with PCD or polished carbide on aluminium; multi-part fixtures, tombstones or pallet changers to remove loading time; 5-axis or 3+2 to remove set-ups. Then verify that quality and tool life hold (Cpk, burrs, finish) and update the control plan — a cycle-time gain that adds scrap isn't a gain.",
    tips: "Quantify: 'non-cutting time was 35% of the cycle' sounds like someone who has actually done it.",
  },
  {
    id: "qa-046",
    category: "behavioral",
    question: "Tesla SIE — Tell me about a time you worked with an external party under deadline pressure.",
    answer:
      "Template — use a real episode (an internship, a vendor for a lab setup, a fest sponsor, a fabrication shop for your project): \"[Situation: what had to be delivered, by when, by whom outside your team.] [Task: what you owned.] [Action: how you set clear requirements, tracked progress with dates, went on site or checked samples early, escalated with options when it slipped.] [Result: delivered on time or the recovery you achieved, with a number.] What I'd do the same at a supplier: agree requirements in writing, check the first parts early, and escalate early with options.\"",
    tips: "Supplier engineers are judged on follow-through. Show you check early and escalate early — never invent details.",
  },
  {
    id: "qa-047",
    category: "project",
    question: "Tesla SIE — What from your compression-molding composites project carries over to injection molding or casting?",
    answer:
      "Template — adapt to exactly what you did: process parameters (temperature, pressure, time) define a window, and defects (voids, dry spots, delamination, warpage) trace back to them; you measured outcomes (impact behaviour, mechanical tests) and compared configurations (stacking sequence) — that is a small DOE. In injection molding the same logic appears in scientific molding (viscosity curve, gate-freeze study, process window DOE) and in casting as gating/thermal control vs porosity. Be honest that high-volume tooling and PPAP are new to you, and show you know where they fit.",
    tips: "Interviewers respect honest bridges more than claimed expertise. Expect follow-ups on void formation and cure/cooling.",
  },
  {
    id: "qa-048",
    category: "technical",
    question: "GE EEDP — Explain how a high-bypass turbofan works, component by component.",
    answer:
      "Follow the air. The fan (LP spool) accelerates a large mass flow; most of it (the bypass stream, e.g. ~10:1 on LEAP) leaves through the fan nozzle and produces most of the thrust. The core stream passes the booster (LP compressor) and the HP compressor, which raise the pressure (overall pressure ratio ~40–60) through many stages of rotor–stator diffusion. In the combustor, fuel burns at nearly constant pressure, raising the gas to ~1700–1900 K. The HP turbine (cooled, single-crystal blades with TBCs) extracts work to drive the HP compressor; the LP turbine drives the fan and booster. The remaining energy expands in the core nozzle. Thermodynamically it is a Brayton cycle: compression, constant-pressure heat addition, expansion. Thermal efficiency comes from pressure ratio and turbine temperature; propulsive efficiency comes from moving lots of air slowly (high bypass). Close with the levers: higher OPR and TIT (materials, cooling, CMCs) and higher bypass (bigger fans, open fan in RISE).",
    tips: "Draw it if there is a whiteboard: spools, stations, and where the temperature and pressure peak. Expect follow-ups: why two spools, why many compressor stages but few turbine stages, what limits TIT.",
  },
  {
    id: "qa-049",
    category: "technical",
    question: "GE EEDP — What is turbine efficiency, and what is the maximum efficiency a turbine can reach? (asked of past candidates)",
    answer:
      "Separate three ideas. (1) Isentropic efficiency of a turbine = actual work / isentropic work for the same inlet state and exit pressure; modern HP and LP turbines reach roughly 90–93%. Losses: profile, secondary flows, tip leakage, cooling-air mixing. (2) Blade (diagram) efficiency of a stage from velocity triangles: for a single impulse stage η_max = cos²α₁, reached at U/V₁ = cos α₁/2 (e.g. 88% at α = 20°); for a 50%-reaction stage η_max = 2cos²α/(1 + cos²α) at U/V₁ = cos α (≈94% at 20°). (3) The cycle limit: no heat engine beats Carnot, 1 − T_L/T_H (≈83% between 1700 K and 288 K); a real Brayton cycle is far lower because heat is added over a temperature range and components have losses. Say which one the interviewer means before answering.",
    tips: "Derive the impulse result quickly: η_b = 4ρ(cos α − ρ) with ρ = U/V₁; set the derivative to zero → ρ = cos α/2.",
  },
  {
    id: "qa-050",
    category: "technical",
    question: "GE EEDP — Derive the filling time of a casting for top gating and bottom gating. (reported question)",
    answer:
      "Top gating: metal falls from the pouring basin through height h_t, so Bernoulli gives gate velocity V = √(2gh_t), constant during filling. Q = A_g V, so t_top = V_m/(A_g √(2gh_t)). Bottom gating: when the metal in the mould has risen to height h, the effective head is h_t − h, so V = √(2g(h_t − h)). Mass balance: A_m dh = A_g √(2g(h_t − h)) dt. Separate and integrate from 0 to h_m: t_bottom = (A_m/A_g)(1/√(2g)) · 2(√h_t − √(h_t − h_m)). Bottom gating takes longer but fills quietly, avoiding turbulence, oxide films and mould erosion; real systems add friction/choke factors and design the sprue taper so the stream does not aspirate air.",
    tips: "State assumptions (inviscid, quasi-steady, pouring basin kept full). A panel that asks this wants to see you set up the differential equation, not recall the formula.",
  },
  {
    id: "qa-051",
    category: "technical",
    question: "GE EEDP — What is stress concentration, and how would you reduce it in an engine part?",
    answer:
      "Where geometry changes abruptly — holes, fillets, slots, threads — load paths crowd together and local stress exceeds the nominal value: σ_max = K_t σ_nom (K_t = 3 for a circular hole in a wide plate under tension, at the sides perpendicular to the load). For fatigue the effective factor K_f = 1 + q(K_t − 1) depends on notch sensitivity q (high for high-strength alloys). Reduce it by larger fillet radii, relief grooves, elliptical or reinforced holes, avoiding stacked features, and better load paths; improve fatigue at the notch by surface treatments (shot peening for compressive residual stress, low-stress grinding) and by controlling surface finish. In discs, bolt holes and fir-tree slots are classic LCF hotspots designed with exactly these levers and checked with FEA plus mesh convergence.",
    tips: "Distinguish K_t (geometry, elastic) from K_f (fatigue, material-dependent). Mention singularities: a zero-radius corner in FEA never converges.",
  },
  {
    id: "qa-052",
    category: "technical",
    question: "GE EEDP — Explain fracture toughness, and how fatigue, fracture and creep each limit a turbine part.",
    answer:
      "Fracture toughness K_IC is the critical stress intensity K = Yσ√(πa) at which a crack grows unstably; it sets the critical crack size for a given stress. Fatigue: cyclic loading grows cracks (Paris law da/dN = CΔK^m); discs and shafts are limited by LCF from flight cycles (life-limited parts) and blades/vanes must avoid HCF from resonance. Creep: time-dependent strain at high homologous temperature under sustained (centrifugal) stress — the main limit for HP turbine blades, managed by single-crystal γ′ alloys, cooling, TBCs and tight temperature control (Larson–Miller: ~50 K hotter can cut life ~10×). Fracture mechanics links them: inspection intervals are set so a crack below detection size cannot grow to critical size before the next inspection (damage tolerance).",
    tips: "Use one number to show fluency (e.g. Larson–Miller tenfold life drop). Connect to GE: discs are LLPs, blades are creep/oxidation limited.",
  },
  {
    id: "qa-053",
    category: "technical",
    question: "GE EEDP — How would you set up an FEA of a component, and how do you know the result is right?",
    answer:
      "1) Define the question (peak stress for fatigue? deflection? frequencies?). 2) Simplify geometry sensibly (defeature where it does not matter, keep fillets where stress matters; use symmetry). 3) Choose elements (shells for thin walls, quadratic tets/hexes for solids) and material models (temperature-dependent properties, plasticity if needed). 4) Apply realistic loads and boundary conditions — and constrain rigid-body motion. 5) Mesh, then run a convergence study on the quantity of interest; watch for singularities at sharp corners. 6) Verify: hand calculations (beam, thin cylinder, centrifugal root stress), reaction-force balance, deformed shape sanity. 7) Validate against test data or a trusted case. 8) Report with margins and assumptions.",
    tips: "Panels value the verification habit more than software names. Mention your meshless/numerical background as understanding discretisation error.",
  },
  {
    id: "qa-054",
    category: "technical",
    question: "GE EEDP — Why are HP turbine blades cooled, and how is it done?",
    answer:
      "The gas entering the HP turbine (~1700–1900 K) is hotter than the alloy's melting/incipient-melting point (~1600 K), and creep and oxidation life fall steeply with metal temperature. So blades combine: internal convection through serpentine passages with ribs (turbulators) and pin fins at the trailing edge; impingement jets on the inside of the leading edge; film cooling — rows of (shaped) holes that lay coolant over the outside, especially showerhead rows at the leading edge where stagnation heat transfer is highest; and a thermal barrier coating (YSZ over a bond coat) that drops a few hundred kelvin. The trade-off: cooling air is bled from the compressor and does less work in the cycle, so designers minimise it — the motivation for CMCs, which need far less cooling.",
    tips: "Use the film-cooling effectiveness definition (T_g − T_aw)/(T_g − T_c) and the leading-edge h ∝ D^−½ link to your thesis.",
  },
  {
    id: "qa-055",
    category: "technical",
    question: "GE EEDP — How can you improve the efficiency of a Brayton (gas-turbine) cycle?",
    answer:
      "Ideal efficiency 1 − r_p^−(γ−1)/γ rises with pressure ratio; real efficiency also needs higher turbine inlet temperature and better components. Levers: higher overall pressure ratio (more/better compressor stages) together with higher TIT (single-crystal alloys, cooling, TBCs, CMCs); higher component efficiencies (3-D aero, tight clearances, active clearance control); less cooling and leakage flow; regeneration (useful at low pressure ratio); intercooling and reheat combined with regeneration (intercooling alone raises work but cuts efficiency). For aircraft, overall efficiency is thermal × propulsive, so higher bypass (bigger fans, geared or open fans) is the other big lever.",
    tips: "Say why intercooling alone lowers efficiency — it is a classic follow-up.",
  },
  {
    id: "qa-056",
    category: "technical",
    question: "GE EEDP — What is a Kalman filter? Explain it intuitively. (asked in a controls-flavoured EEDP interview)",
    answer:
      "It is a recursive estimator that fuses a model with noisy measurements. Predict: use the model to move the state estimate forward and grow its uncertainty (covariance) by the process noise. Update: compare with the new measurement; the Kalman gain weights the correction by relative uncertainty — trust the sensor when the model is uncertain, trust the model when the sensor is noisy — and the uncertainty shrinks. For linear systems with Gaussian noise it is the optimal (minimum-variance) estimator; the extended/unscented versions handle nonlinear models. Engine use: estimating unmeasured parameters such as component health or thrust from a few sensors, and sensor fault detection.",
    tips: "A 1-D example helps: averaging a GPS fix with dead reckoning.",
  },
  {
    id: "qa-057",
    category: "technical",
    question: "GE EEDP — Given an assembly drawing, how do you trace the force flow? (GE Vernova mechanical candidates were given a drawing-comprehension task)",
    answer:
      "Start where the load enters, then follow it member by member to the supports, writing the free-body diagram of each part. At each joint ask what is transmitted (force, moment, both) and through what (bolt shear, bolt tension, bearing/contact, weld). Example: a bracket bolted to a wall with an offset downward load — direct shear is shared by the bolts; the moment P·e pivots the bracket about its lower edge, so the heel bears in compression and bolt tension grows with distance from the heel (top bolt most loaded). Then identify the weakest link: highest stress, stress raisers, thin sections, single load paths without redundancy.",
    tips: "Read views carefully (first- vs third-angle symbol), and say your assumptions about which joints are pinned or fixed.",
  },
  {
    id: "qa-058",
    category: "resume",
    question: "GE EEDP — Your 2-minute thesis pitch for the GE panel.",
    answer:
      "Template — fill with your exact work: \"My M.Tech thesis studies [stagnation-point aerothermal heating of hypersonic vehicles]. The problem: [peak heat flux and wall temperature decide the thermal protection]. I [built/used a model — e.g. Fay–Riddell-type correlations with real-gas/Lewis-number corrections — and compared/validated against …]. The main result is [one number or trend]. What I learned that matters for engines is how stagnation-region boundary layers, wall temperature and catalycity drive heat flux — the same physics that sets leading-edge heating and cooling on turbine blades. Its limits are [assumptions].\" Then stop and let them choose where to dig.",
    tips: "The IITK EEDP insight: most technical questions were on the thesis and its real-life application. Rehearse the follow-ups: assumptions, validation, what you would do next.",
  },
  {
    id: "qa-059",
    category: "project",
    question: "GE EEDP — \"How does your thesis apply in real life?\" (asked of past EEDP candidates)",
    answer:
      "Template — keep it honest: name one concrete engine problem your skills transfer to, the quantity you would estimate, and the limit of your method. For a stagnation-heating thesis: turbine leading edges see stagnation-region heat transfer that scales like h ∝ D^−½ (the cylinder analogue of the R^−½ in Fay–Riddell); estimating that heat load guides showerhead film-cooling and TBC thickness. Your validation habit transfers to correlating models with rig data. Then the limit: engine flows are subsonic/transonic, turbulent and unsteady (wakes, free-stream turbulence), so the correlations change — you would calibrate them against test data.",
    tips: "Say what you do NOT know; panels reward accurate boundaries more than overreach.",
  },
  {
    id: "qa-060",
    category: "hr",
    question: "GE EEDP — Why GE Aerospace?",
    answer:
      "Template: (1) Purpose and product: 'invent the future of flight, lift people up and bring them home safely' — the engines on most of the world's narrowbodies (via CFM's LEAP) and the GE9X. (2) The work at JFWTC: engine technologies, advanced materials and additive manufacturing (from the JD) — name the one closest to you (e.g. hot-section heat transfer, CMCs, compressor aero). (3) Your proof: one sentence from your thesis/projects that shows you can contribute there. (4) Why EEDP: rotations plus technical training is how you want to build depth and breadth early.",
    tips: "Avoid brand/salary answers. One specific technology fact (e.g. CMCs in the GE9X hot section) signals real research.",
  },
  {
    id: "qa-061",
    category: "hr",
    question: "GE EEDP — What do you know about EEDP, and which rotation would you choose first?",
    answer:
      "EEDP (from the JD): at least 3 rotations over 2 years across areas such as New Products, Services Technology, Advanced Next-Gen Technology and Digital Technology, with technical training, mentoring by senior technologists and leadership development with programme members from other businesses and locations. Template for preference: 'My first choice is [New Products — aero-thermal/heat transfer] because [thesis link]; I'd also value a Services rotation to see how engines deteriorate in the field (EGT margin, borescope findings), which makes a better designer.' Show direction plus openness.",
    tips: "Past candidates were also asked 'since when do you know GE' and 'would you relocate to Bangalore' — have crisp answers.",
  },
  {
    id: "qa-062",
    category: "behavioral",
    question: "GE EEDP — Prepare one STAR story each for Humble, Transparent and Focused (the behaviours in the JD).",
    answer:
      "Humble (respectful, receptive, agile, eager to learn): a time you took feedback, checked it and changed your approach — e.g. a reviewer questioned your model's boundary conditions; you verified, fixed and thanked them. Transparent (shares critical information, speaks with candour): a time you surfaced bad news early — an error in results you had already shared, quantified the impact and sent corrections. Focused (quick learner, prioritises, committed): a crunch where you cut scope, sequenced tasks and delivered what mattered. Use STAR, keep each to ~90 seconds, and end with the result and what you changed. Use your real examples — these are templates.",
    tips: "Glassdoor EEDP reports describe mostly STAR behavioural questions plus 'greatest accomplishment' and 'proudest technical project'.",
  },
  {
    id: "qa-063",
    category: "hr",
    question: "GE EEDP — Hobbies, interests, expectations and what you will contribute (the HR round described in the IITK insight).",
    answer:
      "Hobbies: pick ones you can talk about for two minutes with specifics (what you did, what it taught you); link lightly to teamwork, discipline or curiosity, but don't force it. Expectations: learning through rotations, mentorship, challenging technical work, a path to technical leadership. Contribution: name two things — a skill you bring on day one (e.g. modelling and validating heat-transfer problems, CFD/numerical methods, Python) and a behaviour (owning problems end to end, communicating early). Keep salary and location questions out unless asked.",
    tips: "The IITK candidate described the HR round as quite general — the goal is fit, energy and clarity, not trick questions.",
  },
  {
    id: "qa-064",
    category: "behavioral",
    question: "GE EEDP — Group discussion playbook (older GE drives used GDs on cloud vs on-premise, IoT, technology and jobs).",
    answer:
      "Open early if you have a structure: define the topic and offer 3 lenses (e.g. cost, security, scalability; or economy, people, environment). Add facts and examples, not volume. Build on others by name ('extending Riya's point…'), disagree politely with a reason, and bring in quiet members. Keep track of time; in the last minute, summarise both sides and the group's leanings. Some formats give 1 minute to note points and 2 minutes each to speak, then a summary — practise that cadence.",
    tips: "Evaluators score content, structure, listening and leadership. Interrupting and repeating points cost marks.",
  },
  {
    id: "qa-065",
    category: "technical",
    question: "GE EEDP — What does the online test look like, and how should I pace it?",
    answer:
      "Reported patterns vary by year: CoCubes-style aptitude (quant-heavy, plus DI, reasoning and English) with a technical section of GATE-level basics; one 2019 EEDP paper had 30 quant + 10 reasoning + 10 verbal in 50 minutes, a 2016 paper had 60 aptitude + 30 technical in 90 minutes, and Bengaluru candidates mentioned a time crunch. Your JD says a 60-minute aptitude test. Pacing: one pass answering everything under ~60 s, mark the rest; do DI sets only after quick questions; never sink 3 minutes into one item; attempt everything if there is no negative marking. Revise: percentages/ratios/TSD/work, P&C and probability, DI arithmetic, syllogisms, seating, data sufficiency; plus thermodynamics, SoM, fluids, heat transfer and materials basics.",
    tips: "Use the three GE simulations in Myplacement timed; review every wrong answer's solution before the next one.",
  },
  {
    id: "qa-066",
    category: "hr",
    question: "GE EEDP — Good questions to ask the panel at the end.",
    answer:
      "Ask about the work and how to succeed: 'How are rotations matched to EEDPs, and how much say do we have?', 'What distinguishes EEDPs who go on to strong technical careers here?', 'What are the hardest technical problems the JFWTC teams in [area] are working on right now?', 'How does FLIGHT DECK show up in an engineer's day-to-day work?' Avoid questions answered in the JD or pre-placement talk (bond, salary structure) and anything that signals leaving.",
    tips: "One or two thoughtful questions are enough; tie one to something the panel said.",
  },
];

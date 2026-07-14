import type { FormulaSection } from "@/lib/types";

/** Formula handbook rendered in the Revision section. */
export const FORMULA_SECTIONS: FormulaSection[] = [
  {
    topic: "Compressible Flow & Gas Dynamics",
    module: "aerospace",
    items: [
      { name: "Stagnation temperature", formula: "T₀/T = 1 + ((γ−1)/2)M²", note: "Air: 1 + 0.2M²" },
      { name: "Stagnation pressure", formula: "p₀/p = (1 + ((γ−1)/2)M²)^(γ/(γ−1))", note: "Exponent 3.5 for air" },
      { name: "Speed of sound", formula: "a = √(γRT)", note: "≈ 340 m/s at sea level" },
      { name: "Area–Mach relation", formula: "dA/A = (M² − 1)·dV/V", note: "Supersonic: area ↑ ⇒ speed ↑" },
      { name: "Prandtl relation", formula: "u₁u₂ = a*²", note: "Normal shock" },
      { name: "Normal shock limit", formula: "M₂(M₁→∞) = √((γ−1)/2γ) ≈ 0.378", note: "For γ = 1.4" },
      { name: "Mach angle", formula: "μ = sin⁻¹(1/M)" },
    ],
  },
  {
    topic: "Aerodynamics",
    module: "aerospace",
    items: [
      { name: "Lift", formula: "L = ½ρV²S·CL" },
      { name: "Thin airfoil lift slope", formula: "cl = 2πα (α in rad)", note: "≈ 0.11/degree" },
      { name: "Finite wing lift slope", formula: "a = a₀/(1 + a₀/(πeAR))" },
      { name: "Induced drag", formula: "CDi = CL²/(πeAR)" },
      { name: "Effective sweep Mach", formula: "M_eff = M·cosΛ" },
      { name: "Blasius boundary layer", formula: "δ/x = 5/√Re_x", note: "Laminar flat plate" },
      { name: "Reynolds number", formula: "Re = ρVL/μ = VL/ν" },
    ],
  },
  {
    topic: "Propulsion",
    module: "aerospace",
    items: [
      { name: "Jet thrust", formula: "F = ṁ(Ve − V₀) + (pe − pa)Ae" },
      { name: "Specific impulse", formula: "Isp = F/(ṁg₀)" },
      { name: "Rocket equation", formula: "Δv = Ve·ln(m₀/mf)", note: "ln 2 ≈ 0.693, ln 4 ≈ 1.386" },
      { name: "Propulsive efficiency", formula: "ηp = 2/(1 + Ve/V₀)", note: "Best when Ve ≈ V₀" },
      { name: "Brayton efficiency", formula: "η = 1 − r^(−(γ−1)/γ)", note: "r = pressure ratio" },
      { name: "Carnot efficiency", formula: "η = 1 − TL/TH", note: "Always use kelvin" },
    ],
  },
  {
    topic: "Structures & Strength of Materials",
    module: "aerospace",
    items: [
      { name: "Bending stress", formula: "σ = My/I", note: "Rectangle: Z = bh²/6" },
      { name: "Torsion (solid shaft)", formula: "τ = 16T/(πd³)" },
      { name: "Euler buckling", formula: "P_cr = π²EI/(KL)²", note: "Pinned-pinned: K = 1" },
      { name: "Hoop stress", formula: "σ_h = pr/t", note: "Axial = pr/2t (half)" },
      { name: "Max in-plane shear", formula: "τ_max = (σ₁ − σ₂)/2", note: "Mohr's circle radius" },
      { name: "Strain energy (axial)", formula: "U = P²L/(2AE)" },
    ],
  },
  {
    topic: "Flight Mechanics & Control",
    module: "aerospace",
    items: [
      { name: "Stall speed", formula: "Vs = √(2W/(ρS·CLmax))" },
      { name: "Load factor (turn)", formula: "n = 1/cosφ", note: "60° bank ⇒ 2g" },
      { name: "Turn radius", formula: "R = V²/(g·tanφ)" },
      { name: "Static margin", formula: "SM = (x_NP − x_CG)/c̄", note: "> 0 for stability" },
      { name: "Breguet range (jet)", formula: "R = (V/c)(L/D)ln(W₀/W₁)" },
      { name: "2nd-order system", formula: "s² + 2ζωₙs + ωₙ²", note: "Overshoot = e^(−πζ/√(1−ζ²))" },
      { name: "Routh (cubic)", formula: "s³+as²+bs+c stable ⇔ ab > c", note: "All coefficients > 0" },
    ],
  },
  {
    topic: "Heat Transfer",
    module: "aerospace",
    items: [
      { name: "Fourier's law", formula: "q″ = kΔT/L" },
      { name: "Biot number", formula: "Bi = hLc/k", note: "Lumped valid for Bi < 0.1" },
      { name: "Newton's cooling", formula: "q = hA(Ts − T∞)" },
      { name: "Stefan–Boltzmann", formula: "q = εσA(T⁴ − T∞⁴)", note: "σ = 5.67×10⁻⁸" },
      { name: "LMTD", formula: "ΔT_lm = (ΔT₁ − ΔT₂)/ln(ΔT₁/ΔT₂)" },
    ],
  },
  {
    topic: "Quantitative Aptitude Shortcuts",
    module: "aptitude",
    items: [
      { name: "Successive % change", formula: "net = a + b + ab/100" },
      { name: "Two workers together", formula: "T = xy/(x + y)" },
      { name: "km/h → m/s", formula: "× 5/18" },
      { name: "Clock angle", formula: "θ = |30H − 5.5M|" },
      { name: "Compound interest (2 yr)", formula: "CI = SI + P(r/100)²" },
      { name: "Permutations w/ repeats", formula: "n!/(p₁!p₂!…)" },
      { name: "Upstream/downstream", formula: "u = b − s, d = b + s" },
    ],
  },
  {
    topic: "Complexity Cheat Sheet",
    module: "coding",
    items: [
      { name: "Binary search", formula: "O(log n)" },
      { name: "Merge sort / heapsort", formula: "O(n log n)", note: "Quicksort avg same, worst O(n²)" },
      { name: "Hash table ops", formula: "O(1) avg, O(n) worst" },
      { name: "BFS / DFS", formula: "O(V + E)" },
      { name: "Dijkstra (binary heap)", formula: "O((V + E)log V)", note: "No negative edges" },
      { name: "Heap push/pop", formula: "O(log n)", note: "Peek O(1)" },
      { name: "Tree edges", formula: "|E| = |V| − 1" },
      { name: "LCS DP", formula: "O(mn)" },
    ],
  },
  {
    topic: "Interview One-Liners",
    module: "interview",
    items: [
      { name: "Winglets", formula: "Weaken tip vortices ⇒ less induced drag" },
      { name: "Wing sweep", formula: "Cut normal Mach ⇒ delay drag divergence" },
      { name: "High bypass", formula: "More air, less ΔV ⇒ higher ηp" },
      { name: "Staging", formula: "Drop dead mass ⇒ beat the rocket-equation log" },
      { name: "Area rule", formula: "Smooth area distribution ⇒ less wave drag" },
      { name: "STAR", formula: "Situation, Task, Action, Result", note: "Spend 60% on Action" },
    ],
  },
];

import type { TestDef } from "@/lib/types";

/**
 * Test series definitions. Each test references question ids from the banks
 * in src/data/questions. Add a new object here to publish a new test.
 */
export const TESTS: TestDef[] = [
  // ---------- Core Aerospace ----------
  {
    id: "aero-gate-mock-1",
    module: "aerospace",
    title: "GATE Aerospace Mock 1",
    description: "A balanced 12-question GATE-pattern mock across the AE syllabus with MCQ, MSQ and NAT.",
    difficulty: "gate",
    durationMin: 30,
    questionIds: [
      "aero-001", "aero-002", "aero-004", "aero-005", "aero-007", "aero-009",
      "aero-015", "aero-020", "aero-025", "aero-029", "aero-031", "aero-033",
    ],
    topics: ["Compressible Flow", "Aerodynamics", "Flight Mechanics", "Thermodynamics", "Control Systems", "Engineering Mathematics"],
    companies: ["ISRO", "DRDO", "HAL"],
  },
  {
    id: "aero-flow-sprint",
    module: "aerospace",
    title: "Compressible Flow & Gas Dynamics Sprint",
    description: "Shocks, nozzles and isentropic relations — the highest-weight GATE AE topics.",
    difficulty: "mixed",
    durationMin: 18,
    questionIds: ["aero-001", "aero-002", "aero-003", "aero-017", "aero-018", "aero-029", "aero-030"],
    topics: ["Compressible Flow", "Gas Dynamics", "Fluid Mechanics"],
    companies: ["ISRO", "DRDO"],
  },
  {
    id: "aero-structures",
    module: "aerospace",
    title: "Structures & Strength of Materials",
    description: "Buckling, bending, torsion, pressure vessels and aircraft construction.",
    difficulty: "mixed",
    durationMin: 18,
    questionIds: ["aero-019", "aero-020", "aero-021", "aero-022", "aero-023", "aero-024"],
    topics: ["Aircraft Structures", "Strength of Materials", "Machine Design"],
    companies: ["Airbus", "Boeing", "Tata Technologies"],
  },
  {
    id: "aero-propulsion",
    module: "aerospace",
    title: "Propulsion & Thermodynamics",
    description: "Jets, rockets, cycles and efficiencies — from turbojet thrust to the rocket equation.",
    difficulty: "mixed",
    durationMin: 18,
    questionIds: ["aero-011", "aero-012", "aero-013", "aero-014", "aero-015", "aero-016", "aero-034"],
    topics: ["Propulsion", "Thermodynamics"],
    companies: ["ISRO", "HAL"],
  },
  {
    id: "aero-flight-control",
    module: "aerospace",
    title: "Flight Mechanics & Control",
    description: "Performance, stability, dynamic modes and control-systems fundamentals.",
    difficulty: "mixed",
    durationMin: 20,
    questionIds: ["aero-006", "aero-007", "aero-008", "aero-009", "aero-010", "aero-025", "aero-026"],
    topics: ["Flight Mechanics", "Control Systems"],
    companies: ["HAL", "Boeing", "DRDO"],
  },
  {
    id: "aero-isro-screening",
    module: "aerospace",
    title: "ISRO / DRDO Screening Mock",
    description: "Scientist/Engineer written-test style questions with a propulsion and gas-dynamics tilt.",
    difficulty: "hard",
    durationMin: 25,
    questionIds: [
      "aero-001", "aero-003", "aero-012", "aero-013", "aero-017",
      "aero-018", "aero-025", "aero-027", "aero-033", "aero-034",
    ],
    topics: ["Gas Dynamics", "Propulsion", "Control Systems", "Heat Transfer", "Numerical Methods"],
    companies: ["ISRO", "DRDO"],
  },

  {
    id: "aero-gate-mock-2",
    module: "aerospace",
    title: "GATE Aerospace Mock 2",
    description: "A second full-syllabus GATE mock — space mechanics, duct flows, vibrations, electrical and signals included.",
    difficulty: "gate",
    durationMin: 30,
    questionIds: [
      "aero-035", "aero-037", "aero-038", "aero-039", "aero-040", "aero-043",
      "aero-044", "aero-045", "aero-003", "aero-014", "aero-028", "aero-006",
    ],
    topics: ["Space Mechanics", "Gas Dynamics", "Aerodynamics", "Propulsion", "Heat Transfer", "Engineering Mechanics", "Basic Electrical", "Signals"],
    companies: ["ISRO", "DRDO", "HAL"],
  },
  {
    id: "aero-space-mechanics",
    module: "aerospace",
    title: "Space Mechanics & Launch Vehicles",
    description: "Orbits, escape velocity, Kepler's laws, the rocket equation and ISRO launcher tech.",
    difficulty: "mixed",
    durationMin: 15,
    questionIds: ["aero-012", "aero-013", "aero-034", "aero-035", "aero-036", "aero-037"],
    topics: ["Space Mechanics", "Propulsion"],
    companies: ["ISRO"],
  },
  {
    id: "aero-hal-airbus",
    module: "aerospace",
    title: "HAL / Airbus Interview Mock",
    description: "Conceptual questions interviewers actually ask — materials, manufacturing, V-n limits, controls and aero intuition.",
    difficulty: "interview",
    durationMin: 25,
    questionIds: [
      "aero-024", "aero-046", "aero-047", "aero-006", "aero-008",
      "aero-018", "aero-027", "aero-041", "aero-042", "aero-014",
    ],
    topics: ["Aircraft Structures", "Manufacturing", "Flight Mechanics", "Aerodynamics", "Heat Transfer", "Gas Dynamics", "Propulsion"],
    companies: ["HAL", "Airbus", "Boeing"],
  },

  // ---------- Coding ----------
  {
    id: "cod-dsa-fundamentals",
    module: "coding",
    title: "DSA Fundamentals",
    description: "Core data structures and complexity — the screening-round staples.",
    difficulty: "easy",
    durationMin: 20,
    questionIds: [
      "cod-001", "cod-003", "cod-005", "cod-006", "cod-007",
      "cod-014", "cod-016", "cod-017", "cod-026",
    ],
    topics: ["Searching", "Hash Maps", "Stack", "Trees", "Graphs", "Heap", "Python", "Recursion"],
    companies: ["Amazon", "Microsoft", "Adobe"],
  },
  {
    id: "cod-advanced-dsa",
    module: "coding",
    title: "Advanced DSA",
    description: "DP, graphs and the tricky binary-search variants asked in onsite rounds.",
    difficulty: "hard",
    durationMin: 25,
    questionIds: [
      "cod-002", "cod-004", "cod-010", "cod-012", "cod-013",
      "cod-023", "cod-024", "cod-025",
    ],
    topics: ["Dynamic Programming", "Graphs", "Sorting", "Binary Search"],
    companies: ["Google", "Meta", "Uber"],
  },
  {
    id: "cod-faang-mix",
    module: "coding",
    title: "FAANG Company Mix",
    description: "A cross-section of questions tagged to Google, Amazon, Meta and friends.",
    difficulty: "mixed",
    durationMin: 25,
    questionIds: [
      "cod-001", "cod-003", "cod-004", "cod-008", "cod-010",
      "cod-013", "cod-018", "cod-024",
    ],
    topics: ["Dynamic Programming", "Graphs", "Bit Manipulation", "Python", "Binary Search"],
    companies: ["Google", "Amazon", "Meta", "Apple"],
  },
  {
    id: "cod-lang-sql",
    module: "coding",
    title: "Languages & SQL",
    description: "Python, C++, Java gotchas plus the SQL questions every analytics round asks.",
    difficulty: "medium",
    durationMin: 15,
    questionIds: ["cod-009", "cod-017", "cod-018", "cod-019", "cod-020", "cod-021", "cod-022"],
    topics: ["Python", "C++", "Java", "SQL", "Bit Manipulation"],
    companies: ["Goldman Sachs", "NVIDIA", "Uber"],
  },

  {
    id: "cod-ds-deep-dive",
    module: "coding",
    title: "Data Structures Deep Dive",
    description: "Linked lists, queues, backtracking, greedy pitfalls and sliding windows.",
    difficulty: "medium",
    durationMin: 20,
    questionIds: [
      "cod-027", "cod-028", "cod-029", "cod-030",
      "cod-031", "cod-032", "cod-008", "cod-015",
    ],
    topics: ["Linked Lists", "Queue", "Backtracking", "Greedy", "Strings", "Arrays", "Bit Manipulation", "Sliding Window"],
    companies: ["Amazon", "Microsoft", "Adobe"],
  },
  {
    id: "cod-screening-mock",
    module: "coding",
    title: "Coding Screening Mock",
    description: "A 12-question cross-section mirroring an online screening round — DSA, languages and SQL.",
    difficulty: "mixed",
    durationMin: 30,
    questionIds: [
      "cod-001", "cod-002", "cod-004", "cod-010", "cod-012", "cod-017",
      "cod-021", "cod-024", "cod-027", "cod-029", "cod-030", "cod-031",
    ],
    topics: ["Searching", "Sorting", "Dynamic Programming", "Graphs", "Python", "SQL", "Binary Search", "Linked Lists", "Backtracking", "Greedy", "Strings"],
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
  },

  // ---------- Aptitude ----------
  {
    id: "apt-quant-sprint",
    module: "aptitude",
    title: "Quant Sprint",
    description: "Ten fast quantitative questions: percentages to probability.",
    difficulty: "mixed",
    durationMin: 20,
    questionIds: [
      "apt-001", "apt-002", "apt-003", "apt-004", "apt-005",
      "apt-006", "apt-007", "apt-008", "apt-009", "apt-010",
    ],
    topics: ["Quantitative Aptitude"],
    companies: ["McKinsey", "Goldman Sachs", "Amazon"],
  },
  {
    id: "apt-logical",
    module: "aptitude",
    title: "Logical & Analytical Reasoning",
    description: "Series, puzzles, arrangements, directions and clocks.",
    difficulty: "mixed",
    durationMin: 20,
    questionIds: [
      "apt-011", "apt-012", "apt-013", "apt-014", "apt-015",
      "apt-016", "apt-017", "apt-018", "apt-025",
    ],
    topics: ["Logical Reasoning", "Analytical Reasoning", "Puzzle Solving"],
    companies: ["McKinsey", "BCG"],
  },
  {
    id: "apt-verbal",
    module: "aptitude",
    title: "Verbal & Critical Thinking",
    description: "Vocabulary, grammar and logical validity — quick but unforgiving.",
    difficulty: "medium",
    durationMin: 10,
    questionIds: ["apt-021", "apt-022", "apt-023", "apt-024", "apt-012", "apt-015"],
    topics: ["Verbal Ability", "English Grammar", "Critical Thinking"],
    companies: ["McKinsey", "BCG"],
  },
  {
    id: "apt-full-mock",
    module: "aptitude",
    title: "Full Aptitude Mock",
    description: "A complete 16-question aptitude paper mirroring company screening tests.",
    difficulty: "mixed",
    durationMin: 35,
    questionIds: [
      "apt-001", "apt-003", "apt-005", "apt-007", "apt-008", "apt-011",
      "apt-013", "apt-014", "apt-016", "apt-018", "apt-019", "apt-020",
      "apt-021", "apt-023", "apt-024", "apt-025",
    ],
    topics: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation"],
    companies: ["Amazon", "Goldman Sachs", "McKinsey"],
  },

  {
    id: "apt-arith-sprint-2",
    module: "aptitude",
    title: "Arithmetic Sprint 2",
    description: "Mixtures, pipes, interest, calendars and fast DI arithmetic.",
    difficulty: "mixed",
    durationMin: 15,
    questionIds: [
      "apt-027", "apt-028", "apt-029", "apt-030",
      "apt-031", "apt-002", "apt-004", "apt-026",
    ],
    topics: ["Quantitative Aptitude", "Logical Reasoning", "Data Interpretation"],
    companies: ["TCS-style", "Goldman Sachs"],
  },
  {
    id: "apt-full-mock-2",
    module: "aptitude",
    title: "Full Aptitude Mock 2",
    description: "A second complete screening paper with fresh quant, reasoning and verbal questions.",
    difficulty: "mixed",
    durationMin: 25,
    questionIds: [
      "apt-002", "apt-006", "apt-009", "apt-012", "apt-017", "apt-022",
      "apt-026", "apt-027", "apt-028", "apt-029", "apt-030", "apt-032",
    ],
    topics: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation"],
    companies: ["Amazon", "McKinsey", "BCG"],
  },

  // ---------- Interview ----------
  {
    id: "int-tech-readiness",
    module: "interview",
    title: "Technical Interview Readiness",
    description: "Classic interview questions — aerospace concepts, CS fundamentals and behavioral judgment.",
    difficulty: "interview",
    durationMin: 25,
    questionIds: [
      "int-001", "int-002", "int-003", "int-004", "int-005", "int-006",
      "int-007", "int-008", "int-009", "int-010", "int-011", "int-012",
    ],
    topics: ["Technical Interview", "Behavioral", "HR", "Research Interview"],
    companies: ["Airbus", "Boeing", "ISRO", "Google", "HAL"],
  },
];

export function testsByModule(module: TestDef["module"]): TestDef[] {
  return TESTS.filter((t) => t.module === module);
}

export function testById(id: string): TestDef | undefined {
  return TESTS.find((t) => t.id === id);
}

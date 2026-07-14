# Myplacement 🚀

A personalized **placement preparation platform** built for an IIT Bombay M.Tech Aerospace profile — covering **core aerospace** (GATE / ISRO / DRDO / HAL / Airbus / Boeing), **coding interviews**, **aptitude screening** and **interview prep** in one premium, gamified dashboard.

**Live:** https://shoiabgoku.github.io/Myplacement/

## Features

- **Dashboard** — daily goal, streak counter, XP & levels, activity heatmap, readiness score, weak topics, recent mistakes, recommended practice, study timer, quote of the day, quick-resume.
- **Four modules** — Core Aerospace, Coding, Aptitude, Interview Prep. Each with a curated test series plus a *Quick Practice* generator (random paper by topic & size).
- **Full test engine** — countdown with auto-submit, question palette, mark-for-review, MCQ / multi-select / NAT answers, negative marking, per-question time tracking, resume mid-attempt.
- **Rich results** — score, accuracy, time analysis, topic-wise breakdown, weak/strong areas, and step-by-step solutions with concept, formula, alternative method, common mistakes and memory tricks for **every** question.
- **Analytics** — score & accuracy trends, daily volume, speed improvement, topic mastery, module-wise progress, overall readiness (based on completed practice).
- **Revision** — searchable formula handbook (8 sections) + flashcard mode.
- **Search** — filter ~100 built-in questions by keyword, formula, topic, difficulty, company or id; bookmark favourites.
- **Admin panel** — add/edit/delete custom questions, JSON import/export, AI question-generation prompt workflow, profile settings.
- **Gamification** — XP per correct answer, quadratic level curve with titles (Cadet → Legend), 10 achievements, streaks.
- Dark/light theme, glassmorphism, Framer Motion animations, fully responsive.

## Tech stack

Next.js (App Router, static export) · TypeScript · Tailwind CSS v4 · Zustand (persisted to localStorage) · Framer Motion · Recharts · Lucide icons.

All state lives in the browser (`localStorage`) — no backend needed, works free on GitHub Pages. The typed data layer (`src/data`) is designed so a Prisma + PostgreSQL backend can replace it later without touching the UI.

## Project structure

```
src/
  app/            # routes: dashboard, modules, test/[id], results, analytics,
                  # revision, search, admin
  components/     # ui primitives, shell (sidebar/topbar), dashboard widgets,
                  # test runner, module page
  data/           # question banks (aerospace/coding/aptitude/interview),
                  # tests, formulas, quotes, achievements, interview Q&A
  lib/            # types, test engine (scoring/analytics), gamification,
                  # streaks, utils
  store/          # zustand store (progress, attempts, custom questions)
```

## Adding questions

1. **In code:** append to `src/data/questions/<module>.ts` (typed, validated by TS) and optionally reference the ids in a new test in `src/data/tests.ts`.
2. **In the app:** Admin → *Add question*, or import a JSON array (schema shown in the Admin panel's AI prompt). Custom questions join Quick Practice and Search automatically.

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static export to out/
```

Deployment is automatic: pushing to `main` triggers the GitHub Actions workflow that builds and publishes to GitHub Pages.

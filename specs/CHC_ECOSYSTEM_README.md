# CHC Digital Ecosystem — Complete Rebuild Package

## What This Is
This package contains the complete architectural specification, database schema, module designs, agent definitions, and project configuration required to rebuild the Chaplain Corps Digital Ecosystem from scratch as an integrated, database-backed application.

## Package Contents

```
chc-ecosystem/
├── docs/
│   └── MASTER_RESOLUTION_PLAN.md     ← Start here. 8 gaps, 8 resolution plans.
├── schema/
│   └── 001_complete_schema.sql       ← Complete Supabase PostgreSQL schema
│                                        (17 tables, 14 enums, 5 views, RLS policies)
├── modules/
│   └── chc-cam/
│       └── README.md                 ← CHC-CAM full functional specification
│                                        (4 components, UI wireframes, data flows)
├── agents/
│   └── AGENT_DEFINITIONS.md          ← 5 specialized agents for Claude Code
│                                        (Schema, UI/UX, Data Flow, Doctrine, QA/QC)
├── config/
│   └── PROJECT_CONFIG.md             ← Next.js project structure, Tailwind config,
│                                        env vars, directory tree, build phases
└── README.md                         ← This file
```

## How to Use With Claude Code

1. **Create a new Claude Code project** for the ecosystem rebuild
2. **Upload this entire package** as project knowledge
3. **Start with Phase 1** from `config/PROJECT_CONFIG.md`
4. **Reference agents** from `agents/AGENT_DEFINITIONS.md` for specialized tasks
5. **Run schema** from `schema/001_complete_schema.sql` against your Supabase instance
6. **Build modules** in the sequence defined in the Master Resolution Plan

## Architecture Summary

- **Frontend:** Next.js 14+ (App Router) / React 18 / Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Realtime + Edge Functions)
- **Hosting:** Vercel (auto-deploy from GitHub)
- **AI:** Anthropic API (Claude Sonnet for generation endpoints)
- **Domain:** umttools.org

## Gap Resolution Summary

| Gap | Description | Resolution | Priority |
|-----|-------------|-----------|----------|
| 1 | No shared data model | Supabase PostgreSQL with 17-table schema | Foundation |
| 2 | No data pipeline | Shared database + React hooks + Realtime | Foundation |
| 3 | No automated output generation | AI generation API routes (Anthropic) | Phase 3 |
| 4 | No enterprise integration | Export formats now; API integration later | Phase 4 |
| 5 | CHC-CAM not built | Full module specification provided | Phase 3 |
| 6 | No C³ Compass digital tool | Anonymous survey system specification | Phase 2 |
| 7 | No longitudinal data | Time-series schema + PostgreSQL views | Built into Gap 1 |
| 8 | No role-based access | Supabase Auth + RLS policies | Foundation |

## Key Design Decisions

1. **Monorepo, not microservices.** One Next.js app, one database, one deployment. Simplicity over architectural purity. Chaplains need one URL, one login, one interface.

2. **Database is the integration layer.** No message queues, no event buses, no ETL pipelines. Every tool reads and writes to the same PostgreSQL instance. Supabase Realtime handles cross-tool updates.

3. **Demo mode is a first-class feature.** The app must work fully without authentication using pre-populated sample data. This is critical for demonstrations to senior leaders who will not create accounts.

4. **Wizard-based UX for everything multi-step.** The target users are chaplains and Religious Affairs Specialists, not software engineers. Every complex process (new training event, new observation, new capability gap) uses a step-by-step wizard with large touch targets and plain-language labels.

5. **AI assists, humans decide.** Generated outputs (eval narratives, IDPs, DCRs) are drafts for human review. The AI never submits anything autonomously. Every generated document includes a "Review and Edit" step before export.

## Doctrinal Foundation

All tools trace to governing publications:
- AR 165-1, FM 3-83, ADP 6-22, FM 7-0, AR 350-1
- AR 623-3, DA PAM 623-3, AR 600-3
- FM 6-0, ADP 5-0
- FORSCOM BFT MOI, FY26 CCH TLDG
- CJCSI 5123.01, ACIDS Process Guide
- CHAP-T.A.L.K.S. Handbook
- Chaplain Evaluation Redesign v0.1

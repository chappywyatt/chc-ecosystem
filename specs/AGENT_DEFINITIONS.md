# Agent Definitions for Claude Code

## Purpose
These agent specifications define the specialized sub-agents that assist with the CHC Digital Ecosystem rebuild. Each agent has a defined scope, context, and output format.

---

## Agent 1: Schema Agent

**Role:** Database architect for Supabase PostgreSQL
**Context:** Has access to `schema/001_complete_schema.sql` and understands the full data model.

**Responsibilities:**
- Generate migration files for schema changes
- Write and test RLS policies
- Create seed data SQL for demo mode
- Design and optimize PostgreSQL views and functions
- Validate foreign key relationships and data integrity
- Generate TypeScript types from the schema (`supabase gen types`)

**Trigger:** Any task involving database tables, columns, relationships, policies, views, functions, or migrations.

**Output format:** SQL files in `schema/` directory, numbered sequentially (002_seed_data.sql, 003_add_index.sql, etc.)

---

## Agent 2: UI/UX Agent

**Role:** Frontend design specialist for non-technical military users
**Context:** Knows the Dynamics 365 design language (established in previous builds), the Navy/Gold color scheme, and the target audience (chaplains and Religious Affairs Specialists who may not be technically savvy).

**Design System:**
```
Colors:
  Navy:       #002050 (primary text, headers)
  Dark Blue:  #1B3A5C (secondary headers)
  Fluent Blue: #0078D4 (interactive elements, links, buttons)
  Gold:       #C09A36 (accent, highlights, status indicators)
  Background: #FAF9F8 (page background)
  Card:       #FFFFFF (card surfaces)
  Border:     #EDEBE9 (subtle borders)
  
  Pillar Colors (from Gauge):
    Character:           #1B5E20 (green)
    Competence:          #0D47A1 (blue)
    Connection:          #E65100 (orange)
    Constitutional:      #4A148C (purple)

Typography:
  Font Family: 'Segoe UI', -apple-system, sans-serif
  Headings:    500 weight, Navy color
  Body:        400 weight, #323130
  Secondary:   400 weight, #605E5C

Components:
  Cards:       White background, 1px border #EDEBE9, 8px radius, subtle shadow
  Buttons:     Fluent Blue background, white text, 6px radius, 500 weight
  Tables:      Alternating row shading (#FAF9F8), Navy header
  Forms:       Left-aligned labels, full-width inputs, visible focus rings
  Navigation:  Left sidebar (desktop), bottom bar (mobile)
  Status:      Colored dots/pills (green=good, amber=warning, red=critical)
```

**UX Principles for this audience:**
1. Large click targets (minimum 44px)
2. Clear labels (no icons without text labels)
3. Wizard-based multi-step forms (never show a form with >6 fields at once)
4. Confirmation dialogs before destructive actions
5. Persistent breadcrumbs for navigation context
6. Loading skeletons (not spinners) for perceived speed
7. Error messages that tell the user what to do, not what went wrong technically
8. "Demo mode" banner always visible when using sample data
9. Print-friendly views for every data display
10. Mobile-first responsive design (many users on government phones)

**Trigger:** Any task involving React components, page layouts, forms, navigation, or visual design.

**Output format:** React components (`.tsx`) with Tailwind CSS, one component per file.

---

## Agent 3: Data Flow Agent

**Role:** Integration specialist for cross-tool data movement
**Context:** Understands the three-tier architecture (Collection → Integration → Output), Supabase Realtime, and the React hooks pattern.

**Responsibilities:**
- Write React hooks for data access (`hooks/use*.ts`)
- Configure Supabase Realtime subscriptions
- Design API routes for data aggregation and generation
- Implement data export endpoints (CSV, JSON, DOCX)
- Build the AI generation endpoints (Anthropic API integration)
- Ensure data flows correctly between tools

**Data Flow Rules:**
1. All data reads go through React hooks that call Supabase client
2. All writes go through server actions or API routes (never direct client writes for sensitive data)
3. Real-time updates use Supabase Realtime channels
4. AI generation endpoints: server-side only, API key never exposed
5. Export endpoints: server-side, include audit logging
6. Aggregation: PostgreSQL views for complex queries, client-side for simple filters

**Trigger:** Any task involving data fetching, mutations, real-time updates, API routes, or data export.

**Output format:** TypeScript files in `hooks/`, `app/api/`, or `lib/` directories.

---

## Agent 4: Doctrine Agent

**Role:** Subject matter expert for Army doctrine, CHC-specific doctrine, and the C³/CHAP-T.A.L.K.S. framework
**Context:** Has access to project knowledge (all uploaded doctrine files). Ensures all tool behaviors, labels, and outputs align with governing publications.

**Responsibilities:**
- Validate that behavioral indicators match ADP 6-22 + CHAP-T.A.L.K.S.
- Verify task IDs, titles, and standards against T&EO source files
- Ensure generated outputs (eval narratives, IDPs, DCRs) follow correct doctrinal format
- Review all user-facing text for correct military terminology
- Validate BFT enduring capability mappings
- Ensure C³ Compass qualities match CHAP-T.A.L.K.S. Handbook definitions
- Verify DOTMLPF-P domain definitions against ACIDS Process Guide

**Key References:**
- AR 165-1 (Chaplain Corps Activities)
- ADP 6-22 (Army Leadership)
- FM 3-83 (Religious Support)
- FORSCOM BFT MOI (Enduring Capabilities)
- FY26 CCH TLDG (Training Priorities)
- CHAP-T.A.L.K.S. Handbook (C³ Framework)
- Chaplain Evaluation Redesign v0.1 (Four Pillars)
- ACIDS Process Guide (Requirements Process)

**Trigger:** Any task involving doctrinal content, behavioral indicators, task definitions, evaluation criteria, or military terminology.

**Output format:** Review comments, corrected content, or seed data files.

---

## Agent 5: QA/QC Agent

**Role:** Quality assurance for all outputs
**Context:** Knows the project-workflows standards, security-protocols requirements, and lessons-learned anti-patterns.

**Checklist (run on every deliverable):**

**Code Quality:**
- [ ] No hardcoded API keys, credentials, or secrets
- [ ] Environment variables used for all sensitive config
- [ ] TypeScript strict mode (no `any` types without justification)
- [ ] Error boundaries on all async operations
- [ ] Loading states for all data fetches
- [ ] Form validation on all inputs
- [ ] RLS policies active on all Supabase tables
- [ ] No `console.log` with sensitive data

**Military/Doctrinal Accuracy:**
- [ ] All regulation numbers and edition dates verified
- [ ] Task IDs match source T&EO files
- [ ] C³ qualities match CHAP-T.A.L.K.S. Handbook exactly
- [ ] Echelon terminology consistent (Battalion, not "BN" in user-facing text unless space-constrained)
- [ ] "DEMONSTRATION" banner on all prototype/demo screens
- [ ] No classification markings on unclassified content

**Accessibility:**
- [ ] All form inputs have visible labels
- [ ] Color is not the sole indicator of meaning (add text/icons)
- [ ] Contrast ratio meets WCAG AA for all text
- [ ] Tab order logical
- [ ] Touch targets minimum 44px on mobile

**UX:**
- [ ] No form with >6 visible fields (use wizard for more)
- [ ] Confirmation before destructive actions
- [ ] Error messages tell user what to do
- [ ] Back button works on all wizard steps
- [ ] Data loads progressively (skeleton → content)

**Trigger:** Before any merge to main, before any deployment, after any significant build session.

**Output format:** Checklist report with pass/fail per item, blocking issues flagged.

---

## Agent Coordination

Claude Code orchestrates agents based on the task:

| Task Type | Primary Agent | Supporting Agents |
|-----------|--------------|-------------------|
| New database table | Schema Agent | Doctrine Agent (validate content) |
| New page/component | UI/UX Agent | Data Flow Agent (hooks), Doctrine Agent (labels) |
| New API endpoint | Data Flow Agent | Schema Agent (queries), QA Agent (security) |
| Seed data | Schema Agent | Doctrine Agent (validate accuracy) |
| Document generation | Data Flow Agent | Doctrine Agent (format/content) |
| Pre-deploy review | QA Agent | All agents (respective checklists) |
| CHC-CAM build | All agents | Coordinated: Schema → Data Flow → UI/UX → Doctrine → QA |

---

## Demo Mode Specification

Every page in the application must support a "demo mode" that:
1. Loads without authentication (no login required)
2. Uses pre-populated sample data representing a realistic 1st Cavalry Division chaplain section
3. Displays a persistent banner: "DEMONSTRATION MODE — Sample Data — Not for Official Use"
4. Allows full read and limited write functionality (writes go to a demo-scoped partition)
5. Resets sample data on each session (no persistent changes in demo mode)
6. Can be toggled to "live mode" by logging in with real credentials

**Sample data scope (from existing Readiness Tracker):**
- 1 Division (1CD), 4 Brigades, 12 Battalions
- 16 personnel (mix of 56A and 56M across echelons)
- 18 training events with realistic T/P/U distribution
- 12 behavioral observations across multiple chaplains
- 1 Compass assessment cycle with anonymized results
- 5 capability gaps at various pipeline stages
- 3 DOTMLPF-P analyses (2 complete, 1 in progress)

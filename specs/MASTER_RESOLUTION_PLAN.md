# CHC Digital Ecosystem — Master Resolution Plan

## Purpose
This document provides the complete technical resolution plan for all eight identified functional gaps in the Chaplain Corps Digital Ecosystem. It is designed as the authoritative handoff to Claude Code for a full redesign and rebuild.

## Architecture Decision: Monorepo with Shared Core

**Decision:** Rebuild the ecosystem as a single Next.js 14+ application (App Router) with Supabase backend, replacing the current collection of standalone HTML files served from a `public/` directory.

**Rationale:**
- Current architecture (6 static HTML files with React loaded via CDN) cannot share data, state, or authentication
- Next.js App Router provides: file-based routing, server components, API routes, middleware for auth
- Supabase provides: PostgreSQL with RLS, real-time subscriptions, auth, edge functions
- Single deployment on Vercel maintains the existing CI/CD workflow
- All tools become routes within one application sharing one data layer

**Stack:**
```
Frontend:  Next.js 14+ (App Router) / React 18 / Tailwind CSS
Backend:   Supabase (PostgreSQL + Auth + Edge Functions + Realtime)
Hosting:   Vercel (auto-deploy from GitHub)
Domain:    umttools.org (existing)
AI:        Anthropic API (Claude Sonnet for tool-specific analysis)
```

---

## Gap Resolution Plans

### GAP 1: Shared Data Model and Persistent Storage

**Problem:** Each tool stores data in isolated client-side React state that disappears on page close. No database, no common schema, no shared identifiers.

**Resolution:** Supabase PostgreSQL database with a unified schema.

**Technical Requirements:**

1. **Core Entity Tables:**

```
organizations (UIC-keyed)
├── id (uuid, PK)
├── uic (varchar, unique) — Unit Identification Code
├── name (varchar) — e.g., "1-12 CAV BN UMT"
├── echelon (enum: battalion, brigade, division, corps, theater)
├── parent_org_id (uuid, FK → organizations) — hierarchy
├── compo (enum: active, arng, usar)
├── installation (varchar)
├── created_at, updated_at

personnel
├── id (uuid, PK)
├── org_id (uuid, FK → organizations)
├── rank (varchar)
├── last_name, first_name (varchar)
├── mos (enum: 56A, 56M, 56D, 56X)
├── position_title (varchar) — e.g., "BN Chaplain", "BDE RAS NCOIC"
├── duty_status (enum: present, tdy, deployed, leave, attached)
├── user_id (uuid, FK → auth.users, nullable) — links to auth
├── created_at, updated_at

training_events
├── id (uuid, PK)
├── org_id (uuid, FK → organizations)
├── task_id (varchar) — e.g., "16-BN-3801"
├── task_name (varchar)
├── date (date)
├── location (varchar)
├── context (enum: garrison, stx, ftx, cpx, ctc, wfx, deployment)
├── rating (enum: T, T_minus, P, P_minus, U)
├── evaluator_id (uuid, FK → personnel, nullable)
├── external_evaluator (varchar, nullable)
├── attendee_ids (uuid[], FK → personnel)
├── products (jsonb) — [{name, type, url}]
├── lessons_learned (text)
├── qualifiers (jsonb) — {dayNight, mopp, extEval}
├── created_by (uuid, FK → auth.users)
├── created_at, updated_at

behavioral_observations
├── id (uuid, PK)
├── subject_id (uuid, FK → personnel) — who is being observed
├── observer_id (uuid, FK → personnel) — who is observing
├── org_id (uuid, FK → organizations)
├── observation_date (date)
├── context (varchar) — training event, garrison, CTC, etc.
├── echelon_setting (enum: battalion, brigade, division, corps)
├── ratings (jsonb) — {behavior_id: {rating: 1-5, notes: ""}}
├── word_picture (jsonb) — auto-generated summary
├── created_at, updated_at

compass_assessments (C³ Compass 360°)
├── id (uuid, PK)
├── subject_id (uuid, FK → personnel) — chaplain being assessed
├── respondent_role (enum: self, subordinate, peer, superior, commander)
├── respondent_id (uuid, FK → auth.users, nullable) — null for anonymous
├── assessment_period (varchar) — e.g., "FY26-Q2"
├── ratings (jsonb) — {quality_id: rating_1_to_5}
│   Keys: spirituality, humility, authenticity, army_values, empathy,
│   discipline, preaching, teaching, counseling, soldiering, staffing,
│   leading, visibility, affability, accessibility, bearing,
│   confidence, resilience
├── comments (jsonb) — {quality_id: "free text"}
├── created_at

idp_records (Individual Development Plans)
├── id (uuid, PK)
├── personnel_id (uuid, FK → personnel)
├── supervisor_id (uuid, FK → personnel)
├── created_date (date)
├── professional_goals (jsonb) — [{what, why, how, when, support}]
├── personal_goals (jsonb) — [{what, why, how, when, support}]
├── strengths_to_maximize (text[])
├── needs_to_mitigate (text[])
├── followup_1_date (date, nullable)
├── followup_1_notes (text, nullable)
├── followup_2_date (date, nullable)
├── followup_2_notes (text, nullable)
├── status (enum: draft, active, completed)
├── source_compass_id (uuid, FK → compass_assessments, nullable)
├── source_observation_ids (uuid[], FK → behavioral_observations)
├── created_at, updated_at

capability_gaps (CHC-CAM)
├── id (uuid, PK)
├── title (varchar)
├── description (text)
├── operational_impact (text)
├── doctrinal_reference (varchar[])
├── source_type (enum: gauge_trend, readiness_gap, oct_observation, cer_trend, other)
├── source_ids (uuid[]) — links to originating records
├── dotmlpf_domain (varchar[]) — which domains affected
├── severity (enum: critical, significant, moderate, minor)
├── proposed_solution (text)
├── solution_pathway (enum: dcr, icd, training_revision, policy_change, org_change)
├── status (enum: identified, under_analysis, documented, submitted, in_progress, resolved)
├── assigned_to (uuid, FK → personnel, nullable)
├── created_by (uuid, FK → auth.users)
├── created_at, updated_at

tasks_master (Task Analysis Engine)
├── id (varchar, PK) — e.g., "16-BN-3801"
├── title (varchar)
├── echelon (enum: team, squad, platoon, company, battalion, brigade, division, corps, theater)
├── type (enum: collective, individual_56a, individual_56m)
├── conditions (text)
├── standards (text)
├── performance_steps (jsonb) — [{step_number, description, sub_steps: []}]
├── doctrinal_source (varchar[]) — ["FM 3-83", "ATP 1-05.01"]
├── bft_capability_mapping (varchar[]) — which BFT enduring capability
├── pillar_mapping (varchar[]) — which C³ pillar(s) this task touches
├── has_teo (boolean) — whether a formal T&EO exists
├── teo_gap_notes (text, nullable) — from the 70-file analysis
├── created_at, updated_at
```

2. **Row Level Security (RLS):**
   - All tables require RLS policies before any data enters
   - Base policy: authenticated users can read data for their organization and its children
   - Write policies: based on role (see Gap 8)
   - Compass assessments: respondent cannot view aggregated results; subject can view anonymized aggregates only
   - Observation data: subject can view their own observations; observer can edit their own

3. **Shared Identifiers:**
   - UIC is the universal organizational key (matches Army standard)
   - Personnel are keyed by UUID but cross-referenced by name/rank/position for human-readable display
   - Task IDs follow the existing Army numbering convention (e.g., "16-BN-3801")
   - All timestamps in UTC; display in user's local timezone

**Acceptance Criteria:**
- [ ] All tables created in Supabase with correct types and constraints
- [ ] RLS policies active on every table
- [ ] Foreign key relationships enforced
- [ ] Seed data loaded (sample division from existing Readiness Tracker data)
- [ ] Supabase client configured in Next.js with environment variables

---

### GAP 2: Data Pipeline from Collection to Integration Tier

**Problem:** Collection-tier tools (Gauge, Readiness Tracker, RS3) cannot pass data to integration-tier tools (Command Platform, CHC-CAM).

**Resolution:** All tools read from and write to the shared Supabase database. No separate pipeline needed — the database IS the pipeline.

**Technical Requirements:**

1. **Supabase Client Library:**
```javascript
// lib/supabase/client.ts — browser client
// lib/supabase/server.ts — server component client
// lib/supabase/admin.ts — service role for edge functions
```

2. **React Hooks for Data Access:**
```javascript
// hooks/useOrganization.ts — org context + hierarchy
// hooks/useTrainingEvents.ts — CRUD for training data
// hooks/useObservations.ts — CRUD for behavioral observations
// hooks/useCompass.ts — 360° assessment management
// hooks/useCapabilityGaps.ts — CHC-CAM data access
// hooks/useTasks.ts — task master database queries
```

3. **Real-time Subscriptions:**
   - Supabase Realtime on `training_events` and `behavioral_observations` tables
   - When an OC/T submits a Gauge observation, the supervisory chaplain's dashboard updates automatically
   - When training events are logged, the readiness dashboard recalculates immediately

4. **Aggregation Queries:**
   - PostgreSQL views or functions for common aggregations:
     - `v_org_readiness` — T/P/U counts by task for an organization
     - `v_pillar_scores` — average behavioral scores by pillar for a person or org
     - `v_capability_gaps_by_domain` — gap counts by DOTMLPF-P domain
     - `v_training_trend` — rating progression over time by task
     - `v_compass_aggregate` — anonymized 360° averages by quality

**Acceptance Criteria:**
- [ ] All tools read/write to Supabase instead of local state
- [ ] Real-time subscriptions working for key tables
- [ ] Aggregation views returning correct data
- [ ] Data entered in Gauge is visible in Command Platform within 5 seconds

---

### GAP 3: Automated Output Generation

**Problem:** Evaluation narratives, IDPs, training plans, and DCRs require manual translation from tool data.

**Resolution:** AI-assisted document generation using Anthropic API with structured data injection.

**Technical Requirements:**

1. **Output Templates (Next.js API routes):**
```
/api/generate/eval-narrative    — CER narrative from Gauge + Compass data
/api/generate/idp               — IDP from Compass + observation data
/api/generate/training-plan      — Unit training plan from readiness gaps
/api/generate/word-picture       — Behavioral word picture from Gauge data
/api/generate/dcr-draft          — DOTMLPF-P Change Recommendation
/api/generate/commander-brief    — RS brief from aggregated unit data
```

2. **Generation Pattern:**
   - Fetch structured data from Supabase
   - Inject into a system prompt with doctrinal context
   - Call Anthropic API (Claude Sonnet) with specific output format instructions
   - Return formatted output to the UI
   - User reviews, edits, and exports (DOCX via docx-js or copy/paste)

3. **Doctrinal Context Injection:**
   - Each generation endpoint includes relevant doctrinal references in the system prompt
   - Evaluation narratives reference ADP 6-22 behavioral indicators and the four-pillar framework
   - IDPs reference the CHAP-T.A.L.K.S. three-step model
   - Training plans reference FORSCOM BFT MOI enduring capabilities
   - DCRs reference ACIDS Process Guide format requirements

4. **Export Formats:**
   - Screen display (formatted HTML) for review
   - Copy-to-clipboard (plain text) for pasting into other systems
   - DOCX export for formal documents (using docx-js on server)
   - PDF export for distribution

**Acceptance Criteria:**
- [ ] Each generation endpoint produces doctrinally-grounded output
- [ ] Generated content includes specific behavioral evidence, not generic language
- [ ] User can review and edit before exporting
- [ ] DOCX export produces properly formatted military documents
- [ ] API key secured in environment variables, never exposed to client

---

### GAP 4: Enterprise System Integration

**Problem:** Zero data exchange with Army enterprise systems (SharePoint, D365, OS56, EES, DTMS).

**Resolution:** Phased integration with standardized export formats as the immediate deliverable, and API-based integration as the long-term goal.

**Technical Requirements:**

1. **Phase 1 — Export Formats (build now):**
```
/api/export/training-data     — CSV/JSON compatible with DTMS import
/api/export/evaluation-data   — Format compatible with EES data fields
/api/export/os56-advisement   — JSON matching OS56 data structure
/api/export/capability-gaps   — ACIDS-formatted gap register
```

2. **Phase 2 — SharePoint Integration (after G6 approval):**
   - RS3 content deployed to SharePoint (managed by 1st Army OC/Ts)
   - Power Automate flows: SharePoint List → webhook → umttools.org API
   - DAAR submissions on SharePoint trigger data sync to Supabase

3. **Phase 3 — D365/API Integration (after pilot):**
   - Dynamics 365 Dataverse integration for personnel and training data
   - Custom connector for Supabase ↔ D365 data sync
   - Azure AD/Entra ID integration for CAC-based authentication

4. **Security for Enterprise Integration:**
   - All API endpoints require authentication
   - Data classification headers on all exports (CUI marking when applicable)
   - Audit logging for all data access and export events
   - No PII in URL parameters; all data in POST bodies over HTTPS

**Acceptance Criteria:**
- [ ] Export endpoints produce correctly formatted data
- [ ] Export includes data classification markings
- [ ] Audit log captures all export events
- [ ] Documentation for G6/IT teams describing integration requirements

---

### GAP 5: CHC-CAM Prototype (Capability Analysis Module)

**Problem:** LOE 5 tool exists only as a concept in the architecture document.

**Resolution:** Build as a route within the ecosystem app (`/cam`).

**See separate file:** `modules/chc-cam/README.md` for complete specification.

---

### GAP 6: C³ Compass Digital Implementation

**Problem:** No digital 360° feedback instrument exists in the ecosystem.

**Resolution:** Build as a route within the ecosystem app (`/compass`).

**Technical Requirements:**

1. **Survey Administration:**
   - Supervisor initiates a Compass assessment cycle for a subject
   - System generates unique anonymous links for each respondent category
   - Respondents rate all 18 C³ qualities on a 1–5 scale
   - Optional free-text comments per quality
   - Submission is final (no editing after submit)

2. **Anonymity Protection:**
   - Anonymous respondents identified only by role category (subordinate/peer/superior)
   - Minimum 3 respondents per category before results are visible (prevents identification)
   - Individual responses never displayed — only aggregated averages
   - Subject sees: average per quality, top 3 strengths, top 3 needs
   - Supervisor sees: same aggregated view plus comparison to self-assessment

3. **Integration Points:**
   - Results feed into the Gauge's Word Picture generator
   - Results auto-populate the CHAP-T.A.L.K.S. counseling preparation sheet
   - Results linked to IDP generation (Gap 3)
   - Longitudinal data stored for trend analysis (Gap 7)

4. **UI Design:**
   - Simple card-based interface: one quality per card, swipe or tap to rate
   - Progress indicator showing completion percentage
   - Mobile-first design (respondents will often use phones)
   - Estimated completion time displayed (target: 8–12 minutes)

**Acceptance Criteria:**
- [ ] Full survey flow: initiate → distribute links → collect → aggregate → display
- [ ] Anonymity enforced at database level (RLS prevents individual response access)
- [ ] Results match CHAP-T.A.L.K.S. Handbook C³ Compass format
- [ ] Mobile-responsive and usable on government phones
- [ ] Minimum respondent threshold enforced before displaying results

---

### GAP 7: Longitudinal Data and Trend Analysis

**Problem:** No time-series data structures or comparison views across observation periods.

**Resolution:** Built into the schema design (Gap 1) with dedicated trend analysis views.

**Technical Requirements:**

1. **Schema Design (already in Gap 1):**
   - All observation and assessment records include `created_at` timestamps
   - `assessment_period` field on compass assessments enables period-over-period comparison
   - `observation_date` on behavioral observations enables time-series queries

2. **PostgreSQL Views for Trends:**
```sql
-- Pillar score trend by quarter
CREATE VIEW v_pillar_trend AS
SELECT
  subject_id,
  date_trunc('quarter', observation_date) AS quarter,
  pillar,
  AVG(score) AS avg_score,
  COUNT(*) AS observation_count
FROM behavioral_observations_expanded
GROUP BY subject_id, quarter, pillar;

-- Training proficiency trend by task
CREATE VIEW v_training_trend AS
SELECT
  org_id,
  task_id,
  date_trunc('month', date) AS month,
  rating,
  COUNT(*) AS count
FROM training_events
GROUP BY org_id, task_id, month, rating;

-- Compass comparison across periods
CREATE VIEW v_compass_trend AS
SELECT
  subject_id,
  assessment_period,
  quality_key,
  AVG(rating) AS avg_rating,
  COUNT(*) AS respondent_count
FROM compass_ratings_expanded
GROUP BY subject_id, assessment_period, quality_key;
```

3. **UI Components:**
   - Line charts showing score progression over time (Recharts)
   - Comparison cards: "Last assessment vs. current" with delta indicators
   - Heat maps: quality × time period with color-coded scores
   - Sparklines in summary tables for quick trend visibility

**Acceptance Criteria:**
- [ ] Trend views return correct data across multiple assessment periods
- [ ] Charts render with at least 2 data points (show message if <2)
- [ ] Delta indicators clearly show improvement/regression
- [ ] Data loads progressively (skeleton → populated) for perceived speed

---

### GAP 8: Role-Based Access and Multi-User Functionality

**Problem:** No user identity, roles, or permissions.

**Resolution:** Supabase Auth with role-based RLS policies.

**Technical Requirements:**

1. **User Roles:**
```
admin           — Full access to all data and settings
supervisory_ch  — Read/write for own org and subordinate orgs; initiate Compass assessments
unit_ch         — Read/write for own org; self-assessment; view own observations
ras             — Read/write for own org; view own observations
commander       — Read for own org; submit rater assessments
oct             — Read/write observations for assigned units
respondent      — Write-only for specific Compass assessment (anonymous)
```

2. **Authentication Flow:**
   - Phase 1 (current Vercel deployment): Email/password via Supabase Auth
   - Phase 2 (enterprise): CAC/Entra ID integration via Supabase custom provider
   - Demo mode: pre-authenticated demo user with read-only sample data

3. **RLS Policy Examples:**
```sql
-- Personnel can only see people in their org or child orgs
CREATE POLICY "personnel_read" ON personnel
FOR SELECT USING (
  org_id IN (
    SELECT id FROM organizations
    WHERE id = auth.jwt()->>'org_id'
    OR parent_org_id = auth.jwt()->>'org_id'
  )
);

-- Compass responses: respondent can write but never read others' responses
CREATE POLICY "compass_write" ON compass_assessments
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "compass_read_aggregate_only" ON compass_assessments
FOR SELECT USING (
  -- Only the subject or their supervisor can read, and only aggregated views
  subject_id IN (
    SELECT id FROM personnel WHERE user_id = auth.uid()
  )
  OR
  EXISTS (
    SELECT 1 FROM personnel p
    JOIN organizations o ON p.org_id = o.id
    WHERE p.user_id = auth.uid()
    AND p.org_id = (SELECT parent_org_id FROM organizations WHERE id = (
      SELECT org_id FROM personnel WHERE id = compass_assessments.subject_id
    ))
  )
);
```

4. **UI Access Control:**
   - Navigation shows only routes the user's role can access
   - Middleware checks auth on every server component/API route
   - Unauthorized access returns 403, not a redirect (prevents confusion)
   - Demo mode banner: "DEMONSTRATION MODE — Sample Data Only"

**Acceptance Criteria:**
- [ ] Users can register and log in via Supabase Auth
- [ ] Role assignment works correctly
- [ ] RLS policies prevent unauthorized data access
- [ ] Navigation adapts to user role
- [ ] Demo mode works without authentication

---

## Build Sequence for Claude Code

**Phase 1 — Foundation (build first):**
1. Next.js project scaffold with App Router, Tailwind, Supabase client
2. Supabase schema (all tables, RLS policies, views)
3. Auth flow (login, register, role assignment, demo mode)
4. Shared UI components (layout, nav, cards, tables, forms)
5. Organization/personnel management pages

**Phase 2 — Core Tools (rebuild existing):**
6. Readiness Tracker (rebuild with Supabase backend)
7. Behavioral Sustainment Gauge (rebuild with Supabase backend)
8. SpiritReady (migrate to shared layout, keep existing data.js)
9. C³ Compass (new build)

**Phase 3 — Integration & Analysis:**
10. Integrated Command Platform (rebuild with live data access)
11. CHC-CAM (new build: Task Analysis Engine + Capability Gap Register)
12. Automated output generation (API routes)
13. Trend analysis views and dashboards

**Phase 4 — Polish & Enterprise:**
14. Export endpoints (DTMS, EES, OS56 formats)
15. RS3 content (static pages within the app, pending SharePoint transition)
16. Mobile responsiveness pass
17. Demo mode with comprehensive sample data
18. Documentation and train-the-trainer materials

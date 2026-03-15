# CHC Capability Analysis Module (CHC-CAM)

## Route: `/cam`

## Purpose
The CHC-CAM is the LOE 5 tool — the only component in the ecosystem purpose-built for requirements-based force structure analysis. It translates aggregated operational data into the structured analysis products required by the JCIDS/ACIDS requirements generation process.

## User Personas

| Persona | Uses CAM For | Typical Echelon |
|---------|-------------|-----------------|
| CDID Analyst | Formal gap identification, DCR drafting, CBA support | HQDA |
| Senior OC/T | Pattern identification from training observations, gap recommendation | Corps/Division |
| Supervisory Chaplain | Identifying systemic training needs across subordinate units | Division/Corps |
| OCCH Staff Officer | Force structure recommendations, TAA input preparation | HQDA |

## Sub-Routes

```
/cam                    — Dashboard (gap summary, trend indicators, action items)
/cam/tasks              — Task Analysis Engine
/cam/tasks/[id]         — Individual task detail with proficiency data
/cam/gaps               — Capability Gap Register
/cam/gaps/new           — New gap entry wizard
/cam/gaps/[id]          — Gap detail with DOTMLPF-P analysis
/cam/gaps/[id]/analyze  — DOTMLPF-P analysis workspace
/cam/analysis           — Cross-cutting analysis views
/cam/reports            — Report generation (DCR, CBA input, force structure rec)
```

## Component 1: Task Analysis Engine (`/cam/tasks`)

### What It Does
Maintains the authoritative database of all CMF 56 individual and collective tasks. Links each task to proficiency data from the Readiness Tracker, behavioral observation data from the Gauge, and the positions (by echelon and COMPO) required to perform them.

### Data Source
- Seed data: 70 T&EO files + 805D individual task files (already analyzed)
- Live data: `training_events` table (T/P/U ratings by task)
- Live data: `behavioral_observations` table (behavior-to-task mapping)

### UI Design

**Task Library View (`/cam/tasks`):**
```
┌─────────────────────────────────────────────────────────┐
│ Task Analysis Engine                         [+ Add Task]│
├─────────────────────────────────────────────────────────┤
│ Filter: [Echelon ▾] [Type ▾] [Has T&EO ▾] [Search...] │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 16-BN-3801                                          │ │
│ │ Provide Religious Support to a Battalion             │ │
│ │ Echelon: Battalion  │  Type: Collective              │ │
│ │ T&EO: ✓  │  Pillar: Competence, Connection          │ │
│ │ Force Proficiency: ██████░░░░ 62% T/P (14 evals)    │ │
│ │ [View Detail →]                                      │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 805D-56A-6000                                       │ │
│ │ Advise the Commander on Religious Affairs             │ │
│ │ Echelon: All  │  Type: Individual (56A)              │ │
│ │ T&EO: ✗ — Gap identified in analysis                │ │
│ │ Pillar: Competence (Staffing, Leading)               │ │
│ │ [View Detail →]                                      │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Task Detail View (`/cam/tasks/[id]`):**
- Task metadata (conditions, standards, performance steps)
- Proficiency data chart: T/P/U distribution across all units that have trained this task
- Trend line: proficiency over time (quarterly)
- Linked behavioral indicators from the Gauge
- Position requirements matrix: which echelon/MOS/grade should perform this task
- T&EO gap notes (from the 70-file analysis)
- Button: "Flag Capability Gap" → creates a new gap pre-populated with this task's data

### Key Features
1. **Searchable task database** with filters for echelon, type, T&EO status, pillar mapping
2. **Force proficiency heatmap**: visual matrix of all tasks × echelons, color-coded by aggregate T/P/U
3. **T&EO gap identification**: tasks flagged where no formal T&EO exists or where the existing T&EO has outdated references
4. **Task-to-position matrix**: shows which positions (by echelon and COMPO) are required for each task, highlighting where current authorizations may not support the requirement

---

## Component 2: Capability Gap Register (`/cam/gaps`)

### What It Does
Provides a structured database of identified capability gaps with full DOTMLPF-P analysis capability, status tracking, and requirements document generation.

### Gap Entry Wizard (`/cam/gaps/new`)

**Step 1: Identify the Gap**
```
┌─────────────────────────────────────────────────────────┐
│ New Capability Gap — Step 1 of 4                        │
│                                                         │
│ Gap Title                                               │
│ [Short, descriptive title                            ]  │
│                                                         │
│ Description                                             │
│ [What capability is missing or inadequate?           ]  │
│ [                                                    ]  │
│                                                         │
│ Operational Impact                                      │
│ [How does this gap affect LSCO readiness?            ]  │
│ [                                                    ]  │
│                                                         │
│ Severity    ◉ Critical  ○ Significant  ○ Moderate       │
│                                                         │
│                                      [Next: Sources →]  │
└─────────────────────────────────────────────────────────┘
```

**Step 2: Link Sources**
```
┌─────────────────────────────────────────────────────────┐
│ New Capability Gap — Step 2 of 4                        │
│                                                         │
│ How was this gap identified?                            │
│ ○ Gauge trend (behavioral observation pattern)          │
│ ○ Readiness gap (training proficiency data)             │
│ ○ OC/T observation (CTC/WFX AAR data)                  │
│ ○ CER/Compass trend (evaluation pattern)                │
│ ○ T&EO analysis (standards gap)                         │
│ ○ Other                                                 │
│                                                         │
│ Supporting Evidence                                     │
│ [Select from ecosystem data ▾]                          │
│ ┌───────────────────────────────────────────────┐       │
│ │ ☑ Gauge: BN-level "Staffing" avg 2.1/5 (Q1)  │       │
│ │ ☑ Training: 16-BN-3802 rated U in 8/14 units │       │
│ │ ☐ Compass: "Leading" declined 0.8 pts YoY    │       │
│ └───────────────────────────────────────────────┘       │
│                                                         │
│ Doctrinal References                                    │
│ [FM 3-83, Para 4-12 ×] [+ Add Reference]              │
│                                                         │
│                          [← Back]  [Next: Scope →]     │
└─────────────────────────────────────────────────────────┘
```

**Step 3: Define Scope**
```
┌─────────────────────────────────────────────────────────┐
│ New Capability Gap — Step 3 of 4                        │
│                                                         │
│ Affected Echelons (select all that apply)               │
│ ☐ Battalion  ☑ Brigade  ☑ Division  ☐ Corps            │
│                                                         │
│ Affected Components                                     │
│ ☑ Active Duty  ☑ Army National Guard  ☐ Army Reserve   │
│                                                         │
│ DOTMLPF-P Domains (initial assessment)                  │
│ ☑ Training  ☑ Organization  ☐ Doctrine  ☐ Materiel     │
│ ☐ Leadership/Education  ☑ Personnel  ☐ Facilities      │
│ ☐ Policy                                                │
│                                                         │
│                        [← Back]  [Next: Review →]      │
└─────────────────────────────────────────────────────────┘
```

**Step 4: Review and Submit**
- Summary card of all entered data
- "Save as Draft" or "Submit for Analysis"
- Submitted gaps appear in the register with status "Identified"

### Gap Detail View (`/cam/gaps/[id]`)
- Full gap information with edit capability
- Status tracker: Identified → Under Analysis → Documented → Submitted → In Progress → Resolved
- Linked DOTMLPF-P analysis (see Component 3)
- Linked source data with drill-through to originating records
- Action log: who did what and when
- "Generate DCR Draft" button (when analysis is complete)

### Gap Register List View (`/cam/gaps`)
```
┌─────────────────────────────────────────────────────────┐
│ Capability Gap Register                    [+ New Gap]  │
├─────────────────────────────────────────────────────────┤
│ [Status ▾] [Severity ▾] [Domain ▾] [Pathway ▾]        │
├────┬──────────────────────┬──────┬────────┬────────────┤
│ ID │ Title                │Sev.  │Status  │Pathway     │
├────┼──────────────────────┼──────┼────────┼────────────┤
│ G1 │ BN CP integration    │ ●●●  │Analyze │Training    │
│ G2 │ Corps RS planning    │ ●●   │Ident.  │Org Change  │
│ G3 │ 56M force protection │ ●●●● │Doc'd   │DCR         │
│ G4 │ Spiritual readiness  │ ●●   │Ident.  │Pending     │
│    │ assessment tools     │      │        │            │
└────┴──────────────────────┴──────┴────────┴────────────┘
```

---

## Component 3: DOTMLPF-P Analysis Workspace (`/cam/gaps/[id]/analyze`)

### What It Does
Provides a guided, domain-by-domain analysis template that walks the analyst through each DOTMLPF-P domain with ecosystem data pre-populated.

### UI Design
```
┌─────────────────────────────────────────────────────────┐
│ DOTMLPF-P Analysis: [Gap Title]                         │
│ Status: Under Analysis                                  │
├─────────────────────────────────────────────────────────┤
│ [D] [O] [T] [M] [L&E] [P] [F] [Pol]  ← domain tabs   │
├─────────────────────────────────────────────────────────┤
│ TRAINING                                                │
│                                                         │
│ ┌─ Ecosystem Data (auto-populated) ──────────────────┐  │
│ │ • Task 16-BN-3802 rated U in 57% of units (n=14)  │  │
│ │ • BFT-AT submissions: 6/14 units on time           │  │
│ │ • No RS3 module covers this capability              │  │
│ └────────────────────────────────────────────────────┘  │
│                                                         │
│ Current State                                           │
│ [Describe current training for this capability...    ]  │
│                                                         │
│ Desired State                                           │
│ [What should training look like to close this gap?   ]  │
│                                                         │
│ Gap Assessment                                          │
│ [What is the specific training gap?                  ]  │
│                                                         │
│ Recommended Action                                      │
│ [What training change would close this gap?          ]  │
│                                                         │
│ Confidence: ○ High  ◉ Medium  ○ Low                    │
│                                                         │
│                              [Save] [Next Domain →]    │
└─────────────────────────────────────────────────────────┘
```

### Auto-Population Logic
For each domain, the workspace queries relevant ecosystem data:

| Domain | Auto-Populated Data |
|--------|-------------------|
| Doctrine | T&EO gap analysis results; list of tasks without formal T&EOs |
| Organization | Task-position matrix gaps; echelon analysis from Gauge |
| Training | Readiness Tracker T/P/U data; BFT-AT completion rates; RS3 module coverage |
| Materiel | (Minimal — flag if RS3 identified logistics gaps) |
| Leadership & Education | Compass trends for "Leading" quality; IDP completion rates |
| Personnel | Gauge competency data by MOS; manning data from personnel table |
| Facilities | SpiritReady accommodation data; training venue data from Readiness Tracker |
| Policy | CER Constitutional Fidelity data; AR 165-1 gap analysis notes |

---

## Component 4: Report Generation (`/cam/reports`)

### Available Reports

1. **DOTMLPF-P Change Recommendation (DCR) Draft**
   - Generated from completed DOTMLPF-P analysis
   - Formatted per ACIDS Process Guide template
   - Includes: gap description, analysis by domain, recommended changes, supporting evidence
   - Export: DOCX

2. **CBA Input Package**
   - Functional Needs Analysis (FNA) from gap data
   - Functional Solutions Analysis (FSA) from DOTMLPF-P analysis
   - Export: DOCX

3. **Force Structure Recommendation**
   - Generated from Organization-domain analysis + task-position matrix
   - Identifies positions where authorizations don't support required capabilities
   - Formatted for submission to OCCH/USAFMSA
   - Export: DOCX

4. **Gap Status Briefing**
   - Slide-ready summary of all active gaps
   - Severity distribution, domain distribution, status pipeline
   - Export: Copy-paste formatted for PowerPoint

5. **Training Gap Summary**
   - Aggregated T/P/U data with trend analysis
   - Tasks below proficiency threshold
   - Recommended training priorities
   - Export: DOCX or CSV

---

## CAM Dashboard (`/cam`)

### Layout
```
┌─────────────────────────────────────────────────────────┐
│ CHC Capability Analysis Module                          │
├──────────────────┬──────────────────────────────────────┤
│ Active Gaps      │ Gap Pipeline                         │
│ ┌──────────────┐ │ Identified ████████░░░░░░░░  12     │
│ │   27         │ │ Analyzing  ████░░░░░░░░░░░░   6     │
│ │ total gaps   │ │ Documented ██░░░░░░░░░░░░░░   4     │
│ │              │ │ Submitted  █░░░░░░░░░░░░░░░   2     │
│ │ 4 critical   │ │ In Progress ██░░░░░░░░░░░░░   3     │
│ │ 8 significant│ │                                      │
│ │ 15 moderate  │ │                                      │
│ └──────────────┘ │                                      │
├──────────────────┼──────────────────────────────────────┤
│ By Domain        │ Recent Activity                      │
│ Training    ████ │ • G3: DCR draft generated (2h ago)   │
│ Org         ███  │ • G7: New gap identified by OC/T     │
│ Personnel   ██   │ • G1: DOTMLPF analysis completed     │
│ Doctrine    ██   │ • G12: Status → In Progress          │
│ L&E         █    │                                      │
│ Policy      █    │                                      │
├──────────────────┴──────────────────────────────────────┤
│ Task Proficiency Alerts                                 │
│ ⚠ 16-BN-3802 (Conduct CP Ops): 57% Untrained          │
│ ⚠ 805D-56A-6203 (Conduct RAA): No T&EO exists          │
│ ⚠ 16-BDE-4800 (MASCAL RS): Declining trend (-1.2/qtr) │
└─────────────────────────────────────────────────────────┘
```

---

## UX Principles (for chaplains who are not technically savvy)

1. **Wizard-based entry**: Every multi-step process uses a step-by-step wizard with clear progress indicators. No one needs to know the DOTMLPF-P acronym to use the tool — the wizard asks plain-language questions that map to the domains.

2. **Progressive disclosure**: The dashboard shows summary cards. Detail is one click away. Analysis workspace is behind another click. No user ever sees all the complexity at once.

3. **Pre-populated where possible**: When creating a new gap from the Task Analysis Engine, the gap form is pre-populated with the task's proficiency data, T&EO gap notes, and affected echelons. The DOTMLPF-P workspace pre-populates ecosystem data for each domain. The analyst adds context and judgment, not data.

4. **Plain language**: "This task is trained below standard in most units" instead of "T/P/U distribution indicates sub-threshold proficiency across the enterprise." Doctrinal terminology is used where doctrinally required, with tooltips for definitions.

5. **Visual status tracking**: Every gap has a clear status pipeline (colored dots progressing left to right). Users can see at a glance where things stand without reading tables.

6. **One-click reports**: The "Generate DCR Draft" button produces a complete document from analysis data. The user reviews and edits — they don't build the document from scratch.

7. **Mobile-friendly observation entry**: OC/Ts at CTC rotations need to flag gaps from a phone or tablet. The gap entry wizard must work on mobile with large touch targets and minimal typing.

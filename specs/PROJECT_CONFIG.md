# Project Configuration — Claude Code Setup

## Initialize

```bash
npx create-next-app@latest chc-ecosystem --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd chc-ecosystem
npm install @supabase/supabase-js @supabase/ssr
npm install recharts lucide-react
npm install docx file-saver
npm install -D @types/file-saver
```

## Directory Structure

```
chc-ecosystem/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (nav, auth provider)
│   │   ├── page.tsx                      # Landing/dashboard (route: /)
│   │   ├── globals.css                   # Tailwind + custom variables
│   │   ├── login/
│   │   │   └── page.tsx                  # Auth page
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx                  # Main dashboard after login
│   │   │
│   │   ├── training/                     # LOE 1: Readiness Tracker
│   │   │   ├── page.tsx                  # Training dashboard
│   │   │   ├── events/
│   │   │   │   ├── page.tsx              # Training event list
│   │   │   │   ├── new/page.tsx          # New event wizard
│   │   │   │   └── [id]/page.tsx         # Event detail
│   │   │   ├── readiness/
│   │   │   │   └── page.tsx              # Readiness matrix (T/P/U heatmap)
│   │   │   └── metl/
│   │   │       └── page.tsx              # METL management
│   │   │
│   │   ├── gauge/                        # LOE 1/2/3: Behavioral Sustainment Gauge
│   │   │   ├── page.tsx                  # Gauge dashboard
│   │   │   ├── observe/
│   │   │   │   ├── page.tsx              # Select subject → start observation
│   │   │   │   └── [id]/page.tsx         # Active observation session
│   │   │   ├── history/
│   │   │   │   └── page.tsx              # Observation history
│   │   │   └── trends/
│   │   │       └── page.tsx              # Trend analysis
│   │   │
│   │   ├── compass/                      # LOE 2/3: C³ Compass 360°
│   │   │   ├── page.tsx                  # Compass dashboard
│   │   │   ├── cycles/
│   │   │   │   ├── page.tsx              # Cycle management
│   │   │   │   ├── new/page.tsx          # Initiate new cycle
│   │   │   │   └── [id]/page.tsx         # Cycle detail + results
│   │   │   └── respond/
│   │   │       └── [token]/page.tsx      # Anonymous response form
│   │   │
│   │   ├── personnel/                    # LOE 2: Personnel Management
│   │   │   ├── page.tsx                  # Personnel roster
│   │   │   ├── [id]/page.tsx             # Individual profile
│   │   │   └── [id]/
│   │   │       ├── eval/page.tsx         # Evaluation evidence summary
│   │   │       ├── idp/page.tsx          # IDP management
│   │   │       └── development/page.tsx  # Development history
│   │   │
│   │   ├── spiritready/                  # LOE 1/3: SpiritReady
│   │   │   └── page.tsx                  # Spiritual disciplines browser
│   │   │
│   │   ├── command/                      # LOE 4: Integrated Command Platform
│   │   │   ├── page.tsx                  # Command platform hub
│   │   │   └── [skill]/page.tsx          # Individual AI SKILL
│   │   │
│   │   ├── cam/                          # LOE 5: CHC-CAM
│   │   │   ├── page.tsx                  # CAM dashboard
│   │   │   ├── tasks/
│   │   │   │   ├── page.tsx              # Task Analysis Engine
│   │   │   │   └── [id]/page.tsx         # Task detail
│   │   │   ├── gaps/
│   │   │   │   ├── page.tsx              # Gap Register
│   │   │   │   ├── new/page.tsx          # New gap wizard
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx          # Gap detail
│   │   │   │       └── analyze/page.tsx  # DOTMLPF-P workspace
│   │   │   ├── analysis/
│   │   │   │   └── page.tsx              # Cross-cutting analysis
│   │   │   └── reports/
│   │   │       └── page.tsx              # Report generation
│   │   │
│   │   ├── admin/                        # Admin panel
│   │   │   ├── page.tsx                  # Admin dashboard
│   │   │   ├── users/page.tsx            # User management
│   │   │   ├── orgs/page.tsx             # Organization management
│   │   │   └── audit/page.tsx            # Audit log viewer
│   │   │
│   │   └── api/
│   │       ├── generate/
│   │       │   ├── eval-narrative/route.ts
│   │       │   ├── idp/route.ts
│   │       │   ├── training-plan/route.ts
│   │       │   ├── word-picture/route.ts
│   │       │   ├── dcr-draft/route.ts
│   │       │   └── commander-brief/route.ts
│   │       └── export/
│   │           ├── training-data/route.ts
│   │           ├── evaluation-data/route.ts
│   │           └── capability-gaps/route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx               # Main navigation sidebar
│   │   │   ├── MobileNav.tsx             # Bottom nav for mobile
│   │   │   ├── Breadcrumbs.tsx
│   │   │   ├── DemoBanner.tsx
│   │   │   └── PageHeader.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── StatusPill.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Wizard.tsx                # Multi-step form wrapper
│   │   │   ├── EmptyState.tsx
│   │   │   └── Tooltip.tsx
│   │   ├── charts/
│   │   │   ├── PillarRadar.tsx           # C³ pillar radar chart
│   │   │   ├── ReadinessHeatmap.tsx       # T/P/U matrix
│   │   │   ├── TrendLine.tsx             # Time-series line chart
│   │   │   ├── GapPipeline.tsx           # Status pipeline visualization
│   │   │   └── DotmlpfBar.tsx            # Domain distribution bar chart
│   │   └── shared/
│   │       ├── PersonnelCard.tsx
│   │       ├── TaskCard.tsx
│   │       ├── GapCard.tsx
│   │       ├── ObservationCard.tsx
│   │       ├── TrainingEventCard.tsx
│   │       └── PillarBadge.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useOrganization.ts
│   │   ├── usePersonnel.ts
│   │   ├── useTrainingEvents.ts
│   │   ├── useObservations.ts
│   │   ├── useCompass.ts
│   │   ├── useCapabilityGaps.ts
│   │   ├── useTasks.ts
│   │   ├── useIdp.ts
│   │   └── useRealtime.ts
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Browser client
│   │   │   ├── server.ts                 # Server component client
│   │   │   ├── middleware.ts             # Auth middleware
│   │   │   └── types.ts                  # Generated types
│   │   ├── data/
│   │   │   ├── tasks-seed.ts             # Task master seed data (from T&EO analysis)
│   │   │   ├── indicators-seed.ts        # Behavioral indicator seed data
│   │   │   ├── compass-qualities.ts      # C³ quality definitions
│   │   │   ├── demo-data.ts              # Complete demo dataset
│   │   │   └── spiritready-data.ts       # Faith traditions + disciplines (from existing data.js)
│   │   ├── utils/
│   │   │   ├── word-picture.ts           # Word picture generation logic
│   │   │   ├── readiness-calc.ts         # T/P/U aggregation calculations
│   │   │   ├── trend-calc.ts             # Trend analysis calculations
│   │   │   └── format.ts                 # Date, rank, and display formatting
│   │   └── constants/
│   │       ├── echelons.ts
│   │       ├── pillars.ts
│   │       ├── dotmlpf.ts
│   │       └── roles.ts
│   │
│   └── middleware.ts                     # Auth check middleware
│
├── schema/
│   ├── 001_complete_schema.sql
│   ├── 002_seed_reference_data.sql       # Tasks, indicators, compass qualities
│   └── 003_seed_demo_data.sql            # Demo division dataset
│
├── docs/
│   ├── MASTER_RESOLUTION_PLAN.md
│   └── ARCHITECTURE.md
│
├── agents/
│   └── AGENT_DEFINITIONS.md
│
├── .env.local.example
│   # NEXT_PUBLIC_SUPABASE_URL=
│   # NEXT_PUBLIC_SUPABASE_ANON_KEY=
│   # SUPABASE_SERVICE_ROLE_KEY=
│   # ANTHROPIC_API_KEY=
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...  # Server-side only, never exposed

# Anthropic (for AI generation endpoints)
ANTHROPIC_API_KEY=sk-ant-...  # Server-side only

# App Config
NEXT_PUBLIC_DEMO_MODE=true  # Toggle demo mode
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#002050", light: "#1B3A5C" },
        gold: { DEFAULT: "#C09A36", light: "#D4B05C" },
        fluent: { DEFAULT: "#0078D4", hover: "#106EBE", light: "#DEECF9" },
        surface: { DEFAULT: "#FAF9F8", card: "#FFFFFF" },
        border: { DEFAULT: "#EDEBE9" },
        text: { DEFAULT: "#323130", secondary: "#605E5C", tertiary: "#A19F9D" },
        pillar: {
          character: "#1B5E20",
          competence: "#0D47A1",
          connection: "#E65100",
          constitutional: "#4A148C",
        },
        status: {
          trained: "#107C10",
          practiced: "#FFB900",
          untrained: "#D13438",
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

## Build Phases (Claude Code execution order)

### Phase 1: Foundation
```
Task 1.1: Initialize Next.js project with config above
Task 1.2: Set up Supabase project and run schema SQL
Task 1.3: Configure Supabase client (client.ts, server.ts, middleware.ts)
Task 1.4: Build auth flow (login page, middleware, useAuth hook)
Task 1.5: Build shared UI components (Button, Card, Input, Table, Wizard, etc.)
Task 1.6: Build layout (Sidebar, MobileNav, Breadcrumbs, DemoBanner, PageHeader)
Task 1.7: Seed reference data (tasks, indicators, compass qualities)
Task 1.8: Seed demo data (division dataset)
Task 1.9: Build admin pages (user management, org management)
```

### Phase 2: Core Tools
```
Task 2.1: Build Readiness Tracker (/training/*)
Task 2.2: Build Behavioral Sustainment Gauge (/gauge/*)
Task 2.3: Migrate SpiritReady (/spiritready)
Task 2.4: Build C³ Compass (/compass/*)
Task 2.5: Build Personnel Management (/personnel/*)
```

### Phase 3: Analysis & Integration
```
Task 3.1: Build CHC-CAM dashboard (/cam)
Task 3.2: Build Task Analysis Engine (/cam/tasks/*)
Task 3.3: Build Capability Gap Register (/cam/gaps/*)
Task 3.4: Build DOTMLPF-P Analysis Workspace (/cam/gaps/[id]/analyze)
Task 3.5: Build Report Generation (/cam/reports)
Task 3.6: Build Integrated Command Platform (/command/*)
Task 3.7: Build AI generation API routes (/api/generate/*)
Task 3.8: Build export API routes (/api/export/*)
```

### Phase 4: Polish
```
Task 4.1: Main dashboard with cross-LOE summary cards
Task 4.2: Trend analysis views across all tools
Task 4.3: Mobile responsiveness pass
Task 4.4: Demo mode validation (all features work without auth)
Task 4.5: QA/QC review (run Agent 5 checklist)
Task 4.6: Deployment to Vercel + domain configuration
```

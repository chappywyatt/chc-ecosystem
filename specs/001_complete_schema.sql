-- ═══════════════════════════════════════════════════════════════
-- CHC DIGITAL ECOSYSTEM — COMPLETE DATABASE SCHEMA
-- Supabase PostgreSQL
-- Version 1.0 — March 2026
-- ═══════════════════════════════════════════════════════════════

-- ── ENUMS ────────────────────────────────────────────────────

CREATE TYPE echelon_type AS ENUM (
  'team', 'squad', 'platoon', 'company', 'battalion',
  'brigade', 'division', 'corps', 'theater'
);

CREATE TYPE compo_type AS ENUM ('active', 'arng', 'usar');

CREATE TYPE mos_type AS ENUM ('56A', '56M', '56D', '56X');

CREATE TYPE duty_status_type AS ENUM (
  'present', 'tdy', 'deployed', 'leave', 'attached', 'rear_d'
);

CREATE TYPE training_rating AS ENUM ('T', 'T_minus', 'P', 'P_minus', 'U');

CREATE TYPE training_context AS ENUM (
  'garrison', 'stx', 'ftx', 'cpx', 'ctc', 'wfx', 'deployment',
  'home_station', 'ltp', 'mfgi'
);

CREATE TYPE compass_role AS ENUM (
  'self', 'subordinate', 'peer', 'superior', 'commander'
);

CREATE TYPE idp_status AS ENUM ('draft', 'active', 'completed', 'archived');

CREATE TYPE gap_source_type AS ENUM (
  'gauge_trend', 'readiness_gap', 'oct_observation',
  'cer_trend', 'compass_trend', 'teo_analysis', 'other'
);

CREATE TYPE gap_severity AS ENUM ('critical', 'significant', 'moderate', 'minor');

CREATE TYPE gap_pathway AS ENUM (
  'dcr', 'icd', 'training_revision', 'policy_change',
  'org_change', 'multiple', 'pending_analysis'
);

CREATE TYPE gap_status AS ENUM (
  'identified', 'under_analysis', 'documented',
  'submitted', 'in_progress', 'resolved', 'deferred'
);

CREATE TYPE task_type AS ENUM (
  'collective', 'individual_56a', 'individual_56m'
);

CREATE TYPE user_role AS ENUM (
  'admin', 'supervisory_ch', 'unit_ch', 'ras',
  'commander', 'oct', 'respondent', 'viewer'
);

CREATE TYPE dotmlpf_domain AS ENUM (
  'doctrine', 'organization', 'training', 'materiel',
  'leadership_education', 'personnel', 'facilities', 'policy'
);


-- ── CORE TABLES ─────────────────────────────────────────────

-- Organizations (UIC-keyed hierarchy)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uic VARCHAR(6) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  echelon echelon_type NOT NULL,
  parent_org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  compo compo_type NOT NULL DEFAULT 'active',
  installation VARCHAR(100),
  higher_hq VARCHAR(200),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_org_parent ON organizations(parent_org_id);
CREATE INDEX idx_org_echelon ON organizations(echelon);
CREATE INDEX idx_org_uic ON organizations(uic);

-- Personnel
CREATE TABLE personnel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  rank VARCHAR(20) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  mos mos_type NOT NULL,
  position_title VARCHAR(200) NOT NULL,
  duty_status duty_status_type NOT NULL DEFAULT 'present',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email VARCHAR(200),
  phone VARCHAR(20),
  deros DATE,
  ets_ead DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_personnel_org ON personnel(org_id);
CREATE INDEX idx_personnel_user ON personnel(user_id);
CREATE INDEX idx_personnel_mos ON personnel(mos);

-- User Profiles (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  personnel_id UUID REFERENCES personnel(id) ON DELETE SET NULL,
  org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  role user_role NOT NULL DEFAULT 'viewer',
  display_name VARCHAR(200),
  is_demo BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ── TRAINING DOMAIN ─────────────────────────────────────────

-- Task Master Database (populated from T&EO analysis)
CREATE TABLE tasks_master (
  id VARCHAR(20) PRIMARY KEY, -- e.g., "16-BN-3801"
  title VARCHAR(500) NOT NULL,
  echelon echelon_type NOT NULL,
  task_type task_type NOT NULL,
  conditions TEXT,
  standards TEXT,
  performance_steps JSONB NOT NULL DEFAULT '[]',
  -- [{step_number, description, sub_steps: [], go_nogo: bool}]
  doctrinal_source VARCHAR(100)[] NOT NULL DEFAULT '{}',
  bft_capability_mapping VARCHAR(200)[] DEFAULT '{}',
  pillar_mapping VARCHAR(50)[] DEFAULT '{}',
  -- which C³ pillar(s): character, competence, connection, constitutional
  has_teo BOOLEAN NOT NULL DEFAULT true,
  teo_gap_notes TEXT,
  reference_updates_needed TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tasks_echelon ON tasks_master(echelon);
CREATE INDEX idx_tasks_type ON tasks_master(task_type);

-- Training Events
CREATE TABLE training_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  task_id VARCHAR(20) NOT NULL REFERENCES tasks_master(id),
  date DATE NOT NULL,
  location VARCHAR(200),
  context training_context NOT NULL DEFAULT 'garrison',
  rating training_rating,
  evaluator_id UUID REFERENCES personnel(id) ON DELETE SET NULL,
  external_evaluator VARCHAR(200),
  attendee_ids UUID[] DEFAULT '{}',
  products JSONB DEFAULT '[]',
  -- [{name: "1-12CAV_MASCAL_SOP", type: "SOP", url: null}]
  lessons_learned TEXT,
  qualifiers JSONB DEFAULT '{}',
  -- {dayNight: "Day"|"Night", mopp: "None"|"MOPP1-4", extEval: bool}
  metl_linked BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_training_org ON training_events(org_id);
CREATE INDEX idx_training_task ON training_events(task_id);
CREATE INDEX idx_training_date ON training_events(date);
CREATE INDEX idx_training_rating ON training_events(rating);

-- METL Designations
CREATE TABLE metl_designations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  task_id VARCHAR(20) NOT NULL REFERENCES tasks_master(id),
  designated_date DATE NOT NULL DEFAULT CURRENT_DATE,
  rationale TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(org_id, task_id)
);


-- ── BEHAVIORAL OBSERVATION DOMAIN ───────────────────────────

-- Behavioral Indicators (the Gauge's behavior library)
CREATE TABLE behavioral_indicators (
  id VARCHAR(20) PRIMARY KEY, -- e.g., "CH-1.1"
  pillar VARCHAR(50) NOT NULL, -- character, competence, connection, constitutional
  sub_dimension VARCHAR(100) NOT NULL, -- e.g., "Spirituality", "Preaching"
  domain VARCHAR(20) NOT NULL, -- ministry, military
  behavior_text TEXT NOT NULL,
  indicator_type VARCHAR(1) NOT NULL CHECK (indicator_type IN ('R', 'E')),
  -- R = Required, E = Expected
  echelon_minimum echelon_type NOT NULL DEFAULT 'battalion',
  -- lowest echelon where this behavior is expected
  doctrinal_source VARCHAR(200),
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_indicators_pillar ON behavioral_indicators(pillar);
CREATE INDEX idx_indicators_echelon ON behavioral_indicators(echelon_minimum);

-- Behavioral Observations (Gauge submissions)
CREATE TABLE behavioral_observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES personnel(id) ON DELETE CASCADE,
  observer_id UUID NOT NULL REFERENCES personnel(id),
  org_id UUID NOT NULL REFERENCES organizations(id),
  observation_date DATE NOT NULL,
  context VARCHAR(200),
  echelon_setting echelon_type NOT NULL,
  training_event_id UUID REFERENCES training_events(id) ON DELETE SET NULL,
  ratings JSONB NOT NULL DEFAULT '{}',
  -- {indicator_id: {rating: 0-5, notes: ""}}  0 = not observed
  word_picture JSONB DEFAULT '{}',
  -- auto-generated: {strengths: [], development_needs: [], summary: ""}
  overall_notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_obs_subject ON behavioral_observations(subject_id);
CREATE INDEX idx_obs_org ON behavioral_observations(org_id);
CREATE INDEX idx_obs_date ON behavioral_observations(observation_date);


-- ── C³ COMPASS DOMAIN ───────────────────────────────────────

-- Compass Assessment Cycles
CREATE TABLE compass_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES personnel(id) ON DELETE CASCADE,
  initiated_by UUID NOT NULL REFERENCES personnel(id),
  assessment_period VARCHAR(20) NOT NULL, -- e.g., "FY26-Q2"
  status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'collecting', 'closed', 'reviewed')),
  opens_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  closes_at TIMESTAMPTZ,
  min_respondents_per_role INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Compass Responses (individual anonymous responses)
CREATE TABLE compass_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id UUID NOT NULL REFERENCES compass_cycles(id) ON DELETE CASCADE,
  respondent_role compass_role NOT NULL,
  respondent_token VARCHAR(64) UNIQUE NOT NULL,
  -- anonymous token for link-based access
  ratings JSONB NOT NULL DEFAULT '{}',
  -- {quality_key: 1-5} — 18 qualities
  comments JSONB DEFAULT '{}',
  -- {quality_key: "free text"}
  submitted_at TIMESTAMPTZ,
  is_complete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_compass_resp_cycle ON compass_responses(cycle_id);
CREATE INDEX idx_compass_resp_token ON compass_responses(respondent_token);

-- Compass Quality Definitions (reference table)
CREATE TABLE compass_qualities (
  id VARCHAR(50) PRIMARY KEY, -- e.g., "spirituality"
  pillar VARCHAR(50) NOT NULL, -- character, competence, connection
  domain VARCHAR(20) NOT NULL, -- ministry, military
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);


-- ── IDP DOMAIN ──────────────────────────────────────────────

CREATE TABLE idp_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personnel_id UUID NOT NULL REFERENCES personnel(id) ON DELETE CASCADE,
  supervisor_id UUID NOT NULL REFERENCES personnel(id),
  created_date DATE NOT NULL DEFAULT CURRENT_DATE,
  professional_goals JSONB NOT NULL DEFAULT '[]',
  -- [{what, why, how, when, support, status}]
  personal_goals JSONB NOT NULL DEFAULT '[]',
  strengths_to_maximize TEXT[] DEFAULT '{}',
  needs_to_mitigate TEXT[] DEFAULT '{}',
  reflection_notes JSONB DEFAULT '{}',
  -- {grateful_for, best, most_difficult, growth, hopes}
  followup_1_date DATE,
  followup_1_notes TEXT,
  followup_1_completed BOOLEAN DEFAULT false,
  followup_2_date DATE,
  followup_2_notes TEXT,
  followup_2_completed BOOLEAN DEFAULT false,
  status idp_status NOT NULL DEFAULT 'draft',
  source_compass_id UUID REFERENCES compass_cycles(id) ON DELETE SET NULL,
  source_observation_ids UUID[] DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_idp_personnel ON idp_records(personnel_id);
CREATE INDEX idx_idp_status ON idp_records(status);


-- ── CHC-CAM DOMAIN (Capability Analysis Module) ─────────────

-- Capability Gaps
CREATE TABLE capability_gaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(300) NOT NULL,
  description TEXT NOT NULL,
  operational_impact TEXT NOT NULL,
  doctrinal_references VARCHAR(200)[] NOT NULL DEFAULT '{}',
  source_type gap_source_type NOT NULL,
  source_ids UUID[] DEFAULT '{}',
  source_description TEXT, -- human-readable source context
  dotmlpf_domains dotmlpf_domain[] NOT NULL DEFAULT '{}',
  severity gap_severity NOT NULL DEFAULT 'moderate',
  affected_echelons echelon_type[] DEFAULT '{}',
  affected_compos compo_type[] DEFAULT '{}',
  proposed_solution TEXT,
  solution_pathway gap_pathway NOT NULL DEFAULT 'pending_analysis',
  status gap_status NOT NULL DEFAULT 'identified',
  assigned_to UUID REFERENCES personnel(id) ON DELETE SET NULL,
  resolution_notes TEXT,
  resolved_date DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_gaps_status ON capability_gaps(status);
CREATE INDEX idx_gaps_severity ON capability_gaps(severity);
CREATE INDEX idx_gaps_pathway ON capability_gaps(solution_pathway);

-- DOTMLPF-P Analysis Records
CREATE TABLE dotmlpf_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gap_id UUID NOT NULL REFERENCES capability_gaps(id) ON DELETE CASCADE,
  domain dotmlpf_domain NOT NULL,
  current_state TEXT NOT NULL,
  desired_state TEXT NOT NULL,
  gap_assessment TEXT NOT NULL,
  recommended_action TEXT,
  data_source TEXT, -- which ecosystem tool provided the evidence
  confidence_level VARCHAR(20) CHECK (confidence_level IN ('high', 'medium', 'low')),
  analyst_id UUID REFERENCES personnel(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(gap_id, domain)
);

-- Task-Position Matrix (maps tasks to required positions)
CREATE TABLE task_position_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id VARCHAR(20) NOT NULL REFERENCES tasks_master(id),
  echelon echelon_type NOT NULL,
  required_mos mos_type NOT NULL,
  required_grade_min VARCHAR(10), -- e.g., "1LT"
  required_grade_max VARCHAR(10), -- e.g., "CPT"
  is_primary BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  UNIQUE(task_id, echelon, required_mos)
);


-- ── AUDIT AND ACTIVITY ──────────────────────────────────────

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(50) NOT NULL, -- create, update, delete, export, generate
  table_name VARCHAR(100) NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_table ON audit_log(table_name);
CREATE INDEX idx_audit_created ON audit_log(created_at);


-- ── VIEWS FOR AGGREGATION ───────────────────────────────────

-- Organization Readiness Summary
CREATE OR REPLACE VIEW v_org_readiness AS
SELECT
  te.org_id,
  te.task_id,
  tm.title AS task_title,
  tm.echelon AS task_echelon,
  te.rating,
  te.date AS last_evaluated,
  ROW_NUMBER() OVER (
    PARTITION BY te.org_id, te.task_id
    ORDER BY te.date DESC
  ) AS recency_rank
FROM training_events te
JOIN tasks_master tm ON te.task_id = tm.id
WHERE te.rating IS NOT NULL;

-- Pillar Score Averages (from behavioral observations)
CREATE OR REPLACE VIEW v_pillar_scores AS
SELECT
  bo.subject_id,
  bo.org_id,
  bi.pillar,
  bi.sub_dimension,
  DATE_TRUNC('quarter', bo.observation_date) AS quarter,
  AVG((bo.ratings->bi.id->>'rating')::NUMERIC) AS avg_score,
  COUNT(*) AS observation_count
FROM behavioral_observations bo
CROSS JOIN behavioral_indicators bi
WHERE bo.ratings ? bi.id
  AND (bo.ratings->bi.id->>'rating')::INTEGER > 0
GROUP BY bo.subject_id, bo.org_id, bi.pillar, bi.sub_dimension,
         DATE_TRUNC('quarter', bo.observation_date);

-- Compass Aggregated Results (anonymized)
CREATE OR REPLACE VIEW v_compass_aggregated AS
SELECT
  cc.subject_id,
  cc.assessment_period,
  cr.respondent_role,
  key AS quality_key,
  AVG(value::NUMERIC) AS avg_rating,
  COUNT(*) AS respondent_count
FROM compass_cycles cc
JOIN compass_responses cr ON cr.cycle_id = cc.id
CROSS JOIN LATERAL jsonb_each_text(cr.ratings) AS r(key, value)
WHERE cr.is_complete = true
GROUP BY cc.subject_id, cc.assessment_period, cr.respondent_role, key
HAVING COUNT(*) >= cc.min_respondents_per_role;

-- Capability Gap Dashboard
CREATE OR REPLACE VIEW v_gap_dashboard AS
SELECT
  cg.severity,
  cg.status,
  cg.solution_pathway,
  unnest(cg.dotmlpf_domains) AS domain,
  COUNT(*) AS gap_count
FROM capability_gaps cg
WHERE cg.status NOT IN ('resolved', 'deferred')
GROUP BY cg.severity, cg.status, cg.solution_pathway, domain;

-- Training Trend (monthly)
CREATE OR REPLACE VIEW v_training_trend AS
SELECT
  te.org_id,
  te.task_id,
  DATE_TRUNC('month', te.date) AS month,
  te.rating,
  COUNT(*) AS event_count
FROM training_events te
WHERE te.rating IS NOT NULL
GROUP BY te.org_id, te.task_id, DATE_TRUNC('month', te.date), te.rating;


-- ── FUNCTIONS ───────────────────────────────────────────────

-- Get all child organizations (recursive)
CREATE OR REPLACE FUNCTION get_child_orgs(parent UUID)
RETURNS SETOF UUID AS $$
  WITH RECURSIVE org_tree AS (
    SELECT id FROM organizations WHERE id = parent
    UNION ALL
    SELECT o.id FROM organizations o
    JOIN org_tree ot ON o.parent_org_id = ot.id
  )
  SELECT id FROM org_tree;
$$ LANGUAGE SQL STABLE;

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT table_name FROM information_schema.columns
    WHERE column_name = 'updated_at'
    AND table_schema = 'public'
  LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I
       FOR EACH ROW EXECUTE FUNCTION update_timestamp()',
      tbl
    );
  END LOOP;
END;
$$;


-- ── ROW LEVEL SECURITY ──────────────────────────────────────

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE personnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavioral_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE compass_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE compass_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE idp_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE capability_gaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE dotmlpf_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavioral_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE compass_qualities ENABLE ROW LEVEL SECURITY;
ALTER TABLE metl_designations ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_position_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Reference tables: readable by all authenticated users
CREATE POLICY "tasks_read_all" ON tasks_master FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "indicators_read_all" ON behavioral_indicators FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "qualities_read_all" ON compass_qualities FOR SELECT
  TO authenticated USING (true);

-- Organizations: read own org tree
CREATE POLICY "org_read_tree" ON organizations FOR SELECT
  TO authenticated USING (
    id IN (SELECT get_child_orgs(
      (SELECT org_id FROM user_profiles WHERE id = auth.uid())
    ))
  );

-- Personnel: read own org tree
CREATE POLICY "personnel_read_tree" ON personnel FOR SELECT
  TO authenticated USING (
    org_id IN (SELECT get_child_orgs(
      (SELECT org_id FROM user_profiles WHERE id = auth.uid())
    ))
  );

-- Training events: read own org tree, write own org
CREATE POLICY "training_read_tree" ON training_events FOR SELECT
  TO authenticated USING (
    org_id IN (SELECT get_child_orgs(
      (SELECT org_id FROM user_profiles WHERE id = auth.uid())
    ))
  );
CREATE POLICY "training_insert_own" ON training_events FOR INSERT
  TO authenticated WITH CHECK (
    org_id = (SELECT org_id FROM user_profiles WHERE id = auth.uid())
    OR org_id IN (SELECT get_child_orgs(
      (SELECT org_id FROM user_profiles WHERE id = auth.uid())
    ))
  );

-- Behavioral observations: read own org tree
CREATE POLICY "obs_read_tree" ON behavioral_observations FOR SELECT
  TO authenticated USING (
    org_id IN (SELECT get_child_orgs(
      (SELECT org_id FROM user_profiles WHERE id = auth.uid())
    ))
  );
CREATE POLICY "obs_insert" ON behavioral_observations FOR INSERT
  TO authenticated WITH CHECK (true);

-- Compass responses: write-only (read blocked at individual level)
CREATE POLICY "compass_resp_insert" ON compass_responses FOR INSERT
  TO authenticated WITH CHECK (true);
-- No SELECT policy on compass_responses — aggregation via view only

-- Capability gaps: read all authenticated, write admin/supervisory
CREATE POLICY "gaps_read_all" ON capability_gaps FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "gaps_insert" ON capability_gaps FOR INSERT
  TO authenticated WITH CHECK (
    (SELECT role FROM user_profiles WHERE id = auth.uid())
    IN ('admin', 'supervisory_ch', 'oct')
  );

-- Audit log: admin read only
CREATE POLICY "audit_read_admin" ON audit_log FOR SELECT
  TO authenticated USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );
CREATE POLICY "audit_insert_all" ON audit_log FOR INSERT
  TO authenticated WITH CHECK (true);

-- User profiles: read own, admin reads all
CREATE POLICY "profile_read_own" ON user_profiles FOR SELECT
  TO authenticated USING (id = auth.uid());
CREATE POLICY "profile_read_admin" ON user_profiles FOR SELECT
  TO authenticated USING (
    (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
  );
CREATE POLICY "profile_update_own" ON user_profiles FOR UPDATE
  TO authenticated USING (id = auth.uid());

-- IDP: read own or as supervisor
CREATE POLICY "idp_read" ON idp_records FOR SELECT
  TO authenticated USING (
    personnel_id IN (SELECT id FROM personnel WHERE user_id = auth.uid())
    OR supervisor_id IN (SELECT id FROM personnel WHERE user_id = auth.uid())
  );
CREATE POLICY "idp_insert" ON idp_records FOR INSERT
  TO authenticated WITH CHECK (true);

-- DOTMLPF analyses: read all authenticated
CREATE POLICY "dotmlpf_read" ON dotmlpf_analyses FOR SELECT
  TO authenticated USING (true);
CREATE POLICY "dotmlpf_insert" ON dotmlpf_analyses FOR INSERT
  TO authenticated WITH CHECK (
    (SELECT role FROM user_profiles WHERE id = auth.uid())
    IN ('admin', 'supervisory_ch', 'oct')
  );

-- METL: read org tree, write own org
CREATE POLICY "metl_read" ON metl_designations FOR SELECT
  TO authenticated USING (
    org_id IN (SELECT get_child_orgs(
      (SELECT org_id FROM user_profiles WHERE id = auth.uid())
    ))
  );
CREATE POLICY "metl_insert" ON metl_designations FOR INSERT
  TO authenticated WITH CHECK (
    org_id IN (SELECT get_child_orgs(
      (SELECT org_id FROM user_profiles WHERE id = auth.uid())
    ))
  );

-- Task-position requirements: read all
CREATE POLICY "task_pos_read" ON task_position_requirements FOR SELECT
  TO authenticated USING (true);

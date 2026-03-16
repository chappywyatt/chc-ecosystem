/**
 * ═══════════════════════════════════════════════════════════════════════════
 * Comprehensive Demo Dataset — III Armored Corps UMT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Deterministic seed data for the CHC Digital Ecosystem.
 * All IDs use valid UUID format with "de00" prefix: "de00xxxx-xxxx-xxxx-0000-xxxxxxxxxxxx".
 *
 * III Armored Corps (Fort Cavazos, TX)
 * ├── 1st Cavalry Division (Fort Cavazos, TX)
 * ├── 1st Armored Division (Fort Bliss, TX)
 * ├── 1st Infantry Division (Fort Riley, KS)
 * └── Corps Separate Brigades (Fort Cavazos / Fort Sill)
 *
 * ~66 organizations, ~180 personnel, 85+ training events,
 * 25 behavioral observations, 5 compass cycles (45 responses),
 * 10 IDPs, 10 capability gaps, 6 DOTMLPF analyses, ~368 METL designations
 */

// ── Re-export ID constants for consumers ────────────────────────────────
export { ORG } from "./demo/organizations";
export { PER } from "./demo/personnel";

// ── Import all section arrays ───────────────────────────────────────────
import { ORGANIZATIONS } from "./demo/organizations";
import { PERSONNEL } from "./demo/personnel";
import { TRAINING_EVENTS } from "./demo/training-events";
import { BEHAVIORAL_OBSERVATIONS } from "./demo/observations";
import { COMPASS_CYCLES, COMPASS_RESPONSES } from "./demo/compass";
import { IDP_RECORDS } from "./demo/idps";
import { CAPABILITY_GAPS, DOTMLPF_ANALYSES } from "./demo/gaps-analyses";
import { METL_DESIGNATIONS } from "./demo/metl";

// ── Combined export matching seed route expectations ────────────────────
export const DEMO_DATA = {
  organizations: ORGANIZATIONS,
  personnel: PERSONNEL,
  training_events: TRAINING_EVENTS,
  behavioral_observations: BEHAVIORAL_OBSERVATIONS,
  compass_cycles: COMPASS_CYCLES,
  compass_responses: COMPASS_RESPONSES,
  idp_records: IDP_RECORDS,
  capability_gaps: CAPABILITY_GAPS,
  dotmlpf_analyses: DOTMLPF_ANALYSES,
  metl_designations: METL_DESIGNATIONS,
};

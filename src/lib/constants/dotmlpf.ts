/**
 * DOTMLPF-P Domain Definitions
 * Per ACIDS Process Guide and JCIDS Manual
 */

export interface DotmlpfDomain {
  id: string;
  name: string;
  shortName: string;
  description: string;
  analysisQuestions: string[];
  ecosystemDataSource: string;
}

export const DOTMLPF_DOMAINS: DotmlpfDomain[] = [
  {
    id: "doctrine",
    name: "Doctrine",
    shortName: "D",
    description:
      "Fundamental principles that guide the employment of forces. Includes published doctrine (FMs, ADPs, ATPs), TTPs, and T&EO standards.",
    analysisQuestions: [
      "What current doctrine addresses this capability?",
      "Is existing doctrine adequate to guide operations?",
      "Are there gaps in doctrinal coverage for this area?",
      "Do existing T&EOs adequately address the required tasks?",
    ],
    ecosystemDataSource: "T&EO gap analysis results; tasks without formal T&EOs",
  },
  {
    id: "organization",
    name: "Organization",
    shortName: "O",
    description:
      "Force structure, unit design, and organizational relationships required to perform the capability. Includes MTOE/TDA authorization.",
    analysisQuestions: [
      "Does the current organizational structure support this capability?",
      "Are the right positions authorized at the right echelons?",
      "Is the UMT structured to perform required tasks?",
      "Are there gaps between required and authorized positions?",
    ],
    ecosystemDataSource: "Task-position matrix gaps; echelon analysis from Gauge",
  },
  {
    id: "training",
    name: "Training",
    shortName: "T",
    description:
      "Training programs, resources, and standards required to develop and sustain the capability. Includes institutional, operational, and self-development training.",
    analysisQuestions: [
      "What training currently exists for this capability?",
      "What are the proficiency levels across the force?",
      "Are training resources adequate (time, facilities, funding)?",
      "Does RS3 content address this capability area?",
    ],
    ecosystemDataSource: "Readiness Tracker T/P/U data; BFT-AT completion rates; RS3 module coverage",
  },
  {
    id: "materiel",
    name: "Materiel",
    shortName: "M",
    description:
      "Equipment, systems, and supplies required to perform the capability. Includes communication systems, field equipment, and technology.",
    analysisQuestions: [
      "What equipment or systems are needed for this capability?",
      "Is current equipment adequate and available?",
      "Are there technology gaps affecting performance?",
      "Are logistics support requirements met?",
    ],
    ecosystemDataSource: "RS3 logistics gap data; equipment readiness from training events",
  },
  {
    id: "leadership_education",
    name: "Leadership & Education",
    shortName: "L&E",
    description:
      "Leader development programs, professional military education, and institutional training that develop the capability.",
    analysisQuestions: [
      "Does PME adequately prepare leaders for this capability?",
      "Are leader development programs addressing the gap?",
      "Is mentorship/coaching available for this area?",
      "What educational changes would close this gap?",
    ],
    ecosystemDataSource: "Compass trends for 'Leading' quality; IDP completion rates",
  },
  {
    id: "personnel",
    name: "Personnel",
    shortName: "P",
    description:
      "Personnel management including manning, MOS structure, grade distribution, and human capital required for the capability.",
    analysisQuestions: [
      "Are sufficient personnel available and qualified?",
      "Does the MOS structure support this capability?",
      "Are the right grades in the right positions?",
      "Are there retention or recruitment issues?",
    ],
    ecosystemDataSource: "Gauge competency data by MOS; manning data from personnel table",
  },
  {
    id: "facilities",
    name: "Facilities",
    shortName: "F",
    description:
      "Physical infrastructure including chapels, training areas, counseling spaces, and facilities required for the capability.",
    analysisQuestions: [
      "Are adequate facilities available for this capability?",
      "Do facilities meet operational requirements?",
      "Are there installation-specific facility gaps?",
      "What facility changes would improve capability?",
    ],
    ecosystemDataSource: "SpiritReady accommodation data; training venue data from Readiness Tracker",
  },
  {
    id: "policy",
    name: "Policy",
    shortName: "Pol",
    description:
      "Laws, regulations, policies, and guidance that govern the capability area. Includes ARs, DoD directives, and congressional mandates.",
    analysisQuestions: [
      "What policies currently govern this capability?",
      "Are existing policies enabling or constraining?",
      "Are there policy gaps or conflicts?",
      "What policy changes would address the gap?",
    ],
    ecosystemDataSource: "CER Constitutional Fidelity data; AR 165-1 gap analysis notes",
  },
];

export function getDomainById(id: string): DotmlpfDomain | undefined {
  return DOTMLPF_DOMAINS.find((d) => d.id === id);
}

export const DOMAIN_COLORS: Record<string, string> = {
  doctrine: "#1565C0",
  organization: "#2E7D32",
  training: "#E65100",
  materiel: "#6A1B9A",
  leadership_education: "#00838F",
  personnel: "#C62828",
  facilities: "#4E342E",
  policy: "#37474F",
};

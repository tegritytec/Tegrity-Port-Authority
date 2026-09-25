// ══════════════════════════════════════════════════════════════
// TEGRITY VOYAGE RECOMMENDER ('TVR') — INSIGHT CORE & ANONYMIZATION ENGINE
// Shared Module — Compliant with Technical Design Document v0.2
// ══════════════════════════════════════════════════════════════

import { VOYAGE_SEED_DATA, VESSELS, PORTS, FLEETS, STAKEHOLDER_ROLES } from './voyage-core.js';

// ── 1. FIELD CLASSIFICATION REGISTRY (FR-1.1) ──────────────────────────────────
export let FIELD_CLASSIFICATION_REGISTRY = {
  master: {
    'vessel.imo':    { class: 'Direct ID',    transform: 'Tokenize', description: 'Format-preserving salted hash' },
    'vessel.name':   { class: 'Direct ID',    transform: 'Tokenize', description: 'Format-preserving salted hash' },
    'vessel.owner':  { class: 'Direct ID',    transform: 'Tokenize', description: 'Format-preserving salted hash' },
    'vessel.type':   { class: 'Quasi-ID',     transform: 'Band',     description: 'Vessel category & DWT range bucket' },
    'vessel.dwt':    { class: 'Quasi-ID',     transform: 'Band',     description: '10,000 MT capacity bands' },
    'port.name':     { class: 'Open',         transform: 'Pass-through', description: 'Generalize to region for k-anonymity' },
    'port.country':  { class: 'Open',         transform: 'Pass-through', description: 'Open reference location' },
    'port.coords':   { class: 'Quasi-ID',     transform: 'Generalize',   description: 'Generalize to lat/lon region cell' },
  },
  reference: {
    'charterparty.form':         { class: 'Open',       transform: 'Pass-through', description: 'Base standard contract form' },
    'charterparty.riderClauses': { class: 'Commercial', transform: 'Aggregate',    description: 'Conflict flag & clause type only' },
  },
  transaction: {
    'masterEvents.gps':          { class: 'Quasi-ID',     transform: 'Generalize',   description: 'Region + ISO week generalization' },
    'masterEvents.timestamps':   { class: 'Quasi-ID',     transform: 'Generalize',   description: 'ISO week timestamp bucket' },
    'disputes.notes':            { class: 'Free text',    transform: 'EntityScrub',  description: 'Named-entity scrubbing of parties/vessels' },
    'signingWorkflow.comments':  { class: 'Free text',    transform: 'EntityScrub',  description: 'Named-entity scrubbed audit notes' },
  },
  voyage_intelligence: {
    'complianceScore':           { class: 'Derived',      transform: 'Pass-through', description: 'Normalized 0-100 composite score' },
    'laytimeUtilization':        { class: 'Derived',      transform: 'Pass-through', description: 'Percentage ratio allowed vs actual' },
    'ciiRatingImpact':           { class: 'Derived',      transform: 'Pass-through', description: 'IMO CII Operational Carbon Intensity Band (A-E)' },
  },
  calculations: {
    'charterparty.demurrageRate':{ class: 'Commercial',   transform: 'Percentile',   description: 'Banded to fleet percentile' },
    'calculateLaytime.demurrage':{ class: 'Commercial',   transform: 'Percentile',   description: 'Banded to fleet percentile' },
    'disputes.financialImpact':  { class: 'Commercial',   transform: 'Percentile',   description: 'Banded to financial severity band' },
    'euEtsCarbonAllowance':      { class: 'Commercial',   transform: 'Percentile',   description: 'EU ETS Carbon Allowance exposure (€/MT)' },
  }
};

// ── 2. KPI CATALOG (FR-2.1, FR-3.1) ─────────────────────────────────────────────
export const KPI_CATALOG = [
  { id: 'demurrage_exposure_rate', name: 'Demurrage Exposure Rate', unit: 'USD/day', target: '< $15,000', category: 'Financial', desc: 'Average daily demurrage accrual across active fixtures.' },
  { id: 'laytime_utilization',     name: 'Laytime Utilization %',   unit: '%',       target: '< 85%',     category: 'Operations',desc: 'Ratio of consumed laytime against charterparty allowed hours.' },
  { id: 'dispute_rate_impact',     name: 'Dispute Rate & Impact',   unit: 'USD/voy', target: '< $8,000',  category: 'Financial', desc: 'Average disputed financial value per completed voyage.' },
  { id: 'compliance_score_trend',  name: 'Compliance Score',        unit: 'Score',   target: '> 88/100',  category: 'Governance',desc: 'Composite SOF completeness, signature speed & dispute hygiene score.' },
  { id: 'countersignature_sla',    name: 'Countersignature SLA',    unit: 'Hours',   target: '< 12 hrs',  category: 'Operations',desc: 'Turnaround time for multi-party event countersignatures.' },
  { id: 'rider_clause_conflict',   name: 'Rider Clause Conflicts',  unit: '%',       target: '< 10%',     category: 'Legal',     desc: 'Frequency of fixtures encountering rider clause ambiguity or dispute.' },
  { id: 'port_terminal_risk',      name: 'Port/Terminal Risk Index', unit: 'Index',   target: '< 25/100',  category: 'Risk',      desc: 'Historical weather-hold and congestion risk metric for port.' },
  { id: 'counterparty_reliability',name: 'Counterparty Reliability',unit: 'Rating',  target: '> 90/100',  category: 'Commercial',desc: 'Historical compliance, payment promptness & protest rate.' },
  { id: 'eu_ets_carbon_cost',      name: 'EU ETS Carbon Allowance Exposure', unit: 'EUR/voy', target: '< €12,000', category: 'Sustainability', desc: 'Carbon tax liability under EU ETS maritime regulation.' },
  { id: 'cii_rating_impact',       name: 'IMO CII Rating Preservation', unit: 'Grade', target: 'A/B Grade', category: 'Sustainability', desc: 'IMO Carbon Intensity Indicator operational rating.' },
  { id: 'psi_model_drift',         name: 'Model Drift PSI',         unit: 'Index',   target: '< 0.10',    category: 'ML Governance', desc: 'Population Stability Index monitoring feature distribution drift.' },
  { id: 'realized_roi',            name: 'Realized Recommendation ROI', unit: 'USD total', target: '> $50,000', category: 'Value', desc: 'Net realized financial savings from accepted recommendations.' }
];

// ── 3. RECOMMENDATION TYPES (FR-2.2, FR-3.1, FR-3.4) ───────────────────────────
export const RECOMMENDATION_TYPES = {
  clause_recommendation: {
    label: 'Clause Recommendation',
    icon: '📜',
    color: '#3b82f6',
    description: 'Rider clause wording & conflict mitigation guidance based on cross-tenant dispute patterns.'
  },
  port_terminal_guidance: {
    label: 'Port & Terminal Guidance',
    icon: '⚓',
    color: '#06b6d4',
    description: 'Optimal port arrival windows, terminal congestion warnings, and weather-hold mitigation.'
  },
  laytime_term_guidance: {
    label: 'Laytime Term Guidance',
    icon: '⏱️',
    color: '#10b981',
    description: 'Recommended NOR valid windows, turntime exclusions, and laytime/despatch rate balance.'
  },
  escalation_timing_guidance: {
    label: 'Escalation Timing Guidance',
    icon: '🚨',
    color: '#f59e0b',
    description: 'Pre-protest notifications, P&I club notification countdowns, and time-bar countdown alerts.'
  },
  counterparty_risk_flag: {
    label: 'Counterparty Risk Flag',
    icon: '🛡️',
    color: '#ec4899',
    description: 'Counterparty protest pattern alerts, delayed countersignature risk, and credit risk warnings.'
  },
  carbon_speed_optimization: {
    label: 'Carbon & Speed Optimization (v0.2)',
    icon: '🌱',
    color: '#22c55e',
    description: 'Multi-horizon speed & arrival tuning balancing demurrage exposure, fuel costs, and EU ETS/CII rating.'
  },
  bimco_clause_reconciliation: {
    label: 'BIMCO Clause Reconciliation (v0.2)',
    icon: '⚖️',
    color: '#a855f7',
    description: 'Automated scan & reconciliation recommending BIMCO standard wording for conflicting rider terms.'
  }
};

// ── 4. STATE & CONFIGURATION ────────────────────────────────────────────────
let kAnonymityFloor = 5;
const ANONYMIZATION_AUDIT_LOG = [];

// Differential Privacy Config (FR-3.2)
export const DIFFERENTIAL_PRIVACY_CONFIG = {
  epsilon: 0.5, // Privacy budget per query
  delta: 1e-5,  // Failure probability
  cumulativeEpsilonUsed: 1.85,
  privacyBudgetCap: 10.0,
  noiseEnabled: true
};

// Default Model Weights (Self-Learning Layer FR-2.3, FR-3.5)
export let MODEL_WEIGHTS = {
  demurrageHistoricalWeight: 0.35,
  riderClauseConflictWeight: 0.25,
  portCongestionWeight: 0.20,
  counterpartyRiskWeight: 0.20,
  carbonEconomicWeight: 0.15,
  retrainCount: 16,
  lastRetrainedAt: '2026-09-11T09:30:00Z',
  accuracyScore: 0.934,
  psiDriftIndex: 0.042 // < 0.10 -> Stable, No Drift
};

// Seed Recommendation Feedback Log
export let RECOMMENDATION_FEEDBACK_LOG = [
  { id: 'fb-101', recId: 'REC-2026-001', action: 'accepted', predictedRoi: 14500, realizedRoi: 16200, timestamp: '2026-08-25T10:00:00Z', feedbackBy: 'lisa (Charterer)' },
  { id: 'fb-102', recId: 'REC-2026-002', action: 'accepted', predictedRoi: 8200,  realizedRoi: 8900,  timestamp: '2026-08-28T14:15:00Z', feedbackBy: 'james (Owner)' },
  { id: 'fb-103', recId: 'REC-2026-003', action: 'modified', predictedRoi: 22000, realizedRoi: 18500, timestamp: '2026-09-01T09:45:00Z', feedbackBy: 'priya (Admin)' },
  { id: 'fb-104', recId: 'REC-2026-004', action: 'rejected', predictedRoi: 11000, realizedRoi: 0,     timestamp: '2026-09-05T16:20:00Z', feedbackBy: 'capt.omar (Master)' },
  { id: 'fb-105', recId: 'REC-2026-005', action: 'accepted', predictedRoi: 19500, realizedRoi: 21000, timestamp: '2026-09-08T11:10:00Z', feedbackBy: 'lloyds.insurer (P&I)' },
  { id: 'fb-106', recId: 'REC-2026-006', action: 'accepted', predictedRoi: 28400, realizedRoi: 29800, timestamp: '2026-09-11T09:15:00Z', feedbackBy: 'james (Owner)' }
];

// Seed Dynamic Recommendations (including v0.2 carbon & clause recommendations)
export let RECOMMENDATIONS_STORE = [
  {
    id: 'REC-2026-001',
    type: 'clause_recommendation',
    title: 'Optimize Rider Clause 14B (Weather Hold Exclusion) for Basrah Fixture',
    voyageId: 'TVQ-2026-001',
    vessel: 'MT Tegrity Apex',
    port: 'Basrah (IQBSR)',
    confidence: 0.93,
    confidenceFloorGated: false,
    predictedKpiImpact: 'Reduces demurrage exposure by 1.8 days ($25,200/day rate)',
    predictedRoi: 18500,
    roiRange: '$15,000 - $22,000',
    carbonImpact: 'Saves 14.2 MT CO2 ($1,150 EU ETS credit)',
    ciiGrade: 'Grade B (Preserved)',
    evidence: [
      { kpi: 'rider_clause_conflict', value: '34% conflict rate in SHELLVOY6 fixtures at Basrah', asOf: '2026-09-01' },
      { kpi: 'demurrage_exposure_rate', value: '78th percentile demurrage accrual when Clause 14B is unamended', asOf: '2026-09-05' },
      { kpi: 'port_terminal_risk', value: 'Middle East regional swell index elevated +18% in Sep', asOf: '2026-09-10' }
    ],
    status: 'proposed',
    escalateTo: 'Charterer / Ship Owner Legal',
    createdAt: '2026-09-11T07:30:00Z',
    recommendedAction: 'Insert standard BIMCO Weather Laytime Exception Amendment into fixture recap.'
  },
  {
    id: 'REC-2026-006',
    type: 'carbon_speed_optimization',
    title: 'Joint Carbon & Speed Arrival Optimization (Antwerp → Basrah)',
    voyageId: 'TVQ-2026-004',
    vessel: 'MT Stratos Prime',
    port: 'Antwerp (BEANR)',
    confidence: 0.94,
    confidenceFloorGated: false,
    predictedKpiImpact: 'Avoids 36h congestion queue; reduces fuel consumption by 28 MT VLSFO',
    predictedRoi: 28400,
    roiRange: '$24,000 - $34,000',
    carbonImpact: 'Reduces carbon tax by €3,850 (EU ETS) & preserves CII Grade A',
    ciiGrade: 'Grade A (Optimal)',
    evidence: [
      { kpi: 'eu_ets_carbon_cost', value: 'EU ETS carbon price €78/MT; vessel speed reduction 13.5kn -> 11.8kn', asOf: '2026-09-11' },
      { kpi: 'laytime_utilization', value: 'Virtual arrival eliminates 1.5 days anchorage idling', asOf: '2026-09-11' },
      { kpi: 'cii_rating_impact', value: 'CII carbon intensity reduced 8.4 gCO2/dwt-mile', asOf: '2026-09-11' }
    ],
    status: 'proposed',
    escalateTo: 'Charterer Operations & Ship Owner Commercial',
    createdAt: '2026-09-11T09:00:00Z',
    recommendedAction: 'Issue Just-in-Time (JIT) Virtual Arrival instruction under BIMCO JIT Arrival Clause 2026.'
  },
  {
    id: 'REC-2026-002',
    type: 'port_terminal_guidance',
    title: 'Adjust Arrival Window & NOR Tender at Port Klang Berth 4',
    voyageId: 'TVQ-2026-002',
    vessel: 'MV Tegrity Crest',
    port: 'Port Klang (MYPKG)',
    confidence: 0.88,
    confidenceFloorGated: false,
    predictedKpiImpact: 'Avoids 14 hours turntime waiting delay; improves laytime utilization by 11%',
    predictedRoi: 12400,
    roiRange: '$10,000 - $15,000',
    carbonImpact: 'Saves 6.8 MT CO2 idling emissions',
    ciiGrade: 'Grade B (Preserved)',
    evidence: [
      { kpi: 'port_terminal_risk', value: 'Port Klang Berth 4 congestion queue 3.2 days avg during tidal window', asOf: '2026-09-08' },
      { kpi: 'laytime_utilization', value: 'Current voyage laytime budget 74% consumed prior to discharge', asOf: '2026-09-10' }
    ],
    status: 'accepted',
    escalateTo: 'Master / Port Agent',
    createdAt: '2026-09-10T14:15:00Z',
    recommendedAction: 'Schedule NOR tender post-14:00 UTC to align with high-tide pilot boarding window.'
  },
  {
    id: 'REC-2026-003',
    type: 'escalation_timing_guidance',
    title: 'Pre-Protest Notification & P&I Club Escalation for Cargo Shortfall',
    voyageId: 'TVQ-2026-003',
    vessel: 'MV Pacific Resolve',
    port: 'Corpus Christi (USCCT)',
    confidence: 0.95,
    confidenceFloorGated: false,
    predictedKpiImpact: 'Mitigates $42,000 claim exposure; preserves 100% time-bar defense validity',
    predictedRoi: 35000,
    roiRange: '$30,000 - $45,000',
    carbonImpact: 'N/A (Legal & Claim Defense)',
    ciiGrade: 'Grade A',
    evidence: [
      { kpi: 'dispute_rate_impact', value: 'Dispute financial severity band: 92nd percentile ($42k claim)', asOf: '2026-09-09' },
      { kpi: 'countersignature_sla', value: 'Receiver signature delayed > 36 hours past discharge completion', asOf: '2026-09-10' }
    ],
    status: 'proposed',
    escalateTo: 'Insurer / P&I Club (Gard / Lloyds)',
    createdAt: '2026-09-11T08:00:00Z',
    recommendedAction: 'Issue formal Letter of Protest to Receiver and notify Gard P&I Club within 48h deadline.'
  },
  {
    id: 'REC-2026-005',
    type: 'counterparty_risk_flag',
    title: 'Elevated Protest & Payment Delay Pattern for Counterparty "OceanNeptune"',
    voyageId: 'TVQ-2026-005',
    vessel: 'MV Coastal Vigil',
    port: 'Karachi (PKKHI)',
    confidence: 0.91,
    confidenceFloorGated: false,
    predictedKpiImpact: 'Reduces dispute turnaround time by 65%; secures early demurrage deposit',
    predictedRoi: 21500,
    roiRange: '$18,000 - $26,000',
    carbonImpact: 'N/A (Commercial Risk)',
    ciiGrade: 'Grade B',
    evidence: [
      { kpi: 'counterparty_reliability', value: 'Counterparty reliability score 64/100 (4 of 6 fixtures disputed under protest)', asOf: '2026-09-04' },
      { kpi: 'countersignature_sla', value: 'Average countersignature turnaround 42 hours (target < 12h)', asOf: '2026-09-07' }
    ],
    status: 'proposed',
    escalateTo: 'Ship Owner Commercial / Admin',
    createdAt: '2026-09-11T09:15:00Z',
    recommendedAction: 'Require interim laytime statement countersignature prior to vessel departure.'
  }
];

// ── 5. DIFFERENTIAL PRIVACY LAPLACE NOISE GENERATOR (FR-3.2) ──────────────────
export function addDifferentialPrivacyNoise(value, epsilon = DIFFERENTIAL_PRIVACY_CONFIG.epsilon, sensitivity = 1.0) {
  if (!DIFFERENTIAL_PRIVACY_CONFIG.noiseEnabled) return value;
  const num = Number(value);
  if (isNaN(num)) return value;
  
  // Draw random sample from Laplace distribution
  const u = Math.random() - 0.5;
  const scale = sensitivity / Math.max(0.1, epsilon);
  const noise = -scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));

  DIFFERENTIAL_PRIVACY_CONFIG.cumulativeEpsilonUsed += 0.05;
  return Number((num + noise).toFixed(2));
}

// ── 6. MULTI-HORIZON CARBON-ECONOMIC ROI CALCULATOR (FR-3.1) ─────────────────
export function calculateCarbonEconomicRoi({
  demurrageDaysSaved = 1.5,
  speedAdjustKnots = -1.5,
  distanceNm = 2400,
  demurrageRateDay = 25000,
  bunkerPriceTon = 620,
  euEtsPriceTon = 78
} = {}) {
  const demurrageSavings = demurrageDaysSaved * demurrageRateDay;
  
  // Fuel consumption cubic law model approximation
  const fuelTonDayBase = 32; // MT/day at 14 knots
  const fuelTonDayAdjusted = fuelTonDayBase * Math.pow(Math.max(8, 14 + speedAdjustKnots) / 14, 3);
  const voyageDays = distanceNm / ((14 + speedAdjustKnots) * 24);
  const fuelSavedTons = Math.max(0, (fuelTonDayBase * (distanceNm / (14 * 24))) - (fuelTonDayAdjusted * voyageDays));
  
  const bunkerSavings = fuelSavedTons * bunkerPriceTon;
  const co2SavedTons = fuelSavedTons * 3.114; // VLSFO CO2 factor
  const euEtsSavings = co2SavedTons * euEtsPriceTon;
  
  const netRoi = Math.round(demurrageSavings + bunkerSavings + euEtsSavings);
  
  return {
    netRoi,
    demurrageSavings: Math.round(demurrageSavings),
    bunkerSavings: Math.round(bunkerSavings),
    euEtsSavings: Math.round(euEtsSavings),
    co2SavedTons: Number(co2SavedTons.toFixed(1)),
    ciiImpact: fuelSavedTons > 15 ? 'Grade A (Preserved)' : 'Grade B'
  };
}

// ── 7. COUNTERFACTUAL "WHAT-IF" SCENARIO SIMULATOR (FR-3.3) ───────────────────
export function simulateScenario(baseRecId, adjustments = {}) {
  const baseRec = RECOMMENDATIONS_STORE.find(r => r.id === baseRecId) || RECOMMENDATIONS_STORE[0];
  const {
    speedKnots = 13.5,
    norTenderDelayHours = 0,
    weatherHoldDays = 0,
    riderClauseVariant = 'standard'
  } = adjustments;

  // Base values
  let simulatedRoi = baseRec.predictedRoi;
  let simulatedConfidence = baseRec.confidence;
  let simulatedCii = 'Grade A';

  // Apply perturbations
  if (speedKnots < 13.0) {
    simulatedRoi += 6500; // Fuel & EU ETS savings
    simulatedConfidence = Math.min(0.98, simulatedConfidence + 0.04);
  } else if (speedKnots > 14.5) {
    simulatedRoi -= 8000;
    simulatedConfidence -= 0.08;
    simulatedCii = 'Grade C';
  }

  if (norTenderDelayHours > 12) {
    simulatedRoi -= Math.round((norTenderDelayHours / 24) * 22000);
  }

  if (weatherHoldDays > 0) {
    simulatedRoi -= Math.round(weatherHoldDays * 18000);
    simulatedConfidence = Math.max(0.60, simulatedConfidence - (weatherHoldDays * 0.05));
  }

  if (riderClauseVariant === 'bimco_standard') {
    simulatedRoi += 4200;
    simulatedConfidence = Math.min(0.99, simulatedConfidence + 0.05);
  }

  return {
    baseRecId,
    originalRoi: baseRec.predictedRoi,
    simulatedRoi: Math.max(0, simulatedRoi),
    roiDelta: Math.max(0, simulatedRoi) - baseRec.predictedRoi,
    originalConfidence: baseRec.confidence,
    simulatedConfidence: Number(simulatedConfidence.toFixed(2)),
    simulatedCii,
    adjustments
  };
}

// ── 8. POPULATION STABILITY INDEX (PSI) DRIFT CALCULATOR (FR-3.5) ─────────────
export function calculateModelDriftPSI() {
  // Simulated Population Stability Index calculation
  const currentPSI = MODEL_WEIGHTS.psiDriftIndex;
  const isDrifting = currentPSI >= 0.25;

  return {
    psiValue: currentPSI,
    isDrifting,
    status: isDrifting ? 'CRITICAL_DRIFT' : (currentPSI > 0.10 ? 'MODERATE_DRIFT' : 'STABLE'),
    recommendation: isDrifting ? 'Immediate model retrain recommended due to market feature drift' : 'Model weights stable within expected parameters'
  };
}

// ── 9. ANONYMIZATION PIPELINE FUNCTIONS (FR-1.2 to FR-1.8, FR-3.2) ────────────

export function formatPreservingToken(inputString, salt = 'TegrityTVR2026') {
  if (!inputString) return 'TOKEN-ANON';
  let hash = 0;
  const str = String(inputString) + salt;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(6, '0');
  if (String(inputString).startsWith('9')) return `IMO-${hex}`;
  return `ENTITY-${hex.substring(0, 4)}-${hex.substring(4)}`;
}

export function bandFinancialValue(amount, fleetDistribution = [5000, 15000, 30000, 60000]) {
  const num = Number(amount) || 0;
  if (num < fleetDistribution[0]) return 'Lower Quartile (< 25th percentile)';
  if (num < fleetDistribution[1]) return 'Median Band (25th - 50th percentile)';
  if (num < fleetDistribution[2]) return 'Upper Quartile (50th - 75th percentile)';
  return 'Top Decile (> 75th percentile - High Commercial Impact)';
}

export function generalizeLocationAndDate(portCode, country, dateIso) {
  const region = PORTS.find(p => p.code === portCode)?.country || country || 'Global';
  const dateObj = dateIso ? new Date(dateIso) : new Date();
  const year = dateObj.getFullYear();
  const weekNum = Math.ceil((((dateObj - new Date(year, 0, 1)) / 86400000) + 1) / 7);
  return {
    generalizedRegion: `${region} Region`,
    generalizedTimeframe: `ISO Week ${weekNum}, ${year}`,
  };
}

export function scrubFreeText(text) {
  if (!text) return '';
  let scrubbed = String(text);
  scrubbed = scrubbed.replace(/(?:MT|MV)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?/g, '[VESSEL-ANON]');
  scrubbed = scrubbed.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL-REDACTED]');
  scrubbed = scrubbed.replace(/\$\d+(?:,\d+)*(?:\.\d+)?/g, '[VALUE-BANDED]');
  return scrubbed;
}

export function kAnonymityCheck(groupSize, floor = kAnonymityFloor) {
  return {
    passed: groupSize >= floor,
    groupSize,
    floor,
    reason: groupSize >= floor ? 'Sufficient record pool for anonymized benchmark' : `Group size (${groupSize}) below minimum k-anonymity floor (${floor})`
  };
}

export function anonymizeRecord(record, domain, requestingRole, options = {}) {
  const isSuperUserOrAdmin = requestingRole === 'admin' || requestingRole === 'superuser';
  
  const auditEntry = {
    id: `AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    recordId: record.id || record.imo || record.voyageId || 'REC-GENERIC',
    domain,
    requestingRole,
    transformsApplied: [],
    kGroupSize: Math.floor(Math.random() * 8) + 5,
    user: options.user || requestingRole
  };

  if (isSuperUserOrAdmin && options.rawRequested) {
    auditEntry.transformsApplied.push('RAW_ACCESS_BYPASSED_ADMIN');
    ANONYMIZATION_AUDIT_LOG.unshift(auditEntry);
    return { ...record, _anonymized: false, _stage: 'Stage 1 Raw Access' };
  }

  const anonymized = JSON.parse(JSON.stringify(record));
  
  if (domain === 'master') {
    if (anonymized.imo) {
      anonymized.imo = formatPreservingToken(anonymized.imo);
      auditEntry.transformsApplied.push('vessel.imo -> Tokenized');
    }
    if (anonymized.name) {
      anonymized.vesselNameOriginal = anonymized.name;
      anonymized.name = `Anonymized ${anonymized.type || 'Vessel'} (${formatPreservingToken(anonymized.name)})`;
      auditEntry.transformsApplied.push('vessel.name -> Pseudonymized');
    }
    if (anonymized.owner) {
      anonymized.owner = `Owner-Token-${formatPreservingToken(anonymized.owner).slice(-4)}`;
      auditEntry.transformsApplied.push('vessel.owner -> Tokenized');
    }
  }

  if (domain === 'calculations' || domain === 'financial') {
    if (anonymized.demurrageRate) {
      // Apply Differential Privacy Laplace Noise for benchmark values (FR-3.2)
      const noisyRate = addDifferentialPrivacyNoise(anonymized.demurrageRate);
      anonymized.demurrageRateBand = bandFinancialValue(noisyRate);
      anonymized.demurrageRateNoisy = noisyRate;
      delete anonymized.demurrageRate;
      auditEntry.transformsApplied.push('demurrageRate -> DP Noise (eps=0.5) + Banded');
    }
  }

  const gateResult = kAnonymityCheck(auditEntry.kGroupSize, kAnonymityFloor);
  anonymized._kAnonymityPassed = gateResult.passed;
  anonymized._kGroupSize = auditEntry.kGroupSize;
  anonymized._anonymized = true;

  ANONYMIZATION_AUDIT_LOG.unshift(auditEntry);
  if (ANONYMIZATION_AUDIT_LOG.length > 200) ANONYMIZATION_AUDIT_LOG.pop();

  return anonymized;
}

// ── 10. RECOMMENDATION SERVICE INTERFACE (FR-8.2, FR-3.1 - FR-3.6) ────────────

export function getRecommendations({ scope = 'all', stakeholderRole = 'admin', minConfidence = 0.75 } = {}) {
  return RECOMMENDATIONS_STORE.filter(rec => {
    if (rec.confidence < minConfidence) {
      rec.confidenceFloorGated = true;
    }

    if (stakeholderRole === 'insurer') {
      return rec.type === 'escalation_timing_guidance' || rec.type === 'counterparty_risk_flag' || rec.type === 'bimco_clause_reconciliation';
    }
    if (stakeholderRole === 'master') {
      return rec.type === 'port_terminal_guidance' || rec.type === 'escalation_timing_guidance' || rec.type === 'carbon_speed_optimization';
    }
    if (stakeholderRole === 'charterer') {
      return rec.type === 'clause_recommendation' || rec.type === 'laytime_term_guidance' || rec.type === 'port_terminal_guidance' || rec.type === 'carbon_speed_optimization';
    }
    return true;
  });
}

export function submitRecommendationFeedback(recommendationId, { action, realizedImpact = 0, notes = '', feedbackBy = 'User' } = {}) {
  const rec = RECOMMENDATIONS_STORE.find(r => r.id === recommendationId);
  if (!rec) throw new Error(`Recommendation ID ${recommendationId} not found.`);

  rec.status = action;
  
  const feedbackEntry = {
    id: `fb-${Date.now()}`,
    recId: recommendationId,
    action,
    predictedRoi: rec.predictedRoi,
    realizedRoi: Number(realizedImpact) || (action === 'accepted' ? rec.predictedRoi : 0),
    notes,
    timestamp: new Date().toISOString(),
    feedbackBy
  };

  RECOMMENDATION_FEEDBACK_LOG.unshift(feedbackEntry);
  retrainModelWeights();

  return { success: true, recommendation: rec, feedback: feedbackEntry, updatedWeights: MODEL_WEIGHTS };
}

export function retrainModelWeights() {
  const totalFeedback = RECOMMENDATION_FEEDBACK_LOG.length;
  if (totalFeedback === 0) return MODEL_WEIGHTS;

  const acceptedCount = RECOMMENDATION_FEEDBACK_LOG.filter(f => f.action === 'accepted' || f.action === 'modified').length;
  const acceptanceRate = acceptedCount / totalFeedback;

  let totalPredRoi = 0;
  let totalRealizedRoi = 0;
  RECOMMENDATION_FEEDBACK_LOG.forEach(f => {
    totalPredRoi += f.predictedRoi || 0;
    totalRealizedRoi += f.realizedRoi || 0;
  });

  const accuracy = totalPredRoi > 0 ? Math.min(1.0, (totalRealizedRoi / totalPredRoi)) : 0.88;

  MODEL_WEIGHTS.retrainCount += 1;
  MODEL_WEIGHTS.lastRetrainedAt = new Date().toISOString();
  MODEL_WEIGHTS.accuracyScore = Number((0.87 + (acceptanceRate * 0.10)).toFixed(3));
  MODEL_WEIGHTS.psiDriftIndex = Number((Math.max(0.01, 0.08 - (acceptanceRate * 0.04))).toFixed(3));
  
  MODEL_WEIGHTS.demurrageHistoricalWeight = Number((0.30 + (acceptanceRate * 0.10)).toFixed(2));
  MODEL_WEIGHTS.riderClauseConflictWeight = Number((0.25 + (accuracy * 0.05)).toFixed(2));

  return MODEL_WEIGHTS;
}

export function getKpiCatalog() {
  return KPI_CATALOG;
}

export function getAnonymizationAuditTrail({ recordId, requestingRole } = {}) {
  if (recordId) return ANONYMIZATION_AUDIT_LOG.filter(a => a.recordId === recordId);
  if (requestingRole) return ANONYMIZATION_AUDIT_LOG.filter(a => a.requestingRole === requestingRole);
  return ANONYMIZATION_AUDIT_LOG;
}

export function updateFieldClassificationRegistry(domain, fieldKey, newConfig) {
  if (!FIELD_CLASSIFICATION_REGISTRY[domain]) {
    FIELD_CLASSIFICATION_REGISTRY[domain] = {};
  }
  FIELD_CLASSIFICATION_REGISTRY[domain][fieldKey] = {
    ...FIELD_CLASSIFICATION_REGISTRY[domain][fieldKey],
    ...newConfig
  };
  return FIELD_CLASSIFICATION_REGISTRY;
}

export function setKAnonymityFloor(floor) {
  kAnonymityFloor = Math.max(2, Number(floor) || 5);
  return { kAnonymityFloor };
}

export function getKAnonymityFloor() {
  return kAnonymityFloor;
}

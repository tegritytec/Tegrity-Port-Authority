// ══════════════════════════════════════════════════════════════
// TEGRITYV OYAGEIQ — SHARED VOYAGE CORE
// TegrityTec Shipping Pte. Ltd. — New Installation 2026
// All data is synthetic and specific to TegrityTec Shipping.
// No reference to VoyageIQ or any other installation.
// Architecture is identical to VoyageIQ's voyage-core.js so
// all UI components and calculation engines work unchanged.
// ══════════════════════════════════════════════════════════════

export const ORGANIZATIONS = [
  { id: 'org-tegrity',        name: 'TegrityTec Shipping Pte. Ltd.',     code: 'TEG', type: 'Carrier / Ship Owner',     status: 'Active', domain: 'tegritytec.com',      maxUsers: 50, createdDate: '2026-01-10' },
  { id: 'org-oceanneptune',   name: 'OceanNeptune Chartering Ltd.',      code: 'ONC', type: 'Charterer / Trader',       status: 'Active', domain: 'oceanneptune.com',    maxUsers: 25, createdDate: '2026-02-01' },
  { id: 'org-pacificrefining',name: 'Pacific Refining & Energy Corp',     code: 'PRE', type: 'Shipper / Cargo Interest', status: 'Active', domain: 'pacificrefining.com', maxUsers: 30, createdDate: '2026-02-15' },
  { id: 'org-globalmaritime', name: 'Global Maritime Services Inc.',     code: 'GMS', type: 'Port Agency & Ops',        status: 'Active', domain: 'globalmaritime.org',  maxUsers: 20, createdDate: '2026-03-01' },
  { id: 'org-gardpi',         name: 'Gard P&I Club & Marine Insurance',  code: 'GARD',type: 'Insurer / P&I Club',       status: 'Active', domain: 'gard.no',             maxUsers: 15, createdDate: '2026-04-01' },
];

export const STAKEHOLDER_ROLES = {
  superuser:      { label:'Super User (Full Access)', avatar:'⚡', color:'gold', accessAll: true },
  admin:          { label:'Administrator (Full Access)', avatar:'🔐', color:'gold', accessAll: true },
  owner:          { label:'Ship Owner',               avatar:'SO', color:'gold' },
  charterer:      { label:'Charterer',                avatar:'CH', color:'cyan' },
  shipper:        { label:'Shipper',                  avatar:'SH', color:'green' },
  receiver:       { label:'Receiver',                 avatar:'RC', color:'purple' },
  master:         { label:'Master',                   avatar:'MA', color:'cyan' },
  port_authority: { label:'Port Authority',           avatar:'PA', color:'gold' },
  insurer:        { label:'Insurer / P&I Club',       avatar:'IN', color:'purple' },
};

export const ROLE_USERS = {
  // TegrityTec Shipping headquarters — Singapore
  admin:      'superuser',
  ravi:       'superuser',
  superuser:  'superuser',
  superuser1: 'superuser',
  superuser2: 'superuser',
  'ams@tegritytec.com': 'admin',
  ITPLADMIN:  'admin',
  priya:      'admin',
  // Fleet personnel
  'capt.omar': 'master',
  // Commercial & cargo
  'chen.wei': 'shipper',
  fatima:     'receiver',
  lisa:       'charterer',
  // Ownership & port ops
  james:      'owner',
  ahmed:      'port_authority',
  'lloyds.insurer': 'insurer',
  'gard.pi':        'insurer',
};

export const SIMULATED_NOW = new Date('2026-08-22T08:00:00Z');

export function haversineNm(lat1, lon1, lat2, lon2) {
  const R = 3440.065;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── TEGRITEC SHIPPING FLEET ──────────────────────────────────────────────────
export const VESSELS = [
  { imo:'9200101', name:'MT Tegrity Apex',    type:'Crude Tanker',     flag:'Singapore',        dwt:110000, owner:'TegrityTec Shipping Pte. Ltd.', orgId:'org-tegrity' },
  { imo:'9200102', name:'MV Tegrity Crest',   type:'MR Product Tanker',flag:'Marshall Islands', dwt:47000,  owner:'TegrityTec Shipping Pte. Ltd.', orgId:'org-tegrity' },
  { imo:'9200103', name:'MV Tegrity Pacific', type:'Dry Bulk',         flag:'Panama',           dwt:78000,  owner:'Ocean Neptune Chartering Ltd.', orgId:'org-oceanneptune' },
  { imo:'9200104', name:'MT Tegrity Prime',   type:'Crude Tanker',     flag:'Bahamas',          dwt:130000, owner:'Global Marine Logistics Corp.', orgId:'org-globalmarine' },
  { imo:'9200105', name:'MV Tegrity Meridian', type:'LPG Carrier',      flag:'Norway',           dwt:55000,  owner:'Crestline Maritime Agency', orgId:'org-crestline' },
  { imo:'9200106', name:'MV Tegrity Vigil',   type:'Chemical Tanker',  flag:'Singapore',        dwt:38500,  owner:'Ocean Neptune Chartering Ltd.', orgId:'org-oceanneptune' },
];

// ── PORT REGISTRY ────────────────────────────────────────────────────────────
export const PORTS = [
  { code:'MYPKG', name:'Port Klang',     country:'Malaysia',      lat:3.0000,  lon:101.4000 },
  { code:'LKCMB', name:'Colombo',        country:'Sri Lanka',     lat:6.9271,  lon:79.8612  },
  { code:'PKKHI', name:'Karachi',        country:'Pakistan',      lat:24.8607, lon:67.0011  },
  { code:'ZADUR', name:'Durban',         country:'South Africa',  lat:-29.8587,lon:31.0218  },
  { code:'BEANR', name:'Antwerp',        country:'Belgium',       lat:51.2213, lon:4.4051   },
  { code:'USCCT', name:'Corpus Christi', country:'USA',           lat:27.8006, lon:-97.3964 },
  { code:'IQBSR', name:'Basrah',         country:'Iraq',          lat:30.5085, lon:47.7804  },
  { code:'INCOK', name:'Kochi',          country:'India',         lat:9.9312,  lon:76.2673  },
  { code:'KRBSN', name:'Busan',          country:'South Korea',   lat:35.1796, lon:129.0756 },
  { code:'AUDPF', name:'Dampier',        country:'Australia',     lat:-20.6574,lon:116.7139 },
];

export const FLEETS = (() => {
  const byType = {};
  VESSELS.forEach(v => { (byType[v.type] = byType[v.type] || []).push(v.name); });
  return Object.entries(byType).map(([type, vessels]) => ({ name: `${type} Fleet`, type, vessels }));
})();

export const PORT_REGIONS = {
  'Malaysia':      'Asia-Pacific',
  'Sri Lanka':     'Asia-Pacific',
  'South Korea':   'Asia-Pacific',
  'Australia':     'Asia-Pacific',
  'Pakistan':      'South Asia',
  'India':         'South Asia',
  'South Africa':  'Africa',
  'Belgium':       'Europe',
  'USA':           'Americas',
  'Iraq':          'Middle East',
};

export const ACCESS_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export const ACCESS_DIMENSIONS = [
  { key:'organization',   label:'Organization',    icon:'🏢', values:() => ORGANIZATIONS.map(o=>o.name) },
  { key:'fleet',          label:'Fleet',           icon:'🚢', values:() => FLEETS.map(f=>f.name) },
  { key:'voyage',         label:'Voyage',          icon:'🧭', values:() => VOYAGE_SEED_DATA.map(v=>v.id) },
  { key:'region',         label:'Region',          icon:'🌍', values:() => [...new Set(Object.values(PORT_REGIONS))] },
  { key:'country',        label:'Country',         icon:'🏳️', values:() => [...new Set(PORTS.map(p=>p.country))] },
  { key:'departurePort',  label:'Departure Port',  icon:'⛴️', values:() => PORTS.map(p=>p.name) },
  { key:'arrivalPort',    label:'Arrival Port',    icon:'⚓', values:() => PORTS.map(p=>p.name) },
  { key:'transitStatus',  label:'Transit Status',  icon:'🛰️', values:() => ['in_progress','pending_signature','disputed','completed'] },
];

export const TRANSIT_STATUS_LABELS = {
  in_progress:'In Transit', pending_signature:'Pending Signature',
  disputed:'Disputed', completed:'Completed'
};
export function accessValueLabel(dimKey, value){
  return dimKey==='transitStatus' ? (TRANSIT_STATUS_LABELS[value]||value) : value;
}
export function defaultAccessScopes(){
  const scopes = {};
  ACCESS_DIMENSIONS.forEach(d => { scopes[d.key] = { enabled:false, values:[] }; });
  return scopes;
}

export const DEMURRAGE_ROLE_LABELS = {
  owner:          { demurrageLabel:'Demurrage accrued (your claim)' },
  charterer:      { demurrageLabel:'Demurrage exposure' },
  shipper:        { demurrageLabel:"Demurrage impact on your cargo bookings" },
  receiver:       { demurrageLabel:'Demurrage impact on your discharge' },
  master:         { demurrageLabel:"Demurrage accruing on your vessel" },
  port_authority: { demurrageLabel:'Demurrage relevant to port operations' },
};

// ── CLAUSE PRECEDENCE ENGINE ──
export function evaluateClausePrecedence(cpData) {
  if (!cpData) return [];
  const precedenceList = [];

  (cpData.riderClauses || []).forEach(r => {
    precedenceList.push({
      tier: 1,
      tierName: 'Rider Clause (Amends Printed Form)',
      title: r.title,
      text: r.text,
      overrides: r.overrides,
      conflictFlag: r.conflictFlag || false,
      conflictNote: r.conflictNote || '',
      effectiveRule: 'OVERRULES PRINTED FORM'
    });
  });

  precedenceList.push({
    tier: 2,
    tierName: 'Fixture Recap (Main Commercial Terms)',
    title: 'Commercial Terms Recap',
    text: `Demurrage: $${cpData.demurrageRate || 0}/day | Laytime: ${cpData.allowedLaytime || 0}h ${cpData.laytimeTerm || ''} | Warranted Speed: ${cpData.warrantedSpeed || 0} kts`,
    overrides: 'Printed Form Defaults',
    conflictFlag: false,
    effectiveRule: 'GOVERNS UNLESS RIDER OVERRIDES'
  });

  precedenceList.push({
    tier: 3,
    tierName: `Printed Form (${cpData.form || 'Standard Form'})`,
    title: `${cpData.form || 'Standard'} Standard Terms`,
    text: `Standard printed form clauses (e.g. ${cpData.form || 'SHELLVOY6'} standard laytime/demurrage terms).`,
    overrides: 'None',
    conflictFlag: false,
    effectiveRule: 'APPLIES WHERE RIDERS/RECAP ARE SILENT'
  });

  return precedenceList;
}

// ── MULTI-ZONE TIME HANDLING ENGINE ──
export function parseMultiZoneTimestamp(isoUtcString, portTimeZone = 'UTC', offsetHours = 0, isDst = false) {
  if (!isoUtcString) return null;
  const utcDate = new Date(isoUtcString);
  const localEpoch = utcDate.getTime() + ((offsetHours + (isDst ? 1 : 0)) * 3600 * 1000);
  const localDate = new Date(localEpoch);

  return {
    utcString: isoUtcString,
    localTimeString: localDate.toISOString().replace('T', ' ').substring(0, 19),
    portTimeZone,
    offsetHours,
    isDst,
    formattedDisplay: `${localDate.toISOString().substring(0, 10)} ${localDate.toISOString().substring(11, 16)} (${portTimeZone} UTC${offsetHours >= 0 ? '+' : ''}${offsetHours})`
  };
}

// ── TIME-BAR DEADLINE ALERT ENGINE ──
export function calculateTimeBarDeadline(completionUtcString, timeBarDays = 90) {
  if (!completionUtcString) return { status: 'Pending Completion', daysRemaining: null };
  const compDate = new Date(completionUtcString);
  const deadlineEpoch = compDate.getTime() + (timeBarDays * 86400 * 1000);
  const deadlineDate = new Date(deadlineEpoch);
  const nowEpoch = SIMULATED_NOW.getTime();
  const diffDays = Math.ceil((deadlineEpoch - nowEpoch) / (86400 * 1000));

  return {
    completionUtc: completionUtcString,
    deadlineUtc: deadlineDate.toISOString(),
    timeBarDays,
    daysRemaining: diffDays,
    isExpired: diffDays < 0,
    riskLevel: diffDays < 15 ? 'CRITICAL' : diffDays < 30 ? 'HIGH' : 'NORMAL',
    alertMessage: diffDays < 0
      ? `TIME BAR EXPIRED (${Math.abs(diffDays)} days ago)`
      : `${diffDays} days remaining to submit claim package`
  };
}

// ── BUNKER MASS-BALANCE RECONCILIATION ENGINE ──
export function reconcileBunkerMassBalance(voyage) {
  if (!voyage) return null;
  const depVLSFO = 820, arrVLSFO = 746;
  const depMGO = 195, arrMGO = 128;
  const meConsVLSFO = 61.0, aeConsVLSFO = 7.5, boilerConsVLSFO = 1.8;
  const totalCalculatedConsVLSFO = meConsVLSFO + aeConsVLSFO + boilerConsVLSFO;
  const actualVLSFODrop = depVLSFO - arrVLSFO;
  const varianceVLSFO = actualVLSFODrop - totalCalculatedConsVLSFO;

  return {
    vlsfo: { dep: depVLSFO, arr: arrVLSFO, drop: actualVLSFODrop, me: meConsVLSFO, ae: aeConsVLSFO, boiler: boilerConsVLSFO, totalCons: totalCalculatedConsVLSFO, variance: varianceVLSFO, reconciled: Math.abs(varianceVLSFO) < 5.0 },
    mgo:   { dep: depMGO,   arr: arrMGO,   drop: depMGO - arrMGO, cons: 67.0, variance: (depMGO - arrMGO) - 67.0, reconciled: Math.abs((depMGO - arrMGO) - 67.0) < 5.0 }
  };
}

// ── PRACTICAL PORT PERFORMANCE ENGINE ──
export function calculatePracticalPortPerformance(voyage) {
  const cargoQtyMT = voyage?.quantity || 110000;
  const allowedLaytimeHours = 55.0;
  const demurrageRateDaily = 45000;
  const detentionRateDaily = 75000;

  const laytimeUsedHours = 62.3;
  const demurrageAccruedHours = 7.3;
  const demurrageClaimUSD = (demurrageAccruedHours / 24.0) * demurrageRateDaily;
  const detentionAccruedHours = 0;
  const detentionClaimUSD = 0;
  const netPortClaimUSD = demurrageClaimUSD + detentionClaimUSD;

  const totalElapsedHours = 584.5;
  const badWeatherHours = 48.0;
  const visibilityHours = 4.0;
  const meBreakdownHours = 0;
  const qualifyingHours = totalElapsedHours - (badWeatherHours + visibilityHours + meBreakdownHours);
  const extrapolationSharePct = (qualifyingHours / (totalElapsedHours - (visibilityHours + meBreakdownHours))) * 100.0;

  const extrapolatedSpeedLossHours = 11.24;
  const timeClaimUSD = extrapolatedSpeedLossHours * (45000 / 24.0);
  const extrapolatedFuelLossMT = 38.7;
  const fuelClaimUSD = extrapolatedFuelLossMT * 640.0;
  const totalPassageClaimUSD = timeClaimUSD + fuelClaimUSD;

  return {
    vesselName: voyage?.vessel?.name || 'MT Tegrity Apex',
    cargoQtyMT,
    allowedLaytimeHours,
    laytimeUsedHours,
    demurrageAccruedHours,
    demurrageClaimUSD,
    detentionAccruedHours,
    detentionClaimUSD,
    netPortClaimUSD,
    totalElapsedHours,
    qualifyingHours,
    extrapolationSharePct,
    extrapolationValid: extrapolationSharePct >= 20.0,
    extrapolatedSpeedLossHours,
    extrapolatedFuelLossMT,
    timeClaimUSD,
    fuelClaimUSD,
    totalPassageClaimUSD,
    combinedTotalClaimUSD: netPortClaimUSD + totalPassageClaimUSD,
  };
}

// ── CARGO HEATING GOVERNANCE ENGINE (Crude Tanker Profile) ──
export function calculateCargoHeatingAndWaterGovernance(voyage) {
  const cargoGrade        = 'Basrah Light Crude Oil';
  const apiGravity        = 33.7;
  const voyageNo          = '01/26';
  const loadPort          = 'Basrah Oil Terminal, Iraq';
  const dischargePort     = 'Westport Terminal, Port Klang, Malaysia';
  const totalGrossCargoM3 = 131420.0;
  const minRequiredTempC  = 35.00;
  const maxAllowedTempC   = 42.00;
  const loadingTempC      = 34.85;

  const heatingStartIso      = '2026-07-30T14:00:00Z';
  const heatingStopIso       = '2026-08-01T10:00:00Z';
  const heatingDurationHours = 44.0;
  const heatingCycleDays     = 2;

  const dailyTempProfile = [
    { date:'2026-07-25', avgTempC:34.850, deltaC:0,      phase:'Pre-heating (loading)' },
    { date:'2026-07-26', avgTempC:34.720, deltaC:-0.130, phase:'Pre-heating (transit)' },
    { date:'2026-07-27', avgTempC:34.560, deltaC:-0.160, phase:'Pre-heating (cooling)' },
    { date:'2026-07-28', avgTempC:34.310, deltaC:-0.250, phase:'Pre-heating (cooling)' },
    { date:'2026-07-29', avgTempC:34.005, deltaC:-0.305, phase:'Pre-heating (cooling)' },
    { date:'2026-07-30', avgTempC:33.680, deltaC:-0.325, phase:'Heating commenced 14:00' },
    { date:'2026-07-31', avgTempC:36.100, deltaC:+2.420, phase:'Active heating — rise' },
    { date:'2026-08-01', avgTempC:38.850, deltaC:+2.750, phase:'Peak temp achieved — stop 10:00' },
    { date:'2026-08-02', avgTempC:38.640, deltaC:-0.210, phase:'Post-heating (natural cooling)' },
    { date:'2026-08-03', avgTempC:38.450, deltaC:-0.190, phase:'Post-heating (natural cooling)' },
    { date:'2026-08-04', avgTempC:38.230, deltaC:-0.220, phase:'Post-heating (natural cooling)' },
    { date:'2026-08-05', avgTempC:38.010, deltaC:-0.220, phase:'Post-heating (natural cooling)' },
    { date:'2026-08-06', avgTempC:37.840, deltaC:-0.170, phase:'Pre-arrival monitoring' },
    { date:'2026-08-07', avgTempC:37.680, deltaC:-0.160, phase:'Pre-arrival monitoring' },
  ];

  const initialTempC               = dailyTempProfile[0].avgTempC;
  const lowestTempC                = dailyTempProfile[5].avgTempC;
  const peakTempC                  = dailyTempProfile[7].avgTempC;
  const dischargeTempC             = dailyTempProfile[13].avgTempC;
  const naturalCoolingRateCPerDay  = 0.202;

  const tankReadingsAtDischarge = [
    { tank:'1P',   gradeC:37.5, volume:10480.0 },
    { tank:'1S',   gradeC:37.6, volume:10395.0 },
    { tank:'2P',   gradeC:37.8, volume:13210.0 },
    { tank:'2S',   gradeC:37.9, volume:13185.0 },
    { tank:'3P',   gradeC:38.0, volume:12900.0 },
    { tank:'3S',   gradeC:37.9, volume:12875.0 },
    { tank:'4P',   gradeC:38.0, volume:12580.0 },
    { tank:'4S',   gradeC:37.8, volume:12560.0 },
    { tank:'5P',   gradeC:37.7, volume:12300.0 },
    { tank:'5S',   gradeC:37.6, volume:12280.0 },
    { tank:'SL-S', gradeC:37.5, volume:1655.0  },
    { tank:'SL-P', gradeC:null, volume:0        },
  ];

  const bunkerRecords = [
    { date:'2026-07-31', vlsfoRaiseMT:22.0, doRaiseMT:0, vlsfoRobMT:1810, doRobMT:265, heatingDurationH:24, heatingStartLT:'14:00', heatingStopLT:'' },
    { date:'2026-08-01', vlsfoRaiseMT:19.5, doRaiseMT:0, vlsfoRobMT:1748, doRobMT:265, heatingDurationH:22, heatingStartLT:'',      heatingStopLT:'10:00' },
  ];
  const totalBoilerFuelMT  = 41.5;
  const vlsfoUnitCostUSD   = 640.0;
  const heatingFuelCostUSD = totalBoilerFuelMT * vlsfoUnitCostUSD;

  const tankWaterReadings = [
    { tank:'1P', waterM3:'N/F'    }, { tank:'1S', waterM3:'N/F' },
    { tank:'2P', waterM3:'Traces' }, { tank:'2S', waterM3:'Traces' },
    { tank:'3P', waterM3:'N/F'    }, { tank:'3S', waterM3:'N/F' },
    { tank:'4P', waterM3:4        }, { tank:'4S', waterM3:28    },
    { tank:'5P', waterM3:7        }, { tank:'5S', waterM3:11    },
    { tank:'SL-S', waterM3:6.2   }, { tank:'SL-P', waterM3:0   },
  ];
  const totalFreeWaterM3 = 56.2;
  const freeWaterPct     = (totalFreeWaterM3 / totalGrossCargoM3) * 100.0;

  const h2sReadings = {
    gradeA: 0,
    gradeB: null,
    gradeC: null,
    cot6S_ppm: 0,
    maxH2sPpm: 0,
    isgottThresholdPpm: 5,
  };
  const maxH2sPpm = h2sReadings.maxH2sPpm;

  const heatingCompliant = dischargeTempC >= minRequiredTempC && dischargeTempC <= maxAllowedTempC;
  const waterCompliant   = freeWaterPct <= 0.15;
  const h2sCompliant     = maxH2sPpm <= 5;
  const overallCompliant = heatingCompliant && waterCompliant && h2sCompliant;

  return {
    vesselName: voyage?.vessel?.name || 'MT Tegrity Apex',
    imoNumber:  voyage?.vessel?.imo  || '9200101',
    voyageNo, cargoGrade, apiGravity, loadPort, dischargePort, totalGrossCargoM3,
    minRequiredTempC, maxAllowedTempC, loadingTempC,
    initialTempC, lowestTempC, peakTempC, dischargeTempC,
    tempRiseC: peakTempC - lowestTempC,
    tempDropFromPeak: peakTempC - dischargeTempC,
    naturalCoolingRateCPerDay,
    dailyTempProfile,
    heatingStartIso, heatingStopIso, heatingDurationHours, heatingCycleDays,
    totalBoilerFuelMT, vlsfoUnitCostUSD, heatingFuelCostUSD, bunkerRecords,
    tankReadingsAtDischarge, tankWaterReadings,
    totalFreeWaterM3,
    freeWaterPct: parseFloat(freeWaterPct.toFixed(4)),
    ...h2sReadings, maxH2sPpm,
    heatingCompliant, waterCompliant, h2sCompliant,
    governanceStatus: overallCompliant ? 'FULLY COMPLIANT' : 'DISCREPANCY DETECTED',
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// TEGRITEC SHIPPING — VOYAGE SEED DATA (6 voyages, fully synthetic)
// Vessel IMOs, voyage IDs, port codes, dates, financial figures, and event
// timelines are all invented for demonstration purposes. Any resemblance
// to real shipping records is coincidental.
// ══════════════════════════════════════════════════════════════════════════════
export const VOYAGE_SEED_DATA = [

  // ──────────────────────────────────────────────────────────────────────────
  // TVQ-2026-001 | MT Tegrity Apex | Basrah → Port Klang | Crude Oil
  // Status: IN PROGRESS — Laytime running, demurrage dispute developing
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'TVQ-2026-001',
    vessel: VESSELS[0],   // MT Tegrity Apex
    port: PORTS[0],       // Port Klang (arrival port)
    originPort: { name:'Basrah Oil Terminal', country:'Iraq', lat:30.5085, lon:47.7804 },
    planEtaUtc: '2026-08-20T06:00:00Z',
    cargoType:'Tanker', cargo:'Basrah Light Crude Oil', quantity:110000, unit:'MT',
    charterparty: {
      charterType:'Voyage',
      form:'SHELLVOY6', laytimeTerm:'SHINC', norClause:'WIBON',
      laytimeType:'Non-reversible (per port)',
      warrantedSpeed:13.5, warrantedConsumption:38, warrantedConditionMax:4,
      demurrageRate:45000, despatchRate:22500, allowedLaytime:55,
      riderClauses:[
        { id:'r1', title:'Heating Warranty Rider', text:'Owner warrants that cargo shall be maintained at minimum 35°C throughout voyage. Failure to deliver cargo above 35°C: demurrage clock counts from arrival regardless of heating status.', overrides:'SHELLVOY6 Cl.9', conflictFlag:false },
        { id:'r2', title:'Port Congestion Rider', text:'Any waiting time at anchorage due to berth unavailability at Westport Terminal shall NOT count as laytime. Time lost to port congestion is receiver\'s risk under this rider.', overrides:'SHELLVOY6 Cl.12 (SHINC)', conflictFlag:true, conflictNote:'Rider conflicts with SHINC — port congestion now excluded but receiver disputes this exclusion (3rd party terminal queue). Financial exposure: material.' },
      ],
      claimsTimeBar:'90 days from completion of discharge',
      pumpingWarranty:true,
      weatherSource:'Independent hindcast (MetOcean Solutions)',
    },
    status:'in_progress',
    signingSequence:['master','portAgent','terminal','charterer'],
    signingStatus:{ master:'signed', portAgent:'pending', terminal:'pending', charterer:'pending' },
    masterEvents:[
      { id:'me1', code:'ARR_PORT',   label:'Arrived at Port Limits / Pilot Station', tsDevice:'2026-08-20T06:30:00Z', tsEntered:'2026-08-20T06:30:00Z', tsAIS:'2026-08-20T06:28:00Z', isException:false, remarks:'Arrived at Westport Pilot Station — no berth available, proceeding to anchorage', gpsLat:3.0000, gpsLon:101.4000, source:'master' },
      { id:'me2', code:'NOR_TEND',   label:'NOR Tendered', tsDevice:'2026-08-20T06:45:00Z', tsEntered:'2026-08-20T06:45:00Z', tsAIS:null, isException:false, remarks:'NOR tendered by radio and email to TegrityTec Shipping agents', gpsLat:3.0000, gpsLon:101.4000, source:'master' },
      { id:'me3', code:'ANCH_START', label:'Anchored — Waiting Berth', tsDevice:'2026-08-20T07:15:00Z', tsEntered:'2026-08-20T07:15:00Z', tsAIS:'2026-08-20T07:17:00Z', isException:true, remarks:'Anchorage B-14 — Port Klang anchorage. Berth occupied, estimated 18h wait.', gpsLat:3.0500, gpsLon:101.3200, source:'master' },
      { id:'me4', code:'BERTH_ARR',  label:'Arrived at Berth', tsDevice:'2026-08-21T02:00:00Z', tsEntered:'2026-08-21T02:00:00Z', tsAIS:'2026-08-21T01:58:00Z', isException:false, remarks:'Berth 12 — Westport Terminal, Port Klang', gpsLat:3.0200, gpsLon:101.3800, source:'master' },
      { id:'me5', code:'MOOR_COMP',  label:'Mooring Completed', tsDevice:'2026-08-21T02:45:00Z', tsEntered:'2026-08-21T02:45:00Z', tsAIS:null, isException:false, remarks:'All fast, gangway rigged', gpsLat:3.0200, gpsLon:101.3800, source:'master' },
      { id:'me6', code:'NOR_ACC',    label:'NOR Accepted', tsDevice:'2026-08-21T04:00:00Z', tsEntered:'2026-08-21T04:00:00Z', tsAIS:null, isException:false, remarks:'NOR accepted by terminal representative', gpsLat:3.0200, gpsLon:101.3800, source:'master' },
      { id:'me7', code:'PUMP_START', label:'Discharge Commenced', tsDevice:'2026-08-21T06:30:00Z', tsEntered:'2026-08-21T06:30:00Z', tsAIS:null, isException:false, remarks:'Discharge rate: 4,200 MT/hr — within pumpingwarranty', gpsLat:3.0200, gpsLon:101.3800, source:'master' },
    ],
    agentEvents:[
      { id:'ae1', code:'ARR_PORT',   label:'Arrived at Port Limits', tsDevice:'2026-08-20T06:35:00Z', tsEntered:'2026-08-20T06:35:00Z', tsAIS:'2026-08-20T06:28:00Z', isException:false, remarks:'Vessel arrival confirmed', gpsLat:3.0000, gpsLon:101.4000, source:'agent' },
      { id:'ae2', code:'NOR_TEND',   label:'NOR Tendered', tsDevice:'2026-08-20T06:50:00Z', tsEntered:'2026-08-20T06:50:00Z', tsAIS:null, isException:false, remarks:'NOR received at agent office — 5-min variance with Master', gpsLat:3.0000, gpsLon:101.4000, source:'agent' },
      { id:'ae3', code:'ANCH_START', label:'Anchored — Waiting Berth', tsDevice:'2026-08-20T07:15:00Z', tsEntered:'2026-08-20T07:15:00Z', tsAIS:'2026-08-20T07:17:00Z', isException:true, remarks:'DISPUTED: Agent claims port congestion waiting time counts as laytime under SHINC — rider clause exclusion not accepted.', gpsLat:3.0500, gpsLon:101.3200, source:'agent', conflict:true, conflictNote:'Agent disputes Port Congestion Rider exclusion. Agent position: SHINC means all time counts. Financial impact if agent prevails: ~19.25h × $45,000/24 = $36,094.' },
      { id:'ae4', code:'BERTH_ARR',  label:'Arrived at Berth', tsDevice:'2026-08-21T02:05:00Z', tsEntered:'2026-08-21T02:05:00Z', tsAIS:'2026-08-21T01:58:00Z', isException:false, remarks:'Confirmed Berth 12', gpsLat:3.0200, gpsLon:101.3800, source:'agent', conflict:true, conflictNote:'5-min variance with Master record (02:00 vs 02:05)' },
      { id:'ae5', code:'NOR_ACC',    label:'NOR Accepted', tsDevice:'2026-08-21T04:00:00Z', tsEntered:'2026-08-21T04:00:00Z', tsAIS:null, isException:false, remarks:'Accepted as presented', gpsLat:3.0200, gpsLon:101.3800, source:'agent' },
      { id:'ae6', code:'PUMP_START', label:'Discharge Commenced', tsDevice:'2026-08-21T06:30:00Z', tsEntered:'2026-08-21T06:30:00Z', tsAIS:null, isException:false, remarks:'Confirmed by terminal supervisor', gpsLat:3.0200, gpsLon:101.3800, source:'agent' },
    ],
    disputes:[
      { id:'d1', eventCode:'ANCH_START', issue:'Port Congestion Rider vs. SHINC — 19.25h anchorage waiting time', raisedBy:'Port Agent', status:'open', priority:'high', financialImpact:36094, notes:'Rider clause excludes port congestion from laytime. Agent disputes rider validity under SHINC. 19h15m at anchorage (07:15 Aug 20 – 02:00 Aug 21). Requires legal review of rider vs. printed form precedence.', createdAt:'2026-08-21T05:00:00Z' },
      { id:'d2', eventCode:'BERTH_ARR', issue:'5-minute timestamp variance on berth arrival', raisedBy:'Port Agent', status:'open', priority:'low', financialImpact:156, notes:'Minor variance — likely clock sync. AIS confirms 01:58 approach. Negligible financial impact.', createdAt:'2026-08-21T05:10:00Z' },
    ],
    createdAt:'2026-08-01T09:00:00Z', updatedAt:'2026-08-21T07:00:00Z',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TVQ-2026-002 | MV Tegrity Crest | Kochi → Colombo → Busan | Jet A-1
  // Status: COMPLETED — Despatch earned, all parties signed, clean SOF
  // ──────────────────────────────────────────────────────────────────────────
  {
    id:'TVQ-2026-002',
    vessel: VESSELS[1],   // MV Tegrity Crest
    port: PORTS[8],       // Busan (final discharge port)
    originPort: { name:'Kochi Refinery Jetty', country:'India', lat:9.9312, lon:76.2673 },
    planEtaUtc: '2026-07-18T10:00:00Z',
    cargoType:'Tanker', cargo:'Jet A-1 Aviation Fuel', quantity:42500, unit:'MT',
    charterparty:{
      charterType:'Voyage',
      form:'BPVOY4', laytimeTerm:'SHEX EIU', norClause:'WIPON',
      laytimeType:'Non-reversible (per port)',
      warrantedSpeed:13.8, warrantedConsumption:26, warrantedConditionMax:5,
      demurrageRate:32000, despatchRate:16000, allowedLaytime:72,
      riderClauses:[
        { id:'r1', title:'Multi-Port Itinerary Rider', text:'Vessel to call Colombo Port Bunker Berth for VLSFO bunkering en route. Bunkering time ≤ 10 hours shall not count as laytime at either port.', overrides:'BPVOY4 Cl.8', conflictFlag:false },
      ],
      claimsTimeBar:'90 days from completion of discharge (BPVOY4 Cl.24)',
      pumpingWarranty:true,
      weatherSource:"Vessel's noon report",
    },
    status:'completed',
    signingSequence:['master','portAgent','terminal','charterer'],
    signingStatus:{ master:'signed', portAgent:'signed', terminal:'signed', charterer:'signed' },
    masterEvents:[
      // Kochi (load port)
      { id:'me1', code:'ARR_PORT',  label:'Arrival at Kochi — Port Limits', tsDevice:'2026-07-10T08:00:00Z', tsEntered:'2026-07-10T08:00:00Z', tsAIS:'2026-07-10T07:57:00Z', isException:false, remarks:'', gpsLat:9.9312, gpsLon:76.2673, source:'master' },
      { id:'me2', code:'NOR_TEND',  label:'NOR Tendered', tsDevice:'2026-07-10T08:15:00Z', tsEntered:'2026-07-10T08:15:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:9.9312, gpsLon:76.2673, source:'master' },
      { id:'me3', code:'BERTH_ARR', label:'Arrived at Kochi Refinery Jetty', tsDevice:'2026-07-10T11:00:00Z', tsEntered:'2026-07-10T11:00:00Z', tsAIS:'2026-07-10T10:58:00Z', isException:false, remarks:'Jetty 4 — Kochi Refinery', gpsLat:9.9312, gpsLon:76.2673, source:'master' },
      { id:'me4', code:'PUMP_START',label:'Loading Commenced', tsDevice:'2026-07-10T14:00:00Z', tsEntered:'2026-07-10T14:00:00Z', tsAIS:null, isException:false, remarks:'Flow rate 2,100 MT/hr', gpsLat:9.9312, gpsLon:76.2673, source:'master' },
      { id:'me5', code:'CARGO_COMP',label:'Loading Completed', tsDevice:'2026-07-11T04:30:00Z', tsEntered:'2026-07-11T04:30:00Z', tsAIS:null, isException:false, remarks:'42,500 MT loaded — B/L signed', gpsLat:9.9312, gpsLon:76.2673, source:'master' },
      { id:'me6', code:'DEP_PORT',  label:'Departed Kochi', tsDevice:'2026-07-11T08:00:00Z', tsEntered:'2026-07-11T08:00:00Z', tsAIS:'2026-07-11T08:02:00Z', isException:false, remarks:'En route Colombo for bunkering', gpsLat:9.9312, gpsLon:76.2673, source:'master' },
      // Colombo (bunker stop — rider clause: ≤10h does not count)
      { id:'me7', code:'BERTH_ARR', label:'Arrived Colombo Bunker Berth', tsDevice:'2026-07-13T06:00:00Z', tsEntered:'2026-07-13T06:00:00Z', tsAIS:'2026-07-13T05:58:00Z', isException:false, remarks:'VLSFO bunkering — rider clause applies', gpsLat:6.9271, gpsLon:79.8612, source:'master' },
      { id:'me8', code:'PUMP_RESUME',label:'Bunkering Completed — Departed Colombo', tsDevice:'2026-07-13T14:00:00Z', tsEntered:'2026-07-13T14:00:00Z', tsAIS:'2026-07-13T14:03:00Z', isException:false, remarks:'8h bunkering — within 10h rider exclusion. 420 MT VLSFO received.', gpsLat:6.9271, gpsLon:79.8612, source:'master' },
      // Busan (discharge port)
      { id:'me9',  code:'ARR_PORT',  label:'Arrival at Busan — Port Limits', tsDevice:'2026-07-18T09:45:00Z', tsEntered:'2026-07-18T09:45:00Z', tsAIS:'2026-07-18T09:42:00Z', isException:false, remarks:'', gpsLat:35.1796, gpsLon:129.0756, source:'master' },
      { id:'me10', code:'NOR_TEND',  label:'NOR Tendered — Busan', tsDevice:'2026-07-18T10:00:00Z', tsEntered:'2026-07-18T10:00:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:35.1796, gpsLon:129.0756, source:'master' },
      { id:'me11', code:'BERTH_ARR', label:'Arrived at Busan New Port Jetty', tsDevice:'2026-07-18T13:30:00Z', tsEntered:'2026-07-18T13:30:00Z', tsAIS:'2026-07-18T13:28:00Z', isException:false, remarks:'Berth 6 — SK Energy Terminal', gpsLat:35.1796, gpsLon:129.0756, source:'master' },
      { id:'me12', code:'PUMP_START',label:'Discharge Commenced — Busan', tsDevice:'2026-07-18T16:00:00Z', tsEntered:'2026-07-18T16:00:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:35.1796, gpsLon:129.0756, source:'master' },
      { id:'me13', code:'CARGO_COMP',label:'Discharge Completed — Busan', tsDevice:'2026-07-19T10:00:00Z', tsEntered:'2026-07-19T10:00:00Z', tsAIS:null, isException:false, remarks:'Laytime: 18h used of 72h allowed. Despatch: 54h × $16,000/24 = $36,000.', gpsLat:35.1796, gpsLon:129.0756, source:'master' },
      { id:'me14', code:'DEP_PORT',  label:'Departed Busan', tsDevice:'2026-07-19T14:00:00Z', tsEntered:'2026-07-19T14:00:00Z', tsAIS:'2026-07-19T14:02:00Z', isException:false, remarks:'', gpsLat:35.1796, gpsLon:129.0756, source:'master' },
    ],
    agentEvents:[
      { id:'ae1', code:'ARR_PORT',  label:'Arrival Kochi', tsDevice:'2026-07-10T08:00:00Z', tsEntered:'2026-07-10T08:00:00Z', tsAIS:'2026-07-10T07:57:00Z', isException:false, remarks:'', gpsLat:9.9312, gpsLon:76.2673, source:'agent' },
      { id:'ae2', code:'NOR_TEND',  label:'NOR Tendered Kochi', tsDevice:'2026-07-10T08:15:00Z', tsEntered:'2026-07-10T08:15:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:9.9312, gpsLon:76.2673, source:'agent' },
      { id:'ae3', code:'BERTH_ARR', label:'Kochi Jetty 4', tsDevice:'2026-07-10T11:00:00Z', tsEntered:'2026-07-10T11:00:00Z', tsAIS:'2026-07-10T10:58:00Z', isException:false, remarks:'', gpsLat:9.9312, gpsLon:76.2673, source:'agent' },
      { id:'ae4', code:'CARGO_COMP',label:'Loading Completed Kochi', tsDevice:'2026-07-11T04:30:00Z', tsEntered:'2026-07-11T04:30:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:9.9312, gpsLon:76.2673, source:'agent' },
      { id:'ae5', code:'ARR_PORT',  label:'Arrival Busan', tsDevice:'2026-07-18T09:45:00Z', tsEntered:'2026-07-18T09:45:00Z', tsAIS:'2026-07-18T09:42:00Z', isException:false, remarks:'', gpsLat:35.1796, gpsLon:129.0756, source:'agent' },
      { id:'ae6', code:'NOR_TEND',  label:'NOR Tendered Busan', tsDevice:'2026-07-18T10:00:00Z', tsEntered:'2026-07-18T10:00:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:35.1796, gpsLon:129.0756, source:'agent' },
      { id:'ae7', code:'CARGO_COMP',label:'Discharge Completed Busan', tsDevice:'2026-07-19T10:00:00Z', tsEntered:'2026-07-19T10:00:00Z', tsAIS:null, isException:false, remarks:'Despatch confirmed: $36,000. All parties satisfied.', gpsLat:35.1796, gpsLon:129.0756, source:'agent' },
    ],
    disputes:[],
    createdAt:'2026-07-08T10:00:00Z', updatedAt:'2026-07-19T14:00:00Z',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TVQ-2026-003 | MV Tegrity Pacific | Dampier → Corpus Christi | Iron Ore
  // Status: DISPUTED — Cargo quantity shortfall, agent signed under protest
  // ──────────────────────────────────────────────────────────────────────────
  {
    id:'TVQ-2026-003',
    vessel: VESSELS[2],   // MV Tegrity Pacific
    port: PORTS[5],       // Corpus Christi (discharge port)
    originPort: { name:'Dampier Port, Berth 3', country:'Australia', lat:-20.6574, lon:116.7139 },
    planEtaUtc: '2026-08-04T12:00:00Z',
    cargoType:'Dry Bulk', cargo:'Iron Ore (Fines)', quantity:78000, unit:'MT',
    charterparty:{
      charterType:'Voyage',
      form:'GENCON94', laytimeTerm:'SHEX EIU', norClause:'WIBON',
      laytimeType:'Non-reversible (per port)',
      warrantedSpeed:13.2, warrantedConsumption:30, warrantedConditionMax:5,
      demurrageRate:24000, despatchRate:12000, allowedLaytime:120,
      riderClauses:[
        { id:'r1', title:'Loading Rate Warranty Rider', text:'Shipper warrants loading rate of minimum 8,000 MT/hr. If loading falls below this rate due to shore equipment failure, time lost shall be excluded from laytime.', overrides:'GENCON94 Cl.6', conflictFlag:false },
        { id:'r2', title:'Cargo Quantity Tolerance Rider', text:'Vessel to load maximum quantity basis vessel\'s intake capacity at Master\'s option. Charterer warrants minimum cargo of 75,000 MT. Shortfall below 75,000 MT is deadfreight at freight rate.', overrides:'GENCON94 Cl.1', conflictFlag:true, conflictNote:'Actual loaded quantity 73,420 MT — below 75,000 MT minimum. Deadfreight claim initiated by Owner. Charterer disputes measurement basis.' },
      ],
      claimsTimeBar:'English law 6-year limitation',
      pumpingWarranty:false,
      weatherSource:"Vessel's noon report",
    },
    status:'disputed',
    signingSequence:['master','portAgent','terminal','charterer'],
    signingStatus:{ master:'signed', portAgent:'signed_under_protest', terminal:'signed', charterer:'pending' },
    masterEvents:[
      { id:'me1', code:'ARR_PORT',   label:'Arrival at Port Limits — Corpus Christi', tsDevice:'2026-08-04T12:30:00Z', tsEntered:'2026-08-04T12:30:00Z', tsAIS:'2026-08-04T12:28:00Z', isException:false, remarks:'', gpsLat:27.8006, gpsLon:-97.3964, source:'master' },
      { id:'me2', code:'NOR_TEND',   label:'NOR Tendered', tsDevice:'2026-08-04T12:45:00Z', tsEntered:'2026-08-04T12:45:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:27.8006, gpsLon:-97.3964, source:'master' },
      { id:'me3', code:'BERTH_ARR',  label:'Arrived at Berth', tsDevice:'2026-08-05T07:00:00Z', tsEntered:'2026-08-05T07:00:00Z', tsAIS:'2026-08-05T06:58:00Z', isException:false, remarks:'La Quinta Channel — Corpus Christi Bulk Terminal', gpsLat:27.7800, gpsLon:-97.3400, source:'master' },
      { id:'me4', code:'PUMP_START', label:'Discharge Commenced', tsDevice:'2026-08-05T10:00:00Z', tsEntered:'2026-08-05T10:00:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:27.7800, gpsLon:-97.3400, source:'master' },
      { id:'me5', code:'EQUIP_FAIL', label:'Shore Conveyor Equipment Failure', tsDevice:'2026-08-06T14:00:00Z', tsEntered:'2026-08-06T14:00:00Z', tsAIS:null, isException:true, remarks:'Shore conveyor belt #2 failed — terminal equipment. Excluded from laytime per SHEX EIU and terminal equipment clause.', gpsLat:27.7800, gpsLon:-97.3400, source:'master' },
      { id:'me6', code:'PUMP_RESUME',label:'Discharge Resumed', tsDevice:'2026-08-07T08:00:00Z', tsEntered:'2026-08-07T08:00:00Z', tsAIS:null, isException:false, remarks:'Shore conveyor repaired — 18h equipment downtime excluded', gpsLat:27.7800, gpsLon:-97.3400, source:'master' },
      { id:'me7', code:'CARGO_COMP', label:'Discharge Completed', tsDevice:'2026-08-08T22:00:00Z', tsEntered:'2026-08-08T22:00:00Z', tsAIS:null, isException:false, remarks:'Ship figure 73,200 MT vs Draft survey 73,420 MT. LOI issued for shortage vs. B/L 78,000 MT.', gpsLat:27.7800, gpsLon:-97.3400, source:'master' },
    ],
    agentEvents:[
      { id:'ae1', code:'ARR_PORT',   label:'Arrival Corpus Christi', tsDevice:'2026-08-04T12:30:00Z', tsEntered:'2026-08-04T12:30:00Z', tsAIS:'2026-08-04T12:28:00Z', isException:false, remarks:'', gpsLat:27.8006, gpsLon:-97.3964, source:'agent' },
      { id:'ae2', code:'NOR_TEND',   label:'NOR Tendered', tsDevice:'2026-08-04T12:45:00Z', tsEntered:'2026-08-04T12:45:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:27.8006, gpsLon:-97.3964, source:'agent' },
      { id:'ae3', code:'BERTH_ARR',  label:'Arrived at Berth', tsDevice:'2026-08-05T07:00:00Z', tsEntered:'2026-08-05T07:00:00Z', tsAIS:'2026-08-05T06:58:00Z', isException:false, remarks:'', gpsLat:27.7800, gpsLon:-97.3400, source:'agent' },
      { id:'ae4', code:'EQUIP_FAIL', label:'Shore Equipment Failure', tsDevice:'2026-08-06T14:00:00Z', tsEntered:'2026-08-06T14:00:00Z', tsAIS:null, isException:true, remarks:'DISPUTED: Agent accepts equipment failure but disputes full 18h exclusion — claims only 12h was genuine downtime.', gpsLat:27.7800, gpsLon:-97.3400, source:'agent', conflict:true, conflictNote:'Agent position: 6h was operational inefficiency not equipment failure. Contested hours: 6h × $24,000/24 = $6,000.' },
      { id:'ae5', code:'PUMP_RESUME',label:'Discharge Resumed', tsDevice:'2026-08-07T08:00:00Z', tsEntered:'2026-08-07T08:00:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:27.7800, gpsLon:-97.3400, source:'agent' },
      { id:'ae6', code:'CARGO_COMP', label:'Discharge Completed', tsDevice:'2026-08-08T22:00:00Z', tsEntered:'2026-08-08T22:00:00Z', tsAIS:null, isException:false, remarks:'Agent signed under protest — disputes cargo quantity and deadfreight basis.', gpsLat:27.7800, gpsLon:-97.3400, source:'agent', conflict:true, conflictNote:'Charterer disputes whether shortage is deadfreight — claims cargo was affected by moisture variation during Australia monsoon season.' },
    ],
    disputes:[
      { id:'d1', eventCode:'CARGO_COMP', issue:'Cargo quantity shortfall — possible deadfreight claim', raisedBy:'Master (Owner)', status:'open', priority:'high', financialImpact:98000, notes:'B/L quantity 78,000 MT. Draft survey discharge 73,420 MT. Shortfall 4,580 MT below B/L, 1,580 MT below rider minimum. Owner claims deadfreight on 1,580 MT × ~$62/MT freight rate = ~$97,960. Charterer disputes moisture/density basis of draft survey.', createdAt:'2026-08-08T23:00:00Z' },
      { id:'d2', eventCode:'EQUIP_FAIL', issue:'Equipment failure duration contested — 6h disputed', raisedBy:'Port Agent', status:'open', priority:'medium', financialImpact:6000, notes:'Master claims full 18h equipment downtime excluded from laytime. Agent disputes 6h of this period as operational inefficiency. Financial impact of 6h: $6,000 at demurrage rate.', createdAt:'2026-08-09T08:00:00Z' },
    ],
    createdAt:'2026-07-20T10:00:00Z', updatedAt:'2026-08-09T08:00:00Z',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TVQ-2026-004 | MT Tegrity Prime | Basrah → Antwerp | Crude Oil (VLCC)
  // Status: PENDING SIGNATURE — Voyage complete, awaiting charterer sign-off
  // ──────────────────────────────────────────────────────────────────────────
  {
    id:'TVQ-2026-004',
    vessel: VESSELS[3],   // MT Tegrity Prime
    port: PORTS[4],       // Antwerp
    originPort: { name:'Basrah Oil Terminal — SPM', country:'Iraq', lat:29.8500, lon:48.9800 },
    planEtaUtc: '2026-08-08T14:00:00Z',
    cargoType:'Tanker', cargo:'Basrah Heavy Crude Oil', quantity:128000, unit:'MT',
    charterparty:{
      charterType:'Voyage',
      form:'ASBATANKVOY', laytimeTerm:'SHINC', norClause:'WIBON',
      laytimeType:'Non-reversible (per port)',
      warrantedSpeed:14.0, warrantedConsumption:52, warrantedConditionMax:4,
      demurrageRate:52000, despatchRate:26000, allowedLaytime:48,
      riderClauses:[
        { id:'r1', title:'Worldscale Rate Rider', text:'Freight calculated at WS115 on Baltic/VLCC route TD3C (Basrah–Rotterdam). Rate frozen at fixture date; Baltic assessment applies at Bill of Lading date.', overrides:'ASBATANKVOY Cl.2', conflictFlag:false },
        { id:'r2', title:'Antwerp Scheldt River Rider', text:'Vessel to arrive Flushing Roads and tender NOR. River passage time (Flushing to Antwerp) shall NOT count as laytime — maximum 6h river passage.', overrides:'ASBATANKVOY Cl.6', conflictFlag:false },
      ],
      claimsTimeBar:'90 days from completion of discharge',
      pumpingWarranty:true,
      weatherSource:"Independent hindcast (StormGeo)",
    },
    status:'pending_signature',
    signingSequence:['master','portAgent','terminal','charterer'],
    signingStatus:{ master:'signed', portAgent:'signed', terminal:'signed', charterer:'pending' },
    masterEvents:[
      { id:'me1', code:'ARR_PORT',   label:'Arrived at Flushing Roads (NOR Position)', tsDevice:'2026-08-08T13:45:00Z', tsEntered:'2026-08-08T13:45:00Z', tsAIS:'2026-08-08T13:43:00Z', isException:false, remarks:'', gpsLat:51.4500, gpsLon:3.6000, source:'master' },
      { id:'me2', code:'NOR_TEND',   label:'NOR Tendered at Flushing Roads', tsDevice:'2026-08-08T14:00:00Z', tsEntered:'2026-08-08T14:00:00Z', tsAIS:null, isException:false, remarks:'NOR tendered for 128,000 MT Basrah Heavy Crude Oil', gpsLat:51.4500, gpsLon:3.6000, source:'master' },
      { id:'me3', code:'NOR_ACC',    label:'NOR Accepted by Charterer Rep', tsDevice:'2026-08-08T15:30:00Z', tsEntered:'2026-08-08T15:30:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:51.4500, gpsLon:3.6000, source:'master' },
      { id:'me4', code:'BERTH_ARR',  label:'Arrived at Antwerp — Berth 807', tsDevice:'2026-08-08T20:00:00Z', tsEntered:'2026-08-08T20:00:00Z', tsAIS:'2026-08-08T19:58:00Z', isException:false, remarks:'River passage: 6h — within rider exclusion. Berth 807, Antwerp North Sea Terminal', gpsLat:51.2213, gpsLon:4.4051, source:'master' },
      { id:'me5', code:'MOOR_COMP',  label:'Mooring Completed', tsDevice:'2026-08-08T21:00:00Z', tsEntered:'2026-08-08T21:00:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:51.2213, gpsLon:4.4051, source:'master' },
      { id:'me6', code:'PUMP_START', label:'Discharge Commenced', tsDevice:'2026-08-09T01:00:00Z', tsEntered:'2026-08-09T01:00:00Z', tsAIS:null, isException:false, remarks:'Rate: 5,800 MT/hr', gpsLat:51.2213, gpsLon:4.4051, source:'master' },
      { id:'me7', code:'CARGO_COMP', label:'Discharge Completed', tsDevice:'2026-08-09T23:00:00Z', tsEntered:'2026-08-09T23:00:00Z', tsAIS:null, isException:false, remarks:'All cargo discharged. Laytime: 38h used of 48h allowed. Despatch: 10h × $26,000/24 = $10,833. SOF submitted to charterer — pending signature.', gpsLat:51.2213, gpsLon:4.4051, source:'master' },
      { id:'me8', code:'DEP_PORT',   label:'Departed Antwerp', tsDevice:'2026-08-10T06:00:00Z', tsEntered:'2026-08-10T06:00:00Z', tsAIS:'2026-08-10T06:02:00Z', isException:false, remarks:'In ballast. Next orders pending.', gpsLat:51.2213, gpsLon:4.4051, source:'master' },
    ],
    agentEvents:[
      { id:'ae1', code:'ARR_PORT',   label:'Arrival Flushing Roads', tsDevice:'2026-08-08T13:45:00Z', tsEntered:'2026-08-08T13:45:00Z', tsAIS:'2026-08-08T13:43:00Z', isException:false, remarks:'', gpsLat:51.4500, gpsLon:3.6000, source:'agent' },
      { id:'ae2', code:'NOR_TEND',   label:'NOR Tendered', tsDevice:'2026-08-08T14:00:00Z', tsEntered:'2026-08-08T14:00:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:51.4500, gpsLon:3.6000, source:'agent' },
      { id:'ae3', code:'NOR_ACC',    label:'NOR Accepted', tsDevice:'2026-08-08T15:30:00Z', tsEntered:'2026-08-08T15:30:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:51.4500, gpsLon:3.6000, source:'agent' },
      { id:'ae4', code:'BERTH_ARR',  label:'Arrived Antwerp Berth 807', tsDevice:'2026-08-08T20:00:00Z', tsEntered:'2026-08-08T20:00:00Z', tsAIS:'2026-08-08T19:58:00Z', isException:false, remarks:'Confirmed', gpsLat:51.2213, gpsLon:4.4051, source:'agent' },
      { id:'ae5', code:'CARGO_COMP', label:'Discharge Completed', tsDevice:'2026-08-09T23:00:00Z', tsEntered:'2026-08-09T23:00:00Z', tsAIS:null, isException:false, remarks:'Despatch: $10,833 due to owners. SOF submitted. Awaiting charterer countersignature.', gpsLat:51.2213, gpsLon:4.4051, source:'agent' },
    ],
    disputes:[],
    createdAt:'2026-07-15T08:00:00Z', updatedAt:'2026-08-10T06:00:00Z',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TVQ-2026-005 | MV Tegrity Vigil | Port Klang → Karachi | Methanol (TC)
  // Status: IN PROGRESS — Time Charter, off-hire event (pump failure)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id:'TVQ-2026-005',
    vessel: VESSELS[5],   // MV Tegrity Vigil
    port: PORTS[2],       // Karachi
    originPort: { name:'Port Klang Chemical Berth', country:'Malaysia', lat:3.0000, lon:101.4000 },
    planEtaUtc: '2026-08-18T09:00:00Z',
    cargoType:'Tanker', cargo:'Methanol — Grade A Chemical',
    quantity:38500, unit:'MT',
    charterparty:{
      charterType:'Time',
      form:'INTERTANKTIME 80',
      laytimeTerm:'N/A — Time Charter',
      norClause:'N/A — Time Charter',
      laytimeType:'N/A — Time Charter',
      hireRatePerDay:18500,
      lateRedeliveryMultiplier:1.25,
      warrantedSpeedLaden:12.8,
      warrantedSpeedBallast:13.2,
      warrantedConsumptionLadenVLSFO:16.0,
      warrantedConsumptionLadenMGO:1.2,
      warrantedConsumptionBallastVLSFO:14.5,
      warrantedConsumptionBallastMGO:0.9,
      goodWeatherMaxBf:4,
      currentAllowanceKn:0.2,
      redeliveryVLSFOMin:400, redeliveryVLSFOMax:500,
      redeliveryMGOMin:60,    redeliveryMGOMax:80,
      cargoPumpM3hr:2800, pumpBackpressureBarMax:8,
      hullFoulingTropicalDays:14,
      demurrageRate:0, despatchRate:0, allowedLaytime:0,
      riderClauses:[
        { id:'tc-r1', title:'Chemical Cargo Quality Clause', text:'Charterers to supply cargo that is compatible with the vessel\'s tank coatings (Hempel 35870 epoxy). Owner may reject incompatible cargo and vessel remains on hire.', overrides:'', conflictFlag:false },
        { id:'tc-r2', title:'Pump Performance Clause', text:'Vessel warrants 2,800 m³/hr cargo discharge rate at ≤8 bar. Failure due to vessel equipment is off-hire; failure due to shore backpressure >8 bar is Charterer risk.', overrides:'', conflictFlag:false },
        { id:'tc-r3', title:'CII Cooperative Operations Clause', text:'BIMCO 2022 — Parties cooperate on CII. Charterer\'s slow-steaming orders suspend conflicting speed warranty for that period.', overrides:'', conflictFlag:false },
      ],
      claimsTimeBar:'Pay-now-argue-later; English law 6-year limitation',
      pumpingWarranty:true,
      weatherSource:'Vessel logs (BIMCO Performance Evidence Clause)',
    },
    deliveryDate:'2026-06-01', scheduledRedeliveryDate:'2026-12-01',
    deliveryPort:'Port Klang', redeliveryPort:'Port Klang range',
    status:'in_progress',
    signingSequence:['master','charterer'],
    signingStatus:{ master:'signed', charterer:'pending' },
    hireLedger:[
      { month:'June 2026',    days:30.0, grossHireUSD:555000.00, offHireUSD:0,       netHireUSD:555000.00, notes:'No off-hire. Clean first month.' },
      { month:'July 2026',    days:31.0, grossHireUSD:573500.00, offHireUSD:9625.00, netHireUSD:563875.00, notes:'12.5h cargo pump off-hire (OH-01). Performance complied.' },
      { month:'August 2026',  days:22.0, grossHireUSD:407000.00, offHireUSD:0,       netHireUSD:407000.00, notes:'Ongoing — to 2026-08-22 (current date).' },
    ],
    offHireEvents:[
      { id:'OH-01', event:'Cargo discharge pump seal failure', start:'2026-07-14T08:00Z', end:'2026-07-14T20:30Z', grossHrs:12.5, overlapHrs:0, allowedHrs:12.5, hireDeductionUSD:9625.00, otherClaimUSD:0, outcome:'accepted', party:'Owner', reason:'Pump mechanical seal failed during Karachi discharge. Full 12.5h off-hire confirmed by engineers\' log. Repair completed at anchorage.' },
    ],
    voyageSchedule:[
      { id:'V01', route:'Port Klang → Karachi',   period:'1–12 Jun 2026',  employment:'Laden methanol', days:11, principalIssue:'Normal performance', perfResult:'complied' },
      { id:'V02', route:'Karachi → Port Klang',   period:'16–26 Jun 2026', employment:'Ballast',        days:10, principalIssue:'Normal performance', perfResult:'complied' },
      { id:'V03', route:'Port Klang → Karachi',   period:'1–12 Jul 2026',  employment:'Laden methanol', days:11, principalIssue:'Pump seal failure off-hire', perfResult:'off_hire', suspensionReason:'12.5h off-hire — pump seal failure.' },
      { id:'V04', route:'Karachi → Port Klang',   period:'17–27 Jul 2026', employment:'Ballast',        days:10, principalIssue:'Normal performance', perfResult:'complied' },
      { id:'V05', route:'Port Klang → Karachi',   period:'1–11 Aug 2026',  employment:'Laden methanol', days:11, principalIssue:'Ongoing — current voyage', perfResult:'complied' },
    ],
    performanceRegister:[
      { voyageId:'V01', condition:'Laden', distNM:1640, actualSpeedKn:12.82, reqSpeedKn:12.8, actualTimHrs:127.991, benchTimHrs:128.125, timeLossHrs:0, actualFuelMT:118, warrantedFuelMT:118.5, excessFuelMT:0, timeClaimUSD:0, fuelClaimUSD:0, claimUSD:0, outcome:'Complied' },
      { voyageId:'V02', condition:'Ballast', distNM:1640, actualSpeedKn:13.22, reqSpeedKn:13.2, actualTimHrs:124.058, benchTimHrs:124.242, timeLossHrs:0, actualFuelMT:107, warrantedFuelMT:107.5, excessFuelMT:0, timeClaimUSD:0, fuelClaimUSD:0, claimUSD:0, outcome:'Complied' },
      { voyageId:'V03', condition:'Laden / pump off-hire', distNM:1640, actualSpeedKn:12.80, reqSpeedKn:12.8, actualTimHrs:127.991, benchTimHrs:128.125, timeLossHrs:0, actualFuelMT:118, warrantedFuelMT:118, excessFuelMT:0, timeClaimUSD:0, fuelClaimUSD:0, claimUSD:0, outcome:'Complied — off-hire dealt with separately' },
      { voyageId:'V04', condition:'Ballast', distNM:1640, actualSpeedKn:13.21, reqSpeedKn:13.2, actualTimHrs:124.072, benchTimHrs:124.242, timeLossHrs:0, actualFuelMT:106.5, warrantedFuelMT:107.5, excessFuelMT:0, timeClaimUSD:0, fuelClaimUSD:0, claimUSD:0, outcome:'Complied' },
    ],
    masterEvents:[],
    agentEvents:[],
    disputes:[],
    createdAt:'2026-06-01T08:00:00Z', updatedAt:'2026-08-22T06:00:00Z',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TVQ-2026-006 | MV Tegrity Pacific | Durban → Kochi | Coal
  // Status: IN PROGRESS — Loading completed Durban, en route Kochi
  // ──────────────────────────────────────────────────────────────────────────
  {
    id:'TVQ-2026-006',
    vessel: VESSELS[2],   // MV Tegrity Pacific (2nd voyage)
    port: PORTS[7],       // Kochi (discharge)
    originPort: { name:'Durban Coal Terminal', country:'South Africa', lat:-29.8587, lon:31.0218 },
    planEtaUtc: '2026-09-05T08:00:00Z',
    cargoType:'Dry Bulk', cargo:'Thermal Coal (Richards Bay)', quantity:76000, unit:'MT',
    charterparty:{
      charterType:'Voyage',
      form:'NORGRAIN89', laytimeTerm:'SHINC', norClause:'WIBON',
      laytimeType:'Non-reversible (per port)',
      warrantedSpeed:13.0, warrantedConsumption:28, warrantedConditionMax:4,
      demurrageRate:22000, despatchRate:11000, allowedLaytime:96,
      riderClauses:[
        { id:'r1', title:'Richards Bay Export Allocation Rider', text:'Loading subject to Transnet RBCT export allocation. Any delay due to allocation shortfall at RBCT is at Charterer\'s risk and counts as laytime.', overrides:'NORGRAIN89 Cl.5', conflictFlag:false },
        { id:'r2', title:'Draught Restriction Rider', text:'Vessel subject to Kochi draught restriction of 11.8m at KOSB. Vessel to calculate and advise Master if cargo must be trimmed to comply. Deadfreight if quantity reduced to meet draught.', overrides:'NORGRAIN89 Cl.1', conflictFlag:false },
      ],
      claimsTimeBar:'English law 6-year limitation',
      pumpingWarranty:false,
      weatherSource:"Vessel's noon report",
    },
    status:'in_progress',
    signingSequence:['master','portAgent','terminal','charterer'],
    signingStatus:{ master:'pending', portAgent:'pending', terminal:'pending', charterer:'pending' },
    masterEvents:[
      // Durban (load port — completed)
      { id:'me1', code:'ARR_PORT',   label:'Arrived at Port Limits — Durban', tsDevice:'2026-08-14T07:00:00Z', tsEntered:'2026-08-14T07:00:00Z', tsAIS:'2026-08-14T06:57:00Z', isException:false, remarks:'', gpsLat:-29.8587, gpsLon:31.0218, source:'master' },
      { id:'me2', code:'NOR_TEND',   label:'NOR Tendered — Durban', tsDevice:'2026-08-14T07:20:00Z', tsEntered:'2026-08-14T07:20:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:-29.8587, gpsLon:31.0218, source:'master' },
      { id:'me3', code:'BERTH_ARR',  label:'Arrived at Durban Coal Terminal Berth 4', tsDevice:'2026-08-14T16:00:00Z', tsEntered:'2026-08-14T16:00:00Z', tsAIS:'2026-08-14T15:58:00Z', isException:false, remarks:'Transnet Coal Terminal — Berth DCT4', gpsLat:-29.8587, gpsLon:31.0218, source:'master' },
      { id:'me4', code:'PUMP_START', label:'Loading Commenced', tsDevice:'2026-08-14T20:00:00Z', tsEntered:'2026-08-14T20:00:00Z', tsAIS:null, isException:false, remarks:'Loading rate: 6,500 MT/hr', gpsLat:-29.8587, gpsLon:31.0218, source:'master' },
      { id:'me5', code:'CARGO_COMP', label:'Loading Completed — Durban', tsDevice:'2026-08-16T08:00:00Z', tsEntered:'2026-08-16T08:00:00Z', tsAIS:null, isException:false, remarks:'76,000 MT loaded. B/L signed. Draught: 11.62m — within Kochi draught restriction.', gpsLat:-29.8587, gpsLon:31.0218, source:'master' },
      { id:'me6', code:'DEP_PORT',   label:'Departed Durban — En Route Kochi', tsDevice:'2026-08-16T12:00:00Z', tsEntered:'2026-08-16T12:00:00Z', tsAIS:'2026-08-16T12:02:00Z', isException:false, remarks:'ETA Kochi 5 Sep 2026 08:00 UTC. Passing Cape of Good Hope route.', gpsLat:-29.8587, gpsLon:31.0218, source:'master' },
    ],
    agentEvents:[
      { id:'ae1', code:'ARR_PORT',   label:'Arrival Durban', tsDevice:'2026-08-14T07:00:00Z', tsEntered:'2026-08-14T07:00:00Z', tsAIS:'2026-08-14T06:57:00Z', isException:false, remarks:'', gpsLat:-29.8587, gpsLon:31.0218, source:'agent' },
      { id:'ae2', code:'NOR_TEND',   label:'NOR Tendered', tsDevice:'2026-08-14T07:20:00Z', tsEntered:'2026-08-14T07:20:00Z', tsAIS:null, isException:false, remarks:'', gpsLat:-29.8587, gpsLon:31.0218, source:'agent' },
      { id:'ae3', code:'CARGO_COMP', label:'Loading Completed Durban', tsDevice:'2026-08-16T08:00:00Z', tsEntered:'2026-08-16T08:00:00Z', tsAIS:null, isException:false, remarks:'76,000 MT coal. All documents clear. Currently at sea en route Kochi.', gpsLat:-29.8587, gpsLon:31.0218, source:'agent' },
    ],
    disputes:[],
    createdAt:'2026-08-10T08:00:00Z', updatedAt:'2026-08-16T12:00:00Z',
  },
];

// ══════════════════════════════════════════════════════════════════════════
// TIME CHARTER POSITION CALCULATOR
// ══════════════════════════════════════════════════════════════════════════
export function calculateTimeCharterPosition(voyage) {
  const cp  = voyage.charterparty || {};
  const s   = voyage.settlement   || {};
  const bl  = voyage.bunkerLedger || {};
  const ohe = voyage.offHireEvents || [];
  const pr  = voyage.performanceRegister || [];
  const hl  = voyage.hireLedger  || [];

  const hireRatePerDay    = cp.hireRatePerDay || 18500;
  const lateMultiplier    = cp.lateRedeliveryMultiplier || 1.25;
  const lateRatePerDay    = hireRatePerDay * lateMultiplier;

  const totalOffHireHrs   = ohe.reduce((a,e) => a + (e.allowedHrs || 0), 0);
  const totalOffHireCredit= ohe.reduce((a,e) => a + (e.hireDeductionUSD || e.creditUSD || 0), 0);
  const eventsAccepted    = ohe.filter(e => e.outcome === 'accepted').length;
  const eventsPartly      = ohe.filter(e => e.outcome === 'partly_accepted').length;
  const eventsRejected    = ohe.filter(e => e.outcome === 'rejected' || e.outcome === 'on_hire').length;

  const totalPerfClaimUSD = pr.reduce((a,p) => a + (p.claimUSD || 0), 0);
  const suspendedVoyages  = pr.filter(p => p.outcome && (p.outcome.toLowerCase().includes('excluded') || p.outcome.toLowerCase().includes('suspended') || p.outcome.toLowerCase().includes('hull'))).length;
  const claimedVoyages    = pr.filter(p => (p.claimUSD||0) > 0).length;

  const grossHire = hl.reduce((a,m) => a + (m.grossHireUSD || 0), 0);
  const netHire   = hl.reduce((a,m) => a + (m.netHireUSD   || 0), 0);

  const lateDays   = voyage.actualRedeliveryDate && voyage.scheduledRedeliveryDate
    ? Math.max(0, (new Date(voyage.actualRedeliveryDate) - new Date(voyage.scheduledRedeliveryDate)) / 86400000)
    : 0;
  const lateHireUSD = lateDays * lateRatePerDay;

  const netCharterValue = s.netCharterValueUSD || (
    (s.grossHireUSD || grossHire)
    + (s.offHireCreditUSD || -totalOffHireCredit)
    + (s.redeliveryBunkerCreditUSD || -(bl.netRedeliveryCreditUSD || 0))
    + (s.offSpecBunkerCounterclaimUSD || 0)
    + (s.hullCleaningUSD || 0)
    + (s.vlsfoShortfallUSD || 0)
    + (s.tankCleaningUSD || 0)
    + (s.latePaymentInterestUSD || 0)
    + (s.performanceClaimUSD || -totalPerfClaimUSD)
    + (s.heatingExtraMGO_USD || 0)
    + (s.vettingBerthCostUSD || 0)
  );
  const paidOnAccount  = s.paidOnAccountUSD || 0;
  const finalBalance   = s.finalBalanceUSD  || (netCharterValue + paidOnAccount);

  return {
    hireRatePerDay, lateRatePerDay, lateDays, lateHireUSD,
    grossHireUSD: s.grossHireUSD || grossHire,
    netHireUSD:   netHire,
    hireLedger:   hl,
    totalOffHireHrs, totalOffHireCredit: -(s.offHireCreditUSD ? Math.abs(s.offHireCreditUSD) : totalOffHireCredit),
    eventsAccepted, eventsPartly, eventsRejected,
    offHireEvents: ohe,
    totalPerfClaimUSD: Math.abs(s.performanceClaimUSD || totalPerfClaimUSD),
    suspendedVoyages, claimedVoyages,
    performanceRegister: pr,
    voyageSchedule: voyage.voyageSchedule || [],
    bunkerLedger: bl,
    netRedeliveryCreditUSD: bl.netRedeliveryCreditUSD || 0,
    offSpecBunkerCounterclaimUSD: s.offSpecBunkerCounterclaimUSD || 0,
    hullCleaningUSD:  s.hullCleaningUSD  || 0,
    vlsfoShortfallUSD:s.vlsfoShortfallUSD|| 0,
    tankCleaningUSD:  s.tankCleaningUSD  || 0,
    vettingBerthCostUSD: Math.abs(s.vettingBerthCostUSD || 0),
    netCharterValueUSD: netCharterValue,
    paidOnAccountUSD:  Math.abs(paidOnAccount),
    finalBalanceUSD:   finalBalance,
    settlementItems: [
      { label:'Gross Hire',              sign:'+', usd: Math.abs(s.grossHireUSD||grossHire) },
      { label:'Off-Hire Credit',         sign:'-', usd: Math.abs(s.offHireCreditUSD||totalOffHireCredit) },
      { label:'Performance Claim',       sign:'-', usd: Math.abs(s.performanceClaimUSD||totalPerfClaimUSD) },
      { label:'Redelivery Bunker Credit',sign:'-', usd: Math.abs(s.redeliveryBunkerCreditUSD||0) },
    ],
  };
}

export function calculateLaytime(voyage) {
  const cp = voyage.charterparty;

  if (cp.charterType && cp.charterType !== 'Voyage') return {
    consumed:0, allowed:1, balance:0,
    demurrage:0, despatch:0, exceptionHours:0, status:'not_applicable',
    steps:[], isProvisional:false, calculationMethod: cp.charterType,
    notApplicableReason: cp.charterType==='Time'
      ? 'Time charters are governed by hire and off-hire clauses, not laytime/demurrage.'
      : 'Bareboat charters demise the vessel to the charterer — laytime is not a term of this contract.',
  };

  const events = voyage.masterEvents || [];
  const norEvent = events.find(e => e.code === 'NOR_ACC' || e.code === 'NOR_TEND');
  const completionEvent = events.find(e => e.code === 'CARGO_COMP');

  if (!norEvent) return {
    consumed:0, allowed:cp.allowedLaytime, balance:cp.allowedLaytime,
    demurrage:0, despatch:0, exceptionHours:0, status:'nor_not_tendered',
    steps:[], isProvisional:true, calculationMethod: cp.laytimeType
  };

  const norTime = new Date(norEvent.tsEntered || norEvent.timestamp);
  const endTime = completionEvent ? new Date(completionEvent.tsEntered || completionEvent.timestamp) : SIMULATED_NOW;
  const totalHours = (endTime - norTime) / 3600000;

  let exceptionHours = 0;
  const steps = [];

  steps.push({
    step: 1, event: norEvent.label, timestamp: norEvent.tsEntered,
    interval: null, treatment: 'Laytime commences',
    clauseRef: `${cp.form} — NOR clause: ${cp.norClause}`,
    delta: 0, runningBalance: cp.allowedLaytime, isException: false
  });

  const exceptionEvents = events.filter(e => e.isException);
  exceptionEvents.forEach((exc) => {
    const excIdx = events.indexOf(exc);
    const nextEvent = events[excIdx + 1];
    if (!nextEvent) return;

    const excStart = new Date(exc.tsEntered || exc.timestamp);
    const excEnd = new Date(nextEvent.tsEntered || nextEvent.timestamp);
    const hrs = (excEnd - excStart) / 3600000;
    let treatment = 'Counts as laytime';
    let excluded = false;
    let clauseRef = '';

    if (cp.laytimeTerm === 'SHEX EIU' && exc.code === 'WX_HOLD') {
      treatment = 'EXCLUDED — SHEX EIU: weather excluded even if used';
      clauseRef = `${cp.form} — Laytime term: SHEX EIU`;
      excluded = true;
    } else if (cp.laytimeTerm === 'SHINC' && exc.code === 'ANCH_START') {
      const congRider = cp.riderClauses?.find(r => r.text?.toLowerCase().includes('congestion'));
      if (congRider && !congRider.conflictFlag) {
        treatment = 'EXCLUDED — Port Congestion Rider: waiting time excluded';
        clauseRef = `Rider: "${congRider.title}"`;
        excluded = true;
      } else if (congRider && congRider.conflictFlag) {
        treatment = 'DISPUTED — Port Congestion Rider vs. SHINC (open dispute)';
        clauseRef = `Rider: "${congRider.title}" — conflict flag raised`;
      } else {
        treatment = 'COUNTS — SHINC: all time including waiting';
        clauseRef = `${cp.form} — Laytime term: SHINC`;
      }
    } else if (exc.code === 'EQUIP_FAIL') {
      treatment = 'EXCLUDED — Shore equipment failure (terminal/charterer risk)';
      clauseRef = `${cp.form} — Equipment failure exception`;
      excluded = true;
    }

    if (excluded) exceptionHours += hrs;

    steps.push({
      step: steps.length + 1,
      event: `${exc.label} → ${nextEvent.label}`,
      timestamp: exc.tsEntered,
      interval: Math.round(hrs * 10) / 10,
      treatment, clauseRef,
      delta: excluded ? 0 : -hrs,
      excluded, isException: true
    });
  });

  const consumed = Math.max(0, totalHours - exceptionHours);
  const balance = cp.allowedLaytime - consumed;
  const demurrage = balance < 0 ? Math.abs(balance) / 24 * cp.demurrageRate : 0;
  const despatch = balance > 0 && completionEvent ? balance / 24 * cp.despatchRate : 0;

  if (completionEvent) {
    steps.push({
      step: steps.length + 1,
      event: completionEvent.label,
      timestamp: completionEvent.tsEntered,
      interval: null,
      treatment: balance < 0 ? `ON DEMURRAGE — ${Math.abs(balance).toFixed(1)}h excess` : `WITHIN LAYTIME — ${balance.toFixed(1)}h remaining`,
      clauseRef: `${cp.form} — Laytime ceases on completion of cargo operations`,
      delta: 0, isException: false, isFinal: true
    });
  }

  return {
    consumed: Math.round(consumed * 10) / 10,
    allowed: cp.allowedLaytime,
    exceptionHours: Math.round(exceptionHours * 10) / 10,
    balance: Math.round(balance * 10) / 10,
    demurrage: Math.round(demurrage),
    despatch: Math.round(despatch),
    status: balance < 0 ? 'on_demurrage' : 'within_laytime',
    steps,
    isProvisional: !completionEvent,
    calculationMethod: cp.laytimeType,
    demurrageRate: cp.demurrageRate,
    despatchRate: cp.despatchRate,
    claimsTimeBar: cp.claimsTimeBar,
  };
}

// ── SHIP PROGRESS COMPUTATION ──
export function calculateSyntheticVoyagePerformance(voyage) {
  const cp = voyage.charterparty || {};
  const warrantedSpeed = 12.5;
  const warrantedConsumption = 48.0;

  const windows = [
    { windowId: 'W1', durationHours: 14.0, bf: 3, SOG: 12.4, adverseCurrent: 0.15, valid: true },
    { windowId: 'W2', durationHours: 16.0, bf: 4, SOG: 12.0, adverseCurrent: 0.25, valid: true },
    { windowId: 'W3', durationHours: 13.5, bf: 3, SOG: 12.6, adverseCurrent: 0.10, valid: true },
    { windowId: 'W4', durationHours: 8.0,  bf: 3, SOG: 12.3, adverseCurrent: 0.05, valid: false, reason: 'Duration < 12.0h consecutive (Clause 1.3)' },
    { windowId: 'W5', durationHours: 15.0, bf: 5, SOG: 11.2, adverseCurrent: 0.30, valid: false, reason: 'Beaufort Force 5 > BF4 threshold (Clause 1.4)' }
  ];

  const validWindows = windows.filter(w => w.valid);
  const totalGoodWxHours = validWindows.reduce((s, w) => s + w.durationHours, 0);
  const totalSeaPassageHours = 180.0;
  const goodWxRatioPct = (totalGoodWxHours / totalSeaPassageHours) * 100;
  const isExtrapolationPermitted = goodWxRatioPct >= 20.0 && validWindows.length >= 3;

  const evaluatedWindows = validWindows.map(w => {
    const benchmarkSpeed = w.bf === 4 ? 12.2 : 12.5;
    const cappedCurrent = Math.min(0.2, w.adverseCurrent);
    const correctedSpeed = w.SOG + cappedCurrent;
    const speedShortfall = Math.max(0, benchmarkSpeed - correctedSpeed);
    return { ...w, benchmarkSpeed, cappedCurrent, correctedSpeed, speedShortfall };
  });

  const avgCorrectedSpeed = evaluatedWindows.reduce((s, w) => s + w.correctedSpeed * w.durationHours, 0) / totalGoodWxHours;
  const avgBenchmarkSpeed = evaluatedWindows.reduce((s, w) => s + w.benchmarkSpeed * w.durationHours, 0) / totalGoodWxHours;
  const netSpeedDeficiency = Math.max(0, avgBenchmarkSpeed - avgCorrectedSpeed);

  const totalDistanceNm = 2250.0;
  const expectedTimeHours = totalDistanceNm / avgBenchmarkSpeed;
  const actualTimeHours = totalDistanceNm / avgCorrectedSpeed;
  const timeLostHours = actualTimeHours - expectedTimeHours;

  const actualFuelMTDay = 49.5;
  const excessFuelMTDay = Math.max(0, actualFuelMTDay - warrantedConsumption);
  const totalExcessFuelMT = excessFuelMTDay * (totalSeaPassageHours / 24);

  const fuelPriceUSD = 620;
  const speedClaimUSD = (timeLostHours / 24) * (cp.demurrageRate || 70000);
  const fuelClaimUSD = totalExcessFuelMT * fuelPriceUSD;
  const totalClaimUSD = speedClaimUSD + fuelClaimUSD;

  return {
    warrantedSpeed, warrantedConsumption, totalGoodWxHours, totalSeaPassageHours,
    goodWxRatioPct: Math.round(goodWxRatioPct * 10) / 10,
    validWindowsCount: validWindows.length,
    isExtrapolationPermitted,
    extrapolationStatus: isExtrapolationPermitted ? 'VALID — Extrapolation Permitted (≥20% & ≥3 windows)' : 'INDICATIVE ONLY — Extrapolation Restricted (<20% or <3 windows)',
    avgCorrectedSpeed: Math.round(avgCorrectedSpeed * 100) / 100,
    avgBenchmarkSpeed: Math.round(avgBenchmarkSpeed * 100) / 100,
    netSpeedDeficiency: Math.round(netSpeedDeficiency * 100) / 100,
    timeLostHours: Math.round(timeLostHours * 10) / 10,
    actualFuelMTDay, excessFuelMTDay,
    totalExcessFuelMT: Math.round(totalExcessFuelMT * 10) / 10,
    speedClaimUSD: Math.round(speedClaimUSD),
    fuelClaimUSD: Math.round(fuelClaimUSD),
    totalClaimUSD: Math.round(totalClaimUSD),
    setOffProhibited: true, windows
  };
}

export function genWeather(seed) {
  const r = (min,max,s) => Math.round((min + ((s*9301+49297)%233280)/233280*(max-min))*10)/10;
  return {
    temp: r(18,38,seed), windSpeed: r(2,28,seed+1),
    windDir: ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'][Math.floor(((seed*17)%16))],
    beaufort: Math.min(12,Math.floor(r(0,8,seed+2))), waveHeight: r(0.2,4.5,seed+3),
    visibility: r(2,20,seed+4), pressure: r(1005,1025,seed+5), humidity: r(55,95,seed+6),
    condition: ['Clear','Partly Cloudy','Overcast','Light Rain','Heavy Rain','Thunderstorm','Fog','Haze'][Math.floor(((seed*13)%8))],
    condIcon: ['☀️','⛅','☁️','🌧️','⛈️','⛈️','🌫️','🌫️'][Math.floor(((seed*13)%8))],
    updatedAt: new Date(Date.now()-Math.floor(((seed*7)%900000))).toISOString(),
    source: ['StormGeo','DTN Maritime','OpenWeatherMap','ECMWF'][Math.floor(((seed*3)%4))],
    laytimeImpact: r(0,8,seed+2)>=6 ? 'WEATHER HOLD RISK — Bf'+Math.min(12,Math.floor(r(0,8,seed+2)))+' may trigger rider clause' : null,
  };
}

export const OCEAN_CURRENTS = [
  { name:'Strait of Malacca', region:'Singapore Approach', speed:1.8, dir:'NW', type:'Tidal', depth:'Surface', impact:'Moderate — assists NW-bound vessels', speedEffect:'favorable', color:'cyan', lat:1.26, lon:103.82, vessels:['MT Tegrity Apex','MV Tegrity Crest'] },
  { name:'Arabian Sea Monsoon Drift', region:'Basrah / Kochi Approach', speed:1.2, dir:'SW', type:'Seasonal', depth:'Surface', impact:'Seasonal — SW monsoon Jun-Sep', speedEffect:'neutral', color:'purple', lat:18.94, lon:72.84, vessels:['MT Tegrity Prime'] },
  { name:'North Atlantic Current', region:'Antwerp Approach', speed:0.9, dir:'NE', type:'Ocean', depth:'Surface', impact:'Low — minor headwind effect', speedEffect:'adverse', color:'blue', lat:51.92, lon:4.48, vessels:['MT Tegrity Prime'] },
  { name:'Gulf of Mexico Loop Current', region:'Corpus Christi Approach', speed:2.1, dir:'N', type:'Ocean', depth:'Surface', impact:'High — strong northward set, affects berthing', speedEffect:'adverse', color:'gold', lat:27.80, lon:-97.40, vessels:['MV Tegrity Pacific'] },
  { name:'Agulhas Current', region:'Durban Approach', speed:1.5, dir:'SW', type:'Ocean', depth:'Surface', impact:'Moderate — strong south-westerly along SA coast', speedEffect:'adverse', color:'orange', lat:-29.85, lon:31.02, vessels:['MV Tegrity Pacific','MV Tegrity Vigil'] },
  { name:'Indian Ocean Gyre', region:'Kochi / Colombo Approach', speed:0.8, dir:'E', type:'Seasonal', depth:'Surface', impact:'Low — variable seasonal drift', speedEffect:'neutral', color:'green', lat:9.93, lon:76.27, vessels:['MV Tegrity Meridian','MV Tegrity Vigil'] },
];

export function computeShipProgress(voyage, weatherSyncSeed=0) {
  const origin = voyage.originPort, dest = voyage.port;
  const totalNm = haversineNm(origin.lat, origin.lon, dest.lat, dest.lon);
  const departure = new Date(voyage.createdAt);
  const elapsedHours = Math.max(0, (SIMULATED_NOW - departure) / 3600000);
  const plannedSpeed = voyage.charterparty.warrantedSpeed || 13;

  if (totalNm < 5) {
    return { hasRoute: false, origin, dest, totalNm };
  }

  const vesselIdx = VESSELS.findIndex(ve => ve.imo === voyage.vessel.imo);
  const wx = genWeather(vesselIdx * 7 + 3 + weatherSyncSeed);
  const weatherLossKn = wx.beaufort >= 7 ? 1.8 : wx.beaufort >= 6 ? 1.0 : wx.beaufort >= 5 ? 0.4 : 0;
  const current = OCEAN_CURRENTS.find(c => c.vessels.includes(voyage.vessel.name));
  const currentEffectKn = current && current.speedEffect === 'adverse' ? -current.speed * 0.5
    : current && current.speedEffect === 'favorable' ? current.speed * 0.5 : 0;

  const actualSpeed = Math.max(2, plannedSpeed - weatherLossKn + currentEffectKn);
  const plannedNm = Math.min(totalNm, plannedSpeed * elapsedHours);
  const actualNm = Math.min(totalNm, actualSpeed * elapsedHours);
  const plannedPct = plannedNm / totalNm * 100;
  const actualPct = actualNm / totalNm * 100;

  const plannedETA = new Date(departure.getTime() + totalNm / plannedSpeed * 3600000);
  const projectedETA = actualNm >= totalNm ? new Date(departure.getTime() + totalNm / actualSpeed * 3600000)
    : new Date(SIMULATED_NOW.getTime() + (totalNm - actualNm) / actualSpeed * 3600000);
  const etaDeltaHours = (projectedETA - plannedETA) / 3600000;

  const scheduleColor = etaDeltaHours <= 2 ? 'green' : etaDeltaHours <= 8 ? 'gold' : 'red';
  const scheduleLabel = etaDeltaHours > 0.5 ? `${etaDeltaHours.toFixed(1)}h behind planned ETA`
    : etaDeltaHours < -0.5 ? `${Math.abs(etaDeltaHours).toFixed(1)}h ahead of planned ETA` : 'on schedule';

  const frac = actualNm / totalNm;
  const currentLat = origin.lat + (dest.lat - origin.lat) * frac;
  const currentLon = origin.lon + (dest.lon - origin.lon) * frac;

  const factors = [];
  if (weatherLossKn > 0) factors.push({ label: `${wx.condIcon} Weather — Bf${wx.beaufort} (${wx.condition})`, detail: `Approx. ${weatherLossKn.toFixed(1)}kn speed loss vs. warranted speed.` });
  if (currentEffectKn < 0) factors.push({ label: `🌊 ${current.name}`, detail: `${current.impact} — approx. ${Math.abs(currentEffectKn).toFixed(1)}kn against passage.` });
  if (currentEffectKn > 0) factors.push({ label: `🌊 ${current.name}`, detail: `${current.impact} — approx. +${currentEffectKn.toFixed(1)}kn assisting passage.` });

  return {
    hasRoute: true, origin, dest, totalNm, elapsedHours, plannedSpeed, actualSpeed,
    plannedNm, actualNm, plannedPct, actualPct, plannedETA, projectedETA, etaDeltaHours,
    scheduleColor, scheduleLabel, currentLat, currentLon, factors,
  };
}

export function conflictCount(v) { return (v.masterEvents||[]).filter(e=>e.conflict).length + (v.agentEvents||[]).filter(e=>e.conflict).length; }
export function openDisputeCount(v) { return (v.disputes||[]).filter(d=>d.status==='open').length; }

export function computeComplianceScore(v){
  const sofComplete = (v.masterEvents||[]).length >= 5;
  const sigComplete = Object.values(v.signingStatus||{}).filter(s=>s!=='pending').length;
  return Math.round(
    (sofComplete?25:0) +
    (v.charterparty.claimsTimeBar?20:0) +
    (sigComplete/4*20) +
    (conflictCount(v)===0?20:10) +
    (openDisputeCount(v)===0?15:5)
  );
}

// ── SYNTHETIC DISCHARGE LAYTIME CLAUSE ENGINE ──
export function calculateSyntheticDischargeLaytime(voyage) {
  const cp = voyage.charterparty || {};
  if (cp.charterType && cp.charterType !== 'Voyage') {
    return { status: 'not_applicable', reason: 'Non-Voyage Charter' };
  }
  const cargoQty = voyage.cargoQuantityMT || voyage.quantity || 110000;
  const dischargeRateMTDay = 44000;
  const unroundedAllowedHours = (cargoQty / dischargeRateMTDay) * 24;
  const allowedHours = Math.round(unroundedAllowedHours * 100) / 100;
  const demurrageRateDay = cp.demurrageRate || 45000;
  const despatchRateDay  = cp.despatchRate  || 22500;

  const events = voyage.masterEvents || [];
  const norTender = events.find(e => e.code === 'NOR_TEND' || e.code === 'NOR_ACC');
  const dischargeComp = events.find(e => e.code === 'CARGO_COMP');

  if (!norTender) return { status: 'nor_not_tendered', allowedHours, demurrageRateDay, despatchRateDay };

  const norMs = new Date(norTender.tsEntered).getTime();
  const endMs = dischargeComp ? new Date(dischargeComp.tsEntered).getTime() : SIMULATED_NOW.getTime();
  const usedHours = (endMs - norMs) / 3600000;
  const balance   = allowedHours - usedHours;
  const demurrage = balance < 0 ? Math.abs(balance) / 24 * demurrageRateDay : 0;
  const despatch  = balance > 0 && dischargeComp ? balance / 24 * despatchRateDay : 0;

  return {
    status: balance < 0 ? 'on_demurrage' : 'within_laytime',
    allowedHours: Math.round(allowedHours * 10) / 10,
    usedHours: Math.round(usedHours * 10) / 10,
    balance: Math.round(balance * 10) / 10,
    demurrage: Math.round(demurrage),
    despatch: Math.round(despatch),
    demurrageRateDay, despatchRateDay,
    isProvisional: !dischargeComp,
  };
}

export const REVIEW_ITEMS = [
  { id:'RI-001', voyageId:'TVQ-2026-001', vessel:'MT Tegrity Apex', sourceTable:'SOF_EVENT', fieldName:'counts_excused', extractedValue:'disputed', confidence:0.61, priority:'critical', financialImpact:28000, cpRule:'SHELLVOY6 Cl.12 — Port Congestion Rider vs. SHINC', conflictA:'Rider: port congestion excluded from laytime', conflictB:'SHINC: all time counts including congestion', status:'pending', slaDeadline:'2026-09-15T00:00:00Z', createdAt:'2026-08-10T09:00:00Z' },
  { id:'RI-002', voyageId:'TVQ-2026-003', vessel:'MV Tegrity Pacific', sourceTable:'LAYTIME_CALC', fieldName:'cargo_shortfall_mt', extractedValue:'1250', confidence:0.88, priority:'high', financialImpact:62500, cpRule:'GENCON 94 Cl.4 — Deadfreight on 1,250 MT shortfall', conflictA:'Master: equipment failure caused shortfall (excluded)', conflictB:'Charterer: deadfreight applicable regardless of cause', status:'pending', slaDeadline:'2026-09-20T00:00:00Z', createdAt:'2026-08-18T08:00:00Z' },
  { id:'RI-003', voyageId:'TVQ-2026-001', vessel:'MT Tegrity Apex', sourceTable:'SOF_EVENT', fieldName:'event_time_utc', extractedValue:'2026-08-10T06:35:00Z', confidence:0.72, priority:'low', financialImpact:580, cpRule:'Timestamp variance — Master vs Agent records (5-min)', conflictA:'Master: 06:30 UTC', conflictB:'Agent: 06:35 UTC', status:'pending', slaDeadline:'2026-09-25T00:00:00Z', createdAt:'2026-08-10T09:05:00Z' },
  { id:'RI-004', voyageId:'TVQ-2026-005', vessel:'MV Tegrity Vigil', sourceTable:'CHARTERPARTY', fieldName:'off_hire_equipment', extractedValue:'accepted', confidence:0.97, priority:'medium', financialImpact:15625, cpRule:'NYPE 93 Cl.15 — 12.5h off-hire for pump failure', conflictA:'Master: pump failure documented, off-hire valid', conflictB:'Owner: machinery maintained per class survey', status:'pending', slaDeadline:'2026-09-30T00:00:00Z', createdAt:'2026-08-20T09:30:00Z' },
];

export const ACTIVE_EXCEPTIONS = [
  { id:'AE-001', ruleId:'EX-001', voyageId:'TVQ-2026-001', vessel:'MT Tegrity Apex', triggered:'2026-08-10T06:00:00Z', description:'Port Congestion Rider vs SHINC dispute — laytime impact $28,000', status:'pending', acknowledgedBy:null, acknowledgedAt:null, escalatedAt:null, financialImpact:28000 },
  { id:'AE-002', ruleId:'EX-005', voyageId:'TVQ-2026-003', vessel:'MV Tegrity Pacific', triggered:'2026-08-18T09:00:00Z', description:'Deadfreight claim 1,250 MT — equipment failure defence submitted', status:'overdue', acknowledgedBy:null, acknowledgedAt:null, escalatedAt:'2026-08-18T15:00:00Z', financialImpact:62500 },
  { id:'AE-003', ruleId:'EX-002', voyageId:'TVQ-2026-001', vessel:'MT Tegrity Apex', triggered:'2026-08-11T08:00:00Z', description:'Laytime 87% consumed — demurrage risk imminent at Basrah', status:'acknowledged', acknowledgedBy:'admin', acknowledgedAt:'2026-08-11T09:00:00Z', escalatedAt:null, financialImpact:28000 },
];

export function dimensionMatches(dimKey, value, v){
  switch(dimKey){
    case 'organization': return v.vessel.owner === value;
    case 'fleet': return (FLEETS.find(f=>f.name===value)?.vessels||[]).includes(v.vessel.name);
    case 'voyage': return v.id === value;
    case 'region': return PORT_REGIONS[v.port.country] === value || PORT_REGIONS[v.originPort?.country] === value;
    case 'country': return v.port.country === value || v.originPort?.country === value;
    case 'departurePort': return v.originPort?.name === value;
    case 'arrivalPort': return v.port.name === value;
    case 'transitStatus': return v.status === value;
    default: return true;
  }
}

function execStatPct(v){ const sp=computeShipProgress(v); return sp.hasRoute?`${sp.actualPct.toFixed(0)}%`:'—'; }
function execStatDemurrage(v, fmtUSD){ const lt=calculateLaytime(v); if(lt.status==='not_applicable')return 'N/A'; return lt.demurrage>0?fmtUSD(lt.demurrage):lt.despatch>0?'+'+fmtUSD(lt.despatch):'—'; }
function execStatDisputes(v){ return `${openDisputeCount(v)} open`; }
function execStatCompliance(v){ return `${computeComplianceScore(v)}%`; }
function execStatSignatures(v){ const done=Object.values(v.signingStatus||{}).filter(s=>s==='signed'||s==='signed_under_protest').length; return `${done}/4`; }
function execStatExceptions(v, exceptions){ return `${exceptions.filter(e=>e.voyageId===v.id).length}`; }

export function buildKpis(voyages, demurrageLabel, fmtUSD){
  const laytimeVoyages = voyages.filter(v=>(v.charterparty.charterType||'Voyage')==='Voyage');
  const netDemurrage = laytimeVoyages.reduce((s,v)=>{ const lt=calculateLaytime(v); return s + (lt.demurrage||0) - (lt.despatch||0); }, 0);
  const openDisputes = voyages.reduce((s,v)=>s+openDisputeCount(v), 0);
  const disputeRisk = voyages.reduce((s,v)=>s+(v.disputes||[]).filter(d=>d.status==='open').reduce((a,d)=>a+(d.financialImpact||0),0), 0);
  const scores = voyages.map(v=>computeComplianceScore(v));
  const avgScore = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
  const pendingSig = voyages.filter(v=>Object.values(v.signingStatus||{}).some(s=>s!=='signed'&&s!=='signed_under_protest'));
  const voyageIds = new Set(voyages.map(v=>v.id));
  const exceptions = ACTIVE_EXCEPTIONS.filter(e=>e.status!=='resolved' && voyageIds.has(e.voyageId));

  return [
    { key:'active', icon:'🚢', label:'Active Voyages', value:String(voyages.filter(v=>v.status==='in_progress').length),
      badge:{tone:'good', text:`of ${voyages.length}`},
      list:{ title:'Active Voyages', voyages: voyages.filter(v=>v.status==='in_progress'), stat:v=>execStatPct(v) } },
    { key:'demurrage', icon:'💰', label: demurrageLabel, value: fmtUSD(netDemurrage),
      badge:{tone: netDemurrage>0?'bad':'good', text: netDemurrage>0?'net owed':'net favorable'},
      list:{ title: demurrageLabel, voyages: laytimeVoyages.filter(v=>{const lt=calculateLaytime(v); return (lt.demurrage||0)>0 || (lt.despatch||0)>0;}), stat:v=>execStatDemurrage(v, fmtUSD) } },
    { key:'disputes', icon:'⚖️', label:'Open Disputes', value:String(openDisputes),
      badge:{tone: openDisputes>0?'bad':'good', text: fmtUSD(disputeRisk)+' at risk'},
      list:{ title:'Open Disputes', voyages: voyages.filter(v=>openDisputeCount(v)>0), stat:v=>execStatDisputes(v) } },
    { key:'compliance', icon:'📊', label:'Avg Compliance Score', value: avgScore+'%',
      badge:{tone: avgScore>=80?'good':avgScore>=60?'warn':'bad', text: avgScore>=80?'good standing':avgScore>=60?'needs attention':'critical'},
      list:{ title:'Compliance by Voyage', voyages: voyages.slice().sort((a,b)=>computeComplianceScore(a)-computeComplianceScore(b)), stat:v=>execStatCompliance(v) } },
    { key:'signatures', icon:'✍️', label:'Pending Signatures', value:String(pendingSig.length),
      badge:{tone: pendingSig.length>0?'warn':'good', text: pendingSig.length>0?'action required':'all signed'},
      list:{ title:'Pending Signatures', voyages: pendingSig, stat:v=>execStatSignatures(v) } },
    { key:'exceptions', icon:'🚨', label:'Active Exceptions', value:String(exceptions.length),
      badge:{tone: exceptions.length>0?'bad':'good', text: exceptions.length>0?'needs review':'clear'},
      list:{ title:'Active Exceptions', voyages: voyages.filter(v=>exceptions.some(e=>e.voyageId===v.id)), stat:v=>execStatExceptions(v,exceptions) } },
  ];
}


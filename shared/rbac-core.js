/**
 * rbac-core.js — VoyageIQ Configurable RBAC Engine
 * Shared ES module (site/shared/). Loaded by marine-sof and voyageverse.
 *
 * Exports:
 *   DEFAULT_ROLES, DEFAULT_ROLE_USERS, DEFAULT_GRANTS, DEFAULT_ASSIGNMENTS
 *   evaluateTimeDimension(assignment, nowMs, timezone) → boolean
 *   evaluateGeoDimension(assignment, country) → boolean
 *   evaluateCidrDimension(assignment, ip) → boolean
 *   getEffectiveRoles(username, assignments, nowMs, country, ip) → string[]
 *   getEffectiveNav(roles, roles_def, grants, allPages) → string[]
 *   canDo(roles, grants, sectionKey, action) → boolean
 */

// ── DEFAULT ROLE REGISTRY ────────────────────────────────────────────────────
export const DEFAULT_ROLES = {
  superuser:      { label:'Super User',       description:'Full unrestricted access to all modules and actions.', color:'gold',   icon:'⚡', accessAll:true,  isSystem:true,  isActive:true },
  admin:          { label:'Administrator',    description:'Full unrestricted access to all modules, users, roles and actions.', color:'gold',   icon:'🔐', accessAll:true,  isSystem:true,  isActive:true },
  owner:          { label:'Vessel Owner',     description:'Ship owner/operator — fleet, performance and financials.', color:'blue',   icon:'🚢', accessAll:false, isSystem:true,  isActive:true },
  charterer:      { label:'Charterer',        description:'Voyage charterer — freight, laytime and charterparty.', color:'cyan',   icon:'📋', accessAll:false, isSystem:true,  isActive:true },
  shipper:        { label:'Shipper',          description:'Cargo shipper — loading docs and SOF.', color:'green',  icon:'📦', accessAll:false, isSystem:true,  isActive:true },
  receiver:       { label:'Receiver',         description:'Cargo receiver — discharge progress and ETA.', color:'purple', icon:'📬', accessAll:false, isSystem:true,  isActive:true },
  master:         { label:'Master',           description:'Vessel master — operational logs and navigation.', color:'cyan',   icon:'🧭', accessAll:false, isSystem:true,  isActive:true },
  port_authority: { label:'Port Authority',   description:'Port authority — port operations and compliance.', color:'gold',   icon:'⚓', accessAll:false, isSystem:true,  isActive:true },
  claims_handler: { label:'Claims Handler',   description:'Demurrage claims and dispute resolution.', color:'orange', icon:'⚖️', accessAll:false, isSystem:true,  isActive:true },
};

// ── DEFAULT USER → ROLE MAPPING ─────────────────────────────────────────────
export const DEFAULT_ROLE_USERS = {
  // Tegritec Shipping super-users and admin
  admin:'superuser', ravi:'superuser',
  superuser:'superuser', superuser1:'superuser', superuser2:'superuser',
  'ams@tegritytec.com':'admin', ITPLADMIN:'admin',
  priya:'admin',
  // Vessel staff
  'capt.omar':'master',
  // Commercial
  'chen.wei':'shipper',
  fatima:'receiver',
  lisa:'charterer',
  // Shore-side
  james:'owner',
  ahmed:'port_authority',
};

// ── ALL NAV PAGES ────────────────────────────────────────────────────────────
export const ALL_NAV_PAGES = [
  'dashboard','capture','noonreport','billoflading','voyageinstruction','riderclauses',
  'decklog','enginelog','shipinfo','enginecurve','pumpcurve','boilerparticulars',
  'portdocuments','portdecklog','portenginelog','portlog','pumpinglog','bunkerreport',
  'laytime','signing','disputes','analytics','voyages','charterparty','fleet',
  'settings','weather','satpos','currents','contracts','routing','charterhouse',
  'reviewqueue','progressmap','etaprediction','cpperformance','bunkeremissions',
  'speedclaims','cargorecon','settlement','oceanneptune','roicalc','autosof',
  'masterinstructions','sofupdates','compliancereport','exceptions',
  'secusers','secmatrix','secroles','secgrants','secassignments',
  'execbriefings','executiveview','integratedview','demurrageassessment',
  'tctraders','worldscale',
];

// ── DEFAULT ROLE → PAGE ACCESS ───────────────────────────────────────────────
export const DEFAULT_ROLE_PAGES = {
  superuser:      ALL_NAV_PAGES,
  admin:          ALL_NAV_PAGES,
  owner:          ['dashboard','laytime','signing','disputes','analytics','voyages','charterparty','fleet','shipinfo','enginecurve','pumpcurve','boilerparticulars','satpos','reviewqueue','cpperformance','bunkeremissions','speedclaims','cargorecon','settlement','roicalc','oceanneptune','worldscale','compliancereport','exceptions','settings'],
  charterer:      ['dashboard','laytime','signing','disputes','analytics','voyages','charterparty','cpperformance','settlement','roicalc','cargorecon','contracts','routing','worldscale','compliancereport','settings'],
  shipper:        ['dashboard','capture','billoflading','voyageinstruction','voyages','portdocuments','portdecklog','pumpinglog','bunkerreport','autosof','sofupdates','settings'],
  receiver:       ['dashboard','billoflading','noonreport','voyages','progressmap','etaprediction','portdocuments','portlog','settings'],
  master:         ['dashboard','laytime','capture','noonreport','billoflading','voyageinstruction','riderclauses','decklog','enginelog','shipinfo','enginecurve','pumpcurve','boilerparticulars','autosof','masterinstructions','sofupdates','weather','satpos','currents','settings'],
  port_authority: ['dashboard','portdocuments','portdecklog','portenginelog','portlog','pumpinglog','bunkerreport','reviewqueue','progressmap','etaprediction','charterhouse','weather','satpos','compliancereport','exceptions','settings'],
  claims_handler: ['dashboard','laytime','signing','disputes','analytics','voyages','settlement','cargorecon','compliancereport','exceptions','settings'],
};

// ── DIMENSION EVALUATION ─────────────────────────────────────────────────────

/**
 * Evaluate whether an assignment's time dimension allows access RIGHT NOW.
 * @param {object} a - assignment record
 * @param {number} nowMs - Date.now() in calling context
 * @returns {boolean}
 */
export function evaluateTimeDimension(a, nowMs = Date.now()) {
  const now = new Date(nowMs);

  // Date range check
  if (a.validFrom) {
    const from = new Date(a.validFrom + 'T00:00:00Z');
    if (now < from) return false;
  }
  if (a.validUntil) {
    const until = new Date(a.validUntil + 'T23:59:59Z');
    if (now > until) return false;
  }

  if (!a.dailyEnabled) return true;

  // Convert now to user's timezone for day/hour checks
  const tz = a.timezone || 'UTC';
  let localStr;
  try {
    localStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', weekday: 'short',
    }).format(now);
  } catch {
    localStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'UTC',
      hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', weekday: 'short',
    }).format(now);
  }

  // Parse weekday
  const weekdayMap = { Mon:'Mon',Tue:'Tue',Wed:'Wed',Thu:'Thu',Fri:'Fri',Sat:'Sat',Sun:'Sun' };
  const shortDay = localStr.slice(0, 3);
  if (a.daysOfWeek && a.daysOfWeek.length > 0) {
    if (!a.daysOfWeek.includes(weekdayMap[shortDay] || shortDay)) return false;
  }

  // Parse time HH:MM
  const timeMatch = localStr.match(/(\d{2}):(\d{2})/);
  if (timeMatch && a.dailyStart && a.dailyEnd) {
    const currentMins = parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2]);
    const [sh, sm] = a.dailyStart.split(':').map(Number);
    const [eh, em] = a.dailyEnd.split(':').map(Number);
    const startMins = sh * 60 + sm;
    const endMins   = eh * 60 + em;
    if (currentMins < startMins || currentMins > endMins) return false;
  }

  return true;
}

/**
 * Evaluate whether an assignment's geo dimension allows access from a given country.
 * @param {object} a - assignment record
 * @param {string} country - country name or ISO2 code
 * @returns {boolean}
 */
export function evaluateGeoDimension(a, country) {
  if (!a.geoEnabled || !a.allowedCountries || a.allowedCountries.length === 0) return true;
  if (!country) return false;
  const c = country.toLowerCase();
  return a.allowedCountries.some(ac => ac.toLowerCase() === c || ac.toLowerCase().slice(0,2) === c.slice(0,2));
}

// ── EFFECTIVE ROLE RESOLUTION ─────────────────────────────────────────────────

/**
 * Given all assignments for a user, return the list of currently active roles
 * after evaluating all dimension constraints.
 * @param {string} username
 * @param {object[]} assignments - all assignment records (any user)
 * @param {number} nowMs
 * @param {string} country - geo-resolved country of request IP
 * @param {object} roles_def - role definitions map
 * @returns {string[]} - list of active role IDs
 */
export function getEffectiveRoles(username, assignments, nowMs = Date.now(), country = '', roles_def = DEFAULT_ROLES) {
  const userAssignments = assignments.filter(a => a.username === username && a.isActive !== false);
  if (userAssignments.length === 0) {
    // Fall back to DEFAULT_ROLE_USERS
    const defaultRole = DEFAULT_ROLE_USERS[username];
    return defaultRole ? [defaultRole] : [];
  }

  const active = [];
  for (const a of userAssignments) {
    if (!evaluateTimeDimension(a, nowMs)) continue;
    if (a.geoEnabled && !evaluateGeoDimension(a, country)) continue;
    if (!active.includes(a.role)) active.push(a.role);
  }
  return active;
}

// ── NAV + PERMISSION EVALUATION ──────────────────────────────────────────────

/**
 * Build the set of nav page keys accessible to a user given their effective roles.
 * @param {string[]} roles - effective role IDs
 * @param {object} roles_def - role definitions
 * @param {object[]} grants - permission grants
 * @param {object} rolePagesOverride - optional per-role page lists
 * @returns {string[]}
 */
export function getEffectiveNav(roles, roles_def = DEFAULT_ROLES, grants = [], rolePagesOverride = DEFAULT_ROLE_PAGES) {
  if (!roles || roles.length === 0) return ['dashboard', 'settings'];

  // Admin/superuser shortcut
  if (roles.some(r => roles_def[r] && roles_def[r].accessAll)) return ALL_NAV_PAGES;

  const pages = new Set();
  for (const role of roles) {
    const rolePages = rolePagesOverride[role] || [];
    rolePages.forEach(p => pages.add(p));

    // Also apply grants (read permission = page visible)
    grants
      .filter(g => g.role === role && g.permissions && g.permissions.read)
      .forEach(g => { if (g.pageKey) pages.add(g.pageKey); });
  }
  // Always include dashboard and settings
  pages.add('dashboard');
  pages.add('settings');
  return [...pages];
}

/**
 * Check if a user with given roles can perform an action on a section.
 * @param {string[]} roles
 * @param {object[]} grants
 * @param {string} sectionKey
 * @param {string} action - 'read'|'create'|'update'|'delete'|'export'|'approve'
 * @param {object} roles_def
 * @returns {boolean}
 */
export function canDo(roles, grants, sectionKey, action = 'read', roles_def = DEFAULT_ROLES) {
  if (!roles || roles.length === 0) return false;
  if (roles.some(r => roles_def[r] && roles_def[r].accessAll)) return true;

  return grants.some(g =>
    roles.includes(g.role) &&
    (g.sectionKey === sectionKey || g.sectionKey === null) &&
    g.permissions &&
    g.permissions[action] === true
  );
}

// ── DEFAULT GRANTS BUILDER ────────────────────────────────────────────────────

/**
 * Build a default grants array from DEFAULT_ROLE_PAGES.
 * Each role gets read=true for sections containing allowed pages,
 * admin gets full CRUD.
 * @param {object[]} navStructure - [{key, items:[{key}]}]
 * @returns {object[]}
 */
export function buildDefaultGrants(navStructure) {
  const grants = [];
  Object.keys(DEFAULT_ROLES).forEach(role => {
    const allowedPages = new Set(DEFAULT_ROLE_PAGES[role] || []);
    const isFullAccess = DEFAULT_ROLES[role].accessAll;
    navStructure.forEach(section => {
      const hasAccess = isFullAccess || section.items.some(item => allowedPages.has(item.key));
      grants.push({
        id: `default-${role}-${section.key}`,
        role,
        moduleKey: 'marine-sof',
        sectionKey: section.key,
        subsectionKey: null,
        permissions: {
          create: isFullAccess,
          read: hasAccess,
          update: isFullAccess,
          delete: isFullAccess,
          export: hasAccess,
          approve: isFullAccess || role === 'claims_handler',
        },
        updatedAt: new Date().toISOString(),
        updatedBy: 'system',
      });
    });
  });
  return grants;
}

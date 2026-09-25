/* ═══════════════════════════════════════════════════════════════════════════
   TEGRITY PORT — Application Core & Data Sync Engine
   Replicated and Enhanced from TegrityVoyageIQ Section 'PORT'
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Shared Data Key for cross-module dataset synchronization with TegrityVoyageIQ
  const STORAGE_KEY = 'tegrity_voyageiq_port_dataset_v1';
  const ROLE_KEY = 'tegrity_port_active_role';

  // Master Reference Ports Data (connected to TegrityVoyageIQ dataset)
  const MASTER_PORTS = [
    { code: 'SIN', name: 'Singapore', country: 'Singapore', lat: 1.2655, lon: 103.8200, region: 'SE Asia', maxDraft: '22.0m', maxPumpingPressure: '12 bar', timezone: 'UTC+8' },
    { code: 'RTM', name: 'Rotterdam', country: 'Netherlands', lat: 51.9225, lon: 4.4792, region: 'Europe', maxDraft: '21.5m', maxPumpingPressure: '10 bar', timezone: 'UTC+1' },
    { code: 'HOU', name: 'Houston (Baytown)', country: 'USA', lat: 29.7604, lon: -95.3698, region: 'US Gulf', maxDraft: '13.7m', maxPumpingPressure: '9 bar', timezone: 'UTC-5' },
    { code: 'FUJ', name: 'Fujairah', country: 'UAE', lat: 25.2048, lon: 55.2708, region: 'Middle East', maxDraft: '20.0m', maxPumpingPressure: '10 bar', timezone: 'UTC+4' },
    { code: 'NBO', name: 'Ningbo-Zhoushan', country: 'China', lat: 29.8683, lon: 121.5440, region: 'Far East', maxDraft: '22.5m', maxPumpingPressure: '12 bar', timezone: 'UTC+8' },
    { code: 'RTN', name: 'Ras Tanura', country: 'Saudi Arabia', lat: 26.6439, lon: 50.1587, region: 'Middle East', maxDraft: '21.0m', maxPumpingPressure: '11 bar', timezone: 'UTC+3' }
  ];

  // Default Mock Data Initializer (if localStorage is empty)
  const INITIAL_DATA = {
    voyages: [
      {
        id: 'TVQ-2026-001',
        vessel: { name: 'MT Tegrity Alliance', imo: '9841234', dwt: 115000, type: 'Aframax Crude Tanker' },
        cargoType: 'Crude Oil',
        quantityMT: 95000,
        port: MASTER_PORTS[0],
        portCallType: 'Discharge',
        berth: 'Jurong Island Berth 7',
        status: 'in_progress',
        commenceDate: '2026-04-08T06:00:00Z',
        eta: '2026-04-08T06:00:00Z',
        norTendered: '2026-04-08T06:15:00Z',
        norAccepted: '2026-04-08T08:00:00Z'
      },
      {
        id: 'TVQ-2026-002',
        vessel: { name: 'MT Tegrity Ocean', imo: '9855678', dwt: 158000, type: 'Suezmax Tanker' },
        cargoType: 'Heavy Crude',
        quantityMT: 135000,
        port: MASTER_PORTS[1],
        portCallType: 'Discharge',
        berth: 'Europoort Terminal 3',
        status: 'completed',
        commenceDate: '2026-04-01T08:00:00Z',
        eta: '2026-04-01T08:00:00Z',
        norTendered: '2026-04-01T08:15:00Z',
        norAccepted: '2026-04-01T09:30:00Z'
      },
      {
        id: 'TVQ-2026-003',
        vessel: { name: 'MT Tegrity Star', imo: '9812999', dwt: 49999, type: 'MR Product Tanker' },
        cargoType: 'Gasoil / Diesel',
        quantityMT: 42000,
        port: MASTER_PORTS[2],
        portCallType: 'Loading',
        berth: 'Baytown Terminal Berth 2',
        status: 'in_progress',
        commenceDate: '2026-04-03T14:00:00Z',
        eta: '2026-04-03T14:00:00Z',
        norTendered: '2026-04-03T14:15:00Z',
        norAccepted: '2026-04-03T15:00:00Z'
      },
      {
        id: 'TVQ-2026-004',
        vessel: { name: 'MT Tegrity Venture', imo: '9890111', dwt: 110000, type: 'Aframax Product Tanker' },
        cargoType: 'Jet Fuel A-1',
        quantityMT: 85000,
        port: MASTER_PORTS[3],
        portCallType: 'Bunkering & Cargo',
        berth: 'Fujairah Offshore Anchorage 2',
        status: 'in_progress',
        commenceDate: '2026-04-09T10:00:00Z',
        eta: '2026-04-09T10:00:00Z',
        norTendered: '2026-04-09T10:30:00Z',
        norAccepted: '2026-04-09T11:00:00Z'
      }
    ],

    portDocuments: [
      { id: 'pd1', voyageId: 'TVQ-2026-001', type: 'Notice of Readiness (NOR)', icon: '📄', status: 'Received', fileName: 'NOR_SIN_08Apr.pdf', receivedDate: '2026-04-08', remarks: 'Tendered 0615 UTC, accepted 0800 UTC per WIBON.' },
      { id: 'pd2', voyageId: 'TVQ-2026-001', type: 'Port Clearance Certificate', icon: '📋', status: 'Pending', fileName: null, receivedDate: null, remarks: 'Awaiting issuance by MPA Singapore prior to departure.' },
      { id: 'pd3', voyageId: 'TVQ-2026-001', type: 'Free Pratique Certificate', icon: '🩺', status: 'Received', fileName: 'FreePratique_SIN_08Apr.pdf', receivedDate: '2026-04-08', remarks: 'Granted by Port Health Authority on arrival.' },
      { id: 'pd4', voyageId: 'TVQ-2026-001', type: 'Cargo Manifest', icon: '📦', status: 'Received', fileName: 'CargoManifest_SIN.pdf', receivedDate: '2026-04-08', remarks: '95,000 MT Crude Oil, matches B/L quantity.' },
      { id: 'pd5', voyageId: 'TVQ-2026-003', type: 'Notice of Readiness (NOR)', icon: '📄', status: 'Received', fileName: 'NOR_HOU_03Apr.pdf', receivedDate: '2026-04-03', remarks: 'Tendered on arrival at pilot station.' },
      { id: 'pd6', voyageId: 'TVQ-2026-003', type: 'Declaration of Inspection (DOI)', icon: '🛡️', status: 'Verified', fileName: 'DOI_Baytown_03Apr.pdf', receivedDate: '2026-04-03', remarks: 'Joint ship/shore safety checklist signed.' }
    ],

    portDeckLogEntries: [
      { id: 'pdl1', voyageId: 'TVQ-2026-001', entryTime: '2026-04-08T05:55:00Z', officerOfWatch: '2/O A. Fernandes', entryType: 'Navigation', description: 'Pilot station in sight, reduced to manoeuvring speed.', remarks: 'Clear visibility, sea state 2.', status: 'Verified' },
      { id: 'pdl2', voyageId: 'TVQ-2026-001', entryTime: '2026-04-08T06:00:00Z', officerOfWatch: '2/O A. Fernandes', entryType: 'Pilotage', description: 'Pilot boarded at pilot station.', remarks: 'Pilot Master exchange completed.', status: 'Verified' },
      { id: 'pdl3', voyageId: 'TVQ-2026-001', entryTime: '2026-04-08T10:30:00Z', officerOfWatch: 'C/O R. Singh', entryType: 'Mooring', description: 'All fast alongside Berth 7, Jurong Island.', remarks: '4 tugs assisting.', status: 'Verified' },
      { id: 'pdl4', voyageId: 'TVQ-2026-003', entryTime: '2026-04-03T15:30:00Z', officerOfWatch: '2/O M. Okafor', entryType: 'Cargo', description: 'US Coast Guard boarding party arrived alongside for customs inspection.', remarks: 'Routine security check.', status: 'Pending Review' }
    ],

    portEngineLogEntries: [
      { id: 'pel1', voyageId: 'TVQ-2026-001', entryTime: '2026-04-08T06:00:00Z', engineerOfWatch: '2/E T. Bautista', entryType: 'Main Engine', description: 'Main engine on standby, manoeuvring for pilot boarding.', remarks: 'RPM reduced to slow ahead.', status: 'Verified' },
      { id: 'pel2', voyageId: 'TVQ-2026-001', entryTime: '2026-04-08T10:35:00Z', engineerOfWatch: '2/E T. Bautista', entryType: 'Main Engine', description: 'Main engine finished with, changed over to auxiliary power.', remarks: 'Boiler 1 fired for steam.', status: 'Verified' },
      { id: 'pel3', voyageId: 'TVQ-2026-001', entryTime: '2026-04-08T12:30:00Z', engineerOfWatch: 'C/E J. Alvarez', entryType: 'Cargo Pumps', description: 'No.1–3 cargo pumps started for discharge, 3,200 m³/hr.', remarks: 'Manifold pressure 7.5 bar.', status: 'Verified' },
      { id: 'pel4', voyageId: 'TVQ-2026-003', entryTime: '2026-04-03T14:30:00Z', engineerOfWatch: '3/E S. Patel', entryType: 'Generator', description: 'No.2 generator running, auxiliary engine load 680 kW.', remarks: 'Normal parameters.', status: 'Pending Review' }
    ],

    portStoppages: [
      { id: 'ps1', voyageId: 'TVQ-2026-001', stopStart: '2026-04-09T02:00:00Z', stopEnd: '2026-04-09T06:00:00Z', reason: 'Weather hold — wind Beaufort 7, heavy rain & lightning', responsibleParty: 'Weather', countsAsLaytime: false, remarks: 'Weather Exception Rider applies — excluded above Bf6.' },
      { id: 'ps2', voyageId: 'TVQ-2026-003', stopStart: '2026-04-03T15:30:00Z', stopEnd: '2026-04-03T17:45:00Z', reason: 'USCG customs & security inspection', responsibleParty: 'Shore', countsAsLaytime: true, remarks: 'Counts as laytime per BPVOY4 Customs Inspection Rider.' },
      { id: 'ps3', voyageId: 'TVQ-2026-001', stopStart: '2026-04-08T14:00:00Z', stopEnd: '2026-04-08T14:45:00Z', reason: 'Shore tank changeover — terminal instruction', responsibleParty: 'Shore', countsAsLaytime: true, remarks: 'Standard terminal operation.' }
    ],

    pumpingLog: [
      { id: 'pl1', voyageId: 'TVQ-2026-001', timestamp: '2026-04-08T12:30:00Z', pumpsRunning: 'No.1, No.2, No.3', rateM3hr: 3200, cumulativeQtyM3: 0, tankNo: '1P/1S/2P', remarks: 'Discharge commenced, ramping up to full rate.' },
      { id: 'pl2', voyageId: 'TVQ-2026-001', timestamp: '2026-04-08T16:30:00Z', pumpsRunning: 'No.1, No.2, No.3, No.4', rateM3hr: 3480, cumulativeQtyM3: 14200, tankNo: 'All tanks', remarks: 'Full rate achieved, consistent with CP warranty 3,500 m³/hr.' },
      { id: 'pl3', voyageId: 'TVQ-2026-001', timestamp: '2026-04-09T06:15:00Z', pumpsRunning: 'No.1, No.2, No.3, No.4', rateM3hr: 3410, cumulativeQtyM3: 52600, tankNo: 'All tanks', remarks: 'Resumed after weather hold.' },
      { id: 'pl4', voyageId: 'TVQ-2026-003', timestamp: '2026-04-03T18:00:00Z', pumpsRunning: 'No.1, No.2', rateM3hr: 2900, cumulativeQtyM3: 18400, tankNo: '3P/3S', remarks: 'Reduced rate — shore line back pressure limitation.' }
    ],

    bunkerReports: [
      { id: 'br1', voyageId: 'TVQ-2026-001', reportType: 'Arrival', date: '2026-04-08', fuelType: 'VLSFO', quantityMT: 775, densityKgM3: 985.4, temperatureC: 45, surveyor: 'Saybolt Singapore', remarks: 'ROB on arrival, matches noon report.' },
      { id: 'br1b', voyageId: 'TVQ-2026-001', reportType: 'Arrival', date: '2026-04-08', fuelType: 'MGO', quantityMT: 142, densityKgM3: 860.1, temperatureC: 38, surveyor: 'Saybolt Singapore', remarks: 'ROB on arrival.' },
      { id: 'br2', voyageId: 'TVQ-2026-003', reportType: 'Departure', date: '2026-04-04', fuelType: 'MGO', quantityMT: 210, densityKgM3: 861.5, temperatureC: 36, surveyor: 'Intertek Houston', remarks: 'Topped up to 95% capacity.' }
    ]
  };

  // State Application Store
  let state = loadDataSet();
  let activeTab = 'overview';
  let activeRole = localStorage.getItem(ROLE_KEY) || 'master';
  let searchQuery = '';
  let voyageFilter = 'ALL';

  // Persistence Functions
  function loadDataSet() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored dataset, restoring initial state', e);
    }
    saveDataSet(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  function saveDataSet(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Notify other windows/tabs
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Failed to save dataset', e);
    }
  }

  function updateState(mutatorFn) {
    mutatorFn(state);
    saveDataSet(state);
    renderCurrentTab();
  }

  // Toast Notification System
  function showToast(message, type = 'emerald') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>⚡</span> <div>${message}</div>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Global Modal System
  function showModal(contentHtml) {
    let overlay = document.getElementById('modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'modal-overlay';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = `<div class="modal-box">${contentHtml}</div>`;
    overlay.classList.add('active');
  }

  function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // Tab View Switcher
  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll('.port-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.view-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `view-${tabId}`);
    });
    renderCurrentTab();
  }

  // Role Switcher
  function setRole(roleKey) {
    activeRole = roleKey;
    localStorage.setItem(ROLE_KEY, roleKey);
    document.querySelectorAll('.role-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.role === roleKey);
    });
    showToast(`Switched active perspective to: ${roleKey.replace('_', ' ').toUpperCase()}`, 'cyan');
    renderCurrentTab();
  }

  // Filter & Helper Utilities
  function getFilteredVoyages() {
    if (voyageFilter === 'ALL') return state.voyages;
    return state.voyages.filter(v => v.id === voyageFilter);
  }

  function filterBySearchAndVoyage(list, getSearchableTextFn) {
    let result = list;
    if (voyageFilter !== 'ALL') {
      result = result.filter(item => item.voyageId === voyageFilter);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => getSearchableTextFn(item).toLowerCase().includes(q));
    }
    return result;
  }

  function formatDateTime(dtStr) {
    if (!dtStr) return '—';
    try {
      return new Date(dtStr).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return dtStr;
    }
  }

  function getVoyageVesselName(voyageId) {
    const v = state.voyages.find(voy => voy.id === voyageId);
    return v ? `${v.vessel.name} (${v.id})` : voyageId;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDERERS FOR EACH OF THE 6 SECTIONS + DASHBOARD & DIRECTORY
  // ═══════════════════════════════════════════════════════════════════════════

  function renderCurrentTab() {
    const view = activeTab;
    const container = document.getElementById(`view-${view}`);
    if (!container) return;

    if (view === 'overview') renderOverview(container);
    else if (view === 'documents') renderDocuments(container);
    else if (view === 'decklog') renderDeckLog(container);
    else if (view === 'enginelog') renderEngineLog(container);
    else if (view === 'portlog') renderPortLog(container);
    else if (view === 'pumpinglog') renderPumpingLog(container);
    else if (view === 'bunkerreport') renderBunkerReport(container);
    else if (view === 'directory') renderDirectory(container);
  }

  // 1. Overview Dashboard
  function renderOverview(container) {
    const activeVoyages = state.voyages.filter(v => v.status === 'in_progress');
    const totalDocs = state.portDocuments.length;
    const totalDeck = state.portDeckLogEntries.length;
    const totalEngine = state.portEngineLogEntries.length;
    
    // Stoppage time calculation
    const durHrs = s => (new Date(s.stopEnd) - new Date(s.stopStart)) / 3600000;
    const totalStopHrs = state.portStoppages.reduce((sum, s) => sum + durHrs(s), 0);
    const countingStopHrs = state.portStoppages.filter(s => s.countsAsLaytime).reduce((sum, s) => sum + durHrs(s), 0);

    // Peak pumping rate
    const peakPumping = state.pumpingLog.length ? Math.max(...state.pumpingLog.map(p => p.rateM3hr || 0)) : 0;

    container.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">📊 TegrityPort Executive Operations Dashboard</div>
          <div class="section-sub">Real-Time Terminal Calls, Port Paperwork, Deck & Engine Logs, Laytime Stoppages, and Bunker ROB</div>
        </div>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn-primary btn-sm" onclick="window.TegrityPortApp.openAddPortDocument()">+ Add Document</button>
          <button class="btn btn-outline-cyan btn-sm" onclick="window.TegrityPortApp.openAddPortStoppage()">+ Add Stoppage</button>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-card cyan">
          <div class="stat-label">Active Port Calls</div>
          <div class="stat-value cyan">${activeVoyages.length}</div>
          <div class="stat-delta">Out of ${state.voyages.length} tracked voyages</div>
        </div>
        <div class="stat-card emerald">
          <div class="stat-label">Port Documents On File</div>
          <div class="stat-value emerald">${totalDocs}</div>
          <div class="stat-delta">${state.portDocuments.filter(d => d.status === 'Received' || d.status === 'Verified').length} Received / Verified</div>
        </div>
        <div class="stat-card gold">
          <div class="stat-label">Stoppages Logged</div>
          <div class="stat-value gold">${totalStopHrs.toFixed(1)} hrs</div>
          <div class="stat-delta">${countingStopHrs.toFixed(1)} hrs counting as laytime</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-label">Peak Pumping Rate</div>
          <div class="stat-value purple">${peakPumping.toLocaleString()} m³/hr</div>
          <div class="stat-delta">Tested against CP Warranty (3,500 m³/hr)</div>
        </div>
      </div>

      <div class="overview-grid">
        <div>
          <div style="font-weight:700;font-size:0.95rem;margin-bottom:0.8rem;color:var(--text-main);display:flex;align-items:center;justify-content:space-between">
            <span>⚓ Active Vessel Port Call Status</span>
            <span class="badge-tag badge-cyan">Live Berth Monitoring</span>
          </div>

          ${state.voyages.map(v => `
            <div class="port-call-card">
              <div class="port-call-header">
                <div class="vessel-name">
                  <span>🚢</span> ${v.vessel.name}
                  <span class="badge-tag badge-emerald">${v.portCallType}</span>
                </div>
                <div class="voyage-id">${v.id}</div>
              </div>
              <div style="font-size:0.78rem;color:var(--text-muted);display:flex;gap:1.5rem;margin-bottom:0.4rem">
                <div><strong>Port:</strong> ${v.port.name}, ${v.port.country}</div>
                <div><strong>Berth:</strong> ${v.berth}</div>
                <div><strong>Cargo:</strong> ${v.quantityMT.toLocaleString()} MT ${v.cargoType}</div>
              </div>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${v.status === 'completed' ? '100%' : '65%'}"></div>
              </div>
              <div style="font-size:0.72rem;color:var(--text-dim);display:flex;justify-content:space-between">
                <span>NOR Tendered: ${formatDateTime(v.norTendered)}</span>
                <span>NOR Accepted: ${formatDateTime(v.norAccepted)}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div>
          <div style="font-weight:700;font-size:0.95rem;margin-bottom:0.8rem;color:var(--text-main)">
            ⚡ Quick Activity Launcher
          </div>
          <div style="background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-md);padding:1rem;display:flex;flex-direction:column;gap:0.65rem">
            <button class="btn btn-secondary" style="justify-content:flex-start;width:100%" onclick="window.TegrityPortApp.openAddPortDocument()">
              <span>📁</span> Add Port Document (NOR, Clearance, Pratique)
            </button>
            <button class="btn btn-secondary" style="justify-content:flex-start;width:100%" onclick="window.TegrityPortApp.openAddPortDeckLog()">
              <span>📘</span> Log Deck Event (Pilot, Mooring, Tug, Gangway)
            </button>
            <button class="btn btn-secondary" style="justify-content:flex-start;width:100%" onclick="window.TegrityPortApp.openAddPortEngineLog()">
              <span>📗</span> Log Engine Event (Main Engine, Generators, Boilers)
            </button>
            <button class="btn btn-secondary" style="justify-content:flex-start;width:100%" onclick="window.TegrityPortApp.openAddPortStoppage()">
              <span>⏱️</span> Log Ship / Shore Stoppage (Laytime Impact)
            </button>
            <button class="btn btn-secondary" style="justify-content:flex-start;width:100%" onclick="window.TegrityPortApp.openAddPumpingLog()">
              <span>💧</span> Record Cargo Pumping Rate Entry
            </button>
            <button class="btn btn-secondary" style="justify-content:flex-start;width:100%" onclick="window.TegrityPortApp.openAddBunkerReport()">
              <span>⛽</span> Add Bunker ROB Survey Report
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Section: Port Documents
  function renderDocuments(container) {
    const list = filterBySearchAndVoyage(state.portDocuments, d => `${d.type} ${d.status} ${d.remarks} ${d.fileName || ''}`);

    container.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">📁 Port Documents Vault</div>
          <div class="section-sub">Port-call Paperwork — Notice of Readiness (NOR), Customs Clearance, Free Pratique, Cargo Manifest & BDN</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.TegrityPortApp.openAddPortDocument()">+ Add Port Document</button>
      </div>

      <div class="info-banner">
        <div class="info-banner-icon">📡</div>
        <div class="info-banner-text">
          Port documents uploaded or updated here automatically synchronize with TegrityVoyageIQ Clause-Aware Laytime Engine & Multi-Party Countersignature module.
        </div>
      </div>

      <div class="control-bar">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" class="search-input" placeholder="Search document type, filename or notes..." value="${searchQuery}" oninput="window.TegrityPortApp.setSearch(this.value)">
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Voyage / Vessel</th>
              <th>Document Type</th>
              <th>Status</th>
              <th>Received Date</th>
              <th>File Name</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${list.length === 0 ? `<tr><td colspan="7" style="text-align:center;color:var(--text-dim);padding:2rem">No port documents matching current filter</td></tr>` : ''}
            ${list.map(d => `
              <tr>
                <td>
                  <div style="font-weight:600;font-size:0.8rem">${getVoyageVesselName(d.voyageId)}</div>
                </td>
                <td>
                  <span style="display:inline-flex;align-items:center;gap:0.4rem;font-weight:600">
                    <span>${d.icon}</span> ${d.type}
                  </span>
                </td>
                <td>
                  <span class="badge-tag ${d.status === 'Received' || d.status === 'Verified' ? 'badge-emerald' : 'badge-amber'}">${d.status}</span>
                </td>
                <td class="mono">${d.receivedDate || '—'}</td>
                <td class="mono" style="color:var(--accent-cyan);font-size:0.75rem">${d.fileName || 'Pending Upload'}</td>
                <td style="color:var(--text-muted);font-size:0.75rem">${d.remarks}</td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="window.TegrityPortApp.toggleDocStatus('${d.id}')">Toggle Status</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // 3. Section: Deck Logbook
  function renderDeckLog(container) {
    const list = filterBySearchAndVoyage(state.portDeckLogEntries, l => `${l.officerOfWatch} ${l.entryType} ${l.description} ${l.remarks}`);

    container.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">📘 Deck Logbook</div>
          <div class="section-sub">Chronological Deck Log Entries — Pilotage, Mooring, Tug Assistance, Cargo Connection & Watch Handovers</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.TegrityPortApp.openAddPortDeckLog()">+ Add Logbook Entry</button>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Voyage</th>
              <th>Time (UTC)</th>
              <th>Officer of Watch</th>
              <th>Entry Type</th>
              <th>Description</th>
              <th>Remarks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${list.length === 0 ? `<tr><td colspan="7" style="text-align:center;color:var(--text-dim);padding:2rem">No deck log entries found</td></tr>` : ''}
            ${list.map(l => `
              <tr>
                <td><div style="font-weight:600">${getVoyageVesselName(l.voyageId)}</div></td>
                <td class="mono" style="font-size:0.75rem;color:var(--accent-cyan)">${formatDateTime(l.entryTime)}</td>
                <td style="font-weight:500">${l.officerOfWatch}</td>
                <td><span class="badge-tag badge-purple">${l.entryType}</span></td>
                <td>${l.description}</td>
                <td style="color:var(--text-muted);font-size:0.75rem">${l.remarks || '—'}</td>
                <td><span class="badge-tag ${l.status === 'Verified' ? 'badge-emerald' : 'badge-amber'}">${l.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // 4. Section: Engine Logbook
  function renderEngineLog(container) {
    const list = filterBySearchAndVoyage(state.portEngineLogEntries, l => `${l.engineerOfWatch} ${l.entryType} ${l.description} ${l.remarks}`);

    container.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">📗 Engine Logbook</div>
          <div class="section-sub">Chronological Engine Room Logbook Entries — Main Engine Standby, Auxiliary Generators, Cargo Pumps & Boilers</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.TegrityPortApp.openAddPortEngineLog()">+ Add Engine Log</button>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Voyage</th>
              <th>Time (UTC)</th>
              <th>Engineer of Watch</th>
              <th>Type</th>
              <th>Description</th>
              <th>Remarks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${list.length === 0 ? `<tr><td colspan="7" style="text-align:center;color:var(--text-dim);padding:2rem">No engine log entries found</td></tr>` : ''}
            ${list.map(l => `
              <tr>
                <td><div style="font-weight:600">${getVoyageVesselName(l.voyageId)}</div></td>
                <td class="mono" style="font-size:0.75rem;color:var(--accent-cyan)">${formatDateTime(l.entryTime)}</td>
                <td style="font-weight:500">${l.engineerOfWatch}</td>
                <td><span class="badge-tag badge-cyan">${l.entryType}</span></td>
                <td>${l.description}</td>
                <td style="color:var(--text-muted);font-size:0.75rem">${l.remarks || '—'}</td>
                <td><span class="badge-tag ${l.status === 'Verified' ? 'badge-emerald' : 'badge-amber'}">${l.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // 5. Section: Port Log (Stoppages & Laytime Impact)
  function renderPortLog(container) {
    const durHrs = s => (new Date(s.stopEnd) - new Date(s.stopStart)) / 3600000;
    const list = filterBySearchAndVoyage(state.portStoppages, s => `${s.reason} ${s.responsibleParty} ${s.remarks}`);

    const totalHrs = list.reduce((sum, x) => sum + durHrs(x), 0);
    const countingHrs = list.filter(x => x.countsAsLaytime).reduce((sum, x) => sum + durHrs(x), 0);
    const excludedHrs = totalHrs - countingHrs;

    container.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">⏱️ Port Log — Ship / Shore Cargo Stoppages</div>
          <div class="section-sub">Chronological Stoppage Ledger & Laytime Treatment — Direct Feed to TegrityVoyageIQ Laytime Calculation Engine</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.TegrityPortApp.openAddPortStoppage()">+ Add Stoppage</button>
      </div>

      <div class="stat-grid" style="margin-bottom:1.2rem">
        <div class="stat-card cyan">
          <div class="stat-label">Total Stoppages</div>
          <div class="stat-value cyan">${list.length}</div>
          <div class="stat-delta">Logged across port calls</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-label">Total Stoppage Hours</div>
          <div class="stat-value purple">${totalHrs.toFixed(1)} h</div>
        </div>
        <div class="stat-card gold">
          <div class="stat-label">Counting as Laytime</div>
          <div class="stat-value gold">${countingHrs.toFixed(1)} h</div>
        </div>
        <div class="stat-card emerald">
          <div class="stat-label">Excluded from Laytime</div>
          <div class="stat-value emerald">${excludedHrs.toFixed(1)} h</div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Voyage</th>
              <th>Stop Start</th>
              <th>Stop End</th>
              <th>Duration</th>
              <th>Stoppage Reason</th>
              <th>Responsible</th>
              <th>Laytime Impact</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${list.length === 0 ? `<tr><td colspan="8" style="text-align:center;color:var(--text-dim);padding:2rem">No stoppages logged</td></tr>` : ''}
            ${list.map(s => `
              <tr>
                <td><div style="font-weight:600">${getVoyageVesselName(s.voyageId)}</div></td>
                <td class="mono" style="font-size:0.75rem">${formatDateTime(s.stopStart)}</td>
                <td class="mono" style="font-size:0.75rem">${formatDateTime(s.stopEnd)}</td>
                <td class="mono" style="font-weight:700;color:var(--accent-purple)">${durHrs(s).toFixed(1)} h</td>
                <td style="font-weight:500">${s.reason}</td>
                <td><span class="badge-tag badge-cyan">${s.responsibleParty}</span></td>
                <td>
                  <span class="badge-tag ${s.countsAsLaytime ? 'badge-amber' : 'badge-emerald'}">
                    ${s.countsAsLaytime ? '⚡ Counting' : '🛡️ Excluded'}
                  </span>
                </td>
                <td style="color:var(--text-muted);font-size:0.75rem">${s.remarks || '—'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // 6. Section: Cargo Pumping Log
  function renderPumpingLog(container) {
    const list = filterBySearchAndVoyage(state.pumpingLog, p => `${p.pumpsRunning} ${p.tankNo} ${p.remarks}`);
    const peakRate = list.length ? Math.max(...list.map(l => l.rateM3hr || 0)) : 0;
    const avgRate = list.length ? Math.round(list.reduce((s, l) => s + (l.rateM3hr || 0), 0) / list.length) : 0;

    container.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">💧 Cargo Pumping Log & Rate Performance</div>
          <div class="section-sub">Real-Time Pumping Rates, Manifold Pressure & Tank Discharge Monitoring</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.TegrityPortApp.openAddPumpingLog()">+ Add Pumping Entry</button>
      </div>

      <div class="stat-grid" style="margin-bottom:1.2rem">
        <div class="stat-card cyan">
          <div class="stat-label">Readings Logged</div>
          <div class="stat-value cyan">${list.length}</div>
        </div>
        <div class="stat-card emerald">
          <div class="stat-label">Peak Pumping Rate</div>
          <div class="stat-value emerald">${peakRate.toLocaleString()} m³/hr</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-label">Average Pumping Rate</div>
          <div class="stat-value purple">${avgRate.toLocaleString()} m³/hr</div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Voyage</th>
              <th>Timestamp (UTC)</th>
              <th>Pumps Running</th>
              <th>Pumping Rate</th>
              <th>Cumulative Qty</th>
              <th>Tank(s)</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${list.length === 0 ? `<tr><td colspan="7" style="text-align:center;color:var(--text-dim);padding:2rem">No pumping log readings found</td></tr>` : ''}
            ${list.map(p => `
              <tr>
                <td><div style="font-weight:600">${getVoyageVesselName(p.voyageId)}</div></td>
                <td class="mono" style="font-size:0.75rem;color:var(--accent-cyan)">${formatDateTime(p.timestamp)}</td>
                <td style="font-weight:500">${p.pumpsRunning}</td>
                <td class="mono" style="font-weight:700;color:var(--accent-emerald)">${(p.rateM3hr || 0).toLocaleString()} m³/hr</td>
                <td class="mono">${(p.cumulativeQtyM3 || 0).toLocaleString()} m³</td>
                <td><span class="badge-tag badge-purple">${p.tankNo}</span></td>
                <td style="color:var(--text-muted);font-size:0.75rem">${p.remarks || '—'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // 7. Section: Bunker Report
  function renderBunkerReport(container) {
    const list = filterBySearchAndVoyage(state.bunkerReports, b => `${b.reportType} ${b.fuelType} ${b.surveyor} ${b.remarks}`);
    const totalMT = list.reduce((sum, r) => sum + (r.quantityMT || 0), 0);

    container.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">⛽ Bunker Report & ROB Survey</div>
          <div class="section-sub">Arrival & Departure Bunker Soundings, BDN Verification & Independent Fuel Survey Records</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.TegrityPortApp.openAddBunkerReport()">+ Add Bunker Report</button>
      </div>

      <div class="stat-grid" style="margin-bottom:1.2rem">
        <div class="stat-card cyan">
          <div class="stat-label">Reports Logged</div>
          <div class="stat-value cyan">${list.length}</div>
        </div>
        <div class="stat-card emerald">
          <div class="stat-label">Arrival Surveys</div>
          <div class="stat-value emerald">${list.filter(r => r.reportType === 'Arrival').length}</div>
        </div>
        <div class="stat-card gold">
          <div class="stat-label">Departure Surveys</div>
          <div class="stat-value gold">${list.filter(r => r.reportType === 'Departure').length}</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-label">Total Fuel Surveyed</div>
          <div class="stat-value purple">${totalMT.toFixed(1)} MT</div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Voyage</th>
              <th>Survey Type</th>
              <th>Date</th>
              <th>Fuel Grade</th>
              <th>Quantity (MT)</th>
              <th>Density (kg/m³)</th>
              <th>Temp (°C)</th>
              <th>Independent Surveyor</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${list.length === 0 ? `<tr><td colspan="9" style="text-align:center;color:var(--text-dim);padding:2rem">No bunker survey reports logged</td></tr>` : ''}
            ${list.map(r => `
              <tr>
                <td><div style="font-weight:600">${getVoyageVesselName(r.voyageId)}</div></td>
                <td><span class="badge-tag ${r.reportType === 'Arrival' ? 'badge-cyan' : 'badge-gold'}">${r.reportType}</span></td>
                <td class="mono" style="font-size:0.75rem">${r.date}</td>
                <td style="font-weight:700;color:var(--accent-cyan)">${r.fuelType}</td>
                <td class="mono" style="font-weight:700">${(r.quantityMT || 0).toLocaleString()} MT</td>
                <td class="mono">${r.densityKgM3 || '—'}</td>
                <td class="mono">${r.temperatureC ? r.temperatureC + '°C' : '—'}</td>
                <td>${r.surveyor || '—'}</td>
                <td style="color:var(--text-muted);font-size:0.75rem">${r.remarks || '—'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // 8. Section: Global Port Directory
  function renderDirectory(container) {
    container.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">⚓ Global Port & Terminal Master Directory</div>
          <div class="section-sub">Berth Limits, Maximum Draft Restrictions, Pumping Pressure Caps & Port Authority Details</div>
        </div>
      </div>

      <div class="stat-grid" style="margin-bottom:1.2rem">
        ${MASTER_PORTS.map(p => `
          <div class="stat-card cyan">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div style="font-weight:700;font-size:1.1rem;color:#ffffff">${p.name}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.4rem">${p.country} (${p.code})</div>
              </div>
              <span class="badge-tag badge-emerald">${p.region}</span>
            </div>
            <div style="font-size:0.75rem;color:var(--text-main);display:flex;flex-direction:column;gap:0.25rem;margin-top:0.4rem">
              <div><strong>Max Draft:</strong> ${p.maxDraft}</div>
              <div><strong>Max Pumping Pressure:</strong> ${p.maxPumpingPressure}</div>
              <div><strong>Timezone:</strong> ${p.timezone}</div>
              <div><strong>GPS Coordinates:</strong> ${p.lat}° N, ${p.lon}° E</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MODAL HANDLERS FOR ADDING NEW RECORDS
  // ═══════════════════════════════════════════════════════════════════════════

  function openAddPortDocument() {
    const voyagesOptions = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    showModal(`
      <div class="modal-header">
        <div class="modal-title">📁 Add Port Document</div>
        <button class="modal-close" onclick="window.TegrityPortApp.closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Target Voyage / Vessel</label>
          <select id="doc-voyage" class="form-select-full">${voyagesOptions}</select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Document Type</label>
            <input id="doc-type" class="form-input" placeholder="e.g. Notice of Readiness (NOR)">
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select id="doc-status" class="form-select-full">
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Received Date</label>
            <input id="doc-date" type="date" class="form-input" value="${new Date().toISOString().slice(0, 10)}">
          </div>
          <div class="form-group">
            <label class="form-label">File Name</label>
            <input id="doc-filename" class="form-input" placeholder="e.g. NOR_SIN_08Apr.pdf">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Remarks / Notes</label>
          <textarea id="doc-remarks" class="form-textarea" rows="2" placeholder="Tendered on arrival at pilot station..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.TegrityPortApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.TegrityPortApp.submitPortDocument()">Save Document</button>
      </div>
    `);
  }

  function submitPortDocument() {
    const voyageId = document.getElementById('doc-voyage').value;
    const type = document.getElementById('doc-type').value || 'Notice of Readiness (NOR)';
    const status = document.getElementById('doc-status').value;
    const receivedDate = document.getElementById('doc-date').value;
    const fileName = document.getElementById('doc-filename').value || `${type.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    const remarks = document.getElementById('doc-remarks').value;

    const newDoc = {
      id: 'pd_' + Date.now(),
      voyageId,
      type,
      icon: '📄',
      status,
      fileName,
      receivedDate,
      remarks
    };

    updateState(s => {
      s.portDocuments.unshift(newDoc);
    });

    closeModal();
    showToast('Port document logged and synchronized with TegrityVoyageIQ dataset', 'emerald');
  }

  function openAddPortDeckLog() {
    const voyagesOptions = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    showModal(`
      <div class="modal-header">
        <div class="modal-title">📘 Log Deck Event</div>
        <button class="modal-close" onclick="window.TegrityPortApp.closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Voyage / Vessel</label>
          <select id="deck-voyage" class="form-select-full">${voyagesOptions}</select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Timestamp (UTC)</label>
            <input id="deck-time" type="datetime-local" class="form-input" value="${new Date().toISOString().slice(0, 16)}">
          </div>
          <div class="form-group">
            <label class="form-label">Officer of Watch</label>
            <input id="deck-oow" class="form-input" placeholder="e.g. 2/O A. Fernandes">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Entry Type</label>
            <select id="deck-type" class="form-select-full">
              <option value="Pilotage">Pilotage</option>
              <option value="Mooring">Mooring</option>
              <option value="Navigation">Navigation</option>
              <option value="Cargo">Cargo</option>
              <option value="Gangway">Gangway</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select id="deck-status" class="form-select-full">
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Event Description</label>
          <input id="deck-desc" class="form-input" placeholder="e.g. All fast alongside berth 7">
        </div>
        <div class="form-group">
          <label class="form-label">Remarks</label>
          <textarea id="deck-remarks" class="form-textarea" rows="2" placeholder="Tug assistance..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.TegrityPortApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.TegrityPortApp.submitPortDeckLog()">Save Entry</button>
      </div>
    `);
  }

  function submitPortDeckLog() {
    const voyageId = document.getElementById('deck-voyage').value;
    const entryTime = document.getElementById('deck-time').value;
    const officerOfWatch = document.getElementById('deck-oow').value || 'OOW';
    const entryType = document.getElementById('deck-type').value;
    const description = document.getElementById('deck-desc').value || 'Deck operation logged';
    const status = document.getElementById('deck-status').value;
    const remarks = document.getElementById('deck-remarks').value;

    const newEntry = {
      id: 'pdl_' + Date.now(),
      voyageId,
      entryTime,
      officerOfWatch,
      entryType,
      description,
      remarks,
      status
    };

    updateState(s => {
      s.portDeckLogEntries.unshift(newEntry);
    });

    closeModal();
    showToast('Deck logbook entry logged', 'emerald');
  }

  function openAddPortEngineLog() {
    const voyagesOptions = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    showModal(`
      <div class="modal-header">
        <div class="modal-title">📗 Log Engine Event</div>
        <button class="modal-close" onclick="window.TegrityPortApp.closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Voyage / Vessel</label>
          <select id="eng-voyage" class="form-select-full">${voyagesOptions}</select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Timestamp (UTC)</label>
            <input id="eng-time" type="datetime-local" class="form-input" value="${new Date().toISOString().slice(0, 16)}">
          </div>
          <div class="form-group">
            <label class="form-label">Engineer of Watch</label>
            <input id="eng-eow" class="form-input" placeholder="e.g. 2/E T. Bautista">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Entry Type</label>
            <select id="eng-type" class="form-select-full">
              <option value="Main Engine">Main Engine</option>
              <option value="Cargo Pumps">Cargo Pumps</option>
              <option value="Generator">Generator</option>
              <option value="Boiler">Boiler</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select id="eng-status" class="form-select-full">
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Event Description</label>
          <input id="eng-desc" class="form-input" placeholder="e.g. Cargo pumps 1-3 started for discharge">
        </div>
        <div class="form-group">
          <label class="form-label">Remarks</label>
          <textarea id="eng-remarks" class="form-textarea" rows="2" placeholder="Pumping manifold pressure 7.5 bar..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.TegrityPortApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.TegrityPortApp.submitPortEngineLog()">Save Engine Log</button>
      </div>
    `);
  }

  function submitPortEngineLog() {
    const voyageId = document.getElementById('eng-voyage').value;
    const entryTime = document.getElementById('eng-time').value;
    const engineerOfWatch = document.getElementById('eng-eow').value || 'EOOW';
    const entryType = document.getElementById('eng-type').value;
    const description = document.getElementById('eng-desc').value || 'Engine operation logged';
    const status = document.getElementById('eng-status').value;
    const remarks = document.getElementById('eng-remarks').value;

    const newEntry = {
      id: 'pel_' + Date.now(),
      voyageId,
      entryTime,
      engineerOfWatch,
      entryType,
      description,
      remarks,
      status
    };

    updateState(s => {
      s.portEngineLogEntries.unshift(newEntry);
    });

    closeModal();
    showToast('Engine logbook entry logged', 'emerald');
  }

  function openAddPortStoppage() {
    const voyagesOptions = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    showModal(`
      <div class="modal-header">
        <div class="modal-title">⏱️ Add Port Log Stoppage</div>
        <button class="modal-close" onclick="window.TegrityPortApp.closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Voyage / Vessel</label>
          <select id="stop-voyage" class="form-select-full">${voyagesOptions}</select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Stop Start (UTC)</label>
            <input id="stop-start" type="datetime-local" class="form-input" value="${new Date(Date.now() - 3600000).toISOString().slice(0, 16)}">
          </div>
          <div class="form-group">
            <label class="form-label">Stop End (UTC)</label>
            <input id="stop-end" type="datetime-local" class="form-input" value="${new Date().toISOString().slice(0, 16)}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Responsible Party</label>
            <select id="stop-resp" class="form-select-full">
              <option value="Shore">Shore / Terminal</option>
              <option value="Ship">Ship / Vessel</option>
              <option value="Weather">Weather / Force Majeure</option>
              <option value="Charterer">Charterer</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Laytime Treatment</label>
            <select id="stop-laytime" class="form-select-full">
              <option value="counting">Counts as Laytime</option>
              <option value="excluded">Excluded from Laytime</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Stoppage Reason</label>
          <input id="stop-reason" class="form-input" placeholder="e.g. Shore hose changeover / Rain delay">
        </div>
        <div class="form-group">
          <label class="form-label">Remarks</label>
          <textarea id="stop-remarks" class="form-textarea" rows="2" placeholder="Rider clause reference..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.TegrityPortApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.TegrityPortApp.submitPortStoppage()">Save Stoppage</button>
      </div>
    `);
  }

  function submitPortStoppage() {
    const voyageId = document.getElementById('stop-voyage').value;
    const stopStart = document.getElementById('stop-start').value;
    const stopEnd = document.getElementById('stop-end').value;
    const responsibleParty = document.getElementById('stop-resp').value;
    const countsAsLaytime = document.getElementById('stop-laytime').value === 'counting';
    const reason = document.getElementById('stop-reason').value || 'Stoppage logged';
    const remarks = document.getElementById('stop-remarks').value;

    const newStop = {
      id: 'ps_' + Date.now(),
      voyageId,
      stopStart,
      stopEnd,
      reason,
      responsibleParty,
      countsAsLaytime,
      remarks
    };

    updateState(s => {
      s.portStoppages.unshift(newStop);
    });

    closeModal();
    showToast('Port stoppage saved & synchronized with Laytime Engine', 'emerald');
  }

  function openAddPumpingLog() {
    const voyagesOptions = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    showModal(`
      <div class="modal-header">
        <div class="modal-title">💧 Add Cargo Pumping Rate Entry</div>
        <button class="modal-close" onclick="window.TegrityPortApp.closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Voyage / Vessel</label>
          <select id="pump-voyage" class="form-select-full">${voyagesOptions}</select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Timestamp (UTC)</label>
            <input id="pump-time" type="datetime-local" class="form-input" value="${new Date().toISOString().slice(0, 16)}">
          </div>
          <div class="form-group">
            <label class="form-label">Pumps Running</label>
            <input id="pump-pumps" class="form-input" placeholder="e.g. No.1, No.2, No.3">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Pumping Rate (m³/hr)</label>
            <input id="pump-rate" type="number" class="form-input" placeholder="e.g. 3500">
          </div>
          <div class="form-group">
            <label class="form-label">Cumulative Quantity (m³)</label>
            <input id="pump-cum" type="number" class="form-input" placeholder="e.g. 45000">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Tanks Being Discharged / Loaded</label>
          <input id="pump-tanks" class="form-input" placeholder="e.g. 1P/1S/2P">
        </div>
        <div class="form-group">
          <label class="form-label">Remarks</label>
          <textarea id="pump-remarks" class="form-textarea" rows="2" placeholder="Full rate achieved..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.TegrityPortApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.TegrityPortApp.submitPumpingLog()">Save Pumping Reading</button>
      </div>
    `);
  }

  function submitPumpingLog() {
    const voyageId = document.getElementById('pump-voyage').value;
    const timestamp = document.getElementById('pump-time').value;
    const pumpsRunning = document.getElementById('pump-pumps').value || 'Pumps 1-3';
    const rateM3hr = parseFloat(document.getElementById('pump-rate').value) || 3200;
    const cumulativeQtyM3 = parseFloat(document.getElementById('pump-cum').value) || 0;
    const tankNo = document.getElementById('pump-tanks').value || 'All Tanks';
    const remarks = document.getElementById('pump-remarks').value;

    const newReading = {
      id: 'pl_' + Date.now(),
      voyageId,
      timestamp,
      pumpsRunning,
      rateM3hr,
      cumulativeQtyM3,
      tankNo,
      remarks
    };

    updateState(s => {
      s.pumpingLog.unshift(newReading);
    });

    closeModal();
    showToast('Pumping rate entry logged', 'emerald');
  }

  function openAddBunkerReport() {
    const voyagesOptions = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    showModal(`
      <div class="modal-header">
        <div class="modal-title">⛽ Add Bunker ROB Survey Report</div>
        <button class="modal-close" onclick="window.TegrityPortApp.closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Voyage / Vessel</label>
          <select id="br-voyage" class="form-select-full">${voyagesOptions}</select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Report Type</label>
            <select id="br-type" class="form-select-full">
              <option value="Arrival">Arrival ROB Survey</option>
              <option value="Departure">Departure ROB Survey</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Date</label>
            <input id="br-date" type="date" class="form-input" value="${new Date().toISOString().slice(0, 10)}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Fuel Grade</label>
            <select id="br-fuel" class="form-select-full">
              <option value="VLSFO">VLSFO (0.5% S)</option>
              <option value="HSFO">HSFO (3.5% S)</option>
              <option value="MGO">MGO / DMA</option>
              <option value="ULSFO">ULSFO (0.1% S)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Quantity (MT)</label>
            <input id="br-qty" type="number" class="form-input" placeholder="e.g. 750">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Density (kg/m³)</label>
            <input id="br-density" type="number" step="0.1" class="form-input" placeholder="e.g. 985.4">
          </div>
          <div class="form-group">
            <label class="form-label">Temperature (°C)</label>
            <input id="br-temp" type="number" class="form-input" placeholder="e.g. 45">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Independent Surveyor</label>
          <input id="br-surveyor" class="form-input" placeholder="e.g. Saybolt / Intertek / SGS">
        </div>
        <div class="form-group">
          <label class="form-label">Remarks</label>
          <textarea id="br-remarks" class="form-textarea" rows="2" placeholder="BDN verified..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.TegrityPortApp.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.TegrityPortApp.submitBunkerReport()">Save Bunker Report</button>
      </div>
    `);
  }

  function submitBunkerReport() {
    const voyageId = document.getElementById('br-voyage').value;
    const reportType = document.getElementById('br-type').value;
    const date = document.getElementById('br-date').value;
    const fuelType = document.getElementById('br-fuel').value;
    const quantityMT = parseFloat(document.getElementById('br-qty').value) || 0;
    const densityKgM3 = parseFloat(document.getElementById('br-density').value) || 985.0;
    const temperatureC = parseFloat(document.getElementById('br-temp').value) || 40;
    const surveyor = document.getElementById('br-surveyor').value || 'Independent Surveyor';
    const remarks = document.getElementById('br-remarks').value;

    const newReport = {
      id: 'br_' + Date.now(),
      voyageId,
      reportType,
      date,
      fuelType,
      quantityMT,
      densityKgM3,
      temperatureC,
      surveyor,
      remarks
    };

    updateState(s => {
      s.bunkerReports.unshift(newReport);
    });

    closeModal();
    showToast('Bunker ROB survey report saved', 'emerald');
  }

  function toggleDocStatus(docId) {
    updateState(s => {
      const doc = s.portDocuments.find(d => d.id === docId);
      if (doc) {
        doc.status = doc.status === 'Received' ? 'Verified' : 'Received';
      }
    });
    showToast('Port document status updated', 'cyan');
  }

  function setSearch(query) {
    searchQuery = query;
    renderCurrentTab();
  }

  function setVoyageFilter(val) {
    voyageFilter = val;
    renderCurrentTab();
  }

  // Window Storage Sync Event Listener
  window.addEventListener('storage', function (e) {
    if (!e || e.key === STORAGE_KEY) {
      state = loadDataSet();
      renderCurrentTab();
    }
  });

  // Export Global Public API
  window.TegrityPortApp = {
    init: function () {
      // Set active role
      document.querySelectorAll('.role-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.role === activeRole);
      });

      // Populate voyage filter dropdown
      const sel = document.getElementById('voyage-filter-select');
      if (sel) {
        sel.innerHTML = `<option value="ALL">All Voyages & Vessels</option>` +
          state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
      }

      renderCurrentTab();
    },

    switchTab,
    setRole,
    setSearch,
    setVoyageFilter,
    closeModal,
    toggleDocStatus,

    // Modal launchers
    openAddPortDocument,
    submitPortDocument,
    openAddPortDeckLog,
    submitPortDeckLog,
    openAddPortEngineLog,
    submitPortEngineLog,
    openAddPortStoppage,
    submitPortStoppage,
    openAddPumpingLog,
    submitPumpingLog,
    openAddBunkerReport,
    submitBunkerReport
  };

  // Auto-initialize when DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    window.TegrityPortApp.init();
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   TEGRITY PORT AUTHORITY (TPA) — Application & Ambient Engine
   Formatted in Tegrity Intelligence Engine Console Aesthetic
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const STORAGE_KEY = 'tegrity_voyageiq_port_dataset_v1';
  const ROLE_KEY = 'tegrity_port_active_role';
  const THEME_KEY = 'tegrity_port_env_theme';

  const MASTER_PORTS = [
    { code: 'SIN', name: 'Singapore', country: 'Singapore', lat: 1.2655, lon: 103.8200, region: 'SE Asia', maxDraft: '22.0m', maxPumpingPressure: '12 bar', timezone: 'UTC+8' },
    { code: 'RTM', name: 'Rotterdam', country: 'Netherlands', lat: 51.9225, lon: 4.4792, region: 'Europe', maxDraft: '21.5m', maxPumpingPressure: '10 bar', timezone: 'UTC+1' },
    { code: 'HOU', name: 'Houston (Baytown)', country: 'USA', lat: 29.7604, lon: -95.3698, region: 'US Gulf', maxDraft: '13.7m', maxPumpingPressure: '9 bar', timezone: 'UTC-5' },
    { code: 'FUJ', name: 'Fujairah', country: 'UAE', lat: 25.2048, lon: 55.2708, region: 'Middle East', maxDraft: '20.0m', maxPumpingPressure: '10 bar', timezone: 'UTC+4' },
    { code: 'NBO', name: 'Ningbo-Zhoushan', country: 'China', lat: 29.8683, lon: 121.5440, region: 'Far East', maxDraft: '22.5m', maxPumpingPressure: '12 bar', timezone: 'UTC+8' },
    { code: 'RTN', name: 'Ras Tanura', country: 'Saudi Arabia', lat: 26.6439, lon: 50.1587, region: 'Middle East', maxDraft: '21.0m', maxPumpingPressure: '11 bar', timezone: 'UTC+3' }
  ];

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
      { id: 'pl3', voyageId: 'TVQ-2026-001', timestamp: '2026-04-09T06:15:00Z', timestamp_end: '2026-04-09T18:00:00Z', pumpsRunning: 'No.1, No.2, No.3, No.4', rateM3hr: 3410, cumulativeQtyM3: 52600, tankNo: 'All tanks', remarks: 'Resumed after weather hold.' },
      { id: 'pl4', voyageId: 'TVQ-2026-003', timestamp: '2026-04-03T18:00:00Z', pumpsRunning: 'No.1, No.2', rateM3hr: 2900, cumulativeQtyM3: 18400, tankNo: '3P/3S', remarks: 'Reduced rate — shore line back pressure limitation.' }
    ],

    bunkerReports: [
      { id: 'br1', voyageId: 'TVQ-2026-001', reportType: 'Arrival', date: '2026-04-08', fuelType: 'VLSFO', quantityMT: 775, densityKgM3: 985.4, temperatureC: 45, surveyor: 'Saybolt Singapore', remarks: 'ROB on arrival, matches noon report.' },
      { id: 'br1b', voyageId: 'TVQ-2026-001', reportType: 'Arrival', date: '2026-04-08', fuelType: 'MGO', quantityMT: 142, densityKgM3: 860.1, temperatureC: 38, surveyor: 'Saybolt Singapore', remarks: 'ROB on arrival.' },
      { id: 'br2', voyageId: 'TVQ-2026-003', reportType: 'Departure', date: '2026-04-04', fuelType: 'MGO', quantityMT: 210, densityKgM3: 861.5, temperatureC: 36, surveyor: 'Intertek Houston', remarks: 'Topped up to 95% capacity.' }
    ]
  };

  let state = loadDataSet();
  let activeRole = localStorage.getItem(ROLE_KEY) || 'master';
  let activeEnvTheme = localStorage.getItem(THEME_KEY) || '';

  function loadDataSet() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Dataset parse error', e);
    }
    saveDataSet(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  function saveDataSet(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Dataset save error', e);
    }
  }

  function updateState(mutatorFn) {
    mutatorFn(state);
    saveDataSet(state);
    renderAllRails();
  }

  function showToast(title, subtitle = '') {
    let container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="font-size:1.2rem;color:var(--signal)">⚡</div>
      <div>
        <b>${title}</b>
        <span>${subtitle || 'Synchronized with TegrityPort Engine'}</span>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  function openBlade(title, bodyHtml, actionsHtml = '') {
    const blade = document.getElementById('blade');
    document.getElementById('blade-title').textContent = title;
    document.getElementById('blade-body').innerHTML = bodyHtml;
    document.getElementById('blade-actions').innerHTML = actionsHtml;
    blade.classList.add('active');
  }

  function closeBlade() {
    document.getElementById('blade').classList.remove('active');
  }

  function setEnvTheme(themeName) {
    activeEnvTheme = themeName;
    localStorage.setItem(THEME_KEY, themeName);
    document.body.className = themeName;
    document.querySelectorAll('.envpick button').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.title.toLowerCase().includes(themeName.replace('env-', '')) || (!themeName && btn.title === 'Signal Green'));
    });
    showToast(`Environment theme: ${themeName || 'Signal Green'}`, 'Theme updated');
  }

  function setRole(roleKey) {
    activeRole = roleKey;
    localStorage.setItem(ROLE_KEY, roleKey);
    showToast(`Perspective: ${roleKey.replace('_', ' ').toUpperCase()}`, 'Active role updated');
    renderAllRails();
  }

  // AMBIENT BACKGROUND CANVAS
  function initAmbientCanvas() {
    const canvas = document.getElementById('amb');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    }));

    function loop() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 229, 100, ${p.alpha * 0.35})`;
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CONSOLE RAIL RENDERERS
  // ═══════════════════════════════════════════════════════════════════════════

  function renderAllRails() {
    renderDashboardRail();
    renderDocumentsRail();
    renderDeckLogRail();
    renderEngineLogRail();
    renderPortLogRail();
    renderPumpingLogRail();
    renderBunkerReportRail();
    renderDirectoryRail();
  }

  // 1. Dashboard Rail
  function renderDashboardRail() {
    const el = document.getElementById('rail-dashboard');
    if (!el) return;

    const activeVoyages = state.voyages.filter(v => v.status === 'in_progress');
    const totalDocs = state.portDocuments.length;
    const durHrs = s => (new Date(s.stopEnd) - new Date(s.stopStart)) / 3600000;
    const totalStopHrs = state.portStoppages.reduce((sum, s) => sum + durHrs(s), 0);
    const peakRate = state.pumpingLog.length ? Math.max(...state.pumpingLog.map(p => p.rateM3hr || 0)) : 0;

    el.innerHTML = `
      <div class="tile hero w" onclick="window.TegrityPortApp.openAddPortDocument()">
        <div class="t-top">
          <div class="t-ico">🚢</div>
          <span class="pip live dot">LIVE BERTH</span>
        </div>
        <div class="t-face">
          <div class="t-name">MT Tegrity Alliance</div>
          <div class="t-sub">Singapore Jurong Island Berth 7 · Discharge</div>
          <div class="t-big sm mono" style="color:var(--signal)">95,000 MT Crude</div>
          <div class="t-strip"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
        </div>
      </div>

      <div class="tile" onclick="window.TegrityPortApp.openAddPortDocument()">
        <div class="t-top">
          <div class="t-ico">📁</div>
          <span class="pip ok">ON FILE</span>
        </div>
        <div class="t-face">
          <div class="t-lab">PORT DOCUMENTS</div>
          <div class="t-big mono" style="color:var(--good)">${totalDocs}</div>
          <div class="t-sub">NOR, Pratique & Manifest</div>
        </div>
      </div>

      <div class="tile" onclick="window.TegrityPortApp.openAddPortStoppage()">
        <div class="t-top">
          <div class="t-ico">⏱️</div>
          <span class="pip warn">STOPPAGES</span>
        </div>
        <div class="t-face">
          <div class="t-lab">STOPPAGE HOURS</div>
          <div class="t-big mono" style="color:var(--amber)">${totalStopHrs.toFixed(1)}h</div>
          <div class="t-sub">Feeds Laytime Engine</div>
        </div>
      </div>

      <div class="tile" onclick="window.TegrityPortApp.openAddPumpingLog()">
        <div class="t-top">
          <div class="t-ico">💧</div>
          <span class="pip info">RATE TESTED</span>
        </div>
        <div class="t-face">
          <div class="t-lab">PEAK PUMPING RATE</div>
          <div class="t-big mono" style="color:var(--cyan)">${peakRate.toLocaleString()}</div>
          <div class="t-sub">m³/hr vs CP Warranty</div>
        </div>
      </div>
    `;
  }

  // 2. Documents Rail
  function renderDocumentsRail() {
    const el = document.getElementById('rail-documents');
    if (!el) return;

    el.innerHTML = state.portDocuments.map(d => `
      <div class="tile" onclick="window.TegrityPortApp.inspectDoc('${d.id}')">
        <div class="t-top">
          <div class="t-ico">${d.icon}</div>
          <span class="pip ${d.status === 'Received' || d.status === 'Verified' ? 'ok' : 'warn'}">${d.status}</span>
        </div>
        <div class="t-face">
          <div class="t-name">${d.type}</div>
          <div class="t-sub">${d.voyageId}</div>
          <div class="t-lab mono" style="margin-top:0.4rem">${d.receivedDate || 'PENDING'}</div>
        </div>
      </div>
    `).join('');
  }

  // 3. Deck Log Rail
  function renderDeckLogRail() {
    const el = document.getElementById('rail-decklog');
    if (!el) return;

    el.innerHTML = state.portDeckLogEntries.map(l => `
      <div class="tile" onclick="window.TegrityPortApp.openAddPortDeckLog()">
        <div class="t-top">
          <div class="t-ico">📘</div>
          <span class="pip ${l.status === 'Verified' ? 'ok' : 'info'}">${l.entryType}</span>
        </div>
        <div class="t-face">
          <div class="t-name">${l.description}</div>
          <div class="t-sub">${l.officerOfWatch}</div>
          <div class="t-lab mono" style="margin-top:0.3rem">${new Date(l.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC</div>
        </div>
      </div>
    `).join('');
  }

  // 4. Engine Log Rail
  function renderEngineLogRail() {
    const el = document.getElementById('rail-enginelog');
    if (!el) return;

    el.innerHTML = state.portEngineLogEntries.map(l => `
      <div class="tile" onclick="window.TegrityPortApp.openAddPortEngineLog()">
        <div class="t-top">
          <div class="t-ico">📗</div>
          <span class="pip ${l.status === 'Verified' ? 'ok' : 'warn'}">${l.entryType}</span>
        </div>
        <div class="t-face">
          <div class="t-name">${l.description}</div>
          <div class="t-sub">${l.engineerOfWatch}</div>
          <div class="t-lab mono" style="margin-top:0.3rem">${new Date(l.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC</div>
        </div>
      </div>
    `).join('');
  }

  // 5. Port Log Stoppages Rail
  function renderPortLogRail() {
    const el = document.getElementById('rail-portlog');
    if (!el) return;

    const durHrs = s => (new Date(s.stopEnd) - new Date(s.stopStart)) / 3600000;

    el.innerHTML = state.portStoppages.map(s => `
      <div class="tile w" onclick="window.TegrityPortApp.openAddPortStoppage()">
        <div class="t-top">
          <div class="t-ico">⏱️</div>
          <span class="pip ${s.countsAsLaytime ? 'warn' : 'ok'}">${s.countsAsLaytime ? 'COUNTING LAYTIME' : 'EXCLUDED'}</span>
        </div>
        <div class="t-face">
          <div class="t-name">${s.reason}</div>
          <div class="t-sub">Responsible: ${s.responsibleParty}</div>
          <div class="t-big sm mono" style="color:var(--violet)">${durHrs(s).toFixed(1)} hrs</div>
        </div>
      </div>
    `).join('');
  }

  // 6. Cargo Pumping Log Rail
  function renderPumpingLogRail() {
    const el = document.getElementById('rail-pumpinglog');
    if (!el) return;

    el.innerHTML = state.pumpingLog.map(p => `
      <div class="tile" onclick="window.TegrityPortApp.openAddPumpingLog()">
        <div class="t-top">
          <div class="t-ico">💧</div>
          <span class="pip ok">PUMPS RUNNING</span>
        </div>
        <div class="t-face">
          <div class="t-lab">PUMPING RATE</div>
          <div class="t-big sm mono" style="color:var(--good)">${(p.rateM3hr || 0).toLocaleString()}</div>
          <div class="t-sub">m³/hr · Tanks ${p.tankNo}</div>
        </div>
      </div>
    `).join('');
  }

  // 7. Bunker ROB Survey Rail
  function renderBunkerReportRail() {
    const el = document.getElementById('rail-bunkerreport');
    if (!el) return;

    el.innerHTML = state.bunkerReports.map(b => `
      <div class="tile" onclick="window.TegrityPortApp.openAddBunkerReport()">
        <div class="t-top">
          <div class="t-ico">⛽</div>
          <span class="pip info">${b.reportType}</span>
        </div>
        <div class="t-face">
          <div class="t-name">${b.fuelType} ROB</div>
          <div class="t-big sm mono" style="color:var(--cyan)">${b.quantityMT} MT</div>
          <div class="t-sub">${b.surveyor}</div>
        </div>
      </div>
    `).join('');
  }

  // 8. Global Port Directory Rail
  function renderDirectoryRail() {
    const el = document.getElementById('rail-directory');
    if (!el) return;

    el.innerHTML = MASTER_PORTS.map(p => `
      <div class="tile" onclick="window.TegrityPortApp.inspectPort('${p.code}')">
        <div class="t-top">
          <div class="t-ico">⚓</div>
          <span class="pip ok">${p.region}</span>
        </div>
        <div class="t-face">
          <div class="t-name">${p.name}</div>
          <div class="t-sub">${p.country} (${p.code})</div>
          <div class="t-lab mono" style="margin-top:0.3rem">Draft: ${p.maxDraft}</div>
        </div>
      </div>
    `).join('');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MODALS & BLADES
  // ═══════════════════════════════════════════════════════════════════════════

  function inspectDoc(docId) {
    const doc = state.portDocuments.find(d => d.id === docId);
    if (!doc) return;
    openBlade(`📁 Document Detail — ${doc.type}`, `
      <div style="background:var(--surface);border:1px solid var(--edge);border-radius:var(--r);padding:1.2rem;margin-bottom:1rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem">
          <h2 style="font-size:1.1rem;color:var(--ink)">${doc.type}</h2>
          <span class="pip ${doc.status === 'Received' || doc.status === 'Verified' ? 'ok' : 'warn'}">${doc.status}</span>
        </div>
        <div style="font-size:0.82rem;color:var(--ink-2);display:flex;flex-direction:column;gap:0.4rem">
          <div><strong>Target Voyage:</strong> ${doc.voyageId}</div>
          <div><strong>Received Date:</strong> ${doc.receivedDate || 'Pending'}</div>
          <div><strong>File Attachment:</strong> <span class="mono" style="color:var(--cyan)">${doc.fileName || 'None'}</span></div>
          <div><strong>Remarks:</strong> ${doc.remarks}</div>
        </div>
      </div>
    `);
  }

  function inspectPort(portCode) {
    const port = MASTER_PORTS.find(p => p.code === portCode);
    if (!port) return;
    openBlade(`⚓ Port Directory — ${port.name}`, `
      <div style="background:var(--surface);border:1px solid var(--edge);border-radius:var(--r);padding:1.2rem">
        <h2 style="font-size:1.1rem;color:var(--ink);margin-bottom:0.8rem">${port.name}, ${port.country}</h2>
        <div style="font-size:0.85rem;color:var(--ink-2);display:flex;flex-direction:column;gap:0.5rem">
          <div><strong>Region:</strong> ${port.region}</div>
          <div><strong>Max Draft Limit:</strong> ${port.maxDraft}</div>
          <div><strong>Max Pumping Pressure Cap:</strong> ${port.maxPumpingPressure}</div>
          <div><strong>Timezone:</strong> ${port.timezone}</div>
          <div><strong>GPS Coordinates:</strong> ${port.lat}° N, ${port.lon}° E</div>
        </div>
      </div>
    `);
  }

  function openAddPortDocument() {
    const options = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    openBlade('📁 Add Port Document', `
      <div class="form-group">
        <label class="form-label">Voyage / Vessel</label>
        <select id="doc-voyage" class="form-select">${options}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Document Type</label>
        <input id="doc-type" class="form-input" placeholder="e.g. Notice of Readiness (NOR)">
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select id="doc-status" class="form-select">
          <option value="Received">Received</option>
          <option value="Pending">Pending</option>
          <option value="Verified">Verified</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">File Attachment Name</label>
        <input id="doc-filename" class="form-input" placeholder="NOR_SIN_08Apr.pdf">
      </div>
      <div class="form-group">
        <label class="form-label">Remarks</label>
        <textarea id="doc-remarks" class="form-textarea" rows="3" placeholder="Tendered on arrival..."></textarea>
      </div>
    `, `<button class="btn btn-signal" onclick="window.TegrityPortApp.submitPortDocument()">Save Document</button>`);
  }

  function submitPortDocument() {
    const voyageId = document.getElementById('doc-voyage').value;
    const type = document.getElementById('doc-type').value || 'Port Document';
    const status = document.getElementById('doc-status').value;
    const fileName = document.getElementById('doc-filename').value || 'document.pdf';
    const remarks = document.getElementById('doc-remarks').value;

    updateState(s => {
      s.portDocuments.unshift({
        id: 'pd_' + Date.now(),
        voyageId,
        type,
        icon: '📄',
        status,
        fileName,
        receivedDate: new Date().toISOString().slice(0, 10),
        remarks
      });
    });

    closeBlade();
    showToast('Port document logged', 'Saved to dataset');
  }

  function openAddPortStoppage() {
    const options = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    openBlade('⏱️ Log Port Stoppage (Laytime Impact)', `
      <div class="form-group">
        <label class="form-label">Voyage / Vessel</label>
        <select id="stop-voyage" class="form-select">${options}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Responsible Party</label>
        <select id="stop-resp" class="form-select">
          <option value="Shore">Shore / Terminal</option>
          <option value="Ship">Ship / Vessel</option>
          <option value="Weather">Weather / Force Majeure</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Laytime Treatment</label>
        <select id="stop-laytime" class="form-select">
          <option value="counting">Counts as Laytime</option>
          <option value="excluded">Excluded from Laytime</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Stoppage Reason</label>
        <input id="stop-reason" class="form-input" placeholder="e.g. Weather hold / Rain delay">
      </div>
      <div class="form-group">
        <label class="form-label">Remarks</label>
        <textarea id="stop-remarks" class="form-textarea" rows="2" placeholder="Rider clause reference..."></textarea>
      </div>
    `, `<button class="btn btn-signal" onclick="window.TegrityPortApp.submitPortStoppage()">Save Stoppage</button>`);
  }

  function submitPortStoppage() {
    const voyageId = document.getElementById('stop-voyage').value;
    const responsibleParty = document.getElementById('stop-resp').value;
    const countsAsLaytime = document.getElementById('stop-laytime').value === 'counting';
    const reason = document.getElementById('stop-reason').value || 'Stoppage logged';
    const remarks = document.getElementById('stop-remarks').value;

    const now = Date.now();
    updateState(s => {
      s.portStoppages.unshift({
        id: 'ps_' + now,
        voyageId,
        stopStart: new Date(now - 7200000).toISOString(),
        stopEnd: new Date(now).toISOString(),
        reason,
        responsibleParty,
        countsAsLaytime,
        remarks
      });
    });

    closeBlade();
    showToast('Port stoppage saved', 'Synchronized with Laytime Engine');
  }

  function openAddPumpingLog() {
    const options = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    openBlade('💧 Record Cargo Pumping Rate', `
      <div class="form-group">
        <label class="form-label">Voyage / Vessel</label>
        <select id="pump-voyage" class="form-select">${options}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Pumping Rate (m³/hr)</label>
        <input id="pump-rate" type="number" class="form-input" placeholder="3500">
      </div>
      <div class="form-group">
        <label class="form-label">Pumps Running</label>
        <input id="pump-pumps" class="form-input" placeholder="No.1, No.2, No.3">
      </div>
      <div class="form-group">
        <label class="form-label">Tanks</label>
        <input id="pump-tanks" class="form-input" placeholder="1P/1S/2P">
      </div>
    `, `<button class="btn btn-signal" onclick="window.TegrityPortApp.submitPumpingLog()">Save Reading</button>`);
  }

  function submitPumpingLog() {
    const voyageId = document.getElementById('pump-voyage').value;
    const rateM3hr = parseFloat(document.getElementById('pump-rate').value) || 3400;
    const pumpsRunning = document.getElementById('pump-pumps').value || 'Pumps 1-3';
    const tankNo = document.getElementById('pump-tanks').value || 'All Tanks';

    updateState(s => {
      s.pumpingLog.unshift({
        id: 'pl_' + Date.now(),
        voyageId,
        timestamp: new Date().toISOString(),
        pumpsRunning,
        rateM3hr,
        cumulativeQtyM3: 45000,
        tankNo,
        remarks: 'Recorded from bridge console'
      });
    });

    closeBlade();
    showToast('Pumping rate entry saved', 'Tested against CP warranty');
  }

  function openAddBunkerReport() {
    const options = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    openBlade('⛽ Add Bunker ROB Survey Report', `
      <div class="form-group">
        <label class="form-label">Voyage / Vessel</label>
        <select id="br-voyage" class="form-select">${options}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Report Type</label>
        <select id="br-type" class="form-select">
          <option value="Arrival">Arrival ROB Survey</option>
          <option value="Departure">Departure ROB Survey</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Fuel Grade</label>
        <select id="br-fuel" class="form-select">
          <option value="VLSFO">VLSFO</option>
          <option value="MGO">MGO</option>
          <option value="HSFO">HSFO</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quantity (MT)</label>
        <input id="br-qty" type="number" class="form-input" placeholder="780">
      </div>
    `, `<button class="btn btn-signal" onclick="window.TegrityPortApp.submitBunkerReport()">Save Report</button>`);
  }

  function submitBunkerReport() {
    const voyageId = document.getElementById('br-voyage').value;
    const reportType = document.getElementById('br-type').value;
    const fuelType = document.getElementById('br-fuel').value;
    const quantityMT = parseFloat(document.getElementById('br-qty').value) || 750;

    updateState(s => {
      s.bunkerReports.unshift({
        id: 'br_' + Date.now(),
        voyageId,
        reportType,
        date: new Date().toISOString().slice(0, 10),
        fuelType,
        quantityMT,
        densityKgM3: 985.0,
        temperatureC: 42,
        surveyor: 'Independent Surveyor',
        remarks: 'ROB survey recorded'
      });
    });

    closeBlade();
    showToast('Bunker survey report saved', 'ROB updated');
  }

  function openAddPortDeckLog() {
    const options = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    openBlade('📘 Log Deck Event', `
      <div class="form-group">
        <label class="form-label">Voyage / Vessel</label>
        <select id="deck-voyage" class="form-select">${options}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Officer of Watch</label>
        <input id="deck-oow" class="form-input" placeholder="2/O A. Fernandes">
      </div>
      <div class="form-group">
        <label class="form-label">Event Description</label>
        <input id="deck-desc" class="form-input" placeholder="Pilot boarded at pilot station">
      </div>
    `, `<button class="btn btn-signal" onclick="window.TegrityPortApp.submitPortDeckLog()">Save Deck Log</button>`);
  }

  function submitPortDeckLog() {
    const voyageId = document.getElementById('deck-voyage').value;
    const officerOfWatch = document.getElementById('deck-oow').value || 'OOW';
    const description = document.getElementById('deck-desc').value || 'Deck log entry';

    updateState(s => {
      s.portDeckLogEntries.unshift({
        id: 'pdl_' + Date.now(),
        voyageId,
        entryTime: new Date().toISOString(),
        officerOfWatch,
        entryType: 'Pilotage',
        description,
        remarks: '',
        status: 'Verified'
      });
    });

    closeBlade();
    showToast('Deck log entry saved');
  }

  function openAddPortEngineLog() {
    const options = state.voyages.map(v => `<option value="${v.id}">${v.vessel.name} (${v.id})</option>`).join('');
    openBlade('📗 Log Engine Event', `
      <div class="form-group">
        <label class="form-label">Voyage / Vessel</label>
        <select id="eng-voyage" class="form-select">${options}</select>
      </div>
      <div class="form-group">
        <label class="form-label">Engineer of Watch</label>
        <input id="eng-eow" class="form-input" placeholder="2/E T. Bautista">
      </div>
      <div class="form-group">
        <label class="form-label">Event Description</label>
        <input id="eng-desc" class="form-input" placeholder="Cargo pumps started">
      </div>
    `, `<button class="btn btn-signal" onclick="window.TegrityPortApp.submitPortEngineLog()">Save Engine Log</button>`);
  }

  function submitPortEngineLog() {
    const voyageId = document.getElementById('eng-voyage').value;
    const engineerOfWatch = document.getElementById('eng-eow').value || 'EOOW';
    const description = document.getElementById('eng-desc').value || 'Engine log entry';

    updateState(s => {
      s.portEngineLogEntries.unshift({
        id: 'pel_' + Date.now(),
        voyageId,
        entryTime: new Date().toISOString(),
        engineerOfWatch,
        entryType: 'Main Engine',
        description,
        remarks: '',
        status: 'Verified'
      });
    });

    closeBlade();
    showToast('Engine log entry saved');
  }

  // EXPORT PUBLIC API
  window.TegrityPortApp = {
    init: function () {
      initAmbientCanvas();
      if (activeEnvTheme) setEnvTheme(activeEnvTheme);
      renderAllRails();
    },

    setEnvTheme,
    setRole,
    closeBlade,
    inspectDoc,
    inspectPort,

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

  document.addEventListener('DOMContentLoaded', () => {
    window.TegrityPortApp.init();
  });
})();

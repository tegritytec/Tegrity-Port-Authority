# Tegrity Port Authority (TPA)

**Tegrity Port Authority (TPA)** is an enterprise maritime port operations, documentation, deck & engine logbook, laytime stoppage treatment, cargo pumping performance, and bunker ROB intelligence application module.

GitHub Repository: [https://github.com/tegritytec/Tegrity-Port-Authority.git](https://github.com/tegritytec/Tegrity-Port-Authority.git)

---

## ⚓ Key Functional Features

- **📊 Executive Operations Dashboard**: Live berth monitoring, active vessel port calls, document readiness ratios, laytime stoppage metrics, and quick event launchers.
- **📁 Port Documents Vault (`portdocuments`)**: Paperwork management for Notice of Readiness (NOR), Port Clearance, Free Pratique, Cargo Manifest, Bill of Lading, Customs Clearance, Statement of Facts (SOF), and BDN with status tracking (Received, Pending, Verified).
- **📘 Deck Logbook (`portdecklog`)**: Chronological deck log entries covering pilotage, EOT changes, mooring alongside, tug assistance, gangway security, and Officer-of-Watch (OOW) sign-offs.
- **📗 Engine Logbook (`portenginelog`)**: Engine room logbook entries covering main engine standby/finished, auxiliary generator loads, cargo pump startup/stoppage, boilers, and Engineer-of-Watch (EOOW) sign-offs.
- **⏱️ Port Log (Ship/Shore Stoppages & Laytime Impact) (`portlog`)**: Stoppage ledger tracking start/end times, stoppage reasons (weather hold, customs inspection, terminal tank change), responsible party (Ship vs. Shore vs. Weather), and direct laytime calculation impact (Counting vs. Excluded hours).
- **💧 Cargo Pumping Log (`pumpinglog`)**: Minute-by-minute rate monitoring (m³/hr), active pump configurations, cumulative quantities, and manifold pressure testing against CP Warranty curves (3,500 m³/hr).
- **⛽ Bunker ROB Survey (`bunkerreport`)**: Arrival & Departure fuel surveys (VLSFO, HSFO, MGO, ULSFO) with density, temperature, and independent surveyor verification.
- **⚓ Global Port Directory (`directory`)**: Master catalog of ports, draft limits, pumping pressure caps, and berth specifications.
- **🎭 Multi-Role Selector**: Role perspectives for Master, Chief Officer, Chief Engineer, Port Agent, Charterer Operations, Laytime Analyst, and Port Authority.

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```
App available at `http://localhost:8080`

---

## ☁️ Deployment on GCP Cloud Run

```bash
gcloud builds submit --config=cloudbuild.yaml .
gcloud run deploy tegrity-port-authority \
  --image us-central1-docker.pkg.dev/voyageiq-dev/tegrityvoyageiq/tegrity-port-authority:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

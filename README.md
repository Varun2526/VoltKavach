# VoltKavach (TrafoSaathi) ⚡🛡️
### DISCOM Transformer Reliability & Flexibility Decision Layer

> **Real-time decision intelligence for distribution utilities (DISCOMs) to forecast thermal hotspot stress on neighbourhood distribution transformers, orchestrate community batteries (BESS), and dispatch least-intrusive flexibility before irreversible thermal degradation occurs.**

---

## 🌟 Overview

Indian and global distribution transformers (DTs) face extreme thermal overloading during evening peak windows (18:00 – 23:00) driven by rising ambient temperatures, air-conditioning surge loads, and electric vehicle adoption. Conventional demand-response operates at a macro feeder level without granular knowledge of which specific transformer is overheating.

**VoltKavach (TrafoSaathi)** bridges this critical gap by acting as an operational control-room decision layer for DISCOM grid dispatchers.

```
FORECAST → TRANSFORMER RISK → THERMAL HOTSPOT MODEL → ACTION LADDER OPTIMISER → DISPATCH INTERVENTION → EXTENDED ASSET LIFETIME
```

---

## 🚀 Key Capabilities

### 1. 🎛️ SCADA Industrial Control Center
- Real-time monitoring across 1,248 neighbourhood transformers across municipal circles.
- Dynamic **Distribution Network Topology Risk Map** with active feeder load flows and live node telemetry.
- **Tomorrow's Risk Queue** highlighting high-risk DTs 24 hours in advance using IEEE thermal loading criteria.

### 2. 🔥 Physics-Based Thermal Heat Modelling (DT-1042 Deep Dive)
- Deterministic simulation of top-oil and winding hotspot temperatures based on IEC 60076-7 / IEEE C57.91 standards.
- Visual comparative simulation: **"WITHOUT TrafoSaathi"** (hotspot reaches 126°C, causing 18.4x accelerated ageing) vs **"WITH TrafoSaathi"** (stabilized at 104°C).

### 3. 🪜 Least-Intrusive-First Action Ladder
Automated optimization ladder executing peak clipping in sequential order:
1. **Tier 1: Neighbourhood Battery (BESS)** (32 kW discharge for 2.5 hrs) — Zero consumer impact.
2. **Tier 2: Voluntary Automated AC/Pump Load Shifting** (22 kW aggregated reduction).
3. **Tier 3: SMS / Voice Dynamic Tariff Nudges** (11 kW voluntary reduction).
4. **Tier 4: Guaranteed Essential Power Floor** — Strict safety net, zero total blackouts.

### 4. ⚖️ Fairness & Equity Ledger
- Prevents the same households or feeder segments from bearing repeated flexibility burdens.
- Cryptographically enforced monthly power floor minute quotas.
- Automatic **Medical Exemption Whitelisting** protecting life-support and sensitive medical equipment.

### 5. 💰 Savings & Settlement Matrix (S0–S3 Scenarios)
- Detailed economic comparison across S0 (Business As Usual), S1 (Blind BESS), S2 (Traditional DR), and S3 (TrafoSaathi Intelligent Decision Layer).
- Verifiable Capex deferral ledger (Rs. 18.5 Lakh transformer replacement deferred) and avoided peak power purchase costs.

### 6. 📱 Urja Sakhi Community Field Steward Portal
- Integrated handheld mobile emulator for local women energy stewards (Urja Sakhis).
- Digital daily site inspection with GPS-tagged photo validation and tamper checks.
- Community complaints ticketing with 1-click resolution and incentive disbursement tracking.

---

## 🎨 Design Philosophy: Operational SCADA Control Room

Designed strictly for utility operators, control rooms, and power grid engineers:
- **Restrained dark navy palette:** `#080D17` (Canvas), `#0B1220` (Sidebar), `#101827` (Panels), `#131D2D` (Elevated).
- **Subtle borders:** `#1D2939` / `#263449` (1px, crisp).
- **Primary Operational Cyan:** `#22B8CF` (Used exclusively for active infrastructure telemetry and topology lines).
- **Semantic Status Signals:** Muted healthy (`#22A06B`), warning (`#D99A2B`), and critical (`#D9534F`) indicators.
- **Typography:** *Inter* for clean UI; *JetBrains Mono* for telemetry, measurements (kW, kVA, °C, %, SoC), and transformer identifiers.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (SCADA design tokens)
- **Visualizations:** Recharts (Thermal time-series, load vs capacity, burden distribution)
- **Icons:** Lucide React

---

## 💻 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Varun2526/VoltKavach.git

# Navigate into the project directory
cd VoltKavach

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📦 Building for Production

```bash
npm run build
npm run preview
```

---

## 📄 License

MIT License. Developed for DISCOM Reliability & Grid Flexibility Innovation.

# Project-VASUKI-X5: Cyber-Physical Smart Campus & Manufacturing Matrix

An integrated enterprise platform and digital twin console for **Project-VASUKI-X5 (VASUKI-INDICUS-SMART-CLUSTER-2026)** developed under **Vasuki-Indicus-Anusandhan-AI-Lab**. This system unites high-density interactive gaming, an on-site edge data center, a LEO satellite communications array, and an automated smart toy manufacturing cluster into a cohesive cyber-physical command center.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying questions were skipped by the user, so the recommended architecture has been adopted:
> 1. **Default View**: Unified Cyber-Physical Command Center integrating all operational modules with an intuitive top-level mode selector (`Campus Digital Twin`, `Live Telemetry & Procurement`, `Graphic Novel Story Mode`, `CapEx & TOT Investor Deck`, and `Android APK & Mobile Matrix`).
> 2. **Campus Visualizer**: Interactive architectural cutaway based on the uploaded high-fidelity master blueprint (`image.png`), augmented with interactive floor inspection overlays, structural telemetry hotspots, and sensor diagnostics.
> 3. **Live Telemetry Engine**: Dual-stream telemetry architecture featuring an autonomous real-time data generator with active fallback to a local WebSocket server on `ws://localhost:8765`, manual packet injection, real-time Chart.js SVG analytics, and one-click PDF/CSV export routines.

---

## 1. Overview & Core Concept

- **What It Does**: Provides an interactive command center, architectural digital twin, and operational telemetry workstation for the ₹22.5 Cr – ₹33.5 Cr Project-VASUKI-X5 campus. It bridges digital gameplay (Avatar Arena & game development) with physical manufacturing (injection molding & SMT pick-and-place lines) and edge computing.
- **Target Audience / Persona**: Institutional investors, venture capital syndicates, industrial partners, global hardware vendors (IndiaMART suppliers), and engineering leads evaluating Transfer of Technology (TOT) licenses.
- **Key Value**: Delivers tangible proof of execution for a patent-grade, closed-loop cyber-physical ecosystem—demonstrating real-time avatar projection, low-latency satellite routing, synchronized toy fabrication, and cross-platform Android mobile deployment.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Campus Exploration (Digital Twin Explorer)**:
   - The user inspects the multi-tier campus (Exterior & Ground Floor Biometric Registration, Floor 1 Avatar Arena, Floor 2 Classic Indoor Club, Floor 3 Futsal & Game Studio, Floor 4 Gym & Edge Data Center, Floor 5 Buffet & Rooftop Satellite Array, and Industrial Annex Toy Manufacturing Cluster).
   - Clicking any floor highlights its structural schematics, load isolation parameters, CapEx estimates (in INR Cr), hardware specifications, and live sensor telemetry.

2. **Live Telemetry & Procurement Station**:
   - Displays real-time operational metrics: Molding Throughput/Hr (target 1,500 units/hr), SolidWorks PCB API sync status, and hourly production trend curves.
   - Live WebSocket listener (`ws://localhost:8765`) with one-click connect/disconnect, terminal stream monitor, simulated payload injection, and IndiaMART procurement registry table (injection molding rigs, blow molding, and SMT pick-and-place).
   - Functional export triggers for **PDF Report Generation** (custom styled summary) and **CSV Data Logging**.

3. **Engineering Graphic Novel Storytelling Mode**:
   - Dynamic split-view or carousel showcasing dialogue between **Amit (Chief Systems Architect)** and **Rosa (Lead Logistics & Electronics Engineer)**.
   - Interactive comic/novel panel pacing with synchronized floor highlighting, walking through the closed-loop flywheel (Avatar Scan → Game Engine → IoT Vector Push → Physical Toy Assembly).

4. **CapEx & TOT Investment Deck**:
   - Interactive financial model breaking down civil, IT hardware, telecom, and industrial tiers (₹22.5 Cr to ₹33.5 Cr baseline).
   - Investor pitch modules, LinkedIn showcase copy generator, and technical transfer licensing parameters.

5. **Android APK Deployment Hub**:
   - Production Capacitor (`capacitor.config.json`) and Apache Cordova (`config.xml`) configuration profiles with CLI commands, security compliance checklists, and mobile HUD layout preview.

### Visual Identity & Theme

- **Aesthetic Direction**: High-precision aerospace and cyber-physical industrial console. Sleek dark slate foundation with tactical cyan and emerald data accents, crisp hairline borders, and zero ornamental AI fluff.
- **Color Palette**:
  - *Dominant Canvas (60%)*: Deep Obsidian Slate (`#020617` / `#0B0F19`)
  - *Structural Surfaces (30%)*: Gunmetal & Deep Navy (`#0F172A` / `#1E293B`), hairline dividers (`rgba(51, 65, 85, 0.4)`)
  - *Accent Budget (10%)*: Tactical Cyan (`#06B6D4` / `#22D3EE`) for active operations, Emerald (`#10B981`) for nominal telemetry, Amber (`#F59E0B`) for idle/awaiting states.
- **Typography & Hierarchy**:
  - *Display / Headings*: `Outfit` / `Plus Jakarta Sans` for clean, modern architectural titles.
  - *Body Prose*: `Public Sans` / `DM Sans` for dense, highly legible engineering documentation.
  - *Data & Telemetry*: Monospace tabular numerals (`font-mono tabular-nums`, `JetBrains Mono` style) for all timestamps, coordinates, through-rates, and financial values.
- **Interactive Feedback**: Smooth transitions (≤ 150ms), interactive floor pin highlights, responsive SVG/Canvas chart with tooltip curves, terminal auto-scrolling, and mobile-optimized touch navigation bar.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Master Visualizer Asset**:
  - *Chosen Approach*: Leverage the user's provided architectural cutaway master image (`image.png`) with interactive SVG hotspot overlays, zoom/pan controls, and deep inspection drawer.
  - *Why*: The image already contains the exact architectural vision (all 5 floors + rooftop dishes + industrial annex + parking). Overlaying interactive hotspot anchors gives instantaneous, pixel-perfect fidelity.
  - *Alternatives Considered*: Pure Three.js recreation from scratch would look low-poly compared to the provided high-density architectural rendering.
- **Decision 2: Dual Telemetry Engine (Autonomous Stream + Real WebSocket Fallback)**:
  - *Chosen Approach*: Implement a dual-mode telemetry service. If a local Python WebSocket server is running on `ws://localhost:8765`, it binds directly and displays live packets; if not, an integrated high-precision simulator emits dynamic packets every 2.5 seconds, with manual "Inject Simulation" override and pause/play controls.
  - *Why*: Ensures zero blank screens or connection errors when running in the AI Studio cloud sandbox while fully honoring the user's local Python server script.
- **Decision 3: In-Browser Client-Side PDF & CSV Exporting**:
  - *Chosen Approach*: Native client-side CSV string compiling and dynamic canvas/jsPDF-compatible vector report generation.
  - *Why*: Instantaneous downloads without server-side latency or external third-party dependencies that might fail in sandboxed iframes.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROJECT-VASUKI-X5 CONSOLE                       │
├────────────────────────────────────────────────────────────────────────┤
│  Top Navigation: Brand Wordmark · Status Stream · Mode Switch · Export │
├────────────────────────────┬───────────────────────────────────────────┤
│  LEFT / MAIN VIEWPORT      │  RIGHT / INSPECTION VIEWPORT              │
│  ┌───────────────────────┐ │  ┌──────────────────────────────────────┐ │
│  │ Campus Cutaway &      │ │  │ Floor Deep-Dive & Hardware Specs     │ │
│  │ Interactive Hotspots  │ │  │ · CapEx Baseline & Spatial Matrix    │ │
│  │ · Ground: Biometrics  │ │  │ · PyTorch Vision & Edge Racks        │ │
│  │ · F1: Avatar Arena    │ │  └──────────────────────────────────────┘ │
│  │ · F2: Classic Club    │ │  ┌──────────────────────────────────────┐ │
│  │ · F3: Futsal/Dev Zone │ │  │ Real-Time Telemetry & Line Chart     │ │
│  │ · F4: Gym & Edge DC   │ │  │ · Hourly Throughput (1,450/hr)       │ │
│  │ · F5: Roof & Satellite│ │  │ · IndiaMART Procurement Table        │ │
│  │ · Annex: Toy Factory  │ │  │ · Terminal Packet Monitor (port 8765)│ │
│  └───────────────────────┘ │  └──────────────────────────────────────┘ │
├────────────────────────────┴───────────────────────────────────────────┤
│  Graphic Novel Storyteller · Investor TOT Deck · Android APK Config   │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State Entities

- **`CampusModule`**: ID, name, floor, level, capexRange, structuralSpecs, techStack, activeSensors, highlightedCoordinates.
- **`TelemetryPacket`**: `module_id`, `cluster_name`, `injection_molding_throughput_hourly`, `pcb_routing_api_status`, `hourly_output_telemetry: number[]`, `indiamart_machinery_pipeline: Array<{name, spec, cost, status}>`, `engineering_execution_steps: string[]`.
- **`GraphicNovelScene`**: Scene index, title, characters (Amit, Rosa), dialogue lines, animated panel stage, floor anchor link.
- **`CapExAllocation`**: Module name, allocationINR, percentage, civilShare, hardwareShare, softwareShare.
- **`ApkConfig`**: Platform, appId, targetSdk, capacitorConfig, cordovaConfig, securityChecklist.

### Interactive Handlers & State Mapping

1. `activeTab`: Switches between `Campus Explorer`, `Operations & Telemetry`, `Storytelling Graphic Novel`, `CapEx & Investment`, and `Android APK Packaging`.
2. `selectedFloor`: Highlights corresponding cutaway section and displays architectural deep-dive data.
3. `wsConnection`: Connects to `ws://localhost:8765`, switches status dot (`amber` → `emerald`), updates terminal monitor.
4. `injectSimulatedPayload()`: Triggers instant packet feed into terminal, updates hourly line chart, and refreshes IndiaMART status.
5. `exportToCSV()` & `exportToPDF()`: Generates and triggers browser downloads of active operational reports.
6. `storyChapter`: Advances graphic novel panel, triggers dialogue typewriter effect, and pans campus focus.

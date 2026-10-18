import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, TelemetryPacket } from './types/vasuki';
import { 
  CAMPUS_MODULES, 
  INDIAMART_PROCUREMENT, 
  INITIAL_TELEMETRY, 
  STORY_CHAPTERS,
  FLOOR_ZONES_HEATMAP
} from './data/vasukiData';
import { exportToCSV, exportToPDF } from './utils/exportUtils';
import { Header } from './components/Header';
import { CampusCutawayViewer } from './components/CampusCutawayViewer';
import { TelemetryConsole } from './components/TelemetryConsole';
import { GraphicNovelViewer } from './components/GraphicNovelViewer';
import { CapExInvestorDeck } from './components/CapExInvestorDeck';
import { AndroidPackagingHub } from './components/AndroidPackagingHub';
import { DpiitAndCncHub } from './components/DpiitAndCncHub';
import { MobileHudNavbar } from './components/MobileHudNavbar';

export default function App() {
  const [currentMode, setCurrentMode] = useState<ViewMode>('campus');
  const [selectedFloorId, setSelectedFloorId] = useState<string>('floor-1');
  const [telemetry, setTelemetry] = useState<TelemetryPacket>(INITIAL_TELEMETRY);
  const [wsConnected, setWsConnected] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string>(
    `[SYSTEM INITIALIZATION] PROJECT-VASUKI-X5 (2026 CLUSTER)\n` +
    `[LAB ID] Vasuki-Indicus-Anusandhan-AI-Lab\n` +
    `[INFO] Target: ws://localhost:8765 · Awaiting server handshake or simulation trigger...\n` +
    `[D3 HEATMAP ENGINE] Initialized across 20 spatial floor zones\n` +
    `[STATUS] Ready. Molding Target: 1,500 units/hr · PyTorch Face Scan: Active`
  );

  const socketRef = useRef<WebSocket | null>(null);

  // Auto simulated telemetry heartbeat every 4 seconds to keep dashboard lively
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const delta = Math.floor(Math.random() * 50) - 25;
        const newThroughput = Math.min(1600, Math.max(1320, prev.injection_molding_throughput_hourly + delta));
        const lastOutput = prev.hourly_output_telemetry[prev.hourly_output_telemetry.length - 1];
        const nextOutput = Math.min(1600, Math.max(1300, lastOutput + Math.floor(Math.random() * 40) - 20));
        
        const updatedOutputs = [...prev.hourly_output_telemetry.slice(1), nextOutput];

        return {
          ...prev,
          injection_molding_throughput_hourly: newThroughput,
          hourly_output_telemetry: updatedOutputs,
          server_timestamp: new Date().toISOString()
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // WebSocket Connection Management
  const connectWebSocket = () => {
    if (wsConnected && socketRef.current) {
      socketRef.current.close();
      setWsConnected(false);
      appendLog(`[WS LINK SEVERED] WebSocket session terminated.`);
      return;
    }

    appendLog(`\n[INFO] Initializing connection to ws://localhost:8765...`);
    try {
      const ws = new WebSocket('ws://localhost:8765');
      socketRef.current = ws;

      ws.onopen = () => {
        setWsConnected(true);
        appendLog(`[SUCCESS] Pipeline connected to ws://localhost:8765. Receiving real-time background packets...`);
      };

      ws.onmessage = (event) => {
        try {
          const incomingData: TelemetryPacket = JSON.parse(event.data);
          appendLog(`[PACKET RECEIVED]: ${event.data.substring(0, 140)}...`);
          setTelemetry((prev) => ({
            ...prev,
            ...incomingData,
            hourly_output_telemetry: incomingData.hourly_output_telemetry || prev.hourly_output_telemetry
          }));
        } catch (e) {
          appendLog(`[RAW STREAM]: ${event.data}`);
        }
      };

      ws.onerror = () => {
        appendLog(`[SERVER CONNECTION NOTICE] Port 8765 offline or unreachable. Standard simulation matrix running nominal.`);
      };

      ws.onclose = () => {
        setWsConnected(false);
        appendLog(`[WS LINK IDLE] Session closed.`);
      };
    } catch (err: any) {
      appendLog(`[FAIL] WebSocket instantiation error: ${err.message}`);
    }
  };

  const appendLog = (msg: string) => {
    setTerminalLogs((prev) => {
      const lines = prev.split('\n');
      if (lines.length > 50) {
        return [...lines.slice(lines.length - 40), msg].join('\n');
      }
      return `${prev}\n${msg}`;
    });
  };

  const handleInjectPayload = () => {
    const randomizedRate = Math.floor(Math.random() * (1550 - 1400 + 1)) + 1400;
    const randomizedHistory = [
      Math.floor(Math.random() * 150) + 400,
      Math.floor(Math.random() * 150) + 650,
      Math.floor(Math.random() * 150) + 850,
      Math.floor(Math.random() * 150) + 1100,
      Math.floor(Math.random() * 150) + 980,
      Math.floor(Math.random() * 150) + 1300,
      Math.floor(Math.random() * 100) + 1400,
      randomizedRate
    ];

    const injectedPayload: TelemetryPacket = {
      module_id: 'MODULE-05-A',
      cluster_name: 'Vasuki Smart Toy Manufacturing Cluster',
      injection_molding_throughput_hourly: randomizedRate,
      pcb_routing_api_status: 'SYNCHRONIZED_ACTIVE',
      hourly_output_telemetry: randomizedHistory,
      indiamart_machinery_pipeline: [
        { name: 'Automatic Plastic Injection Moulding Rig', spec: '150-200 Ton Clamping / 440V', cost: '₹12,28,000 / Set', status: 'Ready for PO' },
        { name: 'Automatic Toy Blow Moulding Machine', spec: '1L-2L Cavity / Dual Station', cost: '₹5,75,000 / Set', status: 'Quotation Received' },
        { name: 'Pick-and-Place SMT Assembly System', spec: 'PCB Micro-Chip Routing', cost: '₹18,50,000 / Unit', status: 'Customs Transit' }
      ],
      engineering_execution_steps: [
        'Step 1: Loaded SolidWorks API configuration profiles into memory.',
        'Step 2: Established secure token validation handshake via LEO rooftop antenna.',
        'Step 3: Triggered injection molding heat matrices for component assembly.',
        'Step 4: Synchronized PyTorch facial tracking telemetry loop with Floor 1 gaming consoles.',
        'Step 5: Output payload safely dispatched to primary analytical dashboard logs.'
      ],
      server_timestamp: new Date().toISOString()
    };

    setTelemetry(injectedPayload);
    setSelectedFloorId('floor-1');
    appendLog(`\n[INCOMING API PACKET TRANSMISSION RECEIVED]\n${JSON.stringify(injectedPayload, null, 2)}`);
  };

  const handleClearLogs = () => {
    setTerminalLogs(`[TERMINAL RESET] Telemetry monitor cleared at ${new Date().toLocaleTimeString()}`);
  };

  const handleExportCSV = () => {
    exportToCSV(telemetry, CAMPUS_MODULES);
    appendLog(`[EXPORT EVENT] Operational CSV exported at ${new Date().toLocaleTimeString()}`);
  };

  const handleExportPDF = () => {
    exportToPDF(telemetry, CAMPUS_MODULES);
    appendLog(`[EXPORT EVENT] Architectural PDF report generated at ${new Date().toLocaleTimeString()}`);
  };

  const handleNavigateToFloorFromStory = (floorId: string) => {
    setSelectedFloorId(floorId);
    setCurrentMode('campus');
  };

  const handleSelectFloorFromHeatmap = (floorId: string) => {
    setSelectedFloorId(floorId);
    setCurrentMode('campus');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-16 md:pb-0">
      
      {/* Top Telemetry Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        wsConnected={wsConnected}
        onToggleWebSocket={connectWebSocket}
        onInjectSimulation={handleInjectPayload}
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6">
        
        {currentMode === 'campus' && (
          <CampusCutawayViewer
            modules={CAMPUS_MODULES}
            selectedFloorId={selectedFloorId}
            onSelectFloor={(id) => setSelectedFloorId(id)}
            onNavigateToTelemetry={() => setCurrentMode('telemetry')}
          />
        )}

        {currentMode === 'telemetry' && (
          <TelemetryConsole
            telemetry={telemetry}
            procurementList={INDIAMART_PROCUREMENT}
            modules={CAMPUS_MODULES}
            zones={FLOOR_ZONES_HEATMAP}
            wsConnected={wsConnected}
            onToggleWebSocket={connectWebSocket}
            onInjectPayload={handleInjectPayload}
            terminalLogs={terminalLogs}
            onClearLogs={handleClearLogs}
            onExportCSV={handleExportCSV}
            onExportPDF={handleExportPDF}
            onSelectFloor={handleSelectFloorFromHeatmap}
            onAppendLog={appendLog}
          />
        )}

        {currentMode === 'story' && (
          <GraphicNovelViewer
            chapters={STORY_CHAPTERS}
            onNavigateToFloor={handleNavigateToFloorFromStory}
          />
        )}

        {currentMode === 'capex' && (
          <CapExInvestorDeck />
        )}

        {currentMode === 'apk' && (
          <AndroidPackagingHub />
        )}

        {currentMode === 'dpiit' && (
          <DpiitAndCncHub />
        )}

      </main>

      {/* Mobile Bottom HUD Touch Navigation */}
      <MobileHudNavbar
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        onInjectSimulation={handleInjectPayload}
      />

      {/* Desktop Quiet Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-xs font-mono text-slate-500 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Project-VASUKI-X5 · VASUKI-INDICUS-SMART-CLUSTER-2026 · Vasuki-Indicus-Anusandhan-AI-Lab
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Baseline CapEx: ₹22.5 Cr – ₹33.5 Cr</span>
            <span>·</span>
            <span>DPIIT Capital: ₹30 Cr</span>
            <span>·</span>
            <span>Target SDK: 34 (Android 14+)</span>
            <span>·</span>
            <span className="text-cyan-400">TOT Licensing Verified</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

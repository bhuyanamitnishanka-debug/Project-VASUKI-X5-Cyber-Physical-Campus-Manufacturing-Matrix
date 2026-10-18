import React, { useState, useEffect } from 'react';
import { TelemetryPacket, IndiaMartItem, FloorModule, FloorZoneHeatmapData } from '../types/vasuki';
import { FloorHeatmapVisualizer } from './FloorHeatmapVisualizer';
import { AssetQrScannerModal } from './AssetQrScannerModal';
import { NC_STREAMER_PYTHON_SCRIPT } from '../data/vasukiData';
import { 
  Activity, 
  Cpu, 
  Terminal, 
  Zap, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Package, 
  Layers, 
  Search, 
  Server, 
  Gauge, 
  Radio, 
  Flame,
  LayoutGrid,
  QrCode,
  Scan,
  Wrench,
  ShieldCheck,
  Code2,
  Copy,
  Check,
  Play,
  Pause,
  ExternalLink,
  X
} from 'lucide-react';

interface TelemetryConsoleProps {
  telemetry: TelemetryPacket;
  procurementList: IndiaMartItem[];
  modules: FloorModule[];
  zones: FloorZoneHeatmapData[];
  wsConnected: boolean;
  onToggleWebSocket: () => void;
  onInjectPayload: () => void;
  terminalLogs: string;
  onClearLogs: () => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
  onSelectFloor?: (floorId: string) => void;
  onAppendLog?: (message: string) => void;
}

export const TelemetryConsole: React.FC<TelemetryConsoleProps> = ({
  telemetry,
  procurementList,
  modules,
  zones,
  wsConnected,
  onToggleWebSocket,
  onInjectPayload,
  terminalLogs,
  onClearLogs,
  onExportCSV,
  onExportPDF,
  onSelectFloor,
  onAppendLog
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'both' | 'chart' | 'heatmap'>('both');
  
  // Asset QR Code & Physical Scanner State
  const [selectedQrItem, setSelectedQrItem] = useState<IndiaMartItem | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  
  // G-Code Streamer & Python nc_streamer.py State
  const [showGcodeModal, setShowGcodeModal] = useState(false);
  const [copiedPythonScript, setCopiedPythonScript] = useState(false);
  const [gcodeStreaming, setGcodeStreaming] = useState(false);
  const [currentCoordinates, setCurrentCoordinates] = useState<{ x: number; y: number; z: number; cmd: string; feed: number }>({
    x: 0.0,
    y: 0.0,
    z: 5.0,
    cmd: 'G00',
    feed: 1500
  });

  // Simulated real-time G-Code toolpath streamer to WebSocket terminal
  useEffect(() => {
    if (!gcodeStreaming) return;

    const toolpaths = [
      { cmd: 'G00', x: 0.0, y: 0.0, z: 5.0, feed: 1500 },
      { cmd: 'G01', x: 0.0, y: 0.0, z: -1.25, feed: 300 },
      { cmd: 'G01', x: 24.5, y: 12.8, z: -1.25, feed: 650 },
      { cmd: 'G02', x: 38.2, y: 26.5, z: -1.25, feed: 600 },
      { cmd: 'G01', x: 78.9, y: 26.5, z: -1.25, feed: 750 },
      { cmd: 'G03', x: 92.4, y: 40.0, z: -1.25, feed: 600 },
      { cmd: 'G01', x: 92.4, y: 85.0, z: -1.25, feed: 800 },
      { cmd: 'G00', x: 92.4, y: 85.0, z: 5.0, feed: 1500 },
      { cmd: 'G00', x: 0.0, y: 0.0, z: 5.0, feed: 1500 }
    ];

    let idx = 0;
    const interval = setInterval(() => {
      const pt = toolpaths[idx % toolpaths.length];
      setCurrentCoordinates(pt);

      if (onAppendLog) {
        onAppendLog(
          `[G-CODE STREAMER] (ZAX-4 Toolroom CNC) ${pt.cmd} X:${pt.x.toFixed(3)} Y:${pt.y.toFixed(3)} Z:${pt.z.toFixed(3)} F:${pt.feed} (Spindle: 24,000 RPM Nominal)`
        );
      }
      idx++;
    }, 1100);

    return () => clearInterval(interval);
  }, [gcodeStreaming, onAppendLog]);

  const handleOpenQrModal = (item: IndiaMartItem) => {
    setSelectedQrItem(item);
    setIsQrModalOpen(true);
  };

  const handleNavigateQrItem = (direction: 'prev' | 'next') => {
    if (!selectedQrItem) return;
    const currentIndex = procurementList.findIndex((it) => it.id === selectedQrItem.id);
    if (currentIndex === -1) return;

    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = procurementList.length - 1;
    if (newIndex >= procurementList.length) newIndex = 0;

    setSelectedQrItem(procurementList[newIndex]);
  };

  const handleCopyPythonScript = () => {
    navigator.clipboard.writeText(NC_STREAMER_PYTHON_SCRIPT);
    setCopiedPythonScript(true);
    setTimeout(() => setCopiedPythonScript(false), 2500);
  };

  const filteredProcurement = procurementList.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.spec.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate chart path points for SVG line chart
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const data = telemetry.hourly_output_telemetry;
  const maxVal = 1800;
  const chartWidth = 700;
  const chartHeight = 160;
  const paddingX = 40;
  const paddingY = 25;

  const points = data.map((val, index) => {
    const x = paddingX + (index / (data.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (val / maxVal) * (chartHeight - paddingY * 2);
    return { x, y, val, hour: hours[index] || `T+${index}` };
  });

  const pathD = points.reduce((acc, curr, index) => {
    if (index === 0) return `M ${curr.x} ${curr.y}`;
    const prev = points[index - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp2x = cp1x;
    return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1]?.x || 0} ${chartHeight - paddingY} L ${points[0]?.x || 0} ${chartHeight - paddingY} Z`;

  // Target threshold (1500 units/hr) Y coordinate
  const targetY = chartHeight - paddingY - (1500 / maxVal) * (chartHeight - paddingY * 2);

  return (
    <div className="space-y-6">
      
      {/* Telemetry Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>PROJECT-VASUKI-X5</span>
            <span aria-hidden="true">·</span>
            <span>TELEMETRY STREAM & INDUSTRIAL FABRICATION</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">PORT 8765 ACTIVE</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight mt-0.5">
            Operational Telemetry, Heatmap Density & IndiaMART Procurement
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onInjectPayload}
            className="bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-slate-950 text-xs font-mono font-bold px-3 py-1.5 rounded-md shadow-md shadow-cyan-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>INJECT PAYLOAD (SIMULATION)</span>
          </button>
          
          <button
            onClick={onToggleWebSocket}
            className={`text-xs font-mono font-bold px-3 py-1.5 rounded-md border transition-all flex items-center gap-1.5 cursor-pointer ${
              wsConnected
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800 hover:bg-emerald-900/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{wsConnected ? 'WS CONNECTED (8765)' : 'CONNECT LOCAL WS'}</span>
          </button>

          <button
            onClick={onExportCSV}
            className="bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono font-bold px-3 py-1.5 rounded-md border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            onClick={onExportPDF}
            className="bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono font-bold px-3 py-1.5 rounded-md border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Top 4 Scannable Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Metric 1: Cluster Name */}
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 sm:p-4 rounded-xl font-mono">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Cluster</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-100 mt-1 truncate" title={telemetry.cluster_name}>
            {telemetry.cluster_name}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Module: {telemetry.module_id}
          </div>
        </div>

        {/* Metric 2: Molding Throughput */}
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 sm:p-4 rounded-xl font-mono">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>Molding Rate</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-cyan-400 mt-0.5">
            {telemetry.injection_molding_throughput_hourly}
            <span className="text-xs font-normal text-slate-400 ml-1.5">units/hr</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">
            Target: 1,500/hr ({(telemetry.injection_molding_throughput_hourly / 15).toFixed(1)}%)
          </div>
        </div>

        {/* Metric 3: SolidWorks PCB API */}
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 sm:p-4 rounded-xl font-mono">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>SolidWorks API</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1 flex items-center gap-1.5 truncate">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{telemetry.pcb_routing_api_status}</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Pick-and-Place SMT Synced
          </div>
        </div>

        {/* Metric 4: Edge Data Center CDU */}
        <div className="bg-slate-900/60 border border-slate-800 p-3.5 sm:p-4 rounded-xl font-mono">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span>Edge DC Liquid Cooling</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-100 mt-0.5">
            18.2°C
            <span className="text-xs font-normal text-emerald-400 ml-1.5">Nominal</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            PUE: 1.14 · 42U Heavy-Duty
          </div>
        </div>

      </div>

      {/* Visualizer Mode Switch Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTelemetryTab('both')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTelemetryTab === 'both'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Dual View (Line Chart & D3 Heatmap)</span>
          </button>

          <button
            onClick={() => setActiveTelemetryTab('heatmap')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTelemetryTab === 'heatmap'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Floor Density Heatmap</span>
          </button>

          <button
            onClick={() => setActiveTelemetryTab('chart')}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTelemetryTab === 'chart'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Hourly Output Graph</span>
          </button>
        </div>

        <div className="text-[10px] font-mono text-slate-500 hidden sm:block">
          D3 Visualizer active · Normalizing against 1,500 target
        </div>
      </div>

      {/* D3 SPATIAL FLOOR HEATMAP VISUALIZER COMPONENT */}
      {(activeTelemetryTab === 'both' || activeTelemetryTab === 'heatmap') && (
        <FloorHeatmapVisualizer
          zones={zones}
          modules={modules}
          currentThroughputRate={telemetry.injection_molding_throughput_hourly}
          onSelectFloor={onSelectFloor}
        />
      )}

      {/* Real-Time Hourly Toy Manufacturing Output Line Graph */}
      {(activeTelemetryTab === 'both' || activeTelemetryTab === 'chart') && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Live Hourly Toy Manufacturing Output (8-Hour Shift)
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-0.5 bg-cyan-400 inline-block"></span>
                <span>Finished Toys (Units/Hr)</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/20">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block border-dashed"></span>
                <span>TARGET: 1,500 UNITS/HR</span>
              </span>
            </div>
          </div>

          {/* Responsive Custom Vector Chart */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="min-w-[600px] h-48 w-full relative">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[300, 600, 900, 1200, 1500, 1800].map((level) => {
                  const y = chartHeight - paddingY - (level / maxVal) * (chartHeight - paddingY * 2);
                  return (
                    <g key={level}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={chartWidth - paddingX}
                        y2={y}
                        stroke="rgba(51, 65, 85, 0.25)"
                        strokeWidth="1"
                        strokeDasharray={level === 1500 ? "4 4" : undefined}
                      />
                      <text
                        x={paddingX - 8}
                        y={y + 3}
                        fill="#64748b"
                        fontSize="9"
                        textAnchor="end"
                        fontFamily="monospace"
                      >
                        {level}
                      </text>
                    </g>
                  );
                })}

                {/* Target Line Highlight (1500 units) */}
                <line
                  x1={paddingX}
                  y1={targetY}
                  x2={chartWidth - paddingX}
                  y2={targetY}
                  stroke="#10b981"
                  strokeWidth="1.2"
                  strokeDasharray="6 4"
                />

                {/* Gradient Area Fill */}
                <path d={areaD} fill="url(#chartAreaGrad)" />

                {/* Smooth Curvature Line */}
                <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="2.5" />

                {/* Data Points with tooltips */}
                {points.map((pt, i) => (
                  <g key={i} className="group cursor-pointer">
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      fill="#22d3ee"
                      stroke="#020617"
                      strokeWidth="1.5"
                      className="transition-transform group-hover:scale-150"
                    />
                    {/* Label on X Axis */}
                    <text
                      x={pt.x}
                      y={chartHeight - 6}
                      fill="#94a3b8"
                      fontSize="9"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {pt.hour}
                    </text>
                    {/* Point Value */}
                    <text
                      x={pt.x}
                      y={pt.y - 8}
                      fill="#e2e8f0"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {pt.val}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* IndiaMART Machinery Import & Sourcing Integration with Asset Verification IDs */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <span>IndiaMART Machinery & Asset Verification Engine</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-2 py-0.5 rounded font-normal">
                  8 ASSET IDs VERIFIED
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-normal">
                Procurement Pipeline, QR Maintenance Handshakes & Port 8765 WebSocket Synced
              </div>
            </div>
          </div>

          {/* Search, Filter & Quick Action Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search equipment, ID, or vendor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 w-44 sm:w-52"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Toy Fabrication">Toy Fabrication</option>
              <option value="Edge DC Server">Edge DC Server</option>
              <option value="Electronics & PCB">Electronics & PCB</option>
              <option value="Sports Mechanics">Sports Mechanics</option>
            </select>

            {/* Quick G-Code Python Script Engine Modal Button */}
            <button
              onClick={() => setShowGcodeModal(true)}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="View Python G-Code Streamer Engine (nc_streamer.py)"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">nc_streamer.py</span>
            </button>

            {/* Simulated Live G-Code Streamer Toggle */}
            <button
              onClick={() => {
                setGcodeStreaming(!gcodeStreaming);
                if (onAppendLog && !gcodeStreaming) {
                  onAppendLog(`[G-CODE STREAM INITIALIZED] Connecting to local toolpath generator on ws://localhost:8765...`);
                }
              }}
              className={`rounded-md px-2.5 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                gcodeStreaming
                  ? 'bg-amber-950/60 text-amber-300 border-amber-600/80 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Stream simulated Cartesian X,Y,Z toolpath coordinates to WebSocket terminal"
            >
              {gcodeStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{gcodeStreaming ? 'STREAMING G-CODE' : 'STREAM G-CODE'}</span>
            </button>
          </div>
        </div>

        {/* Live G-Code Cartesian Coordinate HUD (When Streaming Active) */}
        {gcodeStreaming && (
          <div className="mt-3 p-2.5 bg-slate-950 border border-amber-500/40 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-amber-300 font-bold">
                LIVE CARTESIAN TOOLPATH MATRIX (nc_streamer.py)
              </span>
              <span className="text-slate-500 text-[10px]">Command: {currentCoordinates.cmd}</span>
            </div>
            
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="text-cyan-400">
                X: <strong className="text-slate-100">{currentCoordinates.x.toFixed(3)}</strong> mm
              </span>
              <span className="text-cyan-400">
                Y: <strong className="text-slate-100">{currentCoordinates.y.toFixed(3)}</strong> mm
              </span>
              <span className="text-cyan-400">
                Z: <strong className="text-slate-100">{currentCoordinates.z.toFixed(3)}</strong> mm
              </span>
              <span className="text-slate-400 hidden sm:inline">
                Feed: <strong className="text-emerald-400">{currentCoordinates.feed}</strong> mm/min
              </span>
              <span className="text-slate-400 hidden sm:inline">
                Spindle: <strong className="text-emerald-400">24,000</strong> RPM
              </span>
            </div>
          </div>
        )}

        {/* Table Viewport with Asset Verification QR Codes */}
        <div className="overflow-x-auto no-scrollbar mt-3">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800 text-[10px] uppercase">
                <th className="pb-2">Equipment Type & Zone</th>
                <th className="pb-2">Engineering Specification</th>
                <th className="pb-2">Asset Verification ID & QR Code</th>
                <th className="pb-2">Cost Unit (INR)</th>
                <th className="pb-2">Supplier Location</th>
                <th className="pb-2 text-right">Procurement Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-slate-800/50">
              {filteredProcurement.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-slate-800/30 transition-colors group"
                >
                  {/* Equipment Type & Physical Zone */}
                  <td className="py-2.5 font-semibold text-slate-200">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                      {item.assignedZone} · SN: {item.serialNumber}
                    </div>
                  </td>

                  {/* Engineering Specification */}
                  <td className="py-2.5 text-slate-400 text-[11px] max-w-xs">
                    {item.spec}
                  </td>

                  {/* UNIQUE ASSET VERIFICATION ID & QR SCANNER LINK BUTTON */}
                  <td className="py-2.5 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-cyan-400 font-bold text-[11px] font-mono select-all">
                          {item.assetVerificationId}
                        </span>
                        
                        <button
                          onClick={() => handleOpenQrModal(item)}
                          className="bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60 hover:border-cyan-500 rounded px-2 py-0.5 text-[10px] font-mono font-bold flex items-center gap-1 transition-all shadow-sm cursor-pointer group-hover:scale-105"
                          title="Open High-Res QR Code & Simulate Physical Scanner Link"
                        >
                          <QrCode className="w-3 h-3 text-cyan-400" />
                          <span>QR SCAN</span>
                        </button>
                      </div>

                      {/* Micro health status indicator */}
                      <div className="flex items-center gap-2 text-[9px] text-slate-500">
                        <span className="text-emerald-400 font-semibold">
                          Health: {item.healthScore}%
                        </span>
                        <span>·</span>
                        <span className="text-slate-400">
                          Due: {item.nextScheduled}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Cost Unit */}
                  <td className="py-2.5 text-cyan-300 font-bold whitespace-nowrap">
                    {item.cost}
                  </td>

                  {/* Supplier Location */}
                  <td className="py-2.5 text-slate-400 text-[10px] whitespace-nowrap">
                    {item.supplierLocation}
                  </td>

                  {/* Procurement Status */}
                  <td className="py-2.5 text-right whitespace-nowrap">
                    <span 
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'Ready for PO'
                          ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/50'
                          : item.status === 'Live Sync'
                          ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-800/50'
                          : item.status === 'Customs Transit'
                          ? 'bg-indigo-950/50 text-indigo-300 border border-indigo-800/50'
                          : 'bg-amber-950/50 text-amber-300 border border-amber-800/50'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Banner with Scanner & Maintenance Summary */}
        <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              All {procurementList.length} physical machines are cataloged with ISO 18004 2D cryptographic barcodes linked to Android APK BLE scanner routines.
            </span>
          </div>
          <div className="text-cyan-400 font-semibold">
            Port 8765 Asynchronous Broadcast Stream Active
          </div>
        </div>
      </div>

      {/* Engineering Execution Steps & Live Terminal Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Left: Engineering Execution Steps */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center justify-between">
              <span>📡 System Integration Steps</span>
              <span className="text-[10px] text-cyan-400 font-normal">MOD-ID: {telemetry.module_id}</span>
            </div>
            <ul className="space-y-2">
              {telemetry.engineering_execution_steps.map((step, idx) => (
                <li 
                  key={idx}
                  className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-md flex items-start gap-2.5 hover:border-slate-700 transition-colors"
                >
                  <span className="text-cyan-400 font-bold text-[11px] shrink-0">
                    [0{idx + 1}]
                  </span>
                  <span className="text-slate-300 leading-relaxed text-[11px]">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
            Automated pipeline execution via Python websockets backend daemon (nc_streamer.py on Port 8765).
          </div>
        </div>

        {/* Right: Live Terminal Stream */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 font-mono text-xs flex flex-col">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Raw Python API Stream Terminal (ws://localhost:8765)</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (onAppendLog) {
                    onAppendLog(`[OPTICAL AUDIT TRIGGERED] Handheld scanner scanned all 8 assets. Verification status: 100% NOMINAL.`);
                  }
                }}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 cursor-pointer"
                title="Send test scanner verification audit to terminal"
              >
                Scan Audit Ping
              </button>
              <span className="text-slate-700">·</span>
              <button
                onClick={onClearLogs}
                className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-[220px] max-h-[260px] bg-black border border-slate-800/90 rounded-lg p-3 overflow-y-auto leading-relaxed text-emerald-400 text-[11px] font-mono select-text">
            <pre className="whitespace-pre-wrap font-mono">{terminalLogs}</pre>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
            <span>Status: {wsConnected ? 'LIVE FEED ACTIVE' : gcodeStreaming ? 'G-CODE TOOLPATH STREAMING' : 'STREAM SIMULATION ACTIVE'}</span>
            <span>Port: 8765 · JSON Schema Validated</span>
          </div>
        </div>

      </div>

      {/* Asset QR Code & Physical Scanner Simulation Modal */}
      {isQrModalOpen && selectedQrItem && (
        <AssetQrScannerModal
          item={selectedQrItem}
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          onNavigateItem={handleNavigateQrItem}
          onSimulateScanLog={(msg) => {
            if (onAppendLog) {
              onAppendLog(msg);
            }
          }}
        />
      )}

      {/* Python G-Code Streamer Engine (nc_streamer.py) Code Modal */}
      {showGcodeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowGcodeModal(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl shadow-cyan-950/50 overflow-hidden font-mono text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">
                    nc_streamer.py (Python Script Engine)
                  </h4>
                  <div className="text-[10px] text-slate-400">
                    Real-Time G-Code Cartesian Parser & WebSocket Streamer (ws://localhost:8765)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPythonScript}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  {copiedPythonScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPythonScript ? 'COPIED!' : 'COPY CODE'}</span>
                </button>
                <button
                  onClick={() => setShowGcodeModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 text-[11px] text-slate-300 leading-relaxed">
              यह प्रोडक्शन-रेडी Python स्क्रिप्ट आपके .nc (G-code) फ़ाइल को लाइन-बाय-लाइन रीड करती है, वास्तविक Cartesian (X, Y, Z) कोऑर्डिनेट्स को एक्सट्रेक्ट करती है, और पोर्ट 8765 पर आपके Android मोबाइल ऐप व इस टेलीमेट्री कंसोल पर लाइव स्ट्रीम करती है।
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-black">
              <pre className="text-emerald-400 text-[11px] leading-relaxed whitespace-pre font-mono">
                {NC_STREAMER_PYTHON_SCRIPT}
              </pre>
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>Dependencies: pip install websockets</span>
              <button
                onClick={() => setShowGcodeModal(false)}
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-md cursor-pointer"
              >
                Close Engine
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


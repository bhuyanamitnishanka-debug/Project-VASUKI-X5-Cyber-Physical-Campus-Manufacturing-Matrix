import React from 'react';
import { ViewMode } from '../types/vasuki';
import { 
  Building2, 
  Activity, 
  BookOpen, 
  Coins, 
  Smartphone, 
  FileSpreadsheet, 
  FileText, 
  Zap, 
  Radio,
  Award
} from 'lucide-react';

interface HeaderProps {
  currentMode: ViewMode;
  onSelectMode: (mode: ViewMode) => void;
  wsConnected: boolean;
  onToggleWebSocket: () => void;
  onInjectSimulation: () => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  wsConnected,
  onToggleWebSocket,
  onInjectSimulation,
  onExportCSV,
  onExportPDF
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-4 lg:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Zone 1: Wordmark & Core Lab Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span 
              className={`h-2.5 w-2.5 rounded-full pulse-dot ${wsConnected ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-amber-400'}`}
              title={wsConnected ? 'WebSocket Active (ws://localhost:8765)' : 'Simulated Telemetry Loop Active'}
            />
            <button 
              onClick={() => onSelectMode('campus')} 
              className="text-left group cursor-pointer focus-visible:outline-none"
            >
              <div className="text-sm font-bold tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                PROJECT-VASUKI-X5
                <span className="text-[10px] text-cyan-400/80 font-mono font-normal hidden sm:inline">
                  (2026 CLUSTER)
                </span>
              </div>
              <div className="text-[9px] text-slate-400 font-mono tracking-tight hidden md:block">
                Vasuki-Indicus-Anusandhan-AI-Lab · {wsConnected ? 'PORT 8765 LINKED' : 'AUTO-TELEMETRY STREAM'}
              </div>
            </button>
          </div>
        </div>

        {/* Zone 2: Navigation Modes */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          <button
            onClick={() => onSelectMode('campus')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
              currentMode === 'campus'
                ? 'bg-slate-800 text-cyan-400 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Digital Twin</span>
          </button>

          <button
            onClick={() => onSelectMode('telemetry')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
              currentMode === 'telemetry'
                ? 'bg-slate-800 text-cyan-400 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Telemetry & Heatmap</span>
          </button>

          <button
            onClick={() => onSelectMode('story')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
              currentMode === 'story'
                ? 'bg-slate-800 text-cyan-400 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Story Dialogue</span>
          </button>

          <button
            onClick={() => onSelectMode('capex')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
              currentMode === 'capex'
                ? 'bg-slate-800 text-cyan-400 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>CapEx & ToT</span>
          </button>

          <button
            onClick={() => onSelectMode('apk')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
              currentMode === 'apk'
                ? 'bg-slate-800 text-cyan-400 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>APK Matrix</span>
          </button>

          <button
            onClick={() => onSelectMode('dpiit')}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
              currentMode === 'dpiit'
                ? 'bg-slate-800 text-cyan-400 shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>DPIIT & CNC Hub</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Export Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Simulation Trigger */}
          <button
            onClick={onInjectSimulation}
            title="Inject simulated operational packet into telemetry pipeline"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/50 rounded-md transition-colors cursor-pointer"
          >
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Inject</span>
          </button>

          {/* WebSocket Connect/Disconnect Toggle */}
          <button
            onClick={onToggleWebSocket}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer border ${
              wsConnected
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle connection to local Python websocket server (ws://localhost:8765)"
          >
            <Radio className="w-3 h-3" />
            <span className="hidden sm:inline">{wsConnected ? 'Disconnect' : 'Connect WS'}</span>
            <span className="sm:hidden">{wsConnected ? 'WS' : 'WS'}</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={onExportCSV}
            title="Download CSV operational log file"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3 h-3 text-cyan-400" />
            <span className="hidden lg:inline">CSV</span>
          </button>

          {/* Export PDF */}
          <button
            onClick={onExportPDF}
            title="Download executive architectural PDF report"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors cursor-pointer font-bold"
          >
            <FileText className="w-3 h-3" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>

      </div>
    </header>
  );
};

import React from 'react';
import { ViewMode } from '../types/vasuki';
import { 
  Building2, 
  Activity, 
  BookOpen, 
  Coins, 
  Smartphone, 
  Zap,
  Award 
} from 'lucide-react';

interface MobileHudNavbarProps {
  currentMode: ViewMode;
  onSelectMode: (mode: ViewMode) => void;
  onInjectSimulation: () => void;
}

export const MobileHudNavbar: React.FC<MobileHudNavbarProps> = ({
  currentMode,
  onSelectMode,
  onInjectSimulation
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur border-t border-slate-800 z-50 px-2 py-1.5 flex items-center justify-around font-mono text-[9px]">
      
      <button
        onClick={() => onSelectMode('campus')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded transition-colors cursor-pointer ${
          currentMode === 'campus' ? 'text-cyan-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Building2 className="w-4 h-4" />
        <span>Stack</span>
      </button>

      <button
        onClick={() => onSelectMode('telemetry')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded transition-colors cursor-pointer ${
          currentMode === 'telemetry' ? 'text-cyan-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Activity className="w-4 h-4" />
        <span>Heatmap</span>
      </button>

      <button
        onClick={onInjectSimulation}
        className="flex flex-col items-center gap-0.5 px-1.5 py-1 rounded text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
        title="Inject Simulated Telemetry"
      >
        <Zap className="w-4 h-4 fill-cyan-400/20" />
        <span>Inject</span>
      </button>

      <button
        onClick={() => onSelectMode('story')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded transition-colors cursor-pointer ${
          currentMode === 'story' ? 'text-cyan-400 font-bold' : 'text-slate-400'
        }`}
      >
        <BookOpen className="w-4 h-4" />
        <span>Story</span>
      </button>

      <button
        onClick={() => onSelectMode('capex')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded transition-colors cursor-pointer ${
          currentMode === 'capex' ? 'text-cyan-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Coins className="w-4 h-4" />
        <span>CapEx</span>
      </button>

      <button
        onClick={() => onSelectMode('dpiit')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded transition-colors cursor-pointer ${
          currentMode === 'dpiit' ? 'text-cyan-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Award className="w-4 h-4" />
        <span>DPIIT</span>
      </button>

      <button
        onClick={() => onSelectMode('apk')}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1 rounded transition-colors cursor-pointer ${
          currentMode === 'apk' ? 'text-cyan-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Smartphone className="w-4 h-4" />
        <span>APK</span>
      </button>

    </div>
  );
};

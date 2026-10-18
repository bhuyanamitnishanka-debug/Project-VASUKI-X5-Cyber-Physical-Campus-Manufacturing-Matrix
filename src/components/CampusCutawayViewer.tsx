import React, { useState } from 'react';
import { FloorModule } from '../types/vasuki';
import { 
  Building2, 
  Layers, 
  Cpu, 
  Activity, 
  ChevronRight, 
  Server, 
  Eye, 
  Gauge, 
  ShieldCheck,
  CheckCircle2,
  Box,
  Radio,
  Sliders,
  DollarSign
} from 'lucide-react';

interface CampusCutawayViewerProps {
  modules: FloorModule[];
  selectedFloorId: string;
  onSelectFloor: (floorId: string) => void;
  onNavigateToTelemetry: () => void;
}

export const CampusCutawayViewer: React.FC<CampusCutawayViewerProps> = ({
  modules,
  selectedFloorId,
  onSelectFloor,
  onNavigateToTelemetry
}) => {
  const [viewStyle, setViewStyle] = useState<'isometric' | 'schematic'>('isometric');

  const selectedModule = modules.find((m) => m.id === selectedFloorId) || modules[0];

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Architectural Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>PROJECT-VASUKI-X5</span>
            <span aria-hidden="true">·</span>
            <span>SPATIAL & ENGINEERING MATRIX</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">5-STOREY COMPLEX + INDUSTRIAL ANNEX</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight mt-0.5">
            Campus Architectural Digital Twin
          </h2>
        </div>

        {/* View Mode Segmented Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setViewStyle('isometric')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewStyle === 'isometric'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Isometric Twin</span>
          </button>
          <button
            onClick={() => setViewStyle('schematic')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewStyle === 'schematic'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Structural Matrix</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid: Interactive Campus Graphic on Left, Deep Floor Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Campus Cutaway Interactive Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Multi-Tier Cutaway Model</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                <CheckCircle2 className="w-3 h-3" />
                <span>CAD SYNC: READY</span>
              </span>
            </div>

            {/* Interactive SVG Isometric Campus Canvas */}
            <div className="relative w-full aspect-[16/10] bg-slate-950/90 rounded-lg border border-slate-800/80 overflow-hidden flex items-center justify-center p-3 select-none">
              
              {/* Background Technical Grid lines */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Vector Cutaway Architectural Representation */}
              <svg 
                viewBox="0 0 800 520" 
                className="w-full h-full max-h-[460px] drop-shadow-2xl"
              >
                <defs>
                  {/* Gradients for floors */}
                  <linearGradient id="gradRoof" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gradF4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4338ca" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gradF3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gradF2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gradF1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0891b2" stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="gradGround" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="gradAnnex" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity="0.1" />
                  </linearGradient>
                  {/* Glow filter */}
                  <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Ground Plane & Landscaped Garden Perimeter */}
                <polygon 
                  points="20,440 460,440 780,480 340,480" 
                  fill="#091422" 
                  stroke="#1e293b" 
                  strokeWidth="1.5"
                />

                {/* Skybridge Linking Main Complex to Annex */}
                <polygon 
                  points="420,340 540,340 540,360 420,360" 
                  fill="#06b6d4" 
                  fillOpacity="0.25" 
                  stroke="#06b6d4" 
                  strokeDasharray="3 3"
                />
                <text x="480" y="354" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  SKYBRIDGE LINK
                </text>

                {/* INDUSTRIAL ANNEX (Right Side) */}
                <g 
                  onClick={() => onSelectFloor('industrial-annex')}
                  className="cursor-pointer transition-transform hover:opacity-100"
                  style={{ opacity: selectedFloorId === 'industrial-annex' ? 1 : 0.85 }}
                >
                  {/* Annex Structure Base */}
                  <polygon 
                    points="530,220 740,220 770,390 560,390" 
                    fill="url(#gradAnnex)" 
                    stroke={selectedFloorId === 'industrial-annex' ? '#22d3ee' : '#334155'} 
                    strokeWidth={selectedFloorId === 'industrial-annex' ? '2.5' : '1.5'}
                    filter={selectedFloorId === 'industrial-annex' ? 'url(#cyanGlow)' : undefined}
                  />
                  {/* Roof Glass framing */}
                  <polygon 
                    points="530,220 740,220 710,180 500,180" 
                    fill="#0e7490" 
                    fillOpacity="0.25" 
                    stroke="#22d3ee" 
                    strokeWidth="1"
                  />
                  {/* Robotic Arms / Assembly Line Symbols */}
                  <circle cx="610" cy="300" r="16" fill="#0891b2" fillOpacity="0.4" stroke="#22d3ee" />
                  <path d="M610,300 L640,270 L660,285" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  <circle cx="680" cy="310" r="14" fill="#0891b2" fillOpacity="0.4" stroke="#22d3ee" />
                  <line x1="560" y1="340" x2="740" y2="340" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" />
                  
                  {/* Label */}
                  <rect x="545" y="190" width="180" height="22" rx="4" fill="#020617" stroke="#06b6d4" strokeWidth="1" />
                  <text x="635" y="205" fill="#22d3ee" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    AUTOMATED TOY CLUSTER
                  </text>
                  <text x="635" y="375" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    150-200T Moulding · SMT Lines
                  </text>
                </g>

                {/* 5-STOREY MAIN BUILDING (Left / Center) */}

                {/* ROOFTOP & FLOOR 5 (Buffet + LEO Satellite Array) */}
                <g 
                  onClick={() => onSelectFloor('floor-5')}
                  className="cursor-pointer transition-all hover:opacity-100"
                  style={{ opacity: selectedFloorId === 'floor-5' ? 1 : 0.8 }}
                >
                  <polygon 
                    points="120,40 420,40 450,110 150,110" 
                    fill="url(#gradRoof)" 
                    stroke={selectedFloorId === 'floor-5' ? '#38bdf8' : '#334155'} 
                    strokeWidth={selectedFloorId === 'floor-5' ? '2.5' : '1.5'}
                  />
                  {/* Satellite Dishes on Rooftop */}
                  <circle cx="210" cy="35" r="14" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="210" y1="35" x2="225" y2="20" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="260" cy="35" r="14" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="260" y1="35" x2="275" y2="20" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="310" cy="35" r="14" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="310" y1="35" x2="325" y2="20" stroke="#38bdf8" strokeWidth="2" />
                  {/* Solar Array Grid */}
                  <rect x="350" y="25" width="55" height="18" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="0.8" />
                  
                  <text x="270" y="80" fill="#e0f2fe" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    F5: ROOFTOP LEO ARRAY & BUFFET
                  </text>
                  <text x="270" y="96" fill="#93c5fd" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    Ka/Ku Satellites · High-Bandwidth Core
                  </text>
                </g>

                {/* FLOOR 4 (Fitness & On-Premise Edge Data Center) */}
                <g 
                  onClick={() => onSelectFloor('floor-4')}
                  className="cursor-pointer transition-all hover:opacity-100"
                  style={{ opacity: selectedFloorId === 'floor-4' ? 1 : 0.8 }}
                >
                  <polygon 
                    points="120,110 420,110 450,180 150,180" 
                    fill="url(#gradF4)" 
                    stroke={selectedFloorId === 'floor-4' ? '#818cf8' : '#334155'} 
                    strokeWidth={selectedFloorId === 'floor-4' ? '2.5' : '1.5'}
                  />
                  {/* Server rack icons */}
                  <rect x="165" y="125" width="12" height="36" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                  <rect x="182" y="125" width="12" height="36" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                  <rect x="199" y="125" width="12" height="36" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                  <rect x="216" y="125" width="12" height="36" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                  
                  <text x="325" y="142" fill="#e0e7ff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    F4: GYM & EDGE DATA CENTER
                  </text>
                  <text x="325" y="158" fill="#a5b4fc" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    Direct Liquid Cooling · Load Isolation Slabs
                  </text>
                </g>

                {/* FLOOR 3 (Futsal Pitch & Game Dev Studio) */}
                <g 
                  onClick={() => onSelectFloor('floor-3')}
                  className="cursor-pointer transition-all hover:opacity-100"
                  style={{ opacity: selectedFloorId === 'floor-3' ? 1 : 0.8 }}
                >
                  <polygon 
                    points="120,180 420,180 450,250 150,250" 
                    fill="url(#gradF3)" 
                    stroke={selectedFloorId === 'floor-3' ? '#10b981' : '#334155'} 
                    strokeWidth={selectedFloorId === 'floor-3' ? '2.5' : '1.5'}
                  />
                  {/* Futsal Turf Center circle and lines */}
                  <ellipse cx="220" cy="215" rx="36" ry="16" fill="#065f46" stroke="#34d399" strokeWidth="1" />
                  <line x1="160" y1="215" x2="280" y2="215" stroke="#34d399" strokeWidth="1" />

                  <text x="335" y="212" fill="#ecfdf5" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    F3: INDOOR FUTSAL & GAME DEV
                  </text>
                  <text x="335" y="228" fill="#6ee7b7" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    Synthetic Turf · STC 55 Acoustic Walls · MoCap
                  </text>
                </g>

                {/* FLOOR 2 (Classic Indoor Social Club: Bowling, Billiards, Chess) */}
                <g 
                  onClick={() => onSelectFloor('floor-2')}
                  className="cursor-pointer transition-all hover:opacity-100"
                  style={{ opacity: selectedFloorId === 'floor-2' ? 1 : 0.8 }}
                >
                  <polygon 
                    points="120,250 420,250 450,320 150,320" 
                    fill="url(#gradF2)" 
                    stroke={selectedFloorId === 'floor-2' ? '#f59e0b' : '#334155'} 
                    strokeWidth={selectedFloorId === 'floor-2' ? '2.5' : '1.5'}
                  />
                  {/* Bowling Pinspotter Lane tracks */}
                  <line x1="160" y1="275" x2="230" y2="295" stroke="#fbbf24" strokeWidth="1.5" />
                  <line x1="165" y1="285" x2="235" y2="305" stroke="#fbbf24" strokeWidth="1.5" />
                  {/* Billiard Table */}
                  <rect x="250" y="275" width="28" height="18" fill="#047857" stroke="#fbbf24" strokeWidth="1" rx="2" />

                  <text x="340" y="282" fill="#fef3c7" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    F2: CLASSIC INDOOR CLUB
                  </text>
                  <text x="340" y="298" fill="#fcd34d" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    String Pinspotter Bowling · Billiards · Chess
                  </text>
                </g>

                {/* FLOOR 1 (Avatar Arena: Consoles & Holographic Projection Domes) */}
                <g 
                  onClick={() => onSelectFloor('floor-1')}
                  className="cursor-pointer transition-all hover:opacity-100"
                  style={{ opacity: selectedFloorId === 'floor-1' ? 1 : 0.9 }}
                >
                  <polygon 
                    points="120,320 420,320 450,390 150,390" 
                    fill="url(#gradF1)" 
                    stroke={selectedFloorId === 'floor-1' ? '#22d3ee' : '#0891b2'} 
                    strokeWidth={selectedFloorId === 'floor-1' ? '2.5' : '1.5'}
                    filter={selectedFloorId === 'floor-1' ? 'url(#cyanGlow)' : undefined}
                  />
                  {/* Holographic Projection Domes */}
                  <ellipse cx="200" cy="355" rx="26" ry="16" fill="#0891b2" fillOpacity="0.4" stroke="#22d3ee" strokeWidth="1.5" />
                  <ellipse cx="270" cy="355" rx="26" ry="16" fill="#0891b2" fillOpacity="0.4" stroke="#22d3ee" strokeWidth="1.5" />
                  <path d="M200,340 L200,370 M185,355 L215,355" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2" />

                  <text x="340" y="352" fill="#cffafe" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    F1: THE AVATAR ARENA
                  </text>
                  <text x="340" y="368" fill="#67e8f9" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    PyTorch Face Scanning · 3D Domes · PS Pods
                  </text>
                </g>

                {/* GROUND FLOOR (Biometrics, Lockers, Parking, Gardens) */}
                <g 
                  onClick={() => onSelectFloor('floor-ground')}
                  className="cursor-pointer transition-all hover:opacity-100"
                  style={{ opacity: selectedFloorId === 'floor-ground' ? 1 : 0.8 }}
                >
                  <polygon 
                    points="120,390 420,390 450,460 150,460" 
                    fill="url(#gradGround)" 
                    stroke={selectedFloorId === 'floor-ground' ? '#10b981' : '#334155'} 
                    strokeWidth={selectedFloorId === 'floor-ground' ? '2.5' : '1.5'}
                  />
                  {/* Biometric Gates & EV slots */}
                  <rect x="180" y="410" width="10" height="24" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1" />
                  <rect x="200" y="410" width="10" height="24" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1" />
                  <rect x="220" y="410" width="10" height="24" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1" />

                  <text x="330" y="422" fill="#f1f5f9" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    GROUND: BIOMETRIC RECEPTION & PARKING
                  </text>
                  <text x="330" y="438" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                    Facial Access Turnstiles · Graywater Gardens
                  </text>
                </g>
              </svg>

              {/* Floating Active Floor Pill in Top Right of Canvas */}
              <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded text-right backdrop-blur font-mono">
                <div className="text-[9px] text-slate-400">ACTIVE INSPECTION TARGET</div>
                <div className="text-xs font-bold text-cyan-400">
                  {selectedModule.floorNumber === 'ANNEX' ? 'INDUSTRIAL ANNEX' : `FLOOR ${selectedModule.floorNumber}`}
                </div>
              </div>
            </div>

            {/* Quick Floor Selector Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-1.5 mt-3">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => onSelectFloor(mod.id)}
                  className={`p-1.5 rounded text-center transition-all cursor-pointer font-mono text-[10px] border ${
                    selectedFloorId === mod.id
                      ? 'bg-cyan-950/60 border-cyan-500/80 text-cyan-300 font-bold shadow-sm shadow-cyan-900/30'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="text-[9px] opacity-70">
                    {mod.floorNumber === 'ANNEX' ? 'ANNEX' : `LVL ${mod.floorNumber}`}
                  </div>
                  <div className="truncate font-semibold">
                    {mod.floorNumber === 'ANNEX' ? 'Toy Fab' : mod.name.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex flex-wrap justify-between items-center gap-2">
            <span>Vasuki-Indicus-Anusandhan-AI-Lab · Patent 2026</span>
            <button 
              onClick={onNavigateToTelemetry}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View Real-Time Production Telemetry</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Floor Deep-Dive Inspector (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-full">
            <div>
              {/* Module Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    {selectedModule.category} · {selectedModule.floorNumber === 'ANNEX' ? 'Annex Level' : `Floor ${selectedModule.floorNumber}`}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 tracking-tight mt-0.5">
                    {selectedModule.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedModule.description}
                  </p>
                </div>
              </div>

              {/* CapEx & Budget Indicator */}
              <div className="mt-4 p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 font-mono flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Estimated CapEx Allocation</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">
                    {selectedModule.capexRange}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase">Status</div>
                  <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ENGINEERING APPROVED</span>
                  </div>
                </div>
              </div>

              {/* Engineering Specifications Grid */}
              <div className="mt-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Technical Specifications</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedModule.specs.map((spec, i) => (
                    <div key={i} className="bg-slate-900/80 border border-slate-800/70 p-2.5 rounded-lg font-mono">
                      <div className="text-[9px] text-slate-500 uppercase">{spec.label}</div>
                      <div className="text-xs font-bold text-slate-200 mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Functional Units */}
              <div className="mt-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Integrated Subsystems</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedModule.coreFunctionalUnits.map((unit, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded border border-slate-900">
                      <span className="text-cyan-400 font-mono font-bold text-[10px] mt-0.5">[{`0${i + 1}`}]</span>
                      <span className="leading-snug">{unit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Tech Stack Tags (No garish pills, clean unboxed metadata) */}
              <div className="mt-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Core Tech Stack</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 font-mono">
                  {selectedModule.keyTechStack.map((tech, i) => (
                    <React.Fragment key={i}>
                      <span className="text-slate-300">{tech}</span>
                      {i < selectedModule.keyTechStack.length - 1 && <span className="text-slate-600">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Live Active Sensors Monitor */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-Time Sensor Bus</span>
                  </span>
                  <span className="text-[10px] text-emerald-400">STATUS: NOMINAL</span>
                </div>
                <div className="space-y-1.5 font-mono text-xs">
                  {selectedModule.activeSensors.map((sensor) => (
                    <div 
                      key={sensor.id} 
                      className="flex items-center justify-between p-2 rounded bg-slate-950/70 border border-slate-800/80"
                    >
                      <div>
                        <div className="text-slate-200 text-[11px] font-semibold">{sensor.type}</div>
                        <div className="text-[9px] text-slate-500">{sensor.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-cyan-300 font-bold">{sensor.reading}</div>
                        <div className="text-[9px] text-emerald-400 uppercase">{sensor.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

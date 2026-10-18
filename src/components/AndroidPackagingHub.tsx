import React, { useState } from 'react';
import { ANDROID_CAPACITOR_CONFIG, ANDROID_CORDOVA_CONFIG } from '../data/vasukiData';
import { 
  Smartphone, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  Layers, 
  Activity, 
  Zap, 
  BookOpen, 
  Coins 
} from 'lucide-react';

export const AndroidPackagingHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'capacitor' | 'cordova'>('capacitor');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [checklist, setChecklist] = useState({
    gitignore: true,
    zeroKey: true,
    websocketLocal: true,
    mixedContent: true
  });

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>PROJECT-VASUKI-X5</span>
            <span aria-hidden="true">·</span>
            <span>CUSTOM CONFIGURATION PROFILE</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">ANDROID DEPLOYMENT MATRIX (MIN SDK: 24 / TARGET: 34)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight mt-0.5">
            Android Application Package (.apk) Packaging Console
          </h2>
        </div>

        {/* Framework Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('capacitor')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'capacitor'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Ionic Capacitor (Modern)</span>
          </button>
          <button
            onClick={() => setActiveTab('cordova')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cordova'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Apache Cordova (CLI)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Code / Commands on Left, Mobile Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Configuration Profile & Commands (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Framework Instructions */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-bold uppercase tracking-wider text-slate-200">
                  {activeTab === 'capacitor' 
                    ? '1. Capacitor Workflow & CLI Execution' 
                    : '1. Apache Cordova CLI Compilation'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                Package: com.vasuki.indicus.anusandhan
              </span>
            </div>

            {activeTab === 'capacitor' ? (
              <div className="space-y-3">
                <p className="text-slate-400 leading-relaxed font-sans text-xs">
                  Capacitor acts as a native runtime wrapping your build into an Android Studio project layer without legacy plugin friction.
                </p>

                <div className="bg-black/80 rounded-lg p-3 border border-slate-800 text-[11px] text-emerald-400 space-y-1 overflow-x-auto">
                  <div className="text-slate-500"># 1. Install Capacitor packages & initialize</div>
                  <div>npm install @capacitor/core @capacitor/cli</div>
                  <div>npx cap init "Project VASUKI X5" "com.vasuki.indicus.anusandhan" --web-dir=dist</div>
                  <div className="text-slate-500 mt-2"># 2. Add Android native platform wrapper</div>
                  <div>npm install @capacitor/android</div>
                  <div>npx cap add android</div>
                  <div className="text-slate-500 mt-2"># 3. Build & Sync frontend assets</div>
                  <div>npm run build</div>
                  <div>npx cap sync</div>
                  <div className="text-slate-500 mt-2"># 4. Open in Android Studio & compile release APK</div>
                  <div>npx cap open android</div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-400 leading-relaxed font-sans text-xs">
                  Apache Cordova compiles directly from your command-line interface into an installable debug APK executable.
                </p>

                <div className="bg-black/80 rounded-lg p-3 border border-slate-800 text-[11px] text-emerald-400 space-y-1 overflow-x-auto">
                  <div className="text-slate-500"># 1. Scaffold workspace & add Android platform</div>
                  <div>cordova create vasuki-app com.vasuki.indicus.anusandhan "ProjectVASUKIX5"</div>
                  <div>cd vasuki-app && cordova platform add android</div>
                  <div className="text-slate-500 mt-2"># 2. Ingest build assets & compile debug APK</div>
                  <div>npm run build && cp -r dist/* www/</div>
                  <div>cordova build android --debug</div>
                  <div className="text-slate-500 mt-2"># Target Output Location:</div>
                  <div className="text-cyan-300">platforms/android/app/build/outputs/apk/debug/app-debug.apk</div>
                </div>
              </div>
            )}
          </div>

          {/* Configuration Code File */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="font-bold uppercase tracking-wider text-slate-200">
                {activeTab === 'capacitor' ? 'capacitor.config.json' : 'config.xml'}
              </span>
              <button
                onClick={() => handleCopy(
                  activeTab === 'capacitor' ? ANDROID_CAPACITOR_CONFIG : ANDROID_CORDOVA_CONFIG, 
                  activeTab
                )}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
              >
                {copiedType === activeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-black/90 p-3.5 rounded-lg border border-slate-800/90 max-h-56 overflow-y-auto no-scrollbar text-[11px] text-cyan-300">
              <pre className="whitespace-pre-wrap">
                {activeTab === 'capacitor' ? ANDROID_CAPACITOR_CONFIG : ANDROID_CORDOVA_CONFIG}
              </pre>
            </div>
          </div>

          {/* Security Protocol Checklist */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-200 pb-3 border-b border-slate-800 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Security Protocol Checklist for Public Repositories</span>
            </div>

            <div className="space-y-2.5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.gitignore}
                  onChange={(e) => setChecklist({ ...checklist, gitignore: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300 leading-snug">
                  <strong className="text-slate-100">.gitignore Enforcement:</strong> Ensure /node_modules/, /platforms/, /android/, and .env keys are strictly excluded from commits.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.zeroKey}
                  onChange={(e) => setChecklist({ ...checklist, zeroKey: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300 leading-snug">
                  <strong className="text-slate-100">Zero Key Hardcoding:</strong> No AI Studio production keys or cloud access hashes typed into JavaScript layout.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.websocketLocal}
                  onChange={(e) => setChecklist({ ...checklist, websocketLocal: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300 leading-snug">
                  <strong className="text-slate-100">Local Telemetry Isolation:</strong> WebSockets route to localhost:8765 to keep production servers offline.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.mixedContent}
                  onChange={(e) => setChecklist({ ...checklist, mixedContent: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300 leading-snug">
                  <strong className="text-slate-100">Android Mixed Content Allowed:</strong> Enabled in config profile to permit local WebSocket feeds inside HTTPS app view.
                </span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Android Mobile HUD Interactive Preview (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 self-start">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Android Mobile HUD Preview</span>
          </div>

          {/* Mobile Device Frame */}
          <div className="w-[310px] sm:w-[330px] h-[640px] bg-slate-950 rounded-[38px] p-3 border-4 border-slate-700 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            
            {/* Phone Speaker & Notch */}
            <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700 mr-2" />
              <div className="w-10 h-1 rounded-full bg-slate-700" />
            </div>

            {/* Mobile Screen Content */}
            <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-y-auto no-scrollbar p-3 flex flex-col justify-between font-mono text-[10px]">
              
              {/* Mobile Top Header */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                    <span className="font-bold text-slate-200">VASUKI-X5</span>
                  </div>
                  <span className="text-[8px] text-cyan-400 border border-cyan-800/60 px-1 rounded bg-cyan-950/40">
                    PORT 8765
                  </span>
                </div>

                {/* Mobile Mini Cards */}
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-[8px] text-slate-500">MOLDING/HR</div>
                    <div className="text-xs font-bold text-cyan-400">1,450 units</div>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-[8px] text-slate-500">SOLIDWORKS</div>
                    <div className="text-[9px] font-bold text-emerald-400 truncate">SYNC_ACTIVE</div>
                  </div>
                </div>

                {/* Mobile Building Stack */}
                <div className="space-y-1 text-[9px]">
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between">
                    <span>F5: ROOF & BUFFET</span>
                    <span className="text-cyan-400 font-bold">100%</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between">
                    <span>F4: GYM & EDGE DC</span>
                    <span className="text-cyan-400 font-bold">100%</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between">
                    <span>F3: FUTSAL & DEV</span>
                    <span className="text-cyan-400 font-bold">100%</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between">
                    <span>F2: CLASSIC CLUB</span>
                    <span className="text-cyan-400 font-bold">100%</span>
                  </div>
                  <div className="p-1.5 rounded bg-cyan-950/40 border border-cyan-800/60 flex justify-between text-cyan-300">
                    <span>F1: AVATAR ARENA</span>
                    <span className="font-bold">ACTIVE</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between">
                    <span>ANNEX: TOY FAB</span>
                    <span className="text-emerald-400 font-bold">1500/HR</span>
                  </div>
                </div>

                {/* Mobile Mini Stream */}
                <div className="mt-2 p-2 rounded bg-black border border-slate-800 text-[8px] text-emerald-400 h-20 overflow-hidden font-mono leading-tight">
                  <div>[SYS] Packet verified: ws://localhost:8765</div>
                  <div>[CAD] SolidWorks API routing OK</div>
                  <div>[AI] PyTorch face scan &lt; 12ms</div>
                  <div>[IOT] SMT toy pick-and-place active</div>
                </div>
              </div>

              {/* Mobile Bottom Navigation HUD */}
              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[8px] text-slate-400 px-1">
                <div className="flex flex-col items-center text-cyan-400">
                  <Layers className="w-3 h-3" />
                  <span>Stack</span>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="w-3 h-3" />
                  <span>Metrics</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="w-3 h-3" />
                  <span>Sim</span>
                </div>
                <div className="flex flex-col items-center">
                  <BookOpen className="w-3 h-3" />
                  <span>Story</span>
                </div>
              </div>

            </div>

            {/* Phone Home Indicator Bar */}
            <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto mt-2 shrink-0" />

          </div>
          
          <div className="text-[10px] font-mono text-slate-500 mt-2 text-center">
            Android 14+ / Target SDK 34 / Landscape & Portrait Responsive
          </div>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { CAPEX_BREAKDOWN } from '../data/vasukiData';
import { 
  Coins, 
  Share2, 
  Lock, 
  Globe, 
  Copy, 
  Check, 
  DollarSign, 
  Building2, 
  Cpu, 
  Award, 
  FileCheck 
} from 'lucide-react';

export const CapExInvestorDeck: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const linkedinPosts = [
    {
      title: 'Post 1: The Hook (2017/2018 Vision Meets 2026 Reality)',
      tag: 'Build-in-Public Hook',
      content: `From an entertainment concept envisioned in 2017–2018 to a patent-grade, vertically integrated cyber-physical campus in 2026.

Introducing Project-VASUKI-X5 (VASUKI-INDICUS-SMART-CLUSTER-2026), developed under Vasuki-Indicus-Anusandhan-AI-Lab.

Instead of siloed real estate, we have engineered an uncopiable closed-loop commercial ecosystem:
1️⃣ In-House Game Dev & Edge Data Center (Floor 3 & 4)
2️⃣ Live Avatar Arena with sub-12ms PyTorch 3D Face Mapping (Floor 1)
3️⃣ Automated Smart Toy Manufacturing Cluster (Industrial Annex)

When a player unlocks an avatar skin upstairs, the IoT network triggers the plastic injection moulding and SMT assembly lines downstairs in real time.

Baseline Core Investment: ₹22.5 Cr – ₹33.5 Cr.
Designed for scalable Transfer of Technology (TOT) partnerships across global entertainment & manufacturing consortia.

#CyberPhysical #AIHardware #SmartCampus #GameDev #IndustrialIoT #DeepTech #VentureCapital`
    },
    {
      title: 'Post 2: The Graphic Novel & Engineering Dialogue',
      tag: 'Visual Storytelling Carousel',
      content: `How do you explain a 5-storey cyber-physical campus and automated factory to institutional investors without losing them in 100 pages of text?

You walk them through the dialogue between the Chief Systems Architect and Lead Logistics Engineer.

AMIT: "By anchoring the LEO satellite dish array right next to the Edge Data Center on the roof, we cut out external ISP latency completely. The face recognition nodes on Floor 1 capture a player's expression, map it to a 3D mesh, and project it into our game engine in under 12ms."

ROSA: "And here's the real economic flywheel: the moment a player unlocks a legendary character upstairs, our automated Toy Manufacturing Cluster gets the vector CAD geometries directly via internal IoT. The player picks up a physical smart-chip action figure on their way out."

Architecture details and SolidWorks API layouts now live on our interactive console.

#HardwareEngineering #SmartManufacturing #Robotics #TransferOfTechnology #TechInnovation`
    },
    {
      title: 'Post 3: Executive Engineering Essay & TOT Licensing Kit',
      tag: 'Executive Institutional Pitch',
      content: `Executive Summary: Project-VASUKI-X5 Synthesis & Technology Transfer (TOT) Opportunity.

Vasuki-Indicus-Anusandhan-AI-Lab is opening technical discussions for joint-venture co-founders and institutional infrastructure partners for the Project-VASUKI-X5 master campus.

Key Technical Vectors:
• Total Baseline Core CapEx: ₹22.5 Cr – ₹33.5 Cr (Civil, IT Hardware, Satellite Array, Sports Infrastructure)
• Modular 6-Zone Separation: Civil & Architecture, Industrial Logistics, Telecom & Satellite Network, Core AI & Game Dev, Toy Fabrication Cluster, and Edge Data Center
• Hybrid IP Disclosure Strategy: Public high-level architectural showcase combined with proprietary PyTorch facial tracking pipelines and SolidWorks exploded-to-assembly CAD stored in secure vaults for TOT licensing.

Full engineering matrices, IndiaMART machinery procurement registries, and Capacitor/Cordova mobile console available for private technical briefing.

#Infrastructure #PrivateEquity #AIInfrastructure #SmartCities #TechnologyTransfer`
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const totalMin = CAPEX_BREAKDOWN.reduce((acc, curr) => acc + curr.minCr, 0);
  const totalMax = CAPEX_BREAKDOWN.reduce((acc, curr) => acc + curr.maxCr, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>PROJECT-VASUKI-X5</span>
            <span aria-hidden="true">·</span>
            <span>CAPEX & INSTITUTIONAL INVESTMENT</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">₹22.5 CR – ₹33.5 CR BASELINE</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight mt-0.5">
            Investment Matrix & Transfer of Technology (TOT) Deck
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-800/40 rounded text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>PATENT-GRADE SYNTHESIS</span>
          </span>
        </div>
      </div>

      {/* Top CapEx Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl font-mono">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-cyan-400" />
            <span>Baseline Core Investment</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            ₹{totalMin.toFixed(1)} Cr – ₹{totalMax.toFixed(1)} Cr
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            5-Storey Complex & Integrated Software Stack
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl font-mono">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Civil Superstructure Share</span>
          </div>
          <div className="text-xl font-bold text-cyan-300 mt-1">
            ₹15.0 Cr – ₹20.0 Cr
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Zone IV Seismic, Botanical Gardens, Biometrics
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl font-mono">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>IT Hardware & Manufacturing</span>
          </div>
          <div className="text-xl font-bold text-slate-100 mt-1">
            ₹7.5 Cr – ₹13.5 Cr
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Edge DC, Domes, Toy Moulding & SMT Assembly
          </div>
        </div>

      </div>

      {/* Detailed CapEx Breakdown Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <span className="font-bold uppercase tracking-wider text-slate-300">
            Spatial & Engineering CapEx Matrix (INR)
          </span>
          <span className="text-[10px] text-slate-500">
            Excludes industrial toy machinery expansion tier
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800 text-[10px] uppercase">
                <th className="pb-2">Zone / Floor Unit</th>
                <th className="pb-2">CapEx Range (INR)</th>
                <th className="pb-2">Approx Share</th>
                <th className="pb-2">Key Engineering Deliverables</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-slate-800/40">
              {CAPEX_BREAKDOWN.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3">
                    <div className="font-bold text-slate-200">{item.category}</div>
                    <div className="text-[10px] text-cyan-400">{item.zone}</div>
                  </td>
                  <td className="py-3 font-bold text-cyan-300 whitespace-nowrap">
                    ₹{item.minCr.toFixed(1)} Cr – ₹{item.maxCr.toFixed(1)} Cr
                  </td>
                  <td className="py-3 text-slate-400 whitespace-nowrap">
                    {item.pct}%
                  </td>
                  <td className="py-3 text-slate-400 text-[11px] leading-relaxed">
                    {item.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hybrid IP Disclosure Strategy & TOT Licensing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-xs mb-3">
              <Globe className="w-4 h-4" />
              <span>Public Showcase Strategy (LinkedIn)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              High-level architectural dashboards, 3D cutaway renders, and economic flywheel concepts are published publicly on LinkedIn to attract:
            </p>
            <ul className="mt-3 space-y-1.5 text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Institutional Real Estate & Infra Investors</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Technical Co-Founders & Core Vision Engineers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                <span>IndiaMART Machinery & Supply Chain Partners</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
            Attracts inbound capital while safeguarding proprietary IP.
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-xs mb-3">
              <Lock className="w-4 h-4" />
              <span>Private Vault & TOT Licensing (GitHub)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Core intellectual property remains protected in private git repositories for future Transfer of Technology (TOT) licensing contracts:
            </p>
            <ul className="mt-3 space-y-1.5 text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-amber-400">🔒</span>
                <span>PyTorch 468-point 3D Face Landmark Inference Code</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">🔒</span>
                <span>SolidWorks / AutoCAD Exploded Assembly CAD Blueprints</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">🔒</span>
                <span>Embedded C++ Firmware for Smart-Toy Microchips</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500">
            Protected under intellectual property Non-Disclosure Agreements (NDAs).
          </div>
        </div>

      </div>

      {/* LinkedIn Post Copy Generator */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <div>
              <h3 className="font-bold text-sm text-slate-100">
                LinkedIn Investor Outreach & Build-in-Public Post Generator
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Pre-formatted technical copy engineered to attract funding and talent
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {linkedinPosts.map((post, idx) => (
            <div 
              key={idx}
              className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    {post.tag}
                  </span>
                  <button
                    onClick={() => handleCopy(post.content, idx)}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                    title="Copy post content to clipboard"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[10px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xs font-bold text-slate-200 mb-2">
                  {post.title}
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed font-sans max-h-48 overflow-y-auto no-scrollbar whitespace-pre-line bg-slate-900/40 p-2.5 rounded border border-slate-900">
                  {post.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

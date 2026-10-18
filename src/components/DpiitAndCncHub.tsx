import React, { useState } from 'react';
import { CNC_VBA_SCRIPT } from '../data/vasukiData';
import { 
  FileCheck, 
  Cpu, 
  Terminal, 
  Copy, 
  Check, 
  Award, 
  Building2, 
  Layers, 
  Mic, 
  Mail, 
  Sliders, 
  Code2, 
  ExternalLink 
} from 'lucide-react';

export const DpiitAndCncHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'dpiit' | 'cnc' | 'coverletter' | 'slides'>('dpiit');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const dpiitBudget = [
    { id: 'VASUKI-CIVIL-01', layer: '5-Storey Superstructure Construction, Smart Exterior Gardens, Vibration Damping Isolators', cost: '₹18,50,00,000' },
    { id: 'VASUKI-COMPUTE-02', layer: 'Tier-3 In-House Data Center, Server Racks, Liquid-Cooling HVAC, Rooftop Satellite Antenna Array', cost: '₹4,20,00,000' },
    { id: 'VASUKI-FAB-03', layer: 'Toy Manufacturing Cluster, Automatic Injection Molding Machines, Pick-and-Place SMT Lines', cost: '₹3,80,00,000' },
    { id: 'VASUKI-SPORTS-04', layer: 'Commercial Gym Gear, Automatic Bowling Lanes, Futsal Turf, Billiard Tables, Chess Infrastructure', cost: '₹2,50,00,000' },
    { id: 'VASUKI-SOFTWARE-05', layer: 'PyTorch Face Recognition API Dev, 3D Avatar Rendering, Google AI Studio Workspace Sync', cost: '₹1,00,00,000' }
  ];

  const formalCoverLetter = `[Your Full Name: Amit Nishanka Bhuyan]
[Your Location: Salipur, Odisha, India]
[Your Professional Portfolio: github.com/bhuyanamitnishanka-debug]
Date: October 19, 2026

To,
The Talent Acquisition Team / Technical Hiring Committee
Target: AI Infrastructure Engineer / Systems Architect / Robotics Coordinator Role

Dear Hiring Committee,

I am writing to formally express my interest in joining your advanced engineering division. As an independent AI Systems Designer and Infrastructure Specialist, I focus on bridging advanced software runtime layers with physical infrastructure, high-density computing topologies, and factory automation setups.

Recently, I engineered and executed a complete end-to-end cyber-physical architecture concept under Project-VASUKI-X5 at the Vasuki-Indicus-Anusandhan-AI-Lab. This project showcases my capability to design, deploy, and package multi-layered industrial software and hardware architectures:

• Cross-Platform Android Mobile Package Deployment: Successfully compiled and containerized an active web UI telemetry console into a production-grade, hardware-accelerated Android application package (.apk) using Ionic Capacitor targeting SDK 34 parameters.
• Low-Latency Asynchronous Telemetry Pipelines: Engineered a data-binding engine streaming high-throughput, structured JSON data packets locally via asynchronous WebSocket connections (ws://localhost:8765), eliminating network bottlenecks and ensuring real-time UI rendering.
• 3D CAD & Supply Chain Integration: Developed simulation frameworks utilizing custom canvas-graphing time-series trends synchronized alongside procurement databases for verified machinery sourcing via IndiaMART.
• AI-Driven Edge Compute Architectures: Modeled multi-storey facility architectures incorporating dedicated Tier-3 edge data centers, Low-Earth Orbit (LEO) satellite antenna routing networks, and PyTorch computer vision pipelines for real-time tracking operations.

I approach engineering challenges with a firm belief in building practical, uncopiable capabilities rather than relying solely on standard textbooks. My technical workflows are managed via strict environment security separation inside Google AI Studio, keeping all core execution keys, backend configurations, and sensitive parameters fully secure within containerized runtime environments and private repositories.

Thank you for your time, consideration, and review of my technical profile. I welcome the opportunity to connect for a live presentation of my technical frameworks and portfolio code architectures.

Sincerely,
Amit Nishanka Bhuyan
Lead AI Researcher & Project Coordinator
Vasuki-Indicus-Anusandhan-AI-Lab
Salipur, Odisha, India`;

  const coverEmail = `Subject: Project Submission: Project-VASUKI-X5 AI Infrastructure & Manufacturing Blueprint – Vasuki-Indicus-Anusandhan-AI-Lab

Dear Sir/Madam,

I am formally submitting the comprehensive project documentation and technical proposal for Project-VASUKI-X5, developed by the Vasuki-Indicus-Anusandhan-AI-Lab under the leadership of Principal Architect Amit Nishanka Bhuyan.

Project-VASUKI-X5 introduces a proprietary, vertically integrated 5-storey cyber-physical engine that bridges edge computing nodes with an automated discrete toy manufacturing cluster. The architecture resolves legacy bandwidth latencies and supply-chain gaps through an in-house Tier-3 data center and a secure asynchronous WebSocket telemetry pipeline (ws://localhost:8765), ensuring sub-15ms processing bounds for real-time 3D avatar rendering and instant physical product fabrication.

Key Technical and Financial Highlights:
• Native Cross-Platform Deployment: System interfaces are fully containerized and verified as an installable Android mobile package (app-debug.apk) utilizing Ionic Capacitor (Target SDK 34 parameters).
• Industrial Supply Chain Optimization: Component fabrication lines and SolidWorks/AutoCAD API design rules are directly mapped alongside verified equipment procurement channels via IndiaMART.
• Capital Sizing & Commercial Model: The framework is structured under a defined enterprise capital requirement of ₹30 Crores. Our core business roadmap focuses on system design research, rapid simulation prototyping, and eventual high-yield Transfer of Technology (ToT).

We have attached the complete DPIIT Declaration Abstract and the structured README.md technical specification file for your official evaluation. The complete simulation repository and verified data files are secured within our private workspace (bhuyanamitnishanka-debug).

Sincerely,
Amit Nishanka Bhuyan
Lead AI Researcher & Project Coordinator
Vasuki-Indicus-Anusandhan-AI-Lab
Salipur, Odisha, India`;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>PROJECT-VASUKI-X5</span>
            <span aria-hidden="true">·</span>
            <span>STATUTORY & ENGINEERING ARCHITECTURE</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">DPIIT STARTUP INDIA & CNC AUTOMATION</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight mt-0.5">
            DPIIT Declaration, CNC Prototyping & Recruiter Pitch Kit
          </h2>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setActiveSection('dpiit')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'dpiit'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>DPIIT Startup India (₹30 Cr)</span>
          </button>

          <button
            onClick={() => setActiveSection('cnc')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'cnc'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>CNC G-Code Generator</span>
          </button>

          <button
            onClick={() => setActiveSection('coverletter')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'coverletter'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Formal Cover Letter & DMs</span>
          </button>

          <button
            onClick={() => setActiveSection('slides')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'slides'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>5-Slide Interview Scripts (Hindi/Eng)</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: DPIIT STARTUP INDIA DECLARATION & README */}
      {activeSection === 'dpiit' && (
        <div className="space-y-5">
          
          {/* Statutory Identification Strip */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>DPIIT Startup India Official Declaration Profile</span>
              </span>
              <span className="text-[10px] text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded bg-emerald-950/40 font-bold">
                RECOGNITION ELIGIBLE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] mb-4">
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">Entity Name</span>
                <span className="text-slate-100 font-bold">Vasuki-Indicus-Anusandhan-AI-Lab</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">Principal Architect</span>
                <span className="text-cyan-300 font-bold">Amit Nishanka Bhuyan (Salipur, Odisha)</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">Sector Classification</span>
                <span className="text-slate-100 font-bold">Industrial IoT, Advanced Manufacturing & Cyber-Physical Media</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase">Total Estimated Project Capital</span>
                <span className="text-emerald-400 font-bold">₹30,00,00,000 (INR 30 Crores)</span>
              </div>
            </div>

            {/* Financial Budget Allocation Table */}
            <div className="mt-3">
              <div className="font-bold text-slate-300 uppercase text-[10px] mb-2">
                Micro-Estimated Enterprise Capital Allocation:
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[550px]">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-800 text-[10px] uppercase">
                      <th className="pb-2">Module ID</th>
                      <th className="pb-2">Architectural Layer & Resource Mapping</th>
                      <th className="pb-2 text-right">Estimated Budget (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-slate-300 text-[11px]">
                    {dpiitBudget.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-800/30">
                        <td className="py-2 text-cyan-400 font-bold">{row.id}</td>
                        <td className="py-2 text-slate-300 text-[11px]">{row.layer}</td>
                        <td className="py-2 text-right text-emerald-400 font-bold whitespace-nowrap">{row.cost}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-700 bg-slate-950 font-bold text-slate-100">
                      <td className="py-2.5 text-cyan-300" colSpan={2}>TOTAL ESTIMATED ENTERPRISE DEPLOYMENT</td>
                      <td className="py-2.5 text-right text-emerald-400 text-sm">₹30,00,00,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Transfer of Technology (ToT) Manifest */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
            <div className="font-bold uppercase tracking-wider text-slate-200 pb-3 border-b border-slate-800 mb-3 flex items-center justify-between">
              <span>Transfer of Technology (ToT) Terms & Sovereign Compliance</span>
              <button
                onClick={() => handleCopy(`Lump-Sum ToT Fee: ₹100 Crores\nLifetime Royalties: 3.5% Gross Revenue\nSovereign Clause: Private & Restricted from West/China`, 'tot')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'tot' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy Terms</span>
              </button>
            </div>

            <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <strong className="text-cyan-300 block mb-1">1. Lump-Sum Technology Transfer Fee:</strong>
                Set at a baseline of ₹100 Crores for exclusive regional implementation licenses across sovereign industrial zones.
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <strong className="text-cyan-300 block mb-1">2. Lifetime Royalties:</strong>
                Continuous 3.5% gross revenue royalty stream on all manufactured smart-toy product distributions and console ticketing channels.
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <strong className="text-cyan-300 block mb-1">3. Core Sovereign Clause:</strong>
                In accordance with laboratory ethics and national security protocols, this technology framework shall remain private and restricted from any transfer, monitoring, or deployment access to entities operating within or affiliated with the West or China.
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: CNC AUTOMATION & G-CODE GENERATOR */}
      {activeSection === 'cnc' && (
        <div className="space-y-5">
          
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-200 block">
                  CNC Automation Node: API-Driven G-Code Generation & Prototyping
                </span>
                <span className="text-[10px] text-slate-500">
                  SolidWorks / AutoCAD VBA Macro Toolpath Extraction (Module 5)
                </span>
              </div>
              <button
                onClick={() => handleCopy(CNC_VBA_SCRIPT, 'vba')}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-xs flex items-center gap-1.5 cursor-pointer font-bold"
              >
                {copiedKey === 'vba' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'vba' ? 'Copied VBA' : 'Copy VBA Script'}</span>
              </button>
            </div>

            <p className="text-slate-400 leading-relaxed font-sans text-xs mb-3">
              Rather than using manual CAM slicing software, the laboratory engineered an automated pipeline utilizing programmatic interfaces to extract boundary coordinate matrices directly from active CAD sketches into a formatted G-code (.NC) file.
            </p>

            {/* CNC Operating Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Spindle Speed</div>
                <div className="text-xs font-bold text-cyan-400 mt-0.5">S2400 (2400 RPM)</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Feed Rate Transition</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5">F300 mm/min</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Linear Plunge Feed</div>
                <div className="text-xs font-bold text-amber-400 mt-0.5">F150 (Z-1.5mm step)</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase">Substrate Material</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">High-Density Tooling Foam</div>
              </div>
            </div>

            {/* VBA Macro Code Viewport */}
            <div className="bg-black/90 p-4 rounded-lg border border-slate-800 text-[11px] text-cyan-300 max-h-72 overflow-y-auto no-scrollbar">
              <pre className="whitespace-pre-wrap font-mono">{CNC_VBA_SCRIPT}</pre>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 3: FORMAL COVER LETTER & RECRUITER PITCH KIT */}
      {activeSection === 'coverletter' && (
        <div className="space-y-5">
          
          {/* Cover Letter */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-200 block">
                  Formal Cover Letter: Amit Nishanka Bhuyan
                </span>
                <span className="text-[10px] text-slate-500">
                  Tailored for Google, Nvidia, Amazon, Intel, Qualcomm, Tata, and Safran
                </span>
              </div>
              <button
                onClick={() => handleCopy(formalCoverLetter, 'letter')}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-xs flex items-center gap-1.5 cursor-pointer font-bold"
              >
                {copiedKey === 'letter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'letter' ? 'Copied Letter' : 'Copy Cover Letter'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 font-sans leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto no-scrollbar">
              {formalCoverLetter}
            </div>
          </div>

          {/* Institutional Submission Email */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-200 block">
                  Institutional Submission & Investor Pitch Email
                </span>
                <span className="text-[10px] text-slate-500">
                  Ready for official inbox dispatch to DPIIT evaluators or private equity leads
                </span>
              </div>
              <button
                onClick={() => handleCopy(coverEmail, 'email')}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-xs flex items-center gap-1.5 cursor-pointer font-bold"
              >
                {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'email' ? 'Copied Email' : 'Copy Email Draft'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 font-sans leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto no-scrollbar">
              {coverEmail}
            </div>
          </div>

        </div>
      )}

      {/* SECTION 4: 5-SLIDE INTERVIEW SPOKEN SCRIPTS (HINDI & ENGLISH) */}
      {activeSection === 'slides' && (
        <div className="space-y-4">
          
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 font-mono text-xs">
            <div className="font-bold uppercase tracking-wider text-slate-200 pb-3 border-b border-slate-800 mb-4">
              5-Slide Presentation Spoken Scripts for Technical Interviews
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Slide 2 Script */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/90 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">
                    Slide 2: Android Capacitor Engine Build
                  </div>
                  <div className="text-slate-100 font-bold text-xs mb-2">
                    🎙️ Native Mobile Architecture Script
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-900/50 p-3 rounded border border-slate-800">
                    "इस मॉड्यूल में, मैंने Vasuki-Indicus-Anusandhan-AI-Lab के कोर सिस्टम कंसोल और डैशबोर्ड को एक पूरी तरह से फंक्शनल, इंस्टॉलेबल Android Application Package यानी APK में बदला है।
                    <br/><br/>
                    इंजीनियरिंग अप्रोच: Ionic Capacitor के मॉडर्न रनटाइम का उपयोग किया गया है जो Android SDK 34 (Android 14+) को पूरी तरह सपोर्ट करता है। डेटा फ्लो:
                    Static UI Web Assets ──&gt; Staged in 'www/' ──&gt; Bound via Capacitor Bridge (com.vasuki.indicus.anusandhan) ──&gt; Hardware-accelerated app-debug.apk
                    <br/><br/>
                    सिक्योरिटी: Zero Key Hardcoding का नियम फॉलो किया गया है; सभी क्रेडेंशियल्स लोकल सिस्टम एनवायरनमेंट वेरिएबल्स में कंटेनराइज्ड हैं।"
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`Slide 2 Script:\n"इस मॉड्यूल में, मैंने Vasuki-Indicus-Anusandhan-AI-Lab के कोर सिस्टम कंसोल और डैशबोर्ड को एक पूरी तरह से फंक्शनल, इंस्टॉलेबल Android APK में बदला है..."`, 's2')}
                  className="mt-3 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  {copiedKey === 's2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Slide 2 Script</span>
                </button>
              </div>

              {/* Slide 3 Script */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/90 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">
                    Slide 3: WebSocket Telemetry Pipeline
                  </div>
                  <div className="text-slate-100 font-bold text-xs mb-2">
                    🎙️ Asynchronous Localized Telemetry Script
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-900/50 p-3 rounded border border-slate-800">
                    "यह पूरे प्रोजेक्ट का नर्वस सिस्टम है - 'लोकल एसिंक्रोनस वेबसॉकेट टेलीमेट्री पाइपलाइन'।
                    <br/><br/>
                    रियल-टाइम 3D अवतार और गेमिंग ज़ोन के लिए लेटेंसी सबसे बड़ी चुनौती होती है। हमारा आर्किटेक्चर लोकल पोर्ट ws://localhost:8765 पर रन करता है, जिससे किसी भी बाहरी रीजनल इंटरनेट पर निर्भरता नहीं रहती और सब-15ms लेटेंसी सुनिश्चित होती है।
                    <br/><br/>
                    डेटा फ्लो: Local Camera ──&gt; PyTorch Computer Vision ──&gt; Structured JSON Packet ──&gt; WebSocket Port 8765 ──&gt; Real-Time 3D Avatar Rendering inside Game Engine."
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`Slide 3 Script:\n"यह पूरे प्रोजेक्ट का नर्वस सिस्टम है - लोकल एसिंक्रोनस वेबसॉकेट टेलीमेट्री पाइपलाइन..."`, 's3')}
                  className="mt-3 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  {copiedKey === 's3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Slide 3 Script</span>
                </button>
              </div>

              {/* Slide 4 Script */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/90 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">
                    Slide 4: IndiaMART Supply-Chain Integration
                  </div>
                  <div className="text-slate-100 font-bold text-xs mb-2">
                    🎙️ Industrial Supply-Chain Synthesis
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-900/50 p-3 rounded border border-slate-800">
                    "जैसे ही फ्लोर 1 पर कोई खिलाड़ी कोई प्रीमियम इन-गेम एसेट या कैरेक्टर स्किन अनलॉक करता है, हमारा सिस्टम रियल-टाइम में डेटा प्रोसेस करता है:
                    Digital In-game Unlock ──&gt; Automated Production Signal ──&gt; SMT & Injection Molding ──&gt; Physical Smart Toy Manufactured.
                    <br/><br/>
                    सप्लाई चेन: IndiaMART वेरीफाइड वेंडर्स के डेटाबेस और स्पेसिफिकेशन्स को सीधे आर्किटेक्चर में मैप किया गया है। Chart.js कैनवास ग्राफिक्स के जरिए हम 1,500 यूनिट्स प्रति घंटे की थ्रूपुट कैपेसिटी लाइव ट्रैक करते हैं।"
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`Slide 4 Script:\n"जैसे ही फ्लोर 1 पर कोई खिलाड़ी कोई प्रीमियम इन-गेम एसेट या कैरेक्टर स्किन अनलॉक करता है..."`, 's4')}
                  className="mt-3 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  {copiedKey === 's4' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Slide 4 Script</span>
                </button>
              </div>

              {/* Slide 5 Script */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/90 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1">
                    Slide 5: Edge Data Center & HVAC Cooling Layout
                  </div>
                  <div className="text-slate-100 font-bold text-xs mb-2">
                    🎙️ Edge Compute & Thermal Control
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-900/50 p-3 rounded border border-slate-800">
                    "प्रोजेक्ट-VASUKI-X5 के भारी कंप्यूटेशनल लोड्स और PyTorch विज़न पाइपलाइन्स को चलाने के लिए बिल्डिंग के टॉप फ्लोर पर एक समर्पित Tier-3 एज डेटा सेंटर स्थापित किया गया है।
                    <br/><br/>
                    वाइब्रेशन आइसोलेशन: फ्लोर 3 और 4 पर डैम्पिंग पैड्स लगाए गए हैं ताकि जिम और स्पोर्ट्स से आने वाले वाइब्रेशन सर्वर रैक्स को नुकसान न पहुँचाएँ।
                    <br/><br/>
                    नेटवर्क बैकबोन: Rooftop LEO Satellite Antenna Array ──&gt; Dedicated Redundant Downlink ──&gt; Tier-3 Server Racks ──&gt; Zero Bottleneck Cloud Seeding & Local Telemetry."
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`Slide 5 Script:\n"प्रोजेक्ट-VASUKI-X5 के भारी कंप्यूटेशनल लोड्स और PyTorch विज़न पाइपलाइन्स को चलाने के लिए..."`, 's5')}
                  className="mt-3 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  {copiedKey === 's5' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Slide 5 Script</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

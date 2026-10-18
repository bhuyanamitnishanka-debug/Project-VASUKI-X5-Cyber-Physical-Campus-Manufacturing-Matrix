import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { IndiaMartItem, AssetMaintenanceLog } from '../types/vasuki';
import { 
  QrCode, 
  Scan, 
  CheckCircle2, 
  Copy, 
  Check, 
  X, 
  Wrench, 
  Calendar, 
  UserCheck, 
  MapPin, 
  ShieldCheck, 
  Radio, 
  ArrowLeft, 
  ArrowRight, 
  Printer, 
  Sparkles,
  AlertTriangle,
  Activity,
  Layers
} from 'lucide-react';

interface AssetQrScannerModalProps {
  item: IndiaMartItem;
  isOpen: boolean;
  onClose: () => void;
  onNavigateItem?: (direction: 'prev' | 'next') => void;
  onSimulateScanLog?: (logMessage: string) => void;
}

export const AssetQrScannerModal: React.FC<AssetQrScannerModalProps> = ({
  item,
  isOpen,
  onClose,
  onNavigateItem,
  onSimulateScanLog
}) => {
  const [copied, setCopied] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'qr' | 'payload' | 'history'>('qr');
  const [localHistory, setLocalHistory] = useState<AssetMaintenanceLog[]>(item.maintenanceHistory || []);
  const [lastScannedTimestamp, setLastScannedTimestamp] = useState<string | null>(null);

  // Sync history when item changes
  useEffect(() => {
    setLocalHistory(item.maintenanceHistory || []);
    setScanSuccess(false);
    setScanning(false);
  }, [item.id, item.maintenanceHistory]);

  if (!isOpen) return null;

  // Formatted JSON payload encoded in the QR code
  const qrPayload = JSON.stringify({
    asset_id: item.assetVerificationId,
    serial: item.serialNumber,
    equipment: item.name,
    category: item.category,
    cost: item.cost,
    zone: item.assignedZone,
    lab: "Vasuki-Indicus-Anusandhan-AI-Lab",
    lead_architect: "Amit Nishanka Bhuyan",
    telemetry_port: 8765,
    health_score: item.healthScore,
    status: item.maintenanceStatus,
    verify_url: `https://vasuki-cluster.internal/assets/${item.assetVerificationId}/inspect`
  }, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.assetVerificationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateScannerLink = () => {
    if (scanning) return;
    setScanning(true);
    setScanSuccess(false);

    // Realistic optical scan cycle
    setTimeout(() => {
      setScanning(false);
      setScanSuccess(true);
      const now = new Date();
      const timestampStr = `${now.toISOString().replace('T', ' ').substring(0, 19)} IST`;
      setLastScannedTimestamp(timestampStr);

      const generatedHash = `SHA256:${Math.random().toString(16).substring(2, 10).toUpperCase()}${Math.random().toString(16).substring(2, 8).toUpperCase()}`;

      const newLogEntry: AssetMaintenanceLog = {
        id: `LOG-SCAN-${Date.now().toString().slice(-4)}`,
        timestamp: timestampStr,
        technician: 'Amit Nishanka Bhuyan (Lead AI)',
        action: 'Optical Laser Handshake Verification: Android APK Capacitor Scanner Linked',
        scannerType: 'Zebra TC58 / Android APK Optical Scanner (ws://localhost:8765)',
        verificationHash: generatedHash,
        status: 'passed'
      };

      setLocalHistory((prev) => [newLogEntry, ...prev]);

      if (onSimulateScanLog) {
        onSimulateScanLog(
          `[OPTICAL SCANNER SYNC] Machine: ${item.name} | ID: ${item.assetVerificationId} | Zone: ${item.assignedZone} | Status: VERIFIED OK | Hash: ${generatedHash}`
        );
      }
    }, 1300);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-950/40 overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  PROJECT-VASUKI-X5 · ASSET VERIFICATION
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded">
                  PORT 8765 SYNCED
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100 truncate max-w-sm sm:max-w-md">
                {item.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateItem && (
              <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                <button
                  onClick={() => onNavigateItem('prev')}
                  className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                  title="Previous Machine"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigateItem('next')}
                  className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                  title="Next Machine"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'qr'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Digital QR Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'history'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Maintenance Logs ({localHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payload')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'payload'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>JSON Tag Payload</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* TAB 1: QR CODE & SCANNER SIMULATION */}
          {activeTab === 'qr' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Left Column: Interactive QR Code Box */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative group bg-slate-950 p-4 rounded-2xl border-2 border-cyan-500/30 shadow-lg shadow-cyan-950/50 flex flex-col items-center">
                  
                  {/* Optical Scanner Laser Animation */}
                  {scanning && (
                    <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden z-20">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse absolute top-0 left-0 transition-all duration-300 transform animate-bounce" />
                      <div className="absolute inset-0 bg-cyan-500/10 backdrop-brightness-125" />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-cyan-950 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/50 flex items-center gap-1 whitespace-nowrap">
                        <Activity className="w-3 h-3 animate-spin" />
                        <span>OPTICAL BEAM RESOLVING...</span>
                      </div>
                    </div>
                  )}

                  {/* QR Code Container */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <QRCodeSVG
                      value={qrPayload}
                      size={180}
                      level="H"
                      includeMargin={true}
                      bgColor="#020617"
                      fgColor="#22d3ee"
                      imageSettings={{
                        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230891b2'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E",
                        x: undefined,
                        y: undefined,
                        height: 28,
                        width: 28,
                        excavate: true,
                      }}
                    />
                  </div>

                  {/* Machine ID Tag */}
                  <div className="mt-2.5 text-center">
                    <div className="text-[11px] font-mono text-cyan-400 font-bold tracking-wider">
                      {item.id} · {item.serialNumber}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 mt-0.5">
                      ISO/IEC 18004 COMPLIANT 2D MATRIX
                    </div>
                  </div>
                </div>

                {/* Scan Status Badge */}
                {scanSuccess && (
                  <div className="mt-3 w-full p-2 bg-emerald-950/60 border border-emerald-700/60 rounded-xl text-center flex items-center justify-center gap-1.5 text-emerald-300 text-xs font-mono animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>OPTICAL LINK VERIFIED (HASH VALIDATED)</span>
                  </div>
                )}
              </div>

              {/* Right Column: Machine Specifications & Scanner Action */}
              <div className="md:col-span-7 space-y-4 font-mono text-xs">
                
                {/* Asset Verification ID Box */}
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center justify-between">
                    <span>Unique Asset Verification ID</span>
                    <span className="text-cyan-400 font-semibold">CAMPUS REGISTERED</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="text-sm font-bold text-cyan-300 select-all tracking-wider">
                      {item.assetVerificationId}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      title="Copy Verification ID"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* Machine Metadata Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 bg-slate-950/50 border border-slate-800/80 rounded-lg">
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>Physical Zone</span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-200 mt-0.5 truncate" title={item.assignedZone}>
                      {item.assignedZone}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950/50 border border-slate-800/80 rounded-lg">
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-cyan-400" />
                      <span>Lead Technician</span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-200 mt-0.5 truncate" title={item.assignedTechnician}>
                      {item.assignedTechnician}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950/50 border border-slate-800/80 rounded-lg">
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-cyan-400" />
                      <span>Operational Health</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${item.healthScore}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400">
                        {item.healthScore}%
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950/50 border border-slate-800/80 rounded-lg">
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>Next Calibration</span>
                    </div>
                    <div className="text-[11px] font-semibold text-amber-300 mt-0.5">
                      {item.nextScheduled}
                    </div>
                  </div>
                </div>

                {/* Machine Spec */}
                <div className="p-2.5 bg-slate-950/40 border border-slate-800/60 rounded-lg text-slate-400 text-[11px] leading-relaxed">
                  <span className="text-slate-300 font-semibold">Technical Spec: </span>
                  {item.spec}
                </div>

                {/* Primary Action Button: Simulate Physical Scanner Link */}
                <div className="pt-2">
                  <button
                    onClick={handleSimulateScannerLink}
                    disabled={scanning}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                      scanning
                        ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500 cursor-wait'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 active:scale-[0.99]'
                    }`}
                  >
                    <Scan className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
                    <span>
                      {scanning 
                        ? 'OPTICAL LASER SCANNING IN PROGRESS...' 
                        : 'SIMULATE PHYSICAL SCANNER LINK (ZEBRA / APK)'
                      }
                    </span>
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-1.5">
                    Emulates physical 2D barcode scan from Android APK or Zebra industrial terminal to Port 8765.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: MAINTENANCE HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-slate-200">
                  Maintenance & Calibration Audit Trail
                </span>
                <span className="text-[10px] text-cyan-400">
                  {localHistory.length} Recorded Inspections
                </span>
              </div>

              {localHistory.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No inspection logs recorded yet. Use the scanner simulator to log the first verification.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {localHistory.map((log) => (
                    <div 
                      key={log.id} 
                      className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{log.id}</span>
                        </span>
                        <span className="text-slate-500 text-[10px]">
                          {log.timestamp}
                        </span>
                      </div>
                      <div className="text-slate-300 text-[11px] leading-relaxed">
                        {log.action}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-[10px] text-slate-500">
                        <span>Technician: <strong className="text-slate-400">{log.technician}</strong></span>
                        <span>Scanner: <strong className="text-slate-400">{log.scannerType}</strong></span>
                        <span className="text-cyan-500 font-mono">{log.verificationHash}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: JSON TAG PAYLOAD */}
          {activeTab === 'payload' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="text-slate-200 font-semibold">
                  Optical Barcode Cryptographic Payload
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(qrPayload);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Raw JSON</span>
                </button>
              </div>

              <div className="p-3.5 bg-black border border-slate-800 rounded-xl max-h-72 overflow-y-auto">
                <pre className="text-emerald-400 text-[11px] leading-relaxed whitespace-pre-wrap select-all">
                  {qrPayload}
                </pre>
              </div>
              <p className="text-[10px] text-slate-500">
                Contains full machine identity, physical zone location, and private verification endpoint for offline Android APK maintenance routines.
              </p>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="text-[10px] text-slate-500">
            {lastScannedTimestamp ? (
              <span className="text-emerald-400">
                Last Handshake: {lastScannedTimestamp}
              </span>
            ) : (
              <span>Status: {item.maintenanceStatus}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Asset Tag</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

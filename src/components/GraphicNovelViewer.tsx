import React, { useState, useEffect } from 'react';
import { StoryChapter, DialogueLine } from '../types/vasuki';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ExternalLink, 
  Bot, 
  User, 
  Layers 
} from 'lucide-react';

interface GraphicNovelViewerProps {
  chapters: StoryChapter[];
  onNavigateToFloor: (floorId: string) => void;
}

export const GraphicNovelViewer: React.FC<GraphicNovelViewerProps> = ({
  chapters,
  onNavigateToFloor
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentChapter = chapters[activeChapterIndex] || chapters[0];
  const currentLine: DialogueLine = currentChapter.lines[activeLineIndex] || currentChapter.lines[0];

  // Auto-play dialogue timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveLineIndex((prev) => {
          if (prev < currentChapter.lines.length - 1) {
            return prev + 1;
          } else {
            // Next chapter or pause
            if (activeChapterIndex < chapters.length - 1) {
              setActiveChapterIndex((c) => c + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return prev;
            }
          }
        });
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentChapter, activeChapterIndex, chapters.length]);

  const handleNext = () => {
    if (activeLineIndex < currentChapter.lines.length - 1) {
      setActiveLineIndex(activeLineIndex + 1);
    } else if (activeChapterIndex < chapters.length - 1) {
      setActiveChapterIndex(activeChapterIndex + 1);
      setActiveLineIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeLineIndex > 0) {
      setActiveLineIndex(activeLineIndex - 1);
    } else if (activeChapterIndex > 0) {
      setActiveChapterIndex(activeChapterIndex - 1);
      setActiveLineIndex(chapters[activeChapterIndex - 1].lines.length - 1);
    }
  };

  const handleReset = () => {
    setActiveChapterIndex(0);
    setActiveLineIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Novel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>PROJECT-VASUKI-X5</span>
            <span aria-hidden="true">·</span>
            <span>ENGINEERING GRAPHIC NOVEL</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">EXECUTIVE ARCHITECTURAL STORYTELLING</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight mt-0.5">
            The Cyber-Physical Synthesis: Amit & Rosa Dialogue
          </h2>
        </div>

        {/* Chapter Selection Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChapterIndex(idx);
                setActiveLineIndex(0);
              }}
              className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap transition-all cursor-pointer border ${
                activeChapterIndex === idx
                  ? 'bg-cyan-950/60 border-cyan-500/80 text-cyan-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Act {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graphic Novel Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Comic Panel Visual Stage (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[440px]">
          
          {/* Comic Frame Header */}
          <div className="flex items-center justify-between z-10 border-b border-slate-800/80 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                {currentChapter.title}
              </span>
              <h3 className="text-sm font-bold text-slate-100 mt-0.5">
                {currentChapter.sceneTitle}
              </h3>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-400">
              FRAME {activeLineIndex + 1} OF {currentChapter.lines.length}
            </div>
          </div>

          {/* Holographic Scene Illustration Container */}
          <div className="relative my-4 flex-1 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-lg border border-slate-800/90 overflow-hidden">
            {/* Holographic backdrop grid */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #06b6d4 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Character Badges & Interaction Stage */}
            <div className="w-full flex items-center justify-around gap-4 z-10">
              
              {/* AMIT Character */}
              <div className={`flex flex-col items-center text-center transition-all duration-300 ${
                currentLine.speaker === 'AMIT' ? 'scale-105 opacity-100' : 'opacity-50 scale-95'
              }`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
                  currentLine.speaker === 'AMIT' 
                    ? 'border-cyan-400 bg-cyan-950/70 shadow-cyan-500/20' 
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  <User className="w-10 h-10 text-cyan-300" />
                </div>
                <div className="mt-2 font-bold text-xs text-slate-100">AMIT</div>
                <div className="text-[9px] text-cyan-400 font-mono">Chief Systems Architect</div>
                {currentLine.speaker === 'AMIT' && (
                  <span className="mt-1 text-[9px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    SPEAKING
                  </span>
                )}
              </div>

              {/* Graphic Novel Story Connection Arrow / Waveform */}
              <div className="flex-1 max-w-[120px] flex flex-col items-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
                </div>
                <div className="text-[9px] font-mono text-slate-500 mt-2 text-center">
                  DIRECT SYNTHESIS
                </div>
              </div>

              {/* ROSA Character */}
              <div className={`flex flex-col items-center text-center transition-all duration-300 ${
                currentLine.speaker === 'ROSA' ? 'scale-105 opacity-100' : 'opacity-50 scale-95'
              }`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
                  currentLine.speaker === 'ROSA' 
                    ? 'border-emerald-400 bg-emerald-950/70 shadow-emerald-500/20' 
                    : 'border-slate-700 bg-slate-900'
                }`}>
                  <Bot className="w-10 h-10 text-emerald-300" />
                </div>
                <div className="mt-2 font-bold text-xs text-slate-100">ROSA</div>
                <div className="text-[9px] text-emerald-400 font-mono">Lead Logistics & Electronics</div>
                {currentLine.speaker === 'ROSA' && (
                  <span className="mt-1 text-[9px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    SPEAKING
                  </span>
                )}
              </div>

            </div>

            {/* Referenced Spatial Floor Anchor */}
            {currentLine.floorTarget && (
              <button
                onClick={() => onNavigateToFloor(currentLine.floorTarget!)}
                className="mt-6 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/80 rounded-md transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Jump to Blueprint Module: {currentLine.floorTarget.toUpperCase()}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Player Controls Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800 z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={activeChapterIndex === 0 && activeLineIndex === 0}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors cursor-pointer"
                title="Previous Line"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'PAUSE' : 'AUTOPLAY'}</span>
              </button>
              <button
                onClick={handleNext}
                disabled={activeChapterIndex === chapters.length - 1 && activeLineIndex === currentChapter.lines.length - 1}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 transition-colors cursor-pointer"
                title="Next Line"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title="Reset to Act 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[10px] font-mono text-slate-500">
              Act {activeChapterIndex + 1} of {chapters.length}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Dialogue Comic Bubble & Technical Context (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Active Speech Bubble */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: currentLine.avatarColor }} 
                  />
                  <span className="font-bold text-sm text-slate-100 tracking-tight">
                    {currentLine.speaker}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    · {currentLine.role}
                  </span>
                </div>
              </div>

              {/* Graphic Novel Dialogue Quote */}
              <div className="mt-4 p-4 rounded-lg bg-slate-950/80 border border-slate-800 relative">
                <div className="text-slate-200 text-sm leading-relaxed font-sans">
                  "{currentLine.text}"
                </div>

                {/* Technical Metric Tag if present */}
                {currentLine.technicalMetric && (
                  <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 uppercase text-[10px]">VERIFIED METRIC</span>
                    <span className="text-cyan-400 font-bold">{currentLine.technicalMetric}</span>
                  </div>
                )}
              </div>

              {/* Story Context & System Flywheel Note */}
              <div className="mt-4 p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 font-mono">
                <div className="text-cyan-400 font-bold uppercase text-[10px] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>The Closed-Loop Commercial Flywheel</span>
                </div>
                <p className="leading-normal text-slate-400">
                  Players unlock in-game skins in the 1st-floor Avatar Arena → PyTorch scans facial geometry → MQTT telemetry triggers the automated Toy Manufacturing Cluster → Customized physical IoT merchandise manufactured while they finish playing.
                </p>
              </div>

              {/* All Chapter Lines Quick Browser */}
              <div className="mt-4">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                  Dialogue Flow in Current Act:
                </div>
                <div className="space-y-1.5">
                  {currentChapter.lines.map((line, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveLineIndex(idx)}
                      className={`w-full text-left p-2 rounded text-xs transition-colors flex items-center gap-2 cursor-pointer border ${
                        activeLineIndex === idx
                          ? 'bg-slate-800 text-cyan-300 border-cyan-800/50'
                          : 'bg-slate-950/50 text-slate-400 border-slate-900 hover:text-slate-300'
                      }`}
                    >
                      <span className="font-mono text-[10px] font-bold text-slate-500">
                        {line.speaker}:
                      </span>
                      <span className="truncate flex-1">
                        {line.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Investor Presentation Note */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 text-center">
              Designed for live investor pitch walkthroughs & LinkedIn video carousel presentations.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

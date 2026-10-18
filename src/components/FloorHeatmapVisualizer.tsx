import React, { useState, useMemo } from 'react';
import * as d3 from 'd3';
import { FloorZoneHeatmapData, FloorModule } from '../types/vasuki';
import { 
  Flame, 
  Activity, 
  Zap, 
  Thermometer, 
  Cpu, 
  Layers, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Info,
  Maximize2
} from 'lucide-react';

interface FloorHeatmapVisualizerProps {
  zones: FloorZoneHeatmapData[];
  modules: FloorModule[];
  currentThroughputRate: number;
  onSelectFloor?: (floorId: string) => void;
}

type MetricMode = 'throughput' | 'thermal' | 'power';

export const FloorHeatmapVisualizer: React.FC<FloorHeatmapVisualizerProps> = ({
  zones,
  modules,
  currentThroughputRate,
  onSelectFloor
}) => {
  const [metricMode, setMetricMode] = useState<MetricMode>('throughput');
  const [selectedFloorFilter, setSelectedFloorFilter] = useState<string>('all');
  const [highlightSurgeOnly, setHighlightSurgeOnly] = useState<boolean>(false);
  const [activeZone, setActiveZone] = useState<FloorZoneHeatmapData | null>(null);

  // Dynamic adjustments based on current live throughput rate
  const dynamicZones = useMemo(() => {
    // Normalization ratio based on 1500 target
    const throughputFactor = currentThroughputRate / 1450;
    
    return zones.map((zone) => {
      let adjustedThroughput = zone.throughputDensity;
      if (zone.floorId === 'industrial-annex') {
        adjustedThroughput = Math.min(100, Math.round(zone.throughputDensity * throughputFactor));
      } else if (zone.floorId === 'floor-1' || zone.floorId === 'floor-4') {
        // High correlation with gaming & data center
        adjustedThroughput = Math.min(100, Math.round(zone.throughputDensity * (0.9 + throughputFactor * 0.1)));
      }

      return {
        ...zone,
        throughputDensity: adjustedThroughput
      };
    });
  }, [zones, currentThroughputRate]);

  // Filtered zones
  const filteredZones = useMemo(() => {
    return dynamicZones.filter((z) => {
      const matchesFloor = selectedFloorFilter === 'all' || z.floorId === selectedFloorFilter;
      const matchesSurge = !highlightSurgeOnly || z.throughputDensity >= 90;
      return matchesFloor && matchesSurge;
    });
  }, [dynamicZones, selectedFloorFilter, highlightSurgeOnly]);

  // Group zones by floor
  const floorGroups = useMemo(() => {
    const floorsOrder = [
      { id: 'floor-5', label: 'Floor 5: Rooftop LEO Array & Buffet', short: 'F5' },
      { id: 'floor-4', label: 'Floor 4: Fitness & Tier-3 Edge Data Center', short: 'F4' },
      { id: 'floor-3', label: 'Floor 3: High-Energy Futsal & Dev Studio', short: 'F3' },
      { id: 'floor-2', label: 'Floor 2: Classic Indoor Recreation Club', short: 'F2' },
      { id: 'floor-1', label: 'Floor 1: The Avatar Arena & AI Vision', short: 'F1' },
      { id: 'floor-ground', label: 'Ground Floor: Biometric Concourse & EV', short: 'GF' },
      { id: 'industrial-annex', label: 'Industrial Annex: Smart Toy Cluster', short: 'ANNEX' }
    ];

    return floorsOrder.map((fl) => ({
      ...fl,
      zones: filteredZones.filter((z) => z.floorId === fl.id)
    })).filter((group) => group.zones.length > 0);
  }, [filteredZones]);

  // D3 Color Scales for each metric
  const colorScale = useMemo(() => {
    if (metricMode === 'throughput') {
      // 50% -> deep slate/cyan, 80% -> emerald, 90% -> amber, 96%+ -> crimson/orange
      return d3.scaleSequential()
        .domain([50, 100])
        .interpolator(d3.interpolateRgbBasis([
          '#0f172a', // 50%
          '#0e7490', // 65%
          '#06b6d4', // 78%
          '#10b981', // 88%
          '#f59e0b', // 94%
          '#ef4444'  // 100%
        ]));
    } else if (metricMode === 'thermal') {
      // 18C -> 70C
      return d3.scaleSequential()
        .domain([18, 70])
        .interpolator(d3.interpolateRgbBasis([
          '#0284c7', // cool
          '#06b6d4', // nominal
          '#10b981', // regulated
          '#f59e0b', // warm
          '#ef4444'  // hot
        ]));
    } else {
      // Power kW: 4 -> 350
      return d3.scaleSequential()
        .domain([4, 350])
        .interpolator(d3.interpolateRgbBasis([
          '#1e293b',
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#f43f5e'
        ]));
    }
  }, [metricMode]);

  // Get color for a specific zone based on active metric
  const getZoneColor = (zone: FloorZoneHeatmapData) => {
    if (metricMode === 'throughput') {
      return colorScale(zone.throughputDensity);
    } else if (metricMode === 'thermal') {
      return colorScale(zone.thermalLoadC);
    } else {
      return colorScale(zone.powerKw);
    }
  };

  const getMetricDisplay = (zone: FloorZoneHeatmapData) => {
    if (metricMode === 'throughput') {
      return {
        value: `${zone.throughputDensity}%`,
        secondary: zone.throughputValue,
        label: 'Throughput Density'
      };
    } else if (metricMode === 'thermal') {
      return {
        value: `${zone.thermalLoadC}°C`,
        secondary: zone.thermalLoadC > 40 ? 'Heavy Thermal Inflow' : 'Nominal Climate Control',
        label: 'Thermal Operating Footprint'
      };
    } else {
      return {
        value: `${zone.powerKw} kW`,
        secondary: `${zone.activeUnitsCount} Active Loads`,
        label: 'Active Power Draw'
      };
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 font-mono text-xs space-y-4">
      
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-xs">
            <Flame className="w-4 h-4 text-cyan-400" />
            <span>Spatial Heatmap Density Visualizer (D3-Powered)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Cross-mapping throughput performance, thermal dissipation, and power draw against the 5-floor building model and Industrial Annex.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs self-start sm:self-auto">
          <button
            onClick={() => setMetricMode('throughput')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              metricMode === 'throughput'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Throughput %</span>
          </button>

          <button
            onClick={() => setMetricMode('thermal')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              metricMode === 'thermal'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Thermal (°C)</span>
          </button>

          <button
            onClick={() => setMetricMode('power')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              metricMode === 'power'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Power (kW)</span>
          </button>
        </div>
      </div>

      {/* Filter and Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
        
        {/* Floor Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 uppercase text-[10px]">Filter Floor:</span>
          <select
            value={selectedFloorFilter}
            onChange={(e) => setSelectedFloorFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Floors & Annex</option>
            <option value="floor-5">Floor 5: Rooftop Array & Buffet</option>
            <option value="floor-4">Floor 4: Edge Data Center & Gym</option>
            <option value="floor-3">Floor 3: Futsal & Dev Lab</option>
            <option value="floor-2">Floor 2: Classic Club</option>
            <option value="floor-1">Floor 1: Avatar Arena</option>
            <option value="floor-ground">Ground Floor: Biometrics</option>
            <option value="industrial-annex">Industrial Annex: Toy Cluster</option>
          </select>

          <label className="flex items-center gap-1.5 ml-2 cursor-pointer text-slate-400 hover:text-slate-200 select-none">
            <input
              type="checkbox"
              checked={highlightSurgeOnly}
              onChange={(e) => setHighlightSurgeOnly(e.target.checked)}
              className="rounded border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span>Highlight Surge Zones (&ge;90%)</span>
          </label>
        </div>

        {/* Dynamic D3 Heatmap Color Bar */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-[10px]">
            {metricMode === 'throughput' ? '50% (Nominal)' : metricMode === 'thermal' ? '18°C' : '4 kW'}
          </span>
          <div className="w-32 h-2.5 rounded-full overflow-hidden flex shadow-inner">
            <div className="flex-1 bg-gradient-to-r from-slate-900 via-cyan-600 via-emerald-500 via-amber-500 to-rose-600" />
          </div>
          <span className="text-rose-400 font-bold text-[10px]">
            {metricMode === 'throughput' ? '100% (Surge)' : metricMode === 'thermal' ? '70°C' : '350 kW'}
          </span>
        </div>

      </div>

      {/* Main Heatmap Grid & Floor Stack */}
      <div className="space-y-3">
        {floorGroups.map((group) => (
          <div 
            key={group.id} 
            className="bg-slate-950/60 border border-slate-800/90 rounded-lg p-2.5 transition-all hover:border-slate-700"
          >
            {/* Floor Tag Header */}
            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-900 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-400 font-mono bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40 text-[10px]">
                  {group.short}
                </span>
                <span className="text-slate-300 font-semibold">{group.label}</span>
              </div>
              
              {onSelectFloor && (
                <button
                  onClick={() => onSelectFloor(group.id)}
                  className="text-[10px] text-slate-500 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Inspect CAD Twin</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sub-Zones Heatmap Cells */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {group.zones.map((zone) => {
                const metricInfo = getMetricDisplay(zone);
                const zoneColor = getZoneColor(zone);
                const isSurge = zone.throughputDensity >= 90;
                const isSelected = activeZone?.id === zone.id;

                return (
                  <div
                    key={zone.id}
                    onClick={() => setActiveZone(zone)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'border-cyan-400 shadow-md shadow-cyan-950/80 bg-slate-900'
                        : 'border-slate-800/90 hover:border-slate-700 bg-slate-950'
                    }`}
                  >
                    {/* Top Thermal / Density Bar Fill */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 transition-all"
                      style={{ backgroundColor: zoneColor }}
                    />

                    {/* Ambient Radial Heat Flare for high density */}
                    {isSurge && (
                      <div 
                        className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full opacity-20 pointer-events-none blur-md pulse-dot"
                        style={{ backgroundColor: zoneColor }}
                      />
                    )}

                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div className="font-bold text-slate-200 truncate text-[11px]" title={zone.zoneName}>
                        {zone.zoneName}
                      </div>
                      <span 
                        className="font-mono text-[11px] font-extrabold px-1.5 py-0.2 rounded shrink-0 shadow-sm"
                        style={{
                          backgroundColor: `${zoneColor}25`,
                          color: zoneColor,
                          border: `1px solid ${zoneColor}60`
                        }}
                      >
                        {metricInfo.value}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-400 line-clamp-1" title={zone.subsystem}>
                      {zone.subsystem}
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-900/80 flex items-center justify-between text-[9px] text-slate-500">
                      <span className="text-cyan-400 font-mono font-medium truncate max-w-[130px]">
                        {zone.throughputValue}
                      </span>
                      <span className="uppercase text-[8px] font-bold tracking-tight">
                        {zone.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Active Zone Detail Drawer / Inspector */}
      {activeZone && (
        <div className="p-3.5 bg-slate-950 rounded-lg border border-cyan-800/60 font-mono flex flex-col md:flex-row md:items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-cyan-400 uppercase bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                ZONE INSPECTOR: {activeZone.id}
              </span>
              <span className="text-slate-100 font-bold text-xs">{activeZone.zoneName}</span>
              <span className="text-slate-500 text-[10px]">({activeZone.floorLevel})</span>
            </div>
            <div className="text-[11px] text-slate-300">
              {activeZone.subsystem}
            </div>
            <div className="text-[10px] text-slate-400 flex flex-wrap items-center gap-3 pt-1">
              <span>Managed by: <strong className="text-slate-200">{activeZone.operatorOrAgent}</strong></span>
              <span>·</span>
              <span>Active Hardware Units: <strong className="text-cyan-300">{activeZone.activeUnitsCount}</strong></span>
              <span>·</span>
              <span>Thermal: <strong className="text-emerald-400">{activeZone.thermalLoadC}°C</strong></span>
              <span>·</span>
              <span>Power: <strong className="text-amber-400">{activeZone.powerKw} kW</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onSelectFloor && (
              <button
                onClick={() => onSelectFloor(activeZone.floorId)}
                className="px-3 py-1.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Highlight in 3D Cutaway</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={() => setActiveZone(null)}
              className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Heatmap Insights Footer */}
      <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span>High-Performance Density Engine: Mapped across 20 distinct sub-zones using D3 linear chromatic interpolation.</span>
        <span className="text-cyan-400 font-mono">Dynamic Live Rate: {currentThroughputRate} units/hr</span>
      </div>

    </div>
  );
};

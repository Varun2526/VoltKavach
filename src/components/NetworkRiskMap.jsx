import React, { useState } from 'react';
import { 
  Zap, 
  Activity,
  Layers, 
  ChevronRight
} from 'lucide-react';
import { TRANSFORMERS_FLEET } from '../data/mockData';

export function NetworkRiskMap({ onSelectTransformer, selectedTransformerId }) {
  const [filterState, setFilterState] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'WATCH' | 'NORMAL'
  const [hoveredDt, setHoveredDt] = useState(null);

  const filteredNodes = TRANSFORMERS_FLEET.filter((dt) => {
    if (filterState === 'ALL') return true;
    return dt.riskLevel === filterState;
  });

  // Major distribution substations that anchor the network
  const substations = [
    { id: 'SS-01', name: '66/11kV Indiranagar Substation', x: 30, y: 35 },
    { id: 'SS-02', name: '66/11kV Saket Grid Hub', x: 68, y: 48 },
  ];

  return (
    <div className="relative w-full h-[500px] bg-[#0B1220] rounded-[6px] border border-[#1D2939] overflow-hidden flex flex-col font-sans">
      {/* Top Map Toolbar */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        {/* Left: Map Title & Status */}
        <div className="pointer-events-auto bg-[#101827] px-2.5 py-1 rounded-[6px] border border-[#1D2939] flex items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22B8CF]"></span>
            <span className="font-semibold text-[#E5E7EB] uppercase tracking-wider">
              Network Topology Map
            </span>
          </div>
          <span className="text-[#64748B]">|</span>
          <span className="text-[#94A3B8] text-[11px] font-mono">
            30 Nodes / 1,248 Monitored
          </span>
        </div>

        {/* Right: Quick Risk Filters */}
        <div className="pointer-events-auto bg-[#101827] p-0.5 rounded-[6px] border border-[#1D2939] flex items-center gap-1 text-[11px]">
          <button
            onClick={() => setFilterState('ALL')}
            className={`px-2 py-0.5 rounded-[4px] font-mono transition-colors ${
              filterState === 'ALL'
                ? 'bg-[#132334] text-[#E5E7EB] font-medium border border-[#1D2939]'
                : 'text-[#718096] hover:text-[#CBD5E1]'
            }`}
          >
            All (30)
          </button>
          <button
            onClick={() => setFilterState('CRITICAL')}
            className={`px-2 py-0.5 rounded-[4px] font-mono transition-colors flex items-center gap-1 ${
              filterState === 'CRITICAL'
                ? 'bg-[#2A1517] text-[#D9534F] font-medium border border-[#5C2023]'
                : 'text-[#D9534F] hover:text-[#E5E7EB]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9534F]"></span>
            Critical (3)
          </button>
          <button
            onClick={() => setFilterState('WATCH')}
            className={`px-2 py-0.5 rounded-[4px] font-mono transition-colors flex items-center gap-1 ${
              filterState === 'WATCH'
                ? 'bg-[#2A2111] text-[#D99A2B] font-medium border border-[#5A3F18]'
                : 'text-[#D99A2B] hover:text-[#E5E7EB]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D99A2B]"></span>
            Watch (6)
          </button>
          <button
            onClick={() => setFilterState('NORMAL')}
            className={`px-2 py-0.5 rounded-[4px] font-mono transition-colors flex items-center gap-1 ${
              filterState === 'NORMAL'
                ? 'bg-[#0D2A22] text-[#22A06B] font-medium border border-[#1A533E]'
                : 'text-[#22A06B] hover:text-[#E5E7EB]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22A06B]"></span>
            Normal (21)
          </button>
        </div>
      </div>

      {/* Map Surface with Technical Grid & Feeder Lines */}
      <div className="relative flex-1 w-full h-full grid-bg-pattern cursor-crosshair">
        {/* SVG Network Connections (11kV Feeders) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Lines from Substation 1 to nearby nodes */}
          {TRANSFORMERS_FLEET.slice(0, 16).map((dt) => {
            const isCritical = dt.riskLevel === 'CRITICAL';
            const isSelected = selectedTransformerId === dt.id;
            const strokeColor = isSelected ? '#22B8CF' : isCritical ? '#D9534F' : '#263449';
            return (
              <line
                key={`line-ss1-${dt.id}`}
                x1={`${substations[0].x}%`}
                y1={`${substations[0].y}%`}
                x2={`${dt.coordinates.x}%`}
                y2={`${dt.coordinates.y}%`}
                stroke={strokeColor}
                strokeWidth={isSelected || isCritical ? '1.5' : '1'}
                strokeDasharray={isCritical ? '3,3' : undefined}
              />
            );
          })}

          {/* Lines from Substation 2 to remaining nodes */}
          {TRANSFORMERS_FLEET.slice(16).map((dt) => {
            const isCritical = dt.riskLevel === 'CRITICAL';
            const isSelected = selectedTransformerId === dt.id;
            const strokeColor = isSelected ? '#22B8CF' : isCritical ? '#D9534F' : '#263449';
            return (
              <line
                key={`line-ss2-${dt.id}`}
                x1={`${substations[1].x}%`}
                y1={`${substations[1].y}%`}
                x2={`${dt.coordinates.x}%`}
                y2={`${dt.coordinates.y}%`}
                stroke={strokeColor}
                strokeWidth={isSelected || isCritical ? '1.5' : '1'}
                strokeDasharray={isCritical ? '3,3' : undefined}
              />
            );
          })}
        </svg>

        {/* Substation Nodes */}
        {substations.map((ss) => (
          <div
            key={ss.id}
            style={{ left: `${ss.x}%`, top: `${ss.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none"
          >
            <div className="w-7 h-7 rounded-[4px] bg-[#101827] border border-[#22B8CF] flex items-center justify-center text-[#22B8CF]">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="mt-1 px-1.5 py-0.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] text-[9px] text-[#CBD5E1] font-mono whitespace-nowrap">
              {ss.name}
            </span>
          </div>
        ))}

        {/* Transformer Nodes */}
        {filteredNodes.map((dt) => {
          const isSelected = selectedTransformerId === dt.id;
          const isCritical = dt.riskLevel === 'CRITICAL';
          const isWatch = dt.riskLevel === 'WATCH';

          let nodeBg = 'bg-[#22A06B]';
          let ringColor = 'border-[#1A533E]';

          if (isCritical) {
            nodeBg = 'bg-[#D9534F]';
            ringColor = 'border-[#5C2023]';
          } else if (isWatch) {
            nodeBg = 'bg-[#D99A2B]';
            ringColor = 'border-[#5A3F18]';
          }

          return (
            <div
              key={dt.id}
              style={{ left: `${dt.coordinates.x}%`, top: `${dt.coordinates.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              onMouseEnter={() => setHoveredDt(dt)}
              onMouseLeave={() => setHoveredDt(null)}
            >
              {/* Node Button */}
              <button
                onClick={() => onSelectTransformer(dt.id)}
                className="relative flex items-center justify-center"
                title={`Click to inspect ${dt.id}`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full ${nodeBg} border ${ringColor} flex items-center justify-center text-[8px] font-mono font-bold text-[#080D17]`}
                >
                  {isCritical ? '!' : ''}
                </div>

                {/* Node Label */}
                <div
                  className={`absolute top-4 left-1/2 -translate-x-1/2 px-1 py-0.2 rounded-[4px] text-[9px] font-mono font-medium whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#132334] text-[#22B8CF] border border-[#22B8CF]'
                      : isCritical
                      ? 'bg-[#2A1517] text-[#D9534F] border border-[#5C2023]'
                      : isWatch
                      ? 'bg-[#2A2111] text-[#D99A2B] border border-[#5A3F18]'
                      : 'bg-[#101827] text-[#94A3B8] border border-[#1D2939]'
                  }`}
                >
                  {dt.id}
                </div>
              </button>
            </div>
          );
        })}

        {/* Hover Telemetry Card Floating Overlay */}
        {hoveredDt && (
          <div
            style={{
              left: `${Math.min(75, Math.max(20, hoveredDt.coordinates.x))}%`,
              top: `${Math.min(70, Math.max(22, hoveredDt.coordinates.y - 18))}%`,
            }}
            className="absolute z-30 -translate-x-1/2 -translate-y-full w-48 bg-[#101827] border border-[#1D2939] rounded-[6px] p-2.5 pointer-events-none text-xs space-y-1.5 shadow-lg font-sans"
          >
            <div className="flex items-center justify-between pb-1 border-b border-[#1D2939]">
              <span className="font-mono font-semibold text-[#E5E7EB] text-xs">
                {hoveredDt.id}
              </span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] font-medium border ${
                  hoveredDt.riskLevel === 'CRITICAL'
                    ? 'bg-[#2A1517] text-[#D9534F] border-[#5C2023]'
                    : hoveredDt.riskLevel === 'WATCH'
                    ? 'bg-[#2A2111] text-[#D99A2B] border-[#5A3F18]'
                    : 'bg-[#0D2A22] text-[#22A06B] border-[#1A533E]'
                }`}
              >
                {hoveredDt.riskLevel}
              </span>
            </div>

            <div className="space-y-1 text-[#CBD5E1] text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Risk</span>
                <span className={`font-mono font-medium ${hoveredDt.riskScore >= 90 ? 'text-[#D9534F]' : 'text-[#D99A2B]'}`}>
                  {hoveredDt.riskScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Hotspot</span>
                <span className={`font-mono font-medium ${hoveredDt.hotspotTemp >= 110 ? 'text-[#D9534F]' : 'text-[#CBD5E1]'}`}>
                  {hoveredDt.id === 'DT-1042' ? '126°C' : `${hoveredDt.hotspotTemp}°C`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Peak load</span>
                <span className="font-mono text-[#CBD5E1]">
                  {hoveredDt.id === 'DT-1042' ? '238 kVA' : `${hoveredDt.peakForecastKva} kVA`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Homes</span>
                <span className="font-mono text-[#CBD5E1]">
                  {hoveredDt.homesCount}
                </span>
              </div>
            </div>

            <div className="pt-1 border-t border-[#1D2939] text-[10px] text-[#22B8CF] flex items-center justify-between">
              <span>Click node for detail</span>
              <span>→</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Map Legend */}
      <div className="h-8 bg-[#080D17] border-t border-[#1D2939] px-3 flex items-center justify-between text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-3">
          <span className="text-[#64748B] uppercase font-semibold text-[10px]">Nodes:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22A06B]"></span>
            Normal (&lt;60%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D99A2B]"></span>
            Watch (60–85%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D9534F]"></span>
            Critical (&gt;85%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-[2px] bg-[#101827] border border-[#22B8CF]"></span>
            Substation
          </span>
        </div>

        <div className="text-[#64748B] text-[10px] font-mono">
          Topology Feeder Model
        </div>
      </div>
    </div>
  );
}

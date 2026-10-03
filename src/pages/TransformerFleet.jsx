import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Filter, 
  ChevronRight, 
  Thermometer, 
  BatteryCharging, 
  AlertTriangle,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { TRANSFORMERS_FLEET } from '../data/mockData';

export function TransformerFleet({ onSelectTransformer, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState('ALL'); // 'ALL' | 'NORMAL' | 'WATCH' | 'CRITICAL' | 'BATTERY_ISSUE' | 'ACTIVE_INTERVENTION'

  const filteredTransformers = TRANSFORMERS_FLEET.filter((dt) => {
    // Search filter
    const matchesSearch = 
      dt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dt.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dt.feeder.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    let matchesCategory = true;
    if (filterState === 'NORMAL') matchesCategory = dt.riskLevel === 'NORMAL';
    else if (filterState === 'WATCH') matchesCategory = dt.riskLevel === 'WATCH';
    else if (filterState === 'CRITICAL') matchesCategory = dt.riskLevel === 'CRITICAL';
    else if (filterState === 'BATTERY_ISSUE') matchesCategory = dt.status === 'Battery Issue' || (dt.battery.hasBattery && dt.battery.soc < 50);
    else if (filterState === 'ACTIVE_INTERVENTION') matchesCategory = dt.hasActiveIntervention || dt.status === 'Active' || dt.status === 'Dispatch';

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-[#E5E7EB]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1D2939]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#E5E7EB] m-0">
              Distribution Transformer Fleet
            </h1>
            <span className="px-2.5 py-0.5 rounded-[4px] text-[11px] font-mono font-medium bg-[#101827] border border-[#1D2939] text-[#94A3B8]">
              30 Nodes Active Telemetry
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Search, filter, and inspect thermal loads across all municipal distribution nodes.
          </p>
        </div>

        {/* Search & Counter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search ID, ward, or feeder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0B1220] text-xs text-[#CBD5E1] placeholder-[#64748B] rounded-[6px] pl-9 pr-3 py-1.5 border border-[#1D2939] focus:outline-none focus:border-[#22B8CF] font-sans w-64"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'ALL', label: 'All Transformers', count: TRANSFORMERS_FLEET.length },
          { id: 'NORMAL', label: 'Normal', count: TRANSFORMERS_FLEET.filter(t => t.riskLevel === 'NORMAL').length },
          { id: 'WATCH', label: 'Watch', count: TRANSFORMERS_FLEET.filter(t => t.riskLevel === 'WATCH').length },
          { id: 'CRITICAL', label: 'Critical', count: TRANSFORMERS_FLEET.filter(t => t.riskLevel === 'CRITICAL').length },
          { id: 'BATTERY_ISSUE', label: 'Battery Issue', count: TRANSFORMERS_FLEET.filter(t => t.status === 'Battery Issue' || (t.battery.hasBattery && t.battery.soc < 50)).length },
          { id: 'ACTIVE_INTERVENTION', label: 'Active Intervention', count: TRANSFORMERS_FLEET.filter(t => t.hasActiveIntervention || t.status === 'Active' || t.status === 'Dispatch').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterState(tab.id)}
            className={`px-3 py-1.5 rounded-[6px] whitespace-nowrap transition-all font-medium flex items-center gap-1.5 ${
              filterState === tab.id
                ? 'bg-[#132334] text-[#E5E7EB] border border-[#1D2939]'
                : 'bg-[#101827] text-[#718096] hover:text-[#CBD5E1] border border-[#1D2939]'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] ${
              filterState === tab.id ? 'bg-[#101827] text-[#22B8CF]' : 'bg-[#0B1220] text-[#64748B]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#1D2939] text-[#64748B] uppercase text-[10px] font-semibold">
                <th className="py-3 px-3">Transformer</th>
                <th className="py-3 px-3">Ward & Location</th>
                <th className="py-3 px-3 text-right">Rating</th>
                <th className="py-3 px-3 text-right">Current Load</th>
                <th className="py-3 px-3 text-right">Hotspot</th>
                <th className="py-3 px-3 text-center">Risk</th>
                <th className="py-3 px-3 text-center">Battery SoC</th>
                <th className="py-3 px-3 text-right">Status</th>
                <th className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2939]">
              {filteredTransformers.map((dt) => {
                const isCritical = dt.riskLevel === 'CRITICAL';
                const isWatch = dt.riskLevel === 'WATCH';
                return (
                  <tr
                    key={dt.id}
                    onClick={() => {
                      onSelectTransformer(dt.id);
                      onNavigate('detail', dt.id);
                    }}
                    className="hover:bg-[#131D2D] cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-3 font-semibold text-[#E5E7EB]">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[#CBD5E1] group-hover:text-[#22B8CF]">
                          {dt.id}
                        </span>
                        {isCritical && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D9534F]"></span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="text-[#CBD5E1] font-medium text-xs">
                        {dt.ward}
                      </div>
                      <div className="text-[10px] text-[#64748B]">
                        {dt.feeder} • {dt.homesCount} Homes
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right font-mono text-[#CBD5E1]">
                      {dt.ratingKva} kVA
                    </td>

                    <td className="py-3 px-3 text-right font-mono">
                      <span className={`font-semibold ${
                        dt.currentLoadPercent >= 90
                          ? 'text-[#D9534F]'
                          : dt.currentLoadPercent >= 75
                          ? 'text-[#D99A2B]'
                          : 'text-[#CBD5E1]'
                      }`}>
                        {dt.currentLoadPercent}%
                      </span>
                      <span className="text-[10px] text-[#64748B] block">
                        {dt.currentLoadKva} kVA
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right font-mono">
                      <span className={`font-semibold ${
                        dt.hotspotTemp >= 110
                          ? 'text-[#D9534F]'
                          : dt.hotspotTemp >= 95
                          ? 'text-[#D99A2B]'
                          : 'text-[#22A06B]'
                      }`}>
                        {dt.hotspotTemp}°C
                      </span>
                      <span className="text-[10px] text-[#64748B] block">
                        Oil: {dt.topOilTemp}°C
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-medium border ${
                        isCritical
                          ? 'bg-[#2A1517] text-[#D9534F] border-[#5C2023]'
                          : isWatch
                          ? 'bg-[#2A2111] text-[#D99A2B] border-[#5A3F18]'
                          : 'bg-[#0D2A22] text-[#22A06B] border-[#1A533E]'
                      }`}>
                        {dt.riskScore}% {dt.riskLevel}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center font-mono">
                      {dt.battery.hasBattery ? (
                        <span className={`font-medium ${
                          dt.battery.soc < 50 ? 'text-[#D99A2B]' : 'text-[#22A06B]'
                        }`}>
                          {dt.battery.soc}% ({dt.battery.powerKw}kW)
                        </span>
                      ) : (
                        <span className="text-[#64748B] text-[11px]">-</span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-medium border ${
                        dt.status === 'Active'
                          ? 'bg-[#2A1517] text-[#D9534F] border-[#5C2023]'
                          : dt.status === 'Dispatch'
                          ? 'bg-[#2A2111] text-[#D99A2B] border-[#5A3F18]'
                          : dt.status === 'Battery Issue'
                          ? 'bg-[#2A2111] text-[#D99A2B] border-[#5A3F18]'
                          : dt.status === 'Ready'
                          ? 'bg-[#0D2A22] text-[#22A06B] border-[#1A533E]'
                          : 'bg-[#131D2D] text-[#94A3B8] border-[#263449]'
                      }`}>
                        {dt.status}
                      </span>
                    </td>

                    <td className="py-3 px-2 text-right">
                      <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#22B8CF] group-hover:translate-x-0.5 transition-all" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

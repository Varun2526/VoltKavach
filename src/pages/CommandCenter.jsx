import React from 'react';
import { 
  Zap, 
  AlertTriangle, 
  BatteryCharging, 
  Activity, 
  Sliders
} from 'lucide-react';
import { NetworkRiskMap } from '../components/NetworkRiskMap';
import { DISCOM_INFO, TOMORROW_RISK_QUEUE } from '../data/mockData';

export function CommandCenter({ onNavigate, onSelectTransformer }) {
  const kpis = [
    {
      label: 'Transformers Monitored',
      value: DISCOM_INFO.monitoredCount.toLocaleString(),
      subtext: 'Across 34 municipal wards',
      icon: Zap,
      statusColor: 'text-[#E5E7EB]',
      badge: 'Online',
      badgeColor: 'text-[#22A06B] bg-[#0D2A22] border-[#1A533E]',
    },
    {
      label: 'At Risk Tomorrow',
      value: DISCOM_INFO.atRiskTomorrowCount,
      subtext: 'Peak window 18:30–22:00',
      icon: AlertTriangle,
      statusColor: 'text-[#D99A2B]',
      badge: 'Thermal Risk',
      badgeColor: 'text-[#D9534F] bg-[#2A1517] border-[#5C2023]',
    },
    {
      label: 'Active Interventions',
      value: DISCOM_INFO.activeInterventionsCount,
      subtext: 'BESS & load shift armed',
      icon: Sliders,
      statusColor: 'text-[#CBD5E1]',
      badge: 'Armed',
      badgeColor: 'text-[#D99A2B] bg-[#2A2111] border-[#5A3F18]',
    },
    {
      label: 'Battery Fleet SoC',
      value: `${DISCOM_INFO.batteryFleetSocAvg}%`,
      subtext: '14 BESS units (1.42 MWh)',
      icon: BatteryCharging,
      statusColor: 'text-[#E5E7EB]',
      badge: '74% Fleet Avg',
      badgeColor: 'text-[#22A06B] bg-[#0D2A22] border-[#1A533E]',
    },
  ];

  return (
    <div className="p-6 space-y-4 max-w-7xl mx-auto font-sans text-[#E5E7EB]">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-[#1D2939]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight text-[#E5E7EB] m-0">
              DISCOM Control Center
            </h1>
            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono bg-[#101827] border border-[#1D2939] text-[#94A3B8]">
              {DISCOM_INFO.division}
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Distribution transformer thermal forecasting and battery dispatch management.
          </p>
        </div>

        <button
          onClick={() => onNavigate('dispatch', 'DT-1042')}
          className="px-3 py-1.5 rounded-[6px] bg-[#147D8C] hover:bg-[#1893A3] text-[#E6FFFB] font-medium text-xs flex items-center gap-1.5 transition-colors"
        >
          <span>View Tomorrow's Dispatch Plan</span>
          <span>→</span>
        </button>
      </div>

      {/* Top 4 KPI Cards (Mostly Neutral Control Room Panels) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
                {kpi.label}
              </span>
              <span className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-medium border ${kpi.badgeColor}`}>
                {kpi.badge}
              </span>
            </div>

            <div>
              <div className={`text-2xl font-mono font-semibold tracking-tight ${kpi.statusColor}`}>
                {kpi.value}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-1">
                {kpi.subtext}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Area: Network Risk Map (Left) + Tomorrow's Risk Queue (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Map Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#22B8CF]" />
              <h2 className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider m-0">
                Distribution Network Topology
              </h2>
            </div>
            <span className="text-[#94A3B8] text-[11px]">
              Select any transformer node to open thermal diagnostics
            </span>
          </div>

          <NetworkRiskMap
            onSelectTransformer={(id) => {
              onSelectTransformer(id);
              onNavigate('detail', id);
            }}
            selectedTransformerId="DT-1042"
          />
        </div>

        {/* Right Side: Tomorrow's Risk Queue (4 Columns) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-[#1D2939]">
              <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider">
                TOMORROW'S RISK
              </div>
              <span className="px-1.5 py-0.5 rounded-[4px] bg-[#2A1517] border border-[#5C2023] text-[10px] font-mono font-medium text-[#D9534F]">
                17 AT RISK
              </span>
            </div>

            {/* List of High Risk Transformers */}
            <div className="divide-y divide-[#1D2939] my-1 max-h-[380px] overflow-y-auto pr-1 text-xs">
              {TOMORROW_RISK_QUEUE.map((item, idx) => {
                const isTopHero = item.id === 'DT-1042';
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectTransformer(item.id);
                      onNavigate('detail', item.id);
                    }}
                    className={`py-2 px-2 rounded-[6px] cursor-pointer transition-colors flex items-center justify-between ${
                      isTopHero
                        ? 'bg-[#131D2D] hover:bg-[#182235] border border-[#263449] my-1'
                        : 'hover:bg-[#131D2D] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#64748B] font-mono font-medium text-xs">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-medium text-[#E5E7EB]">
                            {item.id}
                          </span>
                          {isTopHero && (
                            <span className="text-[9px] px-1 py-0.2 rounded-[4px] bg-[#2A1517] text-[#D9534F] border border-[#5C2023] font-mono font-semibold uppercase">
                              TOP
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#94A3B8]">
                          <span className="font-mono">{item.riskScore}%</span> · <span className="font-mono">{item.peakTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[#D9534F] font-mono font-medium text-xs">
                        {item.estHotspot} hotspot
                      </div>
                      <div className="text-[10px] font-mono text-[#94A3B8]">
                        {item.peakLoad}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions: View all 17 -> & View Dispatch Plan */}
            <div className="pt-2.5 border-t border-[#1D2939] space-y-2">
              <button
                onClick={() => onNavigate('transformers')}
                className="w-full py-1.5 px-3 rounded-[6px] bg-[#131D2D] hover:bg-[#182235] text-[#CBD5E1] text-xs flex items-center justify-center transition-colors border border-[#263449]"
              >
                <span>View all 17 →</span>
              </button>

              <button
                onClick={() => onNavigate('dispatch', 'DT-1042')}
                className="w-full py-2 px-3 rounded-[6px] bg-[#147D8C] hover:bg-[#1893A3] text-[#E6FFFB] font-medium text-xs flex items-center justify-center transition-colors"
              >
                <span>View Dispatch Plan →</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] text-[11px] text-[#94A3B8] leading-relaxed">
            <span className="font-medium text-[#CBD5E1]">SCADA Rule: </span>
            Distribution transformers exceeding 110°C IEEE hotspot criteria are flagged 24h prior to allow voluntary battery and thermostat pre-dispatch.
          </div>
        </div>
      </div>
    </div>
  );
}

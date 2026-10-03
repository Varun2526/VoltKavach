import React, { useState } from 'react';
import { 
  BatteryCharging, 
  Battery, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Thermometer, 
  ShieldCheck, 
  Search,
  ChevronRight
} from 'lucide-react';
import { TRANSFORMERS_FLEET } from '../data/mockData';

export function BatteryFleet({ onSelectTransformer, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all transformers with battery installed
  const bessList = TRANSFORMERS_FLEET.filter((t) => t.battery.hasBattery);

  const filteredBess = bessList.filter((t) => 
    t.battery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ward.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-[#E5E7EB]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1D2939]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#E5E7EB] m-0">
              Shared Neighbourhood Battery Fleet (BESS)
            </h1>
            <span className="px-2.5 py-0.5 rounded-[4px] text-[11px] font-mono font-medium bg-[#0D2A22] border border-[#1A533E] text-[#22A06B]">
              14 Units Online • 1,420 kWh Total Fleet
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Transformer-level battery energy storage systems automatically orchestrated for thermal peak clipping.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search battery or DT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0B1220] text-xs text-[#CBD5E1] placeholder-[#64748B] rounded-[6px] pl-9 pr-3 py-1.5 border border-[#1D2939] focus:outline-none focus:border-[#22B8CF] font-sans w-60"
            />
          </div>
        </div>
      </div>

      {/* Top Fleet Metrics (Mostly Neutral Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939]">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Fleet Average SoC
          </span>
          <div className="text-3xl font-semibold font-mono text-[#CBD5E1] mt-2">
            74.2%
          </div>
          <span className="text-[11px] text-[#94A3B8] mt-1 block">
            1,053 kWh Ready for Peak Dispatch
          </span>
        </div>

        <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939]">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Total Inverter Rating
          </span>
          <div className="text-3xl font-semibold font-mono text-[#CBD5E1] mt-2">
            780 kW
          </div>
          <span className="text-[11px] text-[#94A3B8] mt-1 block">
            Bi-directional Smart Inverters
          </span>
        </div>

        <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939]">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Battery Fleet SoH
          </span>
          <div className="text-3xl font-semibold font-mono text-[#CBD5E1] mt-2">
            97.1%
          </div>
          <span className="text-[11px] text-[#22A06B] mt-1 block font-mono">
            LFP Chemistry (4,500 Cycle Life)
          </span>
        </div>

        <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939]">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Active Dispatches
          </span>
          <div className="text-3xl font-semibold font-mono text-[#CBD5E1] mt-2">
            4 Units Armed
          </div>
          <span className="text-[11px] text-[#94A3B8] mt-1 block">
            Including BESS-1042 (32 kW)
          </span>
        </div>
      </div>

      {/* Grid of Battery Cards (Neutral Cards + Semantic Progress Bars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBess.map((dt) => {
          const b = dt.battery;
          const isTopHero = dt.id === 'DT-1042';
          return (
            <div
              key={b.id}
              onClick={() => {
                onSelectTransformer(dt.id);
                onNavigate('detail', dt.id);
              }}
              className={`p-4 rounded-[6px] border transition-all cursor-pointer group flex flex-col justify-between ${
                isTopHero
                  ? 'bg-[#101827] border-[#22B8CF]'
                  : 'bg-[#101827] border-[#1D2939] hover:border-[#263449]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#1D2939]">
                  <div className="flex items-center gap-2">
                    <BatteryCharging className="w-4 h-4 text-[#22B8CF]" />
                    <span className="font-mono font-medium text-[#E5E7EB] text-sm">
                      {b.id}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[4px] font-medium border ${
                    b.status === 'LOW_SOC'
                      ? 'bg-[#2A2111] text-[#D99A2B] border-[#5A3F18]'
                      : 'bg-[#0D2A22] text-[#22A06B] border-[#1A533E]'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#CBD5E1]">
                    Paired: <span className="font-mono text-[#E5E7EB] font-medium">{dt.id}</span>
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">
                    {dt.ward}
                  </span>
                </div>

                {/* Battery SoC Progress Bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#94A3B8]">State of Charge (SoC):</span>
                    <span className="font-semibold text-[#CBD5E1]">{b.soc}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#0B1220] rounded-[2px] overflow-hidden border border-[#1D2939]">
                    <div
                      style={{ width: `${b.soc}%` }}
                      className={`h-full rounded-[2px] transition-all ${
                        b.soc < 30
                          ? 'bg-[#D9534F]'
                          : b.soc < 60
                          ? 'bg-[#D99A2B]'
                          : 'bg-[#22A06B]'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs font-mono bg-[#0B1220] p-2 rounded-[4px] border border-[#1D2939]">
                  <div>
                    <span className="text-[10px] text-[#64748B] block font-semibold">CAPACITY</span>
                    <span className="text-[#CBD5E1]">{b.capacityKwh} kWh</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] block font-semibold">POWER</span>
                    <span className="text-[#CBD5E1]">{b.powerKw} kW</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] block font-semibold">HEALTH</span>
                    <span className="text-[#22A06B]">{b.soh}% SoH</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-[#1D2939] flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span>Steward: {dt.urjaSakhi.name}</span>
                <span className="text-[#22B8CF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-mono">
                  Inspect DT <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

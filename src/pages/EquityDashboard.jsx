import React, { useState } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  X,
  AlertCircle,
  FileCheck,
  User,
  HeartHandshake
} from 'lucide-react';
import { 
  FAIRNESS_SUMMARY, 
  HOUSEHOLDS_FAIRNESS_LEDGER 
} from '../data/fairnessData';

export function EquityDashboard({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'NORMAL' | 'WATCH' | 'EXEMPT'
  const [selectedHousehold, setSelectedHousehold] = useState(
    HOUSEHOLDS_FAIRNESS_LEDGER.find((h) => h.id === 'H-141') || HOUSEHOLDS_FAIRNESS_LEDGER[0]
  );

  const filteredHouseholds = HOUSEHOLDS_FAIRNESS_LEDGER.filter((h) => {
    const matchesSearch = 
      h.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.meterNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'ALL' || 
      h.status.toUpperCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-[#E5E7EB]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1D2939]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-[#E5E7EB] m-0 font-sans">
              Equity & Fairness Control Engine
            </h1>
            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono bg-[#101827] border border-[#1D2939] text-[#94A3B8]">
              Ward 14 (DT-1042 Ledger)
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Algorithmic rotation preventing repeated customer burden. Enforces monthly interruption quotas and medical exemptions.
          </p>
        </div>

        <div className="text-xs text-[#22A06B] font-medium flex items-center gap-1.5 font-mono">
          <ShieldCheck className="w-4 h-4 text-[#22A06B]" />
          <span>Active Governance Module</span>
        </div>
      </div>

      {/* FAIRNESS STATUS BANNER */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-2">
        <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider flex items-center justify-between">
          <span>FAIRNESS STATUS</span>
          <span className="text-[#22A06B] font-mono font-medium">ALL LIMITS RESPECTED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] flex items-center gap-2 text-[#CBD5E1]">
            <CheckCircle2 className="w-4 h-4 text-[#22A06B] shrink-0" />
            <span>Monthly limits respected (900 min cap)</span>
          </div>
          <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] flex items-center gap-2 text-[#CBD5E1]">
            <CheckCircle2 className="w-4 h-4 text-[#22A06B] shrink-0" />
            <span>Critical homes protected (6 exempt)</span>
          </div>
          <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] flex items-center gap-2 text-[#CBD5E1]">
            <CheckCircle2 className="w-4 h-4 text-[#22B8CF] shrink-0" />
            <span>Intervention rotation active</span>
          </div>
        </div>
      </div>

      {/* Main Grid: HOUSEHOLD BURDEN + HOUSEHOLD DETAIL INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* HOUSEHOLD BURDEN */}
        <div className="lg:col-span-6 p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-[#1D2939]">
            <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider">
              HOUSEHOLD BURDEN DISTRIBUTION
            </div>
            <span className="text-[10px] font-mono text-[#64748B]">184 Enrolled Homes</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* 0 min */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#94A3B8]">0 min</span>
                <span className="font-mono text-[#22A06B]">82 homes (44.5%)</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1220] rounded-[2px] overflow-hidden border border-[#1D2939]">
                <div style={{ width: '44.5%' }} className="h-full bg-[#22A06B] rounded-[2px]"></div>
              </div>
            </div>

            {/* 15 min */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#94A3B8]">15 min</span>
                <span className="font-mono text-[#22B8CF]">58 homes (31.5%)</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1220] rounded-[2px] overflow-hidden border border-[#1D2939]">
                <div style={{ width: '31.5%' }} className="h-full bg-[#22B8CF] rounded-[2px]"></div>
              </div>
            </div>

            {/* 30 min */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#94A3B8]">30 min</span>
                <span className="font-mono text-[#CBD5E1]">29 homes (15.8%)</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1220] rounded-[2px] overflow-hidden border border-[#1D2939]">
                <div style={{ width: '15.8%' }} className="h-full bg-[#64748B] rounded-[2px]"></div>
              </div>
            </div>

            {/* 45 min */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#94A3B8]">45 min</span>
                <span className="font-mono text-[#D99A2B]">12 homes (6.5%)</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1220] rounded-[2px] overflow-hidden border border-[#1D2939]">
                <div style={{ width: '6.5%' }} className="h-full bg-[#D99A2B] rounded-[2px]"></div>
              </div>
            </div>

            {/* 60+ min */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#94A3B8]">60+ min</span>
                <span className="font-mono text-[#64748B]">0 homes (0.0%)</span>
              </div>
              <div className="w-full h-2.5 bg-[#0B1220] rounded-[2px] overflow-hidden border border-[#1D2939]">
                <div style={{ width: '0%' }} className="h-full bg-[#D9534F] rounded-[2px]"></div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1D2939] text-[11px] text-[#94A3B8] leading-tight">
            Interventions automatically rotate to lowest-burden cohorts to maintain equal Gini equity coefficient (0.94).
          </div>
        </div>

        {/* CLICKABLE HOUSEHOLD DETAILS CARD */}
        <div className="lg:col-span-6 p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-[#1D2939]">
            <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#22B8CF]" />
              <span className="font-mono">HOUSEHOLD {selectedHousehold.id}</span>
            </div>
            <span className="text-[10px] text-[#64748B]">
              Selected from ledger below
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] flex justify-between items-center">
              <span className="text-[#94A3B8]">DR events</span>
              <span className="font-mono font-semibold text-[#E5E7EB] text-sm">{selectedHousehold.drEvents}</span>
            </div>

            <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] flex justify-between items-center">
              <span className="text-[#94A3B8]">Power-floor minutes</span>
              <span className="font-mono font-semibold text-[#CBD5E1] text-sm">{selectedHousehold.floorMinutes} min</span>
            </div>

            <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] flex justify-between items-center">
              <span className="text-[#94A3B8]">Credits earned</span>
              <span className="font-mono font-semibold text-[#22A06B] text-sm">Rs. {selectedHousehold.creditsEarned}</span>
            </div>

            <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] flex justify-between items-center">
              <span className="text-[#94A3B8]">Medical exemption</span>
              <span className={`font-mono font-medium ${selectedHousehold.isExempt ? 'text-[#22A06B]' : 'text-[#CBD5E1]'}`}>
                {selectedHousehold.isExempt ? 'Yes (Life Support)' : 'No'}
              </span>
            </div>

            <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] flex justify-between items-center">
              <span className="text-[#94A3B8]">Fairness weight</span>
              <span className={`font-mono font-medium ${
                selectedHousehold.status === 'Watch' ? 'text-[#D99A2B]' : 'text-[#22B8CF]'
              }`}>
                {selectedHousehold.status === 'Watch' ? 'Elevated' : 'Normal'}
              </span>
            </div>

            <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] flex justify-between items-center">
              <span className="text-[#94A3B8]">Next intervention eligibility</span>
              <span className={`font-mono font-medium ${
                selectedHousehold.status === 'Watch' 
                  ? 'text-[#D99A2B]' 
                  : selectedHousehold.isExempt 
                  ? 'text-[#64748B]' 
                  : 'text-[#22A06B]'
              }`}>
                {selectedHousehold.status === 'Watch' 
                  ? 'Deferred (Cooldown active)' 
                  : selectedHousehold.isExempt 
                  ? 'Permanent Bypass' 
                  : 'Eligible'}
              </span>
            </div>
          </div>

          <div className="p-2 rounded-[4px] bg-[#0B1220] border border-[#1D2939] text-[10px] text-[#94A3B8]">
            <span className="text-[#22B8CF] font-medium">DISCOM Rule: </span>
            Households with elevated fatigue scores are deferred from the next dispatch window to distribute inconvenience fairly.
          </div>
        </div>
      </div>

      {/* HOUSEHOLD LEDGER TABLE */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1D2939]">
          <div>
            <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider">
              HOUSEHOLD FAIRNESS LEDGER
            </div>
            <div className="text-[#94A3B8] text-[11px] mt-0.5">
              Click any household row to inspect fatigue score and eligibility status
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search ID, meter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0B1220] text-xs text-[#CBD5E1] placeholder-[#64748B] rounded-[6px] pl-8 pr-3 py-1.5 border border-[#1D2939] focus:outline-none focus:border-[#22B8CF] w-44 font-sans"
              />
            </div>

            <div className="flex items-center gap-1 bg-[#0B1220] p-1 rounded-[6px] border border-[#1D2939] text-[10px] font-mono">
              {['ALL', 'NORMAL', 'WATCH', 'EXEMPT'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${
                    statusFilter === st
                      ? 'bg-[#132334] text-[#E5E7EB] border border-[#1D2939]'
                      : 'text-[#718096] hover:text-[#CBD5E1]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#1D2939] text-[#64748B] uppercase text-[10px] font-semibold">
                <th className="py-2.5 px-3">Household</th>
                <th className="py-2.5 px-3">Meter / Address</th>
                <th className="py-2.5 px-3 text-center">DR events</th>
                <th className="py-2.5 px-3 text-center">Floor minutes</th>
                <th className="py-2.5 px-3 text-center">Credits</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2939]">
              {filteredHouseholds.map((h) => {
                const isSelected = selectedHousehold.id === h.id;
                const isWatch = h.status === 'Watch';
                const isExempt = h.isExempt;
                return (
                  <tr
                    key={h.id}
                    onClick={() => setSelectedHousehold(h)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#132334] text-[#E5E7EB]'
                        : 'hover:bg-[#131D2D]'
                    }`}
                  >
                    <td className="py-2 px-3 font-semibold text-[#E5E7EB]">
                      <div className="flex items-center gap-2 font-mono">
                        <span className={isSelected ? 'text-[#22B8CF]' : 'text-[#E5E7EB]'}>
                          {h.id}
                        </span>
                        {isExempt && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22A06B]" title="Medical Exemption"></span>
                        )}
                      </div>
                    </td>

                    <td className="py-2 px-3">
                      <div className="text-[#CBD5E1]">{h.name}</div>
                      <div className="text-[10px] font-mono text-[#64748B]">{h.meterNumber}</div>
                    </td>

                    <td className="py-2 px-3 text-center font-mono font-medium text-[#CBD5E1]">
                      {h.drEvents}
                    </td>

                    <td className="py-2 px-3 text-center font-mono font-medium">
                      <span className={h.floorMinutes > 40 ? 'text-[#D99A2B]' : 'text-[#CBD5E1]'}>
                        {h.floorMinutes}
                      </span>
                    </td>

                    <td className="py-2 px-3 text-center font-mono font-medium text-[#22A06B]">
                      Rs. {h.creditsEarned}
                    </td>

                    <td className="py-2 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-medium border ${
                        isExempt
                          ? 'bg-[#0D2A22] text-[#22A06B] border-[#1A533E]'
                          : isWatch
                          ? 'bg-[#2A2111] text-[#D99A2B] border-[#5A3F18]'
                          : 'bg-[#131D2D] text-[#94A3B8] border-[#263449]'
                      }`}>
                        {h.status}
                      </span>
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

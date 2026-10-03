import React from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  BatteryCharging, 
  ShieldCheck, 
  Zap, 
  Info,
  Award
} from 'lucide-react';
import { 
  SAVINGS_METRICS, 
  S0_S3_SIMULATION_MATRIX, 
  EVENT_HISTORY_LEDGER 
} from '../data/savingsData';

export function SavingsSettlement({ onNavigate }) {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-[#E5E7EB]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1D2939]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-[#E5E7EB] m-0">
              Savings & Settlement Ledger
            </h1>
            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono bg-[#0D2A22] border border-[#1A533E] text-[#22A06B]">
              DISCOM Value Verification
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Quantifying avoided peak power purchase costs, capital deferrals, asset lifetime preservation, and customer bill settlements.
          </p>
        </div>

        {/* Prototype Data Tag */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[4px] bg-[#2A2111] border border-[#5A3F18] text-[11px] font-mono font-medium text-[#D99A2B] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            PROTOTYPE / SIMULATION DATA
          </span>
        </div>
      </div>

      {/* Top 4 KPI Cards (Mostly Neutral Control Room Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Card 1: Peak Energy Avoided */}
        <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase text-[#64748B] font-semibold">
                Peak Energy Avoided
              </span>
              <Zap className="w-4 h-4 text-[#22B8CF]" />
            </div>
            <div className="text-2xl font-mono font-semibold text-[#CBD5E1]">
              {SAVINGS_METRICS.peakEnergyAvoidedKwh}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#1D2939] text-[11px] text-[#94A3B8] flex justify-between">
            <span>Avoided Peak Cost:</span>
            <span className="text-[#22A06B] font-mono font-medium">Rs. 29,472</span>
          </div>
        </div>

        {/* Card 2: Battery Cycles */}
        <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase text-[#64748B] font-semibold">
                Battery Cycles
              </span>
              <BatteryCharging className="w-4 h-4 text-[#CBD5E1]" />
            </div>
            <div className="text-2xl font-mono font-semibold text-[#CBD5E1]">
              {SAVINGS_METRICS.batteryCyclesUsed}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#1D2939] text-[11px] text-[#94A3B8] flex justify-between">
            <span>Cycle Efficiency:</span>
            <span className="text-[#CBD5E1] font-mono font-medium">96.8% Target</span>
          </div>
        </div>

        {/* Card 3: Household Credits */}
        <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase text-[#64748B] font-semibold">
                Household Credits
              </span>
              <IndianRupee className="w-4 h-4 text-[#22A06B]" />
            </div>
            <div className="text-2xl font-mono font-semibold text-[#CBD5E1]">
              {SAVINGS_METRICS.householdCreditsTotal}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#1D2939] text-[11px] text-[#94A3B8] flex justify-between">
            <span>Disbursed To:</span>
            <span className="text-[#CBD5E1]">184 Ward 14 Homes</span>
          </div>
        </div>

        {/* Card 4: Transformer Upgrade Deferred */}
        <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase text-[#64748B] font-semibold">
                Transformer Upgrade
              </span>
              <ShieldCheck className="w-4 h-4 text-[#22A06B]" />
            </div>
            <div className="text-2xl font-mono font-semibold text-[#22A06B]">
              {SAVINGS_METRICS.upgradeDeferredStatus}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-[#1D2939] text-[11px] text-[#94A3B8] flex justify-between">
            <span>CapEx Deferral:</span>
            <span className="text-[#22A06B] font-mono font-medium">{SAVINGS_METRICS.upgradeCapexSavings}</span>
          </div>
        </div>
      </div>

      {/* S0 to S3 SIMULATION BENCHMARK */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1D2939]">
          <div>
            <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-[#22B8CF]" />
              <span>SIMULATION BENCHMARK : S0 TO S3 SCENARIOS</span>
            </div>
            <div className="text-[#94A3B8] text-[11px] mt-0.5">
              Comparative analysis across four dispatch strategies under identical 41.2°C ambient heatwave conditions
            </div>
          </div>
          <span className="text-[10px] text-[#D99A2B] px-2 py-0.5 rounded-[4px] bg-[#2A2111] border border-[#5A3F18] font-mono">
            PROTOTYPE / SIMULATION DATA
          </span>
        </div>

        {/* S0-S3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {S0_S3_SIMULATION_MATRIX.map((sim) => {
            const isS3 = sim.code === 'S3';
            const isS0 = sim.code === 'S0';
            return (
              <div
                key={sim.code}
                className="p-3.5 rounded-[6px] bg-[#131D2D] border border-[#1D2939] flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#E5E7EB] font-mono">
                      {sim.code} {sim.name.split(' ')[0]}
                    </span>
                    <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-[4px] border ${
                      isS3 
                        ? 'bg-[#0D2A22] text-[#22A06B] border-[#1A533E]'
                        : isS0 
                        ? 'bg-[#2A1517] text-[#D9534F] border-[#5C2023]' 
                        : 'bg-[#2A2111] text-[#D99A2B] border-[#5A3F18]'
                    }`}>
                      {sim.verdict}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#CBD5E1] mt-1 font-sans">
                    {sim.name}
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed font-sans">
                    {sim.description}
                  </p>
                </div>

                {/* Exact Metrics */}
                <div className="space-y-1.5 text-[11px] pt-2 border-t border-[#1D2939]">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Overload hours:</span>
                    <span className="font-mono text-[#CBD5E1]">{sim.overloadHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Hotspot temperature:</span>
                    <span className="font-mono text-[#CBD5E1]">{sim.peakHotspot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Trip risk:</span>
                    <span className="font-mono text-[#CBD5E1]">{sim.tripRisk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Energy served:</span>
                    <span className="font-mono text-[#CBD5E1]">{sim.energyServed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Transformer ageing:</span>
                    <span className="font-mono text-[#CBD5E1]">{sim.transformerAgeing}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#1D2939]">
                    <span className="text-[#94A3B8]">Cost per event:</span>
                    <span className="font-mono font-medium text-[#CBD5E1]">{sim.discomCostPerEvent}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Settlement History Table */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1D2939] text-xs">
          <div>
            <div className="font-semibold text-[#E5E7EB] uppercase tracking-wider">
              INTERVENTION SETTLEMENT HISTORY
            </div>
            <div className="text-[#94A3B8] text-[11px] mt-0.5">
              Verified records of transformer relief events, battery contribution, and bill credits
            </div>
          </div>
          <span className="text-[#94A3B8] text-[11px] font-mono">
            5 Audited Events • 100% Settled
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#1D2939] text-[#64748B] uppercase text-[10px] font-semibold">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Event Description</th>
                <th className="py-2.5 px-3">Asset</th>
                <th className="py-2.5 px-3 text-right">Load Avoided</th>
                <th className="py-2.5 px-3 text-right">Battery</th>
                <th className="py-2.5 px-3 text-right">Credits</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2939]">
              {EVENT_HISTORY_LEDGER.map((evt) => (
                <tr key={evt.id} className="hover:bg-[#131D2D] transition-colors">
                  <td className="py-2.5 px-3 text-[#CBD5E1] font-mono">
                    {evt.date}
                  </td>
                  <td className="py-2.5 px-3 text-[#E5E7EB]">
                    {evt.eventName}
                  </td>
                  <td className="py-2.5 px-3 text-[#22B8CF] font-mono">
                    {evt.transformerId} ({evt.ward})
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#CBD5E1]">
                    {evt.loadAvoided}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#CBD5E1]">
                    {evt.batteryContribution}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-[#22A06B]">
                    Rs. {evt.creditsDisbursed}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono font-medium bg-[#0D2A22] text-[#22A06B] border border-[#1A533E]">
                      {evt.settlementStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

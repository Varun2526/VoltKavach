import React, { useState } from 'react';
import { 
  BatteryCharging, 
  Sliders, 
  Smartphone, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft, 
  Clock, 
  Check, 
  Scale, 
  Zap, 
  ChevronRight, 
  Info 
} from 'lucide-react';
import { ACTION_LADDER_DT1042, TRANSFORMERS_FLEET } from '../data/mockData';

export function DispatchPlan({ 
  transformerId = 'DT-1042', 
  onNavigate,
  dispatchApproved: extApproved,
  approvalTime: extTime,
  onApproveDispatch: extOnApprove
}) {
  const [localApproved, setLocalApproved] = useState(false);
  const [localTime, setLocalTime] = useState(null);

  const dispatchApproved = extApproved !== undefined ? extApproved : localApproved;
  const approvalTime = extTime !== undefined ? extTime : localTime;

  const dt = TRANSFORMERS_FLEET.find((t) => t.id === transformerId) || TRANSFORMERS_FLEET[0];

  const handleApprove = () => {
    if (extOnApprove) {
      extOnApprove();
    } else {
      setLocalApproved(true);
      setLocalTime('19:02 IST');
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-[#E5E7EB]">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('detail', dt.id)}
            className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#22B8CF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {dt.id} Diagnostics</span>
          </button>
          <span className="text-[#64748B]">•</span>
          <span className="text-xs text-[#94A3B8]">
            Least-Intrusive-First Dispatch Engine
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-[4px] bg-[#2A2111] border border-[#5A3F18] text-[11px] font-mono font-medium text-[#D99A2B]">
            SIMULATION PREVIEW
          </span>

          <button
            onClick={() => onNavigate('equity')}
            className="px-3 py-1.5 rounded-[6px] bg-[#131D2D] hover:bg-[#182235] border border-[#263449] text-xs text-[#CBD5E1] flex items-center gap-1.5 transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-[#22B8CF]" />
            <span>View Fairness Ledger</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#E5E7EB] tracking-tight m-0 font-mono">
              Intervention Action Ladder : {dt.id}
            </h1>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#2A1517] border border-[#5C2023] text-xs font-mono font-medium text-[#D9534F]">
              HIGH RISK
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            {dt.ward} • <span className="font-mono text-[#CBD5E1]">{dt.ratingKva} kVA</span> • Target Window: <span className="text-[#E5E7EB] font-mono font-medium">Tomorrow 18:00 – 22:00</span>
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-[6px] bg-[#0B1220] border border-[#1D2939] text-right">
          <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Optimiser Strategy</span>
          <span className="text-xs font-mono font-medium text-[#22A06B]">Least-Intrusive-First</span>
        </div>
      </div>

      {/* Timeline Visual Bar (18:00 → 22:00) */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1D2939]">
          <span className="text-[#E5E7EB] font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#22B8CF]" />
            Intervention Execution Timeline
          </span>
          <span className="text-[#94A3B8] text-[11px]">Least Disruptive Acts First</span>
        </div>

        <div className="p-3 rounded-[6px] bg-[#0B1220] border border-[#1D2939] text-xs space-y-2">
          <div className="flex justify-between text-[11px] font-mono text-[#64748B] px-24">
            <span>18:00</span>
            <span>19:00</span>
            <span>20:00</span>
            <span>21:00</span>
            <span>22:00</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            {/* Battery Timeline */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-[#CBD5E1] shrink-0">Battery</span>
              <div className="flex-1 h-3.5 bg-[#101827] rounded-[2px] overflow-hidden relative">
                <div 
                  style={{ left: '20%', width: '50%' }} 
                  className="absolute h-full bg-[#22A06B] rounded-[2px]"
                  title="Battery: 18:45 – 20:15"
                ></div>
              </div>
            </div>

            {/* AC / Pump Timeline */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-[#CBD5E1] shrink-0">AC / Pump</span>
              <div className="flex-1 h-3.5 bg-[#101827] rounded-[2px] overflow-hidden relative">
                <div 
                  style={{ left: '30%', width: '35%' }} 
                  className="absolute h-full bg-[#22B8CF] rounded-[2px]"
                  title="AC / Pump: 19:00 – 20:30"
                ></div>
              </div>
            </div>

            {/* SMS / Voice Timeline */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-[#CBD5E1] shrink-0">SMS / Voice</span>
              <div className="flex-1 h-3.5 bg-[#101827] rounded-[2px] overflow-hidden relative">
                <div 
                  style={{ left: '45%', width: '25%' }} 
                  className="absolute h-full bg-[#D99A2B] rounded-[2px]"
                  title="SMS / Voice: 19:15 – 20:15"
                ></div>
              </div>
            </div>

            {/* Power Floor Timeline (Standby / Minimal) */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-[#CBD5E1] shrink-0">Power Floor</span>
              <div className="flex-1 h-3.5 bg-[#101827] rounded-[2px] overflow-hidden relative">
                <div 
                  style={{ left: '70%', width: '12%' }} 
                  className="absolute h-full bg-[#2A1517] border border-[#5C2023] rounded-[2px]"
                  title="Power Floor: Standby only"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 4-Tier Ladder (Left 7 Columns) + Decision Panel (Right 5 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: The 4 Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider pb-1">
            Hierarchy of Interventions
          </div>

          {/* LEVEL 1: SHARED BATTERY */}
          <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-[#22A06B] font-mono font-semibold uppercase">LEVEL 1</span>
                <h3 className="text-sm font-semibold text-[#E5E7EB] mt-0.5">SHARED BATTERY</h3>
              </div>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#0D2A22] text-[#22A06B] border border-[#1A533E] text-[10px] font-mono font-medium">
                READY
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs py-1">
              <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939]">
                <span className="text-[10px] text-[#64748B] block font-semibold">POWER</span>
                <span className="font-mono text-[#CBD5E1]">32 kW</span>
              </div>
              <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939]">
                <span className="text-[10px] text-[#64748B] block font-semibold">DURATION</span>
                <span className="font-mono text-[#CBD5E1]">90 min</span>
              </div>
              <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939]">
                <span className="text-[10px] text-[#64748B] block font-semibold">ENERGY</span>
                <span className="font-mono text-[#CBD5E1]">48 kWh</span>
              </div>
            </div>

            <div className="flex justify-between text-xs text-[#94A3B8] pt-1 border-t border-[#1D2939]">
              <span>Customer disruption: <strong className="text-[#22A06B] font-mono">0%</strong></span>
              <span>Battery SoC: <strong className="text-[#CBD5E1] font-mono">82%</strong> • SoH: <strong className="text-[#CBD5E1] font-mono">91%</strong></span>
            </div>
          </div>

          {/* LEVEL 2: AUTOMATIC LOAD SHIFTING */}
          <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-[#22B8CF] font-mono font-semibold uppercase">LEVEL 2</span>
                <h3 className="text-sm font-semibold text-[#E5E7EB] mt-0.5">AUTOMATIC LOAD SHIFTING</h3>
              </div>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#132334] text-[#22B8CF] border border-[#1D2939] text-[10px] font-mono font-medium">
                ARMED
              </span>
            </div>

            <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939] text-xs space-y-1">
              <div className="text-[#22B8CF] font-mono font-medium text-sm">14 kW reduction</div>
              <div className="text-[#94A3B8]">• 62 AC compressors (setback +1.5°C)</div>
              <div className="text-[#94A3B8]">• 2 community pumps (run deferred)</div>
            </div>

            <div className="flex justify-between text-xs text-[#94A3B8] pt-1 border-t border-[#1D2939]">
              <span>Customer disruption: <strong className="text-[#22B8CF] font-mono">LOW</strong></span>
              <span className="text-[#64748B] font-mono">&lt; 0.4°C indoor drift</span>
            </div>
          </div>

          {/* LEVEL 3: VOLUNTARY DEMAND RESPONSE */}
          <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-[#D99A2B] font-mono font-semibold uppercase">LEVEL 3</span>
                <h3 className="text-sm font-semibold text-[#E5E7EB] mt-0.5">VOLUNTARY DEMAND RESPONSE</h3>
              </div>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#2A2111] text-[#D99A2B] border border-[#5A3F18] text-[10px] font-mono font-medium">
                ARMED
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs py-1">
              <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939]">
                <span className="text-[10px] text-[#64748B] block font-semibold">NOTIFIED</span>
                <span className="font-mono text-[#CBD5E1]">143 homes</span>
              </div>
              <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939]">
                <span className="text-[10px] text-[#64748B] block font-semibold">EXPECTED RESP</span>
                <span className="font-mono text-[#CBD5E1]">23%</span>
              </div>
              <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939]">
                <span className="text-[10px] text-[#64748B] block font-semibold">REWARD</span>
                <span className="font-mono text-[#22A06B] font-medium">Rs. 10 / event</span>
              </div>
            </div>

            {/* Authentic Hindi SMS Preview */}
            <div className="p-2.5 rounded-[4px] bg-[#0B1220] border border-[#1D2939] text-xs font-sans text-[#CBD5E1] leading-snug space-y-1">
              <div className="text-[10px] font-mono text-[#64748B]">SMS / WHATSAPP DISPATCH PREVIEW:</div>
              <div>कल शाम 7–9 बजे आपके ट्रांसफॉर्मर पर लोड ज़्यादा रहेगा...</div>
              <div className="text-[#22A06B] font-mono font-medium">10 रु. क्रेडिट</div>
            </div>
          </div>

          {/* LEVEL 4: ESSENTIAL POWER FLOOR */}
          <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-[#D9534F] font-mono font-semibold uppercase">LEVEL 4</span>
                <h3 className="text-sm font-semibold text-[#E5E7EB] mt-0.5">ESSENTIAL POWER FLOOR</h3>
              </div>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#131D2D] border border-[#263449] text-[#94A3B8] text-[10px] font-mono font-medium">
                STATUS: NOT REQUIRED
              </span>
            </div>

            <div className="p-2.5 rounded-[6px] bg-[#0B1220] border border-[#1D2939] text-xs space-y-1">
              <div className="text-[#CBD5E1] font-mono font-medium">500 W temporary limit</div>
              <div className="text-[#94A3B8]">• Maximum: 45 min / event</div>
              <div className="text-[#22A06B] font-mono text-xs">• Critical homes exempt: 6 (Life Support Verified)</div>
            </div>

            <div className="p-2 rounded-[4px] bg-[#131D2D] border border-[#263449] text-center text-xs font-mono text-[#94A3B8] uppercase tracking-wide">
              LAST RESORT : NOT BLACKOUT
            </div>
          </div>
        </div>

        {/* Right: OPTIMISER DECISION PANEL */}
        <div className="lg:col-span-5 p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1D2939]">
            <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider">
              TRAFOSAATHI RECOMMENDATION
            </div>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#2A1517] text-[#D9534F] border border-[#5C2023] text-[10px] font-mono font-medium">
              Risk: HIGH
            </span>
          </div>

          {/* Recommended Sequence */}
          <div className="space-y-1.5 text-xs">
            <div className="text-[#64748B] text-[11px] uppercase tracking-wider font-semibold">
              Recommended sequence
            </div>
            <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939] flex justify-between items-center text-[#CBD5E1]">
              <span>1  Battery discharge</span>
              <Check className="w-3.5 h-3.5 text-[#22A06B] stroke-[2.5]" />
            </div>
            <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939] flex justify-between items-center text-[#CBD5E1]">
              <span>2  AC / Pump shifting</span>
              <Check className="w-3.5 h-3.5 text-[#22A06B] stroke-[2.5]" />
            </div>
            <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939] flex justify-between items-center text-[#CBD5E1]">
              <span>3  SMS / Voice nudges</span>
              <Check className="w-3.5 h-3.5 text-[#22A06B] stroke-[2.5]" />
            </div>
            <div className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939] flex justify-between items-center text-[#718096]">
              <span>4  Power floor</span>
              <span className="text-[#64748B] text-[11px]">Not required</span>
            </div>
          </div>

          {/* Expected Effect */}
          <div className="p-2.5 rounded-[6px] bg-[#0B1220] border border-[#1D2939] space-y-1 text-xs">
            <div className="text-[#64748B] text-[10px] uppercase font-semibold">Expected effect</div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Peak load</span>
              <span className="font-mono text-[#CBD5E1]">−38 kW</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Hotspot</span>
              <span className="font-mono text-[#22A06B]">−11°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Battery energy</span>
              <span className="font-mono text-[#CBD5E1]">48 kWh</span>
            </div>
          </div>

          {/* APPROVE DISPATCH PLAN Button */}
          {!dispatchApproved ? (
            <button
              onClick={handleApprove}
              className="w-full py-2.5 px-4 rounded-[6px] bg-[#147D8C] hover:bg-[#1893A3] text-[#E6FFFB] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>APPROVE DISPATCH PLAN</span>
            </button>
          ) : (
            <div className="p-3.5 rounded-[6px] bg-[#0D2A22] border border-[#1A533E] text-xs space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-[#22A06B] font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                DISPATCH APPROVED
              </div>
              <div className="text-[#CBD5E1] font-mono">{approvalTime}</div>
              <div className="text-[#94A3B8] text-[11px]">Operator: Control Room 04</div>
              <div className="text-[10px] text-[#22B8CF] font-mono pt-1 border-t border-[#1A533E]">
                Audit ID: TS-1042-1902
              </div>
            </div>
          )}

          {/* Activity / Audit Timeline */}
          <div className="pt-2 border-t border-[#1D2939] text-[11px] text-[#94A3B8] space-y-1">
            <div className="text-[10px] text-[#64748B] uppercase font-semibold">Operational Audit Timeline</div>
            <div className="font-mono text-[10px]">• 18:30 IST · Telemetry forecast ingested</div>
            <div className="font-mono text-[10px]">• 18:45 IST · Risk threshold triggered (94%)</div>
            <div className="font-mono text-[10px]">• 18:48 IST · Optimiser computed 4-tier dispatch ladder</div>
            {dispatchApproved && <div className="font-mono text-[10px] text-[#22A06B]">• 19:02 IST · Operator approved dispatch (TS-1042-1902)</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

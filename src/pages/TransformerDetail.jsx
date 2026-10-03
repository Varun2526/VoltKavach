import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { 
  AlertTriangle, 
  Thermometer, 
  Zap, 
  BatteryCharging, 
  ArrowLeft, 
  Sliders, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Check,
  ChevronRight, 
  TrendingDown,
  Info,
  Smartphone,
  CheckCircle,
  FileCheck,
  Activity
} from 'lucide-react';
import { TRANSFORMERS_FLEET, DT1042_TIMESERIES, ACTION_LADDER_DT1042 } from '../data/mockData';

export function TransformerDetail({ 
  transformerId = 'DT-1042', 
  onNavigate,
  dispatchApproved: extApproved,
  approvalTime: extTime,
  onApproveDispatch: extOnApprove
}) {
  const [withVoltKavach, setWithVoltKavach] = useState(true);
  const [localApproved, setLocalApproved] = useState(false);
  const [localTime, setLocalTime] = useState(null);

  const dispatchApproved = extApproved !== undefined ? extApproved : localApproved;
  const approvalTime = extTime !== undefined ? extTime : localTime;

  const dt = TRANSFORMERS_FLEET.find((t) => t.id === transformerId) || TRANSFORMERS_FLEET[0];

  const handleApproveDispatch = () => {
    if (extOnApprove) {
      extOnApprove();
    } else {
      setLocalApproved(true);
      setLocalTime('19:02 IST');
    }
  };

  // Custom chart tooltip
  const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const loadVal = withVoltKavach ? data.loadWithTrafo : data.loadBaseline;
      const hotspotVal = withVoltKavach ? data.hotspotWithTrafo : data.hotspotBaseline;
      const riskLevel = hotspotVal >= 120 ? 'CRITICAL' : hotspotVal >= 110 ? 'HIGH' : 'NORMAL';

      return (
        <div className="bg-[#101827] border border-[#1D2939] p-3 rounded-[6px] shadow-xl text-xs font-sans min-w-48 space-y-1.5 z-50">
          <div className="font-medium text-[#E5E7EB] pb-1 border-b border-[#1D2939] flex justify-between">
            <span className="font-mono">{label}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] font-medium border ${
              riskLevel === 'CRITICAL' ? 'bg-[#2A1517] text-[#D9534F] border-[#5C2023]' :
              riskLevel === 'HIGH' ? 'bg-[#2A2111] text-[#D99A2B] border-[#5A3F18]' : 'bg-[#0D2A22] text-[#22A06B] border-[#1A533E]'
            }`}>
              {riskLevel}
            </span>
          </div>

          <div className="space-y-1 text-[#CBD5E1] pt-0.5">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Load</span>
              <span className="font-mono text-[#CBD5E1]">{loadVal} kVA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Ambient</span>
              <span className="font-mono text-[#CBD5E1]">{data.ambientTemp}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Hotspot</span>
              <span className={`font-mono font-medium ${hotspotVal >= 110 ? 'text-[#D9534F]' : 'text-[#22A06B]'}`}>
                {hotspotVal}°C
              </span>
            </div>
            {data.eventLabel && (
              <div className="pt-1 border-t border-[#1D2939] text-[10px] text-[#22B8CF]">
                ● {data.eventLabel}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-[#E5E7EB] font-sans">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('command')}
          className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#22B8CF] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Control Center</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-[4px] bg-[#101827] border border-[#1D2939] text-[11px] font-mono text-[#94A3B8] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22A06B]"></span>
            Forecast updated 2 min ago
          </span>
          <span className="px-2.5 py-0.5 rounded-[4px] bg-[#2A2111] border border-[#5A3F18] text-[11px] font-mono font-medium text-[#D99A2B]">
            SIMULATION PREVIEW
          </span>
        </div>
      </div>

      {/* Visual Narrative Hierarchy Breadcrumb */}
      <div className="p-2.5 rounded-[6px] bg-[#101827] border border-[#1D2939] flex items-center justify-between text-xs overflow-x-auto gap-2">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="px-2 py-0.5 rounded-[4px] bg-[#131D2D] text-[#94A3B8] border border-[#1D2939] font-medium font-mono">
            1. FORECAST
          </span>
          <span className="text-[#64748B]">→</span>
          <span className="px-2 py-0.5 rounded-[4px] bg-[#2A1517] text-[#D9534F] border border-[#5C2023] font-medium font-mono">
            2. TRANSFORMER RISK
          </span>
          <span className="text-[#64748B]">→</span>
          <span className="px-2 py-0.5 rounded-[4px] bg-[#2A2111] text-[#D99A2B] border border-[#5A3F18] font-medium font-mono">
            3. THERMAL STRESS
          </span>
          <span className="text-[#64748B]">→</span>
          <span className="px-2 py-0.5 rounded-[4px] bg-[#131D2D] text-[#CBD5E1] border border-[#263449] font-medium font-mono">
            4. OPTIMISER
          </span>
          <span className="text-[#64748B]">→</span>
          <span className="px-2 py-0.5 rounded-[4px] bg-[#132334] text-[#22B8CF] border border-[#1D2939] font-medium font-mono">
            5. INTERVENTION
          </span>
          <span className="text-[#64748B]">→</span>
          <span className="px-2 py-0.5 rounded-[4px] bg-[#0D2A22] text-[#22A06B] border border-[#1A533E] font-medium font-mono">
            6. LOWER HOTSPOT
          </span>
        </div>
      </div>

      {/* TRANSFORMER DETAIL HEADER */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-mono text-[#E5E7EB] m-0 tracking-tight">
              {dt.id}
            </h1>
            <span className="text-sm text-[#94A3B8]">
              {dt.ward}
            </span>
            <span className="px-2.5 py-0.5 rounded-[4px] bg-[#2A1517] text-[#D9534F] border border-[#5C2023] font-mono text-xs font-medium">
              HIGH RISK
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#94A3B8] pt-0.5 flex-wrap">
            <span className="text-[#D9534F] font-mono font-medium">
              Tomorrow · 18:45–21:15
            </span>
            <span className="text-[#64748B]">•</span>
            <span className="font-mono text-[#CBD5E1]">250 kVA</span>
            <span className="text-[#64748B]">•</span>
            <span>198 Homes</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-[#CBD5E1] font-mono">50 kW / 100 kWh BESS</span>
          </div>
        </div>

        {/* WITHOUT / WITH VOLTKAVACH TOGGLE */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="flex p-1 bg-[#0B1220] rounded-[6px] border border-[#1D2939] text-xs font-sans">
            <button
              onClick={() => setWithVoltKavach(false)}
              className={`px-3 py-1.5 rounded-[4px] font-medium transition-all ${
                !withVoltKavach
                  ? 'bg-[#131D2D] text-[#CBD5E1] border border-[#263449]'
                  : 'text-[#718096] hover:text-[#CBD5E1]'
              }`}
            >
              WITHOUT VOLTKAVACH
            </button>
            <button
              onClick={() => setWithVoltKavach(true)}
              className={`px-3 py-1.5 rounded-[4px] font-medium transition-all ${
                withVoltKavach
                  ? 'bg-[#147D8C] text-[#E6FFFB]'
                  : 'text-[#718096] hover:text-[#CBD5E1]'
              }`}
            >
              WITH VOLTKAVACH
            </button>
          </div>
        </div>
      </div>

      {/* TOGGLE STATUS CARDS (Strictly Neutral Panels + Semantic Indicators) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939]">
          <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
            Peak Hotspot
          </div>
          <div className={`text-2xl font-mono font-semibold mt-1 ${
            !withVoltKavach ? 'text-[#D9534F]' : 'text-[#CBD5E1]'
          }`}>
            {!withVoltKavach ? '126°C' : '111°C'}
          </div>
          <div className="text-[10px] text-[#94A3B8] mt-1 flex justify-between">
            <span>{!withVoltKavach ? 'Unmitigated crest' : '−15°C stabilized'}</span>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-[#131D2D] border border-[#263449] text-[#D99A2B] text-[9px] font-mono">
              SIMULATION PREVIEW
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939]">
          <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
            Overload Duration
          </div>
          <div className={`text-2xl font-mono font-semibold mt-1 ${
            !withVoltKavach ? 'text-[#D9534F]' : 'text-[#CBD5E1]'
          }`}>
            {!withVoltKavach ? '48 min' : '0 min'}
          </div>
          <div className="text-[10px] text-[#94A3B8] mt-1 flex justify-between">
            <span>{!withVoltKavach ? '19:15 – 20:45' : 'Zero trip risk'}</span>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-[#131D2D] border border-[#263449] text-[#D99A2B] text-[9px] font-mono">
              SIMULATION PREVIEW
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-[6px] bg-[#101827] border border-[#1D2939]">
          <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
            Ageing Multiplier
          </div>
          <div className={`text-2xl font-mono font-semibold mt-1 ${
            !withVoltKavach ? 'text-[#D9534F]' : 'text-[#CBD5E1]'
          }`}>
            {!withVoltKavach ? '8.4×' : '1.1×'}
          </div>
          <div className="text-[10px] text-[#94A3B8] mt-1 flex justify-between">
            <span>{!withVoltKavach ? 'Severe life loss' : 'Normal lifetime'}</span>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-[#131D2D] border border-[#263449] text-[#D99A2B] text-[9px] font-mono">
              SIMULATION PREVIEW
            </span>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-[#64748B] italic">
        * Illustrative simulation values : replace with validated S0–S3 simulation output.
      </div>

      {/* THERMAL CHART (Dual-Axis 17:00 → 23:00) */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-3 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1D2939] text-xs">
          <div>
            <div className="font-semibold text-[#E5E7EB] uppercase tracking-wider flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-[#22B8CF]" />
              Thermal Stress & Load Trajectory (17:00 → 23:00)
            </div>
            <div className="text-[#94A3B8] text-[11px] mt-0.5">
              Sequence: Load ↑ → Hotspot ↑ → Risk zone → Intervention → Hotspot stabilises
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-[#94A3B8]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22B8CF]"></span> Load (kVA)
            </span>
            <span className="flex items-center gap-1.5 text-[#94A3B8]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D99A2B]"></span> Hotspot (°C)
            </span>
            <span className="flex items-center gap-1.5 text-[#94A3B8]">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#22A06B]"></span> Battery Relief
            </span>
          </div>
        </div>

        {/* Dual Axis Recharts */}
        <div className="h-[340px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={DT1042_TIMESERIES}
              margin={{ top: 20, right: 30, left: 5, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1D2939" vertical={false} />
              
              <XAxis 
                dataKey="time" 
                stroke="#64748B" 
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                tickLine={{ stroke: '#1D2939' }}
              />

              {/* Left Y Axis: Load in kVA */}
              <YAxis 
                yAxisId="left" 
                domain={[120, 280]} 
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                tickFormatter={(v) => `${v}kVA`}
                tickLine={{ stroke: '#1D2939' }}
              />

              {/* Right Y Axis: Hotspot Temperature in °C */}
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[80, 140]} 
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                tickFormatter={(v) => `${v}°C`}
                tickLine={{ stroke: '#1D2939' }}
              />

              <Tooltip content={<CustomChartTooltip />} />

              {/* Vertical Markers */}
              <ReferenceLine 
                x="18:45" 
                stroke="#D9534F" 
                strokeWidth={1.5} 
                strokeDasharray="3 3"
                label={{ 
                  value: '18:45 RISK CREST', 
                  fill: '#D9534F', 
                  fontSize: 10, 
                  fontFamily: 'JetBrains Mono',
                  position: 'insideTopLeft' 
                }}
              />

              <ReferenceLine 
                x="19:00" 
                stroke="#22B8CF" 
                strokeWidth={1.5} 
                strokeDasharray="3 3"
                label={{ 
                  value: '19:00 DISPATCH START', 
                  fill: '#22B8CF', 
                  fontSize: 10, 
                  fontFamily: 'JetBrains Mono',
                  position: 'insideTopRight' 
                }}
              />

              {/* Risk Threshold Line */}
              <ReferenceLine 
                yAxisId="right" 
                y={110} 
                stroke="#D99A2B" 
                strokeDasharray="4 4" 
                strokeWidth={1.2}
                label={{ 
                  value: '110°C Risk Threshold', 
                  fill: '#D99A2B', 
                  fontSize: 10, 
                  fontFamily: 'JetBrains Mono',
                  position: 'insideBottomRight' 
                }}
              />

              {/* Shaded intervention region after dispatch begins */}
              {withVoltKavach && (
                <ReferenceArea
                  x1="18:45"
                  x2="21:15"
                  fill="#22B8CF"
                  fillOpacity={0.06}
                  stroke="#22B8CF"
                  strokeOpacity={0.15}
                />
              )}

              {/* Unmitigated curves when WITHOUT is selected */}
              {!withVoltKavach ? (
                <>
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="loadBaseline"
                    name="Uncontrolled Load (kVA)"
                    fill="#64748B"
                    fillOpacity={0.12}
                    stroke="#64748B"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="hotspotBaseline"
                    name="Hotspot Temp Baseline (°C)"
                    stroke="#D9534F"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#D9534F' }}
                  />
                </>
              ) : (
                <>
                  {/* Stabilized curves when WITH is selected */}
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="loadWithTrafo"
                    name="Stabilized Load (kVA)"
                    fill="#22B8CF"
                    fillOpacity={0.08}
                    stroke="#22B8CF"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="hotspotWithTrafo"
                    name="Stabilized Hotspot (°C)"
                    stroke="#D99A2B"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#D99A2B' }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="batteryDischargeKw"
                    name="BESS Relief (kW)"
                    fill="#22A06B"
                    opacity={0.6}
                    radius={[2, 2, 0, 0]}
                  />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* EXPLAINABILITY PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
        {/* Left: Clean Technical Layout */}
        <div className="lg:col-span-7 p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-3">
          <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider pb-2 border-b border-[#1D2939]">
            WHY DT-1042 IS AT RISK
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#1D2939]">
              <span className="text-[#94A3B8]">Ambient temperature</span>
              <span className="font-mono text-[#CBD5E1]">41.2°C</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1D2939]">
              <span className="text-[#94A3B8]">Forecast peak load</span>
              <span className="font-mono text-[#CBD5E1]">238 kVA</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1D2939]">
              <span className="text-[#94A3B8]">Transformer rating</span>
              <span className="font-mono text-[#CBD5E1]">250 kVA</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1D2939]">
              <span className="text-[#94A3B8]">Peak coincidence</span>
              <span className="font-mono text-[#D9534F] font-medium">HIGH</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1D2939]">
              <span className="text-[#94A3B8]">Solar generation</span>
              <span className="font-mono text-[#D99A2B] font-medium">FALLING</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#94A3B8]">Hotspot forecast</span>
              <span className="font-mono text-[#D9534F] font-semibold">126°C</span>
            </div>
          </div>

          {/* Visual Equation */}
          <div className="p-3 rounded-[6px] bg-[#0B1220] border border-[#1D2939] text-center text-xs space-y-1 mt-3 font-mono">
            <div className="text-[#CBD5E1]">41.2°C ambient</div>
            <div className="text-[#64748B]">+</div>
            <div className="text-[#CBD5E1]">238 kVA evening load</div>
            <div className="text-[#64748B]">+</div>
            <div className="text-[#CBD5E1]">cooling response lag</div>
            <div className="text-[#D9534F]">↓</div>
            <div className="text-[#D9534F] font-semibold text-sm">126°C hotspot risk</div>
          </div>

          <div className="p-2.5 rounded-[6px] bg-[#0B1220] border border-[#1D2939] text-[11px] text-[#94A3B8] leading-relaxed">
            <span className="font-medium text-[#CBD5E1]">Note: </span>
            VoltKavach is modelling thermal stress, not simply instantaneous electrical load. The thermal time constant delays winding heat dissipation after sunset.
          </div>
        </div>

        {/* Right: OPTIMISER DECISION PANEL */}
        <div className="lg:col-span-5 p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1D2939]">
            <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider">
              VOLTKAVACH RECOMMENDATION
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
              onClick={handleApproveDispatch}
              className="w-full py-2.5 px-3 rounded-[6px] bg-[#147D8C] hover:bg-[#1893A3] text-[#E6FFFB] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>APPROVE DISPATCH PLAN</span>
            </button>
          ) : (
            <div className="p-3 rounded-[6px] bg-[#0D2A22] border border-[#1A533E] text-xs space-y-1 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-[#22A06B] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                DISPATCH APPROVED
              </div>
              <div className="text-[#CBD5E1] text-[11px] font-mono">{approvalTime}</div>
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

      {/* ACTION LADDER : SECOND HERO COMPONENT */}
      <div className="p-4 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-4 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1D2939]">
          <div>
            <div className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#22B8CF]" />
              Intervention Action Ladder (Least Intrusive First)
            </div>
            <div className="text-[#94A3B8] text-[11px] mt-0.5">
              Automated sequence execution timeline from 18:00 to 22:00
            </div>
          </div>
          <span className="text-[10px] text-[#94A3B8] font-mono">
            Priority: Storage → Shift → Nudge → Power Floor
          </span>
        </div>

        {/* Visual Intervention Timeline */}
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

        {/* 4 CARDS (Strictly Neutral Panels + Small Semantic Badges) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* BATTERY CARD */}
          <div className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col justify-between space-y-2">
            <div>
              <div className="text-[10px] text-[#22A06B] font-mono font-semibold">LEVEL 1</div>
              <div className="text-sm font-semibold text-[#E5E7EB] mt-0.5">SHARED BATTERY</div>
              <div className="mt-2 space-y-1 text-[#CBD5E1]">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Power:</span>
                  <span className="font-mono text-[#CBD5E1]">32 kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Duration:</span>
                  <span className="font-mono text-[#CBD5E1]">90 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Energy:</span>
                  <span className="font-mono text-[#CBD5E1]">48 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Disruption:</span>
                  <span className="font-mono text-[#22A06B] font-medium">0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Status:</span>
                  <span className="font-mono text-[#22A06B] font-medium">READY</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-[#1D2939] text-[11px] flex justify-between text-[#94A3B8] font-mono">
              <span>SoC: <strong className="text-[#CBD5E1]">82%</strong></span>
              <span>SoH: <strong className="text-[#CBD5E1]">91%</strong></span>
            </div>
          </div>

          {/* AUTOMATIC LOAD CONTROL CARD */}
          <div className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col justify-between space-y-2">
            <div>
              <div className="text-[10px] text-[#22B8CF] font-mono font-semibold">LEVEL 2</div>
              <div className="text-sm font-semibold text-[#E5E7EB] mt-0.5">AUTOMATIC LOAD SHIFTING</div>
              <div className="mt-2 space-y-1 text-[#CBD5E1]">
                <div className="text-[#22B8CF] font-mono font-medium">14 kW reduction</div>
                <div className="text-[#94A3B8] mt-1">• 62 AC compressors</div>
                <div className="text-[#94A3B8]">• 2 community pumps</div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#94A3B8]">Disruption:</span>
                  <span className="font-mono text-[#22B8CF] font-medium">LOW</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-[#1D2939] text-[10px] text-[#64748B]">
              Thermostat setback (+1.5°C)
            </div>
          </div>

          {/* VOLUNTARY DR CARD */}
          <div className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col justify-between space-y-2">
            <div>
              <div className="text-[10px] text-[#D99A2B] font-mono font-semibold">LEVEL 3</div>
              <div className="text-sm font-semibold text-[#E5E7EB] mt-0.5">VOLUNTARY DEMAND RESPONSE</div>
              <div className="mt-2 space-y-1 text-[#CBD5E1]">
                <div className="text-[#94A3B8]">143 households notified</div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Expected response:</span>
                  <span className="font-mono text-[#CBD5E1]">23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Reward:</span>
                  <span className="font-mono text-[#22A06B] font-medium">Rs. 10 / event</span>
                </div>
              </div>
            </div>

            {/* Authentic Hindi SMS Preview */}
            <div className="p-2 rounded-[4px] bg-[#0B1220] border border-[#1D2939] text-[10px] text-[#CBD5E1] font-sans leading-tight space-y-1">
              <div className="text-[9px] text-[#64748B] font-mono">SMS PREVIEW:</div>
              <div>कल शाम 7–9 बजे आपके ट्रांसफॉर्मर पर लोड ज़्यादा रहेगा...</div>
              <div className="text-[#22A06B] font-mono font-medium">10 रु. क्रेडिट</div>
            </div>
          </div>

          {/* POWER FLOOR CARD (Strictly Neutral Card + Small Status Badge) */}
          <div className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#D9534F] font-mono font-semibold">LEVEL 4</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-[4px] bg-[#2A1517] text-[#D9534F] border border-[#5C2023] font-mono font-medium">
                  LAST RESORT
                </span>
              </div>
              <div className="text-sm font-semibold text-[#E5E7EB] mt-0.5">ESSENTIAL POWER FLOOR</div>
              
              <div className="mt-2 space-y-1 text-[#CBD5E1]">
                <div className="text-[#CBD5E1] font-mono">500 W temporary limit</div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Maximum:</span>
                  <span className="font-mono text-[#CBD5E1]">45 min / event</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Exempt:</span>
                  <span className="font-mono text-[#22A06B] font-medium">6 critical homes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Status:</span>
                  <span className="font-mono text-[#94A3B8] font-medium">NOT REQUIRED</span>
                </div>
              </div>
            </div>

            <div className="p-1.5 rounded-[4px] bg-[#131D2D] border border-[#263449] text-center text-[10px] font-mono text-[#94A3B8] uppercase tracking-wide">
              LAST RESORT : NOT BLACKOUT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Activity, 
  Play, 
  RotateCcw,
  Check
} from 'lucide-react';

export const DEMO_STEPS = [
  {
    step: 1,
    title: "1. Command Center",
    targetPage: "command",
    script: "VoltKavach is continuously monitoring 1,248 neighbourhood transformers across the DISCOM division.",
    actionPrompt: "Notice the 4 top KPI cards and the live risk map.",
    highlightElement: "kpis",
  },
  {
    step: 2,
    title: "2. Tomorrow's Risk",
    targetPage: "command",
    script: "Tomorrow, 17 transformers are flagged at risk. Notice DT-1042 at 94% risk at 18:45.",
    actionPrompt: "Click on DT-1042 to inspect its thermal forecast.",
    highlightElement: "dt-1042",
    nextTarget: { page: "detail", id: "DT-1042" }
  },
  {
    step: 3,
    title: "3. Thermal Heat Model",
    targetPage: "detail",
    targetId: "DT-1042",
    script: "The transformer isn't simply overloaded (kW). High ambient temperature (41.2°C) combined with thermal time constants drives hotspot temperature past 126°C.",
    actionPrompt: "Toggle 'Without VoltKavach' vs 'With VoltKavach' to see thermal stabilization.",
    highlightElement: "chart",
  },
  {
    step: 4,
    title: "4. Action Ladder Dispatch",
    targetPage: "detail",
    targetId: "DT-1042",
    script: "VoltKavach's optimiser selects the least disruptive intervention ladder: Battery first, then AC shifting, then SMS nudges. Power Floor is strictly last resort.",
    actionPrompt: "Review the sequence and click [Approve Dispatch Plan].",
    highlightElement: "ladder",
  },
  {
    step: 5,
    title: "5. Fairness & Equity",
    targetPage: "equity",
    script: "If household intervention is required, the fairness ledger prevents the same households from repeatedly carrying the burden. Monthly caps are cryptographically enforced.",
    actionPrompt: "Inspect the power-floor minute distribution and medical exemptions.",
    highlightElement: "ledger",
  },
  {
    step: 6,
    title: "6. Savings & Settlement",
    targetPage: "savings",
    script: "The DISCOM achieves measurable reliability improvement and defers an Rs. 18.5 Lakh transformer replacement instead of simply buying more batteries.",
    actionPrompt: "Check the S0-S3 simulation comparison matrix and verified event ledger.",
    highlightElement: "s0s3",
  },
];

export function DemoFlowBar({ currentStep, onSelectStep, onClose, isOpen }) {
  if (!isOpen) return null;

  const activeStepData = DEMO_STEPS[currentStep - 1] || DEMO_STEPS[0];

  return (
    <div className="bg-[#0B1220] border-b border-[#1D2939] px-4 py-2 sticky top-14 z-20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left: Step indicator & Script */}
        <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded-[4px] bg-[#101827] border border-[#1D2939] text-[#22B8CF] text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-[#22B8CF]" />
            <span>Step {currentStep} / {DEMO_STEPS.length}</span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#E5E7EB] tracking-wide">
                {activeStepData.title}
              </span>
              <span className="text-[11px] text-[#22B8CF] font-medium hidden sm:inline">
                • {activeStepData.actionPrompt}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-snug line-clamp-2 md:line-clamp-1 italic">
              "{activeStepData.script}"
            </p>
          </div>
        </div>

        {/* Right: Step pills & Next/Prev Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto font-mono">
          {/* Step circles */}
          <div className="hidden lg:flex items-center gap-1">
            {DEMO_STEPS.map((s) => (
              <button
                key={s.step}
                onClick={() => onSelectStep(s.step)}
                className={`w-6 h-6 rounded-[4px] text-[11px] font-mono font-medium flex items-center justify-center transition-all ${
                  currentStep === s.step
                    ? 'bg-[#147D8C] text-[#E6FFFB] font-bold'
                    : currentStep > s.step
                    ? 'bg-[#0D2A22] text-[#22A06B] border border-[#1A533E]'
                    : 'bg-[#131D2D] text-[#718096] border border-[#263449] hover:text-[#CBD5E1]'
                }`}
                title={s.title}
              >
                {currentStep > s.step ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : s.step}
              </button>
            ))}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-1 border-l border-[#1D2939] pl-2 font-sans">
            <button
              onClick={() => onSelectStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="p-1 rounded-[6px] bg-[#131D2D] hover:bg-[#182235] border border-[#263449] disabled:opacity-40 disabled:cursor-not-allowed text-[#CBD5E1] text-xs transition-colors"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectStep(Math.min(DEMO_STEPS.length, currentStep + 1))}
              disabled={currentStep === DEMO_STEPS.length}
              className="px-2.5 py-1 rounded-[6px] bg-[#147D8C] hover:bg-[#1893A3] text-[#E6FFFB] font-medium text-xs flex items-center gap-1 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Next Step"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-[6px] hover:bg-[#101827] text-[#718096] hover:text-[#CBD5E1] ml-1 transition-colors"
              title="Close guide bar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

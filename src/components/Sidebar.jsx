import React from 'react';
import { 
  Home, 
  Zap, 
  MapPin, 
  TrendingUp, 
  Scale, 
  IndianRupee, 
  BatteryCharging, 
  UserCheck, 
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export function Sidebar({ activePage, onNavigate, onOpenUrjaSakhi }) {
  const primaryNavItems = [
    { id: 'command', label: 'Command Center', icon: Home, badge: 'Live' },
    { id: 'transformers', label: 'Transformers', icon: Zap, badge: '30' },
    { id: 'dispatch', label: 'Dispatch', icon: TrendingUp, badge: 'Action' },
    { id: 'equity', label: 'Equity', icon: Scale },
    { id: 'savings', label: 'Savings', icon: IndianRupee },
    { id: 'battery-fleet', label: 'Battery Fleet', icon: BatteryCharging, badge: '74%' },
  ];

  return (
    <aside className="w-56 bg-[#0B1220] border-r border-[#1D2939] flex flex-col justify-between shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 select-none font-sans">
      {/* Top Nav Links */}
      <div className="p-3 space-y-4 overflow-y-auto">
        <div>
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
            COMMAND CENTER
          </div>
          <nav className="space-y-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id || (item.id === 'risk-map' && activePage === 'command-map');
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full relative flex items-center justify-between px-2.5 py-1.5 rounded-[6px] text-xs transition-colors ${
                    isActive
                      ? 'bg-[#132334] text-[#E5E7EB] font-medium border border-[#1D2939]'
                      : 'text-[#718096] hover:text-[#CBD5E1] hover:bg-[#101827] border border-transparent'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r bg-[#22B8CF]" />
                  )}
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${
                      isActive ? 'text-[#22B8CF]' : 'text-[#718096]'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] border ${
                      isActive 
                        ? 'bg-[#101827] text-[#22B8CF] border-[#1D2939]' 
                        : 'bg-[#101827] text-[#64748B] border-[#1D2939]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1D2939] pt-3">
          <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
            LOCAL OPERATIONS
          </div>
          <button
            onClick={onOpenUrjaSakhi}
            className={`w-full relative flex items-center justify-between px-2.5 py-1.5 rounded-[6px] text-xs transition-colors ${
              activePage === 'urja-sakhi'
                ? 'bg-[#132334] text-[#E5E7EB] font-medium border border-[#1D2939]'
                : 'text-[#94A3B8] hover:text-[#CBD5E1] hover:bg-[#101827] border border-transparent'
            }`}
          >
            {activePage === 'urja-sakhi' && (
              <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r bg-[#22B8CF]" />
            )}
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-[#D99A2B]" />
              <span>Urja Sakhi</span>
            </div>
            <span className="text-[9px] font-mono text-[#64748B]">Ward 14</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer Status */}
      <div className="p-3 border-t border-[#1D2939] bg-[#0B1220] space-y-1.5 text-[10px] text-[#94A3B8]">
        <div className="flex items-center justify-between px-1">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-[#22A06B]" />
            Thermal Engine
          </span>
          <span className="font-mono text-[#22A06B]">IEC 60076-7</span>
        </div>
        <div className="flex items-center justify-between px-1">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#22B8CF]" />
            Fairness Ledger
          </span>
          <span className="font-mono text-[#22B8CF]">Active (184 H)</span>
        </div>
        <div className="pt-1 text-[#64748B] text-center font-mono">
          SCADA Link: Nominal
        </div>
      </div>
    </aside>
  );
}

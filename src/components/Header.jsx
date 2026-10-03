import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Bell, 
  ShieldCheck, 
  Clock, 
  Search, 
  AlertTriangle
} from 'lucide-react';
import { DISCOM_INFO, TRANSFORMERS_FLEET } from '../data/mockData';

export function Header({ activePage, onNavigate, onOpenUrjaSakhi }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header className="h-14 bg-[#080D17] border-b border-[#1D2939] px-4 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Left: Branding & Region */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[6px] bg-[#101827] border border-[#1D2939] flex items-center justify-center text-[#22B8CF]">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-[#E5E7EB]">
                VoltKavach
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] bg-[#101827] text-[#94A3B8] border border-[#1D2939]">
                DISCOM v2.4
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8]">
              {DISCOM_INFO.name} · {DISCOM_INFO.division}
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#1D2939] text-xs">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#0D2A22] border border-[#1A533E] text-[#22A06B] text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22A06B]"></span>
            System Online
          </span>
          <span className="text-[#94A3B8] text-[11px]">
            Circle Load: <span className="font-mono text-[#CBD5E1]">1,840 MVA</span>
          </span>
        </div>
      </div>

      {/* Center: Search with Auto-complete Dropdown */}
      <div className="hidden md:flex items-center relative w-64">
        <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 pointer-events-none" />
        <input
          type="text"
          placeholder="Search DT (e.g. DT-1042)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const q = searchQuery.trim().toUpperCase();
              const found = TRANSFORMERS_FLEET.find(
                (t) => t.id.toUpperCase() === q || t.id.toUpperCase().includes(q) || t.ward.toUpperCase().includes(q)
              );
              if (found) {
                onNavigate('detail', found.id);
                setSearchQuery('');
              } else {
                onNavigate('transformers');
              }
            }
          }}
          className="w-full bg-[#0B1220] text-xs text-[#CBD5E1] placeholder-[#64748B] rounded-[6px] pl-8 pr-3 py-1 border border-[#1D2939] focus:outline-none focus:border-[#22B8CF]"
        />
        {searchQuery.trim().length >= 2 && (
          <div className="absolute left-0 top-full mt-1.5 w-72 bg-[#101827] border border-[#1D2939] rounded-[6px] shadow-2xl py-1 z-50 text-xs">
            {TRANSFORMERS_FLEET.filter((t) =>
              t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.ward.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5).map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  onNavigate('detail', t.id);
                  setSearchQuery('');
                }}
                className="px-3 py-1.5 hover:bg-[#131D2D] cursor-pointer flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium text-[#E5E7EB]">{t.id}</span>
                  <span className="text-[10px] text-[#64748B]">{t.ward}</span>
                </div>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                  t.riskLevel === 'CRITICAL' ? 'bg-[#2A1517] text-[#D9534F] border-[#5C2023]' :
                  t.riskLevel === 'WATCH' ? 'bg-[#2A2111] text-[#D99A2B] border-[#5A3F18]' :
                  'bg-[#0D2A22] text-[#22A06B] border-[#1A533E]'
                }`}>
                  {t.riskLevel}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Telemetry Time, Urja Sakhi, Notifications, Operator */}
      <div className="flex items-center gap-3">
        {/* Urja Sakhi Button */}
        <button
          onClick={onOpenUrjaSakhi}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#131D2D] hover:bg-[#182235] border border-[#263449] text-[#CBD5E1] text-xs transition-colors"
          title="Open Urja Sakhi mobile operator interface"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D99A2B]"></span>
          <span className="font-medium">Urja Sakhi</span>
          <span className="text-[10px] text-[#64748B]">Ward 14</span>
        </button>

        {/* Live Grid Clock */}
        <div className="hidden sm:flex flex-col text-right text-xs">
          <div className="font-mono text-[#CBD5E1] tracking-wider flex items-center justify-end gap-1">
            <Clock className="w-3 h-3 text-[#22B8CF]" />
            {formattedTime} <span className="text-[10px] text-[#64748B]">IST</span>
          </div>
          <div className="text-[10px] text-[#64748B]">
            {formattedDate}
          </div>
        </div>

        {/* Operational Alerts */}
        <div className="relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-8 h-8 rounded-[6px] bg-[#101827] border border-[#1D2939] hover:border-[#263449] flex items-center justify-center text-[#94A3B8] hover:text-[#E5E7EB] relative transition-colors"
            title="Operational alerts"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#D9534F] text-[9px] font-mono font-bold text-[#E6FFFB] flex items-center justify-center">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-[#101827] border border-[#1D2939] rounded-[6px] p-2.5 z-50 shadow-xl space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#1D2939] text-[11px]">
                <span className="font-semibold text-[#E5E7EB] uppercase">Operational Alerts</span>
                <span className="font-mono text-[#22B8CF]">3 active</span>
              </div>

              <div className="space-y-1.5">
                <div 
                  onClick={() => {
                    onNavigate('detail', 'DT-1042');
                    setNotificationsOpen(false);
                  }}
                  className="p-2 rounded-[6px] bg-[#131D2D] border border-[#5C2023] cursor-pointer hover:bg-[#182235] text-xs"
                >
                  <div className="flex justify-between text-[#D9534F] font-semibold">
                    <span>DT-1042 Thermal Alert</span>
                    <span className="font-mono">18:45</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    Hotspot forecast 126°C. Action Ladder intervention recommended.
                  </p>
                </div>

                <div 
                  onClick={() => {
                    onNavigate('detail', 'DT-0871');
                    setNotificationsOpen(false);
                  }}
                  className="p-2 rounded-[6px] bg-[#131D2D] border border-[#5A3F18] cursor-pointer hover:bg-[#182235] text-xs"
                >
                  <div className="flex justify-between text-[#D99A2B] font-semibold">
                    <span>DT-0871 Watch State</span>
                    <span className="font-mono">19:15</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    Solar roll-off at 18:40; BESS-0871 armed for discharge.
                  </p>
                </div>

                <div 
                  onClick={() => {
                    onNavigate('equity');
                    setNotificationsOpen(false);
                  }}
                  className="p-2 rounded-[6px] bg-[#131D2D] border border-[#1D2939] cursor-pointer hover:bg-[#182235] text-xs"
                >
                  <div className="flex justify-between text-[#22B8CF] font-semibold">
                    <span>Fairness Audit Passed</span>
                    <span className="font-mono">Today</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    All 184 households within monthly power-floor quotas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Operator Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#1D2939] text-xs">
          <div className="w-7 h-7 rounded-[6px] bg-[#101827] border border-[#1D2939] flex items-center justify-center text-[#CBD5E1] font-mono font-semibold text-xs">
            RS
          </div>
          <div className="hidden xl:block text-left text-[11px]">
            <div className="font-medium text-[#E5E7EB] leading-tight">
              {DISCOM_INFO.operatorName}
            </div>
            <div className="text-[10px] text-[#64748B] leading-tight">
              Control Room 04
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

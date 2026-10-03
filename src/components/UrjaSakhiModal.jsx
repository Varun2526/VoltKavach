import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  Upload, 
  BatteryCharging, 
  Zap, 
  Users, 
  FileText, 
  Send, 
  Check, 
  MessageSquare, 
  MapPin, 
  ChevronRight, 
  ShieldCheck, 
  Thermometer,
  RotateCcw
} from 'lucide-react';
import { URJA_SAKHI_PROFILE } from '../data/urjaSakhiData';

export function UrjaSakhiModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'inspection' | 'community'
  const [checklist, setChecklist] = useState(URJA_SAKHI_PROFILE.checklistItems);
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [submittedInspection, setSubmittedInspection] = useState(false);
  const [complaints, setComplaints] = useState(URJA_SAKHI_PROFILE.recentComplaints);

  const toggleCheck = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleResolveComplaint = (id) => {
    setComplaints(
      complaints.map((c) =>
        c.id === id ? { ...c, status: 'Resolved' } : c
      )
    );
  };

  const handleSubmitInspection = () => {
    setSubmittedInspection(true);
    setTimeout(() => {
      setActiveTab('home');
      setSubmittedInspection(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-150">
      {/* Container with Industrial Handheld Frame */}
      <div className="relative w-full max-w-sm bg-[#0B1220] rounded-[6px] border border-[#263449] overflow-hidden flex flex-col h-[700px] max-h-[90vh]">
        {/* Device Top Status Bar */}
        <div className="h-6 bg-[#080D17] flex items-center justify-between px-4 shrink-0 border-b border-[#1D2939] text-[10px] text-[#64748B] font-mono select-none">
          <span>09:41</span>
          <span className="text-[9px] uppercase tracking-wider text-[#64748B]">DISCOM Field Terminal</span>
          <div className="flex items-center gap-1.5">
            <span>4G</span>
            <span>92%</span>
          </div>
        </div>

        {/* App Title Bar */}
        <div className="bg-[#101827] px-4 py-2.5 border-b border-[#1D2939] flex items-center justify-between shrink-0 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[4px] bg-[#131D2D] border border-[#263449] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-[#22B8CF]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#E5E7EB] leading-tight">
                Urja Sakhi Portal
              </div>
              <div className="text-[10px] text-[#22B8CF] leading-tight">
                BRPL Ward 14 Field Ops
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-[4px] bg-[#131D2D] text-[#94A3B8] hover:text-[#E5E7EB] transition-colors border border-[#263449]"
            title="Close mobile emulator"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Screen Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[#CBD5E1] font-mono">
          {/* ================= SCREEN 1: OPERATOR HOME ================= */}
          {activeTab === 'home' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Profile Card */}
              <div className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#94A3B8] font-medium">
                    Ward 14 (Indiranagar)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-[4px] bg-[#0D2A22] text-[#22A06B] border border-[#1A533E] font-medium font-mono">
                    Active Duty
                  </span>
                </div>
                <h2 className="text-sm font-semibold text-[#E5E7EB] m-0">
                  Good morning, {URJA_SAKHI_PROFILE.name}
                </h2>
                <p className="text-[11px] text-[#64748B] font-sans">
                  2 distribution transformers assigned for community stewardship.
                </p>
              </div>

              {/* Status Checks for Assigned DTs */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider">
                  Assigned Transformers (2)
                </span>

                {URJA_SAKHI_PROFILE.assignedTransformers.map((dt) => (
                  <div
                    key={dt.id}
                    className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#E5E7EB]">
                        {dt.id}
                      </span>
                      <span className="text-[10px] text-[#64748B]">
                        {dt.ratingKva} kVA
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-1.5 rounded-[4px] bg-[#080D17] border border-[#1D2939] flex items-center justify-between">
                        <span className="text-[#94A3B8]">Battery:</span>
                        <span className="text-[#22A06B] font-semibold">{dt.batteryHealth}</span>
                      </div>
                      <div className="p-1.5 rounded-[4px] bg-[#080D17] border border-[#1D2939] flex items-center justify-between">
                        <span className="text-[#94A3B8]">Trafo:</span>
                        <span className="text-[#22A06B] font-semibold">{dt.transformerHealth}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-[#64748B] flex justify-between font-mono">
                      <span>Last Check: {dt.lastInspected}</span>
                      <span className="text-[#CBD5E1]">SoC: {dt.batterySoc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complaints Widget */}
              <div className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#E5E7EB]">
                    Household Complaints
                  </div>
                  <div className="text-[11px] text-[#D99A2B] font-mono">
                    2 pending resolution
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('community')}
                  className="px-2.5 py-1 rounded-[4px] bg-[#131D2D] hover:bg-[#182235] text-xs text-[#CBD5E1] border border-[#263449] transition-colors"
                >
                  View (2)
                </button>
              </div>

              {/* Start Site Check CTA Button */}
              <button
                onClick={() => setActiveTab('inspection')}
                className="w-full py-2.5 px-4 rounded-[6px] bg-[#147D8C] hover:bg-[#1893A3] text-[#E6FFFB] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Start Site Check</span>
              </button>
            </div>
          )}

          {/* ================= SCREEN 2: BATTERY INSPECTION ================= */}
          {activeTab === 'inspection' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#1D2939]">
                <div>
                  <h2 className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wide m-0">
                    DAILY SITE CHECK
                  </h2>
                  <span className="text-[11px] text-[#64748B]">
                    Target: BESS-1042 (Shanti Vihar Plinth)
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-[#132334] text-[#22B8CF] border border-[#1D2939] font-mono">
                  Step 2 of 2
                </span>
              </div>

              {/* Inspection Checklist */}
              <div className="space-y-2">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-2.5 rounded-[6px] border cursor-pointer transition-colors flex items-start gap-2.5 ${
                      item.checked
                        ? 'bg-[#101827] border-[#22A06B]/50'
                        : 'bg-[#0B1220] border-[#1D2939]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-[4px] flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                      item.checked
                        ? 'bg-[#0D2A22] border-[#22A06B] text-[#22A06B]'
                        : 'border-[#263449] bg-[#080D17] text-transparent'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#E5E7EB]">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-[#64748B] leading-tight mt-0.5 font-sans">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Photo Upload Section */}
              <div className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#E5E7EB]">Upload Site Photo</span>
                  <span className="text-[#22A06B] text-[10px] font-mono">Photo Attached [OK]</span>
                </div>

                <div className="h-24 rounded-[4px] bg-[#080D17] border border-dashed border-[#263449] flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
                  <div className="flex flex-col items-center justify-center p-2">
                    <CheckCircle2 className="w-5 h-5 text-[#22A06B] mb-1" />
                    <span className="text-[11px] text-[#CBD5E1] font-medium font-mono">
                      BESS-1042_Plinth_20261003.jpg
                    </span>
                    <span className="text-[9px] text-[#64748B] mt-0.5 font-mono">
                      GPS Tagged: 28.5355°N, 77.2510°E · Tamper Free
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Inspection Button */}
              {submittedInspection ? (
                <div className="p-2.5 rounded-[6px] bg-[#0D2A22] border border-[#1A533E] text-center text-xs text-[#22A06B] font-semibold font-mono">
                  Inspection Submitted and Logged to DISCOM
                </div>
              ) : (
                <button
                  onClick={handleSubmitInspection}
                  className="w-full py-2.5 px-4 rounded-[6px] bg-[#147D8C] hover:bg-[#1893A3] text-[#E6FFFB] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inspection</span>
                </button>
              )}
            </div>
          )}

          {/* ================= SCREEN 3: COMMUNITY ================= */}
          {activeTab === 'community' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider">
                    WARD 14 COMMUNITY METRICS
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">
                    Oct 2026
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded-[4px] bg-[#080D17] border border-[#1D2939]">
                    <span className="text-[10px] text-[#64748B] block">HOMES ENROLLED</span>
                    <span className="text-sm font-semibold text-[#CBD5E1] font-mono">
                      {URJA_SAKHI_PROFILE.communityStats.homesEnrolled}
                    </span>
                  </div>
                  <div className="p-2 rounded-[4px] bg-[#080D17] border border-[#1D2939]">
                    <span className="text-[10px] text-[#64748B] block">CREDITS THIS MONTH</span>
                    <span className="text-sm font-semibold text-[#22A06B] font-mono">
                      Rs. {URJA_SAKHI_PROFILE.communityStats.creditsThisMonth}
                    </span>
                  </div>
                  <div className="p-2 rounded-[4px] bg-[#080D17] border border-[#1D2939]">
                    <span className="text-[10px] text-[#64748B] block">FLOOR MINUTES</span>
                    <span className="text-sm font-semibold text-[#CBD5E1] font-mono">
                      {URJA_SAKHI_PROFILE.communityStats.powerFloorMinutes} min
                    </span>
                  </div>
                  <div className="p-2 rounded-[4px] bg-[#080D17] border border-[#1D2939]">
                    <span className="text-[10px] text-[#64748B] block">COMPLAINTS</span>
                    <span className="text-sm font-semibold text-[#D99A2B] font-mono">
                      {complaints.filter(c => c.status === 'Open').length} open / {complaints.filter(c => c.status === 'Resolved').length} res
                    </span>
                  </div>
                </div>
              </div>

              {/* Complaints List with 1-click resolve */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider">
                  Resident Queries & Tickets
                </span>

                {complaints.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-[6px] bg-[#101827] border border-[#1D2939] space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#E5E7EB]">
                        {c.id} · {c.householdId}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-[4px] font-mono font-medium ${
                        c.status === 'Open'
                          ? 'bg-[#2A2111] text-[#D99A2B] border border-[#5A3F18]'
                          : 'bg-[#0D2A22] text-[#22A06B] border border-[#1A533E]'
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#CBD5E1]">
                      {c.resident}
                    </div>

                    <p className="text-[10px] text-[#94A3B8] leading-snug font-sans">
                      "{c.issue}"
                    </p>

                    <div className="text-[9px] text-[#64748B] pt-0.5 font-mono">
                      Action: {c.actionTaken}
                    </div>

                    {c.status === 'Open' && (
                      <button
                        onClick={() => handleResolveComplaint(c.id)}
                        className="w-full mt-1.5 py-1 rounded-[4px] bg-[#131D2D] hover:bg-[#182235] text-[#CBD5E1] text-[10px] font-medium transition-colors border border-[#263449] cursor-pointer"
                      >
                        Mark as Visited & Resolved
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* View Monthly Report Button */}
              <button
                onClick={() => alert("Ward 14 Monthly Community Audit Report downloaded (Simulated PDF).")}
                className="w-full py-2 px-3 rounded-[6px] bg-[#131D2D] hover:bg-[#182235] text-[#CBD5E1] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#263449] cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Monthly Report</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Phone Navigation Tabs */}
        <div className="h-12 bg-[#0B1220] border-t border-[#1D2939] flex items-center justify-around px-2 shrink-0 select-none">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-[4px] text-[10px] font-mono transition-colors cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#132334] text-[#E5E7EB] font-medium'
                : 'text-[#718096] hover:text-[#94A3B8]'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${activeTab === 'home' ? 'text-[#22B8CF]' : ''}`} />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('inspection')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-[4px] text-[10px] font-mono transition-colors cursor-pointer ${
              activeTab === 'inspection'
                ? 'bg-[#132334] text-[#E5E7EB] font-medium'
                : 'text-[#718096] hover:text-[#94A3B8]'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${activeTab === 'inspection' ? 'text-[#22B8CF]' : ''}`} />
            <span>Inspect</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-[4px] text-[10px] font-mono transition-colors cursor-pointer ${
              activeTab === 'community'
                ? 'bg-[#132334] text-[#E5E7EB] font-medium'
                : 'text-[#718096] hover:text-[#94A3B8]'
            }`}
          >
            <Users className={`w-3.5 h-3.5 ${activeTab === 'community' ? 'text-[#22B8CF]' : ''}`} />
            <span>Community</span>
          </button>
        </div>
      </div>
    </div>
  );
}

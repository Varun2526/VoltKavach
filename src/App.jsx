import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DemoFlowBar, DEMO_STEPS } from './components/DemoFlowBar';
import { CommandCenter } from './pages/CommandCenter';
import { TransformerDetail } from './pages/TransformerDetail';
import { DispatchPlan } from './pages/DispatchPlan';
import { EquityDashboard } from './pages/EquityDashboard';
import { SavingsSettlement } from './pages/SavingsSettlement';
import { TransformerFleet } from './pages/TransformerFleet';
import { BatteryFleet } from './pages/BatteryFleet';
import { UrjaSakhiModal } from './components/UrjaSakhiModal';

export default function App() {
  // Navigation states: 'command' | 'detail' | 'dispatch' | 'equity' | 'savings' | 'transformers' | 'battery-fleet'
  const [activePage, setActivePage] = useState('command');
  const [selectedTransformerId, setSelectedTransformerId] = useState('DT-1042');
  
  // Shared dispatch approval state across detail and dispatch plan
  const [dispatchApproved, setDispatchApproved] = useState(false);
  const [approvalTime, setApprovalTime] = useState(null);

  const handleApproveDispatch = () => {
    setDispatchApproved(true);
    setApprovalTime('19:02 IST');
  };

  // Guided Story Demo Flow
  const [demoFlowOpen, setDemoFlowOpen] = useState(true);
  const [currentDemoStep, setCurrentDemoStep] = useState(1);

  // Urja Sakhi mobile emulator modal
  const [urjaSakhiModalOpen, setUrjaSakhiModalOpen] = useState(false);

  // Navigation handler
  const handleNavigate = (pageId, transformerId = null) => {
    if (transformerId) {
      setSelectedTransformerId(transformerId);
    }
    if (pageId === 'risk-map') {
      setActivePage('command');
    } else {
      setActivePage(pageId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Demo step change handler
  const handleSelectDemoStep = (stepNumber) => {
    setCurrentDemoStep(stepNumber);
    const stepData = DEMO_STEPS[stepNumber - 1];
    if (stepData) {
      if (stepData.targetId) {
        setSelectedTransformerId(stepData.targetId);
      }
      setActivePage(stepData.targetPage);
    }
  };

  return (
    <div className="min-h-screen bg-[#080D17] text-[#E5E7EB] flex flex-col font-sans antialiased">
      {/* Top DISCOM Header */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenUrjaSakhi={() => setUrjaSakhiModalOpen(true)}
      />

      {/* Guided Story Walkthrough Bar (Steps 1–6) */}
      <DemoFlowBar
        isOpen={demoFlowOpen}
        currentStep={currentDemoStep}
        onSelectStep={handleSelectDemoStep}
        onClose={() => setDemoFlowOpen(false)}
      />

      {/* Body Layout: Sidebar + Main Dynamic Page Area */}
      <div className="flex flex-1 min-w-0">
        {/* Desktop Persistent Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          onOpenUrjaSakhi={() => setUrjaSakhiModalOpen(true)}
          onStartDemoFlow={() => {
            setDemoFlowOpen(true);
            handleSelectDemoStep(1);
          }}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 min-w-0 overflow-y-auto pb-16">
          {activePage === 'command' && (
            <CommandCenter
              onNavigate={handleNavigate}
              onSelectTransformer={(id) => {
                setSelectedTransformerId(id);
                handleNavigate('detail', id);
              }}
            />
          )}

          {activePage === 'detail' && (
            <TransformerDetail
              transformerId={selectedTransformerId}
              onNavigate={handleNavigate}
              dispatchApproved={dispatchApproved}
              approvalTime={approvalTime}
              onApproveDispatch={handleApproveDispatch}
            />
          )}

          {activePage === 'dispatch' && (
            <DispatchPlan
              transformerId={selectedTransformerId}
              onNavigate={handleNavigate}
              dispatchApproved={dispatchApproved}
              approvalTime={approvalTime}
              onApproveDispatch={handleApproveDispatch}
            />
          )}

          {activePage === 'equity' && (
            <EquityDashboard
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'savings' && (
            <SavingsSettlement
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'transformers' && (
            <TransformerFleet
              onSelectTransformer={(id) => setSelectedTransformerId(id)}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'battery-fleet' && (
            <BatteryFleet
              onSelectTransformer={(id) => setSelectedTransformerId(id)}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* Urja Sakhi Mobile Android Prototype Modal */}
      <UrjaSakhiModal
        isOpen={urjaSakhiModalOpen}
        onClose={() => setUrjaSakhiModalOpen(false)}
      />
    </div>
  );
}

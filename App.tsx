import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import FrameworkGuide from './components/FrameworkGuide';
import RetentionSimulator from './components/RetentionSimulator';
import DeletionAuditLab from './components/DeletionAuditLab';
import AnonymizationLab from './components/AnonymizationLab';
import ShadowITLab from './components/ShadowITLab';
import ConsentCrisisLab from './components/ConsentCrisisLab';
import MistakesQuiz from './components/MistakesQuiz';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.OVERVIEW);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.OVERVIEW:
        return <Overview onStart={() => setActiveTab(Tab.COURSE)} />;
      case Tab.COURSE:
        return <FrameworkGuide />;
      case Tab.SIMULATOR:
        return <RetentionSimulator />;
      case Tab.AUDIT:
        return <DeletionAuditLab />;
      case Tab.ANONYM:
        return <AnonymizationLab />;
      case Tab.SHADOW:
        return <ShadowITLab />;
      case Tab.CONSENT:
        return <ConsentCrisisLab />;
      case Tab.MISTAKES:
        return <MistakesQuiz />;
      default:
        return <Overview onStart={() => setActiveTab(Tab.COURSE)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
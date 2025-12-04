import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import FrameworkGuide from './components/FrameworkGuide';
import RetentionSimulator from './components/RetentionSimulator';
import MistakesQuiz from './components/MistakesQuiz';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.OVERVIEW);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.OVERVIEW:
        return <Overview />;
      case Tab.COURSE:
        return <FrameworkGuide />;
      case Tab.SIMULATOR:
        return <RetentionSimulator />;
      case Tab.MISTAKES:
        return <MistakesQuiz />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
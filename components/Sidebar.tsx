import React from 'react';
import { LayoutDashboard, BookOpen, Calculator, AlertTriangle, GraduationCap, FileKey } from 'lucide-react';
import { Tab } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: Tab.OVERVIEW, label: 'Yol Haritası', icon: LayoutDashboard },
    { id: Tab.COURSE, label: 'Ders Modülleri', icon: BookOpen },
    { id: Tab.SIMULATOR, label: 'Retention Planlayıcı', icon: Calculator },
    { id: Tab.AUDIT, label: 'İmha & Kanıt Labı', icon: FileKey }, // New Item
    { id: Tab.MISTAKES, label: 'Hata Sınavı', icon: AlertTriangle },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xl">
          <GraduationCap className="w-8 h-8" />
          <span>KVKK Akademi</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">Retention Uzmanlık Eğitimi</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
          <p className="font-semibold text-white mb-1">Eğitim Durumu:</p>
          <div className="w-full bg-slate-700 h-2 rounded-full mt-2">
            <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
          </div>
          <p className="mt-1 text-right text-[10px]">%75 Tamamlandı</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
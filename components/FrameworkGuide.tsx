import React, { useState } from 'react';
import { Database, Scale, Calendar, Trash2, ShieldCheck, BookOpen, ChevronRight, CheckSquare, PlayCircle, Book } from 'lucide-react';
import { COURSE_MODULES } from '../constants';

const FrameworkGuide: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'theory' | 'practical' | 'checklist'>('theory');

  const activeModule = COURSE_MODULES.find(m => m.id === activeModuleId) || COURSE_MODULES[0];
  
  // Icon mapping helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database': return <Database size={20} />;
      case 'Scale': return <Scale size={20} />;
      case 'Calendar': return <Calendar size={20} />;
      case 'Trash2': return <Trash2 size={20} />;
      case 'ShieldCheck': return <ShieldCheck size={20} />;
      case 'BookOpen': return <BookOpen size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Eğitim Modülleri</h2>
          <p className="text-slate-600">KVKK & GDPR Retention uyumu için kapsamlı müfredat.</p>
        </div>
        <div className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border shadow-sm">
            Modül {activeModuleId} / {COURSE_MODULES.length}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
        {/* Left Side: Module Navigation */}
        <div className="lg:w-1/4 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {COURSE_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => { setActiveModuleId(module.id); setActiveTab('theory'); }}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 border ${
                activeModuleId === module.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeModuleId === module.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                {getIcon(module.icon)}
              </div>
              <div className="flex-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${activeModuleId === module.id ? 'text-blue-200' : 'text-slate-400'}`}>
                    Ders {module.id}
                </span>
                <h3 className="font-semibold text-sm leading-tight">{module.title}</h3>
              </div>
              {activeModuleId === module.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>

        {/* Right Side: Module Content */}
        <div className="lg:w-3/4 bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl h-fit">
                        {getIcon(activeModule.icon)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{activeModule.title}</h1>
                        <p className="text-slate-600 mt-1">{activeModule.description}</p>
                    </div>
                </div>
                <div className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase">
                    {activeModule.duration}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 px-6">
                <button 
                    onClick={() => setActiveTab('theory')}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'theory' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    <Book size={16} /> Konu Anlatımı
                </button>
                <button 
                    onClick={() => setActiveTab('practical')}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'practical' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    <PlayCircle size={16} /> Uygulama Senaryosu
                </button>
                <button 
                    onClick={() => setActiveTab('checklist')}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'checklist' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    <CheckSquare size={16} /> Kontrol Listesi
                </button>
            </div>

            {/* Content Area */}
            <div className="p-8 overflow-y-auto flex-1 bg-slate-50/30">
                
                {/* THEORY TAB */}
                {activeTab === 'theory' && (
                    <div className="space-y-8 animate-fade-in">
                        {activeModule.theory.map((section, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-blue-500 pl-3">
                                    {section.title}
                                </h3>
                                <div className="space-y-3 text-slate-700 leading-relaxed">
                                    {section.content.map((p, i) => <p key={i}>{p}</p>)}
                                </div>
                                {section.bullets && (
                                    <ul className="mt-4 space-y-2">
                                        {section.bullets.map((b, i) => (
                                            <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {section.warning && (
                                    <div className="mt-4 bg-red-50 text-red-800 p-3 rounded-lg text-sm border border-red-100 flex gap-2">
                                        <ShieldCheck size={18} className="flex-shrink-0" />
                                        <span className="font-semibold">{section.warning}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* PRACTICAL TAB */}
                {activeTab === 'practical' && (
                    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900 font-medium">
                            {activeModule.practical.scenario}
                        </div>
                        
                        <h4 className="font-bold text-slate-900 mb-4">Adım Adım Çözüm:</h4>
                        <div className="space-y-4 mb-8">
                            {activeModule.practical.steps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <p className="text-slate-700">{step}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-green-800">
                            <span className="font-bold block mb-1">✅ Sonuç:</span>
                            {activeModule.practical.outcome}
                        </div>
                    </div>
                )}

                {/* CHECKLIST TAB */}
                {activeTab === 'checklist' && (
                    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Modül Tamamlama Kriterleri</h3>
                        <div className="space-y-3">
                            {activeModule.checklist.map((item, idx) => (
                                <label key={idx} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
                                    <span className="text-slate-700">{item}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <button 
                                onClick={() => {
                                    if(activeModuleId < COURSE_MODULES.length) {
                                        setActiveModuleId(activeModuleId + 1);
                                        setActiveTab('theory');
                                    }
                                }}
                                className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                            >
                                {activeModuleId === COURSE_MODULES.length ? 'Eğitimi Tamamla' : 'Sonraki Ders'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkGuide;
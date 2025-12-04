import React from 'react';
import { Shield, Clock, Filter, Trash2, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { COURSE_MODULES } from '../constants';

interface OverviewProps {
  onStart: () => void;
}

const Overview: React.FC<OverviewProps> = ({ onStart }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">KVKK/GDPR Retention Akademisi</h1>
            <p className="text-slate-600 mt-2 text-lg">
            Kurumsal veri saklama ve imha süreçlerini uçtan uca öğrenin ve uygulayın.
            </p>
        </div>
        <button 
            onClick={onStart}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2 cursor-pointer"
        >
            <Play size={20} fill="currentColor" /> Eğitime Başla
        </button>
      </header>

      {/* Course Roadmap / Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-blue-100 font-medium mb-1">Toplam Müfredat</h3>
                <div className="text-4xl font-bold">{COURSE_MODULES.length} Modül</div>
                <div className="mt-4 text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
                    Kapsamlı Teorik & Pratik Eğitim
                </div>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
         </div>
         
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <h3 className="text-slate-500 font-medium mb-2">Kazanılacak Yetkinlikler</h3>
            <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">Veri Envanteri</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">Hukuki Matris</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">Retention Schedule</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">Güvenli İmha</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">Denetim/Log</span>
            </div>
         </div>

         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center relative">
             <h3 className="text-slate-500 font-medium mb-2">Eğitim Durumu</h3>
             <div className="flex items-end gap-2 mb-2">
                 <span className="text-3xl font-bold text-slate-900">%0</span>
                 <span className="text-sm text-slate-400 mb-1">başlangıç</span>
             </div>
             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-blue-500 h-full w-0"></div>
             </div>
             <CheckCircle2 className="absolute top-6 right-6 text-slate-200 w-12 h-12" />
         </div>
      </div>

      {/* Pivot Logic Section - Expanded */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 text-center mb-8">
            <h2 className="text-2xl font-bold">Pivot Mantık: Uyumun 5 Altın Sorusu</h2>
            <p className="text-slate-400 mt-2">Herhangi bir veriyi saklamaya karar vermeden önce bu döngüyü tamamlayın.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {[
            { step: "1", text: "Amaç Nedir?", sub: "Neden topluyorum?" },
            { step: "2", text: "Hukuki Dayanak?", sub: "Hangi madde?" },
            { step: "3", text: "Süre?", sub: "İş süresi + Saklama" },
            { step: "4", text: "İmha Yöntemi?", sub: "Silme / Anonim." },
            { step: "5", text: "Sorumlu?", sub: "Hangi departman?" }
          ].map((item, idx) => (
            <div key={idx} className="group bg-slate-800/50 backdrop-blur hover:bg-slate-700 transition-colors border border-slate-700 p-4 rounded-xl flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg mb-3 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform">
                  {item.step}
              </div>
              <span className="font-bold text-white mb-1">{item.text}</span>
              <span className="text-xs text-slate-400">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lifecycle Visualization */}
      <div className="bg-white p-8 rounded-xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock className="text-slate-400" />
            Veri Yaşam Döngüsü (Lifecycle)
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full bg-green-50 p-4 rounded-lg border border-green-100 text-center relative group hover:shadow-md transition-all">
            <span className="absolute top-2 right-2 text-xs font-bold text-green-300">01</span>
            <span className="block font-bold text-green-800 mb-1">Veri Toplama</span>
            <span className="text-xs text-green-600">Aydınlatma Metni & Rıza</span>
          </div>
          <ArrowRight className="text-slate-300 rotate-90 md:rotate-0 flex-shrink-0" />
          <div className="flex-1 w-full bg-blue-50 p-4 rounded-lg border border-blue-100 text-center relative group hover:shadow-md transition-all">
            <span className="absolute top-2 right-2 text-xs font-bold text-blue-300">02</span>
            <span className="block font-bold text-blue-800 mb-1">Aktif Kullanım</span>
            <span className="text-xs text-blue-600">İş süreçlerinin yürütülmesi</span>
          </div>
          <ArrowRight className="text-slate-300 rotate-90 md:rotate-0 flex-shrink-0" />
          <div className="flex-1 w-full bg-orange-50 p-4 rounded-lg border border-orange-100 text-center relative group hover:shadow-md transition-all">
            <span className="absolute top-2 right-2 text-xs font-bold text-orange-300">03</span>
            <span className="block font-bold text-orange-800 mb-1">Bekleme (Retention)</span>
            <span className="text-xs text-orange-600">Yasal saklama süreleri</span>
          </div>
          <ArrowRight className="text-slate-300 rotate-90 md:rotate-0 flex-shrink-0" />
          <div className="flex-1 w-full bg-red-50 p-4 rounded-lg border border-red-100 text-center relative group hover:shadow-md transition-all">
            <span className="absolute top-2 right-2 text-xs font-bold text-red-300">04</span>
            <span className="block font-bold text-red-800 mb-1">İmha</span>
            <span className="text-xs text-red-600">Silme, Yok Etme, Anonimleştirme</span>
          </div>
        </div>
      </div>
      
      {/* Quick Access Grid */}
      <h2 className="text-xl font-bold text-slate-800 pt-4">Konu Başlıkları</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={onStart} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Shield size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">Amaçla Sınırlılık</h3>
          <p className="text-xs text-slate-500">Veri sadece amaç süresince tutulabilir.</p>
        </div>

        <div onClick={onStart} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Filter size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">Veri Minimizasyonu</h3>
          <p className="text-xs text-slate-500">Minimum veri ile maksimum iş.</p>
        </div>

        <div onClick={onStart} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-amber-300 transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Clock size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">Süre Belirleme</h3>
          <p className="text-xs text-slate-500">Ölçülebilir, net tarihler.</p>
        </div>

        <div onClick={onStart} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-red-300 transition-colors group cursor-pointer">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <Trash2 size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">SOP & İmha</h3>
          <p className="text-xs text-slate-500">Standart Operasyon Prosedürleri.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
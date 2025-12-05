import React, { useState } from 'react';
import { VenetianMask, Eye, ShieldAlert, CheckCircle, RefreshCw, Lock } from 'lucide-react';

// --- Types & Data ---

type Technique = 'NONE' | 'MASKING' | 'GENERALIZATION' | 'K_ANONYMITY';

interface Employee {
  id: number;
  name: string;
  dept: string;
  age: number;
  salary: number;
  city: string;
}

const RAW_DATA: Employee[] = [
  { id: 1, name: "Ahmet Yılmaz", dept: "İK", age: 29, salary: 15000, city: "İstanbul" },
  { id: 2, name: "Mehmet Demir", dept: "IT", age: 34, salary: 25000, city: "Ankara" },
  { id: 3, name: "Ayşe Kaya", dept: "İK", age: 31, salary: 16000, city: "İstanbul" },
  { id: 4, name: "Fatma Çelik", dept: "Finans", age: 45, salary: 30000, city: "İzmir" },
  { id: 5, name: "Can Öztürk", dept: "IT", age: 28, salary: 24000, city: "Ankara" },
  { id: 6, name: "Elif Sarı", dept: "Finans", age: 47, salary: 31000, city: "İzmir" },
];

const AnonymizationLab: React.FC = () => {
  const [technique, setTechnique] = useState<Technique>('NONE');

  // --- Logic for Data Transformation ---
  
  const getProcessedData = () => {
    return RAW_DATA.map(emp => {
      let p = { ...emp } as any;

      if (technique === 'MASKING') {
        // Simple Masking (Pseudonymization)
        p.name = emp.name.substring(0, 2) + "***";
        // Other fields remain exposed!
      } else if (technique === 'GENERALIZATION') {
        // Generalization (Range buckets)
        p.name = "PERSON_" + emp.id; // Remove direct identifier
        p.age = `${Math.floor(emp.age / 10) * 10}-${Math.floor(emp.age / 10) * 10 + 9}`;
        p.salary = `${Math.floor(emp.salary / 10000) * 10}k+`;
      } else if (technique === 'K_ANONYMITY') {
        // K-Anonymity (Suppression/Strong Generalization)
        p.name = "*";
        p.dept = emp.dept; // Quasi-identifier
        p.age = `${Math.floor(emp.age / 10) * 10}s`; // 20s, 30s
        p.city = emp.city; // Quasi-identifier
        p.salary = "Confidential"; // Sensitive attribute hidden or ranged
      }
      return p;
    });
  };

  const processedData = getProcessedData();

  // --- Risk Analysis Logic ---
  
  const getAnalysis = () => {
    switch (technique) {
      case 'NONE':
        return {
          riskLevel: 'CRITICAL',
          score: 100,
          color: 'text-red-600',
          bg: 'bg-red-50',
          title: "Açık Veri (Raw Data)",
          desc: "Tüm kimlik bilgileri açıkta. KVKK/GDPR ihlali kaçınılmaz.",
          hackerMsg: "Merhaba Ahmet! Maaşını, adresini, yaşını... her şeyi görüyorum."
        };
      case 'MASKING':
        return {
          riskLevel: 'HIGH',
          score: 80,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          title: "Maskeleme (Pseudonymization)",
          desc: "HATA: Bu anonimleştirme DEĞİLDİR! İsimleri gizlediniz ama 'İK departmanında İstanbul'da çalışan 29 yaşındaki kişi' tekildir. Dolaylı yoldan kimlik tespiti (Singling Out) yapılabilir.",
          hackerMsg: "İsmini gizledin ama İK'da 29 yaşında İstanbul'da tek kişi var. O sensin Ahmet, maaşın 15.000 TL!"
        };
      case 'GENERALIZATION':
        return {
          riskLevel: 'MEDIUM',
          score: 40,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          title: "Genelleştirme (Generalization)",
          desc: "İYİ BAŞLANGIÇ: Yaş ve maaş aralıklara alındı. Ancak grup boyutları küçükse (k-anonymity düşükse) hala tahmin yürütülebilir.",
          hackerMsg: "Hmm, İstanbul İK'da çalışanların hepsi 20-30 yaş aralığında ve 10k+ alıyor. Tam rakamı bilemem ama aralığı yakaladım."
        };
      case 'K_ANONYMITY':
        return {
          riskLevel: 'LOW',
          score: 10,
          color: 'text-green-600',
          bg: 'bg-green-50',
          title: "K-Anonimlik (K-Anonymity)",
          desc: "GÜVENLİ: Veriler gruplandı (k=2). Her satır en az 1 başka kişiyle aynı özelliklere sahip. Tekil kişiyi ayırt etmek imkansız hale getirildi.",
          hackerMsg: "Veriye bakıyorum ama kimin kim olduğunu anlayamıyorum. Ahmet mi Mehmet mi? Veriler birbirinin aynısı olmuş."
        };
      default:
        return { riskLevel: '', score: 0, color: '', bg: '', title: '', desc: '', hackerMsg: '' };
    }
  };

  const analysis = getAnalysis();

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Anonimleştirme Laboratuvarı</h2>
          <p className="text-slate-600">
            "İsimleri yıldızlayınca anonim oluyor" yanılgısını test edin.
          </p>
        </div>
        <button 
          onClick={() => setTechnique('NONE')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
        >
          <RefreshCw size={16} /> Sıfırla
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* Left Panel: Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Lock size={18} /> Teknik Seçimi
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setTechnique('NONE')}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  technique === 'NONE' ? 'bg-red-50 border-red-500 ring-1 ring-red-500' : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="font-bold text-slate-900">1. Hiçbir Şey Yapma</div>
                <div className="text-xs text-slate-500">Ham veri (Raw Data)</div>
              </button>

              <button
                onClick={() => setTechnique('MASKING')}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  technique === 'MASKING' ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500' : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="font-bold text-slate-900">2. Maskeleme</div>
                <div className="text-xs text-slate-500">A*** Y**** (Pseudonymization)</div>
              </button>

              <button
                onClick={() => setTechnique('GENERALIZATION')}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  technique === 'GENERALIZATION' ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500' : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="font-bold text-slate-900">3. Genelleştirme</div>
                <div className="text-xs text-slate-500">Yaş 30-40, Maaş 10k+</div>
              </button>

              <button
                onClick={() => setTechnique('K_ANONYMITY')}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  technique === 'K_ANONYMITY' ? 'bg-green-50 border-green-500 ring-1 ring-green-500' : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="font-bold text-slate-900">4. K-Anonimlik (k=2)</div>
                <div className="text-xs text-slate-500">İstatistiksel gizlilik</div>
              </button>
            </div>
          </div>

          {/* Hacker Bot Feedback */}
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <VenetianMask size={64} />
             </div>
             <h3 className="font-mono text-sm text-green-400 mb-2 flex items-center gap-2">
                <Eye size={14} /> HACKER_VIEW_BOT.exe
             </h3>
             <div className="font-mono text-sm leading-relaxed text-slate-300">
                "{analysis.hackerMsg}"
             </div>
             <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                    <span>Yeniden Kimlikleme Riski</span>
                    <span>{analysis.score}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ${
                            analysis.score > 70 ? 'bg-red-500' : analysis.score > 30 ? 'bg-amber-500' : 'bg-green-500'
                        }`} 
                        style={{ width: `${analysis.score}%` }}
                    ></div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Panel: Data Table & Analysis */}
        <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Analysis Header */}
            <div className={`p-6 rounded-xl border ${analysis.bg} ${analysis.color.replace('text', 'border')} border-opacity-20`}>
                <div className="flex items-start gap-3">
                    {analysis.score > 50 ? <ShieldAlert className={`w-6 h-6 ${analysis.color}`} /> : <CheckCircle className={`w-6 h-6 ${analysis.color}`} />}
                    <div>
                        <h3 className={`text-lg font-bold ${analysis.color}`}>{analysis.title}</h3>
                        <p className="text-slate-700 text-sm mt-1">{analysis.desc}</p>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1">
                <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 text-sm">
                    Veri Seti Önizleme (HR_SALARY_DB)
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">İsim</th>
                                <th className="p-4">Departman</th>
                                <th className="p-4">Şehir</th>
                                <th className="p-4">Yaş</th>
                                <th className="p-4">Maaş</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {processedData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-mono text-xs text-slate-400">{row.id}</td>
                                    <td className={`p-4 font-medium ${technique === 'NONE' ? 'text-slate-900' : 'text-slate-600'}`}>
                                        {row.name}
                                    </td>
                                    <td className="p-4">{row.dept}</td>
                                    <td className="p-4">{row.city}</td>
                                    <td className="p-4">{row.age}</td>
                                    <td className={`p-4 font-mono ${technique === 'NONE' ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                                        {typeof row.salary === 'number' ? row.salary.toLocaleString('tr-TR') + ' ₺' : row.salary}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AnonymizationLab;
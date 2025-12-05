import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Database, FileSpreadsheet, AlertTriangle, CheckCircle, Play, Timer, RotateCcw } from 'lucide-react';

// --- Types ---

interface System {
  id: string;
  name: string;
  type: 'CRM' | 'EMAIL' | 'SMS' | 'EXCEL';
  status: 'OPT-IN' | 'OPT-OUT' | 'SYNCED' | 'DELETED';
  description: string;
  latency: number; // artificial delay in ms to fix
}

const INITIAL_SYSTEMS: System[] = [
  { id: 'SYS_01', name: 'Master CRM', type: 'CRM', status: 'OPT-OUT', description: 'Ana Müşteri Veritabanı', latency: 0 },
  { id: 'SYS_02', name: 'MailChimp (3rd Party)', type: 'EMAIL', status: 'OPT-IN', description: 'E-posta Gönderim Aracı', latency: 1500 },
  { id: 'SYS_03', name: 'SMS Gateway', type: 'SMS', status: 'OPT-IN', description: 'Toplu SMS Paneli', latency: 1000 },
  { id: 'SYS_04', name: 'Sales_Leads_Q3.xlsx', type: 'EXCEL', status: 'OPT-IN', description: 'Satışçının Masaüstü Dosyası', latency: 2000 },
];

const ConsentCrisisLab: React.FC = () => {
  const [systems, setSystems] = useState<System[]>(INITIAL_SYSTEMS);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds to clean up
  const [gameState, setGameState] = useState<'IDLE' | 'RUNNING' | 'FINISHED'>('IDLE');
  const [outcome, setOutcome] = useState<'SUCCESS' | 'FAILURE'>('SUCCESS'); // Default success, proves failure later
  const [outcomeMessage, setOutcomeMessage] = useState('');

  // --- Game Loop ---

  useEffect(() => {
    let timer: any;
    if (gameState === 'RUNNING' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'RUNNING' && timeLeft === 0) {
      // Time's up! Launch Campaign
      finishGame();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setSystems(INITIAL_SYSTEMS);
    setTimeLeft(15);
    setGameState('RUNNING');
    setOutcomeMessage('');
  };

  const finishGame = () => {
    setGameState('FINISHED');
    
    // Check if ANY system still has OPT-IN status
    const failedSystems = systems.filter(s => s.status === 'OPT-IN');
    
    if (failedSystems.length > 0) {
      setOutcome('FAILURE');
      setOutcomeMessage(`İHLAL TESPİT EDİLDİ! Kampanya gönderildi ancak ${failedSystems.length} sistemde (Örn: ${failedSystems[0].name}) veri hala 'Aktif' durumdaydı. Müşteri şikayet etti, KVKK cezası kesildi.`);
    } else {
      setOutcome('SUCCESS');
      setOutcomeMessage("TEBRİKLER! Kampanya gönderilmeden önce tüm kanalları senkronize etmeyi başardınız. Müşterinin rızası olmadığı için ona e-posta gitmedi.");
    }
  };

  // --- Actions ---

  const handleFix = (sys: System) => {
    if (gameState !== 'RUNNING') return;
    if (sys.status === 'OPT-OUT' || sys.status === 'SYNCED' || sys.status === 'DELETED') return;

    // Simulate "Processing..."
    setSystems(prev => prev.map(s => s.id === sys.id ? { ...s, status: 'SYNCED' } : s));
  };

  // Helper to get color/icon based on status
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'OPT-IN':
        return { color: 'bg-red-100 text-red-700 border-red-200', text: 'AKTİF (RİSKLİ)', icon: AlertTriangle };
      case 'OPT-OUT':
        return { color: 'bg-amber-100 text-amber-700 border-amber-200', text: 'İPTAL (GÜVENLİ)', icon: CheckCircle };
      case 'SYNCED':
        return { color: 'bg-green-100 text-green-700 border-green-200', text: 'SENKRONİZE', icon: CheckCircle };
      case 'DELETED':
        return { color: 'bg-slate-100 text-slate-500 border-slate-200', text: 'SİLİNDİ', icon: CheckCircle };
      default:
        return { color: 'bg-gray-100', text: '?', icon: AlertTriangle };
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Rıza Krizi Simülatörü</h2>
          <p className="text-slate-600">
            Müşteri "Beni Rahatsız Etmeyin" dedi. Peki tüm sistemleriniz bunu biliyor mu?
          </p>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Status & Timer */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Dashboard Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
             
             <div className="relative z-10 flex flex-col items-center text-center">
                {gameState === 'IDLE' ? (
                  <>
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-900/50">
                      <Play size={32} fill="currentColor" className="ml-1" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Simülasyonu Başlat</h3>
                    <p className="text-slate-400 text-sm mb-6">
                      Mehmet Bey pazarlama iznini iptal etti. 15 saniye içinde tüm sistemleri temizleyin.
                    </p>
                    <button 
                      onClick={startGame}
                      className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      BAŞLAT
                    </button>
                  </>
                ) : gameState === 'RUNNING' ? (
                  <>
                    <div className="text-sm font-bold text-red-400 mb-1 animate-pulse">KAMPANYA GÖNDERİMİNE</div>
                    <div className="text-6xl font-mono font-bold mb-4 tabular-nums">
                      00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-800 px-3 py-1 rounded-full">
                      <Timer size={12} />
                      <span>Zaman daralıyor! Kırmızı sistemlere tıkla.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      outcome === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {outcome === 'SUCCESS' ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {outcome === 'SUCCESS' ? 'BAŞARILI' : 'İHLAL'}
                    </h3>
                    <p className={`text-sm mb-6 ${outcome === 'SUCCESS' ? 'text-green-200' : 'text-red-200'}`}>
                      {outcomeMessage}
                    </p>
                    <button 
                      onClick={startGame}
                      className="flex items-center gap-2 mx-auto text-slate-400 hover:text-white transition-colors"
                    >
                      <RotateCcw size={16} /> Tekrar Dene
                    </button>
                  </>
                )}
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">Senaryo Detayı</h3>
             <ul className="space-y-3 text-sm text-slate-600">
               <li className="flex items-start gap-2">
                 <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                 <span>Veri Sahibi: Mehmet Yılmaz</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                 <span>Talep: İletişim İzni İptali (Opt-out)</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                 <span>Risk: Master CRM güncellendi ancak bağlı sistemler senkronize değil.</span>
               </li>
             </ul>
          </div>

        </div>

        {/* Right: Systems Grid */}
        <div className="lg:col-span-2">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {systems.map((sys) => {
               const statusStyle = getStatusDisplay(sys.status);
               const Icon = sys.type === 'EMAIL' ? Mail : sys.type === 'SMS' ? MessageSquare : sys.type === 'EXCEL' ? FileSpreadsheet : Database;
               
               return (
                 <button
                   key={sys.id}
                   onClick={() => handleFix(sys)}
                   disabled={gameState !== 'RUNNING'}
                   className={`relative p-6 rounded-xl border-2 text-left transition-all duration-200 group ${
                     sys.status === 'OPT-IN' && gameState === 'RUNNING'
                       ? 'border-red-400 bg-red-50 hover:bg-red-100 hover:scale-[1.02] shadow-md cursor-pointer'
                       : 'border-slate-200 bg-white cursor-default'
                   } ${sys.status === 'SYNCED' ? 'bg-green-50 border-green-200' : ''}`}
                 >
                   <div className="flex items-start justify-between mb-4">
                     <div className={`p-3 rounded-lg ${sys.status === 'OPT-IN' ? 'bg-white text-red-500' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon size={24} />
                     </div>
                     <div className={`px-2 py-1 rounded text-[10px] font-bold border ${statusStyle.color}`}>
                        {statusStyle.text}
                     </div>
                   </div>
                   
                   <h4 className="font-bold text-slate-800 text-lg">{sys.name}</h4>
                   <p className="text-xs text-slate-500 mt-1">{sys.description}</p>
                   
                   {sys.status === 'OPT-IN' && gameState === 'RUNNING' && (
                     <div className="mt-4 text-center bg-red-600 text-white py-2 rounded-lg text-sm font-bold shadow-sm group-hover:bg-red-700 transition-colors">
                        TIKLA & DURDUR
                     </div>
                   )}
                 </button>
               );
             })}
           </div>

           {/* Lesson Info */}
           <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-900 text-sm">
              <p className="font-bold flex items-center gap-2 mb-1">
                 <Database size={16} />
                 Entegrasyon Riski
              </p>
              <p>
                 Çoğu KVKK ihlali, "Ana veritabanında sildim ama Excel listesinde unuttum" veya "API bağlantısı koptuğu için Mailchimp güncellenmedi" gibi sebeplerden kaynaklanır. Retention sadece silmek değil, tüm kopyaları yönetmektir.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ConsentCrisisLab;
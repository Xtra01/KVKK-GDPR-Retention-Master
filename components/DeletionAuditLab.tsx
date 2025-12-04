import React, { useState } from 'react';
import { Trash2, AlertTriangle, ShieldCheck, Search, FileJson, XCircle, CheckCircle2, RefreshCw } from 'lucide-react';

interface MockRecord {
  id: string;
  name: string;
  email: string;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED';
}

interface AuditLog {
  timestamp: string;
  action: string;
  actor: string;
  targetId: string;
  details: any;
}

const INITIAL_RECORDS: MockRecord[] = [
  { id: 'USR_1092', name: 'Ayşe Yılmaz', email: 'ayse.yilmaz@example.com', expiryDate: '2023-10-01', status: 'EXPIRED' },
  { id: 'USR_1093', name: 'Mehmet Demir', email: 'mehmet.demir@test.com', expiryDate: '2023-09-15', status: 'EXPIRED' },
  { id: 'USR_1094', name: 'Canan Kaya', email: 'canan.k@demo.net', expiryDate: '2024-01-01', status: 'ACTIVE' },
];

const DeletionAuditLab: React.FC = () => {
  const [records, setRecords] = useState<MockRecord[]>(INITIAL_RECORDS);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [generatedLog, setGeneratedLog] = useState<AuditLog | null>(null);
  const [simulationResult, setSimulationResult] = useState<{ score: number; message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const selectedRecord = records.find(r => r.id === selectedRecordId);

  const resetSimulation = () => {
    setRecords(INITIAL_RECORDS);
    setSelectedRecordId(null);
    setGeneratedLog(null);
    setSimulationResult(null);
  };

  // --- ACTION HANDLERS ---

  // 1. Soft Delete (Bad Practice for Retention)
  const handleSoftDelete = () => {
    if (!selectedRecord) return;
    
    // Simulate Action
    const log: AuditLog = {
      timestamp: new Date().toISOString(),
      action: 'UPDATE_STATUS',
      actor: 'system_admin',
      targetId: selectedRecord.id,
      details: { previousStatus: 'EXPIRED', newStatus: 'DELETED_FLAG' }
    };
    
    setGeneratedLog(log);
    setSimulationResult({
      score: 0,
      type: 'error',
      message: "HATA: Veriyi gerçekten silmediniz, sadece 'silindi' etiketi yapıştırdınız (Soft Delete). Veritabanında hala duruyor. KVKK 'yok etme' şartını sağlamadınız."
    });
  };

  // 2. Verbose Hard Delete (Privacy Violation in Logs)
  const handleVerboseDelete = () => {
    if (!selectedRecord) return;

    // Simulate removing from DB
    setRecords(records.filter(r => r.id !== selectedRecord.id));

    // GENERATE BAD LOG
    const log: AuditLog = {
      timestamp: new Date().toISOString(),
      action: 'HARD_DELETE',
      actor: 'system_admin',
      targetId: selectedRecord.id,
      details: { 
        deletedData: {
          name: selectedRecord.name,
          email: selectedRecord.email // PRIVACY LEAK!
        }
      }
    };

    setGeneratedLog(log);
    setSimulationResult({
      score: 20,
      type: 'warning',
      message: "KRİTİK HATA: Veritabanından sildiniz AMA log dosyasına verinin kopyasını yazdınız! 'DeletedData' içinde e-posta adresi açıkça duruyor. Şimdi log dosyasını korumak zorundasınız."
    });
  };

  // 3. Secure Purge (Correct)
  const handleSecurePurge = () => {
    if (!selectedRecord) return;

    setRecords(records.filter(r => r.id !== selectedRecord.id));

    // GENERATE PERFECT LOG
    const log: AuditLog = {
      timestamp: new Date().toISOString(),
      action: 'SECURE_PURGE',
      actor: 'retention_bot_v2',
      targetId: selectedRecord.id, // Only ID
      details: { 
        method: 'DOD_5220.22-M',
        verificationHash: 'a1b2c3d4...', 
        piiRemoved: true
      }
    };

    setGeneratedLog(log);
    setSimulationResult({
      score: 100,
      type: 'success',
      message: "MÜKEMMEL: Veri silindi ve log dosyasında kişisel veri (PII) bırakılmadı. Sadece 'Kimi' (ID) ve 'Ne zaman' sildiğinizin teknik kanıtı var."
    });
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">İmha & Kanıt Laboratuvarı</h2>
          <p className="text-slate-600">Veriyi silmek yetmez, doğru sildiğinizi kanıtlamanız (Accountability) gerekir.</p>
        </div>
        <button onClick={resetSimulation} className="text-sm flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
            <RefreshCw size={16} /> Simülasyonu Sıfırla
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* LEFT COLUMN: Expired Data Queue */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Search size={18} /> İmha Kuyruğu
            </h3>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
              {records.filter(r => r.status === 'EXPIRED').length} Kritik
            </span>
          </div>
          <div className="p-2 space-y-2 overflow-y-auto flex-1">
            {records.map(record => (
              <button
                key={record.id}
                onClick={() => { setSelectedRecordId(record.id); setGeneratedLog(null); setSimulationResult(null); }}
                disabled={record.status === 'ACTIVE'}
                className={`w-full text-left p-4 rounded-lg border transition-all relative ${
                  selectedRecordId === record.id
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                    : record.status === 'ACTIVE' 
                        ? 'opacity-50 bg-slate-50 cursor-not-allowed border-transparent'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-xs text-slate-500">{record.id}</span>
                    {record.status === 'EXPIRED' ? (
                        <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded">SÜRESİ DOLDU</span>
                    ) : (
                        <span className="text-[10px] font-bold bg-green-100 text-green-600 px-1.5 py-0.5 rounded">AKTİF</span>
                    )}
                </div>
                <div className="font-bold text-slate-800">{record.name}</div>
                <div className="text-sm text-slate-500">{record.email}</div>
                <div className="text-xs text-slate-400 mt-2">Bitiş: {record.expiryDate}</div>
              </button>
            ))}
            {records.length === 0 && (
                <div className="text-center p-8 text-slate-400">Tüm veriler temizlendi.</div>
            )}
          </div>
        </div>

        {/* MIDDLE COLUMN: Action Console */}
        <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg min-h-[200px] flex flex-col justify-center items-center text-center relative overflow-hidden">
                {!selectedRecord ? (
                    <div className="text-slate-500">
                        <Search className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>Soldan bir kayıt seçin</p>
                    </div>
                ) : simulationResult ? (
                    <div className="animate-fade-in w-full">
                         <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                             simulationResult.type === 'success' ? 'bg-green-500' : simulationResult.type === 'error' ? 'bg-red-500' : 'bg-amber-500'
                         }`}>
                             {simulationResult.type === 'success' ? <CheckCircle2 size={32} /> : simulationResult.type === 'error' ? <XCircle size={32} /> : <AlertTriangle size={32} />}
                         </div>
                         <h3 className="text-xl font-bold mb-1">Kanıt Skoru: %{simulationResult.score}</h3>
                         <p className={`text-sm ${simulationResult.type === 'success' ? 'text-green-200' : simulationResult.type === 'error' ? 'text-red-200' : 'text-amber-200'}`}>
                             {simulationResult.type === 'success' ? 'DENETİMDEN GEÇTİ' : 'DENETİMDEN KALDI'}
                         </p>
                    </div>
                ) : (
                    <div className="space-y-4 w-full animate-fade-in">
                        <div className="text-sm text-slate-400 mb-2">Seçili Kayıt: <span className="text-white font-mono">{selectedRecord.name}</span></div>
                        <p className="text-xs text-slate-300 mb-4">Bu verinin yasal saklama süresi doldu. Ne yapmak istersiniz?</p>
                        
                        <button onClick={handleSoftDelete} className="w-full bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center group-hover:bg-slate-700">1</div>
                            <div>
                                <div className="font-bold">Soft Delete (Flag)</div>
                                <div className="text-[10px] text-slate-400">Veriyi gizle, silme.</div>
                            </div>
                        </button>

                        <button onClick={handleVerboseDelete} className="w-full bg-amber-900/40 hover:bg-amber-900/60 p-3 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-3 group border border-amber-900/30">
                             <div className="w-8 h-8 rounded bg-amber-900/50 flex items-center justify-center text-amber-200">2</div>
                            <div className="text-amber-100">
                                <div className="font-bold">Hard Delete (Verbose)</div>
                                <div className="text-[10px] text-amber-200/60">Sil ve tüm detayları logla.</div>
                            </div>
                        </button>

                        <button onClick={handleSecurePurge} className="w-full bg-blue-900/40 hover:bg-blue-900/60 p-3 rounded-lg text-sm font-medium transition-colors text-left flex items-center gap-3 group border border-blue-900/30">
                            <div className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center text-blue-200">3</div>
                            <div className="text-blue-100">
                                <div className="font-bold">Secure Purge & Audit</div>
                                <div className="text-[10px] text-blue-200/60">Güvenli imha ve anonim log.</div>
                            </div>
                        </button>
                    </div>
                )}
            </div>

            {/* Educational Feedback Box */}
            {simulationResult && (
                 <div className={`p-4 rounded-xl border text-sm ${
                    simulationResult.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' 
                    : simulationResult.type === 'error' ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                 }`}>
                     <span className="font-bold block mb-2 underline">Uzman Görüşü:</span>
                     {simulationResult.message}
                 </div>
            )}
        </div>

        {/* RIGHT COLUMN: The Audit Log Viewer */}
        <div className="lg:col-span-4 bg-slate-900 rounded-xl shadow-lg border border-slate-800 flex flex-col font-mono text-xs overflow-hidden">
            <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center gap-2 text-slate-400">
                <FileJson size={14} />
                <span>audit_log_viewer.json</span>
            </div>
            <div className="p-4 text-green-400 overflow-y-auto flex-1">
                {!generatedLog ? (
                    <span className="text-slate-600">Waiting for system event...<br/>Ready to capture audit trail.</span>
                ) : (
                    <div className="animate-pulse-once">
                        <span className="text-slate-500">{"// KVKK/GDPR Compliance Audit Record"}</span>
                        <br/>
                        <span className="text-purple-400">{"{"}</span>
                        <div className="pl-4">
                            <span className="text-blue-400">"timestamp"</span>: <span className="text-orange-300">"{generatedLog.timestamp}"</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-blue-400">"action"</span>: <span className="text-orange-300">"{generatedLog.action}"</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-blue-400">"actor"</span>: <span className="text-orange-300">"{generatedLog.actor}"</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-blue-400">"target_id"</span>: <span className="text-orange-300">"{generatedLog.targetId}"</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-blue-400">"details"</span>: <span className="text-purple-400">{"{"}</span>
                            {Object.entries(generatedLog.details).map(([key, value], idx) => (
                                <div key={key} className="pl-4">
                                     <span className={`${
                                         key === 'deletedData' || key === 'email' ? 'text-red-500 font-bold bg-red-900/20' : 'text-blue-400'
                                     }`}>"{key}"</span>: 
                                     <span className={`${
                                          typeof value === 'object' ? 'text-slate-300' : 'text-orange-300'
                                     }`}>
                                         {typeof value === 'object' ? JSON.stringify(value) : `"${value}"`}
                                     </span>
                                     {idx < Object.entries(generatedLog.details).length - 1 && ","}
                                     {(key === 'deletedData' || key === 'email') && <span className="text-red-500 ml-2">{'<-- İHLAL!'}</span>}
                                </div>
                            ))}
                            <span className="text-purple-400">{"}"}</span>
                        </div>
                        <span className="text-purple-400">{"}"}</span>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default DeletionAuditLab;

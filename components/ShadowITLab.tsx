import React, { useState } from 'react';
import { Search, Laptop, Server, Cloud, FileSpreadsheet, FileText, AlertTriangle, CheckCircle, ShieldAlert, Trash2, Save, HardDrive } from 'lucide-react';

// --- Mock Data ---

interface ShadowFile {
  id: string;
  name: string;
  path: string;
  type: 'EXCEL' | 'SQL' | 'PDF';
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  isCompliant: boolean; // Is it in the official inventory?
}

interface Device {
  id: string;
  name: string;
  type: 'LAPTOP' | 'SERVER' | 'CLOUD';
  owner: string;
  files: ShadowFile[];
  scanned: boolean;
}

const INITIAL_DEVICES: Device[] = [
  {
    id: 'DEV_01',
    name: 'HR_Director_Laptop',
    type: 'LAPTOP',
    owner: 'İK Müdürü',
    scanned: false,
    files: [
      { id: 'F1', name: 'Tum_Maaslar_Yedek_2022.xlsx', path: 'C:/Users/Admin/Desktop/Gizli', type: 'EXCEL', riskLevel: 'HIGH', description: 'Şifresiz maaş listesi yedeği.', isCompliant: false },
      { id: 'F2', name: 'Performance_Review_Template.pdf', path: 'C:/Docs', type: 'PDF', riskLevel: 'LOW', description: 'Boş şablon.', isCompliant: true }
    ]
  },
  {
    id: 'DEV_02',
    name: 'Marketing_Dropbox',
    type: 'CLOUD',
    owner: 'Pazarlama Ekibi',
    scanned: false,
    files: [
      { id: 'F3', name: 'Newsletter_Subscribers_FULL.csv', path: '/Shared/Old_Lists', type: 'EXCEL', riskLevel: 'HIGH', description: '2019 yılından kalma müşteri listesi. Rızalar güncel değil.', isCompliant: false }
    ]
  },
  {
    id: 'DEV_03',
    name: 'Dev_Test_Server',
    type: 'SERVER',
    owner: 'Yazılım Ekibi',
    scanned: false,
    files: [
      { id: 'F4', name: 'Prod_DB_Dump.sql', path: '/var/www/html/backups', type: 'SQL', riskLevel: 'HIGH', description: 'Canlı veritabanının testi sunucusundaki kopyası.', isCompliant: false }
    ]
  }
];

const ShadowITLab: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [score, setScore] = useState(0);
  const [actionLog, setActionLog] = useState<string[]>([]);

  const selectedDevice = devices.find(d => d.id === selectedDeviceId);

  // --- Actions ---

  const handleScan = () => {
    if (!selectedDeviceId) return;
    setIsScanning(true);
    setTimeout(() => {
      setDevices(prev => prev.map(d => d.id === selectedDeviceId ? { ...d, scanned: true } : d));
      setIsScanning(false);
    }, 1500);
  };

  const handleAction = (file: ShadowFile, action: 'DELETE' | 'INVENTORY' | 'IGNORE') => {
    let points = 0;
    let msg = '';

    if (file.riskLevel === 'HIGH') {
      if (action === 'DELETE') {
        points = 20;
        msg = `✅ BAŞARILI: ${file.name} yerel diskten silindi. Risk ortadan kalktı.`;
      } else if (action === 'INVENTORY') {
        points = 10;
        msg = `⚠️ UYARI: ${file.name} envantere eklendi ama hala yerel diskte duruyor. Güvenli sunucuya taşınmalıydı.`;
      } else {
        points = -20;
        msg = `❌ HATA: ${file.name} gibi yüksek riskli bir dosya görmezden gelinemez!`;
      }
    } else {
      if (action === 'IGNORE') {
        points = 5;
        msg = `✅ Doğru: ${file.name} risk oluşturmuyor.`;
      } else {
        points = 5;
        msg = `OK: İşlem yapıldı.`;
      }
    }

    setScore(prev => prev + points);
    setActionLog(prev => [msg, ...prev]);

    // Remove file from view to simulate action
    setDevices(prev => prev.map(d => {
      if (d.id === selectedDeviceId) {
        return { ...d, files: d.files.filter(f => f.id !== file.id) };
      }
      return d;
    }));
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Gölge Veri Avcısı (Shadow IT)</h2>
          <p className="text-slate-600">
            Resmi envanterde görünmeyen, çalışanların cihazlarında unutulmuş riskli verileri bulun.
          </p>
        </div>
        <div className="bg-slate-900 text-white px-6 py-2 rounded-xl flex items-center gap-3 shadow-lg">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avcı Skoru</span>
           <span className={`text-2xl font-bold ${score > 0 ? 'text-green-400' : score < 0 ? 'text-red-400' : 'text-white'}`}>
             {score}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* LEFT: Device Map */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
           <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 flex items-center gap-2">
             <Search size={18} /> Ağ Tarayıcısı
           </div>
           <div className="p-4 space-y-3 flex-1 overflow-y-auto">
             {devices.map(device => (
               <button
                 key={device.id}
                 onClick={() => setSelectedDeviceId(device.id)}
                 className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group ${
                   selectedDeviceId === device.id 
                     ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                     : 'bg-white border-slate-200 hover:border-blue-300'
                 }`}
               >
                 <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                    selectedDeviceId === device.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                 }`}>
                    {device.type === 'LAPTOP' && <Laptop size={24} />}
                    {device.type === 'SERVER' && <Server size={24} />}
                    {device.type === 'CLOUD' && <Cloud size={24} />}
                 </div>
                 <div className="flex-1">
                    <div className="font-bold text-slate-800">{device.name}</div>
                    <div className="text-xs text-slate-500">{device.owner}</div>
                 </div>
                 {device.scanned ? (
                    <CheckCircle size={20} className="text-green-500" />
                 ) : (
                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                 )}
               </button>
             ))}
           </div>
        </div>

        {/* CENTER: Scanner Interface */}
        <div className="lg:col-span-5 flex flex-col gap-4">
           <div className="bg-slate-900 text-white rounded-xl shadow-lg flex-1 border border-slate-800 relative overflow-hidden flex flex-col">
              
              {/* Screen Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
                 <div className="flex items-center gap-2 text-sm font-mono text-blue-400">
                    <HardDrive size={16} />
                    <span>{selectedDevice ? selectedDevice.id : 'NO_DEVICE_SELECTED'}</span>
                 </div>
                 {selectedDevice && !selectedDevice.scanned && (
                    <button 
                        onClick={handleScan}
                        disabled={isScanning}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors disabled:opacity-50"
                    >
                        {isScanning ? 'TARANIYOR...' : 'TARAMAYI BAŞLAT'}
                    </button>
                 )}
              </div>

              {/* Screen Content */}
              <div className="p-6 flex-1 relative">
                 {!selectedDevice ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-600">
                        <Search size={48} className="mb-4 opacity-20" />
                        <p>Soldan bir cihaz seçin.</p>
                    </div>
                 ) : isScanning ? (
                    <div className="h-full flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-blue-400 font-mono text-sm animate-pulse">Sistem taranıyor...</p>
                        <p className="text-slate-500 text-xs mt-2">Dizinler kontrol ediliyor: /Users/Admin/...</p>
                    </div>
                 ) : !selectedDevice.scanned ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500">
                        <ShieldAlert size={48} className="mb-4 text-amber-500 opacity-80" />
                        <p className="text-center max-w-xs">Bu cihaz henüz denetlenmedi. Gölge veri riski taşıyor olabilir.</p>
                    </div>
                 ) : selectedDevice.files.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-green-500">
                        <CheckCircle size={48} className="mb-4" />
                        <p>Temiz! Bu cihazda riskli dosya bulunamadı.</p>
                    </div>
                 ) : (
                    <div className="space-y-4 animate-fade-in">
                        <h3 className="text-red-400 font-mono text-xs mb-2">⚠ RİSKLİ DOSYALAR TESPİT EDİLDİ ({selectedDevice.files.length})</h3>
                        {selectedDevice.files.map(file => (
                            <div key={file.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="p-2 bg-slate-700 rounded text-slate-300">
                                        {file.type === 'EXCEL' ? <FileSpreadsheet size={20} /> : <FileText size={20} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-white truncate" title={file.name}>{file.name}</div>
                                        <div className="text-xs text-slate-400 truncate">{file.path}</div>
                                        <div className="text-xs text-red-300 mt-1">{file.description}</div>
                                    </div>
                                    <div className="text-xs font-bold bg-red-900/50 text-red-400 px-2 py-1 rounded border border-red-900">
                                        {file.riskLevel}
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 mt-2">
                                    <button 
                                        onClick={() => handleAction(file, 'DELETE')}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Trash2 size={14} /> İmha Et
                                    </button>
                                    <button 
                                        onClick={() => handleAction(file, 'INVENTORY')}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Save size={14} /> Envantere Al
                                    </button>
                                    <button 
                                        onClick={() => handleAction(file, 'IGNORE')}
                                        className="px-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-xs font-bold transition-colors"
                                    >
                                        Yok Say
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* RIGHT: Action Log */}
        <div className="lg:col-span-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col overflow-hidden h-full max-h-[600px]">
            <div className="p-4 border-b border-slate-200 font-bold text-slate-700 text-sm">
                Denetim Günlüğü
            </div>
            <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
                {actionLog.length === 0 && (
                    <div className="text-slate-400 italic text-center mt-10">Henüz işlem yapılmadı.</div>
                )}
                {actionLog.map((log, idx) => (
                    <div key={idx} className={`p-3 rounded border ${
                        log.includes('✅') ? 'bg-green-50 border-green-200 text-green-800' :
                        log.includes('❌') ? 'bg-red-50 border-red-200 text-red-800' :
                        'bg-amber-50 border-amber-200 text-amber-800'
                    }`}>
                        {log}
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ShadowITLab;
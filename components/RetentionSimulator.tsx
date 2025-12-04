import React, { useState } from 'react';
import { Plus, Trash2, FileText, AlertCircle } from 'lucide-react';
import { DEPARTMENTS, LEGAL_BASES } from '../constants';
import { ScheduleItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RetentionSimulator: React.FC = () => {
  const [items, setItems] = useState<ScheduleItem[]>([
    { id: '1', department: 'HR', category: 'Çalışan Sözleşmesi', purpose: 'İş Akdi', legalBasis: 'Sözleşmenin İfası', retentionPeriod: 10, method: 'Fiziksel İmha' },
    { id: '2', department: 'Marketing', category: 'E-posta Listesi', purpose: 'Kampanya', legalBasis: 'Açık Rıza', retentionPeriod: 1, method: 'Anonimleştirme' }
  ]);

  const [form, setForm] = useState({
    department: DEPARTMENTS[0],
    category: '',
    purpose: '',
    legalBasis: LEGAL_BASES[0],
    retentionPeriod: 2,
    method: 'Mantıksal Silme'
  });

  const handleAdd = () => {
    if (!form.category || !form.purpose) return;
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      ...form
    };
    setItems([...items, newItem]);
    setForm({ ...form, category: '', purpose: '' });
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  // Prepare Chart Data
  const chartData = items.map(item => ({
    name: item.category.length > 10 ? item.category.substring(0, 10) + '...' : item.category,
    years: item.retentionPeriod,
    fullCategory: item.category
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Retention Planlayıcı (Simulator)</h2>
          <p className="text-slate-600">Kendi saklama takviminizi oluşturun ve veri yükünü görselleştirin.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm">
            Toplam Kayıt: {items.length}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="xl:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-500" /> Yeni Veri Kategorisi Ekle
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Departman</label>
              <select 
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.department}
                onChange={e => setForm({...form, department: e.target.value})}
              >
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Veri Kategorisi</label>
              <input 
                type="text" 
                placeholder="Örn: Müşteri CV'si"
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">İşleme Amacı</label>
              <input 
                type="text" 
                placeholder="Örn: İşe alım değerlendirmesi"
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.purpose}
                onChange={e => setForm({...form, purpose: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hukuki Dayanak</label>
              <select 
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.legalBasis}
                onChange={e => setForm({...form, legalBasis: e.target.value})}
              >
                {LEGAL_BASES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Saklama Süresi (Yıl)</label>
                    <input 
                        type="number" 
                        min="0"
                        className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={form.retentionPeriod}
                        onChange={e => setForm({...form, retentionPeriod: parseInt(e.target.value) || 0})}
                    />
                </div>
            </div>
            
            <button 
                onClick={handleAdd}
                disabled={!form.category || !form.purpose}
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors"
            >
                Listeye Ekle
            </button>
          </div>

          <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-100 text-xs text-amber-800 flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>Saklama süresi sona erdiğinde, seçilen imha yöntemini (Silme/Anonimleştirme) uygulamayı unutmayın.</p>
          </div>
        </div>

        {/* Visualization & List Section */}
        <div className="xl:col-span-2 space-y-6">
            
            {/* Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-64">
                <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wide">Saklama Süresi Analizi (Yıl)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="years" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-medium">Departman</th>
                                <th className="p-4 font-medium">Kategori</th>
                                <th className="p-4 font-medium">Dayanak</th>
                                <th className="p-4 font-medium">Süre</th>
                                <th className="p-4 font-medium">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-medium text-slate-900">{item.department.split(' ')[0]}</td>
                                    <td className="p-4 text-slate-700">
                                        <div className="flex flex-col">
                                            <span>{item.category}</span>
                                            <span className="text-xs text-slate-400">{item.purpose}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100">
                                            {item.legalBasis}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-slate-700">{item.retentionPeriod} Yıl</td>
                                    <td className="p-4">
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-400">
                                        Henüz veri eklenmedi. Soldaki formu kullanın.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RetentionSimulator;

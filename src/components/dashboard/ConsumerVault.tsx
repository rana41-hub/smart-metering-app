import { useState } from 'react';
import { Search, PowerOff, ShieldAlert, ShieldCheck } from 'lucide-react';

const generateConsumers = () => [
    { id: 'C-882194', name: 'Alambagh Sector 4', balance: 1450.00, kwh: 342, health: 98, risk: 'low', disconnected: false },
    { id: 'C-992311', name: 'Gomti Nagar Ext', balance: 890.50, kwh: 512, health: 95, risk: 'low', disconnected: false },
    { id: 'C-441092', name: 'Indira Nagar B', balance: -120.00, kwh: 890, health: 42, risk: 'high', disconnected: false },
    { id: 'C-773410', name: 'Chowk Market', balance: 45.00, kwh: 1205, health: 12, risk: 'critical', disconnected: false },
    { id: 'C-558901', name: 'Hazratganj Comm', balance: 12400.00, kwh: 4500, health: 100, risk: 'low', disconnected: false },
    { id: 'C-229044', name: 'Aashiana Res', balance: 340.00, kwh: 210, health: 88, risk: 'medium', disconnected: false },
];

export function ConsumerVault() {
    const [consumers, setConsumers] = useState(generateConsumers());
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = consumers.filter(c => c.id.includes(searchTerm) || c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleToggleDisconnect = (id: string) => {
        setConsumers(prev => prev.map(c => c.id === id ? { ...c, disconnected: !c.disconnected } : c));
    };

    return (
        <div className="h-full w-full bg-navy-800 border border-cyan-500/20 rounded-md flex flex-col min-h-[400px]">

            {/* Header & Search */}
            <div className="p-4 border-b border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-cyan-400 font-mono text-xs font-bold tracking-widest">CONSUMER VAULT</h2>
                    <p className="text-[10px] text-slate-500 font-mono">Real-time Account Health & Katiya Detection</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/50" size={14} />
                    <input
                        type="text"
                        placeholder="Search ID or Zone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-900 border border-cyan-500/30 text-slate-200 text-xs font-mono rounded pl-9 pr-4 py-2 focus:outline-none focus:border-cyan-glow w-full sm:w-64 transition-colors placeholder:text-slate-600"
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-slate-900/50 text-slate-400 sticky top-0 backdrop-blur z-10">
                        <tr>
                            <th className="py-3 px-4 font-normal tracking-wider">ACCOUNT</th>
                            <th className="py-3 px-4 font-normal tracking-wider">PREPAID BAL</th>
                            <th className="py-3 px-4 font-normal tracking-wider hidden sm:table-cell">30D USAGE</th>
                            <th className="py-3 px-4 font-normal tracking-wider">AI HEALTH SCORE</th>
                            <th className="py-3 px-4 font-normal text-right tracking-wider">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {filtered.map((consumer) => {
                            const isHighRisk = consumer.risk === 'critical' || consumer.risk === 'high';
                            return (
                                <tr key={consumer.id} className={`hover:bg-cyan-500/5 transition-colors group ${consumer.disconnected ? 'opacity-50 grayscale' : ''}`}>
                                    <td className="py-3 px-4">
                                        <div className="text-slate-200 font-bold flex items-center gap-2">
                                            {consumer.id}
                                            {consumer.disconnected && <span className="text-[9px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded border border-red-500/30">OFFLINE</span>}
                                        </div>
                                        <div className="text-[10px] text-slate-500 truncate max-w-[120px]">{consumer.name}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={consumer.balance < 0 ? 'text-red-400 font-bold' : 'text-slate-300'}>
                                            ₹{consumer.balance.toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 hidden sm:table-cell text-slate-400">
                                        {consumer.kwh} <span className="text-[10px]">kWh</span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            {isHighRisk ? (
                                                <ShieldAlert size={14} className="text-red-500 animate-pulse" />
                                            ) : (
                                                <ShieldCheck size={14} className="text-cyan-500" />
                                            )}
                                            <div className="flex-1 w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${isHighRisk ? 'bg-red-500' : consumer.risk === 'medium' ? 'bg-amber-500' : 'bg-cyan-500'}`}
                                                    style={{ width: `${consumer.health}%` }}
                                                />
                                            </div>
                                            <span className={`text-[10px] min-w-[3ch] ${isHighRisk ? 'text-red-400' : 'text-slate-400'}`}>
                                                {consumer.health}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        {isHighRisk && (
                                            <button
                                                onClick={() => handleToggleDisconnect(consumer.id)}
                                                className={`px-3 py-1.5 rounded border font-bold tracking-widest text-[10px] transition-all flex items-center justify-center gap-1.5 ml-auto ${consumer.disconnected
                                                    ? 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                                                    : 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500 hover:text-white'
                                                    }`}
                                            >
                                                <PowerOff size={12} />
                                                {consumer.disconnected ? 'RECONNECT' : 'DISCONNECT'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

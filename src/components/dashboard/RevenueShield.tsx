import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, AlertTriangle } from 'lucide-react';

const mockData = [
    { time: '00:00', sent: 4000, billed: 3900 },
    { time: '04:00', sent: 3500, billed: 3400 },
    { time: '08:00', sent: 7000, billed: 6100 },
    { time: '12:00', sent: 8500, billed: 7100 },
    { time: '16:00', sent: 9200, billed: 7500 }, // Huge loss spike
    { time: '20:00', sent: 8000, billed: 7800 },
];

export function RevenueShield() {
    const currentATCLoss = 18.5; // Example exceeding 15% threshold
    const isHighLoss = currentATCLoss > 15;

    return (
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 h-[500px]">

            {/* KPI Card */}
            <div className={`relative p-5 rounded-md border text-center flex flex-col justify-center shrink-0 h-40 overflow-hidden ${isHighLoss ? 'bg-red-500/10 border-red-500/40 shadow-[0_0_30px_rgba(255,0,60,0.15)]' : 'bg-navy-800 border-cyan-500/20'}`}>
                {/* Background glow effect */}
                {isHighLoss && <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-glow/20 blur-3xl rounded-full"></div>}

                <h3 className="text-slate-400 font-mono text-[10px] font-bold tracking-[0.2em] mb-2 z-10">CURRENT AT&C LOSS</h3>

                <div className={`text-5xl font-mono font-bold tracking-tighter z-10 flex items-center justify-center gap-2 ${isHighLoss ? 'text-red-glow drop-shadow-[0_0_10px_rgba(255,0,60,0.8)]' : 'text-cyan-glow'}`}>
                    {currentATCLoss}%
                    {isHighLoss && <AlertTriangle size={32} className="text-red-glow animate-pulse" />}
                </div>

                <div className="mt-2 text-[10px] text-slate-500 font-mono tracking-widest z-10 flex items-center justify-center gap-1">
                    <TrendingDown size={12} className={isHighLoss ? "text-red-500" : "text-cyan-500"} />
                    {isHighLoss ? 'CRITICAL LOSS THRESHOLD EXCEEDED' : 'WITHIN ACCEPTABLE MARGINS'}
                </div>
            </div>

            {/* Chart Widget */}
            <div className="flex-1 bg-navy-800 border border-cyan-500/20 rounded-md p-4 flex flex-col relative z-0">
                <div className="mb-4">
                    <h3 className="text-cyan-400 font-mono text-xs font-bold tracking-widest">LIVE RECONCILIATION</h3>
                    <p className="text-[10px] text-slate-500 font-mono">Substation Send vs Total Billed (MW)</p>
                </div>

                <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#06b6d4', borderRadius: '4px', border: '1px solid rgba(6,182,212,0.3)' }}
                                itemStyle={{ color: '#e2e8f0', fontSize: '12px', fontFamily: 'monospace' }}
                                labelStyle={{ color: '#94a3b8', fontSize: '10px', fontFamily: 'monospace', marginBottom: '4px' }}
                            />
                            <Area type="monotone" dataKey="sent" name="Sent (MW)" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorSent)" />
                            <Area type="monotone" dataKey="billed" name="Billed (MW)" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorBilled)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

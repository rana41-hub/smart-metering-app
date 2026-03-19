import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, AlertTriangle } from 'lucide-react';

const generateInitialData = () => {
    const data = [];
    const now = new Date();
    for (let i = 20; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        const sent = 5000 + Math.random() * 4000;
        data.push({
            time: time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
            sent: Math.floor(sent),
            billed: Math.floor(sent * (0.8 + Math.random() * 0.15))
        });
    }
    return data;
};

export function RevenueShield() {
    const [data, setData] = useState(generateInitialData());
    const [currentATCLoss, setCurrentATCLoss] = useState(18.5);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const newTime = new Date();
                const newSent = 5000 + Math.random() * 4000;
                const newBilled = newSent * (0.8 + Math.random() * 0.15);
                
                // Also slightly update AT&C loss
                const newLoss = ((newSent - newBilled) / newSent) * 100;
                setCurrentATCLoss(prevLoss => Number(((prevLoss * 0.8) + (newLoss * 0.2)).toFixed(1)));
                
                const newDataPoint = {
                    time: newTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                    sent: Math.floor(newSent),
                    billed: Math.floor(newBilled)
                };
                
                return [...prev.slice(1), newDataPoint];
            });
        }, 2500);
        return () => clearInterval(interval);
    }, []);

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
                        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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

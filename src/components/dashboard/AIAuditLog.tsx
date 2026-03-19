import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const initialLogs = [
    { time: '14:02:11', msg: 'System initialized. Connecting to Edge AI nodes...', type: 'info' },
    { time: '14:02:45', msg: 'Substation Alpha connected.', type: 'success' },
    { time: '14:05:12', msg: 'Account 5947... - AI reduced load by 12% to stay in budget', type: 'warn' },
];

const liveMessages = [
    { msg: 'Predictive load-shedding initialized. Estimated grid savings: 450MW.', type: 'warn' },
    { msg: 'Neural net flagged sub-station Delta for predictive maintenance.', type: 'warn' },
    { msg: 'Rerouting micro-grid surplus from Zone A to Zone B to balance demand.', type: 'success' },
    { msg: 'Machine learning model detects 94% probability of local transformer overload in Sector 9.', type: 'error' },
    { msg: 'Automated Katiya bypass detected on Node C-5942. Discarding fake readings...', type: 'error' },
    { msg: 'Generating predictive billing model for next quarter based on ambient temperature forecasts.', type: 'info' },
    { msg: 'Drone swarm dispatched for visual inspection of Line 44-B voltage sags.', type: 'info' },
    { msg: 'Smart meter C-881 offline. Activating localized mesh-network recovery routing.', type: 'warn' },
    { msg: 'Optimizing reactive power compensation. Power factor improved to 0.98.', type: 'success' },
    { msg: 'Detecting anomalous harmonic distortion at Industrial Park. Isolating feedback loop.', type: 'error' }
];

export function AIAuditLog() {
    const [logs, setLogs] = useState(initialLogs);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const interval = setInterval(() => {
            const newMsg = liveMessages[Math.floor(Math.random() * liveMessages.length)];
            const now = new Date();
            setLogs(prev => [...prev.slice(-49), {
                time: now.toLocaleTimeString('en-GB', { hour12: false }),
                msg: newMsg.msg,
                type: newMsg.type
            }]);
        }, 4500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [logs]);

    return (
        <div className="h-full w-full bg-[#05080e] border border-cyan-500/30 rounded-md flex flex-col min-h-[300px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">

            <div className="px-4 py-2 border-b border-cyan-500/20 flex items-center gap-2 bg-navy-900 shrink-0">
                <Terminal size={14} className="text-cyan-glow" />
                <h2 className="text-cyan-400 font-mono text-xs font-bold tracking-widest">PRAKASH_AI :: LIVE TERMINAL.LOG</h2>
            </div>

            <div ref={scrollContainerRef} className="flex-1 overflow-auto p-4 font-mono text-xs custom-scrollbar">
                {logs.map((log, idx) => {
                    let colorClass = 'text-slate-400';
                    if (log.type === 'error') colorClass = 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)] font-bold';
                    if (log.type === 'warn') colorClass = 'text-amber-400';
                    if (log.type === 'success') colorClass = 'text-green-400';
                    if (log.type === 'info') colorClass = 'text-cyan-400';

                    return (
                        <div key={idx} className="mb-1.5 flex gap-3 hover:bg-white/5 px-1 rounded transition-colors group">
                            <span className="text-slate-600 shrink-0 select-none">[{log.time}]</span>
                            <span className={`${colorClass} break-words`}>
                                <span className="opacity-0 group-hover:opacity-100 text-slate-500 select-none mr-2 transition-opacity">►</span>
                                {log.msg}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

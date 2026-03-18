import React from 'react';
import { X, MapPin, Zap, AlertCircle, PowerOff } from 'lucide-react';

interface NodeDetailProps {
    node: {
        id: string;
        lat: number;
        lng: number;
        status: 'stable' | 'tamper' | 'offline';
        wattage: number;
        lastPing: string;
    };
    onClose: () => void;
}

export function NodeDetailSidebar({ node, onClose }: NodeDetailProps) {
    const isTamper = node.status === 'tamper';

    return (
        <div className="absolute top-0 right-0 h-full w-72 bg-navy-900/95 backdrop-blur-md border-l border-cyan-500/30 z-[1000] p-5 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.5)] animate-in slide-in-from-right-full duration-200">

            <div className="flex justify-between items-start mb-6 border-b border-slate-700/50 pb-4">
                <div>
                    <h3 className="text-slate-400 font-mono text-[10px] tracking-widest mb-1">NODE ID</h3>
                    <div className="text-xl font-bold text-slate-100 font-mono tracking-wider">
                        {node.id}
                    </div>
                </div>
                <button onClick={onClose} className="text-slate-500 hover:text-cyan-glow transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="space-y-6 flex-1">

                {/* Status Box */}
                <div className={`p-3 rounded border ${isTamper ? 'bg-red-500/10 border-red-500/40 text-red-500' : node.status === 'offline' ? 'bg-slate-800 border-slate-600 text-slate-400' : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'}`}>
                    <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase mb-1">
                        {isTamper ? <AlertCircle size={14} /> : <Zap size={14} />}
                        STATUS: {node.status}
                    </div>
                    {isTamper && <div className="text-[10px] mt-2 opacity-80">Katiya / Line bypass detected on phase B.</div>}
                </div>

                {/* Telemetry */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-navy-800 p-3 rounded border border-slate-700/50">
                        <h4 className="text-[10px] text-slate-500 tracking-widest font-mono mb-1">LIVE WATTAGE</h4>
                        <div className="text-lg font-mono font-bold text-slate-200">
                            {node.wattage} <span className="text-xs text-slate-500">W</span>
                        </div>
                    </div>
                    <div className="bg-navy-800 p-3 rounded border border-slate-700/50">
                        <h4 className="text-[10px] text-slate-500 tracking-widest font-mono mb-1">LAST PING</h4>
                        <div className="text-lg font-mono font-bold text-slate-200">
                            {new Date(node.lastPing).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>

                {/* GPS */}
                <div className="bg-navy-800 p-3 rounded border border-slate-700/50">
                    <h4 className="text-[10px] text-slate-500 tracking-widest font-mono mb-2 flex items-center gap-1">
                        <MapPin size={12} /> GEO-COORDS
                    </h4>
                    <div className="text-xs font-mono text-slate-300">
                        {node.lat.toFixed(6)}, {node.lng.toFixed(6)}
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto pt-5 border-t border-slate-700/50">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-glow/20 text-red-500 hover:bg-red-glow hover:text-white rounded border border-red-glow font-mono text-sm tracking-widest font-bold transition-all group shadow-[0_0_15px_rgba(255,0,60,0.2)] hover:shadow-[0_0_20px_rgba(255,0,60,0.5)]">
                    <PowerOff size={18} className="group-hover:scale-110 transition-transform" />
                    REMOTE KILL SWITCH
                </button>
            </div>

        </div>
    );
}

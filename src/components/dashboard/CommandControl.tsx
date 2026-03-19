import React, { useState } from 'react';
import { Sliders, Radio, ShieldAlert } from 'lucide-react';

export function CommandControl() {
    const [loadLimit, setLoadLimit] = useState(85);
    const [overrideActive, setOverrideActive] = useState(false);

    return (
        <div className="h-full w-full bg-navy-800 border border-cyan-500/20 rounded-md p-5 flex flex-col min-h-[400px]">

            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-cyan-400 font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                        <Sliders size={14} /> COMMAND & CONTROL
                    </h2>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">Demand Response & Load Shedding</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-glow shadow-[0_0_8px_#00f0ff] animate-pulse"></div>
            </div>

            <div className="flex-1 space-y-8">

                {/* Load Shedding Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end font-mono">
                        <div className="flex flex-col">
                            <label className="text-xs text-slate-300 tracking-wider">GLOBAL LOAD CAP (GW)</label>
                            <span className="text-[10px] text-cyan-500 mt-1 flex items-center gap-1 animate-pulse">
                                AI PREDICTED PEAK: {(loadLimit + (Math.random() * 4 - 2)).toFixed(1)}% IN 45m
                            </span>
                        </div>
                        <span className={`text-xl font-bold ${loadLimit < 50 ? 'text-red-500' : loadLimit < 80 ? 'text-amber-500' : 'text-cyan-400'}`}>
                            {loadLimit}%
                        </span>
                    </div>

                    <div className="relative pt-1">
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={loadLimit}
                            onChange={(e) => setLoadLimit(parseInt(e.target.value))}
                            className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none transition-colors ${loadLimit < 50 ? 'bg-red-500/20 accent-red-500' : loadLimit < 80 ? 'bg-amber-500/20 accent-amber-500' : 'bg-cyan-500/20 accent-cyan-500'}`}
                            style={{
                                background: `linear-gradient(to right, ${loadLimit < 50 ? '#ef4444' : loadLimit < 80 ? '#f59e0b' : '#06b6d4'} ${loadLimit}%, rgba(15,23,42,1) ${loadLimit}%)`
                            }}
                        />
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <Radio size={10} /> Drag to instantly shed sub-station load across zones.
                    </p>
                </div>

                <div className="h-px w-full bg-slate-800 border-b border-cyan-500/10"></div>

                {/* Emergency Override Toggle */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center font-mono">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-300 tracking-wider flex items-center gap-1">
                                <ShieldAlert size={12} className={overrideActive ? 'text-amber-500' : 'text-slate-500'} />
                                HOSPITAL / ESSENTIAL OVERRIDE
                            </span>
                            <span className="text-[9px] text-slate-500 mt-1">Bypasses load cap for priority Sector-H.</span>
                        </div>

                        {/* Custom Toggle Switch */}
                        <button
                            onClick={() => setOverrideActive(!overrideActive)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out relative flex items-center ${overrideActive ? 'bg-amber-500 border border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-slate-800 border border-slate-700'}`}
                        >
                            <div
                                className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm ${overrideActive ? 'translate-x-6' : 'translate-x-0 bg-slate-400'}`}
                            />
                        </button>
                    </div>
                </div>

            </div>

            <div className="mt-4 p-3 bg-red-500/5 border border-red-500/20 rounded text-[10px] text-red-400/80 font-mono leading-relaxed">
                <strong>WARNING:</strong> Adjusting global load capacity will result in immediate rolling blackouts in low-priority zones to maintain grid stability.
            </div>

        </div>
    );
}

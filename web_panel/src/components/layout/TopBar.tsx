import React from 'react';
import { Menu, Activity, AlertTriangle } from 'lucide-react';

interface TopBarProps {
    onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
    // Mock current date/time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

    return (
        <header className="h-16 bg-navy-900 border-b border-cyan-glow/20 flex items-center justify-between px-4 lg:px-6 relative z-50 shadow-[0_0_15px_rgba(0,240,255,0.1)] shrink-0">

            {/* Left side: Hamburger & Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-cyan-400 hover:text-cyan-glow hover:bg-cyan-500/10 rounded-md transition-colors"
                >
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-3">
                    <Activity className="text-cyan-glow animate-pulse hidden sm:block" size={24} />
                    <div>
                        <h1 className="text-xl font-bold text-slate-100 tracking-wider font-mono">
                            PRAKASH<span className="text-cyan-glow">COMMAND</span>
                        </h1>
                        <p className="text-[10px] text-cyan-400/70 tracking-[0.2em] font-mono uppercase mt-0.5">
                            Uttar Pradesh Grid Ctrl
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side: Status & Time */}
            <div className="flex items-center gap-6 font-mono text-sm">
                <div className="hidden md:flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-glow animate-ping absolute"></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-glow relative"></div>
                    <span className="text-cyan-400 uppercase text-xs tracking-widest">Sys.Secure</span>
                </div>

                <div className="h-8 w-px bg-slate-700/50 hidden md:block"></div>

                <div className="flex items-center gap-2 text-amber-500 hover:text-amber-glow cursor-pointer transition-colors bg-amber-500/10 px-3 py-1.5 rounded border border-amber-500/20">
                    <AlertTriangle size={16} />
                    <span className="hidden sm:inline text-xs font-semibold tracking-wide">3 ALERTS</span>
                </div>

                <div className="h-8 w-px bg-slate-700/50 hidden sm:block"></div>

                <div className="text-right hidden sm:block">
                    <div className="text-slate-300 font-semibold">{timeStr} IST</div>
                    <div className="text-[10px] text-slate-500 tracking-wider">{dateStr}</div>
                </div>
            </div>
        </header>
    );
}

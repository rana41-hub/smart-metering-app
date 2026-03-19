import { Map, Users, LayoutDashboard, TerminalSquare, Settings, X, Power } from 'lucide-react';

interface NavigationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    activeSection: string;
    onNavigate: (sectionId: string) => void;
}

export function NavigationDrawer({ isOpen, onClose, activeSection, onNavigate }: NavigationDrawerProps) {
    const navItems = [
        { id: 'dashboardGridMap', icon: LayoutDashboard, label: 'CMD DASHBOARD' },
        { id: 'globalGridMap', icon: Map, label: 'GRID MAP' },
        { id: 'consumerVault', icon: Users, label: 'CONSUMER VAULT' },
        { id: 'commandControl', icon: Settings, label: 'COMMAND & CONTROL' },
        { id: 'aiAuditLog', icon: TerminalSquare, label: 'AI AUDIT LOG' },
    ];

    const handleNavigation = (id: string) => {
        onNavigate(id);
        onClose(); // Close drawer after clicking
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-navy-900 border-r border-cyan-glow/30 shadow-[5px_0_30px_rgba(0,240,255,0.05)] z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Header */}
                <div className="h-16 border-b border-cyan-glow/20 flex items-center justify-between px-6 shrink-0 bg-navy-800">
                    <span className="font-mono text-cyan-glow font-bold tracking-widest text-sm">MAIN MENU</span>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-cyan-glow transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item.id)}
                                className={`flex items-center gap-4 px-4 py-3 rounded-md font-mono text-sm tracking-wide transition-all ${isActive
                                    ? 'bg-cyan-500/10 text-cyan-glow border border-cyan-500/30 shadow-[inset_2px_0_0_#00f0ff]'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                                    }`}
                            >
                                <Icon size={18} className={isActive ? 'text-cyan-glow' : 'text-slate-500'} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                {/* Footer actions */}
                <div className="p-4 border-t border-slate-800">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded border border-red-500/20 font-mono text-sm tracking-widest transition-all group">
                        <Power size={16} className="group-hover:animate-pulse" />
                        EMERGENCY SHUTDOWN
                    </button>
                </div>
            </div>
        </>
    );
}

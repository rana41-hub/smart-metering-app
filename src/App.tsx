import React, { useState, useRef, useEffect } from 'react';
import { TopBar } from './components/layout/TopBar';
import { NavigationDrawer } from './components/layout/NavigationDrawer';
import { DashboardGrid } from './components/dashboard/DashboardGrid';
import { GlobalGridMap } from './components/dashboard/GlobalGridMap';
import { RevenueShield } from './components/dashboard/RevenueShield';
import { ConsumerVault } from './components/dashboard/ConsumerVault';
import { CommandControl } from './components/dashboard/CommandControl';
import { AIAuditLog } from './components/dashboard/AIAuditLog';

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboardGridMap');

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleNavigate = (sectionId: string) => {
        setActiveSection(sectionId);
        // Auto-scrolling removed as per user request
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-navy-900 text-slate-200 overflow-hidden font-sans">
            <TopBar onMenuClick={() => setDrawerOpen(true)} />
            <NavigationDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                activeSection={activeSection}
                onNavigate={handleNavigate}
            />

            <main ref={scrollContainerRef} className="flex-1 flex flex-col relative overflow-hidden bg-[#070b14] scroll-smooth">
                <DashboardGrid>
                    {/* Add IDs to wrappers for scrolling */}
                    <div id="dashboardGridMap" className="contents">
                        <div id="globalGridMap" className="col-span-12 lg:col-span-8 scroll-mt-4">
                            <GlobalGridMap />
                        </div>
                        <div className="col-span-12 lg:col-span-4 scroll-mt-4">
                            <RevenueShield />
                        </div>
                    </div>

                    <div id="consumerVault" className="col-span-12 lg:col-span-8 scroll-mt-4">
                        <ConsumerVault />
                    </div>

                    <div id="commandControl" className="col-span-12 lg:col-span-4 scroll-mt-4">
                        <CommandControl />
                    </div>

                    <div id="aiAuditLog" className="col-span-12 scroll-mt-4 mb-8">
                        <AIAuditLog />
                    </div>
                </DashboardGrid>
            </main>
        </div>
    );
}

export default App;

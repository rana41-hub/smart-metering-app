import React from 'react';

interface DashboardGridProps {
    children: React.ReactNode;
}

export function DashboardGrid({ children }: DashboardGridProps) {
    return (
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto overflow-x-hidden bg-[#070b14]">
            {/* 
        Grid Layout Plan (Responsive):
        - 1 column on mobile
        - 2 columns on tablet
        - 12 column CSS grid on large screens (16-inch laptops) 
          where components span specific col amounts.
      */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-min h-full">
                {children}
            </div>
        </div>
    );
}

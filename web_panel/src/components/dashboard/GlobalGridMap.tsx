import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NodeDetailSidebar } from './NodeDetailSidebar';

// Custom icons based on status
const createCustomIcon = (color: string, isPulsing: boolean) =>
    L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="w-4 h-4 rounded-full ${color} ${isPulsing ? 'animate-ping opacity-75' : 'border-2 border-slate-900'} shadow-[0_0_10px_${color.includes('cyan') ? '#00f0ff' : color.includes('red') ? '#ff003c' : '#ffffff'}]"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });

const icons = {
    stable: createCustomIcon('bg-cyan-glow', false),
    tamper: createCustomIcon('bg-red-glow', true),
    offline: createCustomIcon('bg-slate-500', false),
};

// Generate Mock Data around Lucknow/Kanpur bounding box
const generateNodes = (count: number) => {
    const nodes = [];
    // Approx bounds for Lucknow to Kanpur
    const latMin = 26.4;
    const latMax = 26.9;
    const lngMin = 80.3;
    const lngMax = 81.0;

    for (let i = 0; i < count; i++) {
        const statusRand = Math.random();
        let status: 'stable' | 'tamper' | 'offline' = 'stable';
        if (statusRand > 0.85) status = 'tamper';
        else if (statusRand > 0.75) status = 'offline';

        nodes.push({
            id: `5947${Math.floor(Math.random() * 900000 + 100000)} `,
            lat: latMin + Math.random() * (latMax - latMin),
            lng: lngMin + Math.random() * (lngMax - lngMin),
            status,
            wattage: status === 'offline' ? 0 : Math.floor(Math.random() * 5000 + 500),
            lastPing: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        });
    }
    return nodes;
};

export function GlobalGridMap() {
    const [nodes, setNodes] = useState<any[]>([]);
    const [selectedNode, setSelectedNode] = useState<any | null>(null);

    useEffect(() => {
        setNodes(generateNodes(60)); // 60 simulated nodes
    }, []);

    return (
        <div className="h-full w-full bg-navy-800 border border-cyan-500/20 rounded-md overflow-hidden flex flex-col relative min-h-[500px] shadow-[0_0_20px_rgba(0,240,255,0.05)]">
            <div className="h-10 bg-navy-900 border-b border-cyan-500/20 px-4 flex items-center justify-between z-10">
                <h2 className="text-cyan-400 font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse"></div>
                    GLOBAL GRID MAP
                </h2>
                <div className="flex gap-4 text-[10px] font-mono tracking-widest text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-glow"></span> STABLE</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-glow animate-pulse"></span> TAMPER</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500"></span> OFFLINE</span>
                </div>
            </div>

            <div className="flex-1 relative bg-slate-900 border-none outline-none">
                {/* Dark style Map */}
                <MapContainer
                    center={[26.65, 80.65]}
                    zoom={10}
                    style={{ height: '100%', width: '100%', background: '#0f172a' }}
                    zoomControl={false}
                    attributionControl={false}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                    />
                    {nodes.map((node) => (
                        <Marker
                            key={node.id}
                            position={[node.lat, node.lng]}
                            icon={icons[node.status]}
                            eventHandlers={{
                                click: () => setSelectedNode(node)
                            }}
                        >
                        </Marker>
                    ))}
                </MapContainer>

                {/* Node Detail Sidebar Overlap */}
                {selectedNode && (
                    <NodeDetailSidebar
                        node={selectedNode}
                        onClose={() => setSelectedNode(null)}
                    />
                )}
            </div>
        </div>
    );
}

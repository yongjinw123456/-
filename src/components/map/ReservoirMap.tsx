import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { reservoirs } from '@/src/data';
import { Reservoir } from '@/src/types';
import { cn } from '@/src/lib/utils';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function ReservoirMap() {
  const [selectedReservoir, setSelectedReservoir] = React.useState<Reservoir | null>(null);

  if (!hasValidKey) {
    return (
      <div className="flex items-center justify-center h-full p-8 bg-[#E4E3E0]">
        <div className="max-w-md w-full bg-white border border-[#141414] p-8 text-center shadow-2xl">
          <div className="w-12 h-12 bg-red-100 flex items-center justify-center rounded-full mx-auto mb-6">
            <span className="text-red-600 font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Google Maps API Key Required</h2>
          <p className="text-sm opacity-60 font-serif italic mb-8">
            To view the interactive reservoir map, please configure your Google Maps Platform API key in the AI Studio Secrets.
          </p>
          <div className="text-left space-y-4 text-xs font-mono bg-gray-50 p-4 border border-dashed border-gray-300">
            <p><strong>1. Get a key:</strong> cloud.google.com/maps-apis</p>
            <p><strong>2. Name:</strong> GOOGLE_MAPS_PLATFORM_KEY</p>
            <p><strong>3. Result:</strong> App will auto-rebuild after entry.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: 28.01, lng: 120.65 }}
          defaultZoom={10}
          mapId="HYDRO_SAFE_MAP"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
          disableDefaultUI={true}
          gestureHandling="greedy"
        >
          {reservoirs.map((res) => (
            <ReservoirMarker 
              key={res.id} 
              reservoir={res} 
              onSelect={() => setSelectedReservoir(res)}
            />
          ))}

          {selectedReservoir && (
            <InfoWindow
              position={selectedReservoir.location}
              onCloseClick={() => setSelectedReservoir(null)}
            >
              <div className="p-2 min-w-[200px]">
                <div className="flex justify-between items-center mb-2">
                  <span className={cn(
                    "text-[10px] font-mono px-1 border uppercase",
                    selectedReservoir.status === 'normal' ? "border-green-500 text-green-600" : "border-yellow-500 text-yellow-600"
                  )}>
                    {selectedReservoir.status}
                  </span>
                  <span className="text-[10px] font-mono opacity-40">#{selectedReservoir.id}</span>
                </div>
                <h3 className="font-bold text-sm mb-1">{selectedReservoir.name}</h3>
                <div className="space-y-1 text-xs opacity-80">
                  <div className="flex justify-between">
                    <span>Water Level:</span>
                    <span className="font-mono">{selectedReservoir.waterLevel}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Limit:</span>
                    <span className="font-mono">{selectedReservoir.limitLevel}m</span>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Map Overlay Controls */}
      <div className="absolute top-6 left-6 z-10 bg-white border border-[#141414] p-4 shadow-xl pointer-events-none">
        <h4 className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-2">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="text-xs">Normal Operation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span className="text-xs">Warning Threshold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="text-xs">Critical Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReservoirMarkerProps {
  reservoir: Reservoir;
  onSelect: () => void;
  key?: string;
}

function ReservoirMarker({ reservoir, onSelect }: ReservoirMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  
  const color = reservoir.status === 'normal' ? '#10b981' : reservoir.status === 'warning' ? '#f59e0b' : '#ef4444';

  return (
    <AdvancedMarker
      ref={markerRef}
      position={reservoir.location}
      onClick={onSelect}
      title={reservoir.name}
    >
      <Pin background={color} borderColor="#fff" glyphColor="#fff" scale={1.2} />
    </AdvancedMarker>
  );
}

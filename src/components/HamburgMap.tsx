
import React from 'react';
import { MapPin } from 'lucide-react';

const HamburgMap = () => {
  const fishingSpots = [
    { id: 1, x: 45, y: 30, name: 'Alster North' },
    { id: 2, x: 60, y: 65, name: 'Elbe Port' },
    { id: 3, x: 25, y: 45, name: 'Wandse Creek' },
    { id: 4, x: 75, y: 40, name: 'Bille River' },
    { id: 5, x: 50, y: 62, name: 'Elbe River Hamburg' } // New Hamburg spot
  ];

  return (
    <div className="relative w-full h-[300px] bg-blue-50 rounded-lg border overflow-hidden">
      {/* Hamburg city outline */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Elbe River - main waterway */}
        <path
          d="M10 60 Q30 65 50 62 Q70 58 90 55"
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Alster Lake */}
        <ellipse
          cx="45"
          cy="35"
          rx="8"
          ry="12"
          fill="#3b82f6"
        />
        
        {/* Smaller waterways */}
        <path
          d="M45 47 Q50 50 55 52"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M20 45 Q35 42 45 40"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M65 45 Q75 42 85 40"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
        />

        {/* Fishing zones */}
        {/* Red zones - No fishing allowed */}
        <circle cx="45" cy="35" r="12" fill="rgba(239, 68, 68, 0.3)" />
        <rect x="15" y="58" width="20" height="8" fill="rgba(239, 68, 68, 0.3)" />
        
        {/* Blue zones - Open fishing */}
        <rect x="45" y="58" width="30" height="8" fill="rgba(59, 130, 246, 0.3)" />
        <circle cx="75" cy="40" r="10" fill="rgba(59, 130, 246, 0.3)" />
        
        {/* Purple zones - Club membership required */}
        <rect x="20" y="40" width="15" height="10" fill="rgba(147, 51, 234, 0.3)" />
        <ellipse cx="85" cy="50" rx="8" ry="6" fill="rgba(147, 51, 234, 0.3)" />
      </svg>

      {/* Fishing spot markers */}
      {fishingSpots.map(spot => (
        <div
          key={spot.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          title={spot.name}
        >
          <MapPin className="h-6 w-6 text-red-600 drop-shadow-lg" />
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm p-2 rounded-md text-xs">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-3 h-3 bg-red-400 rounded"></div>
          <span>No Fishing</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span>Open Fishing</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <div className="w-3 h-3 bg-purple-400 rounded"></div>
          <span>Club Only</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-red-600" />
          <span>Fishing Spots</span>
        </div>
      </div>
    </div>
  );
};

export default HamburgMap;

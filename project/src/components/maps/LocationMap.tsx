import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Shelter } from '../../contexts/ReportContext';

interface LocationMapProps {
  location: { lat: number; lng: number };
  nearbyShelters?: Shelter[];
  height?: string;
  interactive?: boolean;
  onLocationSelect?: (lat: number, lng: number, address: string) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({
  location,
  nearbyShelters = [],
  height = '400px',
  interactive = false,
  onLocationSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const shelterMarkers = useRef<google.maps.Marker[]>([]);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  useEffect(() => {
    // In a real application, we would load the Google Maps API and initialize the map
    // For this demo, we'll show a placeholder and explain what would happen
    const mockInitMap = () => {
      if (!mapRef.current) return;
      
      // In a real implementation, this would initialize the Google Map
      console.log("Initializing map at", location);
      
      // Mock setting a marker at the specified location
      if (interactive && onLocationSelect) {
        // Add click listener to map for selecting locations
        console.log("Adding click listener for location selection");
      }
      
      // Mock adding shelter markers
      if (nearbyShelters && nearbyShelters.length > 0) {
        console.log("Adding markers for", nearbyShelters.length, "nearby shelters");
      }
    };

    mockInitMap();
  }, [location, nearbyShelters, interactive, onLocationSelect]);

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Map Placeholder - In a real app, this would be replaced by the actual Google Map */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg bg-blue-50 flex items-center justify-center overflow-hidden"
      >
        <div className="text-center p-4">
          <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
          <p className="text-gray-700">
            {interactive 
              ? "Click on the map to select location" 
              : `Map showing location at coordinates: ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`}
          </p>
          {nearbyShelters && nearbyShelters.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">Nearby Shelters:</p>
              <ul className="text-left mt-2">
                {nearbyShelters.map((shelter) => (
                  <li key={shelter.id} className="text-sm mb-1 flex items-start">
                    <MapPin className="w-4 h-4 text-teal-500 mr-1 mt-1 flex-shrink-0" />
                    <span>
                      {shelter.name} 
                      {shelter.distance && ` (${shelter.distance.toFixed(1)} km)`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
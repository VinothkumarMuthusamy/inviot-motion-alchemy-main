"use client";

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  id: number;
  name: string;
  address: string;
  coordinates: [number, number];
}

interface MapProps {
  locations: Location[];
  selectedLocation: Location;
  onLocationSelect: (location: Location) => void;
}

const Map: React.FC<MapProps> = ({ locations, selectedLocation, onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([20, 0], 2);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    // Add new markers
    locations.forEach(location => {
      const marker = L.marker(location.coordinates)
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${location.name}</h3>
            <p class="text-sm">${location.address}</p>
          </div>
        `);
      
      marker.on('click', () => {
        onLocationSelect(location);
      });

      markersRef.current.push(marker);
    });

    // If there's a selected location, center the map on it
    if (selectedLocation) {
      map.setView(selectedLocation.coordinates, 10);
      
      // Open the popup for the selected location
      const selectedMarker = markersRef.current.find(
        marker => (marker as any)._latlng.lat === selectedLocation.coordinates[0] && 
                 (marker as any)._latlng.lng === selectedLocation.coordinates[1]
      );
      
      if (selectedMarker) {
        selectedMarker.openPopup();
      }
    }
  }, [locations, selectedLocation, onLocationSelect]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};

export default Map;
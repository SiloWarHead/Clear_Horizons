import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  onCoordinateSelect: (lat: number, lng: number) => void;
  selectedPosition: [number, number] | null;
}

export const Map = ({ onCoordinateSelect, selectedPosition }: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize the Leaflet map once
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      onCoordinateSelect(lat, lng);

      if (markerRef.current) {
        markerRef.current.setLatLng(e.latlng);
      } else {
        markerRef.current = L.marker(e.latlng).addTo(map);
      }
    });

    leafletMapRef.current = map;

    return () => {
      map.remove();
      leafletMapRef.current = null;
      markerRef.current = null;
    };
  }, [onCoordinateSelect]);

  // Sync external selectedPosition with the marker & map view
  useEffect(() => {
    if (!leafletMapRef.current || !selectedPosition) return;

    const [lat, lng] = selectedPosition;
    const latLng = L.latLng(lat, lng);

    if (markerRef.current) {
      markerRef.current.setLatLng(latLng);
    } else {
      markerRef.current = L.marker(latLng).addTo(leafletMapRef.current);
    }

    leafletMapRef.current.setView(latLng, leafletMapRef.current.getZoom());
  }, [selectedPosition]);

  return (
    <div className="metric-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-card-foreground">Select Location</h2>
        <p className="text-sm text-muted-foreground">Click on the map to select coordinates</p>
      </div>

      <div className="h-[400px] rounded-lg overflow-hidden">
        <div ref={mapRef} className="w-full h-full z-0" />
      </div>
    </div>
  );
};

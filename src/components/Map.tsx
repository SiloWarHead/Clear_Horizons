import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
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

function MapClickHandler({ onCoordinateSelect }: { onCoordinateSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onCoordinateSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export const Map = ({ onCoordinateSelect, selectedPosition }: MapProps) => {
  return (
    <div className="metric-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-card-foreground">Select Location</h2>
        <p className="text-sm text-muted-foreground">Click on the map to select coordinates</p>
      </div>
      
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }} className="z-0">
          <>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onCoordinateSelect={onCoordinateSelect} />
            {selectedPosition && <Marker position={selectedPosition} />}
          </>
        </MapContainer>
      </div>
    </div>
  );
};

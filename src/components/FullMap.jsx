import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect } from "react";

// --- IMPORTANT: Fix for default Leaflet icon not showing in Vite/React ---
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
// ----------------------------------------------------------------------

function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);
  return null;
}

const FullMap = () => {
  const position = [20.5937, 78.9629]; // New York, NY

  return (
    // The h-full and w-full are critical for Leaflet to render correctly
    // The className="h-full w-full" ensures it inherits the size from the parent

    <div className="w-full h-full  rounded-2xl overflow-hidden shadow-inner">
      <MapContainer
        center={[20.5937, 78.9629]} // Default India
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          attribution="© Google Maps"
          maxZoom={20}
        />
        <Marker position={position}>
          <Popup>
            India, <br /> 20.5937, 78.9629
          </Popup>
        </Marker>
        <ResizeHandler />
      </MapContainer>
    </div>
  );
};

export default FullMap;

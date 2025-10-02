import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// --- IMPORTANT: Fix for default Leaflet icon not showing (Same fix as FullMap) ---
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Define the custom icon
const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Set the default icon for all Leaflet markers
L.Marker.prototype.options.icon = DefaultIcon;
// ----------------------------------------------------------------------------------

const MiniMap = () => {
  const position = [40.7128, -74.006]; // Coordinates for New York, NY

  return (
    // The h-full and w-full are critical for Leaflet to render correctly
    <div className="w-full h-full">
      <MapContainer
        center={position}
        zoom={11} // A slightly wider view for the mini map
        scrollWheelZoom={false} // Disable scroll zoom
        dragging={false} // Disable dragging/panning
        zoomControl={false} // Hide zoom buttons
        doubleClickZoom={false} // Disable double-click zoom
        className="h-full w-full rounded-lg z-0" // The z-0 is important for the overlay click handler in App.jsx
        // Use whenCreated to potentially remove the map's attribution link for a cleaner look
        whenCreated={(map) => {
          map.attributionControl.setPrefix(false);
        }}
      >
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          attribution="© Google Maps"
          maxZoom={20}
        />

        {/* Display the marker for the selected location */}
        <Marker position={position} />
      </MapContainer>
    </div>
  );
};

export default MiniMap;

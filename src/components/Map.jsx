import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useLocation from "../hooks/GetLocation";
import FlyToLocation from "../utils/Flytolocation";
import Locationhandler from "./LocationHandler";

function GetMap() {
  let location = useLocation();

  return (
    <div className="w-full h-[300px] sm:h-[500px] rounded-2xl overflow-hidden shadow-inner">
      <MapContainer
        center={location || [20.5937, 78.9629]} // Default India
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          attribution="© Google Maps"
          maxZoom={20}
        />

        {location && <FlyToLocation location={location} />}
        <Locationhandler />
      </MapContainer>
    </div>
  );
}

export default GetMap;

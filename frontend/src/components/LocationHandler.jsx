import { useEffect, useRef, useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
function Locationhandler({ setSelectedLocation }) {
  let [markerpos, setmarkerpos] = useState(null);
  let markerRef = useRef();
  useMapEvents({
    click: async (e) => {
      let { lat, lng } = e.latlng;
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await res.json();
      setSelectedLocation({
        lat,
        lng,
        name: data.city || data.locality || "Unknown location",
      });
    },
  });
  return null;
}
export default Locationhandler;

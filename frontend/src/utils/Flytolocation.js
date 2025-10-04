import { useEffect } from "react";
import { useMap } from "react-leaflet";
function FlyToLocation({ location }) {
  const map = useMap();

  useEffect(() => {
    if (
      location &&
      Array.isArray(location) &&
      location.length === 2 &&
      !location.includes(undefined)
    ) {
      map.flyTo(location, 9, { animate: true });
    }
  }, [location, map]);

  return null;
}
export default FlyToLocation;

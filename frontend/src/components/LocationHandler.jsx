import { useEffect, useRef, useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
function Locationhandler() {
  let [markerpos, setmarkerpos] = useState(null);
  let markerRef = useRef();
  useMapEvents({
    click(e) {
      console.log(e.latlng);
      setmarkerpos(e.latlng);
    },
  });
  return (
    <>
      {markerpos ? (
        <Marker
          ref={markerRef}
          position={markerpos}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              setmarkerpos(e.target.getLatLng());
            },
            click: () => {
              setmarkerpos(null);
            },
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              e.target.closePopup();
            },
          }}
        >
          <Popup>{`${markerpos.lat},${markerpos.lng}`}</Popup>
        </Marker>
      ) : (
        ""
      )}
    </>
  );
}
export default Locationhandler;

import Location from "../utils/currentlocation";
import { useState, useEffect } from "react";
function useLocation() {
  console.log("from get");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function get() {
      try {
        const pos = await Location();
        console.log("from custom hook", pos);
        setLocation(pos);
      } catch (err) {
        console.log("Error fetching location:", err);
      }
    }
    get();
  }, []);
  return location;
}
export default useLocation;

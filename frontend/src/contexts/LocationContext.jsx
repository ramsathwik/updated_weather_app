import { createContext, useState } from "react";

export const LocationContext = createContext();
export function LocationProvider({ children }) {
  let [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

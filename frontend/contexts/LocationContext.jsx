import { createContext, useState } from "react";

const locationContext = createContext();
export function LocationProvider({ children }) {
  let [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <locationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </locationContext.Provider>
  );
}

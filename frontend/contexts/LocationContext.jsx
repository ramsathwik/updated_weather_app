import { createContext, useState } from "react";

export const LocationContext = createContext();
export function LocationProvider({ children }) {
  let [selectedLocation, setSelectedLocation] = useState(null);
  const [timeSelection, setTimeSelection] = useState({
    type: null, // "month" or "season"
    value: null, // month number or season name
  });
  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        timeSelection,
        setTimeSelection,
        setSelectedLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

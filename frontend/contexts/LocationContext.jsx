import { createContext, useState } from "react";

export const LocationContext = createContext();
export function LocationProvider({ children }) {
  let [selectedLocation, setSelectedLocation] = useState(null);
  const [timeSelection, setTimeSelection] = useState({
    type: null, // "month" or "season"
    value: null, // month number or season name
  });
  let [chartData, setChartdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        timeSelection,
        setTimeSelection,
        setSelectedLocation,
        chartData,
        setChartdata,
        loading,
        setLoading,
        analyzed,
        setAnalyzed,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

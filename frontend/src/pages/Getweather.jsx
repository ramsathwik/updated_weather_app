import React, { useState, useEffect, useRef, useContext } from "react";
import { MdClose, MdOutlineExpand } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { LocationContext } from "../../contexts/LocationContext";

import FullMap from "../components/FullMap";
import MiniMap from "../components/MiniMap";
import WeatherAnalysis from "../components/WeatherAnalysis";
import HistoricalTrends from "../components/HistoricalTrends";
import TrendSummaryCards from "../components/TrendSummaryCards";
import LocationSearch from "../components/LocationSearch";
import SelectTimePeriod from "../components/selectTimePeriod";
import DataSources from "../components/DataSource";
import ExportData from "../components/ExportData";

const PopularLocations = ({ onSelect }) => (
  <div className="space-y-2 mt-4">
    <p className="font-medium text-gray-700 mb-2">🌍 Popular Locations</p>

    {[
      { name: "New York, NY", lat: 40.7128, lng: -74.006 },
      { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
      { name: "Miami, FL", lat: 25.7617, lng: -80.1918 },
    ].map((loc, i) => (
      <div
        key={i}
        onClick={() => onSelect(loc)}
        className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg border border-gray-200 cursor-pointer transition"
      >
        <div>
          <p className="font-semibold text-gray-800">{loc.name}</p>
          <p className="text-xs text-gray-500">
            {loc.lat}, {loc.lng}
          </p>
        </div>
        <FaCheckCircle className="text-blue-500" />
      </div>
    ))}
  </div>
);

function Getweather() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const mapRef = useRef(null);
  const { selectedLocation, setSelectedLocation, loading, analyzed } =
    useContext(LocationContext);

  const toggleMap = () => setIsMapExpanded(!isMapExpanded);

  useEffect(() => {
    if (isMapExpanded && mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 400);
    }
  }, [isMapExpanded]);

  // ------------------- FULLSCREEN MAP -------------------
  if (isMapExpanded) {
    return (
      <div className="w-full h-full relative">
        <FullMap setMapRef={mapRef} />
        <button
          onClick={toggleMap}
          className="absolute top-8 right-4 z-[9999] bg-white text-gray-800 p-3 rounded-full shadow-xl hover:bg-red-100 transition focus:outline-none"
          title="Collapse Map"
        >
          <MdClose className="w-6 h-6" />
        </button>
      </div>
    );
  }

  // ------------------- MAIN LAYOUT -------------------
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-6 md:p-8">
      {/* ------------------- SIDEBAR ------------------- */}
      <div className="w-full lg:w-1/3 xl:w-1/4 lg:mr-8 mb-6 lg:mb-0">
        <div className="bg-white p-6 rounded-2xl shadow-2xl h-full flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            🌦️ Explore Historical Weather
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Choose any city or region to explore its long-term climate trends,
            seasonal variations, and temperature–rainfall patterns.
          </p>

          <LocationSearch />

          <PopularLocations onSelect={setSelectedLocation} />

          <hr className="my-4 border-gray-200" />

          {/* Mini Map */}
          <div
            onClick={toggleMap}
            className="cursor-pointer group relative h-64 overflow-hidden rounded-xl border border-gray-200 shadow-inner"
          >
            <MiniMap />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white transition-opacity group-hover:bg-opacity-50">
              <MdOutlineExpand className="w-10 h-10 mb-2 transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">
                Click to open full map
              </span>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />
          <SelectTimePeriod />
        </div>
      </div>

      {/* ------------------- RESULTS PANEL ------------------- */}

      <div className="w-full lg:flex-grow lg:w-2/3 xl:w-3/4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg font-medium text-gray-600">🔍 Analyzing...</p>
          </div>
        ) : analyzed ? (
          <div className="space-y-6">
            <h1 className="text-3xl font-light text-gray-800">
              Weather Analysis Results
            </h1>
            <p className="text-base font-normal text-gray-600 mt-1">
              Historical climate overview for{" "}
              <span className="font-medium text-blue-700">
                {selectedLocation.name}
              </span>
              , including long-term seasonal averages and trends.
            </p>

            <TrendSummaryCards />
            <WeatherAnalysis />

            <div className="p-6 bg-white rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                📈 Historical Trends (1994–2024)
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Yearly progression of maximum and minimum temperatures,
                precipitation, humidity, and solar radiation. Use these trends
                to understand long-term climate shifts.
              </p>
              <HistoricalTrends />
            </div>

            <DataSources />

            <ExportData />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start h-full text-center py-20">
            <h1 className="text-3xl font-semibold text-gray-700 mb-2">
              Start Exploring 🌍
            </h1>
            <p className="text-gray-500 max-w-lg">
              Select a location from the left panel or use the map to begin your
              analysis...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Getweather;

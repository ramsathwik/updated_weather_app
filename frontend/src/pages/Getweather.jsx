import React, { useState, useEffect, useRef } from "react";
import { MdClose, MdOutlineExpand } from "react-icons/md";
import { FaCalendarAlt, FaCheck, FaGlobe, FaDownload } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

// Components
import FullMap from "../components/FullMap";
import MiniMap from "../components/MiniMap";
import WeatherAnalysis from "../components/WeatherAnalysis";
import HistoricalTrends from "../components/HistoricalTrends";
import TrendSummaryCards from "../components/TrendSummaryCards";
import LocationSearch from "../components/LocationSearch";
import SelectTimePeriod from "../components/selectTimePeriod";
import DataSources from "../components/DataSource";
import ExportData from "../components/ExportData";

// --- Placeholder Popular Locations ---
const PopularLocations = () => (
  <div className="space-y-2 mt-4">
    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
      <div>
        <p className="font-semibold text-blue-700">New York, NY</p>
        <p className="text-xs text-gray-500">40.7128, -74.0060</p>
      </div>
      <FaCheckCircle className="text-blue-500" />
    </div>
    <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
      <p className="font-medium">Los Angeles, CA</p>
      <p className="text-xs text-gray-500">34.0522, -118.2437</p>
    </div>
    <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
      <p className="font-medium">Miami, FL</p>
      <p className="text-xs text-gray-500">25.7617, -80.1918</p>
    </div>
  </div>
);

function Getweather() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const mapRef = useRef(null);

  const toggleMap = () => setIsMapExpanded(!isMapExpanded);

  // Fix map resizing when expanded
  useEffect(() => {
    if (isMapExpanded && mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 400);
    }
  }, [isMapExpanded]);

  // 👉 Fullscreen Map Mode
  if (isMapExpanded) {
    return (
      <div className=" w-full h-full relative">
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

  // 👉 Normal Layout (Sidebar + Analysis)
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-6 md:p-8 ">
      {/* -------------------- LEFT SIDEBAR -------------------- */}
      <div className="w-full lg:w-1/3 xl:w-1/4 lg:mr-8 mb-6 lg:mb-0">
        <div className="bg-white p-6 rounded-2xl shadow-2xl h-full flex flex-col">
          <LocationSearch />
          <PopularLocations />

          <hr className="my-4 border-gray-100" />

          {/* Mini Map */}
          <div
            onClick={toggleMap}
            className="cursor-pointer group relative h-64 md:h-80 lg:h-64 overflow-hidden rounded-lg border border-gray-200 shadow-inner"
          >
            <MiniMap />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4 transition-opacity group-hover:bg-opacity-50">
              <MdOutlineExpand className="w-10 h-10 mb-2 transition-transform group-hover:scale-110" />
              <span className="text-base text-center font-medium">
                Click to see full map
              </span>
            </div>
          </div>
          <hr className="my-4 border-gray-100" />
          <SelectTimePeriod />
        </div>
      </div>

      {/* -------------------- ANALYSIS RESULTS -------------------- */}
      <div className="w-full lg:flex-grow lg:w-2/3 xl:w-3/4">
        <div className="space-y-6">
          <h1 className="text-3xl font-light text-gray-800">
            Weather Analysis Results
            <p className="text-base font-normal text-gray-500 mt-1">
              Historical probability analysis for New York, NY in Summer
            </p>
          </h1>

          <TrendSummaryCards />

          <WeatherAnalysis />

          <div className="p-6 bg-white rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Historical Trends (1994-2024)
            </h2>
            <HistoricalTrends />
          </div>
          <DataSources />

          <ExportData />
        </div>
      </div>
    </div>
  );
}

export default Getweather;

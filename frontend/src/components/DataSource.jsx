import React from "react";
import { FaMicrochip, FaBook } from "react-icons/fa";

const DataSources = () => {
  const dataSources = [
    "MODIS Land Surface Temperature",
    "GPM Precipitation Data",
    "MERRA-2 Wind Speed Data",
    "Landsat Climate Data Record",
  ];

  const analysisDetails = [
    "30+ years of historical data",
    "Daily measurements aggregated",
    "Statistical probability calculations",
    "Trend analysis using linear regression",
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-2xl space-y-6">
      <h2 className="text-xl font-semibold flex items-center text-gray-700">
        <FaMicrochip className="mr-3 text-blue-500" />
        Data Sources & Methodology
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Sources */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800 border-b pb-1">
            NASA Earth Observation Data
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 pl-4">
            {dataSources.map((source) => (
              <li key={source} className="text-sm">
                {source}
              </li>
            ))}
          </ul>
        </div>

        {/* Analysis Period */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-gray-800 border-b pb-1">
            Analysis Period
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 pl-4">
            {analysisDetails.map((detail) => (
              <li key={detail} className="text-sm">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer / Insight Box */}
      <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400 text-sm text-gray-700">
        <p>
          <span className="font-bold text-blue-700 mr-1">ⓘ Probabilities</span>{" "}
          are calculated based on historical frequency of conditions meeting or
          exceeding specified thresholds during the selected time period. Trend
          analysis shows long-term changes in weather patterns.
        </p>
      </div>
    </div>
  );
};

export default DataSources;

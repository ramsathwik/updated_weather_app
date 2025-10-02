import React from "react";
import {
  FaTemperatureHigh,
  FaCloudRain,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const TrendSummaryCards = () => {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      {/* Temperature Trend Summary Card */}
      <div className="flex-1 p-4 bg-gray-50 rounded-xl shadow-md flex items-center justify-between border border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">
            Temperature Trend
          </h3>
          <p className="text-2xl font-bold text-gray-800">Avg: 69.1°F</p>
        </div>
        <div className="flex items-center text-green-600 font-semibold text-lg">
          <FaArrowUp className="w-4 h-4 mr-1" />
          <span>+0.35°F/decade</span>
        </div>
      </div>

      {/* Rainfall Trend Summary Card */}
      <div className="flex-1 p-4 bg-gray-50 rounded-xl shadow-md flex items-center justify-between border border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">
            Rainfall Trend
          </h3>
          <p className="text-2xl font-bold text-gray-800">Avg: 149.1MM</p>
        </div>
        <div className="flex items-center text-red-600 font-semibold text-lg">
          <FaArrowDown className="w-4 h-4 mr-1" />
          <span>3.1mm/decade</span>
        </div>
      </div>
    </div>
  );
};

export default TrendSummaryCards;

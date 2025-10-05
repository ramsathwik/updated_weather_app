import React, { useContext, useMemo } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { LocationContext } from "../../contexts/LocationContext";

const TrendSummaryCards = () => {
  const { chartData } = useContext(LocationContext);

  // Helper to calculate average
  const average = (arr, key) =>
    arr.length ? arr.reduce((a, b) => a + (b[key] ?? 0), 0) / arr.length : 0;

  // Helper to calculate slope (trend)
  const slopePerDecade = (arr, key) => {
    if (arr.length < 2) return 0;

    const N = arr.length;
    const sumX = arr.reduce((a, b) => a + b.year, 0);
    const sumY = arr.reduce((a, b) => a + (b[key] ?? 0), 0);
    const sumXY = arr.reduce((a, b) => a + b.year * (b[key] ?? 0), 0);
    const sumX2 = arr.reduce((a, b) => a + b.year * b.year, 0);

    const slope = (N * sumXY - sumX * sumY) / (N * sumX2 - sumX * sumX);
    return slope * 10; // per decade
  };

  const tempAvg = useMemo(() => average(chartData, "temp"), [chartData]);
  const rainAvg = useMemo(() => average(chartData, "rain"), [chartData]);
  const tempTrend = useMemo(
    () => slopePerDecade(chartData, "temp"),
    [chartData]
  );
  const rainTrend = useMemo(
    () => slopePerDecade(chartData, "rain"),
    [chartData]
  );

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      {/* Temperature Trend */}
      <div className="flex-1 p-4 bg-gray-50 rounded-xl shadow-md flex items-center justify-between border border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">
            Temperature Trend
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            Avg: {tempAvg.toFixed(2)}°C
          </p>
        </div>
        <div
          className={`flex items-center font-semibold text-lg ${
            tempTrend >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {tempTrend >= 0 ? (
            <FaArrowUp className="w-4 h-4 mr-1" />
          ) : (
            <FaArrowDown className="w-4 h-4 mr-1" />
          )}
          <span>{Math.abs(tempTrend).toFixed(2)}°C/decade</span>
        </div>
      </div>

      {/* Rainfall Trend */}
      <div className="flex-1 p-4 bg-gray-50 rounded-xl shadow-md flex items-center justify-between border border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">
            Rainfall Trend
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            Avg: {rainAvg.toFixed(2)} mm
          </p>
        </div>
        <div
          className={`flex items-center font-semibold text-lg ${
            rainTrend >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {rainTrend >= 0 ? (
            <FaArrowUp className="w-4 h-4 mr-1" />
          ) : (
            <FaArrowDown className="w-4 h-4 mr-1" />
          )}
          <span>{Math.abs(rainTrend).toFixed(2)} mm/decade</span>
        </div>
      </div>
    </div>
  );
};

export default TrendSummaryCards;

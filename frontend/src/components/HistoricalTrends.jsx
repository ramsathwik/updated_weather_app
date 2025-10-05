import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LocationContext } from "../../contexts/LocationContext";

const HistoricalTrends = () => {
  const { chartData } = useContext(LocationContext);

  return (
    <div className="flex flex-col space-y-6">
      {/* Temperature Line Chart */}
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-2">Temperature Trend</h3>
        <div className="border border-gray-200 rounded-lg p-2 bg-white shadow-inner h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eee"
              />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                minTickGap={20}
              />
              <YAxis
                domain={["auto", "auto"]}
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value) => `${value}°F`}
              />
              <Tooltip
                formatter={(value) => [`${value.toFixed(2)}°F`, "Avg Temp"]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rainfall Line Chart */}
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-2">Rainfall Trend</h3>
        <div className="border border-gray-200 rounded-lg p-2 bg-white shadow-inner h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eee"
              />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                minTickGap={20}
              />
              <YAxis
                domain={["auto", "auto"]}
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value) => `${value}MM`}
              />
              <Tooltip
                formatter={(value) => [`${value}MM`, "Avg Rainfall"]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="rain"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HistoricalTrends;

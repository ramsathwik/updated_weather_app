import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// --- Sample Data for the Charts (1995-2021, similar to the screenshot) ---
const chartData = [
  { year: 1995, temp: 68.5, rain: 155 },
  { year: 1998, temp: 70.0, rain: 130 },
  { year: 2001, temp: 69.2, rain: 145 },
  { year: 2004, temp: 68.8, rain: 160 },
  { year: 2007, temp: 69.5, rain: 140 },
  { year: 2010, temp: 70.2, rain: 150 },
  { year: 2013, temp: 69.0, rain: 165 },
  { year: 2016, temp: 69.8, rain: 125 },
  { year: 2019, temp: 70.5, rain: 170 },
  { year: 2021, temp: 69.3, rain: 158 },
];

const HistoricalTrends = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      {/* -------------------- Temperature Chart (Line) -------------------- */}
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
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                domain={[68, 71]} // Set a fixed domain to mimic the screenshot
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
                stroke="#ef4444" // Tailwind red-500
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* -------------------- Rainfall Chart (Bar) -------------------- */}
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-2">Rainfall Trend</h3>
        <div className="border border-gray-200 rounded-lg p-2 bg-white shadow-inner h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                domain={[120, 180]} // Set a fixed domain
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value) => `${value}MM`}
              />
              <Tooltip
                formatter={(value) => [`${value}MM`, "Avg Rainfall"]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Bar
                dataKey="rain"
                fill="#3b82f6" // Tailwind blue-500
                barSize={15}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HistoricalTrends;

// WeatherDetails.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const alternativeLocations = [
  { name: "Chennai", rain: 60, temperature: 32, humidity: 75 },
  { name: "Bengaluru", rain: 30, temperature: 28, humidity: 65 },
  { name: "Hyderabad", rain: 45, temperature: 31, humidity: 70 },
];

const pieData = [
  { name: "Will Rain", value: 70 },
  { name: "No Rain", value: 30 },
];

const COLORS = ["#4F46E5", "#E0E7FF"];

const WeatherDetails = () => {
  const handleLocationClick = (location) => {
    alert(`You clicked ${location.name}`);
    // Later, you can navigate or fetch data here
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Weather Details</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Alternative Locations */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-3">Alternative Locations</h2>
          <ul>
            {alternativeLocations.map((loc, index) => (
              <li key={index}>
                <button
                  onClick={() => handleLocationClick(loc)}
                  className="text-blue-600 hover:underline mb-2 block"
                >
                  {loc.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Precautions */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-3">Precautions</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Carry an umbrella.</li>
            <li>Wear light and breathable clothes.</li>
            <li>Stay hydrated and avoid direct sun exposure.</li>
            <li>Check weather updates regularly.</li>
          </ul>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-3">Rain Prediction</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-3">Weather Stats</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={alternativeLocations}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rain" fill="#4F46E5" name="Rain (%)" />
              <Bar
                dataKey="temperature"
                fill="#10B981"
                name="Temperature (°C)"
              />
              <Bar dataKey="humidity" fill="#F59E0B" name="Humidity (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;

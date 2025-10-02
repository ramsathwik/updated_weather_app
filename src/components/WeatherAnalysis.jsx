import React from "react";
import {
  FaFire,
  FaSnowflake,
  FaWind,
  FaCloudShowersHeavy,
  FaGrinStars,
} from "react-icons/fa";

const Card = ({ title, probability, icon: Icon, color, threshold }) => (
  <div
    className={`p-4 rounded-xl shadow-lg border border-opacity-30 flex-1 ${color}`}
  >
    <div className="flex justify-between items-center mb-2">
      <Icon className="w-8 h-8" />
      <p className="text-xl font-bold">{probability}</p>
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm mt-1">{threshold}</p>
  </div>
);

const WeatherAnalysis = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
      <Card
        title="Very Hot"
        probability="35.1%"
        icon={FaFire}
        color="bg-red-50 border-red-300 text-red-700"
        threshold="Temperature > 90°F (32°C)"
      />
      <Card
        title="Very Cold"
        probability="15.2%"
        icon={FaSnowflake}
        color="bg-blue-50 border-blue-300 text-blue-700"
        threshold="Temperature < 32°F (0°C)"
      />
      <Card
        title="Very Windy"
        probability="27.2%"
        icon={FaWind}
        color="bg-gray-50 border-gray-300 text-gray-700"
        threshold="Wind speed > 25 mph"
      />
      <Card
        title="Very Wet"
        probability="37.9%"
        icon={FaCloudShowersHeavy}
        color="bg-indigo-50 border-indigo-300 text-indigo-700"
        threshold="Heavy rainfall > 1 inch"
      />
      <Card
        title="Very Uncomfortable"
        probability="38.0%"
        icon={FaGrinStars}
        color="bg-yellow-50 border-yellow-300 text-yellow-700"
        threshold="High heat index or wind chill"
      />
    </div>
  );
};

export default WeatherAnalysis;

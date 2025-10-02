import React, { useState } from "react";
import { FaCalendarAlt, FaCheck, FaGlobe, FaDownload } from "react-icons/fa";

const SeasonButton = ({ label, isSelected, onClick }) => (
  <button
    className={`p-3 rounded-lg flex-1 text-center font-medium transition-all ${
      isSelected
        ? "bg-blue-600 text-white shadow-md"
        : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`}
    onClick={() => onClick(label)}
  >
    {label}
  </button>
);

const MonthButton = ({ label, isSelected, onClick }) => (
  <button
    className={`p-3 rounded-xl flex-1 text-center text-sm transition-all ${
      isSelected
        ? "bg-blue-500 text-white shadow-sm"
        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
    }`}
    onClick={() => onClick(label)}
  >
    {label}
  </button>
);

const SelectTimePeriod = () => {
  const [selectedSeason, setSelectedSeason] = useState("Summer");
  const [selectedMonth, setSelectedMonth] = useState("Jun");

  const seasons = ["Spring", "Summer", "Fall", "Winter"];
  const months = [
    ["Jan", "Feb", "Mar"],
    ["Apr", "May", "Jun"],
    ["Jul", "Aug", "Sep"],
    ["Oct", "Nov", "Dec"],
  ];

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold flex items-center text-gray-800">
        <FaCalendarAlt className="mr-2 text-blue-500" />
        Select Time Period
      </h2>

      <p className="text-sm font-medium text-gray-600">Select by Season</p>
      <div className="grid grid-cols-2 gap-3">
        {seasons.map((season) => (
          <SeasonButton
            key={season}
            label={season}
            isSelected={selectedSeason === season}
            onClick={setSelectedSeason}
          />
        ))}
      </div>

      <p className="text-sm font-medium text-gray-600 mt-4">Select by Month</p>
      <div className="space-y-2">
        {months.map((row, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            {row.map((month) => (
              <MonthButton
                key={month}
                label={month}
                isSelected={selectedMonth === month}
                onClick={setSelectedMonth}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-700">Summer Season</p>
          <FaCheck className="text-green-500 w-4 h-4" />
        </div>
        <p className="text-blue-600 font-medium text-xs">
          Historical data analysis period
        </p>

        <p className="mt-3 text-gray-600">
          Analysis uses **30+ years** of NASA Earth observation data (1994-2024)
          to calculate probabilities for your selected time period.
        </p>
      </div>
      <button className="flex items-center justify-center p-4 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-700 transition duration-200 mt-4">
        <FaGlobe className="mr-3 w-5 h-5" />
        Analyze Weather Data
      </button>
    </div>
  );
};

export default SelectTimePeriod;

import React, { useState } from "react";
import { FaCalendarAlt, FaCheck, FaGlobe } from "react-icons/fa";
import { useContext } from "react";
import { LocationContext } from "../../contexts/LocationContext";

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
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
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

const monthMap = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

const SelectTimePeriod = () => {
  const {
    timeSelection,
    setTimeSelection,
    selectedLocation,
    setChartdata,
    loading,
    setLoading,
    setAnalyzed,
  } = useContext(LocationContext);

  const seasons = ["Spring", "Summer", "Fall", "Winter"];
  const months = [
    ["Jan", "Feb", "Mar"],
    ["Apr", "May", "Jun"],
    ["Jul", "Aug", "Sep"],
    ["Oct", "Nov", "Dec"],
  ];
  function ceilToHalf(num) {
    return Math.ceil(num * 2) / 2;
  }
  async function handleAnalyze() {
    if (!timeSelection.type || !timeSelection.value) {
      alert("Please select a season or month.");
      return;
    }
    setLoading(true); // start loading
    setAnalyzed(false);

    console.log("Selection Type:", timeSelection.type);
    console.log("Selection Value:", timeSelection.value);

    let { lat, lng } = selectedLocation;
    lat = ceilToHalf(lat);
    lng = ceilToHalf(lng);
    console.log(lat, lng);

    const query = new URLSearchParams({
      lat,
      lng,
      type: timeSelection.type,
      value: timeSelection.value,
    });

    try {
      const response = await fetch(
        `${BACKEND_URL}/analyze/historical?${query}`
      );
      const data = await response.json();
      console.log(data);
      setChartdata(data.data);
      setAnalyzed(true); // mark as analyzed
    } catch (error) {
      console.error(error);
      alert("Error fetching analysis data");
    }

    setLoading(false);
  }

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
            isSelected={
              timeSelection.type === "season" && timeSelection.value === season
            }
            onClick={(label) =>
              setTimeSelection({ type: "season", value: label })
            }
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
                isSelected={
                  timeSelection.type === "month" &&
                  timeSelection.value === monthMap[month]
                }
                onClick={(label) =>
                  setTimeSelection({ type: "month", value: monthMap[label] })
                }
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-700">
            {timeSelection.type
              ? timeSelection.type === "season"
                ? `${timeSelection.value} Season`
                : `${Object.keys(monthMap).find(
                    (key) => monthMap[key] === timeSelection.value
                  )} Month`
              : "No Selection"}
          </p>
          {timeSelection.value && (
            <FaCheck className="text-green-500 w-4 h-4" />
          )}
        </div>
        <p className="text-blue-600 font-medium text-xs">
          Historical data analysis period
        </p>

        <p className="mt-3 text-gray-600">
          Analysis uses **30+ years** of NASA Earth observation data (1994-2024)
          to calculate probabilities for your selected time period.
        </p>
      </div>

      <button
        className={`flex items-center justify-center p-4 font-bold text-lg rounded-xl shadow-lg transition duration-200 mt-4 ${
          selectedLocation
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={selectedLocation ? handleAnalyze : null}
        disabled={!selectedLocation}
      >
        <FaGlobe className="mr-3 w-5 h-5" />
        {loading ? "Analyzing..." : "Analyze Weather Data"}
      </button>
    </div>
  );
};

export default SelectTimePeriod;

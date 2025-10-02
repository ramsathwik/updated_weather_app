import React from "react";
import { FaDownload, FaFileCsv, FaCode, FaCopy } from "react-icons/fa";

const ExportData = () => {
  const exportItems = [
    "Location coordinates and name",
    "Selected time period information",
    "Weather condition probabilities",
    "Historical trend data (30+ years)",
    "Data source and methodology metadata",
  ];

  const ExportCard = ({ icon, title, description, colorClass }) => (
    <div
      className={`p-4 rounded-xl border ${colorClass} bg-white shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center text-center`}
    >
      <div
        className={`p-3 rounded-full ${colorClass
          .replace("border-", "bg-")
          .replace("text-", "text-")} opacity-80 mb-3`}
      >
        {icon}
      </div>
      <p className="font-semibold text-sm mb-1 text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-2xl space-y-6">
      <h2 className="text-xl font-semibold flex items-center text-gray-700">
        <FaDownload className="mr-3 text-green-500" />
        Export Data
      </h2>

      <p className="text-gray-600">
        Download your weather analysis results with metadata and source
        information for further use.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <ExportCard
          icon={<FaFileCsv className="w-5 h-5 text-green-700" />}
          title="CSV Format"
          description="Spreadsheet compatible format"
          colorClass="border-green-300 text-green-700"
        />
        <ExportCard
          icon={<FaCode className="w-5 h-5 text-blue-700" />}
          title="JSON Format"
          description="Structured data with metadata"
          colorClass="border-blue-300 text-blue-700"
        />
        <ExportCard
          icon={<FaCopy className="w-5 h-5 text-purple-700" />}
          title="Copy Text"
          description="Quick copy to clipboard"
          colorClass="border-purple-300 text-purple-700"
        />
      </div>

      <div className="space-y-2">
        <p className="font-bold text-gray-800">Exported Data includes:</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-4">
          {exportItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExportData;

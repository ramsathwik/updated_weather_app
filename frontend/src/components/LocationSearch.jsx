import { MdSearch } from "react-icons/md";
const LocationSearch = () => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold mb-3">Select Location</h2>
    <div className="flex">
      <input
        type="text"
        placeholder="Search for a city or location..."
        className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
        <MdSearch className="w-6 h-6" />
      </button>
    </div>
  </div>
);
export default LocationSearch;

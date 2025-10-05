import { MdSearch } from "react-icons/md";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LocationContext } from "../../contexts/LocationContext";

function LocationSearch() {
  let { selectedLocation, setSelectedLocation, setAnalyzed } =
    useContext(LocationContext);
  let [searchvalue, setSearchvalue] = useState("");
  let [suggestions, setSuggestions] = useState([]);
  let [showSuggestions, setShowSuggestions] = useState(false);
  let [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (searchvalue === "") {
      setSuggestions([]);
      setNoResults(false);
      setSelectedLocation(null);
      setAnalyzed(false);
      return;
    }

    let controller = new AbortController();
    let signal = controller.signal;

    async function fetchSuggestions() {
      try {
        let response = await fetch(
          `http://localhost:3000/search?text=${encodeURIComponent(
            searchvalue
          )}`,
          { signal }
        );
        let data = await response.json();
        let features = data.features;

        if (features && features.length > 0) {
          setSuggestions(features);
          setNoResults(false);
        } else {
          setSuggestions([]);
          setNoResults(true);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("request aborted");
        } else {
          console.log(err);
        }
      }
    }

    if (showSuggestions) {
      fetchSuggestions();
    }

    return () => controller.abort();
  }, [searchvalue, showSuggestions]);

  // Sync with map clicks
  useEffect(() => {
    if (selectedLocation?.name) {
      setSearchvalue(selectedLocation.name);
    }
  }, [selectedLocation]);
  function ceilToHalf(num) {
    return Math.ceil(num * 2) / 2;
  }

  return (
    <div className="mb-4 relative">
      <h2 className="text-xl font-semibold mb-3">Select Location</h2>
      <div className="flex">
        <input
          type="text"
          required
          value={searchvalue}
          placeholder="Search for a city or location..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setSearchvalue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            if (searchvalue.length > 0) setShowSuggestions(true);
          }}
        />
        <button className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
          <MdSearch className="w-6 h-6" />
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {noResults ? (
            <div className="p-3 text-gray-500 italic">No results found</div>
          ) : (
            <ul>
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchvalue(item.properties.formatted);
                    let lat = item.geometry.coordinates[1];
                    let lng = item.geometry.coordinates[0];
                    lat = ceilToHalf(lat);
                    lng = ceilToHalf(lng);

                    setSelectedLocation({
                      lat,
                      lng,
                      name: item.properties.formatted,
                    });
                    setSuggestions([]);
                    setShowSuggestions(false);
                    setNoResults(false);
                  }}
                >
                  {item.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default LocationSearch;

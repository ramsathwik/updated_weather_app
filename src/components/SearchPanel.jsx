import { useNavigate } from "react-router-dom";
function SearchPanel() {
  let navigate = useNavigate();
  function formhandler(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="absolute sm:static left-2 right-2 w-full max-w-md sm:max-w-none mx-auto sm:mx-0 p-4 sm:p-6 flex flex-col justify-between bg-white/95 rounded-2xl shadow-xl backdrop-blur h-auto sm:h-full">
      {/* Heading - hidden on mobile */}
      <div>
        <h1 className="hidden sm:block text-3xl font-extrabold text-indigo-700 mb-3 tracking-tight">
          GetWeather
        </h1>

        {/* Description - hidden on mobile */}
        <p className="hidden sm:block text-gray-700 mb-6 leading-relaxed">
          Enter your location and date to check the
          <span className="text-indigo-600 font-medium"> weather forecast</span>
          ,<span className="text-blue-600 font-medium"> precautions</span>, and
          <span className="text-cyan-600 font-medium"> analytics</span>.
        </p>
      </div>

      <form
        onSubmit={formhandler}
        className="flex flex-col gap-4 flex-1 justify-center"
      >
        <h2 className="hidden sm:block text-lg font-semibold text-indigo-800 mb-1">
          Weather Search
        </h2>

        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Location
          </label>
          <input
            type="text"
            placeholder="e.g., Hyderabad"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
        >
          Get Weather
        </button>
      </form>
    </div>
  );
}

export default SearchPanel;

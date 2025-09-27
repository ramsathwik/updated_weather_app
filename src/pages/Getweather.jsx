import GetMap from "../components/Map";
import SearchPanel from "../components/SearchPanel";

function Getweather() {
  return (
    <div className="pt-20 sm:pt-40 px-2 sm:px-20 pb-20">
      <div className="flex flex-col sm:flex-row gap-6 max-w-7xl mx-auto">
        {/* Map */}
        <div className="flex-1">
          <GetMap />
        </div>

        {/* Search */}
        <div className="flex-1">
          <SearchPanel />
        </div>
      </div>
    </div>
  );
}

export default Getweather;

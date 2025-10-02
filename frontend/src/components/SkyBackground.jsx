import { useEffect, useState } from "react";

function SkyBackground() {
  const [timeOfDay, setTimeOfDay] = useState("day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) setTimeOfDay("day");
    else if (hour >= 18 && hour < 20) setTimeOfDay("evening");
    else setTimeOfDay("night");
  }, []);

  const gradients = {
    day: "from-sky-200 to-sky-400",
    evening: "from-orange-200 via-pink-300 to-purple-500",
    night: "from-indigo-900 via-blue-900 to-black",
  };

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-b ${gradients[timeOfDay]} transition-colors duration-1000`}
    >
      {/* Clouds */}
      <div className="absolute w-72 h-28 bg-white/70 rounded-full blur-2xl animate-cloudSlow top-20 left-[-200px]"></div>
      <div className="absolute w-48 h-20 bg-white/60 rounded-full blur-xl animate-cloudFast top-40 left-[-300px]"></div>

      {/* Sun / Moon */}
      {timeOfDay === "day" && (
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-80"></div>
      )}
      {timeOfDay === "evening" && (
        <div className="absolute top-12 right-12 w-28 h-28 bg-orange-400 rounded-full blur-2xl opacity-80"></div>
      )}
      {timeOfDay === "night" && (
        <div className="absolute top-16 right-16 w-24 h-24 bg-white rounded-full blur-xl opacity-70"></div>
      )}
    </div>
  );
}

export default SkyBackground;

import { Link } from "react-router-dom";
import Clouds from "./Clouds";
import WeatherParticles from "./WeatherParticles";

export default function HeroSection({
  title = "Plan Your Day With WeatherApp",
  subtitle = "Know the conditions before you head out. Rain, sun, wind — we’ve got you.",
  buttonText = "Get Started",
  buttonLink = "/weather",
  animated = true,
}) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-16 h-[500px] overflow-hidden">
      
      {/* Background and clouds */}
      {animated ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500 bg-[length:200%_200%] animate-gradientShift"></div>
          <Clouds />
          <WeatherParticles />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500"></div>
      )}

      {/* Content on top of clouds */}
      <div className="relative z-30 text-white drop-shadow-lg px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">{subtitle}</p>
        <Link
          to={buttonLink}
          className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold shadow hover:bg-gray-200 transition"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}

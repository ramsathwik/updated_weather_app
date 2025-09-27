// src/pages/About.jsx
import { Link } from "react-router-dom";
import Solar from "../assets/images/Solar.jpg";
import vacation from "../assets/images/vacation.avif";
import {
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaSearch,
  FaBolt,
  FaChartBar,
  FaCloudSunRain,
} from "react-icons/fa";
import HeroSection from "../components/HeroSection";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reusable Hero Section */}
      <HeroSection
        title="Plan Your Outdoor Activities with Confidence"
        subtitle="Check if it’s going to be very hot, cold, windy, wet, or uncomfortable at your chosen location and time."
        buttonText="Explore Weather"
        buttonLink="/weather"
        animated={false} // ✅ keep About simple (no clouds/particles)
      />

      {/* Problem Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Why This Matters
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Weather can make or break an outdoor plan. Whether it’s a family
              vacation, a trek, or a fishing trip, unexpected conditions like
              extreme heat, sudden rain, or strong winds can ruin the
              experience. We built this app to give you reliable,
              location-specific insights before you head out.
            </p>
          </div>
          <img
            src={vacation}
            alt="Weather importance"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <img
            src={Solar}
            alt="Solution flow"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Solution
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Simply enter a location and date. Our app checks Earth observation
              data and tells you the likelihood of extreme conditions—very hot,
              cold, wet, windy, or uncomfortable—so you can plan smarter.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaMapMarkedAlt className="text-white text-2xl" />,
                title: "Location-based forecasts",
                desc: "Get personalized results for any city or state.",
              },
              {
                icon: <FaCalendarAlt className="text-white text-2xl" />,
                title: "Time-specific insights",
                desc: "Choose the date you plan your outdoor activity.",
              },
              {
                icon: <FaSearch className="text-white text-2xl" />,
                title: "Easy Search",
                desc: "Find weather & pollution details instantly.",
              },
              {
                icon: <FaBolt className="text-white text-2xl" />,
                title: "Simple Interface",
                desc: "Clean, user-friendly design for quick results.",
              },
              {
                icon: <FaChartBar className="text-white text-2xl" />,
                title: "Clear Categories",
                desc: "Know if it’s very hot, cold, wet, windy, or uncomfortable.",
              },
              {
                icon: <FaCloudSunRain className="text-white text-2xl" />,
                title: "Real-time Data",
                desc: "Based on trusted weather & Earth observation sources.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-blue-400 w-14 h-14 flex items-center justify-center rounded-full mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Check the Weather?</h2>
        <p className="mb-6 text-lg">
          Start exploring weather and pollution conditions for your city now.
        </p>
        <Link
          to="/weather"
          className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default About;

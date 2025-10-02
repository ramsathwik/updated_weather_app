import { useState } from "react";
import HeroSection from "../components/HeroSection";
import RotatingGlobe from "../components/RotatingGlobe";
import { Link } from "react-router-dom";

function Home() {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div className="min-h-screen relative bg-white">
      {/* Hero Section */}
      <HeroSection animated={true} />

      {/* Highlights Section */}
      <section className="relative py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 z-10">
        <div className="bg-gradient-to-br from-white/90 to-white/80 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-2">Feature One</h3>
          <p className="text-gray-600">
            A short description of this awesome feature goes here.
          </p>
        </div>
        <div className="bg-gradient-to-br from-white/90 to-white/80 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
          <p className="text-gray-600">
            Another great highlight about your website or app.
          </p>
        </div>
        <div className="bg-gradient-to-br from-white/90 to-white/80 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-2">Feature Three</h3>
          <p className="text-gray-600">
            Explain why users should love this feature.
          </p>
        </div>
      </section>

      {/* Globe Section */}
      <section className="relative py-12 px-6 text-center z-10">
        <h2 className="text-3xl font-bold mb-4 relative z-20">
          Explore Our Planet 🌍
        </h2>

        <div
          className="w-[400px] h-[400px] mx-auto rounded-2xl overflow-hidden border border-gray-300 relative"
          onPointerDown={() => setShowInstructions(false)} // hide on click/touch
        >
          <RotatingGlobe />

          {/* Instructions overlay */}
          {showInstructions && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-gray-700 text-sm px-4 py-2 rounded-lg">
              Drag to rotate • Scroll or pinch to zoom
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-12 px-6 bg-gradient-to-b from-gray-100 to-gray-200 text-center z-10">
        <h2 className="text-3xl font-bold mb-8">Want to know more?</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To provide accurate, real-time weather insights so you can plan
              your day without surprises.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-700">
              To become the most reliable weather companion for outdoor
              enthusiasts everywhere.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold mb-2">Our Story</h3>
            <p className="text-gray-700">
              Started by a team of adventurers and coders, we realized the need
              for precise weather info in everyday plans.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/about"
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

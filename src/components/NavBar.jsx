import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItemClasses = "font-medium transition-colors px-3 py-2 rounded-lg";

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-white/30 backdrop-blur-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-green-500 transition-colors"
        >
          🌦️ WeatherApp
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItemClasses} ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/Weather"
            className={({ isActive }) =>
              `${navItemClasses} ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Get Weather
          </NavLink>
          <NavLink
            to="/About"
            className={({ isActive }) =>
              `${navItemClasses} ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/Contact"
            className={({ isActive }) =>
              `${navItemClasses} ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* Login Button (desktop only) */}
        <div className="hidden sm:block">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl font-semibold shadow-lg transition-transform ${
                isActive
                  ? "bg-green-600 text-white"
                  : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:scale-105 active:scale-95"
              }`
            }
          >
            Login
          </NavLink>
        </div>

        {/* Hamburger Button */}
        <button
          className="sm:hidden text-3xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

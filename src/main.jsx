import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Getweather from "./pages/Getweather.jsx";
import PageNotFound from "./pages/404.jsx";
import WeatherDetails from "./pages/WeatherDetails.jsx";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/About",
          element: <About />,
        },
        {
          path: "/Contact",
          element: <Contact />,
        },
        {
          path: "/Weather",
          element: <Getweather />,
        },
        {
          path: "/dashboard",
          element: <WeatherDetails></WeatherDetails>,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.MODE === "production" ? "/realweatherapp" : "/",
  }
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

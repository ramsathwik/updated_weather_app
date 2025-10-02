import "./App.css";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <main className="relative z-10 flex-1 w-full overflow-x-hidden pt-20">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500 border-t relative z-10">
        © 2025 WeatherApp. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

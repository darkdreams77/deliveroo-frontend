import React from "react";
import { FaMoon } from "react-icons/fa";
import { TiWeatherSunny } from "react-icons/ti";

import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-white/30 transition-colors duration-300 bg-gray-300/50 dark:bg-white/20 cursor-pointer flex-none"
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? <FaMoon /> : <TiWeatherSunny />}
    </button>
  );
};

export default ThemeToggle;

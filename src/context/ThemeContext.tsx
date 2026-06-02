import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";

// Define the shape of our context
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create the context with a default undefined value (or a dummy default)
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage or user preference
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) return storedTheme;
      // Check for user's system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // Default for server-side rendering
  });

  // Effect to apply/remove 'dark' class on the html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Store the theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]); // Re-run effect when theme changes

  // Function to toggle between themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context easily
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

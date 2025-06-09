import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");
  const value = {
    mode,
    setMode,
  };
  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("mode", mode);
  }, [mode]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// src/context/themeprovider.js
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    colors: isDark
      ? { background: "#121212", text: "#FFFFFF", card: "#1E1E1E" }
      : { background: "#FFFFFF", text: "#000000", card: "#F5F5F5" },
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

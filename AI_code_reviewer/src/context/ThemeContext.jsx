import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('light-mode');
      root.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-mode');
      root.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
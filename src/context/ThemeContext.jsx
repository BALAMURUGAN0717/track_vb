import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // First-visit default must be 'light' as specified in requirements
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('jobtrack_theme');
      return savedTheme === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jobtrack_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      
      // Update body background immediately for smooth transition
      if (theme === 'dark') {
        document.body.style.backgroundColor = '#0B1020';
        document.body.style.color = '#FFFFFF';
      } else {
        document.body.style.backgroundColor = '#F5F7FF';
        document.body.style.color = '#172033';
      }
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

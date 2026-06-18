import React, { createContext, useContext, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { themeAtom, updateThemeAtom, resetThemeAtom, loadSavedTheme } from '../../states/themeState';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const theme = useAtomValue(themeAtom);
  
  useEffect(() => {
    const savedTheme = loadSavedTheme();
    if (savedTheme) {
      localStorage.setItem('ftrst-theme', JSON.stringify(savedTheme));
    }
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
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

export const useUpdateTheme = () => {
  return useSetAtom(updateThemeAtom);
};

export const useResetTheme = () => {
  const resetTheme = useSetAtom(resetThemeAtom);
  
  const handleReset = () => {
    localStorage.removeItem('ftrst-theme');
    resetTheme();
  };

  return handleReset;
};

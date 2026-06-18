import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { themeAtom, updateThemeAtom, resetThemeAtom, loadSavedTheme, MODERN_THEME } from '../../states/themeState';
import { StyleSettingsContext } from '../../contexts/StyleSettingsContext';

export { MODERN_THEME as defaultTheme };
export { useStyleSettings as useTheme } from '../../hooks/useStyleSettings';

/**
 * Provides the current theme from Jotai state via React context.
 * Wrap this at the top of your dashboard / app:
 *
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 *
 * All futurist-components automatically read from this context
 * when no explicit styleSettings prop is passed.
 */
export const ThemeProvider = ({ children }) => {
  const theme = useAtomValue(themeAtom);

  // Restore saved theme on mount, if any
  const updateTheme = useSetAtom(updateThemeAtom);
  useEffect(() => {
    const saved = loadSavedTheme();
    if (saved) {
      // Merge saved over the default so new keys aren't lost
      updateTheme(saved);
    }
  }, []);

  return (
    <StyleSettingsContext.Provider value={theme}>
      {children}
    </StyleSettingsContext.Provider>
  );
};

export const useUpdateTheme = () => useSetAtom(updateThemeAtom);
export const useResetTheme = () => {
  const reset = useSetAtom(resetThemeAtom);
  return () => {
    localStorage.removeItem('ftrst-theme');
    reset();
  };
};
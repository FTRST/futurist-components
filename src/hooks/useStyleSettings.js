import { useContext } from 'react';
import { StyleSettingsContext } from '../contexts/StyleSettingsContext';

/**
 * Hook to resolve styleSettings from: prop → context → defaults.
 *
 * Every component should call this at the top:
 *   const styleSettings = useStyleSettings(props.styleSettings);
 *
 * If the caller passes styleSettings explicitly, that wins.
 * Otherwise the nearest ThemeProvider's context is used.
 * If neither exists, returns null (components handle their own defaults).
 */
export const useStyleSettings = (propTheme) => {
  const contextTheme = useContext(StyleSettingsContext);
  return propTheme || contextTheme || null;
};
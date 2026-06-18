import { atom } from 'jotai';

export const themes = {
  modern: {
    window: { backgroundColor: '#1e1e2e', borderColor: '#89b4fa' },
    titleBar: { backgroundColor: '#181825', textColor: '#cdd6f4' },
    dimensions: { minWidth: 200, minHeight: 150 },
    spacing: { padding: '.75em', margin: '0' },
    borders: { width: '1px', style: 'solid' },
    button: { primaryText: '#cdd6f4', primaryBg: '#45475a' },
  },
  retro: {
    window: { backgroundColor: '#02111B', borderColor: '#6BF178' },
    titleBar: { backgroundColor: '#02111b', textColor: '#6bf178' },
    dimensions: { minWidth: 200, minHeight: 200 },
    spacing: { padding: '.5em', margin: '0' },
    borders: { width: '.25em', style: 'double' },
    button: { primaryText: '#6BF178', primaryBg: '#02111B' },
  },
  light: {
    window: { backgroundColor: '#ffffff', borderColor: '#dce0e8' },
    titleBar: { backgroundColor: '#f5f5f5', textColor: '#4c4f69' },
    dimensions: { minWidth: 200, minHeight: 150 },
    spacing: { padding: '.75em', margin: '0' },
    borders: { width: '1px', style: 'solid' },
    button: { primaryText: '#4c4f69', primaryBg: '#e6e9ef' },
  },
  warm: {
    window: { backgroundColor: '#2d1b12', borderColor: '#e8a87c' },
    titleBar: { backgroundColor: '#3d2b22', textColor: '#f5d5b5' },
    dimensions: { minWidth: 200, minHeight: 150 },
    spacing: { padding: '.75em', margin: '0' },
    borders: { width: '2px', style: 'solid' },
    button: { primaryText: '#f5d5b5', primaryBg: '#5d3b32' },
  },
};

export const MODERN_THEME = themes.modern;

export const themeAtom = atom(MODERN_THEME);

// Deep merge helper
const mergeDeep = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = mergeDeep(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

export const updateThemeAtom = atom(
  (get) => get(themeAtom),
  (get, set, updates) => {
    const current = get(themeAtom);
    set(themeAtom, mergeDeep(current, updates));
  }
);

export const resetThemeAtom = atom(
  (get) => get(themeAtom),
  (_get, set) => {
    set(themeAtom, MODERN_THEME);
  }
);

export const loadThemeAtom = atom(
  (get) => get(themeAtom),
  (_get, set, newTheme) => {
    set(themeAtom, mergeDeep(MODERN_THEME, newTheme || {}));
  }
);

export const saveTheme = (theme) => {
  localStorage.setItem('ftrst-theme', JSON.stringify(theme));
};

export const loadSavedTheme = () => {
  try {
    const saved = localStorage.getItem('ftrst-theme');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const defaultTheme = MODERN_THEME;
import { atom } from 'jotai';

const defaultTheme = {
  window: {
    borderColor: '#6BF178',
    backgroundColor: 'rgba(2,17,27,.7)'
  },
  titleBar: {
    backgroundColor: '#02111b',
    textColor: '#6bf178'
  },
  button: {
    primaryBg: '#02111B'
  },
  borders: {
    width: '.25em',
    style: 'double'
  },
  spacing: {
    padding: '.5em',
    margin: '.5em'
  },
  dimensions: {
    minWidth: 200,
    minHeight: 200
  }
};

export const themeAtom = atom(defaultTheme);

export const updateThemeAtom = atom(
  (get) => get(themeAtom),
  (get, set, updates) => {
    const currentTheme = get(themeAtom);
    
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
    
    set(themeAtom, mergeDeep(currentTheme, updates));
  }
);

export const resetThemeAtom = atom(
  (get) => get(themeAtom),
  (get, set) => {
    set(themeAtom, defaultTheme);
  }
);

export const loadThemeAtom = atom(
  (get) => get(themeAtom),
  (get, set, newTheme) => {
    const mergedTheme = mergeDeep(defaultTheme, newTheme || {});
    set(themeAtom, mergedTheme);
  }
);

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

export const saveTheme = (theme) => {
  localStorage.setItem('ftrst-theme', JSON.stringify(theme));
};

export const loadSavedTheme = () => {
  const saved = localStorage.getItem('ftrst-theme');
  return saved ? JSON.parse(saved) : null;
};

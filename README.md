# Futurist Components

A React component library and UI kit for building applications within the [Futurist](https://futurist.io) framework. Fully themeable via a unified `styleSettings` object — colors, borders, spacing, and constraints all driven by a single theme.

**Tech Stack:** React 18, styled-components 6, Jotai 2, react-draggable, re-resizable, Vite

---

## Quick Start

```bash
npm install futurist-components
# or
yarn add futurist-components
```

```jsx
import { Button, Input, BaseWindow } from 'futurist-components';

function App() {
  return (
    <ThemeProvider>
      <Button label="Click me" />
      <Input placeholder="Type here" />
    </ThemeProvider>
  );
}
```

Components work out of the box with the default Modern theme. Wrap your app in `<ThemeProvider>` and all components automatically pick up the theme — no prop drilling needed.

---

## Theme System

The entire visual appearance is controlled by a single `styleSettings` object:

```js
{
  window:   { backgroundColor: '#1e1e2e', borderColor: '#89b4fa' },
  titleBar: { backgroundColor: '#181825', textColor: '#cdd6f4' },
  dimensions: { minWidth: 200, minHeight: 150 },
  spacing:  { padding: '.75em', margin: '0' },
  borders:  { width: '1px', style: 'solid' },
  button:   { primaryText: '#cdd6f4', primaryBg: '#45475a' },
}
```

### Presets

Built-in presets, importable by name:

```js
import { themes } from 'futurist-components';

themes.modern   // Catppuccin Mocha-inspired dark, blue accent
themes.retro    // Green-on-black CRT terminal
themes.light    // Clean light theme, warm gray accents
themes.warm     // Earthy brown/orange dark theme
```

Pass one directly to set the theme:

```jsx
import { themes, useUpdateTheme } from 'futurist-components';

function MyApp() {
  const updateTheme = useUpdateTheme();
  return (
    <>
      <Button onClick={() => updateTheme(themes.retro)} label="Retro" />
      <Button onClick={() => updateTheme(themes.light)} label="Light" />
    </>
  );
}
```

### ThemeProvider (recommended)

Wrap your app once, all components inherit the theme:

```jsx
import { ThemeProvider, useUpdateTheme } from 'futurist-components';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

function Dashboard() {
  const updateTheme = useUpdateTheme();

  return (
    <>
      <Button label="Switch to retro" onClick={() =>
        updateTheme({ window: { borderColor: '#6BF178' } })
      } />
      <BaseWindow><span>Content</span></BaseWindow>
    </>
  );
}
```

Theme updates via `useUpdateTheme()` use deep merge — you only need to pass the properties you want to change. All components re-render instantly with the new values.

### Per-component override (prop-based)

Pass `styleSettings` directly to any component to override the context theme for that instance:

```jsx
<Button styleSettings={{ button: { primaryText: '#ff0000' } }} label="Red Button" />
<BaseWindow styleSettings={customWindowTheme}>
  Content here
</BaseWindow>
```

### Theme utilities

```jsx
import { themes, defaultTheme, useTheme, useUpdateTheme, useResetTheme } from 'futurist-components';

const theme = useTheme();              // current theme object
const update = useUpdateTheme();       // deep-merge partial updates
const reset = useResetTheme();         // reset to defaults + clear localStorage

// Switch between named presets:
update(themes.retro);
update(themes.light);

// Or set a completely custom theme at the atom level:
import { useSetAtom } from 'jotai';
import { themeAtom } from 'futurist-components';

const setTheme = useSetAtom(themeAtom);
setTheme(themes.warm);                // replace entire theme
setTheme({ window: { borderColor: '#ff0000' } }); // deep-merge override
```

### Theme sharing (copy/paste)

The **DevPlayground** includes Copy/Import buttons in the toolbar:

1. Tweak colors → click **Copy** → JSON is on your clipboard
2. Recipient clicks **Import** → pastes JSON → hits Enter → theme applied

---

## Components

### Window System

| Component | Description |
|---|---|
| **BaseWindow** | Draggable, resizable floating window. Drag handle is the title bar. Supports maximize/minimize/close, z-index stacking, resize constraints. |
| **TitleBar** | Window title bar with themed maximize/minimize/close buttons. |
| **WindowContent** | Single-wrapper content container. Replaces the deprecated WindowInset+WindowSpacing+WindowInner three-layer pattern. |
| **WindowTitle** | Section header with bottom border. |

### Form Controls

| Component | Props |
|---|---|
| **Button** | `label`, `action`, `variant` (default / primary / ghost), `disabled`, `type` |
| **Input** | `value`, `action`, `placeholder`, `type`, `name` |
| **Select** | `value`, `action`, `options[]` ({value, label}), `placeholder` |
| **Textarea** | `value`, `action`, `placeholder`, `rows` |
| **Checkbox** | `checked`, `action`, `label` |
| **Toggle** | `checked`, `action`, `label` — animated switch |

### Display & Feedback

| Component | Props |
|---|---|
| **Badge** | `label`, `variant` (default / info / success / warning / danger) |
| **Alert** | `children`, `variant`, `onClose` |
| **Spinner** | `size` |
| **Divider** | Themed `<hr>` separator |
| **Tab / TabContainer** | Tab navigation with active indicator |

### Charts & Data (added from main)

| Component | Description |
|---|---|
| **AreaChart** | Area chart visualization |
| **BarChart** | Bar chart visualization |
| **LineChart** | Line chart visualization |
| **PieChart** | Pie chart visualization |
| **HeatmapChart** | Heatmap visualization |
| **Sparkline** | Inline sparkline |

### Other

| Component | Description |
|---|---|
| **Card** | Content card |
| **Modal** | Modal dialog |
| **Toast** | Toast notification |
| **ProgressBar** | Progress bar |
| **Radio** | Radio button |
| **Slider** | Range slider |
| **Customizer** | Theme customization panel |
| **Shortcut / ShortcutContainer** | Desktop shortcut icons (draggable) |

All components accept `styleSettings` as an optional prop. None require it when wrapped in `<ThemeProvider>`.

---

## DevPlayground

The **DevPlayground** is a development workspace bundled with the library for iterating on components and theming.

```jsx
import { DevPlayground } from 'futurist-components';

// Mount it directly — it includes its own ThemeProvider and state management
<DevPlayground />
```

Features:
- **4 theme presets** — instant switching
- **Window spawn buttons** — spawn themed demo windows (Notes, Terminal, File Manager, Preview)
- **Live theme controls** — color pickers, border width/style, spacing, dimensions
- **Copy/Import theme** — share themes as JSON
- **Debug panel** — inspect window state (id, size, z-index, stacking order)

---

## Installation as a Dependency

```bash
npm install futurist-components
```

### Peer dependencies (must be installed by the consumer)

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "styled-components": "^6.0.0",
  "jotai": "^2.0.0"
}
```

### Usage in a dashboard with multiple packages

```jsx
// Master dashboard — define the theme once
import { Provider } from 'jotai';
import { ThemeProvider, themes } from 'futurist-components';

// Option A: use the default modern theme
<Provider>
  <ThemeProvider>
    <PackageA />
    <PackageB />
  </ThemeProvider>
</Provider>

// Option B: customize with a preset
import { useSetAtom } from 'jotai';
import { themeAtom, themes } from 'futurist-components';

function Dashboard() {
  const setTheme = useSetAtom(themeAtom);
  useEffect(() => { setTheme(themes.warm); }, []);
  return (
    <Provider>
      <ThemeProvider>
        <PackageA />
      </ThemeProvider>
    </Provider>
  );
}

// Option C: custom partial theme
const setTheme = useSetAtom(themeAtom);
setTheme({ window: { backgroundColor: '#your-color' } });
```

All child packages using `futurist-components` automatically read the theme from context. No prop drilling across package boundaries.

### Optional: Isolated theme per package

Each `<ThemeProvider>` creates its own scope. Nest them to give different sections different themes:

```jsx
<ThemeProvider>
  <DarkSection />
  <ThemeProvider>
    <LightSection /> {/* overrides theme for this subtree only */}
  </ThemeProvider>
</ThemeProvider>
```

---

## Development

```bash
# Install dependencies
yarn

# Start dev server (opens DevPlayground)
yarn dev

# Build for production
yarn build

# Run tests
yarn test

# Lint
yarn lint
```

## Build Output

- `dist/futurist-components.es.js` — ES module (~274 KB)
- `dist/futurist-components.umd.js` — UMD bundle (~192 KB)
- Externalized: `react`, `react-dom` (provided by consumer)

## License

MIT
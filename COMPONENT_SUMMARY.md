# Futurist Components — Component & State Summary

**Library:** `futurist-components` v2.0.7  
**Purpose:** UI kit / component library for building applications within the Futurist framework.  
**Tech Stack:** React 18, styled-components 6, Jotai 2, react-draggable, re-resizable, Vite (library mode).  
**Theming:** Unified `styleSettings` object drives all visual properties — colors, borders, spacing, constraints. 4 built-in presets (Modern, Retro, Light, Warm) with copy/paste theme sharing.

---

## Components

### 1. BaseWindow (`src/components/BaseWindow/BaseWindow.jsx`)

The core window primitive — a draggable, resizable floating window.

- **Drag:** Uses `react-draggable` with `handle=".modal-title-bar"` and `bounds="parent"`. Drag position tracked in local state via `position={dragPosition}`. Disabled when maximized. `bounds="parent"` correctly constrains all edges since CSS `top`/`left` are **no longer set** — Draggable's `position` is the sole positioning mechanism.
- **Init position:** Each spawned window cascades from `{x:30, y:30}` by `25px` per window index. Restores position from `prevTop`/`prevLeft` on minimize.
- **Resize:** Uses `re-resizable`. Min constraints from `styleSettings.dimensions` (default: 200×150). Max constrained to `device.deskSpace`. On resize stop, clamps to viewport bounds and calls `resizeWindow()`.
- **Z-order:** `onStart` of drag checks if this window is top-most by zIndex. If not, calls `bringToFront()` which sets target to `zIndex: 99999` and re-indexes others by position.
- **Maximize/Minimize:** TitleBar passes `expandAction` (sets width/height to viewport, stores prev values, resets drag position to `{0,0}`) and `minimizeAction` (restores prev values and drag position).
- **Content area:** Uses `WindowContent` internally with `border:none; padding:0; background:none` — the outer `StyledWindow` provides the frame. Content fills edge-to-edge.
- **Styling:** All styled-components use **transient props** (`$s`) to avoid DOM prop leakage.
- **Props:** `id`, `device`, `manipulateWindows`, `children`, `style`, `styleSettings`
- **CSS class:** `.futurist-window`

---

### 2. TitleBar (`src/components/TitleBar/TitleBar.jsx`)

Window title bar — drag handle and action buttons. Fully themed via `styleSettings`.

- **Layout:** Flex row. Title centered between action buttons.
- **Buttons:**
  - **Maximize (⛶):** Shown when `!maximize`. Background color from `button.primaryBg`.
  - **Minimize (⤡):** Shown when `maximize`. Background color from `button.primaryBg`.
  - **Close (✕):** Background color from `window.borderColor`.
  - All buttons styled with rounded corners, hover dim transition, and theme-aware borders.
- **No hardcoded colors** — all driven by `styleSettings`.
- Uses `React.forwardRef` — ref points to the `<strong>` element, measured by BaseWindow for height calculations.
- **CSS class:** `.modal-title-bar` (used as Draggable handle), `.futurist-title-bar`

---

### 3. WindowTitle (`src/components/WindowTitle/WindowTitle.jsx`)

A clean `<h4>` section header with bottom border. No negative margin or overlapping tricks.

- **Props:** `value` (text), `style`, `styleSettings`
- **Styling:** Bottom border from `window.borderColor`, text color from `titleBar.textColor`, spacing from `spacing.padding`.
- **CSS class:** `.futurist-window-title`

---

### 4. Button (`src/components/Button/Button.jsx`)

Styled button with three variants.

- **Variants:**
  - `default` — text on primaryBg with border color
  - `primary` — inverted (text and bg swapped)
  - `ghost` — transparent, fills bg on hover
- All variants have rounded corners (`4px`), hover opacity, disabled state (`0.4` opacity).
- **Props:** `label`, `action` (onClick), `variant`, `style`, `disabled`, `type`, `styleSettings`
- **CSS class:** `.futurist-button`

---

### 5. Input (`src/components/Input/Input.jsx`)

Styled text input with clean flat design.

- Focus highlight: border transitions to `titleBar.textColor`.
- Placeholder rendered at `0.4` opacity.
- **Props:** `value`, `action` (onChange), `variant`, `name`, `placeholder`, `style`, `styleSettings`, `type`
- **CSS class:** `.futurist-input`

---

### 6. Select (`src/components/Select/Select.jsx`)

Styled dropdown select.

- **Props:** `value`, `action` (onChange), `options[]` ({value, label}), `placeholder`, `style`, `styleSettings`
- **CSS class:** `.futurist-select`

---

### 7. Checkbox (`src/components/Checkbox/Checkbox.jsx`)

Custom styled checkbox with hidden native input.

- Visual: 1em × 1em box, border from `window.borderColor`, fill from same when checked. Checkmark glyph (`✓`) appears when checked.
- **Props:** `checked`, `action` (onChange), `label`, `style`, `styleSettings`

---

### 8. Toggle (`src/components/Toggle/Toggle.jsx`)

Animated toggle switch with hidden native checkbox.

- Visual: 2.2em track with 0.9em circular thumb. Smooth `left` transition on toggle. Filled when checked.
- **Props:** `checked`, `action` (onChange), `label`, `style`, `styleSettings`

---

### 9. Textarea (`src/components/Textarea/Textarea.jsx`)

Styled multiline text input with vertical resize.

- Focus highlight, placeholder styling, theme-aware borders.
- **Props:** `value`, `action` (onChange), `placeholder`, `rows`, `style`, `styleSettings`

---

### 10. Badge (`src/components/Badge/Badge.jsx`)

Small label/tag with inline display.

- **Variants:** `default` (theme colors), `info` (borderColor bg), `success` (green), `warning` (yellow), `danger` (red).
- **Props:** `label`, `variant`, `style`, `styleSettings`
- **CSS class:** `.futurist-badge`

---

### 11. Divider (`src/components/Divider/Divider.jsx`)

Themed `<hr>` separator. Color from `window.borderColor` at 30% opacity.

- **Props:** `style`, `styleSettings`
- **CSS class:** `.futurist-divider`

---

### 12. Spinner (`src/components/Spinner/Spinner.jsx`)

CSS keyframe rotating loader ring.

- **Props:** `size` (string, default `1.2em`), `style`, `styleSettings`
- **CSS class:** `.futurist-spinner`

---

### 13. Alert (`src/components/Alert/Alert.jsx`)

Notification/alert box with optional close button.

- **Variants:** `default` (theme colors), `info` (blue-tinted), `success` (green), `warning` (yellow), `danger` (red).
- Optional `onClose` callback renders a ✕ close button.
- **Props:** `children`, `variant`, `onClose`, `style`, `styleSettings`
- **CSS class:** `.futurist-alert`

---

### 14. WindowContent (`src/components/WindowContent/WindowContent.jsx`)

The single-wrapper replacement for the deprecated WindowInset → WindowSpacing → WindowInner three-layer ritual. Fully theme-driven via `styleSettings`.

- **Visual:** Theme-aware border, background (from `window.backgroundColor`), padding (from `spacing.padding`), and text color (from `titleBar.textColor`).
- Uses transient `$s` prop for theming.
- Accepts `style` override for per-use customization (used by BaseWindow to strip border/padding).
- **Props:** `children`, `style`, `styleSettings`
- **CSS class:** `.futurist-window-content`

---

### 15. TabContainer (`src/components/TabContainer/TabContainer.jsx`)

Tabbed container with local `activeTab` state.

- Tabs row rendered with `Tab` components, content area shows active component.
- Fully themed: tab row bg from `titleBar.backgroundColor`, active indicator from `window.borderColor`, content area from `window.backgroundColor`.
- **Props:** `tabComponents` (object of `{tabName: () => JSX}`), `style`, `styleSettings`

---

### 16. Tab (`src/components/Tab/Tab.jsx`)

Individual tab button.

- Selected state shows filled bg (`button.primaryBg`) + bottom active border (`window.borderColor`).
- Default state is transparent with `0.6` opacity.
- **Props:** `label`, `action` (onClick), `selected`, `variant`, `style`, `styleSettings`
- **CSS class:** `.futurist-tab` / `.futurist-tab-selected`

---

### 17. Shortcut (`src/components/Shortcut/Shortcut.jsx`)

Desktop shortcut icon with drag-to-click detection.

- Desktop (>600px): Wraps in `react-draggable`.
- Mobile (≤600px): Only fires click if total drag distance ≤ 10px and duration < 300ms (distinguishes tap from drag).
- Uses transient `$s` prop for theming.
- **Props:** `width`, `icon` (URL), `name`, `action`, `styleSettings`

---

### 18. ShortcutContainer (`src/components/ShortcutContainer/ShortcutContainer.jsx`)

Renders an array of shortcuts, each configured to call `openWindow` on click.

- **Props:** `device`, `shortcuts[]`, `manipulateWindows`, `styleSettings`

---

### 19. DevPlayground (`src/components/DevPlayground/DevPlayground.jsx`) — 🆕

Development sandbox for iterating on components, theming, and window behavior. The default App view.

**Toolbar features:**
- **Theme presets** — 4 clickable buttons (Modern, Retro, Light, Warm) that instantly apply
- **Window spawn buttons** — +Notes, +Terminal, +File Manager, +Preview
- **Copy Theme** — serializes current `styleSettings` to pretty-printed JSON on clipboard
- **Import Theme** — textarea to paste JSON, validates structure, deep-merges into current settings (Enter to apply)
- **Theme panel** toggles color/border/spacing/constraint controls
- **Debug panel** toggles live window list with close buttons

**Workspace:**
- Rendered BaseWindows with themed demo content matching each window type
- Notes: Input, Checkbox, Toggle, Divider
- Terminal: Alert, Textarea, Button, Spinner
- File Manager: Badge, Select, file list
- Preview: Alert, window metadata

---

## Deprecated Components (still exported)

| Component | Replacement |
|---|---|
| WindowInset | WindowContent |
| WindowSpacing | WindowContent |
| WindowInner | WindowContent |

These still work but are no longer used internally. They also use transient `$s` props now to avoid DOM warnings.

---

## Jotai State Architecture (`src/states/`)

### `deviceDetailAtom` (base atom)

```js
{
  width: 0,        // viewport width (px)
  height: 0,       // viewport height (px)
  type: '',        // 'mobile' | 'desktop'
  appWidth: '',    // responsive width string
  deskSpace: {
    width: 0,      // viewport * 0.8
    height: 0,     // viewport * 0.8
  },
  windows: []      // array of window objects
}
```

### Window Object Shape

```js
{
  id: string,           // unique identifier
  title: string,        // display title
  width: string,        // e.g. "300px"
  height: string,       // e.g. "400px"
  zIndex: number,       // stacking order (starts at 99999)
  top: string,          // optional
  left: string,         // optional
  maximize: boolean,    // true when maximized
  prevWidth: string,
  prevHeight: string,
  prevTop: string,
  prevLeft: string,
}
```

### `windowManipulatorAtom` — Core Window Manager

Single writable atom handling all window lifecycle via `{type, window}` dispatch:

| Operation | Usage | Effect |
|---|---|---|
| `add` | `manipulateWindows({type:'add', window:{id,title,width,height,zIndex}})` | Pushes to `windows[]` |
| `remove` | `manipulateWindows({type:'remove', window:{id}})` | Filters out by id |
| `update` | `manipulateWindows({type:'update', window:{id, props}})` | Merges props onto window (resize, maximize, minimize) |
| `reindex` | `manipulateWindows({type:'reindex', window:{id}})` | Brings to front: sets target to `zIndex:99999`, re-indexes others by position |

### Other Atoms

- **`getWindowAtom(id)`** — Factory for per-window derived atoms (getter+setter). Not currently used in components.
- **`desktopResizingAtom`** — Merges viewport dimensions into `deviceDetailAtom`. Used by `useDeviceDetail` hook.
- **`useDeviceDetail`** — Hook that listens to `window.resize`, updates device dims, returns device state.

---

## Window Utility Functions (`src/utils/windowControls.js`)

| Function | Dispatches | Effect |
|---|---|---|
| `openWindow(manipulateWindows, windowData)` | `add` | Creates a new floating window |
| `closeWindow(manipulateWindows, id)` | `remove` | Closes a window by id |
| `bringToFront(manipulateWindows, id)` | `reindex` | Brings a window to the top of the z-stack |
| `resizeWindow(manipulateWindows, id, newSize)` | `update` | Updates window size/position/props |

---

## Theme System

### `styleSettings` Shape

```js
{
  window:     { backgroundColor: '#1e1e2e', borderColor: '#89b4fa' },
  titleBar:   { backgroundColor: '#181825', textColor: '#cdd6f4' },
  dimensions: { minWidth: 200, minHeight: 150 },
  spacing:    { padding: '.75em', margin: '0' },
  borders:    { width: '1px', style: 'solid' },
  button:     { primaryText: '#cdd6f4', primaryBg: '#45475a' },
}
```

### Built-in Presets

| Preset | Style |
|---|---|
| **Modern** | Catppuccin Mocha-inspired dark theme, blue accent |
| **Retro** | Green-on-black CRT terminal (original) |
| **Light** | Clean light theme, warm gray accents |
| **Warm** | Earthy brown/orange dark theme |

### Theme Sharing

- **Copy** button serializes `styleSettings` to JSON on clipboard
- **Import** button opens a textarea; paste JSON, hit Enter to apply (deep-merge, partial themes work)
- Validation checks for required sections (window, titleBar, borders, button, spacing, dimensions)

---

## Theming Pattern

All components accept `styleSettings` as a prop. Internally, styled-components use the **transient prop** pattern (`$s` / `$theme`) to prevent props from leaking to the DOM. Component interpolation functions use optional chaining with sensible defaults:

```js
const StyledElement = styled.div`
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  background: ${({ $s }) => $s?.window?.backgroundColor || '#1e1e2e'};
`;
```

---

## Build & Export

- **Entry:** `src/index.jsx` — re-exports all 34 components + utils + state hooks
- **Output:** `dist/futurist-components.es.js` (ES module) + `dist/futurist-components.umd.js` (UMD)
- **Externalized:** `react`, `react-dom`
- **Total bundle:** ~218 KB ES, ~152 KB UMD
- **Dev server:** Vite on port 5173, HMR enabled

---

## All 34 Exported Components (from `src/components/index.jsx`)

1. Alert
2. AreaChart
3. Badge
4. BarChart
5. BaseWindow
6. Button
7. Card
8. Checkbox
9. ComponentShowcase
10. Customizer
11. DevPlayground
12. Divider
13. HeatmapChart
14. Input
15. LineChart
16. Modal
17. ProgressBar
18. Radio
19. Select
20. Shortcut
21. ShortcutContainer
22. Slider
23. Sparkline
24. Spinner
25. Tab
26. TabContainer
27. Textarea
28. ThemeProvider, useTheme, useUpdateTheme, useResetTheme
29. TitleBar
30. Toast
31. Toggle
32. WindowContent
33. WindowInner *(deprecated)*
34. WindowInset *(deprecated)*
35. WindowSpacing *(deprecated)*
36. WindowTitle

Plus these from `src/index.jsx`:
- StyleSettingsContext
- useStyleSettings
- themeAtom, updateThemeAtom, resetThemeAtom, loadThemeAtom
- defaultTheme, MODERN_THEME, themes
- saveTheme, loadSavedTheme
- openWindow, closeWindow, bringToFront, resizeWindow

---

## Fixed Pain Points

| Issue | Status |
|---|---|
| Three-layer WindowInset→Spacing→Inner nesting | ✅ Replaced by `WindowContent` |
| `rebeccapurple` hard-coded in BaseWindow | ✅ Removed — uses WindowContent with theme bg |
| TitleBar hardcoded red/blue/yellow buttons | ✅ Driven by `styleSettings` now |
| `outset` / `ridge` / `inset` retro borders | ✅ Flat `1px solid` in modern presets |
| Negative margin on WindowTitle | ✅ Clean border-bottom header |
| Content gap from double border inside BaseWindow | ✅ Borderless content area inside StyledWindow |
| CSS `top: 30%` causing drag bounds issues | ✅ Removed — Draggable position is sole mechanism |
| Hook order violation from early return | ✅ `App.jsx` is a single-line component now |
| `borderSize` calc mixing units (px vs em) | ✅ Removed — content height is `windowHeight - titleBarHeight` |
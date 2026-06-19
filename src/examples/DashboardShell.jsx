/**
 * Example: Themed Dashboard Shell.
 *
 * Shows how to wire up ThemeProvider, Provider, and the device hook
 * in a single-page dashboard. This is the recommended starting point
 * for a new project using futurist-components.
 *
 * Import from: futurist-components/src/examples/DashboardShell.jsx
 * or copy/paste the pattern.
 */
import { useAtomValue, useSetAtom } from 'jotai';
import { useDeviceDetail } from '../states/deviceDetail';
import { themeAtom, themes, updateThemeAtom } from '../states/themeState';
import { windowManipulatorAtom } from '../states/deviceDetailState';
import BaseWindow from '../components/BaseWindow/BaseWindow';
import Button from '../components/Button/Button';
import Badge from '../components/Badge/Badge';
import WindowContent from '../components/WindowContent/WindowContent';
import WindowTitle from '../components/WindowTitle/WindowTitle';
import Alert from '../components/Alert/Alert';

let idCounter = 0;
const genId = () => `dash_${Date.now()}_${++idCounter}`;

export default function DashboardShell() {
  const device = useDeviceDetail();
  const theme = useAtomValue(themeAtom);
  const manipulateWindows = useSetAtom(windowManipulatorAtom);
  const updateTheme = useSetAtom(updateThemeAtom);

  const openWindow = () => {
    manipulateWindows({
      type: 'add',
      window: { id: genId(), title: 'Dashboard Window', width: '400px', height: '300px', zIndex: 99999 },
    });
  };

  return (
    <div style={{
      width: device.width,
      height: device.height,
      background: theme.window?.backgroundColor || '#111',
      color: theme.titleBar?.textColor || '#eee',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header bar */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: '1em',
        padding: '0.75em 1em',
        background: theme.titleBar?.backgroundColor || '#1a1a2e',
        borderBottom: `1px solid ${theme.window?.borderColor || '#333'}`,
      }}>
        <strong>Dashboard</strong>
        <div style={{ flex: 1 }} />
        {Object.keys(themes).map(name => (
          <button key={name} onClick={() => updateTheme(themes[name])}
            style={{
              padding: '0.3em 0.6em', fontSize: '0.8em',
              background: theme.button?.primaryBg || '#45475a',
              color: theme.titleBar?.textColor || '#ccc',
              border: `1px solid ${theme.window?.borderColor || '#555'}`,
              borderRadius: '4px', cursor: 'pointer',
            }}>
            {name}
          </button>
        ))}
        <Button label="+ Window" action={openWindow} styleSettings={theme} />
      </header>

      {/* Body */}
      <div style={{ flex: 1, position: 'relative', padding: '1em' }}>
        <Alert variant="info" styleSettings={theme}>Welcome to the dashboard. Click "+ Window" to spawn a window, or use the theme buttons to switch styles.</Alert>

        {device?.windows?.map((w) => (
          <BaseWindow key={w.id} id={w.id} device={device} manipulateWindows={manipulateWindows} styleSettings={theme}>
            <WindowContent styleSettings={theme} style={{ border: 'none', padding: '0.75em', background: 'none' }}>
              <WindowTitle value={w.title} styleSettings={theme} />
              <div style={{ fontSize: '0.85em', opacity: 0.6 }}>
                <Badge label="Running" variant="success" styleSettings={theme} />
                <span style={{ marginLeft: '0.5em' }}>{w.width} × {w.height}</span>
              </div>
            </WindowContent>
          </BaseWindow>
        ))}
      </div>
    </div>
  );
}

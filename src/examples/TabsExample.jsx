/**
 * Example: Tabs + Theming Demo.
 *
 * Shows TabContainer inside a BaseWindow with live theme switching.
 * Demonstrates how to update the theme atom from any component.
 *
 * Import from: futurist-components/src/examples/TabsExample.jsx
 * or copy/paste the pattern.
 */
import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { useDeviceDetail } from '../states/deviceDetail';
import { windowManipulatorAtom } from '../states/deviceDetailState';
import { themes, updateThemeAtom } from '../states/themeState';
import BaseWindow from '../components/BaseWindow/BaseWindow';
import Button from '../components/Button/Button';
import TabContainer from '../components/TabContainer/TabContainer';
import Badge from '../components/Badge/Badge';
import Input from '../components/Input/Input';
import Toggle from '../components/Toggle/Toggle';
import Checkbox from '../components/Checkbox/Checkbox';
import WindowContent from '../components/WindowContent/WindowContent';
import WindowTitle from '../components/WindowTitle/WindowTitle';

let idCounter = 0;
const genId = () => `tabs_${Date.now()}_${++idCounter}`;

export default function TabsExample({ styleSettings }) {
  const device = useDeviceDetail();
  const manipulateWindows = useSetAtom(windowManipulatorAtom);
  const updateTheme = useSetAtom(updateThemeAtom);
  const [input, setInput] = useState('');
  const [toggled, setToggled] = useState(false);
  const [checked, setChecked] = useState(false);

  const openWindow = () => {
    manipulateWindows({
      type: 'add',
      window: { id: genId(), title: 'Tab Demo', width: '450px', height: '350px', zIndex: 99999 },
    });
  };

  const tabComponents = {
    'Details': () => (
      <div>
        <p style={{ margin: '0 0 0.5em 0', fontSize: '0.85em', opacity: 0.8 }}>Enter details below:</p>
        <Input value={input} action={(e) => setInput(e.target.value)} placeholder="Type here..." styleSettings={styleSettings} />
      </div>
    ),
    'Settings': () => (
      <div>
        <div style={{ marginBottom: '0.5em' }}>
          <Toggle checked={toggled} action={(e) => setToggled(e.target.checked)} label="Dark mode" styleSettings={styleSettings} />
        </div>
        <Checkbox checked={checked} action={(e) => setChecked(e.target.checked)} label="Auto-save" styleSettings={styleSettings} />
      </div>
    ),
    'Theme': () => (
      <div>
        <p style={{ fontSize: '0.85em', marginBottom: '0.5em' }}>Click a theme preset:</p>
        <div style={{ display: 'flex', gap: '0.5em' }}>
          <Button label="Modern" action={() => updateTheme(themes.modern)} variant="primary" styleSettings={styleSettings} />
          <Button label="Retro" action={() => updateTheme(themes.retro)} variant="ghost" styleSettings={styleSettings} />
          <Button label="Light" action={() => updateTheme(themes.light)} variant="ghost" styleSettings={styleSettings} />
          <Button label="Warm" action={() => updateTheme(themes.warm)} variant="ghost" styleSettings={styleSettings} />
        </div>
      </div>
    ),
    'Stats': () => (
      <div>
        <div style={{ display: 'flex', gap: '0.5em', marginBottom: '0.5em' }}>
          <Badge label="Active" variant="success" styleSettings={styleSettings} />
          <Badge label="Info" variant="info" styleSettings={styleSettings} />
          <Badge label="Warning" variant="warning" styleSettings={styleSettings} />
        </div>
        <div style={{ fontSize: '0.85em', opacity: 0.7 }}>Status: all systems nominal.</div>
      </div>
    ),
  };

  return (
    <div style={{ padding: '1em', fontFamily: 'system-ui, sans-serif' }}>
      <Button label="Open Tabs" action={openWindow} styleSettings={styleSettings} />
      {device?.windows?.map((w) => (
        <BaseWindow key={w.id} id={w.id} device={device} manipulateWindows={manipulateWindows} styleSettings={styleSettings}>
          <WindowContent styleSettings={styleSettings} style={{ border: 'none', padding: '0.75em', background: 'none' }}>
            <WindowTitle value={w.title} styleSettings={styleSettings} />
            <TabContainer tabComponents={tabComponents} styleSettings={styleSettings} />
          </WindowContent>
        </BaseWindow>
      ))}
    </div>
  );
}

/**
 * Example: Basic Form with window spawning.
 *
 * This shows the simplest setup:
 *  - Wrap in Provider + ThemeProvider
 *  - Use the device hook to track viewport
 *  - Spawn BaseWindows via windowManipulatorAtom
 *
 * Import this directly from: futurist-components/src/examples/BasicFormExample.jsx
 * Or copy/paste the pattern into your own project.
 */
import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { useDeviceDetail } from '../states/deviceDetail';
import { windowManipulatorAtom } from '../states/deviceDetailState';
import BaseWindow from '../components/BaseWindow/BaseWindow';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Checkbox from '../components/Checkbox/Checkbox';
import Toggle from '../components/Toggle/Toggle';
import Select from '../components/Select/Select';
import WindowContent from '../components/WindowContent/WindowContent';
import WindowTitle from '../components/WindowTitle/WindowTitle';
import Divider from '../components/Divider/Divider';

let idCounter = 0;
const genId = () => `basic_${Date.now()}_${++idCounter}`;

export default function BasicFormExample({ styleSettings }) {
  const device = useDeviceDetail();
  const manipulateWindows = useSetAtom(windowManipulatorAtom);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [select, setSelect] = useState('');

  const openWindow = () => {
    manipulateWindows({
      type: 'add',
      window: {
        id: genId(),
        title: 'Form Window',
        width: '350px',
        height: '300px',
        zIndex: 99999,
      },
    });
  };

  return (
    <div style={{ padding: '1em', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', gap: '0.5em', marginBottom: '1em' }}>
        <Button label="Open Window" action={openWindow} styleSettings={styleSettings} />
        <Button label="Clear All" action={() => manipulateWindows({ type: 'remove', window: { id: '' } })} styleSettings={styleSettings} />
      </div>

      {device?.windows?.map((w) => (
        <BaseWindow key={w.id} id={w.id} device={device} manipulateWindows={manipulateWindows} styleSettings={styleSettings}>
          <WindowContent styleSettings={styleSettings} style={{ border: 'none', padding: '0.75em', background: 'none' }}>
            <WindowTitle value={w.title} styleSettings={styleSettings} />
            <Input value={input} action={(e) => setInput(e.target.value)} placeholder="Type something..." styleSettings={styleSettings} />
            <div style={{ marginTop: '0.5em' }}>
              <Select value={select} action={(e) => setSelect(e.target.value)}
                options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]}
                placeholder="Choose..." styleSettings={styleSettings} />
            </div>
            <Divider styleSettings={styleSettings} />
            <Checkbox checked={checked} action={(e) => setChecked(e.target.checked)} label="Remember me" styleSettings={styleSettings} />
            <div style={{ marginTop: '0.5em' }}>
              <Toggle checked={toggled} action={(e) => setToggled(e.target.checked)} label="Notifications" styleSettings={styleSettings} />
            </div>
          </WindowContent>
        </BaseWindow>
      ))}
    </div>
  );
}

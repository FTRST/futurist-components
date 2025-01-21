import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './App.css';

import { useAtom, useSetAtom } from 'jotai';
import { useDeviceDetail } from './states/deviceDetail';
import { windowManipulatorAtom } from './states/deviceDetailState';

import BaseWindow from './components/BaseWindow/BaseWindow';
import TabContainer from './components/TabContainer/TabContainer';

import Input from './components/Input/Input';
import Button from './components/Button/Button';
import ShortcutContainer from './components/ShortcutContainer/ShortcutContainer';

import WindowInner from './components/WindowInner/WindowInner';
import WindowTitle from './components/WindowTitle/WindowTitle';
import WindowSpacing from './components/WindowSpacing/WindowSpacing';
import WindowInset from './components/WindowInset/WindowInset';

import {nestedInputChange} from './utils/componentControls';

// Define tab content components
const CreatorTab = ({ windowDetails, setWindowDetails, incrementCount, inputRef }) => {
  return (
    <>
    <WindowInset>
      <WindowSpacing>
      <WindowInner>
        <WindowTitle value="An example"></WindowTitle>
      <Input
        value={windowDetails.details.title}
        action={e => nestedInputChange("details", "title", e.target.value, setWindowDetails)}
        ref={inputRef}
      />
      </WindowInner>
      </WindowSpacing>
    </WindowInset>
    <Button label={"Click me"} action={incrementCount} />
    </>
  )
};

const DetailsTab = ({ device, shortcuts, manipulateWindows }) => (
  <>

<WindowInset>
      <WindowSpacing>
      <WindowInner>
      <div className="data-row">
      <span className="data-key">Amount of windows</span><span className="data-value">{device.windows.length}</span>
    </div>
    <ShortcutContainer device={device} shortcuts={shortcuts} manipulateWindows={manipulateWindows}/>
      </WindowInner>
      </WindowSpacing>
    </WindowInset>
  </>
);

function App() {
  const [count, setCount] = useState(0);
  const device = useDeviceDetail()
  const manipulateWindows = useSetAtom(windowManipulatorAtom);
  
  console.log(device)
  const [windowDetails, setWindowDetails] = useState({ details: { title: "", content: <></> } });

  const inputRef = useRef(null);

  const handleInputChange = useCallback((e) => {
    nestedInputChange("details", "title", e.target.value, setWindowDetails);
  }, [setWindowDetails]);

  useEffect(() => {
    if (count > 0) {
      const result = Array.from({length: 7}, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
      manipulateWindows({
        type: 'add',
        window: {
          id: result,
          title: windowDetails.details.title,
          width: "300px",
          height: "400px",
          zIndex: 99999
        }
      });
    }
  }, [count]);

  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const tabComponents = useMemo(() => ({
    "Creator": () => (
      <CreatorTab 
        windowDetails={windowDetails} 
        setWindowDetails={setWindowDetails} 
        incrementCount={() => setCount(count + 1)}
        inputRef={inputRef}
      />
    ),
    "Details": () => (
      <DetailsTab 
        device={device} 
        shortcuts={[{ 
          icon: 'https://futurist.io/icons/folder.png', 
          title: 'Big Boinger', 
          id: "694",
          windowData: {
            id: "example",
            title: "boinger",
            width: "300px",
            height: "300px"
          }
        }]} 
        manipulateWindows={manipulateWindows} 
      />
    )
  }), [incrementCount, handleInputChange, device, manipulateWindows, windowDetails]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [windowDetails.details.title]);

  return (
    <>
      <div style={{ width: device.width, height: device.height }}>
        <h3>Futurist Components</h3>
        <TabContainer tabComponents={tabComponents} />
        {device?.windows?.map((window, index) => (
          <BaseWindow key={index} id={window.id} device={device} manipulateWindows={manipulateWindows}>
            <span>just some text</span>
          </BaseWindow>
        ))}
      </div>
    </>
  );
}

export default App;
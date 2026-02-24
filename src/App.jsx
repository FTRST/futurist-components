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

const StyleBuilder = ({ styleSettings, setStyleSettings }) => {
  const handleChange = (category, property, value) => {
    setStyleSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [property]: value
      }
    }));
  };

  const getStyleValue = (category, property) => {
    return styleSettings[category]?.[property] || '';
  };

  const sectionStyle = {
    marginBottom: '1em',
    padding: '0.5em',
    border: '1px solid #6bf178'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.25em',
    fontWeight: 'bold'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.25em',
    marginBottom: '0.5em'
  };

  return (
    <div style={sectionStyle}>
      <h4 style={{ color: '#6bf178', marginBottom: '0.5em' }}>Style Builder</h4>
      
      <div style={sectionStyle}>
        <span style={labelStyle}>Window Colors</span>
        <label style={{ display: 'block' }}>Background:</label>
        <input
          type="color"
          value={getStyleValue('window', 'backgroundColor') || '#02111B'}
          onChange={(e) => handleChange('window', 'backgroundColor', e.target.value)}
          style={inputStyle}
        />
        <label style={{ display: 'block' }}>Border:</label>
        <input
          type="color"
          value={getStyleValue('window', 'borderColor') || '#6BF178'}
          onChange={(e) => handleChange('window', 'borderColor', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>Title Bar</span>
        <label style={{ display: 'block' }}>Background:</label>
        <input
          type="color"
          value={getStyleValue('titleBar', 'backgroundColor') || '#02111b'}
          onChange={(e) => handleChange('titleBar', 'backgroundColor', e.target.value)}
          style={inputStyle}
        />
        <label style={{ display: 'block' }}>Text:</label>
        <input
          type="color"
          value={getStyleValue('titleBar', 'textColor') || '#6bf178'}
          onChange={(e) => handleChange('titleBar', 'textColor', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>Dimensions</span>
        <label style={{ display: 'block' }}>Min Width (px):</label>
        <input
          type="number"
          value={getStyleValue('dimensions', 'minWidth') || 200}
          onChange={(e) => handleChange('dimensions', 'minWidth', parseInt(e.target.value))}
          style={inputStyle}
        />
        <label style={{ display: 'block' }}>Min Height (px):</label>
        <input
          type="number"
          value={getStyleValue('dimensions', 'minHeight') || 200}
          onChange={(e) => handleChange('dimensions', 'minHeight', parseInt(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>Spacing</span>
        <label style={{ display: 'block' }}>Padding:</label>
        <input
          type="text"
          value={getStyleValue('spacing', 'padding') || '.5em'}
          onChange={(e) => handleChange('spacing', 'padding', e.target.value)}
          style={inputStyle}
        />
        
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>Border Styles</span>
        <label style={{ display: 'block' }}>Width:</label>
        <input
          type="text"
          value={getStyleValue('borders', 'width') || '.25em'}
          onChange={(e) => handleChange('borders', 'width', e.target.value)}
          style={inputStyle}
        />
        <label style={{ display: 'block' }}>Style:</label>
        <select
          value={getStyleValue('borders', 'style') || 'double'}
          onChange={(e) => handleChange('borders', 'style', e.target.value)}
          style={inputStyle}
        >
          <option value="solid">Solid</option>
          <option value="double">Double</option>
          <option value="dashed">Dashed</option>
          <option value="ridge">Ridge</option>
          <option value="inset">Inset</option>
          <option value="outset">Outset</option>
        </select>
      </div>

      <div style={sectionStyle}>
        <span style={labelStyle}>Button Colors</span>
        <label style={{ display: 'block' }}>Primary Text:</label>
        <input
          type="color"
          value={getStyleValue('button', 'primaryText') || '#6BF178'}
          onChange={(e) => handleChange('button', 'primaryText', e.target.value)}
          style={inputStyle}
        />
        <label style={{ display: 'block' }}>Primary BG:</label>
        <input
          type="color"
          value={getStyleValue('button', 'primaryBg') || '#02111B'}
          onChange={(e) => handleChange('button', 'primaryBg', e.target.value)}
          style={inputStyle}
        />
      </div>
    </div>
  );
};

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

const DetailsTab = ({ device, shortcuts, manipulateWindows, styleSettings }) => (
  <>

<WindowInset>
      <WindowSpacing>
      <WindowInner styleSettings={styleSettings}>
      <div className="data-row">
      <span className="data-key">Amount of windows</span><span className="data-value">{device.windows.length}</span>
    </div>
    <ShortcutContainer device={device} shortcuts={shortcuts} manipulateWindows={manipulateWindows} styleSettings={styleSettings}/>
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

  const [styleSettings, setStyleSettings] = useState({
    window: {
      backgroundColor: '#02111B',
      borderColor: '#6BF178'
    },
    titleBar: {
      backgroundColor: '#02111b',
      textColor: '#6bf178'
    },
    dimensions: {
      minWidth: 200,
      minHeight: 200
    },
    spacing: {
      padding: '.5em',
      margin: '0'
    },
    borders: {
      width: '.25em',
      style: 'double'
    },
    button: {
      primaryText: '#6BF178',
      primaryBg: '#02111B'
    }
  });

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
          title: 'Example App', 
          id: "694",
          windowData: {
            id: "example",
            title: "Example App",
            width: "300px",
            height: "300px"
          }
        }]} 
        manipulateWindows={manipulateWindows}
        styleSettings={styleSettings} 
      />
    )
  }), [incrementCount, handleInputChange, device, manipulateWindows, windowDetails]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [windowDetails.details.title]);

  const getInlineStyles = () => {
    return {
      '--color-window-bg': styleSettings.window.backgroundColor,
      '--color-window-border': styleSettings.window.borderColor,
      '--color-titlebar-bg': styleSettings.titleBar.backgroundColor,
      '--color-titlebar-text': styleSettings.titleBar.textColor,
      '--spacing-padding': styleSettings.spacing.padding,
      '--spacing-margin': styleSettings.spacing.margin,
      '--border-width': styleSettings.borders.width,
      '--border-style': styleSettings.borders.style,
      '--color-button-text': styleSettings.button.primaryText,
      '--color-button-bg': styleSettings.button.primaryBg
    };
  };

  return (
    <div style={{ width: device.width, height: device.height }}>
      <TabContainer tabComponents={tabComponents} styleSettings={styleSettings} />
      
      {device?.windows?.map((window, index) => (
        <BaseWindow 
          key={index} 
          id={window.id} 
          device={device} 
          manipulateWindows={manipulateWindows}
          styleSettings={styleSettings}
        >
          <span>just some text</span>
        </BaseWindow>
      ))}
      
      <div style={{ marginTop: '1em', padding: '1em', backgroundColor: '#02111B' }}>
        <StyleBuilder styleSettings={styleSettings} setStyleSettings={setStyleSettings} />
      </div>
    </div>
  );
}

export default App;

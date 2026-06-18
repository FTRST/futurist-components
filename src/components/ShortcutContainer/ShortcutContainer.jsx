import React from 'react';
import Shortcut from '../Shortcut/Shortcut';
import { openWindow } from '../../utils/windowControls';

const ShortcutContainer = ({ device, shortcuts, manipulateWindows, styleSettings, className }) => {
  return (
    <div className={`ftrst shortcut-container ${className || ''}`}>
      {shortcuts.map((shortcut, index) => (
        <Shortcut
          key={index}
          width={device.width}
          icon={shortcut.icon}
          name={shortcut.title}
          action={() => openWindow(manipulateWindows, shortcut.windowData)}
          styleSettings={styleSettings}
        />
      ))}
    </div>
  );
};

export default ShortcutContainer;

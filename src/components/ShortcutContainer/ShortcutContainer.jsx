import React from 'react';
import Shortcut from '../Shortcut/Shortcut';
import { openWindow } from '../../utils/windowControls';

const ShortcutContainer = ({ device, shortcuts, manipulateWindows, styleSettings }) => {
  console.log(device);
  return (
    <>
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
    </>
  );
};

export default ShortcutContainer;
import React from "react";
import Shortcut from "../Shortcut/Shortcut";
import { openWindow } from "../../utils/windowControls";
import { openLink } from "../../utils/componentControls";

const ShortcutContainer = ({ device, shortcuts, manipulateWindows }) => {
  return (
    <>
      {shortcuts.map((shortcut, index) => (
        <>
          {shortcut.type == "web" && (
            <Shortcut
              key={index}
              type={shortcut.type}
              width={device.width}
              icon={shortcut.icon}
              name={shortcut.title}
              action={() => openLink(shortcut.url)}
            />
          )}
          {shortcut.type == "app" && (
            <Shortcut
              key={index}
              type={shortcut.type}
              width={device.width}
              icon={shortcut.icon}
              name={shortcut.title}
              action={() => openWindow(manipulateWindows, shortcut.windowData)}
            />
          )}
        </>
      ))}
    </>
  );
};

export default ShortcutContainer;
// src/components/BaseWindow/BaseWindow.jsx
import React, { useRef, useState, useEffect, useMemo } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import TitleBar from "../TitleBar/TitleBar";
import styled, { css } from "styled-components";
import {
  closeWindow,
  bringToFront,
  resizeWindow,
} from "../../utils/windowControls";

const windowStyle = {
  default: css`
    top: 30%;
    max-width: 100%;
    position: absolute;
    color: #6bf178;
    left: 1em;
    padding: 0;
    border: 0.25em double #6bf178;
    background-color: rebeccapurple;
  `,
};

const StyledWindow = styled.div`
  ${(props) => windowStyle[props.variant || "default"]}
`;

const windowBackgroundStyle = {
  default: css`
    margin: 0.1em;
    display: grid;
    padding: 0.5em;
    background-color: rebeccapurple;
  `,
};

const StyledWindowBackground = styled.div`
  ${(props) => windowBackgroundStyle[props.variant || "default"]}
  ${(props) => props.additionalStyle}
`;

const BaseWindow = ({ id, device, manipulateWindows, children, style }) => {
  const windowDetails = device.windows.find((w) => w.id === id);
  const titleBarRef = useRef(null); // Create a ref for the TitleBar
  const innerBodyRef = useRef(null);

  const [modalBackgroundHeight, setModalBackgroundHeight] = useState("auto");
  const [modalBackgroundWidth, setModalBackgroundWidth] = useState("auto");
  const [modalInnerHeight, setModalInnerHeight] = useState("auto");


  useEffect(() => {
    if (titleBarRef.current && windowDetails.height) {
      const titleBarHeight = titleBarRef.current.offsetHeight;
      const newHeight = `calc(${windowDetails.height} - ${titleBarHeight}px - 16px)`;
      const newWidth = `calc(${windowDetails.width} - ${titleBarRef.current.offsetWidth})px - 16px`;
      console.log(titleBarHeight);

      setModalBackgroundHeight(newHeight);
      setModalBackgroundWidth(newWidth);

      //
      const innerDivHeight = innerBodyRef.current.offsetHeight;
      const newInnerHeight = `calc(${newHeight} - 55px)`;
      console.log("The new inner height");
      console.log(innerDivHeight);
      setModalInnerHeight(newInnerHeight);
      const newSize = { width: newWidth, height: newHeight };
    }
  }, [windowDetails]);

  const handlePositionChange = (e) => {
    let topWindowId = null;
    let maxZIndex = -Infinity;

    for (const window of device.windows) {
      if (window.zIndex > maxZIndex) {
        maxZIndex = window.zIndex;
        topWindowId = window.id;
      }
    }

    if (id !== topWindowId) {
      bringToFront(manipulateWindows, id);
    }
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    const newSize = { width: ref.style.width, height: ref.style.height };

    if (parseInt(newSize.width) > device.width - 20) {
      console.log("maxiing size");
      newSize.width = `${device.width - 20}px`;
    }

    if (parseInt(newSize.height) > device.height - 55) {
      console.log("Height ad");
      console.log(newSize.height);
      console.log(device.height);
      newSize.height = `${device.height - 55}px`;
    }

    console.log("Inner width is:", modalInnerHeight);

    resizeWindow(manipulateWindows, id, newSize);
  };

  return windowDetails ? (
    <>
      <Draggable
        handle=".modal-title-bar"
        bounds="parent"
        onStart={handlePositionChange}
        defaultPosition={{x: windowDetails.xCoord, y: windowDetails.yCoord}}
      >
        <StyledWindow
          style={{ zIndex: windowDetails.zIndex }}
          additionalStyle={style}
        >
          <Resizable
            size={{ width: windowDetails.width, height: windowDetails.height }}
            onResizeStop={handleResizeStop}
            minConstraints={[200, 200]}
            maxConstraints={[device.deskSpace.width, device.deskSpace.height]}
          >
            <TitleBar
              ref={titleBarRef}
              title={windowDetails.title}
              expandAction={() =>
                resizeWindow(manipulateWindows, id, {
                  width: device.width,
                  height: device.height,
                  maximize: true,
                  prevWidth: windowDetails.width,
                  prevHeight: windowDetails.height,
                })
              }
              closeAction={() => closeWindow(manipulateWindows, id)}
              minimizeAction={() =>
                resizeWindow(manipulateWindows, id, {
                  width: windowDetails.preveWidth,
                  height: windowDetails.prevHeight,
                  maximize: false,
                })
              }
              maximize={windowDetails.maximize}
            />
            <StyledWindowBackground
              style={{
                height: modalBackgroundHeight,
                width: modalBackgroundWidth,
              }}
            >
              <div
                className="message-container"
                style={{ width: "100%" }}
                ref={innerBodyRef}
              >
                {children}
              </div>
            </StyledWindowBackground>
          </Resizable>
        </StyledWindow>
      </Draggable>
    </>
  ) : (
    <></>
  );
};

export default BaseWindow;
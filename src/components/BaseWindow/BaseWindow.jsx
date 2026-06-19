// src/components/BaseWindow/BaseWindow.jsx
import React, { useRef, useState, useEffect } from 'react';
import Draggable from "react-draggable";
import { Resizable } from 're-resizable';
import TitleBar from '../TitleBar/TitleBar';
import WindowContent from '../WindowContent/WindowContent';
import styled from 'styled-components';
import { closeWindow, bringToFront, resizeWindow } from '../../utils/windowControls';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledWindow = styled.div`
    max-width: 100%;
    position: absolute;
    color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
    padding: 0;
    border: ${({ $s }) => $s?.borders?.width || '1px'} ${({ $s }) => $s?.borders?.style || 'solid'} ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
    background-color: ${({ $s }) => $s?.window?.backgroundColor || '#1e1e2e'};
`;

const BaseWindow = ({
    id,
    device,
    manipulateWindows,
    children,
    styleSettings
}) => {
    
    const windowDetails = device.windows.find(w => w.id === id);
    const titleBarRef = useRef(null);
    const s = useStyleSettings(styleSettings);

    const [dragPosition, setDragPosition] = useState(() => {
        if (windowDetails?.top && windowDetails?.left) {
            // Parse stored pixel values, fall back to defaults
            const x = parseInt(windowDetails.left) || 30;
            const y = parseInt(windowDetails.top) || 30;
            return { x, y };
        }
        // Default offset from top-left corner
        const index = device?.windows?.findIndex(w => w.id === id) ?? 0;
        return { x: 30 + index * 25, y: 30 + index * 25 };
    });
    const [contentStyle, setContentStyle] = useState({});
    
    useEffect(() => {
        if (titleBarRef.current && windowDetails?.height) {
            const titleBarHeight = titleBarRef.current.offsetHeight;
            
            const newHeight = windowDetails.maximize 
                ? '100%' 
                : `calc(${windowDetails.height} - ${titleBarHeight}px)`;
            
            setContentStyle({
                height: newHeight,
                overflow: 'auto',
                boxSizing: 'border-box',
                border: 'none',
                padding: 0,
                background: 'none',
            });
        }
    }, [windowDetails, styleSettings]);

    const handlePositionChange = (e) => {

        let topWindowId = null;
        let maxZIndex = -Infinity;

        for (const window of device.windows) {
            if (window.zIndex > maxZIndex) {
                maxZIndex = window.zIndex;
                topWindowId = window.id
            }
        }

        if (id !== topWindowId){
            bringToFront(manipulateWindows, id)
        }
    };

const handleResizeStop = (e, direction, ref, delta, position) => {
        const newSize = { width: ref.style.width, height: ref.style.height };
         

        if(parseInt(newSize.width) > (device.width - 20)) {
            console.log("maxiing size")
            newSize.width = `${device.width - 20}px`;
        }

        if(parseInt(newSize.height) > (device.height - 55)) {
            console.log("Height ad")
            console.log(newSize.height)
            console.log(device.height)
            newSize.height = `${device.height - 55}px`;
        }

        resizeWindow(manipulateWindows, id, {
            ...newSize,
            top: 0,
            left: 0
        });
    };

    return (
        windowDetails ? (
            <>
                <Draggable 
                    handle=".modal-title-bar" 
                    bounds="parent"
                    disabled={windowDetails.maximize}
                    position={dragPosition}
                    onStart={handlePositionChange}
                    onDrag={(e, data) => setDragPosition({ x: data.x, y: data.y })}
                >
                    <StyledWindow style={{ zIndex: windowDetails.zIndex }} $s={s}>
                        <Resizable
                            size={{ width: windowDetails.width, height: windowDetails.height }}
                            onResizeStop={handleResizeStop}
                            minConstraints={[s?.dimensions?.minWidth || 200, s?.dimensions?.minHeight || 200]}
                            maxConstraints={[device.deskSpace.width, device.deskSpace.height]}
                        >
                            <TitleBar 
                                ref={titleBarRef} 
                                title={windowDetails.title} 
                                expandAction={() => {
                                    const titleBarHeight = titleBarRef.current?.offsetHeight || 0;
                                    setDragPosition({ x: 0, y: 0 });
                                    resizeWindow(manipulateWindows, id, {width: device.width, height: device.height, maximize: true, prevWidth: windowDetails.width, prevHeight: windowDetails.height, prevTop: windowDetails.top, prevLeft: windowDetails.left, top: titleBarHeight, left: 0})
                                }} 
                                closeAction={() => closeWindow(manipulateWindows, id)} 
                                minimizeAction={() => {
                                    resizeWindow(manipulateWindows, id, {
                                        width: windowDetails.prevWidth, 
                                        height: windowDetails.prevHeight, 
                                        maximize: false, 
                                        top: windowDetails.prevTop, 
                                        left: windowDetails.prevLeft
                                    });
                                    setDragPosition({ 
                                        x: parseInt(windowDetails.prevLeft) || 30, 
                                        y: parseInt(windowDetails.prevTop) || 30 
                                    });
                                }}
                                maximize={windowDetails.maximize}
                                styleSettings={s}
                            />
                            <WindowContent styleSettings={s} style={contentStyle}>
                                {children}
                            </WindowContent>
                        </Resizable>
                    </StyledWindow>
                </Draggable>
            </>
        ):
        <>
        </>
    );
};

export default BaseWindow;

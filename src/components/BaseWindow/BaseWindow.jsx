// src/components/BaseWindow/BaseWindow.jsx
import React, { useRef, useState, useEffect, useMemo, createContext } from 'react';
import Draggable from "react-draggable";
import { Resizable } from 're-resizable';
import TitleBar from '../TitleBar/TitleBar';
import styled, { css } from 'styled-components';
import { closeWindow, bringToFront, resizeWindow } from '../../utils/windowControls';

const StyleSettingsContext = createContext();

const windowStyle = (settings) => css`
    top: 30%;
    max-width: 100%;
    position: absolute;
    color: ${settings?.titleBar?.textColor || '#6BF178'};
    left: 1em;
    padding: 0;
    border: ${settings?.borders?.width || '.25em'} ${settings?.borders?.style || 'double'} ${settings?.window?.borderColor || '#6BF178'};
    background-color: ${settings?.window?.backgroundColor || 'rgba(2,17,27,.7)'};
`;

const StyledWindow = styled.div`
    ${props => windowStyle(props.styleSettings)}
`;

const windowBackgroundStyle = (settings) => css`
    display: grid;
    padding: ${settings?.spacing?.padding || '.5em'};
    background-color: rebeccapurple;
    box-sizing: border-box;
`;

const StyledWindowBackground = styled.div`
    ${props => windowBackgroundStyle(props.styleSettings)}
    ${props => props.additionalStyle}
`;

const BaseWindow = ({
    id,
    device,
    manipulateWindows,
    children,
    style,
    styleSettings
}) => {
    
    const windowDetails = device.windows.find(w => w.id === id);
    const titleBarRef = useRef(null); // Create a ref for the TitleBar
    const innerBodyRef = useRef(null);
    const modalBackgroundRef = useRef(null);

    const [modalBackgroundHeight, setModalBackgroundHeight] = useState('auto');
    const [modalBackgroundWidth, setModalBackgroundWidth] = useState('auto');
    const [modalInnerHeight, setModalInnerHeight] = useState('auto');
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        if (titleBarRef.current && modalBackgroundRef.current && windowDetails.height) {
            const titleBarHeight = titleBarRef.current.offsetHeight;
            const borderSize = styleSettings?.borders?.width ? parseFloat(styleSettings.borders.width) * 2 : 0.5;
            
            let newHeight = windowDetails.maximize ? '100%' : `calc(${windowDetails.height} - ${titleBarHeight}px - ${borderSize}px)`;
            let newWidth = windowDetails.maximize ? '100%' : `calc(${windowDetails.width} - ${titleBarRef.current.offsetWidth}px - ${borderSize}px)`;
            
            console.log(titleBarHeight);

            setModalBackgroundHeight(newHeight);
            setModalBackgroundWidth(newWidth);

            const parentPixelHeight = modalBackgroundRef.current.offsetHeight;
            const titleBarPixelHeight = titleBarRef.current.offsetHeight;
            const messageContainerHeight = parentPixelHeight - titleBarPixelHeight;
            
            if (innerBodyRef.current) {
                innerBodyRef.current.style.height = '100%';
            }
            
            const newSize = { width: newWidth, height: newHeight }

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

        console.log("Inner width is:", modalInnerHeight)
        
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
                    <StyledWindow style={{ top: windowDetails.maximize ? '0px' : (windowDetails.top || '30%'), left: windowDetails.maximize ? '0px' : (windowDetails.left || '1em'), zIndex: windowDetails.zIndex }} additionalStyle={style} styleSettings={styleSettings}>
                        <Resizable
                            size={{ width: windowDetails.width, height: windowDetails.height }}
                            onResizeStop={handleResizeStop}
                            minConstraints={[styleSettings?.dimensions?.minWidth || 200, styleSettings?.dimensions?.minHeight || 200]}
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
                                minimizeAction={() => resizeWindow(manipulateWindows, id, {width: windowDetails.prevWidth, height: windowDetails.prevHeight, maximize: false, top: windowDetails.prevTop, left: windowDetails.prevLeft})}
                                maximize={windowDetails.maximize}
                                styleSettings={styleSettings}
                            />
                            <StyledWindowBackground ref={modalBackgroundRef} style={{ height: windowDetails.maximize ? `calc(100% - ${titleBarRef.current?.offsetHeight || 0}px)` : modalBackgroundHeight, width: '100%' }} styleSettings={styleSettings}>
                                <div className="message-container" style={{width: '100%', height: '100%'}} ref={innerBodyRef}>
                                    {children}
                                </div>
                            </StyledWindowBackground>
                        </Resizable>
                    </StyledWindow>
                </Draggable>
            </>
        ):
        <>
        </>
    );
};

export { StyleSettingsContext };
export default BaseWindow;

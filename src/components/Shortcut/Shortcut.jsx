import React, {useState} from 'react';
import styled from "styled-components"
import Draggable from "react-draggable";

const StyledShortcut = styled.div`
    padding: 1em;
    align-items: center;
    display: grid;
    text-align: center;
    height: 8em;
    width: 9em;
`;

const ShortcutIcon = styled.img`
    height: 4em;
`;

const ShortcutName = styled.div`
    background-color: ${props => props.$theme?.titleBar?.textColor || '#6bf178'};
    color: ${props => props.$theme?.button?.primaryBg || '#02111b'};
    padding: .25em;
    align-items: center;
    display: grid;
    text-align: center;
`;

const Shortcut = ({width, icon, name, action, styleSettings}) => {
    // Mobile handler
    let [dragInfo, setDragInfo] = useState(null);

    let handleDragStart = (e, data) => {
        setDragInfo({
            x: data.x,
            y: data.y,
            time: Date.now()
        })
    }

    let handleDragStop = (e, data) => {
        if (!dragInfo) return
        let change = {
            x: Math.abs(data.x - dragInfo.x),
            y: Math.abs(data.y - dragInfo.y),
            time: Date.now() - dragInfo.time
        }
        if (change.x + change.y <= 10 && change.time < 300) {
            e.srcElement.click()
        }
    }

    const theme = {
        titleBar: { textColor: styleSettings?.titleBar?.textColor },
        button: { primaryBg: styleSettings?.button?.primaryBg },
    };

    return (
        <>
            {
                width < 600 ? (
                    <>
                        <Draggable onStart={handleDragStart} onStop={handleDragStop}>
                            <StyledShortcut onClick={action}>
                                <div>
                                    <ShortcutIcon src={icon}></ShortcutIcon>
                                </div>
                                <ShortcutName $theme={theme}>{name}</ShortcutName>
                            </StyledShortcut>
                        </Draggable>
                    </>
                )
                :
                    <Draggable>
                        <StyledShortcut onClick={action}>
                            <div>
                                <ShortcutIcon src={icon}></ShortcutIcon>
                            </div>
                            <ShortcutName $theme={theme}>{name}</ShortcutName>
                        </StyledShortcut>
                    </Draggable>
            }
        </>
    )
}

export default Shortcut
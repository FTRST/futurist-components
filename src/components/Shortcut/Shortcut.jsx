import React, {useState} from 'react';
import styled from "styled-components"
import Draggable from "react-draggable";
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledShortcut = styled.div`
    padding: 1em;
    align-items: center;
    display: grid;
    text-align: center;
    height: 8em;
    width: 9em;
`;

const ShortcutIcon = styled.img` height: 4em; `;

const ShortcutName = styled.div`
    background-color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
    color: ${({ $s }) => $s?.button?.primaryBg || '#45475a'};
    padding: .25em;
    align-items: center;
    display: grid;
    text-align: center;
`;

const Shortcut = ({width, icon, name, action, styleSettings}) => {
    const s = useStyleSettings(styleSettings);
    let [dragInfo, setDragInfo] = useState(null);

    let handleDragStart = (e, data) => {
        setDragInfo({ x: data.x, y: data.y, time: Date.now() });
    };

    let handleDragStop = (e, data) => {
        if (!dragInfo) return;
        let change = {
            x: Math.abs(data.x - dragInfo.x),
            y: Math.abs(data.y - dragInfo.y),
            time: Date.now() - dragInfo.time,
        };
        if (change.x + change.y <= 10 && change.time < 300) {
            e.srcElement.click();
        }
    };

    const inner = (
        <StyledShortcut onClick={action}>
            <div><ShortcutIcon src={icon} /></div>
            <ShortcutName $s={s}>{name}</ShortcutName>
        </StyledShortcut>
    );

    return width < 600 ? (
        <Draggable onStart={handleDragStart} onStop={handleDragStop}>{inner}</Draggable>
    ) : (
        <Draggable>{inner}</Draggable>
    );
};

export default Shortcut;
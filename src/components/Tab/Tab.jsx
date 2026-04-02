import React from 'react';
import styled, { css } from 'styled-components';

const tabStyles = (settings) => ({
    default: css`
        background-color: rebeccapurple;
        color: ${settings?.titleBar?.textColor || '#6bf178'};
        border-bottom: none;
        border-color: ${settings?.window?.borderColor || '#6bf178'};
        padding: 0.5em;
    `,
    defaultSelected: css`
        background-color: ${settings?.button?.primaryBg || '#02111B'};
        color: ${settings?.titleBar?.textColor || '#6bf178'};
        border: ${settings?.borders?.style || 'solid'} ${settings?.borders?.width || '0.1em'} ${settings?.window?.borderColor || '#6bf178'};
        padding: 0.5em;
    `
});

const StyledTab = styled.button`
    ${props => tabStyles(props.styleSettings)[props.selected ? `${props.variant}Selected` : props.variant]}
    ${props => props.additionalStyles}
`;

const Tab = React.forwardRef(({ label, action, selected, variant = 'default', style, styleSettings, className }, ref) => {
    
    const tabClassName = `ftrst tab ${variant}${selected ? '-selected' : ''} ${className || ''}`;

    return (
        <StyledTab
            onClick={action}
            ref={ref}
            selected={selected}
            variant={variant}
            className={tabClassName}
            additionalStyles={style}
            styleSettings={styleSettings}
        >
            {label}
        </StyledTab>
    );
});

export default Tab;

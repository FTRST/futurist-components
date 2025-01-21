import React from 'react';
import styled, { css } from 'styled-components';

const tabStyles = {
    default: css`
        background-color: rebeccapurple;
        color: #6bf178;
        border-bottom: none;
        border-color: #02111B;
        padding: 0.5em;
    `,
    defaultSelected: css`
        background-color: #02111B;
        color: #6bf178;
        border: solid 0.1em #6bf178;
        padding: 0.5em;
    `
};

const StyledTab = styled.button`
    ${props => tabStyles[props.selected ? `${props.variant}Selected` : props.variant]}
    ${props => props.additionalStyles}
`;

const Tab = React.forwardRef(({ label, action, selected, variant = 'default', style}, ref) => {
    
    const className = `futurist-${variant}${selected ? '-tab-selected' : '-tab'}`;

    return (
        <StyledTab
            onClick={action}
            ref={ref}
            selected={selected}
            variant={variant}
            className={className}
            additionalStyles={style}
        >
            {label}
        </StyledTab>
    );
});

export default Tab;

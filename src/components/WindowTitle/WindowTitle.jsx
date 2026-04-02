import React from 'react';
import styled, { css } from 'styled-components';

const windowTitleStyle = (settings) => ({
    default: css`
        margin: auto;
        text-align: center;
        background-color: ${settings?.button?.primaryBg || '#02111B'};
        color: ${settings?.titleBar?.textColor || '#6BF178'};
        margin-bottom: ${settings?.spacing?.margin || '.5em'};
        width: 75%;
        padding: ${settings?.spacing?.padding || '.5em'};
        margin-top: -2.25em;
        border: ${settings?.borders?.style || 'double'} ${settings?.borders?.width || '.25em'} ${settings?.window?.borderColor || '#6BF178'};
        line-height: 1.2;
    `
});

const StyledWindowTitle = styled.h4`
    ${props => windowTitleStyle(props.styleSettings)[props.variant || 'default']}
    ${props => props.additionalStyles}
`;

const WindowTitle = React.forwardRef(({ value, variant = 'default', style, styleSettings, className }, ref) => (
    <StyledWindowTitle
        ref={ref}
        className={`ftrst window-title ${variant !== 'default' ? `${variant}-` : ''}${className || ''}`}
        additionalStyles={style}
        styleSettings={styleSettings}
    >
        {value}
    </StyledWindowTitle>
));

export default WindowTitle;

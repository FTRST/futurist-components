import React from 'react';
import styled, { css } from 'styled-components';

const inputStyles = (settings) => ({
    default: css`
        text-align: center;
        color: ${settings?.titleBar?.textColor || '#6bf178'};
        padding: .5em;
        background-color: ${settings?.button?.primaryBg || '#02111b'};
        border: ridge ${settings?.borders?.width || '.25em'} ${settings?.window?.borderColor || '#6bf178'};
    `
});

const StyledInput = styled.input`
    ${props => inputStyles(props.styleSettings)[props.variant || 'default']}
    ${props => props.additionalStyles}
`;

const Input = React.forwardRef(({ value, action, variant = 'default', name = null, placeholder = null, style, styleSettings, className }, ref) => (
    <StyledInput
        onChange={action}
        ref={ref}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`ftrst input ${variant !== 'default' ? `${variant}-` : ''}${className || ''}`}
        additionalStyles={style}
        styleSettings={styleSettings}
    />
));

export default Input;

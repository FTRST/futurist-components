import React from 'react';
import styled, { css } from 'styled-components';

const inputStyles = {
    default: css`
        text-align: center;
        color: #6bf178;
        padding: .5em;
        background-color: #02111b;
        border: ridge .25em #6bf178;
    `
};

const StyledInput = styled.input`
    ${props => inputStyles[props.variant || 'default']}
    ${props => props.additionalStyles}
`;

const Input = React.forwardRef(({ value, action, variant = 'default', name = null, placeholder = null, style}, ref) => (
    <StyledInput
        onChange={action}
        ref={ref}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`futurist-${variant !== 'default' ? `${variant}-`: ''}button`}
        additionalStyles={style}
    />
));

export default Input;

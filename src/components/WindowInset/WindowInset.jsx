import React from 'react';
import styled, { css } from 'styled-components';

const windowInsetStyle = {
    default: css`
        background-color: #02111B;
        margin: .5em .25em .25em;
        padding: .25em;
        border: .25em inset #6bf178;
    `
};

const StyledWindowInset = styled.div`
    ${props => windowInsetStyle[props.variant || 'default']}
    ${props => props.additionalStyles}
`;

const WindowInset = React.forwardRef(({ value, children, variant = 'default', style}, ref) => (
    <StyledWindowInset
        ref={ref}
        className={`futurist-${variant !== 'default' ? `${variant}-`: ''}window-inset`}
        additionalStyles={style}
    >
        {value}
        {children}
    </StyledWindowInset>
));

export default WindowInset;

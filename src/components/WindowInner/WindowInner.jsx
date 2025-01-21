import React from 'react';
import styled, { css } from 'styled-components';

const windowInnerStyle = {
    default: css`
        border: .25em ridge #6bf178;
        background-color: #02111B;
        padding: .5em;
        color: #6bf178;
    `
};

const StyledWindowInner = styled.div`
  ${props => windowInnerStyle[props.variant || 'default']}
  ${props => props.additionalStyles}
`;

const WindowInner = React.forwardRef(({ value, children, variant = 'default', style}, ref) => (
    <StyledWindowInner
        ref={ref}
        className={`futurist-${variant !== 'default' ? `${variant}-`: ''}window-inner`}
        additionalStyles={style}
    >
        {value}
        {children}
    </StyledWindowInner>
));

export default WindowInner;

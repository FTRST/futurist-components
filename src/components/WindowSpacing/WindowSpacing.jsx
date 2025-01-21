import React from 'react';
import styled, { css } from 'styled-components';

const windowSpacingStyle = {
    default: css`
        padding: .5em;
        background-color: rebeccapurple;
    `
};

const StyledWindowSpacing = styled.div`
    ${props => windowSpacingStyle[props.variant || 'default']}
    ${props => props.additionalStyles}
`;

const WindowSpacing = React.forwardRef(({ value, children, variant = 'default', style }, ref) => (
    <StyledWindowSpacing
        ref={ref}
        className={`futurist-${variant !== 'default' ? `${variant}-`: ''}window-spacing`}
        additionalStyles={style}
    >
        {value}
        {children}
    </StyledWindowSpacing>
));

export default WindowSpacing;

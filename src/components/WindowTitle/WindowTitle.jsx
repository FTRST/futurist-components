import React from 'react';
import styled, { css } from 'styled-components';

const windowTitleStyle = {
    default: css`
        margin: auto;
        text-align: center;
        background-color: #02111B;
        color: #6BF178;
        margin-bottom: .5em;
        width: 75%;
        padding: .5em;
        margin-top: -2.25em;
        border: double .25em;
        line-height: 1.2;
    `
};

const StyledWindowTitle = styled.h4`
    ${props => windowTitleStyle[props.variant || 'default']}
    ${props => props.additionalStyles}
`;

const WindowTitle = React.forwardRef(({ value, variant = 'default', style }, ref) => (
    <StyledWindowTitle
        ref={ref}
        className={`futurist-${variant !== 'default' ? `${variant}-`: ''}window-title`}
        additionalStyles={style}
    >
        {value}
    </StyledWindowTitle>
));

export default WindowTitle;

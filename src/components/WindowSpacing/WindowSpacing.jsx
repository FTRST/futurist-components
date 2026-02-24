import React from 'react';
import styled, { css } from 'styled-components';

const windowSpacingStyle = (settings) => ({
    default: css`
        padding: ${settings?.spacing?.padding || '.5em'};
        background-color: rebeccapurple;
    `
});

const StyledWindowSpacing = styled.div`
    ${props => windowSpacingStyle(props.styleSettings)[props.variant || 'default']}
    ${props => props.additionalStyles}
`;

const WindowSpacing = React.forwardRef(({ value, children, variant = 'default', style, styleSettings }, ref) => (
    <StyledWindowSpacing
        ref={ref}
        className={`futurist-${variant !== 'default' ? `${variant}-`: ''}window-spacing`}
        additionalStyles={style}
        styleSettings={styleSettings}
    >
        {value}
        {children}
    </StyledWindowSpacing>
));

export default WindowSpacing;

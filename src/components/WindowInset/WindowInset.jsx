import React from 'react';
import styled, { css } from 'styled-components';

const windowInsetStyle = (settings) => ({
    default: css`
        background-color: ${settings?.button?.primaryBg || '#02111B'};
        margin: ${settings?.spacing?.margin || '.5em'} ${settings?.spacing?.margin || '.25em'} ${settings?.spacing?.margin || '.25em'};
        padding: ${settings?.spacing?.padding || '.25em'};
        border: inset ${settings?.borders?.width || '.25em'} ${settings?.window?.borderColor || '#6bf178'};
    `
});

const StyledWindowInset = styled.div`
    ${props => windowInsetStyle(props.$s)[props.variant || 'default']}
    ${props => props.additionalStyles}
`;

const WindowInset = React.forwardRef(({ value, children, variant = 'default', style, styleSettings }, ref) => (
    <StyledWindowInset
        ref={ref}
        $s={styleSettings}
        className={`futurist-${variant !== 'default' ? `${variant}-`: ''}window-inset`}
        additionalStyles={style}
    >
        {value}
        {children}
    </StyledWindowInset>
));

export default WindowInset;

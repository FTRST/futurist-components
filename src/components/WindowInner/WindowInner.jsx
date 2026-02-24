import React from 'react';
import styled, { css } from 'styled-components';

const windowInnerStyle = (settings) => ({
    default: css`
        border: ridge ${settings?.borders?.width || '.25em'} ${settings?.window?.borderColor || '#6bf178'};
        background-color: ${settings?.button?.primaryBg || '#02111B'};
        padding: ${settings?.spacing?.padding || '.5em'};
        color: ${settings?.titleBar?.textColor || '#6bf178'};
    `
});

const StyledWindowInner = styled.div`
  ${props => windowInnerStyle(props.styleSettings)[props.variant || 'default']}
  ${props => props.additionalStyles}
`;

const WindowInner = React.forwardRef(({ value, children, variant = 'default', style, styleSettings }, ref) => (
    <StyledWindowInner
        ref={ref}
        className={`futurist-${variant !== 'default' ? `${variant}-`: ''}window-inner`}
        additionalStyles={style}
        styleSettings={styleSettings}
    >
        {value}
        {children}
    </StyledWindowInner>
));

export default WindowInner;

import React from 'react';
import styled, { css } from 'styled-components';

const windowInnerStyle = (settings) => ({
    default: css`
        border: 1px solid ${settings?.window?.borderColor || '#89b4fa'};
        background-color: ${settings?.button?.primaryBg || '#45475a'};
        padding: ${settings?.spacing?.padding || '.5em'};
        color: ${settings?.titleBar?.textColor || '#cdd6f4'};
        border-radius: 4px;
    `
});

const StyledWindowInner = styled.div`
  ${props => windowInnerStyle(props.$s)[props.variant || 'default']}
  ${props => props.additionalStyles}
`;

const WindowInner = React.forwardRef(({ value, children, variant = 'default', style, styleSettings }, ref) => (
    <StyledWindowInner
        ref={ref}
        $s={styleSettings}
        additionalStyles={style}
        styleSettings={styleSettings}
    >
        {value}
        {children}
    </StyledWindowInner>
));

export default WindowInner;

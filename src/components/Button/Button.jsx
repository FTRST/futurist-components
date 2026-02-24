import React from 'react';
import styled, { css } from 'styled-components';

const buttonStyles = (settings) => ({
  default: css`
    color: ${settings?.button?.primaryText || '#6BF178'};
    background-color: ${settings?.button?.primaryBg || '#02111B'};
    padding: 0.5em;
    border: outset ${settings?.borders?.width || 'medium'} ${settings?.window?.borderColor || '#6BF178'};
    outline: solid .1em ${settings?.button?.primaryBg || '#02111B'};
  `,
  inverted: css`
    color: ${settings?.button?.primaryBg || '#02111B'};
    background-color: ${settings?.button?.primaryText || '#6BF178'};
    border: outset ${settings?.borders?.width || 'medium'} ${settings?.window?.borderColor || '#6BF178'};
    padding: .5em;
    outline: solid .1em ${settings?.button?.primaryBg || '#02111B'};
  `
});

const StyledButton = styled.button`
  ${props => buttonStyles(props.styleSettings)[props.variant || 'default']}
  ${props => props.additionalStyles}
  ${props => props.dataUrl}
  ${props => props.value}
`;

// Using React.forwardRef with TypeScript generics to define ref and props types
const Button = React.forwardRef(({ label, action, variant = 'default', style, dataUrl = null, value = null, styleSettings }, ref) => (
  <StyledButton
    onClick={action}
    ref={ref}
    variant={variant}
    additionalStyles={style}
    data-url={dataUrl}
    value={value}
    className={`futurist-${variant !== 'default' ? `${variant}-`: ''}button`}
    styleSettings={styleSettings}
  >
    {label}
  </StyledButton>
));

export default Button;
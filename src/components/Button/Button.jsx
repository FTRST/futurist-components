import React from 'react';
import styled, { css } from 'styled-components';

const buttonVariants = (settings) => ({
  default: css`
    color: ${settings?.button?.primaryText || '#cdd6f4'};
    background-color: ${settings?.button?.primaryBg || '#45475a'};
    border: 1px solid ${settings?.window?.borderColor || '#89b4fa'};
  `,
  primary: css`
    color: ${settings?.button?.primaryBg || '#45475a'};
    background-color: ${settings?.button?.primaryText || '#cdd6f4'};
    border: 1px solid ${settings?.button?.primaryText || '#cdd6f4'};
  `,
  ghost: css`
    color: ${settings?.titleBar?.textColor || '#cdd6f4'};
    background-color: transparent;
    border: 1px solid transparent;
    &:hover { background-color: ${settings?.button?.primaryBg || '#45475a'}; }
  `,
});

const StyledButton = styled.button`
  ${props => buttonVariants(props.$s)[props.$v || 'default']}
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85em;
  font-weight: 500;
  transition: opacity 0.15s, background-color 0.15s;
  box-sizing: border-box;
  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.4; cursor: default; }
`;

const Button = React.forwardRef(({ label, action, variant = 'default', style, disabled, type, styleSettings }, ref) => (
  <StyledButton
    onClick={action}
    ref={ref}
    $v={variant}
    $s={styleSettings}
    disabled={disabled}
    type={type}
    className="futurist-button"
    additionalStyles={style}
  >
    {label}
  </StyledButton>
));

Button.displayName = 'Button';

export default Button;
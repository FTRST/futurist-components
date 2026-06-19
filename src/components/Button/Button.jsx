import React from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledButton = styled.button`
  color: ${({ $s, $v }) =>
    $v === 'primary' ? ($s?.button?.primaryBg || '#45475a') :
    $v === 'ghost' ? ($s?.titleBar?.textColor || '#cdd6f4') :
    ($s?.button?.primaryText || '#cdd6f4')};
  background-color: ${({ $s, $v }) =>
    $v === 'primary' ? ($s?.button?.primaryText || '#cdd6f4') :
    $v === 'ghost' ? 'transparent' :
    ($s?.button?.primaryBg || '#45475a')};
  border: 1px solid ${({ $s, $v }) =>
    $v === 'ghost' ? 'transparent' :
    $v === 'primary' ? ($s?.button?.primaryText || '#cdd6f4') :
    ($s?.window?.borderColor || '#89b4fa')};
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85em;
  font-weight: 500;
  transition: opacity 0.15s, background-color 0.15s;
  box-sizing: border-box;
  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.4; cursor: default; }
  ${({ $s, $v }) => $v === 'ghost' && css`
    &:hover { background-color: ${$s?.button?.primaryBg || '#45475a'}; }
  `}
`;

const Button = React.forwardRef(({ label, action, variant = 'default', style, disabled, type, styleSettings }, ref) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledButton onClick={action} ref={ref} $v={variant} $s={s} disabled={disabled} type={type} className="futurist-button" style={style}>
      {label}
    </StyledButton>
  );
});

Button.displayName = 'Button';
export default Button;
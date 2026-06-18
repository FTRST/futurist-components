import React from 'react';
import styled, { css } from 'styled-components';

const variants = (settings) => ({
  default: css`
    color: ${settings?.titleBar?.textColor || '#cdd6f4'};
    background-color: ${settings?.button?.primaryBg || '#45475a'};
    border: 1px solid ${settings?.window?.borderColor || '#89b4fa'};
  `,
  info: css`
    color: #cdd6f4;
    background-color: #1e2a4a;
    border: 1px solid ${settings?.window?.borderColor || '#89b4fa'};
  `,
  success: css`
    color: #1e1e2e;
    background-color: #a6e3a1;
    border: 1px solid #a6e3a1;
  `,
  warning: css`
    color: #1e1e2e;
    background-color: #f9e2af;
    border: 1px solid #f9e2af;
  `,
  danger: css`
    color: #f5f5f5;
    background-color: #5c1a20;
    border: 1px solid #f38ba8;
  `,
});

const StyledAlert = styled.div`
  ${props => variants(props.$s)[props.$v || 'default']}
  display: flex;
  align-items: flex-start;
  gap: 0.5em;
  padding: 0.75em 1em;
  border-radius: 4px;
  font-size: 0.85em;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1em;
  padding: 0;
  margin-left: auto;
  opacity: 0.6;
  flex-shrink: 0;
  line-height: 1;
  &:hover { opacity: 1; }
`;

const Alert = React.forwardRef(({ children, variant = 'default', onClose, style, styleSettings }, ref) => (
  <StyledAlert ref={ref} $v={variant} $s={styleSettings} style={style} className="futurist-alert">
    <div style={{ flex: 1 }}>{children}</div>
    {onClose && <CloseButton onClick={onClose}>✕</CloseButton>}
  </StyledAlert>
));

Alert.displayName = 'Alert';

export default Alert;
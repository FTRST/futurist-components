import React from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const variants = (settings) => ({
  default: css`
    color: ${settings?.titleBar?.textColor || '#cdd6f4'};
    background-color: ${settings?.button?.primaryBg || '#45475a'};
  `,
  info: css`
    color: #1e1e2e;
    background-color: ${settings?.window?.borderColor || '#89b4fa'};
  `,
  success: css` color: #1e1e2e; background-color: #a6e3a1; `,
  warning: css` color: #1e1e2e; background-color: #f9e2af; `,
  danger: css` color: #1e1e2e; background-color: #f38ba8; `,
});

const StyledBadge = styled.span`
  ${props => variants(props.$s)[props.$v || 'default']}
  display: inline-flex;
  align-items: center;
  padding: 0.2em 0.5em;
  border-radius: 3px;
  font-size: 0.75em;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
`;

const Badge = React.forwardRef(({ label, variant = 'default', style, styleSettings }, ref) => {
  const s = useStyleSettings(styleSettings);
  return <StyledBadge ref={ref} $v={variant} $s={s} style={style} className="futurist-badge">{label}</StyledBadge>;
});

Badge.displayName = 'Badge';
export default Badge;
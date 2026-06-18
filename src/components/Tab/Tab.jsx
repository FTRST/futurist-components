import React from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const tabStyles = (settings) => ({
  default: css`
    background-color: transparent;
    color: ${settings?.titleBar?.textColor || '#cdd6f4'};
    opacity: 0.6;
    border: 1px solid transparent;
    border-bottom: 2px solid transparent;
    padding: 0.5em 1em;
  `,
  selected: css`
    background-color: ${settings?.button?.primaryBg || '#45475a'};
    color: ${settings?.titleBar?.textColor || '#cdd6f4'};
    border: 1px solid ${settings?.window?.borderColor || '#89b4fa'};
    border-bottom: 2px solid ${settings?.window?.borderColor || '#89b4fa'};
    padding: 0.5em 1em;
    opacity: 1;
  `,
});

const StyledTab = styled.button`
  ${props => tabStyles(props.$s)[props.$selected ? 'selected' : 'default']}
  cursor: pointer;
  font-size: 0.85em;
  font-weight: 500;
  transition: all 0.15s;
  box-sizing: border-box;
  &:hover { opacity: 0.85; }
`;

const Tab = React.forwardRef(({ label, action, selected, variant = 'default', style, styleSettings }, ref) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledTab onClick={action} ref={ref} $selected={selected} $s={s} className={selected ? 'futurist-tab-selected' : 'futurist-tab'} additionalStyles={style}>
      {label}
    </StyledTab>
  );
});

Tab.displayName = 'Tab';
export default Tab;
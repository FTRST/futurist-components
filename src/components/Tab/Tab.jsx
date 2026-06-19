import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledTab = styled.button`
  background-color: ${({ $s, $selected }) => $selected ? ($s?.button?.primaryBg || '#45475a') : 'transparent'};
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  border: 1px solid ${({ $s, $selected }) => $selected ? ($s?.window?.borderColor || '#89b4fa') : 'transparent'};
  border-bottom: 2px solid ${({ $s, $selected }) => $selected ? ($s?.window?.borderColor || '#89b4fa') : 'transparent'};
  padding: 0.5em 1em;
  opacity: ${({ $selected }) => $selected ? 1 : 0.6};
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
    <StyledTab onClick={action} ref={ref} $selected={selected} $s={s} className={selected ? 'futurist-tab-selected' : 'futurist-tab'} style={style}>
      {label}
    </StyledTab>
  );
});

Tab.displayName = 'Tab';
export default Tab;
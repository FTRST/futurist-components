import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
  font-size: 0.85em;
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  user-select: none;
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Track = styled.span`
  position: relative;
  width: 2.2em;
  height: 1.2em;
  border-radius: 0.6em;
  background-color: ${({ $checked, $s }) => $checked ? ($s?.window?.borderColor || '#89b4fa') : ($s?.button?.primaryBg || '#45475a')};
  transition: background-color 0.2s;
  flex-shrink: 0;
`;

const Thumb = styled.span`
  position: absolute;
  top: 0.15em;
  left: ${({ $checked }) => $checked ? '1.05em' : '0.15em'};
  width: 0.9em;
  height: 0.9em;
  border-radius: 50%;
  background-color: ${({ $s }) => $s?.titleBar?.backgroundColor || '#181825'};
  transition: left 0.2s;
`;

const Toggle = React.forwardRef(({ checked, action, label, style, styleSettings }, ref) => {
  const s = useStyleSettings(styleSettings);
  return (
    <Label $s={s} style={style}>
      <HiddenInput ref={ref} checked={checked} onChange={action} />
      <Track $checked={checked} $s={s} aria-hidden="true"><Thumb $checked={checked} $s={s} /></Track>
      {label}
    </Label>
  );
});

Toggle.displayName = 'Toggle';
export default Toggle;
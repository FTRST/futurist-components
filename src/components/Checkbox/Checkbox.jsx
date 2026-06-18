import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
  font-size: 0.85em;
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  user-select: none;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.span`
  width: 1em;
  height: 1em;
  border: 1px solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  border-radius: 3px;
  background-color: ${({ $checked, $s }) => $checked ? ($s?.window?.borderColor || '#89b4fa') : ($s?.button?.primaryBg || '#45475a')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  flex-shrink: 0;
  &::after {
    content: '✓';
    font-size: 0.7em;
    color: ${({ $s }) => $s?.titleBar?.backgroundColor || '#181825'};
    display: ${({ $checked }) => $checked ? 'block' : 'none'};
  }
`;

const Checkbox = React.forwardRef(({ checked, action, label, style, styleSettings }, ref) => (
  <Label $s={styleSettings} style={style}>
    <HiddenCheckbox ref={ref} checked={checked} onChange={action} />
    <StyledCheckbox $checked={checked} $s={styleSettings} aria-hidden="true" />
    {label}
  </Label>
));

Checkbox.displayName = 'Checkbox';

export default Checkbox;
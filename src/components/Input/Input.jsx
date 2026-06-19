import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledInput = styled.input`
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  background-color: ${({ $s }) => $s?.button?.primaryBg || '#45475a'};
  border: 1px solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  padding: 0.5em 0.75em;
  border-radius: 4px;
  font-size: 0.85em;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  transition: border-color 0.15s;
  &:focus { border-color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'}; }
  &::placeholder { opacity: 0.4; }
`;

const Input = React.forwardRef(({ value, action, variant = 'default', name, placeholder, style, styleSettings, type = 'text' }, ref) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledInput onChange={action} ref={ref} name={name} value={value} placeholder={placeholder} type={type} $s={s} className="futurist-input" style={style} />
  );
});

Input.displayName = 'Input';
export default Input;
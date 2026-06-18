import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledTextarea = styled.textarea`
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  background-color: ${({ $s }) => $s?.button?.primaryBg || '#45475a'};
  border: 1px solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  padding: 0.5em 0.75em;
  border-radius: 4px;
  font-size: 0.85em;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  resize: vertical;
  min-height: 4em;
  transition: border-color 0.15s;
  &:focus { border-color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'}; }
  &::placeholder { opacity: 0.4; }
`;

const Textarea = React.forwardRef(({ value, action, placeholder, rows, style, styleSettings }, ref) => {
  const s = useStyleSettings(styleSettings);
  return <StyledTextarea ref={ref} value={value} onChange={action} placeholder={placeholder} rows={rows} $s={s} style={style} className="futurist-textarea" />;
});

Textarea.displayName = 'Textarea';
export default Textarea;
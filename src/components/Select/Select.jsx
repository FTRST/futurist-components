import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  background-color: ${({ $s }) => $s?.button?.primaryBg || '#45475a'};
  border: 1px solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  padding: 0.5em 0.75em;
  border-radius: 4px;
  font-size: 0.85em;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  transition: border-color 0.15s;
  &:focus {
    border-color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  }
`;

const Select = React.forwardRef(({ value, action, options, placeholder, style, styleSettings }, ref) => (
  <StyledSelect
    ref={ref}
    value={value}
    onChange={action}
    $s={styleSettings}
    style={style}
    className="futurist-select"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options?.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </StyledSelect>
));

Select.displayName = 'Select';

export default Select;
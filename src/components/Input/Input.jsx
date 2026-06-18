import React from 'react';
import styled, { css } from 'styled-components';

const inputVariants = (settings) => ({
  default: css`
    color: ${settings?.titleBar?.textColor || '#cdd6f4'};
    background-color: ${settings?.button?.primaryBg || '#45475a'};
    border: 1px solid ${settings?.window?.borderColor || '#89b4fa'};
  `,
});

const StyledInput = styled.input`
  ${props => inputVariants(props.$s)[props.$v || 'default']}
  padding: 0.5em 0.75em;
  border-radius: 4px;
  font-size: 0.85em;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  transition: border-color 0.15s;
  &:focus {
    border-color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
  }
  &::placeholder {
    opacity: 0.4;
  }
`;

const Input = React.forwardRef(({ value, action, variant = 'default', name, placeholder, style, styleSettings, type = 'text' }, ref) => (
  <StyledInput
    onChange={action}
    ref={ref}
    name={name}
    value={value}
    placeholder={placeholder}
    type={type}
    $v={variant}
    $s={styleSettings}
    className="futurist-input"
    additionalStyles={style}
  />
));

Input.displayName = 'Input';

export default Input;
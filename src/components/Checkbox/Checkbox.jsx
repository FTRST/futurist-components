import React from 'react';
import styled, { css } from 'styled-components';

const checkboxStyle = (settings) => css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
  user-select: none;
`;

const StyledCheckboxContainer = styled.label`
  ${props => checkboxStyle(props.styleSettings)}
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxBox = styled.span`
  width: 1.25em;
  height: 1.25em;
  border: ${props => props.theme?.borders?.width || '.15em'} ${props => props.theme?.borders?.style || 'solid'} ${props => props.theme?.window?.borderColor || '#6BF178'};
  background-color: ${props => props.checked ? (props.theme?.button?.primaryBg || '#02111B') : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${CheckboxInput}:checked + & {
    background-color: ${props => props.theme?.window?.borderColor || '#6BF178'};
  }

  ${CheckboxInput}:checked + &:after {
    content: '✓';
    color: ${props => props.theme?.button?.primaryBg || '#02111B'};
    font-weight: bold;
  }
`;

const CheckboxLabel = styled.span`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
`;

const Checkbox = ({ checked, onChange, label, styleSettings, className }) => (
  <StyledCheckboxContainer 
    className={`ftrst checkbox ${className || ''}`}
    theme={styleSettings}
    styleSettings={styleSettings}
  >
    <CheckboxInput
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      theme={styleSettings}
    />
    <CheckboxBox 
      className="ftrst checkbox-box"
      checked={checked}
      theme={styleSettings}
    />
    {label && <CheckboxLabel className="ftrst checkbox-label" theme={styleSettings}>{label}</CheckboxLabel>}
  </StyledCheckboxContainer>
);

export default Checkbox;

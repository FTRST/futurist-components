import React from 'react';
import styled, { css } from 'styled-components';

const toggleStyle = (settings) => css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
  user-select: none;
`;

const StyledToggleContainer = styled.label`
  ${props => toggleStyle(props.styleSettings)}
`;

const ToggleInput = styled.input`
  display: none;
`;

const ToggleSwitch = styled.span`
  width: 3em;
  height: 1.5em;
  background-color: ${props => props.checked ? (props.theme?.window?.borderColor || '#6BF178') : '#333'};
  border-radius: 1.5em;
  position: relative;
  transition: background-color 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    width: 1.25em;
    height: 1.25em;
    border-radius: 50%;
    background-color: ${props => props.theme?.button?.primaryBg || '#02111B'};
    top: 0.125em;
    left: 0.125em;
    transition: transform 0.3s ease;
  }

  ${ToggleInput}:checked + & {
    background-color: ${props => props.theme?.window?.borderColor || '#6BF178'};
    
    &:after {
      transform: translateX(1.5em);
    }
  }
`;

const ToggleLabel = styled.span`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
`;

const Toggle = ({ checked, onChange, label, styleSettings, className }) => (
  <StyledToggleContainer 
    className={`ftrst toggle ${className || ''}`}
    theme={styleSettings}
    styleSettings={styleSettings}
  >
    <ToggleInput
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      theme={styleSettings}
    />
    <ToggleSwitch 
      className="ftrst toggle-switch"
      checked={checked}
      theme={styleSettings}
    />
    {label && <ToggleLabel className="ftrst toggle-label" theme={styleSettings}>{label}</ToggleLabel>}
  </StyledToggleContainer>
);

export default Toggle;

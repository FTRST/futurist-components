import React from 'react';
import styled, { css } from 'styled-components';

const radioStyle = (settings) => css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
  user-select: none;
`;

const StyledRadioContainer = styled.label`
  ${props => radioStyle(props.styleSettings)}
`;

const RadioInput = styled.input`
  display: none;
`;

const RadioCircle = styled.span`
  width: 1.25em;
  height: 1.25em;
  border: ${props => props.theme?.borders?.width || '.15em'} ${props => props.theme?.borders?.style || 'solid'} ${props => props.theme?.window?.borderColor || '#6BF178'};
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  ${RadioInput}:checked + & {
    border-color: ${props => props.theme?.window?.borderColor || '#6BF178'};
  }

  ${RadioInput}:checked + &:after {
    content: '';
    width: 0.5em;
    height: 0.5em;
    background-color: ${props => props.theme?.window?.borderColor || '#6BF178'};
    border-radius: 50%;
  }
`;

const RadioLabel = styled.span`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
`;

const Radio = ({ checked, onChange, label, styleSettings, className }) => (
  <StyledRadioContainer 
    className={`ftrst radio ${className || ''}`}
    theme={styleSettings}
    styleSettings={styleSettings}
  >
    <RadioInput
      type="radio"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      theme={styleSettings}
    />
    <RadioCircle 
      className="ftrst radio-circle"
      checked={checked}
      theme={styleSettings}
    />
    {label && <RadioLabel className="ftrst radio-label" theme={styleSettings}>{label}</RadioLabel>}
  </StyledRadioContainer>
);

export default Radio;

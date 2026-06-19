import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
  user-select: none;
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  font-size: 0.85em;
`;

const HiddenInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const Circle = styled.span`
  width: 1.25em;
  height: 1.25em;
  border: 2px solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  ${HiddenInput}:checked + &::after {
    content: '';
    width: 0.6em;
    height: 0.6em;
    background-color: ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
    border-radius: 50%;
  }
`;

const Radio = ({ checked, onChange, label, styleSettings, className }) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledContainer className={`ftrst radio ${className || ''}`} $s={s}>
      <HiddenInput checked={checked} onChange={e => onChange(e.target.checked)} />
      <Circle className="ftrst radio-circle" $s={s} />
      {label && <span className="ftrst radio-label">{label}</span>}
    </StyledContainer>
  );
};

export default Radio;
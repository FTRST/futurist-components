import React from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const sliderContainerStyle = (settings) => css`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const StyledSliderContainer = styled.div`
  ${props => sliderContainerStyle(props.$s)}
`;

const SliderInput = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  height: 0.5em;
  background: ${props => props.$s?.button?.primaryBg || '#45475a'};
  border: 1px solid ${props => props.$s?.window?.borderColor || '#89b4fa'};
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1.25em;
    height: 1.25em;
    background: ${props => props.$s?.window?.borderColor || '#89b4fa'};
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 1.25em;
    height: 1.25em;
    background: ${props => props.$s?.window?.borderColor || '#89b4fa'};
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
  &::-webkit-slider-runnable-track { width: 100%; height: 0.5em; }
  &::-moz-range-track { width: 100%; height: 0.5em; }
`;

const SliderLabel = styled.span`
  color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
  min-width: 3em;
  text-align: right;
  font-size: 0.85em;
`;

const Slider = ({ value, onChange, min = 0, max = 100, step = 1, label, showValue = true, styleSettings, className }) => {
  const s = useStyleSettings(styleSettings);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <StyledSliderContainer className={`ftrst slider ${className || ''}`} $s={s}>
      {label && <span className="ftrst slider-label" style={{ color: s?.titleBar?.textColor || '#cdd6f4', marginRight: '0.5em', fontSize: '0.85em' }}>{label}</span>}
      <SliderInput min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} percentage={percentage} $s={s} className="ftrst slider-input" />
      {showValue && <SliderLabel className="ftrst slider-value" $s={s}>{value}</SliderLabel>}
    </StyledSliderContainer>
  );
};

export default Slider;
import React from 'react';
import styled, { css } from 'styled-components';

const sliderContainerStyle = (settings) => css`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const StyledSliderContainer = styled.div`
  ${props => sliderContainerStyle(props.styleSettings)}
`;

const SliderInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 0.5em;
  background: ${props => props.theme?.button?.primaryBg || '#02111B'};
  border: ${props => props.theme?.borders?.width || '.1em'} solid ${props => props.theme?.window?.borderColor || '#6BF178'};
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.25em;
    height: 1.25em;
    background: ${props => props.theme?.window?.borderColor || '#6BF178'};
    border: ${props => props.theme?.borders?.width || '.05em'} outset ${props => props.theme?.window?.borderColor || '#6BF178'};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 1.25em;
    height: 1.25em;
    background: ${props => props.theme?.window?.borderColor || '#6BF178'};
    border: ${props => props.theme?.borders?.width || '.05em'} outset ${props => props.theme?.window?.borderColor || '#6BF178'};
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.5em;
    background: linear-gradient(
      to right,
      ${props => props.theme?.window?.borderColor || '#6BF178'} 0%,
      ${props => props.theme?.window?.borderColor || '#6BF178'} ${(props) => props.percentage}%,
      ${props => props.theme?.button?.primaryBg || '#02111B'} ${(props) => props.percentage}%,
      ${props => props.theme?.button?.primaryBg || '#02111B'} 100%
    );
  }

  &::-moz-range-track {
    width: 100%;
    height: 0.5em;
    background: linear-gradient(
      to right,
      ${props => props.theme?.window?.borderColor || '#6BF178'} 0%,
      ${props => props.theme?.window?.borderColor || '#6BF178'} ${(props) => props.percentage}%,
      ${props => props.theme?.button?.primaryBg || '#02111B'} ${(props) => props.percentage}%,
      ${props => props.theme?.button?.primaryBg || '#02111B'} 100%
    );
  }

  &::-moz-range-progress {
    background: ${props => props.theme?.window?.borderColor || '#6BF178'};
    height: 0.5em;
  }
`;

const SliderLabel = styled.span`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  min-width: 3em;
  text-align: right;
`;

const Slider = ({ value, onChange, min = 0, max = 100, step = 1, label, showValue = true, styleSettings, className }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <StyledSliderContainer 
      className={`ftrst slider ${className || ''}`}
      theme={styleSettings}
      styleSettings={styleSettings}
    >
      {label && <span className="ftrst slider-label" style={{ color: styleSettings?.titleBar?.textColor || '#6bf178', marginRight: '0.5em' }}>{label}</span>}
      <SliderInput
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        percentage={percentage}
        theme={styleSettings}
        className="ftrst slider-input"
      />
      {showValue && (
        <SliderLabel 
          className="ftrst slider-value"
          theme={styleSettings}
        >
          {value}
        </SliderLabel>
      )}
    </StyledSliderContainer>
  );
};

export default Slider;

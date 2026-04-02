import React from 'react';
import styled, { css } from 'styled-components';

const progressBarStyle = (settings) => css`
  width: 100%;
  height: 1em;
  background-color: ${settings?.button?.primaryBg || '#02111B'};
  border: ${settings?.borders?.width || '.1em'} ${settings?.borders?.style || 'solid'} ${settings?.window?.borderColor || '#6BF178'};
`;

const StyledProgressBar = styled.div`
  ${props => progressBarStyle(props.styleSettings)}
  position: relative;
`;

const progressFillStyle = (settings) => css`
  height: 100%;
  background-color: ${settings?.window?.borderColor || '#6BF178'};
  transition: width 0.3s ease;
`;

const StyledProgressFill = styled.div`
  ${props => progressFillStyle(props.styleSettings)}
`;

const ProgressLabel = styled.span`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  font-size: 0.875em;
  margin-top: 0.25em;
  display: block;
`;

const ProgressBar = ({ value, max = 100, showLabel = true, styleSettings, className }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`ftrst progress-container ${className || ''}`}>
      <StyledProgressBar 
        className="ftrst progress-bar"
        styleSettings={styleSettings}
      >
        <StyledProgressFill 
          className="ftrst progress-fill"
          style={{ width: `${percentage}%` }}
          styleSettings={styleSettings}
        />
      </StyledProgressBar>
      {showLabel && (
        <ProgressLabel 
          className="ftrst progress-label"
          theme={styleSettings}
        >
          {Math.round(percentage)}%
        </ProgressLabel>
      )}
    </div>
  );
};

export default ProgressBar;

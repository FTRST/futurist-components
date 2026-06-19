import React from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const progressBarStyle = (settings) => css`
  width: 100%;
  height: 1em;
  background-color: ${settings?.button?.primaryBg || '#45475a'};
  border: 1px solid ${settings?.window?.borderColor || '#89b4fa'};
  border-radius: 4px;
  overflow: hidden;
`;

const StyledProgressBar = styled.div`
  ${props => progressBarStyle(props.$s)}
  position: relative;
`;

const StyledProgressFill = styled.div`
  height: 100%;
  background-color: ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  transition: width 0.3s ease;
`;

const ProgressLabel = styled.span`
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  font-size: 0.875em;
  margin-top: 0.25em;
  display: block;
`;

const ProgressBar = ({ value, max = 100, showLabel = true, styleSettings, className }) => {
  const s = useStyleSettings(styleSettings);
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`ftrst progress-container ${className || ''}`}>
      <StyledProgressBar className="ftrst progress-bar" $s={s}>
        <StyledProgressFill className="ftrst progress-fill" style={{ width: `${percentage}%` }} $s={s} />
      </StyledProgressBar>
      {showLabel && <ProgressLabel className="ftrst progress-label" $s={s}>{Math.round(percentage)}%</ProgressLabel>}
    </div>
  );
};

export default ProgressBar;
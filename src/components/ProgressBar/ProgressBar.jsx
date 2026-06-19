import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledProgressBar = styled.div`
  width: 100%;
  height: 1em;
  background-color: ${({ $s }) => $s?.button?.primaryBg || '#45475a'};
  border: 1px solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  border-radius: 4px;
  overflow: hidden;
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
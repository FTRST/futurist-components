import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

const sparklineStyle = (settings) => css`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  color: ${settings?.titleBar?.textColor || '#6bf178'};
`;

const StyledSparkline = styled.span`
  ${props => sparklineStyle(props.styleSettings)}
`;

const Sparkline = ({ data, width = 20, height = 4, styleSettings, className }) => {
  const maxValue = Math.max(...data, 1);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  
  const sparkline = useMemo(() => {
    if (data.length === 0) return '';
    
    // Characters for different heights (from bottom to top)
    const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
    
    return data.map(value => {
      const normalized = ((value - minValue) / range);
      const index = Math.min(
        Math.floor(normalized * chars.length),
        chars.length - 1
      );
      return chars[Math.max(index, 0)];
    }).join('');
  }, [data, maxValue, minValue, range]);

  return (
    <StyledSparkline 
      className={`ftrst sparkline ${className || ''}`}
      styleSettings={styleSettings}
    >
      {sparkline}
    </StyledSparkline>
  );
};

export default Sparkline;

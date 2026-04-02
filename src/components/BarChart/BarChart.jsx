import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

const chartContainerStyle = (settings) => css`
  background-color: ${settings?.button?.primaryBg || '#02111B'};
  border: ${settings?.borders?.width || '.15em'} ${settings?.borders?.style || 'solid'} ${settings?.window?.borderColor || '#6BF178'};
  padding: ${settings?.spacing?.padding || '.5em'};
  color: ${settings?.titleBar?.textColor || '#6bf178'};
`;

const StyledChartContainer = styled.div`
  ${props => chartContainerStyle(props.styleSettings)}
`;

const ChartTitle = styled.h4`
  margin: 0 0 0.5em 0;
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  text-align: center;
`;

const BarChart = ({ data, title, styleSettings, className }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const barWidth = 40;
  
  const bars = useMemo(() => {
    return data.map((item, index) => {
      const percentage = (item.value / maxValue) * 100;
      const filledLength = Math.round((percentage / 100) * barWidth);
      
      // Gradient characters based on fill level
      const gradientChars = ['░', '▒', '▓', '█'];
      let bar = '';
      
      for (let i = 0; i < filledLength; i++) {
        const charIndex = Math.min(Math.floor((i / filledLength) * gradientChars.length), gradientChars.length - 1);
        bar += gradientChars[charIndex];
      }
      
      // Pad with empty space
      while (bar.length < barWidth) {
        bar += ' ';
      }
      
      const label = item.label || `Item ${index + 1}`;
      const value = item.value;
      
      return `${label.padEnd(12)} |${bar}| ${value}`;
    });
  }, [data, maxValue]);

  return (
    <StyledChartContainer className={`ftrst bar-chart ${className || ''}`} styleSettings={styleSettings}>
      {title && <ChartTitle className="ftrst chart-title" theme={styleSettings}>{title}</ChartTitle>}
      <pre 
        className="ftrst chart-content"
        style={{ 
          fontFamily: 'monospace', 
          fontSize: '0.75em', 
          margin: 0,
          lineHeight: 1.2
        }}
      >
        {bars.join('\n')}
      </pre>
    </StyledChartContainer>
  );
};

export default BarChart;

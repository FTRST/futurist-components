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

const AreaChart = ({ data, title, height = 10, styleSettings, className }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  const chartArea = useMemo(() => {
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * 58,
      y: (item.value / maxValue) * height,
      label: item.label || index.toString()
    }));
    
    const lines = [];
    const width = 60;
    
    for (let row = height; row >= 0; row--) {
      let line = '';
      
      if (row === height) {
        line += ` ${maxValue.toFixed(1)} |`;
      } else if (row === Math.floor(height / 2)) {
        const mid = (maxValue / 2).toFixed(1);
        line += `${mid.padStart(4)} |`;
      } else if (row === 0) {
        line += ' 0.0 |';
      } else {
        line += '     |';
      }
      
      for (let col = 0; col < width; col++) {
        // Find the height at this column
        let yAtCol = 0;
        
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          
          if (Math.round(p1.x) <= col && Math.round(p2.x) >= col) {
            const slope = (p2.y - p1.y) / (p2.x - p1.x || 1);
            yAtCol = p1.y + slope * (col - p1.x);
            break;
          }
        }
        
        if (row <= Math.round(yAtCol)) {
          // Use gradient characters for filled area
          const fillRatio = row / height;
          if (fillRatio > 0.8) line += '█';
          else if (fillRatio > 0.6) line += '▓';
          else if (fillRatio > 0.4) line += '▒';
          else if (fillRatio > 0.2) line += '░';
          else line += '·';
        } else {
          line += ' ';
        }
      }
      
      lines.push(line);
    }
    
    // X-axis
    let axisLine = '     +';
    for (let i = 0; i < width; i++) {
      axisLine += '-';
    }
    lines.push(axisLine);
    
    return lines;
  }, [data, height, maxValue]);

  return (
    <StyledChartContainer className={`ftrst area-chart ${className || ''}`} styleSettings={styleSettings}>
      {title && <ChartTitle className="ftrst chart-title" theme={styleSettings}>{title}</ChartTitle>}
      <pre 
        className="ftrst chart-content"
        style={{ 
          fontFamily: 'monospace', 
          fontSize: '0.65em', 
          margin: 0,
          lineHeight: 1.1
        }}
      >
        {chartArea.join('\n')}
      </pre>
    </StyledChartContainer>
  );
};

export default AreaChart;

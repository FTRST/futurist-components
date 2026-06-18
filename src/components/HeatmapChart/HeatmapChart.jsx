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

const HeatmapChart = ({ data, title, styleSettings, className }) => {
  const maxValue = useMemo(() => {
    let max = 0;
    data.forEach(row => row.forEach(cell => {
      if (cell.value > max) max = cell.value;
    }));
    return max || 1;
  }, [data]);
  
  const heatmapLines = useMemo(() => {
    const lines = [];
    
    // Header row
    let header = '       |';
    data[0]?.map((_, colIndex) => {
      const label = data[0][colIndex]?.label || `C${colIndex}`;
      header += label.slice(0, 3).padStart(4);
    });
    lines.push(header);
    
    // Data rows
    data.forEach((row, rowIndex) => {
      let line = `R${rowIndex.toString().padStart(2)} |`;
      
      row.forEach(cell => {
        const value = cell.value || 0;
        const percentage = value / maxValue;
        
        // Choose character based on intensity
        let char = ' ';
        if (percentage > 0.9) char = '█';
        else if (percentage > 0.75) char = '▓';
        else if (percentage > 0.5) char = '▒';
        else if (percentage > 0.25) char = '░';
        else if (percentage > 0) char = '·';
        
        line += ` ${char}  `;
      });
      
      lines.push(line);
    });
    
    return lines;
  }, [data, maxValue]);

  return (
    <StyledChartContainer className={`ftrst heatmap-chart ${className || ''}`} styleSettings={styleSettings}>
      {title && <ChartTitle className="ftrst chart-title" theme={styleSettings}>{title}</ChartTitle>}
      <pre 
        className="ftrst chart-content"
        style={{ 
          fontFamily: 'monospace', 
          fontSize: '0.7em', 
          margin: 0,
          lineHeight: 1.2
        }}
      >
        {heatmapLines.join('\n')}
      </pre>
    </StyledChartContainer>
  );
};

export default HeatmapChart;

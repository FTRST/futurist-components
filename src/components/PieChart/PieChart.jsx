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

const PieChart = ({ data, title, size = 12, styleSettings, className }) => {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);
  
  const pieLines = useMemo(() => {
    if (total === 0) return ['No data'];
    
    const radius = Math.floor(size / 2);
    const centerX = size;
    const centerY = size;
    
    // Calculate cumulative percentages for segments
    let cumulative = 0;
    const segments = data.map(item => {
      const percentage = item.value / total;
      const startAngle = cumulative * Math.PI * 2;
      cumulative += percentage;
      return {
        ...item,
        startAngle,
        endAngle: cumulative * Math.PI * 2,
        percentage
      };
    });
    
    // Character set for different segments (ordered by density)
    const segmentChars = ['░', '▒', '▓', '█', '◈', '◆', '●'];
    
    const lines = [];
    
    for (let y = 0; y <= size * 2; y++) {
      let line = '';
      
      // Y-axis label
      if (y === 0) line += '▲';
      else if (y === size) line += '<';
      else if (y === size * 2) line += '▼';
      else line += ' ';
      
      for (let x = 0; x <= size * 2; x++) {
        // Calculate angle and distance from center
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) + Math.PI; // 0 to 2π
        
        if (dist <= radius) {
          // Find which segment this point belongs to
          for (let i = 0; i < segments.length; i++) {
            const seg = segments[i];
            if (angle >= seg.startAngle && angle < seg.endAngle) {
              line += segmentChars[i % segmentChars.length];
              break;
            }
          }
        } else {
          line += ' ';
        }
      }
      
      lines.push(line);
    }
    
    // Legend
    let legend = '\nLegend: ';
    segments.forEach((seg, i) => {
      const char = segmentChars[i % segmentChars.length];
      const name = seg.label || `Item ${i + 1}`;
      const pct = (seg.percentage * 100).toFixed(0);
      legend += `${char} ${name}:${pct}%  `;
    });
    
    return [...lines, legend];
  }, [data, size, total]);

  return (
    <StyledChartContainer className={`ftrst pie-chart ${className || ''}`} styleSettings={styleSettings}>
      {title && <ChartTitle className="ftrst chart-title" theme={styleSettings}>{title}</ChartTitle>}
      <pre 
        className="ftrst chart-content"
        style={{ 
          fontFamily: 'monospace', 
          fontSize: '0.6em', 
          margin: 0,
          lineHeight: 1.2
        }}
      >
        {pieLines.join('\n')}
      </pre>
    </StyledChartContainer>
  );
};

export default PieChart;

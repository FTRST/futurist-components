import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const chartContainerStyle = (settings) => css`
  background-color: ${settings?.button?.primaryBg || '#45475a'};
  border: ${settings?.borders?.width || '1px'} ${settings?.borders?.style || 'solid'} ${settings?.window?.borderColor || '#89b4fa'};
  padding: ${settings?.spacing?.padding || '.5em'};
  color: ${settings?.titleBar?.textColor || '#cdd6f4'};
`;

const StyledChartContainer = styled.div`
  ${props => chartContainerStyle(props.$s)}
`;

const ChartTitle = styled.h4`
  margin: 0 0 0.5em 0;
  color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
  text-align: center;
`;

const LineChart = ({ data, title, height = 12, styleSettings, className }) => {
  const s = useStyleSettings(styleSettings);
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const chartLines = useMemo(() => {
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * 60,
      y: ((item.value - minValue) / range) * height,
      label: item.label || index.toString()
    }));

    const lines = [];
    const width = 62;

    for (let row = height; row >= 0; row--) {
      let line = '';
      if (row === height) line += ` ${maxValue.toFixed(1)} |`;
      else if (row === 0) line += ` ${minValue.toFixed(1)} |`;
      else if (row === Math.floor(height / 2)) line += `${((maxValue + minValue) / 2).toFixed(1).padStart(4)} |`;
      else line += '     |';

      for (let col = 0; col < width; col++) {
        const pointIndex = points.findIndex(p => Math.round(p.x) === col);
        if (pointIndex !== -1) {
          const pointRow = Math.round(points[pointIndex].y);
          line += row === pointRow ? '●' : ' ';
        } else {
          let hasLine = false;
          for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i], p2 = points[i + 1];
            if (Math.round(p1.x) <= col && Math.round(p2.x) >= col) {
              const slope = (p2.y - p1.y) / (p2.x - p1.x || 1);
              if (Math.abs(p1.y + slope * (col - p1.x) - row) < 0.5) { hasLine = true; break; }
            }
          }
          line += hasLine ? '│' : ' ';
        }
      }
      lines.push(line);
    }

    let labelLine = '     +';
    for (let i = 0; i < width; i++) {
      if (i % 15 === 0) {
        const idx = Math.floor(i / width * (data.length - 1));
        labelLine += data[idx]?.label?.[0] || ' ';
      } else {
        labelLine += '-';
      }
    }
    lines.push(labelLine);

    return lines;
  }, [data, height, maxValue, minValue, range]);

  return (
    <StyledChartContainer className={`ftrst line-chart ${className || ''}`} $s={s}>
      {title && <ChartTitle className="ftrst chart-title" $s={s}>{title}</ChartTitle>}
      <pre className="ftrst chart-content" style={{ fontFamily: 'monospace', fontSize: '0.65em', margin: 0, lineHeight: 1.1 }}>
        {chartLines.join('\n')}
      </pre>
    </StyledChartContainer>
  );
};

export default LineChart;
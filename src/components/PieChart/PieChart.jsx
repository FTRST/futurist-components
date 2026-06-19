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

const PieChart = ({ data, title, size = 12, styleSettings, className }) => {
  const s = useStyleSettings(styleSettings);
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const pieLines = useMemo(() => {
    if (total === 0) return ['No data'];

    const radius = Math.floor(size / 2);
    const centerX = size;
    const centerY = size;

    let cumulative = 0;
    const segments = data.map(item => {
      const percentage = item.value / total;
      const startAngle = cumulative * Math.PI * 2;
      cumulative += percentage;
      return { ...item, startAngle, endAngle: cumulative * Math.PI * 2, percentage };
    });

    const segmentChars = ['\u2591', '\u2592', '\u2593', '\u2588', '\u25C8', '\u25C6', '\u25CF'];
    const lines = [];

    for (let y = 0; y <= size * 2; y++) {
      let line = '';
      if (y === 0) line += '\u25B2';
      else if (y === size) line += '<';
      else if (y === size * 2) line += '\u25BC';
      else line += ' ';

      for (let x = 0; x <= size * 2; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) + Math.PI;

        if (dist <= radius) {
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

    let legend = '\nLegend: ';
    segments.forEach((seg, i) => {
      legend += `${segmentChars[i % segmentChars.length]} ${seg.label || `Item ${i+1}`}:${(seg.percentage * 100).toFixed(0)}%  `;
    });

    return [...lines, legend];
  }, [data, size, total]);

  return (
    <StyledChartContainer className={`ftrst pie-chart ${className || ''}`} $s={s}>
      {title && <ChartTitle className="ftrst chart-title" $s={s}>{title}</ChartTitle>}
      <pre className="ftrst chart-content" style={{ fontFamily: 'monospace', fontSize: '0.6em', margin: 0, lineHeight: 1.2 }}>
        {pieLines.join('\n')}
      </pre>
    </StyledChartContainer>
  );
};

export default PieChart;
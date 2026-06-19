import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const chartContainerStyle = (settings) => css`
  background-color: ${settings?.button?.primaryBg || '#45475a'};
  border: ${settings?.borders?.width || '1px'} ${settings?.borders?.style || 'solid'} ${settings?.window?.borderColor || '#89b4fa'};
  padding: ${settings?.spacing?.padding || '.5em'};
  color: ${settings?.titleBar?.textColor || '#cdd6f4'};
  border-radius: 4px;
`;

const StyledChartContainer = styled.div`
  ${props => chartContainerStyle(props.$s)}
`;

const ChartTitle = styled.h4`
  margin: 0 0 0.5em 0;
  color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
  text-align: center;
`;

const BarChart = ({ data, title, maxBars = 10, styleSettings, className }) => {
  const s = useStyleSettings(styleSettings);
  const displayData = data.slice(0, maxBars);
  const maxValue = Math.max(...displayData.map(d => d.value), 1);

  return (
    <StyledChartContainer className={`ftrst bar-chart ${className || ''}`} $s={s}>
      {title && <ChartTitle className="ftrst chart-title" $s={s}>{title}</ChartTitle>}
      <div className="ftrst chart-bars">
        {displayData.map((item, i) => {
          const heightPct = (item.value / maxValue) * 100;
          return (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              marginRight: '0.5em', flex: 1
            }}>
              <span style={{ fontSize: '0.7em', marginBottom: '0.25em', color: s?.titleBar?.textColor || '#cdd6f4' }}>
                {item.value}
              </span>
              <div style={{
                width: '100%', height: '100px',
                display: 'flex', alignItems: 'flex-end',
                gap: '2px'
              }}>
                <div style={{
                  width: '100%', height: `${heightPct}%`,
                  backgroundColor: s?.window?.borderColor || '#89b4fa',
                  borderRadius: '2px 2px 0 0',
                  transition: 'height 0.3s ease'
                }} />
              </div>
              <span style={{ fontSize: '0.65em', marginTop: '0.25em', color: s?.titleBar?.textColor || '#cdd6f4' }}>
                {item.label || i}
              </span>
            </div>
          );
        })}
      </div>
    </StyledChartContainer>
  );
};

export default BarChart;
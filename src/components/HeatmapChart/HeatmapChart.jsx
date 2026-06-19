import React from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const containerStyle = (settings) => css`
  background-color: ${settings?.button?.primaryBg || '#45475a'};
  border: ${settings?.borders?.width || '1px'} ${settings?.borders?.style || 'solid'} ${settings?.window?.borderColor || '#89b4fa'};
  padding: ${settings?.spacing?.padding || '.5em'};
  color: ${settings?.titleBar?.textColor || '#cdd6f4'};
  border-radius: 4px;
`;

const StyledContainer = styled.div`${props => containerStyle(props.$s)}`;

const Title = styled.h4`
  margin: 0 0 0.5em 0; color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'}; text-align: center;
`;

const HeatmapChart = ({ data, title, styleSettings, className }) => {
  const s = useStyleSettings(styleSettings);
  const maxVal = Math.max(...data.flatMap(r => r.values || []), 1);

  return (
    <StyledContainer className={`ftrst heatmap-chart ${className || ''}`} $s={s}>
      {title && <Title className="ftrst chart-title" $s={s}>{title}</Title>}
      <div className="ftrst heatmap-grid" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {data.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            <span style={{ width: '3em', fontSize: '0.7em', textAlign: 'right', marginRight: '0.5em' }}>{row.label}</span>
            {row.values.map((v, ci) => (
              <div key={ci} style={{
                width: '2em', height: '2em', borderRadius: '2px',
                backgroundColor: v === 0 ? s?.button?.primaryBg || '#45475a' : s?.window?.borderColor || '#89b4fa',
                opacity: maxVal > 0 ? v / maxVal : 0.3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.6em',
              }} />
            ))}
          </div>
        ))}
      </div>
    </StyledContainer>
  );
};

export default HeatmapChart;
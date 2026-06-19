import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledSparkline = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
`;

const Sparkline = ({ data, width = 20, height = 4, styleSettings, className }) => {
  const s = useStyleSettings(styleSettings);
  const maxValue = Math.max(...data, 1);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const sparkline = useMemo(() => {
    if (data.length === 0) return '';
    const chars = ['\u2581', '\u2582', '\u2583', '\u2584', '\u2585', '\u2586', '\u2587', '\u2588'];
    return data.map(value => {
      const normalized = ((value - minValue) / range);
      const index = Math.min(Math.floor(normalized * chars.length), chars.length - 1);
      return chars[Math.max(index, 0)];
    }).join('');
  }, [data, maxValue, minValue, range]);

  return (
    <StyledSparkline className={`ftrst sparkline ${className || ''}`} $s={s}>
      {sparkline}
    </StyledSparkline>
  );
};

export default Sparkline;
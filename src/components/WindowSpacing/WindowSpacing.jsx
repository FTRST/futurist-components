import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledWindowSpacing = styled.div`
  padding: ${({ $s }) => $s?.spacing?.padding || '.5em'};
  background-color: rebeccapurple;
`;

const WindowSpacing = React.forwardRef(({ value, children, variant = 'default', style, styleSettings }, ref) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledWindowSpacing
      ref={ref}
      $s={s}
      className={`futurist-${variant !== 'default' ? `${variant}-` : ''}window-spacing`}
      style={style}
    >
      {value}
      {children}
    </StyledWindowSpacing>
  );
});

export default WindowSpacing;

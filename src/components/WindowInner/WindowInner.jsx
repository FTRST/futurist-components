import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledWindowInner = styled.div`
  border: 1px solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  background-color: ${({ $s }) => $s?.button?.primaryBg || '#45475a'};
  padding: ${({ $s }) => $s?.spacing?.padding || '.5em'};
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  border-radius: 4px;
`;

const WindowInner = React.forwardRef(({ value, children, variant = 'default', style, styleSettings }, ref) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledWindowInner ref={ref} $s={s} style={style}>
      {value}
      {children}
    </StyledWindowInner>
  );
});

export default WindowInner;

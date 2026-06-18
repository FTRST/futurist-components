import React from 'react';
import styled, { css } from 'styled-components';

const StyledWindowTitle = styled.h4`
  margin: 0 0 0.5em 0;
  padding: ${({ $s }) => $s?.spacing?.padding || '.5em'};
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  border-bottom: 1px solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  font-size: 0.95em;
  font-weight: 600;
`;

const WindowTitle = React.forwardRef(({ value, style, styleSettings }, ref) => (
  <StyledWindowTitle ref={ref} $s={styleSettings} style={style} className="futurist-window-title">
    {value}
  </StyledWindowTitle>
));

WindowTitle.displayName = 'WindowTitle';

export default WindowTitle;
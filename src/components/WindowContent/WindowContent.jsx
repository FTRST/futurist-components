import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledContent = styled.div`
  border: ${({ $s }) => $s?.borders?.width || '.25em'} ${({ $s }) => $s?.borders?.style || 'double'} ${({ $s }) => $s?.window?.borderColor || '#6BF178'};
  background-color: ${({ $s }) => $s?.window?.backgroundColor || '#02111B'};
  padding: ${({ $s }) => $s?.spacing?.padding || '.75em'};
  color: ${({ $s }) => $s?.titleBar?.textColor || '#6BF178'};
  box-sizing: border-box;
`;

const WindowContent = React.forwardRef(({ children, style, styleSettings, ...props }, ref) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledContent ref={ref} $s={s} style={style} className="futurist-window-content" {...props}>
      {children}
    </StyledContent>
  );
});

WindowContent.displayName = 'WindowContent';
export default WindowContent;
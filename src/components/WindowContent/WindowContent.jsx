import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledContent = styled.div`
  border: ${({ $s }) => $s?.borders?.width || '1px'} ${({ $s }) => $s?.borders?.style || 'solid'} ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  background-color: ${({ $s }) => $s?.window?.backgroundColor || '#1e1e2e'};
  padding: ${({ $s }) => $s?.spacing?.padding || '.75em'};
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
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
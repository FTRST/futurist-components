import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.div`
  /* Combines the visual effect of WindowInset + WindowSpacing + WindowInner */
  border: ${({ $s }) => $s?.borders?.width || '.25em'} ${({ $s }) => $s?.borders?.style || 'double'} ${({ $s }) => $s?.window?.borderColor || '#6BF178'};
  background-color: ${({ $s }) => $s?.window?.backgroundColor || '#02111B'};
  padding: ${({ $s }) => $s?.spacing?.padding || '.75em'};
  color: ${({ $s }) => $s?.titleBar?.textColor || '#6BF178'};
  box-sizing: border-box;
`;

const WindowContent = React.forwardRef(({ children, style, styleSettings, ...props }, ref) => (
  <StyledContent
    ref={ref}
    $s={styleSettings}
    style={style}
    className="futurist-window-content"
    {...props}
  >
    {children}
  </StyledContent>
));

WindowContent.displayName = 'WindowContent';

export default WindowContent;
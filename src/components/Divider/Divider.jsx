import React from 'react';
import styled from 'styled-components';

const StyledDivider = styled.hr`
  border: none;
  margin: ${({ $s }) => $s?.spacing?.padding || '.75em'} 0;
  height: 1px;
  background-color: ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  opacity: 0.3;
`;

const Divider = React.forwardRef(({ style, styleSettings }, ref) => (
  <StyledDivider ref={ref} $s={styleSettings} style={style} className="futurist-divider" />
));

Divider.displayName = 'Divider';

export default Divider;
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledSpinner = styled.span`
  display: inline-block;
  width: ${({ $size }) => $size || '1.2em'};
  height: ${({ $size }) => $size || '1.2em'};
  border: 2px solid ${({ $s }) => $s?.button?.primaryBg || '#45475a'};
  border-top-color: ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  box-sizing: border-box;
  vertical-align: middle;
`;

const Spinner = React.forwardRef(({ size, style, styleSettings }, ref) => (
  <StyledSpinner ref={ref} $s={styleSettings} $size={size} style={style} className="futurist-spinner" />
));

Spinner.displayName = 'Spinner';

export default Spinner;
import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledWindowInset = styled.div`
  background-color: ${({ $s }) => $s?.button?.primaryBg || '#45475a'};
  margin: ${({ $s }) => $s?.spacing?.margin || '.5em'} ${({ $s }) => $s?.spacing?.margin || '.25em'} ${({ $s }) => $s?.spacing?.margin || '.25em'};
  padding: ${({ $s }) => $s?.spacing?.padding || '.25em'};
  border: 1px solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  border-radius: 4px;
`;

const WindowInset = React.forwardRef(({ value, children, variant = 'default', style, styleSettings }, ref) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledWindowInset
      ref={ref}
      $s={s}
      className={`futurist-${variant !== 'default' ? `${variant}-` : ''}window-inset`}
      style={style}
    >
      {value}
      {children}
    </StyledWindowInset>
  );
});

export default WindowInset;

import React from 'react';
import styled, { css } from 'styled-components';

const buttonStyles = {
  default: css`
    color: #6BF178;
    background-color: #02111B;
    padding: 0.5em;
    border: outset medium #6BF178;
    outline: solid .1em #02111B;
  `,
  inverted: css`
    color: #02111B;
    background-color: #6BF178;
    border: outset medium #6BF178;
    padding: .5em;
    outline: solid .1em #02111B;
  `
};

const StyledButton = styled.button`
  ${props => buttonStyles[props.variant || 'default']}
  ${props => props.additionalStyles}
  ${props => props.dataUrl}
  ${props => props.value}
`;

// Using React.forwardRef with TypeScript generics to define ref and props types
const Button = React.forwardRef(({ label, action, variant = 'default', style, dataUrl = null, value = null }, ref) => (
  <StyledButton
    onClick={action}
    ref={ref}
    variant={variant}
    additionalStyles={style}
    data-url={dataUrl}
    value={value}
    className={`futurist-${variant !== 'default' ? `${variant}-`: ''}button`}
  >
    {label}
  </StyledButton>
));

export default Button;
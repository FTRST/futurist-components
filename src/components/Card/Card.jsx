import React from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const cardStyle = (settings) => css`
  background-color: ${settings?.button?.primaryBg || '#45475a'};
  border: ${settings?.borders?.width || '1px'} ${settings?.borders?.style || 'solid'} ${settings?.window?.borderColor || '#89b4fa'};
  padding: ${settings?.spacing?.padding || '.75em'};
  color: ${settings?.titleBar?.textColor || '#cdd6f4'};
  border-radius: 4px;
`;

const StyledCard = styled.div`
  ${props => cardStyle(props.$s)}
  ${props => props.$as}
`;

const CardHeader = styled.h3`
  margin-top: 0;
  color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
  border-bottom: ${props => props.$s?.borders?.width || '1px'} solid ${props => props.$s?.window?.borderColor || '#89b4fa'};
  padding-bottom: 0.5em;
`;

const CardBody = styled.div`
  color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
`;

const CardFooter = styled.div`
  margin-top: 0.5em;
  padding-top: 0.5em;
  border-top: ${props => props.$s?.borders?.width || '1px'} solid ${props => props.$s?.window?.borderColor || '#89b4fa'};
  display: flex;
  gap: 0.5em;
`;

const Card = ({ header, children, footer, styleSettings, additionalStyles, className }) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledCard className={`ftrst card ${className || ''}`} $s={s} $as={additionalStyles}>
      {header && <CardHeader className="ftrst card-header" $s={s}>{header}</CardHeader>}
      <CardBody className="ftrst card-body" $s={s}>{children}</CardBody>
      {footer && <CardFooter className="ftrst card-footer" $s={s}>{footer}</CardFooter>}
    </StyledCard>
  );
};

export default Card;
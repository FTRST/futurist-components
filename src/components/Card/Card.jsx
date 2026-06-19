import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledCard = styled.div`
  background-color: ${({ $s }) => $s?.button?.primaryBg || '#45475a'};
  border: ${({ $s }) => $s?.borders?.width || '1px'} ${({ $s }) => $s?.borders?.style || 'solid'} ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  padding: ${({ $s }) => $s?.spacing?.padding || '.75em'};
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  border-radius: 4px;
`;

const CardHeader = styled.h3`
  margin-top: 0;
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  border-bottom: ${({ $s }) => $s?.borders?.width || '1px'} solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  padding-bottom: 0.5em;
`;

const CardBody = styled.div`
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
`;

const CardFooter = styled.div`
  margin-top: 0.5em;
  padding-top: 0.5em;
  border-top: ${({ $s }) => $s?.borders?.width || '1px'} solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  display: flex;
  gap: 0.5em;
`;

const Card = ({ header, children, footer, styleSettings, style, className }) => {
  const s = useStyleSettings(styleSettings);
  return (
    <StyledCard className={`ftrst card ${className || ''}`} $s={s} style={style}>
      {header && <CardHeader className="ftrst card-header" $s={s}>{header}</CardHeader>}
      <CardBody className="ftrst card-body" $s={s}>{children}</CardBody>
      {footer && <CardFooter className="ftrst card-footer" $s={s}>{footer}</CardFooter>}
    </StyledCard>
  );
};

export default Card;
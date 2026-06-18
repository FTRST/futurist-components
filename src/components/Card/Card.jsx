import React from 'react';
import styled, { css } from 'styled-components';

const cardStyle = (settings) => css`
  background-color: ${settings?.button?.primaryBg || '#02111B'};
  border: ${settings?.borders?.width || '.15em'} ${settings?.borders?.style || 'solid'} ${settings?.window?.borderColor || '#6BF178'};
  padding: ${settings?.spacing?.padding || '.5em'};
  color: ${settings?.titleBar?.textColor || '#6bf178'};
`;

const StyledCard = styled.div`
  ${props => cardStyle(props.styleSettings)}
  ${props => props.additionalStyles}
`;

const CardHeader = styled.h3`
  margin-top: 0;
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  border-bottom: ${props => props.theme?.borders?.width || '.1em'} solid ${props => props.theme?.window?.borderColor || '#6bf178'};
  padding-bottom: 0.5em;
`;

const CardBody = styled.div`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
`;

const CardFooter = styled.div`
  margin-top: 0.5em;
  padding-top: 0.5em;
  border-top: ${props => props.theme?.borders?.width || '.1em'} solid ${props => props.theme?.window?.borderColor || '#6bf178'};
  display: flex;
  gap: 0.5em;
`;

const Card = ({ header, children, footer, styleSettings, additionalStyles, className }) => (
  <StyledCard 
    className={`ftrst card ${className || ''}`}
    styleSettings={styleSettings}
    additionalStyles={additionalStyles}
  >
    {header && <CardHeader className="ftrst card-header" theme={styleSettings}>{header}</CardHeader>}
    <CardBody className="ftrst card-body" theme={styleSettings}>
      {children}
    </CardBody>
    {footer && <CardFooter className="ftrst card-footer" theme={styleSettings}>{footer}</CardFooter>}
  </StyledCard>
);

export default Card;

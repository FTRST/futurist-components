import React from 'react';
import styled, { css } from 'styled-components';

const alertStyle = (settings) => css`
  padding: ${settings?.spacing?.padding || '.5em'};
  border: ${settings?.borders?.width || '.15em'} ${settings?.borders?.style || 'solid'};
  margin-bottom: ${settings?.spacing?.margin || '.5em'};
`;

const StyledAlert = styled.div`
  ${props => alertStyle(props.styleSettings)}
  
  &.ftrst-alert-info {
    border-color: #6bf178;
    background-color: rgba(107, 241, 120, 0.1);
  }
  
  &.ftrst-alert-success {
    border-color: #6bf178;
    background-color: rgba(107, 241, 120, 0.15);
  }
  
  &.ftrst-alert-warning {
    border-color: #ffaa00;
    background-color: rgba(255, 170, 0, 0.1);
  }
  
  &.ftrst-alert-error {
    border-color: #f50000;
    background-color: rgba(245, 0, 0, 0.1);
  }
`;

const AlertTitle = styled.h4`
  margin: 0 0 0.5em 0;
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  font-size: 1em;
`;

const AlertMessage = styled.p`
  margin: 0;
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  font-size: 0.875em;
  line-height: 1.4;
`;

const AlertCloseButton = styled.button`
  float: right;
  background: transparent;
  border: none;
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  cursor: pointer;
  font-size: 1.25em;
  padding: 0 0.25em;
`;

const Alert = ({ type = 'info', title, message, onClose, styleSettings, className }) => {
  const alertClass = `ftrst-alert-${type}`;

  return (
    <StyledAlert 
      className={`ftrst alert ${alertClass} ${className || ''}`}
      styleSettings={styleSettings}
    >
      {onClose && (
        <AlertCloseButton 
          className="ftrst alert-close"
          onClick={onClose}
          theme={styleSettings}
        >
          ×
        </AlertCloseButton>
      )}
      {title && <AlertTitle className="ftrst alert-title" theme={styleSettings}>{title}</AlertTitle>}
      {message && <AlertMessage className="ftrst alert-message" theme={styleSettings}>{message}</AlertMessage>}
    </StyledAlert>
  );
};

export default Alert;

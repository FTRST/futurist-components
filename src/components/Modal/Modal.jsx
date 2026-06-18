import React from 'react';
import styled, { css } from 'styled-components';

const modalOverlayStyle = (settings) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
`;

const StyledModalOverlay = styled.div`
  ${props => modalOverlayStyle(props.styleSettings)}
`;

const modalContentStyle = (settings) => css`
  background-color: ${settings?.window?.backgroundColor || 'rgba(2,17,27,.9)'};
  border: ${settings?.borders?.width || '.25em'} ${settings?.borders?.style || 'double'} ${settings?.window?.borderColor || '#6BF178'};
  padding: ${settings?.spacing?.padding || '.5em'};
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
`;

const StyledModalContent = styled.div`
  ${props => modalContentStyle(props.styleSettings)}
`;

const ModalHeader = styled.h3`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  margin-top: 0;
  border-bottom: ${props => props.theme?.borders?.width || '.1em'} solid ${props => props.theme?.window?.borderColor || '#6bf178'};
  padding-bottom: 0.5em;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5em;
  margin-top: 1em;
  padding-top: 0.5em;
  border-top: ${props => props.theme?.borders?.width || '.1em'} solid ${props => props.theme?.window?.borderColor || '#6bf178'};
`;

const Modal = ({ isOpen, onClose, title, children, footer, styleSettings }) => {
  if (!isOpen) return null;

  return (
    <StyledModalOverlay 
      className="ftrst modal-overlay"
      onClick={onClose}
      styleSettings={styleSettings}
    >
      <StyledModalContent 
        className="ftrst modal-content"
        onClick={(e) => e.stopPropagation()}
        styleSettings={styleSettings}
      >
        {title && (
          <ModalHeader className="ftrst modal-header" theme={styleSettings}>
            {title}
          </ModalHeader>
        )}
        <div className="ftrst modal-body">
          {children}
        </div>
        {footer && (
          <ModalFooter className="ftrst modal-footer" theme={styleSettings}>
            {footer}
          </ModalFooter>
        )}
      </StyledModalContent>
    </StyledModalOverlay>
  );
};

export default Modal;

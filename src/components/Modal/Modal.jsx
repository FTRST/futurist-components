import React from 'react';
import styled from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
`;

const StyledModalContent = styled.div`
  background-color: ${({ $s }) => $s?.window?.backgroundColor || '#1e1e2e'};
  border: ${({ $s }) => $s?.borders?.width || '1px'} ${({ $s }) => $s?.borders?.style || 'solid'} ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  padding: ${({ $s }) => $s?.spacing?.padding || '.75em'};
  border-radius: 4px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
`;

const ModalHeader = styled.h3`
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  margin-top: 0;
  border-bottom: ${({ $s }) => $s?.borders?.width || '1px'} solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  padding-bottom: 0.5em;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5em;
  margin-top: 1em;
  padding-top: 0.5em;
  border-top: ${({ $s }) => $s?.borders?.width || '1px'} solid ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
`;

const Modal = ({ isOpen, onClose, title, children, footer, styleSettings }) => {
  const s = useStyleSettings(styleSettings);
  if (!isOpen) return null;

  return (
    <StyledModalOverlay className="ftrst modal-overlay" onClick={onClose} $s={s}>
      <StyledModalContent className="ftrst modal-content" onClick={(e) => e.stopPropagation()} $s={s}>
        {title && <ModalHeader className="ftrst modal-header" $s={s}>{title}</ModalHeader>}
        <div className="ftrst modal-body">{children}</div>
        {footer && <ModalFooter className="ftrst modal-footer" $s={s}>{footer}</ModalFooter>}
      </StyledModalContent>
    </StyledModalOverlay>
  );
};

export default Modal;
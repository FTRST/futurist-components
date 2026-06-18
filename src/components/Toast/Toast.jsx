import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

const toastContainerStyle = css`
  position: fixed;
  top: 1em;
  right: 1em;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const StyledToastContainer = styled.div`
  ${toastContainerStyle}
`;

const toastStyle = (settings) => css`
  background-color: ${settings?.window?.backgroundColor || 'rgba(2,17,27,.95)'};
  border: ${settings?.borders?.width || '.15em'} ${settings?.borders?.style || 'solid'} ${settings?.window?.borderColor || '#6BF178'};
  padding: ${settings?.spacing?.padding || '.5em'} ${settings?.spacing?.padding || '.75em'};
  color: ${settings?.titleBar?.textColor || '#6bf178'};
  min-width: 200px;
  max-width: 300px;
  animation: slideIn 0.3s ease-out;
`;

const StyledToast = styled.div`
  ${props => toastStyle(props.styleSettings)}
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ToastMessage = styled.span`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
`;

const ToastCloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  cursor: pointer;
  padding: 0 0.25em;
  font-weight: bold;
`;

const Toast = ({ id, message, duration = 3000, onClose, styleSettings }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <StyledToast 
      className="ftrst toast"
      styleSettings={styleSettings}
    >
      <ToastMessage className="ftrst toast-message" theme={styleSettings}>
        {message}
      </ToastMessage>
      <ToastCloseButton 
        className="ftrst toast-close"
        onClick={() => onClose(id)}
        theme={styleSettings}
      >
        ×
      </ToastCloseButton>
    </StyledToast>
  );
};

const ToastProvider = ({ children, styleSettings }) => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (message, duration) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  React.useEffect(() => {
    window.ftrstToast = {
      show: (message, duration) => addToast(message, duration),
      success: (message, duration) => addToast(`✓ ${message}`, duration),
      error: (message, duration) => addToast(`✗ ${message}`, duration),
      info: (message, duration) => addToast(`ℹ ${message}`, duration)
    };
  }, [addToast]);

  return (
    <>
      <StyledToastContainer 
        className="ftrst toast-container"
        styleSettings={styleSettings}
      >
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={removeToast}
            styleSettings={styleSettings}
          />
        ))}
      </StyledToastContainer>
      {children}
    </>
  );
};

export { ToastProvider };
export default Toast;

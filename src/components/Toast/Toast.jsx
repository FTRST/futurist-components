import React from 'react';
import styled, { css } from 'styled-components';
import { useStyleSettings } from '../../hooks/useStyleSettings';

const StyledToast = styled.div`
  background-color: ${({ $s }) => $s?.window?.backgroundColor || '#1e1e2e'};
  border: ${({ $s }) => $s?.borders?.width || '1px'} ${({ $s }) => $s?.borders?.style || 'solid'} ${({ $s }) => $s?.window?.borderColor || '#89b4fa'};
  padding: ${({ $s }) => $s?.spacing?.padding || '.5em'} ${({ $s }) => $s?.spacing?.padding || '.75em'};
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  min-width: 200px;
  max-width: 300px;
  border-radius: 4px;
  display: flex;
  gap: 0.5em;
  align-items: center;
  animation: slideIn 0.3s ease-out;
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
`;

const ToastCloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ $s }) => $s?.titleBar?.textColor || '#cdd6f4'};
  cursor: pointer;
  padding: 0 0.25em;
  font-weight: bold;
  opacity: 0.6;
  margin-left: auto;
  &:hover { opacity: 1; }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 1em;
  right: 1em;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const Toast = ({ id, message, onClose, styleSettings }) => {
  const s = useStyleSettings(styleSettings);
  React.useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <StyledToast className="ftrst toast" $s={s}>
      <span className="ftrst toast-message">{message}</span>
      <ToastCloseButton className="ftrst toast-close" onClick={() => onClose(id)} $s={s}>×</ToastCloseButton>
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

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  React.useEffect(() => {
    window.ftrstToast = {
      show: (msg, dur) => addToast(msg, dur),
      success: (msg, dur) => addToast(`\u2713 ${msg}`, dur),
      error: (msg, dur) => addToast(`\u2717 ${msg}`, dur),
      info: (msg, dur) => addToast(`\u2139 ${msg}`, dur),
    };
  }, [addToast]);

  return (
    <>
      <ToastContainer $s={styleSettings}>
        {toasts.map(t => <Toast key={t.id} {...t} onClose={removeToast} styleSettings={styleSettings} />)}
      </ToastContainer>
      {children}
    </>
  );
};

export { ToastProvider };
export default Toast;
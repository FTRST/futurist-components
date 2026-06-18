import React from 'react';
import styled, { css } from 'styled-components';

const titleBarStyle = (settings) => css`
  display: flex;
  background-color: ${settings?.titleBar?.backgroundColor || '#181825'};
  color: ${settings?.titleBar?.textColor || '#cdd6f4'};
  border-bottom: ${settings?.borders?.style || 'solid'} ${settings?.borders?.width || '1px'} ${settings?.window?.borderColor || '#89b4fa'};
`;

const StyledTitleBar = styled.strong`
  ${props => titleBarStyle(props.$s)}
  ${props => props.$as}
`;

const StyledTitle = styled.div`
  width: 100%;
  margin: auto;
  padding: 0.5em 0.75em;
  font-size: 0.9em;
`;

const btnBase = (settings) => css`
  margin: 0.3em;
  z-index: 999999;
  font-weight: 700;
  font-size: 0.8em;
  cursor: pointer;
  line-height: 1;
  padding: 0.25em 0.5em;
  border: ${settings?.borders?.style || 'solid'} ${settings?.borders?.width || '1px'} ${settings?.window?.borderColor || '#89b4fa'};
  border-radius: 3px;
  transition: opacity 0.15s;
  &:hover { opacity: 0.8; }
`;

const StyledCloseButton = styled.button`
  ${props => btnBase(props.$s)}
  color: ${props => props.$s?.titleBar?.backgroundColor || '#181825'};
  background-color: ${props => props.$s?.window?.borderColor || '#89b4fa'};
`;

const StyledMaximizeButton = styled.button`
  ${props => btnBase(props.$s)}
  color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
  background-color: ${props => props.$s?.button?.primaryBg || '#45475a'};
`;

const StyledMinimizeButton = styled.button`
  ${props => btnBase(props.$s)}
  color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
  background-color: ${props => props.$s?.button?.primaryBg || '#45475a'};
`;

const TitleBar = React.forwardRef(({ title, expandAction, closeAction, minimizeAction, style, maximize = false, styleSettings }, ref) => (
  <StyledTitleBar
    className="modal-title-bar"
    ref={ref}
    $as={style}
    $s={styleSettings}
  >
    {!maximize ? (
      <StyledMaximizeButton
        className="modal-maximize"
        onClick={expandAction}
        onTouchStart={expandAction}
        $s={styleSettings}
        title="Maximize"
      >
        ⛶
      </StyledMaximizeButton>
    ) : (
      <StyledMinimizeButton
        className="modal-maximize"
        onClick={minimizeAction}
        onTouchStart={minimizeAction}
        $s={styleSettings}
        title="Minimize"
      >
        ⤡
      </StyledMinimizeButton>
    )}
    <StyledTitle className="modal-title">
      {title}
    </StyledTitle>
    <StyledCloseButton
      className="modal-close"
      onClick={closeAction}
      onTouchStart={closeAction}
      $s={styleSettings}
      title="Close"
    >
      ✕
    </StyledCloseButton>
  </StyledTitleBar>
));

TitleBar.displayName = 'TitleBar';

export default TitleBar;
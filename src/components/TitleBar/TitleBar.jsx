// src/components/TitleBar/TitleBar.jsx
import React from 'react';
import styled, { css } from 'styled-components';

const titleBarStyle = (settings) => css`
  display: flex;
  background-color: ${settings?.titleBar?.backgroundColor || '#02111b'};
  color: ${settings?.titleBar?.textColor || '#6bf178'};
  border-bottom: ${settings?.borders?.style || 'double'} ${settings?.borders?.width || '0.1em'} ${settings?.window?.borderColor || '#6bf178'};
`;

const StyledTitleBar = styled.strong`
  ${props => titleBarStyle(props.styleSettings)}
  ${props => props.additionalStyle}
`;

const titleTrayStyle = {
  default: css`
    max-width: 100%;
    display: flex;
  `
};

const StyledTitleTray = styled.div`
  ${props => titleTrayStyle[props.variant || 'default']}
`;

const titleStyle = {
  default: css`
    width: 100%;
    margin: auto;
    padding: 0.75em;
  `
};

const StyledTitle = styled.div`
  ${props => titleStyle[props.variant || 'default']}
`;

const closeButtonStyle = (settings) => css`
  margin: auto;
  z-index: 999999;
  margin-right: 1vh;
  color: ${settings?.button?.primaryBg || '#02111B'};
  background-color: ${settings?.window?.borderColor || '#F50000'};
  border: outset ${settings?.borders?.width || '.15em'} ${settings?.window?.borderColor || '#6BF178'};
  font-weight: 700;
`;

const StyledCloseButton = styled.button`
  ${props => closeButtonStyle(props.styleSettings)}
`;

const maximizeButtonStyle = (settings) => css`
  margin: auto;
  background-color: blue;
  color: ${settings?.titleBar?.textColor || '#6bf178'};
  margin-right: 0;
  margin-left: 1vh;
  z-index: 999999;
  border: outset ${settings?.borders?.width || '.15em'} ${settings?.window?.borderColor || '#6bf178'};
  font-weight: 700;
`;

const StyledMaximizeButton = styled.button`
  ${props => maximizeButtonStyle(props.styleSettings)}
`;

const minimizeButtonStyle = (settings) => css`
  margin: auto;
  background-color: yellow;
  color: ${settings?.button?.primaryBg || '#02111b'};
  margin-right: 0;
  margin-left: 1vh;
  z-index: 999999;
  border: outset ${settings?.borders?.width || '.15em'} ${settings?.window?.borderColor || '#6BF178'};
  font-weight: 700;
`;

const StyledMinimizeButton = styled.button`
  ${props => minimizeButtonStyle(props.styleSettings)}
`;

const TitleBar = React.forwardRef(({ title, expandAction, closeAction, minimizeAction, variant = "default", style, maximize = false, styleSettings, className }, ref) => (
  <StyledTitleBar 
    className={`ftrst title-bar modal-title-bar ${variant !== 'default' ? `${variant}-` : ''}${className || ''}`}
    ref={ref} 
    variant={variant}
    additionalStyle={style}
    styleSettings={styleSettings}
  >
    {
      !maximize ? (
        <>
          <StyledMaximizeButton 
            className="ftrst maximize-button modal-maximize"
            onClick={expandAction} 
            onTouchStart={expandAction}
            styleSettings={styleSettings}
          >
            O
          </StyledMaximizeButton>
        </>
      )
      :
        <>
          <StyledMinimizeButton 
            className="ftrst minimize-button modal-maximize"
            onClick={minimizeAction} 
            onTouchStart={minimizeAction}
            styleSettings={styleSettings}
          >
            .
          </StyledMinimizeButton>
        </>
    }
    <StyledTitle
      className="ftrst title modal-title"
    >
      {title}
    </StyledTitle>
    <StyledTitleTray className="ftrst title-tray">
      <StyledCloseButton
        className="ftrst close-button modal-close"
        onClick={closeAction}
        onTouchStart={closeAction}
        styleSettings={styleSettings}
      >
        X
      </StyledCloseButton>
    </StyledTitleTray>
  </StyledTitleBar>
));

export default TitleBar;

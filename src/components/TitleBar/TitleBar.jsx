// src/components/TitleBar/TitleBar.jsx
import React from 'react';
import styled, { css } from 'styled-components';

const titleBarStyle = {
  default: css`
    display: flex;
    background-color: #02111b;
    color: #6bf178;
    border-bottom: solid 0.1em #6bf178;
  `
};

const StyledTitleBar = styled.strong`
  ${props => titleBarStyle[props.variant || 'default']}
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

const closeButtonStyle = {
  default: css`
    margin: auto;
    z-index: 999999;
    margin-right: 1vh;
    color: #02111B;
    background-color: #F50000;
    border: outset .15em #6BF178;
    font-weight: 700;
  `
};

const StyledCloseButton = styled.button`
  ${props => closeButtonStyle[props.variant || 'default']}
`;

const maximizeButtonStyle = {
  default: css`
    margin: auto;
    background-color: #02111b;
    color: #6bf178;
    margin-right: 0;
    margin-left: 1vh;
    z-index: 999999;
    border: outset .15em #6bf178;
    font-weight: 700;
  `
};

const StyledMaximizeButton = styled.button`
  ${props => maximizeButtonStyle[props.variant || 'default']}
`;

const minimizeButtonStyle = {
  default: css`
    margin: auto;
    background-color: yellow;
    color: #02111b;
    margin-right: 0;
    margin-left: 1vh;
    z-index: 999999;
    border: outset .15em #6bf178;
    font-weight: 700;
  `
};

const StyledMinimizeButton = styled.button`
  ${props => minimizeButtonStyle[props.variant || 'default']}
`;

const TitleBar = React.forwardRef(({ title, expandAction, closeAction, minimizeAction, variant = "default", style, maximize = false}, ref) => (
  <StyledTitleBar prevHeight
    className="modal-title-bar"
    ref={ref} 
    variant={variant}
    additionalStyle={style}
  >
    {
      !maximize ? (
        <>
          <StyledMaximizeButton 
            className="modal-maximize"
            onClick={expandAction} 
            onTouchStart={expandAction}
          >
            O
          </StyledMaximizeButton>
        </>
      )
      :
        <>
          <StyledMinimizeButton 
            className="modal-maximize"
            onClick={minimizeAction} 
            onTouchStart={minimizeAction}
          >
            .
          </StyledMinimizeButton>
        </>
    }
    <StyledTitle
      className="modal-title"
    >
      {title}
    </StyledTitle>
    <StyledTitleTray>
      <StyledCloseButton
        className="modal-close"
        onClick={closeAction}
        onTouchStart={closeAction}
      >
        X
      </StyledCloseButton>
    </StyledTitleTray>
  </StyledTitleBar>
));

export default TitleBar;

// src/components/TabContainer/TabContainer.jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const baseContainer = {
    default: css`
        display: grid;
        border: solid .15em #02111B;
        padding: .5em;
        background-color: #6bf178;
        box-shadow: .25em .25em #02111B;
        color: #6BF178;
    `
};

const StyledBaseContainer = styled.div`
  ${props => baseContainer[props.variant || 'default']}
  ${props => props.additionalStyle}
`;

const BaseContainer = ({ children, style }) => {

    return (
        <>
            <StyledBaseContainer additionalStyle={style}>
                { children }
            </StyledBaseContainer>
        </>
    );
};

export default BaseContainer;
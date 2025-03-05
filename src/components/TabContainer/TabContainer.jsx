// src/components/TabContainer/TabContainer.jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Tab from '../Tab/Tab';  // Ensure this path is correct

const tabs = {
    default: css`
        display: flex;
    `
};

const StyledTabs = styled.div`
  ${props => tabs[props.variant || 'default']}
`;

const tabContainer = {
    default: css`
        display: grid;
        border: solid .15em #02111B;
        padding: .5em;
        background-color: #6bf178;
        box-shadow: .25em .25em #02111B;
        color: #6BF178;
    `
};

const StyledTabContainer = styled.div`
  ${props => tabContainer[props.variant || 'default']}
  ${props => props.additionalStyle}
`;

const TabContainer = ({ tabComponents, style }) => {
    const [activeTab, setActiveTab] = useState(Object.keys(tabComponents)[0]); // Default to the first tab

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const ActiveComponent = tabComponents[activeTab];

    return (
        <>
            <StyledTabs>
                {Object.keys(tabComponents).map(tabName => (
                    <Tab
                        key={tabName}
                        label={tabName}
                        action={() => handleTabClick(tabName)}
                        selected={activeTab === tabName}
                    />
                ))}
            </StyledTabs>
            <StyledTabContainer additionalStyle={style}>
                {ActiveComponent ? <ActiveComponent /> : null}
            </StyledTabContainer>
        </>
    );
};

export default TabContainer;
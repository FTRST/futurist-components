import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Tab from '../Tab/Tab';

const tabs = {
    default: css`
        display: flex;
    `
};

const StyledTabs = styled.div`
  ${props => tabs[props.variant || 'default']}
`;

const tabContainer = (settings) => ({
    default: css`
        display: grid;
        border: ${settings?.borders?.style || 'solid'} ${settings?.borders?.width || '.15em'} ${settings?.window?.borderColor || '#6bf178'};
        padding: ${settings?.spacing?.padding || '.5em'};
        background-color: #6bf178;
        box-shadow: ${settings?.spacing?.margin || '.25em'} ${settings?.spacing?.margin || '.25em'} ${settings?.button?.primaryBg || '#02111B'};
        color: ${settings?.titleBar?.textColor || '#6BF178'};
    `
});

const StyledTabContainer = styled.div`
  ${props => tabContainer(props.styleSettings)[props.variant || 'default']}
  ${props => props.additionalStyle}
`;

const TabContainer = ({ tabComponents, style, styleSettings, className }) => {
    const [activeTab, setActiveTab] = useState(Object.keys(tabComponents)[0]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const ActiveComponent = tabComponents[activeTab];

    return (
        <>
            <StyledTabs className="ftrst tabs">
                {Object.keys(tabComponents).map(tabName => (
                    <Tab
                        key={tabName}
                        label={tabName}
                        action={() => handleTabClick(tabName)}
                        selected={activeTab === tabName}
                        styleSettings={styleSettings}
                    />
                ))}
            </StyledTabs>
            <StyledTabContainer 
                additionalStyle={style} 
                styleSettings={styleSettings}
                className={`ftrst tab-container ${className || ''}`}
            >
                {ActiveComponent ? <ActiveComponent /> : null}
            </StyledTabContainer>
        </>
    );
};

export default TabContainer;

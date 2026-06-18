import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Tab from '../Tab/Tab';

const StyledTabs = styled.div`
  display: flex;
  gap: 0.25em;
  padding: 0.25em 0.25em 0 0.25em;
  background: ${props => props.$s?.titleBar?.backgroundColor || '#181825'};
  border-bottom: 1px solid ${props => props.$s?.window?.borderColor || '#89b4fa'};
`;

const StyledTabContainer = styled.div`
  border: 1px solid ${props => props.$s?.window?.borderColor || '#89b4fa'};
  border-top: none;
  padding: ${props => props.$s?.spacing?.padding || '.75em'};
  background-color: ${props => props.$s?.window?.backgroundColor || '#1e1e2e'};
  color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
`;

const TabContainer = ({ tabComponents, style, styleSettings }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabComponents)[0]);

  const ActiveComponent = tabComponents[activeTab];

  return (
    <>
      <StyledTabs $s={styleSettings}>
        {Object.keys(tabComponents).map(tabName => (
          <Tab
            key={tabName}
            label={tabName}
            action={() => setActiveTab(tabName)}
            selected={activeTab === tabName}
            styleSettings={styleSettings}
          />
        ))}
      </StyledTabs>
      <StyledTabContainer additionalStyle={style} $s={styleSettings}>
        {ActiveComponent ? <ActiveComponent /> : null}
      </StyledTabContainer>
    </>
  );
};

export default TabContainer;
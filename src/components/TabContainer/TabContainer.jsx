import React, { useState } from 'react';
import styled from 'styled-components';
import Tab from '../Tab/Tab';
import { useStyleSettings } from '../../hooks/useStyleSettings';

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
  /* Subtle lightening overlay so content area is distinguishable from tab bar */
  background-image: linear-gradient(rgba(255,255,255,0.04), rgba(255,255,255,0.04));
  color: ${props => props.$s?.titleBar?.textColor || '#cdd6f4'};
`;

const TabContainer = ({ tabComponents, style, styleSettings }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabComponents)[0]);
  const s = useStyleSettings(styleSettings);
  const ActiveComponent = tabComponents[activeTab];

  return (
    <>
      <StyledTabs $s={s}>
        {Object.keys(tabComponents).map(tabName => (
          <Tab key={tabName} label={tabName} action={() => setActiveTab(tabName)} selected={activeTab === tabName} styleSettings={s} />
        ))}
      </StyledTabs>
      <StyledTabContainer additionalStyle={style} $s={s}>
        {ActiveComponent ? <ActiveComponent /> : null}
      </StyledTabContainer>
    </>
  );
};

export default TabContainer;
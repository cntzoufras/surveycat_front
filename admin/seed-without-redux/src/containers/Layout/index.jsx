import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { paddingLeft } from '@/utils/directions';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';

const Layout = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const changeSidebarVisibility = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const changeMobileSidebarVisibility = () => {
    setIsSidebarShown(!isSidebarShown);
  };

  return (
    <LayoutContainer collapse={isSidebarCollapsed}>
      <Topbar
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}
        changeSidebarVisibility={changeSidebarVisibility}
      />
      <Sidebar
        sidebarShow={isSidebarShown}
        collapse={isSidebarCollapsed}
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}
      />
    </LayoutContainer>
  );
};

export default withRouter(Layout);

// region STYLES

const LayoutContainer = styled.div`
  
  & + div {
    ${props => props.collapse && `
      ${paddingLeft(props)}: 0;
    `};

    @media screen and (min-width: 576px) {
      ${props => props.collapse && `
        ${paddingLeft(props)}: 60px;
      `}
    }
  }
`;

// endregion

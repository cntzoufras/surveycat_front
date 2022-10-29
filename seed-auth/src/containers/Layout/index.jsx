import React from 'react';
import { withRouter } from 'react-router-dom';
import { changeThemeToDark, changeThemeToLight } from '@/redux/actions/themeActions';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '@/redux/actions/sidebarActions';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { paddingLeft } from '@/utils/directions';
import Sidebar from './sidebar/Sidebar';
import Topbar from './topbar/Topbar';

const Layout = () => {
  const sidebar = useSelector(state => state.sidebar);

  const dispatch = useDispatch();

  const sidebarVisibility = () => {
    dispatch(changeSidebarVisibility());
  };

  const mobileSidebarVisibility = () => {
    dispatch(changeMobileSidebarVisibility());
  };

  const changeToDark = () => {
    dispatch(changeThemeToDark());
  };

  const changeToLight = () => {
    dispatch(changeThemeToLight());
  };

  return (
    <LayoutContainer collapse={sidebar.collapse}>
      <Topbar
        changeMobileSidebarVisibility={mobileSidebarVisibility}
        changeSidebarVisibility={sidebarVisibility}
      />
      <Sidebar
        collapse={sidebar.collapse}
        changeToDark={changeToDark}
        changeToLight={changeToLight}
        changeMobileSidebarVisibility={mobileSidebarVisibility}
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

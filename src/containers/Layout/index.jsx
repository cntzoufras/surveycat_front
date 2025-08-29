import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { paddingLeft } from '@/utils/directions';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '@/redux/actions/sidebarActions';
import { changeThemeToDark, changeThemeToLight } from '@/redux/actions/themeActions';
import { useLocation } from 'react-router-dom';
import Topbar from './topbar/Topbar';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import Sidebar from './components/sidebar/Sidebar';
import Customizer from './customizer/Customizer';
import WelcomeNotification from './components/WelcomeNotification';

const Layout = () => {
  const [isNotificationShown, setIsNotificationShown] = useState(
    () => sessionStorage.getItem('welcomeNotificationShown') === 'true',
  );


  const dispatch = useDispatch();
  const location = useLocation();
  const {
    customizer, sidebar, theme, auth,
  } = useSelector(state => ({
    customizer: state.customizer,
    sidebar: state.sidebar,
    theme: state.theme,
    auth: state.auth,
  }));

  // Track previous auth.loggedIn to detect real login transitions
  const prevLoggedInRef = useRef(auth?.loggedIn);

  useEffect(() => {
    // Only show after a real transition from logged out -> logged in
    const wasLoggedIn = prevLoggedInRef.current;
    const isLoggedIn = !!auth?.loggedIn;
    const onLoginPage = location?.pathname === '/login';

    if (!onLoginPage && isLoggedIn && !wasLoggedIn && !isNotificationShown) {
      WelcomeNotification(theme, setIsNotificationShown);
      setIsNotificationShown(true);
      sessionStorage.setItem('welcomeNotificationShown', 'true');
    }

    // update ref after handling
    prevLoggedInRef.current = isLoggedIn;
  }, [auth?.loggedIn, isNotificationShown, theme, location?.pathname]);

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
    <LayoutContainer
      collapse={sidebar.collapse}
      topNavigation={customizer.topNavigation}
    >
      <Customizer
        changeSidebarVisibility={sidebarVisibility}
        changeToLight={changeToLight}
        changeToDark={changeToDark}
      />
      {customizer.topNavigation ? (
        <TopbarWithNavigation
          changeMobileSidebarVisibility={mobileSidebarVisibility}
        />
      ) : (
        <Topbar
          changeMobileSidebarVisibility={mobileSidebarVisibility}
          changeSidebarVisibility={sidebarVisibility}
        />
      )}
      <Sidebar
        sidebar={sidebar}
        changeToDark={changeToDark}
        changeToLight={changeToLight}
        changeMobileSidebarVisibility={mobileSidebarVisibility}
        topNavigation={customizer.topNavigation}
      />
    </LayoutContainer>
  );
};

export default Layout;

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

      ${props => props.topNavigation && `
         ${paddingLeft(props)}: 0;
      `}
    }
  }
`;

// endregion

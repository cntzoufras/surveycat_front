import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarProfile from '../components/topbar/TopbarProfile';
import TopbarSearch from '../components/topbar/TopbarSearch';
import TopbarSidebarButton from '../components/topbar/TopbarSidebarButton';
import {
  TopbarContainer,
  TopbarLeft,
  TopbarLogo,
  TopbarRight,
  TopbarRightOver,
  TopbarSearchWrap,
} from '../components/topbar/BasicTopbarComponents';

const Topbar = ({
  changeMobileSidebarVisibility,
  changeSidebarVisibility,
}) => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem('auth'));

  const handleLogoClick = () => {
      if (auth && auth.loggedIn) {
        navigate('/app-dashboard');
      } else {
        navigate('/login');
      }
  };
 
  return (
    <TopbarContainer>
      <TopbarLeft>
        <TopbarSidebarButton
          onClickMobile={changeMobileSidebarVisibility}
          onClickDesktop={changeSidebarVisibility}
        />
        <TopbarLogo to={auth && auth.loggedIn ? '/app-dashboard' : '/'} onClick={handleLogoClick} />
      </TopbarLeft>
      <TopbarRight>
        <TopbarSearchWrap>
          <TopbarSearch />
        </TopbarSearchWrap>
        <TopbarRightOver>
          <TopbarProfile />
        </TopbarRightOver>
      </TopbarRight>
    </TopbarContainer>
  );
};

Topbar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
};

export default Topbar;

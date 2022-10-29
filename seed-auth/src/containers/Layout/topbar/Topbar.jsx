import React from 'react';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import {
  TopbarContainer,
  TopbarLeft,
  TopbarLogo,
  TopbarRight,
} from './BasicTopbarComponents';

const Topbar = ({ changeMobileSidebarVisibility, changeSidebarVisibility }) => (
  <TopbarContainer>
    <TopbarLeft>
      <TopbarSidebarButton
        onClickMobile={changeMobileSidebarVisibility}
        onClickDesktop={changeSidebarVisibility}
      />
      <TopbarLogo to="/" />
    </TopbarLeft>
    <TopbarRight>
      <TopbarProfile />
    </TopbarRight>
  </TopbarContainer>
);

Topbar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
};

export default Topbar;

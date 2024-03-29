import React from 'react';
import PropTypes from 'prop-types';
import TopbarMail from '../components/topbar/TopbarMail';
import TopbarProfile from '../components/topbar/TopbarProfile';
import TopbarNotification from '../components/topbar/TopbarNotification';
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
}) => (
  <TopbarContainer>
    <TopbarLeft>
      <TopbarSidebarButton
        onClickMobile={changeMobileSidebarVisibility}
        onClickDesktop={changeSidebarVisibility}
      />
      <TopbarLogo to="/" />
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

Topbar.propTypes = {
  changeMobileSidebarVisibility: PropTypes.func.isRequired,
  changeSidebarVisibility: PropTypes.func.isRequired,
};

export default Topbar;

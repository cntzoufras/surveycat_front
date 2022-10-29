import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import MicrosoftOfficeIcon from 'mdi-react/MicrosoftOfficeIcon';
import { PublicClientApplication } from '@azure/msal-browser';
import microsoftAuthSettings from '@/config/microsoft';
import { handleLogin, authError, getFakeToken } from '@/redux/actions/authActions';
import { AccountSocialButtonOffice } from '@/shared/components/account/AccountElements';

const msalInstance = new PublicClientApplication(microsoftAuthSettings);
const msLogin = () => async (dispatch) => {
  try {
    const { account } = await msalInstance.loginPopup({
      redirectUri: microsoftAuthSettings.redirectUri,
    });
    // In real project you will get the data below from backend api
    dispatch(handleLogin({
      fullName: account.name ? account.name : account.username,
      avatar: '',
      token: getFakeToken(''),
    }));
  } catch (e) {
    dispatch(authError(e.message));
  }
};

const MicrosoftAuthBtn = ({ login }) => (
  <AccountSocialButtonOffice
    type="button"
    onClick={login}
  >
    <MicrosoftOfficeIcon />
  </AccountSocialButtonOffice>
);

MicrosoftAuthBtn.propTypes = {
  login: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { login: msLogin })(MicrosoftAuthBtn));

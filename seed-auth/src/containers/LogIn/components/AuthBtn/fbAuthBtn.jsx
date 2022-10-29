import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from 'mdi-react/FacebookIcon';
import facebookAuthSettings from '@/config/facebook';
import { handleLogin, authError, getFakeToken } from '@/redux/actions/authActions';
import { AccountSocialButtonFacebook } from '@/shared/components/account/AccountElements';

const fbLogin = response => (dispatch) => {
  if (response.status) {
    dispatch(authError(response.status));
  } else {
    // In real project you will get the data below from backend api
    dispatch(handleLogin({
      fullName: response.name,
      avatar: response.picture.data.url,
      token: getFakeToken(response.id),
    }));
  }
};

const AuthFacebookBtn = ({ login }) => (
  <FacebookLogin
    appId={facebookAuthSettings.appId}
    fields="name,email,picture"
    render={renderProps => (
      <AccountSocialButtonFacebook
        type="button"
        onClick={renderProps.onClick}
      >
        <FacebookIcon />
      </AccountSocialButtonFacebook>
    )}
    callback={login}
  />
);

AuthFacebookBtn.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login: fbLogin })(AuthFacebookBtn);

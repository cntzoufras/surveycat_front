import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import googleAuthSetting from '@/config/google';
import { handleLogin, authError, getFakeToken } from '@/redux/actions/authActions';
import { AccountSocialButtonGoogle } from '@/shared/components/account/AccountElements';

const glLogin = {
  onSuccess: response => (dispatch) => {
    // In real project you will get the data below from backend api
    dispatch(handleLogin({
      fullName: response.profileObj.name,
      avatar: response.profileObj.imageUrl,
      token: getFakeToken(response.profileObj.id),
    }));
  },
  onFailure: response => (dispatch) => {
    dispatch(authError(response.error));
  },
};

const AuthGoogleBtn = ({ onSuccess, onFailure }) => (
  <GoogleLogin
    clientId={googleAuthSetting.client_id}
    render={renderProps => (
      <AccountSocialButtonGoogle
        onClick={renderProps.onClick}
        type="button"
      >
        <GooglePlusIcon />
      </AccountSocialButtonGoogle>
    )}
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy="single_host_origin"
  />
);

AuthGoogleBtn.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};

export default connect(null, glLogin)(AuthGoogleBtn);

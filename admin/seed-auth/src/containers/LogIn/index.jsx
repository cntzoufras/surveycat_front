import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FirebaseIcon from 'mdi-react/FirebaseIcon';
import { handleLogin, handleAuthError, getFakeToken } from '@/redux/actions/authActions';
import {
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountOr,
  AccountSocial,
  AccountTitle,
  AccountWrap,
  AccountSocialButtonFirebase,
  AccountSocialButtonAuth0,
} from '@/shared/components/account/AccountElements';
import fakeUsers from '../App/fakeUsers';
import LogInForm from './components/LogInForm';
import GoogleAuthBtn from './components/AuthBtn/googleAuthBtn';
import FacebookAuthBtn from './components/AuthBtn/fbAuthBtn';
import MicrosoftAuthBtn from './components/AuthBtn/microsoftAuthBtn';
import withAuthFirebase from './components/auth/withAuthFirebase';
import { login as loginWithAuth0 } from './components/auth/withAuth0';

const auth0Icon = `${process.env.PUBLIC_URL}/img/auth0.svg`;

const LogIn = ({
  changeIsOpenModalFireBase,
  login,
  handleError,
  error,
}) => {
  const onSubmit = ({ name, password }) => {
    const user = fakeUsers.find(item => item.email === name && item.password === password);
    if (user) {
      login({ ...user, token: getFakeToken(user.email) });
    } else {
      handleError('Username or password is incorrect.');
    }
  };

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHead>
            <AccountTitle>Welcome to
              <AccountLogo> Easy
                <AccountLogoAccent>DEV</AccountLogoAccent>
              </AccountLogo>
            </AccountTitle>
            <h4 className="subhead">Start your business easily</h4>
          </AccountHead>
          <LogInForm onSubmit={onSubmit} error={error} />
          <AccountOr>
            <p>Or Easily Using</p>
          </AccountOr>
          <AccountSocial>
            <FacebookAuthBtn />
            <GoogleAuthBtn />
            <MicrosoftAuthBtn />
            <AccountSocialButtonFirebase
              variant="secondary"
              onClick={changeIsOpenModalFireBase}
            >
              <FirebaseIcon />
            </AccountSocialButtonFirebase>
            <AccountSocialButtonAuth0
              variant="secondary"
              onClick={loginWithAuth0}
            >
              <img className="customizer__btn-icon" src={auth0Icon} alt="icon" />
            </AccountSocialButtonAuth0>
          </AccountSocial>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

LogIn.propTypes = {
  changeIsOpenModalFireBase: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default withAuthFirebase(connect(state => ({
  error: state.auth.error,
}), { login: handleLogin, handleError: handleAuthError })(LogIn));

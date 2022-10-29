import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogin, getFakeToken } from '@/redux/actions/authActions';
import RegisterForm from '@/shared/components/login_register/LoginRegisterForm';
import {
  AccountCard,
  AccountContent,
  AccountHaveAccount,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import fakeUsers from '../App/fakeUsers';

const Register = ({ login }) => {
  const [error, setError] = useState('');
  const register = ({ username, email }) => {
    const user = fakeUsers.find(item => item.email === email);
    if (user) {
      setError('The email address is already in use by another account.');
    } else {
      login({
        fullName: username,
        avatar: `${process.env.PUBLIC_URL}/img/ava.png`,
        token: getFakeToken(email),
      });
      setError('');
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
            <h4 className="subhead">Create an account</h4>
          </AccountHead>
          <RegisterForm onSubmit={register} errorMessage={error} />
          <AccountHaveAccount>
            <p>Already have an account? <NavLink to="/log_in">Login</NavLink></p>
          </AccountHaveAccount>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

Register.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login: handleLogin })(Register);

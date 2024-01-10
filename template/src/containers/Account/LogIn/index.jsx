import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogInForm from '@/shared/components/account/loginForm/LogInForm';
import { handleLogin as reduxHandleLogin, handleAuthError } from '@/redux/actions/authActions';

import {
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';

const LogIn = ({
  handleError,
  error,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (event) => {
    try {
      await dispatch(reduxHandleLogin(event));
      setShowModal(true);
      setTimeout(() => {
        history.push('/');
      }, 2000); 
    } catch (err) {   
      handleError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <AccountWrap>
      <AccountContent>
        <AccountCard>
          <AccountHead>
            <AccountTitle>Welcome to
              <AccountLogo> Survey
                <AccountLogoAccent>CAT</AccountLogoAccent>
              </AccountLogo>
            </AccountTitle>
            <h4 className="subhead">Login using your account.</h4>
          </AccountHead>
          <LogInForm 
            onSubmit={onSubmit} 
            error={error} 
            email={email} 
            password={password} 
            cPassword={cPassword}
            setEmail={setEmail} 
            setPassword={setPassword}
            setCPassword={setCPassword}
          />
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

LogIn.propTypes = {
  handleError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default LogIn;

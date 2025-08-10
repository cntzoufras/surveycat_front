import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import LogInForm from '@/shared/components/account/loginForm/LogInForm';
import { handleLogin as reduxHandleLogin } from '@/redux/actions/authActions';

import {
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import { FullWideNotification, showNotification } from '../../../shared/components/Notification';

const LogIn = ({ error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', color: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector(state => state.auth.error);
  
  const handleShowNotification = (message, color) => {
    setNotification({ show: true, message, color });
  };

  const onSubmit = async (values) => {
    console.log('onSubmit called with values:', values);
    // event.preventDefault(); // Prevent default form submission
    
    const credentials = { 
      email: values.email, 
      password: values.password,
      remember_me: values.remember_me || false,
    };
    try {
      const response = await dispatch(reduxHandleLogin(credentials));

      const authData = JSON.parse(localStorage.getItem('auth'));
      
      if (authData && authData.loggedIn) {
        console.log(`authData: ${authData}`);

        setShowModal(true);
        handleShowNotification('Logged in', 'success');
        setTimeout(() => {
          navigate('/dashboards/app');
        }, 1200);
      } else {
        throw new Error('Login failed. Check credentials and try again');
      }
    } catch (err) {
      console.error('Login error:', err.message);
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
            errorMessage={authError || error}
            email={email} 
            password={password} 
            setEmail={setEmail} 
            setPassword={setPassword}
          />
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

LogIn.propTypes = {
  // handleError: PropTypes.func.isRequired,
  error: PropTypes.string,
};

LogIn.defaultProps = {
  error: null,
};

export default LogIn;

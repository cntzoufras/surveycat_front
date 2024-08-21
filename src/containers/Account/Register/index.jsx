import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterForm from '@/shared/components/account/login_register/LoginRegisterForm';
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
import { handleRegister as reduxHandleRegister, handleAuthError } from '@/redux/actions/authActions';
import { FullWideNotification, showNotification } from '../../../shared/components/Notification';

const Register = ({ history, handleError, error }) => {
  const [notification, setNotification] = useState({ show: false, message: '', color: '' });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowNotification = (message, color) => {
    console.log('Showing notification:', message, color);
    setNotification({ show: true, message, color });
  };
    
  const onSubmit = async (event) => {
    try {
      const response = await dispatch(reduxHandleRegister(event));
      console.log('event: ', event);
      console.log('API Response:', response);

      if (response && response.status === 201) {
        handleShowNotification('Registration successful. Please check your email to verify before login.', 'success');
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        handleShowNotification('Registration failed. Please try again.', 'danger');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrors(err.errors || { form: err.message });
      const errorMessages = err.errors ? Object.values(err.errors).flat().join(' ') : err.message;
      handleShowNotification(errorMessages || 'Registration failed. Please try again.', 'danger');
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
            <h4 className="subhead">Create an account</h4>
          </AccountHead>
          {notification.show && (
            <FullWideNotification
              message={notification.message}
              color={notification.color}
              onClose={() => setNotification({ show: false, message: '', color: '' })}
            />
          )}
          <RegisterForm onSubmit={onSubmit} errorMessage={error} />
          <AccountHaveAccount>
            <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
          </AccountHaveAccount>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

Register.propTypes = {
  handleError: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  error: PropTypes.string.isRequired,
};

export default Register;

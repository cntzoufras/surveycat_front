import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
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
import Modal from '@/shared/components/Modal';
import { handleRegister as reduxHandleRegister, handleAuthError } from '@/redux/actions/authActions';


const Register = ({ history, handleError, error }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', color: '' });

  const dispatch = useDispatch();

  const handleShowNotification = (message, color) => {
    console.log('Showing notification:', message, color); // Add this line
    setNotification({ show: true, message, color });
  };
  
  const handleShowNotification = (color) => showNotification({
  notification(theme) {
    return (
      <FullWideNotification
        color={color}
        message="Learning day desirous informed expenses material returned six the.
              She enabled invited exposed him another."
        theme={theme}
      />
    );
  },
  position: 'full',
});
    
  const onSubmit = async (event) => {
    try {
      await dispatch(reduxHandleRegister(event));
      handleShowNotification('Registration successful.', 'success');
      history.push('/');
    } catch (err) {   
      handleShowNotification(err.message || 'Registration failed. Please try again.', 'error');
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
            <Modal
              message={notification.message}
              color={notification.color}
              onClose={() => setNotification({ 
              show: false, 
              message: '', 
              color: '',
              })}
            />
          )}
          <RegisterForm onSubmit={onSubmit} errorMessage={error} showNotification={handleShowNotification} />
          <AccountHaveAccount>
            <p>Already have an account? <NavLink to="/log_in">Login</NavLink></p>
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

export default withRouter(Register);

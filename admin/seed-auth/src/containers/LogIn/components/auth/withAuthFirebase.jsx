import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
} from 'firebase/auth';
import { handleLogin, getFakeToken } from '@/redux/actions/authActions';
import firebaseAuthSetting from '@/config/firebase';
import { AccountWrap } from '@/shared/components/account/AccountElements';
import ModalLoginForm from '../ModalLoginForm';

initializeApp(firebaseAuthSetting);

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com').setCustomParameters({
  prompt: 'consent',
  tenant: firebaseAuthSetting.microsoftTenantId,
});
const signIn = async (provider = null, userProps = { name: '', password: '' }) => {
  if (provider) {
    return signInWithPopup(getAuth(), provider);
  }
  return signInWithEmailAndPassword(getAuth(), userProps.name, userProps.password);
};

const withAuthFirebase = (WrappedComponent) => {
  const HocAuth = ({ login, ...props }) => {
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
      setError('');
      setIsOpen(false);
    };

    const openModal = () => {
      setIsOpen(true);
      setError('');
    };

    const onLogin = (provider = null) => async (userProps) => {
      setError('');
      try {
        // In real project you will get the data below from backend api
        const { user } = await signIn(provider, userProps);
        const fullName = user.displayName ? user.displayName : user.email;
        const avatar = user.photoURL ? user.photoURL : '';
        login({ fullName, avatar, token: getFakeToken(user.email) });
      } catch (e) {
        setError(e.message);
      }
    };

    return (
      <AccountWrap>
        <ModalLoginForm
          title="Sign in with Firebase"
          isOpen={isOpen}
          error={error}
          closeModal={closeModal}
          onLogin={onLogin()}
          onFacebookLogin={onLogin(facebookProvider)}
          onGoogleLogin={onLogin(googleProvider)}
          onMicrosoftLogin={onLogin(microsoftProvider)}
        />
        <WrappedComponent {...props} changeIsOpenModalFireBase={openModal} />
      </AccountWrap>
    );
  };

  HocAuth.propTypes = {
    login: PropTypes.func.isRequired,
  };

  return connect(null, { login: handleLogin })(HocAuth);
};

export default withAuthFirebase;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ResetPasswordForm from '@/shared/components/reset_password/ResetPasswordForm';
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

const ResetPassword = (props) => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(true);
  const onSubmit = ({ email }) => {
    if (fakeUsers.find(item => item.email === email)) {
      setMessage('Please, check your e-mail');
      setStatus(true);
    } else {
      setMessage('This e-mail does not exist');
      setStatus(false);
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
            <h4 className="subhead">Password reset</h4>
          </AccountHead>
          <ResetPasswordForm
            {...props}
            message={message}
            status={status}
            onSubmit={onSubmit}
          />
          <AccountHaveAccount>
            <p>Remember your password?  <NavLink to="/log_in">Login</NavLink></p>
          </AccountHaveAccount>
        </AccountCard>
      </AccountContent>
    </AccountWrap>
  );
};

export default ResetPassword;

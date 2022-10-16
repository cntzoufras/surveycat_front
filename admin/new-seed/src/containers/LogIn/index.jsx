import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from 'mdi-react/FacebookIcon';
import GooglePlusIcon from 'mdi-react/GooglePlusIcon';
import {
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountOr,
  AccountSocial,
  AccountSocialButtonFacebook,
  AccountSocialButtonGoogle,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import LogInForm from './components/LogInForm';

const LogIn = () => (
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
        <LogInForm onSubmit={() => {}} />
        <AccountOr>
          <p>Or Easily Using</p>
        </AccountOr>
        <AccountSocial>
          <AccountSocialButtonFacebook
            as={Link}
            className="account__social-btn account__social-btn--facebook"
            to="/pages/one"
          >
            <FacebookIcon />
          </AccountSocialButtonFacebook>
          <AccountSocialButtonGoogle
            as={Link}
            to="/pages/one"
          >
            <GooglePlusIcon />
          </AccountSocialButtonGoogle>
        </AccountSocial>
      </AccountCard>
    </AccountContent>
  </AccountWrap>
);

export default LogIn;

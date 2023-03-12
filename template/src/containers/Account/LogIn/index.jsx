import React from 'react';
import PropTypes from 'prop-types';
import FirebaseIcon from 'mdi-react/FirebaseIcon';
import withAuthFirebase from '@/shared/components/account/auth/withAuthFirebase';
import LogInForm from '@/shared/components/account/loginForm/LogInForm';
import showResults from '@/utils/showResults';
import { login as loginAuth0 } from '@/shared/components/account/auth/withAuth0';
import {
  AccountCard,
  AccountContent,
  AccountHead,
  AccountLogo,
  AccountLogoAccent,
  AccountOr,
  AccountSocial,
  AccountSocialButtonFirebase,
  AccountTitle,
  AccountWrap,
} from '@/shared/components/account/AccountElements';
import GoogleAuthBtn from '../AuthBtn/googleAuthBtn';
import FacebookAuthBtn from '../AuthBtn/fbAuthBtn';
import MicrosoftAuthBtn from '../AuthBtn/microsoftAuthBtn';


const LogIn = ({ changeIsOpenModalFireBase }) => (
  <AccountWrap>
    <AccountContent>
      <AccountCard>
        <AccountHead>
          <AccountTitle>Welcome to
            <AccountLogo> Survey
              <AccountLogoAccent>Cat</AccountLogoAccent>
            </AccountLogo>
          </AccountTitle>
          <h4 className="subhead">Access and review surveys</h4>
        </AccountHead>
        <LogInForm
          onSubmit={showResults}
          form="log_in_form"
        />
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
        </AccountSocial>
      </AccountCard>
    </AccountContent>
  </AccountWrap>
);

LogIn.propTypes = {
  changeIsOpenModalFireBase: PropTypes.func.isRequired,
};

export default withAuthFirebase(LogIn);

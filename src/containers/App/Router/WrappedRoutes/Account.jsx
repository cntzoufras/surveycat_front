import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from '../../../Account/Profile/index';
import EmailConfirmation from '../../../Account/EmailConfimation/index';

const AccountRoutes = () => (
  <Routes>
    <Route path="/account/profile" element={<Profile />} />
    <Route path="/account/email_confirmation" element={<EmailConfirmation />} />
  </Routes>
);

export default AccountRoutes;

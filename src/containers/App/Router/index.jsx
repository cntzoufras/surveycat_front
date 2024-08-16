import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import NotFound404 from '../../DefaultPage/404/index';
import LockScreen from '../../Account/LockScreen/index';
import LogIn from '../../Account/LogIn/index';
import Register from '../../Account/Register/index';
import RegisterPhoto from '../../Account/RegisterPhoto/index';
import ResetPassword from '../../Account/ResetPassword/index';
import ResetPasswordPhoto from '../../Account/ResetPasswordPhoto';
import Todo from '../../Todo';
import Survey from '../../Survey';
import WrappedRoutes from './WrappedRoutes';

const Router = () => (
  <MainWrapper>
    <main>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/404" element={<NotFound404 />} />
        <Route path="/lock_screen" element={<LockScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route exact path="/auth/register" element={<Register />} />
        <Route path="/register_photo" element={<RegisterPhoto />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/reset_password_photo" element={<ResetPasswordPhoto />} />
        <Route path="/" element={<WrappedRoutes />} />
        <Route exact path="/todo" element={<Todo />} />
        <Route exact path="/survey" element={<Survey />} />
        <Route path="/*" element={<WrappedRoutes />} />
      </Routes>
    </main>
  </MainWrapper>
);

export default Router;

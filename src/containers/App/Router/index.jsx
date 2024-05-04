import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import NotFound404 from '../../DefaultPage/404/index';
import LockScreen from '../../Account/LockScreen/index';
import LogIn from '../../Account/LogIn/index';
import Register from '../../Account/Register/index';
import RegisterPhoto from '../../Account/RegisterPhoto/index';
import ResetPassword from '../../Account/ResetPassword/index';
import ResetPasswordPhoto from '../../Account/ResetPasswordPhoto';
import WrappedRoutes from './WrappedRoutes';
import Todo from '../../Todo';
import Survey from '../../Survey';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route path="/404" component={NotFound404} />
        <Route path="/lock_screen" component={LockScreen} />
        <Route path="/login" component={LogIn} />
        <Route exact path="/auth/register" component={Register} />
        <Route path="/register_photo" component={RegisterPhoto} />
        <Route path="/reset_password" component={ResetPassword} />
        <Route path="/reset_password_photo" component={ResetPasswordPhoto} />
        <Route path="/" component={WrappedRoutes} />
        <Route exact path="/todo" component={Todo} />
        <Route exact path="/survey" component={Survey} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;

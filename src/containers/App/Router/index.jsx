import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import NotFound404 from '../../DefaultPage/404/index';
import LogIn from '../../Account/LogIn/index';
import Register from '../../Account/Register/index';
import ResetPassword from '../../Account/ResetPassword/index';
import Survey from '../../Survey';
import WrappedRoutes from './WrappedRoutes';
import AuthCheck from '../AuthCheck';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PublicSurveyPage from '../../Survey/components/PublicSurveyPage';
import ThankYouSubmission from '../../Survey/components/ThankYouSubmission';
import VerificationSuccess from '../../Survey/components/VerificationSuccess';
import VerificationError from '../../Survey/components/VerificationError';
import VerificationAlready from '../../Survey/components/VerificationAlready';

const Router = () => (
  <MainWrapper>
    <main>
      <Routes>
        <Route
          path="/login"
          element={(
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          )}
        />
        <Route
          path="/auth/register"
          element={(
            <PublicRoute>
              <Register />
            </PublicRoute>
          )}
        />
        <Route
          path="/reset_password"
          element={(
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          )}
        />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/surveys/ps/:surveySlug" element={<PublicSurveyPage />} />
        <Route path="/thank-you" element={<ThankYouSubmission timestamp={new Date().toISOString()} />} />
        <Route path="/verification-success" element={<VerificationSuccess />} />
        <Route path="/verification-error" element={<VerificationError />} />
        <Route path="/verification-already" element={<VerificationAlready />} />
        <Route path="/404" element={<NotFound404 />} />
        <Route 
          exact 
          path="/survey" 
          element={(
            <AuthCheck>
              <PrivateRoute>
                <Survey />
              </PrivateRoute>
            </AuthCheck>
          )} 
        />
        <Route
          path="/surveys/:surveyId/preview"
          element={(
            <AuthCheck>
              <PrivateRoute>
                <PublicSurveyPage preview />
              </PrivateRoute>
            </AuthCheck>
          )}
        />
        <Route 
          path="/*" 
          element={(
            <AuthCheck>
              <PrivateRoute>
                <WrappedRoutes />
              </PrivateRoute>
            </AuthCheck>
          )} 
        />
      </Routes>
    </main>
  </MainWrapper>
);

export default Router;

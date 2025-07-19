import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { colorBackgroundBody } from '@/utils/palette';
import { paddingLeft } from '@/utils/directions';
import Layout from '../../../Layout/index';
import AppDashboard from '../../../Dashboards/App/index';
import SurveysDashboard from '../../../Dashboards/Surveys/index';
import SurveyDesign from '../../../Survey/index';
import Account from './Account';
import Profile from '../../../Account/Profile/index';
import EmailConfirmation from '../../../Account/EmailConfimation/index';
import SurveyList from '../../../Survey/components/SurveyList';
import SurveySubmissions from '../../../Dashboards/Surveys/SurveySubmissions';
import Respondents from '../../../Dashboards/Surveys/Respondents';
import SurveyThemeList from '../../../Survey/components/SurveyThemeList';

const WrappedRoutes = () => (
  <div>
    <Layout />
    <ContainerWrap>
      <Routes>
        <Route index element={<AppDashboard />} />
        <Route exact path="/app_dashboard" element={<AppDashboard />} />
        <Route path="/surveys_dashboard" element={<SurveysDashboard />} />
        <Route path="/survey-design" element={<SurveyDesign />} />
        <Route path="/surveys" element={<SurveyList />} />
        <Route path="/survey-submissions" element={<SurveySubmissions />} />
        <Route path="/respondents" element={<Respondents />} />
        <Route path="/surveys/:surveyId/pages/:surveyPageId" element={<SurveyDesign />} />  
        <Route path="/themes" element={<SurveyThemeList />} />  
        <Route path="/account/*" element={<Account />}> 
          <Route path="profile" element={<Profile />} />
          <Route path="email_confirmation" element={<EmailConfirmation />} />
        </Route>
      </Routes>
    </ContainerWrap>
  </div>
);

export default WrappedRoutes;

// region STYLES

const ContainerWrap = styled.div`
  padding-top: 90px;
  min-height: 100vh;
  transition: padding-left 0.3s;

  ${paddingLeft}: 0;

  background: ${colorBackgroundBody};

  @media screen and (min-width: 576px) {
    ${paddingLeft}: 250px;
  }

  @media screen and (max-width: 576px) {
    padding-top: 150px;
  }
`;

// endregion

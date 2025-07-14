import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { colorBackgroundBody } from '@/utils/palette';
import { paddingLeft } from '@/utils/directions';
import ChartsJS from '@/containers/Charts/ChartJs';
import ReactVis from '@/containers/Charts/ReactVis';
import Recharts from '@/containers/Charts/Recharts';
import Amcharts from '@/containers/Charts/Amcharts';
import Layout from '../../../Layout/index';
import OnLineMarketingDashboard from '../../../Dashboards/OnLineMarketing/index';
import AppDashboard from '../../../Dashboards/App/index';
import SurveysDashboard from '../../../Dashboards/Surveys/index';
import FitnessDashboard from '../../../Dashboards/Fitness/index';
import SurveyDesign from '../../../Survey/index';
import Tables from './Tables';
import Charts from './Charts';
import Account from './Account';
import Profile from '../../../Account/Profile/index';
import EmailConfirmation from '../../../Account/EmailConfimation/index';
import DefaultPages from './DefaultPages';
import BasicTables from '../../../Tables/BasicTables/index';
import DataTable from '../../../Tables/DataTable/index';
import DragAndDropTable from '../../../Tables/DnDTable/index';
import EditableTable from '../../../Tables/EditableTable/index';
import ResizableTable from '../../../Tables/ResizableTable';
import MaterialTable from '../../../Tables/MaterialTable/index';
import ApiTable from '../../../Tables/ApiTable';
import SurveyList from '../../../Survey/components/SurveyList';
import SurveySubmissions from '../../../Dashboards/Surveys/SurveySubmissions';
import Respondents from '../../../Dashboards/Surveys/Respondents';
import SurveyThemeList from '../../../Survey/components/SurveyThemeList';

const WrappedRoutes = () => (
  <div>
    <Layout />
    <ContainerWrap>
      <Routes>
        <Route path="/online_marketing_dashboard" element={<OnLineMarketingDashboard />} />
        <Route exact path="/app_dashboard" element={<AppDashboard />} />
        <Route path="/surveys_dashboard" element={<SurveysDashboard />} />
        <Route path="/fitness_dashboard" element={<FitnessDashboard />} />
        <Route path="/survey-design" element={<SurveyDesign />} />
        <Route path="/surveys" element={<SurveyList />} />
        <Route path="/survey-submissions" element={<SurveySubmissions />} />
        <Route path="/respondents" element={<Respondents />} />
        <Route path="/surveys/:surveyId/pages/:surveyPageId" element={<SurveyDesign />} />  
        <Route path="/themes" element={<SurveyThemeList />} />  
        <Route path="/charts/*" element={<Charts />}>
          <Route path="charts_js" element={<ChartsJS />} />
          <Route path="react_vis" element={<ReactVis />} />
          <Route path="recharts" element={<Recharts />} />
          <Route path="amcharts" element={<Amcharts />} />
        </Route>
        <Route path="/account/*" element={<Account />}> {/* Updated to use Outlet */}
          <Route path="profile" element={<Profile />} />
          <Route path="email_confirmation" element={<EmailConfirmation />} />
        </Route>
        <Route path="/default_pages" element={<DefaultPages />} />
        <Route path="/tables/*" element={<Tables />}>
          <Route path="basic_tables" element={<BasicTables />} />
          <Route path="data_table" element={<DataTable />} />
          <Route path="dnd_table" element={<DragAndDropTable />} />
          <Route path="editable_table" element={<EditableTable />} />
          <Route path="resizable_table" element={<ResizableTable />} />
          <Route path="material_table" element={<MaterialTable />} />
          <Route path="api_table" element={<ApiTable />} />
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

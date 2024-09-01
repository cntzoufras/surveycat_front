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
import BookingDashboard from '../../../Dashboards/Booking/index';
import FitnessDashboard from '../../../Dashboards/Fitness/index';
import SurveyDesign from '../../../Survey/index';
import Tables from './Tables';
import Charts from './Charts';
import Account from './Account';
import DefaultPages from './DefaultPages';
import Documentation from './Documentation';
import BasicTables from '../../../Tables/BasicTables/index';
import DataTable from '../../../Tables/DataTable/index';
import DragAndDropTable from '../../../Tables/DnDTable/index';
import EditableTable from '../../../Tables/EditableTable/index';
import ResizableTable from '../../../Tables/ResizableTable';
import MaterialTable from '../../../Tables/MaterialTable/index';
import ApiTable from '../../../Tables/ApiTable';
import Introduction from '../../../Documentation/01_introduction/index';
import Installation from '../../../Documentation/02_installation/index';
import FileStructure from '../../../Documentation/03_files_structure/index';
import Components from '../../../Documentation/04_components/index';
import Form from '../../../Documentation/06_forms/index';
import ColorThemes from '../../../Documentation/07_change_and_add_color_themes/index';
import NavigationItem from '../../../Documentation/08_new_navigation_item/index';
import Resources from '../../../Documentation/10_resources/index';
import Changelog from '../../../Documentation/11_changelog/index';
import FAQ from '../../../Documentation/12_faq/index';
import SurveyList from '../../../Survey/components/SurveyList';

const WrappedRoutes = () => (
  <div>
    <Layout />
    <ContainerWrap>
      <Routes>
        <Route path="/online_marketing_dashboard" element={<OnLineMarketingDashboard />} />
        <Route exact path="/app_dashboard" element={<AppDashboard />} />
        <Route path="/booking_dashboard" element={<BookingDashboard />} />
        <Route path="/fitness_dashboard" element={<FitnessDashboard />} />
        <Route path="/survey-design" element={<SurveyDesign />} />
        <Route path="/surveys" element={<SurveyList />} />
        <Route path="/surveys/:surveyId/pages/:surveyPageId" element={<SurveyDesign />} />  
        <Route path="/charts/*" element={<Charts />}>
          <Route path="charts_js" element={<ChartsJS />} />
          <Route path="react_vis" element={<ReactVis />} />
          <Route path="recharts" element={<Recharts />} />
          <Route path="amcharts" element={<Amcharts />} />
        </Route>
        <Route path="/account" element={<Account />} />
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
        <Route path="/documentation/*" element={<Documentation />} />
        <Route path="/documentation/introduction" element={<Introduction />} />
        <Route path="/documentation/installation" element={<Installation />} />
        <Route path="/documentation/file_structure" element={<FileStructure />} />
        <Route path="/documentation/components" element={<Components />} />
        <Route path="/documentation/form" element={<Form />} />
        <Route path="/documentation/color_themes" element={<ColorThemes />} />
        <Route path="/documentation/navigation_item" element={<NavigationItem />} />
        <Route path="/documentation/resources" element={<Resources />} />
        <Route path="/documentation/changelog" element={<Changelog />} />
        <Route path="/documentation/faq" element={<FAQ />} />
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

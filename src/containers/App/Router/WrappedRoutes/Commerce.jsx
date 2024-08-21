import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ECommerceDashboard from '../../../Dashboards/ECommerce/index';
import ECommerceDashboardEdit from '../../../Dashboards/ECommerceTableEdit/index';

export default () => (
  <Routes>
    <Route exact path="/e_commerce_dashboard" element={<ECommerceDashboard />} />
    <Route path="/e_commerce_dashboard/edit/:index" element={<ECommerceDashboardEdit />} />
  </Routes>
);

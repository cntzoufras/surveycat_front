import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Alerts from '../../../UI/Alerts/index';
import Buttons from '../../../UI/Buttons/index';
import Carousel from '../../../UI/Carousel/index';
import Collapse from '../../../UI/Collapse/index';
import Grids from '../../../UI/Grids';
import Modals from '../../../UI/Modals/index';
import Notifications from '../../../UI/Notification/index';
import Panels from '../../../UI/Panels/index';
import ProgressBars from '../../../UI/ProgressBars/index';
import RangeSliders from '../../../UI/RangeSliders/index';
import Tabs from '../../../UI/Tabs/index';
import Timeline from '../../../UI/Timeline/index';
import Tooltips from '../../../UI/Tooltips/index';
import Typography from '../../../UI/Typography/index';
import Datepicker from '../../../UI/Datepickers';

export default () => (
  <Routes>
    <Route path="/ui/alerts" element={<Alerts/>} />
    <Route path="/ui/buttons" element={<Buttons/>} />
    <Route path="/ui/carousel" element={<Carousel/>} />
    <Route path="/ui/collapse" element={<Collapse/>} />
    <Route path="/ui/datepicker" element={<Datepicker/>} />
    <Route path="/ui/grids" element={<Grids/>} />
    <Route path="/ui/modals" element={<Modals/>} />
    <Route path="/ui/notifications" element={<Notifications/>} />
    <Route path="/ui/panels" element={<Panels/>} />
    <Route path="/ui/progress_bars" element={<ProgressBars/>} />
    <Route path="/ui/range_sliders" element={<RangeSliders/>} />
    <Route path="/ui/tabs" element={<Tabs/>} />
    <Route path="/ui/timeline" element={<Timeline/>} />
    <Route path="/ui/tooltips" element={<Tooltips/>} />
    <Route path="/ui/typography" element={<Typography/>} />
  </Routes>
);

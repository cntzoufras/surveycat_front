import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

export default () => (
  <Routes>
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
);

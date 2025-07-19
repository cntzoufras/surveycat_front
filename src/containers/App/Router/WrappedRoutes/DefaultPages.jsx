import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from '../../../DefaultPage/Calendar/index';
import FAQ from '../../../DefaultPage/Faq/index';
import Gallery from '../../../DefaultPage/Gallery/index';
import InvoiceTemplate from '../../../DefaultPage/InvoiceTemplate/index';
import PricingCards from '../../../DefaultPage/PricingCards/index';
import ProjectSummary from '../../../DefaultPage/ProjectSummary/index';
import SearchResults from '../../../DefaultPage/SearchResults/index';
import TextEditor from '../../../DefaultPage/TextEditor/index';

export default () => (
  <Routes>
    <Route path="/default_pages/calendar" element={<Calendar />} />
    <Route path="/default_pages/faq" element={<FAQ />} />
    <Route path="/default_pages/gallery" element={<Gallery />} />
    <Route path="/default_pages/invoice_template" element={<InvoiceTemplate />} />
    <Route path="/default_pages/pricing_cards" element={<PricingCards />} />
    <Route path="/default_pages/project_summary" element={<ProjectSummary />} />
    <Route path="/default_pages/search_results" element={<SearchResults />} />
    <Route path="/default_pages/text_editor" element={<TextEditor />} />
  </Routes>
);

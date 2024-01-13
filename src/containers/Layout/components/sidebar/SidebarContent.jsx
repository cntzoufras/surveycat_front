import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '@/utils/palette.scss';
import SidebarLink, { SidebarNavLink, SidebarLinkTitle } from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import './SidebarContent.scss';

const SidebarContent = ({
  onClick, changeToLight, changeToDark, collapse,
}) => (
  <div className="SidebarContentWrap">
    <SidebarCategory title="Survey" icon="map" collapse={collapse}>
      <SidebarLink title="Create" route="/survey/create" icon="pencil" />
      <SidebarLink title="List" route="/surveys" icon="database" />
      <SidebarLink title="Themes" route="/themes" icon="picture" />
    </SidebarCategory>
    <SidebarCategory title="Analytics" icon="database" collapse={collapse}>
      <SidebarLink title="Users" route="/users" icon="users" onClick={onClick} />
    </SidebarCategory>
    <div className="SidebarBlock">
      <SidebarLink
        title="App Dashboard"
        icon="smartphone"
        route="/app_dashboard"
        onClick={onClick}
      />
      <SidebarLink
        title="Booking Dashboard"
        icon="apartment"
        route="/booking_dashboard"
        onClick={onClick}
      />
      <SidebarCategory title="Layout" icon="layers" collapse={collapse}>
        <SidebarNavLink as="button" type="button" onClick={changeToLight}>
          <SidebarLinkTitle>Light Theme</SidebarLinkTitle>
        </SidebarNavLink>
        <SidebarNavLink as="button" type="button" onClick={changeToDark}>
          <SidebarLinkTitle>Dark Theme</SidebarLinkTitle>
        </SidebarNavLink>
        <SidebarCategory title="Forms" icon="file-add" collapse={collapse}>
          <SidebarCategory title="React final form" collapse={collapse}>
            <SidebarLink title="Basic Form" route="/forms/react_final_form/basic_form" onClick={onClick} />
            <SidebarLink
              title="Check Form Controls"
              route="/forms/react_final_form/check_form_controls"
              onClick={onClick}
            />
            <SidebarLink title="File Upload" route="/forms/react_final_form/file_upload" onClick={onClick} />
            <SidebarLink
              title="Floating Labels Form"
              route="/forms/react_final_form/floating_labels_form"
              onClick={onClick}
            />
            <SidebarLink title="Form Dropzone" route="/forms/react_final_form/form_dropzone" onClick={onClick} />
            <SidebarLink title="Form Layouts" route="/forms/react_final_form/form_layouts" onClick={onClick} />
            <SidebarLink title="Form Picker" route="/forms/react_final_form/form_picker" onClick={onClick} />
            <SidebarLink
              title="Form Validation"
              route="/forms/react_final_form/form_validation"
              onClick={onClick}
            />
            <SidebarLink title="Mask Form" route="/forms/react_final_form/mask_form" onClick={onClick} />
            <SidebarLink title="Material Form" route="/forms/react_final_form/material_form" onClick={onClick} />
            <SidebarLink title="Wizard Form" route="/forms/react_final_form/wizard_form" onClick={onClick} />
          </SidebarCategory>
          <SidebarCategory title="React hook form" collapse={collapse}>
            <SidebarLink title="Basic Form" route="/forms/react_hook_form/basic_form" onClick={onClick} />
            <SidebarLink title="Form Validation" route="/forms/react_hook_form/form_validation" onClick={onClick} />
            <SidebarLink title="Wizard form" route="/forms/react_hook_form/wizard_form" onClick={onClick} />
          </SidebarCategory>
          
        </SidebarCategory>
        <SidebarCategory title="UI Elements" icon="diamond" collapse={collapse}>
          <SidebarLink title="Alerts" route="/ui/alerts" onClick={onClick} />
          <SidebarLink title="Buttons" route="/ui/buttons" onClick={onClick} />
          <SidebarLink title="Carousel" route="/ui/carousel" onClick={onClick} />
          <SidebarLink title="Collapse" route="/ui/collapse" onClick={onClick} />
          <SidebarLink title="Datepicker" route="/ui/datepicker" onClick={onClick} />
          <SidebarLink title="Grids" route="/ui/grids" onClick={onClick} />
          <SidebarLink title="Modals" route="/ui/modals" onClick={onClick} />
          <SidebarLink title="Notifications" route="/ui/notifications" onClick={onClick} />
          <SidebarLink title="Panels" route="/ui/panels" onClick={onClick} />
          <SidebarLink title="Progress Bars" route="/ui/progress_bars" onClick={onClick} />
          <SidebarLink title="Range Sliders" route="/ui/range_sliders" onClick={onClick} />
          <SidebarLink title="Tabs" route="/ui/tabs" onClick={onClick} />
          <SidebarLink title="Timeline" route="/ui/timeline" onClick={onClick} />
          <SidebarLink title="Tooltips & Popovers" route="/ui/tooltips" onClick={onClick} />
          <SidebarLink title="Typography" route="/ui/typography" onClick={onClick} />
        </SidebarCategory>
        <SidebarCategory title="Tables" icon="list" collapse={collapse}>
          <SidebarLink title="Api table" route="/tables/api_table" onClick={onClick} />
          <SidebarLink title="Basic tables" route="/tables/basic_tables" onClick={onClick} />
          <SidebarLink title="Data table" newLink route="/tables/data_table" onClick={onClick} />
          <SidebarLink title="Drag & Drop table" newLink route="/tables/dnd_table" onClick={onClick} />
          <SidebarLink title="Editable table" route="/tables/editable_table" onClick={onClick} />
          <SidebarLink title="Material table" route="/tables/material_table" onClick={onClick} />
          <SidebarLink
            title="Width resizable table"
            newLink
            route="/tables/resizable_table"
            onClick={onClick}
          />
        </SidebarCategory>
        <SidebarCategory title="Default Pages" icon="file-empty" collapse={collapse}>
          <SidebarLink title="404" route="/404" />
          <SidebarLink title="Calendar" route="/default_pages/calendar" onClick={onClick} />
          <SidebarLink title="FAQs" route="/default_pages/faq" onClick={onClick} />
          <SidebarLink title="Gallery" route="/default_pages/gallery" onClick={onClick} />
          <SidebarLink title="Invoice template" route="/default_pages/invoice_template" onClick={onClick} />
          <SidebarLink title="Pricing Cards" route="/default_pages/pricing_cards" onClick={onClick} />
          <SidebarLink title="Project Summary" route="/default_pages/project_summary" onClick={onClick} />
          <SidebarLink title="Search Results" route="/default_pages/search_results" onClick={onClick} />
          <SidebarLink title="Text Editor" route="/default_pages/text_editor" onClick={onClick} />
        </SidebarCategory>
      </SidebarCategory>
      <SidebarLink title="Todo Application" icon="book" route="/todo" onClick={onClick} />
      <SidebarCategory title="Charts" icon="chart-bars" collapse={collapse}>
        <SidebarLink title="ChartsJS" route="/charts/charts_js" onClick={onClick} />
        <SidebarLink title="React-vis" route="/charts/react_vis" onClick={onClick} />
        <SidebarLink title="Recharts" route="/charts/recharts" onClick={onClick} />
        <SidebarLink title="Amcharts" route="/charts/amcharts" onClick={onClick} />
      </SidebarCategory>
      
    </div>
    <div className="SidebarBlock">
      <SidebarLink title="Log Out" icon="exit" route="/log_in" />
    </div>
    <div className="SidebarBlock">
      <SidebarLink
        title="Documentation"
        icon="lnr-apartment"
        route="/documentation/introduction"
        onClick={onClick}
      />
    </div>
  </div>
);

    
    
    
SidebarContent.propTypes = {
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  collapse: PropTypes.bool,
};

SidebarContent.defaultProps = {
  collapse: false,
  onClick: () => {},
};

export default SidebarContent;

// region STYLES

// const SidebarContentWrap = styled.div`
//   height: 100%;
//   overflow: auto;
//   padding-top: 0;
  
//   & > div:last-child {
//     width: 4px !important;

//     div {
//       transition: height 0.3s;
//       opacity: 0.52;
//     }
//   }
  
//   @media screen and (min-width: 576px) {
//     padding-top: 15px;
    
//     ${props => props.collapse && `
//       width: 55px;
//       overflow: visible !important;
//       transition: width 0.3s;
//     `}
//   }
// `;

// const SidebarBlock = styled.ul`
//   padding: 15px 0;
//   border-bottom: 1px solid ${colorBorder};
//   list-style-type: none;
  
//   &:last-child {
//     border: none;
//   }
  
//   @media screen and (min-width: 576px) {
    
//     ${props => props.collapse && `
//       & > li > a,
//       & > li > button {
//         overflow: hidden;
//         width: 55px;
//         background: ${colorBackground(props)};
        
//         span:last-of-type {
//           opacity: 0;
//           transition: 0.3s;
//         }
  
//         ${SidebarLinkTitle} {
//           position: absolute;
//           width: 160px;
//           ${left(props)}: 70px;
//         }
  
//         &:hover {
//           background: ${colorHover(props)};
//         }
//       }
      
//       & > li:hover > a,
//       & > li:hover > button {
//         width: 275px;
        
//         span {
//           opacity: 1;
//         }
//       }
//     `}
//   }
// `;

// endregion


import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorBorder, colorBackground, colorHover } from '@/utils/palette';
import { left } from '@/utils/directions';
import SidebarLink, { SidebarNavLink, SidebarLinkTitle } from './SidebarLink';
import SidebarCategory from './SidebarCategory';

const SidebarContent = ({
  onClick, changeToLight, changeToDark, collapse,
}) => (
  <SidebarContentWrap collapse={collapse}>
    <SidebarBlock collapse={collapse}>
      <SidebarCategory title="Survey" icon="map" collapse={collapse}>
        <SidebarLink title="Create" route="/survey-design" icon="pencil" onClick={onClick} />
        <SidebarLink title="Surveys List" route="/surveys" icon="list" />
        <SidebarLink 
          title="Submissions" 
          route="/survey-submissions" 
          icon="envelope" 
          onClick={onClick}
        />
        <SidebarLink title="Respondents" route="/respondents" icon="users" onClick={onClick} />
        <SidebarLink title="Survey Themes" route="/themes" icon="picture" />
      </SidebarCategory>
    </SidebarBlock>
    {/*
    <SidebarBlock collapse={collapse}>
      <SidebarCategory title="Analytics" icon="database" collapse={collapse}>
        <SidebarLink title="Users" route="/users" icon="users" onClick={onClick} />
      </SidebarCategory>
      <SidebarCategory title="Charts" icon="chart-bars" collapse={collapse}>
        <SidebarLink title="ChartsJS" route="/charts/charts_js" onClick={onClick} />
        <SidebarLink title="React-vis" route="/charts/react_vis" onClick={onClick} />
        <SidebarLink title="Recharts" route="/charts/recharts" onClick={onClick} />
        <SidebarLink title="Amcharts" route="/charts/amcharts" onClick={onClick} />
      </SidebarCategory>
    </SidebarBlock>
    */}
    <SidebarBlock collapse={collapse}>
      <SidebarLink title="App Dashboard" icon="smartphone" route="/app_dashboard" onClick={onClick} />
      <SidebarLink title="Surveys Dashboard" icon="apartment" route="/surveys_dashboard" onClick={onClick} />
    </SidebarBlock>
    <SidebarBlock collapse={collapse}>
      <SidebarCategory icon="layers" title="Theme" collapse={collapse}>
        <SidebarNavLink title="Light Theme" as="button" type="button" onClick={changeToLight}>
          <SidebarLinkTitle>Light Theme</SidebarLinkTitle>
        </SidebarNavLink>
        <SidebarNavLink title="Dark Theme" as="button" type="button" onClick={changeToDark}>
          <SidebarLinkTitle>Dark Theme</SidebarLinkTitle>
        </SidebarNavLink> 
      </SidebarCategory>
    </SidebarBlock>
    {/* 
    <SidebarBlock collapse={collapse}>
      <SidebarCategory title="Layout" icon="layers" collapse={collapse}>
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
          <SidebarLink title="FAQs" route="/default_pages/faq" onClick={onClick} />
          <SidebarLink title="Search Results" route="/default_pages/search_results" onClick={onClick} />
          <SidebarLink title="Text Editor" route="/default_pages/text_editor" onClick={onClick} />
        </SidebarCategory>
      </SidebarCategory>
      
    </SidebarBlock>
    */}
    <SidebarBlock collapse={collapse}>
      <SidebarLink 
        title="Documentation"
        icon="text-align-justify" 
        route="/documentation/introduction"
        onClick={onClick}
      />
    </SidebarBlock>
  </SidebarContentWrap>
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

const SidebarContentWrap = styled.div`
  height: 100%;
  overflow: auto;
  padding-top: 0;
  
  & > div:last-child {
    width: 4px !important;

    div {
      transition: height 0.3s;
      opacity: 0.52;
    }
  }
  7  @media screen and (min-width: 576px) 
    padding-top: 15px;
    
    ${props => props.collapse && `
      width: 55px;
      overflow: visible !important;
      transition: width 0.3s;
    `}
  }
`;

const SidebarBlock = styled.ul`
  padding: 15px 0;
  border-bottom: 1px solid ${colorBorder};
  list-style-type: none;
  
  &:last-child {
    border: none;
  }
  
  @media screen and (min-width: 576px) {
    
    ${props => props.collapse && `
      & > li > a,
      & > li > button {
        overflow: hidden;
        width: 55px;
        background: ${colorBackground(props)};
        
        span:last-of-type {
          opacity: 0;
          transition: 0.3s;
        }
  
        ${SidebarLinkTitle} {
          position: absolute;
          width: 160px;
          ${left(props)}: 70px;
        }
  
        &:hover {
          background: ${colorHover(props)};
        }
      }
      
      & > li:hover > a,
      & > li:hover > button {
        width: 275px;
        
        span {
          opacity: 1;
        }
      }
    `}
  }
`;

// endregion


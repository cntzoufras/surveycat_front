import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorBorder, colorBackground, colorHover } from '@/utils/palette';
import { left } from '@/utils/directions';
import SidebarLink, { SidebarNavLink, SidebarLinkTitle } from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import { useLocation } from 'react-router-dom';

const SidebarContent = ({
  onClick, changeToLight, changeToDark, collapse,
}) => {
  const location = useLocation();
  const isEditSurveyPage = /^\/surveys\/[^/]+\/pages\/.+/.test(location.pathname || '');

  return (
    <SidebarContentWrap collapse={collapse}>
      <SidebarBlock collapse={collapse}>
        <SidebarCategory title="Survey" icon="map" collapse={collapse}>
          <SidebarLink 
            title="Create" 
            route="/survey-design" 
            icon="pencil" 
            onClick={onClick}
            activeMatch={(loc) => (
              (loc.pathname || '').startsWith('/surveys/')
              || /^\/surveys\/[^/]+\/pages\/.+/.test((loc.pathname || ''))
              || (loc.pathname || '').startsWith('/survey-design')
            )}
            forceActive={isEditSurveyPage}
          />
          <SidebarLink title="Surveys List" route="/surveys" icon="list" onClick={onClick} end />
          <SidebarLink 
            title="Submissions" 
            route="/survey-submissions" 
            icon="envelope" 
            onClick={onClick}
          />
          <SidebarLink title="Respondents" route="/respondents" icon="users" onClick={onClick} />
          <SidebarLink title="Survey Themes" route="/themes" icon="picture" onClick={onClick} />
        </SidebarCategory>
      </SidebarBlock>
      <SidebarBlock collapse={collapse}>
        <SidebarLink title="App Dashboard" icon="smartphone" route="/dashboards/app" onClick={onClick} />
        <SidebarLink title="Surveys Dashboard" icon="apartment" route="/dashboards/surveys" onClick={onClick} />
      </SidebarBlock>
      </SidebarContentWrap>
  );
};

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


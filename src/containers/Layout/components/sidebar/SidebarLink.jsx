import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import {
  colorAccent,
  colorNavAccent,
  colorHover,
  colorText,
  sidebarColor,
  colorRed,
  colorGray,
} from '@/utils/palette';
import { 
  left,
  marginLeft,
  marginRight,
} from '@/utils/directions';

const SidebarLink = ({
  title, icon, newLink, route, onClick, activeMatch, end, forceActive,
}) => {
  const location = useLocation();
  const baseMatch = useMatch({ path: route, end });
  const manuallyActive = React.useMemo(() => {
    if (!activeMatch) return false;
    const path = location.pathname || '';
    const testers = Array.isArray(activeMatch) ? activeMatch : [activeMatch];
    return testers.some((t) => {
      if (typeof t === 'function') return !!t(location);
      if (t instanceof RegExp) return t.test(path);
      if (typeof t === 'string') return path.startsWith(t);
      return false;
    });
  }, [activeMatch, location]);

  const isActive = !!baseMatch || manuallyActive || forceActive;

  return (
    <li>
      <SidebarNavLink
        to={route}
        onClick={onClick}
        end={end}
        $active={isActive}
        className={isActive ? 'active' : ''}
      >
        {icon ? <SidebarLinkIcon className={`lnr lnr-${icon}`} /> : ''}
        <SidebarLinkTitle>
          {title}
          {newLink ? (
            <NewBadge bg="custom">
              <span>New</span>
            </NewBadge>
          ) : ''}
        </SidebarLinkTitle>
      </SidebarNavLink>
    </li>
  );
};

SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func,
  end: PropTypes.bool,
  activeMatch: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(RegExp),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.instanceOf(RegExp),
      PropTypes.string,
    ])),
  ]),
  forceActive: PropTypes.bool,
};

SidebarLink.defaultProps = {
  icon: '',
  newLink: false,
  route: '/',
  onClick: () => {},
  end: false,
  activeMatch: undefined,
  forceActive: false,
};

export default SidebarLink;

// region STYLES

export const SidebarNavLink = styled(NavLink)`
  height: 36px;
  width: 240px;
  transition: all 0.3s;
  position: relative;
  cursor: pointer;
  display: flex;
  padding: 11px 20px;
  overflow: hidden;
  background: transparent;
  border: none;
  color: ${colorText};
  text-align: ${left};
  font-size: 14px;

  &.active {
    background: ${sidebarColor};
    &:before { opacity: 1; }
  }

  ${({ $active }) => $active && css`
    background: ${sidebarColor};
    &:before { opacity: 1; }
  `}

  &:before {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 2px;
    background: ${colorNavAccent};
    opacity: 0;
    transition: all 0.3s;
    ${left}: 0;
  }

  &:hover {
    text-decoration: none;
    background-color: ${colorHover};
    color: ${colorText};

    &:before {
      opacity: 1;
    }
  }

  @media screen and (min-width: 576px) {
    width: 100%;

    span {
      position: relative;
      animation: none;
      ${left}: 0;
    }
  }
`;

const NewBadge = styled(Badge)`
  width: 26px;
  height: 14px;
  background-color: ${colorRed};
  font-size: 8px;
  font-weight: 400;
  padding: 2px;
  line-height: 9px;
  position: relative;
  text-transform: uppercase;
  border-radius: 7px;
  ${marginLeft}: 5px;

  span {
    position: absolute;
    top: 3px;
    width: 26px;
    text-align: center;
    ${left}: 0;
  }
`;

export const SidebarLinkTitle = styled.span`
  margin: 0;
  font-size: 14px;
  line-height: 16px;
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const SidebarLinkIcon = styled.span`
  font-size: 13px;
  line-height: 13px;
  color: ${lighten(0.25, colorGray)};
  ${marginRight}: 10px;
`;

// endregion

import React from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Dropdown, DropdownItem } from '@/shared/components/Dropdown';
import TopbarNavLink from './TopbarNavLink';
import {
  TopbarNavigationMenu,
  TopbarNavigationToggle,
} from '../../components/topbar/NavigationTopbarElements';

const TopbarNavDashboards = () => (
  <Dropdown>
    <TopbarNavigationToggle>
      Dashboards <DownIcon />
    </TopbarNavigationToggle>
    <TopbarNavigationMenu>
      <DropdownItem>
        <TopbarNavLink
          title="Online Marketing Dashboard"
          icon="home"
          route="/online_marketing_dashboard"
        />
      </DropdownItem>
      <DropdownItem>
        <TopbarNavLink
          title="E-commerce Dashboard"
          icon="store"
          route="/e_commerce_dashboard"
        />
      </DropdownItem>
      <DropdownItem>
        <TopbarNavLink
          title="App Dashboard"
          icon="smartphone"
          route="/dashboards/app"
        />
      </DropdownItem>
      <DropdownItem>
        <TopbarNavLink
          title="Surveys Dashboard"
          icon="apartment"
          route="/dashboards/surveys"
        />
      </DropdownItem>
      <DropdownItem>
        <TopbarNavLink
          title="Fitness Dashboard"
          icon="heart-pulse"
          route="/fitness_dashboard"
        />
      </DropdownItem>
    </TopbarNavigationMenu>
  </Dropdown>
);

export default TopbarNavDashboards;

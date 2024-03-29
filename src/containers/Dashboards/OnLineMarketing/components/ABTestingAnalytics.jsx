import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Panel from '@/shared/components/Panel';
import getTooltipStyles from '@/shared/helpers';
import { DashboardAreaChartContainer } from '../../BasicDashboardComponents';

const data = [{ name: 'Mon', a: 590, b: 1400 },
  { name: 'Tue', a: 868, b: 1506 },
  { name: 'Wed', a: 1397, b: 989 },
  { name: 'Thu', a: 1480, b: 1228 },
  { name: 'Fri', a: 1520, b: 1100 },
  { name: 'Sat', a: 1520, b: 1100 },
  { name: 'Sun', a: 1400, b: 1700 }];

const ABTestingAnalytics = ({ dir }) => {
  const { t } = useTranslation('common');

  const themeName = useSelector(state => state.theme.className);

  return (
    <Panel md={12} lg={12} xl={12} title={t('online_marketing_dashboard.ab_testing')}>
      <div>
        <DashboardAreaChartContainer height={250}>
          <AreaChart data={data} margin={{ top: 20, left: -15, bottom: 20 }}>
            <XAxis dataKey="name" tickLine={false} reversed={dir === 'rtl'} />
            <YAxis tickLine={false} orientation={dir === 'rtl' ? 'right' : 'left'} />
            <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
            <Legend />
            <CartesianGrid />
            <Area name="Site A" type="monotone" dataKey="a" fill="#4ce1b6" stroke="#4ce1b6" fillOpacity={0.2} />
            <Area name="Site B" type="monotone" dataKey="b" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.2} />
          </AreaChart>
        </DashboardAreaChartContainer>
      </div>
    </Panel>
  );
};

ABTestingAnalytics.propTypes = {
  dir: PropTypes.string.isRequired,
};

export default ABTestingAnalytics;

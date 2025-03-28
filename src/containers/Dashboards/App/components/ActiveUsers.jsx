import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Panel from '@/shared/components/Panel';
import getTooltipStyles from '@/shared/helpers';

const getRandomArbitrary = (minValue, maxValue) => {
  const ratio = (maxValue - minValue) + minValue;
  return Math.random() * ratio;
};

const generateRandomData = (dataLength, minDeviationValue, maxDeviationValue, minRange, maxRange) => {
  const rangeFactor = (maxRange - minRange) / dataLength;

  return Array.from({ length: dataLength }, (v, k) => (
    {
      name: k,
      point: (k * rangeFactor) + getRandomArbitrary(minDeviationValue, maxDeviationValue),
      amt: 2000,
    }));
};

const data = generateRandomData(100, -2000, 2000, 300, 6000);

const tickFormer = tick => `${tick / 1000}k`;

const ActiveUsers = () => {
  const { t } = useTranslation('common');

  const themeName = useSelector(state => state.theme.className);

  return (
    <Panel
      lg={6}
      xl={9}
      md={12}
      title={t('app_dashboard.active_users')}
      subhead="7‐day activity trend” or “User activity in the past 7 days."
    >
      <div>
        <ResponsiveContainer height={195} className="dashboard__active-users-chart">
          <LineChart
            height={195}
            data={data}
          >
            <YAxis
              tickLine={false}
              tickFormatter={tickFormer}
              interval="preserveStartEnd"
              width={50}
            />
            <XAxis
              hide
              padding={{ left: 30, right: 30 }}
            />
            <CartesianGrid vertical={false} />
            <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
            <Line type="linear" dataKey="point" dot={false} stroke="#b8e986" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
};

ActiveUsers.propTypes = {
  // dir: PropTypes.string,
};

export default ActiveUsers;

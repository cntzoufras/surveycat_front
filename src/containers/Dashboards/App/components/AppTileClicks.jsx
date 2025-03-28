import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Panel from '@/shared/components/Panel';
import getTooltipStyles from '@/shared/helpers';
import styled from 'styled-components';

const data = [
  {
    name: 'Market feedback', impressions: 6426, engagement: 4123,
  },
  {
    name: 'Employee satisfaction', impressions: 8531, engagement: 3820,
  },
  {
    name: 'Business awareness', impressions: 9822, engagement: 5405,
  },
  {
    name: 'Health considerations', impressions: 3908, engagement: 2780,
  },
  {
    name: 'Energy', impressions: 4800, engagement: 1890,
  },
];

/* 
   CUSTOM TOOLTIP
   - Show category and values with updated labels.
*/
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  const barA = payload[0]; // Impressions
  const barB = payload[1]; // Engagement
  return (
    <div style={{ background: '#2d2d2d', padding: '8px', borderRadius: '4px', color: '#fff' }}>
      <p style={{ margin: 0, fontWeight: 500 }}>{label}</p>
      {barA && (
        <p style={{ margin: 0 }}>
          Impressions: {barA.value}
        </p>
      )}
      {barB && (
        <p style={{ margin: 0 }}>
          Engagement: {barB.value}
        </p>
      )}
    </div>
  );
};

const AppTileClicks = () => {
  const { t } = useTranslation('common');
  const themeName = useSelector(state => state.theme.className);

  return (
    <Panel
      lg={6}
      xl={6}
      md={12}
      title={t('app_dashboard.app_tile_clicks')}
      subhead="Comparison with the previous month"
    >
      <ClicksChartWrap>
        <ResponsiveContainer height={300}>
          <BarChart
            data={data}
            layout="vertical"
            barGap={0}
            barCategoryGap={0}
            stackOffset="expand"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              width={150}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              {...getTooltipStyles(themeName, 'defaultItems')} 
            />
            {/* 
              Updated bars: now use 'impressions' and 'engagement' 
              in place of 'pv' and 'uv'.
            */}
            <Bar dataKey="impressions" fill="#48b5ff" barSize={12} />
            <Bar dataKey="engagement" fill="#FFA500" barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </ClicksChartWrap>
    </Panel>
  );
};

export default AppTileClicks;

// region STYLES
const ClicksChartWrap = styled.div`
  margin-top: -30px;
`;
// endregion

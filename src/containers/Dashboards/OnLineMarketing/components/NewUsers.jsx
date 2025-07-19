import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import {
  BarChart, Bar, Cell, ResponsiveContainer,
} from 'recharts';
import {
  Card, CardTitleWrap, CardTitle,
} from '@/shared/components/Card';
import {
  DashboardWidgetCard,
  DashboardWidgetChartContainer,
  DashboardWidgetTotal,
  DashboardWidgetTotalWrap,
  DashboardWidgetTrendingIconDown,
} from '../../BasicDashboardComponents';

const data = [
  { id: 0, name: 'Page A', pv: 255 },
  { id: 1, name: 'Page B', pv: 452 },
  { id: 2, name: 'Page C', pv: 154 },
  { id: 3, name: 'Page D', pv: 85 },
  { id: 4, name: 'Page E', pv: 545 },
  { id: 5, name: 'Page F', pv: 438 },
  { id: 6, name: 'Page G', pv: 523 },
  { id: 7, name: 'Page H', pv: 226 },
  { id: 8, name: 'Page I', pv: 112 },
  { id: 9, name: 'Page J', pv: 101 },
];

const NewUsers = () => {
  const { t } = useTranslation('common');
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];

  const handleClick = (item) => {
    const index = data.indexOf(item.payload);
    setActiveIndex(index);
  };

  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <DashboardWidgetCard>
          <CardTitleWrap>
            <CardTitle>{t('online_marketing_dashboard.new_users')}</CardTitle>
          </CardTitleWrap>
          <DashboardWidgetTotalWrap>
            <DashboardWidgetTrendingIconDown />
            <DashboardWidgetTotal>
              {(activeItem.pv)}
            </DashboardWidgetTotal>
            <DashboardWidgetChartContainer>
              <ResponsiveContainer height={50}>
                <BarChart data={data}>
                  <Bar dataKey="pv" onClick={handleClick}>
                    {data.map((entry, index) => (
                      <Cell
                        key={entry.id}
                        cursor="pointer"
                        fill={index === activeIndex ? '#4ce1b6' : '#c88ffa'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </DashboardWidgetChartContainer>
          </DashboardWidgetTotalWrap>
        </DashboardWidgetCard>
      </Card>
    </Col>
  );
};

export default NewUsers;

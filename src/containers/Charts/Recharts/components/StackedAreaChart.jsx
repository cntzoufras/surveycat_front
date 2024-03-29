import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Card, CardBody, CardTitleWrap, CardTitle,
} from '@/shared/components/Card';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const StackedAreaChart = ({ dir }) => {
  const { t } = useTranslation('common');

  return (
    <Col xs={12} md={12} lg={6} xl={4}>
      <Card>
        <CardBody>
          <CardTitleWrap>
            <CardTitle>{t('charts.recharts.stacked_area_chart')}</CardTitle>
          </CardTitleWrap>
          <div>
            <ResponsiveContainer height={300}>
              <AreaChart
                data={data}
                margin={{
                  top: 0, right: 0, left: -15, bottom: 0,
                }}
              >
                <XAxis dataKey="name" reversed={dir === 'rtl'} />
                <YAxis orientation={dir === 'rtl' ? 'right' : 'left'} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stackId="1" stroke="#24d6a3" fill="#4ce1b6" />
                <Area type="monotone" dataKey="pv" stackId="1" stroke="#f3ce3e" fill="#f6da6e" />
                <Area type="monotone" dataKey="amt" stackId="1" stroke="#3ea3fc" fill="#70bbfd" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

StackedAreaChart.propTypes = {
  dir: PropTypes.string.isRequired,
};

export default StackedAreaChart;

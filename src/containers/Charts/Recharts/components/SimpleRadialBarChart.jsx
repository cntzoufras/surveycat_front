import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import {
  RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Card, CardBody, CardTitleWrap, CardTitle,
} from '@/shared/components/Card';

const data = [
  {
    name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8',
  },
  {
    name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed',
  },
  {
    name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1',
  },
  {
    name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d',
  },
  {
    name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c',
  },
  {
    name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57',
  },
  {
    name: 'unknown', uv: 6.67, pv: 4800, fill: '#ffc658',
  },
];

const style = {
  lineHeight: '24px',
};

const tooltipColor = {
  color: '#70bbfd',
};

const SimpleRadialBarChart = () => {
  const { t } = useTranslation('common');
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    if (e.activeCoordinate) {
      setCoordinates({ x: e.activeCoordinate.x, y: e.activeCoordinate.y });
    }
  };

  return (
    <Col xs={12} md={12} lg={6} xl={4}>
      <Card>
        <CardBody>
          <CardTitleWrap>
            <CardTitle>{t('charts.recharts.simple_radial_bar_chart')}</CardTitle>
          </CardTitleWrap>
          <div>
            <ResponsiveContainer height={320}>
              <RadialBarChart
                cy={130}
                innerRadius={10}
                outerRadius={120}
                barSize={10}
                data={data}
                onMouseMove={onMouseMove}
              >
                <Tooltip itemStyle={tooltipColor} position={coordinates} />
                <RadialBar minAngle={15} background clockWise dataKey="uv" />
                <Legend iconSize={10} wrapperStyle={style} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SimpleRadialBarChart;

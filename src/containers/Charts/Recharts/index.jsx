import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import SimpleLineChart from './components/SimpleLineChart';
import DashedLineChart from './components/DashedLineChart';
import SimpleAreaChart from './components/SimpleAreaChart';
import StackedAreaChart from './components/StackedAreaChart';
import MultipleYAxesScatterChart from './components/MultipleYAxesScatterChart';
import SimpleRadialBarChart from './components/SimpleRadialBarChart';
import SimpleRadarChart from './components/SimpleRadarChart';
import TwoLevelPieChart from './components/TwoLevelPieChart';

const Recharts = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('charts.recharts.title')}</h3>
          <h3 className="page-subhead subhead">
            Use this elements, if you want to show some hints or additional information
          </h3>
        </Col>
      </Row>
      <Row>
        <SimpleLineChart />
        <DashedLineChart />
        <SimpleAreaChart />
        <StackedAreaChart />
        <MultipleYAxesScatterChart />
        <SimpleRadialBarChart />
        <SimpleRadarChart />
        <TwoLevelPieChart />
      </Row>
    </Container>
  );
};

export default Recharts;

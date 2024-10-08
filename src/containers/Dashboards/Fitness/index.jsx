import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import HeartRate from './components/HeartRate';
import CaloriesBurn from './components/CaloriesBurn';
import Steps from './components/Steps';
import Distance from './components/Distance';
import ActivityChart from './components/ActivityChart';
import TodayRunningMap from './components/TodayRunningMap';
import MyCompetitors from './components/MyCompetitors';
import FatBurning from './components/FatBurning';
import ActivityRating from './components/ActivityRating';

const FitnessDashboard = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('fitness_dashboard.page_title')}</h3>
        </Col>
      </Row>
      <Row>
        <HeartRate />
        <CaloriesBurn />
        <Steps />
        <Distance />
      </Row>
      <Row>
        <ActivityChart />
        <TodayRunningMap />
        <MyCompetitors />
        <FatBurning />
        <ActivityRating />
      </Row>
    </Container>
  );
};

export default FitnessDashboard;

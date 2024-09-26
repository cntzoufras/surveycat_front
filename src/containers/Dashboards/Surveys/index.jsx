import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import TotalSurveysCreated from './components/TotalSurveysCreated';
import SurveysStatus from './components/SurveysStatus';
import TotalSurveyResponses from './components/TotalSurveyResponses';
import TotalSurveyParticipants from './components/TotalSurveyParticipants';
import SurveyCompletionRate from './components/SurveyCompletionRate';
import WeeklyStat from './components/WeeklyStat';
import Occupancy from './components/Occupancy';

const SurveysDashboard = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('surveys_dashboard.page_title')}</h3>
        </Col>
      </Row>
      <Row>
        <TotalSurveysCreated />
        <TotalSurveyResponses />
        <SurveysStatus />
        <TotalSurveyParticipants />
      </Row>
      <Row>
        <SurveyCompletionRate />
        <WeeklyStat />
        <Occupancy />
      </Row>
    </Container>
  );
};

export default SurveysDashboard;

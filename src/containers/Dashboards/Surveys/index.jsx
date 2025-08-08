import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import WeeklySubmissionsProgress from './components/WeeklySubmissionsProgress';
import SurveysStatus from './components/SurveysStatus';
import TotalRespondents from './components/TotalRespondents';
import WeeklyRespondents from './components/WeeklyRespondents';
import SurveyCompletionRate from './components/SurveyCompletionRate';
import WeeklyStat from './components/WeeklyStat';
import SurveyTracking from './components/SurveyTracking';
import SurveyEngagement from './components/SurveyEngagement';
import { fetchSurveyDashboardData } from '../../../redux/actions/dashboardActions';
import Loading from '@/shared/components/Loading';

const SurveysDashboard = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(state => state.dashboard.surveyDashboard);

  useEffect(() => {
    dispatch(fetchSurveyDashboardData());
  }, [dispatch]);

  const hasData = !!(data && Object.keys(data).length > 0);

  const {
    weeklySubmissions,
    monthlySubmissions,
    surveyStatusCounts,
    totalRespondents,
    respondentsWeekly,
    topSurveys,
    yearlySubmissions,
    topSurveyTopics,
  } = data;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('surveys_dashboard.page_title')}</h3>
        </Col>
      </Row>
      {error && (
        <Row className="mb-3">
          <Col md={12}>
            <Alert variant="danger">Error loading dashboard data: {error.message || String(error)}</Alert>
          </Col>
        </Row>
      )}
      {loading ? (
        <Row className="mt-3" style={{ justifyContent: 'center' }}>
          <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: 360, width: '100%' }}>
              <Loading loading fullScreen={false} label="Loading" minHeight={120} />
            </div>
          </Col>
        </Row>
      ) : hasData ? (
        <>
          <Row className="align-items-start">
            <WeeklySubmissionsProgress weeklySubmissions={weeklySubmissions} />
            <TotalRespondents total={totalRespondents} />
            <SurveysStatus counts={surveyStatusCounts} />
            <WeeklyRespondents weeklyRespondents={respondentsWeekly} />
          </Row>
          <Row className="align-items-start">
            <SurveyCompletionRate />
            <SurveyTracking surveys={topSurveys} />
          </Row>
          <Row className="align-items-start">
            <SurveyEngagement submissions={yearlySubmissions} />
            <WeeklyStat topics={topSurveyTopics} />
          </Row>
        </>
      ) : (
        <Row className="mt-3">
          <Col md={12}>
            <Alert variant="info">No dashboard data available.</Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SurveysDashboard;

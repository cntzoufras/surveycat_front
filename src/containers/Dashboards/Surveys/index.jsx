import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import WeeklySubmissionsProgress from './components/WeeklySubmissionsProgress';
import SurveysStatus from './components/SurveysStatus';
import TotalRespondents from './components/TotalRespondents';
import WeeklyRespondents from './components/WeeklyRespondents';
import SurveyCompletionRate from './components/SurveyCompletionRate';
import WeeklyStat from './components/WeeklyStat';
import SurveyTracking from './components/SurveyTracking';
import SurveyEngagement from './components/SurveyEngagement';
import { fetchSurveyDashboardData } from '../../../redux/actions/dashboardActions';

const SurveysDashboard = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(state => state.dashboard);

  // Log the state from Redux to debug
  console.log('Dashboard state from Redux:', { loading, data, error });

  useEffect(() => {
    dispatch(fetchSurveyDashboardData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading dashboard data...</p>;
  }

  if (error) {
    return <p>Error loading dashboard data: {error.message || error}</p>;
  }

  // Ensure data is not null or empty before rendering components that use it
  if (!data || Object.keys(data).length === 0) {
    return <p>No dashboard data available.</p>;
  }

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
      <Row>
        <WeeklySubmissionsProgress weeklySubmissions={weeklySubmissions} />
        <TotalRespondents total={totalRespondents} />
        <SurveysStatus counts={surveyStatusCounts} />
        <WeeklyRespondents weeklyRespondents={respondentsWeekly} />
      </Row>
      <Row>
        <SurveyCompletionRate />
        <WeeklyStat topics={topSurveyTopics} />
        <SurveyTracking surveys={topSurveys} />
        <SurveyEngagement submissions={yearlySubmissions} />
      </Row>
    </Container>
  );
};

export default SurveysDashboard;

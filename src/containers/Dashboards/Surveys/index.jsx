import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Col, Container, Row, Alert,
} from 'react-bootstrap';
import PageHeader from '@/shared/components/PageHeader';
import Loading from '@/shared/components/Loading';
import WeeklySubmissionsProgress from './components/WeeklySubmissionsProgress';
import SurveysStatus from './components/SurveysStatus';
import TotalRespondents from './components/TotalRespondents';
import WeeklyRespondents from './components/WeeklyRespondents';
import SurveyCompletionRate from './components/SurveyCompletionRate';
import WeeklyStat from './components/WeeklyStat';
import SurveyTracking from './components/SurveyTracking';
import SurveyEngagement from './components/SurveyEngagement';
import BounceRate from './components/BounceRate';
import VisitorSessions from './components/VisitorSessions';
import AudienceByCountry from './components/AudienceByCountry';
import Occupancy from './components/Occupancy';
import { fetchSurveyDashboardData } from '../../../redux/actions/dashboardActions';

const SurveysDashboard = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(state => state.dashboard.surveyDashboard);
  const authUser = useSelector(state => state.auth?.user);
  const isAdmin = !!(authUser?.is_admin || authUser?.isAdmin || authUser?.role === 'admin');

  useEffect(() => {
    dispatch(fetchSurveyDashboardData());
  }, [dispatch]);

  const hasData = !!(data && Object.keys(data).length > 0);
  const dashboardData = data || {};
  const {
    weeklySubmissions,
    // monthlySubmissions, // removed: unused
    surveyStatusCounts,
    totalRespondents,
    respondentsWeekly,
    topSurveys,
    yearlySubmissions,
    topSurveyTopics,
  } = dashboardData;

  let content;
  if (loading) {
    content = (
      <Row className="mt-3" style={{ justifyContent: 'center' }}>
        <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: 360, width: '100%' }}>
            <Loading loading fullScreen={false} label="Loading" minHeight={120} />
          </div>
        </Col>
      </Row>
    );
  } else if (hasData) {
    content = (
      <>
        <Row className="align-items-start">
          <WeeklySubmissionsProgress weeklySubmissions={weeklySubmissions} />
          <TotalRespondents total={totalRespondents} />
          <SurveysStatus counts={surveyStatusCounts} />
          <WeeklyRespondents weeklyRespondents={respondentsWeekly} />
        </Row>
        <Row className="align-items-start">
          <SurveyCompletionRate />
          <WeeklyStat topics={topSurveyTopics} />
        </Row>
        <Row className="align-items-start">
          <SurveyTracking surveys={topSurveys} />
          <SurveyEngagement submissions={yearlySubmissions} />
        </Row>
        <Row className="align-items-start mt-3">
          <BounceRate />
        </Row>
        <Row className="align-items-start">
          <VisitorSessions />
          <AudienceByCountry />
        </Row>
        <Row className="align-items-start">
          <Occupancy />
        </Row>
      </>
    );
  } else {
    content = (
      <Row className="mt-3">
        <Col md={12}>
          <Alert variant="info">No dashboard data available.</Alert>
        </Col>
      </Row>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <PageHeader
            title={t('surveys_dashboard.page_title')}
            subtitle={isAdmin ? null : 'All metrics reflect your surveys and their respondents.'}
          />
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col md={12}>
            {(() => {
 const errorText = typeof error === 'string' ? error : (error?.message || String(error));
              return (
                <Alert variant="danger">
                  Error loading dashboard data: {errorText}
                </Alert>
              ); 
})()}
          </Col>
        </Row>
      )}

      {content}
    </Container>
  );
};

export default SurveysDashboard;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchAppDashboardData } from '../../../redux/actions/dashboardActions';
import TotalUsers from './components/TotalUsers';
import TotalSurveys from './components/TotalSurveys';
import NewUsers from './components/NewUsers';
import NewSurveys from './components/NewSurveys';
import DailyRespondentsChart from './components/DailyRespondentsChart';
import TotalSubmissions from './components/TotalSubmissions';
import WeeklySubmissions from './components/WeeklySubmissions';
import OverallStats from './components/OverallStats';
import RecentPerformance from './components/RecentPerformance';

const AppDashboard = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const appDashboard = useSelector(state => state.dashboard.appDashboard);
  const { data, loading, error } = appDashboard;

  useEffect(() => {
    dispatch(fetchAppDashboardData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('app_dashboard.page_title')}</h3>
        </Col>
      </Row>
      <Row>
        <TotalUsers totalUsers={data?.totalUsers} />
        <TotalSurveys totalSurveys={data?.totalSurveys} />
        <NewUsers newUsers={data?.newUsers} />
        <NewSurveys newSurveys={data?.newSurveys} />
        <TotalSubmissions totalSubmissions={data?.totalSubmissions} />
        <WeeklySubmissions weeklySubmissions={data?.submissions?.last7days} />
      </Row>
      <Row>
        <OverallStats stats={data?.overallStats} />
        <RecentPerformance performance={data?.recentPerformance} />
      </Row>
      <Row>
        <Col md={12}>
          <DailyRespondentsChart data={data?.activeUsers} />
        </Col>
      </Row>
    </Container>
  );
};

export default AppDashboard;

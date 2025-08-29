import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
 Col, Container, Row, Alert, 
} from 'react-bootstrap';
import { Box } from '@mui/material';
import PageHeader from '@/shared/components/PageHeader';
import Loading from '@/shared/components/Loading';
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

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <PageHeader title={t('app_dashboard.page_title')} />
        </Col>
      </Row>
      {error && (
        <Row className="mb-3">
          <Col md={12}>
            {(() => {
 const errorText = typeof error === 'string' ? error : (error?.message || String(error));
              return (
                <Alert variant="danger">Error: {errorText}</Alert>
              ); 
})()}
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
      ) : (
        <>
          <Row>
            <TotalUsers totalUsers={data?.totalUsers} />
            <NewUsers newUsers={data?.newUsers} />
            <TotalSurveys totalSurveys={data?.totalSurveys} />
            <NewSurveys newSurveys={data?.newSurveys} />
            <TotalSubmissions totalSubmissions={data?.totalSubmissions} />
            <WeeklySubmissions weeklySubmissions={data?.submissions?.last7days} />
            <OverallStats stats={data?.overallStats} />
          </Row>
          <Row>
            <Col md={12}>
              <DailyRespondentsChart data={data?.activeUsers} />
              <RecentPerformance performance={data?.recentPerformance} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AppDashboard;

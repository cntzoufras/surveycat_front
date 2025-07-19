import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import Visits from './components/Visits';
import TotalPageViews from './components/TotalPageViews';
import NewUsers from './components/NewUsers';
import BounceRate from './components/BounceRate';
import ABTestingAnalytics from './components/ABTestingAnalytics';
import BounceRateArea from './components/BounceRateArea';
import VisitorsSessions from './components/VisitorsSessions';
import SalesStatistic from './components/SalesStatistic';
import BudgetStatistic from './components/BudgetStatistic';
import AudienceByCountry from './components/AudienceByCountry';
import BestSellingRegions from './components/BestSellingRegions';
import GoalsCompletion from './components/GoalsCompletion';

const OnLineMarketingDashboard = () => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('online_marketing_dashboard.page_title')}</h3>
        </Col>
      </Row>
      <Row>
        <Visits />
        <TotalPageViews />
        <NewUsers />
        <BounceRate />
      </Row>
      <Row>
        <ABTestingAnalytics />
        <BounceRateArea />
        <VisitorsSessions />
        <SalesStatistic />
        <BudgetStatistic />
        <AudienceByCountry />
        <BestSellingRegions />
        <GoalsCompletion />
      </Row>
    </Container>
  );
};

export default OnLineMarketingDashboard;

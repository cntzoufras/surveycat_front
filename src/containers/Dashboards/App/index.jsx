import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import CurrentUsers from './components/CurrentUsers';
import ActiveUsers from './components/ActiveUsers';
import SessionShort from './components/SessionShort';
import ActiveUsersShort from './components/ActiveUsersShort';
import NewUsersShort from './components/NewUsersShort';
import PageViewsShort from './components/PageViewsShort';
import AppTileClicks from './components/AppTileClicks';
import WeeklyStatMobile from './components/WeeklyStatMobile';
import SocialMarketing from './components/SocialMarketing';

const AppDashboard = () => {
  const { t } = useTranslation('common');

  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('app_dashboard.page_title')}</h3>
        </Col>
      </Row>
      <Row>
        <CurrentUsers />
        <ActiveUsers />
      </Row>
      <Row>
        <NewUsersShort />
        <SessionShort />
        <PageViewsShort />
      </Row>
      <Row>
        <AppTileClicks />
        <WeeklyStatMobile />
        {/* <SocialMarketing /> */}
      </Row>
    </Container>
  );
};

export default AppDashboard;

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { Card } from '@/shared/components/Card';
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  DashboardBookingTotalWrap,
  TotalSurveysCreatedTitle,
} from '../../Surveys/SurveysCardDashboardElements';

const NewSurveys = ({ newSurveys }) => {
  const { t } = useTranslation('common');
  const last7Days = newSurveys?.last7days || 0;
  const last30Days = newSurveys?.last30days || 0;

  return (
    <Col md={6} xl={3} lg={6} xs={12}>
      <Card>
        <DashboardBookingCard>
          <DashboardBookingTotalWrap>
            <TotalSurveysCreatedTitle>{last7Days}</TotalSurveysCreatedTitle>
            <DashboardBookingDescription>Last 7 Days</DashboardBookingDescription>
          </DashboardBookingTotalWrap>
          <DashboardBookingTotalWrap>
            <TotalSurveysCreatedTitle>{last30Days}</TotalSurveysCreatedTitle>
            <DashboardBookingDescription>Last 30 Days</DashboardBookingDescription>
          </DashboardBookingTotalWrap>
          <DashboardBookingDescription>{t('app_dashboard.new_surveys')}</DashboardBookingDescription>
        </DashboardBookingCard>
      </Card>
    </Col>
  );
};

NewSurveys.propTypes = {
  newSurveys: PropTypes.shape({
    last7days: PropTypes.number,
    last30days: PropTypes.number,
  }),
};

NewSurveys.defaultProps = {
  newSurveys: {
    last7days: 0,
    last30days: 0,
  },
};

export default NewSurveys;

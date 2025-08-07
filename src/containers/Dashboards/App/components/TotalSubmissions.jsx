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

const TotalSubmissions = ({ totalSubmissions }) => {
  const { t } = useTranslation('common');

  return (
    <Col md={6} xl={3} lg={6} xs={12}>
      <Card>
        <DashboardBookingCard>
          <DashboardBookingTotalWrap>
            <TotalSurveysCreatedTitle>
              {totalSubmissions || 0}
            </TotalSurveysCreatedTitle>
          </DashboardBookingTotalWrap>
          <DashboardBookingDescription>{t('app_dashboard.total_submissions')}</DashboardBookingDescription>
        </DashboardBookingCard>
      </Card>
    </Col>
  );
};

TotalSubmissions.propTypes = {
  totalSubmissions: PropTypes.number,
};

TotalSubmissions.defaultProps = {
  totalSubmissions: 0,
};

export default TotalSubmissions;

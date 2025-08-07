import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
import { Card } from '@/shared/components/Card';
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  DashboardBookingTotalWrap,
  TotalSurveysCreatedTitle,
} from '../../Surveys/SurveysCardDashboardElements';

const OverallStats = ({ stats }) => {
  const { t } = useTranslation('common');

  return (
    <Col md={12} lg={6}>
      <Card>
        <Card.Body>
          <h5 className="card__title">{t('app_dashboard.overall_statistics')}</h5>
          <Row>
            <Col xs={6}>
              <DashboardBookingCard>
                <DashboardBookingTotalWrap>
                  <TotalSurveysCreatedTitle>
                    {stats.averageCompletionRate}%
                  </TotalSurveysCreatedTitle>
                </DashboardBookingTotalWrap>
                <DashboardBookingDescription>{t('app_dashboard.avg_completion_rate')}</DashboardBookingDescription>
              </DashboardBookingCard>
            </Col>
            <Col xs={6}>
              <DashboardBookingCard>
                <DashboardBookingTotalWrap>
                  <TotalSurveysCreatedTitle>
                    {stats.averageTimeToComplete}s
                  </TotalSurveysCreatedTitle>
                </DashboardBookingTotalWrap>
                <DashboardBookingDescription>{t('app_dashboard.avg_time_to_complete')}</DashboardBookingDescription>
              </DashboardBookingCard>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

OverallStats.propTypes = {
  stats: PropTypes.shape({
    averageCompletionRate: PropTypes.number,
    averageTimeToComplete: PropTypes.number,
  }),
};

OverallStats.defaultProps = {
  stats: {
    averageCompletionRate: 0,
    averageTimeToComplete: 0,
  },
};

export default OverallStats;

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import { Card } from '@/shared/components/Card';
import { statWeeklySubmissionsColor, statUsersColor } from '@/utils/palette';
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
      <Row>
        <Col xs={6}>
          <Card>
            <DashboardBookingCard>
              <DashboardBookingTotalWrap>
                <TotalSurveysCreatedTitle $color={statWeeklySubmissionsColor}>
                  {stats.averageCompletionRate}%
                </TotalSurveysCreatedTitle>
                <TrendingUpIcon />
              </DashboardBookingTotalWrap>
              <DashboardBookingDescription>{t('app_dashboard.avg_completion_rate')}</DashboardBookingDescription>
            </DashboardBookingCard>
          </Card>
        </Col>
        <Col xs={6}>
          <Card>
            <DashboardBookingCard>
              <DashboardBookingTotalWrap>
                <TotalSurveysCreatedTitle $color={statUsersColor}>
                  {stats.averageTimeToComplete}s
                </TotalSurveysCreatedTitle>
                <TrendingUpIcon />
              </DashboardBookingTotalWrap>
              <DashboardBookingDescription>{t('app_dashboard.avg_time_to_complete')}</DashboardBookingDescription>
            </DashboardBookingCard>
          </Card>
        </Col>
      </Row>
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

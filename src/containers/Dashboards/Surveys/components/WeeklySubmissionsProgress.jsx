import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import ProgressBar from '@/shared/components/ProgressBar';
import { Card } from '@/shared/components/Card';
import { statWeeklySubmissionsColor } from '@/utils/palette';
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  TotalSurveysCreatedTitle,
  DashboardBookingTotalWrap,
} from '../SurveysCardDashboardElements';

const WeeklySubmissionsProgress = ({ weeklySubmissions, goal = 1000 }) => {
  const progress = goal > 0 ? Math.min(Math.round((weeklySubmissions / goal) * 100), 100) : 0;

  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <DashboardBookingCard>
          <DashboardBookingTotalWrap>
            <TotalSurveysCreatedTitle $color={statWeeklySubmissionsColor}>
              {weeklySubmissions || 0}
            </TotalSurveysCreatedTitle>
            <TrendingUpIcon />
          </DashboardBookingTotalWrap>
          <DashboardBookingDescription>Submissions<br />weekly progress</DashboardBookingDescription>
          <ProgressBar now={progress} label={`${progress}%`} rounded size="small" gradient="green" top />
        </DashboardBookingCard>
      </Card>
    </Col>
  );
};

WeeklySubmissionsProgress.propTypes = {
  weeklySubmissions: PropTypes.number,
  goal: PropTypes.number,
};

WeeklySubmissionsProgress.defaultProps = {
  weeklySubmissions: 0,
  goal: 1000,
};

export default WeeklySubmissionsProgress;

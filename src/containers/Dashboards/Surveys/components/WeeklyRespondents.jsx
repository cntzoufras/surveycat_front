import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import ProgressBar from '@/shared/components/ProgressBar';
import { Card } from '@/shared/components/Card';
import { colorGreen } from '@/utils/palette';
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  TotalSurveysCreatedTitle,
  DashboardBookingTotalWrap,
} from '../SurveysCardDashboardElements';

const WeeklyRespondents = ({ weeklyRespondents, goal = 1000 }) => {
  const progress = goal > 0 ? Math.min(Math.round((weeklyRespondents / goal) * 100), 100) : 0;

  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <DashboardBookingCard>
          <DashboardBookingTotalWrap>
            <TotalSurveysCreatedTitle color={colorGreen}>
              {weeklyRespondents || 0}
            </TotalSurveysCreatedTitle>
            <TrendingUpIcon />
          </DashboardBookingTotalWrap>
          <DashboardBookingDescription>Respondents<br />weekly progress</DashboardBookingDescription>
          <ProgressBar now={progress} label={`${progress}%`} rounded size="small" gradient="green" top />
        </DashboardBookingCard>
      </Card>
    </Col>
  );
};

WeeklyRespondents.propTypes = {
  weeklyRespondents: PropTypes.number,
  goal: PropTypes.number,
};

WeeklyRespondents.defaultProps = {
  weeklyRespondents: 0,
  goal: 400,
};

export default WeeklyRespondents;

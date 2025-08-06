import React from 'react';
import { Col } from 'react-bootstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon'; // You can use different icons for each status if needed
import ProgressBar from '@/shared/components/ProgressBar';
import { Card } from '@/shared/components/Card';
import { colorBlue, colorRed } from '@/utils/palette'; // Added colorRed for inactive surveys
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  TotalSurveysCreatedTitle,
  DashboardBookingTotalWrap,
} from '../SurveysCardDashboardElements';

const SurveysStatus = ({ counts }) => {
  // Default to 0 if counts is not available
  const safeCounts = counts || {};
  const activeSurveys = safeCounts.active || 0;
  const inactiveSurveys = safeCounts.inactive || 0;
  const total = activeSurveys + inactiveSurveys;

  const activePercentage = total > 0 ? Math.round((activeSurveys / total) * 100) : 0;
  const inactivePercentage = total > 0 ? Math.round((inactiveSurveys / total) * 100) : 0;

  return (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <DashboardBookingCard>
        <DashboardBookingTotalWrap>
          <TotalSurveysCreatedTitle color={colorBlue}>
            {activeSurveys} Active
          </TotalSurveysCreatedTitle>
          <TrendingUpIcon />
        </DashboardBookingTotalWrap>
        
        <DashboardBookingTotalWrap>
          <TotalSurveysCreatedTitle color={colorRed}>
            {inactiveSurveys} Inactive
          </TotalSurveysCreatedTitle>
          <TrendingUpIcon />
        </DashboardBookingTotalWrap>

        <DashboardBookingDescription>Surveys Status</DashboardBookingDescription>
        
        <ProgressBar 
          now={activePercentage}
          label={`${activePercentage}% Active`}
          rounded 
          size="middle" 
          gradient="blue" 
          top 
        />
        <ProgressBar 
          now={inactivePercentage}
          label={`${inactivePercentage}% Inactive`}
          rounded
          size="middle" 
          gradient="pink" 
          top 
        />
      </DashboardBookingCard>
    </Card>
  </Col>
  );
};

export default SurveysStatus;

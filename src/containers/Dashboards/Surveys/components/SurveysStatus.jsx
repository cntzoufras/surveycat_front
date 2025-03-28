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

const totalActiveSurveys = 12;
const totalInactiveSurveys = 4; // Example number for inactive surveys (DRAFT/CLOSED)

const SurveysStatus = () => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <DashboardBookingCard>
        <DashboardBookingTotalWrap>
          <TotalSurveysCreatedTitle color={colorBlue}>
            {totalActiveSurveys} Active
          </TotalSurveysCreatedTitle>
          <TrendingUpIcon />
        </DashboardBookingTotalWrap>
        
        <DashboardBookingTotalWrap>
          <TotalSurveysCreatedTitle color={colorRed}>
            {totalInactiveSurveys} Inactive
          </TotalSurveysCreatedTitle>
          <TrendingUpIcon />
        </DashboardBookingTotalWrap>

        <DashboardBookingDescription>Surveys Status</DashboardBookingDescription>
        
        <ProgressBar 
          now={(totalActiveSurveys / (totalActiveSurveys + totalInactiveSurveys)) * 100}
          label={`${Math.round((totalActiveSurveys / (totalActiveSurveys + totalInactiveSurveys)) * 100)}% Active`}
          rounded 
          size="middle" 
          gradient="blue" 
          top 
        />
        <ProgressBar 
          now={(totalInactiveSurveys / (totalActiveSurveys + totalInactiveSurveys)) * 100}
          label={`${Math.round((totalInactiveSurveys / (totalActiveSurveys + totalInactiveSurveys)) * 100)}% Inactive`}
          rounded
          size="middle" 
          gradient="pink" 
          top 
        />
      </DashboardBookingCard>
    </Card>
  </Col>
);

export default SurveysStatus;

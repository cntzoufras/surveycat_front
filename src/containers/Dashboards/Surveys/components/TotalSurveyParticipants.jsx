import React from 'react';
import { Col } from 'react-bootstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import ProgressBar from '@/shared/components/ProgressBar';
import { Card } from '@/shared/components/Card';
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  DashboardBookingTitle,
  DashboardBookingTotalWrap,
} from '../SurveysCardDashboardElements';

const TotalSurveyParticipants = () => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <DashboardBookingCard>
        <DashboardBookingTotalWrap>
          <DashboardBookingTitle>34</DashboardBookingTitle>
          <TrendingUpIcon />
        </DashboardBookingTotalWrap>
        <DashboardBookingDescription>Total Survey Participants</DashboardBookingDescription>
        <ProgressBar now={65} label="65%" rounded size="small" gradient="pink" top />
      </DashboardBookingCard>
    </Card>
  </Col>
);

export default TotalSurveyParticipants;

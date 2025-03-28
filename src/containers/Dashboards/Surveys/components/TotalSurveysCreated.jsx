import React from 'react';
import { Col } from 'react-bootstrap';
import TrendingDownIcon from 'mdi-react/TrendingDownIcon';
import ProgressBar from '@/shared/components/ProgressBar';
import { Card } from '@/shared/components/Card';
import { colorRed } from '@/utils/palette';
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  TotalSurveysCreatedTitle,
  DashboardBookingTotalWrap,
} from '../SurveysCardDashboardElements';

const TotalSurveysCreated = () => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <DashboardBookingCard>
        <DashboardBookingTotalWrap>
          <TotalSurveysCreatedTitle color={colorRed}>
            227
          </TotalSurveysCreatedTitle>
          <TrendingDownIcon />
        </DashboardBookingTotalWrap>
        <DashboardBookingDescription>Surveys Created<br />weekly progress</DashboardBookingDescription>
        <ProgressBar now={87} label="87%" rounded size="small" gradient="pink" top />
      </DashboardBookingCard>
    </Card>
  </Col>
);

export default TotalSurveysCreated;

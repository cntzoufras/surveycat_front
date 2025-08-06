import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Card } from '@/shared/components/Card';
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  DashboardBookingTotalWrap,
  TotalSurveysCreatedTitle,
} from '../SurveysCardDashboardElements';

const TotalRespondents = ({ total }) => (
  <Col md={6} xl={3} lg={6} xs={12}>
    <Card>
      <DashboardBookingCard>
        <DashboardBookingTotalWrap>
          <TotalSurveysCreatedTitle>
            {total || 0}
          </TotalSurveysCreatedTitle>
        </DashboardBookingTotalWrap>
        <DashboardBookingDescription>Total Respondents</DashboardBookingDescription>
      </DashboardBookingCard>
    </Card>
  </Col>
);

TotalRespondents.propTypes = {
  total: PropTypes.number,
};

TotalRespondents.defaultProps = {
  total: 0,
};

export default TotalRespondents;

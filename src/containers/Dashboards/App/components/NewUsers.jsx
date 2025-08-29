import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/components/Card';
import { statNewUsersColor } from '@/utils/palette';
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  DashboardBookingTotalWrap,
  TotalSurveysCreatedTitle,
} from '../../Surveys/SurveysCardDashboardElements';

const NewUsers = ({ newUsers }) => {
  const { t } = useTranslation('common');
  const user = useSelector(state => state.auth?.user);
  const isAdmin = !!(user?.is_admin || user?.isAdmin || user?.role === 'admin');
  const last7Days = newUsers?.last7days || 0;
  const last30Days = newUsers?.last30days || 0;

  return (
    <Col md={6} xl={3} lg={6} xs={12}>
      <Card>
        <DashboardBookingCard>
          <DashboardBookingTotalWrap>
            <TotalSurveysCreatedTitle $color={statNewUsersColor}>{last7Days}</TotalSurveysCreatedTitle>
            <DashboardBookingDescription>Last 7 Days</DashboardBookingDescription>
          </DashboardBookingTotalWrap>
          <DashboardBookingTotalWrap>
            <TotalSurveysCreatedTitle $color={statNewUsersColor}>{last30Days}</TotalSurveysCreatedTitle>
            <DashboardBookingDescription>Last 30 Days</DashboardBookingDescription>
          </DashboardBookingTotalWrap>
          <DashboardBookingDescription title={isAdmin ? t('app_dashboard.new_users') : 'Respondents are unique people who interacted with your surveys.'}>
            {isAdmin ? t('app_dashboard.new_users') : 'New Respondents'}
          </DashboardBookingDescription>
        </DashboardBookingCard>
      </Card>
    </Col>
  );
};

NewUsers.propTypes = {
  newUsers: PropTypes.shape({
    last7days: PropTypes.number,
    last30days: PropTypes.number,
  }),
};

NewUsers.defaultProps = {
  newUsers: {
    last7days: 0,
    last30days: 0,
  },
};

export default NewUsers;

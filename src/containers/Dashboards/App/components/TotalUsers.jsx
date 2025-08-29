import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
import { Card } from '@/shared/components/Card';
import { statUsersColor } from '@/utils/palette';
import {
  DashboardBookingCard,
  DashboardBookingDescription,
  DashboardBookingTotalWrap,
  TotalSurveysCreatedTitle,
} from '../../Surveys/SurveysCardDashboardElements';

const TotalUsers = ({ totalUsers }) => {
  const { t } = useTranslation('common');
  const user = useSelector(state => state.auth?.user);
  const isAdmin = !!(user?.is_admin || user?.isAdmin || user?.role === 'admin');

  return (
    <Col md={6} xl={3} lg={6} xs={12}>
      <Card>
        <DashboardBookingCard>
          <DashboardBookingTotalWrap>
            <TotalSurveysCreatedTitle $color={statUsersColor}>
              {totalUsers || 0}
            </TotalSurveysCreatedTitle>
            <TrendingUpIcon />
          </DashboardBookingTotalWrap>
          <DashboardBookingDescription
            title={isAdmin 
              ? t('app_dashboard.total_users') 
              : 'Respondents are unique people who interacted with your surveys.'}
          >
            {isAdmin ? t('app_dashboard.total_users') : 'Total Respondents'}
          </DashboardBookingDescription>
        </DashboardBookingCard>
      </Card>
    </Col>
  );
};

TotalUsers.propTypes = {
  totalUsers: PropTypes.number,
};

TotalUsers.defaultProps = {
  totalUsers: 0,
};

export default TotalUsers;

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Pie, ResponsiveContainer } from 'recharts';
import Panel, { PanelTitle } from '@/shared/components/Panel';
import ProgressBar from '@/shared/components/ProgressBar';
import {
  DashboardWeeklyStatChart,
  DashboardWeeklyStatChartItem,
  DashboardWeeklyStatChartPie,
  DashboardWeeklyStatInfo,
  DashboardWeeklyStatLabel,
  DashboardWeeklyStatPieChart,
  DashboardWeeklyStatWrap,
  DashboardSocialStatItem,
  DashboardSocialStatProgress,
  DashboardSocialStatTitle,
} from '../../BasicStatisticComponents';

const data01 = [{ value: 78, fill: '#b8e986' },
  { value: 23, fill: '#eeeeee' }];

const data02 = [{ value: 25, fill: '#ff4861' },
  { value: 75, fill: '#eeeeee' }];

const social = [
  { id: 2, social: 'Blog', progress: '67' },
  { id: 3, social: 'Linkedin', progress: '18' },
  { id: 0, social: 'Facebook', progress: '10' },
  { id: 1, social: 'X (Twitter)', progress: '5' },
];

const SocialScore = ({ children, progress }) => (
  <DashboardSocialStatItem>
    <DashboardSocialStatTitle>
      {children}
    </DashboardSocialStatTitle>
    <DashboardSocialStatProgress>
      <ProgressBar top now={progress} label={`${progress}%`} rounded size="small" gradient="blue" />
    </DashboardSocialStatProgress>
  </DashboardSocialStatItem>
);

SocialScore.propTypes = {
  progress: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const WeeklyStat = () => {
  const { t } = useTranslation('common');

  return (
    <Panel
      md={12}
      lg={6}
      xl={3}
      xs={12}
      title={t('surveys_dashboard.weekly_stat')}
      subhead="Top participated Surveys statistic by last month"
    >
      <DashboardWeeklyStatWrap>
        <DashboardWeeklyStatChart>
          <DashboardWeeklyStatChartItem>
            <DashboardWeeklyStatChartPie>
              <ResponsiveContainer>
                <DashboardWeeklyStatPieChart>
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx={50}
                    cy={50}
                    innerRadius={50}
                    outerRadius={55}
                  />
                </DashboardWeeklyStatPieChart>
              </ResponsiveContainer>
              <DashboardWeeklyStatLabel style={{ color: '#b8e986' }}>78%</DashboardWeeklyStatLabel>
            </DashboardWeeklyStatChartPie>
            <DashboardWeeklyStatInfo>
              <p>Customer feedback</p>
            </DashboardWeeklyStatInfo>
          </DashboardWeeklyStatChartItem>
          <DashboardWeeklyStatChartItem>
            <DashboardWeeklyStatChartPie>
              <ResponsiveContainer>
                <DashboardWeeklyStatPieChart>
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx={50}
                    cy={50}
                    innerRadius={50}
                    outerRadius={55}
                  />
                </DashboardWeeklyStatPieChart>
              </ResponsiveContainer>
              <DashboardWeeklyStatLabel style={{ color: '#ff4861' }}>25%</DashboardWeeklyStatLabel>
            </DashboardWeeklyStatChartPie>
            <DashboardWeeklyStatInfo>
              <p>Market <br />research</p>
            </DashboardWeeklyStatInfo>
          </DashboardWeeklyStatChartItem>
        </DashboardWeeklyStatChart>
        <hr />
        <PanelTitle title={t('surveys_dashboard.social_score')} />
        <div>
          {social.map(item => (
            <SocialScore key={item.id} progress={item.progress}>
              {item.social}
            </SocialScore>
          ))}
        </div>
      </DashboardWeeklyStatWrap>
    </Panel>
  );
};

export default WeeklyStat;

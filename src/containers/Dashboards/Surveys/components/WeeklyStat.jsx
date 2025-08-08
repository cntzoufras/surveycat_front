import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Pie, ResponsiveContainer } from 'recharts';
import Panel from '@/shared/components/Panel';
import {
  DashboardWeeklyStatChart,
  DashboardWeeklyStatChartItem,
  DashboardWeeklyStatChartPie,
  DashboardWeeklyStatInfo,
  DashboardWeeklyStatLabel,
  DashboardWeeklyStatPieChart,
  DashboardWeeklyStatWrap,
} from '../../BasicStatisticComponents';

const topicColors = ['#b8e986', '#ff4861', '#4ce1b6', '#7edbff', '#ff7e9a'];

const WeeklyStat = ({ topics }) => {
  const { t } = useTranslation('common');

  const sortedTopics = topics && topics.length > 0
    ? [...topics].sort((a, b) => b.percentage - a.percentage)
    : [];

  return (
    <Panel
      md={12}
      lg={6}
      xl={9}
      xs={12}
      title={t('surveys_dashboard.weekly_stat')}
      subhead="Top participated Surveys statistic by last month"
    >
      <DashboardWeeklyStatWrap>
        <DashboardWeeklyStatChart>
          {(sortedTopics && sortedTopics.length > 0)
            ? sortedTopics.map((topic, index) => {
                const chartData = [
                  { value: topic.percentage, fill: topicColors[index % topicColors.length] },
                  { value: 100 - topic.percentage, fill: '#eeeeee' },
                ];
                return (
                  <DashboardWeeklyStatChartItem key={`${topic.topic}`}>
                    <DashboardWeeklyStatChartPie>
                      <ResponsiveContainer>
                        <DashboardWeeklyStatPieChart>
                          <Pie
                            data={chartData}
                            dataKey="value"
                            cx={50}
                            cy={50}
                            innerRadius={50}
                            outerRadius={55}
                            startAngle={90}
                            endAngle={-270}
                          />
                        </DashboardWeeklyStatPieChart>
                      </ResponsiveContainer>
                      <DashboardWeeklyStatLabel style={{ color: topicColors[index % topicColors.length] }}>
                        {`${topic.percentage}%`}
                      </DashboardWeeklyStatLabel>
                    </DashboardWeeklyStatChartPie>
                    <DashboardWeeklyStatInfo>
                      <p>{topic.topic}</p>
                    </DashboardWeeklyStatInfo>
                  </DashboardWeeklyStatChartItem>
                );
              })
            : <p>No topic data available.</p>}
        </DashboardWeeklyStatChart>
      </DashboardWeeklyStatWrap>
    </Panel>
  );
};

WeeklyStat.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    }),
  ),
};

WeeklyStat.defaultProps = {
  topics: [],
};

export default WeeklyStat;

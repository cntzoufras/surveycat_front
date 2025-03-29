import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';

import Panel from '@/shared/components/Panel';

const engagementData = [
  { 
    name: 'Week 1', Viewed: 120, Started: 100, Completed: 80,
  },
  { 
    name: 'Week 2', Viewed: 150, Started: 130, Completed: 90,
  },
  {
    name: 'Week 3', Viewed: 180, Started: 160, Completed: 110,
  },
  { 
    name: 'Week 4', Viewed: 200, Started: 170, Completed: 140,
  },
  { 
    name: 'Week 5', Viewed: 175, Started: 150, Completed: 120,
  },
];

const SurveyEngagement = ({ dir }) => {
  const { t } = useTranslation('common');
  const themeName = useSelector(state => state.theme.className);

  return (
    <Panel
      xl={6}
      lg={12}
      md={12}
      title="Survey Engagement Overview"
      subhead="User interaction with surveys over the last 5 weeks"
    >
      <ResponsiveContainer height={260}>
        <BarChart data={engagementData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" reversed={dir === 'rtl'} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Viewed" fill="#8884d8" />
          <Bar dataKey="Started" fill="#82ca9d" />
          <Bar dataKey="Completed" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  );
};

SurveyEngagement.propTypes = {
  dir: PropTypes.string.isRequired,
};

export default SurveyEngagement;

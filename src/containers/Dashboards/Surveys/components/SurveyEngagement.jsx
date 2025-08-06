import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';

import Panel from '@/shared/components/Panel';

const SurveyEngagement = ({ submissions, dir }) => {
  const { t } = useTranslation('common');

  const chartData = submissions.map(item => ({
    name: item.month,
    Submissions: item.count,
  }));

  return (
    <Panel
      xl={6}
      lg={12}
      md={12}
      title="Yearly Submissions"
      subhead="Total survey submissions per month"
    >
      <ResponsiveContainer height={260}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" reversed={dir === 'rtl'} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Submissions" fill="#8884d8" name="Submissions" />
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  );
};

SurveyEngagement.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.string,
    count: PropTypes.number,
  })),
  dir: PropTypes.string.isRequired,
};

SurveyEngagement.defaultProps = {
  submissions: [],
};

export default SurveyEngagement;

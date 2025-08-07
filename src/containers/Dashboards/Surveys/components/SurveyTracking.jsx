import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from '@/shared/components/Panel';
import { Table } from '@/shared/components/TableElements';
import { colorText } from '@/utils/palette';
import { left } from '@/utils/directions';

const SurveyTracking = ({ surveys }) => (
  <Panel
    xl={6}
    lg={12}
    md={12}
    title="Top Surveys"
    subhead="By submission count"
  >
    <DashboardOccupancyTable responsive>
      <thead>
        <tr>
          <DashboardOccupancyCellHead>Survey</DashboardOccupancyCellHead>
          <DashboardOccupancyCellHead>Submissions</DashboardOccupancyCellHead>
        </tr>
      </thead>
      <tbody>
        {surveys && surveys.length > 0 
          ? (
            surveys.map(survey => (
              <tr key={survey.id ?? survey.title}>
                <DashboardOccupancyCell>{survey.title}</DashboardOccupancyCell>
                <DashboardOccupancyCell>{survey.submission_count}</DashboardOccupancyCell>
              </tr>
            ))
          )
        : (
          <tr>
            <DashboardOccupancyCell colSpan="2">No survey data available.</DashboardOccupancyCell>
          </tr>
          )}
      </tbody>
    </DashboardOccupancyTable>
  </Panel>
);

SurveyTracking.propTypes = {
  surveys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    submission_count: PropTypes.number.isRequired,
  })),
};

SurveyTracking.defaultProps = {
  surveys: [],
};

export default SurveyTracking;

/* STYLES */
const DashboardOccupancyTable = styled(Table)`
  text-align: ${left};
`;

const DashboardOccupancyCell = styled.td`
  font-size: 13px;
  padding: 5px !important;
  font-weight: 400;
`;

const DashboardOccupancyCellHead = styled.th`
  font-size: 13px;
  padding: 5px !important;
  color: ${colorText} !important;
  font-weight: 600;
`;

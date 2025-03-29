import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Panel from '@/shared/components/Panel';
import { Table } from '@/shared/components/TableElements';
import {
  colorBlue,
  colorGreen,
  colorAdditional,
  colorText,
} from '@/utils/palette';
import { left } from '@/utils/directions';
import OccupancyTooltipContent from './OccupancyTooltipContent';

/* 
  1) Updated X-axis labels to "Week 1 ... Week 7"
  2) Renamed 'uv' → 'inProgress', 'departure' → 'dropOffs', 'arrival' → 'views'
*/
const data = [
  {
    name: 'Week 1',
    inProgress: 95,
    dropOffs: 75,
    views: 10,
  },
  {
    name: 'Week 2',
    inProgress: 85,
    dropOffs: 23,
    views: 65,
  },
  {
    name: 'Week 3',
    inProgress: 47,
    dropOffs: 26,
    views: 45,
  },
  {
    name: 'Week 4',
    inProgress: 80,
    dropOffs: 25,
    views: 45,
  },
  {
    name: 'Week 5',
    inProgress: 55,
    dropOffs: 35,
    views: 15,
  },
  {
    name: 'Week 6',
    inProgress: 99,
    dropOffs: 30,
    views: 40,
  },
  {
    name: 'Week 7',
    inProgress: 85,
    dropOffs: 48,
    views: 26,
  },
];

/*
  3) Updated table headings: 
     "Arrivals" → "Views"
     "Departures" → "Drop-offs"
     "Stay overs" → "In-progress"
     "Customers" → "Completed"
*/
const data01 = [
  {
    id: 0,
    color: 'blue',
    head: 'Views',
    data: [
      { id: 0, value: 24 },
      { id: 1, value: 74 },
      { id: 2, value: 54 },
      { id: 3, value: 57 },
      { id: 4, value: 32 },
      { id: 5, value: 68 },
      { id: 6, value: 53 },
    ],
  },
  {
    id: 1,
    color: 'red',
    head: 'Drop-offs',
    data: [
      { id: 0, value: 75 },
      { id: 1, value: 65 },
      { id: 2, value: 46 },
      { id: 3, value: 35 },
      { id: 4, value: 65 },
      { id: 5, value: 21 },
      { id: 6, value: 34 },
    ],
  },
  {
    id: 2,
    head: 'In-progress',
    color: 'yellow',
    data: [
      { id: 0, value: 3113 },
      { id: 1, value: 2424 },
      { id: 2, value: 4545 },
      { id: 3, value: 4543 },
      { id: 4, value: 3432 },
      { id: 5, value: 3211 },
      { id: 6, value: 2112 },
    ],
  },
  {
    id: 3,
    head: 'Completed',
    color: 'green',
    data: [
      { id: 0, value: 131 },
      { id: 1, value: 133 },
      { id: 2, value: 343 },
      { id: 3, value: 342 },
      { id: 4, value: 351 },
      { id: 5, value: 234 },
      { id: 6, value: 242 },
    ],
  },
];

// If you still want percentages on the Y‐axis:
const toPercent = decimal => `${decimal.toFixed()}%`;

const SurveyTracking = ({ dir }) => {
  const { t } = useTranslation('common');
  const themeName = useSelector(state => state.theme.className);

  return (
    <Panel
      xl={6}
      lg={12}
      md={12}
      /* Renamed title/subhead to be more "Survey" oriented */
      title="Survey Tracking"
      subhead="Monitor your survey progress"
    >
      <div>
        <ResponsiveContainer height={260}>
          <ComposedChart data={data} margin={{ top: 20, left: -15 }}>
            <XAxis
              dataKey="name"
              tickLine={false}
              padding={{ left: 20 }}
              reversed={dir === 'rtl'}
            />
            <YAxis
              tickLine={false}
              /* Remove or adjust toPercent if you don't want a % axis */
              tickFormatter={toPercent}
              orientation={dir === 'rtl' ? 'right' : 'left'}
            />
            <Tooltip
              content={(
                <OccupancyTooltipContent
                  colorForKey={{ inProgress: '#555555' }}
                  theme={themeName}
                />
              )}
            />
            <CartesianGrid vertical={false} />
            <Bar dataKey="inProgress" name="In-progress" fill="#f2f4f7" barSize={20} />
            <Line type="linear" name="Drop-offs" dataKey="dropOffs" stroke="#b8e986" />
            <Line type="linear" name="Views" dataKey="views" stroke="#48b5ff" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <hr />
      <div>
        <DashboardOccupancyTable>
          <tbody>
            {data01.map(items => (
              <tr key={items.id}>
                <DashboardOccupancyCellHead>
                  {items.head}
                </DashboardOccupancyCellHead>
                {items.data.map(item => (
                  <DashboardOccupancyCell key={item.id} color={items.color}>
                    {item.value}
                  </DashboardOccupancyCell>
                ))}
              </tr>
            ))}
          </tbody>
        </DashboardOccupancyTable>
      </div>
    </Panel>
  );
};

SurveyTracking.propTypes = {
  dir: PropTypes.string.isRequired,
};

export default SurveyTracking;

/* STYLES */
const DashboardOccupancyTable = styled(Table)`
  text-align: ${left};
`;

const getColor = (color) => {
  switch (color) {
    case 'blue':
      return colorBlue;
    case 'green':
      return colorGreen;
    default:
      return colorAdditional;
  }
};

const DashboardOccupancyCell = styled.td`
  font-size: 13px;
  padding: 5px !important;
  color: ${props => getColor(props.color)} !important;
  font-weight: ${props => (props.color ? 500 : 400)};
`;

const DashboardOccupancyCellHead = styled.td`
  font-size: 13px;
  padding: 5px !important;
  color: ${colorText} !important;
`;

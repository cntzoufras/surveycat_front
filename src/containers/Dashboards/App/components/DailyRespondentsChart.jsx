import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { Card, CardBody } from '@/shared/components/Card';
import { colorTextAdditional } from '@/utils/palette';

const DailyRespondentsChart = ({ data: activeUsers }) => {
  const themeName = useSelector(state => state.theme.className);
  const isDark = themeName === 'dark';

  const axisColor = isDark ? '#90a4ae' : '#546e7a';
  const gridColor = isDark ? '#2b3440' : '#e0e0e0';
  const lineColor = isDark ? '#90caf9' : '#1976d2';
  const tooltipBg = isDark ? '#263238' : '#ffffff';
  const tooltipBorder = isDark ? '#37474f' : '#e0e0e0';
  const tooltipText = isDark ? '#e3f2fd' : '#263238';
  const cursorFill = isDark ? 'rgba(144, 202, 249, 0.08)' : 'rgba(25, 118, 210, 0.06)';

  // Keep only one baseline at 0: baseline comes from XAxis, so we omit the bottom-most horizontal grid line
  const omitBottomHorizontal = (props) => {
    const { yAxis } = props || {};
    const scale = yAxis && yAxis.scale;
    if (!scale || typeof scale.ticks !== 'function') return undefined; // default behavior
    const coords = scale.ticks().map(t => scale(t)).filter(v => typeof v === 'number');
    if (!coords.length) return undefined;
    const range = typeof scale.range === 'function' ? scale.range() : [];
    const bottom = range.length ? Math.max(...range) : Math.max(...coords);
    return coords.filter(c => Math.abs(c - bottom) > 0.5);
  };

  return (
    <Col md={12}>
      <Card>
        <StyledCardBody>
          <h5 className="card__title">DAILY UNIQUE RESPONDENTS (LAST 30 DAYS)</h5>
          <ResponsiveContainer height={300} style={{ background: 'transparent' }}>
            <LineChart
              data={activeUsers}
              margin={{
 top: 8, right: 16, left: 0, bottom: 14, 
}}
              style={{ background: 'transparent' }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? undefined : '#3C4043'}
                horizontalCoordinatesGenerator={omitBottomHorizontal}
              />
              <XAxis
                dataKey="date"
                tick={{ fill: axisColor }}
                axisLine={{ stroke: axisColor }}
                tickLine={{ stroke: axisColor }}
              />
              <YAxis
                tick={{ fill: axisColor }}
                axisLine={false}
                tickLine={{ stroke: axisColor }}
                padding={{ bottom: 6 }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, color: tooltipText }}
                itemStyle={{ color: tooltipText }}
                labelStyle={{ color: tooltipText }}
                cursor={{ fill: cursorFill }}
              />
              <Legend />
              <Line type="monotone" dataKey="count" stroke={lineColor} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </StyledCardBody>
      </Card>
    </Col>
  );
};

DailyRespondentsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default DailyRespondentsChart;

// Styles
const StyledCardBody = styled(CardBody)`
  h5.card__title {
    color: ${colorTextAdditional};
    opacity: 0.85;
    margin: 0 0 12px; /* add spacing below title */
  }
`;

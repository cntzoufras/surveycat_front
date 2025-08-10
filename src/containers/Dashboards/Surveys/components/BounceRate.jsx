import React from 'react';
import { useSelector } from 'react-redux';
import Panel from '@/shared/components/Panel';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const BounceRate = () => {
  const loading = useSelector(state => state.dashboard.surveyDashboard.loading);
  const analytics = useSelector(state => state.dashboard.surveyDashboard.data?.analytics);
  const themeName = useSelector(state => state.theme.className);
  const series = analytics?.bounceRate?.series || [];
  const data = Array.isArray(series)
    ? series.map(d => ({
        label: d.date || '',
        value: typeof d.bounce === 'number' ? d.bounce : 0,
      }))
    : [];
  const error = null;
  return (
    <Panel md={12} title="Bounce Rate (7 days)" isLoading={loading}>
      {error && <div className="text-danger small">{String(error)}</div>}
      {!error && data?.length > 0 ? (
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
 top: 24, right: 20, left: 0, bottom: 12, 
}}
            >
              <CartesianGrid
                stroke={themeName === 'light' ? '#3C4043' : undefined}
                strokeDasharray="3 3"
              />
              <XAxis dataKey="label" tickMargin={10} />
              <YAxis tickFormatter={v => `${v}%`} domain={[0, 100]} />
              <Tooltip formatter={v => [`${v}%`, 'Bounce']} labelFormatter={l => l} />
              <Line type="monotone" dataKey="value" name="Bounce" stroke="#FF7043" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (!loading && <div className="text-muted">No data</div>)}
    </Panel>
  );
};

export default BounceRate;

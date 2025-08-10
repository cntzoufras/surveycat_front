import React from 'react';
import { useSelector } from 'react-redux';
import Panel from '@/shared/components/Panel';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import OccupancyTooltipContent from './OccupancyTooltipContent';

const normalizeOccupancy = (raw) => {
  if (!raw) return [];

  if (!Array.isArray(raw)) {
    if (Array.isArray(raw.series)) return normalizeOccupancy(raw.series);
    if (Array.isArray(raw.weekly)) return normalizeOccupancy(raw.weekly);
    if (Array.isArray(raw.daily)) return normalizeOccupancy(raw.daily);
  }

  if (Array.isArray(raw)) {
    return raw.map(d => ({
      label: d.label || d.week || d.period || d.date || '',
      started:
        typeof d.views === 'number'
          ? d.views
          : d.started ?? d.started_count ?? d.startedTotal ?? 0,
      completed:
        typeof d.completed === 'number'
          ? d.completed
          : d.completed_count ?? d.completedTotal ?? 0,
    }));
  }

  const byLabel = {};
  const pushSeries = (arr, key) => {
    if (!Array.isArray(arr)) return;
    arr.forEach((d, idx) => {
      const label = d.label || d.week || d.period || d.date || String(idx + 1);
      byLabel[label] = byLabel[label] || { label, started: 0, completed: 0 };

      let value = 0;
      if (typeof d.value === 'number') value = d.value;
      else if (typeof d.count === 'number') value = d.count;
      else if (typeof d.total === 'number') value = d.total;
      else if (typeof d[key] === 'number') value = d[key];

      byLabel[label][key] = value;
    });
  };

  pushSeries(raw.started || raw.starts, 'started');
  pushSeries(raw.completed || raw.completions, 'completed');
  return Object.values(byLabel);
};

const Occupancy = () => {
  const loading = useSelector(
    state => state.dashboard.surveyDashboard.loading,
  );
  const analytics = useSelector(
    state => state.dashboard.surveyDashboard.data?.analytics,
  );

  const raw = analytics?.occupancy || [];
  const data = normalizeOccupancy(raw);
  const error = null;

  const colorForKey = { started: '#42A5F5', completed: '#66BB6A' };
  const itemSorter = (a, b) => (a.dataKey > b.dataKey ? 1 : -1);

  const isoWeekStartEnd = (year, week) => {
    const jan4 = new Date(Date.UTC(year, 0, 4));
    const dayOfWeek = jan4.getUTCDay() || 7;
    const mondayOfWeek1 = new Date(jan4);
    mondayOfWeek1.setUTCDate(jan4.getUTCDate() - (dayOfWeek - 1));

    const monday = new Date(mondayOfWeek1);
    monday.setUTCDate(mondayOfWeek1.getUTCDate() + (week - 1) * 7);

    const sunday = new Date(monday);
    sunday.setUTCDate(monday.getUTCDate() + 6);

    return { monday, sunday };
  };

  const pad2 = n => String(n).padStart(2, '0');
  const formatDM = d => `${pad2(d.getUTCDate())}/${pad2(d.getUTCMonth() + 1)}`;

  const formatLabelShort = (label) => {
    if (typeof label !== 'string') return label;

    const weekMatch = label.match(/^(\d{4})-(\d{2})$/);
    if (weekMatch) {
      const [, year, week] = weekMatch;
      return `Week ${parseInt(week, 10)}, ${year}`;
    }

    const dateMatch = label.match(/^\d{4}-\d{2}-\d{2}$/);
    if (dateMatch) {
      const d = new Date(label);
      if (!Number.isNaN(d.getTime())) {
        return d.toLocaleDateString(undefined, {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        });
      }
    }

    return label;
  };

  const formatLabelFull = (label) => {
    if (typeof label !== 'string') return label;

    const weekMatch = label.match(/^(\d{4})-(\d{2})$/);
    if (weekMatch) {
      const year = parseInt(weekMatch[1], 10);
      const week = parseInt(weekMatch[2], 10);
      const { monday, sunday } = isoWeekStartEnd(year, week);
      return `Week ${week}, ${year} (${formatDM(monday)} to ${formatDM(
        sunday,
      )})`;
    }

    return formatLabelShort(label);
  };

  return (
    <Panel md={12} title="Occupancy (8 weeks)" isLoading={loading}>
      {error && <div className="text-danger small">{String(error)}</div>}
      {!error && data.length > 0 ? (
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{
                top: 24,
                right: 20,
                left: 0,
                bottom: 12,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickMargin={10}
                tickFormatter={formatLabelShort}
              />
              <YAxis allowDecimals={false} />
              <Tooltip
                content={(
                  <OccupancyTooltipContent
                    theme="light"
                    itemSorter={itemSorter}
                    colorForKey={colorForKey}
                    formatLabel={formatLabelFull}
                  />
                )}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="started"
                name="Started"
                stackId="1"
                stroke={colorForKey.started}
                fill={colorForKey.started}
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="completed"
                name="Completed"
                stackId="1"
                stroke={colorForKey.completed}
                fill={colorForKey.completed}
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        !loading && <div className="text-muted">No data</div>
      )}
    </Panel>
  );
};

export default Occupancy;

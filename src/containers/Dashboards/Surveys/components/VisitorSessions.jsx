import React from 'react';
import { useTheme } from 'styled-components';
import { useSelector } from 'react-redux';
import Panel from '@/shared/components/Panel';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#9C27B0',
  '#607D8B',
];

const toPieArray = (arr, keyField = 'name', valField = 'value') => {
  if (!Array.isArray(arr)) return [];
  return arr
    .map(it => ({
      name: it[keyField] ?? it.name ?? it.label,
      value: typeof it[valField] === 'number' ? it[valField] : 0,
    }))
    .filter(it => it.name);
};

const VisitorSessions = () => {
  const theme = useTheme();
  const isDark = theme && theme.mode === 'dark';
  const loading = useSelector(
    state => state.dashboard.surveyDashboard.loading,
  );
  const analytics = useSelector(
    state => state.dashboard.surveyDashboard.data?.analytics,
  );

  const vs = analytics?.visitorSessions || {};
  const browserData = toPieArray(vs.by_browser, 'name', 'value');
  const deviceData = toPieArray(vs.by_device_type, 'name', 'value');
  const error = null;

  const getKey = (prefix, item) => `${prefix}-${item.name}`;

  return (
    <Panel md={6} title="Visitor Sessions (30 days)" isLoading={loading}>
      {error && <div className="text-danger small">{String(error)}</div>}
      {!error && (browserData.length > 0 || deviceData.length > 0) ? (
        <div
          style={{
            display: 'flex',
            gap: 16,
            width: '100%',
            height: 320,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={browserData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {browserData.map((entry, idx) => (
                    <Cell
                      key={getKey('c-b', entry)}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>
                {isDark ? (
                  <Tooltip
                    contentStyle={{
                      background: '#1f2327',
                      border: 'none',
                      color: '#fff',
                    }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                ) : (
                  <Tooltip />
                )}
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={deviceData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {deviceData.map((entry, idx) => (
                    <Cell
                      key={getKey('c-d', entry)}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>
                {isDark ? (
                  <Tooltip
                    contentStyle={{ background: '#1f2327', border: 'none', color: '#fff' }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                ) : (
                  <Tooltip />
                )}
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        !loading && <div className="text-muted">No data</div>
      )}
    </Panel>
  );
};

export default VisitorSessions;

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Panel from '@/shared/components/Panel';
import ProgressBar from '@/shared/components/ProgressBar';
import { Table as BaseTable } from '@/shared/components/TableElements';
import { marginRight, left } from '@/utils/directions';

const normalizeAudience = (raw) => {
  if (!raw) return [];

  let arr = [];

  if (Array.isArray(raw)) {
    arr = raw.map((d) => {
      const country = d.country || d.label || d.name || 'Unknown';

      // page_views: first numeric of [page_views, count, value, total]
      let pageViews = 0;
      if (typeof d.page_views === 'number') pageViews = d.page_views;
      else if (typeof d.count === 'number') pageViews = d.count;
      else if (typeof d.value === 'number') pageViews = d.value;
      else if (typeof d.total === 'number') pageViews = d.total;

      const device = String(d.device || 'desktop').toLowerCase();

      // bounce_rate normalized to 0..100
      let br = 0;
      if (typeof d.bounce_rate === 'number') br = d.bounce_rate;
      else if (typeof d.bounce === 'number') br = d.bounce;
      if (br <= 1) br *= 100;

      return {
        country,
        country_code: d.country_code || null,
        page_views: pageViews,
        device,
        bounce_rate: br,
      };
    });
  } else {
    arr = Object.keys(raw).map(k => ({
      country: k,
      country_code: null,
      page_views: typeof raw[k] === 'number' ? raw[k] : 0,
      device: 'desktop',
      bounce_rate: 0,
    }));
  }

  return arr
    .filter(x => x.country)
    .sort((a, b) => b.page_views - a.page_views)
    .slice(0, 10);
};

const AudienceByCountry = () => {
  const loading = useSelector(
    state => state.dashboard.surveyDashboard.loading,
  );
  const analytics = useSelector(
    state => state.dashboard.surveyDashboard.data?.analytics,
  );

  const raw = analytics?.audienceByCountry || [];
  const rows = normalizeAudience(raw);
  const error = null;

  const fmtNumber = n => (typeof n === 'number' ? n.toLocaleString() : n);

  const countryCodeMap = {
    Italy: 'IT',
    Netherlands: 'NL',
    Indonesia: 'ID',
    Cameroon: 'CM',
    Jamaica: 'JM',
    Eritrea: 'ER',
    Grenada: 'GD',
    'Sierra Leone': 'SL',
    'Faroe Islands': 'FO',
    'Saint Pierre and Miquelon': 'PM',
    Greece: 'GR',
    France: 'FR',
    Germany: 'DE',
    Spain: 'ES',
    Canada: 'CA',
    'United States': 'US',
    Ireland: 'IE',
    Argentina: 'AR',
    Gabon: 'GA',
    Brazil: 'BR',
    'Côte d’Ivoire': 'CI',
  };

  const isoFor = (country, explicitCode) => (explicitCode || countryCodeMap[country] || ''
    ).toLowerCase();

  const flagSrcFor = (country, explicitCode) => {
    const iso = isoFor(country, explicitCode);
    return iso ? `https://flagcdn.com/w40/${iso}.png` : '';
  };

  const gradientForRate = (rate) => {
    if (rate == null) return 'blue';
    if (rate < 30) return 'green';
    if (rate < 60) return 'blue';
    return 'pink';
  };

  const tableProps = {
    responsive: true,
    bordered: true,
    className: 'table-sm',
    style: { marginBottom: 0 },
  };

  return (
    <Panel
      md={6}
      title="Audience by Country (30 days)"
      isLoading={loading}
    >
      {error && (
        <div className="text-danger small">
          {String(error)}
        </div>
      )}

      {!error && rows.length > 0 ? (
        <div style={{ width: '100%' }}>
          <div className="table-responsive">
            <DashboardAudienceTable {...tableProps}>
              <thead>
                <tr>
                  <th style={{ width: '40%', padding: '10px 12px' }}>
                    Country
                  </th>
                  <th
                    style={{
                      width: '20%',
                      textAlign: 'right',
                      padding: '10px 12px',
                    }}
                  >
                    Page views
                  </th>
                  <th style={{ width: '15%', padding: '10px 12px' }}>
                    Device
                  </th>
                  <th style={{ width: '25%', padding: '10px 12px' }}>
                    Bounce rate
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map(r => (
                  <tr
                    key={`${r.country}-${r.country_code || 'xx'}`}
                  >
                    <td style={{ padding: '10px 12px' }}>
                      {flagSrcFor(r.country, r.country_code) ? (
                        <DashboardTableFlag
                          src={flagSrcFor(
                            r.country,
                            r.country_code,
                          )}
                          alt="flag"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                      {r.country}
                    </td>

                    <td
                      style={{
                        textAlign: 'right',
                        whiteSpace: 'nowrap',
                        padding: '10px 12px',
                      }}
                    >
                      {fmtNumber(r.page_views)}
                    </td>

                    <td
                      style={{
                        textTransform: 'capitalize',
                        padding: '10px 12px',
                      }}
                    >
                      {r.device}
                    </td>

                    <td style={{ padding: '10px 12px' }}>
                      <ProgressBar
                        now={Math.max(
                          0,
                          Math.min(100, r.bounce_rate),
                        )}
                        label={`${Math.round(r.bounce_rate)}%`}
                        size="small"
                        gradient={gradientForRate(
                          r.bounce_rate,
                        )}
                        rounded
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </DashboardAudienceTable>
          </div>
        </div>
      ) : (
        !loading && <div className="text-muted">No data</div>
      )}
    </Panel>
  );
};

export default AudienceByCountry;

/* STYLES */

const DashboardAudienceTable = styled(BaseTable)`
  text-align: ${left};
  .progress { margin-top: 10px; }
  .progress-bar { height: 10px; }
`;

const DashboardTableFlag = styled.img`
  width: 42px;
  height: 30px;
  ${marginRight}: 12px;
`;

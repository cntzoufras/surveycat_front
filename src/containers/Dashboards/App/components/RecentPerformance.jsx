import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Col, Row, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Card, CardBody } from '@/shared/components/Card';
import { colorTextAdditional } from '@/utils/palette';

const RecentPerformance = ({ performance }) => {
  const { t } = useTranslation('common');
  const themeName = useSelector(state => state.theme.className);
  const isDark = themeName === 'dark';

  return (
    <Card height="auto">
      <StyledCardBody>
        <h5 className="card__title">{t('app_dashboard.recent_performance')}</h5>
        <Row>
          <Col xs={12} xl={6}>
            <h5 className="section__title">{t('app_dashboard.most_active_surveys')}</h5>
            <StyledListGroup $isDark={isDark} $appearance="elevated" $accent="primary">
              {performance.mostActiveSurveys?.map(survey => (
                <ListGroup.Item key={survey.title} className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{survey.title}</div>
                  </div>
                  <BadgePill $isDark={isDark} $variant="primary">{survey.submission_count}</BadgePill>
                </ListGroup.Item>
              ))}
            </StyledListGroup>
          </Col>
          <Col xs={12} xl={6} className="mt-3 mt-xl-0">
            <h5 className="section__title">{t('app_dashboard.surveys_needing_attention')}</h5>
            <StyledListGroup $isDark={isDark} $appearance="elevated" $accent="danger">
              {performance.surveysNeedingAttention?.map(survey => (
                <ListGroup.Item key={survey.id} className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{survey.title}</div>
                  </div>
                  <BadgePill $isDark={isDark} $variant="danger">{Math.round(survey.drop_off_rate)}%</BadgePill>
                </ListGroup.Item>
              ))}
            </StyledListGroup>
          </Col>
        </Row>
      </StyledCardBody>
    </Card>
  );
};

RecentPerformance.propTypes = {
  performance: PropTypes.shape({
    mostActiveSurveys: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      submission_count: PropTypes.number,
    })),
    surveysNeedingAttention: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      drop_off_rate: PropTypes.number,
    })),
  }),
};

RecentPerformance.defaultProps = {
  performance: {
    mostActiveSurveys: [],
    surveysNeedingAttention: [],
  },
};

export default RecentPerformance;

// Styles
// (Using shared Card/CardBody which already apply rounded corners and shadow)

const StyledCardBody = styled(CardBody)`
  h5.card__title {
    color: ${colorTextAdditional};
    opacity: 0.85;
    margin: 0 0 12px; /* add a bit more space below the section title */
    text-transform: uppercase;
  }
  h5.section__title {
    color: ${colorTextAdditional};
    opacity: 0.85;
    text-transform: uppercase;
    margin: 0 0 6px;
  }
`;


const StyledListGroup = styled(ListGroup)`
  /* shared tokens */
  --row-bg: ${({ $isDark }) => ($isDark ? 'rgba(255,255,255,0.04)' : '#ffffff')};
  --row-bg-hover: ${({ $isDark }) => ($isDark ? 'rgba(144,164,174,0.08)' : '#f8f9fa')};
  --row-border: ${({ $isDark }) => ($isDark ? '#33404d' : '#e9ecef')};
  --shadow-soft: 0 1px 2px rgba(0,0,0,0.18);
  --shadow-med: 0 3px 6px rgba(0,0,0,0.22);

  .list-group-item {
    position: relative;
    display: flex;
    align-items: center;
    color: ${({ $isDark }) => ($isDark ? '#e2e8f0' : 'inherit')};
    padding: 8px 16px;
    padding-bottom: 9px;
    background-color: transparent; /* default, overridden by appearances */
    border-color: var(--row-border);
    transition: background-color 120ms ease, box-shadow 120ms ease;
    border-radius: 8px; /* per-item rounding for variants using gaps */
  }
  .list-group-item .fw-bold { color: ${({ $isDark }) => ($isDark ? '#cfd8dc' : 'inherit')}; }

  /* default stacked borders if no appearance specified */
  .list-group-item + .list-group-item { border-top-width: 2px; }
  .list-group-item:last-child { border-bottom-width: 1px; }

  /* Elevated appearance: card-like rows with spacing between */
  ${({ $appearance }) => $appearance === 'elevated' && `
    .list-group-item {
      background-color: var(--row-bg);
      box-shadow: var(--shadow-soft);
      border: 1px solid var(--row-border);
      margin-bottom: 8px;
    }
    .list-group-item + .list-group-item { border-top-width: 0; }
    .list-group-item:hover { background-color: var(--row-bg-hover); }
  `}

  /* Outlined appearance: transparent bg with stronger outline and left accent bar */
  ${({ $appearance }) => $appearance === 'outlined' && `
    .list-group-item {
      background-color: transparent;
      border: 1px solid var(--row-border);
      margin-bottom: 8px;
      overflow: hidden;
    }
    .list-group-item + .list-group-item { border-top-width: 0; }
    .list-group-item:hover { background-color: var(--row-bg-hover); }
  `}

  /* Small-screen tweaks for narrow devices (e.g., Galaxy S20/S22) */
  @media (max-width: 400px) {
    .list-group-item { padding: 6px 12px; }
    .list-group-item .fw-bold { font-size: 14px; }
  }
`;

const BadgePill = styled.span`
  display: inline-block;
  min-width: 28px;
  text-align: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 1.6;
  white-space: nowrap; /* never wrap numbers or % */
  flex: 0 0 auto; /* keep pill from shrinking/wrapping */
  border: 1px solid
    ${({ $isDark, $variant }) => {
      if ($variant === 'danger') return $isDark ? '#ef9a9a' : '#d32f2f';
      return $isDark ? '#90caf9' : '#1976d2';
    }};
  color:
    ${({ $isDark, $variant }) => {
      if ($variant === 'danger') return $isDark ? '#ef9a9a' : '#d32f2f';
      return $isDark ? '#90caf9' : '#1976d2';
    }};
  background-color:
    ${({ $isDark, $variant }) => {
      if ($variant === 'danger') return $isDark ? 'rgba(244,67,54,0.18)' : 'rgba(211,47,47,0.12)';
      return $isDark ? 'rgba(25,118,210,0.24)' : 'rgba(25,118,210,0.12)';
    }};

  /* Small-screen badges */
  @media (max-width: 400px) {
    min-width: 24px;
    padding: 1px 6px;
    font-size: 11px;
    line-height: 1.4;
  }
`;

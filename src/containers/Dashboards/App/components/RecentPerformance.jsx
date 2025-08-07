import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Col, Row, ListGroup } from 'react-bootstrap';
import { Card } from '@/shared/components/Card';

const RecentPerformance = ({ performance }) => {
  const { t } = useTranslation('common');

  return (
    <Col md={12} lg={6}>
      <Card>
        <Card.Body>
          <h5 className="card__title">{t('app_dashboard.recent_performance')}</h5>
          <Row>
            <Col xs={6}>
              <h6>{t('app_dashboard.most_active_surveys')}</h6>
              <ListGroup variant="flush">
                {performance.mostActiveSurveys?.map(survey => (
                  <ListGroup.Item key={survey.title} className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{survey.title}</div>
                    </div>
                    <span className="badge bg-primary rounded-pill">{survey.submission_count}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col xs={6}>
              <h6>{t('app_dashboard.surveys_needing_attention')}</h6>
              <ListGroup variant="flush">
                {performance.surveysNeedingAttention?.map(survey => (
                  <ListGroup.Item key={survey.id} className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{survey.title}</div>
                    </div>
                    <span className="badge bg-danger rounded-pill">{Math.round(survey.drop_off_rate)}%</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
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

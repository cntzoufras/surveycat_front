import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import SurveySubmissionsReactTable from './components/SurveySubmissionsReactTable';
import CreateTableData from './CreateData';

const SurveySubmissions = () => {
  const { t } = useTranslation('common');
  const reactTableData = CreateTableData();

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('survey_submissions.title')}</h3>
          <h3 className="page-subhead subhead">See into every available response</h3>
        </Col>
      </Row>
      <Row>
        <SurveySubmissionsReactTable reactTableData={reactTableData} />
      </Row>
    </Container>
  );
};

export default SurveySubmissions;

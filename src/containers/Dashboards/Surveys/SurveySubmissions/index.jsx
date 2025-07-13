/* eslint-disable camelcase */
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { fetchSurveySubmissionsAction } from '@/redux/actions/surveySubmissionsActions';
import SurveySubmissionsReactTable from './components/SurveySubmissionsReactTable';

const SurveySubmissions = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  
  // eslint-disable-next-line camelcase
  const { survey_submissions = [], loading, error } = useSelector(state => state.survey_submissions || {});

  useEffect(() => {
    dispatch(fetchSurveySubmissionsAction());
  }, [dispatch]);

  const columns = useMemo(
  () => [
    {
      Header: '#',
      accessor: 'id',
      disableGlobalFilter: true,
      width: 65,
    },
    {
      Header: 'Survey',
      accessor: 'survey',
    },
    {
      Header: 'Response ID',
      accessor: 'response',
      disableGlobalFilter: true,
    },
    {
      Header: 'Respondent Email',
      accessor: 'respondent_email',
      disableGlobalFilter: true,
    },
    {
      Header: 'Respondent ID',
      accessor: 'respondent_id',
      disableGlobalFilter: true,
    },
    {
      Header: 'Device',
      accessor: 'device',
      disableGlobalFilter: true,
    },
    {
      Header: 'Country',
      accessor: 'country',
      disableGlobalFilter: true,
    },
    {
      Header: 'Date Created',
      accessor: 'created_at',
      disableGlobalFilter: true,
    },
  ],
  [],
);


  // eslint-disable-next-line camelcase
  const data = survey_submissions?.map((submission, index) => {
    const response = submission.survey_response || {};
    const survey = response.survey || {};
    const respondent = response.respondent || {};

    return {
      id: index + 1,
      survey: survey.title || 'N/A',
      response: response.id || 'N/A',
      respondent_email: respondent.email || 'N/A',
      respondent_id: respondent.id || 'N/A',
      device: response.device || 'N/A',
      country: response.country || 'N/A',
      created_at: submission.created_at
        ? new Date(submission.created_at).toLocaleDateString()
        : 'N/A',
    };
  });

  const reactTableData = { tableHeaderData: columns, tableRowsData: data };

  console.log('react table data: ', reactTableData);
  console.log('data: ', data);
  console.log('Survey submissions: ', survey_submissions);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('survey_submissions.title')}</h3>
          <h3 className="page-subhead subhead">{t('survey_submissions.description')}</h3>
        </Col>
      </Row>
      <Row>
        <SurveySubmissionsReactTable reactTableData={reactTableData} />
      </Row>
    </Container>
  );
};

export default SurveySubmissions;

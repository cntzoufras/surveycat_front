/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { fetchSurveySubmissionsAction, fetchSurveySubmissionAction, clearSubmissionDetailsAction } from '@/redux/actions/surveySubmissionsActions';
import SurveySubmissionsReactTable from './components/SurveySubmissionsReactTable';
import SurveySubmissionDetailsModal from './components/SurveySubmissionDetailsModal';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#8a8a8a' : '#666666',
  color: '#ffffff',
  width: '32px',
  height: '32px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? '#999999' : '#777777',
  },
  '&:disabled': {
    backgroundColor: theme.palette.mode === 'light' ? '#cccccc' : '#444444',
    color: theme.palette.mode === 'light' ? '#888888' : '#999999',
  },
}));

const SurveySubmissions = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  
  // eslint-disable-next-line camelcase
      const {
    survey_submissions = [],
    loading,
    error,
    selectedSubmission,
    loadingDetails,
    errorDetails,
  } = useSelector(state => state.survey_submissions || {});

  const handleViewClick = (submissionId) => {
    dispatch(fetchSurveySubmissionAction(submissionId));
  };

  const toggleModal = () => {
    setModalIsOpen(false);
    if (modalIsOpen) { // only clear if modal was open
      dispatch(clearSubmissionDetailsAction());
    }
  };

  useEffect(() => {
    dispatch(fetchSurveySubmissionsAction());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSubmission) {
      setModalIsOpen(true);
    }
  }, [selectedSubmission]);

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
    {
      Header: 'Actions',
      accessor: 'actions',
      disableGlobalFilter: true,
      Cell: ({ row }) => (
        <StyledIconButton
          onClick={() => handleViewClick(row.original.submissionId)}
          disabled={loadingDetails}
          size="small"
        >
          <VisibilityOutlinedIcon fontSize="small" />
        </StyledIconButton>
      ),
    },
  ],
  [loadingDetails],
);


  // eslint-disable-next-line camelcase
  const data = survey_submissions?.map((submission, index) => {
    const response = submission.survey_response || {};
    const survey = response.survey || {};
    const respondent = response.respondent || {};

        return {
      id: index + 1,
      submissionId: submission.id,
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

  

  if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  if (errorDetails) return <p>Error loading details: {errorDetails}</p>;

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
      <SurveySubmissionDetailsModal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        submission={selectedSubmission}
        loading={loadingDetails}
      />
    </Container>
  );
};

export default SurveySubmissions;

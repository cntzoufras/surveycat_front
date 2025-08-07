import React, {
 useEffect, useMemo, useState, useCallback, 
} from 'react';
import Spinner from '@/shared/components/Loader/Spinner';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  fetchSurveySubmissionsAction,
  fetchSurveySubmissionAction,
  clearSubmissionDetailsAction,
} from '@/redux/actions/surveySubmissionsActions';
import SurveySubmissionsReactTable from './components/SurveySubmissionsReactTable';
import SurveySubmissionDetailsModal from './components/SurveySubmissionDetailsModal';

// Action cell component defined at module scope
const ActionCell = ({ row, column }) => {
  const { onView, disabled } = column.meta;
  return (
    <StyledIconButton
      onClick={() => onView(row.original.submissionId)}
      disabled={disabled}
      size="small"
    >
      <VisibilityOutlinedIcon fontSize="small" />
    </StyledIconButton>
  );
};

ActionCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      submissionId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    }).isRequired,
  }).isRequired,
  column: PropTypes.shape({
    meta: PropTypes.shape({
      onView: PropTypes.func.isRequired,
      disabled: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light' ? '#8a8a8a' : '#666666',
  color: '#ffffff',
  width: '32px',
  height: '32px',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light' ? '#999999' : '#777777',
  },
  '&:disabled': {
    backgroundColor:
      theme.palette.mode === 'light' ? '#cccccc' : '#444444',
    color:
      theme.palette.mode === 'light' ? '#888888' : '#999999',
  },
}));

const SurveySubmissions = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const {
    survey_submissions: surveySubmissions = [],
    loading,
    error,
    selectedSubmission,
    loadingDetails,
    errorDetails,
    currentPage,
    totalPages,
    perPage,
    totalCount,
  } = useSelector(
    state => state.survey_submissions || {},
  );

  const handleViewClick = useCallback(
    id => dispatch(fetchSurveySubmissionAction(id)),
    [dispatch],
  );

  const toggleModal = useCallback(() => {
    setModalIsOpen((open) => {
      if (open) {
        dispatch(clearSubmissionDetailsAction());
      }
      return !open;
    });
  }, [dispatch]);

  useEffect(
    () => {
      dispatch(fetchSurveySubmissionsAction());
    },
    [dispatch],
  );

  const handlePageChange = useCallback(
    (page, pageSize) => {
      dispatch(fetchSurveySubmissionsAction(page, pageSize || perPage));
    },
    [dispatch, perPage],
  );

  const handlePageSizeChange = useCallback(
    (pageSize) => {
      dispatch(fetchSurveySubmissionsAction(1, pageSize));
    },
    [dispatch],
  );

  useEffect(
    () => {
      if (selectedSubmission) {
        setModalIsOpen(true);
      }
    },
    [selectedSubmission],
  );

  const columns = useMemo(
    () => [
      {
 Header: '#', accessor: 'id', disableGlobalFilter: true, width: 65, 
},
      { Header: 'Survey', accessor: 'survey' },
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
      { Header: 'Device', accessor: 'device', disableGlobalFilter: true },
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
        Cell: ActionCell,
        meta: {
          onView: handleViewClick,
          disabled: loadingDetails,
        },
      },
    ],
    [handleViewClick, loadingDetails],
  );

  const data = useMemo(
    () => surveySubmissions.map((submission, idx) => {
        const response = submission.survey_response || {};
        const survey = response.survey || {};
        const respondent = response.respondent || {};

        return {
          id: idx + 1,
          submissionId: submission.id,
          survey: survey.title || 'N/A',
          response: response.id || 'N/A',
          respondent_email: respondent.email || 'N/A',
          respondent_id: respondent.id || 'N/A',
          device: response.device || 'N/A',
          country: response.country || 'N/A',
          created_at: submission.created_at
            ? new Date(
                submission.created_at,
              ).toLocaleDateString()
            : 'N/A',
        };
      }),
    [surveySubmissions],
  );

  const reactTableData = useMemo(
    () => ({ tableHeaderData: columns, tableRowsData: data }),
    [columns, data],
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (errorDetails) {
    return <p>Error loading details: {errorDetails}</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">
            {t('survey_submissions.title')}
          </h3>
          <h3 className="page-subhead subhead">
            {t('survey_submissions.description')}
          </h3>
        </Col>
      </Row>
      <Row>
        <SurveySubmissionsReactTable
          reactTableData={reactTableData}
          pagination={{
            currentPage,
            totalPages,
            perPage,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
          }}
          loading={loading}
          totalCount={totalCount}
        />
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

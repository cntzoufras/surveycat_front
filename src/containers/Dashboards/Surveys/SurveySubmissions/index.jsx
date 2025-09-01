import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import moment from 'moment';
import Loading from '@/shared/components/Loading';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Container, Row, Alert,
} from 'react-bootstrap';
import { Box, IconButton } from '@mui/material';
import PageHeader from '@/shared/components/PageHeader';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  fetchSurveySubmissionsAction,
  fetchSurveySubmissionAction,
  clearSubmissionDetailsAction,
} from '@/redux/actions/surveySubmissionsActions';
import SurveySubmissionsReactTable from './components/SurveySubmissionsReactTable';
import SurveySubmissionDetailsModal from './components/SurveySubmissionDetailsModal';

const DeviceCell = ({ value }) => (
  <Box
    sx={{
      fontFamily: 'monospace',
      fontSize: '0.75rem',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      overflowWrap: 'anywhere',
    }}
  >
    {value || 'N/A'}
  </Box>
);

DeviceCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
DeviceCell.defaultProps = {
  value: 'N/A',
};

const DateCell = ({ value }) => (
  <Box
    sx={{
      whiteSpace: { xs: 'normal', md: 'nowrap' },
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    }}
  >
    {value}
  </Box>
);

DateCell.propTypes = {
  value: PropTypes.string,
};
DateCell.defaultProps = {
  value: 'N/A',
};

/* Action cell already at module scope */
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
      submissionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
  const [searchTerm, setSearchTerm] = useState('');
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
  } = useSelector(state => state.survey_submissions || {});

  const handleViewClick = useCallback(
    id => dispatch(fetchSurveySubmissionAction(id)),
    [dispatch],
  );

  const toggleModal = useCallback(() => {
    setModalIsOpen((open) => {
      if (open) dispatch(clearSubmissionDetailsAction());
      return !open;
    });
  }, [dispatch]);

  // Fetch once on mount. Subsequent fetches are driven by handlers below.
  useEffect(() => {
    dispatch(fetchSurveySubmissionsAction(1, perPage || 10, ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handlePageChange = useCallback(
    (page, pageSize) => {
      dispatch(fetchSurveySubmissionsAction(page, pageSize || perPage, searchTerm));
    },
    [dispatch, perPage, searchTerm],
  );

  const handlePageSizeChange = useCallback(
    (pageSize) => {
      // Keep the first visible item roughly stable across page-size changes
      const prevOffset = (currentPage - 1) * (perPage || 10);
      const newPage = Math.floor(prevOffset / (pageSize || 10)) + 1;
      dispatch(fetchSurveySubmissionsAction(newPage, pageSize, searchTerm));
    },
    [dispatch, currentPage, perPage, searchTerm],
  );

  const handleSearchChange = useCallback(
    (value) => {
      const next = (value || '').trim();
      setSearchTerm(next);
      // reset to first page on new search
      dispatch(fetchSurveySubmissionsAction(1, perPage || 10, next));
    },
    [dispatch, perPage],
  );

  useEffect(() => {
    if (selectedSubmission) setModalIsOpen(true);
  }, [selectedSubmission]);

  const columns = useMemo(
    () => [
      {
 Header: '#', accessor: 'id', disableGlobalFilter: true, width: 65, 
},
      { Header: 'Survey', accessor: 'survey' },
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
        Cell: DeviceCell,
      },
      {
        Header: 'Country',
        accessor: 'country',
        disableGlobalFilter: true,
      },
      {
        Header: 'Started At (UTC)',
        accessor: 'started_at',
        disableGlobalFilter: true,
        Cell: DateCell,
      },
      {
        Header: 'Completed At (UTC)',
        accessor: 'completed_at',
        disableGlobalFilter: true,
        Cell: DateCell,
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
          respondent_email: respondent.email || 'N/A',
          respondent_id: respondent.id || 'N/A',
          device: response.device || 'N/A',
          country: response.country || 'N/A',
          started_at: response.started_at
            ? moment.utc(response.started_at).local().format('DD-MM-YYYY HH:mm')
            : 'N/A',
          completed_at: response.completed_at
            ? moment.utc(response.completed_at).local().format('DD-MM-YYYY HH:mm')
            : 'N/A',
        };
      }),
    [surveySubmissions],
  );

  const reactTableData = useMemo(
    () => ({ tableHeaderData: columns, tableRowsData: data }),
    [columns, data],
  );

  return (
    <Container>
      <Row>
        <Col md={12}>
          <PageHeader
            title={t('survey_submissions.title')}
            subtitle={t('survey_submissions.description')}
          />
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col md={12}>
            <Alert variant="danger">Error: {error}</Alert>
          </Col>
        </Row>
      )}

      {errorDetails && (
        <Row className="mb-3">
          <Col md={12}>
            <Alert variant="warning">Error loading details: {errorDetails}</Alert>
          </Col>
        </Row>
      )}

      {loading ? (
        <Row className="mt-3" style={{ justifyContent: 'center' }}>
          <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: 360, width: '100%' }}>
              <Loading loading fullScreen={false} label="Loading" minHeight={120} />
            </div>
          </Col>
        </Row>
      ) : (
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
            onSearchChange={handleSearchChange}
          />
        </Row>
      )}

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

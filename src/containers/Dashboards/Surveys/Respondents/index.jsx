import React, { useEffect, useMemo, useCallback } from 'react';
import Loading from '@/shared/components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
 Col, Container, Row, Alert, 
} from 'react-bootstrap';
import { Box } from '@mui/material';
import PageHeader from '@/shared/components/PageHeader';
import { useTranslation } from 'react-i18next';
import { fetchRespondentsAction, resetRespondentsAction } from '@/redux/actions/respondentsActions';
import RespondentsReactTable from './components/RespondentsReactTable';

const Respondents = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  
  const {
    respondents = [],
    loading,
    error,
    currentPage,
    totalPages,
    perPage,
    totalCount,
    search,
  } = useSelector(state => state.respondents || {});

  // On mount, fetch clean list without previous search
  useEffect(() => {
    dispatch(fetchRespondentsAction(1, perPage, ''));
    // On unmount, reset respondents state so coming back shows default list
    return () => {
      dispatch(resetRespondentsAction());
    };
    // Run only once on mount to avoid overriding filtered results on page-size changes
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
        Header: 'Respondent ID',
        accessor: 'respondent_id',
        disableGlobalFilter: false,
        width: 140,
      },
      {
        Header: 'Survey',
        accessor: 'survey',
        disableGlobalFilter: true,
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Age',
        accessor: 'age',
        disableGlobalFilter: true,
      },
      {
        Header: 'Gender',
        accessor: 'gender',
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

  const parseDetails = (details) => {
    try {
      return JSON.parse(details);
    } catch (e) {
      return { age: null, gender: null, country: null };
    }
  };

  // Map over respondents directly
  const data = respondents?.map((respondent, index) => {
    const { age, gender, country } = parseDetails(respondent.details);
    return {
      id: index + 1,
      respondent_id: respondent.id,
      email: respondent.email || 'N/A',
      survey: respondent.survey_response?.survey?.title || 'N/A',
      age: respondent.age || age || 'N/A',
      gender: respondent.gender || gender || 'N/A',
      country: respondent.country || country || 'N/A',
      created_at: respondent.created_at
        ? new Date(respondent.created_at).toLocaleDateString()
        : 'N/A',
    };
  }) || [];

  const reactTableData = { tableHeaderData: columns, tableRowsData: data };

  // Handlers for server-side pagination
  const handlePageChange = useCallback(
    (page, pageSize) => {
      // page is 1-based coming from constructor effect
      dispatch(fetchRespondentsAction(page, pageSize || perPage, search || ''));
    },
    [dispatch, perPage, search],
  );

  const handlePageSizeChange = useCallback(
    (pageSize) => {
      // Compute new page to keep the first visible item roughly stable
      const prevOffset = (currentPage - 1) * (perPage || 10);
      const newPage = Math.floor(prevOffset / (pageSize || 10)) + 1;
      dispatch(fetchRespondentsAction(newPage, pageSize, search || ''));
    },
    [dispatch, currentPage, perPage, search],
  );

  const handleSearchChange = useCallback((value) => {
    // Reset to page 1 on new search
    dispatch(fetchRespondentsAction(1, perPage, value || ''));
  }, [dispatch, perPage]);

  console.log('react table data: ', reactTableData);
  console.log('data: ', data);
  console.log('respondents: ', respondents);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <PageHeader title={t('respondents.title')} subtitle={t('respondents.description')} />
        </Col>
      </Row>
      {error && (
        <Row className="mb-3">
          <Col md={12}>
            <Alert variant="danger">Error: {error}</Alert>
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
          <RespondentsReactTable
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
    </Container>
  );
};

export default Respondents;

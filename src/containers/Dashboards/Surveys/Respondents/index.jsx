import React, { useEffect, useMemo, useCallback } from 'react';
import Spinner from '@/shared/components/Loader/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { fetchRespondentsAction } from '@/redux/actions/respondentsActions';
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
  } = useSelector(state => state.respondents || {});

  useEffect(() => {
    dispatch(fetchRespondentsAction());
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
      dispatch(fetchRespondentsAction(page, pageSize || perPage));
    },
    [dispatch, perPage],
  );

  const handlePageSizeChange = useCallback(
    (pageSize) => {
      // Reset to first page on page size change
      dispatch(fetchRespondentsAction(1, pageSize));
    },
    [dispatch],
  );

  console.log('react table data: ', reactTableData);
  console.log('data: ', data);
  console.log('respondents: ', respondents);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">{t('respondents.title')}</h3>
          <h3 className="page-subhead subhead">{t('respondents.description')}</h3>
        </Col>
      </Row>
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
        />
      </Row>
    </Container>
  );
};

export default Respondents;

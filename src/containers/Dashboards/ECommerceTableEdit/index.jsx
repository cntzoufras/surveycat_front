import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { changeNewOrderTableData, loadNewOrderTableData } from '@/redux/actions/newOrderTableActions';
import NewOrderEditForm from './components/NewOrderEditForm';

const ECommerceDashboardEdit = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const { index } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNewOrderTableData(index));
  }, [dispatch, index]);

  const handleSubmit = (formValues) => {
    dispatch(changeNewOrderTableData(formValues, index));
    setIsRedirect(true);
  };

  if (isRedirect) {
    return <Navigate to="/e_commerce_dashboard" />;
  }

  return (
    <Container className="dashboard">
      <Row>
        <NewOrderEditForm onSubmit={handleSubmit} />
      </Row>
    </Container>
  );
};

// ECommerceDashboardEdit.propTypes = {
//   match: PropTypes.shape().isRequired,
// };

export default ECommerceDashboardEdit;

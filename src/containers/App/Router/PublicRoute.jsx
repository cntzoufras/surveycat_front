import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '@/shared/components/account/auth/Loading';

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector(state => state.auth);

  if (loading) {
    return <Loading />;
  }
  if (user) {
    return <Navigate to="/dashboards/app" replace />;
  }
  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;

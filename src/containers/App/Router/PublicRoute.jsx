import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '@/shared/components/account/auth/Loading';

const PublicRoute = ({ children }) => {
  const { user, loading } = useSelector(state => state.auth);

  if (loading) {
    return <Loading />;
  }
  if (user) {
    // already logged in → bounce to home (/)
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;

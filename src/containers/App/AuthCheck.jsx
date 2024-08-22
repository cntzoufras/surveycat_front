import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authenticateUser } from '@/redux/actions/authActions'; // Action to load user data
import Loading from '@/shared/components/account/auth/Loading'; // A loading component to show while checking auth

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      // Attempt to authenticate the user (e.g., from localStorage, API call)
      dispatch(authenticateUser());
    }
  }, [dispatch, user]);

  if (loading) {
    // Show a loading spinner while authentication is being checked
    return <Loading />;
  }

  if (!user) {
    // If no user is found after loading, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // Render the child components if the user is authenticated
};

export default AuthCheck;

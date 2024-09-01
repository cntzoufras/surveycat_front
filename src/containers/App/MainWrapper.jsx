import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppConfig } from '@/redux/actions/appConfigActions';
import Loading from '@/shared/components/Loading';

const MainWrapper = ({ children }) => {
  const { isFetching } = useSelector(state => ({
    isFetching: state.appConfig.isFetching,
  }));

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAppConfig());
  }, [dispatch]);

  return isFetching ? (
    <Loading loading={isFetching} />
  ) : (
    <div className="wrapper">
      {children}
    </div>
  );
};


MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};


export default MainWrapper;

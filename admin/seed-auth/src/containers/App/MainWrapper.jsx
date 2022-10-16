import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const MainWrapper = ({ children }) => (
  <div>
    {children}
  </div>
);

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(MainWrapper);

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    if (location && location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return children;

};

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollToTop;

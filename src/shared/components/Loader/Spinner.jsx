import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ size, color, label, fullHeight }) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;
  const spinner = (
    <div
      aria-label={label || 'Loading'}
      role="status"
      style={{
        display: 'inline-block',
        width: dimension,
        height: dimension,
        border: `3px solid ${color}33`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'sc-spin 0.8s linear infinite',
      }}
    />
  );

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: fullHeight ? '50vh' : 'auto',
    }}>
      {spinner}
      <style>{`
        @keyframes sc-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  label: PropTypes.string,
  fullHeight: PropTypes.bool,
};

Spinner.defaultProps = {
  size: 28,
  color: '#6c5ce7',
  label: 'Loading',
  fullHeight: true,
};

export default Spinner;

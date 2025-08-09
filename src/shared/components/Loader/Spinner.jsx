import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';

const Spinner = ({
 size, color, label, fullHeight, 
}) => {
  const dimension = typeof size === 'number' ? size : parseInt(size, 10) || 28;

  return (
    <Box
      role="status"
      aria-label={label || 'Loading'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: fullHeight ? '50vh' : 'auto',
      }}
    >
      <CircularProgress size={dimension} sx={{ color: color || '#1976d2' }} />
      {label && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {label}
        </Typography>
      )}
    </Box>
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
  color: undefined,
  label: 'Loading',
  fullHeight: true,
};

export default Spinner;

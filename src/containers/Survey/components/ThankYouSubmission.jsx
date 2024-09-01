import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Paper } from '@mui/material';

const ThankYouSubmission = ({ timestamp }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      padding: 3,
    }}
  >
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        borderRadius: '12px',
        maxWidth: '600px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, fontWeight: '700', color: '#333' }}>
        Thank You for Your Submission!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
        We appreciate your feedback. Your response has been recorded on {timestamp}.
      </Typography>
      <Typography variant="body2" sx={{ color: '#777' }}>
        Thank you for participating in our survey.
      </Typography>
    </Paper>
  </Box>
);

ThankYouSubmission.propTypes = {
  timestamp: PropTypes.string.isRequired, // or PropTypes.instanceOf(Date)
};

export default ThankYouSubmission;

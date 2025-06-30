import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal as MuiModal, Box as MuiBox, Typography as MuiTypography, Button as MuiButton, 
} from '@mui/material';

const ConfirmPublishModal = ({ open, onClose, onConfirm }) => (
  <MuiModal open={open} onClose={onClose}>
    <MuiBox sx={{
      width: 300, padding: 2, backgroundColor: 'white', margin: 'auto', mt: '20%',
    }}
    >
      <MuiTypography variant="h6" sx={{ color: 'black' }} color="primary" gutterBottom>
        Confirm Publish
      </MuiTypography>
      <MuiTypography variant="body2" sx={{ color: 'black' }} color="primary" gutterBottom>
        Are you sure you want to publish this survey? Once published, it will be available for participants.
      </MuiTypography>
      <MuiBox sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <MuiButton
          variant="text"
          onClick={onClose}
          sx={{
            color: '#555',
            fontWeight: 'bold',
            '&:hover': {
              color: '#000',
              backgroundColor: 'transparent',
            },
          }}
        >
          Cancel
        </MuiButton>
        <MuiButton variant="contained" color="primary" onClick={onConfirm}>
          Confirm
        </MuiButton>
      </MuiBox>
    </MuiBox>
  </MuiModal>
);

ConfirmPublishModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmPublishModal;

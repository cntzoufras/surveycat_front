import React from 'react';
import { Modal as MuiModal, Box as MuiBox, Typography as MuiTypography, Button as MuiButton } from '@mui/material';

const ConfirmPublishModal = ({ open, onClose, onConfirm }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <MuiBox sx={{ width: 300, padding: 2, backgroundColor: 'white', margin: 'auto', mt: '20%' }}>
        <MuiTypography variant="h6" gutterBottom>
          Confirm Publish
        </MuiTypography>
        <MuiTypography variant="body1" gutterBottom>
          Are you sure you want to publish this survey? Once published, it will be available for participants.
        </MuiTypography>
        <MuiBox sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <MuiButton variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </MuiButton>
          <MuiButton variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </MuiButton>
        </MuiBox>
      </MuiBox>
    </MuiModal>
  );
};

export default ConfirmPublishModal;

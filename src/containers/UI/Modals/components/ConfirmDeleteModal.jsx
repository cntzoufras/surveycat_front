import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const ConfirmDeleteModal = ({
 open, onClose, onConfirm, title, message, 
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="confirm-delete-title"
    aria-describedby="confirm-delete-description"
  >
    <DialogTitle id="confirm-delete-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-delete-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="error" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

ConfirmDeleteModal.defaultProps = {
  title: 'Confirm Deletion',
  message: 'Are you sure you want to perform this action? This cannot be undone.',
};

export default ConfirmDeleteModal;

import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from '@mui/material';

const SurveyDescriptionField = ({ value, onChange }) => (
  <MuiTextField
    fullWidth
    label="Survey Description"
    variant="outlined"
    margin="normal"
    multiline
    rows={6}
    value={value}
    onChange={onChange}
    sx={{ paddingBottom: 3, fontWeight: 300 }}
  />
);

SurveyDescriptionField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SurveyDescriptionField;

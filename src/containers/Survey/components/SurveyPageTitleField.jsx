import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from '@mui/material';

const SurveyPageTitleField = ({ value, onChange }) => (
  <MuiTextField
    fullWidth
    label="Page Title"
    variant="outlined"
    margin="normal"
    value={value}
    onChange={onChange}
    sx={{ paddingBottom: 1.5 }}
  />
  );

SurveyPageTitleField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SurveyPageTitleField;

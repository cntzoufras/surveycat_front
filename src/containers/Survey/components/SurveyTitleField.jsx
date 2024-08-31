import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from '@mui/material';

const SurveyTitleField = ({ value, onChange }) => (
  <MuiTextField
    fullWidth
    label="Survey Title"
    variant="outlined"
    margin="normal"
    value={value}
    onChange={onChange}
  />
  );
  
  SurveyTitleField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

export default SurveyTitleField;

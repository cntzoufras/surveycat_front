import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from '@mui/material';

const SurveyTitleField = ({ value, onChange, disabled }) => (
  <MuiTextField
    fullWidth
    label="Survey Title"
    variant="outlined"
    margin="normal"
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
  );
  
  SurveyTitleField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  SurveyTitleField.defaultProps = {
    disabled: false,
  };

export default SurveyTitleField;

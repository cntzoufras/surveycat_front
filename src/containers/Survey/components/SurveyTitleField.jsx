import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const SurveyTitleField = ({ value, onChange }) => {
  return (
    <MuiTextField
      fullWidth
      label="Survey Title"
      variant="outlined"
      margin="normal"
      value={value}
      onChange={onChange}
    />
  );
};

export default SurveyTitleField;

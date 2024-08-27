import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const SurveyDescriptionField = ({ value, onChange }) => {
  return (
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
};

export default SurveyDescriptionField;

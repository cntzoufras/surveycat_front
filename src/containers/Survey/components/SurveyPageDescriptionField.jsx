import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const SurveyPageDescriptionField = ({ value, onChange }) => (
  <MuiTextField
    fullWidth
    label="Page Description"
    variant="outlined"
    margin="normal"
    multiline
    rows={6}
    value={value}
    onChange={onChange}
    InputLabelProps={{ shrink: true }}
  />
  );

export default SurveyPageDescriptionField;

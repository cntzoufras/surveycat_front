import React from 'react';
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

export default SurveyPageTitleField;

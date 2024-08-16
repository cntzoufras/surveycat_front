import React, { useState } from 'react';
import { Box as MuiBox, FormControl as MuiFormControl, InputLabel as MuiInputLabel, Select as MuiSelect, MenuItem as MuiMenuItem } from '@mui/material';

const fonts = [
  'Roboto',
  'Arial',
  'Courier New',
  'Times New Roman',
  'Georgia',
];

const FontSelector = ({ selectedFont, setSelectedFont }) => {
  return (
    <MuiBox mb={3}>
      <MuiFormControl fullWidth variant="outlined">
        <MuiInputLabel id="font-selector-label">Select Font</MuiInputLabel>
        <MuiSelect
          labelId="font-selector-label"
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          label="Select Font"
          displayEmpty
          sx={{
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: 'transparent',
            }
          }}
        >
          <MuiMenuItem value="" disabled>
            <em>Default (Roboto)</em>
          </MuiMenuItem>
          {fonts.map((font) => (
            <MuiMenuItem key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </MuiMenuItem>
          ))}
        </MuiSelect>
      </MuiFormControl>
    </MuiBox>
  );

};

export default FontSelector;

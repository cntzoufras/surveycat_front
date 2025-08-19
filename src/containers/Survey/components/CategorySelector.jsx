import React from 'react';
import PropTypes from 'prop-types';
import {
  Box as MuiBox,
  FormControl as MuiFormControl,
  InputLabel as MuiInputLabel,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  useTheme,
} from '@mui/material';

// Mirrors ThemeSelector/FontSelector style
const CategorySelector = ({ label = 'Select Category', value, onChange, options, size = 'small' }) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;

  return (
    <MuiBox sx={{ my: 2 }}>
      <MuiFormControl fullWidth variant="outlined" size={size} required>
        <MuiInputLabel id="category-selector-label" shrink sx={{ color: textColor }}>
          {label}
        </MuiInputLabel>
        <MuiSelect
          labelId="category-selector-label"
          id="category-selector"
          value={value}
          onChange={onChange}
          label={label}
          displayEmpty
          MenuProps={{
            disableScrollLock: true,
            PaperProps: {
              sx: { maxWidth: 'calc(100vw - 32px)' },
            },
          }}
          sx={{
            color: textColor,
            '& .MuiSvgIcon-root': { color: textColor },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.divider },
          }}
        >
          {options.map(opt => (
            <MuiMenuItem key={opt.value} value={opt.value} sx={{ color: textColor }}>
              {opt.label}
            </MuiMenuItem>
          ))}
        </MuiSelect>
      </MuiFormControl>
    </MuiBox>
  );
};

CategorySelector.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.node.isRequired,
    })
  ).isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
};

export default CategorySelector;

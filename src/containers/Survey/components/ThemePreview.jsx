import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FONT_OPTIONS from '@/constants/fontConstants';
import {
  Box, Typography, Paper, Grid, TextField, Button, FormControl,
  InputLabel, Select, MenuItem, Slider, Chip,
} from '@mui/material';
import { ChromePicker } from 'react-color';
import _ from 'lodash';
import tinycolor from 'tinycolor2';

const DEFAULT_THEME = {
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    headingStyle: { H1: 'bold 24px', H2: 'bold 18px' },
  },
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    background: '#DE0000',
    text: '#333333',
    question: '#090606',
    choice: '#666666',
  },
  variable_palette: { primary_background: '#f1ebf2' },
  layout: { backgroundAlpha: 100, borderRadius: 8, padding: 20 },
};

const ThemePreview = ({ theme, onThemeUpdate }) => {
  const [activeTab, setActiveTab] = useState('colors');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [activeColorField, setActiveColorField] = useState(null);
  const [activeColorType, setActiveColorType] = useState('colors'); // 'colors' | 'palette'

  const currentTheme = _.merge({}, DEFAULT_THEME, theme);

  const handleColorChange = (color) => {
    if (!activeColorField) return;

    const newTheme = _.cloneDeep(currentTheme);
    if (activeColorType === 'palette') {
      _.set(newTheme, `variable_palette.${activeColorField}`, color.hex);
    } else {
      _.set(newTheme, `colors.${activeColorField}`, color.hex);
    }

    onThemeUpdate({
      colors: newTheme.colors,
      variable_palette: newTheme.variable_palette,
    });
  };

  const handleTypographyChange = (field, value) => {
    if (field === 'headingStyle') {
      onThemeUpdate({ typography: { ...currentTheme.typography, headingStyle: value } });
    } else {
      onThemeUpdate({ typography: { ...currentTheme.typography, [field]: value } });
    }
  };

  const handleLayoutChange = (field, value) => {
    onThemeUpdate({ layout: { ...currentTheme.layout, [field]: value } });
  };

  const renderPreview = () => {
    const bgAlpha = currentTheme.layout.backgroundAlpha / 100;
    const questionBoxBg = tinycolor(currentTheme.colors.background)
      .setAlpha(bgAlpha)
      .toRgbString();

    const styles = {
      fontFamily: currentTheme.typography.fontFamily,
      color: currentTheme.colors.text,
      borderRadius: `${currentTheme.layout.borderRadius}px`,
      padding: `${currentTheme.layout.padding}px`,
      backgroundColor: questionBoxBg,
    };

    return (
      <Paper elevation={3} sx={{ p: 3, ...styles }}>
        {/* Question Title - H1 Style */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: currentTheme.typography.fontFamily,
            color: currentTheme.colors.question,
            fontSize: currentTheme.typography.headingStyle?.H1 || '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
          }}
        >
          How would you rate our customer service?
        </Typography>

        {/* Question Description */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: currentTheme.typography.fontFamily,
            color: currentTheme.colors.text,
            fontSize: currentTheme.typography.fontSize || '16px',
            marginBottom: '20px',
            lineHeight: 1.5,
          }}
        >
          Please share your honest feedback about your experience with our service.
          Your response will help us improve our services.
        </Typography>

        {/* Multiple Choice Options */}
        <Box sx={{ mt: 3, mb: 3 }}>
          {[
            { label: 'Excellent' },
            { label: 'Good' },
            { label: 'Average' },
            { label: 'Poor' },
          ].map(option => (
            <Box
              key={option.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                p: 2,
                border: `1px solid ${currentTheme.colors.choice}`,
                borderRadius: `${currentTheme.layout.borderRadius}px`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: `${currentTheme.colors.primary}10`,
                  borderColor: currentTheme.colors.primary,
                },
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  border: `2px solid ${currentTheme.colors.primary}`,
                  borderRadius: '50%',
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <Typography
                sx={{
                  color: currentTheme.colors.choice,
                  fontFamily: currentTheme.typography.fontFamily,
                  fontSize: currentTheme.typography.fontSize || '16px',
                }}
              >
                {option.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: currentTheme.colors.primary,
            color: '#ffffff',
            fontFamily: currentTheme.typography.fontFamily,
            fontSize: currentTheme.typography.fontSize || '16px',
            padding: '12px 24px',
            borderRadius: `${currentTheme.layout.borderRadius}px`,
            textTransform: 'none',
          }}
        >
          Submit Response
        </Button>

        {/* Font Preview Section */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: currentTheme.typography.fontFamily,
              color: currentTheme.colors.primary,
              marginBottom: '12px',
              fontSize: currentTheme.typography.headingStyle?.H2 || '18px',
            }}
          >
            Typography Preview
          </Typography>

          <Box sx={{ display: 'grid', gap: 2 }}>
            <Typography
              sx={{
                fontFamily: currentTheme.typography.fontFamily,
                color: currentTheme.colors.text,
                fontSize: currentTheme.typography.fontSize || '16px',
              }}
            >
              Regular text: The quick brown fox jumps over the lazy dog.
            </Typography>

            <Typography
              sx={{
                fontFamily: currentTheme.typography.fontFamily,
                color: currentTheme.colors.text,
                fontSize: currentTheme.typography.fontSize || '16px',
                fontWeight: 'bold',
              }}
            >
              Bold text: The quick brown fox jumps over the lazy dog.
            </Typography>

            <Typography
              sx={{
                fontFamily: currentTheme.typography.fontFamily,
                color: currentTheme.colors.text,
                fontSize: currentTheme.typography.fontSize || '16px',
                fontStyle: 'italic',
              }}
            >
              Italic text: The quick brown fox jumps over the lazy dog.
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  };

  const renderTypographyEditor = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Typography Settings</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Font Family</InputLabel>
            <Select
              value={currentTheme.typography.fontFamily}
              onChange={e => handleTypographyChange('fontFamily', e.target.value)}
              label="Font Family"
            >
              {FONT_OPTIONS.map(opt => (
                <MenuItem key={opt.label} value={opt.stack} sx={{ fontFamily: opt.stack }}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Font Size"
            value={currentTheme.typography.fontSize}
            onChange={e => handleTypographyChange('fontSize', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="H1 Size"
            value={currentTheme.typography.headingStyle?.H1 || '24px'}
            onChange={e => handleTypographyChange('headingStyle', {
                ...currentTheme.typography.headingStyle,
                H1: e.target.value,
              })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="H2 Size"
            value={currentTheme.typography.headingStyle?.H2 || '18px'}
            onChange={e => handleTypographyChange('headingStyle', {
                ...currentTheme.typography.headingStyle,
                H2: e.target.value,
              })}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderColorEditor = () => {
    const pickerColor = activeColorType === 'palette'
        ? currentTheme.variable_palette[activeColorField]
        : currentTheme.colors[activeColorField];

    return (
      <Box>
        <Typography variant="h6" gutterBottom>Color Settings</Typography>

        <Grid container spacing={3}>
          {/* Page Background from variable_palette */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Page Background
              </Typography>
              <Chip
                label={currentTheme.variable_palette.primary_background}
                sx={{
                  backgroundColor: currentTheme.variable_palette.primary_background,
                  color: tinycolor(currentTheme.variable_palette.primary_background).isDark()
                    ? '#fff'
                    : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveColorField('primary_background');
                  setActiveColorType('palette');
                  setColorPickerOpen(true);
                }}
              />
            </Box>
          </Grid>

          {/* Question Box Background from colors.background */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                Question Box
              </Typography>
              <Chip
                label={currentTheme.colors.background}
                sx={{
                  backgroundColor: currentTheme.colors.background,
                  color: tinycolor(currentTheme.colors.background).isDark() ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setActiveColorField('background');
                  setActiveColorType('colors');
                  setColorPickerOpen(true);
                }}
              />
            </Box>
          </Grid>

          {/* Other colors */}
          {Object.entries(currentTheme.colors)
            .filter(([key]) => key !== 'background')
            .map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ minWidth: 80 }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                  <Chip
                    label={value}
                    sx={{
                      backgroundColor: value,
                      color: value === '#ffffff' ? '#000000' : '#ffffff',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setActiveColorField(key);
                      setActiveColorType('colors');
                      setColorPickerOpen(true);
                    }}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>

        {colorPickerOpen && activeColorField && (
          <Box sx={{ mt: 2 }}>
            <ChromePicker
              color={pickerColor}
              onChange={handleColorChange}
              onChangeComplete={handleColorChange}
            />
            <Button onClick={() => setColorPickerOpen(false)} sx={{ mt: 1 }}>
              Close
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  const renderLayoutEditor = () => (
    <Box>
      <Typography variant="h6" gutterBottom>Layout Settings</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Background Alpha</Typography>
          <Slider
            value={currentTheme.layout.backgroundAlpha}
            onChange={(event, value) => handleLayoutChange('backgroundAlpha', value)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Border Radius"
            type="number"
            value={currentTheme.layout.borderRadius}
            onChange={e => handleLayoutChange('borderRadius', parseInt(e.target.value, 10))}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Padding"
            type="number"
            value={currentTheme.layout.padding}
            onChange={e => handleLayoutChange('padding', parseInt(e.target.value, 10))}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const pageBg = currentTheme.variable_palette.primary_background
    || DEFAULT_THEME.variable_palette.primary_background;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Theme Customization</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Button
                onClick={() => setActiveTab('typography')}
                variant={activeTab === 'typography' ? 'contained' : 'text'}
                sx={{ mr: 1 }}
              >
                Typography
              </Button>
              <Button
                onClick={() => setActiveTab('colors')}
                variant={activeTab === 'colors' ? 'contained' : 'text'}
                sx={{ mr: 1 }}
              >
                Colors
              </Button>
              <Button
                onClick={() => setActiveTab('layout')}
                variant={activeTab === 'layout' ? 'contained' : 'text'}
              >
                Layout
              </Button>
            </Box>

            {activeTab === 'typography' && renderTypographyEditor()}
            {activeTab === 'colors' && renderColorEditor()}
            {activeTab === 'layout' && renderLayoutEditor()}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Page background */}
          <Paper elevation={1} sx={{ p: 3, backgroundColor: pageBg }}>
            <Typography variant="h6" gutterBottom>Live Preview</Typography>
            {renderPreview()}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

ThemePreview.propTypes = {
  theme: PropTypes.shape({
    typography: PropTypes.shape({
      fontFamily: PropTypes.string,
      fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      headingStyle: PropTypes.shape({
        H1: PropTypes.string,
        H2: PropTypes.string,
      }),
    }),
    colors: PropTypes.objectOf(PropTypes.string),
    variable_palette: PropTypes.objectOf(PropTypes.string),
    layout: PropTypes.shape({
      backgroundAlpha: PropTypes.number,
      borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }),
  onThemeUpdate: PropTypes.func.isRequired,
};

ThemePreview.defaultProps = {
  theme: DEFAULT_THEME,
};

export default ThemePreview;

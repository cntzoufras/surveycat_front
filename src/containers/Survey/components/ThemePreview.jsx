import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
} from '@mui/material';
import { ChromePicker } from 'react-color';

const ThemePreview = ({ theme, onThemeUpdate, surveyId }) => {
  const [activeTab, setActiveTab] = useState('typography');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [activeColorField, setActiveColorField] = useState(null);

  const defaultTheme = {
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      headingStyle: {
        H1: 'bold 24px',
        H2: 'bold 18px',
      },
    },
    colors: {
      primary: '#1976d2',
      secondary: '#dc004e',
      background: '#ffffff',
      text: '#333333',
      question: '#252525',
      choice: '#666666',
    },
    layout: {
      backgroundAlpha: 100,
      borderRadius: 8,
      padding: 20,
    },
  };

  const currentTheme = { ...defaultTheme, ...theme };

  const handleColorChange = (color) => {
    if (activeColorField) {
      onThemeUpdate({
        colors: {
          ...currentTheme.colors,
          [activeColorField]: color.hex,
        },
      });
    }
  };

  const handleTypographyChange = (field, value) => {
    onThemeUpdate({
      typography: {
        ...currentTheme.typography,
        [field]: value,
      },
    });
  };

  const handleLayoutChange = (field, value) => {
    onThemeUpdate({
      layout: {
        ...currentTheme.layout,
        [field]: value,
      },
    });
  };

  const renderPreview = () => {
    const styles = {
      fontFamily: currentTheme.typography.fontFamily,
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.text,
      borderRadius: `${currentTheme.layout.borderRadius}px`,
      padding: `${currentTheme.layout.padding}px`,
      opacity: currentTheme.layout.backgroundAlpha / 100,
    };

    return (
      <Paper elevation={3} sx={{ p: 3, ...styles }}>
        <Typography variant="h4" sx={{ 
          fontFamily: currentTheme.typography.fontFamily,
          color: currentTheme.colors.primary,
          fontSize: currentTheme.typography.headingStyle.H1,
        }}>
          Sample Survey Question
        </Typography>
        
        <Typography variant="body1" sx={{ 
          mt: 2, 
          color: currentTheme.colors.text,
          fontFamily: currentTheme.typography.fontFamily,
        }}>
          This is how your survey questions will appear to respondents.
        </Typography>

        <Box sx={{ mt: 3 }}>
          {['Option A', 'Option B', 'Option C'].map((option, index) => (
            <Box key={index} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1,
              p: 1,
              border: `1px solid ${currentTheme.colors.choice}`,
              borderRadius: `${currentTheme.layout.borderRadius / 2}px`,
            }}>
              <Box sx={{
                width: 20,
                height: 20,
                border: `2px solid ${currentTheme.colors.primary}`,
                borderRadius: '50%',
                mr: 2,
              }} />
              <Typography sx={{ color: currentTheme.colors.choice }}>
                {option}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };

  const renderTypographyEditor = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Typography Settings
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Font Family"
            value={currentTheme.typography.fontFamily}
            onChange={(e) => handleTypographyChange('fontFamily', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Font Size"
            value={currentTheme.typography.fontSize}
            onChange={(e) => handleTypographyChange('fontSize', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="H1 Style"
            value={currentTheme.typography.headingStyle.H1}
            onChange={(e) => handleTypographyChange('headingStyle', {
              ...currentTheme.typography.headingStyle,
              H1: e.target.value
            })}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="H2 Style"
            value={currentTheme.typography.headingStyle.H2}
            onChange={(e) => handleTypographyChange('headingStyle', {
              ...currentTheme.typography.headingStyle,
              H2: e.target.value
            })}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderColorEditor = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Color Settings
      </Typography>
      
      <Grid container spacing={3}>
        {Object.entries(currentTheme.colors).map(([key, value]) => (
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
            color={currentTheme.colors[activeColorField]}
            onChange={handleColorChange}
            onChangeComplete={handleColorChange}
          />
          <Button 
            onClick={() => setColorPickerOpen(false)}
            sx={{ mt: 1 }}
          >
            Close
          </Button>
        </Box>
      )}
    </Box>
  );

  const renderLayoutEditor = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Layout Settings
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Background Alpha</Typography>
          <Slider
            value={currentTheme.layout.backgroundAlpha}
            onChange={(_, value) => handleLayoutChange('backgroundAlpha', value)}
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
            onChange={(e) => handleLayoutChange('borderRadius', parseInt(e.target.value))}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Padding"
            type="number"
            value={currentTheme.layout.padding}
            onChange={(e) => handleLayoutChange('padding', parseInt(e.target.value))}
          />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Theme Customization
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
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
        
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Live Preview
            </Typography>
            {renderPreview()}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThemePreview;

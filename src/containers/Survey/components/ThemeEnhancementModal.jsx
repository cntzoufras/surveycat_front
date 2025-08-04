import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import ThemePreview from './ThemePreview';
import { useDispatch } from 'react-redux';
import { 
  createCustomThemeAction, 
  updateCustomThemeAction, 
  deleteCustomThemeAction,
  resetToBaseThemeAction,
  updateSurveyCustomThemeAction,
  fetchSurveysAction
} from '@/redux/actions/surveyActions';

const ThemeEnhancementModal = ({ open, onClose, survey, theme }) => {
  const [customTheme, setCustomTheme] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (survey && theme) {
      // Initialize with current survey's custom theme or theme defaults
      const currentCustomTheme = survey.custom_theme_settings || {};
      
      // Get base theme from theme settings
      const baseTheme = theme.theme_setting?.settings || {};
      
      // Get variable palettes for color defaults
      const variablePalettes = theme.theme_setting?.variable_palettes || [];
      const activePalette = variablePalettes.find(p => p.is_active) || variablePalettes[0] || {};
      
      // Create proper theme structure with variable palette defaults
      const defaultTheme = {
        ...baseTheme,
        colors: {
          primary: activePalette.primary_accent || baseTheme.colors?.primary || '#1976d2',
          secondary: activePalette.secondary_accent || baseTheme.colors?.secondary || '#dc004e',
          background: activePalette.primary_background || baseTheme.colors?.background || '#ffffff',
          text: activePalette.title_color || baseTheme.colors?.text || '#333333',
          question: activePalette.question_color || baseTheme.colors?.question || '#252525',
          choice: activePalette.answer_color || baseTheme.colors?.choice || '#666666',
        },
        typography: baseTheme.typography || {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          headingStyle: {
            H1: 'bold 24px',
            H2: 'bold 18px',
          }
        },
        layout: baseTheme.layout || {
          backgroundAlpha: 100,
          borderRadius: 8,
          padding: 20,
          alignment: 'left',
        }
      };
      
      // Merge custom overrides with the properly structured default theme
      setCustomTheme({
        ...defaultTheme,
        ...currentCustomTheme,
        colors: {
          ...defaultTheme.colors,
          ...currentCustomTheme.colors,
        },
        typography: {
          ...defaultTheme.typography,
          ...currentCustomTheme.typography,
          headingStyle: {
            ...defaultTheme.typography.headingStyle,
            ...currentCustomTheme.typography?.headingStyle,
          }
        },
        layout: {
          ...defaultTheme.layout,
          ...currentCustomTheme.layout,
        }
      });
    }
  }, [survey, theme]);

  const handleThemeUpdate = (updates) => {
    setCustomTheme(prev => ({
      ...prev,
      ...updates,
      colors: { ...prev.colors, ...updates.colors },
      typography: { 
        ...prev.typography, 
        ...updates.typography,
        headingStyle: { ...prev.typography?.headingStyle, ...updates.typography?.headingStyle }
      },
      layout: { ...prev.layout, ...updates.layout },
    }));
  };

  const handleSave = async () => {
    if (!survey) return;

    setIsSaving(true);
    try {
      // Save the custom theme settings directly to the survey
      await dispatch(updateSurveyCustomThemeAction(survey.id, customTheme, survey.user_id));

      // Re-fetch surveys to ensure the list is up-to-date with all relations
      await dispatch(fetchSurveysAction());
      
      onClose();
    } catch (error) {
      console.error('Error saving custom theme:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    setIsSaving(true);
    try {
      // Reset to base theme
      await dispatch(resetToBaseThemeAction(survey.id));
      
      // Delete custom theme if it exists
      if (survey.custom_theme_id) {
        await dispatch(deleteCustomThemeAction(survey.custom_theme_id));
      }
      
      onClose();
    } catch (error) {
      console.error('Error resetting theme:', error);
    } finally {
      setIsSaving(false);
    }
    // Reset local state to default theme (including variable palettes)
    if (theme && theme.theme_setting) {
      const baseTheme = theme.theme_setting.settings || {};
      const variablePalettes = theme.theme_setting.variable_palettes || [];
      const activePalette = variablePalettes.find(p => p.is_active) || variablePalettes[0] || {};
      
      const defaultTheme = {
        ...baseTheme,
        colors: {
          primary: activePalette.primary_accent || baseTheme.colors?.primary || '#1976d2',
          secondary: activePalette.secondary_accent || baseTheme.colors?.secondary || '#dc004e',
          background: activePalette.primary_background || baseTheme.colors?.background || '#ffffff',
          text: activePalette.title_color || baseTheme.colors?.text || '#333333',
          question: activePalette.question_color || baseTheme.colors?.question || '#252525',
          choice: activePalette.answer_color || baseTheme.colors?.choice || '#666666',
        },
        typography: baseTheme.typography || {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          headingStyle: {
            H1: 'bold 24px',
            H2: 'bold 18px',
          }
        },
        layout: baseTheme.layout || {
          backgroundAlpha: 100,
          borderRadius: 8,
          padding: 20,
          alignment: 'left',
        }
      };
      
      setCustomTheme(defaultTheme);
    }
  };



  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: { maxWidth: '1200px', height: '90vh' }
      }}
    >
      <DialogTitle>
        Customize Theme for "{survey?.title || 'Survey'}"
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            Customize the theme styling for this specific survey. Your changes will only affect this survey and won't modify the original theme.
          </Alert>
          
          {theme && (
            <ThemePreview
              theme={customTheme}
              onThemeUpdate={handleThemeUpdate}
            />
          )}
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleResetToDefault} color="secondary">
          Reset to Default
        </Button>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Custom Theme'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThemeEnhancementModal;

import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Alert,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteCustomThemeAction,
  resetToBaseThemeAction,
  updateSurveyCustomThemeAction,
  fetchSurveysAction,
} from '@/redux/actions/surveyActions';
import ThemePreview from './ThemePreview';

const ThemeEnhancementModal = ({
   open, 
   onClose, 
   survey, 
   theme, 
  }) => {
  const [customTheme, setCustomTheme] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (survey && theme) {
      const currentCustomTheme = survey.custom_theme_settings || {};
      const baseTheme = theme.theme_setting?.settings || {};
      const variablePalettes = theme.theme_setting?.variable_palettes || [];
      const activePalette = variablePalettes.find(p => p.is_active) || variablePalettes[0] || {};

      const defaultTheme = {
        ...baseTheme,
        colors: {
          primary: activePalette.primary_accent || baseTheme.colors?.primary || '#1976d2',
          secondary: activePalette.secondary_accent || baseTheme.colors?.secondary || '#dc004e',
          background: activePalette.primary_background || baseTheme.colors?.background || '#ffffff',
          text: activePalette.title_color || baseTheme.colors?.text || '#333333',
          // New: page title color key to control page headers independently
          page_title: baseTheme.colors?.page_title
            || baseTheme.colors?.subtitle
            || baseTheme.colors?.title_color
            || activePalette.title_color
            || '#4f4f4f',
          // New: explicit title color key to control PublicSurveyPage title independently
          title_color: baseTheme.colors?.title_color || activePalette.title_color || '#333333',
          question: activePalette.question_color || baseTheme.colors?.question || '#252525',
          choice: activePalette.answer_color || baseTheme.colors?.choice || '#666666',
        },
        typography: baseTheme.typography || {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          headingStyle: { H1: 'bold 24px', H2: 'bold 18px' },
        },
        layout: baseTheme.layout || {
          backgroundAlpha: 100,
          borderRadius: 8,
          padding: 20,
          alignment: 'left',
        },
      };

      setCustomTheme({
        ...defaultTheme,
        ...currentCustomTheme,
        colors: { ...defaultTheme.colors, ...currentCustomTheme.colors },
        typography: {
          ...defaultTheme.typography,
          ...currentCustomTheme.typography,
          headingStyle: {
            ...defaultTheme.typography.headingStyle,
            ...currentCustomTheme.typography?.headingStyle,
          },
        },
        layout: { ...defaultTheme.layout, ...currentCustomTheme.layout },
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
        headingStyle: {
          ...prev.typography?.headingStyle,
          ...updates.typography?.headingStyle,
        },
      },
      layout: { ...prev.layout, ...updates.layout },
    }));
  };

  const handleSave = async () => {
    if (!survey) return;
    setIsSaving(true);
    try {
      await dispatch(updateSurveyCustomThemeAction(survey.id, customTheme, survey.user_id));
      await dispatch(fetchSurveysAction());
      onClose();
    } catch (err) {
      console.error('Error saving custom theme:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    setIsSaving(true);
    try {
      await dispatch(resetToBaseThemeAction(survey.id));
      if (survey.custom_theme_id) {
        await dispatch(deleteCustomThemeAction(survey.custom_theme_id));
      }
      onClose();
    } catch (err) {
      console.error('Error resetting theme:', err);
    } finally {
      setIsSaving(false);
    }

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
          // New: page title color key to control page headers independently
          page_title: baseTheme.colors?.page_title
            || baseTheme.colors?.subtitle
            || baseTheme.colors?.title_color
            || activePalette.title_color
            || '#4f4f4f',
          // New: explicit title color key to control PublicSurveyPage title independently
          title_color: baseTheme.colors?.title_color || activePalette.title_color || '#333333',
          question: activePalette.question_color || baseTheme.colors?.question || '#252525',
          choice: activePalette.answer_color || baseTheme.colors?.choice || '#666666',
        },
        typography: baseTheme.typography || {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          headingStyle: { H1: 'bold 24px', H2: 'bold 18px' },
        },
        layout: baseTheme.layout || {
          backgroundAlpha: 100,
          borderRadius: 8,
          padding: 20,
          alignment: 'left',
        },
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
      PaperProps={{ sx: { maxWidth: '1200px', height: '90vh' } }}
    >
      <DialogTitle>
        {/* removed quotes to avoid no-unescaped-entities */}
        Customize Theme for {survey?.title || 'Survey'}
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            {/* split text to avoid max-len and unescaped apostrophes */}
            Customize the theme styling for this specific survey.{' '}
            Your changes will only affect this survey and will not modify the original theme.
          </Alert>

          {theme && (
            <ThemePreview
              theme={customTheme}
              onThemeUpdate={handleThemeUpdate}
              survey={survey}
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleResetToDefault} color="secondary">
          Reset to Default
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save Custom Theme'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ThemeEnhancementModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  survey: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    custom_theme_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    custom_theme_settings: PropTypes.shape({
      colors: PropTypes.objectOf(PropTypes.string),
      typography: PropTypes.shape({
        fontFamily: PropTypes.string,
        fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        headingStyle: PropTypes.shape({
          H1: PropTypes.string,
          H2: PropTypes.string,
        }),
      }),
      layout: PropTypes.shape({
        backgroundAlpha: PropTypes.number,
        borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        alignment: PropTypes.string,
      }),
    }),
  }),
  theme: PropTypes.shape({
    theme_setting: PropTypes.shape({
      settings: PropTypes.shape({
        colors: PropTypes.objectOf(PropTypes.string),
        typography: PropTypes.shape({
          fontFamily: PropTypes.string,
          fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          headingStyle: PropTypes.shape({
            H1: PropTypes.string,
            H2: PropTypes.string,
          }),
        }),
        layout: PropTypes.shape({
          backgroundAlpha: PropTypes.number,
          borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          alignment: PropTypes.string,
        }),
      }),
      variable_palettes: PropTypes.arrayOf(
        PropTypes.shape({
          is_active: PropTypes.bool,
          primary_accent: PropTypes.string,
          secondary_accent: PropTypes.string,
          primary_background: PropTypes.string,
          title_color: PropTypes.string,
          question_color: PropTypes.string,
          answer_color: PropTypes.string,
        }),
      ),
    }),
  }),
};

ThemeEnhancementModal.defaultProps = {
  survey: null,
  theme: null,
};

export default ThemeEnhancementModal;

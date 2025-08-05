import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { WEB_SAFE_FONTS } from '../../../constants/fontConstants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThemeAction } from '../../../redux/actions/surveyThemeActions';
import { SurveyThemeProvider } from '../../../contexts/SurveyThemeContext';

const SurveyThemeWrapper = ({ survey, children, fallback = true }) => {
  const dispatch = useDispatch();
  const [surveyTheme, setSurveyTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const themes = useSelector(state => state.surveyTheme.list);
  const currentTheme = useSelector(state => state.surveyTheme.current);

  useEffect(() => {
    if (survey?.theme) {
      // If survey already includes full theme data, use it directly
      setSurveyTheme(survey.theme);
      setIsLoading(false);
    } else if (survey?.theme_id) {
      // Only fetch if theme data is not included in survey
      const existingTheme = themes.find(t => t.id === survey.theme_id);
      if (existingTheme) {
        setSurveyTheme(existingTheme);
        setIsLoading(false);
      } else {
        dispatch(fetchThemeAction(survey.theme_id));
      }
    } else {
      setIsLoading(false);
    }
  }, [survey?.theme_id, survey?.theme, themes, dispatch]);

  useEffect(() => {
    if (survey?.theme) {
      // Use theme data from survey response
      setSurveyTheme(survey.theme);
      setIsLoading(false);
    } else if (currentTheme && survey?.theme_id === currentTheme.id) {
      // Fallback to Redux theme if no survey.theme
      setSurveyTheme(currentTheme);
      setIsLoading(false);
    }
  }, [currentTheme, survey?.theme_id, survey?.theme]);

  const themeStyles = useMemo(() => {
    if (!surveyTheme) {
      return {};
    }

    const baseSettings = surveyTheme.theme_setting?.settings || {};
    const variablePalettes = surveyTheme.theme_setting?.variable_palettes || [];
    const activePalette = variablePalettes.find(p => p.is_active) || variablePalettes[0] || {};
    const customSettings = survey?.custom_theme_settings || {};

    // Deep merge: custom settings override base settings and palette
    const merged = _.merge(
      {},
      baseSettings,
      { variable_palette: activePalette }, // Base palette becomes a property
      customSettings
    );

    // For convenience, let's ensure colors object exists
    if (!merged.colors) {
      merged.colors = {};
    }
    
    return merged;
  }, [surveyTheme, survey?.custom_theme_settings]);

  const typography = themeStyles.typography || {};
  const layout = themeStyles.layout || {};
  const finalPalette = themeStyles.variable_palette || {};
  const finalColors = themeStyles.colors || {};

  // Hook for dynamically loading Google Fonts and applying to body
  useEffect(() => {
    if (!typography.fontFamily || typeof typography.fontFamily !== 'string' || typography.fontFamily.trim() === '') {
      return; // Do not run if font family is not set
    }

    const isWebSafe = WEB_SAFE_FONTS.includes(typography.fontFamily);
    const fontName = typography.fontFamily ? typography.fontFamily.split(',')[0].trim() : 'Roboto';

    // Load Google Font if not web-safe
    if (!isWebSafe) {
      const fontId = `google-font-${fontName.replace(/ /g, '+')}`;
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
        document.head.appendChild(link);
      }
    }

    // Apply font to body using a <style> tag for higher specificity
    const styleId = 'survey-theme-font-style';
    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Use !important to ensure the theme font overrides other styles
    const fontCss = `
      body {
        background-color: ${finalColors.background || 'transparent'};
        font-family: ${typography.fontFamily || 'Roboto, sans-serif'} !important;
      }
      body .MuiTypography-root, 
      body .MuiButton-root, 
      body .MuiTextField-root input, 
      body .MuiFormControl-root .MuiInputBase-root {
        font-family: ${typography.fontFamily || 'Roboto, sans-serif'} !important;
      }
    `;
    styleElement.innerHTML = fontCss;

    // Cleanup function to remove the style when the component unmounts
    return () => {
      const elementToRemove = document.getElementById(styleId);
      if (elementToRemove) {
        elementToRemove.remove();
      }
    };
  }, [typography.fontFamily, finalColors.background]);

  if (isLoading && survey?.theme_id) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontFamily: 'Arial, sans-serif',
        color: '#666'
      }}>
        Loading theme...
      </div>
    );
  }

  // Debug logging to verify theme data
  console.log('SurveyThemeWrapper - Final Merged Theme:', {
    settings: themeStyles,
    palette: finalPalette,
    colors: finalColors,
    surveyId: survey?.id,
  });

  const themeStylesDebug = {
    '--theme-primary': finalColors.primary || finalPalette.primary_accent || '#1976d2',
    '--theme-secondary': finalColors.secondary || finalPalette.secondary_accent || '#dc004e',
    '--theme-background': finalPalette.primary_background || '#ffffff', // Question box background
    '--theme-text': finalColors.text || finalPalette.title_color || '#333333',
    '--theme-question': finalColors.question || finalPalette.question_color || '#252525',
    '--theme-choice': finalColors.choice || finalPalette.answer_color || '#666666',
    '--theme-font-family': typography.fontFamily || 'Arial, sans-serif',
    '--theme-font-size': typography.fontSize || '16px',
    '--theme-border-radius': `${layout.borderRadius || 8}px`,
    // Page background is now on body, this is for the content box
    backgroundColor: finalPalette.primary_background || 'transparent',
    color: finalColors.text || finalPalette.title_color || '#333333',
  };

  console.log('SurveyThemeWrapper - Applied Styles:', themeStylesDebug);

  return (
    <SurveyThemeProvider theme={themeStyles}>
      <div style={themeStylesDebug}>
        {children}
      </div>
    </SurveyThemeProvider>
  );
};

export default SurveyThemeWrapper;

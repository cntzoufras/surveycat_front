import React, { useEffect, useState } from 'react';
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

  // Apply theme styling via CSS variables and inline styles
  const themeStyles = surveyTheme?.theme_setting?.settings || {};
  const variablePalettes = surveyTheme?.theme_setting?.variable_palettes || [];
  const activePalette = variablePalettes.find(p => p.is_active) || variablePalettes[0] || {};
  const typography = themeStyles.typography || {};
  const layout = themeStyles.layout || {};

  // Debug logging to verify theme data
  console.log('SurveyThemeWrapper - Theme Data:', {
    surveyTheme,
    activePalette,
    titleColor: activePalette.title_color,
    backgroundColor: activePalette.primary_background,
    surveyId: survey?.id,
    themeName: surveyTheme?.title
  });

  const themeStylesDebug = {
    '--theme-primary': activePalette.primary_accent || '#1976d2',
    '--theme-secondary': activePalette.secondary_accent || '#dc004e',
    '--theme-background': activePalette.primary_background || '#ffffff',
    '--theme-text': activePalette.title_color || '#333333',
    '--theme-question': activePalette.question_color || '#252525',
    '--theme-choice': activePalette.answer_color || '#666666',
    '--theme-font-family': typography.fontFamily || 'Arial, sans-serif',
    '--theme-font-size': typography.fontSize || '16px',
    '--theme-border-radius': `${layout.borderRadius || 8}px`,
    fontFamily: typography.fontFamily || 'Arial, sans-serif',
    backgroundColor: activePalette.primary_background || '#ffffff',
    color: activePalette.title_color || '#333333',
  };

  console.log('SurveyThemeWrapper - Applied Styles:', themeStylesDebug);

  return (
    <SurveyThemeProvider surveyId={survey?.id}>
      <div style={themeStylesDebug}>
        {children}
      </div>
    </SurveyThemeProvider>
  );
};

export default SurveyThemeWrapper;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThemeAction } from '../redux/actions/surveyThemeActions';

const SurveyThemeContext = createContext();

export const SurveyThemeProvider = ({ surveyId, children }) => {
  const dispatch = useDispatch();
  const [surveyTheme, setSurveyTheme] = useState(null);
  const [customTheme, setCustomTheme] = useState(null);
  
  const themes = useSelector(state => state.surveyTheme.list);
  const currentSurvey = useSelector(state => 
    state.survey.surveys.find(s => s.id === surveyId)
  );

  useEffect(() => {
    if (currentSurvey?.theme) {
      // Use theme data directly from survey response
      setSurveyTheme(currentSurvey.theme);
      // Initialize custom theme with survey-specific overrides
      setCustomTheme({
        ...currentSurvey.theme.theme_setting?.settings,
        ...currentSurvey.custom_theme_settings
      });
    } else if (currentSurvey?.theme_id) {
      // Fallback: fetch theme if not included in survey
      dispatch(fetchThemeAction(currentSurvey.theme_id));
    }
  }, [currentSurvey?.theme, currentSurvey?.theme_id, dispatch]);

  useEffect(() => {
    if (currentSurvey?.theme_id && !currentSurvey?.theme) {
      const theme = themes.find(t => t.id === currentSurvey.theme_id);
      if (theme) {
        setSurveyTheme(theme);
        // Initialize custom theme with survey-specific overrides
        setCustomTheme({
          ...theme.theme_setting?.settings,
          ...currentSurvey.custom_theme_settings
        });
      }
    }
  }, [themes, currentSurvey]);

  const updateCustomTheme = (updates) => {
    setCustomTheme(prev => ({ ...prev, ...updates }));
  };

  const getThemeStyles = () => {
    const base = customTheme || surveyTheme?.theme_setting?.settings || {};
    
    // Get colors from variable_palettes
    const variablePalettes = surveyTheme?.theme_setting?.variable_palettes || [];
    const activePalette = variablePalettes.find(p => p.is_active) || variablePalettes[0] || {};
    
    return {
      typography: {
        fontFamily: base.typography?.fontFamily || 'Arial, sans-serif',
        fontSize: base.typography?.fontSize || '16px',
        headingStyle: {
          H1: base.typography?.headingStyle?.H1 || 'bold 24px',
          H2: base.typography?.headingStyle?.H2 || 'bold 18px',
        }
      },
      colors: {
        primary: activePalette.primary_accent || base.colors?.primary || '#1976d2',
        secondary: activePalette.secondary_accent || base.colors?.secondary || '#dc004e',
        background: activePalette.primary_background || base.colors?.background || '#ffffff',
        text: activePalette.title_color || base.colors?.text || '#333333',
        question: activePalette.question_color || base.colors?.question || '#252525',
        choice: activePalette.answer_color || base.colors?.choice || '#666666',
      },
      layout: {
        backgroundAlpha: base.primary_background_alpha || 100,
        alignment: base.layout || 'left',
      },
      backgroundImage: base.background_image_url || null,
    };
  };

  const value = {
    surveyTheme,
    customTheme,
    updateCustomTheme,
    getThemeStyles,
    themeStyles: getThemeStyles(),
  };

  return (
    <SurveyThemeContext.Provider value={value}>
      {children}
    </SurveyThemeContext.Provider>
  );
};

export const useSurveyTheme = () => {
  const context = useContext(SurveyThemeContext);
  if (!context) {
    // Return fallback theme instead of throwing error
    return {
      typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px'
      },
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        background: '#ffffff',
        text: '#252525',
        choice: '#666666',
        question: '#252525'
      },
      layout: {
        borderRadius: 8,
        padding: 20,
        backgroundAlpha: 100
      }
    };
  }
  return context;
};

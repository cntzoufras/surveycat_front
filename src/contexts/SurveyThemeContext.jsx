import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThemeAction } from '../redux/actions/surveyThemeActions';

const SurveyThemeContext = createContext();

export const SurveyThemeProvider = ({ theme, children }) => {
  const [customTheme, setCustomTheme] = useState(theme);

  useEffect(() => {
    setCustomTheme(theme);
  }, [theme]);

  const updateCustomTheme = (updates) => {
    setCustomTheme(prev => ({ ...prev, ...updates }));
  };

  const value = {
    themeStyles: customTheme,
    updateCustomTheme,
  };

  return (
    <SurveyThemeContext.Provider value={value}>
      {children}
    </SurveyThemeContext.Provider>
  );
};

export const useSurveyTheme = () => {
  const context = useContext(SurveyThemeContext);
  if (!context || !context.themeStyles) {
    // Return a fallback theme to prevent crashes if the context is not yet available
    return {
      typography: { fontFamily: 'Arial, sans-serif', fontSize: '16px' },
      colors: { primary: '#1976d2', text: '#333' },
      layout: { borderRadius: 8 },
    };
  }
  return context.themeStyles;
};

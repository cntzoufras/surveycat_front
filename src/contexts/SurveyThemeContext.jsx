import React, {
  createContext, useContext, useState, useEffect, useMemo, useCallback,
} from 'react';
import PropTypes from 'prop-types';

const SurveyThemeContext = createContext(null);

const DEFAULT_THEME = {
  typography: { fontFamily: 'Arial, sans-serif', fontSize: '16px' },
  colors: { primary: '#1976d2', text: '#333', question_answer_color: '#1976d2' },
  layout: { borderRadius: 8 },
};

export const SurveyThemeProvider = ({ theme, children }) => {
  const [customTheme, setCustomTheme] = useState(theme);

  useEffect(() => {
    setCustomTheme(theme);
  }, [theme]);

  const updateCustomTheme = useCallback((updates) => {
    setCustomTheme(prev => ({ ...prev, ...updates }));
  }, []);

  const value = useMemo(
    () => ({ themeStyles: customTheme, updateCustomTheme }),
    [customTheme, updateCustomTheme],
  );

  return (
    <SurveyThemeContext.Provider value={value}>
      {children}
    </SurveyThemeContext.Provider>
  );
};

SurveyThemeProvider.propTypes = {
  theme: PropTypes.shape({
    typography: PropTypes.shape({
      fontFamily: PropTypes.string.isRequired,
      fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    colors: PropTypes.shape({
      primary: PropTypes.string,
      text: PropTypes.string,
      question_answer_color: PropTypes.string,
    }).isRequired,
    layout: PropTypes.shape({
      borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }).isRequired,
  }),
  children: PropTypes.node.isRequired,
};

SurveyThemeProvider.defaultProps = {
  theme: DEFAULT_THEME,
};

export const useSurveyTheme = () => {
  const context = useContext(SurveyThemeContext);
  return context?.themeStyles ?? DEFAULT_THEME;
};

export const useSurveyThemeContext = () => {
  const context = useContext(SurveyThemeContext);
  return context ?? { themeStyles: DEFAULT_THEME, updateCustomTheme: () => {} };
};

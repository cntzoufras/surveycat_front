import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import WEB_SAFE_FONTS from '../../../constants/fontConstants';
import { fetchThemeAction } from '../../../redux/actions/surveyThemeActions';
import { SurveyThemeProvider } from '../../../contexts/SurveyThemeContext';

const SurveyThemeWrapper = ({ survey, children }) => {
  const dispatch = useDispatch();
  const [surveyTheme, setSurveyTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const themes = useSelector(state => state.surveyTheme.list);
  const currentTheme = useSelector(state => state.surveyTheme.current);

  useEffect(() => {
    if (survey?.theme) {
      setSurveyTheme(survey.theme);
      setIsLoading(false);
    } else if (survey?.theme_id) {
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
      setSurveyTheme(survey.theme);
      setIsLoading(false);
    } else if (currentTheme && survey?.theme_id === currentTheme.id) {
      setSurveyTheme(currentTheme);
      setIsLoading(false);
    }
  }, [currentTheme, survey?.theme_id, survey?.theme]);

  const themeStyles = useMemo(() => {
    if (!surveyTheme) return {};

    const baseSettings = surveyTheme.theme_setting?.settings || {};
    const variablePalettes = surveyTheme.theme_setting?.variable_palettes || [];
    const activePalette = variablePalettes.find(p => p.is_active) || variablePalettes[0] || {};
    const customSettings = survey?.custom_theme_settings || {};

    const merged = _.merge({}, baseSettings, { variable_palette: activePalette }, customSettings);
    if (!merged.colors) merged.colors = {};
    return merged;
  }, [surveyTheme, survey?.custom_theme_settings]);

  const typography = themeStyles.typography || {};
  const layout = themeStyles.layout || {};
  const finalPalette = themeStyles.variable_palette || {};
  const finalColors = themeStyles.colors || {};

  // Dynamic font loader — always return a function (no-op or cleanup) to satisfy consistent-return
  useEffect(() => {
    if (
      !typography.fontFamily
      || typeof typography.fontFamily !== 'string'
      || typography.fontFamily.trim() === ''
    ) {
      return () => {}; // no-op cleanup for early exit
    }

    const isWebSafe = WEB_SAFE_FONTS.includes(typography.fontFamily);
    const fontName = typography.fontFamily.split(',')[0].trim();

    if (!isWebSafe) {
      const fontId = `google-font-${fontName.replace(/ /g, '+')}`;
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
          / /g,
          '+',
        )}:wght@400;700&display=swap`;
        document.head.appendChild(link);
      }
    }

    const styleId = 'survey-theme-font-style';
    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.innerHTML = `
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

    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, [typography.fontFamily, finalColors.background]);

  if (isLoading && survey?.theme_id) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          fontFamily: 'Arial, sans-serif',
          color: '#666',
        }}
      >
        Loading theme...
      </div>
    );
  }

  // Debug logs (optional)
  console.log(
'SurveyThemeWrapper - Final Merged Theme:', 
    {
       settings: themeStyles, palette: finalPalette, colors: finalColors, surveyId: survey?.id, 
    },
  );

  const themeStylesDebug = {
    '--theme-primary': finalColors.primary || finalPalette.primary_accent || '#1976d2',
    '--theme-secondary':
      finalColors.secondary || finalPalette.secondary_accent || '#dc004e',
    '--theme-background': finalPalette.primary_background || '#ffffff',
    '--theme-text': finalColors.text || finalPalette.title_color || '#333333',
    '--theme-question': finalColors.question || finalPalette.question_color || '#252525',
    '--theme-choice': finalColors.choice || finalPalette.answer_color || '#666666',
    '--theme-font-family': typography.fontFamily || 'Arial, sans-serif',
    '--theme-font-size': typography.fontSize || '16px',
    '--theme-border-radius': `${layout.borderRadius || 8}px`,
    backgroundColor: finalPalette.primary_background || 'transparent',
    color: finalColors.text || finalPalette.title_color || '#333333',
  };

  return (
    <SurveyThemeProvider theme={themeStyles}>
      <div style={themeStylesDebug}>{children}</div>
    </SurveyThemeProvider>
  );
};

SurveyThemeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  survey: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    theme_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    theme: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      theme_setting: PropTypes.shape({
        settings: PropTypes.shape({
          typography: PropTypes.shape({
            fontFamily: PropTypes.string,
            fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            headingStyle: PropTypes.shape({
              H1: PropTypes.string,
              H2: PropTypes.string,
            }),
          }),
          colors: PropTypes.objectOf(PropTypes.string),
          layout: PropTypes.shape({
            backgroundAlpha: PropTypes.number,
            borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
      }),
    }),
  }),
};

SurveyThemeWrapper.defaultProps = {
  survey: null,
};

export default SurveyThemeWrapper;
